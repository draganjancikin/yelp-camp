// Setup =======================================================================

const express    = require("express"),
  app            = express(),
  port           = 3000,
  bodyParser     = require("body-parser"),
  mongoose       = require('mongoose'),
  passport       = require("passport"),
  LocalStrategy  = require("passport-local"),
  methodOverride = require("method-override"),
  Comment        = require("./models/comment.js"),
  Campground     = require("./models/campground.js"),
  User           = require("./models/user.js"),
  seedDB         = require("./seeds");   

// Requiring routes ------------------------------------------------------------
const campgroundsRoutes = require("./routes/campgrounds"),
  commentsRoutes        = require("./routes/comments"),
  indexRoutes           = require("./routes/index");

// DataBase ====================================================================
mongoose.connect('mongodb://localhost:27017/yelp_camp_10', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// tell express to use files in public folder
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB(); // seed the database

// Passport configuration ======================================================
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

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/", indexRoutes);

app.listen(port, () => console.log(`The YelpCamp Server Has Started on Port ${port}!`));
