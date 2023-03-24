var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const server = require("http").createServer(app);
const cors = require("cors");


var { configObj } = require("./config.js");
var historyRouter = require("./routes/history-routes");
var notificationRouter = require("./routes/notification-routes");
var subscriptionRouter = require("./routes/subscription-routes");

const { loadMongo } = require("./utils/helper")
const { bitcoinBlockchainLisner } = require("./utils/web-socket")
/**
 * This used to store values in local storage  of server which help us
 */
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  global.localStorage = new LocalStorage("./scratch");
}


const protocol = "http";

/**
 * this is used to converter normal time into epoc time
 * @returns
 */
Date.prototype.toUnixTime = function () {
  return (this.getTime() / 1000) | 0;
};
Date.time = function () {
  return new Date().toUnixTime();
};
/**
 * this used to ristriced the number of call from one client
 */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      objectSrc: ["'self'"],
      frameSrc: ["'self'"],
      fontSrc: ["'self'"],
    },
  }),
  helmet.xssFilter(true),
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
);

// Apply the rate limiting middleware to all requests
app.use(limiter);

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/history", historyRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/subscription", subscriptionRouter);


/**
 * Enable server on https with local certificate and key
 */



const PORT = configObj.PORT || 8081;
server.listen(PORT, () => {
  loadMongo()
  bitcoinBlockchainLisner()
  console.info(
    `Please open web browser to access ：${protocol}://${configObj.host}:${PORT}/`
  );
  console.info(`pid is ${process.pid}`);
});

module.exports = app
//connect to explorer websocket and become client for Explorer

