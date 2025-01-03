const express = require('express');

const port = 9000;

const app = express();

app.set('view engine', 'ejs');

const path = require('path');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

constdb = require('./config/db');
const passport = require('passport');

const passportlocal = require('./config/passportLocal');

const session = require('express-session');

app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use('/', require('./routes/indexRoutes'));
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('server is runing', port);
});