MagnifyEmbeddablePlayer = Class.create({
	initialize: function( config ) {
		try {
		this.type = config.type;
		this.contentItem = config.contentItem;
		this.playlist = config.playlist;
		this.embedURL = config.embedURL;
		this.config = config.config ? config.config : {};
		this.panelContainer = config.panelContainer;
		this.toolRoot = config.toolRoot;
		this.componentRoot = config.componentRoot;
		this.registrationRequired = config.registrationRequired;
		this.isSSO = config.isSSO;
		this.videoAds = config.videoAds;	
				
		this.panels = new Hash();
		this.ads = new Hash();
		this.registeredPlaylists = new Hash();
		this.registeredContent = new Hash();
		this.setup = new Array();
		
		this.reloadRequired = false;
		
		this.hidePlaylist = this.config.hide_playlist == 1 ? true : false;
		this.readMore = this.config.read_more == 1 ? true : false;
		this.leaveBehind = this.config.leave_behind == 1 ? true : false;
		
		this.showTitle = this.config.show_title == 1 ? true : false;
		this.metaData = new Object();
		var ary = this.config.caption ? this.config.caption.split(",") : [];
		if ( this.config.meta_data ) {
			ary = this.config.meta_data.split(",")
		}
		ary.each( function( m, i ) {
			this.metaData[m] = true;
			if ( m.match(/^-/) ) {
				this.metaData[m] = false;
			}
		}.bind(this));
		
		this.widgetCID = this.config.cid;
		this.leaveBehindCounter = this.config.lb_counter ? this.config.lb_counter : 10;
		if ( this.leaveBehindCounter == 0 ) 
			this.leaveBehind = false;
			
		this.continuousPlay = true;//this.type == 'mvp' ? true : false;
		this.autoplay = this.config.init_autoplay == 1 ? true : false;
		this.syncAd = this.config.sync_ad == 1 ? true : false;
		this.adDelay = parseInt(this.config.ad_delay * 1000);
		
		this.adSlots = this.config.adSlots;	
		this.defaultPlaylist = this.playlist ? this.playlist.cid : "";
		this.queryString = this.createQueryString();		
		
		this.loggedIn = false;
		this.lastPanel = "";
		this.currentPanel = "";
		this.lastScrollDistance = 0;
		this.hostname = "http://" + location.hostname;
			
		window.continuousPlay = this.continuousPlay;
		this.auth = new MagnifyEmbeddablePlayer.Auth( this, {} );
		
		if ( this.contentItem ) {
			this.addToSetup( function() {
				this.contentItem.container = 'magnify_video_player';
				this.contentItem.autoplay = this.autoplay;
				var contentItem = this.registerContent(this.contentItem);
				this.defaultContentItem = contentItem;	
				this.currentContentItem = contentItem;
			
			}.bind(this));		
		}
		
		if ( this.playlist ) {
			this.addToSetup( function() { 
				var playlist = this.registerPlaylist(this.playlist); 
				this.currentPlaylist = playlist;
			}.bind(this) );
		}
				
		if ( this.adSlots )
			this.addToSetup( function() { this.registerAdSlots(); }.bind(this) );
		
		if ( this.registrationRequired )
			this.addToSetup( function() { this.requireLogin(); }.bind(this) );
		
		this.registerListeners();
		} catch(e) { console.log( e.message + " " + e.lineNumber ); }
	},
	
	registerListeners: function() {
		if ( window.addEventListener ) 
			window.addEventListener("load", function() { this.completeSetup(); }.bind(this), false);
		else if ( window.attachEvent ) 
			window.attachEvent("onload", function() { this.completeSetup(); }.bind(this));
	},
	
	addToSetup: function(f) {
		this.setup.push(f);
	},
	
	completeSetup: function() {
		this.setup.each( function(f, i) {
			f();
		}.bind(this));
		
		if ( $('mvp_embed_code') ) {
			$('mvp_embed_code').value = '<iframe src="' + this.embedURL + '" width="' + this.config.width + '" height="' + this.config.height + '" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="true"></iframe>';
		}
		
		if ( window.addEventListener ) 
			window.addEventListener("resize", function(evt) { this.handleResize(evt); }.bind(this), false);
		else if ( window.attachEvent ) 
			window.attachEvent("onresize", function(evt) { this.handleResize(evt); }.bind(this));		
	},
	
	handleResize: function(evt) {
		//console.log(evt);
		return;
	},
	
	createQueryString: function() {
		return $H( this.config ).toQueryString();
	},

/*---- Content Management ----*/	

	registerContent: function( config, callback ) {
		//if ( !this.registeredContent.get(config.cid) ) {
			var content = new MagnifyEmbeddablePlayer.Content( this, config );
			this.registeredContent.set( config.cid, content );
			return content;
		//} else {
		//	return this.registeredContent.get(config.cid);
		//}
	},
	
	registerScroller: function(config) {
		//console.log("registering other scroller");
		new MagnifyEmbeddablePlayer.Scroller( this, config );
	},

/*---- Content Management ----*/	

	registerLeaveBehind: function(config) {
		if ( !this.leaveBehindPanel ) {
			this.leaveBehindPanel = new MagnifyEmbeddablePlayer.LeaveBehind( this, config );
		}
	},
	
	showLeaveBehind: function() {
		try {
			this.leaveBehindPanel.show();
		} catch(e) {  console.log("error in showLeaveBehind: " + e.message + " " + e.lineNumber); }
	},


/*---- Panel Management ----*/		
	
	showPanel: function( tab, panelKey, effect, where ) {
		/*if ( this.companionAd && this.companionAd.showing ) {
			this.companionAd.hideAd();
		}*/	
		
		var panel = this.panels.get(panelKey);
		
		if ( !panel ) {
			panel = new MagnifyEmbeddablePlayer.Panel( this, { tab: tab, container: where ? where : this.panelContainer, id: panelKey, effect: effect } );
			this.panels.set(panelKey, panel);
		}
		panel.tab = tab;
		
		if ( this.currentPanel && panel.id == this.currentPanel.id ) {
			panel.hidePanel();
			return;
		}
	
		if ( this.currentPanel ) {
			this.currentPanel.hidePanel();
		}
		
		panel.showPanel();
	},
	
	showSubnav: function(id) {
		this.currentPanel.showSubnav(id);
	},
		
	destroyPanels: function() {
		var player = this;
		this.panels.values().each( function(panel, i) {
			Element.remove( panel.parentId );
			player.panels.unset(panel.id);
		});
		this.currentPanel = undefined
	},

	
/*---- Playlist Management ----*/

	registerPlaylists: function() {
		var player = this;
		this.playlists.each( function( playlist, i ) {
			player.registerPlaylist( playlist );
		});
	},
	
	registerPlaylist: function( playlist ) {
		if ( !playlist )
			return;
			
		if ( !this.registeredPlaylists.get(playlist.cid) ) {
			try {
				var playlist = new MagnifyEmbeddablePlayer.Playlist( this, playlist );
				this.registeredPlaylists.set( playlist.cid, playlist );
				return playlist;
			} catch(e) { console.log( e.message + " " + e.lineNumber ); }
		} else {
			return this.registeredPlaylists.get(playlist.cid);
		}
	},
		
	showPlaylists: function() {
		if ( !$('magnify_widget_playlist_container') ) {
			var navContainer = $('magnify_widget_playlist_nav_container');
			var container = document.createElement('div');
			container.id = 'magnify_widget_playlist_container';
			navContainer.insert(container);
 		}
 		
 		if ( this.currentPanel ) {
 			this.currentPanel.hidePanel();
 		}
 	},

	
/*---- Playlist Item Management ----*/

	registerPlaylistItem: function(playlistCID, playlistItem) {
		var playlist = this.registeredPlaylists.get( playlistCID );
		playlist.registerItem( playlistItem );
	},


/*---- Ad Management ----*/
	
	registerAdSlots: function() {
		var player = this;
		this.adSlots.each( function( adSlot, i ) {
			player.registerAdSlot(adSlot);
		});
	},
	
	registerAdSlot: function(adSlot) {
		this.ads.set( adSlot.id, new MagnifyEmbeddablePlayer.Ad( this, adSlot ) );
	},

	refreshAds: function() {
		var player = this;
		var adArray = ['magnify_widget_rect_frame', 'magnify_widget_bottom_leader_frame', 'magnify_widget_bottom_banner_frame', 'cb_medrect1_frame'];
		
		// if our frame has been destroyed by tremor
		if ( !$('magnify_widget_rect_frame') && $('adCompanionBanner') ) {
			$('adCompanionBanner').innerHTML = '<iframe id="magnify_widget_rect_frame" src="" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" allowtransparency="true" width="300" height="250"></iframe>';
		}
		
		adArray.each( function(el) {
			if ( $(el) ) {
				$(el).src = player.toolRoot + 'ad.mason?loc=' + el + '&amp;content_item_cid=' + player.currentContentItem.cid + '&amp;autoplay=' + player.currentContentItem.autoplay + (player.queryString ? '&amp;' + player.queryString : '');
			}
		});
	},
	
	
/*---- Authentication Management ----*/

	checkAuth: function(callback) {
		var player = this;
		
		new Ajax.Request( this.toolRoot + 'get_login.minc', {
			method: 'get',
			onSuccess: function(transport) { 
				player.loggedIn = transport.responseText > 0;
				if ( player.loggedIn ) {
					player.registrationRequired = false;
				}
				if ( callback ) {
					callback();
				}
			}
		});	
	},

	requireLogin: function() {
		var player = this;
		this.checkAuth(function() {
			if ( !player.loggedIn ) {
				if ( $('magnify_player_require_login') ) {
					$('magnify_player_require_login').show();
				}
				if ( $('magnify_player_container') ) {
					$('magnify_player_container').update();
				}
				//player.auth.showLogin();
			}
		});
	},
	

/*---- Embed Code ----*/	

	showEmbedCode: function(link, el) {
		if ( el.style.display == 'none' ) {
			Effect.Appear(el, {queue: { scope: 'embed_link'}} );
			link.innerHTML = "hide embed";
		} else {	
			Effect.Fade(el, {queue: { scope: 'embed_link'}} );
			link.innerHTML = "embed this";
		}
		return false;
	},


/*---- Email ----*/	
	
	sendEmail: function(url, form, target) {
		var player = this;
		new Ajax.Updater(target, this.toolRoot + url + (this.queryString ? '?' + this.queryString : ''), {
			method: 'post', 
			parameters: Form.serialize( form ), 
			evalScripts: true,
			onComplete: function() {
				player.currentPanel.insertCloseLink();
			}
		});
	},
	
	
/*---- Rating ----*/	
	
	swapRate: function(level, img_on, img_off) {
		for ( var i=1; i <= 5; i++ ) {
			$('mvp_rating_' + i).src = ( i <= level ? img_on : img_off );
		}
	},
	
	
/*---- Tagging ----*/
	
	addUserTag: function(tag) {
		var player = this;
		new Ajax.Updater('magnify_widget_playlist_item_tag_content', this.toolRoot + 'tag.minc?content_item_cid=' + this.currentContentItem.cid + '&amp;width=' + this.width + '&amp;add_tags=' + escape( tag ), {
			method: 'get',
			onComplete: function( transport ) {
				player.currentPanel.insertCloseLink();
			}
		}); 
	},
	
	dropUserTag: function(tag_nid) {
		var player = this;
		new Ajax.Updater('magnify_widget_playlist_item_tag_content', this.toolRoot + 'tag.minc?content_item_cid=' + this.currentContentItem.cid +'&amp;width=' + this.width + '&amp;drop_tag=' + tag_nid, {
			method: 'get',
			onComplete: function( transport ) {
				player.currentPanel.insertCloseLink();
			}
		}); 
	},
	

/*---- Object Submission ----*/	

	saveObject: function(url, form, target) {
		var player = this;
		new Ajax.Request(this.toolRoot + 'get_login.minc', {	
			onSuccess: function(transport) { 
				player.loggedIn = transport.responseText; 
				player.finishSave(url, form, target); 
			}
		});
	},
	
	finishSave: function(url, form, target) {
		var player = this;
		
		if ( !url || !form || !target ) {
			return;
		}
		if ( this.loggedIn > 0 ) {
			var params = "";
			if ( typeof(form) == 'object' ) { 
				params = Form.serialize( form );
			} else {
				params = form;
			}
			new Ajax.Updater(target, this.toolRoot + url, {
				method: 'post', 
				parameters: params, 
				evalScripts: true,
				onComplete: function( transport ) {
					player.currentPanel.insertCloseLink();
				}
			});	
		} else {
			this.delayedObject = new Array(url, Form.serialize( form ), target);
			if ( this.isSSO ) {
				window.open('/embed/player/modules/sso_login', 'sso_login', '');			
				new Ajax.Updater(target, this.toolRoot + 'sso_login_msg.minc?content_item_cid=' + this.currentContentItem.cid + '&amp;width=' + this.width, {
					method: 'get', 
					evalScripts: true
				});
			} else {
				this.auth.showLogin();	
			}
		}
	},
	


/*---- Player Play Behaviors ----*/

	stopContinuousPlay: function() {
		this.continuousPlay = false;
	},
	
	loadNext: function() {
		console.log("called load next");
		
		if ( this.companionAd && this.companionAd.showing ) {
			this.companionAd.hideAd();
		}
		
		if ( this.currentPlaylist )
			this.nextItem = this.currentPlaylist.getNextItem();
			
		if ( this.readMore || this.leaveBehind ) {
			console.log("I'm going to show the leave behind");
		
			this.showLeaveBehind();
		} else if ( this.nextItem ) {
			this.nextItem.makeSelected();
			this.nextItem.loadContent();
		}
	},
	
	getCurrentContent: function() {
		return this.registeredContent.get(this.currentContentItem.cid);
	},
	
	
	registerController: function(controller) {
		var content = this.getCurrentContent();
		if ( content )
			content.registerController(controller);
	},
	
	replay: function() {
		var content = this.getCurrentContent();
		content.config.container = 'magnify_video_player';
		content.width = this.config.player_width;
		content.height = this.config.player_height;
		content.autoplay = true;
		content.load();
	},
	
	pause: function() {
		var content = this.getCurrentContent();
		if ( content )
			content.pause();
	},
	
	play: function() {
		var content = this.getCurrentContent();
		if ( content )
			content.play();
	},


/*---- Misc Convenience Methods ----*/	

	getAddThis: function(url, title, container, preferredCount) {
		var content_url = encodeURIComponent(url);
		var content_title = encodeURIComponent(title);
		var container = $(container);
		if ( !preferredCount ) {
			preferredCount = 2;
		}
		
		['twitter', 'facebook'].each( function(name, i) {
			var link = new Element('a');
			link.addClassName('addthis_button_' + name);
			container.appendChild(link);		
		});
		addthis.toolbox(container, {}, {url: url, title: title});
	},
	
	injectCSS: function() {
		var ss = document.createElement('style');
		var def = css_string;
		ss.setAttribute("type", "text/css");
		if (ss.styleSheet) {   // IE
			ss.styleSheet.cssText = def;
		} else {                // the world
			var tn = document.createTextNode(def);
			ss.appendChild(tn);
		}
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(ss);
	},

	injectScript: function(url) {
		var oScript = document.createElement("script"); 
		var dtRf = new Date(); 
		oScript.setAttribute("src", url + "?rf=" + dtRf.getTime()); 
		var head = document.getElementsByTagName('head')[0];
		document.body.appendChild(oScript);
	},
	
	createMessage: function(el, message) {
		el.innerHTML = '<div style="text-align: center; margin-top: ' + parseInt(el.offsetHeight/2 - 20) + 'px;" class="mvp-loading-message">' + message + '</div>';
	}
});


