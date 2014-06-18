(function($,win){

	$.extend($.fn.fancybox.defaults, {
		padding: '0',
		easingIn : 'easeOutCubic',
		easingOut : 'easeOutCubic',
		overlayColor: '#000'
	});

    var ts = {
        init: function(){
            var self = this;
            // Setting Up Login Modal Fancy Box
            self.loginModalSetup();
            // Add class for browsers not supporting the pseudo :last class
            self.addClassFirstLast();
            // Validation
            $("form.validate").validate();
            // Post images fancybox
            $("a.fancybox").fancybox();
        },
        loginModalSetup : function(){
            // Since we know JS is enabled replace the login url so we can do a modal
            $('.login_modal_link').attr('href', '#fb-auth-login');
            $('.register_modal_link').attr('href', '#registration_modal');
            $('.registration_form_modal_link').attr('href', '#registration_form_modal');
            // Modal for logging in.
            if ($('a.login_modal_link').length ) {
                $("a.login_modal_link").fancybox({titleShow: false});
            }
            if ($('a.register_modal_link').length ) {
                $("a.register_modal_link").fancybox({titleShow: false});
            }
            if ($('a.registration_form_modal_link').length ) {
                $("a.registration_form_modal_link").fancybox({titleShow: false});
            }
        },
        addClassFirstLast : function(){
            $("ul > li:last-child").addClass("last");
            $("ul > li:first-child").addClass("first");
            $("ol > li:last-child").addClass("last");
            $("ol > li:first-child").addClass("first");
        }
    },

    tsNav = {

        init : function(){
            var self = this,
                nav = $('nav.main .menu-header-container');
            nav.find('.sub-menu .sub-menu').siblings('a').find('.nav_item').append($('<em>').text('>').addClass('sub-menu-arrow'));
            nav.find('.sub-menu').closest('.menu-item')
                .on('mouseenter', function(e){
                    $(this).children('.sub-menu').slideDown(400,'easeOutCubic')
                })
                .on('mouseleave',function(e){
                    $(this).children('.sub-menu').css({display:'none'});
                });

        }
    },

	tsNavSocial = {

		init : function(){
			var self = this,
				nav = $('nav.main'),
				timeout;
			nav.find('.social_icons iframe').last().addClass('last');
			nav.find('.social_icons')
				.on('mouseenter', function(e){
					if(timeout){
						clearTimeout(timeout);
					}
					$(this).children('.nav-social-submenu').slideDown(400,'easeOutCubic')
				})
				.on('mouseleave',function(e){
					var self = this;
					timeout = setTimeout(function(e){
						$(self).children('.nav-social-submenu').css({display:'none'});
					}, 300);
				});

		}
	},

	tsLinkTargets = {
		init : function(){
			$('a').each(function(index, element){
				var link = $(element),
					href = link.attr('href');
				if(href !== undefined && !link.attr('target') !== undefined){
					if(href.indexOf('http://') === 0){
						if(href.indexOf(window.location.hostname) === -1) {
							link.attr({target:'_blank'});
						}
					}
				}
			});
		}
	};
    
    $(function(){
        ts.init();
        tsNav.init();
		tsNavSocial.init();
	    tsLinkTargets.init();
    });
})(jQuery,window);

// Simple Validation
(function($) {

    $.fn.validate = function(args) {

        /* Load the default options. */
        var options = $.extend({},
            $.fn.validate.defaults, args);
        var jQ = jQuery;
        return this.each(function() {
            /***** Plugin Goes Here *********/
            jQ(this).submit(function() {
                jQ(this).find(".error").remove();
                var valid = true;

                jQ(this).find(".validate").each(function() {
                    el = jQ(this);
                    if (el.hasClass("valid-email")) {
                        if (!valid_email(el.val())) {
                            add_error(el, options.email_error_message);
                            valid = false;
                        }
                    }
                    if (el.hasClass("valid-required")) {
                        if (!valid_required(el.val())) {
                            add_error(el, options.required_error_message);
                            valid = false;
                        }
                    }
                });
                return valid;
            });

        });

    };

    function add_error(el, message) {
        el.parent().addClass("err");
        el.before("<span class='error'>" + message + "</span>");
    }

    function valid_email(email) {
        var email_pattern = /^([a-zA-Z0-9_\.\+\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (email.match(email_pattern)) return true;
        return false;
    };

    function valid_required(val) {
        if (val.length > 0) return true;
        return false;
    }

    $.fn.validate.defaults = {
        email_error_message: 'Please provide a valid email address.',
        required_error_message: 'Required field.'
    };


})(jQuery);

