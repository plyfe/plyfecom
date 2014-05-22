/*facebook extra script*/

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=223927854332438";
	fjs.parentNode.insertBefore(js, fjs);	
}(document, 'script', 'facebook-jssdk'));

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (!d.getElementById(id)) {
		js = d.createElement(s);
		js.id = id;
		js.src = "https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
}(document,"script","twitter-wjs"));

BURN.feeds = {
	feed_limits : {
		'twitter' : 3,
		'flickr'  : 6,
		'youtube' : 6,
		'vimeo'   : 6
	},
	/* REFRESH THE TAGCLOUD IF NECESSARY */
	tagcloud_refresh : function(feed, date){
		$j.getJSON(
			BURN.ajax_url,{
				action: 'refresh_feed',
				feed: feed,
				date: date,
				security: BURN.nonces['refresh_feed']
			},function(results){
				if(results === -1) return false; //security check fail
				
				if(results.success === true && results.updated === true){
					$j('.widget.widget_burntagcloud .tagcloud').replaceWith(results.html);
				}
			}
		);
	},
	/* TWITTER FEED */
	load_twitter : function(feed){
		$j.getJSON(
			BURN.ajax_url,
			{
				action: 'load_feed',
				type: feed,
				limit: BURN.feeds.feed_limits.twitter,
				security: BURN.nonces['load_feed']
			},
			function(data){  
				if(!data.tweets || data === -1 || !data.tweets[0]){ return false; }
				
				BURN.feeds.tagcloud_refresh(feed, data.tweets[0].created_at);
								
				$j.each(data.tweets, function(i, tweet){
					var urli = '';
					if(tweet.urls[0] != undefined){
						urli = tweet.urls[0];
					}
					
					/* if no JSON url found but found url in the text message*/
					if(urli == '' && tweet.text.indexOf("http://") >= 0 ){
						urli = tweet.text.substring(tweet.text.indexOf("http:"),5435);						
					}
					
					/* shorten text if need - removing link */
					if(tweet.text.indexOf("http://") >= 0){						
						tweet.text = tweet.text.substring(0, tweet.text.indexOf("http:"));											
					}		
					
					var item = 
						'<div class="feeds" id="feed_no' + i + '">' +
							'<span>' + tweet.text + '<br />' +
								'<a href="' + urli + '" target="_blank">' + urli +'</a>' +
							'</span>' +
							'<ul>' + 
								'<li id="tw_feed_when">' + tweet.created_at.substring(0,16) + '</li>' +
								'<li id="tw_feed_reply"><a href="https://twitter.com/intent/tweet?in_reply_to=' + tweet.id_str + '" target="_blank">reply</a></li>' +
								'<li id="tw_feed_retweet"><a href="https://twitter.com/intent/retweet?tweet_id=' + tweet.id_str + '"&original_referer=" target="_blank">retweet</a></li>' + 
							'</ul>' +
						'</div>';
					$j('#burn_feeds_content').append(item).sidebarSize();
				});
			}
		);
	},
	/* FACEBOOK FEED */ 
	load_facebook : function(){	
		$j('#burn_feeds_content').append('<div class="fb-like-box" data-href="https://www.facebook.com/BurnEnergy" data-width="292" data-height="330" data-show-faces="false" data-stream="true" data-header="false"></div>');
		FB.XFBML.parse(document.getElementById("burn_feeds_content"),function(){
			$j('#burn_feeds_content').sidebarSize();
		});
	},
	/* FLICKR FEED */
	load_flickr : function(){
		$j.getJSON(
			'https://secure.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&jsoncallback=?&id=49512693@N03',
			function(data){
				if(!data.items){ return false; }
				
				var image_data = "", 
					limit =  BURN.feeds.feed_limits.flickr;
				BURN.feeds.tagcloud_refresh('flickr', data.items[0].published);				
				$j.each(data.items.slice(0, limit), function(i, flickr){
					var getImageItem = function(item) {
						var style = "";
						if (limit == 9) {
							if ((i+1) % 3 != 0) {
								style = "style='margin-right:3px;'";
							}
						}
						if (limit == 6) {
							if(i % 2 == 0) {
								style = "style='margin-right:3px;'";
							}
						}
						return '<div class="feed-tile" ' + style + ' ><a href="' + item.link + '" target="_blank"><img src="' + item.media.m + '" width="91" height="84"></a></div>';
					};					
					image_data += getImageItem(flickr);					
				});	
				$j('#burn_feeds_content').append('<div class="feed-block">' + image_data + '</div>').sidebarSize();
			}
		);
	},
	/* YOUTUBE FEED */
	load_youtube : function(){
		$j.getJSON(
			'https://gdata.youtube.com/feeds/api/users/burn/uploads?alt=json&callback=?&start-index=1&max-results=' + BURN.feeds.feed_limits.youtube,
			function(data){
				if(!data.feed || !data.feed.entry){ return false; }
				
				var image_data = "",
					limit = BURN.feeds.feed_limits.youtube;
				BURN.feeds.tagcloud_refresh('youtube', data.feed.entry[0].published.$t);
				$j.each(data.feed.entry.slice(0, limit), function(i, item){
					var getImageItem = function(item) {
						var thumbnail = (item.media$group.media$thumbnail.length > 2) ? item.media$group.media$thumbnail[1].url : item.media$group.media$thumbnail[0].url,
							video_url = item.media$group.media$player[0].url,
							video_title = item.media$group.media$title.$t,
							style = "";
						if (limit == 9) {
							if ((i+1) % 3 != 0) {
								style = "style='margin-right:3px;'";
							}
						}
						if (limit == 6) {
							if(i % 2 == 0) {
								style = "style='margin-right:3px;'";
							}
						}
						return '<div class="feed-tile" ' + style + ' ><a href="' + video_url + '" target="_blank"><img src="' + thumbnail + '" width="91" height="84" title="' + video_title + '"></a></div>';
					};					
					image_data += getImageItem(item);
				});
				$j('#burn_feeds_content').append('<div class="feed-block">' + image_data + '</div>').sidebarSize();
			}
		);
	},
	/* VIMEO FEED */
	load_vimeo : function(){
		$j.getJSON(
			'https://vimeo.com/api/v2/burn/videos.json?callback=?',
			function(data) {  
				var image_data = "",
					limit = BURN.feeds.feed_limits.vimeo;	
				BURN.feeds.tagcloud_refresh('vimeo', data[0].upload_date);
				$j.each(data.slice(0, limit), function(i, item){
					var getImageItem = function(item) {
						var thumbnail = item.thumbnail_small,
							video_url = item.url,
							video_title = item.title,
							style = "";
						if (limit == 9) {
							if ((i+1) % 3 != 0) {
								style = "style='margin-right:3px;'";
							}
						}
						if (limit == 6) {
							if(i % 2 == 0) {
								style = "style='margin-right:3px;'";
							}
						}
						return '<div class="feed-tile" ' + style + ' ><a href="' + video_url + '" target="_blank"><img src="' + thumbnail + '" width="91" height="84" title="' + video_title + '"></a></div>';
					};
					image_data += getImageItem(item);
				});
				$j('#burn_feeds_content').append('<div class="feed-block">' + image_data + '</div>').sidebarSize();					
			}
		);
	}
};

