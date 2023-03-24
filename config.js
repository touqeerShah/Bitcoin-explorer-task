/** @type {import('next').NextConfig} */
require("dotenv").config()
const config = {
  reactStrictMode: true,
  env: {
    BLOCKCHAIN_TRANSACTION_ENDPOINT: process.env.NEXT_PUBLIC_BLOCKCHAIN_TRANSACTION_ENDPOINT,
    BLOCKCHAIN_API_ENDPOINT:
      process.env.NEXT_PUBLIC_BLOCKCHAIN_API_ENDPOINT,
    BACKEND_ENDPOINT: "http://localhost:8080"
  }
}



module.exports = { config }
