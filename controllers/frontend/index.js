const express = require('express');
const router = express.Router();
const {User,Blog,Comment, Genre, Book} = require('../../models');
const withAuth = require('../../util/auth');

router.get("/",(req,res)=>{
    Blog.findAll({
        include: [{model:User}, {model:Book, include: [{model:Genre}]}]
    }).then(blogs=>{
        // console.log(blogs)
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true})) 
        console.log("==========")
        console.log(hbsBlogs)
        console.log('===========')
        console.log('success')
        const loggedIn = req.session.user?true:false
        res.render("home",{blogs:hbsBlogs,loggedIn,username:req.session.user?.username}) 
    })
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/mylibrary")  
    }
    res.render("login")
})

router.get('/mylibrary',withAuth, (req, res) => {
    User.findByPk(req.session.user.id, {
        include: [{model:Blog, include: [{model:Book, include: [Genre]}]}]
    }).then(userData => {
        const hbsData = userData.get({plain:true})
        hbsData.loggedIn = req.session.user?true:false
        console.log(hbsData)
        console.log('===========')
        // TODO: PARSE FOR NESTED GENRE-NAME IF EXIST, USERNAME IF NEEDED??? ON THEIR OWN PAGE, SO USERNAME NOT NECESSARY
        res.render("mylibrary", hbsData)
    })
})

router.get('/review', withAuth, (req, res) => {
    // pass off "logged in"
    res.render('review')
})


// to get the images to run on the page


module.exports = router;