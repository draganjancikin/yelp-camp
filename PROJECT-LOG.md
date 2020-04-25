# Project Workflow

- [x] Make repository on GitHub

- [x] Clone to local directory

- [x] Initialize npm
```
npm init
```

- [x] Install necesery packages
``` 
npm i -S express ejs 
npm i -D nodemon
```

- [x] Create app.js, make basic express importing, app variable, setting listen port
```
touch app.js
```

- [x] Landing page basic setup: add route to app.js, make view directory and landing.ejs template

- [x] Campground page basic setup: add route to app.js, define temporary campground array and campgrounds.ejs template

- [x] Pass campground array to campground template, loop trough all campgrounds and show name and image

- [x] Adding header and footer partials with HTML boilerplate, include Bootstrap

- [x] Setup campgrounds POST route, install and setup body-parser package, setup new campground route and make form template new.ejs
```
npm i -S body-parser
```
