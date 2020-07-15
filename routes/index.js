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
      req.flash("error", err.message);
      return res.render("register");
    } 
    passport.authenticate("local")(req, res, () => {
      req.flash("success", "Welcome to YelpCamp " + user.username);
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
    successFlash: 'Welcome to YelpCamp!',
    successRedirect: "/campgrounds",
    failureFlash: 'Invalid username or password.',
    failureRedirect: "/login"
  }),
  (req, res) => {
  }
);

// Logout route ----------------------------------------
router.get("/logout", (req, res) => {
  req.logout();
  // add flash code
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

// 404 Page
/* router.get("*", (req, res) => {
  res.send("404 Page not Found!");
});
 */

module.exports = router;
