// ==================================================
// SETUP
// ==================================================
const express = require("express");
const app = express();
const port = 3000;

// ==================================================
// ROUTES
// ==================================================

// Landing page
app.get("/", (req, res) => {
  res.send("Landing Page");
});

app.listen(port, () => console.log(`The YelpCamp Server Has Started on Port ${port}!`));
