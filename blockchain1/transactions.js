const SHA256 = require('crypto-js/sha256');
import Elliptic from 'elliptic';

const ec = new Elliptic.ec('secp256k1');

export default class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    //Calculate the hash in order to do the sig. Must be done!
    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount);
    }

    //Incoming key
    signTransaction(signingKey) {
        //The miner transaction validated?
        if (this.fromAddress === null) return true;

        //verify if the source account is the person's address
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions from other wallets!')
        }
        //sign the transaction hash with the private key
        this.hash = this.calculateHash();
        
        const sign = signingKey.sign(this.hash, 'base64');

        //convert signature to DER format
        this.signature = sign.toDER('hex');

        console.log("signature: " + this.signature);
    }
}