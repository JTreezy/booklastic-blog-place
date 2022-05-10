const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api', apiRoutes)

const frontEnd = require("./frontend");
router.use("/",frontEnd)

//when we make a request to the homepage, we'll render the home.handlebars template and inject it into the {{{body}}} in main.handlebars
router.get('/',(req,res)=>{
    res.render('home')
})



// router.get("/setfaveanimal/:faveanimal",(req,res)=>{
//     req.session.favAnimal = req.params.faveanimal;
//     console.log(req.session);
//     res.json(req.session);
// })

// router.get("/secretclub",(req,res)=>{
//     if(!req.session.user){
//         return res.status(401).json({msg:"ya gotta login to join the club!"})
//     }
//     res.json({msg:`welcome to the club ${req.session.user.username}`})
// })

router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;