MagnifyEmbeddablePlayer.Scroller = Class.create({
	defaultScrollSpeed: 5000,
	
	initialize: function(player, config) {
		this.config = config;
		this.player = function() {
			return player;
		}
		
		this.container = config.container;
		this.playlist = config.playlist;

		this.autoScroll = config.autoScroll;
		this.scrollSpeed = config.scrollSpeed || this.defaultScrollSpeed;		
		this.linkTarget = config.linkTarget;
		
		// figure out whether we're scrolling vertically or not.
		this.setDirection();
		
		if ( this.playlist ) {
			//console.log("registering a new playlist");
			this.registeredPlaylist = this.player().registerPlaylist( this.playlist );	
		} else if ( this.player().currentPlaylist ) {
			//console.log("using the default playlist");
			this.registeredPlaylist = this.player().currentPlaylist;
		} else {
			//console.log("no playlist, returning");
			return;
		}
		
		//console.log( "my playlist status is: loading: " + this.registeredPlaylist.loading + " loaded: " + this.registeredPlaylist.loaded );
		
		if ( this.registeredPlaylist.loaded ) {
			this.buildPlaylist();		
		} else if ( this.registeredPlaylist.loading ) {
			this.waitForPlaylist();
		} else {
			this.registeredPlaylist.onLoad = function() {
				this.buildPlaylist();
			}.bind(this);
			this.registeredPlaylist.loadItems();
		}
				
		if ( window.addEventListener ) 
			window.addEventListener("resize", function(evt) { this.setDirection(evt); }.bind(this), false);
		else if ( window.attachEvent ) 
			window.attachEvent("onresize", function(evt) { this.setDirection(evt); }.bind(this));
	},
	
	setDirection: function(evt) {	
		var containerDimensions = $('magnify_playlist_player').getDimensions();
		this.vertical = (containerDimensions.width <= 300) && (containerDimensions.height > 300) && (containerDimensions.height > containerDimensions.width);
		
		if ( this.scrollingList ) {
			this.scrollingList.style.top = "0";
			this.scrollingList.style.left = "0";
		}
	},
	
	waitForPlaylist: function() {
		//console.log("waiting for playlist to load");
	
		if ( this.playlistTimeout )
			clearTimeout( this.playlistTimeout );
		
		this.playlistTimeout = setTimeout( function() {
			if ( this.registeredPlaylist.loaded ) {
				//console.log("playlist loaded");
				this.buildPlaylist();	
			} else {
				this.waitForPlaylist();
			}
		}.bind(this), 1000);
	},
	
	buildPlaylist: function() {
		if ( !this.registeredPlaylist ) {
			console.log("no registered playlist, exiting");
			return;
		}
		
		try {
			this.container = $(this.config.container.id);
			this.container.update();
			
			this.playlistHeader = new Element('div');
			this.playlistHeader.id = "mvp_leave_behind_related_header";
			this.playlistHeader.className = "clearfix";
			
			this.playlistContainer = new Element('div');
			this.playlistContainer.id = "mvp_leave_behind_related_container";
			
			this.playlistTitle = new Element('span');
			this.playlistTitle.id = "mvp_leave_behind_related_title";
			this.playlistTitle.update(this.registeredPlaylist.title || "Related Videos");
			
			this.playlistLink = new Element('a');
			this.playlistLink.id = "mvp_leave_behind_related_link";
			this.playlistLink.href = this.player().hostname + this.registeredPlaylist.url;
			this.playlistLink.target = "_top";
			this.playlistLink.update("View more &raquo;");
					
			this.prevControl = new Element('span');
			this.prevControl.className = "magnify-widget-controls-left magnify-widget-controls-inactive";
			this.prevControl.observe("click", function() { this.scrollPrev(); }.bind(this));
			
			this.nextControl = new Element('span');
			this.nextControl.className = "magnify-widget-controls-right";
			this.nextControl.observe("click", function() { this.scrollNext(); }.bind(this));
			
			this.playlistWindow = new Element('span');
			this.playlistWindow.id = "mvp_leave_behind_related_window";
			
			this.scrollingList = new Element('div');
			this.scrollingList.id = "mvp_leave_behind_related";
			
			var relatedItems = this.registeredPlaylist.sortedItems();		
			if ( this.player().defaultContentItem && this.registeredPlaylist.items.keys().indexOf(this.player().defaultContentItem.cid) < 0 ) {
				var unrelatedItem = this.player().registeredContent.get(this.player().defaultContentItem.cid);
				relatedItems.unshift( unrelatedItem );
			}
			
			// should we include the current item in the list?
			relatedItems.each( function( item, i ) {
				//if ( item.cid != leaveBehind.player().currentContentItem.cid ) {
					item.relatedOrder = i;
					itemDiv = this.buildPlaylistItem( item.content );
					if ( itemDiv )
						this.scrollingList.appendChild( itemDiv );
				//}
			}.bind(this));
			
			this.playlistHeader.appendChild(this.playlistTitle);
			this.playlistHeader.appendChild(this.playlistLink);
			this.container.appendChild( this.playlistHeader );
			
			this.playlistWindow.appendChild( this.scrollingList );			
			this.playlistContainer.appendChild( this.prevControl );
			this.playlistContainer.appendChild( this.playlistWindow );
			this.playlistContainer.appendChild( this.nextControl );
			
			this.container.appendChild( this.playlistContainer );
			
			if ( this.autoScroll ) {
				this.startAutoScroll();
			}
		} catch(e) { console.log(e.message + " " + e.lineNumber ); }
	},
	
	buildPlaylistItem: function(item) {	
		if ( !item )
			return;
		
		var containerDiv = new Element('span');
		containerDiv.className = "mvp-related-item-container";
		containerDiv.id = "mvp_related_item_container_" + item.cid;
		
		
		if ( this.player().config.layout == 'thumbnails' ) {
			var itemDiv = new Element('a');
			itemDiv.href = item.permaLink;
			itemDiv.target = this.linkTarget;
			if ( this.player().nextItem && item.cid == this.player().nextItem.cid ) {
				itemDiv.className = "mvp-related-item-selected";
			} else {
				itemDiv.className = "mvp-related-item";
			}
		} else {
			var itemDiv = new Element('div');
			if ( this.player().nextItem && item.cid == this.player().nextItem.cid ) {
				itemDiv.className = "mvp-related-item-selected";
			} else {
				itemDiv.className = "mvp-related-item";
			}
			itemDiv.observe("click", function() { item.load(); item.fire("scroller:loadItem"); }.bind(this) );		
		}
		
		var thumbnail = new Element('span');
		thumbnail.className = "magnify-widget-playlist-item-thumbnail";
		
		var span1 = new Element('span');
		span1.className = "magnify-thumb-clip-outer";
		thumbnail.appendChild(span1);

		var span2 = new Element('span');
		span2.className = "magnify-thumb-clip-inner";
		span1.appendChild(span2);
				
		var img = new Element('img');
		img.src = item.thumbnailURL;
		img.className = "magnify-thumb";
		img.title = item.title;
		span2.appendChild(img);
		
		var vertSpan = new Element('span');
		vertSpan.className = "magnify-thumb-vertical-align";
		span2.appendChild(vertSpan);
				
		itemDiv.appendChild(thumbnail);
		
		itemDetails = new Element('div');
		itemDetails.className = "mvp-related-item-description magnify-widget-playlist-item-caption-title";
		itemDetails.update("<a>" + item.title + "</a>");
		itemDiv.appendChild( itemDetails );
		
		var caption = item.createCaption();
		if ( caption )
			itemDiv.appendChild(  caption );
		
		containerDiv.appendChild( itemDiv );
		
		return containerDiv;
	},
	
		
	startAutoScroll: function() {
		var scroller = this;
		this.scrollInterval = setInterval( function() { scroller.scrollNext(true) }, this.scrollSpeed );	
	},
		
	scrollPrev: function(auto) {
		this.prevControl.fire("scroller:scrollPrev");
				
		if ( !auto ) {
			clearInterval( this.scrollInterval );
		}
		
		var dir = this.vertical ? 'top' : 'left';
		
		var left = Math.abs( parseInt( this.scrollingList.getStyle(dir) ) );
		
		if ( left == 0 ) {
			return;
		}
		
		this.prevControl.removeClassName("magnify-widget-controls-inactive");
		this.nextControl.removeClassName("magnify-widget-controls-inactive");
				
		var percent = -1*( left - 100 );
		
		new Effect.Morph(this.scrollingList, {
			style: dir + ": " + percent + "%",
			duration: 0.75, 
			queue: { position: 'front', scope: 'related_items' },
			afterFinish: function() {
				if ( Math.abs( parseInt( this.scrollingList.getStyle(dir) ) ) == 0 ) {
					this.prevControl.addClassName("magnify-widget-controls-inactive");
				}			
			}.bind(this)
		});	
	},
	
	scrollNext: function(auto) {
		this.nextControl.fire("scroller:scrollNext");
		
		if ( !auto ) {
			clearInterval( this.scrollInterval );
		}
		
		console.log("this is vertical? " + this.vertical + " scrolling forward");
		
		var dir = this.vertical ? 'top' : 'left';
		
		var left = Math.abs( parseInt( this.scrollingList.getStyle( dir ) ) );		
		var multiplier = (left/100)+1;
		
		var childWidth = this.vertical ? this.scrollingList.firstChild.getHeight() : this.scrollingList.firstChild.getWidth();
		var windowWidth = this.vertical ? this.scrollingList.getHeight() : this.scrollingList.getWidth();
		var perPage = Math.round( windowWidth/childWidth );
		var scrollerWidth = (childWidth*this.registeredPlaylist.items.values().length);
		
		if ( (multiplier*(childWidth*perPage)) >= scrollerWidth ) {
			clearInterval( this.scrollInterval );
			return;
		}
		
		this.prevControl.removeClassName("magnify-widget-controls-inactive");
		this.nextControl.removeClassName("magnify-widget-controls-inactive");
				
		/*console.log("current left position: " + left);
		console.log("individual item width: " + childWidth);
		console.log("number of items per window: " +  perPage);
		console.log("multiplier: " + multiplier);
		console.log("actual distance to scroll: " + windowWidth);
		console.log("total scroller width: " + scrollerWidth + " " + (childWidth*perPage));*/
		
		var percent = -1*( left + 100 );
				
		new Effect.Morph(this.scrollingList, {
			style: dir + ": " + percent + "%",
			duration: 0.75, 
			queue: { position: 'front', scope: 'related_items' },
			afterFinish: function() {
				var left = Math.abs( parseInt( this.scrollingList.getStyle(dir) ) );		
				var multiplier = (left/100)+1;				
				var childWidth = this.scrollingList.firstChild.getWidth();
				var perPage = Math.round( this.scrollingList.getWidth()/this.scrollingList.firstChild.getWidth());
				var scrollerWidth = (this.scrollingList.firstChild.getWidth()*this.registeredPlaylist.items.values().length);
				
				if ( (multiplier*(childWidth*perPage)) >= scrollerWidth ) {
					this.nextControl.addClassName("magnify-widget-controls-inactive");
				}			
			}.bind(this)
		});
	},
	
	scrollToItem: function() {
		return;
	}
});

