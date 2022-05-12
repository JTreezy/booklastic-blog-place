const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api', apiRoutes)

const frontEnd = require("./frontend");
router.use("/",frontEnd)

router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;