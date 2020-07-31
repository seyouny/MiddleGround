$(document).ready(function() { 

    // use jQuery to grab handles to our input Fields on the form
    var accountNameInput = $("input#accountName");
    var accountNameSubmit = $("#accountName");
    var keywordInput = $("input#keyword");
    var keywordSubmit = $("#submitKeyword")

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



// Generate an ajax Post Request to send the keyword to the server 
function AnalyzeKeyword(keyword) {

    $.ajax({
        method: "POST",
        url: "/api/analyze_keyword",
        data: {keyword: keyword}
        }).then( function(dataReturned) {

            // Then reload the page on the /keyword_analysis route
            window.location.replace("/keyword_analysis", dataReturned);

        }
    );

}

function handleLoginErr(err) {
    console.log(err.responseJSON);
  }
