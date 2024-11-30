const express=require('express');

const port=9001;

const app=express();


app.set('view engine', 'ejs');
let path=require('path')

const passport=require('passport')

const passportlocal=require('./config/passportlocal')

const session = require('express-session');

app.use(session({
    secret: 'nikhil',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setUser);
app.use(express.urlencoded())


app.use('/',express.static(path.join(__dirname,'/public')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/',require('./routes/blogRoutes'));

const db = require('./config/db');

app.listen(port,(err)=>{
    if (err) {
        console.log(err);
    }
    console.log(`Server is Running on port :- ${port}`);
});