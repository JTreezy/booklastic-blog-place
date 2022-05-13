const express = require("express");
const router = express.Router();
const {User,Blog,Comment} = require("../../models/");
const bcrypt  = require("bcrypt");

// get session object
router.get('/sessionID', (req, res) => {
  console.log(req.sessionID)
  const sessionObj = {
    sessionID: req.sessionID,
    userName: req.session.user.first_name
  } 
  res.json(sessionObj)
})

//find all users with associated blogs and comments
router.get("/", (req, res) => {
  User.findAll({
    include:[Blog, Comment]
  })
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// logout
router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect("/")
})

//find one user by user id
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id,{})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//create new user. run hooks (pw bcrpyt). create user session upon creation to automatically log them in.
router.post("/", (req, res) => {
  User.create(req.body, {individualHooks: true})
    .then(newUser => {
      req.session.user = {
        id:newUser.id,
        first_name:newUser.first_name,
        email:newUser.email
      }
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//login user; find one user by email address. if not found (or password incorrect with bcrypt compare) send 400 bad request (client error). if successful, create session for user.
router.post("/login", (req, res) => {
  User.findOne({
    where:{
    email:req.body.email
  }
}).then(foundUser=>{
    if(!foundUser){
      return res.status(400).json({msg:"wrong login credentials"})
    }
    if(bcrypt.compareSync(req.body.password,foundUser.password)){
      req.session.user = {
        id:foundUser.id,
        first_name:foundUser.first_name,
        email:foundUser.email
      }
      return res.json(foundUser)
    } else {
      return res.status(400).json({msg:"wrong login credentials"})
    }
  }).catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update user - not using this route
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedUser => {
    res.json(updatedUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//delete a user - not using this route
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(delUser => {
    res.json(delUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});


module.exports = router;
