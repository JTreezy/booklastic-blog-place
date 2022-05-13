const express = require("express");
const router = express.Router();
const {User, Blog, Book, Comment, Genre} = require("../../models");

//find all comments with associated users and blog reviews
router.get("/", (req, res) => {
  Comment.findAll({ 
    include: [User, Blog]
  })
    .then(dbComments => {
      res.json(dbComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one comment with associated user and blog reviews
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id,
    {include: [User, Blog]
  })
    .then(dbComment => {
      res.json(dbComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create commment (must be logged in). associate to user and blog review.
router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please log in first!"})
}
Comment.create({
    body:req.body.body,
    userId:req.session.user.id,
    blogId: req.body.blogId
  })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update comment - not using this route
router.put("/:id", (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedComment => {
    res.json(updatedComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//delete a comment - not using this route
router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(delComment => {
    res.json(delComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

module.exports = router;
