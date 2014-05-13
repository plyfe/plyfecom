if ( typeof(console) === 'undefined' ) {
	var console = {}
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};
}

// script injector

mvpInjectScript = function(url, scriptId, lookFor, callback, replace) {
	var head = document.getElementsByTagName('head')[0];
	var prevScript = document.getElementById(scriptId);
	
	if ( replace == undefined ) 
		replace = true;	
		
	if ( prevScript && replace ) {
		head.removeChild( prevScript );
		prevScript = null;
	}
	if ( !prevScript || !(url == prevScript.src) ) {
		var oScript = document.createElement("script"); 
		oScript.setAttribute("src", url); 
		oScript.setAttribute("id", scriptId); 
		if ( callback ) {
			mvpWaitForLoad(lookFor, callback);
		}
		
		head.appendChild(oScript);
	} else {
		callback();
	}
}

mvpWaitForLoad = function(lookFor, callback) {
	var interval = setInterval(function() {
		if ( eval("typeof " + lookFor) != 'undefined') {
			clearInterval(interval);
			callback();
		}
	}, 50);					
}


// ###################################################################### //
// YuMe companion ads

var positions = [{ className: ".mvp_ad_module_top_leader", width: 728, height: 90, location: 'magnify_widget_top_leader_frame' }, { id: "mvp_ad300", width: 300, height: 250, location: 'magnify_widget_rect_frame' }, { id: "magnify_widget_rect_content", width: 300, height: 250, location: 'magnify_widget_rect_frame' }, { className: ".mvp_ad_module_item_rect", width: 300, height: 250, location: 'magnify_widget_rect_frame' }, { className: ".mvp_ad160x600", width: 160, height: 600, location: 'magnify_widget_widesky_frame' }, { className: ".mvp_ad_module_right_widesky", width: 160, height: 600, location: 'magnify_widget_widesky_frame'}, { className: ".mvp_ad_module_item_box", width: 200, height: 200, location: 'magnify_widget_item_box_frame' }];

locateAdModules = function() {
	var candidateAds = new Array();
	positions.each( function(module, i) {
		var divs = new Array();
		if ( module.className ) {
			divs = $$(module.className);
		}
		if ( !divs.length && module.id && typeof( $(module.id) ) != 'undefined' && $(module.id) != null ) {
			divs.push( $(module.id) );
		}
		divs.each( function(candidate, j) {
			//var candidate = divs[0];
			if ( !candidate.id || typeof( candidate.id ) == 'undefined' ) {
				candidate.id = "mvp_dynamic_ad_module_" + i;
			}
			console.log( "my candidate id is: " + candidate.id );
			candidate.width = module.width;
			candidate.height = module.height;
			candidate.location = module.location;
			candidateAds.push( candidate );
		});
	});
	return candidateAds;
}
			
buildYumeIframe = function(el) {
	el.style.width = "300px";
	el.style.height = "250px";
	if ( $('magnify_player_continuous_ad') ) {
		$('magnify_player_continuous_ad').style.height = "262px";	
	}
	el.id = 'cb_medrect1_div';
	el.innerHTML = '<iframe name="' + el.id + '_frame" id="cb_medrect1_frame" src="/decor/yume/empty.html" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" allowtransparency="true" width="300" height="250"></iframe>';
}

callYumeAd = function(domainId, adUrl) {
	var yumeCbAdObject1 = new yumeStaticCbAd(); 
	yumeCbAdObject1.setPlayerMediumRectangleCompanionBannerDivSource("cb_medrect1_div"); 
	yumeCbAdObject1.setPlayerAdDomainUrl(adUrl);
	yumeCbAdObject1.setPlayerIframeBannerPlaylist("dynamic_banner_iframe.html?domain=" + domainId);
}
					
loadYumeCompanions = function(domainId, adUrl) {
	console.log("locating YuMe companions");
	locateAdModules().each( function( el, i ) {
		if ( $(el.id) && Number(el.width) == 300 ) {
			buildYumeIframe($(el.id));
			callYumeAd(domainId, adUrl);
		}
	});
}

// ###################################################################### //
// Acudeo companion ads

function displayCompanionBanners(banners) { 
   tmDisplayBanner(banners, "adCompanionBanner", 300, 250); 
   try {
		$f().getPlugin('logoContent').hide();
   } catch(e) {}
} 

