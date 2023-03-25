function getTotalBTC(totalObject) {
    let total = 0
    totalObject?.forEach(element => {
        total += element?.value
    });
    return total;
}
module.exports = { getTotalBTC }