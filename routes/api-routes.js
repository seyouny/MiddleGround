var express = require("express");

var router = express.Router();
var db = require("../models");
const Stream = require("./curatorClass");


// Import the models to use its database functions.
module.exports = function(app) {
    // Create all our routes and set up logic within those routes where required.


    app.post("/api/analyze_keyword", function(req, res) {
        var keyword = req.body.keyword;
        console.log('keyword: ' + keyword);

        // Create a new Curator Stream Object
        var stream = new Stream(keyword);
        var blueFeed, redFeed;

       

        // Get the Blue Feed from the stream
        stream.getBlueFeed( async function(bluedata) {
            blueFeed = bluedata;
            console.log("BlueCount: " + blueFeed.length);

            // When the blue feed has returned to us, then get the Red Feed
            stream.getRedFeed( function(reddata) {
                redFeed = reddata;
                console.log("RedCount: " + redFeed.length);
            
                // Now that we have both the blue and the red feeds - we can store them 
                // as posts in our DB
                blueFeed.forEach( async function(postItem) {

                    var newPost = {
                        curator_id: postItem.id,
                        keyword: keyword,
                        bias: "blue",
                        text: postItem.text,
                        image: postItem.image,
                        likes: postItem.likes,
                        comments: postItem.comments,
                        url: postItem.url,
                        thumbnail: postItem.thumbnail,
                        has_media: postItem.has_media,
                        user_image: postItem.user_image,
                        network_name: postItem.network_name,
                        user_url: postItem.user_url

                    };

                   await db.Post.create(newPost);
                   
          
                 });

                 redFeed.forEach( async function(postItem) {

                    var newPost = {
                        curator_id: postItem.id,
                        keyword: keyword,
                        bias: "red",
                        text: postItem.text,
                        image: postItem.image,
                        likes: postItem.likes,
                        comments: postItem.comments,
                        url: postItem.url,
                        thumbnail: postItem.thumbnail,
                        has_media: postItem.has_media,
                        user_image: postItem.user_image,
                        network_name: postItem.network_name,
                        user_url: postItem.user_url

                    };

                   await db.Post.create(newPost);
                   
          
                 });

                 //console.log("BlueCount: " + blueFeed.count + ", Red: " + redFeed.count);
                // Return an array of post id's to the Client Side JS
                res.json( {});
              // res.end( );
               
            })
        })
       

        

        



    });
};

