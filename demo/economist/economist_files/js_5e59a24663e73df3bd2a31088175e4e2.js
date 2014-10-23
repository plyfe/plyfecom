/* global brightcove, Econ */

(function (brightcove) {
  "use strict";

  // Determines if brightcove videos are rendered via flash or html5.
  // Flash players don't require api calls to resize the player.
  Econ.bcIsFlashPlayer = function() {
    return typeof brightcove !== 'undefined' &&
           typeof brightcove.internal !== 'undefined' &&
           typeof brightcove.internal._instances !== 'undefined' &&
           Econ.isEmptyObject(brightcove.internal._instances);
  };

})(brightcove);
;
/* global Drupal, jQuery */

(function (Drupal, $) {
  "use strict";

  var ecCookieMessageName;

  Drupal.cookieMessage = Drupal.cookieMessage || {};

  /**
   * Function to show cookie message based on user's region.
   */
  Drupal.cookieMessage.show = function() {
    // Make sure we have a cookie message to show.
    if (typeof Drupal.settings.ecCookieMessage === "undefined") {
      return;
    }
    // Set the cookie to say its been seen.
    ecCookieMessageName = Drupal.settings.ecCookieMessage.cid + Drupal.settings.ecCookieMessage.version;

    // Expires in 10 years: 10 * 365
    $.cookie(ecCookieMessageName, "1", {path:'/', expires:3650});
  };

  /**
   * Set the messages based on the javascript user's region.
   */
  Drupal.behaviors.cookieMessageDisplay = function(context) {
    if (context !== document) {
      return;
    }

    Drupal.cookieMessage.show();
  };

  Drupal.behaviors.ecCookieMessaging = function(context) {
    // Sets a persistent cookie for current user.
    $('.ec-cookie-message a.dismiss-messages', context).click(function(e) {
      e.preventDefault();
      var link = $(this).attr('href');
      $.ajax({
        url: link
      });
      $('#ec-cookie-messages-container').fadeOut(600, function() {
        $(this).remove();
      });
    });
  };
})(Drupal, jQuery);

;
/* global jQuery, Econ */

(function (Econ, $) {
  "use strict";

  Drupal.messages = Drupal.messages || {};

  /**
   * Function to show message based on user's region.
   */
  Drupal.messages.show = function(region) {
    var region_selector = 'message-region-' + region;
    var class_region_selector = '.' + region_selector;
    // Loop over messages present, to see if they are currently hidden and should be shown.
    $('div.ec-messages').each(function(index) {
      if ($(this).is(class_region_selector)) {
        $(this).removeClass(region_selector).addClass('ec-messages-processed');
      }
    });
  };

  /**
   * Set the messages based on the javascript user's region.
   */
  Drupal.behaviors.messagesDisplay = function(context) {
    if (context !== document) {
      return;
    }

    var region = '';

    if (!Econ.user.loaded) {
      $(Econ.user).bind('load', function() {
        // Default to NA if we can't geodetect the user's region.
        region = Econ.user.user.country.region !== false ? Econ.user.user.country.region : 'NA';
        Drupal.messages.show(region);
      });
    }
    else {
      region = Econ.user.user.country.region;
      Drupal.messages.show(region);
    }
  };

  Drupal.behaviors.ec_messaging = function(context) {
    // Sets a persistent cookie for current user.
    $('.ec-messages a.dismiss-messages', context).click(function() {
      var link = $(this).attr('href');
      $.ajax({
        url: link
      });
    });
  };
})(Econ, jQuery);

;
Drupal.behaviors.socialPlugins = function(context) {
  if (context == document) {
    $.each(['//apis.google.com/js/plusone.js', '//platform.linkedin.com/in.js'], function(index, value) {
      // createElement is faster than jQuery equivalent.
      var scr = document.createElement('script');
      scr.type = 'text/javascript';
      scr.async = true;
      scr.src = value;
      var g = $('script')[0];
      $(scr).insertBefore(g.parentNode);
    });
  }
};

// We can't use the above for twitter because we need to store a special reference
// to the twttr object for later use.
window.twttr = (function (d, s, id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src="//platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
  
  return window.twttr || (t = {
    _e: [],
    ready: function(f){
      t._e.push(f);
    }
  });
}(document, "script", "twitter-wjs"));

Drupal.behaviors.redditLink = function(context) {
  $('.share-inline-footer-reddit a', context).attr('href', 'javascript:;');
};

