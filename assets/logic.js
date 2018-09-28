// Array for user search terms //
let searchArr = ["cat", "lion", "tiger"];

// search function
$(document).on("click", "#search-btn", function (event) {
    event.preventDefault()
    searchedItem = $("#search-term").val().trim();
    searchArr.push(searchedItem);
    createBtn(searchArr, "btn btn-primary search-button", ".search-btns");
    console.log(searchedItem);
    console.log(searchArr);

});
    
// arbitrary function to create BS buttons/ add class, where to add each gif
function createBtn (searchArr, classToAdd, areaToAdd) {
    $(areaToAdd).empty();
    for (i=0;i < searchArr.length;i++) {
        var btn = $("<button>");
        btn.addClass(classToAdd);
        btn.attr("data-searched", searchArr[i]);
        btn.text(searchArr[i]);
        $(areaToAdd).append(btn);
        $(btn).after(" ");
    }
};

// Pre-set Buttons on load function call
$(document).ready(function () {
    createBtn(searchArr, "btn btn-primary search-button", ".search-btns");
});

$(document).on("click", ".search-button", function () {

    $(".searched-gifs").empty();

    var searched = $(this).attr("data-searched");
    console.log(this);
    
    console.log("searched: " + searched); // shows undefined in console

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        searched + "&apikey=6AnWVicwRJqEOwWsff57eY2nW2RyHnR9";

    // API key & AJX call
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        console.log (queryURL);
        console.log (response);

    var results =response.data;

    for (var i=0; i < 10; i++) {
        var searchDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating )

        var searchImage = $("<img>");
            searchImage.attr("src", results[i].images.fixed_height.url);

            // will not generate gifs when following code is active//
            ///////////////////////////////////////////////////////
            searchImage.addClass("gif");
            searchImage.attr("data-state", "still");
            searchImage.attr("data-still", results[i].images.fixed_height_still.url);
            searchImage.attr("data-animate", results[i].images.fixed_height.url);
        
        searchDiv.prepend(p);
        searchDiv.prepend(searchImage);
        //inlcude copy link here

        $(".searched-gifs").append(searchDiv);
        }
    })
});

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


$("#clear-btn").on("click", function () {
   $(".search-btns").empty();
   $(".searched-gifs").empty();
   console.log("#search-btns");
});

