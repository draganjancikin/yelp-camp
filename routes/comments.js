const express = require("express"),
  router = express.Router({mergeParams: true}),
  Campground = require("../models/campground"),
  Comment = require("../models/comment");

const middleware = require("../middleware");

// Comments NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
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
router.post("/", middleware.isLoggedIn, (req,res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, foundCampground) => { 
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create new Comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash("error", "Something went wrong!");
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
          req.flash("success", "Successfully added comment!");
          res.redirect("/campgrounds/" + foundCampground._id);
        }
      });
    }
  });
});

// EDIT Comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err || !foundCampground) {
      req.flash("error", "Campground not find!")
      return res.redirect("back");
    }
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
});

// UPDATE Comment route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
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

// DESTROY Comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  // Find comment by id
  Comment.findByIdAndRemove(req.params.comment_id, (err, commentRemoved) => {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;
