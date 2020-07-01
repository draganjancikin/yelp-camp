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
router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

// CREATE - add new campground to DB
router.post("/", (req,res) => {
  // take data from form and add to camp groung array
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = { name: name, image: image, description: description };
  // create a new campground and save to DB
  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
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

module.exports = router;