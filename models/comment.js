const mongoose = require('mongoose');

// Schema setup
const commentSchema = new mongoose.Schema({
  text: String, 
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String 
  }
});

// schema to be compiled to model 
/* const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground; */

// Schema to be compiled to model and module.exports in same line
module.exports = mongoose.model('Comment', commentSchema);
