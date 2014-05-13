var MagnifyStats = { 
	trackedMetaData: { 
		cs: 'site', 
		r: 'referrer', 
		v: 'viewer', 
		c: 'content', 
		ad: 'adCampaign',
		sp: 'servicePlan',
		pp: 'proPackage',
		p: 'pipeline'
	},

	setCookie: function(name, value, expiration) {
		var expirationDate = new Date();
		expirationDate.setTime(expirationDate.getTime() + expiration);
		document.cookie = name + "=" + escape(value) + ( (expiration == null) ? "" : ";path=/;expires=" + expirationDate.toGMTString() );
	},
	
	getCookie: function(name) {
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
	},
	
	deleteCookie: function(name) {
		this.setCookie(name, "", -1);
	},
	
	getSession: function() {
		try {
			var sessionId = this.getCookie('mvp_session');
			if ( sessionId ) {
				return sessionId
			}
		} catch(e) { }
	},

	gatherStats: function(config) {		
		var unprocessedStats = this.getCookie('video_stats');
		if ( unprocessedStats ) {
			var stats = new MagnifyStats.Base(config);
			stats.baseInitialize( config );
			stats.type = "video";
                        try {
			var unprocessedJson = unprocessedStats.evalJSON();
			var metaDataObj = unprocessedJson.metaData.toQueryParams();
			metaDataObj['statsmethod'] = 'cookie';
			stats.metaData = metaDataObj;
			stats.queryString = unprocessedJson.queryString; 
			stats.createPixel();
			this.deleteCookie('video_stats');
                        } catch (err) {
                        console.log( err + ":  " + unprocessedStats );
			this.deleteCookie('video_stats');
                        }
		}
	}
};

