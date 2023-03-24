const { getTotalBTC } = require("./get-total-btc");
const { epochToDate } = require("./date-converter")
const { btcFiat } = require("./btc-fiat-converter")

module.exports = { getTotalBTC, epochToDate, btcFiat }