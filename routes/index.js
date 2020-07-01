const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");
  
// Root route
router.get("/", (req, res) => {
  res.render("landing");
});

// AUTH ROUTES ---------------------------------------

// Show register form
router.get("/register", (req, res) => {
  res.render("register");
});

// handling user sign up
router.post("/register", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register( newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    } 
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds");
    });
  });
})

// Login routes --------------------------------------
// render login form
router.get("/login", (req, res) => {
  res.render("login");
});

// login logic
// middleware
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  (req, res) => {
  }
);

// Logout route ----------------------------------------
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});


// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// 404 Page
/* router.get("*", (req, res) => {
  res.send("404 Page not Found!");
});
 */
module.exports = router;