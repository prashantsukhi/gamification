const { Blockchain, Block } = require('./blockchain');

const hungamaCoin = new Blockchain();

module.exports = {
  addBlock: (req, res, next) => {
    const user = req.session.user;
    const userId = req.session.userId;

    if (userId == null) {
      res.redirect("/login");
      return;
    }

    //blockchain call
    hungamaCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
    hungamaCoin.addBlock(new Block(2, "12/07/2017", { amount: 10 }));

    console.log("Is blockchain valid? " + hungamaCoin.isChainValid());
    if (hungamaCoin.isChainValid()) {
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'NOT OK' });
    }
  }
};
