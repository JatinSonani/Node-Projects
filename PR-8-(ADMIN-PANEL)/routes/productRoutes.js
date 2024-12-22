const express=require('express')
const {  productpage, addproduct, ajaxcategory, insertrecord, productdelete, productedit, updateproduct, changstatus } = require('../controller/productcontroller')

const routes=express.Router()

const multer=require('multer')

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

routes.get('/productpage',productpage);
routes.get('/addproduct',addproduct);
routes.post('/insertrecord',upload,insertrecord)
routes.get('/productdelete',productdelete)
routes.get('/productedit',productedit)
routes.post('/updateproduct',upload,updateproduct)
routes.get('/changstatus',changstatus)
routes.get('/ajaxcategory',ajaxcategory);

module.exports=routes