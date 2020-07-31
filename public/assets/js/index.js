$(document).ready(function() { 

    // use jQuery to grab handles to our input Fields on the form
    var accountNameInput = $("input#accountName");
    var accountNameSubmit = $("#accountName");

    var keywordInput = $("input#keyword");
    var keywordSubmit = $("#submitKeyword")
 

    // add EventHandlers to each of the submit buttons
    // Account name submit button
    // accountNameSubmit.on('click', function(event) {
    //     event.preventDefault();
    //     var account_name =  accountNameInput.val().trim(),
    //     if (!account_name) {
    //         return;
    //       }
    //       AnalyzeAccount(account_name);
    //       accountNameInput.val("");
    //     });

    // Keyword submit button
    keywordSubmit.on('click', function(event) {
        event.preventDefault();
        var keyword = keywordInput.val().trim();
        if (!keyword) {
            return;
        }
        AnalyzeKeyword(keyword);
        keywordInput.val("");
    })
        
});

// Generate an ajax Post Request to send to the account name to the server 
// function AnalyzeAccount(account_name) {
//     $.post("/api/analyze_account", { account_name: account_name }
//     ).then(function(data) {
//         window.location.replace("/account_analysis");
//       })
//       .catch(handleLoginErr);

// }

// Generate an ajax Post Request to send to the keyword to the server 
function AnalyzeKeyword(keyword) {
    $.post("/api/analyze_keyword", { keyword: keyword }
    ).then(function(data) {
      //  window.location.replace("/keyword_analysis", data);
      //  blueIds: blueIds, redIds: redIds

            // passing the post IDS on to the keyword_analysis route

            window.location.replace("/keyword_analysis");
      });
}

function handleLoginErr(err) {
    console.log(err.responseJSON);
  }
