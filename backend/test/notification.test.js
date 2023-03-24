
const { assert, expect } = require("chai"); // Using Expect style
const request = require('supertest');
const app = require('../index');
const { v4: uuidv4 } = require('uuid');

const {
    addNotification,

} = require("../controller/notification-controller");
describe("Notifications", async function () {
    let deviceId = "test1"
    before(async () => {
        deviceId = uuidv4();
        // console.log("accountDetails", accountDetails);
    });
    it("Check new notification is created with valid response", async () => {
        // accountDetails = await addAndUpdateHistory(req, {});        // console.log(block);
        const response = await addNotification({
            deviceId,
            notify: "bc1qk5pga4z53zf4hm0tqtf9nh3m454fdvwvnmh3z4"
        })
        // console.log("response.body", response);
        assert.equal(response.status, 200);
        assert.equal(response.message, "Successfully add");
    });
    it("Check update notification isNew status ", async () => {
        // accountDetails = await addAndUpdateHistory(req, {});   
        let response;     // console.log(block);
        // console.log(deviceId);
        response = await request(app)
            .get('/api/notifications/getNotification')
            .query({
                deviceId,
                isView: false,
                page: 0

            });
        // console.log("ssss", response.body.data);

        let _isNewNotification = response.body.data[0].isNewNotification
        // console.log("isNewNotification", _isNewNotification);
        let updateResponse = await request(app)
            .post('/api/notifications/updateNotification')
            .send({
                deviceId,
                isNewNotification: !_isNewNotification,
                isView: response.body.data[0].isView
            });
        // console.log("updateResponse", updateResponse.body);
        response = await request(app)
            .get('/api/notifications/getNotification')
            .query({
                deviceId,
                isView: false

            });
        assert.equal(updateResponse.body.status, 200);
        assert.equal(updateResponse.body.message, "Successfully updated");
        assert.equal(!_isNewNotification, response.body.data[0].isNewNotification);
    });
    it("Check update notification isNew status ", async () => {
        // accountDetails = await addAndUpdateHistory(req, {});   
        let response;     // console.log(block);
        // console.log(deviceId);
        response = await request(app)
            .get('/api/notifications/getNotification')
            .query({
                deviceId,
                isView: false
            });
        // console.log(response.body.data);

        let _isView = response.body.data[0].isView
        // console.log("isNewNotification", _isNewNotification);
        let updateResponse = await request(app)
            .post('/api/notifications/updateNotification')
            .send({
                deviceId,
                isNewNotification: response.body.data[0].isNewNotification,
                isView: !_isView
            });
        // console.log("updateResponse", updateResponse.body);
        response = await request(app)
            .get('/api/notifications/getNotification')
            .query({
                deviceId,
                isView: true

            });
        // console.log(response.body.data);
        assert.equal(updateResponse.body.status, 200);
        assert.equal(updateResponse.body.message, "Successfully updated");
        assert.equal(!_isView, response.body.data[0].isView);
    });

    //     // accountDetails = await addAndUpdateHistory(req, {});   
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

});