// this is going to require express 
var express = require("express");

// this sets up the express port .. i chose port # 8080
var app = express();
var PORT = process.env.PORT || 8080;

// still working on this .. this needs to be redirected to a folder 
// the folder needs to have .js files in it
// var db = require("./**************");

// this sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static directory 
app.use(express.static("public"));

// requiring routes .. this is tbd because there are no routes.js files yet 
require("./routes/html-routes.js")(app);
require("./routes/author-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);

// syncing the sequelize models and then starting the express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
