$(document).ready(function() {

	function toggleGenre(){

		genre = $("#genreToggle").val();
		$("#topHeader").html("Top Sheets: " + genre);
		$("#newHeader").html("New Sheets: " + genre);

		topTable = $("#topTable");

		data = [{rank:426, title:"Cool song", pdf:"pdf goes here"}, {rank:-119, title:"Shrivar's shitty song", pdf:"pdf goes here"}];

		tableBody = "";

		for(i = 0; i < data.length; i++){

			tableBody += "<tr><td><span class='glyphicon glyphicon-arrow-up' aria-hidden='true'></span><span class='glyphicon glyphicon-arrow-down' aria-hidden='true'></span></td><td>" + data[i]["rank"] + "</td><td>" + data[i]["title"] + "</td><td>" + data[i]["pdf"] + "</td></tr>";

		}

		$("#topTableBody").html(tableBody);

	}

	$("#genreToggle").on('change', toggleGenre);

	toggleGenre();

});