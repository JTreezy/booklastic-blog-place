const withAuth = (req, res, next) => {
    if (!req.session.user) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
module.exports = withAuth;
  
// withauth function checks if user is logged in; redirects to login page if not