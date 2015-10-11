$(document).ready(function() {

	$('.video .btn').on('click', function(e) {
	    e.preventDefault();
	    var $this = $(this);
		if ($this.hasClass('open'))  {
			$this.addClass('closed').removeClass('open');
			$this.html('View &raquo;');
		}
		else  {
			$this.addClass('open').removeClass('closed');
			$this.html('Hide &laquo;');
		}
		console.log($this);
	    var $collapse = $this.closest('.collapse-group').find('.collapse');
	    $collapse.collapse('toggle');
	});

	var id = getUrlParameter("id");

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/submissions/arrangement/reqid",
			data: { reqid : id },
		})
		.done(function(resp){

			var data = JSON.parse(resp);
            

			var arrSelect = $("#arrangementsSelect");
			arrSelect.html("");
			option = $(document.createElement("option"));
			option.attr({
				value: "",
				html: "",
			});
			arrSelect.append(option);

			for(var i = 0; i < data.length; i++){
                option = $(document.createElement("option"));
				option.attr({
					value: data[i]["name"],
				}).text(data[i]["name"]);
				arrSelect.append(option);
			}

		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

	setTimeout(function(){
		$.ajax({
			type: "GET",
			url: "/submissions/melody/reqid",
			data: { reqid : id },
		})
		.done(function(resp){

			var data = JSON.parse(resp);

			var melodySelect = $("#melodySelect");
			melodySelect.html("");
			option = $(document.createElement("option"));
			option.attr({
				value: data[i]["name"],
            }).text(data[i]["name"]);
			melodySelect.append(option);

			for(var i = 0; i < data.length; i++){
				option = $(document.createElement("option"));
				option.attr({
					value: data[i]["name"],
					text: data[i]["name"],
				});
				melodySelect.append(option);
			}

		})
		.fail(function(resp){
			alert(resp);
		});
	}, 500);

	$("#arrangementsSelect").on('change', function(event){
		var frame = $("#arrangementsFrame");
		var select = $("#arrangementsSelect");
		var val = select.val();

		if(val != ""){
			frame.attr('src',"/submissions?name=" + val);
		}

	});

	$("#melodysSelect").on('change', function(event){
		var frame = $("#melodyFrame");
		var select = $("#melodySelect");
		var val = select.val();

		if(val != ""){
			frame.attr('src',"/submissions?name=" + val);
		}

	});

});

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};