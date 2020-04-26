// ==================================================
// SETUP
// ==================================================

const express = require("express");
const app = express();
const port = 3000;
bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// tell express to use files in public folder
app.use(express.static("public"));

// ==================================================
// Database
// ==================================================

let campgrounds = [
  { name: "Ekna Naturcamp", image: "/camp-ekna-naturcamping.jpeg" },
  { name: "Golden Ears", image: "/camp-golden-ears.jpeg" },
  { name: "Lac d'Amour", image: "/camp-lac-d-amour.jpeg" },
  { name: "Oeschien Lake", image: "/camp-oeschinen-lake.jpeg" },
  { name: "Positivus", image: "/camp-positivus.jpeg" },
  { name: "Ekna Naturcamp", image: "/camp-ekna-naturcamping.jpeg" },
  { name: "Golden Ears", image: "/camp-golden-ears.jpeg" },
  { name: "Lac d'Amour", image: "/camp-lac-d-amour.jpeg" },
  { name: "Oeschien Lake", image: "/camp-oeschinen-lake.jpeg" },
  { name: "Positivus", image: "/camp-positivus.jpeg" },
  
];

// ==================================================
// ROUTES
// ==================================================

// Landing page
app.get("/", (req, res) => {
  res.render("landing");
});

// Campgrounds page
app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds: campgrounds});
});

// New campground form Page
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

app.post("/campgrounds", (req,res) => {
  // take data from form and add to camp groung array
  let name = req.body.name;
  let image = req.body.image;
  let newCampgroung = { name: name, image: image };
  campgrounds.push(newCampgroung);
  // redirect back to campgrounds page
  res.redirect("/campgrounds");
});

// 404 Page
app.get("*", (req, res) => {
  res.send("404 Page not Found!");
});

app.listen(port, () => console.log(`The YelpCamp Server Has Started on Port ${port}!`));