MagnifyEmbeddablePlayer.LeaveBehind = Class.create({
	initialize: function(player, config) {
		this.config = config;
		this.player = function() {
			return player;
		}
		this.watchAgainContainer = $('mvp_watch_again_container');
		this.container = $('mvp_read_more');
		
		var scrollerConfig = config;
		
		if ( !config.playlist ) {
			scrollerConfig.playlist = this.player().playlist;
		}
		scrollerConfig.perPage = 3;
		scrollerConfig.container = $('mvp_leave_behind_container');
		
		this.scroller = new MagnifyEmbeddablePlayer.Scroller(player, scrollerConfig);
		document.observe("scroller:scrollNext", function() { this.clearCountdown() }.bind(this));
		document.observe("scroller:scrollPrev", function() { this.clearCountdown() }.bind(this));
		document.observe("scroller:loadItem", function() { this.clearCountdown() }.bind(this));
	},
	
	show: function() {
		try {
			this.scroller.buildPlaylist();	

			this.container = $('mvp_read_more');
			this.container.show();	
			
			if ( this.player().leaveBehind )
				this.scroller.scrollToItem();
			
			this.nextItem = this.scroller.registeredPlaylist.getNextItem();
			console.log( this.nextItem.content.title );
			
			if ( this.nextItem != 'undefined' ) {
				this.startCountdown();
			}
				
		} catch(e) { console.log( "error showing leave behind in show(): " + e.message + " " + e.lineNumber ); }
	},
	
	clearCountdown: function() {
		if ( this.countDownInterval )
			clearInterval(this.countDownInterval);
		if ( this.player().leaveBehindTimeout )
			clearTimeout( this.player().leaveBehindTimeout );
		if ( this.countDown )	
			this.countDown.update('');
	},
	
	updateCountdown: function() {
		if ( this.timer == 0 ) {
			this.clearCountdown();
		}
		if ( !this.countDown ) { 
			this.countDown = new Element('div');
			this.countDown.id = "mvp_leave_behind_countdown_container";
			this.countDown.className = "mvp-player-overlay-left";
			this.watchAgainContainer = $('mvp_watch_again_container');
			this.watchAgainContainer.insert( { 'before': this.countDown } );
		}
		this.countDown.update( '<span id="mvp_leave_behind_countdown_text">Next video in</span> <span id="mvp_leave_behind_countdown">' +this.timer + " second" + (this.timer == 1 ? "" : "s") + "</span>" );		
		this.timer--;			
	},
	
	startCountdown: function() {
		if ( this.player().leaveBehindCounter < 0 )
			return;
		
		this.timer = this.player().leaveBehindCounter;
		this.countDown = undefined;
		var leaveBehind = this;
		this.countDownInterval = setInterval( function() { leaveBehind.updateCountdown() }, 1000);
		
		this.player().leaveBehindTimeout = setTimeout(function() {	
			leaveBehind.nextItem.makeSelected();
			leaveBehind.nextItem.loadContent();
		}, this.player().leaveBehindCounter*1000);
	}
}),