function hideCompanionBanners(banners) { 
	if ( standalonePreroll ) {
		try {
			swapClips();
		} catch(e) { return; }
	}
	try {
		$f().getPlugin('logoContent').show();
	} catch(e) {}
	try {
		hideAd();
		//tmHideBanner("adCompanionBanner"); 
	} catch(e) {}
} 
			
buildAcudeoDiv = function(el) {
	el.style.width = "300px";
	el.style.height = "250px";
	el.style.position = "relative";
	if ( $('magnify_player_continuous_ad') ) {
		$('magnify_player_continuous_ad').style.height = "262px";	
	}
	//el.update('<img src="/decor/live/indicator.gif" width="16" height="16" border="0" style="position: absolute; top: 117px; left: 142px;" />');
	el.id = 'adCompanionBanner';
	//el.style.visibility = "hidden";
}

loadAcudeoCompanions = function() {
	locateAdModules().each( function( el, i ) {
		if ( $(el.id) && Number(el.width) == 300 ) {
			buildAcudeoDiv($(el.id));
		}
	});
}


 // ###################################################################### //
// Adsense companion ads

buildAdSenseDiv = function(el, publisherId) {
	var adSlot1 = googletag.defineUnit(
		publisherId,
		[300, 250],
		el.id
	);
  	adSlot1.set("backfill", "true");

	// Attach the slot to the companion ads service.
	adSlot1.addService(googletag.companionAds())
	// Attach to the publisher ads service in order to preload the ads.
	adSlot1.addService(googletag.pubads());
	// Enable the ads services.
	googletag.enableServices();
	
	googletag.display(el.id);
}

loadAdsenseCompanions = function(publisherId) {
	locateAdModules().each( function( el, i ) {
		if ( $(el.id) && Number(el.width) == 300 ) {
			buildAdSenseDiv($(el.id), publisherId);
			throw $break;
		}
	});
}

// ###################################################################### //
// DART companion ads
		
buildDartAdFrame = function(el, companionURL) {
	el.style.width = "300px";
	el.style.height = "250px";
	if ( $('magnify_player_continuous_ad') ) {
		$('magnify_player_continuous_ad').style.height = "262px";	
	}
	el.innerHTML = '<iframe name="' + el.id + '_frame" id="dartAdFrame" src="' + companionURL + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" allowtransparency="true" width="300" height="250"></iframe>';
}

syncRoadBlock = function(adTag, companionAds) {	
	if ( companionAds.length > 0 ) {
		locateAdModules().each( function( el, i ) {
			if ( $(el.id) ) {
				if ( $(el.id) && Number(el.width) == 300 ) {
					ova.writeHTML(el.id, companionAds[0].content);
					throw $break;
				}
			}
		});
	}
}

// ###################################################################### //
// OVA companion ad helper

/**
 * Advanced companion & overlay processing scripts - supports insertion of javascript based
 * companion ad types.
 *
 * These methods rely on the prior inclusion of JQuery into the page.
 *
 *     Version: 1.0.0
 *     Dated: March 15, 2001
 *     Author: Paul Schulz
 *
 */

