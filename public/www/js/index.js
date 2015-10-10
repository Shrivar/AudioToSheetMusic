var all;
var classical;
var jazz;
var rock;
var country;
var data;

$(document).ready(function() {

	$("#genreToggle").on('change', toggleGenre);

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/request/all",
		})
		.done(function(resp){
			data = JSON.parse(resp);
			all = JSON.parse(resp);
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
			classical = JSON.parse(resp);
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
			jazz = JSON.parse(resp);
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
			rock = JSON.parse(resp);
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
			country = JSON.parse(resp);
		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

});

data = [{id: 1, rating:426, link:"https://www.youtube.com/watch?v=Hwxhwa8dgqk", vote: 0}, {id: 2, rating:-119, link:"https://youtube.com", vote: 0}];

function toggleGenre(){

	genre = $("#genreToggle").val();
	$("#topHeader").html("Top Sheets: " + genre);
	$("#newHeader").html("New Sheets: " + genre);

	topTableBody = $("#topTableBody");
	topTableBody.html("");

	for(i = 0; i < data.length; i++){

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
			id: "rating" + data[i]["id"],
		})
		td.html(data[i]["rating"]);
		tr.append(td);

		td = $(document.createElement("td"));
		a = $(document.createElement("a"));
		a.attr({
			href: "/request/" + data[i]["id"],
		})
		a.html("Link");
		td.append(a);
		tr.append(td);

		td = $(document.createElement("td"));
		a = $(document.createElement("a"));
		a.attr({
			href: data[i]["link"],
		})
		a.html("Link");
		td.append(a);
		tr.append(td);

		topTableBody.append(tr);

		span1.click({param1: data[i]["id"]}, voteUp);
		span2.click({param1: data[i]["id"]}, voteDown);

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