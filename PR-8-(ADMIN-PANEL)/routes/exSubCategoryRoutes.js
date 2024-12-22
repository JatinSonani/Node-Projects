const express=require('express')

const routes=express.Router()

const { exsubcategortypage, addexsubcategortypage, exsubaddCategory, exsubcategoryedit, exsubcategorydelete, changstatus, updateexsubCategory, ajaxcategory } = require('../controller/exSubCategoryController')

 routes.use('/exsubcategortypage',exsubcategortypage)
 routes.use('/addexsubcategortypage',addexsubcategortypage)
 routes.post('/exsubaddCategory',exsubaddCategory)
routes.get('/exsubcategoryedit',exsubcategoryedit)
routes.get('/exsubcategorydelete',exsubcategorydelete)
routes.post('/updateexsubCategory',updateexsubCategory)
routes.get('/changstatus',changstatus)
routes.get('/ajaxcategory',ajaxcategory)
 module.exports=routes