var ova = new function() {
  // Lower level content insertion and div manipulation functions

  var debugging = true;
  var previousNonLinearContent = new Array();

  // PUBLIC API

  this.readHTML = function(elementID) {
    return jQuery('#' + elementID).html();
  }

  this.writeHTML = function(elementID, src) {
  	console.log("writing companions externally");
    jQuery('#' + elementID).html(src);
  }

  this.writeElement = function(elementID, src) {
  	console.log("writing companions externally");
    jQuery('#' + elementID).writeElement(src);
  }

  /**
   * Display a non-linear ad
   */
  this.displayNonLinearAd = function(ad) {
  	console.log("displaying non-linear ad");
	  _debug(ad);
      if(ad != null) {
          if(ad.region != null) {
          		if(ad.content.type != null) {
			          var elementID = _verifyRegionID(ad.region.region[ad.content.type.toLowerCase()]);
			          if(elementID != null) {
				          previousNonLinearContent[elementID] = this.readHTML(elementID);
					      if(ad.content.type == 'IMAGE' || ad.content.type == 'TEXT' || ad.content.type == 'HTML') {
					          _debug("Displaying a non-linear ad of type " + ad.content.type + " in a DIV region with ID '" + elementID + "'");
                              this.writeHTML(elementID, "<div id='ova-click-" + ad.nonLinearVideoAd.uid + "'>" + ad.content.formed + "</div>");
					          if(ad.clickThroughURL != null) {
					              jQuery('#ova-click-' + ad.nonLinearVideoAd.uid).click(
					              	  function() {
					              	     _processClickThrough(ad.clickThroughURL, ad.content.trackingEvents);
					              	  }
					              );
					          }
					          _fireImpressions(ad.impressions);
							  if(ad.region.overlay) _showOverlayContent(elementID, ad);
					      }
					      else if(ad.content.type == 'SWF' || ad.content.type == 'IFRAME' || ad.content.type == 'SCRIPT') {
					          _debug("Displaying a non-linear ad of type " + ad.content.type + " in a DIV region with ID '" + elementID + "'");
					          this.writeElement(elementID, ad.content.formed);
					          _fireImpressions(ad.impressions);
							  if(ad.region.overlay) _showOverlayContent(elementID, ad);
					      }
					      else if(ad.content.type == 'VPAID') {
					          _debug("Cannot play non-linear VPAID ads via HTML5 - ignoring");
					      }
					      else _debug("Display non-linear ad - unknown content type '" + ad.content.type + "'");
			          }
			          else _debug("Cannot display the non-linear ad via HTML5 - the region (DIV) ID is null");
          		}
          }
          else _debug("Cannot display non-linear ad via HTML5 - no region provided with the ad object");
      }
      else _debug("Cannot display non-linear ad via HTML5 - no ad object provided");
  }

  /**
   *  Hide a non-linear ad
   */
  this.hideNonLinearAd = function(ad) {
      _debug(ad);
      if(ad != null) {
          if(ad.region != null) {
          	  if(ad.content.type != null) {
		          var elementID = _verifyRegionID(ad.region.region[ad.content.type.toLowerCase()]);
		          if(elementID != null) {
					  if(ad.region.overlay) {
					  	  _debug("Non-linear ad is an overlay - setting region '" + elementID + "' visibility to false");
					  	  _hideElement(elementID);
					  	  if(ad.closeButton != null) {
					  	      if(ad.closeButton.enabled) {
 					  	          _hideElement(ad.closeButton.region);
					  	      }
					  	  }
					  }
					  else {
					  	  _debug("Non-linear ad is a non-overlay - restoring the original contents of region '" + elementID + "'");
					  	  if(previousNonLinearContent[elementID] != null) {
					  	      this.writeHTML(elementID, previousNonLinearContent[elementID]);
					  	      previousNonLinearContent[elementID] = null;
					  	  }
					  }
				  }
				  else _debug("Cannot hide the non-linear ad - no element ID found to identify the region");
			  }
			  else _debug("Cannot hide the non-linear ad - no content type specified to identify the region");
		  }
		  else _debug("Cannot hide the non-linear ad - no region declared for the ad");
	  }
  }

  //=== PRIVATE METHODS

  function _debug(content) {
     try {
     	if(debugging) {
     	    if(typeof(content) == "string") {
     	       console.log(new Date() + " OVA-JS: " + content);
     	    }
 	        else console.log(content);
 	    }
     }
     catch(error) {
     }
  }

  function _showElement(elementID) {
  	jQuery('#' + elementID).css("visibility", "visible");
  }

  function _hideElement(elementID) {
  	jQuery('#' + elementID).css("visibility", "hidden");
  }

  function _showOverlayContent(elementID, ad) {
	 _showElement(elementID);
     if(ad.closeButton != null) {
        if(ad.closeButton.enabled) {
            if(ad.closeButton.program) {
                jQuery("#" + ad.closeButton.region).click(
                    function() {
                    	_hideElement(ad.closeButton.region);
                      	_hideElement(elementID);
                        _fireTrackingEvents(["close"], ad.trackingEvents);
                    }
                );
            }
            _showElement(ad.closeButton.region);
        }
     }
  }

  /**
   * Fire impressions
   */
  function _fireImpressions(impressions) {
  	// not implemented at present - impressions are fired by SWF before calling Javascript
  }

  /**
   * Fire tracking events
   */
  function _fireTrackingEvents(names, events) {
	if(names != null && events != null) {
		if(names.length > 0 && events.length > 0) {
		   for(name in names) {
		      for(event in events) {
		         if(events[event].type == names[name]) {
		         	if(events[event].urls != null && (events[event].urls instanceof Array)) {
		                for(url in events[event].urls) {
		                   _debug("Tracking '" + events[event].type + "' to " + events[event].urls[url]);
							jQuery.get(events[event].urls[url]);
		                }
		         	}
		         }
		      }
		   }
		}
	}
  }

  /**
   * Process a click through
   */
  function _processClickThrough(clickThroughURL, events) {
	if(clickThroughURL != null) {
		window.open(clickThroughURL, "_blank");
		fireTrackingEvents(["acceptInvitation"], events);
	}
  }

  /**
   * Checks that the region name is not an "auto:" based ID - if so, strip out the "auto:" - the "auto" sizing
   * option is currently unsupported in HTML5 mode
   */
  function _verifyRegionID(regionID) {
  	if(regionID != null) {
  	   if(regionID.indexOf("auto:") > -1) {
			return regionID.replace("auto:", "");
  	   }
  	   return regionID;
  	}
  	return "bottom";
  }
}

