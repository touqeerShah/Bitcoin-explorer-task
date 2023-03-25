const express = require("express");
const {
  addAndUpdateSubscription,
  getSubscriptionExist

} = require("../controller/subscription-controller");
const subscriptionRouter = express.Router();
// following are the routes which we used to expose the  backend service

subscriptionRouter.post("/addAndUpdateSubscription", addAndUpdateSubscription);
subscriptionRouter.get("/getSubscriptionExist", getSubscriptionExist);


module.exports = subscriptionRouter;
