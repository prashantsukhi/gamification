const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    const selectQuery = 'SELECT * FROM blockchain LIMIT 1;';
    db.query(selectQuery, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      const record = result[0];
      if (record) {
        this.chain = JSON.parse(record);
      } else {
        this.chain = [this.createGenesisBlock()];
        this.saveChain();
      }
    });
  }

  saveChain() {
    const saveQuery = `UPDATE blockchain SET record=${JSON.stringify(this.chain)};`;
    db.query(saveQuery, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2017", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    this.saveChain();
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports = {
  Block,
  Blockchain,
};
