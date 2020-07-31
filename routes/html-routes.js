var express = require("express");

var router = express.Router();
var db = require("../models");
// Import the models to use its database functions.
module.exports = function(app) {
    // Create all our routes and set up logic within those routes where required.
    app.get("/", function(req, res) {
    
        dataObject = {}; // nothing for now

        res.render("index", dataObject);

    });
    app.get("/keyword_analysis", function(req, res) {
       // console.log('About to render the analysis:' + JSON.stringify( req.body ));
        //dataObject = req.body;
        
        db.Post.findAll({}).then(function(dbPosts) {
            // We have access to the todos as an argument inside of the callback function

            console.log(dbPosts);
            var hbsObject = {
                cards: dbPosts
              };
            res.render("analysis", hbsObject);
         // console.log(dbPosts);
          });
  
    });
};
