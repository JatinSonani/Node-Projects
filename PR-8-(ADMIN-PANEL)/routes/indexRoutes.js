const express=require('express')

const routes=express.Router()

routes.use('/', require('./authRoutes'))
routes.use('/category', require('./categoryRoutes'))
routes.use('/subcategory', require('./subCategoryRoutes'))
routes.use('/exsubcategory', require('./exSubCategoryRoutes'))
routes.use('/product', require('./productRoutes'))

module.exports=routes