MagnifyEmbeddablePlayer.Content = Class.create(MagnifyEmbeddablePlayer, {
	initialize: function( player, config ) {
		this.config = config;
		
		this.player = function() {
			return player;
		}

		this.metaData = this.player().metaData;		
		this.container = $(config.container);
		this.cid = config.cid;
		this.media_item_cid = config.media_item_cid;
		this.width = config.width;
		this.height = config.height;
		this.title = config.title;
		this.thumbnailURL = this.config.thumbnail_url;
		this.largeThumbnailURL = this.config.large_thumbnail_url;

		this.permaLink = this.player().hostname + "/" + this.config.media_item.media_type_cid + "/" + config.permalink;
			
		this.title = this.config.title;
		this.postedDate = this.config.posted;
		this.poster = this.config.user ? this.config.user.handle : 'Anonymous';
		this.views = this.config.views;
		this.duration = this.config.media_item.duration_seconds;
		this.reviewCount = this.config.review_count;
		this.reviewScore = this.config.review_score;				
		
		this.service = this.config.magnify_hosted ? 'magnify' : this.config.media_pipeline_cid;
		this.callback = this.config.callback;
		this.autoplay = this.config.autoplay;
		this.hasPreroll = this.player().videoAds && ( this.config.magnify_hosted == 1 );
		this.manuallyPaused = false;
		this.registerListeners();
	},
	
	registerListeners: function() {
		var content = this;
		
		if ( !this.autoplay && (this.container != undefined)  && $('magnify_player_container')) {
			$('magnify_player_container').observe('click', function() { content.load(); });
		}
	},
	
	registerController: function(controller) {
		this.controller = controller;
	},
	
	load: function() {
		var content = this;
		this.player().currentContentItem = this;
		
		if ( this.player().registrationRequired ) {
			this.player().requireLogin();
			return;
		}
		
		this.container = $(this.config.container);
		
		if ( !this.container )
			this.container = $('magnify_video_player');
			
		
		if ( typeof(StatsObject) != "undefined" ) {
			StatsObject.ajaxy = true;
			StatsObject.packLog();
		}
		
		if ( this.callback ) {
			callback();
			return;
		}
		
		new Ajax.Updater(this.container, this.getContentURL(), {
			method: 'get',
			evalScripts: true,
			asynchronous: true,
			onSuccess: function() {
				try {
					var link = content.createTitle("header");
					if ( link ) {
						link.id = "magnify_player_title_link";
						if ( $('magnify_player_title_link') )
							$('magnify_player_title_link').replace( link );
					}
					
					var caption = content.createCaption();
					if ( caption ) {
						caption.id = "magnify_player_caption";
						if ( $('magnify_player_caption') )
							$('magnify_player_caption').replace( caption );
					}
					
					content.container.stopObserving("click");
					if ( content.player().leaveBehindPanel )
						content.player().leaveBehindPanel.clearCountdown();
					try {
						pSUPERFLY.virtualPage("/video/player/", playerURL);
					} catch(e) { }
					content.player().destroyPanels();
					if ( !content.hasPreroll ) {
						content.player().refreshAds();
					}
					
					content.autoplay = true;
					
					if ( content.player().companionAd != undefined && content.player().type != 'svp' && !content.player().hidePlaylist ) {
						content.player().companionAd.showAd(content.hasPreroll);
					}
				} catch(e) { console.log("error retrieving content: " + e.message + " " + e.lineNumber) }
			}
		});
	},
	
	pause: function() {
		if ( this.controller != undefined ) {
			this.controller.pause();
			this.manuallyPaused = true;
		}
	},
	
	play: function() {
		if ( this.controller != undefined && this.manuallyPaused ) {
			this.controller.play();
			this.manuallyPaused = false;
		}
	},
	
	getContentURL: function() {
		var contentConfig = new Hash();
		// this should really be player().config.player_width / player_height
		contentConfig = $H(this.player().config);
		contentConfig.set('width', this.width);
		contentConfig.set('height', this.height);
		contentConfig.set('init_autoplay', 1);
		contentConfig.set('callback', this.callback);
		contentConfig.set('content_item_cid', this.cid);	
		contentConfig.set('media_cid', this.media_item_cid);
		contentConfig.set('preserve_aspect_ratio', 0);	
		contentConfig.set('mute', this.player().config.mute);
		contentConfig.set('continuous_play', this.player().continuousPlay ? 1 : 0);	
		contentConfig.set('read_more', this.player().readMore || this.player().leaveBehind ? 1 : 0);	
		contentConfig.set('player_cid', this.player().widgetCID);
		contentConfig.set('widget_type_cid', this.player().type);
		
		return this.player().hostname + this.player().componentRoot + 'player_content?' +  contentConfig.toQueryString();
	},

	createThumbnail: function() {		
		this.thumbnailContainer = new Element('div');
		this.thumbnailContainer.className = "magnify-widget-playlist-item-thumbnail-container";
		this.thumbnail = new Element('span');
		this.thumbnail.className = "magnify-widget-playlist-item-thumbnail";
		/*this.thumbnail.style.backgroundImage = "url('" + this.thumbnailURL + "')";*/
		
		var span1 = new Element('span');
		span1.className = "magnify-thumb-clip-outer";
		this.thumbnail.appendChild(span1);

		var span2 = new Element('span');
		span2.className = "magnify-thumb-clip-inner";
		span1.appendChild(span2);
				
		this.thumbnail.img = new Element('img');
		this.thumbnail.img.src = this.thumbnailURL;
		this.thumbnail.img.className = "magnify-thumb";
		span2.appendChild(this.thumbnail.img);
		
		var vertSpan = new Element('span');
		vertSpan.className = "magnify-thumb-vertical-align";
		span2.appendChild(vertSpan);
		
		this.thumbnailContainer.appendChild(this.thumbnail);
		
		return this.thumbnailContainer;
	},
	
	createTitle: function(position) {	
		if ( position == 'header' && !this.player().showTitle )
			return;
					
		this.captionLink = new Element('a');
		if ( position == 'header' ) {
			this.captionLink.href = this.permaLink;
		}
		this.captionLink.target = "_new";
		this.captionLink.className = "magnify-player-title-link";
		this.captionLink.title = this.title;
		this.captionLink.update(this.title);
		
		return this.captionLink;
	},

	createCaption: function() {
		if ( ( this.metaData.posted && this.postedDate ) || ( this.metaData.poster && this.poster ) || this.metaData.views || ( this.metaData.rating && this.reviewCount ) ) {
			this.captionContent = new Element('div');
			this.captionContent.className = "magnify-player-caption-content magnify-widget-playlist-item-caption-content";	
		}
				
		if ( this.metaData.poster && this.poster ) {
			this.captionContent.appendChild( this.createMetaData( "added by " + this.poster, "magnify-player-caption-metadata magnify-widget-playlist-item-metadata" ) );
		}
		
		if ( this.metaData.posted && this.postedDate ) {
			var dateString = "on ";
			
			if ( !this.metaData.poster || !this.poster )
				dateString = "added on ";
				
			this.captionContent.appendChild( this.createMetaData( dateString + this.formatDate( this.postedDate ) , "magnify-player-caption-metadata magnify-widget-playlist-item-metadata" ) );
		}
		
		if ( this.metaData.views ) {
			this.captionContent.appendChild( this.createMetaData( (this.views || 0) + " view" + (this.views == 1 ? "" : "s") , "magnify-player-caption-metadata magnify-widget-playlist-item-metadata" ) );
		}
		
		if ( this.metaData.rating && this.reviewCount ) {
			this.captionContent.appendChild( this.createMetaData( this.getRating(), "magnify-player-caption-metadata magnify-widget-playlist-item-metadata" ) );
		}
		
		return this.captionContent;
	},

	createMetaData: function(string, className) {
		var span = new Element('span');
		span.className = className;
		span.update(string);
		return span;
	},
		
	formatDate: function(timestamp) {
		if ( !timestamp )
			return;
			
		var d = timestamp.substring(0,10), dp, date;
		dp = d.split("-");
		date = new Date(dp[0],dp[1]-1,dp[2]);
		return date.toLocaleDateString();
	},
	
	getRating: function() {
		var width = this.reviewScore ? parseInt( (((this.reviewScore-1) / 2.25) + 1) * 10, 10 ) : 0;
		var reviewBack = new Element('span');
		reviewBack.className = "mvp_star_rating_back";
		
		var reviewFront = new Element('span');
		reviewFront.className = "mvp_star_rating_front";
		reviewFront.style.width = width + "px";
		
		reviewBack.appendChild(reviewFront);
		
		return reviewBack;
	}
});