MagnifyStats.Base = Class.create({	
	initialize: function(config) {
		this.baseInitialize(config);
	},
	
	baseInitialize: function(config) {
		this.config = config;
		this.session = MagnifyStats.getSession();
		this.site = this.config.site;
		
		// If this is explicitly set, use it even if config.debug
		if (typeof(window.statsHostname) != 'undefined') {
			this.statsHostname = window.statsHostname;
		// No stats on dev unless statsHostname is configured
		} else if ( this.config.debug ) {
			this.statsHostname = "";
		// Default prod stats;  should never reach this code
		} else {
			this.statsHostname = "http://stats.magnify.net";
		}
		
		this.hasDebugger = false;		
		this.detectIE6();
		
		this.metaData = {};
		this.setMetaData();
	},
		
	setMetaData: function() {		
		var stats = this;
		Object.keys( MagnifyStats.trackedMetaData ).each( function(el, i) {
			var k = MagnifyStats.trackedMetaData[el];
			var v = stats.config[k];
			if ( v ) {
				stats.metaData[el] = v;
			}
		});	
	},
	
	// tracking via pixel
	createPixel: function() {
		try {
			if ( $('mvp_stats_tracker') ) {
				$('mvp_stats_tracker').remove();
			}
			var img = document.createElement('img');
			img.style.width = "1px";
			img.id = "mvp_stats_tracker";
			img.style.height = "1px";
			img.src = this.createImage();
			img.style.position = "absolute";
			img.style.top = "0px";
			this.debug("inserting: " + img.src);
			Element.insert( document.body, { top: img } );
			this.sent = true;
		} catch(e) {
			this.processMessage(e);
		}
	},
	
	//tracking via cookie, read on next request
	createCookie: function() {	
		try {
			var expiry = (365*24*60*60*1000); // 1 year
			MagnifyStats.setCookie("video_stats", "{ \"metaData\": \"" + ( this.metaData && Object.keys( this.metaData ).length ? $H( this.metaData ).toQueryString() : "" ) + "\", \"queryString\": \"" + this.queryString + "\"}", expiry);		
		} catch(e) {
			this.processMessage(e);
		}	
	},
	
	// tracking via Ajax request/response
	createPing: function() {
		try {
			var stats = this;
			var pixelURL = this.createImage();
			new Ajax.Request( pixelURL, { 
				method: 'get',
				asynchronous: false,
				onComplete: function() {
					stats.sent = true;
				}
			});
		} catch(e) {
			this.processMessage(e);
		}
	},
	
	createImage: function() {
		try {
			var img = this.statsHostname + "/decor/track/pixel.gif";
			var qString = this.createQueryString();
			return img + qString;
		} catch(e) {
			this.processMessage(e);
			return '';
		}
	},
	
	createQueryString: function () {
		try {			
			var qString = "?ts=" + this.getTimestamp();
			qString += ( this.type ? "&type=" + this.type : '' );
			qString += "&s=" + this.session;
			qString += ( this.metaData && Object.keys( this.metaData ).length ? "&" + $H( this.metaData ).toQueryString() : '' );
			qString += ( this.queryString ? ";" + this.queryString : '' );
			return qString;
		} catch(e) {
			this.processMessage(e);
			return '';
		}	
	},
	
	// pack stats into a cookie
	packStats: function() {
		return;
	},
	
	// unpack stats from a cookie
	unpackStats: function() {
		return;		
	},
	
	getURL: function(l) {
		try {
			return encodeURIComponent(l);	
		} catch(e) {
			this.processMessage(e);
		}
	},
	
	getTimestamp: function() {
		try {
			var dt = new Date();
			return dt.getTime();
		} catch(e) {
			this.processMessage(e);
		}
	},
	
	send: function() {
		try {
			if ( !this.sent ) {
				if ( !this.ajaxy ) {
					this.queryString += "&statsmethod=ajax";
					try {
						this.createPing();
					} catch(e) {
						this.processMessage(e);
					}
					// if at this point we have not sent
					// drop a last chance cookie
					if ( !this.sent) {
						this.createCookie();
					}
				} else {
					this.queryString += "&statsmethod=dom";
					this.createPixel();	
				}
			}
		} catch(e) {
			this.processMessage(e);
		}
	},
	
	createDebugger: function() {
		try {
			var debugArea = $('mvp_stats_debug');
			if ( this.config.debug ) {
				if ( !debugArea ) {
					debugArea = document.createElement('textarea');
					debugArea.id = "mvp_stats_debug";
					debugArea.style.width = "600px";
					debugArea.style.height = "300px";
					Element.insert( document.body, { top: debugArea } );
				}
				this.hasDebugger = debugArea;	
			}
		} catch(e) {
			return;
		}
	},
	
	detectIE6: function() {
		this.isIE = false;
		this.isIE6 = false;
		var rv = -1; // Return value assumes failure.
		if ( navigator.appName == 'Microsoft Internet Explorer' ) {
			this.isIE = true;
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
			  rv = parseFloat( RegExp.$1 );
			}
		if ( rv == 6 ) {
			this.isIE6 = true;
			this.debug( "I think I'm IE 6, so I can't drop pixels on unload.");
		}
	},
	
	attachTrigger: function() {	
		var stats = this;
		if ( this.isIE ) {
			window.attachEvent( "onbeforeunload", function() { stats.ajaxy = false; stats.packLog(); } );
		} else {
			Event.observe(window, 'unload', this.packLog.bind(this));
		}	
	},

// why does this not work?	
	detachTrigger: function() {	
		var stats = this;
		if ( this.isIE6 ) {
			window.detachEvent( "onbeforeunload", stats.trigger );
		} else {
			Event.stopObserving(window, 'unload', stats.trigger);
		}
	},
	
	processMessage: function(error) {
		try {
			this.debug('ERROR: ' + error.message + ' ' + error.description + ' ' + error.toString());
		} catch(e) {
			return;
		}
	},
	
	debug: function(message) {
		try {
			if ( $('mvp_stats_debug') ) {//this.hasDebugger ) {
				var text = $('mvp_stats_debug').value;
				$('mvp_stats_debug').value = ( message + "\r\r" ) + text;	
			}
		} catch(e) {
			return;
		}
	}
});

