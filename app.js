// Setup =======================================================================

const express    = require("express"),
  app            = express(),
  // port           = 3000,
  port           = process.env.PORT || 3000,
  bodyParser     = require("body-parser"),
  mongoose       = require('mongoose'),
  flash          = require('connect-flash'),
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
mongoose.connect('mongodb://localhost:27017/yelp_camp_11_1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// tell express to use files in public folder
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); // seed the database

// Passport configuration ======================================================
app.use(require("express-session")({
  secret: "Yelp Camp Secret",
  resave: false,
  saveUninitialized: true,
  // dodao Dragan
  /* cookie:{
    secure: true,
    maxAge:60000
  }, */
}));

// dodao Dragan
app.set('trust proxy', 1);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// user in every template, every route, ...
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/", indexRoutes);

app.listen(port, () => console.log(`The YelpCamp Server Has Started on Port ${port}!`));
