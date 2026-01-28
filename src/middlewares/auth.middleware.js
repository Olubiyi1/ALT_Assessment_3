export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(); // user is logged in
  }
  // redirect to login form
  res.redirect("/user/login-page"); 
};
