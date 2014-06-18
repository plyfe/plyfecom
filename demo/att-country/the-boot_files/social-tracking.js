// added wolstat 2-12-13
var _gaq = _gaq || [];
jQuery(document).ready(function( $ ) {
    jQuery(document).on('click', '.social_icons a', function( e ){
        var network = "",
            socialAction = "",
            targetUrl = document.location.url;
        if ( $(e.target).hasClass( 'print' ) ) {
            network = "print"; socialAction = "Print Share";
        } else if ( $(e.target).hasClass( 'email' ) ) {
            network = "email"; socialAction = "Email Share";
        } else if ( $(e.target).is( '.facebook, .facebook .social_icon_large, .facebook .social_icon' ) ) {
            if ($(this).parents().hasClass('social-group-top')) {
                network = "facebook_top"; socialAction = "FB Share";
            }
            else {
                network = "facebook"; socialAction = "FB Share";
            }
        } else if ( $(e.target).is( '.twitter, .twitter .social_icon_large, .twitter .social_icon' ) ) {
            if ($(this).parents().hasClass('social-group-top')) {
                network = "twitter_top"; socialAction = "Tweet";
            }
            else {
                network = "twitter"; socialAction = "Tweet";
            }
        } else if ( $(e.target).hasClass( 'pinterest' ) ) {
            network = "pinterest"; socialAction = "Pin It";
        } else if ( $(e.target).hasClass( 'reddit' ) ) {
            network = "reddit"; socialAction = "Reddit This";
        } else if ( $(e.target).hasClass( 'tumblr' ) ) {
			network = "tumblr"; socialAction = "Share on Tumblr";
		}
        if ( network !== "" ) {
            __log ( $(e.target).attr( 'class' ) + " : " +network );
            _gaq.push( [ '_trackSocial', network, socialAction, targetUrl ] );
        }
    });

    try {
        if (FB && FB.Event && FB.Event.subscribe) {
            FB.Event.subscribe('edge.create', function(targetUrl) {
                _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
                __log ( 'fb like' );
            });

            FB.Event.subscribe('edge.remove', function(targetUrl) {
                _gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
                __log ( 'fb unlike' );
            });

            FB.Event.subscribe('message.send', function(targetUrl) {
                _gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
                __log ( 'fb unlike' );
            });
        }
    } catch(e) {}

});


jQuery(document).ready(function(){
    function trackTwitter(intent_event) {
        if (intent_event) {
            var opt_pagePath;
            if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
                opt_target = extractParamFromUri(intent_event.target.src, 'url');
            }
            _gaq.push(['_trackSocial', 'twitter', 'tweet', opt_pagePath]);
            __log( 'track twitter');
        }
    }

//Wrap event bindings - Wait for async js to load
    if (typeof(twttr) != 'undefined' && typeof(twttr.ready) != 'undefined') {
        twttr.ready(function (twttr) {
            //event bindings
            twttr.events.bind('tweet', trackTwitter);
        });
    }

    function extractParamFromUri(uri, paramName) {
        if (!uri) {
            return;
        }
        var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
        var params = regex.exec(uri);
        if (params != null) {
            return unescape(params[1]);
        }
        return;
    }

});

function __log ( message ) {
    if ( window.location.search.match(/__log=true/g) !== null )
        console.log( message );
}
