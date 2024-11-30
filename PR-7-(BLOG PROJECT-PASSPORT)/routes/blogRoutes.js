const express = require('express');

const routes = express.Router();

const { loginpage, resiterpage, registerusers, loginuseres, addblogpage, addblogusers, viewblog, deleterecord, editrecord, upblog, editblog, logout , readmore } = require('../controllers/BlogController');

const multer = require('multer');

const passport = require('passport');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage }).single('image')

routes.get('/', loginpage);
routes.get('/register',resiterpage); 
routes.post('/insert',registerusers)
routes.post('/login',passport.authenticate('local',{failureRedirect:'/'}),loginuseres)
routes.get('/addblogpage',passport.checkUser,addblogpage); 
routes.post('/add',upload,addblogusers)
routes.get('/view',passport.checkUser,viewblog);    
routes.get('/delete',deleterecord); 
routes.get('/edit',editrecord); 
routes.post('/up',upload,upblog);
routes.get('/editblog',passport.checkUser,editblog);
routes.get('/readmore',readmore);
routes.get('/logout',logout);

module.exports = routes;