MagnifyEmbeddablePlayer.Ad = Class.create(MagnifyEmbeddablePlayer, {
	initialize: function( player, config ) {		
		if ( config.type == 'companion' ) {
			return new MagnifyEmbeddablePlayer.Ad.Companion(player, config);
		}
		
		this.type = config.type;
		
		this.player = function() {
			return player;
		}
	}
});

MagnifyEmbeddablePlayer.Ad.Companion = Class.create(MagnifyEmbeddablePlayer.Ad, {	
	initialize: function( player, config ) {
		this.type = config.type;
		this.showing = false;
		
		this.player = function() {
			return player;
		}
		
		this.adDelay = this.player().adDelay;	
		this.player().companionAd = this;
		
		if ( this.player().currentContentItem && !this.player().currentContentItem.autoplay && !this.player().syncAd ) {
			this.showAd(false);
		}
	},

	toggleAd: function() {
		console.log("toggling ad " + this.showing);
		if ( this.showing ) {
			this.hideAd();
		} else {		
			this.showAd();
		}
	},
	
	showAd: function(manual) {	
		try {
			var ad = this;
			var maintainAd = false;
			
			if ( this.showing ) {
				clearTimeout( this.hideInterval );
				manual = true;
				maintainAd = true;
			}
					
			if ( !maintainAd ) {
				this.player().showPanel( $('magnify_player_tab_shop'), 'shop', 'morph', this.player().type == 'svp' ? 'magnify_player_content' : 'magnify_video_playlist' );
			}
			
			if ( !manual ) {
				this.hideInterval = setTimeout(function() { ad.hideAd() }, this.adDelay);
			}
			this.showing = true;
		} catch(e) { console.log( e.message + " " + e.lineNumber ); }
	},
	
	hideAd: function() {
		if ( this.showing ) {
			clearTimeout( this.hideInterval );
			this.showing = false;
			
			if ( this.player().currentPanel && this.player().currentPanel.id == 'shop' )
				this.player().currentPanel.hidePanel();
		}
	}
});


