var requests = [];
var data;

$(document).ready(function() {

	$("#genreToggle").on('change', toggleGenre);

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/request/all",
		})
		.done(function(resp){
			requests["all"] = JSON.parse(resp);
			toggleGenre();
		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/request/genre",
			data: {"genre" : "classical"},
		})
		.done(function(resp){
			requests["classical"] = JSON.parse(resp);
		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/request/genre",
			data: {"genre" : "jazz"},
		})
		.done(function(resp){
			requests["jazz"] = JSON.parse(resp);
		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/request/genre",
			data: {"genre" : "rock"},
		})
		.done(function(resp){
			requests["rock"] = JSON.parse(resp);
		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/request/genre",
			data: {"genre" : "country"},
		})
		.done(function(resp){
			requests["country"] = JSON.parse(resp);
		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

});

function toggleGenre(){

	genre = $("#genreToggle").val();

	data = requests[genre];

	$("#topHeader").html("Top Sheets: " + genre);
	$("#newHeader").html("New Sheets: " + genre);

	topTableBody = $("#topTableBody");
	topTableBody.html("");

	for(var key in data){

		tr = $(document.createElement("tr"));

		td = $(document.createElement("td"));
		span1 = $(document.createElement("span"));
		span1.attr({
			class: 'glyphicon glyphicon-arrow-up',
		});
		td.append(span1);

		span2 = $(document.createElement("span"));
		span2.attr({
			class: 'glyphicon glyphicon-arrow-down',
		});
		td.append(span2);
		tr.append(td);

		td = $(document.createElement("td"));
		td.attr({
			id: "rating" + data["id"],
		})
		td.html(data["rating"]);
		tr.append(td);

		td = $(document.createElement("td"));
		a = $(document.createElement("a"));
		a.attr({
			href: "/request/" + data["id"],
		})
		a.html("Link");
		td.append(a);
		tr.append(td);

		td = $(document.createElement("td"));
		a = $(document.createElement("a"));
		a.attr({
			href: data["link"],
		})
		a.html("Link");
		td.append(a);
		tr.append(td);

		topTableBody.append(tr);

		span1.click({param1: data["id"]}, voteUp);
		span2.click({param1: data["id"]}, voteDown);

	}

}

function voteUp(event){

	id = event.data.param1;

	index = indexById(data, id);
	if(index != -1){

		if(data[index]["vote"] < 1){

			rating = data[index]["rating"];
			vote = data[index]["vote"];

			ratingtd = $("#rating" + id);
			ratingtd.html(rating + 1);

			data[index]["rating"] = rating + 1;
			data[index]["vote"] = vote + 1;

		}

	}

}

function voteDown(event){

	id = event.data.param1;

	index = indexById(data, id);
	if(index != -1){

		if(data[index]["vote"] > -1){

			rating = data[index]["rating"];
			vote = data[index]["vote"];

			ratingtd = $("#rating" + id);
			ratingtd.html(rating - 1);

			data[index]["rating"] = rating - 1;
			data[index]["vote"] = vote - 1;

		}

	}

}

function indexById(array, id){

	for(var i = 0, len = array.length; i < len; i++ ) {
    	if(array[i]["id"] === id) {
        	return i;
    	}
	}

	return -1;
}