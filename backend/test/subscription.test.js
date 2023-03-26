const { assert, expect } = require("chai"); // Using Expect style
const request = require("supertest");
const app = require("../index");
const { v4: uuidv4 } = require("uuid");
const { configObj } = require("./../config");
const axios = require("axios");
const {
  updateStatusSubscription,
  getSubscription,
  getSubscriptionBy,
} = require("./../controller/subscription-controller");

describe("Subscription", async function () {
  let deviceId, hash;
  before(async () => {
    deviceId = uuidv4();
    const { data } = await axios.get(
      `${configObj.BLOCKCHAIN_API_ENDPOINT}unconfirmed-transactions?format=json`,
      {}
    );

    hash = data.txs[0]["hash"];
  });
  it("Add new hash in user Subscription", async () => {
    const response = await request(app)
      .post("/api/subscription/addAndUpdateSubscription")
      .send({
        deviceId,
        hash,
      });
    // console.log("response.body", response.body);
    assert.equal(response.status, 200);
    assert.equal(response.body.status, 200);
    assert.equal(response.body.message, "Successfully add");
  });
  it("Check when add some hash in user Subscription", async () => {
    const response = await request(app)
      .post("/api/subscription/addAndUpdateSubscription")
      .send({
        deviceId,
        hash,
      });
    // console.log("response.body", response.body);
    assert.equal(response.body.status, 403);
    assert.equal(response.body.message, "Hash Already Exist");
  });

  // });
  it("Check getAll Subscription", async () => {
    const updateResponse = await getSubscription({ isActive: true });

    assert.equal(updateResponse.status, 200);
    assert.equal(updateResponse.message, "query response");
    // assert.isAbove(updateResponse.data.length, 0);
  });
  it("Check deactivated Subscription", async () => {
    const updateResponse = await updateStatusSubscription({ deviceId, hash });
    // console.log("response.body", response.body);
    assert.equal(updateResponse.status, 200);
    assert.equal(updateResponse.message, "update add");
  });
});
