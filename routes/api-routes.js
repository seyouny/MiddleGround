var express = require("express");

var router = express.Router();

const Stream = require("./curatorClass");


// Import the models to use its database functions.
module.exports = function(app) {
    // Create all our routes and set up logic within those routes where required.
    app.get("/api/analyze_keyword", function(req, res) {
    
        // dataObject = {}; // nothing for now

        // var blueFeed = curator.blueFeed;
        // var redFeed = curator.redFeed;
        // res.render("analysis", {blue:blueFeed, red:redFeed});

    });


    app.post("/api/analyze_keyword", function(req, res) {
        var keyword = req.body.keyword;
        console.log('keyword: ' + keyword);
        var stream = new Stream(keyword);
        var blueFeed, redFeed;
        stream.getBlueFeed( function(bluedata) {
            blueFeed = bluedata;
            stream.getRedFeed( function(reddata) {
                redFeed = reddata;
                console.log("Blue feed: " + blueFeed);
               // res.render("analysis", {blue:blueFeed, red:redFeed});

            })
        })
       

        

        // meal.create(["title", "description", "eaten"], [req.body.title, req.body.description, req.body.eaten], function(result) {
        //     // Send back the ID of the new meal
        //     res.json({ id: result.insertId });
        //   });



    });
};