//======================================================================================================================

jQuery.fn.writeElement = function(src) {
  // Store jQuery(this) in a variable otherwise it will be out of scope in document.write
  var element = jQuery(this);
  var tmpDocWrite = document.write;
  var tmpDocWriteln = document.writeln;
  document.write = function(arg){ jQuery(element).append(arg); };
  document.writeln = function(arg){ jQuery(element).append(arg) + '\n'; };

  // Function to retrieve a new advert from the server.
  jQuery(element).html(jQuery(src));
};



// ###################################################################### //
// Magnify default companion fill
controlDefaultOverlay = function() {
	try {
		hideAd();
	} catch(e) {}
}

buildDefaultIframe = function(el, cid, companion, prerollDisabled) {
	if ( typeof( companion ) === "undefined" ) {
		companion = {};
		companion.width = 300;
		companion.height = 250;
		companion.id = "magnify_widget_rect";
		companion.location = "magnify_widget_rect_frame"; 
	}
	if ( typeof( prerollDisabled ) === "undefined" ) {
		prerollDisabled = false;
	}
	
	el.style.width = companion.width + "px";
	el.style.height = companion.height + "px";
	if ( $('magnify_player_continuous_ad') ) {
		$('magnify_player_continuous_ad').style.height = "262px";	
	}
	
	if ( typeof( el.id ) == 'undefined') {
		el.id = companion.id + '_content';
	}
	el.innerHTML = '<iframe src="/embed/player/modules/ad.mason?content_item_cid=' + cid + '&autoplay=1&loc=' + companion.location + '&preroll_disabled=' + (prerollDisabled ? 1 : 0) + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" allowtransparency="true" width="' + companion.width + '" height="' + companion.height + '"></iframe>';
	setTimeout(controlDefaultOverlay, 7000);
}

loadDefaultCompanion = function(cid, prerollDisabled) {
	locateAdModules().each( function( el, i ) {
		console.log("calling load default companion");
		if ( $(el.id) ) {
			buildDefaultIframe($(el.id), cid, el, prerollDisabled);
			//throw $break;
		}
	});
}

loadDefaultCompanions = function(cid, emptyCompanions) {
	emptyCompanions.keys().each( function( id, i ) {
		if ( $(id) ) {
			console.log("calling load default companion for ad " + id);
			buildDefaultIframe($(id), cid, emptyCompanions.get(id), true );
			//throw $break;
		}
	});
}


// ###################################################################### //
// javascript player helpers

var jsHelper = new function() {	
	this.writePlayer = function(id, src) {
		var companionElem = document.getElementById(id);
		var script = document.createElement('script');
		script.src = src;
		companionElem.insert({'after': script});
		var tmpDocWrite = document.write;
		var tmpDocWriteln = document.writeln;
		document.write = function(arg) { document.getElementById(id).innerHTML = arg; };
		document.writeln = function(arg) { document.getElementById(id).innerHTML = arg + '\n'; };
	}
}

// ###################################################################### //

