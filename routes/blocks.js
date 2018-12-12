const { Blockchain, Block } = require('./blockchain');

const hungamaCoin = new Blockchain();

var date = new Date();
var timestamp = date.getTime();

module.exports = {
  addBlock: (req, res, next) => {
    /*const user = req.session.user;
    const userId = req.session.userId;

    if (userId == null) {
      res.redirect("/login");
      return;
    }*/

    const userID = req.body.userID
    const rewardedCoins = req.body.rewardedCoins

    //console.log('+++++ USER ID BEFORE ADDIND BLOCK +++++', req);
    //console.log('+++++ USER ID BEFORE ADDIND BLOCK +++++', userID);

    const latestBlock = hungamaCoin.getLatestBlockTransaction();

    //blockchain call
    // get all details from POST form
    

    //hungamaCoin.chain[1].data = {amount : 100};

   //console.log("Is blockchain valid? " + hungamaCoin.isChainValid());
    if (hungamaCoin.isChainValid()) {
      
      hungamaCoin.addBlock(new Block(parseInt(latestBlock[0] + 1), date, { baseCoins : parseInt(latestBlock[1] - rewardedCoins), debitCoins : parseInt(rewardedCoins), user : userID }));
      
      console.log(hungamaCoin.getChainList());
      console.log('+++++ VALID CHAIN +++++');

      res.json({ message: 'OK' });

    } else {
      console.log('+++++ NOT VALID CHAIN +++++');
      res.json({ message: 'NOTOK' });
    }
  }
};
