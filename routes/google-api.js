// requiring google api 
// requiring factchecktools 
var express = require("express");
var router = express.Router();
const apiRoutes = require("./api-routes");
var db = require("../models");
const {google} = require('googleapis');


var googleArray = [];

// function googleQuery() {
      // app.get("keyword_analysis",function(req,res){
      //   var keyword = req.query.keyword;
        const factchecktools = google.factchecktools('v1alpha1');
     
        // api key
        // AIzaSyAvfhWexV2bqPbvo1UNth0pJ4Tw-C479cA

      // authorizing my api 
      async function main() {
        const auth = new google.auth.GoogleAuth({
          key: 'AIzaSyAvfhWexV2bqPbvo1UNth0pJ4Tw-C479cA',
          scopes: [],
        });


        // doing the magic !!
        const res = await factchecktools.claims.search({
          languageCode: 'English',
          query: "black lives matter",
          key: 'AIzaSyAPRblVUYQKXe26yrvEXPM5u9CLjSSX9zc',
        });
        
        var googleInfo = res.data
          // console.log(res.data.claims[0].claimReview[0])
        for (i in res.data.claims){
          const googArray = await googleArray.push(res.data.claims[i].claimReview[0])

        }
        
        console.log (googleArray);

        
      }
      main().catch(e => {
        console.error(e);
        throw e;
      });

      // }
    // } 

    module.exports = googleArray;
    // googleQuery()
      
    
      // [{
      //   "claims" [
      //     {
      //       "text": [],
      //       "claimReview": 
      //         {
      //           "publisher": {
      //             "name": "",
      //             "site": "",
      //           },
      //           "url": "",
      //           "title": "",
      //           "textualRating": "",
      //           "languageCode": "en"
      //         }
            
      //     }
      //   ]
      // }]

