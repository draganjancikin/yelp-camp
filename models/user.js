const mongoose = require('mongoose'),
      passportLocalMongoose = require("passport-local-mongoose");

// USER Schema setup (username, password)
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

UserSchema.plugin(passportLocalMongoose);

// Schema to be compiled to model and module.exports in same line
module.exports = mongoose.model('User', UserSchema);
