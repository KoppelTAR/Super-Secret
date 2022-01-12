require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mainRoute = require('./routes/mainRoute');

const app = express();

require('./models/db') // connect to db

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

// initialize session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connection to database
//mongoose.connect('mongodb://localhost:27017/mySuperSecretDB', {useUnifiedTopology: true});

app.use(mainRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});