var StatsObject;

MagnifyStats.Video = Class.create(MagnifyStats.Base, {
	initialize: function( config ) {
		this.type = "video";
		this.baseInitialize( config );
		this.contentItem = config.contentItem;
		this.duration = config.duration;
		this.eventLog = "";	
		this.ajaxy = false;
		this.attachTrigger();
		this.sent = false;
		this.lastEvent = "";
		this.aborted = false;
		StatsObject = this;
	},
	
	states: {
		s: "playing",
		e: "stopped"
	},
	
	registerTracker: function(tracker) {
		this.tracker = tracker;
	},
	
	registerPlayer: function(player) {
		this.player = player;
	},
	
	startLogging: function(metaData, offset) {
		this.aborted = false;
		this.lastEvent = "";
		var qs = $H( metaData ).toQueryString();
		this.eventLog += (this.eventLog.length ? ';' : '' ) + qs + "&time=s" + offset;
		this.lastEvent = "s" + offset;
		this.debug(this.eventLog);
		this.state = "playing";
	},
	
	log: function(evt, type, offset) {
		if ( this.aborted ) 
			return;
		var thisEvent = evt + offset;
		if ( thisEvent == this.lastEvent ) {
			return;
		}
		this.eventLog += (thisEvent);
		this.lastEvent = thisEvent;
		this.debug("got event: " + this.states[evt]);
		this.debug(type + ":" + this.eventLog);
		this.state = this.states[evt];
	},
	
	abortLogging: function() {
		this.state = "stopped";
		this.aborted = true;
	},
	
	stopLogging: function(offset) {
		if ( this.aborted ) 
			return;
		this.state = "stopped";
		var thisEvent = "e" + offset;
		this.eventLog += thisEvent;	
	},
	
	packLog: function() {
		try {
			if ( this.state == "playing" ) {
				try {
					this.tracker.stopTracking( this.player, "unload", this.tracker.getPlayerOffset() );
				} catch(e) {	
					this.processMessage(e);
				}
			}
			
			this.queryString = this.eventLog;
			if ( this.queryString ) {
				try {
					this.send();
				} catch(e) {
					this.processMessage(e);
				}
			}
		} catch(e) {		
			this.processMessage(e);
		}
	}
});

MagnifyStats.Page = Class.create(MagnifyStats.Base, {
	initialize: function( config ) {
		this.type = "page";
		this.baseInitialize( config );
	}
});

// These classes are for handling legacy stats in cached pages
MagnifyStats.Generic = Class.create(MagnifyStats.Base, {
	initialize: function( config ) {	
		this.baseInitialize( config );
		
		this.pixelLocation = "/decor/track/pixel.gif";
		this.type = config.type || "generic";
		this.setMetaData();
		
		this.pixel_id = "mvp_" + this.type + "_tracker";
	},
	
	trackedMetaData: { 
		cs: 'site', 
		r: 'referrer', 
		v: 'viewer', 
		c: 'content', 
		ad: 'adCampaign',
		sp: 'servicePlan',
		pp: 'proPackage',
		p: 'pipeline'
	},
		
	setMetaData: function() {		
		var stats = this;
		Object.keys( stats.trackedMetaData ).each( function(el, i) {
			var k = stats.trackedMetaData[el];
			var v = stats.config[k];
			if ( v ) {
				stats.metaData[el] = v;
			}
		});	
	},
	
	// tracking via pixel
	createPixel: function() {
		try {
			if ( $(this.pixel_id) ) {
				$(this.pixel_id).remove();
			}
			var img = document.createElement('img');
			img.style.width = "1px";
			img.id = this.pixel_id;
			img.style.height = "1px";
			img.src = this.createImage();
			img.style.position = "absolute";
			img.style.top = "0px";
			this.debug("inserting: " + img.src);
			Element.insert( document.body, { top: img } );
			this.sent = true;
		} catch(e) {
			this.processMessage(e);
		}
	},
	
	createImage: function() {
		try {
			var img = this.statsHostname + this.pixelLocation;
			var qString = this.createQueryString();
			return img + qString;
		} catch(e) {
			this.processMessage(e);
			return '';
		}
	}
});