MagnifyEmbeddablePlayer.Panel = Class.create(MagnifyEmbeddablePlayer, {
	initialize: function( player, config ) {
		this.container = $(config.container);
		
		this.tab = $(config.tab);
		this.id = config.id;
		this.effect = config.effect;
		this.parentId = 'magnify_widget_playlist_item_' + this.id + "_container";
		this.contentId = 'magnify_widget_playlist_item_' + this.id + '_content';
		this.selectedSubnav = "";
		this.player = function() {
			return player;
		}
		this.buildPanel();
		this.loadPanel();
	},
	
	buildPanel: function() {			
		this.panelContainer = document.createElement('div');
		this.panelContainer.className = 'magnify-widget-playlist-item-content-container-created';
		this.panelContainer.id = this.parentId;
		this.panelContainer.style.zIndex = 499;
		this.panelContainer.style.position = "absolute";
		this.panelContainer.style.left = "0px";
		
		this.panel = document.createElement('div');
		this.panel.className = 'magnify-widget-playlist-item-content';
		this.panel.id = this.contentId;
		
		this.panelContainer.appendChild(this.panel);
		this.container.appendChild(this.panelContainer);	
	},
	
	loadPanel: function() {
		var panel = this;
		new Ajax.Updater(this.panel, this.getPanelURL( this.id ) , {
			evalScripts: true,
			method: 'get',
			asynchronous: true,
			onComplete: function() {
				panel.insertCloseLink();
			}
		});		
	},
		
	showPanel: function() {
		try {
			if ( this.id != 'shop' ) {
				this.player().pause();
			}
				
			if ( this.player().leaveBehindPanel )
				this.player().leaveBehindPanel.clearCountdown();
				
			if ( this.effect == 'slide' ) {
				new Effect.BlindDown( this.panelContainer, { duration: 0.5, queue: { position: 'end', scope: 'panel' } });
			} else if ( this.effect == 'morph' ) {
				new Effect.Morph( this.panelContainer, { duration: 0.5, style: 'height: 100%;', queue: { position: 'end', scope: 'panel' } } );
			} else {
				new Effect.Appear( this.panelContainer, { duration: .1, queue: { position: 'end', scope: 'panel' } });
			}
			this.player().lastPanel = this.player().currentPanel;
			this.player().currentPanel = this;
			this.makeSelected();
		} catch(e) { console.log("error showing panel " + this.id + " " + e.message + " " + e.lineNumber); }
	},
	
	hidePanel: function() {
		try {
			if ( this.effect == 'slide' ) {
				new Effect.BlindUp( this.panelContainer, { duration: 0.5, queue: { position: 'front', scope: 'panel' } });		
			} else if ( this.effect == 'morph' ) {
				new Effect.Morph( this.panelContainer, { duration: 0.5, style: 'height: 0%;', queue: { position: 'front', scope: 'panel' } } );
			} else {
				new Effect.Fade( this.panelContainer, { duration: .1, queue: { position: 'front', scope: 'panel' } } );	
			}
			this.player().lastPanel = this.player().currentPanel;
			this.player().currentPanel = "";
			this.deselectAll();
			this.player().play();
			
			if ( this.player().companionAd && this.id == 'shop' ) {
				this.player().companionAd.showing = false;			
				clearTimeout( this.player().companionAd.hideInterval );
			}
		} catch(e) { console.log("error hiding panel " + this.id + " " + e.message + " " + e.lineNumber); }
	},
	
	makeSelected: function() {
		if (this.tab) {
			this.tab.removeClassName("magnify-widget-playlist-tab");
			this.tab.addClassName("magnify-widget-playlist-tab-on");
		}
	},
	
	deselectAll: function() {
		$$('.magnify-widget-playlist-tab-on').each( function(el) {
			el.removeClassName("magnify-widget-playlist-tab-on");
			el.addClassName("magnify-widget-playlist-tab");
		});
	},
	
	showSubnav: function(id) {
		if ( id != this.selectedSubnav ) {
			Element.show(id);
			Element.hide(this.selectedSubnav);
			this.selectedSubnav = id;
		}
	},
	
	insertCloseLink: function() {
		this.closeContainer = new Element('div');
		this.closeContainer.className = "magnify-player-overlay-close";
		this.closeLink = new Element('a');
		this.closeLink.className = "magnify-player-overlay-close-link";
		this.closeLink.observe('click', function() { this.hidePanel(); }.bind(this));
		this.closeLink.update('close');
		this.closeContainer.appendChild(this.closeLink);
		this.panel.insert( { 'top': this.closeContainer } );
	},
	
	getPanelURL: function( panel ) {
		return this.player().toolRoot +  panel + '.minc?content_item_cid=' + this.player().currentContentItem.cid + ( this.player().queryString ? '&' + this.player().queryString : '' );
	}	
});


