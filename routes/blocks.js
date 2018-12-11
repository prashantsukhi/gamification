const hungamaCoin = require('blocks'); 

module.exports = {
    addBlock: (req, res) => {

	var user =  req.session.user,
	userId = req.session.userId;
	
	if(userId == null){
		res.redirect("/login");
		return;
	}

	//blockchain call
	//let hungamaCoin = new Blockchain();
	hungamaCoin.addBlock(new Block(1, "10/07/2017", {amount: 4}));
	hungamaCoin.addBlock(new Block(2, "12/07/2017", {amount: 10}));

	console.log('Is blockchain valid? ' + hungamaCoin.isChainValid());

	//hungamaCoin.chain[1].data = {amount : 100};

	console.log('Is blockchain valid? ' + hungamaCoin.isChainValid());

	//console.log(JSON.stringify(hungamaCoin, null, 4));


    },
};