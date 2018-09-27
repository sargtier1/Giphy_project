// Array for user search terms //
var searchArr = ["cat", "lion", "tiger"];

// search function
$(document).on("click","#search-btn", function () {
    searchedItem = $("#search-term").val();
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
$(function () {
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
console.log(results);

for (var i=0; i < 10; i++) {
    var searchDiv = $("<div>");
    var p = $("<p>").text("Rating: " + results[i].rating )

    var searchImage = $("<img>");
    searchImage.attr("src", results[i].images.fixed_height.url);

    console.log(results[i].images.fixed_height.url);

    searchDiv.prepend(p);
    searchDiv.prepend(searchImage);
    //inlcude copy link here

    $(".searched-gifs").append(searchDiv);
    }
})
});

$("#clear-btn").on("click", function () {
   $(".search-btns").empty();
   $(".searched-gifs").empty();
   console.log("#search-btns");
});

