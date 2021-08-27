

// Only let the user access the route if they are authenticated.
function loginRequired(req, res, next) {
  let sess = req.session;
  if (!sess.user){
    return res.redirect("/login");
  }

  next();
  }

  
module.exports = {loginRequired};