// require("dotenv").config()

/**
 * This is user to export all the env variable in one location
 */
const config = {
  reactStrictMode: true,
  env: {
    BLOCKCHAIN_TRANSACTION_ENDPOINT:
      process.env.REACT_APP_BLOCKCHAIN_TRANSACTION_ENDPOINT,
    BLOCKCHAIN_API_ENDPOINT: process.env.REACT_APP_BLOCKCHAIN_API_ENDPOINT,
    BACKEND_ENDPOINT: process.env.REACT_APP_BACKEND_API_ENDPOINT,
  },
};

module.exports = { config };