Drupal.behaviors.blink = function(context) {
  if (context == document) {
    // creates the SUB2 script include Asynchronously 
    var _sub2_JSCODE = document.createElement('script');
    _sub2_JSCODE.type = 'text/javascript';
    _sub2_JSCODE.async = true;
    _sub2_JSCODE.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'webservices.sub2tech.com/economist/sub2.js';

    var blink_script_tag = document.getElementsByTagName('script')[0];
    blink_script_tag.parentNode.insertBefore(_sub2_JSCODE,blink_script_tag);
    function _SUB2_Code() {
      S2Tech_2Prompt();
    }

    if( _sub2_JSCODE.readyState ) {
      _sub2_JSCODE.onreadystatechange = function() {
        if ( _sub2_JSCODE.readyState == 'complete' || _sub2_JSCODE.readyState == 'loaded' ) {
          try {
            _SUB2_Code(); 
          }
          catch (e) {}
        }
      };
    }
    else {
      _sub2_JSCODE.onload = function() {
        try {
          _SUB2_Code();
        }
        catch (e) {}
      };
    }
  }
};
;
// We use a function to redirect the current page to the offline page. We need
// to do this because some browsers use their internal cache that gets priorty
// on the FALLBACK declaration in the manifest file.
var ecoRedirectClient = function(){
  // This function is used to replace the unreliable navigator.onLine.
  // This will return false if the server doesn't respond.
  // See http://www.louisremi.com/2011/04/22/navigator-online-alternative-serverreachable/
  // the following function has been grabbed from the abve blog post.
  var serverReachable = function () {

    // IE vs. standard XHR creation
    var x = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" ), s;
    x.open(
      // Requesting the headers is faster, and just enough.
      "HEAD",
      // Append a random string to the current hostname,
      // to make sure we're not hitting the cache.
      "//" + window.location.hostname + "/ServerReachable.html?rand=" + Math.random(),
      // Make a synchronous request.
      false
    );
    try {
      x.send();
      s = x.status;
      // Make sure the server is reachable.
      return ( s >= 200 && s < 300 || s === 304 );
    // Catch network & other problems.
    }
    catch (e) {
      return false;
    }
  }

  return serverReachable();
};
;
if (window['Modernizr'] != undefined && Modernizr.localstorage && window.applicationCache != undefined) {
  // We need to prevent FF to cache the offline page. We use this very bad looking
  // test. We do two requests to be sure that the server is not reachable.
  if (localStorage.getItem("offlineEnabled")) {
    if (ecoRedirectClient() === false) {
      if (ecoRedirectClient() === false) {
        window.location="/offline?rand=" + Math.random();
      }
    }
  }
  
  // This function is used to add/update users' local storage with new articles.
  Drupal.behaviors.offlineContent = function(context) {
    var jsonList, offlineState, now, lastUpdate, nextCheck, url, state, message;
    var offlineEnabled = localStorage.getItem("offlineEnabled");
    var offlineBtn = $("#offline-btn", context);
    var disabledCopy = "Disable offline reading";
    var activeCopy = 'Activate offline reading';
    var menuElm = $('#masthead-offline a', context);
    var spanElm = function(state) {return '<span class="' + state + '">' + state + '</span>'};
    var iframe = '<iframe src="/sites/all/modules/ec_offline/offline/connection-state.html" scrolling="no" frameborder="0" style="display:none"></iframe>';
    var messageBox = function(message) {return '<div class="offline-msg"><span></span><div class="close">Close</div><p>' + message + '</p></div>'};
    var confirmMsg = 'Congratulations! You can now read The Economist blogs when you are offline. Simply go to www.economist.com/offline or bookmark this page.';
    var errorMsg = 'There\'s been an issue with your activation please check our <a href="/help/offline">offline help pages</a> for a solution';
    // Display the correct state in the masthead.
    if (offlineEnabled) {
      offlineBtn
      .addClass("ec-button disable-offline")
      .text(disabledCopy);
      appendIframe();
      $('#masthead-offline:not(".activated")', context).addClass('activated');
    }
    else {
      offlineBtn
      .addClass("ec-button enable-offline")
      .text(activeCopy);
      menuElm.append(spanElm('off'));
    }
    // Click events to toggle the active/disabled state for the buttons on the
    // /offline page.
    $('.enable-offline').live('click', function(){
      localStorage.setItem("offlineEnabled", true);
      localStorage.setItem("justActive", true);
      $(this).addClass('disable-offline').removeClass("enable-offline").text(disabledCopy);
      $('.off', menuElm).remove();
      menuElm.addClass('activated-now');
      appendIframe();
    });
    $('.disable-offline').live('click', function(){
      $(this).addClass('enable-offline').removeClass("disable-offline").text(activeCopy);
      $('#masthead-offline', context).addClass('activated');
      showOfflineState('off');
      $('.offline-msg').remove();
    });

    // Retrieve the json object and append the iFrame that holds the manifest.
    // The reason we are using an iFrame is to avoid the appcache to cache the
    // current page. Also once the appcache has been cached it requires the reload
    // of the page in order to trigger the updated state.
    function appendIframe() {
      now = Drupal.settings.offline.now;
      lastUpdate = localStorage.getItem("offlineLastUpdate") || 0;
      nextCheck = parseInt(lastUpdate, 10) + (3*60*60);
      url =  "/off-line/blog_posts";
      // We want to be sure that the user has offline mode enabled and that
      // 3 hours have passed since last time an update was performed.
      if (now > nextCheck) {
        $.getJSON(url,function(json) {
          jsonList = json.nodes;
          localStorage.setItem("offlineArticles", JSON.stringify(jsonList));
          localStorage.setItem("offlineLastUpdate", now);
        });
      }
      if (!$('#offline-frame').length) {
        $('body').append(iframe);
      }
    }
    // This renders the offline link in the masthead.
    function showOfflineState(state) {
      if ($('span', menuElm).length) {
        $('span', menuElm).replaceWith(spanElm(state));
      }
      else {
        menuElm.append(spanElm(state));
      }
      if (state == 'off') {
        localStorage.removeItem("offlineEnabled");
        offlineBtn.addClass('enable-offline').removeClass("disable-offline").text(activeCopy);
      }
      // Display a confirm box message when the user activates the offline feature.
      if ($('a.activated-now').length){
        message = (state == 'on') ? confirmMsg : errorMsg;
        if (!$('.offline-msg').length) {
          $('#masthead-offline').append(messageBox(message));
        }
        $('div.close').click(function(){$('.offline-msg').remove();});
        menuElm.removeClass('activated-now');
      }
    }

    // Let's retrieve the status of the appcache state. We use the postMessage
    // method to pass the state value from the frame to the parent.
    function receiveMessage(event) {
      // This is needed to prevent the listener to accept messages coming outside
      // our domain.
      if (event.origin !== 'http://' + window.location.hostname) {
        return;
      }
      offlineState = event.data;
      showOfflineState(offlineState);
    }
    // This listener awaits for the state message coming from the iFrame.
    window.addEventListener("message", receiveMessage, false);
  };
}
else {
  $('ul',  $('#ec-offline-online .right-column')).after('<p class="no-support">Sorry. Your browser does not support the offline feature.</p>')
}
;
Drupal.settings.omniture = Drupal.settings.omniture || {};

