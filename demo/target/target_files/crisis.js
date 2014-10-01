/**
 * @Target.ca Crisis
 * @Crisis messeging logic for all of target.ca
 * @author paul.placido@target.com, stuart.milsten@target.com
 */

TargetCA.crisis = {
	init: function() {
		if ($('.crisis-message').is(":visible")) {
			$("body").addClass('crisis');
			if ($('.white-wrap').children(0).hasClass('category') || $('.white-wrap').children(0).hasClass('hp--hero')) {
				this.adjustColor();
			}
		}
	}, // End init
	adjustColor: function() {
		$('.crisis-container').css('background-color','#f2f2f2');
		if ($('.crisis-message').is(":visible")) {
			$("body").addClass('crisis');
			/*if($('body').hasClass('ie7') || $('body').hasClass('ie8')) {
				$('#core').css({
					'top' : '-0px',
					'position' : 'relative'
				});
			}*/
		}
	} // End adjustColor function
} // End crisis namespace