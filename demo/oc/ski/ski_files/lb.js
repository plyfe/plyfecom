var upward = 0;
var downward = 0;
var leftward = 0;
var rightward = 0;
var lrwidth = 0;
var udwidth = 0;
var lrslide = 0;
var udslide = 0;
var menuwrap = 0;
var nav = 0;
var scale = 0;

if (screen.width > screen.height) {
	lrwidth = 1024;
	lrslide = 710;
	udwidth = 768;
	udslide = 700;
	menuwrap = 374;
	nav = 274;
	if (screen.width < 1024) {
		scale = screen.width / 1024;
    }
	else {
		scale = 1.0;
    }
}
else {
	lrwidth = 1024;
	lrslide = 710;
	udwidth = 768;
	udslide = 700;
	menuwrap = 374;
	nav = 274;
	if (screen.width < 768) {
		scale = screen.width / 768;
	}
    else {
		scale = 1.0;
	}
}
if (navigator.platform == 'iPad' || navigator.platform == 'iPod' || navigator.platform == 'iPhone') {
    upward = 0;
    downward = 180;
    leftward = 90;
    rightward = -90;
}
else if (navigator.platform.indexOf('Linux') != -1) {
    if (((orientation == 90 || orientation == -90) && screen.width < screen.height) || ((orientation == 0 || orientation == 180) && screen.width > screen.height)) {
        upward = 90;
        downward = -90;
        leftward = 0;
        rightward = 180;
    }
    else {
        upward = 0;
        downward = 180;
        leftward = 90;
        rightward = -90;
    }
}
else {
    $(document).ready(function () {

        // specific for OC
        $('.page_title_h1').hide();
        if ($('.lookbook1').eq(0).attr('rel')) {
            var Products = $('.lookbook1').eq(0).attr('rel');

            //console.log('Products for current slide:' + Products);
            $.get('/ocsearch.asp?mode=ajax&cat=women&productid=' + Products, function (html) {
                $('.productgrid').html(html);
                InitQuickView();
            });
            //$('.productgrid').html('')
            $('.productgrid').css({ display: 'block', margin: '-130px 0 0 0' });
            InitQuickView();
        }


        // end specific to OC



        $('#nav').hide();
        //$('#menuwrap').hide();
        //$('body').css('width', lrwidth + 'px');
        //$('html').css('width', lrwidth + 'px');
        $('#rootslideshow').css('margin-left', '0');
        $('#rootslideshow').css('margin-right', '0');
        //$('#rootslideshow').css('margin-top', '35px');
        $('.slide img').each(function () {
            $(this).css('max-height', lrslide + 'px');
            $(this).css('max-width', lrslide + 'px');
        });
        $('#rootslideshow').css('height', lrslide + 'px');
        $('#rootslideshow').css('width', lrslide + 'px');
        $('.slide').css('height', lrslide + 'px');
        $('.slide').css('width', lrslide + 'px');
        try {
            if ($.browser.safari) {
                viewport = document.querySelector("meta[name=viewport]");
                viewport.setAttribute('content', 'width=' + lrwidth + '; initial-scale=' + scale + '; maximum-scale=' + scale + '; user-scalable=0;');
            }
        }
        catch (e) {
        }
    });
}
if ($.browser.safari || upward != 0 || leftward != 0) {
    window.addEventListener('orientationchange', handleOrientation, false);
}
function handleOrientation() {
    if (upward != 0 || leftward != 0) {
        if (orientation == leftward) {
            //portraitMode, do your stuff here
            $('#nav').hide();
            $('#menuwrap').show();
            $('body').css('width', lrwidth + 'px');
            $('html').css('width', lrwidth + 'px');
            $('#rootslideshow').css('margin-left', '0');
            $('#rootslideshow').css('margin-right', '0');
            $('#rootslideshow').css('margin-top', '35px');
            $('.slide img').each(function () {
                $(this).css('max-height', lrslide + 'px');
                $(this).css('max-width', lrslide + 'px');
            });
            $('#rootslideshow').css('height', lrslide + 'px');
            $('#rootslideshow').css('width', lrslide + 'px');
            $('.slide').css('height', lrslide + 'px');
            $('.slide').css('width', lrslide + 'px');
            viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute('content', 'width=' + lrwidth + '; initial-scale=' + scale + '; maximum-scale=' + scale + '; user-scalable=0;');
            if ($('#boxyslideshow')) {
                $('.close').click();
                $('.fullscreen').click();
            }
        }
        else if (orientation == upward) {
            //landscapeMode
            $('#nav').show();
            $('#menuwrap').hide();
            $('body').css('width', udwidth + 'px');
            $('html').css('width', udwidth + 'px');
            $('#rootslideshow').css('margin-left', 'auto');
            $('#rootslideshow').css('margin-right', 'auto');
            $('#rootslideshow').css('margin-top', '0');
            $('.slide img').each(function () {
                $(this).css('max-height', udslide + 'px');
                $(this).css('max-width', udslide + 'px');
            });
            $('#rootslideshow').css('height', udslide + 'px');
            $('#rootslideshow').css('width', udslide + 'px');
            $('.slide').css('height', udslide + 'px');
            $('.slide').css('width', udslide + 'px');
            viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute('content', 'width=' + udwidth + '; initial-scale=' + scale + '; maximum-scale=' + scale + '; user-scalable=0;');
            if ($('#boxyslideshow')) {
                $('.close').click();
                $('.fullscreen').click();
            }
        }
        else if (orientation == downward) {
            //landscapeMode
            $('#nav').show();
            $('#menuwrap').hide();
            $('body').css('width', udwidth + 'px');
            $('html').css('width', udwidth + 'px');
            $('#rootslideshow').css('margin-left', 'auto');
            $('#rootslideshow').css('margin-right', 'auto');
            $('#rootslideshow').css('margin-top', '0');
            $('.slide img').each(function () {
                $(this).css('max-height', udslide + 'px');
                $(this).css('max-width', udslide + 'px');
            });
            $('#rootslideshow').css('height', udslide + 'px');
            $('#rootslideshow').css('width', udslide + 'px');
            $('.slide').css('height', udslide + 'px');
            $('.slide').css('width', udslide + 'px');
            viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute('content', 'width=' + udwidth + '; initial-scale=' + scale + '; maximum-scale=' + scale + '; user-scalable=0;');
            if ($('#boxyslideshow')) {
                $('.close').click();
                $('.fullscreen').click();
            }
        }
        else if (orientation == rightward) {
            //portraitMode
            $('#nav').hide();
            $('#menuwrap').show();
            $('body').css('width', lrwidth + 'px');
            $('html').css('width', lrwidth + 'px');
            $('#rootslideshow').css('margin-left', '0');
            $('#rootslideshow').css('margin-right', '0');
            $('#rootslideshow').css('margin-top', '35px');
            $('.slide img').each(function () {
                $(this).css('max-height', lrslide + 'px');
                $(this).css('max-width', lrslide + 'px');
            });
            $('#rootslideshow').css('height', lrslide + 'px');
            $('#rootslideshow').css('width', lrslide + 'px');
            $('.slide').css('height', lrslide + 'px');
            $('.slide').css('width', lrslide + 'px');
            viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute('content', 'width=' + lrwidth + '; initial-scale=' + scale + '; maximum-scale=' + scale + '; user-scalable=0;');
            if ($('#boxyslideshow')) {
                $('.close').click();
                $('.fullscreen').click();
            }
        }
        else {
        }
    }
}
$(document).ready(function () {
    //console.log('lookbook code starting up...');
    $('#nav').css('height', nav);
    $('#menuwrap').css('width', menuwrap);
    $('#nav').css('width', udwidth);
    $('#menuwrap').css('height', udwidth - 100);
    if (screen.width < 1024 && screen.height < 1024) {
        $('.logo img').each(function () {
            $(this).css('width', '133px');
        });
        $('body').css('font-size', '7px');
        $('.menu').css('line-height', '17px');
    }
    if (upward != 0 || leftward != 0) {
        if (orientation == leftward || orientation == rightward) {
            $('#nav').hide();
            $('body').css('width', lrwidth + 'px');
            $('html').css('width', lrwidth + 'px');
            $('#rootslideshow').css('margin-left', '0');
            $('#rootslideshow').css('margin-right', '0');
            $('#rootslideshow').css('margin-top', '35px');
            $('.slide img').each(function () {
                $(this).css('max-height', lrslide + 'px');
                $(this).css('max-width', lrslide + 'px');
            });
            $('#rootslideshow').css('height', lrslide + 'px');
            $('#rootslideshow').css('width', lrslide + 'px');
            $('.slide').css('height', lrslide + 'px');
            $('.slide').css('width', lrslide + 'px');
            viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute('content', 'width=' + lrwidth + '; initial-scale=' + scale + '; maximum-scale=' + scale + '; user-scalable=0;');
        }
        else {
            $('#menuwrap').hide();
            $('body').css('width', udwidth + 'px');
            $('html').css('width', udwidth + 'px');
            $('#rootslideshow').css('margin-left', 'auto');
            $('#rootslideshow').css('margin-right', 'auto');
            $('#rootslideshow').css('margin-top', '0');
            $('.slide img').each(function () {
                $(this).css('max-height', udslide + 'px');
                $(this).css('max-width', udslide + 'px');
            });
            $('#rootslideshow').css('height', udslide + 'px');
            $('#rootslideshow').css('width', udslide + 'px');
            $('.slide').css('height', udslide + 'px');
            $('.slide').css('width', udslide + 'px');
            viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute('content', 'width=' + udwidth + '; initial-scale=' + scale + '; maximum-scale=' + scale + '; user-scalable=0;');
        }
    }
    $('#nav a, #menuwrap a').click(function () {
        $('#box' + $(this).attr('href')).click();
        return false;
    });

    $('.sub').each(function () {
        var theref = $(this).attr('id');
        //console.log('here: ' + theref);
        $(this).cycle({
            fx: 'scrollHorz',
            speed: 1000,
            timeout: 0,
            next: '.next',
            prev: '.prev',
            pager: '.menu' + theref,
            pagerAnchorBuilder: function (idx, slide) {
            	$('.prev').hide();
                $('.counter' + theref).val(parseInt($('.counter' + theref).val()) + 1);
                return '<img class="boxnav slideshow' + idx + '" style="height:20px;width:20px;margin:10px;" src=/mlnapp/img/black_back_90opaque.png />';
            },
            before: function (current, next, opt, fofl) {
                if ($(next).parent().attr('id') == $('.last').attr('ref')) {
                    $('.fullscreen').attr('ref', $(next).attr('id'));
                }
                //console.log(opt);
                //console.log(opt.nextSlide);
                //console.log(opt.currSlide);
                //console.log(opt.slideCount);
                if (opt.nextSlide == 0)
                	$('.prev').hide();
                else
                	$('.prev').show();
                //if (opt.nextSlide == opt.slideCount - 1)
                //	$('.next').hide();
                //else
                //	$('.next').show();
            },
            after: function (current, next, opt, fofl) {
                if ($(next).attr('rel')) {
                    var Products = $(next).attr('rel');

                    //console.log('Products for current slide:' + Products);
                    $.get('/ocsearch.asp?mode=ajax&cat=women&productid=' + Products, function (html) {
                        $('.productgrid').html(html);
                        InitQuickView();
                    });
                    //$('.productgrid').html('')
                    $('.productgrid').css({ display: 'block', margin: '-130px 0 0 0' });
                    InitQuickView();
                }
                else {
                    $('.productgrid').html('');
                    InitQuickView();
                }
            }
        });
    });
    var touchlocationX = 0;
    var touchlocationY = 0;
    var touchlocationX2 = 0;
    var touchlocationY2 = 0;
    window.ontouchmove = function (e) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            var node = touch.target; // Find the node the drag started from
            //alert($(node).parent().parent().parent().attr('id') + ',' + $(node).parent().parent().attr('id') + ',' + $(node).parent().parent().attr('class') + ',' + $(node).parent().attr('class'));
            if ($(node).parent().parent().parent().attr('id') == 'rootslideshow' || $(node).parent().parent().attr('id') == 'rootslideshow' || $(node).parent().parent().attr('class') == 'boxyslideshow' || $(node).parent().attr('class') == 'boxy-inner') {
                if (touchlocationY != 0 || touchlocationX != 0) {
                    touchlocationX2 = touchlocationX;
                    touchlocationY2 = touchlocationY;
                }
                touchlocationX = touch.clientX;
                touchlocationY = touch.clientY;
                e.preventDefault();
            }
        }
    }
    window.ontouchend = function (e) {
        if (touchlocationX2 < touchlocationX - 5) {
            $('#prev').click();
        }
        else if (touchlocationX2 > touchlocationX + 5) {
            $('#next').click();
        }
        if (touchlocationY2 < touchlocationY - 5) {
            $('#rootslideshow').cycle('prev');
        }
        else if (touchlocationY2 > touchlocationY + 5) {
            $('#rootslideshow').cycle('next');
        }
        touchlocationX = 0;
        touchlocationY = 0;
        touchlocationX2 = 0;
        touchlocationY2 = 0;
    }
    $('#rootslideshow').cycle({
        fx: 'scrollVert',
        speed: 1000,
        timeout: 0,
        pager: '.menu',
        pagerAnchorBuilder: function (idx, slide) {
        	$('.prev').hide();
        	if ($(slide).attr('ref') == undefined)
                return '<li style="margin-bottom:0;"><a href="#" id="slideshow' + idx + '"></a></li>';
            else
                return '<li><a href="#" id="slideshow' + idx + '">' + $(slide).attr('ref') + '</a></li>';
        },
        before: function (current, next, opt, fofl) {
            $(next).cycle(0);
            $(next).cycle(0);
            $('.submenu').hide();
            $('.menu' + $(next).attr('id')).show();
            $('.first').attr('ref', $(next).attr('id'));
            $('.last').attr('ref', $(next).attr('id'));
            $('.fullscreen').attr('ref', $(next).attr('id') + '-1');

            if (opt.nextSlide == 0)
            	$('.prev').hide();
            else
            	$('.prev').show();
        },
        after: function (current, next, opt, fofl) {
        }
    });
    $('.first').click(function () {
        $('#' + $(this).attr('ref')).cycle(0);
    });

    $('.last').click(function () {
        $('#' + $(this).attr('ref')).cycle(parseInt($('.counter' + $(this).attr('ref')).val()) - 1);
    });
    $('.fullscreen').click(function () {
        //console.log('starting up fullscreen....');
        if (upward != 0 || leftward != 0) {
            if (orientation == leftward || orientation == rightward) {
                var boxydiv = '<div><div class="close close-boxy" style="position:absolute;top:10px;right:80px;z-index:100;"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/OC753_webeditorial_exit.png" alt="" /></div><div class="boxyslideshow" style="width:1024px;height:668px;">' + $('#' + $(this).attr('ref')).parent().html() + '</div><a class="prev" href="#"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/fs_larrow.png" alt="" class="lbrollover" /></a> <a class="next" href="#"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/fs_rarrow.png" alt="" class="lbrollover" /></a></div>';
                new Boxy(boxydiv, { modal: true, unloadOnHide: true });
                $('.boxywrapper').css('top', '0px');
                $('.boxyslideshow img').each(function () {
                    $(this).css('max-width', '1024px').css('max-height', '668px').attr('src', $(this).attr('src').replace('reg', 'fs').replace('/OC753_webeditorial_title_finalb.jpg', '/OC753_webeditorial_fs_ipadtitle_final.jpg'));
                });
                $('.boxyslideshow .slide').each(function () {
                    $(this).css('width', '1024px').css('height', '668px');
                });
                $(".boxy-modal-blackout").click(function () {
                    $(".close").click();
                });
                $('.boxyslideshow').cycle({
                    fx: 'scrollHorz',
                    speed: 1000,
                    timeout: 0,
                    next: '.next',
                    prev: '.prev',
                    pagerAnchorBuilder: function (idx, slide) {
                    	$('.prev').hide();
                    },
                   	before: function (current, next, opt, fofl) {
                    	if (opt.nextSlide == 0)
                    		$('.prev').hide();
                    	else
                    		$('.prev').show();
                    }
                });
            }
            else {
                var boxydiv = '<div><div class="close close-boxy" style="position:absolute;top:10px;right:80px;z-index:100;"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/OC753_webeditorial_exit.png" alt="" /></div><div class="boxyslideshow" style="width:768px;height:924px;">' + $('#' + $(this).attr('ref')).parent().html() + '</div><a class="prev" href="#"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/fs_larrow.png" alt="" class="lbrollover" /></a> <a class="next" href="#"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/fs_rarrow.png" alt="" class="lbrollover" /></a></div>';
                new Boxy(boxydiv, { modal: true, unloadOnHide: true });
                $('.boxywrapper').css('top', '0px');
                $('.boxyslideshow img').each(function () {
                    $(this).css('max-width', '768px').css('max-height', '924px').attr('src', $(this).attr('src').replace('reg', 'fs').replace('/OC753_webeditorial_title_finalb.jpg', '/OC753_webeditorial_fs_ipadtitle_final.jpg'));
                });
                $('.boxyslideshow .slide').each(function () {
                    $(this).css('width', '768px').css('height', '924px');
                });
                $(".boxy-modal-blackout").click(function () {
                    $(".close").click();
                });
                $('.boxyslideshow').cycle({
                    fx: 'scrollHorz',
                    speed: 1000,
                    timeout: 0,
                    next: '.next',
                    prev: '.prev',
                    pagerAnchorBuilder: function (idx, slide) {
                    	$('.prev').hide();
                    },
                    before: function (current, next, opt, fofl) {
                    	if (opt.nextSlide == 0)
                    		$('.prev').hide();
                    	else
                    		$('.prev').show();
                    }
                });
            }
        }
        else {
            var theheight = parseInt(screen.height);
            var boxydiv = '<div><div class="close close-boxy" style="position:absolute;top:5px;right:65px;z-index:100;opacity:1"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/OC753_webeditorial_exit.png" alt="" /></div><div class="boxyslideshow" style="margin-top:25px;width:' + 1024 + 'px;height:' + 768 + 'px;">' + $('#' + $(this).attr('ref')).parent().html() + '</div><a class="prev" href="#"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/fs_larrow.png" alt="" class="lbrollover" /></a> <a class="next" href="#"><img src="http://a2.ocimage.us/userfiles/image/editorial/2012-05/fs/fs_rarrow.png" alt="" class="lbrollover" /></a></div>';
            new Boxy(boxydiv, { unloadOnHide: true, center: false, modal: true });
            $('.boxyslideshow img').each(function () {
                $(this).css('max-width', 1024 + 'px').css('max-height', 768 + 'px').attr('src', $(this).attr('src').replace('reg', 'fs'));
            });
            $('.boxyslideshow .slide').each(function () {
                $(this).css('width', 1024 + 'px').css('height', 768 + 'px');
            });
            $(".boxy-modal-blackout").click(function () {
                $(".close").click();
            });
            $('.boxyslideshow').cycle({
                fx: 'scrollHorz',
                speed: 1000,
                timeout: 0,
                next: '.next',
                prev: '.prev',
                pagerAnchorBuilder: function (idx, slide) {
                	$('.prev').hide();
                },
                before: function (current, next, opt, fofl) {
                	if (opt.nextSlide == 0)
                		$('.prev').hide();
                	else
                		$('.prev').show();
                }
            });
        }
        $('.boxyslideshow').cycle(parseInt($(this).attr('ref').substring($(this).attr('ref').indexOf('-') + 1)) - 1);
    });
    if (window.location.hash && window.location.hash.length > 1) {
        $('.sub').each(function () {
            $(this).cycle(parseInt(window.location.hash.substring(1)));
        });
    }
});