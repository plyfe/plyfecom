(function($){
	$(function(){
		var pos = 600,
			bottom,
			scroll;
		setTimeout(function() {
			if (!(typeof _gaq_uid === 'undefined')){
				_gaq.push(['_setAccount', _gaq_uid]);
			}
			_gaq.push(['_setCustomVar',3,'ReaderType','Reader',3]);
			_gaq.push(['_trackPageview']);}, 30000 );
		$(window).scroll(function () {
			if (!(scroll == 'scrolled') && $(this).scrollTop() > 0){
				if (!(typeof _gaq_uid === 'undefined')){
					_gaq.push(['_setAccount', _gaq_uid]);
				}
				_gaq.push(['_trackEvent','Page Scroll','Page Scroll: Scrolled',window.location.pathname]);
				scroll = 'scrolled';
			}

			if (($(this).scrollTop() - pos) >= 500){
				pos = Math.floor($(this).scrollTop()/500)*500+100;
				if (!(typeof _gaq_uid === 'undefined')){
					_gaq.push(['_setAccount', _gaq_uid]);
				}
				_gaq.push(['_trackEvent','Page Scroll','Page Scroll: ' + pos + ' bucket',window.location.pathname]);
			}

			if(!(bottom == 'bottom') && $(window).scrollTop() + $(window).height() == $(document).height()) {
				if (!(typeof _gaq_uid === 'undefined')){
					_gaq.push(['_setAccount', _gaq_uid]);
				}
				_gaq.push(['_trackEvent','Page Scroll','Page Scroll: Bottom',window.location.pathname]);
				bottom = 'bottom';
			}
		});
	});
})(jQuery);