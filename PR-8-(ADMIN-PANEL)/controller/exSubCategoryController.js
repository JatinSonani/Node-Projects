
const categorymodels=require('../models/categorymodel')
const subcategorymodels=require('../models/subcategorymodels')
const exsubcategorymodels=require('../models/exsubcategorymodels')

const exsubcategortypage=async(req, res)=>{
try {
    const exsucategory=await exsubcategorymodels.find({}).populate('categoryid').populate('subcategoryid')
    return res.render('exsubcategory/viewexsubcat',{
        exsucategory
    })
    
} catch (error) {
        console.log(error);
        return false
}
}
const addexsubcategortypage=async(req, res)=>{
try {
    const category=await categorymodels.find({status:'active'})
    const subcategory=await subcategorymodels.find({status:'active'})
    return res.render('exsubcategory/addexsubcat',{
        category,subcategory
    })

} catch (error) {
    console.log(error);
    return false
}
}

const exsubaddCategory=async(req, res)=>{

    try {
        const {category,subcategory,exsubcategory}=req.body;
        
        let id=   await exsubcategorymodels.create({
            categoryid:category,subcategoryid:subcategory,
        exsubcategory:exsubcategory
        })
        return res.redirect('/exsubcategory/addexsubcategortypage')
    } catch (error) {
        console.log(error);
        return false
    }
    
}


const exsubcategoryedit=async(req, res)=>{
try {
    const id=req.query.id

    
    const category=await categorymodels.find({status:'active'})
    const subcategory=await subcategorymodels.find({status:'active'})
    const exsubcategory=await exsubcategorymodels.find({status:'active'})
    const single=await exsubcategorymodels.findById(id).populate('categoryid').populate('subcategoryid')
    
    return res.render('exsubcategory/editexsubcat',{
     category ,subcategory, single,exsubcategory
    })
    
} catch (error) {
    console.log(error);
    return false
}
}
const updateexsubCategory=async(req, res)=>{
try {
    const {editid,category,subcategory,exsubcategory}=req.body
    await exsubcategorymodels.findByIdAndUpdate(editid,{
        categoryid:category,
        subcategoryid:subcategory,
        exsubcategory:exsubcategory,
    })
    return res.redirect('/exsubcategory/exsubcategortypage')
    
} catch (error) {
    
    console.log(error);
    
}
}

const exsubcategorydelete=async(req, res)=>{

    try {
        const id=req.query.id
        await exsubcategorymodels.findByIdAndDelete(id);

        return res.redirect('/exsubcategory/exsubcategortypage')
    } catch (error) {

        console.log(error);
        return false
    }
}

const changstatus=async(req, res)=>{
    try {
        let id=req.query.id
        let st=req.query.status
        
        if (st=="active") {
            
            await exsubcategorymodels.findByIdAndUpdate(id,{
                status:"deactive"
            })
            
        }else{
            await exsubcategorymodels.findByIdAndUpdate(id,{
                status:"active"
            })
        }
        return res.redirect('/exsubcategory/exsubcategortypage')
    
    } catch (error) {
        console.log(error);
        return false
        
    }
}

const ajaxcategory=async(req, res)=>{
try {
 const id=req.query.id;
 
 const category=await subcategorymodels.find({categoryid:id})
 console.log(category);
return res.send({
    success:true,
    message:'hali gayu',
    category
})
 
    
} catch (error) {
    console.log(error);
    return false
}
}

module.exports={
    exsubcategortypage,addexsubcategortypage,exsubaddCategory,exsubcategoryedit,exsubcategorydelete,updateexsubCategory,changstatus,ajaxcategory

}