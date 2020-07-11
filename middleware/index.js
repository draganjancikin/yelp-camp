const Campground = require("../models/campground"),
  Comment = require("../models/comment");

// All the middleware goes hereconst
const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if(err){
        res.redirect("back");
      } else {
        // Does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          // render show template with that campground
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err){
        res.redirect("back");
      } else {
        // Does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          // render show template with that comment
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = middlewareObj;
