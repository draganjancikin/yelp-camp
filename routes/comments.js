const express = require("express"),
  router = express.Router({mergeParams: true}),
  Campground = require("../models/campground"),
  Comment = require("../models/comment");

// Comments NEW
router.get("/new", isLoggedIn, (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: foundCampground});
    }
  });
}
);

// Comments CREATE
router.post("/", isLoggedIn, (req,res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, foundCampground) => { 
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new Comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          console.log(comment);
          // connect new comment to campground
          foundCampground.comments.push(comment);
          foundCampground.save();
          // redirect to campground show page
          res.redirect("/campgrounds/" + foundCampground._id);
        }
      });
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
