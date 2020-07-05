const comment = require("../models/comment");

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
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
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

// EDIT Comment route
router.get("/:comment_id/edit", (req, res) => {
  // is user logged in
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("comments/edit", { campground_id: req.params.id , comment: foundComment });
    }
  });
});

// UPDATE Comment route
router.put("/:comment_id", (req, res) => {
  // find and update the correct comment
  //req.body.client.name_note = req.sanitize(req.body.client.name_note);
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
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
