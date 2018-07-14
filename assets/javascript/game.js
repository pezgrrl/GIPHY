var showTitle = ["rocko's modern life", "doug", "aaahh real monsters", "hey arnold", "daria", "animaniacs", "tiny toon adventures", "pokemon", "sailor moon",];

function renderButtons() {
	$("#TVButtons").empty();
	for (var i = 0; i < showTitle.length; i++) {
		var showBtn = $("<button>");
		showBtn.addClass("showBtn");
		showBtn.attr("data-name", showTitle[i]);
		showBtn.text(showTitle[i]);
		$("#TVButtons").append(showBtn);
	}
}
$(document).on("click", ".showBtn", function () {
	$(".display").empty();

	var showGif = $(this).attr("data-name");

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + showGif + "&limit=10&api_key=zDIJH55N7CYwzugMYjAyXiGGspBMr7fb";


	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function (query) {

		console.log(query)

		for (var i = 0; i < query.data.length; i++) {

			var animatedGif = query.data[i].images.fixed_height.url;

			var pausedGif = query.data[i].images.fixed_height_still.url;

			var theRating = query.data[i].rating;



			if (theRating == "") {
				theRating = "unrated";
			}

			var rating = $("<h5>").html("Rated: " + theRating).addClass("ratingStyle");
			stillGif = $("<img>").attr("data-animated", animatedGif).attr("data-paused", pausedGif).attr("src", pausedGif).addClass("playOnHover");
			var fullGifDisplay = $("<button>").append(rating, stillGif);
			$(".display").append(fullGifDisplay);
		}
	});

});


$(document).on('mouseover', '.playOnHover', function () {
	$(this).attr('src', $(this).data('animated'));
});
$(document).on('mouseleave', '.playOnHover', function () {
	$(this).attr('src', $(this).data('paused'));
});



$('#addShow').on('click', function () {
	var newShow = $('#newShowInput').val().trim();
	showTitle.push(newShow);
	renderButtons();
	return false;
});

renderButtons(); {

}