setCookie = function(name, value, expiration) {
	var expirationDate = new Date();
	expirationDate.setTime(expirationDate.getTime() + expiration);
	document.cookie = name + "=" + escape(value) + ( (expiration == null) ? "" : ";path=/;expires=" + expirationDate.toGMTString() );
}
	
getCookie = function(name) {
	if ( document.cookie.length > 0 ) {
		c_start = document.cookie.indexOf(name + "=");
		if ( c_start != -1 )  { 
			c_start = c_start + name.length + 1; 
			c_end = document.cookie.indexOf(";", c_start);
			
			if ( c_end == -1 ) 
				c_end = document.cookie.length;
				
			return unescape( document.cookie.substring(c_start, c_end) );
		} 
	}
	return;
}


// ###################################################################### //

function set_one_different( parent_id, tag_name, active_id, active_class, inactive_class ) {
  var tablist = $( parent_id ).getElementsByTagName( tag_name );
  var nodes = $A( tablist );

  nodes.each( function(node) {
	  node.className = ( node.id == active_id ) ? active_class : inactive_class;
   } );
}

// ###################################################################### //

function tab_activate( tab_id, pane_id ) {
  tabselect( $( tab_id ) ); 
  paneselect( $( pane_id ) );
}

function tabselect(tab) {
  set_one_different( 'tabcontrol1', 'li', tab.id, 'tab-selected', 'tab-unselected' ) 
}

function paneselect(pane) {
  set_one_different( 'panecontrol1', 'li', pane.id, 'pane-selected', 'pane-unselected' ) 
}

// ###################################################################### //

function help_show_tip ( q_el, a_el ) {
	// q_el.src = '/decor/live/help_dark_info.gif';
	var q_pos = Position.cumulativeOffset( q_el );
	var answer_div = $( a_el );
	answer_div.style.left = q_pos[0] - 346 + "px";
	answer_div.style.top = q_pos[1] + 15 + "px";
	answer_div.visualEffect('Appear', { duration: 0.25, queue: 'end' } );
}

function help_hide_tip ( q_el, a_el ) {
	var answer_div = $( a_el );
	answer_div.visualEffect('Fade', { 
		duration: 0.25, queue: 'end'
	} );
	
	// afterFinish: function () { q_el.src = '/decor/live/help_gray_info.gif'; } 
	
}

// ###################################################################### //

var mvp_popup_menu_is_open;

var mvp_moved_popup = [];

function mvp_popup_menu_hide_open () {
	if ( mvp_popup_menu_is_open ) {
		mvp_popup_menu_hideshow( mvp_popup_menu_is_open, 0 );
	}
}

function mvp_popup_menu_hideshow ( menu_id, visible ) {
	var menu_div = $('mvp_popup_menu_area_' + menu_id );
	if ( visible == '-' ) {
		visible = ! menu_div.hasClassName( 'mvp_active' );
	}
	if ( visible ) {
		mvp_popup_menu_hide_open();

		if ( ! mvp_moved_popup[ menu_id ] ) {
			mvp_moved_popup[ menu_id ] = 1;
			document.body.appendChild( menu_div );
			Position.absolutize( menu_div ); 
		}
		var menu_btn = $('mvp_popup_menu_buttton_' + menu_id );
		Position.clone( menu_btn, menu_div, { setWidth: false, setHeight: false, offsetLeft: 10 } ); 
		menu_div.style.width = '140px';
		menu_div.style.height = 'auto';
		
		menu_div.addClassName( 'mvp_active' );
		mvp_popup_menu_is_open = menu_id;
	} else {
		menu_div.removeClassName( 'mvp_active' );
		mvp_popup_menu_is_open = 0;
	}
}

function mvp_popup_menu_add_playlist ( el, cid, title ) {
	if ( el.innerHTML.substring(0, 9) == 'Added to ' ) { 
		window.location.assign( '/account/playlist/view/' + cid );
	} else { 
		new Ajax.Request( el.href, { 
			onSuccess: function (t) { el.innerHTML = 'Added to ' + title }, 
			onFailure: function (t) { el.innerHTML = 'Could not be added' } 
		} ); 
		new Effect.Highlight(el, { 
			duration: 0.5, 
			afterFinish: function() { 
				mvp_popup_menu_hide_open();
			} 
		} ) ; 
		
	} 
}
