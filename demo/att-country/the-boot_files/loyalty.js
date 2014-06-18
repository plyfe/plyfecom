(function($){
	$('form.multiple_choice').delegate('input','change',
		function(){
			$(this).parents('form.multiple_choice').find('input[type=radio]').each(function(){
				if($(this).attr('checked')=='checked'){
					$(this).siblings('em').css({display:'block'});
				}else{
					$(this).siblings('em').css({display:'none'});
				}
			});
		}
	)

    if (jQuery('a.inline_additional_user_fields').length ) {
        jQuery('a.inline_additional_user_fields').fancybox(
            {
                titleShow: false,
                overlayShow: true,
                showCloseButton: true,
                hideOnOverlayClick: true,
                padding: '0',
                autoDimensions: true,
                scrolling: 'auto',
                easingIn : 'easeOutCubic',
                easingOut : 'easeOutCubic'
            }
        );
    }
})(jQuery);