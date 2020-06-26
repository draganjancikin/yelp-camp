// ==================================================
// SETUP
// ==================================================

const express     = require("express"),
      app         = express(),
      port        = 3000,
      bodyParser  = require("body-parser"),
      mongoose    = require('mongoose'),
      Campground  = require("./models/campground"),
      seedDB      = require("./seeds");   
      
      
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// tell express to use files in public folder
app.use(express.static("public"));

seedDB();

// ==================================================
// Database
// ==================================================

// temporary start ==================================================

/* const newCampground = new Campground({
  name: 'Camp No2',
  image: "/camp-ekna-naturcamping.jpeg"
}); */

// kitty.save().then(() => console.log('meow'));

/* newCampground.save(function (err, campground) {
  if (err) {
    console.log("Something Went Wrong!!!");
  } else {
    console.log("We Just Saved A Cat To The DB:");
    console.log(campground);
  }
}); */
// temporary end ===================================================

// ==================================================
// ROUTES
// ==================================================

// Landing page
app.get("/", (req, res) => {
  res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
  
});

// NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

// CREATE - add new campground to DB
app.post("/campgrounds", (req,res) => {
  // take data from form and add to camp groung array
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = { name: name, image: image, description: description };
  // create a new campground and save to DB
  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/index");
    }
  });
});

// SHOW - show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      // render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
});

// 404 Page
app.get("*", (req, res) => {
  res.send("404 Page not Found!");
});

app.listen(port, () => console.log(`The YelpCamp Server Has Started on Port ${port}!`));
