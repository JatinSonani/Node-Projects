const usermodels = require('../models/usermodels')
const blogmodels = require('../models/view')
const fs = require('fs')
const resiterpage = (req, res) => {
    return res.render('register')

}
const loginpage = (req, res) => {
    if(req.cookies['auth']){
        return res.redirect('/view')
    }
   return res.render('login')
}

const registerusers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(req.body);
        await usermodels.create({
            name: name, email: email, password: password
        })
        return res.redirect('/')

    } catch (error) {
        console.log(err);
        return false
    }

}

const loginuseres = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await usermodels.findOne({ email: email });
        console.log(user);

        if (!user || user.password != password) {

            console.log(`Email and Password not valid`);
            return res.redirect('/')
        }
        res.cookie('auth',user)
        return res.redirect('/view')
    } catch (error) {
        console.log(error);
        return false

    }
}

const addblogpage = async (req, res) => {

    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    return res.render('add')
}

const addblogusers = async (req, res) => {

    try {
        if(!req.cookies['auth']){
            return res.redirect('/')
        }
        const { title, desc } = req.body
        await blogmodels.create({
            title,
            desc,
            image: req.file.path
        })
        return res.redirect('/view')

    } catch (error) {
        console.log(error);
        return false

    }
}
const viewblog = async (req, res) => {
    try {
        if(!req.cookies['auth']){
            return res.redirect('/')
        }

        let blogs = await blogmodels.find({})
        return res.render('view', {
            blogs
        })

    } catch (error) {
        console.log(error);
        return false

    }
}

const deleterecord = async (req, res) => {
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    try {


        let id = req.query.id

        let single = await blogmodels.findById(id)
        fs.unlinkSync(single.image)

        await blogmodels.findByIdAndDelete(id)
        return res.redirect('/view')
    } catch (error) {
        console.log(error);

    }
}

const editrecord = async (req, res) => {
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    try {
        let id = req.query.id;
        let single = await blogmodels.findById(id);
        return res.render('editblog', {
            single
        })

    } catch (error) {
        console.log(error);

    }
}

const upblog = async (req, res) => {
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    try {

        const { editid, title, desc } = req.body

        if (req.file) {
            let single = await blogmodels.findById(editid)
            fs.unlinkSync(single.image)

            await blogmodels.findByIdAndUpdate(editid, {
                title, desc,
                image: req.file.path
            })
            return res.redirect('/view')

        } else {
            let single = await blogmodels.findById(editid)

            await blogmodels.findByIdAndUpdate(editid, {
                title, desc,
                image: single.image
            })
            return res.redirect('/view')

        }

    } catch (error) {
        console.log(Error);

    }

}
const editblog = (req,res) => {
    if(!req.cookies['auth']){
        return res.redirect('/')
    }
    res.render('editblog');  
}

const readmore= async(req, res)=>{

    try {
        console.log(req.query.id);

        let id=req.query.id
        const users= await  blogmodels.findById(id)

        console.log(users);
        
        return res.render('readmore',{
users
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
}

const logout = (req, res)=>{

    return res.clearCookie('auth').redirect('/');

}

module.exports = {
    resiterpage,
    loginpage,
    registerusers,
    loginuseres,
    addblogpage,
    addblogusers,
    viewblog,
    logout,
    deleterecord,
    editblog,
    editrecord,
    upblog,
    readmore
}