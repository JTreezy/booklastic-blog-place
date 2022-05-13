const express = require("express");
const router = express.Router();
const {User, Blog, Book, Comment, Genre} = require("../../models");

//find all blog reviews with associated user, comments, and book info
router.get("/", (req, res) => {
  Blog.findAll({ 
    include: [User, Comment, {model: Book, include: [Genre]}]
  })
    .then(dbBlogs => {
      res.json(dbBlogs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one blog review with associated user, comments, and book info
router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id, {
    include: [User, Comment, {model: Book, include: [Genre]}]
  })
    .then(dbBlog => {
      res.json(dbBlog)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create blog review; pull user id from session and pull book id from page. must be logged in to post. 
router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please log in first!"})
}
  Blog.create({
    title:req.body.title,
    review:req.body.review,
    bookId: req.body.bookId,
    userId:req.session.user.id
  })
    .then(newBlog => {
      res.json(newBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update blog review post - title or review. find post to update via id from query params. 
router.put("/:id", (req, res) => {
  Blog.update({
    title: req.body.title,
    review: req.body.review
  }, {
    where: {
      id: req.params.id
    }
  }).then(updatedBlog => {
    res.json(updatedBlog);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//delete a blog review
router.delete("/:id", (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id
    }
  }).then(delBlog => {
    res.json(delBlog);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

module.exports = router;
