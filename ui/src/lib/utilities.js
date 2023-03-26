/**
 * help to show big address into small values so fit on screen
 * @param {*} address
 * @param {*} width
 * @returns
 */
export function ellipseAddress(address = "", width = 10) {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}
