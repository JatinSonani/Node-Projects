const categorymodels=require('../models/categorymodel')

const categoryPage=(req, res)=>{
return res.render('category/from')
}


const addCategory= async (req, res)=>{
try {

    const {category}=req.body;
    let user=await  categorymodels.create({
        category:category
    })
    return res.redirect('/category/viewcategotypage')
    
    
} catch (error) {
    console.log(error);
    
}
}

const viewcategotypage= async(req, res)=>{

    try {
        let users=await categorymodels.find()
        return res.render('category/viewcategoty',{
            users
        })

    } catch (error) {
        console.log(error);
        
    }
}

const categorydelete=async  (req,res)=>{
     const id=req.query.id;

    await categorymodels.findByIdAndDelete(id);
    return res.redirect('/category/viewcategotypage')
}

const categoryedit = async (req, res)=>{
    try {
        const id=req.query.id;
        let single = await categorymodels.findById(id);
        
        return res.render('category/editcetegory',{
            single
        })
        
    } catch (error) {
        console.log(error)
        return false
        
    }
    
    
    
}

const Categoryupdate= async(req, res)=>{
    try {
        const {category,editid}=req.body
        
        await categorymodels.findByIdAndUpdate(editid,{
            category:category
        })
        
        return res.redirect('/category/viewcategotypage')
        
        

    } catch (error) {
        console.log(error);
        
    }
}



const changeStatus = async (req,res)=>{

    try {
        
        const id =req.query.id;
        const st=req.query.status;
        
        if (st=="active") {
            
            await categorymodels.findByIdAndUpdate(id,{
                status:"deactive"
            })
            return res.redirect('/category/viewcategotypage')
        } else {
            await categorymodels.findByIdAndUpdate(id,{
                status:"active"
            })
            return res.redirect('/category/viewcategotypage')
        }
    } catch (error) {
        console.log(error);
        
    }

}

module.exports={
    categoryPage,addCategory,viewcategotypage,categorydelete,categoryedit,Categoryupdate,changeStatus
}