/**
 * @Target.ca Interactions
 * @Interactivity reusable logic for all of target.ca
 * @author paul.placido@target.com, alessandro.miralles@target.com, stuart.milsten@target.com
 */

//-- Target.ca Global Interactions namespace --//
TargetCA.interactions = {
	// intialize the function
	init : function() {
		this.skipToMainContent();
		this.scrollToTop();
		this.backToTop();
		this.accordion();
		this.storeLocatorAccordion();
		this.storeCareersTab();
		this.historyTimeline();
		this.overlay();

		this.popupOpenLink();
		this.popupCloseButton();

		this.addBrowserToBody();
		this.placeholderFix();
		this.faqAnchoring();
		this.checkDownloadLink();
		this.slidesInit();
		this.customDropDown();
		this.formField();
		this.resizing();	 	
		this.fullImageLookBook();	 	
		this.checkOrientation();	 	
		this.lookbook();	
		TargetCA.carousel.init();
		this.clothing();
		this.personal();
		this.threshold();
		this.essentials();
		this.showhide();
		this.videoCallout();
		this.checkVideoHash();
		this.homepage();
		this.brunet();
		this.monsterhigh();
		this.unbeatablePrices();
		this.halloween.init();
		this.toys();
		
		// this is duplicated from .checkOrientation();
		
		// if( ($(window).width() >= 480) && ($(window).width() <= 736) ) {
		// 	$('body').addClass('mobile-landscape');
		// } else {
		// 	$('body').removeClass('mobile-landscape');
		// }

		$(window).bind( 'orientationchange resize', function() {
			TargetCA.interactions.resizing(); 
			TargetCA.interactions.checkOrientation();
		});
	},
	// TODO: work on this for multiple Rx number
	autotab: function() {
		var rxCount = TargetCA.pharmacy.presNumberMax;
		var q;
		var focusRx;
		for (q = 0; q < rxCount; q++) {
			$('#prefix'+q).keyup(function() {
				if (this.value.length==this.getAttribute("maxlength")) {
					focusRx = q-1;
					$('#Rx'+focusRx).focus();
				}
			})
		}
	},
	checkDownloadLink: function() {
		if( $( '.checkDownloadLink' ).length == 0 ) return false;
		
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|iPad|Nexus|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);

		$( '.checkDownloadLink' ).click( function() {
			if( check ) {
				alert( $( '.checkDownloadCopy' ).html().replace(/\s+/g, ' ') );
				return false;
			}
		})
	},
	/**function for toggling the display*/
	showhide: function(){
		$('.showHide').click(function(e){
			targ = $(this);
			sibling = targ.parent().next();
			sibling.toggleClass("display_none").toggleClass("display_block");
			if(targ.text() != '' && (targ.text() == 'View' || targ.text() == 'Hide')){
				head_txt = (targ.text() != '' && targ.text() == 'View')?'Hide':'View';
				targ.text(head_txt);
				targ.attr('href','#'+head_txt);
			}
			if(targ.text() != '' && (targ.text() == 'Vue' || targ.text() == 'Masquer')){
				head_txt = (targ.text() != '' && targ.text() == 'Vue')?'Masquer':'Vue';
				targ.text(head_txt);
				targ.attr('href','#'+head_txt);
			}
			if(targ.attr('id') == "contact_productinfo"){
				$('#productType').focus();
			}
			e.stopPropagation();
		});
	},
	storeLocatorAccordion: function() {
		$('.store-locator .viewAllStores .sl-accordion .content').addClass('closeList');
		$('.store-locator .viewAllStores .sl-accordion li').each(function() {
			$(this).attr('id','false');
			$(this).find('.simple').addClass('closeList');
			$(this).find('a').click(function(e) {
				var elementOfSteel = $(this).parent();

				if(elementOfSteel.attr('id') == "true") {
					if(e.target.className != 'mapIt') {
						elementOfSteel.find('.simple').addClass('closeList');
						elementOfSteel.find('.content').addClass('closeList');
						elementOfSteel.find('.plusMinus img').attr('alt', TargetCA.helpers.translation('Agrandir', 'Expand'));
						elementOfSteel.attr('id', 'false');
					}
				} else {
					if(e.target.className != 'mapIt'){
						elementOfSteel.find('.simple').removeClass('closeList');
						elementOfSteel.find('.content').removeClass('closeList');
						elementOfSteel.find('.plusMinus img').attr('alt', TargetCA.helpers.translation('RÃ©duire', 'Collapse'));
						elementOfSteel.attr('id', 'true');
					}
				}
				return false;
			})
		})
	},
	skipToMainContent : function() {
		$('#skipToMainContentLink').click(function() {
			$('#skipToMainContent').attr('tabIndex',-1).focus();
		});
	},
	popupOpenLink: function(){
		$('.popupWindowLink').click(function(e) {
			thisPopUpWindowLink = $(this);
			$('.couponPolicyOverlay').css('display', 'block');
			$('.popupWindow').css({'visibility':'visible','display':'block'});
			$('.popup').attr('tabindex',-1).focus();
			$('a,input,select,textarea,button,iframe').attr('tabindex', -1);
			$('.popup').find('a,input,select,textarea,button').attr('tabIndex', 0);
			return false;
		})
		$('.popup_close').click(function() {
			$('.popup').css({'visibility':'hidden'});
			$('.popupWindow').css({'visibility':'hidden','display':'none'});
			$('.couponPolicyOverlay').css('display', 'none');
			$('.pharmDetailsPopUp').css({'visibility':'hidden'});
			$('a,input,select,textarea,button,iframe').attr('tabindex', 0);
			if( typeof thisPopUpWindowLink !== "undefined" ) { 
				thisPopUpWindowLink.focus();
			}
			return false;
		});
		$('.popup_close').keydown(function(e) {
			e.preventDefault();
			if (e.keyCode == 32){
				$('.popup_close').trigger('click');
			}
			return false;
		});
		$('.popup_close').keyup(function(e) {
			e.preventDefault();
			if (e.keyCode == 27 || e.keyCode == 13){
				$('.popup_close').trigger('click');
			}
			return false;
		});
		$(document).keyup(function(e) {
			if (e.keyCode == 27 && (typeof thisPopUpWindowLink != "undefined")){
				$('#pharmDetailsPopUp').css({'visibility':'hidden'});
				$('.popup').css({'visibility':'hidden'});
				thisPopUpWindowLink.focus();
			}
		}).css({'cursor':'pointer'});
	},
	popupCloseButton: function() {

	},
	scrollToTop : function() {
		// this is the same functionality as backToTop with class
		$('#to-top').click(function () {   
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	},
	// this is the same functionality as scrollToTop.  This method uses a class instead of an id and sets the focus to the class name 'topFocus'
	backToTop: function() { 
		if( $( ".backTop > a" ).length == 0 ) return false;
		$( ".topFocus" ).attr( "tabindex", "-1" );
			$( ".backTop > a" ).click( function () {
				$( "html, body" ).animate({
						scrollTop: 0
				}, "fast", function () {
						if ( $( ".topFocus" ).length ) $( ".topFocus" ).focus()
				});
				return false
			});
	},
	accordion : function(){
		if ( $( ".accordion" ).length == 0 ) return false
		$( ".accordion div.content" ).hide();
		$( ".accordion > li > .accordion_title, .accordion .accordion_title" ).css({
			cursor: "pointer"
		}).each(function () {
			var contentParent = $( "div.content", $( this ).parent() );
			var selectedItem = $( this );
			var selectedIndex;
			var calcHeight;
			$( this ).unbind( "click" ).click( function ( evt ) {
				evt.preventDefault();
				if( !$( contentParent ).parent().hasClass( "open" ) ){
					calcHeight = $( contentParent ).outerHeight();
					$( contentParent ).show().css( {
						"opacity" : 0,
						"height" : 0
					} );
					$( contentParent ).animate({
						height: calcHeight
					}, "fast", function(){
						$( contentParent ).animate({
							opacity: 1
						}, "fast" );
						$( contentParent ).focus();
						$( this ).parent().find( "input[type=text]:first" ).focus();
						$( ".show_accTitle", $( this ).parent() ).hide();
						$( ".hide_accTitle", $( this ).parent() ).show();
						$( contentParent ).css( 'height', 'auto' );
						$( this ).parent().addClass( "open" );
						$( "a", $( '.accordion_title', $( this ).parent() ) ).attr("title", $( ".hide_accTitle", $( this ).parent() ).text() );

                        //adjustment for pharmacy
						$('.pharmacy-landing .accordion_title span.icon').addClass('minusIcon')
	                    if (culture == "fr"){
							$('.pharmacy-landing .accordion_title .replace').text('Voir moins de magasins')
						} else {
							$('.pharmacy-landing .accordion_title .replace').text('view fewer locations')
						}

					});
				} else {
					$( contentParent ).animate({
						opacity: 0
					}, "fast", function(){
						$( contentParent ).animate({
							height: 0
						}, "fast", function(){
							$( contentParent ).hide().css( "height", "auto" );
							$( this ).parent().removeClass( "open" );

						});
						$( ".show_accTitle", $( this ).parent() ).show();
						$( ".hide_accTitle", $( this ).parent() ).hide();
						$( "a", $( '.accordion_title', $( this ).parent() ) ).attr( "title", $( ".show_accTitle", $( this ).parent() ).text() );

	                    //adjustment for pharma
	                    $('.pharmacy-landing .accordion_title span.icon').removeClass('minusIcon')

							if (culture == "fr"){
								$('.pharmacy-landing .accordion_title .replace').text('Voir plus de magasins');
							} else {
								$('.pharmacy-landing .accordion_title .replace').text('view more locations');
							}

					});
				}
			});
			$( "a", $( this ) ).click( function ( evt ) {
				evt.preventDefault()
			})
		});

		$( ".hide_accTitle" ).hide();
		$( ".content" ).attr( "tabindex", "-1" ).css( "outline", "none" );
	},

	viewAllStoresAccordion : function(){
		if ( $( ".accordion" ).length == 0 ) return false
		$( ".accordion div.content" ).hide();
		$( ".accordion > li > .accordion_title" ).css({
			cursor: "pointer"
		}).each(function () {
			var contentParent = $( "div.content", $( this ).parent() );
			var selectedItem = $( this );
			var selectedIndex;
			$( this ).unbind( "click" ).click( function ( evt ) {
				evt.preventDefault();
				var calcHeight;

				if( !$( contentParent ).parent().hasClass( "open" ) ){
					 	calcHeight = $( contentParent ).outerHeight();
					$( contentParent ).show().css( { "opacity" : 0, "height" : 0 } );
					$( contentParent ).animate({
						height: calcHeight
					}, "fast", function(){
						$( contentParent ).animate({
							opacity: 1
						}, "fast" );
						$( contentParent ).focus();
						$( this ).parent().find( "input[type=text]:first" ).focus();
						$( ".show_accTitle", $( this ).parent() ).hide();
						$( ".hide_accTitle", $( this ).parent() ).show();
						$( contentParent ).css( 'height', 'auto' );
						$( this ).parent().addClass( "open" );
						$( "a", $( this ).parent() ).attr("title", $( ".hide_accTitle", $( this ).parent() ).text() );
					});
				} else {
					$( contentParent ).animate({
						opacity: 0
					}, "fast", function(){
						$( contentParent ).animate({
							height: 0
						}, "fast", function(){
							$( contentParent ).hide().css( "height", "auto" );
							$( this ).parent().removeClass( "open" );
						});
						$( ".show_accTitle", $( this ).parent() ).show();
						$( ".hide_accTitle", $( this ).parent() ).hide();
						$( "a", $( this ).parent() ).attr( "title", $( ".show_accTitle", $( this ).parent() ).text() );
					});
				}
			});
			$( "a", $( this ) ).click( function ( evt ) {
				evt.preventDefault()
			})
		});

		$( ".hide_accTitle" ).hide();
		$( ".content" ).attr( "tabindex", "-1" ).css( "outline", "none" );
	},

	storeCareersTab : function(){
		if ( $( "#storeCareers" ).length == 0 ) return false;
		$( '.vid_close' ).attr( 'href', 'javascript:void(0);' );
		TargetCA.helpers.checkStoreHash( TargetCA.helpers.getHash() );

		if ( ( "onhashchange" in window ) && !( $.browser.msie ) ) {
			$( window ).bind( "hashchange", function () {
				TargetCA.helpers.checkStoreHash( TargetCA.helpers.getHash() );
				$( ".startFocus a" ).focus();
			});

		} else {
			$( ".tabContainer a" ).click(function () {
				var href = $( this ).attr( "href" );
				href = href.slice( 1, href.length );
				TargetCA.helpers.checkStoreHash( href );
				$( ".startFocus a" ).focus();
			});
		}
	},

	tabs : function() {
		if ( $( ".accessible-tab" ).length == 0 ) return false;
		
		$( 'a.tab' ).bind( 'keydown', function( evt ) {
			var i;
			var skip = false;
			switch( evt.which ){
				case 37:
				case 38:
					for( i = 0; i < $( 'a.tab', $( '.active-tab' ) ).length; i++ ){
						if( $( $( 'a.tab', $( '.active-tab' ) ).get( i ) ).hasClass( 'focused' ) ){
							break;
						}
					}
					i--;
					if( i < 0 ){
						i = $( 'a.tab', $( '.active-tab' ) ).length - 1;
					}
					
					break;
				case 39:
				case 40:
					for( i = 0; i < $( 'a.tab', $( '.active-tab' ) ).length; i++ ){
						if( $( $( 'a.tab', $( '.active-tab' ) ).get( i ) ).hasClass( 'focused' ) ){
							break;
						}
					}
					i++;
					if( i >= $( 'a.tab', $( '.active-tab' ) ).length ){
						i = 0;
					}
					break;
				default:
					skip = true;
					break;
			}
			if( !skip ){
				$( 'a.tab', $( '.active-tab' ) ).removeClass( 'focused' );
				$( $( 'a.tab', $( '.active-tab' ) ).get( i ) ).addClass( 'focused' ).focus();
				if( $( '.use-click' ).length == 0 ){
					window.location.hash = $( $( 'a.tab', $( '.active-tab' ) ).get( i ) ).attr( 'href' );
				} else {
					$( 'a.tab' ).attr( { 'aria-selected' : 'false', 'tabindex' : '-1' });
					$( '.focused' ).attr( { 'aria-selected' : 'true', 'tabindex' : '0' });
					$( '.focused' ).click();
				}
			}
		});
	},

	historyTimeline : function(){
		if ( !$( ".history-text" ).length ) return false;
		$('.history-text .history-text-decade-label').click(function(){
			var parentContainer = $(this).parent();
			if( $(parentContainer).hasClass('open') ) {
				$(parentContainer).removeClass('open');
			} else {
				//$('.history-text-decade-wrapper').removeClass('open');
				$(parentContainer).addClass('open');
				$(this).focus();
			}
		}).css('cursor', 'pointer').attr('tabindex', -1);
		$('#history-text-nav a').click(function(){
			var targetDecade = $(this).attr('href');
			$('html,body').animate({
				scrollTop: $(targetDecade).offset().top
			}, 'normal', function(){
				$( targetDecade ).attr( 'tabindex', -1 ).focus();
			});
			return false;
		});
	},
	
	overlay: function(){

		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				if(!$('#externalLinkPrompt').hasClass('hide')){
					closeOverlay();
				}
				closeOverlay();
			}
		});

		$('.overlay').live('click', function(){
			var overlay = $('<div id="overlayContainer"><div class="overlayShadow"></div></div>');
			var overlayID = $(this).attr('href');
			var content = $(overlayID).removeClass('hide').attr('data-trigger', $(this).attr('id'));
			var fullWidth;
			$(overlay).append(content);
			$('body').append(overlay);
			 	fullWidth = ($(overlay).outerWidth() == $(content).outerWidth());
			$(overlay).hide().fadeIn(function(){
				if(fullWidth){
					$('html,body').scrollTop(0);
				}
			});
			if(!fullWidth){
				$('html,body').css('overflow', 'hidden');
			}  else {
				$('body').addClass('overlayVisible');
				$("#overlayContainer").addClass('mobile');
			}
			$('.overlayShadow').click(closeOverlay).css({
				height: ($(window).height() < $(content).height())?$(content).height():"100%"
			});
			$(overlayID + ' .overlayClose').click(closeOverlay);
			resizeShadow();
			setupOverlay(content);
			$('.overlayMainContent h3').attr('tabindex',0).focus();
			if( $('.overlayMainContent .startFocus').length != -1 ){
				$('.overlayMainContent .startFocus').attr('tabindex',0).focus();
			}
			return false;
		});
		function closeOverlay(ignoreFocus){
			if($(window).width() < 400){
				$('body').removeClass('overlayVisible');
				$("#overlayContainer").removeClass('mobile');
			}
			$( 'nav.gn .gn--top-level.dropdown' ).removeClass( 'open' );
			$( 'nav.gn .gn--top-level.dropdown .gn--dd' ).removeClass( 'display_block' ).addClass( 'display_none' );
			$("#overlayContainer").fadeOut(function(){
				
				$( 'nav.gn .gn--top-level.dropdown' ).removeClass( 'open' );
				$( 'nav.gn .gn--top-level.dropdown .gn--dd' ).removeClass( 'display_block' ).addClass( 'display_none' );
				var overlayContent = $('.overlayContent', this);

				if(ignoreFocus !== true) $('#'+$(overlayContent).attr('data-trigger')).focus();
				cleanOverlay($(overlayContent));
				$('html,body').css('overflow', 'auto');
				$('body').append($(overlayContent).addClass('hide'));
				$('#overlayContainer').remove();
				$('a,input,select,textarea,button').attr('tabIndex', 0);
				if( $('body').hasClass('overlayVisible') ){
					$('body').removeClass('overlayVisible');
				}
			});
			if( $( '.no-overlay-focus' ).length == 0 && $( this ).parent().attr( 'id' ) != "selectLocation" ){
				$('.overlay').focus();
			} else if( $( this ).parent().attr( 'id' ) == "selectLocation" ){
				$( '.topContainer .buttonContainer .redButton' ).attr( 'tabindex', 0 ).focus();
			}
			return false;
		}
		function resizeShadow(){
			var overlayContent = $("#overlayContainer .overlayContent");
			if($(window).height() < $(overlayContent).outerHeight()){
				$('.overlayShadow').height($(overlayContent).outerHeight());
				$(overlayContent).css('margin-top', 0);
			} else {
				$('.overlayShadow').height("100%");
				$(overlayContent).css('margin-top', ($(window).height()/2) - ($(overlayContent).outerHeight()/2));
			}
		}
		function setupOverlay(overlay){
			if($(overlay).attr('id') == "externalLinkPrompt" || $(overlay).attr('id') == "externalLinkApplyInStore" || $(overlay).attr('id') == "externalWarehouse" || $(overlay).attr('id') == "selectLocation" ){

				$('a,input,select,textarea,button').attr('tabIndex', -1);
				$('#'+$(overlay).attr('id')).find('a,input,select,textarea,button').attr('tabIndex', 0);
				$(".overlayContinue", overlay).attr('href', $('#'+$(overlay).attr('data-trigger')).attr('data-continue'));
				$(".overlayContinue", overlay).click(function(e){
					
					if($(".cork").length > 0 && !$("body").hasClass("ie8"))
						closeOverlay(false);
					else
						closeOverlay(true);
					
					//window.open($('#'+$(overlay).attr('data-trigger')).attr('data-continue'));
					//return false;
				});
			}
		}
		function cleanOverlay(overlay){
			if($(overlay).attr('id') == "externalLinkPrompt" || $(overlay).attr('id') == "externalLinkApplyInStore" || $(overlay).attr('id') == "externalWarehouse" ){
				$(".overlayContinue", overlay).unbind('click'); //Clear out any click events for next time use of the prompt
			}
			$(overlay).attr('data-trigger', '');
		}
		$(window).resize(resizeShadow);
	},
	printPage: function() {
		//remove header and footer
		$( 'header, footer' ).remove();
		$( '#skipToMainContentLink' ).remove();
		$( '.white-wrap' ).addClass( 'fullPage' );
		//print page
		window.print();
	},
	printWindow: function() {
		// prints a section of the page
		$('a.printWindow').click(function(e){
			var print_target; // the item to be printed
			e.preventDefault();
			print_target = $(this).attr('href');
			window.print();
		});
	}, // End printWindow function
	addBrowserToBody : function() {
		//this will add a ff[VERSION] or a ie[VERSION] class to the body for Firefox or IE support
		var className = "";
		var userAgent = navigator.userAgent;
		var browser = "";
		var browserArray = new Array(
		    { browser: "Firefox", ua: "Firefox", shortForm: "ff", uaIdentity: "Firefox" },
			{ browser: "Internet Explorer", ua: "MSIE", shortForm: "ie", uaIdentity: "MSIE" },
			{ browser: "Internet Explorer", ua: "rv:", shortForm: "ie", uaIdentity: "rv" },
			{ browser: "Blackberry", ua: "BlackBerry", shortForm: "bb", uaIdentity: "Version" },
			{ browser: "Blackberry", ua: "RIM", shortForm: "bb", uaIdentity: "Version" },
			{ browser: "Blackberry", ua: "BB", shortForm: "bb", uaIdentity: "." },
			{ browser: "Dolphin", ua: "Dolfin", shortForm: "Dolphin", uaIdentity: "Dolfin" },
			{ browser: "Opera", ua: "Opera", shortForm: "opera", uaIdentity: "Version" },
			{ browser: "iPhone", ua: 'iPhone OS', shortForm: "iPhone", uaIdentity: "iPhone OS" },
			{ browser: "Chrome", ua: "Chrome", shortForm: "chrome", uaIdentity: "Chrome" },
			{ browser: "Safari", ua: "Safari", shortForm: "safari", uaIdentity: "Version" }
		);

		var i;
		var j;
		var version;
		for( i = 0; i < browserArray.length; i++ ){
			if( userAgent.indexOf( browserArray[i].ua ) != -1 ){
				browser = browserArray[i];
				version = userAgent.indexOf( browserArray[i].uaIdentity );
				if( version == -1 ){
					version = 0; //cannot find version
				}
				className = browserArray[i].shortForm;
				if( !isNaN( parseFloat( userAgent.substring( version + browserArray[i].uaIdentity.length + 1 ) ) ) ){
					className += " " + browserArray[i].shortForm + parseFloat( userAgent.substring( version + browserArray[i].uaIdentity.length + 1 ) ).toFixed();
				}
				break;
			}
		}
		$( "body" ).addClass( className );
	},
	placeholderFix : function () {
		if(!Modernizr.input.placeholder){
			$('[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
			$('[placeholder]').parents('form').submit(function() {
				$(this).find('[placeholder]').each(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
					}
				})
			});
		}
	},
	faqAnchoring : function() { //fixes FAQ anchoring for Firefox
		if( !$( ".faqCategory" ).length && !$( "body" ).hasClass(' ff' ) ) return false;
		setTimeout( this.scrollToAnchor, 500 );
	},
	scrollToAnchor : function() { //scrolls to the proper anchor
		var hash = TargetCA.helpers.getHash();
		var accordionTitle;
		if(hash != "") {
			 	accordionTitle = $( "#" + hash );
			$( "html, body" ).animate({
				scrollTop: $( accordionTitle ).offset().top    //this is causing an error
			}, "fast");
		}
	},
	maintainBoxHeight : function() {
		if( !$( '.maintainBoxHeight' ).length ) return false;
		var largestHeight = 0;
		var totalHeight;
		$.each( $( '.maintainBoxHeight' ), function( index, value ){
			 	totalHeight = 0;
				$.each( $( value ).children(), function( iindex, iValue ){
					totalHeight = totalHeight + $( iValue ).outerHeight( true );
				});
				if( totalHeight > largestHeight ) {
					largestHeight = totalHeight;
					if( $(window).width() > 720 ){
						$( '.maintainBoxHeight' ).css( 'height', largestHeight );
					} else {
						$( '.maintainBoxHeight' ).css( 'height', "auto" );
					}

				}
		});	

	},
	slidesInit: function() {
		if(!$('.category').hasClass('addPopup')) {
			return;
		} else {
			var thisPopUpWindowLink;

			$('.popupWindowLink1').click(function() {
				thisPopUpWindowLink = $(this);
				$('.popupWindow1').css("visibility", "visible").css("display", "block");
				
				$('.popupWindow2').css("visibility", "hidden").css("display", "none");
				$('.popupWindow3').css("visibility", "hidden").css("display", "none");
				$('.popupWindow4').css("visibility", "hidden").css("display", "none");
				$('.popupWindow5').css("visibility", "hidden").css("display", "none");
				$('.popupWindow6').css("visibility", "hidden").css("display", "none");
				
				$('.popup', $(this)).attr('tabindex',-1).focus();
				$('a,input,select,textarea,button,iframe').attr('tabindex', -1);
				$('.popup').find('a,input,select,textarea,button').attr('tabIndex', 0);
				$('.popupWindow1 #slides').prepend($('.popupWindow1').children().children('a.slidesjs-previous'));
				$('.popupWindow1 #slides').prepend($('.popupWindow1').children().children('a.slidesjs-next'));
				if( thisPopUpWindowLink.hasClass( 'scroll-up' ) ) {
					$( "html, body" ).animate({
							scrollTop: 0
					}, "fast", function () {
							if ( $( ".topFocus" ).length ) $( ".topFocus" ).focus()
					});
				}
				TargetCA.interactions.slidesFix();
				return false;
			})
			$('.popup_close').click(function() {
				$('.popupWindow1').css("visibility", "hidden").css("display", "none");
				$('a,input,select,textarea,button').attr('tabindex', 0);
				if( typeof thisPopUpWindowLink !== "undefined" ){
					thisPopUpWindowLink.focus();
				}
				return false;
			});
			$(document).keyup(function(e) {
				if (e.keyCode == 27){
					$('.popupWindow1').css("visibility", "hidden").css("display", "none");
					if(typeof thisPopUpWindowLink != "undefined"){
						thisPopUpWindowLink.focus();
					}
				}
			}).css({'cursor':'pointer'});

			$('.popupWindowLink2').click(function() {
				thisPopUpWindowLink = $(this);
				$('.popupWindow2').css("visibility", "visible").css("display", "block");
				
				$('.popupWindow1').css("visibility", "hidden").css("display", "none");
				$('.popupWindow3').css("visibility", "hidden").css("display", "none");
				$('.popupWindow4').css("visibility", "hidden").css("display", "none");
				$('.popupWindow5').css("visibility", "hidden").css("display", "none");
				$('.popupWindow6').css("visibility", "hidden").css("display", "none");
				
				$('.popup', $(this)).attr('tabindex',-1).focus();
				$('a,input,select,textarea,button,iframe').attr('tabindex', -1);
				$('.popup').find('a,input,select,textarea,button').attr('tabIndex', 0);
				$('.popupWindow2 #slides').prepend($('.popupWindow2').children().children('a.slidesjs-previous'));
				$('.popupWindow2 #slides').prepend($('.popupWindow2').children().children('a.slidesjs-next'));
				if( thisPopUpWindowLink.hasClass( 'scroll-up' ) ) {
					$( "html, body" ).animate({
							scrollTop: 0
					}, "fast", function () {
							if ( $( ".topFocus" ).length ) $( ".topFocus" ).focus()
					});
				}
				TargetCA.interactions.slidesFix();
				return false;
			})
			$('.popup_close').click(function() {
				$('.popupWindow2').css("visibility", "hidden").css("display", "none");
				$('a,input,select,textarea,button').attr('tabindex', 0);
				if( typeof thisPopUpWindowLink !== "undefined" ){
					thisPopUpWindowLink.focus();
				}
				return false;
			});
			$(document).keyup(function(e) {
				if (e.keyCode == 27){
					$('.popupWindow2').css("visibility", "hidden").css("display", "none");
					if(typeof thisPopUpWindowLink != "undefined"){
						thisPopUpWindowLink.focus();
					}
				}
			}).css({'cursor':'pointer'});
			
			$('.popupWindowLink3').click(function() {
				thisPopUpWindowLink = $(this);
				$('.popupWindow3').css("visibility", "visible").css("display", "block");
				
				$('.popupWindow1').css("visibility", "hidden").css("display", "none");
				$('.popupWindow2').css("visibility", "hidden").css("display", "none");
				$('.popupWindow4').css("visibility", "hidden").css("display", "none");
				$('.popupWindow5').css("visibility", "hidden").css("display", "none");
				$('.popupWindow6').css("visibility", "hidden").css("display", "none");
				
				$('.popup', $(this)).attr('tabindex',-1).focus();
				$('a,input,select,textarea,button,iframe').attr('tabindex', -1);
				$('.popup').find('a,input,select,textarea,button').attr('tabIndex', 0);
				$('.popupWindow3 #slides').prepend($('.popupWindow3').children().children('a.slidesjs-previous'));
				$('.popupWindow3 #slides').prepend($('.popupWindow3').children().children('a.slidesjs-next'));
				if( thisPopUpWindowLink.hasClass( 'scroll-up' ) ) {
					$( "html, body" ).animate({
							scrollTop: 0
					}, "fast", function () {
							if ( $( ".topFocus" ).length ) $( ".topFocus" ).focus()
					});
				}
				TargetCA.interactions.slidesFix();
				return false;
			})
			$('.popup_close').click(function() {
				$('.popupWindow3').css("visibility", "hidden").css("display", "none");
				$('a,input,select,textarea,button').attr('tabindex', 0);
				if( typeof thisPopUpWindowLink !== "undefined" ){
					thisPopUpWindowLink.focus();
				}
				return false;
			});
			$(document).keyup(function(e) {
				if (e.keyCode == 27){
					$('.popupWindow2').css("visibility", "hidden").css("display", "none");
					if(typeof thisPopUpWindowLink != "undefined"){
						thisPopUpWindowLink.focus();
					}
				}
			}).css({'cursor':'pointer'});
			
			$('.popupWindowLink4').click(function() {
				thisPopUpWindowLink = $(this);
				$('.popupWindow4').css("visibility", "visible").css("display", "block");
				
				$('.popupWindow1').css("visibility", "hidden").css("display", "none");
				$('.popupWindow2').css("visibility", "hidden").css("display", "none");
				$('.popupWindow3').css("visibility", "hidden").css("display", "none");
				$('.popupWindow5').css("visibility", "hidden").css("display", "none");
				$('.popupWindow6').css("visibility", "hidden").css("display", "none");
				
				$('.popup', $(this)).attr('tabindex',-1).focus();
				$('a,input,select,textarea,button,iframe').attr('tabindex', -1);
				$('.popup').find('a,input,select,textarea,button').attr('tabIndex', 0);
				$('.popupWindow4 #slides').prepend($('.popupWindow4').children().children('a.slidesjs-previous'));
				$('.popupWindow4 #slides').prepend($('.popupWindow4').children().children('a.slidesjs-next'));
				if( thisPopUpWindowLink.hasClass( 'scroll-up' ) ) {
					$( "html, body" ).animate({
							scrollTop: 0
					}, "fast", function () {
							if ( $( ".topFocus" ).length ) $( ".topFocus" ).focus()
					});
				}
				TargetCA.interactions.slidesFix();
				return false;
			})
			$('.popup_close').click(function() {
				$('.popupWindow4').css("visibility", "hidden").css("display", "none");
				$('a,input,select,textarea,button').attr('tabindex', 0);
				if( typeof thisPopUpWindowLink !== "undefined" ){
					thisPopUpWindowLink.focus();
				}
				return false;
			});
			$(document).keyup(function(e) {
				if (e.keyCode == 27){
					$('.popupWindow4').css("visibility", "hidden").css("display", "none");
					if(typeof thisPopUpWindowLink != "undefined"){
						thisPopUpWindowLink.focus();
					}
				}
			}).css({'cursor':'pointer'});
			
			$('.popupWindowLink5').click(function() {
				thisPopUpWindowLink = $(this);
				$('.popupWindow5').css("visibility", "visible").css("display", "block");
				
				$('.popupWindow1').css("visibility", "hidden").css("display", "none");
				$('.popupWindow2').css("visibility", "hidden").css("display", "none");
				$('.popupWindow3').css("visibility", "hidden").css("display", "none");
				$('.popupWindow4').css("visibility", "hidden").css("display", "none");
				$('.popupWindow6').css("visibility", "hidden").css("display", "none");
				
				$('.popup', $(this)).attr('tabindex',-1).focus();
				$('a,input,select,textarea,button,iframe').attr('tabindex', -1);
				$('.popup').find('a,input,select,textarea,button').attr('tabIndex', 0);
				$('.popupWindow5 #slides').prepend($('.popupWindow5').children().children('a.slidesjs-previous'));
				$('.popupWindow5 #slides').prepend($('.popupWindow5').children().children('a.slidesjs-next'));
				if( thisPopUpWindowLink.hasClass( 'scroll-up' ) ) {
					$( "html, body" ).animate({
							scrollTop: 0
					}, "fast", function () {
							if ( $( ".topFocus" ).length ) $( ".topFocus" ).focus()
					});
				}
				TargetCA.interactions.slidesFix();
				return false;
			})
			$('.popup_close').click(function() {
				$('.popupWindow5').css("visibility", "hidden").css("display", "none");
				$('a,input,select,textarea,button').attr('tabindex', 0);
				if( typeof thisPopUpWindowLink !== "undefined" ){
					thisPopUpWindowLink.focus();
				}
				return false;
			});
			$(document).keyup(function(e) {
				if (e.keyCode == 27){
					$('.popupWindow5').css("visibility", "hidden").css("display", "none");
					if(typeof thisPopUpWindowLink != "undefined"){
						thisPopUpWindowLink.focus();
					}
				}
			}).css({'cursor':'pointer'});
			
			$('.popupWindowLink6').click(function() {
				thisPopUpWindowLink = $(this);
				$('.popupWindow6').css("visibility", "visible").css("display", "block");
				
				$('.popupWindow1').css("visibility", "hidden").css("display", "none");
				$('.popupWindow2').css("visibility", "hidden").css("display", "none");
				$('.popupWindow3').css("visibility", "hidden").css("display", "none");
				$('.popupWindow4').css("visibility", "hidden").css("display", "none");
				$('.popupWindow5').css("visibility", "hidden").css("display", "none");
				
				$('.popup', $(this)).attr('tabindex',-1).focus();
				$('a,input,select,textarea,button,iframe').attr('tabindex', -1);
				$('.popup').find('a,input,select,textarea,button').attr('tabIndex', 0);
				$('.popupWindow6 #slides').prepend($('.popupWindow6').children().children('a.slidesjs-previous'));
				$('.popupWindow6 #slides').prepend($('.popupWindow6').children().children('a.slidesjs-next'));
				if( thisPopUpWindowLink.hasClass( 'scroll-up' ) ) {
					$( "html, body" ).animate({
							scrollTop: 0
					}, "fast", function () {
							if ( $( ".topFocus" ).length ) $( ".topFocus" ).focus()
					});
				}
				TargetCA.interactions.slidesFix();
				return false;
			})
			$('.popup_close').click(function() {
				$('.popupWindow6').css("visibility", "hidden").css("display", "none");
				$('a,input,select,textarea,button').attr('tabindex', 0);
				if( typeof thisPopUpWindowLink !== "undefined" ){
					thisPopUpWindowLink.focus();
				}
				return false;
			});
			$(document).keyup(function(e) {
				if (e.keyCode == 27){
					$('.popupWindow6').css("visibility", "hidden").css("display", "none");
					if(typeof thisPopUpWindowLink != "undefined"){
						thisPopUpWindowLink.focus();
					}
				}
			}).css({'cursor':'pointer'});

			$('DIV #slides').each(function(e){
				TargetCA.interactions.slides(this);
			});
			$( '.look-book .popup_close' ).hover(
				function(){
					$( 'img', $(this) ).attr( 'src', '/assets/images/category-pages/exclusive-line/icon_x_over.png' );
				},
				function(){
						$( 'img', $(this) ).attr( 'src', '/assets/images/content-pages/icon_x.jpg' );
						$(this).attr( 'src', '/assets/images/content-pages/icon_x.jpg' );	 	
					});	 	
					$( '.philip-lim-look-book .popup_close' ).hover(	 	
					function(){	 	
						$( 'img', $(this) ).attr( 'src', '/assets/images/category-pages/exclusive-line/icon_x_over.png' );	 	
					},	 	
					function(){	 	
						if( !$( '.philip-lim-look-book' ).hasClass( 'one' ) ) {	 	
							$( 'img', $(this) ).attr( 'src', '/assets/images/category-pages/exclusive-line/icon_x_white.png' );	 	
							$(this).attr( 'src', '/assets/images/category-pages/exclusive-line/icon_x_white.png' );	 	
						} else {	 	
							$( 'img', $(this) ).attr( 'src', '/assets/images/category-pages/exclusive-line/icon_x_grey.png' );	 	
							$(this).attr( 'src', '/assets/images/category-pages/exclusive-line/icon_x_grey.png' );	 	
					}
				}
			);
		}
	},
	slides: function(id) {
		var totalLength = $(id).children('.slide').length;
		var current = $(id).children('.slide').find('#outof');
		var total = $(id).children('.slide').find('#total');

		if(totalLength > 9) {
			total.html(totalLength);
		} else {
			total.html("0" + totalLength);
		}
		current.html("01");
		$(id).slidesjs({
	    	width:336,
	    	height:690,
	        callback: {
				loaded: function(number) { 
					if( $('body').hasClass( 'fr' ) ){
						$( '.look-book.popupWindow .slidesjs-next' ).attr( 'title', 'Suivante' );
						$( '.look-book.popupWindow .slidesjs-previous'  ).attr( 'title', 'Précédente' );
					}
				},
				start: function(number) { 
					if( !$( 'body' ).hasClass( 'iPhone7' ) ){
						$( '.look-book' ).css( 'pointer-events', 'none' );
					}
					//$( '.slidesjs-slide' ).hide();
					//$( $( '.slidesjs-slide' ).get(number-1) ).show();
					if( $( '#look-book-fix' ).length > 0 ){
						$( '#look-book-fix' ).show();
					}
					if( $( id ).parent().hasClass( 'full-image-lookbook' ) && !$( 'body' ).hasClass( 'ie8' ) ) {	 	
						TargetCA.interactions.fullImageLookBook();	 	
					}					
				},
				complete: function(number) {
					if(number > 9) {
						current.html(number);
					} else {
						current.html("0" + number);
					}
					$( '.look-book' ).css( 'pointer-events', 'auto' );
					
					if( $( '#look-book-fix' ).length > 0 ){
						$( '#look-book-fix' ).hide();
					}
					$( '.slidesjs-slide', $(id) ).hide();
					var i;
					for( i = 0; i < $( '.slidesjs-slide', $(id) ).length + 1; i++ ){
						if( i == number - 1 ){
							$( $( '.slidesjs-slide', $(id) )[i] ).show();
						}
					}

					if( $( id ).parent().hasClass( 'full-image-lookbook' ) && !$( 'body' ).hasClass( 'ie8' ) ) {	 	
						var windowWidth = $(window).width();	 	
								 	
							$( '.slide' ).removeClass( 'current' );	 	
							var num = parseInt( $( '.big' ).html() ) - 1;	 	
							$( $( '.slide' ).get( num ) ).addClass( 'current' );	 	
							$( '.full-image-lookbook' ).removeClass( 'one two three' );	 	
							if( $( $( '.slide' ).get( num ) ).hasClass( 'morning' ) ) {	 	
								$( '.full-image-lookbook' ).addClass( 'one' );	 	
								if( windowWidth <= 721 ) {	 	
									$( '.philip-lim-look-book .popup_close img' ).attr( 'src', "/assets/images/category-pages/exclusive-line/icon_x_grey.png" );	 	
								} else {	 	
									$( '.philip-lim-look-book .popup_close img' ).attr( 'src', "/assets/images/category-pages/exclusive-line/icon_x_white.png&quo t" );	 	
								}	 	
							} else if( $( $( '.slide' ).get( num ) ).hasClass( 'noon' ) ){	 	
								$( '.full-image-lookbook' ).addClass( 'two' );	 	
								$( '.philip-lim-look-book .popup_close img' ).attr( 'src', "/assets/images/category-pages/exclusive-line/icon_x_white.png&quo t" );	 	
							} else if( $( $( '.slide' ).get( num ) ).hasClass( 'night' ) ){	 	
								$( '.full-image-lookbook' ).addClass( 'three' );	 	
								$( '.philip-lim-look-book .popup_close img' ).attr( 'src', "/assets/images/category-pages/exclusive-line/icon_x_white.png&quo t" );	 	
							}	 	
						}
				}
			},

	        navigation: {
		    	active: true,
		        effect: "fade"
	        },
	        pagination: {
		    	active: false,
		    	effect: "fade"
		    }
	    });
	},
	slidesFix : function() {
		$( '.look-book .slidesjs-container, .look-book .slidesjs-control' ).css( { 'width' : '100%', 'height' : '100%' } );
	},
	customDropDown : function() {
		if( $( '.custom-drop-down' ).length == 0 ) return false;
		
		$( '.custom-drop-down' ).click( function( evt ){
			$( this ).focus();
			$( this ).addClass( 'disable-click' );
			var scope = $( this );
			
			var selector = $( this ).attr( 'data-select' );
			selector += " select";
			
			$( '.dropdownOpened', $( this ) ).scrollTop( 0 );

			var heightValue = '215px';
			if( scope.hasClass( "opened" ) ){
				heightValue = '0px';
			}
			$( '.dropdownOpened', $( this ) ).stop().animate( {
				height: heightValue
			}, 500, function(){
				if( scope.hasClass( "opened" ) ){
					scope.removeClass( "opened" );
					$( 'span.arrow', scope ).removeClass( "opened" );
					scope.unbind( 'keyup' );
					$( '.custom-drop-down' ).unbind( 'focusout' );
				} else {
					$( this ).focus();
					$( '.custom-drop-down' ).focusout( function(evt) {
						var scope = $( this );
						$( '.dropdownOpened', $( this ) ).stop().animate( {
							height: '0px'
						}, 500, function(){
							scope.removeClass( "opened" );
							$( 'span.arrow', scope ).removeClass( "opened" );
							scope.removeClass( 'disable-click' );
							scope.unbind( 'keyup' );
							$( '.custom-drop-down' ).unbind( 'focusout' );
						});
					});
					scope.addClass( "opened" );
					$( 'span.arrow', scope ).addClass( "opened" );
					scope.bind( 'keyup', function( evt ){
						var character = String.fromCharCode( evt.keyCode );
						var selectElement = $( "#" + $( scope ).attr( 'data-select' ) );
						$( "select", selectElement ).val( character );
						selectElement.submit();
					});
				}
				scope.removeClass( 'disable-click' );
			});
		});
		
		$( ".comboItem" ).click( function(){
			var parent = $( this ).parent().parent().parent();
			var selectElement = $( "#" + $( parent ).attr( 'data-select' ) );
			$( 'span.text', parent ).html( $( this ).html() );
			$( "select", selectElement ).val( $( this ).html() );
			selectElement.submit();
		});
		
		$( "select" ).change( function(){
			var parent = $( this ).parent().parent();
			$( ".customDropDown span.text", parent ).html( $( this ).val() );
			$( this ).parent().submit();
		});
	},
	formField : function() {
		if( $( '.form-field-container' ).length == 0 ) return false;
		
		$( '.form-field-container input[type="text"]' ).click( function(){
			if( $( this ).val() == $( this ).attr( 'data-placeholder' ) ){
				$( this ).val( "" );
			}
		})
	}, 
	fullImageLookBook : function() {
		var windowWidth = $(window).width();
		var newTopHeight = 0;
		var newLeftPos = 0;
		var num = parseInt( $( '.big' ).html() ) - 1;
		
		$( window ).load( function(){
			windowWidth = $(window).width();
			newTopHeight = ( $( '.full-image-lookbook' ).height() - $( $( '.full-image-lookbook .slide .imgWrap img' ).get( num ) ).height() ) / 2;
			newLeftPos = ( $( $( '.full-image-lookbook .slide .imgWrap' ).get( num ) ).width() - $( $( '.full-image-lookbook .slide .imgWrap img' ).get( num ) ).width() ) / 2;
			
			if( windowWidth < 1026 ){
				if( newTopHeight >= 0 ){
					newTopHeight = 0;
				}
				if( newLeftPos >= 0 ){
					newLeftPos = 0;
				}
				$( '.full-image-lookbook .slide .imgWrap img' ).css( { 'top' : newTopHeight + 'px', 'left' : newLeftPos + 'px' });
			} else if( windowWidth >= 1026 ) {
				$( '.full-image-lookbook .slide .imgWrap img' ).attr( 'style', '' );
			}
			
			if( windowWidth <= 721 ){
				newTopHeight -= 30;
				$( '.full-image-lookbook .slide .imgWrap img' ).css( { 'top' : newTopHeight + 'px', 'left' : newLeftPos + 'px' });
			}
			
			$( '.full-image-lookbook .slide .imgWrap' ).css( 'height', $( '.full-image-lookbook' ).height() );
		});
		
		if( windowWidth <= 721 ){
			$( '.full-image-lookbook .slide' ).removeClass( 'current' );
			var num = parseInt( $( '.big' ).html() ) - 1;
			$( $( '.full-image-lookbook .slide' ).get( num ) ).addClass( 'current' );
			if( $( $( '.full-image-lookbook .slide' ).get( num ) ).hasClass( 'morning' ) ) {
				$( '.full-image-lookbook' ).addClass( 'one' );
			} else if( $( $( '.full-image-lookbook .slide' ).get( num ) ).hasClass( 'noon' ) ){
				$( '.full-image-lookbook' ).addClass( 'two' );
			} else if( $( $( '.full-image-lookbook .slide' ).get( num ) ).hasClass( 'night' ) ){
				$( '.full-image-lookbook' ).addClass( 'three' );
			} else {
				$( '.full-image-lookbook' ).removeClass( 'one two three' );
			}
		}
	},
	resizing : function() {
		if( $( '.full-image-lookbook' ).length == 0 && !$( 'body' ).hasClass( 'ie8' ) ) return false;
		
		var windowWidth = $(window).width();
		var num = parseInt( $( '.big' ).html() ) - 1;
		var newTopHeight = ( $( '.full-image-lookbook' ).height() - $( $( '.full-image-lookbook .slide .imgWrap img' ).get( num ) ).height() ) / 2;
		var newLeftPos = ( $( $( '.full-image-lookbook .slide .imgWrap' ).get( num ) ).width() - $( $( '.full-image-lookbook .slide .imgWrap img' ).get( num ) ).width() ) / 2;
		
		if( windowWidth < 1026 ){
			if( newTopHeight >= 0 ){
				newTopHeight = 0;
			}
			if( newLeftPos >= 0 ){
				newLeftPos = 0;
			}
			$( '.full-image-lookbook .slide .imgWrap img' ).css( { 'top' : newTopHeight + 'px', 'left' : newLeftPos + 'px' });
		} else if( windowWidth >= 1026 ) {
			$( '.full-image-lookbook .slide .imgWrap img' ).attr( 'style', '' );
		}
		
		if( windowWidth <= 721 ){
			newTopHeight -= 30;
			$( '.slide .imgWrap img' ).css( { 'top' : newTopHeight + 'px', 'left' : newLeftPos + 'px' });
			
			if( $( $( '.slide' ).get( num ) ).hasClass( 'morning' ) ) {
				$( '.full-image-lookbook' ).addClass( 'one' );
				$( '.philip-lim-look-book .popup_close img' ).attr( 'src', "/assets/images/category-pages/exclusive-line/icon_x_grey.png" );
			} else if( $( $( '.slide' ).get( num ) ).hasClass( 'noon' ) ){
				$( '.full-image-lookbook' ).addClass( 'two' );
			} else if( $( $( '.slide' ).get( num ) ).hasClass( 'night' ) ){
				$( '.full-image-lookbook' ).addClass( 'three' );
			} else {
				$( '.full-image-lookbook' ).removeClass( 'one two three' );
			}
		} else {
			$( '.full-image-lookbook' ).removeClass( 'one two three' );
			$( '.philip-lim-look-book .popup_close img' ).attr( 'src', "/assets/images/category-pages/exclusive-line/icon_x_white.png" );
		}
		
		this.fullImageLookBook();
		
		$( '.full-image-lookbook .slide .imgWrap' ).css( 'height', $( '.full-image-lookbook' ).height() );
	},
	hasMobileStyle: function(){
		var display = $("header nav .gn--list").css("display");
		$("header nav .gn--list").css({
			"display":"block"
		});
		var hasMobileStyle = (Math.round($("header nav .gn--list").width()/$(window).width()*100) == 90);
		if( $("header nav .gn--list").hasClass( 'display_none' ) ){
			display = "none";
		}
		$("header nav .gn--list").css({
			"display":display
		});
		return hasMobileStyle;
	},
	checkOrientation : function() {
		var w = $(window).width();
		if( (w >= 480) && TargetCA.interactions.hasMobileStyle() ) {
			$('body').addClass('mobile-landscape');
		} else {
			$('body').removeClass('mobile-landscape');
		}

		if( $( 'body' ).hasClass( 'ie8' ) ){
			if( w <= 960 ){
				$( '.white-wrap' ).css( 'min-width', '1050px' );
			} else {
				$( '.white-wrap' ).attr( 'style', '' );
			}
		}

		setInterval( function(){
			var calcFontSize = $( '.language-french' ).css( 'font-size' );
			calcFontSize = calcFontSize.slice( 0, calcFontSize.indexOf( 'px' ) );
			if( ( calcFontSize > 10 && $( '.gn' ).css( 'width' ) == '960px' ) || //desktop
			   ( calcFontSize > 13 && $( '.gn' ).css( 'top' ) == '20px' ) || //tablet
			   ( calcFontSize > 13 && TargetCA.interactions.hasMobileStyle() ) ){ //mobile
				$( 'body' ).addClass( 'text-zoom' );
			} else {
				$( 'body' ).removeClass( 'text-zoom' );
				if( $( '.gn' ).css( 'width' ) == '960px' ){
					$( '.gn--list' ).show();
				}
			}
		}, 1000 );
	},
	lookbook : function() {

		if( $( '.look-book' ).length == 0 ) return false;
		/*
		$.each( $( '.look-book .imgWrap a' ), function( index, value ) {
			$( value ).attr( 'target', '_blank' );
		});
		*/
		if( $('.look-book.use-look-book-description').length != 0) {
			$.each( $('.look-book.use-look-book-description a[data-pin-do="buttonPin"]'), function( index, value ){
				var temp = $(value).attr('href');
				temp = temp.slice( 0, temp.lastIndexOf('&description') );
				var content = $( '.modalWrap p', $( value ).parent().parent() ).html();
				if( $( '.category.monster-high' ).length != 0 ) {
					content = content.replace( /<sup>TM<\/sup>/g, "(TM)" );
					content = content.replace( /<SUP>TM<\/SUP>/g, "(TM)" );
					content = content.replace( /<sup>MC<\/sup>/g, "(MC)" );
					content = content.replace( /<SUP>MC<\/SUP>/g, "(MC)" );
				}
				var copy = $.trim( content );
				copy = copy.replace( "<br>", '\r\n' );
				if( $( "body" ).hasClass( 'ie' ) ){
					copy = copy.replace( "<BR>", '%0A' );
				}
				copy = $( "<div></div>" ).html( copy ).text();

				temp += "&description=" + encodeURIComponent( copy );
				if( $( "body" ).hasClass( 'ie' ) ){
					temp = temp.replace( "%250A", "%0A" );
				}
				$(value).attr( 'href',temp );
			} );
		}

		if( $( '.look-book.use-look-book-img' ).length != 0 ){
			$.each( $('.look-book.use-look-book-img a[data-pin-do="buttonPin"]'), function( index, value ){
				var temp = $(value).attr('href');
				var startTemp = temp.slice( 0, temp.lastIndexOf('&media=') );
				var endTemp = temp.slice( temp.lastIndexOf('&description'), temp.length );
				temp = startTemp + "&media=" + encodeURIComponent( $.trim( "http://www.target.ca" + $( '.imgWrap img', $( value ).parent().parent() ).attr( 'src' ) ) ) + endTemp;
				$( value ).attr( 'href',temp );
			});
		}

		if( $( '.look-book.use-look-book-url' ).length != 0 ){
			$.each( $('.look-book.use-look-book-url a[data-pin-do="buttonPin"]'), function( index, value ){
				var temp = $(value).attr('href');
				var startTemp = temp.slice( 0, temp.lastIndexOf('?url=') );
				var endTemp = temp.slice( temp.lastIndexOf('&media'), temp.length );
				temp = startTemp + "?url=" + encodeURIComponent( $.trim( window.location.href ) ) + endTemp;
				$( value ).attr( 'href',temp );
			});
		}
	},
	reorder: function(moving, moveto, where){
		if(where == 'after') $(moving).insertAfter(moveto);
		if(where == 'before') $(moving).insertBefore(moveto);
		if(where == 'append') { $(moveto).append($(moving)); }
		if(where == 'prepend') { $(moveto).prepend($(moving)); }
	},
	clothing : function () {
		if( $( '.category.apparel' ).length == 0 ) return false;
		
		$( window ).bind( 'load orientationchange resize', function() {
			//fix circo positioning
			var windowWidth = $( window ).width();
			//fix rock it headline
			if( windowWidth < 370 ) {
				if( $( 'body' ).hasClass( 'en' ) ){
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '30%',
						'width' : '65%'
					});
					if( windowWidth >= 345 ){
						$( '.herogirl' ).css( { 'width' : '47%' } );
					} else {
						$( '.herogirl' ).attr( 'style', '' );
					}
				} else {
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '20%',
						'width' : '64%'
					});
					$( '.herogirl' ).css( { 'top' : '26%', 'width' : '48%' } );
				}
				
			} else if( windowWidth > 371 && windowWidth < 420 ){
				if( $( 'body' ).hasClass( 'en' ) ){
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '30%',
						'width' : '65%'
					});
					$( '.herogirl' ).css( { 'width' : '44%' } );
				} else {
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '20%',
						'width' : '60%'
					});
					$( '.herogirl' ).attr( 'style', '' );
					$( '.herogirl' ).css( { 'top' : '23%', 'width' : '43%' } );
				}
			} else if( windowWidth >= 421 && windowWidth < 479 ) {
				if( $( 'body' ).hasClass( 'en' ) ){
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '17%',
						'width' : '65%'
					});
					$( '.herogirl' ).css( 'width', '37%' );
				} else {
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '20%',
						'width' : '56%'
					});
					$( '.herogirl' ).attr( 'style', '' );
					$( '.herogirl' ).css( 'width', '35%' );
				}
				
			} else if( windowWidth >= 479 && windowWidth < 520 ){
				if( $( 'body' ).hasClass( 'en' ) ){
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '17%',
						'width' : '65%'
					});
				} else {
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '20%',
						'width' : '53%'
					});
					$( '.herogirl' ).attr( 'style', '' );
				}
				$( '.herogirl' ).css( 'width', '41%' );

			} else if( windowWidth >= 520 && windowWidth < 600 ){
				if( $( 'body' ).hasClass( 'en' ) ){
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '17%',
						'width' : '60%'
					});
				} else {
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '17%',
						'width' : '60%'
					});
					$( '.herogirl' ).attr( 'style', '' );
				}
				$( '.herogirl' ).css( 'width', '36%' );
			} else if( windowWidth >= 600 && windowWidth < 720 ){
				if( $( 'body' ).hasClass( 'en' ) ){
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '15%',
						'width' : '55%'
					});
					$( '.herogirl' ).css( 'width', '30%' );
				} else {
					$( '.mobileHeroBoy' ).css({
						'margin-left' : '-3%',
						'top' : '15%',
						'width' : '49%'
					});
					$( '.herogirl' ).attr( 'style', '' );
					$( '.herogirl' ).css( 'width', '30%' );
				}
				
			} else {
				$( '.herogirl' ).attr( 'style', '' );
			}
		});

		var currentSize = "desktop";
		$(window).resize(function(){
			if($('.isdesktop').css('visibility') == 'visible' && currentSize != "desktop") currentSize = "desktop";
			else if ($('.istablet').css('visibility') == 'visible' && currentSize != "tablet")	currentSize = "tablet";
			else if ($('.ismobile').css('visibility') == 'visible' && currentSize != "mobile") currentSize = "mobile";
			else return;
			TargetCA.interactions.clothingReorder(currentSize);
		});
		if($('.isdesktop').css('visibility') == 'visible' && currentSize != "desktop") currentSize = "desktop";
		else if ($('.istablet').css('visibility') == 'visible' && currentSize != "tablet")	currentSize = "tablet";
		else if ($('.ismobile').css('visibility') == 'visible' && currentSize != "mobile") currentSize = "mobile";
		else return;
		TargetCA.interactions.clothingReorder(currentSize);
	},
	clothingReorder : function(size){
		if(size=="desktop" ){ //desktop
			TargetCA.interactions.reorder('.samlib', '.dedication', 'after');
			$( ".samlib" ).removeClass( "column1" ).addClass( "column2" );
			TargetCA.interactions.reorder('.merona', '.samlib', 'after');
			TargetCA.interactions.reorder('.monster-high', '.third-column', 'prepend');
			TargetCA.interactions.reorder('.bts', '.monster-high', 'after');
			TargetCA.interactions.reorder('.mossimo', '.bts', 'after');
			TargetCA.interactions.reorder('.beavercanoe', '.mossimo', 'after');
			TargetCA.interactions.reorder('.champion', '.beavercanoe', 'after');
			$(".champion").removeClass("column1").addClass("column2");
			TargetCA.interactions.reorder('.tomsMainImage', '.tomsContent', 'after');
		} else if(size == "tablet" ){ //tablet
			TargetCA.interactions.reorder('.monster-high', '.targetstyle-callout', 'after');
			TargetCA.interactions.reorder('.circo', '.dedication', 'before');
			TargetCA.interactions.reorder('.xhil', '.dedication', 'before');
			TargetCA.interactions.reorder('.cherokee', '.dedication', 'before');
			TargetCA.interactions.reorder('.samlib', '.dedication', 'before');
			$( ".samlib" ).removeClass( "column2" ).addClass( "column1" );
			TargetCA.interactions.reorder('.merona', '.dedication', 'after');
			$( '.dedication' ).removeClass( 'column1' ).addClass( 'column2' );
			TargetCA.interactions.reorder('.bts', '.merona', 'after');
			TargetCA.interactions.reorder('.mossimo', '.bts', 'after');
			$( ".mossimo" ).removeClass( "column2" ).addClass( "column1" );
			TargetCA.interactions.reorder('.beavercanoe', '.mossimo', 'after');
			$( ".beavercanoe" ).removeClass( "column2" ).addClass( "column1" );
			TargetCA.interactions.reorder('.champion', '.beavercanoe', 'after');
			$( ".champion" ).removeClass( "column2" ).addClass( "column1" );
			TargetCA.interactions.reorder('.tomsMainImage', '.tomsContent', 'after');
		} else {
			TargetCA.interactions.reorder('.monster-high', '.targetstyle-callout', 'after');
			TargetCA.interactions.reorder('.toms', '.monster-high', 'after');
			TargetCA.interactions.reorder('.tomsMainImage', '.tomsContent', 'before');
			TargetCA.interactions.reorder('.bts', '.toms', 'after');
			TargetCA.interactions.reorder('.dedication', '.bts', 'after');
			$( '.dedication' ).removeClass( 'column2' ).addClass( 'column1' );
			TargetCA.interactions.reorder('.mossimo', '.dedication', 'before');
			$( ".mossimo" ).removeClass( "column1" ).addClass( "column2" );
			$( ".beavercanoe" ).removeClass( "column1" ).addClass( "column2" );

			TargetCA.interactions.reorder('.xhil', '.merona', 'after');
			TargetCA.interactions.reorder('.circo', '.xhil', 'after');
			TargetCA.interactions.reorder('.cherokee', '.circo', 'after');
			TargetCA.interactions.reorder('.champion', '.samlib', 'after');
			TargetCA.interactions.reorder('.beavercanoe', '.samlib', 'after');
			TargetCA.interactions.reorder('.champ', '.merona', 'after');
		}
	},
	personal : function() {
		if( $( '.category.personal' ).length == 0 ) return false;
		
		$( window ).bind( 'load orientationchange resize', function() {
			var windowWidth = $( window ).width();
			if( windowWidth <= 520 && windowWidth >= 355 ) {
				$( '.category.personal .tagline' ).css( 'margin-top', '7%' );
			} else {
				$( '.category.personal .tagline' ).attr( 'style', '' );
			}
		});
	},
	videoCallout : function() {
		if( $( '.video-callout' ).length == 0 ) return false;
		$( '.video-callout' ).click( function(evt){
			evt.preventDefault();
			evt.stopImmediatePropagation();
			var vidObj = $( this ).attr( 'data-videocallout' );
			$( '#' + vidObj ).click();
			if( typeof $( '.' + vidObj + ' video' )[0] !== 'undefined' ){
				$( '.' + vidObj + ' video' )[0].play();
			}
		});
	},
	checkVideoHash: function(){
		var currentHash = TargetCA.helpers.getHash();
		$.each( $( '.video' ), function( index, value ) {
			if( $( 'a.thumbnail', $( value ) ).attr( 'href' ) == "#video" && $( 'a.thumbnail', $( value ) ).attr( 'data-videohash' ) == currentHash ){
				$( window ).scrollTop( $( value ).parent().parent().offset().top );
				$( window ).bind( 'load', function(){
					$( window ).scrollTop( $( value ).parent().parent().offset().top );
					$( window ).unbind( 'load' );
				});

				var intVal = setInterval( function(){
					if( $( '.vid_popup' ).css( 'visibility' ) != 'visible' ){
						$( '#' + $( 'a.thumbnail', $( value ) ).attr( 'id' ) ).click(); 
					} else {
						$( 'a.thumbnail', $( value ) ).focus();
						if( !$( 'body' ).hasClass( 'ie' ) ){
							TargetCA.video.isOpened = true;
							clearInterval( intVal );
						} else {
							setTimeout( function(){
								TargetCA.video.isOpened = true;
								clearInterval( intVal );
							}, 600 );
						}
						
					}
				}, 100 );
			}
		});
	},
	threshold: function(){
		if($(".threshold").length == 0) return false;
		var windowWidth = $(window).width();
		var windowIsSmall = false;
		$( window ).bind( 'load resize orientationchange', function(){
			windowWidth = $(window).width();
			if(windowWidth < 1026){
				if(!windowIsSmall){
					$("#text3").insertBefore("#videothumb");
					windowIsSmall = true;
				}			
			} else {
				if(windowIsSmall){
					$("#text3").insertAfter("#shelf4");
					windowIsSmall = false;
				}
			}
		});

		reorderThreshold();

		$(window).resize(reorderThreshold);

		function reorderThreshold(){
			if($('#ismobile').css('visibility') == 'hidden' && $('#istablet').css('visibility') == 'hidden') {
				$('#text3').insertAfter($('#shelf4'));
				$('#finalright').insertBefore($('#table2'));
				$('#thresh3').insertAfter($('#table2'));
			}

			if($('#istablet').css('visibility') == 'visible')  {
				$('#text3').insertBefore($('#videothumb'))
				$('#finalright').insertBefore($('#table2'));
				$('#thresh3').insertAfter($('#table2'));
			}

			if($('#ismobile').css('visibility') == 'visible')  {
				$('#finalright').insertAfter($('#table2'));
				$('#thresh3').insertBefore($('#table2'));
				$('#text3').insertBefore($('#videothumb'));
				$('.mobile-landscape .category.threshold #videothumb .video video').css('height', '259px');
			}
		}
	},
	essentials : function () {
		if( $( ".essentials" ).length == 0 ) return false;
		var windowWidth = $(window).width();
		$( window ).bind( 'load resize orientationchange', function(){
			windowWidth = $(window).width();
			if( windowWidth >= 345 && windowWidth < 480 ){
				$( '.category.essentials .cat-details .tagline' ).css( 'margin-top', '12%' );
			} else {
				$( '.category.essentials .cat-details .tagline' ).attr( 'style', '' );
			}
		});
	},
	homepage : function() {
		if( $( '.homepage' ).length == 0 ) return false;

		var windowWidth = $(window).width();
		$( window ).bind( 'load resize orientationchange', function(){
			windowWidth = $(window).width();
			
			if( windowWidth <= 1025 && windowWidth > 960 && $( '.homepage .hp--hero .hp--hero-wrap.two-column .column1 .headlineContent' ).css( 'width' ) != '318px' ){
				$( '.homepage .hp--hero .hp--hero-wrap.two-column .column2.parent' ).css( 'margin-left', "3.5%" );
				$( '.homepage .hp--hero .hp--hero-wrap.two-column .column1 .column2.headlineContent.child' ).css( { 
					'position' : 'relative',
					'left' : '2.5%'
				});
				var ratio = 1 - ( windowWidth / 1025 );
				var newPercentage = ( ratio * 23.5 ) + 23;

				var newPercentageTwo = ( ( windowWidth / 1025 ) * 31 ) + 0.9;

				$( 'img.midYellow.mobile.hide' ).css( {
					'position' : 'absolute',
					'display': 'inline',
					'top' : '0',
					'left' : newPercentage + '%',
					'width' : newPercentageTwo + '%',
					'min-width' : '30%'
				}).show();
			} else {
				$( '.homepage .hp--hero .hp--hero-wrap.two-column .column2.parent' ).attr( 'style', '' );
				$( 'img.midYellow.mobile.hide' ).attr( 'style', '' );
				$( '.homepage .hp--hero .hp--hero-wrap.two-column .column1 .column2.headlineContent.child' ).attr( 'style', '' );
			}

			if( $( 'body').hasClass( 'mobile-landscape') && windowWidth > 480 ){
				$( '.mobile-landscape .homepage .hp--hero-wrap.two-column .column1 .headlineContent .buttonContainer' ).css( 'left', 'auto' );
			} else {
				$( '.homepage .hp--hero-wrap.two-column .column1 .headlineContent .buttonContainer' ).attr( 'style', '' );
			}
		});
	},
	brunet: function() {
		if( $( '.pharmacy-landing.brunet' ).length == 0 ) return false;

		var windowWidth = $(window).width();
		$( window ).bind( 'load resize orientationchange', function(){
			windowWidth = $(window).width();
			if( windowWidth <= 1025 && $( '.pharmacy-landing.brunet .isMobile' ).css( 'display' ) == 'none' ){
				$( '.pharmacy-landing.brunet .backgroundContainer' ).css( 'height', $( '.pharmacy-landing.brunet .imgContainer .hero' ).height() + 20 );
				if( windowWidth < 769 && windowWidth > 700 ){
					$( '.pharmacy-landing.brunet .backgroundContainer' ).css( 'height', $( '.pharmacy-landing.brunet .imgContainer .hero' ).height() - 17 );
				}
			} else {
				$( '.pharmacy-landing.brunet .backgroundContainer' ).attr( 'style', '' );
			}
		});
	},
	monsterhigh : function() {
		if( $( '.monster-high' ).length == 0 ) return false;

		$( window ).bind( 'load resize orientationchange', function(){
			if( $( '.category.monster-high .main-body .two-column .column2 .imageContainer' ).css( 'position' ) == 'relative' ){
				$( '.category.monster-high .main-body .two-column .column2 .imageContainer' ).height( $( '.category.monster-high .main-body .two-column .column1').height() + 40 );
			} else {
				$( '.category.monster-high .main-body .two-column .column2 .imageContainer' ).attr( 'style', '' );
			}
		});
	},
	unbeatablePrices : function(){
		if( $( '.unbeatable-prices' ).length == 0 ) return false;

		$( window ).bind( 'load resize orientationchange', function(){
			if( $( '.CategoryBody.unbeatable-prices .two-column.basket .midBasketContainer' ).css( 'display' ) == 'block' ){
				$( '.CategoryBody.unbeatable-prices .two-column.basket' ).prepend( $( '.CategoryBody.unbeatable-prices .two-column.basket .midBasketContainer' ) );
			} else {
				$( '.CategoryBody.unbeatable-prices .two-column.basket' ).prepend( $( '.CategoryBody.unbeatable-prices .two-column.basket .midImgContainer' ) );
			}
		});
	},
	setFontsize: function(el, size){
		$(el).css("font-size",size+"rem");
		if($("body").hasClass("ie8")) $(el).css("font-size",size*10+"px");
	},
	halloween: {
		init: function(){
			if(!$(".category.halloween").length) return;
			this.eyeToMouse({container: $(".cat-head .hairyEyes .left")});
			this.eyeToMouse({container: $(".cat-head .hairyEyes .right")});
			this.eyeToMouse({container: $(".cat-head .flyEyes .left")});
			this.eyeToMouse({container: $(".cat-head .flyEyes .right")});
		},
		eyeToMouse: function(o){
			$(document).on("mousemove", function(e){
				var eye = function(){
					var re = {
						container: o.container,
					}
					re.ball = re.container.find("img");
					re.width = re.ball.width();
					re.height = re.ball.height();
					return re;
				}();
				var mouseX = e.pageX;
				var mouseY = e.pageY;
				var troubleMode = 0;


				if(mouseY <= eye.container.offset().top + eye.height/2) {
					eye.ball.css("top", 0);
				} else if (mouseY >= eye.container.offset().top + eye.container.height() - eye.height/2) {
					eye.ball.css("top", eye.container.height() - eye.height);
				} else {
					eye.ball.css("top", mouseY - eye.container.offset().top - eye.height/2 + "px");
					troubleMode += 0.5;
				}

				if(mouseX <= eye.container.offset().left + eye.width/2) {
					eye.ball.css("left", 0);
				} else if (mouseX >= eye.container.offset().left + eye.container.width() - eye.width/2) {
					eye.ball.css("left", eye.container.width() - eye.width);
				} else {
					eye.ball.css("left", mouseX - eye.container.offset().left - eye.width/2 + "px");
					troubleMode += 0.5;
				}

				if(troubleMode == 1) {
					eye.ball.css("cursor", "none");
				} else {
					eye.ball.css("opacity", "default");
				}
			});
		}
	},
	toys: function(){
		if(!$(".category.toys").length) return;
		$( window ).bind( 'load resize orientationchange', function(){
			var windowWidth = $(window).width();
			if(windowWidth < 1021) $(".tidbit.monster-high .imgContainer").insertBefore(".tidbit.monster-high .copyContainer");
			else $(".tidbit.monster-high .copyContainer").insertBefore(".tidbit.monster-high .imgContainer");
		});
	}
}