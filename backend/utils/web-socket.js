var WebSocketServer = require("ws");
const { configObj } = require("./../config");
const axios = require("axios");

const wss_explorer = new WebSocketServer(
  configObj.BLOCKCHAIN_INFO_WEBSOCKET_ADDRESS
);
const {
  updateStatusSubscription,
  getSubscription,
} = require("./../controller/subscription-controller");
const { addNotification } = require("../controller/notification-controller");
function bitcoinBlockchainLisner() {
  try {
    // this will start web socket client to connect with Blockchain.com
    // websocket server to notify when new block is created the check any subscription
    // which active get change

    wss_explorer.addEventListener("message", async (e) => {
      // console.log("message", e.data);
      // check response from server is type block
      if (JSON.parse(e.data)["op"] == "block") {
        // here we get all the  subscriptions which we need to track
        let subscriptions = await getSubscription({ isActive: true });
        // iterate on all subscriptions item
        for (let outer = 0; outer < subscriptions.data.length; outer++) {
          const user = subscriptions.data[outer]; // one user subscriptions more then one hash
          for (let inner = 0; inner < user.subscription.length; inner++) {
            const subscription = user.subscription[inner];
            // get hash details from Blockchain.com apis and  check there status  from mempool to  mining
            let status = await getTransactionStatus(subscription?.hash);
            // console.log("status", status);
            if (status == "Conformed") {
              //once it status change activate the subscription
              let r = await updateStatusSubscription({
                email: user?.email,
                hash: subscription?.hash,
              });
              //   console.log("updateStatusSubscription", r);
              // add it into notification collection so when user login it notify
              let n = await addNotification({
                email: user?.email,
                notify: subscription?.hash,
              });
              //   console.log("addNotification", n);
            }
          }
        }
      }
    });

    const interval = setInterval(() => ping(), 50000); //here we ping the server to make connection awake
    wss_explorer.addEventListener("open", (e) => {
      console.log("open");
      wss_explorer.send('{"op": "blocks_sub"}');
    });
  } catch (error) {
    console.log("websocket error ", error.message);
  }
}

function ping() {
  wss_explorer.send('{"op": "ping"}');
}
/**
 *
 * @param {*} txHash which hash details are required
 * @returns
 */
async function getTransactionStatus(txHash) {
  try {
    const { data } = await axios.get(
      `${configObj.BLOCKCHAIN_TRANSACTION_ENDPOINT}${txHash}/?format=json`,
      {}
    );
    // mempool mean transaction is still in pending state and not add into block
    let status = data?.block.hasOwnProperty("mempool")
      ? "Pending"
      : "Conformed";
    return status;
  } catch (error) {
    // console.log(new Response({ status: 404, message: error.message, data: {} }));
    return "Pending";
  }
}

module.exports = { bitcoinBlockchainLisner };
