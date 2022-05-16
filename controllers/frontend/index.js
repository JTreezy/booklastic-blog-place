const express = require('express');
const router = express.Router();
const {User,Blog,Comment, Genre, Book} = require('../../models');
const withAuth = require('../../util/auth');


// homepage - find all blogs and associated info. sterilize data for hbs. add logged in and first name variables from req session to pass off to front end. render home hbs template.
router.get("/",(req,res)=>{
    Blog.findAll({
        include: [{model:User}, {model:Book, include: [{model:Genre}]}]
    }).then(blogs=>{
        const hbsBlogs = blogs.map(blog=>blog.get({plain:true})) 
        const loggedIn = req.session.user?true:false
        hbsBlogs.first_name = req.session.user?.first_name;
        res.render("home",{blogs:hbsBlogs,loggedIn,first_name:req.session.user?.first_name}) 
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    });
})

// login page render login hbs template. if already logged in, redirect to their library. 
router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/mylibrary")  
    }
    res.render("login")
})

// mylibrary is a page of my own blog posts. if logged in (withAuth), find user by user.id in session. render mylibrary hbs template, pass off data from user req with loggedin and first name
router.get('/mylibrary',withAuth, (req, res) => {
    User.findByPk(req.session.user.id, {
        include: [{model:Blog, include: [{model:Book, include: [Genre]}]}]
    }).then(userData => {
        const hbsData = userData.get({plain:true})
        hbsData.loggedIn = req.session.user?true:false
        hbsData.first_name = req.session.user?.first_name;
        res.render("mylibrary", hbsData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    });
})

// review page - if logged in (withAuth). pass off logged in and first name data. render review hbs template.
router.get('/review', withAuth, (req, res) => {
    const passoffData = {};
    passoffData.loggedIn = req.session.user?true:false;
    passoffData.first_name = req.session.user?.first_name;
    res.render('review', passoffData)
})

// newbook page. if logged in (withAuth). pass off logged in and first name data. render review hbs template.
router.get('/newbook', withAuth, (req, res) => {
    const passoffData = {};
    passoffData.loggedIn = req.session.user?true:false;
    passoffData.first_name = req.session.user?.first_name;
    res.render('newbook', passoffData)
})

// bookclub page - if logged in (withAuth). pass off logged in and first name data. render bookclub hbs template.
router.get('/bookclub', withAuth, (req, res) => {
    const passoffData = {};
    passoffData.loggedIn = req.session.user?true:false;
    passoffData.first_name = req.session.user?.first_name;
    res.render('bookclub', passoffData)
})

// find my selected blog post by id. withAuth must be logged in. Include associated data. check if post belongs to user by session id. if not, send forbidden status code and redirect back to their library. if they are the creator, sterilize the data for hbs and render the update template. pass off data including logged in and firstname
router.get('/blogs/:id', withAuth, (req, res) => {
    Blog.findByPk(req.params.id, {
        include: [User, Comment, {model: Book, include: [Genre]}]
      })
        .then(thisBlog => {
        if (thisBlog.userId != req.session.user?.id) {
            res.status(403).json({ msg: "Oops! This isn't your post to edit.", err });
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

// comments page - find blog that was selected by id. must be logged in. find associated information. sterilize blog data. render comment hbs template and pass off data including logged in and firstname
router.get('/reviewcomments/:id', withAuth, (req,res) => {
    Blog.findByPk(req.params.id, {
        include: [User, {model: Comment, include: [User]}, {model: Book, include: [Genre]}]
    })
    .then(thisBlog => {
        const hbsBlog = thisBlog.get({plain:true})
        hbsBlog.loggedIn = req.session.user?true:false;
        hbsBlog.first_name = req.session.user?.first_name;
        res.render('comment', hbsBlog)
    })
})

// router.get('*', (req, res) => {
//     res.redirect("/mylibrary")
// })

module.exports = router;