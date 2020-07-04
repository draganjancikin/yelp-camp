const express = require("express"),
  router = express.Router(),
  Campground = require("../models/campground");


// INDEX - show all campgrounds
router.get("/", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
  
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// CREATE - add new campground to DB
router.post("/", isLoggedIn, (req, res) => {
  // take data from form and add to camp groung array
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const author = { id: req.user._id, username: req.user.username };
  const newCampground = { name: name, image: image, author: author, description: description };
  // create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      /* campground.author.id = req.user._id
      campground.author.username = req.user.username; */
      // save comment
      // campground.save();


      // redirect back to campgrounds page
      console.log(newlyCreated);
      res.redirect("campgrounds");
    }
  });
});

// SHOW - show more info about one campground
router.get("/:id", (req, res) => {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;