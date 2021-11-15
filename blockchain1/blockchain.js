import Block from "./block";

export default class BlockChain {

    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
          return new Block(Date.now(), [], '');
    }

    getLatestBlock(){
         return this.chain[this.chain - 1];
    }
}