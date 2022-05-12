const express = require('express');
const router = express.Router();
const {User,Blog,Comment, Genre, Book} = require('../../models');
const withAuth = require('../../util/auth');

router.get("/",(req,res)=>{
    Blog.findAll({
        include: [{model:User}, {model:Book, include: [{model:Genre}]}]
    }).then(blogs=>{
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true})) 
        console.log("==========")
        console.log(hbsBlogs)
        console.log('===========')
        console.log(hbsBlogs[0])
        console.log('===========')
        console.log(hbsBlogs[0].book)
        console.log('===========')
        console.log(hbsBlogs[0].book.genres)
        console.log('===========')
        console.log(hbsBlogs[0].book.genres[0].name)
        const loggedIn = req.session.user?true:false
        hbsBlogs.first_name = req.session.user?.first_name;
        res.render("home",{blogs:hbsBlogs,loggedIn,first_name:req.session.user?.first_name}) 
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    });
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
        hbsData.first_name = req.session.user?.first_name;
        // console.log(hbsData)
        // console.log('===========')
        // TODO: PARSE FOR NESTED GENRE-NAME IF EXIST, USERNAME IF NEEDED??? ON THEIR OWN PAGE, SO USERNAME NOT NECESSARY
        res.render("mylibrary", hbsData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    });
})

router.get('/review', withAuth, (req, res) => {
    const passoffData = {};
    passoffData.loggedIn = req.session.user?true:false;
    passoffData.first_name = req.session.user?.first_name;
    res.render('review', passoffData)
})

router.get('/newbook', withAuth, (req, res) => {
    const passoffData = {};
    passoffData.loggedIn = req.session.user?true:false;
    passoffData.first_name = req.session.user?.first_name;
    res.render('newbook', passoffData)
})

router.get('/bookclub', withAuth, (req, res) => {
    const passoffData = {};
    passoffData.loggedIn = req.session.user?true:false;
    passoffData.first_name = req.session.user?.first_name;
    res.render('bookclub', passoffData)
})

router.get('/blogs/:id', withAuth, (req, res) => {
    Blog.findByPk(req.params.id, {
        include: [User, Comment, {model: Book, include: [Genre]}]
      })
        .then(thisBlog => {
        if (thisBlog.userId != req.session.user?.id) {
            alert(`Oops! Looks like this isn't your post to edit.`)
            return res.redirect("/mylibrary") 
        }
          const hbsBlog = thisBlog.get({plain:true})
          hbsBlog.loggedIn = req.session.user?true:false;
          hbsBlog.first_name = req.session.user?.first_name;
          res.render('update', hbsBlog)
        })
        .catch(err => {
          console.log(err);
          res.status(500).redirect("/mylibrary");
        });
})

router.get('/reviewcomments/:id', withAuth, (req,res) => {
    Blog.findByPk(req.params.id, {
        include: [User, {model: Comment, include: [User]}, {model: Book, include: [Genre]}]
    })
    .then(thisBlog => {
        const hbsBlog = thisBlog.get({plain:true})
        console.log(hbsBlog)
        console.log('===================')
        console.log(hbsBlog.comments)
        console.log(hbsBlog.comments[0].user.first_name)
        console.log(hbsBlog.comments[0].body)
        hbsBlog.loggedIn = req.session.user?true:false;
        hbsBlog.first_name = req.session.user?.first_name;
        res.render('comment', {hbsBlog})
    })
})

router.get('*', (req, res) => {
    res.redirect("/mylibrary")
})

module.exports = router;