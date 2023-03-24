const express = require("express");
const {
  addNotification,
  updateNotification,
  getNotification
} = require("../controller/notification-controller");
const notificationRouter = express.Router();
// following are the routes which we used to expose the  backend service

notificationRouter.post("/addNotification", addNotification);
notificationRouter.post("/updateNotification", updateNotification);
notificationRouter.get("/getNotification", getNotification);

module.exports = notificationRouter;
