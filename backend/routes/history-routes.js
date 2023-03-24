const express = require("express");
const {
  getSearchHistory,
  addAndUpdateHistory
} = require("../controller/history-controller");
const historyRouter = express.Router();
// following are the routes which we used to expose the  backend service
historyRouter.get("/getSearchHistory", getSearchHistory);
historyRouter.post("/addAndUpdateHistory", addAndUpdateHistory);


module.exports = historyRouter;
