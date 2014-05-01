require(['foundation/main'], function () {
	var $ = require('jquery/nyt');

	$(document).ready(function() {
	$('#bar1-3panel').hover(function() {
		$('#hovercard').stop(true, true).delay(400).fadeIn('fast');
		$('.nyt-button-actions').removeClass('highlightButton');
		$('#Bar1').mouseleave(function() {
			$('#hovercard').stop(true, true).delay(0).fadeOut('fast');
		});
	});

	$('.split').hover(function() {
		$('.nyt-button-actions').removeClass('highlightButton');
		$(this).find('.nyt-button-actions').addClass('highlightButton'); 
	});
  });
});