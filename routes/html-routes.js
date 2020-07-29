var express = require("express");

var router = express.Router();

// Import the models to use its database functions.
module.exports = function(app) {
    // Create all our routes and set up logic within those routes where required.
    app.get("/", function(req, res) {
    
        dataObject = {}; // nothing for now
        res.render("index", dataObject);

    });
};
