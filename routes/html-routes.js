var express = require("express");
var googleInfo = require ('./google-api.js');
var router = express.Router();
var db = require("../models");
const apiRoutes = require("./api-routes");
// Import the models to use its database functions.
module.exports = function(app) {
    // Create all our routes and set up logic within those routes where required.

    
    app.get("keyword_analysis",function(req,res){
      var keyword = req.query.keyword;
      var alldata = 
      res.render("analysis", hbsObject);

    })
    app.get("/keyword_analysis", function(req, res) {
       
       console.log("Request.params: " + JSON.stringify(req.query) );
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
                var hbsObject = {
                    blues: bluePosts,
                    reds: redPosts,
                    keyword: keyword,
                    googleInfo: googleInfo(keyword)
                  };
    
    
                res.render("analysis", hbsObject);
            })
     
   
          });
  
    });
    app.get("/*", function(req, res) {

        res.render("index");

    });
};
