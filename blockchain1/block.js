const SHA256 = require('crypto-js/sha256');

export default class Block{
    constructor(timestamp, transactions, previousHash = ''){
        //calculations of the hash
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = '';
    }

    calculateHash() {
        return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce);
    }

    hasValidTransactions() {

        for (const tx of this.transactions) {
            //checks to see if true
            if (!tx.isValid()) {
               return false;
            }
        }
        return true;
    }

    mineBlock(difficulty) {
        
    }
}