var availableOmnitureVarsForDebug;

Drupal.behaviors.omniture = function(context) {
  var $context = $(context);
  // This section handles click tracking of forms, e.g. Post a comment.
  // Below is the format that it expects.
  // Drupal.settings.omniture.click_tracking[] = { selector: selector, event: event, name: name, ... }
  var trackingCode = Drupal.settings.omniture.click_tracking;

  if (trackingCode) {

    $.each(trackingCode, function(k, v) {

      // Append an onclick function to the button if form_id exists in the DOM.
      var ltData = this;
      var selector = ltData.selector;
      // Verify if we are using tracking via css selector or we are using the
      // HTML data- attribute instead.
      selector = (selector == "data-ec-omniture") ? selector = "[data-ec-omniture='" + this.name + "']" : selector;
      selector = selector + ':not(.omniture-tagged)';
      // Check if there is any tagged element on the page.
      if (availableOmnitureVarsForDebug != true && $(selector).length) {
        availableOmnitureVarsForDebug = true;
      };

      if (Drupal.settings.omniture.debug == true) {
        // Enable the inline tracking debug.
        Drupal.omniture.debugVars(selector, ltData.name, trackingCode[k]);
      }
      // Add a class to any tagged element and bind the event.
      $context.find(selector).bind(ltData.event, function(e) {
        // Append tracking code to elements.
        Drupal.omniture.trackClick(this, ltData.name, trackingCode[k]);
      }).addClass('omniture-tagged omniture-tagged-' + k);
      
    });
  }
};

// Enable the omniture button for debugging/trace tracking code on page's elmts.
Drupal.behaviors.enableDebug = function(context) {
  if (Drupal.settings.omniture.debug == true && availableOmnitureVarsForDebug == true) {
    if (!$('.omiture-elements').length) {
      $('#page').prepend('<div class="omiture-elements">Omniture elements</div>');
    }
    $('.omiture-elements', context).click(function() {
      var activeText = $('.omiture-elements').text();
      $('.omiture-elements').toggleClass('omniture-elements-on').text(activeText == "Omniture elements" ? "Omniture elements on" : "Omniture elements");
      $('.omniture-tagged').toggleClass('omniture-tagged-on');
    });
  }
}

