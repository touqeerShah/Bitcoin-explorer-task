function epochToDate(time) {
    let strDate = ""
    if (time) {
        const unixEpochTimeMS = time * 1000;
        const d = new Date(unixEpochTimeMS);
        // Careful, the string output here can vary by implementation...
        strDate = d.toLocaleString();
        // console.log("strDate", strDate);
    }
    return strDate;
}

module.exports = { epochToDate }