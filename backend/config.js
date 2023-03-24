require("dotenv").config();
// console.log(process.env)
module.exports.configObj = {
  MONGO_ADDRESS: process.env.MONGO_ADDRESS,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_DB: process.env.MONGO_DB,
  MONGO_PASS: process.env.MONGO_PASS,
  MONGO_USER: process.env.MONGO_USER,
  PORT: process.env.PORT,

  host: process.env.HOST,
  BLOCKCHAIN_INFO_WEBSOCKET_ADDRESS: process.env.BLOCKCHAIN_INFO_WEBSOCKET_ADDRESS,
  BLOCKCHAIN_API_ENDPOINT: process.env.BLOCKCHAIN_API_ENDPOINT,
  BLOCKCHAIN_TRANSACTION_ENDPOINT: process.env.BLOCKCHAIN_TRANSACTION_ENDPOINT
};
