const SHA256 = require('crypto-js/sha256');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

var date = new Date();
var timestamp = date.getTime();

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.calculateHash = this.calculateHash.bind(this);
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

      //console.log('Record else 1 -----' , result);

      if (result.length > 0){
        const record = result[0].record;
        //console.log('Record printed -----' , record);
        if (record) {
          //this.chain = JSON.parse(record);
          this.chain = JSON.parse(record).map(b=>new Block(b.index, b.timestamp, b.data, b.previousHash));
          console.log(this.chain);
          //console.log('+++++ CHAIN LENGTH +++++', this.chain.length);
        } else {
          this.chain = [this.createGenesisBlock()];
          //console.log('Record prashant -----' , record);
          this.saveChain();
        }
      } else {
        //console.log('Record else -----' , result);
        this.chain = [this.createGenesisBlock()];
        //console.log(JSON.stringify(this.chain));
        this.saveChain();
      }
    });
  }

  saveChain() {
    const saveQuery = "UPDATE blockchain SET record='"+JSON.stringify(this.chain)+"' WHERE id=1";
    //console.log(saveQuery);
    db.query(saveQuery, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  createGenesisBlock() {
    return new Block(0, date, { baseCoins : 10000, debitCoins : 0, user : 0 }, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    //console.log('+++++ NEW BLOCK +++++', newBlock);

    newBlock.previousHash = this.getLatestBlock().hash;

    //console.log('+++++ NEW BLOCK PH +++++', newBlock.previousHash);

    newBlock.hash = newBlock.calculateHash();

    //console.log('+++++ NEW BLOCK H +++++', newBlock.hash);

    this.chain.push(newBlock);
    this.saveChain();
  }

  isChainValid() {
    
    //console.log(this.chain);

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      //console.log('+++++ isChainValid +++++');
      //console.log(this.chain);

      //console.log('***** CB BASE COINS', currentBlock.data.baseCoins);

      //console.log('***** CBH', currentBlock.calculateHash());

      //console.log('***** CB REWARDS COINS', currentBlock.data.debitCoins);

      if (currentBlock.data.baseCoins < currentBlock.data.debitCoins) {
        return false;
      }


      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  getLatestBlockTransaction() {
    const latestBlock = this.chain[this.chain.length - 1];
    const blockArr = [latestBlock.index, latestBlock.data.baseCoins];
    //console.log('+++++ LATEST BLOCK +++++', latestBlock);
    //console.log('+++++ LATEST BLOCK COIN +++++', latestBlock.data.baseCoins);
    return blockArr;
  }

  getChainList() {
    return this.chain;
  }
}

module.exports = {
  Block,
  Blockchain,
};
