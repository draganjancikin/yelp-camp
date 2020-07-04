const mongoose = require('mongoose');

// Schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String, 
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String 
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
});

// schema to be compiled to model 
/* const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground; */

// Schema to be compiled to model and module.exports in same line
module.exports = mongoose.model('Campground', campgroundSchema);
