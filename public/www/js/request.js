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
	


});