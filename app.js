// ==================================================
// SETUP
// ==================================================

const express = require("express");
const app = express();
const port = 3000;
bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ==================================================
// Database
// ==================================================

let campgrounds = [
  { name: "Salmon Creek", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
  { name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
  { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
  { name: "Salmon Creek", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
  { name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
  { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
  { name: "Salmon Creek", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
  { name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
  { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
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
