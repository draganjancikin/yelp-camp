# YelpCamp Project Workflow

## Initial Setup

* Make repository on GitHub
* Clone to local directory
* Initialize npm

``` npm
npm init
```

* Install necesery packages

``` npm
npm i -S express ejs
npm i -D nodemon
```

* Create app.js

``` terminal
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

``` npm
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

## Add Mongoose

* Install and configure mongoose

``` npm
npm install mongoose --save
```

* Setup campground model
* Use campground model inside of our routes

## Show Page

* Review the RESTful routes we've seen so far
name    url               verb  description
======================================
INDEX   /campgrounds      GET   Display a list of all campgrounds
NEW     /campgrounds/new  GET   Display form to make a new campground
CREATE  /campgrounds      POST  Add new campground to DB
SHOW    /campgrounds/:id  GET   Shows info about one campground

* Add description to our comprground model
* Show db.collection.drop()
* Add a show route/template

## RESTful Routing

REST - a mapping between HTTP routes and CRUD

| Action  | Path                  | HTTP Verb | Purpose                                                 |
|---------|-----------------------|-----------|---------------------------------------------------------|
| index   | /campgrounds          | GET       | List all camprgounds                                    |
| new     | /campgrounds/new      | GET       | Show new camprgound form                                |
| create  | /camprgounds          | POST      | Create a new camprgound, then redirect somewhere        |
| show    | /campgrounds/:id      | GET       | Show info about one specific campground                 |
| edit    | /campgrounds/:id/edit | GET       | Show edit form for one camprgound                       |
| update  | /campgrounds/:id      | PUT       | Update a particular campground, then redirect somewhere |
| destroy | /campgrounds/:id      | DELETE    | Delete a partucular campground, then redirect somewhere |

Semantic UI

## Refactor Mongoose code

* Create models directory
* Use module.exports
* Require everyting correctly

## Add Seeds File

* Add a seeds.js file
* Run the seeds.js every time the server starts

## Add the Comment model

* Make our errors go away
* Display commets on campgrounds page

## Comment New/Create

* Discuss nested routes
| Action  | Path                  | HTTP Verb | Purpose                                                 |
|---------|-----------------------|-----------|---------------------------------------------------------|
| index   | /campgrounds          | GET       | List all camprgounds                                    |
| new     | /campgrounds/new      | GET       | Show new camprgound form                                |
| create  | /camprgounds          | POST      | Create a new camprgound, then redirect somewhere        |
| show    | /campgrounds/:id      | GET       | Show info about one specific campground                 |

| new     | /campgrounds/:id/comments/new  | GET     | Show new comment form                            |
| create  | /camprgounds/:id/comments      | POST    | Create a new comment, then redirect somewhere    |

* Add the comment new and create routes
* Add the new comment form

## Style Show Page

* Add sidebar to show page
* Display comment nicely

## Finish styling Show Page

* Add public directory
* Add custom stylesheets

## Auth Pt. 1 - Add User Model

* Install all packages needed for auth
  * passport,
  * passport-local,
  * passport-local-mongoose,
  * express-session

* Define User model

## Auth Pt. 2 - Register

* Configure passport
* Add register routes
* Add register temlate

## Auth Pt. 3 - Login

* Add login routes
* Add login template

## Auth Pt. 4 - Logout/Navbar

* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

## Auth Pt. 5 - Show/Hide

* Show/hide auth links in navbar corretly