// This function sends the link_name to both the Custom Link Tracking and
// to the Omniture var associated with the form.
Drupal.omniture = {};
Drupal.omniture.trackClick = function(obj, name, options) {
  if (typeof s_gi == "function") {
    var options = options || {};
    var edge_server = options.edge_server || Drupal.settings.omniture.edge_server;
    var s = s_gi(edge_server);
    var element = obj ? obj : true;

    s.linkTrackVars = [];
    if (options.link_track_vars) {
      s.linkTrackVars = options.link_track_vars.split(',');
    }
    
    if (options.events) {
      s.linkTrackEvents = options.events;
      s.events = options.events;
      if ($.inArray('events', s.linkTrackEvents) != -1) {
        s.linkTrackVars.push('events');
      }
    }
    else {
      s.linkTrackEvents = 'None';
    }

    for (var p in options) {
      if (p.indexOf('prop') == 0 || p.indexOf('eVar') == 0) {
        s[p] = options[p];
        if ($.inArray(p, s.linkTrackEvents) != -1) {
          s.linkTrackVars.push(p);
        }
      }
    }

    s.linkTrackVars =  s.linkTrackVars.join(',');
    s.link_track_vars = name; // Why is this here?

    s.tl(options.skipDelay ? true : element, 'o', name);
  }
};

// This function is used to display omniture variables attached to elements to
// facilitate the debugging and maintainance process.
Drupal.omniture.debugVars = function(selector, name, omniVars) {
  // Add the debugging functionality.
  $(selector).mouseover(function() {
    var elm = $(this);
    var top = elm.offset().top;
    var height = (elm.height() == 0) ? 20 : elm.height();
    var left = elm.offset().left;
    if (elm.hasClass('omniture-tagged-on')) {
      if (!$('.omniture-wrapper').length) {
        var omniList = "<ul class='omniture-display'>";
        for (var vars in omniVars) {
          omniList += "<li>" + vars + "= " + omniVars[vars] + "</li>";
        }
        omniList += "</ul>";
        $('body').append(omniList);
        $('.omniture-display').css({'top': + (top + height), 'left': + left});
      }
    }
  }).mouseout(function(){$('.omniture-display').remove()});
};


Drupal.behaviors.socialButtons = function(context) {
  if (context != document) {
    return;
  }

  // Add the callback function for when the user clicks on the twttr btn.
  if (typeof twttr != "undefined") {
    twttr.ready(function(twttr) {
      twttr.events.bind('click', function(intent_event) {
        clickEventToAnalytics(intent_event, 'twitter');
      });
    });
  }
  
  // Initiate the Facebook like button, then provide a callback function when the
  // user clicks it.
  if (typeof FB != "undefined") {
    FB.Event.subscribe('edge.create', function(href, widget) {
      // We use the wrapping div/element as we don't put the data-ec-omniture-frame on the
      // fb-like link.
      clickEventToAnalytics(widget, 'facebook');
    });
  }
  
  // Provide the debug functionality for the social buttons.
  $("[data-ec-omniture-frame]").each(function(){
    availableOmnitureVarsForDebug = true;
    var $this = $(this);
    var thisElm = $this.attr('data-ec-omniture-frame');
    $this.addClass('omniture-tagged');
    var trackingCode = Drupal.settings.omniture['click_tracking_' + thisElm];
    if (trackingCode) {
      Drupal.omniture.debugVars($this, trackingCode.name, trackingCode[0]);
    }
  });
}


// This functions takes care of tracking clicks coming from Twitter and Facebook
// buttons via callback functions.
function clickEventToAnalytics(settings, network) {
  var trackingCode;
  
  if (network == 'twitter') {
    if (settings.target.tagName.toLowerCase() == 'a') {
      return false;
    }
    
    var elmToTrack = settings.target;
    elmToTrack = elmToTrack.parentNode.attributes['data-ec-omniture-frame'];
    if (elmToTrack) {
      trackingCode = Drupal.settings.omniture['click_tracking_' + elmToTrack.value][0];
    }
  }
  else if (network == 'facebook') {
    elmToTrack = settings.parentNode.attributes['data-ec-omniture-frame'];
    if (elmToTrack) {
      trackingCode = Drupal.settings.omniture['click_tracking_' + elmToTrack.value][0];
    }
  }
  else if (network == 'plusone') {
    if (settings.state == 'off') {
      return false
    };
    trackingCode = Drupal.settings.omniture['click_tracking_footer_plusone'][0];
  }
  
  if (trackingCode) {
    Drupal.omniture.trackClick(true, trackingCode.name, trackingCode);
  }
}

function clickEventToAnalyticsPlusOne(s) {
  clickEventToAnalytics(s, 'plusone');
}
;
if ($('#rolling_eco').length) {
  var banner = new js_rolling('rolling_eco');
  banner.set_direction(4);
  banner.move_gap = 10;
  banner.time_dealy = 3;
  banner.time_dealy_pause = 5000;
  banner.start();
}

;
/* global jQuery */

(function ($) {
  $(".timestamp").ec_timeago({prefix: " | "});
})(jQuery);
;
