const { assert, expect } = require("chai"); // Using Expect style
const request = require("supertest");
const app = require("../index");
const { v4: uuidv4 } = require("uuid");

const { addNotification } = require("../controller/notification-controller");
describe("Notifications", async function () {
  let email = "test1";
  before(async () => {
    email = uuidv4();
  });
  it("Check new notification is created with valid response", async () => {
    const response = await addNotification({
      email,
      notify: "bc1qk5pga4z53zf4hm0tqtf9nh3m454fdvwvnmh3z4",
    });
    // console.log("response.body", response);
    assert.equal(response.status, 200);
    assert.equal(response.message, "Successfully add");
  });

  it("Check update notification isNew status ", async () => {
    // accountDetails = await addAndUpdateHistory(req, {});
    let response; // console.log(block);
    // console.log(email);
    response = await request(app)
      .get("/api/notifications/getNotification")
      .query({
        email,
        isView: false,
      });
    // console.log(response.body.data);

    let _isView = response.body.data[0].isView;
    // console.log("isNewNotification", _isNewNotification);
    let updateResponse = await request(app)
      .post("/api/notifications/updateNotification")
      .send({
        email,
        notify: response.body.data[0].notify,
        isView: !_isView,
      });
    // console.log("updateResponse", updateResponse.body);
    response = await request(app)
      .get("/api/notifications/getNotification")
      .query({
        email,
        isView: true,
      });
    // console.log(response.body.data);
    assert.equal(updateResponse.body.status, 200);
    assert.equal(updateResponse.body.message, "Successfully updated");
    assert.equal(!_isView, response.body.data[0].isView);
  });
});
