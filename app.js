const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const app = express();

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

const { getHomePage } = require('./routes/index');
const { getVideoPage, getVideo, getHlsUrl, getStreamVideo } = require('./routes/videos');
const { addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage } = require('./routes/player');
const { loginPage, loginUser, registerPage, registerUser, signout } = require('./routes/signup');
const { addBlock } = require('./routes/blocks');

const port = 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

//additional routes
app.get('/login', loginPage);
app.get('/signup', registerPage);
app.post('/login', loginUser);
app.post('/signup', registerUser);
app.get('/signout', signout);
app.post('/addBlock', addBlock);
app.get('/videos', getVideoPage);
app.get('/videos/:id', getVideo);
app.get('/api/videos/:id', getHlsUrl);
app.get('/api/stream/:id', getStreamVideo);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
