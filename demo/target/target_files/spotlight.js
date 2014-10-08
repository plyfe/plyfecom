/*
 * @Target.ca Spotlights
 * @Spotlight page logic
 * @author paul.placido@target.com, babyrobot
 */

TargetCA.spotlights = {
	width: null,
	init: function() {
		this.width = $(window).width();
		if($('body').hasClass('ff')) {
			setTimeout(this.resizing, 500); //Temporary fix for firefox
		} else {
			this.resizing();
		}
		
	},
	// handler for window resize event
	resizing: function() {
		this.width = $(window).width();
		var aspectRatio, // ratio of width to height (used for each image)
			calc_top, // the new top position (reused for several elements)
			newTop, // the new top position (for the hero element)
			w = this.width; // the new window width

		// adjust each spotlight item
		$('.spotlight').each(function(index) {
			aspectRatio = ($('.spotlight-image', this).outerWidth()/305)*300;
			$(this).height(aspectRatio+10);
			if($(this).height() > $('.spotlight-content', this).height() ) {
				$('.spotlight-content', this).css({
					marginTop: ($(this).height()/2) - ($('.spotlight-content', this).height()/2)
				});
			} else {
				$('.spotlight-content', this).css('marginTop', 0);
				$(this).height($('.spotlight-content', this).height() + 20);
				if(w <= 735) $(this).css('marginTop', 10);
			}
			if($('#goCommercialVideo video').length){
				$('#goCommercialVideo video').css('width', '100%');
				$('#goCommercialVideo video').css('height', aspectRatio+1);
			}
		});

		if($('.hp--hero-text').length > 0 ) {
			newTop = '';
			if( w == 721 ) {
				if($( 'body' ).hasClass( 'fr' ) ) {
					$('.hp--hero-img-jpg, .hp--hero-img-png').css({'top': '50px', 'left': '0px'});
					$('.hp--hero-headline').css({'margin-top': '100px', 'width': '67%'});
					$('.hp--hero-text').attr('style', 'top: -44px !important; left: -164px !important;');
				} else {
					$('.hp--hero-img-jpg, .hp--hero-img-png').css({'top': '109px', 'left': '0px'});
					$('.hp--hero-headline').css('margin-top', '165px');
					$('.hp--hero-text').attr('style', 'top: -20px !important; left: -175px !important;');
				}
			} else {
				$('.hp--hero-img-jpg, .hp--hero-img-png, .hp--hero-headline, .hp--hero-text').attr('style', '');
			}
			if(w >= 320 && w < 480 ) {
				if($('body').hasClass('fr') ) {
					newTop = '10px';
					$('.hp--hero-text').css('left', '-13px');
					$('.hp--hero-headline').css('top', 'auto');
				} else {
					newTop = '20px';
					$('.hp--hero-text').css('left', '-13px');
				}
			} else {
				if($('body').hasClass('fr') ) {
					newTop = '-14px';
					if( (w > 768) && (w <= 1024) ) {
						$('.hp--hero-text').css('left', '-45px');
					} else if( (w < 768) && (w >= 480) ) {
						$('.hp--hero-text').css('left', '-45px');
					} else {
						$('.hp--hero-text').css('left', '-30px');
					}

					if( (w == 768) && ($('body').hasClass('fr')) ) {
						$('.hp--hero-headline').css('top', '33px');
					} else {
						$('.hp--hero-headline').css('top', '-20px');
					}

					if( (w >= 595) && (w < 725) ) {
						$('.hp--hero-img-jpg, .hp--hero-img-png').css({'top': 'auto', 'bottom': '-23%'});
					} else {
						$('.hp--hero-img-jpg, .hp--hero-img-png').attr('style', '' );
					}
				} else {
					newTop = '14px';
					if( (w > 580) && (w < 650) ) {
						newTop = '4px';
					} else if( (w >= 650) && (w < 730) ) {
						newTop = '-7px';
					}
					if(w < 768) {
						$('.hp--hero-text').css('left', '-53px');
					} else {
						$('.hp--hero-text').css('left', '-13px');
					}
				}
			}
			if(w < 768) {
				$('.hp--hero-text').css('top', newTop);
			} else if( (w > 1024) && ($('body').hasClass('fr')) ){
				$('.hp--hero-text').css('top', '-30px');
			}
			if(w >= 730) {
				$('.hp--hero-text').attr('style', '');
			}
			if($('body').hasClass('fr') ) {
				if(w < 1025) {
					if($('.hp--hero-headline span.l2').height() > 100) {
						$('.hp--hero-headline span.l2').css({'margin-left': '15px', 'margin-bottom': '-30px'});
					} else {
						$('.hp--hero-headline span.l2').css({'margin-left': '-15px', 'margin-bottom': '-15px'});
					}
				} else {
					$('.hp--hero-headline span.l2').attr('style', '');
				}
			}
		}

		if($('.category.apparel .cat-details .wrap1 .wrap2').length > 0) {
			if(w <= 736) {
				calc_top = $('.samLibby').position().top;
				$('.category.apparel .cat-details .wrap1 .wrap2').css('top', calc_top);
				if( (w >= 320) && (w < 480) ) {
					if($('body').hasClass('fr') ) {
						$('.category.apparel .cat-details .wrap4').css('margin-bottom', '10px');
					} else {
						$('.category.apparel .cat-details .wrap4').css('margin-bottom', '0px');
					}
				} else if( (w >= 480) && (w <= 736) ) {
					if($('body').hasClass('fr') ) {
						$('.category.apparel .cat-details .wrap4').css('margin-bottom', '115px');
					} else {
						$('.category.apparel .cat-details .wrap4').css('margin-bottom', '95px');
					}
				} else {
					$('.category.apparel .cat-details .wrap4').attr('style', '');
				}
			}
		}
/*
		if($( '.category.apparel .cat-details .wrap4 img.apparel-jumping' ).length > 0) {
			if(w <= 736) {
				calc_top = $('.champion').position().top + $('.champion').height();
				$('.category.apparel .cat-details .wrap4 img.apparel-jumping').css('top', calc_top);
			}
		}
*/
		
	}
}