$j.fn.HasScrollBar = function() {
	var _elm = $j(this)[0];
	var _hasScrollBar = false; 
	if ((_elm.clientHeight < _elm.scrollHeight) || (_elm.clientWidth < _elm.scrollWidth)) {
		_hasScrollBar = true;
	}
	return _hasScrollBar;
};

window.fbAsyncInit = function() {
	FB.Event.subscribe("comment.create", function(response) {$j(this).popupSize();});
};

$j(document).ready(function(){
	$j('.burn_feeds_menu ul li').click(function(){		
		var $this = $j(this),
			feed = $this.attr('feed'),
			type = $this.attr('type');
		
		$j('.burn_feeds_menu ul li').removeClass('selected');		
		$this.addClass('selected');		
		$j('#burn_feeds_content').empty();
		$j('#feedinfotext p:first-child').text(type + ' feed');
		switch(feed){
			case 'facebook': 
				if (window.location == window.top.location) BURN.feeds.load_facebook(); 
				break;
			case 'twitter':
			case 'twitter-studios': 
				BURN.feeds.load_twitter(feed); break;
			case 'flickr':
			case 'youtube':	
			case 'vimeo':	
				window.location == window.top.location ? BURN.feeds.feed_limits[feed] = 9 : BURN.feeds.feed_limits[feed] = 6; 
				BURN.feeds["load_" + feed](); 
				break;
		}
	});
	
	if (window.location != window.top.location) {
		$j(".facebook_icon").hide(); 
	}
	
	/*main action on pageload*/
	/*
	if(BURN.site === 'burn-studios'){
		BURN.feeds.load_twitter('twitter-studios');
	} else {
		BURN.feeds.load_twitter('twitter');
	}
	*/
	BURN.feeds.load_twitter('twitter');
});