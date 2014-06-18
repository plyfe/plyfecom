(function($){
	var gaPrimaryAccount = '',
		social_wrap = $('#social_overlay_fancybox'),
		form = social_wrap.find('form'),
		wrapper = social_wrap.find('.logo_wrap'),
		link = wrapper.find('.site_logo_link'),
		social_data = social_wrap.data(),
		wrapper_data = wrapper.data(),
		button = social_wrap.find('.button'),
		register = social_wrap.find('.default-button a'),
		borders = social_wrap.find('.wrapper'),
		fb_wrap = social_wrap.find('.facebook_wrap'),
		newsletter = social_wrap.find('.newsletter_wrap'),
		clicked = 0;

	var overlay = {
		init: function(){
			var _self = this;
			if (_self.getCookie('social-overlay')==''){
				_self.setCookie('social-overlay',window.location.pathname);
			}
			else if(!(_self.getCookie('social-overlay') == 'completed') && !(_self.getCookie('social-overlay') == window.location.pathname)){
				_self.setCookie('social-overlay','completed',1000);
				_self.showOverlay();
			}
		},
		showOverlay: function(){
			if (social_wrap.length && (fb_wrap.length || newsletter.length)) {
				if (link.length){
					link.removeAttr('href');
				}
				$('<a>')
					.attr({href:'#social_overlay_fancybox'})
					.fancybox({
						padding: '15',
						width: '300',
						scrolling: 'no',
						showCloseButton	 : true,
						easingIn : 'easeOutCubic',
						easingOut : 'easeOutCubic',
						overlayShow: true,
						overlayOpacity: 0.75,
						hideOnOverlayClick: true,
						enableEscapeButton: true,
						onClosed: function(){
							if (!(clicked > 0) && !(newsletter.find('span').hasClass('completed'))){
								gaTracker.track(gaPrimaryAccount, 'overlay','closed','social-overlay');
							}
						}
					})
					.trigger('click');
			}
			social_wrap.closest('#fancybox-content').css('backgroundColor', '#f8f8f8');
			social_wrap.closest('#fancybox-content').css('-webkit-backface-visibility', 'hidden');
			form.submit(function(){
				overlay.setCookie('social-overlay','clicked');
			});
			$.each(social_data,function(key, value){
				if (key == 'color'){
					borders.find('span').css(key, value);
				}
				if (key == 'backgroundColor'){
					social_wrap.closest('#fancybox-content').css('backgroundColor', value);
					social_wrap.closest('#fancybox-content').css('border-color', value);
				}
			});
			$.each(wrapper_data,function(key, value){
				if (key == 'button'){
					button.css('background-color', value);
					register.css('background-color', value);
				}
				if (key == 'buttonFont'){
					button.css('color', value);
					register.css('color', value);
				}
				if (key == 'divider'){
					borders.css('border-top-color', value)
				}
			});
			if (typeof FB != 'undefined'){
				FB.Event.subscribe('edge.create',function(){
					clicked++;
					if (newsletter.hasClass('hidden')){
						newsletter.removeClass('hidden');
					}
					gaTracker.track(gaPrimaryAccount, 'overlay','facebook','social-overlay');
				});
			}
			if (newsletter.find('span').hasClass('completed')){
				clicked++;
				gaTracker.track(gaPrimaryAccount, 'overlay','newsletter','social-overlay');
			}
		},
		setCookie: function(cname,cvalue,exdays){
			var expires = '';
			if (typeof exdays !== 'undefined'){
				var d = new Date();
				d.setTime(d.getTime()+(exdays*24*60*60*1000));
				expires = " expires="+d.toGMTString() + ';';
			}
			document.cookie = cname + "=" + cvalue + ";" + expires + " path=/";
		},
		getCookie: function(cname){
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++)
			{
				var c = $.trim(ca[i]);
				if (c.indexOf(name)==0) return c.substring(name.length,c.length);
			}
			return "";
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
		gaTracker.init();
		overlay.init();
	});
})(jQuery);