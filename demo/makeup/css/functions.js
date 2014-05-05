(function ($) {
    jQuery(function ($) {

        if (jQuery('.register-page form').length) {

            jQuery('.register-page form .checkbox').checkbox();

            if (typeof LiveValidation != 'undefined') {
//            var reg_email = new LiveValidation('reg_email',{ onInvalid: function() { jQuery(this.element).parent().addClass('error'); }, onValid: function() { jQuery(this.element).parent().removeClass('error'); }, onlyOnBlur: true });
//            reg_email.add( Validate.Email, { insertAfterWhatNode: 'email_dummy' } );

                var reg_firstname = new LiveValidation(
                    'reg_firstname',
                    {
                        onInvalid: function () {
                            jQuery(this.element).parent().addClass('error');

                            // Hack for alignment issue
                            if (jQuery('#reg_firstname').val().length < 1) {
                                jQuery('#lbl_fname em').css({
                                    'color': 'red'
                                });

                                if (jQuery('#reg_lastname').val().length) {
                                    jQuery('#lbl_lname em').css({
                                        'color': 'white'
                                    });
                                }

                                jQuery('#lbl_lname em').css({
                                    'display': 'block'
                                });
                            }
                        },
                        onValid: function () {
//                    jQuery(this.element).parent().removeClass('error');
                            if (jQuery('#reg_firstname').val().length > 1) {
                                jQuery('#lbl_fname em').css({
                                    'color': 'white'
                                });
                            }

                        },
                        onlyOnBlur: true
                    }
                );

                reg_firstname.add(Validate.Presence);

                var reg_lastname = new LiveValidation(
                    'reg_lastname',
                    {
                        onInvalid: function () {
                            jQuery(this.element).parent().addClass('error');

                            // Hack for alignment issue
                            if (jQuery('#reg_firstname').val().length < 1) {
                                jQuery('#lbl_lname em').css({
                                    'color': 'red'
                                });

                                if (jQuery('#reg_firstname').val().length) {
                                    jQuery('#lbl_fname em').css({
                                        'color': 'white'
                                    });
                                }

                                jQuery('#lbl_fname em').css({
                                    'display': 'block'
                                });
                            }
                        },
                        onValid: function () {
//                    jQuery(this.element).parent().removeClass('error');
                            if (jQuery('#reg_lastname').val().length > 1) {
                                jQuery('#lbl_lname em').css({
                                    'color': 'white'
                                });
                            }
                        },
                        onlyOnBlur: true
                    }
                );

                reg_lastname.add(Validate.Presence);

                var reg_password = new LiveValidation('reg_password', { onInvalid: function () {
                    jQuery(this.element).parent().addClass('error');
                }, onValid: function () {
                    jQuery(this.element).parent().removeClass('error');
                }, onlyOnBlur: true });
                reg_password.add(Validate.Presence);
                reg_password.add(Validate.Length, { minimum: 5, maximum: 20 });

                var reg_confirm_password = new LiveValidation('reg_confirm_password', { onInvalid: function () {
                    jQuery(this.element).parent().addClass('error');
                }, onValid: function () {
                    jQuery(this.element).parent().removeClass('error');
                }, onlyOnBlur: true });
                reg_confirm_password.add(Validate.Confirmation, { match: 'reg_password' });
            }
        }

        // For any images that are larger than the container, resize them down to proper width
        function setCarouselImgWidth() {
            var colWidth = jQuery('.sidebar.right ul li.latest-products').width();
            jQuery('.sidebar.right ul li.latest-products .carousel img').each(function(ev) {
                if (this.width > colWidth) {
                    // Width is bigger than container, so resize
                    $(this).width(colWidth);
                }
            });
        }

        var $window = $(window);
        function setRightCommentLinkStyle() {
            var windowsize = $window.width();
            if (windowsize < 768) {
                if (jQuery('.right.cf.comments').length) {
                    if (!jQuery('.placeholder-clear').length) {
                        jQuery('.right.cf.comments').after('<div class="cf placeholder-clear"></div>');
                    }
                }
            } else {
                jQuery('.placeholder-clear').remove();
            }
        }

        // Execute on load
        setRightCommentLinkStyle();
        setCarouselImgWidth();

        // Bind event listener
        $(window).resize(jQuery.throttle(250, setRightCommentLinkStyle));
        $(window).resize(jQuery.throttle(250, setCarouselImgWidth));


        jQuery('div#pass').hide();
        jQuery('a.password_text').click(function () {
            jQuery("#reg_hidden").val("yes");
            jQuery('div#change_text').hide();
            jQuery('div#pass').show();
        });


//        jQuery( "#datepicker" ).datepicker({ minDate: "-100Y -00M -00D", maxDate: "0000Y 00M -00D",
//            changeMonth: true,
//            changeYear: true,
//            yearRange: 'c-100:c+100',
//            showOn: "button",
//            buttonImageOnly: false
//        });


        $('.form-submit input[type="submit"]').addClass('button');

        $('.welcomepopup .close').click(function () {
            $(this).parent().fadeOut(function () {
                $(this).remove();
            })
            return false;
        });

        setTimeout(function () {
            $('.welcomepopup').fadeOut(function () {
                $(this).remove();
            })
        }, 5000);

        $(document).on('click', '.wsl_connect_with_provider', function () {
            var _gaq = _gaq || [];
            _gaq.push(['_trackEvent', 'Registration', 'JoinWithFacebookClick']);
//			_trackEvent('Registration', 'JoinWithFacebookClick');
        });

        function is_mobile() {
            return (
                (navigator.platform.indexOf("iPhone") != -1) ||
                    (navigator.platform.indexOf("iPod") != -1) ||
                    (navigator.platform.indexOf("iPad") != -1) ||
                    (navigator.userAgent.indexOf("ZuneWP") != -1) ||
                    (navigator.userAgent.indexOf("Android") != -1)
                );
        }

        function replacePlaceholders() {
            if (!("placeholder" in document.createElement("input"))) {
                $("input[placeholder], textarea[placeholder]").each(function () {
                    var val = $(this).attr("placeholder");

                    if (this.value == "") this.value = val;

                    $(this).focus(function () {
                        if (this.value == val) this.value = "";
                    }).blur(function () {
                            if ($.trim(this.value) == "") this.value = val;
                        });
                });
            }
        };

        function customRadioCheck() {
            $('.custom-form-element input:checked').parent().addClass('checked');

            $('.custom-form-element').click(function (event) {
                var $this = $(this),
                    input = $this.find('input');

                if (event.target.tagName.toLowerCase() != 'a')
                    event.preventDefault();

                if ($this.hasClass('custom-checkbox')) {
                    // checkboxes
                    if (input.attr('checked') == 'checked') {
                        input.attr('checked', false).parent().removeClass('checked')
                    } else {
                        input.attr('checked', true).parent().addClass('checked')
                    }
                } else {
                    // radio buttons
                    var name = input.attr('name');

                    $('input[name="' + name + '"]').each(function () {
                        $(this).attr('checked', false).parent().removeClass('checked');
                    });

                    input.attr('checked', true).parent().addClass('checked');
                }

                input.trigger('change');
            });
        };

        var isMobile = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            },
            winWidth = $(window).width();

        replacePlaceholders();
        customRadioCheck();

        $('a[data-popup]').colorbox({
            opacity: .95
        });

        loadedPopupCount = 0;
        $(document).on('click', 'a[data-login-popup]', function () {
            $.ajax({
                url: $(this).attr('href'),
                data: {
                    crb_redirect: window.location.toString().split('#').shift()
                },
                success: function (data) {
                    id = 'loaded-popup-' + (loadedPopupCount++);
                    var $div = $('<div style="display:none" />');
                    $div.appendTo('body');
                    $('.popup', data).appendTo($div).attr('id', id);

                    $.colorbox({
                        href: '#' + id,
                        inline: true
                    });
                }
            })

            return false;
        });

        $(window)
            .on('load', function () {
                $('.js body').addClass('loaded');

                if ($('.latest-products').length) {
                    $('.latest-products .carousel ul').fadeIn().carouFredSel({
                        width: 300,
                        responsive: true,
                        align: 'left',
                        prev: '.latest-products .prev',
                        next: '.latest-products .next',
                        pagination: '.latest-products .nums',
                        scroll: {
                            duration: 700,
                            timeoutDuration: 700000,
                            fx: 'cover'
                        },
                        swipe: {
                            onTouch: true
                        }
                    });
                }

                if ($('.featured-posts').length) {
                    $('.featured-posts .carousel ul').fadeIn().carouFredSel({
                        width: 421,
                        height: 512,
                        align: 'left',
                        pagination: {
                            container: '.carousel-nav ul',
                            anchorBuilder: false
                        },
                        auto: 5000,
                        swipe: {
                            onTouch: true
                        }
                    });

                    $('.carousel-nav ul li').on('mouseenter', function (e) {
                        e.preventDefault();

                        var idx = $(this).data('index');

                        $('.featured-posts .carousel ul').trigger('slideTo', $('li[data-index="' + idx + '"]'));
                    });

                    $('.carousel-nav ul li a').on('click', function (e) {
                        document.location = e.target.href;
                    });
                }

                if ($('.twitter-feed').length) {
                    $('.twitter-feed .carousel ul').fadeIn().carouFredSel({
                        align: 'left',
                        auto: false,
                        items: 4,
                        prev: '.twitter-feed .prev',
                        next: '.twitter-feed .next',
                        scroll: {
                            items: 1
                        },
                        swipe: {
                            onTouch: true
                        }
                    });
                }

                // if($(window).width() >= 768) {
                // 	$('.article').each(function() {
                // 		var $self = $(this),
                // 			cnt = $self.find('.article-content'),
                // 			img = $self.find('.article-image');
                // 		if ( img.height() > cnt.height() ) {
                // 			cnt.height(img.height())
                // 		}
                // 	});
                // }

                // $('.dropright').each(function() {
                // 	var $self = $(this),
                // 		mom = $self.parent(),
                // 		momTop = mom.position().top,
                // 		dad = mom.parent(),
                // 		dadTop = dad.position().top,
                // 		height = dad.height();
                // 	$(this).css({
                // 		'height': height-30,
                // 		'top': -dadTop-momTop+25
                // 	});
                // });
            })
            .on('resize', function () {
                if ($(window).width() >= 768) {
                    $('.article').each(function () {
                        var $self = $(this),
                            cnt = $self.find('.article-content'),
                            img = $self.find('.article-image');
                        if (img.height() > cnt.height()) {
                            cnt.height(img.height())
                        }
                    });
                } else {
                    $('.article-content').css({ height: 'auto' });
                }
            })


        $('.comment-reply-link').click(function (e) {
            $('input#submit').val('Reply');
        });

        $('#cancel-comment-reply-link').click(function (e) {
            $('input#submit').val('Post Comment');
        });

        function setHeaderOnScroll() {
            var windowWidth = $(window).width(),
                scrollTop = $(window).scrollTop();
            if (scrollTop > 190) {
                $('body').addClass('small-header');
                if (windowWidth >= 600) {
                    $('.logo-row').show();
                }
            } else {
                $('body').removeClass('small-header');
                if (windowWidth >= 600) {
                    $('.logo-row').hide();
                }
            }
        }

        $(window).on('scroll', jQuery.throttle(50, setHeaderOnScroll));
        $(window).on('touchmove', jQuery.throttle(50, setHeaderOnScroll));

        $('.subscribe form').on('submit', function () {
            var $self = $(this),
                email = $self.find('.field').val(),
                error = $self.parent().find('.error-msg'),
                success = $self.parent().find('.success-msg');

            if (!mailValidation(email)) {
                $self.addClass('error');
                success.removeClass('visible');
                error.addClass('visible');
                return false;
            } else {
                // the form submit - ajax
                $.ajax({
                    url: '/newsletter-signup/',
                    type: $self.attr('method'),
                    data: $self.serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 'success') {
                            $self.removeClass('error');
                            error.removeClass('visible');
                            success.addClass('visible').find('.email').text(email);
                        } else {
                            $self.addClass('error');
                            success.removeClass('visible');
                            error.addClass('visible');
                            if (typeof data.msg != 'undefined') {
                                error.append('(' + data.msg + ')');
                            }
                            return false;
                        }
                    }
                })
            }

            return false;
        });

        $('.register-page form:not(.content.nofloat form)').on('submit', function () {
            var error = false;

            $(this).find('.required').each(function () {
                if ($(this).val() == '') {
                    error = true;
                    $(this).parent().addClass('error');
                } else {
                    $(this).parent().removeClass('field-error');
                }
            });

            $(this).find('.email').each(function () {
                var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

                if (!mailValidation($(this).val())) {
                    error = true;
                    $(this).parent().addClass('error');
                } else {
                    $(this).parent().removeClass('field-error');
                }
            });

            if (error) {
                return false;
            }
        });


        if (jQuery.cookie('visit_count') == null) {
            jQuery.cookie('visit_count', 1, { offset: 30 });
        } else {
            var visit_count = parseFloat(jQuery.cookie('visit_count')) + 1;
            jQuery.cookie('visit_count', visit_count);
        }

        if (jQuery.cookie('visit_count') == 3 && !(phpdata.wp_user_logged_in == '1')) {
            $('.bottom-bar').removeClass('hidden');
        }

        $('.bottom-bar').on('click', '.close', function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                data: {
                    'set-banner-cookie': true
                }
            });

            $('.bottom-bar').addClass('hidden');
        });

        $('.comments .reply').click(function (e) {
            e.preventDefault();

            var form = $(this).parent().next('form');

            form.stop(true, true).slideToggle(300);
        });

        $('#colorbox').on('click', '.thumbs-slider li a', function (e) {
            e.preventDefault();

            var $video = $('<iframe width="420" height="315" frameborder="0" allowfullscreen></iframe>'),
                vid_link = $(this).attr('href'),
                vid_title = $(this).attr('data-title');

            vid_link = vid_link.replace('https://', 'http://').replace('www.', '').replace('youtube.com/watch?v=', 'youtube.com/embed/');

            $video.attr('src', vid_link + '?autoplay=1&amp;wmode=transparent');

            $('.video-box').html('').append($video);

            $('.video-title').text(vid_title);
        });

        $('html').on('click', function (e) {
            if ($('.menu-mobile').is(':visible') && $('.wrapper').hasClass('show-nav') && !$(e.target).hasClass('menu-mobile') && !$(e.target).parents('.master-header').length) {
                e.preventDefault();
                $('.wrapper').toggleClass('show-nav');
            }
        });

        $('.menu-mobile').on('click', function (e) {
            e.preventDefault();

            $('.wrapper').toggleClass('show-nav');
            if (!Modernizr.csstransitions) {
                $('.mobile-only, .master-header').each(function () {
                    if ($(this).hasClass("show-nav")) {
                        $(this).removeClass("show-nav");
                    } else {
                        $(this).addClass("show-nav");
                    }
                });

            }

        });

        if ($(window).width() > 768) {
            $('html').addClass('desktop');
        }

        if (is_mobile() && window.screen.width < 1025) {
            var viewport = document.createElement('meta');

            viewport.name = 'viewport';
            viewport.content = 'width=device-width, minimum-scale=1, maximum-scale=1';

            $('head').append(viewport);
        }
    }).on('cbox_complete', function (e) {
            $('#colorbox a[data-popup]').colorbox({
                opacity: .95
            });

            $('.login-popup form').on('submit', function (e) {
                var error = false;

                $(this).find('.required').each(function () {
                    if ($(this).val() == '') {
                        error = true;
                        $(this).parent().addClass('error');
                    } else {
                        error = false
                        $(this).parent().removeClass('field-error');
                    }
                });

                $(this).find('.email').each(function () {
                    var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

                    if (!mailValidation($(this).val())) {
                        error = true;
                        $(this).parent().addClass('error');
                    } else {
                        error = false
                        $(this).parent().removeClass('field-error');
                    }
                });

                if (error) {
                    return false;
                }
            });

            $('.forgot-popup form').on('submit', function (e) {
                var $form = $(this);
                e.preventDefault();

                if ($(this).find('.email').val() == '') {
                    $('.forgot-popup').addClass('error');
                } else {
                    $.ajax({
                        url: $form.attr('action'),
                        type: 'post',
                        data: $form.serialize(),
                        success: function (data) {
                            id = 'loaded-popup-' + (loadedPopupCount++);
                            var $div = $('<div style="display:none" />');
                            if ($(data).find('.popup').size()) {
                                $div.appendTo('body').append($('.popup', data));
                            } else {
                                $div.appendTo('body').html(data);
                            }
                            $div.children().attr('id', id)

                            $.colorbox({
                                href: '#' + id,
                                inline: true,
                                opacity: .95
                            });
                        }
                    });
                }
            });

            if ($('#colorbox .thumbs-slider').length) {
                $('.thumbs-slider .container ul').carouFredSel({
                    width: 810,
                    height: 110,
                    align: 'center',
                    auto: false,
                    items: 4,
                    prev: '.thumbs-slider .prev',
                    next: '.thumbs-slider .next',
                    scroll: {
                        items: 1
                    },
                    swipe: {
                        onTouch: true
                    }
                });

                var $video = $('<iframe width="420" height="315" frameborder="0" allowfullscreen></iframe>'),
                    vid_link = $.colorbox.element().attr('data-video');

                vid_link = vid_link.replace('https://', 'http://').replace('www.', '').replace('youtube.com/watch?v=', 'youtube.com/embed/');

                $video.attr('src', vid_link + '?autoplay=1&amp;wmode=transparent').appendTo('.video-box');
            }

            $('.show-nav').removeClass('show-nav');


        })

    function mailValidation(email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if (emailReg.test(email) && email.length != 0) {
            return true;
        } else {
            return false;
        }
    };

    function loadPins() {
        (function (d) {
            var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
            p.type = 'text/javascript';
            p.async = true;
            p.src = '//assets.pinterest.com/js/pinit.js';
            f.parentNode.insertBefore(p, f);
        }(document));
    }

    $(window).bind("load", function () {
        var pin_button = $('#pin-button').html();

        $('.post-content img.alignnone, .post-content img.aligncenter').each(function () {
            var src = $(this).attr('src');
            $(this).after(pin_button.replace('|IMGURL|', encodeURI(src)));
        });

        loadPins();
    });
})(jQuery);
