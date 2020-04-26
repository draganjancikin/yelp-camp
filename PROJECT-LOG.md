# YelpCamp Project Workflow

## Initial Setup

* Make repository on GitHub
* Clone to local directory
* Initialize npm
```
npm init
```
* Install necesery packages
``` 
npm i -S express ejs 
npm i -D nodemon
```
* Create app.js
```
touch app.js
```
* Make basic express importing, app variable, setting listen port
* Landing page basic setup: add route to app.js, make view directory and landing.ejs template
* Campground page basic setup: add route to app.js, define temporary campground array and campgrounds.ejs template
* Pass campground array to campground template, loop trough all campgrounds and show name and image

## Layout And Basic Styling

* Adding header and footer partials with HTML boilerplate
* Include Bootstrap CSS

## Creating New Campgrounds

* Setup campgrounds POST route
* Install and setup body-parser package
```
npm i -S body-parser
```
* Setup new campground route
* Make form template new.ejs

## Style The Campgrounds Page

* Add better header/title and make campgrounds display in a grid

## Style The Navbar And Form

* Download images for campgrounds, put these into folder "public", and setup app.js to use files in this folder
* Add a navbar to all templates
* Include Bootstrap JS
* Style the form
