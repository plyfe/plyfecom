$(document).ready(function () {

    //search area in masthead area
    $('.searchText').hover(function () {
        $('.searchText').css('cursor', 'text');
    });

    $('.searchText').click(function () {
        $('.searchText').hide();
        $('.searchInput').show();
        $('.searchBtn').css('padding-top', '10px');
        $('#txtKeyword').focus();

    });

    $('#join_list').click(function () {
        if ($(this).val() == 'Email') {
            $(this).val('');
        }
    });
    $('#join_list').change(function () {
        if ($(this).val() == '') {
            $(this).val('Email');
        }
    });

    $('#emailListBtn').click(function () {
        $.ajax({
            url: '/email.asp',
            data: 'Email=' + $('#join_list').val() + '&Action=Join',
            type: 'get',
            dataType: 'text',
            success: function (message) {
                alert(message);
                return false;
            }
        });
        return false;
    });


    //submitbutton
    $('.submitbutton').click(function () {
        $(this).parents('form').submit()
    });
    //backbutton
    $('.backbutton').click(function () {
        history.back();
    });

    if (window.location.protocol == "https:") {
        $('#totesp').load('https://www.openingceremony.us/do.asp?action=lblitems');
    } else {
        $('#totesp').load('/do.asp?action=lblitems');
    }

    $('#btnJoin').click(function () {
        var joinEmail = $('#join_list').val();
        $.post("email.asp", { email: joinEmail, Action: 'Join' }, function (result) {
            alert(result);
        });
    });

    //slideshow
    try {
        $('.slideshow br').remove();
        $('.slideshow').cycle({});

    } catch (err) { }

    Initslideshow2();

    var dwellTime = $('.splashcanvas').attr('rel');

    $('.splashcanvas').cycle({ next: '.splashnext', prev: '.splashprev', fx: 'scrollLeft', timeout: dwellTime });


    //home and blog sidebar slideshow
    $('.sideStaffPicks').cycle({
        speed: 600,
        fx: 'scrollHorz',
        timeout: 0,
        next: '.hm_side_next',
        prev: '.hm_side_prev',

    });

    $('#logo a img').hover(function () {
        $(this).attr('src', $(this).attr('src').replace(/\_front2.jpg/, '_back2.jpg'));
    },
     function () {
         $(this).attr('src', $(this).attr('src').replace(/\_back2.jpg/, '_front2.jpg'));
     });
    console.log(document.URL);
    //homepage New and Now masonry section
    if (document.URL != 'http://openingceremony.us/' && document.URL != 'http://openingceremony.us/default.asp' && document.URL != 'http://openingceremony.us/?qs=error' && document.URL != 'http://openingceremony.us/?pagenotfound' && document.URL != 'http://www.openingceremony.us/' && document.URL != 'http://www.openingceremony.us/default.asp' && document.URL != 'http://www.openingceremony.us/?qs=error' && document.URL != 'http://www.openingceremony.us/?pagenotfound' && document.URL != 'https://www.openingceremony.us/' && document.URL != 'https://www.openingceremony.us/default.asp' && document.URL != 'https://www.openingceremony.us/?qs=error' && document.URL != 'https://www.openingceremony.us/?pagenotfound') {
        initHomeMasonry();
    } else {
        $('.lishop').addClass('show');
        $('.shop_subNav').show();
    }
    if ($('#related_Products').length != 0) {
        var Products = $('#related_Products').html();
        $.get('/Ajax_ocx.aspx?Action=featured&cat=' + $('#menuType').val() + '&groupid=' + $.trim(Products) + '&featured=true', function (html) {
            $('#related_Products').html('<ul style="margin:0 0 0 -17px;">' + html + '</ul>');
            $('.relatedproduct').hover(function () { $(this).children('.relatedProductText').fadeIn('fast'); }, function () { $(this).children('.relatedProductText').fadeOut('fast'); });
            $('.relatedProductText').click(function () {
                //console.log($(this).attr('rel'));
                window.location.href = $(this).attr('rel');
            });

        });
        $('#related_Products').css('display', 'block').css('width', '839px');
    }

    //fashion forcast slideshow
	var inners = $('.forecastSlideshow').cycle().cycle('stop');
	
	var slideshow = $('#forecastSlideshowArea').cycle({
        fx: 'scrollHorz',
        speed: 300,
        timeout: 0,
        pager: '#forecastPager',
	    pagerAnchorBuilder: function(idx, slide) {
           	 // return sel string for existing anchor
            	return '#forecastPager li:eq(' + (idx) + ') a';
        	},
        before: function() {
            // stop all inner slideshows
            inners.cycle('stop');
            
            // start the new slide's slideshow
            $(this).cycle({
                fx: 'scrollHorz',
                timeout: 0,
                autostop: true,
                end: function() {
                    // when inner slideshow ends, advance the outer slideshow
                    slideshow.cycle('#forecastPager');
                }
            });
        }
    });
    
    //fashion forcast dynamically pull in temperature
    $.simpleWeather({
    zipcode: '',
    woeid: '', 
    location: 'NewYork, NY',
    unit: 'f',
    success: function(weather) {
      html = '<span>'+weather.temp+'&deg;'+weather.units.temp+'</span>';
       
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
  
  $.simpleWeather({
    zipcode: '',
    woeid: '', 
    location: 'Los Angeles, CA',
    unit: 'f',
    success: function(weather) {
      html = '<span>'+weather.temp+'&deg;'+weather.units.temp+'</span>';
        				
      $("#weather2").html(html);
    },
    error: function(error) {
      $("#weather2").html('<p>'+error+'</p>');
    }
  });
  
  $.simpleWeather({
    zipcode: '',
    woeid: '', 
    location: 'Tokyo, Japan',
    unit: 'f',
    success: function(weather) {
      html = '<span>'+weather.temp+'&deg;'+weather.units.temp+'</span>';
       
      $("#weather3").html(html);
    },
    error: function(error) {
      $("#weather3").html('<p>'+error+'</p>');
    }
  });
  
  $.simpleWeather({
    zipcode: '',
    woeid: '', 
    location: 'London, England',
    unit: 'f',
    success: function(weather) {
      html = '<span>'+weather.temp+'&deg;'+weather.units.temp+'</span>';
       
      $("#weather4").html(html);
    },
    error: function(error) {
      $("#weather4").html('<p>'+error+'</p>');
    }
  });
	
    //Dynamic Blog content
    if ($('#related_Products_Blog').length != 0) {
        var Products = $('#related_Products_Blog').html();
        $.get('/Ajax_ocx.aspx?Action=featured&cat=' + $('#menuType').val() + '&groupid=' + $.trim(Products) + '&featured=blog', function (html) {
            $('#related_Products_Blog').html(html);
            $('.relatedproduct').hover(function () { $(this).children('.relatedProductText').fadeIn('fast'); }, function () { $(this).children('.relatedProductText').fadeOut('fast'); });
            $('.relatedProductText').click(function () {
                window.location.href = $(this).attr('rel');
            });

        });
        $('#related_Products').css('display', 'block').css('height', '297px');
    }
    if ($('#related_posts').length != 0) {
        var pageids = $('#related_posts').html();
        $.get('/Ajax_ocx.aspx?Action=blog&pageids=' + $.trim(pageids) + '&mode=blogpage', function (html) {
            $('#related_posts').html(html);
            //$('.relatedProductText').click(function () {
            //    window.location.href = $(this).attr('rel');
            //});

        });
        $('#related_posts').css('display', 'block');
    }
    $('.blogSidebarMore').hover(function () {
        $(this).css('background', '#000');
        $(this).children().css('color', '#fff');
    }, function () {
        $(this).css('background', '#fff');
        $(this).children().css('color', '#000');
    });

    //
    $('.hm_reel_time_left').each(function () {
        if ($(this).html().indexOf('[ShowBlog_') > -1) {
            var rows, cols, pageids, keys, thisSpan
            thisSpan = $(this);
            keys = $(this).html().substring($(this).html().indexOf('[ShowBlog_') + '[ShowBlog_'.length);
            keys = keys.substring(0, keys.indexOf(']'));
            pageids = keys;
            $.get('/Ajax_ocx.aspx?Action=blog&pageids=' + pageids + '&mode=homepage', function (html) {
                $('.hm_reel_time_left').html(html);
                $('.hm_reel_time_left').removeClass('dontshow');
                $('.home_blogLink').hover(function () {
                    $(this).children('.blogTitleHover').fadeIn('fast');
                }, function () {
                    $(this).children('.blogTitleHover').fadeOut('fast');
                });

                $('.home_blogLinkrev').hover(function () {
                    $(this).children('.blogTitleHover').fadeOut('fast');
                }, function () {
                    $(this).children('.blogTitleHover').fadeIn('fast');
                });

                $('.home_blogLink').hover(function () {
                    $(this).children('.blogTitleHoverFull').fadeIn('fast');
                }, function () {
                    $(this).children('.blogTitleHoverFull').fadeOut('fast');
                });

                $('.home_blogLinkrev').hover(function () {
                    $(this).children('.blogTitleHoverFull').fadeOut('fast');
                }, function () {
                    $(this).children('.blogTitleHoverFull').fadeIn('fast');
                });
                $('.blogTitleHoverFull').click(function () {
                    window.location.href = $(this).attr('rel');
                });
                $('.blogTitleHover').click(function () {
                    window.location.href = $(this).attr('rel');
                });

            });
        }
    });

    InitZoom();

    //Top navigation this needs work...
    $('.shop').hover(function () {
        $('.blog_subNav').hide();
        $('.shop_subNav').hide();
        $('.about_subNav').hide();
        $('.shop_subNav').show();
    }, function () {
        $('.shop_subNav').hover(function () {
            //leave shop_subNav open...
        }, function () {
            $('.shop_subNav').hide();
            $('.blog_subNav').hide();
            $('.about_subNav').hide();
            $('.show ul').show();
        });
    });
    $('.blog').hover(function () {
        $('.shop_subNav').hide();
        $('.blog_subNav').hide();
        $('.about_subNav').hide();
        $('.blog_subNav').show();
    }, function () {
        $('.blog_subNav').hover(function () {
            //leave .blog_subNav open...
        }, function () {
            $('.shop_subNav').hide();
            $('.blog_subNav').hide();
            $('.about_subNav').hide();
            $('.show ul').show();
        });
    });
    $('.liabout').hover(function () {
        $('.shop_subNav').hide();
        $('.blog_subNav').hide();
        $('.about_subNav').hide();
        $('.about_subNav').show();
    }, function () {
        $('.about_subNav').hover(function () {
            //leave .blog_subNav open...
        }, function () {
            $('.shop_subNav').hide();
            $('.blog_subNav').hide();
            $('.about_subNav').hide();
            $('.show ul').show();
        });
    });

    //$('.shop').hover(function () {
    //    $('.blog_subNav').hide();
    //    $('.shop_subNav').hide();
    //    $('.shop_subNav').show();
    //}, function () {
    //    console.log('here');
    //});
    //$('.blog').hover(function () {
    //    $('.shop_subNav').hide();
    //    $('.blog_subNav').hide();
    //    $('.blog_subNav').show();
    //});

    //$('.about').hover(function () {
    //    $('.shop_subNav').hide();
    //    $('.blog_subNav').hide();
    //});


    //bloglanding
    $('.blogImg').click(function () {
        window.location.href = $(this).attr('rel');
    });
    $('.blogCategory').click(function () {
        window.location.href = $(this).attr('rel');
    });

    //ppdetails
    $('.ibtnproductdescription').click(function () {
        $('.product_detail').attr('class', 'product_detail');
        $('.product_detail').addClass('product_detail1');
        $('.prodct_detail_header div').each(function () {
            $(this).removeClass('selected_product_header');
        });
        $(this).addClass('selected_product_header');
        $('.plproducttab').hide();

        $('.plproductdescription').show()
    });

    $('.ibtnproductdetails').click(function () {
        $('.product_detail').attr('class', 'product_detail');
        $('.product_detail').addClass('product_detail2');
        $('.prodct_detail_header div').each(function () {
            $(this).removeClass('selected_product_header');
        });
        $(this).addClass('selected_product_header');
        $('.plproducttab').hide();

        $('.plproductdetails').show();
    });
    $('.ibtnproductdesigner').click(function () {
        $('.product_detail').attr('class', 'product_detail');
        $('.product_detail').addClass('product_detail3');
        $('.prodct_detail_header div').each(function () {
            $(this).removeClass('selected_product_header');
        });
        $(this).addClass('selected_product_header');
        $('.plproducttab').hide();

        $('.plproducttab_designer').show();
    });

    $('.plproducts li').each(function () {
        if ($(this).attr('class') == '') { $(this).remove(); }
    });


    $(window).ready(function () {//make more dynamic when blog, editorial, etc are done.
        if ($('.sideImg').attr('id') == 'instafeed') {

            if (window.location.pathname == '/entry.asp') {
                var feed = new Instafeed({
                    get: 'user',
                    userId: 21922111,
                    accessToken: '21922111.2c1bae6.6127c517fea44366ac855d39432a1629',
                    clientId: '2c1bae615e6f45588e42249ac232fcb2',
                    thumbnail: 'low_resolution',
                    limit: '1',
                    sortBy: 'most-recent',
                    links: 'true',
                    template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a><div class="sideTitleBar"><div class="sideInstaLikes">&hearts; {{likes}} LIKES<span class="sideInstaIcon"><img src="/images/ocx/images/homepage/instaIcon.png" alt="" /></span></div>'
                });

            } else {
                var feed = new Instafeed({
                    get: 'user',
                    userId: 21922111,
                    accessToken: '21922111.2c1bae6.6127c517fea44366ac855d39432a1629',
                    clientId: '2c1bae615e6f45588e42249ac232fcb2',
                    thumbnail: 'low_resolution',
                    limit: '1',
                    sortBy: 'most-recent',
                    links: 'true',
                    template: '<a href="{{link}}" target="_blank"><img style="margin-top:-20px;" src="{{image}}" /></a><div class="sideTitleBar"><div class="sideInstaLikes">&hearts; {{likes}} LIKES<span class="sideInstaIcon"><img src="/images/ocx/images/homepage/instaIcon.png" alt="" /></span></div>'
                });
            }
            feed.run();

        }

        //view as options	
        $('#view1').click(function () {
            $('#viewasSlideshow').hide();
            $('#viewasGrid').show();

        });

        $('#view2').click(function () {
            $('#viewasGrid').hide();
            $('#viewasSlideshow').show();

        });

        //homepage slideshow
        $('.hm_cycle-slideshow').cycle({
            speed: 600,
            fx: 'scrollHorz',
            timeout: 0,
            next: '.hm_next',
            prev: '.hm_prev',

        });
    });
    //blog sidebar show 10 entries at a time
    $('.blogSidebox:lt(10)').show();

    //$('.lishop, .liblog, .about_subNav').removeClass('active');
    if ($('.shop_subNav').children().hasClass('active')) {
        $('.lishop').addClass('active');
    }
    if ($('.blog_subNav').children().hasClass('active')) {
        $('.liblog').addClass('active');
    }
    if ($('.about_subNav').children().hasClass('active')) {
        $('.liabout').addClass('active');
    }

    if ($('.lishop').hasClass('active')) {
        $('.shop_subNav').show();
    }

    if ($('.liblog').hasClass('active')) {
        $('.blog_subNav').show();
    }

    if ($('.liabout').hasClass('active')) {
        $('.about_subNav').show();
    }

    //blog related posts hover overlay
    $('.relatedproduct').hover(function () {
        $(this).children('.relatedProductText').fadeIn('fast');
    }, function () {
        $(this).children('.relatedProductText').fadeOut('fast');
    });

    $('.relatedproductrev').hover(function () {
        $(this).children('.relatedProductText').fadeOut('fast');
    }, function () {
        $(this).children('.relatedProductText').fadeIn('fast');
    });

    $('.blogSidebox ').hover(function () {
        $(this).find('.blogSideboxLeft').css('opacity', '0.6');
    }, function () {
        $(this).find('.blogSideboxLeft').css('opacity', '');
    });




    //blog selected view as hover and active states

    $("img.imgswap").click(function () {
        $("img.imgswap").each(function () {
            this.src = this.src.replace("_on", "_off");
        });
        this.src = this.src.replace("_off", "_on");
    });

    $('.views').find('li:eq(0)').addClass('selected');

    $('#viewContent').find('> div:eq(0)').nextAll().hide();


    $('.views li').click(function (event) {

        //turn off the link so it doesn't try to jump down the page
        event.preventDefault();

        //un-highlight the buttons
        $('.views a').removeClass();

        //hide all the slides	
        $('#viewContent > div').hide();

        //highlight the current button
        $(this).addClass('selected');

        //get the index of the current button...
        var index = $('.views li').index(this);

        //and use that index to show the corresponding slide
        $('#viewContent > div:eq(' + index + ')').show();
    });

    //shop left subnav BRING THIS BACK WHEN AJAX IS WORKING
    //$('.subcat_newNow').show();

    //$('.cat_newNow').click(function() {
    //	$('a.subcat_designers').slideUp();
    //	$('.subcat_newNow').slideToggle();
    //});

    //$('.cat_designers').click(function() {
    //	$('.subcat_newNow').slideUp();
    //	$('.subcat_designers').slideToggle();
    //});

    //$('.shopLeftNav li.cat_link a').click(function () {
    //    window.location.href = $(this).attr('href');
    //	    $(this).children('.arrow').toggle();
    //        return false;
    //    });

    $('.gridshoptextlarge, .gridshoptextsmall, .gridhometext, .gridhometextbig, .gridshoptextmedium').click(function () {
        //console.log($(this).siblings().attr('href'));
        window.location.href = $(this).siblings().attr('href');
    });

    $('.btndesigner').click(function () {
        window.location.href = $(this).attr('rel');
    });

    if ($('div').hasClass('home-masonry-container')) {
        $('.home-masonry-container').each(function () {
            if ($(this).html().indexOf('[ShowGrids_') > -1) {
                var rows, cols, productid, keys, thisSpan
                thisSpan = $(this);
                keys = $(this).html().substring($(this).html().indexOf('[ShowGrids_') + '[ShowGrids_'.length);
                keys = keys.substring(0, keys.indexOf(']'));
                //console.log(keys);
                productid = keys;
                cols = productid.substring(0, productid.indexOf(','));
                //console.log(cols);
                productid = productid.substring(productid.indexOf(',') + 1);
                //console.log(productid);
                rows = productid.substring(0, productid.indexOf(','));
                //console.log(rows);
                productid = productid.substring(productid.indexOf(',') + 1);
                //console.log(productid);
                $.get('/Ajax_ocx.aspx?Action=ajax&cat=women&cols=' + cols + '&groupid=' + productid, function (data) {
                    //var twidth = 964;
                    //var colwidth = parseInt(cols) * 150;
                    //var spacing = twidth - colwidth;
                    //spacing = parseInt(spacing / (parseInt(cols) - 1));
                    //var aspacing = twidth - (colwidth + (spacing * (parseInt(cols) - 1)));
                    //$('#homepagesplash').html($('#homepagesplash').html().replace('[ShowGrids_' + keys + ']', '<style>.plproducts li{margin-right:' + spacing + 'px;} .plproducts .li3{margin-left:' + aspacing + 'px;}</style>' + data));
                    $(thisSpan).html($(thisSpan).html().replace('[ShowGrids_' + keys + ']', '' + data));
                    $('.home-masonry-container').removeClass('dontshow');
                    initHomeMasonry();
                    $('.gridshoptextlarge, .gridshoptextsmall, .gridhometext, .gridhometextbig').click(function () {
                        //console.log('click');
                        window.location.href = $(this).attr('rel');
                    });
                });

            }
        });
    } else if ($('div').hasClass('instagramProd')) {
        if ($('#shopInstagramProducts').html().indexOf('[ShowGrids_') > -1) {
            var rows, cols, productid, keys
            keys = $('#shopInstagramProducts').html().substring($('#shopInstagramProducts').html().indexOf('[ShowGrids_') + '[ShowGrids_'.length);
            keys = keys.substring(0, keys.indexOf(']'));
            //console.log(keys);
            productid = keys;
            cols = productid.substring(0, productid.indexOf(','));
            //console.log(cols);
            productid = productid.substring(productid.indexOf(',') + 1);
            //console.log(productid);
            rows = productid.substring(0, productid.indexOf(','));
            //console.log(rows);
            productid = productid.substring(productid.indexOf(',') + 1);
            //console.log(productid);
            $.get('/Ajax_ocx.aspx?Action=featured&cat=women&cols=' + cols + '&groupid=' + productid + '&featured=instagram', function (data) {
                var twidth = 964;
                var colwidth = parseInt(cols) * 150;
                var spacing = twidth - colwidth;
                spacing = parseInt(spacing / (parseInt(cols) - 1));
                var aspacing = twidth - (colwidth + (spacing * (parseInt(cols) - 1)));
                //$('#homepagesplash').html($('#homepagesplash').html().replace('[ShowGrids_' + keys + ']', '<style>.plproducts li{margin-right:' + spacing + 'px;} .plproducts .li3{margin-left:' + aspacing + 'px;}</style>' + data));
                $('#shopInstagramProducts').html($('#shopInstagramProducts').html().replace('[ShowGrids_' + keys + ']', '<ul style="margin:0 0 0 -17px;">' + data + '<ul>'));
                //initHomeMasonry();
            });
        }
    } else {
        if ($('div').hasClass('dontshow')) {
            if ($('#homepagesplash').html().indexOf('[ShowGrids_') > -1) {
                var rows, cols, productid, keys
                keys = $('.dontshow').html().substring($('.dontshow').html().indexOf('[ShowGrids_') + '[ShowGrids_'.length);
                keys = keys.substring(0, keys.indexOf(']'));
                //console.log(keys);
                productid = keys;
                cols = productid.substring(0, productid.indexOf(','));
                //console.log(cols);
                productid = productid.substring(productid.indexOf(',') + 1);
                //console.log(productid);
                rows = productid.substring(0, productid.indexOf(','));
                //console.log(rows);
                productid = productid.substring(productid.indexOf(',') + 1);
                //console.log(productid);
                $.get('/Ajax_ocx.aspx?Action=featured&cat=women&cols=' + cols + '&groupid=' + productid + '&featured=instagram', function (data) {
                    var twidth = 964;
                    var colwidth = parseInt(cols) * 150;
                    var spacing = twidth - colwidth;
                    spacing = parseInt(spacing / (parseInt(cols) - 1));
                    var aspacing = twidth - (colwidth + (spacing * (parseInt(cols) - 1)));
                    //$('#homepagesplash').html($('#homepagesplash').html().replace('[ShowGrids_' + keys + ']', '<style>.plproducts li{margin-right:' + spacing + 'px;} .plproducts .li3{margin-left:' + aspacing + 'px;}</style>' + data));
                    $('.dontshow').html($('.dontshow').html().replace('[ShowGrids_' + keys + ']', '<ul style="margin:0 0 0 -17px;">' + data + '<ul>'));
                    $('.dontshow').removeClass('dontshow');
                    //initHomeMasonry();
                });
            }
        }
    }
});

function initHomeMasonry() {
    $(function () {
        $('.home-masonry-container').masonry({
            itemSelector: '.home-image-link',
            columnWidth: 170,
            isFitWidth: true,
        });
    });

    $('.gridhomeimage').hover(function () { $(this).children('.gridhometext').fadeIn('fast'); }, function () { $(this).children('.gridhometext').fadeOut('fast'); });
    $('.gridhomeimagerev').hover(function () { $(this).children('.gridhometext').fadeOut('fast'); }, function () { $(this).children('.gridhometext').fadeIn('fast'); });

    $('.gridhomeimage').hover(function () { $(this).children('.gridhometextbig').fadeIn('fast'); }, function () { $(this).children('.gridhometextbig').fadeOut('fast'); });
    $('.gridhomeimagerev').hover(function () { $(this).children('.gridhometextbig').fadeOut('fast'); }, function () { $(this).children('.gridhometextbig').fadeIn('fast'); });

    jQuery(function () {
        jQuery('.shop-masonry-container').masonry({
            itemSelector: '.shop-image-link',
            columnWidth: 380
        });
    });


    $('.gridshopimage').hover(function () {
        $(this).children('.gridshoptextlarge').fadeIn('fast');
    }, function () {
        $(this).children('.gridshoptextlarge').fadeOut('fast');
    });

    $('.gridshopimagerev').hover(function () {
        $(this).children('.gridshoptextlarge').fadeOut('fast');
    }, function () {
        $(this).children('.gridshoptextlarge').fadeIn('fast');
    });

    $('.gridshopimage').hover(function () {
        $(this).children('.gridshoptextmedium').fadeIn('fast');
    }, function () {
        $(this).children('.gridshoptextmedium').fadeOut('fast');
    });

    $('.gridshopimagerev').hover(function () {
        $(this).children('.gridshoptextmedium').fadeOut('fast');
    }, function () {
        $(this).children('.gridshoptextmedium').fadeIn('fast');
    });

    $('.gridshopimage').hover(function () {
        $(this).children('.gridshoptextsmall').fadeIn('fast');
    }, function () {
        $(this).children('.gridshoptextsmall').fadeOut('fast');
    });

    $('.gridshopimagerev').hover(function () {
        $(this).children('.gridshoptextsmall').fadeOut('fast');
    }, function () {
        $(this).children('.gridshoptextsmall').fadeIn('fast');
    });

}

function InitDrpColor() {
    var colors = ',';
    $('.li_color').each(function (i) {
        if (colors.indexOf(',' + $('.li_color').eq(i).attr('title') + ',') == -1) {
            colors += $('.li_color').eq(i).attr('title') + ',';
        }
    });

    var html = '<option value="">Color</option>';

    var arr = colors.split(',');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length > 0) {
            html += '<option value="' + arr[i] + '">' + arr[i] + '</option>';
        }
    }

    $('#drpColor').html(html);


    if ($('#drpColor option').length == 2) {
        $('#drpColor').val($('#drpColor option').eq(1).attr('value'));
    }

    if (SELECTED_COLOR.length > 0) {
        $('#drpColor').val(SELECTED_COLOR);
        SELECTED_COLOR = '';
    }

    drpColor_change();
}

function drpColor_change() {
    var oldSize = $('#drpSize').val();
    var color = $('#drpColor').val();

    var html = '<option value="">Select Size</option>';
    if (color.length > 0) {
        var inproductids = '';

        $('.li_color[title="' + color + '"] .productid').each(function () {
            inproductids += ', .li_size_' + $(this).html();
        });


        if (inproductids.length > 0) {
            inproductids = inproductids.substr(1);
            $(inproductids).each(function () {
                var v = $(this).attr('title');
                var t = $(this).find('.msg').html();
                var cl = '';
                if (t.length == 0) {
                    t = v;
                } else {
                    t = v + ' (' + t + ')';
                    cl = ' class="red"';
                }

                html += '<option value="' + v + '"' + cl + '>' + t + '</option>';
            });
        }
    }
    else {

        if ($('#drpColor option').length > 1) {

            html += '<option value="" disabled="disabled">Please select color first</option>';
        }
    }
    $('#drpSize').html(html);

    if (oldSize == '') {
        $('#drpSize > option').each(function (i, e) {
            if ($(this).hasClass('red') == false && $(this).val() != '') {
                $('#drpSize').val($('#drpSize option:eq(' + i + ')').val());
                return false;
            }
        });
    } else {
        $('#drpSize').val(oldSize);
    }

    //console.log(SELECTED_SIZE);
    if (SELECTED_SIZE.length > 0) {
        $('#drpSize').val(SELECTED_SIZE);
        SELECTED_SIZE = '';
    }

    drpSize_change();

}

function drpSize_change() {
    var color = $('#drpColor').val();
    var size = $('#drpSize').val();
    if (color.length > 0 && size.length > 0) {
        var productids = ' ';
        var selectedproductid = '';
        $('.li_color[title="' + color + '"] .productid').each(function () {
            productids += $(this).html() + ' ';
        });

        $('.li_size[title="' + size + '"] .productid').each(function () {
            if (productids.indexOf(' ' + $(this).html() + ' ') != -1) {
                selectedproductid = $(this).html();
            }
        });

        if (PRODUCTID != selectedproductid) {
            $('#txtProductID').val(selectedproductid);
            location.href = PRODUCT_URL.replace(/&amp;/g, '&') + '&sproductid=' + selectedproductid + '&color=' + color + '&size=' + size;
        }



    }
}

function InitZoom() {
    var options =
            {
                showPreload: false,
                zoomWidth: 300,
                zoomHeight: 300,
                title: false,
                xOffset: 7
            }
    $(".jqzoom").jqzoom(options);
}
function pili_btn_click(len) {
    var height = $('.pili').length * 142;
    var top = parseInt($('.pili_fm_holder').css('top'));
    var dd = false;

    if ((len > 0 && top < 0) || (len < 0 && (height + top) > 142 * 4)) {
        top = top + len;
        $('.pili_fm_holder').animate({ 'top': top + 'px' }, function () { pili_btn_check(); });
    }
}

function pili_btn_check() {
    var height = $('.pili').length * 142;
    var top = parseInt($('.pili_fm_holder').css('top'));

    if (top < 0) {
        $('.pili_down').fadeIn(500);
    } else {
        $('.pili_down').fadeOut(200);
    }

    if ((height + top) > 142 * 4) {
        $('.pili_up').fadeIn(500);
    } else {
        $('.pili_up').fadeOut(200);
    }
}

function InitProductThs() {
    if ($('.pili').length < 5) return;

    $('.pili_btn').show();

    $('.pili_up').click(function () { pili_btn_click(-142); });
    $('.pili_down').click(function () { pili_btn_click(142); });
    pili_btn_check();
}

function ShowAPage(pageid) {
    ShowPopSizeChart(pageid);
}

function ShowPopSizeChart(chartid) {
    $('.dlgPop').load('ajax_page.asp?pageid=' + chartid + '&t=' + (new Date()).valueOf(), function () {
        //  InitEmailVaildate();
        $('.dlgPop').show(500);
    });
}

function ShowPop(url) {
    //  $('.product_image_main').html('<a class="jqzoom" href="http://a2.ocimage.us/pimg/' + url + '"><img width="340" alt="" src="http://openingceremony.us/pimg/main_' + url + '" title=""></a>');
    $('.product_image_main a').attr('href', 'http://a2.ocimage.us/pimg/' + url);
    $('.product_image_main img').attr('src', 'http://a2.ocimage.us/pimg/pop_' + url);
    //   http: //openingceremony.us/pimg/main_' + url + '
    //  InitZoom();
    //
    return;

}

$('.lessthanthreelink').click(function () {
    new Boxy($('#lessthanthreepop').html(), { modal: true });
    return false;
});


function InitQuickView() {

    $('.quickviewlis li').hover(function () {
        $(this).find('.quickicon').show();
    }, function () {
        $(this).find('.quickicon').hide();
    });

    if ($('.dlgquickview').length == 0) {
        $('body').append('<div class="dlgquickview"></div>');

    }

    $('.dlgquickview').html('Loading ...');

    $('.blog_entry a[href*="productid="]').addClass('quickprodcut');
    $('.slidecanvas a[href*="productid="]').not('.slidecanvas a[href*="productid=59372"]').addClass('quickprodcut');
    $('.quickprodcut').click(function () {
        qv_href = $(this).attr('href');

        var stop = false;
        if (qv_href.substr(0, 1) != '/') {
            stop = true;
        }
        if (stop) {

            if (qv_href.indexOf('www.') != -1 || location.href.indexOf('magiclamp') != -1) {
                stop = false;
            }
        }

        if (stop) return true;

        $('.dlgquickview').show(0, function () {
            if (mode == 2) {
                $('.dlgquickview').css('padding', '10px');

            }
        });
        var mode = 1;
        if ($(this).find('img').length == 0) mode = 2;
        qvposition(this, mode);


        $('.dlgquickview').load('/do.aspx?action=quickprodcut_click&mode=' + mode + '&url=' + escape($(this).attr('href')), function (data) {

            if (data == '0') {
                $('.dlgquickview').hide();
                location.href = qv_href;
            }
            if (mode == 2) {
                $('.dlgquickview').css('padding', '10px');
            }

            InitRollover();
        });

        return false;
    });
}

function Search(menuid, cn, sid) {
    if (!menuid) menuid = 0;
    if ((menuid + '').length == 0) menuid = 0;
    var key = $.trim($('#txtKeyword').val());

    if (key.length > 1) {
        key = key.replace('&', '%26')
        location.href = '/ocsearch.asp?keyword=' + key;
        /*
        if (sid == '5') {
        location.href = '/entry.asp?sid=5&key=' + key;
        }
        else {
        location.href = '/products.asp?menuid=' + menuid + '&key=' + key ;
        }*/
    }
    if (key.length > 0 && key.length < 2) {
        alert('Please enter more than one character.');
        $('#txtKeyword').focus();
    }
}

function tab_side_head(i) {
    $('.tab_side_head').attr('class', 'tab_side_head');
    $('.tab_side_head').addClass('tab_side_head_' + i);
    $('.tab_side_holder_' + ((i + 1) % 2)).hide();
    $('.tab_side_holder_' + i).show();
}

function InitLeftScroll() {
    var done = false;
    var h = 353;
    h = 331;
    h = 309;
    h = 287;
    h = 265;
    h = 200;

    if ($('.panel').length > 0) {

        $('.panel').each(function (i) {
            //console.log('panel height: '+$('.panel').height()+' vs '+h)
            if ($('.panel').eq(i).height() > h) {
                $('.panel').eq(i).height(h);
                $('.panel').eq(i).parent().height(h);
                //console.log('running scrollPage...')
                $('.panel').eq(i).jScrollPane({ showArrows: false, dragMinHeight: 60, dragMaxHeight: 60 });
                done = true;
            }
        });

    }
    if ($('.panel .on').length > 0 && done) {
        try {

            $('.panel')[0].scrollTo('.on');
        } catch (err) { }
    }
}

function Initslideshow2() {

    if ($('.slideshow2').length == 0) return;
    if ($('.slideshow2 li').length == 0) return;

    if ($('.slideshow2 li').length < 3) {
        $('.slideshow2 li').parent().append('<li>' + $('.slideshow2 li:eq(0)').html() + '</li><li>' + $('.slideshow2 li:eq(0)').html() + '</li>');
    }
    sls_len = $('.slideshow2 li').length;

    slideshow2_lis = new Array(sls_len);

    $('.slideshow2 li').each(function (i) {
        slideshow2_lis[i] = '<div  class="sls_c">' + $(this).html() + '</div>';
    });

    var html = '<div class="sls_fm_rel">';
    html += '<div class=\"sls_bg sls_bg1\"></div><div class=\"sls_bg sls_bg2\"></div><div class=\"sls_bg sls_bg3\"></div>';
    html += '<div class=\"sls_g sls_g1\">' + sls_get(-1) + '</div><div class=\"sls_g sls_g2\">' + sls_get(0) + '</div><div class=\"sls_g sls_g3\">' + sls_get(1) + '</div>';
    html += '<div class=\"sls_cover sls_cover1\"></div><div class=\"sls_cover sls_cover3\"></div>';
    html += '<div class=\"sls_logo \"><img src=\"http://a2.ocimage.us/images/lc_logo.png?v1\" alt=\"\" /></div>';
    html += '<div class=\"sls_btn sls_btn_left\" onclick="sls_btn_click(-1)"><img src=\"http://a2.ocimage.us/images/left_arr.png?v1\" alt=\"\" /></div><div class=\"sls_btn sls_btn_right\" onclick="sls_btn_click(1)"><img src=\"http://a2.ocimage.us/images/right_arr.png?v2\" alt=\"\" /></div>';
    html += '</div>';

    $('.slideshow2').html(html);
    showproducts_slideshow_footer();
}

function ShowPopNotifier(ProductID) {

    $('.dlgPop').load('ajax_notify.asp?ProductID=' + ProductID, function () {
        initNotifySubmit();
        $('.dlgPop').css('height', '300px')
        $('.dlgPop').show(500);
    });
}

function initNotifySubmit() {
    $('#notifiersubmit').click(function () {

        var name = $('#notifyName').val();
        var email = $('#notifyEmail').val();
        var productid = $('#notifyProductID').val();
        //alert(name+' | '+email+' | '+productid);	
        $.get('/ajax_notify.asp', { productid: productid, name: name, email: email }, function (rHTML) { $('.dlgPop').html(rHTML) });

    });
}

function ajaxlink_click(obj) {
    var href = $(obj).attr('href')
    var page = href + '&';
    if (page.indexOf('view=all') != -1) {
        page = 'all';
    } else {
        if (page.indexOf('page=') != -1) {
            page = page.substr(page.indexOf('page=') + 5);
            page = page.substr(0, page.indexOf('&'));
        }
    }

    var arr = pages.split(',');
    if (href.indexOf('cat=women') != -1) {
        arr[0] = page;
    }
    if (href.indexOf('cat=men') != -1) {
        arr[1] = page;
    }

    pages = arr[0] + ',' + arr[1] + ',' + arr[2] + ',' + arr[3];

    var loc = location.href;
    if (loc.indexOf('#') != -1) {
        loc = loc.substr(0, loc.indexOf('#'));
    }





    $(obj).text('Loading ...');
    $(obj).parents('.ajaxholder').load($(obj).attr('href'));
    location.href = loc + '#' + pages;
    return false;
}