MagnifyStats.Legacy = Class.create(MagnifyStats.Generic, {
	initialize: function( config ) {	
		this.baseInitialize( config );
		// Commented out following line to send gen2 stats through
		// st.magnify.net, track_unified, qserver.pl, instead of
		// legacy record_pixel_hits.pl path
		// this.statsHostname = "http://" + location.hostname;
		this.pixelLocation = "/decor/track/dot.gif"
		this.type = config.type;
		
		this.metaData = this.metaDataForType();
		this.setMetaData();
		
		this.pixel_id = "mvp_" + this.type + "_tracker";
	},

	trackedMetaData: { 
		site: 'site', 
		r: 'referrer', 
		v: 'viewer', 
		c: 'content', 
		ad: 'adCampaign',
		sp: 'servicePlan',
		pp: 'proPackage',
		p: 'pipeline'
	},	
	
	createQueryString: function () {
		try {			
			var qString = "?time=" + this.getTimestamp();
			qString += ( this.type ? "&type=" + this.type : '' );
			qString += "&session_id=" + this.session;
			qString += ( this.metaData && Object.keys( this.metaData ).length ? "&" + $H( this.metaData ).toQueryString() : '' );
			return qString;
		} catch(e) {
			this.processMessage(e);
			return '';
		}	
	},
	
	metaDataForType: function() {
		try {
			if ( this.type == 'player_embed' ) {
				return { is_video: 0, player_embed: 1};
			} else if ( this.type == 'player_play' ) {
				return { player_play: 1, is_video: 1};
			} else {
				return { player_play: 0, is_video: 0};
			}
		} catch(e) {
			this.processMessage(e);
		}
	}
});

// New style UsageRequest, for track_unified path
MagnifyStats.UsageRequest = Class.create(MagnifyStats.Generic, {
	initialize: function( config ) {	
		this.type = config.content_type;
		this.baseInitialize( config );
		this.pixelLocation = "/decor/track/usage_request.gif"
	},
	trackedMetaData: { 
		content_type: 'content_type',
		site_cid: 'site_cid',
		assoc_type: 'assoc_type',
		assoc_cid: 'assoc_cid'
	},
	makeUsageRequest: function() { this.createPixel(); }
});

// Deprecated, mod_perl dependent UsageRequest
MagnifyStats.UsageRequestLegacy = Class.create(MagnifyStats.Base, {
	initialize: function( config ) {	
		this.config = config;
		this.queryString = $H( this.config ).toQueryString();
	},
	
	makeUsageRequest: function() {
		try {
			new Ajax.Request('/services/usage_request?' + this.queryString, {
				method: 'get'
			});
		} catch(e) {
			this.processMessage(e);		
		}
	}
});

MagnifyStats.ViewCountRequest = Class.create(MagnifyStats.Base, {
	initialize: function( config ) {	
		this.config = config;
		this.queryString = $H( this.config ).toQueryString();
	},
	
	// This was just Content_UserView, which was never used by anything
	// but the setherapart plugin, which is dead now.
	// Should remove references wherever it appears.
	makeViewCountRequest: function() {}
	/*
	makeViewCountRequest: function() {
		try {
			new Ajax.Request("/services/view_count_request?session_id=" + MagnifyStats.getSession() + "&" + this.queryString, {
				method: 'get'
			});
		} catch(e) {
			this.processMessage(e);		
		}
	}
	*/
});


