// ==================================================
// SETUP
// ==================================================

const express     = require("express"),
      app         = express(),
      port        = 3000,
      bodyParser  = require("body-parser"),
      mongoose    = require('mongoose'),
      passport    = require("passport"),
      LocalStrategy = require("passport-local"),
      Campground  = require("./models/campground"),
      Comment = require("./models/comment"),
      User = require("./models/user.js"),
      seedDB      = require("./seeds");   
      
// Requiring routes
const commentsRoutes = require("./routes/comments.js"),
  campgroundsRoutes  = require("./routes/campgrounds.js"),
  indexRoutes        = require("./routes/index.js");
      
mongoose.connect('mongodb://localhost:27017/yelp_camp_6', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// tell express to use files in public folder
app.use(express.static(__dirname + "/public"));

seedDB();

// Passport configuration ---------------------
app.use(require("express-session")({
  secret: "Yelp Camp Secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

app.listen(port, () => console.log(`The YelpCamp Server Has Started on Port ${port}!`));
