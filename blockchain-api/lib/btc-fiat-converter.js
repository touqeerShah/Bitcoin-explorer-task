const { satoshisToFiat } = require('bitcoin-conversion');

async function btcFiat(satoshis, currency) {
    let fiatCurrency = 0;
    try {
        fiatCurrency = await satoshisToFiat(satoshis, currency)
        return fiatCurrency;
    } catch (error) {
        return fiatCurrency
    }


}

module.exports = { btcFiat }