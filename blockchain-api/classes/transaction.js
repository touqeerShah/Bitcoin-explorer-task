class Transaction {
    constructor({ transactionHash, receivedTime, status, size, confirmations, totalInputBTC, totalOutputBTC, totalFeesBTC }) {
        this.transactionHash = transactionHash;
        this.receivedTime = receivedTime
        this.status = status
        this.size = size
        this.confirmations = confirmations
        this.totalInputBTC = totalInputBTC
        this.totalOutputBTC = totalOutputBTC
        this.totalFeesBTC = totalFeesBTC
    }

}

module.exports = { Transaction }