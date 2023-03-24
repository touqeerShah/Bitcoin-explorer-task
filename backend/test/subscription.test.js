
const { assert, expect } = require("chai"); // Using Expect style
const request = require('supertest');
const app = require('../index');
const { v4: uuidv4 } = require('uuid');
const { configObj } = require("./../config")
const axios = require("axios");
const { updateStatusSubscription, getSubscription, getSubscriptionBy } = require("./../controller/subscription-controller")

describe("Subscription", async function () {
    let deviceId, hash
    before(async () => {
        deviceId = uuidv4();
        const { data } = await axios.get(`${configObj.BLOCKCHAIN_API_ENDPOINT}unconfirmed-transactions?format=json`, {});

        hash = data.txs[0]["hash"];

    });
    it("Add new hash in user Subscription", async () => {
        // console.log("hash", hash);
        // accountDetails = await addAndUpdateHistory(req, {});        // console.log(block);
        const response = await request(app)
            .post('/api/subscription/addAndUpdateSubscription')
            .send({
                deviceId,
                hash
            });
        // console.log("response.body", response.body);
        assert.equal(response.status, 200);
        assert.equal(response.body.status, 200);
        assert.equal(response.body.message, "Successfully add");

    });
    it("Check when add some hash in user Subscription", async () => {
        const response = await request(app)
            .post('/api/subscription/addAndUpdateSubscription')
            .send({
                deviceId,
                hash
            });
        // console.log("response.body", response.body);
        assert.equal(response.body.status, 403);
        assert.equal(response.body.message, "Hash Already Exist");

    });

    //     // accountDetails = await addAndUpdateHistory(req, {});   
    //     let response;     // console.log(block);
    //     // console.log(deviceId);
    //     response = await request(app)
    //         .get('/api/subscription/getNotification')
    //         .query({
    //             deviceId,
    //             isView: false,
    //             page: 0

    //         });
    //     // console.log("ssss", response.body.data);

    //     let _isNewNotification = response.body.data[0].isNewNotification
    //     // console.log("isNewNotification", _isNewNotification);
    //     let updateResponse = await request(app)
    //         .post('/api/subscription/updateNotification')
    //         .send({
    //             deviceId,
    //             isNewNotification: !_isNewNotification,
    //             isView: response.body.data[0].isView
    //         });
    //     // console.log("updateResponse", updateResponse.body);
    //     response = await request(app)
    //         .get('/api/subscription/getNotification')
    //         .query({
    //             deviceId,
    //             isView: false

    //         });
    //     assert.equal(updateResponse.body.status, 200);
    //     assert.equal(updateResponse.body.message, "Successfully updated");
    //     assert.equal(!_isNewNotification, response.body.data[0].isNewNotification);
    // });
    // it("Check update notification isNew status ", async () => {
    //     // accountDetails = await addAndUpdateHistory(req, {});   
    //     let response;     // console.log(block);
    //     // console.log(deviceId);
    //     response = await request(app)
    //         .get('/api/subscription/getNotification')
    //         .query({
    //             deviceId,
    //             isView: false
    //         });
    //     // console.log(response.body.data);

    //     let _isView = response.body.data[0].isView
    //     // console.log("isNewNotification", _isNewNotification);
    //     let updateResponse = await request(app)
    //         .post('/api/subscription/updateNotification')
    //         .send({
    //             deviceId,
    //             isNewNotification: response.body.data[0].isNewNotification,
    //             isView: !_isView
    //         });
    //     // console.log("updateResponse", updateResponse.body);
    //     response = await request(app)
    //         .get('/api/subscription/getNotification')
    //         .query({
    //             deviceId,
    //             isView: true

    //         });
    //     // console.log(response.body.data);
    //     assert.equal(updateResponse.body.status, 200);
    //     assert.equal(updateResponse.body.message, "Successfully updated");
    //     assert.equal(!_isView, response.body.data[0].isView);
    // });


    //     let response;     // console.log(block);
    //     for (let index = 0; index < 6; index++) {
    //         response = await request(app)
    //             .post('/api/history/addAndUpdateHistory')
    //             .send({
    //                 deviceId: "test",
    //                 searchValue: index
    //             });
    //     }
    //     assert.equal(response.body.data.searchResults.length, 5);
    // });

    // it("Check searchResults replace only old record ", async () => {
    //     let response;     // console.log(block);
    //     response = await request(app)
    //         .get('/api/history/getSearchHistory')
    //         .query({
    //             deviceId: "test",
    //         });
    //     // console.log("response", response.body.data.searchResults);
    //     let lastSearchResult = response.body.data.searchResults[response.body.data.searchResults.length - 1]
    //     await request(app)
    //         .post('/api/history/addAndUpdateHistory')
    //         .send({
    //             deviceId: "test",
    //             searchValue: "new record2"
    //         });
    //     response = await request(app)
    //         .get('/api/history/getSearchHistory')
    //         .query({
    //             deviceId: "test",
    //         });

    //     assert.notEqual(response.body.data.searchResults[response.body.data.searchResults.length - 1], lastSearchResult);
    // });

    // it("Check get history will give valid response on not existing record", async () => {
    //     let response;     // console.log(block);
    //     response = await request(app)
    //         .get('/api/history/getSearchHistory')
    //         .query({
    //             deviceId: "test1",
    //         });
    //     assert.equal(response.body.status, 200);
    //     assert.equal(response.body.message, "query response");
    //     // assert.equal(response.body.data, {});
    //     expect(response.body.data).to.deep.equal({});



    // });
    it("Check getAll Subscription", async () => {
        const updateResponse = await getSubscription({ isActive: true })
        // console.log(updateResponse);
        // for (let outer = 0; outer < updateResponse.data.length; outer++) {
        //     const user = updateResponse.data[outer];
        //     console.log(user);
        //     for (let inner = 0; inner < user.subscription.length; inner++) {
        //         const subscription = user.subscription[inner];
        //         // console.log("subscription", subscription);
        //     }

        // }
        assert.equal(updateResponse.status, 200);
        assert.equal(updateResponse.message, "query response");
        // assert.isAbove(updateResponse.data.length, 0);

    });
    it("Check deactivated Subscription", async () => {
        const updateResponse = await updateStatusSubscription({ deviceId, hash })
        // console.log("response.body", response.body);
        assert.equal(updateResponse.status, 200);
        assert.equal(updateResponse.message, "update add");

    });



});