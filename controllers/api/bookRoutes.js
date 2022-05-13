const express = require("express");
const router = express.Router();
const {User, Blog, Book, Comment, Genre} = require("../../models");

//find all books with associated blog posts and their genres.
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

//find one book with associated blog posts and genre.
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

//find one book searching by title - with associated blog posts and genre. Post request because being sent title and can't send get request with a req.body? 
router.post("/findbytitle", (req, res) => {
  Book.findOne({
    where:{
      title:req.body.title
    }
  }).then(foundBook=> {
    if (!foundBook) {
      return res.status(404).json({msg: 'no book by that name'})
    }
    const hbsBook = foundBook.get({plain:true})
    return res.json(hbsBook);
  }).catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create book (must be logged in). add genres using many-many relationship
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

//update book - not using this route
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

//delete a book - not using this route
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