MagnifyEmbeddablePlayer.Playlist = Class.create({
	initialize: function( player, config ) {
		// this is hard-coded since we removed multiple playlists
		config.itemContainer = "magnify_widget_playlist_items_container";
		this.config = config;
		this.type = config.list_type_cid;
		this.title = config.title;
		this.description = config.description;
		this.url = config.list_page_href;
		this.cid = config.cid;
		this.container = $(config.container);
		this.itemContainer = $(config.itemContainer);
		this.items = new Hash();
		this.itemIndex = 0;
		this.showing = false;
		this.loaded = false;
		this.htmlLoaded = false;
		this.loading = false;
		this.player = function() {
			return player;
		}
		this.sortedItems = function() {
			return this.items.values().sort( function(a, b) {
				return a.order - b.order;
			});
		}
		
		this.registerListeners();
		
		if ( this.player().defaultPlaylist == this.cid && this.player().type == 'mvp' ) {
			this.show();
		}
	},
	
	registerListeners: function() {
		var playlist = this;
		if ( this.container )
			this.container.observe('click', function() { playlist.show(); } );
			
		if ( this.config.onLoad ) {
			this.onLoad = function() {
				this.config.onLoad();
			}
		} else {
			this.onLoad = function() {
				this.showPlaylistItems();
			}
		}
	},
	
	loadItems: function() {
		if ( this.loading )
			return;
			
		if ( this.items.values().length > 0 || this.loaded ) {		
			this.onLoad();
			return;	
		}
		
		var playlist = this;
		this.loading = true;
		new Ajax.Request(this.getItemsURL(), {
			method: 'get',
			async: true,
			onSuccess: function( transport ) {
				var items = transport.responseJSON;
				playlist.registerItems( items );
				playlist.loading = false;
				playlist.loaded = true;
				//console.log("set playlist to loaded");
				playlist.onLoad();
			},
			onFailure: function() {
				playlist.player().createMessage('Could not load playlist.');
			}
		});
	},
	
	registerItems: function(items) {
		var playlist = this;
		items.each( function(item, i) {
			item.order = i;
			item.container = "magnify_widget_playlist_items_container";
			playlist.registerItem( item );
		});
		this.player().registeredPlaylists.set( this.cid, this );
	},
	
	registerItem: function(item) {
		if ( !this.items.get(item.cid) )
			this.items.set( item.cid, new MagnifyEmbeddablePlayer.Playlist.Item( this, item ) );	
	},
	
	// fixme:  something is wrong here in the interchange between multiple playlists in the MVP
	show: function() {
		
		if ( this.player().currentPlaylist && this.player().currentPlaylist.showing && (this.player().currentPlaylist.cid != this.cid) ) {
			this.player().currentPlaylist.hide();
		}
		
		if ( this.showing && (this.player().config.layout != 'compact') ) {
			this.hide();
		} else {
			this.scrollToPlaylist();
			if ( this.container ) {
				this.container.addClassName('magnify-widget-playlist-selected');
				this.container.removeClassName('magnify-widget-playlist');
			}
			this.loadItems();
			this.showing = true;
			this.player().lastPlaylist = this.player().currentPlaylist;
			this.player().currentPlaylist = this;
		}
	},
	
	hide: function() {	
		if ( this.showing ) {
			this.hidePlaylistItems();
			this.restorePlaylists();
			if ( this.container ) {
				this.container.addClassName('magnify-widget-playlist');
				this.container.removeClassName('magnify-widget-playlist-selected');
			}
			this.showing = false;
			this.player().lastPlaylist = this;
			this.player().currentPlaylist = undefined;
		}
	},
	
	showPlaylistItems: function() {
		var playlist = this;
		this.itemContainer = $(this.config.itemContainer);	
		
		if ( !this.htmlLoaded ) {
			this.itemContainer.firstDescendant().update();
			
			this.sortedItems().each( function(item, i) {
				// the sliding drawers need a nested div inside them
				playlist.itemContainer.firstDescendant().appendChild(item.html);
			});
			this.htmlLoaded = true;
		}
		
		this.itemContainer.addClassName("magnify-widget-playlist-items-container-selected");
		this.itemContainer.removeClassName("magnify-widget-playlist-items-container");
		new Effect.Appear( this.itemContainer.firstDescendant(), { duration: 0.3 } );
		
		if ( playlist.player().currentContentItem ) {
			var item = this.items.get(this.player().currentContentItem.cid);
			item.content.thumbnail.img.observe("load", function(evt) {
				this.makeSelected();
			}.bind(item));
		}	
		
		if ( this.sortedItems().length == 0 ) {
			this.itemContainer.firstDescendant().update('<div class="mvp-no-items-message">No items in this playlist.</div>');
		}
	},
	
	hidePlaylistItems: function() {
		this.itemContainer = $(this.config.itemContainer);
		
		this.itemContainer.removeClassName("magnify-widget-playlist-items-container-selected");
		this.itemContainer.addClassName("magnify-widget-playlist-items-container");
		new Effect.Fade( this.itemContainer.firstDescendant(), { duration: 0.3 } );
		if ( !this.player().config.layout == 'compact' )	
			new Effect.BlindUp( this.itemContainer, { duration: 0.3, queue: { position: 'front', scope: 'hide_playlist' }} );
		$('magnify_widget_playlists').style.height = "auto";
	},
	
	scrollToPlaylist: function() {
		if ( !this.container )
			return;
		
		if ( this.player().hidePlaylist )
			return;
			
		if ( this.player().config.layout == 'compact' )	
			return;
				
		try {	
			Position.prepare();	
			var itemLoc = this.container.positionedOffset()[1] - Position.realOffset(this.container)[1];
			var containerLoc = parseInt(this.container.parentNode.style.top);
			this.player().lastScrollDistance = (-1*containerLoc)-itemLoc;
			new Effect.Move(this.container.parentNode, {x: 0, y: this.player().lastScrollDistance, queue: { position: 'end', scope: 'show_playlist' } });
			
		} catch(e) { console.log(e.message); }
	},
	
	restorePlaylists: function() {
		new Effect.Move(this.container.parentNode, {x: 0, y: -1*this.player().lastScrollDistance, queue: { position: 'end', scope: 'hide_playlist' } });
		this.player().lastScrollDistance = 0;
	},
	
	getNextItem: function() {
		var items = this.sortedItems();
		var nextIndex = this.itemIndex != undefined ? Number(this.itemIndex+1) : 0;
		var nextItem = items[nextIndex];
		if ( nextItem ) {
			return nextItem;
		} else {
			if ( this.player().hidePlaylist ) {
				nextItem = items[0];
				return nextItem;
			}
		}
	},
	
	getItemsURL: function() {
		return "/services/json/playlist/" + this.cid;
	}
});


