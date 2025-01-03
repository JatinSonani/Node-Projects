const express=require('express');

const port=8001;

const app=express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');

const cookieParser = require('cookie-parser');

let path=require('path');

app.use(cookieParser())

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