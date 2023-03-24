var WebSocketServer = require("ws");
const { configObj } = require("./../config")
const axios = require("axios");

const wss_explorer = new WebSocketServer(configObj.BLOCKCHAIN_INFO_WEBSOCKET_ADDRESS);
const { updateStatusSubscription, getSubscription } = require("./../controller/subscription-controller")
const { addNotification } = require("../controller/notification-controller");
function bitcoinBlockchainLisner() {
    try {


        wss_explorer.addEventListener("message", async (e) => {
            console.log("message", e.data);
            if (JSON.parse(e.data)["op"] == "block") {
                let subscriptions = await getSubscription({ isActive: true })
                for (let outer = 0; outer < subscriptions.data.length; outer++) {
                    const user = subscriptions.data[outer];
                    for (let inner = 0; inner < user.subscription.length; inner++) {
                        const subscription = user.subscription[inner];
                        let status = await getTransactionStatus(subscription?.hash)
                        console.log("status", status);
                        if (status == "Conformed") {
                            let r = await updateStatusSubscription({ deviceId: user?.deviceId, hash: subscription?.hash })
                            console.log("updateStatusSubscription", r);
                            let n = await addNotification({
                                deviceId: user?.deviceId,
                                notify: subscription?.hash
                            })
                            console.log("addNotification", n);

                        }
                    }

                }
            }
        });


        const interval = setInterval(() => ping(), 50000);
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
async function getTransactionStatus(txHash) {
    try {
        const { data } = await axios.get(`${configObj.BLOCKCHAIN_TRANSACTION_ENDPOINT}${txHash}/?format=json`, {});

        let status = data?.block.hasOwnProperty("mempool") ? "Pending" : "Conformed"
        return status;
    } catch (error) {
        // console.log(new Response({ status: 404, message: error.message, data: {} }));
        return "Pending"
    }

}

module.exports = { bitcoinBlockchainLisner }