// requiring google api 
// requiring factchecktools 

const {google} = require('googleapis');
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
          query: 'politics',
          key: 'AIzaSyAvfhWexV2bqPbvo1UNth0pJ4Tw-C479cA',
        });
        console.log(res.data);
      }

    ///////////////////////////////////
    //res.data into json then parse it
    // need to add json data .. 
    ////////////////////////////////////

     
      main().catch(e => {
        console.error(e);
        throw e;
      });