MagnifyEmbeddablePlayer.Playlist.Item = Class.create(MagnifyEmbeddablePlayer.Playlist, {
	initialize: function(playlist, config) {
		try {
			this.playlist = playlist;
			this.container = config.container;
			this.player = function() {
				return this.playlist.player();
			}
			
			this.cid = config.cid;
			this.id = "magnify_widget_playlist_item_" + this.cid;
			this.order = config.order;
			
			var content = config;
			content.container = 'magnify_video_player';
			content.width = this.playlist.player().config.player_width;
			content.height = this.playlist.player().config.player_height;
			content.autoplay = true;
			
			this.content = this.player().registerContent(content);
	
			this.buildItem();
		} catch(e) { console.log(e.message + " " + e.lineNumber); }
	},
	
	buildItem: function() {
		if ( !this.content )
			return;
			
		this.html = new Element('div');
		this.html.id = this.id;
		this.html.addClassName("magnify-widget-playlist-item");
		this.html.addClassName("magnify-clearfix");
		this.html.observe('click', function() { this.loadContent(); }.bind(this) );
				
		this.captionContainer = new Element('div');
		this.captionContainer.className = "magnify-widget-playlist-item-caption";
		
		
		this.captionTitle = new Element('div');
		this.captionTitle.className = "magnify-widget-playlist-item-caption-title";	
		
		var title = this.content.createTitle("playlist");
		if (title) {
			this.captionTitle.appendChild(title);
			this.captionContainer.appendChild(this.captionTitle);
		}
		
		var caption = this.content.createCaption();
		if ( caption )
			this.captionContainer.appendChild(caption);
		
		this.html.appendChild(this.content.createThumbnail());	
		this.html.appendChild(this.captionContainer);
	},
	
	loadContent: function() {
		this.makeSelected();
		this.playlist.player().registeredContent.get(this.cid).load();
	},
	
	makeSelected: function() {
		$$('.magnify-widget-playlist-item-selected').each( function(el) {
			el.removeClassName("magnify-widget-playlist-item-selected");
			el.addClassName("magnify-widget-playlist-item");
		});
		this.html.removeClassName("magnify-widget-playlist-item");
		this.html.addClassName("magnify-widget-playlist-item-selected");
		this.scrollIntoView();
		this.playlist.itemIndex = this.order;
	},
	
	scrollIntoView: function() {	
		if ( this.player().hidePlaylist )
			return;
			
		try {
			Position.prepare();
			var listContainer = this.html.parentNode.parentNode.parentNode;			
			var container_y = Position.cumulativeOffset(listContainer)[1];
			var element_y = Position.cumulativeOffset(this.html)[1];			
			new Effect.Scroll(listContainer.id, { x: 0, y: ( element_y - container_y ), mode: 'absolute', queue: { position: 'end', scope: 'scroller' } });
		} catch(e) { console.log(e.message); }
	}
});

MagnifyEmbeddablePlayer.Auth = Class.create(MagnifyEmbeddablePlayer, {
	initialize: function( player, config ) {
		this.player = function() {
			return player;
		}
	},
	
	loadLogin: function() {
		new Ajax.Updater('magnify_widget_playlist_item_login_content', this.getLoginURL(), {				
			evalScripts: true,
			method: "get",
			asynchronous: true
		});
	},
	
	showLogin: function() {
		this.delayedPanel = this.player().currentPanel;
		this.player().showPanel( undefined, 'login' );
	},
	
	cancelLogin: function() {
		$('submit_login_btn').src = '/decor/buttons/signin_small.gif';
		Effect.BlindUp('signup_section');
		$('mvp_login_mode').value = 'signup';
		$('mvp_login_title').innerHTML = "Sign In";
		
		if ( this.player().currentPanel )
			this.player().currentPanel.hidePanel();
		
		if ( this.delayedPanel )	
			this.delayedPanel.showPanel();
	},
	
	logIn: function(url, form, target) {
		new Ajax.Updater(target, this.player().toolRoot + url, {
			method: 'post', 
			parameters: Form.serialize( form ), 
			evalScripts: true
		});		
	},
	
	completeLogin: function() {
		this.player().loggedIn = 1;
		if ( this.player().delayedObject != undefined ) {
			this.player().saveObject(this.player().delayedObject[0], this.player().delayedObject[1], this.player().delayedObject[2]);
		}
		if ( this.player().reloadRequired ) {
			this.player().registrationRequired = false;
			this.player().reloadRequired = false;
			this.player().replay();
		}
		this.player().auth.cancelLogin();
	},
	
	resetPassword: function(url, email, target) {
		new Ajax.Updater(target, this.player().toolRoot + url, {
			method: 'get', 
			parameters: 'reset_password=1&email=' + email, 
			evalScripts: true
		});	
	},
	
	getLoginURL: function() {
		return this.player().toolRoot + "/login.minc?content_item_cid=" + this.player().currentContentItem.cid;
	},
	
	checkEmail: function(email) {
		new Ajax.Request( '/login/email?email=' + escape( email ), { 
			method: 'get',
			onSuccess: function( transport ) { 
				if ( transport.responseText.indexOf('Please') > -1 ) {
					$('submit_login_btn').className = 'mvp-register-button';
					Effect.BlindDown('signup_section');
					$('mvp_login_mode').value = 'register';
					$('mvp_login_title').innerHTML = "New User Registration";
					Element.hide('submit_button_reset');
				} else {
					$('submit_login_btn').className = 'mvp-signin-button';
					Effect.BlindUp('signup_section');
					$('mvp_login_mode').value = 'login';
					$('mvp_login_title').innerHTML = "Sign In";	
					Element.show('submit_button_reset');		
				}
			} 
		});
	}
});

MagnifyEmbeddablePlayer.Stats = Class.create(MagnifyEmbeddablePlayer, {
	initialize: function( player, config ) {
		this.player = function() {
			return player;
		}
	}
});

Effect.Scroll = Class.create();
Object.extend(Object.extend(Effect.Scroll.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'absolute'
    } , arguments[1] || {}  );
    this.start(options);
  },
  setup: function() {
    if (this.options.continuous && !this.element._ext ) {
      this.element.cleanWhitespace();
      this.element._ext=true;
      this.element.appendChild(this.element.firstChild);
    }

    this.originalLeft=this.element.scrollLeft;
    this.originalTop=this.element.scrollTop;

    if(this.options.mode == 'absolute') {
      this.options.x -= this.originalLeft;
      this.options.y -= this.originalTop;
    } else {

    }
  },
  update: function(position) {   
    this.element.scrollLeft = this.options.x * position + this.originalLeft;
    this.element.scrollTop  = this.options.y * position + this.originalTop;
  }
});


/*----Vertical layout resizing start----*/
jQuery(function(){
	 var $ = jQuery;
		config = {
			ar: 16/9,
			maxWidth : 580
		},
		dom = {
			mvw : $(".magnify-video-wrapper"),
			mvp : $(".magnify-video-playlist"),
			win : $(window)
		}

	var wWidth = dom.win.width(),
		wHeight = dom.win.height(),
		mvwWidth = dom.mvw.width(),
		mvpWidth = dom.mvp.width();
		
	if( wWidth < config.maxWidth && wWidth / wHeight < 1){
		var mvwHeightNew = ( mvwWidth / config.ar + 31);
		dom.mvw.height( mvwHeightNew );
		dom.mvp.height(wHeight - mvwHeightNew - 31 - 8*2);
	}
})
/*----Vertical layout resizing end----*/



