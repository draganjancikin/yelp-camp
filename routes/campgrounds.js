const express = require("express"),
  router = express.Router(),
  Campground = require("../models/campground"),
  Comment = require("../models/comment");
  
const middleware = require("../middleware");

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
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  // take data from form and add to camp groung array
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const author = { id: req.user._id, username: req.user.username };
  const newCampground = { name: name, price: price, image: image, author: author, description: description };
  // create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      req.flash("success", "New campground: " + newlyCreated.name + " - is created!");
      res.redirect("/campgrounds");
    }
  });
});

// SHOW - show more info about one campground
router.get("/:id", (req, res) => {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
    if (err || !foundCampground) {
      console.log(err);
      req.flash("error", "Cmapground not found!");
      res.redirect("/campgrounds");
    } else {
      // render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// EDIT Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  // is user logged in
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE Campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  // find and update the correct campground
  //req.body.client.name_note = req.sanitize(req.body.client.name_note);
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCcampground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  // Find campground by id
  Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
    if (err) {
      console.log(err);
    } else {
      // before redirect delete comments from campgroundRemoved
      Comment.find( {_id: { $in: campgroundRemoved.comments } }, (err, foundComments) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/campgrounds");
        }
      });
    }
  });
});

// DESTROY ROUTE new way
/* router.delete("/:id", async(req, res) => {
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    res.redirect("/campgrounds");
  } catch (error) {
    console.log(error.message);
    res.redirect("/campgrounds");
  }
}); */

module.exports = router;
