(function($){
	var body = $('body'),
		dl = $("#dynamic-lead").filter(".image-text-overlay,.image-text-under"),
		fullDl = $('#full-dynamic-lead'),
		dlWidth = dl.width(),
		nav = dl.find('nav'),
		touchDevice = false,
		playedOnce = false,
		gaPrimaryAccount = '',
		gaCategory = 'dl-video',
		dim = {
			standard: { w: dlWidth, h: dl.height() },
			video: { w: dlWidth, h: Math.round(dlWidth*9/16) }
		},
		easing = ('undefined' != typeof($.easing['easeOutCubic'])) ? 'easeOutCubic' : easing;


	var dlVideo = {
		init: function () {
			var _self = this;
			_self.isTouch();
			_self.bindEvents();
			dl.find('.thumb img').load(function(e){
				$(e.target).closest('article').find('.play-button').addClass('show');
			});
		},
		isTouch: function () {
			if (('ontouchstart' in window) ||
				(navigator.maxTouchPoints > 0) ||
				(navigator.msMaxTouchPoints > 0)) {
					touchDevice = true;
			}
		},
		isVideoHub: function () {
			return body.hasClass('video-hub');
		},
		isIE: function () {
			var div = document.createElement('div');
			div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
			return (div.getElementsByTagName('i').length === 1);
		},
		isLoaded: function (el, cb) {
			el.load(cb());
		},
		routeClick: function (el) {
			var article = el.closest('article'),
				isVideo = article.hasClass('video');
			if(!isVideo) {
				window.location.href = article.find('.thumb').attr('href');
			} else return;
		},
		resizeDL: function (el) {
			var _self = this;

			if(body.hasClass('dl-video-playing')) {
				ytPlayer.hideVideoPlayer();
				dl.animate({'height': dim.standard.h+'px'}, {
					'duration'	: 500,
					'queue'		: false,
					'easing'	: easing,
					'complete'	: function() {
						dl.find('article').find('.thumb img, .play-button').fadeIn();
						body.removeClass('dl-video-playing');
						nav.find('.play').trigger('click');
					}
				});
			} else {
				var article = el.closest('article'),
					headerHeight = article.find('header').height();

				body.addClass('dl-video-playing');
				dl.find('article').find('.thumb img, .play-button').fadeOut();
				dl.animate({'height': dim.video.h+headerHeight+'px'}, {
					'duration'	: 500,
					'queue'		: false,
					'easing'	: easing,
					'complete'	: function() {
						ytPlayer.init();
					}
				});
			}
		},
		getCurrentHeader: function() {
			var current = dl.find('article').eq(0);
			return current.find('.thumb').attr('title');
		},
		bindEvents: function () {
			var _self = this;

			dl
				.on('click.dlClick','.thumb',function(e){
					var el = $(e.target);
					e.preventDefault();
					_self.routeClick(el);
				})
				.on('click','.play-button', function(e){
					var el = $(e.target);
					e.preventDefault();
					dl.find('nav .pause').trigger('click');
					ytPlayer.videoId = el.closest('article').attr('data-video-id');
					_self.resizeDL(el);
				});
		}
	};

	var preloadYouTube = {
		init: function() {
			var _self = this;
			_self.loadYouTubeApi();
			_self.addTarget();
		},
		loadYouTubeApi: function() {
			if(typeof YT === 'undefined') {
				var tag = document.createElement('script'),
					firstScriptTag = document.getElementsByTagName('script')[0];
				tag.src = "https://www.youtube.com/iframe_api";
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}
		},
		addTarget: function() {
			var closeBtn = $('<div></div>', {'class': 'close-button'}),
				videoWrapper = $('<div></div>', {'id': 'video-wrapper'})
					.append($('<div></div>', {'id': 'youtube-player'}));
			dl.append(closeBtn, videoWrapper);
		}
	};

	var ytPlayer = {
		player: null,
		loaded: false,
		videoId: '',
		init: function() {
			var _self = this;
			if(!_self.loaded) {
				_self.onYouTubeIframeAPIReady();
				_self.bindEvents();
				_self.loaded = true;
			} else {
				//second video load
				dl.addClass('loading');
				ytPlayer.showVideoPlayer();
				_self.loadVideoById(_self.videoId);
			}
		},
		onYouTubeIframeAPIReady: function() {
			ytPlayer.player = new YT.Player('youtube-player', {
				videoId: ytPlayer.videoId,
				height: dim.video.h,
				width: dim.video.w,
				playerVars: {
					'autoplay': (!touchDevice) ? 1 : 0,
					'controls': 1,
					'color': 'white',
					'rel': 0,
					'showinfo': 0,
					'iv_load_policy': 1,
					'theme': 'dark',
					'wmode': "opaque"
				},
				events: {
					'onReady': ytPlayer.onPlayerReady,
					//'onPlaybackQualityChange': ytPlayer.onPlayerPlaybackQualityChange,
					'onStateChange': ytPlayer.onPlayerStateChange
					//'onError': ytPlayer.onPlayerError
				}
			});
		},
		onPlayerReady: function(event) {
			//event.target.setPlaybackQuality('hd720');
			ytPlayer.showVideoPlayer();
		},
		onPlayerStateChange: function(event) {
			switch(event.data) {
				case YT.PlayerState.ENDED:
					dl.find('.close-button').trigger('click');
					gaTracker.track(gaPrimaryAccount, gaCategory, 'ended', dlVideo.getCurrentHeader());
					break;

				case YT.PlayerState.PLAYING:
					dl.removeClass('loading');
					if(touchDevice) playedOnce = true;
					gaTracker.track(gaPrimaryAccount, gaCategory, 'playing', dlVideo.getCurrentHeader());
					break;

				case YT.PlayerState.CUED:
					//future
					break;
			}
		},
		showVideoPlayer: function () {
			if(touchDevice) $('#video-wrapper').removeClass('not-in-focus');
			$('#video-wrapper').addClass('show');
		},
		hideVideoPlayer: function () {
			$('#video-wrapper').removeClass('show');
			if(touchDevice) $('#video-wrapper').addClass('not-in-focus');
		},
		playVideo: function() {
			ytPlayer.player.playVideo();
		},
		pauseVideo: function() {
			ytPlayer.player.pauseVideo();
		},
		stopVideo: function() {
			ytPlayer.player.stopVideo();
		},
		loadVideoById: function(id) {
			if(touchDevice && !playedOnce) {
				dl.removeClass('loading');
				ytPlayer.player.cueVideoById({ 'videoId': id });
			} else {
				ytPlayer.player.loadVideoById({ 'videoId': id });
			}
		},
		onPlayerError: function(event) {
			console.log('error: ',event.data);
		},
		bindEvents: function() {
			dl.find('.close-button').on('click', function() {
				ytPlayer.pauseVideo();
				dlVideo.resizeDL();
			});
		}
	};

	var gaTracker = {
		init: function() {
			var _self = this;
			_self.getAccount();
		},
		getAccount: function() {
			if(typeof window.TSM !== undefined) {
				try {
					gaPrimaryAccount = window.TSM.ga.accounts[0];
				}
				catch(err){
					throw 'primary google analytics account not found';
				}
			}
		},
		track: function(account, category, event, label) {
			if( _gaq !== undefined && gaPrimaryAccount !== ''){
				_gaq.push(
					[ '_setAccount', account ],
					[
						'_trackEvent',
						category,
						event,
						label
					]
				);
			}
		}
	};

	$(document).ready(function(){
		if (dlVideo.isIE()) body.addClass('ieLegacy');

		if (!fullDl.length > 0 && dl.length > 0 && !dlVideo.isVideoHub()) {
			dlVideo.init();
			preloadYouTube.init();
			gaTracker.init();
		}
	});


})(jQuery);