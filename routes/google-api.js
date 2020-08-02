// only require is Google
const {google} = require('googleapis');


async function googleQuery() {
  var googleArray = [];
      // app.get("keyword_analysis",function(req,res){
      //   var keyword = req.query.keyword;
        var factchecktools = google.factchecktools('v1alpha1');
     
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
          query: " ",
          key: 'AIzaSyAPRblVUYQKXe26yrvEXPM5u9CLjSSX9zc',
        });
        
        var googleInfo = res.data
        for (i in res.data.claims){
          googleArray.push(res.data.claims[i].claimReview)
        }
      }
      await main().catch(e => {
        console.error(e);
        throw e;
      });
      return googleArray;
    } 
    module.exports = googleQuery;
      
    
