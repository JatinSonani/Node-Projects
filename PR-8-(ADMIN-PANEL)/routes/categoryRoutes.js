const express=require('express')

const routes=express.Router()

const { categoryPage, addCategory, viewcategotypage, categorydelete, categoryedit, Categoryupdate, changeStatus } = require('../controller/categorycontroller')


const passport=require('passport')

routes.get('/categoryPage',passport.checkUser,categoryPage)
routes.post('/addCategory',addCategory)
routes.get('/viewcategotypage', passport.checkUser,viewcategotypage)
routes.get('/categorydelete',categorydelete)
routes.get('/categoryedit',categoryedit)
routes.post('/editCategory',Categoryupdate)
routes.get('/changeStatus',changeStatus)
 module.exports=routes