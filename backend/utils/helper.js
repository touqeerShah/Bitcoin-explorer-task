var { connectMongoDB } = require("../module/mongoDB");
var { configObj } = require("../config.js");
var client;


async function loadMongo() {
  client = await connectMongoDB(
    "mongodb://" +
    configObj.MONGO_USER +
    ":" +
    configObj.MONGO_PASS +
    "@" +
    configObj.MONGO_ADDRESS +
    ":" +
    configObj.MONGO_PORT + "/" + configObj.MONGO_DB
  );
}
module.exports = { loadMongo };
