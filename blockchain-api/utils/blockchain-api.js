const axios = require("axios");
const { Response, Transaction, Account } = require("../classes")
const { config } = require("../config")
const { getTotalBTC, epochToDate, btcFiat } = require("./../lib")
async function getTransactionDetails(txHash, currency) {
    try {
        const { data } = await axios.get(`${config.env.BLOCKCHAIN_TRANSACTION_ENDPOINT}${txHash}/?format=json`, {});
        // console.log("total : ", getTotalBTC(data?.inputs));
        let receivedTime = epochToDate(data?.time)
        let totalInputBTC = await btcFiat(getTotalBTC(data?.inputs), currency)
        let totalOutputBTC = await btcFiat(getTotalBTC(data?.outputs), currency)
        let totalFeesBTC = await btcFiat(data?.fee, currency)
        let size = data?.size
        let confirmations = 0
        let status = data?.block.hasOwnProperty("mempool") ? "Pending" : "Conformed"
        if (status === "Conformed") {
            let latestBlock = await getLatestBlock();
            if (latestBlock.status !== 200)
                return latestBlock;
            confirmations = latestBlock?.data - data?.block?.height + 1
        }
        let transaction = new Transaction({ transactionHash: txHash, receivedTime, status, size, confirmations, totalInputBTC, totalOutputBTC, totalFeesBTC })
        // console.log("transaction=== >", transaction);
        return new Response({ status: 200, message: "Successful fetch Result", data: transaction })
    } catch (error) {
        // console.log(new Response({ status: 404, message: error.message, data: {} }));
        return new Response({ status: 404, message: error.message, data: {} })
    }

}

async function getAccountDetails(address, currency) {
    try {

        const { data } = await axios.get(`${config.env.BLOCKCHAIN_API_ENDPOINT}address/${address}?format=json`, {});
        let unspentBalance = await getUnspentBalance(address, currency)
        if (unspentBalance.status !== 200) {
            return unspentBalance
        }
        let noConfirmedTransaction = data?.n_tx
        let currentBalance = await btcFiat((data?.final_balance), currency)
        let totalReceived = await btcFiat((data?.total_received), currency)
        let totalSpent = await btcFiat(data?.total_sent, currency)
        let totalUnspent = unspentBalance.data

        let transaction = new Account({ address, noConfirmedTransaction, currentBalance, totalReceived, totalSpent, totalUnspent })
        // console.log("transaction=== >", transaction);
        return new Response({ status: 200, message: "Successful fetch Result", data: transaction })
    } catch (error) {
        // console.log("getAccountDetails",error);

        // console.log(new Response({ status: 404, message: error.message, data: {} }));
        return new Response({ status: 404, message: error.message, data: {} })
    }

}

async function getUnconfirmedTransactionHash() {
    try {
        const { data } = await axios.get(`${config.env.BLOCKCHAIN_API_ENDPOINT}unconfirmed-transactions?format=json`, {});
        // console.log("data.txs[0]", data.txs[0].hash);
        return new Response({ status: 200, message: "Successful fetch Result", data: data.txs[0]["hash"] })
    } catch (error) {
        console.log(new Response({ status: 404, message: error.message, data: {} }));
        return new Response({ status: 404, message: error.message, data: {} })
    }

}

async function getLatestBlock() {
    try {
        const { data } = await axios.get(`${config.env.BLOCKCHAIN_API_ENDPOINT}latestblock?format=json`, {});
        // console.log("data.txs[0]", data.txs[0].hash);
        return new Response({ status: 200, message: "Successful fetch Result", data: data["height"] })
    } catch (error) {
        return new Response({ status: 404, message: error.message, data: 0 })
    }
}
async function getUnspentBalance(address, currency) {
    try {
        // https://blockchain.info/unspent?active=$address
        // console.log("==> ", `${config.env.BLOCKCHAIN_API_ENDPOINT}unspent?active=${address}`);
        const { data } = await axios.get(`${config.env.BLOCKCHAIN_API_ENDPOINT}unspent?active=${address}`, {});
        let totalUnspent = await btcFiat(getTotalBTC(data?.unspent_outputs), currency)

        return new Response({ status: 200, message: "Successful fetch Result", data: totalUnspent })
    } catch (error) {
        console.log("getUnspentBalance");
        return new Response({ status: 404, message: error.message, data: 0 })
    }
}



module.exports = { getTransactionDetails, getUnconfirmedTransactionHash, getAccountDetails }