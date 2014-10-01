TargetCA.wilson = {
	init : function(){
		if( $( '.category.p-tom' ).length == 0 ) return false;

		var currentHash = TargetCA.helpers.getHash();
		if( currentHash != "" && currentHash != "skipToMainContent" ){
			$( '#' + currentHash ).attr( 'tabindex', 0 ).focus();
		}

		if ( ( "onhashchange" in window ) && !( $.browser.msie ) ) {
			$( window ).bind( "hashchange", function () {
				TargetCA.wilson.hashChange();
			} );
		} else {
			var previousHash = window.location.hash;
			setInterval( function(){
				if( window.location.hash != previousHash ){
					previousHash = window.location.hash;
					TargetCA.wilson.hashChange();
				}
			}, 150);
		}

		this.initLookbooks( function(){
			$( 'a, button, #viewport', $( '.expand' ) ).attr( 'tabindex', '-1' );
			$( '.expandLookBook' ).click( TargetCA.wilson.expandHandler );
			$( '.expand a.closeBtn' ).click( TargetCA.wilson.collapseHandler );
		});

		this.specialRollovers();
		$( window ).bind( 'load resize orientationchange', TargetCA.wilson.resizeHandler );
	},
	initLookbooks : function( callback ){
		var loadedCounter = 0;
		$.each( $( '.inpage-look-book' ), function( index, value ){
			var carouselObj = null;
			var windowWidth = $( window ).width();

			var total = TargetCA.carousel.pad( $( '.slide', $( value ) ).length, 2, 0 );
			$.each( $( '.big', $( value ) ), function( iIndex, iValue ){
				$( iValue ).html( TargetCA.carousel.pad( iIndex + 1, 2, 0 ) )
			});
			$( '.total', $( value ) ).html( total );

			var carouselWidth = windowWidth;
			var carouselHeight = 660;
			var firstTimeComplete = true;
			carouselObj = {
				vpSelector: "#viewport",
				vpWidth: carouselWidth,
				vpHeight: carouselHeight,
				transitionSpeed : 800,
				transition: "loopingSlide",
				rolloverClass: "carouselRollover",
				activeClass: "carouselActive",
				autoInterval: false,
				onStart: function( cb ) {
					
				},
				onInitialize: function( cb ){
					$( window ).bind( 'load resize orientationchange', function() {
						windowWidth = $( window ).width();
						var imgWrapHeight = 0;
						$( '.inpage-look-book #viewport .slide' ).show();
						$.each( $( '.imgWrap', $( value ) ), function( index, obj ){
							if( $( obj ).outerHeight( true ) > imgWrapHeight ){
								imgWrapHeight = $( obj ).outerHeight( true );
							}
						} );
						var modelHeight = 0;
						$.each( $( '.modalWrap', $( value ) ), function( index, obj ){
							if( $( obj ).outerHeight( true ) > modelHeight ){
								modelHeight = $( obj ).outerHeight( true );
							}
						} );
						$( value ).Carousel( "updateHeight", imgWrapHeight + modelHeight );
						$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );

						if( windowWidth < 721 ){
							if( windowWidth < 320 ){
								$( value ).Carousel( "updateWidth", 320, "inpage" );
							}
						}
						$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( imgWrapHeight - $( '.inpage-look-book .carousel-prev' ).height() ) / 2 );
						
						if( $( value ).parent().parent().hasClass( 'open' ) ){
							var calcExpandHeight = $( '.expand', $( value ).parent().parent().parent() ).css( 'height', 'auto' ).outerHeight( true );
							$( '.expand', $( value ).parent().parent() ).css( 'height', calcExpandHeight );
						}

						$( '.white-background', $( value ).parent().parent() ).height( Math.ceil( ( $( value ).parent().offset().top + $( value ).parent().outerHeight( true ) ) - ( $( '.imgWrap', $( value ) ).offset().top + $( '.imgWrap', $( value ) ).outerHeight( true ) ) ) );
						if( $( 'body' ).hasClass( 'ff' ) || $( 'body' ).hasClass( 'ie' ) ){
							$( '.white-background', $( value ).parent().parent() ).height( $( '.white-background', $( value ).parent().parent() ).height() + 0.5 );	
						}

						if( imgWrapHeight + modelHeight > 500 ){
							var imgWrapHeight = 0;
							$( '.inpage-look-book #viewport .slide' ).show();
							$.each( $( '.imgWrap', $( value ) ), function( index, obj ){
								if( $( obj ).outerHeight( true ) > imgWrapHeight ){
									imgWrapHeight = $( obj ).outerHeight( true );
								}
							} );
							var modelHeight = 0;
							$.each( $( '.modalWrap', $( value ) ), function( index, obj ){
								if( $( obj ).outerHeight( true ) > modelHeight ){
									modelHeight = $( obj ).outerHeight( true );
								}
							} );
							$( value ).Carousel( "updateHeight", imgWrapHeight + modelHeight );
							$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( imgWrapHeight - $( '.inpage-look-book .carousel-prev' ).height() ) / 2 );

							if( $( value ).parent().parent().hasClass( 'open' ) ){
								var calcExpandHeight = $( '.expand', $( value ).parent().parent().parent() ).css( 'height', 'auto' ).outerHeight( true );
								$( '.expand', $( value ).parent().parent() ).css( 'height', calcExpandHeight );
							}

							$( '.white-background', $( value ).parent().parent() ).height( Math.ceil( ( $( value ).parent().offset().top + $( value ).parent().outerHeight( true ) ) - ( $( '.imgWrap', $( value ) ).offset().top + $( '.imgWrap', $( value ) ).outerHeight( true ) ) ) );
							if( $( 'body' ).hasClass( 'ff' ) || $( 'body' ).hasClass( 'ie' ) ){
								$( '.white-background', $( value ).parent().parent() ).height( $( '.white-background', $( value ).parent().parent() ).height() + 0.5 );	
							}
						}
					});
					
					loadedCounter++;
					if( loadedCounter == $( '.inpage-look-book' ).length ){
						callback();
					}
				},
				onComplete : function ( cb ) {
					//prevent auto focus on page load
					if( firstTimeComplete ) {
						firstTimeComplete = false;
						return;
					}

					$( value ).attr( 'tabindex', '0' ).focus();
					if( !$( 'body' ).hasClass( 'iPhone' ) ){
						$( '.inpage-look-book.dream .selected' ).attr( 'tabindex', 0 ).focus();
					}
				}
			}

			if( carouselObj != null ){
				$( value ).Carousel( carouselObj );
				$( value ).Carousel( "inpageswipe" );

				// SA: Add keyboard handling when focus is in carousel object
				$(document).keyup(function(e){
					// SA: Check to see if focus is in the carousel before doing anything
					if($( value ).has($(document.activeElement)).length > 0){
						// SA: If the keycode isn't in this group, stop right here
						if ( e.keyCode != 37 && e.keyCode != 39 ) {
							return;
						}

						e.preventDefault();
						e.stopPropagation();

						var cases = {
							37: function(){ // Left arrow key
								$( value ).Carousel('previous');
							},
							39: function(){ // Right arrow key
								$( value ).Carousel('next');
							}
						};

						// SA: Check to see if a function is defined for the given key
						// SA: Fire if it's available
						if(cases[e.keyCode]){
							cases[e.keyCode]();
						}
					}
				});
			}

			$( ".carousel-next, .carousel-prev ", $( value ) ).bind( 'touchstart', function(){
				$( this ).removeClass( 'touchend' ).addClass( 'touchstart' );
			}).bind( 'touchend', function(){
				$( this ).removeClass( 'touchstart' ).addClass( 'touchend' );
				$( value ).focus();
			});

			$( ".carousel-next", $( value ) ).click(function(){
				$( value ).Carousel( "next" );
				return false;
			});

			$( ".carousel-prev", $( value ) ).click(function(){
				$( value ).Carousel( "previous" );
				return false;
			});
		});
	},
	expandHandler : function(){ //handles expansion
		if( $( '.expand', $( this ).parent().parent() ).hasClass( 'open' ) ) return false;
		var animateObj = {};
		var calcHeight = $( '.expand', $( this ).parent().parent() ).css( 'height', 'auto' ).outerHeight( true );
		$( '.expand', $( this ).parent().parent() ).css( 'height', '0px' ).addClass( 'displayTopBorder' );
		animateObj = {
			height : calcHeight + 'px'
		}
		
		TargetCA.wilson.animateExpand( animateObj, $( this ).parent().parent(), function(){
			$( '.expand #viewport', $( this ).parent() ).attr( 'tabindex', '0' ).focus();
			$( '.expand', $( this ).parent() ).addClass( 'open' );
			$( 'a, button', $( '.expand', $( this ).parent() ) ).attr( 'tabindex', '0' );
			$( window ).scrollTop( $( '.expand #viewport', $( this ).parent() ).offset().top );
		} );
	},
	collapseHandler : function() { //collapses expansion
		var animateObj = {};
		animateObj = {
			height : 0
		}
		TargetCA.wilson.animateExpand( animateObj, $( this ).closest( '.panel' ), function(){
			$( '.expand', $( this ).parent() ).removeClass( 'displayTopBorder open' );
			$( 'a, button, #viewport', $( '.expand', $( this ).parent() ) ).attr( 'tabindex', '-1' );
		} );
	},
	animateExpand : function( animateObj, scope, callback ){
		var returnCallback = callback;
		if( typeof callback === "undefined" || callback == null ){
			returnCallback = function(){};
		}
		$( '.expand', scope ).animate( animateObj, 500, returnCallback );
	},
	resizeHandler : function(){
		var windowWidth = $( window ).width();
		var imgNormalHeight = $( '.arrowsContainer img', $( '.category.p-tom' ) )[0].naturalHeight;
		if( $( 'body' ).hasClass( 'ie' ) ){
			var img = new Image();
			img.src = $( '.arrowsContainer img', $( '.category.p-tom' ) )[0].src;
			imgNormalHeight = img.height;
		}

		var arrowOffset = ( $( '.arrowsContainer img', $( '.category.p-tom' ) ).height() / imgNormalHeight ) * ( imgNormalHeight * 0.75 ); //I want 3/4 of the arrows to be above the line; 
		var calcArrowPosition = $( '#women', $( '.category.p-tom' ) ).offset().top - arrowOffset;
		$( '.arrowsContainer', $( '.category.p-tom' ) ).css( 'top', ( calcArrowPosition ) + 'px' );
		
		$( '.panel img.model' ).bind( 'load', function(){
			TargetCA.wilson.handlePanelComplete( $( this ) );
		}).each( function( index, value ) {
			if( value.complete && value.height > 100 ){
				TargetCA.wilson.handlePanelComplete( $( value ) );
			}
		});

		//handle video scaling to avoid black bars
		var originalVideoThumbWidth = 890;
		var originalVideoThumbHeight = 501;
		var scaledHeight = Math.round( ( $( '.panel.last video' ).width() / originalVideoThumbWidth ) * originalVideoThumbHeight );
		$( '.panel.last video' ).css( 'height', scaledHeight + 'px' );

		//fix Safari issue
		if( $( 'body' ).hasClass( 'tablet' ) && $( 'body' ).hasClass( 'safari6' ) ) {
			$( '.panel.last .video a.videoButton' ).height( $( '.panel.last .video #poster' ).height() );
			$( '.panel.last .video .accessibleSprite' ).css( 'margin-top', '-5%' );
		}
	},
	handlePanelComplete : function( obj ){
		var imgNormalHeight = $( obj )[0].naturalHeight;
		if( $( 'body' ).hasClass( 'ie' ) ){
			var img = new Image();
			img.src = $( obj )[0].src;
			imgNormalHeight = img.height;
		}
		var calcMarginTop = Math.floor( ( $( obj ).height() / imgNormalHeight ) * parseFloat( $( obj ).attr( 'data-top-padding' ) ) );
		var calcMarginBottom = Math.floor( ( $( obj ).height() / imgNormalHeight ) * parseFloat( $( obj ).attr( 'data-bottom-padding' ) ) );
		calcMarginBottom -= 2;
		calcMarginBottom = 0;
		$( obj ).css({ 
			'top' : -calcMarginTop + 'px',
			'margin-bottom' : -calcMarginTop + 'px'
		});
	},
	specialRollovers : function() {
		var rolloverArray = [ 'women-over.png', 'men-over.png', 'kids-over.png', 'home-over.png', 'sign-up-over.png' ];
		var i;
		for( i = 0; i < rolloverArray.length; i++ ){
			var img = new Image();
			img.src = '/assets/images/category-pages/toms/' + rolloverArray[i];
		}

		$( '.category.p-tom .panel .centerContainer nav ul li a, .category.p-tom .panel.last .centerContainer .callouts a.signUpBtn' ).bind( 'mouseover mouseout focus blur mouseleave', function( evt ){
			if( evt.type == "mouseover" || evt.type == "focus " ){
				$( 'img', $( this ) ).attr( 'src', '/assets/images/category-pages/toms/' + $( this ).attr( 'data-over' ) );
			} else {
				$( 'img', $( this ) ).attr( 'src', '/assets/images/category-pages/toms/' + $( this ).attr( 'data-out' ) );
			}
		});

		//handling touch events
		$( '.socialLinkContainer a' ).bind( 'touchstart touchend', function(){
			$( this ).toggleClass( 'touch-hover-effect' );
		});
	}, 
	hashChange : function (){
		var currentHash = TargetCA.helpers.getHash();
		if( currentHash != "" && currentHash != "skipToMainContent" ){
			$( '#' + currentHash ).attr( 'tabindex', 0 ).focus();
		}
	}
}