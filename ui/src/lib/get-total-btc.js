/**
 *  input and output object are array so calculate total value
 * @param {*} totalObject
 * @returns  total amount in that object tranactions
 */
function getTotalBTC(totalObject) {
  let total = 0;
  totalObject?.forEach((element) => {
    total += element?.value;
  });
  return total;
}
module.exports = { getTotalBTC };
