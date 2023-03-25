class Account {
    constructor({ address, noConfirmedTransaction, currentBalance, totalReceived, totalSpent, totalUnspent }) {
        this.address = address;
        this.noConfirmedTransaction = noConfirmedTransaction
        this.currentBalance = currentBalance
        this.totalReceived = totalReceived
        this.totalSpent = totalSpent
        this.totalUnspent = totalUnspent
    }

}

module.exports = { Account }