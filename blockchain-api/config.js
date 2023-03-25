require("dotenv").config()
const config = {
  reactStrictMode: true,
  env: {
    BLOCKCHAIN_TRANSACTION_ENDPOINT: process.env.REACT_APP_BLOCKCHAIN_TRANSACTION_ENDPOINT,
    BLOCKCHAIN_API_ENDPOINT:
      process.env.REACT_APP_BLOCKCHAIN_API_ENDPOINT
  }
}



module.exports = { config }
