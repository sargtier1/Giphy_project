// Variables //
///////////////

// Array for user search terms //
var searchArr = ["dog", "cat", "bird"];

// API key
// 6AnWVicwRJqEOwWsff57eY2nW2RyHnR9

// arbitrary unction to create BS buttons
function createBtn (searchArr, classToAdd, areaToAdd) {
    $(areaToAdd).empty();
    for (i=0;i < searchArr.length;i++) {
        var btn = $("<button>");
        btn.addClass(classToAdd);
        btn.attr("data-searched", searchArr[i]);
        btn.text(searchArr[i]);
        $(areaToAdd).append(btn);
    }
};

// Pre-set Buttons on load
$(function () {
    createBtn(searchArr, "btn btn-primary", ".lead");
});

$(document).on("click", function () {
    var searched = $(this).data("data-searched");
    console.log(searched); // shows undefined in console

});


{/* <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a> */}