(function($){
	$(function(){
		var	main = $('#content_main'),
			content = main.find('.the_content'),
			wrap = $('.social-group'),
			topwrap = $('.social-group-top'),
			more = wrap.find('.more.share_link'),
			icon = more.find('.social_icon_large'),
			submenu = wrap.find('.social-submenu'),
			facebook = main.find('.facebook.share_link'),
			tumblr = main.find('.tumblr.share_link'),
			top = screen.height/2 - 135,
			left = screen.width/2 - 250;

		if(content.height() > 500){
			topwrap.show();
		}

		facebook
			.click(function(e){
				e.preventDefault();
				window.open(this.href,'','width=500,height=270,top='+top+',left='+left);
			});

		tumblr
			.click(function(e){
				e.preventDefault();
				window.open(this.href,'','toolbar=0,resizable=0,status=1,width=450,height=430,top='+top+',left='+left);
			});

		more
			.click(function(){
				submenu
					.css({overflow:'hidden'})
					.toggleClass('clicked')
					.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function() {
						if (submenu.height()>0){
							submenu.css({overflow:'visible'});
						}
					});
				icon.toggleClass('clicked');
			});
	});
})(jQuery);