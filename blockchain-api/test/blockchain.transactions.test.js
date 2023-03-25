
const { assert, expect } = require("chai"); // Using Expect style
const { getTransactionDetails, getUnconfirmedTransactionHash } = require("../utils")
const { Response, Transaction } = require("../classes")

describe("Transactions", async function () {
    let transactionHash;
    let transaction;
    before(async () => {
        transactionHash = "089b79b066685df7a03f06d8bc4f66bd05fbb2167301aab2cbd83e2e8ff586f4"
        transaction = await getTransactionDetails(transactionHash, "USD");

        // console.log(block);
    });
    it("Check API Respond on valid Tx hash", async () => {
        assert.equal(transaction.status, 200);
    });
    it("Check API Respond on invalid Tx hash", async () => {
        let response = await getTransactionDetails(transactionHash + 1, "USD");
        assert.equal(response.status, 404);
    });
    it("Check Response Instance", async () => {
        assert.equal(transaction instanceof Response, true);
    });
    it("Check Response data is instance of Transaction class", async () => {
        assert.equal(transaction.data instanceof Transaction, true);
    });
    it("Check Transaction Received Time is Date instance", async () => {
        // console.log("response", typeof response.data.receivedTime);
        assert.equal(new Date(transaction.data.receivedTime) instanceof Date, true);
    });
    it("Check no mine status should pending", async () => {
        let response = await getUnconfirmedTransactionHash();
        // console.log("response", response);
        response = await getTransactionDetails(response.data);
        assert.equal(response.data.status, "Pending");
    });
    it("Check mine status should Conformed", async () => {
        assert.equal(transaction.data.status, "Conformed");
    });

    it("Total input,output and fee BTC greater the Zero", async () => {
        assert.isAbove(transaction.data.totalInputBTC, 0);
        assert.isAbove(transaction.data.totalOutputBTC, 0);
        assert.isAbove(transaction.data.totalFeesBTC, 0);
    });

    it("Block Size not equal to Zero", async () => {
        assert.isAbove(transaction.data.size, 0);
    });
    it("confirmations  greater then zero if is status is conformed", async () => {
        assert.equal(transaction.data.status, "Conformed");
        assert.isAbove(transaction.data.confirmations, 0);
    });

});