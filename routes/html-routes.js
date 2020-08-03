var express = require("express");
var googleQuery = require ('./google-api.js');
var db = require("../models");
const Stream = require("../classes/streamClass");
var XRegExp = require('xregexp');

function getOutletStats(blue,red) {

  blueStats = [];
  redStats = [];
  blue.forEach( post => {
    blueStats.push(post.user_screen_name);
  });
  red.forEach( post => {
    redStats.push(post.user_screen_name);
  });
  var statObject = {blue:blueStats, red:redStats}
  return statObject;

}

// Sort all of the post text and then count which words are used most often

function cleanString(stringArgument) {
  return stringArgument.replace(/[^\w\s]/gi, '');
}
function noNumeric(value) {
  //return /^-{0,1}\d+$/.test(value);
  return value.replace(/\d[^abc]/g, '');
}

console.log("Test this 08974words: ", noNumeric("08974words"));

function findRecentTopics(blue,red) {
  var bluePostText = "";
  var redPostText = "";
  var blueObject;
  var redObject;
  var blueTopics = {};
  var redTopics ={};

  blue.forEach( post=> {
    var clean = cleanString(post.text.replace("\n", " ")).replace("'","").toLowerCase();
    bluePostText += clean.replace("\n", " ").trim();
  
  })


  var blueWords = noNumeric(bluePostText).split(" ");
  var redWords = noNumeric(redPostText).split(" ");

  //console.log(blueWords);
  var blueObject= convertToObject(blueWords);
  blueObject = removeSmallCounts(blueObject);
  console.log(blueObject);


}

// remove small # of counted words from the collection
function removeSmallCounts(largeObject) {
  newArray = [];


for (keys in largeObject) {
  for (var nestedKey in largeObject[keys]) {
     if (keys.length > 2 ) {
        if (largeObject[keys][nestedKey] > 3 ) {

              newArray.push( [ keys, largeObject[keys][nestedKey]]);
            }
      }
  }
}

  return newArray;
    
}

function convertToObject(wordArray) {
  var wordObject = {};
  
  wordArray.forEach( wordString => {
    
      if ( wordObject[wordString] ) {
       // console.log("We found a word more than once!");
        wordObject[wordString].count =  wordObject[wordString].count + 1;
      }
      else {
        wordObject[wordString] = { count: 1 };
      }
    
  });
  return wordObject;
}

function findTop5(wordObject) {

  // Find the highest # of repeats 
  var highestCount = 0;
  var highestWords = [];
  wordObject.forEach( word => {
    if (word.count > highestCount) {
      highestCount = word.count;
      highestWords[0] = word;
    }
  });
}

module.exports = function(app) {


    app.get("/keyword_analysis", function(req, res) {
       
      // console.log("Request.params: " + JSON.stringify(req.query) );
        var keyword = req.query.keyword;
        var bluePosts = [];
        db.Post.findAll({
            where: {
              bias: 'blue',
              keyword: keyword
            }
          }).then(function(bluePostsReturned) {
            bluePosts = bluePostsReturned;


            db.Post.findAll( {where: {
                bias: 'red',
                keyword: keyword
              }}).then( function(redPostsReturned) {

                redPosts = redPostsReturned;

                googleQuery(keyword).then ( function(googleDataReturned) {


                        var outletStats = getOutletStats(bluePosts,redPosts);
                        console.log(outletStats);
                        console.log("Google Info: --------");
                        console.log(googleDataReturned);

                        var hbsObject = {
                            blues: bluePosts,
                            blueCount: bluePosts.length,
                            reds: redPosts,
                            redCount: redPosts.length,
                            keyword: keyword,
                            outletStats:outletStats,
                            googleInfos: googleDataReturned
                          };

                        // This code block notifies the user if there are no posts found on their topic

                        if ((bluePosts.length < 1) && (redPosts.length<1))
                        {
                          hbsObject.count = 0;
                          console.log("NO POSTS FOUND");

                          // alert("No posts found on that topic.");
                          
                          res.render("error", {error: "NO POSTS FOUND"});
                          

                        // res.json({error:"NO POSTS FOUND"});
                        } else {
                          hbsObject.count = bluePosts.length; + redPosts.length;

                          res.render("analysis", hbsObject);
                        }

                          
                }).catch(e => {
                  console.error(e);
                  throw e;
                });;
            });
          });  
    });
    app.get("/*", function(req, res) {

         // Create a new Curator Stream Object
         var stream = new Stream();
         var blueFeed, redFeed;
 
                // Get the Blue Feed from the stream
                stream.getBlueFeed( async function(bluedata) {
                  blueFeed = bluedata;
                 // console.log("BlueCount: " + blueFeed.length);
      
                  // When the blue feed has returned to us, then get the Red Feed
                  stream.getRedFeed( function(reddata) {
                      redFeed = reddata;

                      var recentTopics = findRecentTopics(bluedata,reddata);

                      res.render("index", recentTopics);
                  });
                });

       

    });
 };


