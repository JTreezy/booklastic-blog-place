const express = require("express");
const router = express.Router();
const {User, Blog, Book, Comment, Genre} = require("../../models");

//find all
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
//find one
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

//create Blog
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

//update Blog
router.put("/:id", (req, res) => {
  Blog.update(req.body, {
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

//delete a Blog
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
