const categorymodels=require('../models/categorymodel');
const subcategorymodels=require('../models/subcategorymodels');

const addsubcategorypage=async(req, res)=>{

try {

let category=await categorymodels.find({status:'active'});

return res.render('subcategory/addsubcategory',{
    category:category
});

} catch (error) {
    console.log(error);
    return false
}
}

const subaddCategory=async(req, res)=>{
    try {
        const {category,subcategory}=req.body
        await subcategorymodels.create({
            categoryid:category,
            subcategory:subcategory
            
        })
        
        return res.redirect('/subcategory/addsubcategorypage')
        
    } catch (error) { 
        console.log(error);
        return false
    }
}
const viewsubcategotypage=async (req, res)=>{
    try {
        const subcategory=await subcategorymodels.find({}).populate('categoryid')
        return res.render('subcategory/viewsubcategory',{
            subcategory
        })
        
    } catch (error) {
        console.log(error);
        return false
    }
}

const subcategorydelete=async(req, res)=>{
try {
    const id=req.query.id
    await subcategorymodels.findByIdAndDelete(id);
    return res.redirect('/subcategory/viewsubcategotypage')
} catch (error) {

    console.log(error);
    return false
}}
const subcategoryedit=async (req, res)=>{

    try {
        const id=req.query.id;
        const category=await categorymodels.find({status:'active'})
        const single=await subcategorymodels.findById(id).populate('categoryid')
    
        return res.render('subcategory/editsubcategory',{
            single,category
        })
    } catch (error) {
        console.log(error);
        return false
    }  
}

const editsubCategory=async(req, res)=>{

const {editid,category,subcategory }=req.body

await subcategorymodels.findByIdAndUpdate(editid,{
    categoryid:category,
    subcategory:subcategory

})
return res.redirect('/subcategory/viewsubcategotypage')
}

const changstatus=async(req,res)=>{
    
    try {
        let id=req.query.id
        let st=req.query.status
        
        if (st=="active") {
            
            await subcategorymodels.findByIdAndUpdate(id,{
                status:"deactive"
            })
            
        }else{
            await subcategorymodels.findByIdAndUpdate(id,{
                status:"active"
            })
        }
        return res.redirect('/subcategory/viewsubcategotypage')
    
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports={
    addsubcategorypage,subaddCategory,viewsubcategotypage,subcategoryedit,editsubCategory,changstatus,subcategorydelete
}
