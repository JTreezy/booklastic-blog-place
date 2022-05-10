const express = require('express');
const router = express.Router();
const {User,Blog,Comment, Genre, Book} = require('../../models');
const withAuth = require('../../util/auth');

router.get("/",(req,res)=>{
    Blog.findAll().then(blogs=>{
        console.log(blogs)
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))  //serialize so that handlebars can work with sequelize
        console.log("==========")
        console.log(hbsBlogs)
        const loggedIn = req.session.user?true:false
        res.render("home",{blogs:hbsBlogs,loggedIn,username:req.session.user?.username})
    })
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get('/mylibrary',withAuth, (req, res) => {
    res.render('mylibrary')
})

router.get('/bookclub', (req, res) => {
    res.render('bookclub')
})

router.get('/review', withAuth, (req, res) => {
    res.render('review')
})

router.get("/profile",withAuth,(req,res)=>{
    User.findByPk(req.session.user.id,{
        include:[Blog]
    }).then(userData=>{
        console.log(userData);
        const hbsData = userData.get({plain:true})
        console.log("=======")
        console.log(hbsData);
        hbsData.loggedIn = req.session.user?true:false
        res.render("profile",hbsData)
    })
})

module.exports = router;