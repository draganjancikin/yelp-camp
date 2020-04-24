// ==================================================
// SETUP
// ==================================================
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// ==================================================
// ROUTES
// ==================================================

// Landing page
app.get("/", (req, res) => {
  res.render("landing");
});

// 404 Page
app.get("*", (req, res) => {
  res.send("404 Page not Found!");
});

app.listen(port, () => console.log(`The YelpCamp Server Has Started on Port ${port}!`));
