import { satoshisToFiat } from "bitcoin-conversion";
/**
 *
 * @param {*} satoshis value of btc
 * @param {*} currency which fiat currency
 * @returns
 */
export async function btcFiat(satoshis, currency) {
  let fiatCurrency = 0;
  try {
    fiatCurrency = await satoshisToFiat(satoshis, currency);
    return fiatCurrency;
  } catch (error) {
    return fiatCurrency;
  }
}

// module.exports = { btcFiat };
