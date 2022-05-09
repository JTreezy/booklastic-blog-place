const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/', apiRoutes)

//when we make a request to the homepage, we'll render the home.handlebars template and inject it into the {{{body}}} in main.handlebars
router.get('/',(req,res)=>{
    
    res.render('home')
})

module.exports = router;