const Campground = require("../models/campground"),
  Comment = require("../models/comment");

// All the middleware goes hereconst
const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // add flash code
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err || !foundCampground) {
        req.flash("error", "Campground not found!");
        res.redirect("back");
      } else {
        // Does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          // render show template with that campground
          next();
        } else {
          req.flash("error", "You don't permission to do thet!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to edit Campground!");
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err || !foundComment) {
        req.flash("error", "Comment not found!");
        res.redirect("back");
      } else {
        // Does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          // render show template with that comment
          next();
        } else {
          req.flash("error", "You don't permission to do thet!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to edit Comment!");
    res.redirect("back");
  }
}

module.exports = middlewareObj;
