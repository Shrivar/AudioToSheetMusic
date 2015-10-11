var data;

$(document).ready(function() {

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/request/mine",
		})
		.done(function(resp){
			data = JSON.parse(resp);
			setupTable();
		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

});

function setupTable(){

	tableBody = $("#tableBody");

	if(data){
		
		for(var i = 0; i < data.length; i++){

			tr = $(document.createElement("tr"));

			td = $(document.createElement("td"));
			td.html(data[i]["title"]);
			tr.append(td);

			td = $(document.createElement("td"));
			a = $(document.createElement("a"));
			a.attr({
				href: "/request?id=" + data[i]["_id"],
			})
			a.html("Link");
			td.append(a);
			tr.append(td);

			td = $(document.createElement("td"));
			td.attr({
				id: "rating" + data[i]["_id"],
			})
			td.html(data[i]["rating"]);
			tr.append(td);

			td = $(document.createElement("td"));
			a = $(document.createElement("a"));
			a.attr({
				href: data[i]["link"],
			})
			a.html("Link");
			td.append(a);
			tr.append(td);

			tableBody.append(tr);

		}

	}

}