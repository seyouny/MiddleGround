var express = require("express");

var router = express.Router();
var db = require("../models");
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

        // Create a new Curator Stream Object
        var stream = new Stream(keyword);
        var blueFeed, redFeed;

        // Get the Blue Feed from the stream
        stream.getBlueFeed( function(bluedata) {
            blueFeed = bluedata;

            // When the blue feed has returned to us, then get the Red Feed
            stream.getRedFeed( function(reddata) {
                redFeed = reddata;

                console.log("Red posts: " + redFeed.length);
                console.log("Blue posts: " + blueFeed.length);
            
                // Now that we have both the blue and the red feeds - we can store them 
                // as posts in our DB

                var blueIds = [];

                blueFeed.forEach( postItem => {

                    console.log(postItem.text);


                    // db.Post.create(["curator_id","keyword","bias","text","image","likes","comments","url","thumbnail","has_media","user_image","network_name","user_url"], [
                    //     postItem.id, postItem.keyword, "blue", postItem.text, postItem.image, postItem.likes, postItem.comments, postItem.url, postItem.thumbnail, postItem.has_media, postItem.user_image, postItem.network_name, postItem.user_url]).then( function(result) {
                    //          blueIds.push(result.insertId);
                    // });

                    var newPost = {
                        curator_id: postItem.id,
                        keyword: postItem.keyword,
                        bias: "blue",
                        text: postItem.text,
                        
                    }
                    db.Post.create(newPost).then( function(result) {
                             blueIds.push(result.insertId);
                    });
                 });

                 //var redIds = [];
                // redFeed.forEach( postItem => {
                //     db.Post.create(["curator_id","keyword","bias","text","image","likes","comments","url","thumbnail","has_media","user_image","network_name","user_url"], [
                //         postItem.id, postItem.keyword, "red", postItem.text, postItem.image, postItem.likes, postItem.comments, postItem.url, postItem.thumbnail, postItem.has_media, postItem.user_image, postItem.network_name, postItem.user_url       ]).then( function(result) {
                //             redIds.push(result.insertId);
                //    });
                // });
      
                // Return an array of post id's to the Client Side JS
               // res.json({ blueIds: blueIds, redIds: redIds});
               res.end();
            })
        })
       

        

        



    });
};
