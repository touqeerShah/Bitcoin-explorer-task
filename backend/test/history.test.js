
const { assert, expect } = require("chai"); // Using Expect style
const request = require('supertest');
const app = require('../index');
const { v4: uuidv4 } = require('uuid');

describe("History", async function () {

    before(async () => {

        // console.log("accountDetails", accountDetails);
    });
    it("Check API valid respond on valid Address hash", async () => {
        // accountDetails = await addAndUpdateHistory(req, {});        // console.log(block);
        const response = await request(app)
            .post('/api/history/addAndUpdateHistory')
            .send({
                deviceId: "test3",
                searchValue: "bc1qk5pga4z53zf4hm0tqtf9nh3m454fdvwvnmh3z4"
            });
        // console.log("response.body", response.body);
        assert.equal(response.status, 200);
        assert.equal(response.body.status, 200);
        assert.equal(response.body.message, "Successfully add");
    });
    it("Check searchResults record not exceed length of 5 ", async () => {
        // accountDetails = await addAndUpdateHistory(req, {});   
        let response;     // console.log(block);
        for (let index = 0; index < 6; index++) {
            response = await request(app)
                .post('/api/history/addAndUpdateHistory')
                .send({
                    deviceId: "test",
                    searchValue: uuidv4()
                });
        }
        assert.equal(response.body.data.searchResults.length, 5);
    });
    it("Check searchResults only remove ", async () => {
        // accountDetails = await addAndUpdateHistory(req, {});   
        let response;     // console.log(block);
        for (let index = 0; index < 6; index++) {
            response = await request(app)
                .post('/api/history/addAndUpdateHistory')
                .send({
                    deviceId: "test",
                    searchValue: index
                });
        }
        assert.equal(response.body.data.searchResults.length, 5);
    });

    it("Check searchResults replace only old record ", async () => {
        let response;     // console.log(block);
        response = await request(app)
            .get('/api/history/getSearchHistory')
            .query({
                deviceId: "test",
            });
        // console.log("response", response.body.data.searchResults);
        let lastSearchResult = response.body.data.searchResults[response.body.data.searchResults.length - 1]
        await request(app)
            .post('/api/history/addAndUpdateHistory')
            .send({
                deviceId: "test",
                searchValue: "new record2"
            });
        response = await request(app)
            .get('/api/history/getSearchHistory')
            .query({
                deviceId: "test",
            });

        assert.notEqual(response.body.data.searchResults[response.body.data.searchResults.length - 1], lastSearchResult);
    });

    it("Check get history will give valid response on not existing record", async () => {
        let response;     // console.log(block);
        response = await request(app)
            .get('/api/history/getSearchHistory')
            .query({
                deviceId: "test1",
            });
        assert.equal(response.body.status, 200);
        assert.equal(response.body.message, "query response");
        // assert.equal(response.body.data, {});
        expect(response.body.data).to.deep.equal({});



    });

});