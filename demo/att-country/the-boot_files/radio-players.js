(function($,$win){

	$(document).ready(function(){
		if(typeof($win.docCookie) === 'undefined')
			$win.docCookie = docCookie;

		RadioPlayerAd.init();
		PlayerPopupObj.init();
		ToolTip.init();
	});

	var pwindow = "";
	var pwindow_timer = "";
	var pwindow_pintvl = "";

	window.dfpAdRefresh = typeof(window.dfpAdRefresh) !== 'undefined' ? window.dfpAdRefresh : true;
	window.RadioPlayerAd = {
		adLoaded : 0,
		playerMode : null,
		talkRadioRefresh : null,
		init : function(){
//			console.log('init');
			var self = this;
			// Variables radioPlayerMode defined in page.php and popup.php
			self.playerMode = typeof window.radioPlayerMode === 'undefined' ? 'radio' : window.radioPlayerMode;
			if(self.playerMode == 'talk' && window.dfpAdRefresh) {
//				console.log('set interval');
				self.talkRadioRefresh = setInterval(function(){
					if(window.dfpAdRefresh) {
//						console.log('3mins');
						self.refresh();
					}
				}, 180000); // Every 3 minutes
			}
		},
		playerEventTriggered : function(){
			var self = this;
//			console.log('playerEventTriggered');
			if(self.playerMode == 'radio') {
				if(self.adLoaded == 0) {
					self.adLoaded = 1;
				} else {
					self.refresh();
				}
			}
		},
		refresh : function(){
			var self = this;
			// Refresh song only happens if it's enabled and not a 'talk' radio player
			if(window.dfpAdRefresh){
//				console.log('refreshed');
				if( window.TSMAdHelperObj !== undefined ){	//use tsmAdHelper's refreshSlot function to trigger the async adrefresh on the adslot.
					window.TSMAdHelperObj.refreshSlot( [ window.TSMAdHelperObj.initializedAdSlots[ 'top-right-300x250' ] ] );
				}
			}
		}
	};

	window.onNowPlayingEvent = function(artist,song,album){
//		console.log('onNowPlayingEvent');
		RadioPlayerAd.playerEventTriggered();
	};

	$win.pointsObj = {
		ctx:this,
		timer:"",
		timer_is_on:true,
		pinterval:"",
		startTicker:function(aobj,ainterval){
			var self = this,
				ulF = $win.ulF;
			if(typeof(ulF) != undefined && ulF){
				if(aobj == "")
					aobj = jQuery(".points-button a");
				if(ainterval == undefined)
					this.linterval = interval;
				else
					this.linterval = ainterval;
				clearTimeout(self.timer);
				this.timer_is_on = true;
				this.updateTicker(aobj);
			}
		},
		updateTicker:function(aobj){
			var self = this;
			self.aobj = aobj;
			self.ufunc = function(){ self.updateTicker(aobj)};
			if(this.timer_is_on){
				aobj.html("COLLECT "+points+" POINTS IN: "+ pad(Math.floor(this.linterval / 60),2) + ":" + pad((this.linterval % 60),2));
				self.timer = setTimeout(self.ufunc,1000);
				this.linterval--;
				this.pinterval = this.linterval;
			}
			if(this.linterval<=0){
				aobj.html("COLLECT "+points+" POINTS NOW");
				clearTimeout(this.timer);
				this.timer_is_on = false;

				aobj.click(function(){
					self.collectPoints(self.aobj);
					setTimeout(function() {self.resetTicker(self.aobj);} , 3500); // delays 1.5 sec
				});
			}
			function pad(number, length) {
				var str = '' + number;
				while (str.length < length) {
					str = '0' + str;
				}
				return str;
			}
		},
		collectPoints:function(aobj){
			var self = this;
			add_loyalty_points("Radio Page Counter");
			aobj.html("YOU HAVE COLLECTED "+points+" PTS!");
		},
		resetTicker: function(aobj){
			this.linterval = interval;
			aobj.unbind('click');
			this.timer_is_on = true;
			this.startTicker("",this.linterval);
		},
		stopTicker: function(){
			clearTimeout(this.timer);
			this.timer_is_on = false;
			//alert("stop");
		}
	};

	$win.openPlayer = function() {
		pwindow = window.open('/listen-live/popup', 'popOutWindow', 'toolbar=0,scrollbars=0,width=630,height=433');
		pwindow.onload = function(){
			$win.pointsObj.stopTicker();
			pwindow.pointsObj.startTicker("",$win.pointsObj.pinterval);
			clearTimeout(pwindow_timer);
			$win.checkPopupWindowClosed();
		}
	};

	$win.checkPopupWindowClosed = function(){
		if(pwindow.pointsObj != undefined){
			pwindow_pintvl = pwindow.pointsObj.pinterval;
			ulF = pwindow.ulF;
		}
		if(pwindow.closed){
			$win.pointsObj.startTicker("", pwindow_pintvl);
		}
		else{
			pwindow_timer = setTimeout($win.checkPopupWindowClosed, 1000);
		}
	};

	$win.PlayerPopupObj = {
		init:function(){
			$win.popupPlayer = $win.openPlayer = function(slug){
				var pwindow = window.open(
					slug+'popup/',
					'popOutWindow',
					'toolbar=0,scrollbars=0,width=990,height=494'
				);
				pwindow.onload = function(){
					if(pointsObj !== null){
						pointsObj.stopTicker();
						pwindow.pointsObj.startTicker("",pointsObj.pinterval);
						clearTimeout(pwindow_timer);
						checkPopupWindowClosed();
					}
				}
			};
			$('#navigation .menu-item a, nav.main .menu-item a')
				.filter('[href$="listen-live"],[href$="listen-live/"]')
				.click(function(e){
					e.preventDefault();
					$win.popupPlayer('/listen-live/');
				});
			$('.welcome_content a')
				.filter(function(i){
					var patt = /listen-live\/popup/i;
					var href = $(this).attr('href');
					if(typeof href !== 'undefined'){
						return href.match(patt);
					}
				})
				.click(function(e){
					e.preventDefault();
					$win.popupPlayer('/listen-live/');
				});
		},
		//Cookie object
		cookie:{
			get : function(c_name){
				var i,x,y,ARRcookies = document.cookie.split(";");
				for (i=0;i<ARRcookies.length;i++){
					x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
					y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
					x = x.replace(/^\s+|\s+$/g,"");
					if (x==c_name) return unescape(y);
				}
			},
			set : function(c_name,value,exdays){
				var exdate=new Date();
				exdate.setDate(exdate.getDate() + exdays);
				var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
				document.cookie=c_name + "=" + c_value;
			}
		}
	};

	var docCookie = {
		getItem: function (sKey) {
			return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		},
		setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
			var sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
						sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
						break;
					case String:
						sExpires = "; expires=" + vEnd;
						break;
					case Date:
						sExpires = "; expires=" + vEnd.toGMTString();
						break;
				}
			}
			document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
			return true;
		},
		removeItem: function (sKey, sPath) {
			if (!sKey || !this.hasItem(sKey)) { return false; }
			document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
			return true;
		},
		hasItem: function (sKey) {
			return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		}
	};

	//Tool Tip for loyalty
	$win.ToolTip = {
		init : function(){
			var self = this,
				pathname = $win.location.pathname,
				cookieKey = 'radio_players_tooltip',
				toolTip = $('#player_tooltip'),
				bail = true;

			// Don't Bail if not on /listen-live or /radio/[slug]
			if(pathname.match(/^\/(listen-live\/?$|radio\/([^\/]+)\/?$)/) !== null)
				bail = false;
			// Don't Bail if not on /listen-live/popup or /radio/[slug]/popup
			if(pathname.match(/^\/(listen-live\/popup|radio\/([^\/]+)\/popup)/) !== null)
				bail = false;
			// Bail if bail
			if(bail)
				return false;
			// Bail if cookie already exists
			if(docCookie.hasItem(cookieKey))
				return false;

			// Set tooltip cookie with expire=365*10 & path=pathname
			docCookie.setItem(cookieKey, 1, 365*10, '/', '.'+location.hostname);

			toolTip.css('opacity',1).on('click','a,.close',function(){
				toolTip.animate(
					{opacity : 0},
					{
						duration : 300,
						easing : 'swing',
						queue : false,
						complete : function(){
							toolTip.css({display:'none'});
						}
					});
			});
		}
	};

})(jQuery,window);
