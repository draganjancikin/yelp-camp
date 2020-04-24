// ==================================================
// SETUP
// ==================================================
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// ==================================================
// Database
// ==================================================



// ==================================================
// ROUTES
// ==================================================

// Landing page
app.get("/", (req, res) => {
  res.render("landing");
});

// Campgrounds page
app.get("/campgrounds", (req, res) => {
  let campgrounds = [
    { name: "Salmon Creek", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
    { name: "Granite Hill", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" },
    { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744172287ed0944ac0_340.jpg" }
  ];
  res.render("campgrounds");
});

// 404 Page
app.get("*", (req, res) => {
  res.send("404 Page not Found!");
});

app.listen(port, () => console.log(`The YelpCamp Server Has Started on Port ${port}!`));
