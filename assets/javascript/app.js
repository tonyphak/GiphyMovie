var topics = ["Fallout", "The Last Samurai", "The Avengers: Infinity War", "Black Panther", "Pitch Perfect", "The Dark Knight", "The Avengers", "Crazy Rich Asians"];

function createButtons() {
    $("#gifbuttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>");
        buttons.text(topics[i]);
        buttons.addClass("btn, btn-primary tvBtn");
        buttons.attr("data-name", topics[i]);
        buttons.attr("type", "button");
        $("#gifbuttons").append(buttons);
    }

    //create AJAX to display gifs
    //create on click for class tvBtn

    $(".tvBtn").on("click", function () {
        $(".gifs").empty();
        var Movie = $(this).attr("data-name").trim();
        //console.log(thisShow);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=movie+" + Movie + "&api_key=uuSts4J6O7rJNeTu7Xr6TGNK7FPxa7P7&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                //create array for response results then for loop to loop through every array item see button-triggered-ajax-solution
                var movieArray = response.data;
                // console.log(tvArray);
                $.each(movieArray, function (index, value) {
                    //console.log(value);
                    if (value.rating !== "r") {
                        var movieImage = $("<img>").attr("data-still", value.images.fixed_height_still.url).attr("data-animate", value.images.fixed_height.url).attr("data-state", "still").attr("src", value.images.fixed_height_still.url).addClass("giphys");
                        //console.log(tvImage);
                        //add rating
                        var rating = value.rating;
                        //console.log(rating);
                        var p = $("<p>").text("Rating: " + rating);
                        var gifRAte = $("<div>").append(p, movieImage).addClass("gifys");
                        $(".gifs").append(gifRAte);
                    }
                })
                $(".giphys").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                })

            })
    }) 
        $("#addTv").on("click", function () {
            event.preventDefault(); //problem creates additional empy buttons and button is not disabled when field is empty
            var newshow = $("#newinput").val().trim().toLowerCase();
            console.log(newshow);
            topics.push(newshow);
            $("#newinput").val("");
            console.log(topics);
            createButtons();
        })
    
}
createButtons();