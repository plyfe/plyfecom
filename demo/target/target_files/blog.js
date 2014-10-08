TargetCA.blog = {
	blogData : [],
	currentPost : {},
	currentPostID : 0,
	numHomepageBlogPostDisplay : 9,
	maxNumRowsToDisplay: 6,
	currentlyDisplaying : "all",
	homepageDelay : 1.5, //in seconds
	fadeOutSpeed : 200,
	hover : null,
	emailDeepLink : "email",
	currentTimeout : null,
	displayMoreBtn : false,
	adjustHeight : false,
	reachedEnd : false,
	postArray : [],
	init : function() {
		if( $( '.target-style' ).length == 0 ) return false;
		this.initLookbook();
		this.loadData( this.loadComplete );
	},
	loadComplete : function() {
		TargetCA.blog.setCurrentPost();
		TargetCA.blog.getRelatedPosts( TargetCA.blog.generateRelatedPosts );
		TargetCA.blog.generateHomepage();
		TargetCA.blog.email();
		TargetCA.blog.loadNav();
		$( window ).bind( 'load resize orientationchange', TargetCA.blog.resize );
	},
	loadData : function( callback ){
		$.ajax({
			url: "/assets/js/data/blog.js",
			dataType: "json",
			success: function( data ){
				TargetCA.blog.parseData( data, callback );
			}
		});
	},
	parseData : function( data, callback ){
		TargetCA.blog.blogData = data.posts;
		//sort by earliest date
		TargetCA.blog.blogData.sort( function( a, b ){ 
			return new Date( b.date ) - new Date( a.date );
		});
		callback();
	},
	setCurrentPost : function(){
		if( $( '.target-style.landing' ).length != 0 ) return false;

		var i;
		for( i = 0; i < TargetCA.blog.blogData.length; i++ ){
			if( window.location.href.indexOf( TargetCA.blog.blogData[i].link ) != -1 ){
				TargetCA.blog.currentPost = TargetCA.blog.blogData[i];
				TargetCA.blog.currentPostID = i;
				break;
			}
		}
		$( '.target-style-nav a.' + TargetCA.blog.currentPost.category[0] ).addClass( 'active' );
		if( $( '.target-style.blog-post' ).length != 0 && ( $( 'body' ).hasClass( 'ie' ) || $( 'body' ).hasClass( 'ff' ) ) ){
			$( '.white-wrap' ).css( 'overflow', 'hidden' );
		}
	},
	getRelatedPosts : function( callback ){
		if( $( '.target-style.landing' ).length != 0 ) return false;

		var relatedPosts = [];
		var i;
		var j;
		for( i = 0; i < TargetCA.blog.blogData.length; i++ ){
			if( i != TargetCA.blog.currentPostID ){
				for( j = 0; j < TargetCA.blog.blogData[i].category.length; j++ ){
					if( $.inArray( TargetCA.blog.blogData[i].category[j], TargetCA.blog.currentPost.category ) != -1 ){
						relatedPosts.push( TargetCA.blog.blogData[i] );
					}
				}
			}
		}

		callback( relatedPosts );
	},
	generateRelatedPosts : function( related ){

	},
	generateHomepage : function() {
		if( $( '.target-style.landing' ).length == 0 ) return false;

		var currentHash = TargetCA.helpers.getHash();

		if ( ( "onhashchange" in window ) && !( $.browser.msie ) ) {
			$( window ).bind( "hashchange", function () {
				TargetCA.blog.hashChange();
			} );
		} else {
			var previousHash = window.location.hash;
			setInterval( function(){
				if( window.location.hash != previousHash ){
					previousHash = window.location.hash;
					TargetCA.blog.hashChange();
				}
			}, 150);
		}

		TargetCA.blog.displayMoreBtn = false;
		
		var i;
		var nextNumber = 0;
		var nextRowNumber = 0;
		var changeSequence = false;
		var changeRowSequence = false;
		for( i = 0; i < TargetCA.blog.blogData.length; i++ ){
			var blogPost = $( '.target-style.landing .library .blogPost' ).clone().appendTo( $( ".target-style.landing .viewport" ) );
			var title = TargetCA.blog.blogData[i].titleEN;
			var copy = TargetCA.blog.blogData[i].calloutEN;
			var blogAlt = TargetCA.blog.blogData[i].altEN;
			var niceDate = TargetCA.blog.blogData[i].dateNice;

			var categoryNiceName = TargetCA.blog.blogData[i].category[0];
			if( categoryNiceName == "home" ){
				categoryNiceName = "home décor";
			}

			if( culture == "fr" ){
				title = TargetCA.blog.blogData[i].titleFR;
				copy = TargetCA.blog.blogData[i].calloutFR;
				blogAlt = TargetCA.blog.blogData[i].altFR;
				niceDate = TargetCA.blog.blogData[i].dateNiceFR;
				categoryNiceName = TargetCA.blog.blogData[i].categoryNiceFR;
			}
			
			$( '.prompt', blogPost ).addClass( TargetCA.blog.blogData[i].promptClasses );
			$( 'p.meta', blogPost ).html( "<strong>" + categoryNiceName + "</strong> / " + niceDate );
			$( 'h2', blogPost ).html( title );
			$( 'p.callout', blogPost ).html( copy );
			$( 'img.mainImage', blogPost ).bind( 'load', function(){
				TargetCA.blog.adjustHomepageImageHeight();
			}).each( function(){
				if( this.complete && this.height > 75 ){
					$( this ).trigger( 'load' );
				}
			});
			if( i < TargetCA.blog.numHomepageBlogPostDisplay ){
				var ctr = 1;
				$( 'img.mainImage', blogPost ).load( function(){
					ctr++;
					if( ctr == TargetCA.blog.numHomepageBlogPostDisplay ){
						TargetCA.blog.homepageViewportHandler();
					}
				});
			}
			$( 'img.mainImage', blogPost ).attr( 'src', TargetCA.blog.blogData[i].imageLG );
			$( 'img.mainImage', blogPost ).attr( 'alt', blogAlt );

			blogPost.attr( 'data-category', TargetCA.blog.blogData[i].category.join() );
			blogPost.attr( 'href', "/" + culture + "/targetstyle/" + TargetCA.blog.blogData[i].link + "?lnk=content" );
			blogPost.addClass( TargetCA.blog.blogData[i].category.join().replace( /,/g, ' ' ) );

			if( !$( 'body' ).hasClass( 'tablet' ) && !$( 'body' ).hasClass( 'mobile' ) ){
				blogPost.bind( 'focus mouseenter mouseover mousemove', function(){
					$( this ).trigger( 'onDisplayPrompt' );
				}).bind( 'blur mouseleave', function(){
					$( this ).trigger( 'onRemovePrompt' );
				});
			}

			if( i == 0 || nextRowNumber != 0 && i == nextRowNumber ){ //determine when the next row appears
				blogPost.addClass( 'newRow' );

				if( changeRowSequence ){
					nextRowNumber = i + 1;
					changeRowSequence = false;
				} else {
					nextRowNumber = i + 2;
					changeRowSequence = true;
				}
			}
			
			blogPost.addClass( TargetCA.blog.blogData[i].classes );
			if( currentHash.length != 0 && currentHash != "all" && currentHash != TargetCA.blog.emailDeepLink && currentHash != "skipToMainContent" ){
				blogPost.css( 'display', 'none' );
				if( blogPost.hasClass( currentHash ) ){
					blogPost.attr( 'style', '' );
					TargetCA.blog.determineRightMargin( currentHash );
				}
			}

			if( i % ( TargetCA.blog.maxNumRowsToDisplay + 1 ) == 0 && i != 0 ){
				TargetCA.blog.postArray.push( i );
			}
		}

		if( TargetCA.blog.blogData.length >= TargetCA.blog.numHomepageBlogPostDisplay ){
			TargetCA.blog.displayMoreBtn = true;

			$( '.moreBtn' ).removeClass( 'hide' ).click( TargetCA.blog.moreBtnHandler );
			$( '#email' ).addClass( 'notop' );

			if( $( 'a.blogPost' ).css( 'float' ) == 'none' ){
				$( $( 'a.blogPost' )[7] ).addClass( 'nobottom' );
			}
		}

		$( '.target-style .header .target-style-nav ul li.top-level a.mobile-only' ).addClass( 'active' );

		if( currentHash == TargetCA.blog.emailDeepLink ){
			$( '#email h2' ).attr( 'tabindex', 0 ).focus();
			$( 'html, body' ).scrollTop( $( '#email h2' ).offset().top );
		}

		if( currentHash != TargetCA.blog.currentlyDisplaying && currentHash != "" && currentHash != "skipToMainContent" ) {
			TargetCA.blog.currentlyDisplaying = currentHash;
			$( '.target-style-nav a.' + currentHash ).addClass( 'active' );
			$( '.header .indicator.visuallyhidden .currentClass' ).html( $( '.target-style-nav a.' + currentHash ).text() );
			window.document.title = "Target Canada | Target Style | " + $( '.target-style-nav a.' + currentHash ).text();
		}

		$( '.blogPost' ).bind( 'onDisplayPrompt onRemovePrompt', function( evt ){
			if( evt.type == "onDisplayPrompt" ){
				$( '.prompt', this ).fadeIn();
			} else {
				if( $( 'a.blogPost' ).css( 'float' ) != "none" && !$( 'body' ).hasClass( 'tablet' ) && !$( 'body' ).hasClass( 'mobile' ) ){
					$( '.prompt', this ).fadeOut( TargetCA.blog.fadeOutSpeed );
				}
			}
		})

		setTimeout( function(){
			$.each( $( '.prompt' ), function( index, value ){
				$( '.spacer', value ).height( $( value ).outerHeight() - 24 );
				if( $( 'body' ).hasClass( 'mobile' ) || $( '.target-style.landing .mainContent a.blogPost .prompt' ).css( 'position' ) == 'relative' ) {
					$( value ).width( $( '.viewport' ).width() - $( '.target-style.landing .mainContent a.blogPost .prompt .spacer' ).width() - 20 );
					$( '.spacer', value ).height( $( value ).outerHeight() - 24 );
				}
			});
			if( currentHash == TargetCA.blog.emailDeepLink ){
				$( '#email h2' ).attr( 'tabindex', 0 ).focus();
				$( 'body' ).scrollTop( $( '#email h2' ).offset().top );
			}
		}, 100 );

		if( !$( 'body' ).hasClass( 'tablet' ) && !$( 'body' ).hasClass( 'mobile' ) ){
			TargetCA.blog.currentTimeout = setTimeout( function(){
				$( '.blogPost' ).trigger( 'onRemovePrompt' );
			}, TargetCA.blog.homepageDelay * 1000 );
		}
	},
	homepageViewportHandler : function(){
		var i;
		for( i = 0; i < TargetCA.blog.postArray.length; i++ ){
			if( $( 'a.blogPost' ).css( 'float' ) == 'none' && !TargetCA.blog.reachedEnd ){
				$( $( 'a.blogPost' )[TargetCA.blog.postArray[i]] ).addClass( 'nobottom' );
			} else {
				$( $( 'a.blogPost' )[TargetCA.blog.postArray[i]] ).removeClass( 'nobottom' );
			}
		}

		var heightCalc = TargetCA.blog.calcHeight();
		var maxHeight = heightCalc.maxHeight;
		if( TargetCA.blog.reachedEnd ){
			maxHeight = heightCalc.nextHeight;
		}

		$( '.viewport' ).css( 'height', maxHeight );
	},
	moreBtnHandler : function( evt ){
		var i;
		for( i = 0; i < TargetCA.blog.postArray.length; i++ ){
			$( $( 'a.blogPost' )[TargetCA.blog.postArray[i]] ).removeClass( 'nobottom' );
		}
		var heightCalc = TargetCA.blog.calcHeight();

		var heightTo = 0;
		if( $( '.viewport' ).height() + heightCalc.maxHeight >= heightCalc.nextHeight ){
			heightTo = heightCalc.nextHeight;
			//reached the bottom of the height. remove more button
			TargetCA.blog.reachedEnd = true;
		} else {
			heightTo = $( '.viewport' ).height() + heightCalc.maxHeight;
		}

		$( '.viewport' ).animate( {
			'height' : heightTo
		}, TargetCA.blog.fadeOutSpeed, function(){
			if( TargetCA.blog.reachedEnd ){
				$( '.moreBtn' ).addClass( 'hide' );
				$( '#email' ).removeClass( 'notop' );
				for( i = 0; i < TargetCA.blog.postArray.length; i++ ){
					$( $( 'a.blogPost' )[TargetCA.blog.postArray[i]] ).removeClass( 'nobottom' );
				}
			}
		} );
	},
	calcHeight : function(){
		var maxHeight = 0;
		var initialTop = 0;
		var counter = 0;
		var nextHeight = 0;
		var rowCounter = TargetCA.blog.maxNumRowsToDisplay;
		if( $( 'a.blogPost' ).css( 'float' ) == 'none' ){
			rowCounter = TargetCA.blog.numHomepageBlogPostDisplay;
		}

		$.each( $( 'a.blogPost' ), function( index, value ){
			if( $( value ).css( 'display' ) != 'none' ){
				if( counter == 0 ){
					initialTop = $( value ).offset().top;
				}

				if( $( value ).offset().top + $( value ).outerHeight( true ) > maxHeight ){
					counter++;
					nextHeight = $( value ).offset().top + $( value ).outerHeight( true );
					if( counter < rowCounter ){
						maxHeight = $( value ).offset().top + $( value ).outerHeight( true );
						TargetCA.blog.displayMoreBtn = false;
					} else {
						TargetCA.blog.displayMoreBtn = true;
					}
				}
			}
		});
		
		maxHeight = maxHeight - initialTop;
		nextHeight = nextHeight - initialTop;

		if( !TargetCA.blog.displayMoreBtn ){
			$( '.moreBtn' ).addClass( 'hide' );
			$( '#email' ).removeClass( 'notop' );
			for( i = 0; i < TargetCA.blog.postArray.length; i++ ){
				$( $( 'a.blogPost' )[TargetCA.blog.postArray[i]] ).removeClass( 'nobottom' );
			}
		}

		if( $( 'body' ).hasClass( 'ff' ) ){
			maxHeight -= 1;
			nextHeight -= 1;
		}

		return {
			maxHeight : maxHeight,
			nextHeight : nextHeight
		}
	},
	adjustHomepageImageHeight : function(){
		TargetCA.blog.adjustHeight = true;
		$( 'a.blogPost' ).css( 'height', 'auto' );
		var shortestHeight = $( $( 'a.blogPost' )[0] ).height();
		$.each( $( 'a.blogPost img.mainImage' ), function( index, value ){
			if( $( value ).height() < shortestHeight && $( value ).height() > 100 ){
				shortestHeight = $( value ).height();
			}
		});
		$( 'a.blogPost' ).css( 'height', shortestHeight );
		if( $( '.target-style.landing' ).css( 'position' ) == "static" || $( 'a.blogPost' ).css( 'float' ) == "none" ) {
			$( 'a.blogPost' ).css( 'height', 'auto' );
		}

		if( $( 'a.blogPost' ).css( 'float' ) == "none" ){
			clearTimeout( TargetCA.blog.currentTimeout );
			$( '.prompt' ).fadeIn();
			$( '.prompt' ).css( 'width', $( '.prompt' ).parent().width() - 45 );
			$.each( $( '.prompt' ), function( index, value ){
				$( '.spacer', value ).height( $( value ).outerHeight() - 24 );
			});
		} else {
			clearTimeout( TargetCA.blog.currentTimeout );
			$( '.prompt' ).attr( 'style', '' );
			$.each( $( '.prompt' ), function( index, value ){
				$( '.spacer', value ).height( $( value ).outerHeight() - 24 );
			});
			TargetCA.blog.currentTimeout = setTimeout( function(){
				$( '.blogPost' ).trigger( 'onRemovePrompt' );
			}, TargetCA.blog.homepageDelay * 1000 );
		}

		$.each( $( '.prompt' ), function( index, value ){
			$( '.spacer', value ).height( $( value ).outerHeight() - 24 );
			if( $( 'body' ).hasClass( 'mobile' ) || $( '.target-style.landing .mainContent a.blogPost .prompt' ).css( 'position' ) == 'relative' ) {
				$( value ).width( $( '.viewport' ).width() - $( '.target-style.landing .mainContent a.blogPost .prompt .spacer' ).width() - 20 );
				$( '.spacer', value ).height( $( value ).outerHeight() - 24 );
			}
		});

		if( TargetCA.helpers.getHash() == TargetCA.blog.emailDeepLink && $( '#email h2' ).is( ":focus" ) ){
			$( '#email h2' ).attr( 'tabindex', 0 ).focus();
			$( 'html, body' ).scrollTop( $( '#email h2' ).offset().top );
		}
	},
	hashChange : function() {
		if( TargetCA.helpers.getHash() == TargetCA.blog.currentlyDisplaying || TargetCA.helpers.getHash() == "skipToMainContent" ) return false;
		var newHash = TargetCA.helpers.getHash();

		if( newHash == "all" ){
			$( '.blogPost' ).fadeIn( function(){
				TargetCA.blog.homepageViewportHandler();
			});
		} else if( newHash == TargetCA.blog.emailDeepLink ) {
			$( '#email h2' ).attr( 'tabindex', 0 ).focus();
		} else {
			$( '.blogPost' ).addClass( 'animating' );
			$( '.blogPost' ).fadeOut( TargetCA.blog.fadeOutSpeed, function(){
				$( this ).removeClass( 'animating' );
				$( '.target-style-nav a' ).removeClass( 'active' );
				if( $( '.target-style-nav ul.secondary li' ).css( 'float' ) == "none" ){ //when we display the mobile nav, close the nav menu 
					$( '#expandCollapse' ).removeClass( 'open' );
					$( '.target-style-nav ul.secondary' ).attr( 'style', '' );
				}
				if( $( ".blogPost.animating" ).length == 0 ) {
					//figure out which blog posts should have a right margin or not
					TargetCA.blog.determineRightMargin( newHash );

					$( '.blogPost.' + newHash ).fadeIn( function(){
						$( '.target-style-nav a.' + newHash ).addClass( 'active' );
						$( '.header .indicator.visuallyhidden .currentClass' ).html( $( '.target-style-nav a.' + newHash ).text() );
						window.document.title = "Target Canada | Target Style | " + $( '.target-style-nav a.' + newHash ).text();
						$.each( $( '.prompt' ), function( index, value ){
							$( '.spacer', value ).height( $( value ).outerHeight() - 24 );
						});



						if( $( '.target-style-nav ul.secondary li' ).css( 'float' ) == "none" ){ //when we display the mobile nav, close the nav menu 
							$( '#expandCollapse' ).removeClass( 'open' );
							$( '.target-style-nav ul.secondary' ).attr( 'style', '' );
						}
					});
				}
				TargetCA.blog.homepageViewportHandler();
			});
		}
		TargetCA.blog.currentlyDisplaying = newHash;
	},
	determineRightMargin : function( hash ){
		var blogPostArray = [];
		$.each( $( '.blogPost' ), function( index, value ){
			if( $( value ).hasClass( hash ) ){
				blogPostArray.push( index );
			}
		});
		
		$( '.blogPost' ).removeClass( 'addRightMargin' );
		var i;
		for( i = 0; i < blogPostArray.length; i++ ){
			if( i + 1 < blogPostArray.length && ( $( $( '.blogPost' )[blogPostArray[i]] ).hasClass( 'normal' ) || $( $( '.blogPost' )[blogPostArray[i]] ).hasClass( 'small' ) ) ) { 
				$( $( '.blogPost' )[blogPostArray[i]] ).addClass( 'addRightMargin' );
				if( i + 1 < blogPostArray.length ){
					i++;
				} else {
					break;
				}
			}
		}
	},
	email : function(){
		if( $( '#targetStyleSubscribe' ).length == 0 ) return false;
		$( '#targetStyleSubscribe' ).Validate({
			validateOnly : true,
			useAutomaticFocus : false,
			onError : function( id, error ){
				$( '.parentErrorMsg' ).show();
			},
			onFirstError : function() {
				$( '.parentErrorMsg' ).attr( 'tabindex','0' ).focus();
			},
			onValid : function(){
				var showParentMessage = false;
				$.each( $( '.formContainer label .errorMsg' ), function( index, value ){
					if( $( value ).css( 'display' ) != "none" ){
						showParentMessage = true;
						return false;
					}
				});

				if( !showParentMessage ){
					$( '.parentErrorMsg' ).hide();
				}
			},
			onAllValid : function(){
				var url = "/api/targetstyle/?";//"http://web.epsiloninteractive.com:9000/api/RecordUploadQueue.mpl?";
				
				$.each( $( '#targetStyleSubscribe input' ), function( index, value ){
					if( typeof $( value ).attr( 'name' ) !== "undefined" && $( value ).attr( 'name' ) != "" ){
						url += $( value ).attr( 'name' ) + "=" + encodeURIComponent( $( value ).val() ).split( '%20' ).join( "+" );
						if( index + 1 < $( '#targetStyleSubscribe input' ).length - 1 ){ //-1 to avoid the submit button
							url += "&"
						}
					}
				});
				
				
				$( '#hiddenObj' ).load( function(){
					$( '#email .emailSignup' ).fadeOut( TargetCA.blog.fadeOutSpeed, function(){
						$( '#email #success' ).fadeIn( function(){
							$( '#email #success h2' ).attr( 'tabindex', 0 ).focus();
						});
					});
				});
				$( '#hiddenObj' ).attr( 'src', url );
			}
		});
		$( '#targetStyleSubscribe' ).Validate( "addErrorMsg", "#FIRSTNAME", "required", "#nameErrorMsg" );
		$( '#targetStyleSubscribe' ).Validate( "addErrorMsg", "#POSTALCODE", "required", "#postalEmptyErrorMsg" );
		$( '#targetStyleSubscribe' ).Validate( "addErrorMsg", "#POSTALCODE", "postal", "#postalFormatErrorMsg" );
		$( '#targetStyleSubscribe' ).Validate( "addErrorMsg", "#EMAIL_ADDR", "required", "#emailEmptyErrorMsg" );
		$( '#targetStyleSubscribe' ).Validate( "addErrorMsg", "#EMAIL_ADDR", "email", "#emailFormatErrorMsg" );
	},
	loadNav : function() {
		setInterval( function(){
			if( $( '.target-style-nav ul.secondary li' ).css( 'float' ) != "none" ){
				$( '.target-style-nav .secondary' ).attr( 'style', '' );
			}
		}, 100 );
		var open = false;
		$( '#expandCollapse' ).click(function(){
			if( open ){ 
				$( '.target-style-nav .secondary' ).hide();
				$( this ).removeClass( 'open' );
				$( '.expand', this ).show();
				$( '.collapse', this ).hide();
				open = false;
			} else {
				$( '.target-style-nav .secondary' ).show();
				$( this ).addClass( 'open' );
				$( '.expand', this ).hide();
				$( '.collapse', this ).show();
				open = true;
			}
		});

	},
	initLookbook: function(){
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
			if( $( '.inpage-look-book.target-style-post' ).length != 0 ){
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
							}
							if( $( value ).hasClass( 'use-recalc' ) ){
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
	resize : function() {
		var windowWidth = $( window ).width();
		if( $( '.swap-order' ).length != 0 ){
			if( $( '.target-style .mainUnit .CategoryBody .column1' ).css( 'display' ) == "block" ){
				$.each( $( '.target-style .mainUnit .CategoryBody .swap-down' ), function( index, value ){
					if( !$( value ).next().hasClass( 'no-swap' ) ){
						$( value ).before( $( value ).next() );
					}
				} );
			} else {
				$.each( $( '.target-style .mainUnit .CategoryBody .swap-down' ), function( index, value ){
					if( !$( value ).prev().hasClass( 'no-swap' ) ){
						$( value ).after( $( value ).prev() );
					}
				} );
			}
		}

		if( TargetCA.blog.adjustHeight ) {
			TargetCA.blog.adjustHomepageImageHeight();
		}

		TargetCA.blog.homepageViewportHandler();
	}
}