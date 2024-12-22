const express=require('express')

const routes=express.Router()

const { addsubcategorypage, subaddCategory, viewsubcategotypage,subcategoryedit, editsubCategory, changstatus, subcategorydelete } = require('../controller/subCategoryController')

 routes.get('/addsubcategorypage',addsubcategorypage)
 routes.post('/subaddCategory',subaddCategory)
 routes.get('/viewsubcategotypage',viewsubcategotypage)
 routes.get('/subcategoryedit',subcategoryedit)
 routes.post('/editsubCategory',editsubCategory)
 routes.post('/editsubCategory',editsubCategory)
 routes.get('/changstatus',changstatus)
 routes.get('/subcategorydelete',subcategorydelete)
 
 module.exports=routes