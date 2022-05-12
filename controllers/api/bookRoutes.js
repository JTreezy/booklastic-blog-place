const express = require("express");
const router = express.Router();
const {User, Blog, Book, Comment, Genre} = require("../../models");

//find all
router.get("/", (req, res) => {
  Book.findAll({
    include: [Blog, Genre]
  })
    .then(dbBooks => {
      res.json(dbBooks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
//find one
router.get("/:id", (req, res) => {
  Book.findByPk(req.params.id,{include: [Blog, Genre]})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.post("/findbytitle", (req, res) => {
  Book.findOne({
    where:{
      title:req.body.title
    }
  }).then(foundBook=> {
    if (!foundBook) {
      return res.status(400).json({msg: 'no book by that name'})
    }
    const hbsBook = foundBook.get({plain:true})
    console.log(foundBook)
    console.log('==============')
    console.log(hbsBook)    
    return res.json(hbsBook);
  }).catch(err => {
      console.log(err);
      // res.status(500).json({ msg: "an error occured", err });
    });
});

//create book
router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
}
  Book.create({
    title:req.body.title,
    author:req.body.author,
  })
    .then(newBook => {
      newBook.addGenres(req.body.genreIds)
      res.json(newBook);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update book
router.put("/:id", (req, res) => {
  Book.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedBook => {
    res.json(updatedBook);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//delete a book
router.delete("/:id", (req, res) => {
  Book.destroy({
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
