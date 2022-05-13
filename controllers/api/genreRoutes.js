const express = require("express");
const router = express.Router();
const {User, Blog, Book, Comment, Genre} = require("../../models");

//find all genres with associated books
router.get("/", (req, res) => {
  Genre.findAll({ 
    include: [Book]
  })
    .then(dbGenres => {
      res.json(dbGenres);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//find one genre with assoicated books
router.get("/:id", (req, res) => {
  Genre.findByPk(req.params.id,
    {include: [Book]
  })
    .then(dbGenre => {
      res.json(dbGenre);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create genre - must be logged in
router.post("/", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please log in first!"})
}
  Genre.create({
    name:req.body.name,
  })
    .then(newGenre => {
      res.json(newGenre);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update genre - not using this route
router.put("/:id", (req, res) => {
  Genre.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedGenre => {
    res.json(updatedGenre);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//delete a genre - not using this route
router.delete("/:id", (req, res) => {
  Genre.destroy({
    where: {
      id: req.params.id
    }
  }).then(delGenre => {
    res.json(delGenre);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

module.exports = router;
