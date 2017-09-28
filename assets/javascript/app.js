var topics = ["indeed", "fabulous", "fangirling", "hangry", "eyeroll", "slowclap", "touche", "hellyeah", "legendary", "happydance", "hellno"];


var still;
var animated;
var rating;
var apiResponse;

for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button class='button'></button>").text(topics[i]);
    newButton.click(function(event) {
        $("#results").empty();
        var innerText = event.target.innerText
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + innerText +
            "&api_key=oJXYB9UEAxlt7Askjtj8qc5zVBZOzrqx&limit=10";
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            .done(function(response) {
                    var apiResponse = response.data;
                    console.log(apiResponse);

                    for (var i = 0; i < apiResponse.length; i++) {
                        var reaction = $("<div>" + "test" + "</div>");
                        var imageUrl = response.data.image_original_url;

                        var still = apiResponse[i].images.fixed_height_still.url;
                        var animated = apiResponse[i].images.fixed_height.url;
                        var rating = apiResponse[i].rating;
                        var ratedline = $("<p>").text("Rated: " + rating);

                        var reactionImage = $("<img>" + "<br>");
                        reactionImage.attr("src", still);
                        reactionImage.attr("data-still", still);
                        reactionImage.attr("data-animate", animated);
                        reactionImage.attr("data-state", still);
                        reactionImage.addClass("image");

                        $("#results").append(reactionImage, ratedline);
                    } ///end bracket for loop		
                } ////end bracket done function
            )
    }) ///end of newButton.clickfunction
    $("#buttons").append(newButton);
}
///OMThis...
$(document).on("click", ".image", function() {

    var play = $(this).attr("data-state");

    if (play === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

////this doesn't quite work yet\O_O/ I get the whole array added instead of the latest entry and the new buttons are not clickable
function addButtons() {
    $("#results").empty();
    for (var i = 0; i < topics.length; i++) {
        var formButton = $("<button>");
        formButton.text(topics[i]);

        // formButton.attr("src", still);
        // formButton.attr("data-still", still);
        // formButton.attr("data-animate", animated);
        // formButton.attr("data-state", still);
        formButton.addClass("button");
        $("#buttons").append(formButton);

    } ///end bracket for addButtons function

}
$("#add-reactions").on("click", function(event) {
    event.preventDefault();
    var formInput = $("#reactions-input").val().trim();
    console.log(formInput);
    topics.push(formInput);
    console.log(topics);
    console.log(formInput);
    addButtons();
});