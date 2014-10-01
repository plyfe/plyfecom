/**
 * @Target.ca carousel
 * @Logic created for functionality of the JQuery carousel.
 * @author paul.placido@target.com, baby robot
 */

TargetCA.carousel = {
	init : function() {
		this.carousel();
		this.inpagelookbook();
		this.checkInPageCarouselHash();
	},
	carousel:function() {
		if( $( '#carousel' ).length == 0 ) return false;

		var carousel = $( '#carousel' );
		var carouselObj = null;
		var windowWidth = $( window ).width();
		var animating = false;

		if( $( '.carousel.phillip-lim .nav-slider' ).length != 0 ) {
			//Phillip Lim Carousel
			var now = new Date();
			var morning = new Date();
			morning.setHours( 9, 30 );
			var noon = new Date();
			noon.setHours( 13, 30 );
			var night = new Date();
			night.setHours( 19, 45 );

			var carouselWidth = 1064;
			if( windowWidth <= 1026 ){
				carouselWidth = windowWidth;
			}

			carouselObj = {
				vpSelector: "#viewPort",
				vpWidth: carouselWidth,
				vpHeight: 600,
				navSelector: ".nav",
				transition: "displayAllLoopingSlide",
				rolloverClass: "carouselRollover",
				activeClass: "carouselActive",
				autoInterval: false,
				showNextPrevSlides : true,
				onStart: function( cb ) {
					if( $( '.carousel .nav-slider' ).length == 0 ) return false;

					var originalLeft = $( '.nav-slider' ).css( 'left' );
					$( '.nav-slider' ).removeClass( 'morning noon night' );
					switch( cb.slideIndex ){
						case 0 :
							$( '.nav-slider' ).attr( 'style', "" ).addClass( 'morning' );
							break;
						case 1 :
							$( '.nav-slider' ).attr( 'style', "" ).addClass( 'noon' );
							break;
						case 2 :
							$( '.nav-slider' ).addClass( 'night' );
							break;
					}

					var calcLeft = $( '.nav-slider' ).css( 'left' );
					$( '.nav-slider' ).css( 'left', originalLeft );

					$( '.nav-slider .content' ).stop().animate( {
						opacity : 0
					}, 250, function(){
						$( '.nav-slider .content' ).hide();
						$( $( '.nav-slider .content' )[cb.slideIndex] ).stop().show().css( 'opacity', 0 ).animate( {
							opacity : 1
						}, 250 );
					} );

					if( $( '.nav-slider' ).hasClass( 'night' ) ){
						calcLeft = $( cb.settings.navSelector + ' .night' ).position().left - $( '.nav-slider' ).width() - 5; //5 == offset
					}
					animating = true;
					$( '.nav-slider' ).stop().animate( {
						left: calcLeft
					}, 500, function(){
						if( !$( '.nav-slider' ).hasClass( 'night' ) ){
							$( '.nav-slider' ).attr( 'style', "" );
						}
						animating = false;
					} )
				},
				onInitialize: function( cb ){
					var windowWidth = $( window ).width();

					$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
					$( '.carousel .opaqueRight' ).css( {
						'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
						'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
					} );

					$( window ).load( function(){
						$( window ).bind( 'resize orientationchange', function() {
							$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
							$( '.carousel .opaqueRight' ).css( {
								'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
								'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
							} );

							windowWidth = $( window ).width();
							if( windowWidth <= 1026 ){
								$( '#carousel' ).Carousel( "updateWidth", windowWidth );
								$( '.category.philip-lim .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 5 ); //5 == offset number
							} else {
								$( '#carousel' ).Carousel( "updateWidth", 1064 );
								$( '.category.philip-lim .cat-header-bg' ).height( 600 );
							}

							if( windowWidth <= 721 ) {
								$( '.category.philip-lim .cat-header-bg' ).height( 400 );
							}

							//fix issue with 721px
							if( windowWidth == 721 ) {
								$( '.category.philip-lim .cat-header-bg' ).css( 'margin-top', '-51px' );
							} else {
								$( '.category.philip-lim .cat-header-bg' ).css( 'margin-top', '' );
							}

							if( $( '.nav-slider' ).hasClass( 'night' ) ){
								$( '.nav-slider' ).css( 'left', $( cb.navSelector + ' .night' ).position().left - $( '.nav-slider' ).width() - 5 ); //5 == offset number
							}
						});

						setInterval( function(){
							if( $( '.nav-slider' ).hasClass( 'night' ) && !animating ){
								$( '.nav-slider' ).css( 'left', $( cb.navSelector + ' .night' ).position().left - $( '.nav-slider' ).width() - 5 ); //5 == offset number
							}
						}, 500 );

						windowWidth = $( window ).width();
						if( windowWidth <= 1026 ){
							$( '#carousel' ).Carousel( "updateWidth", windowWidth );
							$( '.category.philip-lim .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 8 ); //10 == offset number
						}

						if( windowWidth <= 721 ) {
							$( '.category.philip-lim .cat-header-bg' ).height( 400 );
						}
					});

					if( $( '.carousel .nav-slider' ).length == 0 ) return false;

					$( '.nav-slider .content' ).hide();
					$( '.nav-slider' ).removeClass( 'morning noon night' );

					if( now >= morning && now < noon ) { //morning
						$( '.nav-slider' ).addClass( 'morning' );
						$( '.nav-slider .morning' ).show();
					} else if( now >= noon && now < night ) { //noon
						$( '.nav-slider' ).addClass( 'noon' );
						$( '.nav-slider .noon' ).show();
						$( '#carousel .nav li.noon a' ).trigger( 'click' );
					} else { //night
						$( '.nav-slider' ).addClass( 'night' );
						$( '.nav-slider .night' ).show();
						$( '#carousel .nav li.night a' ).trigger( 'click' );
					}

					var calcAspect = 0;
					if( windowWidth <= 1026 && windowWidth > 721 ){
						calcAspect = $( window ).width() / 1064;
						$( '.category.philip-lim .cat-header-bg' ).height( ( 600 * calcAspect ) - 8 );
					}
				}
			};

		}

		if($( '.carousel.threshold' ).length != 0) {
			var carouselWidth = 1064;
			if( windowWidth <= 1026 ){
				carouselWidth = windowWidth;
			}

			carouselObj = {
				vpSelector: "#viewPort",
				vpWidth: carouselWidth,
				vpHeight: 500,
				navSelector: ".nav",
				transition: "displayAllLoopingSlide",
				rolloverClass: "carouselRollover",
				activeClass: "carouselActive",
				autoInterval: false,
				showNextPrevSlides : true,
				onStart: function( cb ) {

				},
				onInitialize: function( cb ){
					var windowWidth = $( window ).width();

					$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
					$( '.carousel .opaqueRight' ).css( {
						'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
						'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
					} );

					$( window ).load( function(){
						$( window ).bind( 'resize orientationchange', function() {
							$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
							$( '.carousel .opaqueRight' ).css( {
								'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
								'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
							} );

							windowWidth = $( window ).width();
							if( windowWidth <= 1026 ){
								$( '#carousel' ).Carousel( "updateWidth", windowWidth );
								$( '.category.threshold .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 5 ); //5 == offset number
							} else {
								$( '#carousel' ).Carousel( "updateWidth", 1064 );
								$( '.category.threshold .cat-header-bg' ).height( 500 );
							}

							if( windowWidth <= 721 ) {
								$( '.category.threshold .cat-header-bg' ).height( 400 );
							}

							//fix issue with 721px
							if( windowWidth == 721 ) {
								$( '.category.threshold .cat-header-bg' ).css( 'margin-top', '-51px' );
							} else {
								$( '.category.threshold .cat-header-bg' ).css( 'margin-top', '' );
							}


						});


						windowWidth = $( window ).width();
						if( windowWidth <= 1026 ){
							$( '#carousel' ).Carousel( "updateWidth", windowWidth );
							$( '.category.threshold .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 8 ); //10 == offset number
						}

						if( windowWidth <= 721 ) {
							$( '.category.threshold .cat-header-bg' ).height( 400 );
						}
					});


					var calcAspect = 0;
					if( windowWidth <= 1026 && windowWidth > 721 ){
						calcAspect = $( window ).width() / 1064;
						$( '.category.threshold .cat-header-bg' ).height( ( 500 * calcAspect ) - 8 );
					}
				}
			};

		}


		if($( '.carousel.cork' ).length != 0) {
			var carouselWidth = 1062;
			if( windowWidth <= 1026 ){
				carouselWidth = windowWidth;
			}

			carouselObj = {
				vpSelector: "#viewPort",
				vpWidth: carouselWidth,
				vpHeight: 500,
				navSelector: ".nav",
				transition: "displayAllLoopingSlide",
				rolloverClass: "carouselRollover",
				activeClass: "carouselActive",
				autoInterval: false,
				showNextPrevSlides : true,
				onStart: function( cb ) {

				},
				onInitialize: function( cb ){
					var windowWidth = $( window ).width();

					$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
					$( '.carousel .opaqueRight' ).css( {
						'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
						'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
					} );

					$( window ).load( function(){
						$( window ).bind( 'resize orientationchange', function() {
							$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
							$( '.carousel .opaqueRight' ).css( {
								'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
								'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
							} );

							windowWidth = $( window ).width();
							if( windowWidth <= 1026 ){
								if( !$( 'body' ).hasClass( 'ie8' ) ){
									$( '#carousel' ).Carousel( "updateWidth", windowWidth );
								}
								$( '.category.threshold .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 5 ); //5 == offset number
							} else {
								$( '#carousel' ).Carousel( "updateWidth", 1062 );
								$( '.category.threshold .cat-header-bg' ).height( 500 );
							}

							if( windowWidth <= 721 ) {
								$( '.category.threshold .cat-header-bg' ).height( 400 );
							}

							//fix issue with 721px
							if( windowWidth == 721 ) {
								$( '.category.threshold .cat-header-bg' ).css( 'margin-top', '-51px' );
							} else {
								$( '.category.threshold .cat-header-bg' ).css( 'margin-top', '' );
							}
						});


						windowWidth = $( window ).width();
						if( windowWidth <= 1026 ){
							$( '#carousel' ).Carousel( "updateWidth", windowWidth );
							$( '.category.threshold .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 8 ); //10 == offset number
						}

						if( windowWidth <= 721 ) {
							$( '.category.threshold .cat-header-bg' ).height( 400 );
						}
					});


					var calcAspect = 0;
					if( windowWidth <= 1026 && windowWidth > 721 ){
						calcAspect = $( window ).width() / 1062;
						$( '.category.threshold .cat-header-bg' ).height( ( 500 * calcAspect ) - 8 );
					}
				}
			};

		}

		if($( '.carousel.dream' ).length != 0) {
			var carouselWidth = 1062;
			if( windowWidth <= 1026 ){
				carouselWidth = windowWidth;
			}

			carouselObj = {
				vpSelector: "#viewPort",
				vpWidth: carouselWidth,
				vpHeight: 600,
				navSelector: ".nav",
				transition: "displayAllLoopingSlide",
				rolloverClass: "carouselRollover",
				activeClass: "carouselActive",
				autoInterval: false,
				showNextPrevSlides : true,
				onStart: function( cb ) {

				},
				onInitialize: function( cb ){
					var windowWidth = $( window ).width();

					$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
					$( '.carousel .opaqueRight' ).css( {
						'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
						'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
					} );

					$( window ).load( function(){
						$( window ).bind( 'resize orientationchange', function() {
							$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
							$( '.carousel .opaqueRight' ).css( {
								'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
								'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
							} );

							windowWidth = $( window ).width();
							if( windowWidth <= 1026 ){
								if( !$( 'body' ).hasClass( 'ie8' ) ){
									$( '#carousel' ).Carousel( "updateWidth", windowWidth );
								}
								$( '.category.threshold .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 5 ); //5 == offset number
							} else {
								$( '#carousel' ).Carousel( "updateWidth", 1062 );
								$( '.category.threshold .cat-header-bg' ).height( 500 );
							}

							if( windowWidth <= 721 ) {
								$( '.category.threshold .cat-header-bg' ).height( 400 );
							}

							//fix issue with 721px
							if( windowWidth == 721 ) {
								$( '.category.threshold .cat-header-bg' ).css( 'margin-top', '-51px' );
							} else {
								$( '.category.threshold .cat-header-bg' ).css( 'margin-top', '' );
							}
						});


						windowWidth = $( window ).width();
						if( windowWidth <= 1026 ){
							$( '#carousel' ).Carousel( "updateWidth", windowWidth );
							$( '.category.threshold .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 8 ); //10 == offset number
						}

						if( windowWidth <= 721 ) {
							$( '.category.threshold .cat-header-bg' ).height( 400 );
						}
					});


					var calcAspect = 0;
					if( windowWidth <= 1026 && windowWidth > 721 ){
						calcAspect = $( window ).width() / 1062;
						$( '.category.threshold .cat-header-bg' ).height( ( 500 * calcAspect ) - 8 );
					}
				}
			};

		}



		if($( '.category.baby.landing' ).length != 0) {
			carouselObj = {
				vpSelector: "#viewPort",
				vpWidth: 290,
				vpHeight: (culture=="en")?395:430,
				navSelector: ".nav",
				transition: "displayAllLoopingSlide",
				rolloverClass: "carouselRollover",
				activeClass: "carouselActive",
				autoInterval: false,
				showNextPrevSlides : true,
				onStart: function( cb ) {

				},
				onInitialize: function( cb ){
				}
			};

		}


		if($( '.carousel.peter-pilotto' ).length != 0) {
			var carouselWidth = 1064;
			if( windowWidth <= 1026 ){
				carouselWidth = windowWidth;
			}

			carouselObj = {
				vpSelector: "#viewPort",
				vpWidth: carouselWidth,
				vpHeight: 533,
				navSelector: ".nav",
				transition: "displayAllLoopingSlide",
				rolloverClass: "carouselRollover",
				activeClass: "carouselActive",
				autoInterval: false,
				showNextPrevSlides : true,
				onStart: function( cb ) {

				},
				onInitialize: function( cb ){
					var windowWidth = $( window ).width();

					$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
					$( '.carousel .opaqueRight' ).css( {
						'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
						'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
					} );

					$( window ).load( function(){
						$( window ).bind( 'resize orientationchange', function() {
							$( '.carousel .opaqueLeft' ).css( 'width', $( '.mid-viewport' ).offset().left + 'px' );
							$( '.carousel .opaqueRight' ).css( {
								'width' : $( window ).width() - ( $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width() ),
								'left' : $( '.mid-viewport' ).offset().left + $( '.mid-viewport' ).width()
							} );

							windowWidth = $( window ).width();
							if( windowWidth <= 1026 ){
								$( '#carousel' ).Carousel( "updateWidth", windowWidth );
								$( '.category.peter-pilotto .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 5 ); //5 == offset number
							} else {
								$( '#carousel' ).Carousel( "updateWidth", 1064 );
								$( '.category.peter-pilotto .cat-header-bg' ).height( 500 );
							}

							if( windowWidth <= 721 ) {
								$( '.category.peter-pilotto .cat-header-bg' ).height( 400 );
							}

							//fix issue with 721px
							if( windowWidth == 721 ) {
								$( '.category.peter-pilotto .cat-header-bg' ).css( 'margin-top', '-51px' );
							} else {
								$( '.category.peter-pilotto .cat-header-bg' ).css( 'margin-top', '' );
							}


						});


						windowWidth = $( window ).width();
						if( windowWidth <= 1026 ){
							$( '#carousel' ).Carousel( "updateWidth", windowWidth );
							$( '.category.peter-pilotto .cat-header-bg' ).height( $( '.carousel .slide img' ).height() - 8 ); //10 == offset number
						}

						if( windowWidth <= 721 ) {
							$( '.category.peter-pilotto .cat-header-bg' ).height( 400 );
						}
					});


					var calcAspect = 0;
					if( windowWidth <= 1026 && windowWidth > 721 ){
						calcAspect = $( window ).width() / 1064;
						$( '.category.peter-pilotto .cat-header-bg' ).height( ( 500 * calcAspect ) - 8 );
					}
				},
				onComplete : function( cb ){
					if( cb.currentSlideIndex != 0 ){
						$( '.category.peter-pilotto #carousel #slide1 a' ).attr( 'tabindex', "-1" );
					} else {
						$( '.category.peter-pilotto #carousel #slide1 a' ).attr( 'tabindex', "" );
					}
				}
			};

		}

		if( carouselObj != null ){
			carousel = $( '#carousel' );

            carousel.Carousel( carouselObj );

            // SA: Add keyboard handling when focus is in carousel object
			$(document).keyup(function(e){
				// SA: Check to see if focus is in the carousel before doing anything
				if(carousel.has($(document.activeElement)).length > 0){
					// SA: If the keycode isn't in this group, stop right here
					if ( e.keyCode != 37 && e.keyCode != 39 ) {
						return;
					}

					e.preventDefault();
					e.stopPropagation();

					var cases = {
						37: function(){ // Left arrow key
							carousel.Carousel('previous');
						},
						39: function(){ // Right arrow key
							carousel.Carousel('next');
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

		$( ".carousel-next", $( '#carousel' ) ).click(function(){
			if($(".category.baby.landing").length > 0) {
				$( '#carousel' ).Carousel( "next" , true);
				return;
			}
			$( '#carousel' ).Carousel( "next" );
			return false;
		});

		$( ".carousel-next img, .carousel-prev img" ).bind( 'touchstart', function(){
			if($( '.carousel.threshold' ).length != 0 && $('#ismobile').css('visibility') == 'visible') $( this ).css( 'margin-top', '-33px' );
			else $( $( this ).parent() ).removeClass( 'touchend' ).addClass( 'touchstart' );
		}).bind( 'touchend', function(){
			$( this ).css( 'margin-top', '0px' );
			$( $( this ).parent() ).removeClass( 'touchstart' ).addClass( 'touchend' );
		});


		$( ".carousel-prev", $( '#carousel' ) ).click(function(){
			if($(".category.baby.landing").length > 0) {
				$( '#carousel' ).Carousel( "previous" , true);
				return;
			}
			$( '#carousel' ).Carousel( "previous" );
			return false;
		});
	},
	inpagelookbook : function(){
		if( $( '.inpage-look-book' ).length == 0 ) return false;
		var firstTimeComplete = true;

		$.each( $( '.inpage-look-book' ), function( index, value ){
			var carouselObj = null;
			var windowWidth = $( window ).width();

			var total = TargetCA.carousel.pad( $( '.slide', $( value ) ).length, 2, 0 );
			$.each( $( '.big', $( value ) ), function( iIndex, iValue ){
				$( iValue ).html( TargetCA.carousel.pad( iIndex + 1, 2, 0 ) )
			});
			$( '.total', $( value ) ).html( total );

			if( $( '.inpage-look-book.monster-high' ).length != 0 ){
				var carouselWidth = 585;
				var carouselHeight = 510;
				if( windowWidth < carouselWidth ){
					carouselWidth = windowWidth;
				}

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
							if( windowWidth >= 721 ){
								$( value ).Carousel( "updateHeight", carouselHeight + 10 );
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
							} else if( windowWidth >= 450 && windowWidth < 721 ){
								if( $( '.inpage-look-book.monster-high' ).length != 0 ){
									if( windowWidth >= 450 && windowWidth < 565 ){
										$( value ).Carousel( "updateHeight", carouselHeight - 50 );
									} else {
										$( value ).Carousel( "updateHeight", carouselHeight + 5 );
									}
								} else {
									$( value ).Carousel( "updateHeight", carouselHeight );
								}
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
							} else {
								if( windowWidth < 320 ){
									$( value ).Carousel( "updateHeight", (culture=="en")?360:400 );
									$( value ).Carousel( "updateWidth", 250, "inpage" );
								} else if (windowWidth < 400) {
									if(culture == "en") {
										if( $( '.inpage-look-book.monster-high' ).length != 0 ){
											$( value ).Carousel( "updateHeight", 360 );
										} else {
											$( value ).Carousel( "updateHeight", ( ( windowWidth / 480 ) * carouselHeight ) - 20 );
										}
									} else {
										if( $( '.inpage-look-book.monster-high' ).length != 0 ){
											$( value ).Carousel( "updateHeight", 360 );
										} else {
											$( value ).Carousel( "updateHeight", 345 );
										}
									}

 									if( $( '.inpage-look-book.monster-high' ).length != 0 ){
 										$( value ).Carousel( "updateWidth", windowWidth - 20, "inpage" );
 									} else {
										$( value ).Carousel( "updateWidth", windowWidth - 70, "inpage" );
									}
								} else {
									if(culture == "en"){
										if( $( '.inpage-look-book.monster-high' ).length != 0 ){
											$( value ).Carousel( "updateHeight", ( ( windowWidth / 500 ) * carouselHeight ) +0 );
										} else {
											$( value ).Carousel( "updateHeight", ( ( windowWidth / 530 ) * carouselHeight ) +0 );
										}
									} else {
										if( $( '.inpage-look-book.monster-high' ).length != 0 ){
											$( value ).Carousel( "updateHeight", ( ( windowWidth / 500 ) * carouselHeight ) +20 );
										} else {
											$( value ).Carousel( "updateHeight", ( ( windowWidth / 530 ) * carouselHeight ) +20 );
										}
									}
									$( value ).Carousel( "updateWidth", windowWidth - 70, "inpage" );
								}

							}

							if( windowWidth < 450){
								if($("body").hasClass("ie")) {
									$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 - 40);
								} else {
									if( $( '.inpage-look-book.monster-high' ).length != 0 ){
										$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 - 70);
									} else {
										if( $( 'body' ).hasClass( 'iPhone7' ) ){
											if( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() != null ){
												$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() ) / 2 + 28 );
											} else {
												var intVal = setInterval( function(){
													if( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() != null ){
														$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() ) / 2 + 28 );
														//clearInterval( intVal );
													}
												}, 100 );
											}
										} else {
											setTimeout( function(){
												if( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() != null ){
													$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() ) / 2 + 10 );
												} else {
													var intVal = setInterval( function(){
														if( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() != null ){
															$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() ) / 2 + 10 );
															//clearInterval( intVal );
														}
													}, 100 );
												}
											}, 100 );
										}
									}

								}
							} else if ( windowWidth <= 721 ) {
								if( $( '.inpage-look-book.monster-high' ).length != 0 ){
									$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 - 40 );
								} else {
									if( $( 'body' ).hasClass( 'iPhone7' ) ){
										setTimeout( function(){
											if( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() != null ){
												$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() ) / 2 + 37 );
											} else {
												var intVal = setInterval( function(){
													if( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() != null ){
														$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() ) / 2 + 37 );
														clearInterval( intVal );
													}
												}, 100 );
											}
										}, 100 );
									} else {
										setTimeout( function(){
											if( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() != null ){
												$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() ) / 2 + 10 );
											} else {
												var intVal = setInterval( function(){
													if( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() != null ){
														$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( 'img.mainImage' , $( '.selected', $( value ) ) ).height() ) / 2 + 10 );
														clearInterval( intVal );
													}
												}, 100 );
											}
										}, 100 );
									}
								}
							} else {
								if( $( '.inpage-look-book.cork' ).length != 0 ){
									$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( '.imgWrap' , $( value ) ).height() ) / 2 + 10 );
								}
							}

							if( $( '.inpage-look-book.monster-high' ).length != 0 ){
								$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 - 65 );

								if( windowWidth <= 721 && windowWidth > 480 ){
									$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 + 30 );
								} else if( windowWidth <= 480 && windowWidth > 320 ){
									if( $( 'body' ).hasClass( 'iPhone7' ) ){
										$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 - 35 );
									} else {
										$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 - 25 );
									}
								} else if( windowWidth <= 320 ) {
									$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 - 52 );
								}
							}
						});
					},
					onComplete : function ( cb ) {
						//prevent auto focus on page load
						if(firstTimeComplete) {
							firstTimeComplete = false;
							return;
						}

						$( '.inpage-look-book.monster-high .selected' ).attr( 'tabindex', 0 ).focus();
					}
				}
			}

			if( $( '.inpage-look-book.cork' ).length != 0 ){
				var carouselWidth = 585;
				var carouselHeight = 660;
				if( windowWidth < carouselWidth ){
					carouselWidth = windowWidth;
				}
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
							modelHeight += 30;
							$( value ).Carousel( "updateHeight", imgWrapHeight + modelHeight );
							if( windowWidth >= 721 ){
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
							} else {
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
								if( windowWidth < 320 ){
									$( value ).Carousel( "updateWidth", 250, "inpage" );
								}
							}
							$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( imgWrapHeight - $( '.inpage-look-book .carousel-prev' ).height() ) / 2 );
						});
					},
					onComplete : function ( cb ) {
						//prevent auto focus on page load
						if(firstTimeComplete) {
							firstTimeComplete = false;
							return;
						}
						if( !$( 'body' ).hasClass( 'iPhone' ) ){
							$( '.inpage-look-book.cork .selected' ).attr( 'tabindex', 0 ).focus();
						}
					}
				}
			}

			if( $( '.inpage-look-book.dream' ).length != 0 ){
				var carouselWidth = 585;
				var carouselHeight = 660;
				if( windowWidth < carouselWidth ){
					carouselWidth = windowWidth;
				}
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
							if( windowWidth >= 721 ){
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
							} else {
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
								if( windowWidth < 320 ){
									$( value ).Carousel( "updateWidth", 250, "inpage" );
								}


								;
							}
							$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( imgWrapHeight - $( '.inpage-look-book .carousel-prev' ).height() ) / 2 );
						});
					},
					onComplete : function ( cb ) {
						//prevent auto focus on page load
						if(firstTimeComplete) {
							firstTimeComplete = false;
							return;
						}
						if( !$( 'body' ).hasClass( 'iPhone' ) ){
							$( '.inpage-look-book.dream .selected' ).attr( 'tabindex', 0 ).focus();
						}
					}
				}
			}

			if( $( '.inpage-look-book.halloween1, .inpage-look-book.halloween2' ).length != 0 ){
				var carouselWidth = 585;
				var carouselHeight = 660;
				if( windowWidth < carouselWidth ){
					carouselWidth = windowWidth;
				}
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
							if( windowWidth >= 721 ){
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
							} else {
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
								if( windowWidth < 320 ){
									$( value ).Carousel( "updateWidth", 250, "inpage" );
								}
								
								
								;
							}
							$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( imgWrapHeight - $( '.inpage-look-book .carousel-prev' ).height() ) / 2 );
						});
					},
					onComplete : function ( cb ) {
						//prevent auto focus on page load
						if(firstTimeComplete) {
							firstTimeComplete = false;
							return;
						}
						if( !$( 'body' ).hasClass( 'iPhone' ) ){
							$( '.inpage-look-book .selected' ).attr( 'tabindex', 0 ).focus();
						}
					}
				}
			}

			if( $( '.inpage-look-book.beauty-secrets1, .inpage-look-book.beauty-secrets2, .inpage-look-book.beauty-secrets3' ).length != 0 ){
				if( windowWidth < carouselWidth ){
					carouselWidth = windowWidth;
				}
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
							var displayCache = $($(".slide", value )[0]).css("display");
							$($(".slide", value )[0]).css("display", "block");
							if(windowWidth > 721) {
								$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( '.carousel-prev', $( value ) ).height() ) / 2 );
							} else {
								$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $(".slide", value ).find('.imgWrap').height() - $( '.carousel-prev', $( value ) ).height() ) / 2 );
							}
							$($(".slide", value )[0]).css("display", displayCache);

							if($( value ).hasClass("beauty-secrets1")) {
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
								if(windowWidth > 721) {
									if( culture == "en" ){
										$( value ).Carousel( "updateHeight",400);
									} else {
										$( value ).Carousel( "updateHeight",430);
									}
								} else if (windowWidth > 420) {
									if( culture == "en" ){
										$( value ).Carousel( "updateHeight",550);
									} else {
										$( value ).Carousel( "updateHeight",590);
									}
								} else {
									if( culture == "en" ){
										$( value ).Carousel( "updateHeight",630);
									} else {
										$( value ).Carousel( "updateHeight",660);
									}
								}

								if(windowWidth < 721) {
									$( value ).find("#viewport").css("overflow","visible");
								} else {
									$( value ).find("#viewport").css("overflow","hidden");
								}
							} else if ($( value ).hasClass("beauty-secrets2")) {
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
								if(windowWidth > 799) {
									$( value ).Carousel( "updateHeight",410);
								} else if (windowWidth > 721) {
									if(culture == "en")
										$( value ).Carousel( "updateHeight",370);
									else
										$( value ).Carousel( "updateHeight",380);
								} else if (windowWidth > 420) {
									$( value ).Carousel( "updateHeight",550);
								} else {
									$( value ).Carousel( "updateHeight",640);
								}

								if(windowWidth < 721) {
									$( value ).find("#viewport").css("overflow","visible");
								} else {
									$( value ).find("#viewport").css("overflow","hidden");
								}
							} else if ($( value ).hasClass("beauty-secrets3")) {
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
								if(windowWidth > 721) {
									$( value ).Carousel( "updateHeight",380);
								} else if (windowWidth > 420) {
									if( culture == "en" ){
										$( value ).Carousel( "updateHeight",580);
									} else {
										$( value ).Carousel( "updateHeight",620);
									}
								} else {
									$( value ).Carousel( "updateHeight",(culture=="en")?620:660);
								}

								if(windowWidth > 721 && windowWidth < 910 && culture=="fr") {
									$( value ).Carousel( "updateHeight",420);
								}

								if(windowWidth < 721) {
									$( value ).find("#viewport").css("overflow","visible");
								} else {
									$( value ).find("#viewport").css("overflow","hidden");
								}
							}
						});
					},
					onComplete : function ( cb ) {
						//prevent auto focus on page load
						if(firstTimeComplete) {
							firstTimeComplete = false;
							return;
						}
						if( !$( 'body' ).hasClass( 'iPhone' ) ){
							$( '.inpage-look-book .selected' ).attr( 'tabindex', 0 ).focus();
						}
					}
				}
			}

			if( $( '.inpage-look-book.baby-category' ).length != 0 ){
				var carouselWidth = 668;
				var carouselHeight = 435;
				var babyCategoryLookbookInit = false;
				var isIE8Resized = false;
				if( windowWidth < carouselWidth ){
					carouselWidth = windowWidth;
				}

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
						$( window ).bind( 'load resize orientationchange', function( evt ) {
							//make sure resize event in ie8 only run once when page load
							if(evt.type == "resize" && $(".ie8").length > 0) {
								if(isIE8Resized) return false;
								isIE8Resized = true;
							}

							windowWidth = $( window ).width();
							var intVal = null;
							var curHeight = 0;
							var maxHeight = 0;

							if( windowWidth <= 958 ){
								$( value ).Carousel( "updateWidth", $( value ).parent().width(), "inpage" );
							} else {
								$( value ).Carousel( "updateWidth", 668, "inpage" );

							}

							//mobile
							if( $( '.inpage-look-book.baby-category .imgWrap' ).css( 'display' ) == 'block' ){
								var imgWrapHeight = 0;
								var modelHeight = 0;
								$( '.inpage-look-book #viewport .slide' ).show();
								$.each( $( '.imgWrap', $( value ) ), function( index, obj ){
									if( $( obj ).outerHeight( true ) > imgWrapHeight ){
										imgWrapHeight = $( obj ).outerHeight( true );
									}
								} );

								$.each( $( '.modalWrap', $( value ) ), function( index, obj ){
									if( $( obj ).outerHeight( true ) > modelHeight ){
										modelHeight = $( obj ).outerHeight( true );
									}
								} );
								$( value ).Carousel( "updateHeight", imgWrapHeight + modelHeight + $( '.baby-catalogue-tab', $( value ) ).outerHeight( true ) );
								if( $( 'body' ).hasClass( 'ie' ) ){
									$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', imgWrapHeight / 2 );
								}
								if( $( 'body' ).hasClass( 'ff' ) && windowWidth < 320 ){
									$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', 170 );
								}
							} else {
								$( value ).Carousel( "updateHeight", carouselHeight );
								if( windowWidth >= 721 ){
									$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 ) + 33 );
								}

								if($(".baby.sub-category.health").length > 0){
									if(culture == "fr") {

										$( value ).Carousel( "updateHeight", 490 );
									}
									else {

										$( value ).Carousel( "updateHeight", 450 );
									}

								}
								if($(".baby.sub-category.gear").length > 0 && culture == "fr") {
									$( value ).Carousel( "updateHeight", 450 );
								}
								if($(".baby.sub-category.bathing").length > 0 && culture == "fr") {
									$( value ).Carousel( "updateHeight", 450 );
								}
								if($(".baby.sub-category.diapering").length > 0 && culture == "fr") {
									$( value ).Carousel( "updateHeight", 480 );
								}
								if($(".baby.sub-category.toys").length > 0 && culture == "fr") {
									$( value ).Carousel( "updateHeight", 470 );
								}
							}
							
						});
					},
					onComplete : function ( cb ) {
						if( babyCategoryLookbookInit ){
							$( value ).attr('tabindex', 0).focus();
	                    }
					}
				}
			}

			if( carouselObj != null ){
				$( value ).Carousel( carouselObj );
				$( value ).Carousel( "inpageswipe" );

				// SA: Add keyboard handling when focus is in carousel object
				$(document).keyup(function(e){
					// SA: Check to see if focus is in the carousel before doing anything
					if($( value ).has($(document.activeElement)).length > 0 || document.activeElement == $( value )[0]){
						// SA: If the keycode isn't in this group, stop right here
						if ( e.keyCode != 37 && e.keyCode != 39 ) {
							return;
						}

						e.preventDefault();
						e.stopPropagation();

						var cases = {
							37: function(){ // Left arrow key
								babyCategoryLookbookInit = true;
								$( value ).Carousel('previous');
							},
							39: function(){ // Right arrow key
								babyCategoryLookbookInit = true;
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

			if( $( '.inpage-look-book.monster-high' ).length == 0 && $( '.inpage-look-book.cork' ).length == 0 ){
				$( ".carousel-next, .carousel-prev", $( value ) ).css( 'top', ( $( value ).height() - $( ".carousel-next" ).height() ) / 2 );
			}

			$( ".carousel-next, .carousel-prev ", $( value ) ).bind( 'touchstart', function(){
				$( this ).removeClass( 'touchend' ).addClass( 'touchstart' );
			}).bind( 'touchend', function(){
				$( this ).removeClass( 'touchstart' ).addClass( 'touchend' );
				babyCategoryLookbookInit = true;
				$( value ).focus();
			});

			$( ".carousel-next", $( value ) ).click(function(){
				babyCategoryLookbookInit = true;
				$( value ).Carousel( "next" );
				return false;
			});

			$( ".carousel-prev", $( value ) ).click(function(){
				babyCategoryLookbookInit = true;
				$( value ).Carousel( "previous" );
				return false;
			});
		});
	},
	pad: function (n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	},
	checkInPageCarouselHash : function(){
		var selectedCarousel = null;
		$.each( $( '.inpage-look-book' ), function( index, value ){
			$.each( $( 'li.slide', $( value ) ), function( i, iv ) {
				if( $( iv ).attr( 'data-carouselhash' ) == TargetCA.helpers.getHash() ){
					selectedCarousel = i;
					$( 'a.hide', iv ).focus();
					$( iv ).addClass( 'selected' ).show();
					$( value ).Carousel( 'setSlideIndex', selectedCarousel );
					$( window ).scrollTop( $( iv ).offset().top );
					$( window ).bind( 'load', function(){
						$( window ).scrollTop( $( iv ).offset().top );
						$( window ).unbind( 'load' );
					});

					return false;
				}
			});
		});

		if ( ( "onhashchange" in window ) && !( $.browser.msie ) ) {
			$( window ).bind( "hashchange", function () {
				TargetCA.carousel.checkInPageCarouselHash();
			});
		} else {
			var previousHash = window.location.hash;
			setInterval( function(){
				if( previousHash != window.location.hash ){
					previousHash = window.location.hash;
					TargetCA.carousel.checkInPageCarouselHash();
				}
			}, 200 );
		}
	}
}
