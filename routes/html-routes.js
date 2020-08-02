
var googleQuery = require ('./google-api.js');
var db = require("../models");

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

                var googleData= googleQuery(keyword);
                var hbsObject = {
                    blues: bluePosts,
                    blueCount: bluePosts.length,
                    reds: redPosts,
                    redCount: redPosts.length,
                    keyword: keyword,
                    googleInfo: googleData
                  };
    
                // This code block notifies the user if there are no posts found on their topic

                if ((bluePosts.length < 1) || (redPosts.length<1))
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
                
            })
     
   
          });
  
    });
    app.get("/*", function(req, res) {

        res.render("index");

    });
};
