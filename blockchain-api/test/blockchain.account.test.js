
const { assert, expect } = require("chai"); // Using Expect style
const { getAccountDetails } = require("../utils")
const { Response, Account } = require("../classes")

describe("Account", async function () {
    let address;
    let accountDetails;
    before(async () => {
        address = "bc1qk5pga4z53zf4hm0tqtf9nh3m454fdvwvnmh3z4"
        accountDetails = await getAccountDetails(address, "USD");        // console.log(block);
        // console.log("accountDetails", accountDetails);
    });
    it("Check API Respond on valid Address hash", async () => {
        assert.equal(accountDetails.status, 200);
    });
    it("Check API Respond on invalid Address hash", async () => {
        let response = await getAccountDetails(address + 1, "USD");
        assert.equal(response.status, 404);
    });
    it("Check Response Instance", async () => {
        assert.equal(accountDetails instanceof Response, true);
    });
    it("Check Response data is instance of Account class", async () => {
        assert.equal(accountDetails.data instanceof Account, true);
    });

    it("Total input,output,balance and unspent all should define ", async () => {
        assert.isAbove(accountDetails.data.noConfirmedTransaction, -1);
        assert.isAbove(accountDetails.data.currentBalance, 0);
        assert.isAbove(accountDetails.data.totalReceived, 0);
        assert.isAbove(accountDetails.data.totalSpent, 0);
        assert.isAbove(accountDetails.data.totalUnspent, 0);

    });

    it("Address is Define  ", async () => {
        assert.equal(accountDetails.data.address, address);
    });

});