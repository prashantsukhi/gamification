const fs = require('fs');
const request = require('request');

module.exports = {
    registerPage: (req, res) => {
        res.render('signup/register-user.ejs', {
            title: "Welcome to Hungama | Signup Page"
            , message: ''
        });
    },
    registerUser: (req, res) => {

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let username = req.body.username;
        let password = req.body.password;

        let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username already exists';
                res.render('signup/register-user.ejs', {
                    message,
                    title: "Welcome to Hungama | Signup Page"
                });
            } else {

                // send the player's details to the database
                let query = "INSERT INTO `users` (first_name, last_name, user_name, user_password, points_credited, points_balance) VALUES ('" +
                    first_name + "', '" + last_name + "', '" + username + "', '" + password + "', points_credited+500 , points_balance+500)";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "' AND user_password = '" + password + "'";

                    db.query(usernameQuery, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        if (result.length > 0) {
                            var sess = req.session;  //initialize session variable
                            req.session.userId = result[0].id;
                            req.session.user = result[0];
                            //console.log(' +++++ USER ID +++++' + result[0].id);

                            // make blockchain POST request
                            const requestOptions = {
                                url: 'http://localhost:2000/addBlock',
                                form: { userID: result[0].id, rewardedCoins:4500 },
                            };
                            var message = '';
                            request.post(requestOptions, (error, response, body) => {
                                if (!error && response.statusCode === 200) {
                                    try {
                                        const reply = JSON.parse(body);
                                        if (reply.message === 'OK') {
                                            //console.log('+++++ IS A VALID CHAIN +++++');
                                            res.redirect('/videos');
                                        } else {
                                             message = 'This is not a valid transaction! No enough coins to transact!';

                                            res.render('signup/register-user.ejs', {
                                                title: "Welcome to Hungama | Signup Page"
                                                , message: message
                                            });
                                        }
                                    } catch (parseError) {

                                        message = 'Something went wrong!';

                                        res.render('signup/register-user.ejs', {
                                            title: "Welcome to Hungama | Signup Page"
                                            , message: message
                                        });
                                    }

                                } else {
                                    message = 'Something went wrong!';

                                    res.render('signup/register-user.ejs', {
                                        title: "Welcome to Hungama | Signup Page"
                                        , message: message
                                    });
                                }
                            });
                        }
                    });

                });

            }
        });
    },
    signout: (req, res) => {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    },
    loginPage: (req, res) => {
        res.render('signup/login-user.ejs', {
            title: "Welcome to Hungama | Login Page"
            , message: ''
        });
    },
    loginUser: (req, res) => {

        let message = '';
        let username = req.body.username;
        let password = req.body.password;

        let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "' AND user_password = '" + password + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                var sess = req.session;  //initialize session variable
                req.session.userId = result[0].id;
                req.session.user = result[0];
                console.log(result[0].id);
                res.redirect('/');
            } else {
                message = 'Invalid Credentials';
                res.render('signup/login-user.ejs', {
                    message,
                    title: "Welcome to Hungama | Login Page"
                });
            }
        });
    }
};
