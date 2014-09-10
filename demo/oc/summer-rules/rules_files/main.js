var imgwidth=0;
var imgheight=0;

$(document).ready(function () {

	//masthead
    //if (window.location.protocol == "https:") {
    //    $('#lblitems').load('https://www.openingceremony.us/do.asp?action=lblitems');
    //} else {
    //    $('#lblitems').load('/do.asp?action=lblitems');
    //}

    $('.social').mouseover(function () {
        if ($(this).attr('src').indexOf('_hover') == -1)
            $(this).attr('src', $(this).attr('src').replace('.png', '_hover.png'));
    });
    $('.social').mouseout(function () {
        $(this).attr('src', $(this).attr('src').replace('_hover.png', '.png'));
    });
    $('.btngo').mouseover(function () {
        $(this).attr('src', $(this).attr('src').replace('.png', 'hover.png'));
    });
    $('.btngo').mouseout(function () {
        $(this).attr('src', $(this).attr('src').replace('hover.png', '.png'));
    });
    $('.pop_email').mouseout(function () {
        $('.pop_email').hide();
        $('#newsletter').attr('src', $('#newsletter').attr('src').replace('hover.png', '.png'));
    });
    $('#newsletter').mouseover(function () {
        $('.pop_email').show();
    });
    $('#newsletter').mouseout(function () {
        $('.pop_email').hide();
    });
    $('.pop_email').mouseover(function () {
        $('.pop_email').show();
        if ($('#newsletter').attr('src').indexOf('hover') == -1)
            $('#newsletter').attr('src', $('#newsletter').attr('src').replace('.png', 'hover.png'));
    });


    $('.linktd').each(function () {
        $(this).click(function () {
            window.location = $(this).children('a').attr('href');
        });
    });

    $('.productpop').click(function () { ShowPop('') });

    $('body style').remove();


    InitValidations();


    //$(window).load(function() { $('#hellobar-wrapper').css('zIndex', '9999'); });

    // console.log($('#timers').html()) //doesn't work on IE.

    InitRollover();
    InitTravelRoll();


    //submitbutton
    $('.submitbutton').click(function () {
        $(this).parents('form').submit()
    });
    //backbutton
    $('.backbutton').click(function () {
        history.back();
    });

    //slideshow
    try {
        $('.slideshow br').remove();
        $('.slideshow').cycle({});

    } catch (err) { }

    Initslideshow2();

    var dwellTime = $('.splashcanvas').attr('rel');

    $('.splashcanvas').cycle({ next: '.splashnext', prev: '.splashprev', fx: 'scrollLeft', timeout: dwellTime });

    //txtCCNumber
    $('#txtCCNumber').change(function () {
        var t = GetCCID($(this).val());
        if (t > 0) $('#drpCCType').val(t + '');
    });




    //imglogo4
    $('.imglogo4').mouseover(function () { $('.logo_home').show(); MouseIsOnLogo = true; });
    $('.logo_fm').mousemove(function () { MouseIsOnLogo = true; });
    $('.logo_fm').mouseout(function () { MouseIsOnLogo = false; setTimeout('HideLogoHome()', 500); });

    //txtEmail

    $('.graytext').focus(function () {
        var v = $(this).val();
        $(this).removeClass('graytext');
        if (v == 'ENTER E-MAIL') {
            $(this).val('');
        } else {

        }
    });

    $('.graytext').blur(function () {
        var v = $(this).val();
        if (v == 'ENTER E-MAIL') {
            $(this).addClass('graytext');
        }
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




    //shop_side_title
    $('.shop_side_title').click(function () {

        // shop_side_title($('.shop_side_title').index(this));
    });

    //home_splash_close_img
    if ($('.home_splash').height() < 825) {
        $('.home_splash').height(825);
    }
    $('.home_splash_close_img').click(function () { $('.home_splash').remove(); });

    $('.home_splash').click(function () {
        if (goingremove == -1) goingremove = 1;
        setTimeout('home_splash_remove()', 500);
    });
    $('.home_splash a').click(function () {
        goingremove = 0;
    });

    InitZoom();


    //autopage

    InitAutoPages();

    ///quickviewlis
    InitQuickView();


    //
    InitTravelMap();

    //
    InitProductsPage();
    //
    if ($('.root').length == 0) { InitLookbook(); }
    initLookRoll();


    // custom background
    $.get('/ajax.aspx?action=getbackground&menuid=' + $.query.get('menuid') + '&menuid2=' + $.query.get('menuid2') + '&catid=' + $.query.get('catid') + '', function (data) {
        if (data != 'None') {
            $('body').css('background', data);
        }
        else {
            //kids
            if ($.query.get('menuid') == '722') {
                $('body').css('background', 'url(/images/kidsback3.png)');
            }

            //tabio
            if ($.query.get('catid') == '1282') {
                $('body').css('background', 'url(/images/OC627_tabio_bg.gif)');
            }

            //london
            if ($.query.get('menuid2') == '1533') {
                $('body').css('background', 'url(/images/london-bkgd.png)');
            }

        }
    });


    //london
    if ($.query.get('menuid2') == '1533') {
        //$('body').css('background', 'url(/images/OC797_polkadot_yellow_swatch-02.gif)');
        $('.head2').css('background', '#000');
        $('.head1').css('background', '#000');
        //alert('here');
    }
    if ((window.location.href.indexOf('pid=8873') > 0) || (window.location.href.indexOf('holiday') > 0)) {
        $('.shopby_sub').height('115px');
    }
    else {
        $('.shopby_sub').height('200px');
    }
    $('.ibtnproductdetails').click();

    if ($('#homepagesplash').length > 0) {
        if ($('#homepagesplash').html().indexOf('[ShowGrid_') > -1) {
            var rows, cols, productid, keys
            keys = $('#homepagesplash').html().substring($('#homepagesplash').html().indexOf('[ShowGrid_') + '[ShowGrid_'.length);
            keys = keys.substring(0, keys.indexOf(']'));
            productid = keys;
            cols = productid.substring(0, productid.indexOf(','));
            productid = productid.substring(productid.indexOf(',') + 1);
            rows = productid.substring(0, productid.indexOf(','));
            productid = productid.substring(productid.indexOf(',') + 1);
            $.get('/ocsearch.asp?mode=ajax&cat=women&cols=' + cols + '&productid=' + productid, function (data) {
                var twidth = 964;
                var colwidth = parseInt(cols) * 150;
                var spacing = twidth - colwidth;
                spacing = parseInt(spacing / (parseInt(cols) - 1));
                var aspacing = twidth - (colwidth + (spacing * (parseInt(cols) - 1)));
                $('#homepagesplash').html($('#homepagesplash').html().replace('[ShowGrid_' + keys + ']', '<style>.plproducts li{margin-right:' + spacing + 'px;} .plproducts .li3{margin-left:' + aspacing + 'px;}</style>' + data));
		        initHomeModules();                
		        $('.dontshow').removeClass('dontshow');
		        $('#loadingimage').remove();
            });
        }

        if ($('span').hasClass('homepagesplash')) {
            $('.homepagesplash').each(function () {
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
                    $.get('/ocsearch.asp?mode=ajax&cat=women&cols=' + cols + '&groupid=' + productid, function (data) {
                        var twidth = 964;
                        var colwidth = parseInt(cols) * 150;
                        var spacing = twidth - colwidth;
                        spacing = parseInt(spacing / (parseInt(cols) - 1));
                        var aspacing = twidth - (colwidth + (spacing * (parseInt(cols) - 1)));
                        //$('#homepagesplash').html($('#homepagesplash').html().replace('[ShowGrids_' + keys + ']', '<style>.plproducts li{margin-right:' + spacing + 'px;} .plproducts .li3{margin-left:' + aspacing + 'px;}</style>' + data));
                        $(thisSpan).html($(thisSpan).html().replace('[ShowGrids_' + keys + ']', '' + data));
                        $('.dontshow').removeClass('dontshow');
                        $('#loadingimage').remove();
                        initHomeModules();
                    });

                }
            });
        } else {
            if ($('#homepagesplash').html().indexOf('[ShowGrids_') > -1) {
                var rows, cols, productid, keys
                keys = $('#homepagesplash').html().substring($('#homepagesplash').html().indexOf('[ShowGrids_') + '[ShowGrids_'.length);
                keys = keys.substring(0, keys.indexOf(']'));
                productid = keys;
                cols = productid.substring(0, productid.indexOf(','));
                productid = productid.substring(productid.indexOf(',') + 1);
                rows = productid.substring(0, productid.indexOf(','));
                productid = productid.substring(productid.indexOf(',') + 1);
                $.get('/ocsearch.asp?mode=ajax&cat=women&cols=' + cols + '&groupid=' + productid, function (data) {
                    var twidth = 964;
                    var colwidth = parseInt(cols) * 150;
                    var spacing = twidth - colwidth;
                    spacing = parseInt(spacing / (parseInt(cols) - 1));
                    var aspacing = twidth - (colwidth + (spacing * (parseInt(cols) - 1)));
                    if ($('.slidecanvas').length>0) {
                    	$('#homepagesplash').html($('#homepagesplash').html().replace('[ShowGrids_' + keys + ']', '<style>.plproducts li{margin-right:' + spacing + 'px;} .plproducts .li3{margin-left:' + aspacing + 'px;}</style>' + data));
                    }else{
                    	$('#homepagesplash').html($('#homepagesplash').html().replace('[ShowGrids_' + keys + ']', '' + data));
                    }
                    $('.dontshow').removeClass('dontshow');
                    $('#loadingimage').remove();
                    initHomeModules();
                });
            }
        }


	//slideshow
	try {
		$('.slideshow br').remove();
		$('.slideshow').cycle({});

	} catch (err) {
		$('body').append('<script type="text/javascript" language-"javascript" src="/js/jquery.cycle.all.js"></script>');
	}
    }
    Initslideshow2();
    var dwellTime = $('.splashcanvas').attr('rel');

    $('.splashcanvas').cycle({ next: '.splashnext', prev: '.splashprev', fx: 'scrollLeft', timeout: dwellTime });
    $('#regEmail').change(function () {
    	$.get('/ajax.aspx?action=emailexists', { email: $('#regEmail').val() }, function (data) {
    		if (data == "1")
    			if (confirm("Email already exists. Go to Login Page?"))
    				window.location = "/login.asp";
    			else {
    				$('#regEmail').val('');
    				$('#regEmail').focus();
    			}
    	});
    });
    $('#col3hide').click(function () {
    	$('#col3Shipping').show();
    	$('#col3hide').hide();
    	$('#cbsab').removeAttr('checked');
    });
    $('.col2 input').each(function () {
    	$(this).change(function () {
    		if ($('#col3Shipping').css('display') == 'none')
    			$('#cbsab').click();
    		if (!$('#cbsab').attr('checked'))
    			$('#cbsab').click();
    	});
    });
    $('.col2 select').each(function () {
    	$(this).change(function () {
    		if ($('#col3Shipping').css('display') == 'none')
    			$('#cbsab').click();
    		if (!$('#cbsab').attr('checked'))
    			$('#cbsab').click();
    	});
    });
    
    
    $('.lessthanthreelink').click(function(){
	new Boxy($('#lessthanthreepop').html(),{modal:true});
	return false;
    });
    
});

function initHomeModules(){
		    $('.lbrollover').hover(function() {
		        $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
		    },function(){
				$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
		    });
	    
	    	var dwellTime = $('.splashcanvas').attr('rel');
	    	$('.splashcanvas').cycle({ next: '.splashnext', prev: '.splashprev', fx: 'scrollHorz', timeout: dwellTime });
	    	$('.slideshow').cycle();
}


var slideshow2_lis = null;
var sls_cur = 1;
var sls_len = 0;
var sls_ismoving = 0;

function initLookRoll(){
    $('.lbrollover').hover(function() {
        $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
        $(this).attr('src', $(this).attr('src').replace('-off', '-on'));
    },function(){
	$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
	$(this).attr('src', $(this).attr('src').replace('-on', '-off'));
    });
}

function sls_get(step) {
    return slideshow2_lis[(sls_cur + step + sls_len) % sls_len];
}
function Initslideshow2() {

    if ($('.slideshow2').length == 0) return;
    if ($('.slideshow2 li').length == 0) return;

    if ($('.slideshow2 li').length < 3) {
        $('.slideshow2 li').parent().append('<li>' + $('.slideshow2 li:eq(0)').html() + '</li><li>' + $('.slideshow2 li:eq(0)').html() + '</li>');
    }
    sls_len = $('.slideshow2 li').length;

    slideshow2_lis = new Array(sls_len);

    $('.slideshow2 li').each(function(i) {
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

function sls_btn_click(step) {

    if (sls_ismoving > 0) return;


    sls_ismoving = 3;

    $('.sls_bg1').html(sls_get(step - 1));
    $('.sls_bg2').html(sls_get(step));
    $('.sls_bg3').html(sls_get(step + 1));

    $('.sls_g1 .sls_c').fadeOut(1000, function() {
        $('.sls_g1').html($('.sls_bg1').html());
        sls_ismoving--;
    });
    $('.sls_g2 .sls_c').fadeOut(1000, function() {
        $('.sls_g2').html($('.sls_bg2').html());

        showproducts_slideshow_footer();
        sls_ismoving--;
    });

    $('.sls_g3 .sls_c').fadeOut(1000, function() {
        $('.sls_g3').html($('.sls_bg3').html());
        sls_ismoving--;
    });


    sls_cur += step;
}


function showproducts_slideshow_footer() {
    var text = $.trim($('.sls_g2').text());
    if (text.length == 0) text = $('.sls_g2 img').attr('alt');

    $('.products_slideshow_footer').html(text);
}

function InitProductsPage() {

    if ($('.products_slideshow_fm').length > 0) {

        $('.products_slideshow_header').html($('.content_header  h1').html());
        $('.content_header  h1').remove();
    }
    if ($('.products_bg img').length > 0) {

        $('body').css('background', 'url(' + $('.products_bg img').attr('src') + ')');
    } else {

    }



}

function InitTravelStars(ix) {
    if ($('.tvmap_stars_' + ix).length == 0) {
        $('.tvmap_stars_fm').append('<div class="tvmap_stars tvmap_stars_' + ix + '">loading -' + ix + '</div>');

        var html = '';
        $('.travelcontent:eq(' + ix + ') a[href="#"]').each(function(i) {
            var pos = $(this).attr('rel') + '';
            if (pos.length == 0) {
                pos = (i * 40 + ix * 30 + 100) + ',' + (i * 40 + ix * 20 + 50);
            }

            pos = (pos + ',,,,,').split(',');
            var pageid = ($(this).attr('onclick') + '').replace(/[^0-9]/g, '');

            html += '<div class="star" style="left:' + pos[0] + 'px; top:' + pos[1] + 'px"><a title="' + $(this).text() + '" href="#" onclick=" return ShowTravel(this, ' + pageid + ');"><img src="http://a2.ocimage.us/images/' + TravelIcon(ix) + '" alt="" /></a></div>';



        });

        $('.tvmap_stars_' + ix).html(html);
    }
}

function TravelIcon(ix) {
    var star = 'star_' + ix + '.png';
    switch (ix) {
        case 0: { star = 'star-see.png'; break; }
        case 1: { star = 'star-eat.png'; break; }
        case 2: { star = 'star-drink.png'; break; }
        case 3: { star = 'star-shop.png'; break; }
        case 4: { star = 'star-sleep.png'; break; }
        case 5: { star = 'star-friends.png'; break; }
    }

    return star;
}

function InitTravelMap() {
    $('body').click(function() {
        $('.dlgtravel').hide();
    });
    $('.traveltitle').click(function() {

        $('.dlgtravel').hide();
        var ix = $('.traveltitle').index(this);

        InitTravelStars(ix);

        $('.tvmap_stars').hide();
        $('.tvmap_stars_' + ix).show();
        $('.travelcontent').hide();
        $('.travelcontent').eq(ix).show();

        //   $('.travelroll').removeClass('button');
        // $('.travelroll').eq(ix).addClass('button');
    });

    for (var i = 0; i < 6; i++) InitTravelStars(i);

    $('.tvmap_stars').show();
    $('.travelroll').click(function() {
        setTimeout('travelloc()', 500);
    });
    travelloc();
}

function travelloc() {
    if (location.href.indexOf('#') != -1) {
        var cl = location.href;
        cl = cl.substr(cl.indexOf('#') + 1);

        var ix = $('.travelcontent').index($('.' + cl));
        $('.traveltitle').eq(ix).click()
    }
}


function qvposition(parent, mode) {
    // if (mode == 1) return;

    var c = 'none';
    if (mode == 2) c = 'fit';

    $(".dlgquickview").position({
        of: $(parent),
        at: 'left bottom',
        my: 'right bottom',
        offset: '0 0',
        collision: c
    });


    //  $(".dlgquickview").css('left','270px');
}
function qvbtn_click() {
    var color = $('.drpqvcolor').val();
    var size = $('.drpqvsize').val();
    if (size.length == 0 || color.length == 0) {
        alert('Please select color and size.');
        return;
    }
    if ($('.ul_color_size li[title="' + color + '-' + size + '"]').length == 0) return;

    var pid = $('.ul_color_size li[title="' + color + '-' + size + '"]').html();

    $.post('/cart.asp', { ProductID: pid, Color: color, Size: size, Action: 'AddItem', Mode: 'Ajax' }, function() {
        $('.qvbtn').html('Thank you.');

        $('#lblitems').load('https://www.openingceremony.us/do.asp?action=lblitems');
    });

}
function drpqvcolorsize_change() {
    var color = $('.drpqvcolor').val();
    var size = $('.drpqvsize').val();
    if (size.length == 0 && color.length == 0) return;

    if (color.length > 0) {

        $('.drpqvsize option').each(function() {
            var v = $(this).attr('value');


            if ($('.ul_color_size li[title="' + color + '-' + v + '"]').length > 0 || v.length == 0) {
                $(this).removeAttr('disabled');
            } else {
                $(this).attr('disabled', 'disabled');
            }
        });
    }

    if (size.length > 0) {
        $('.drpqvcolor option').each(function() {
            var v = $(this).attr('value');
            if ($('.ul_color_size li[title="' + v + '-' + size + '"]').length > 0 || v.length == 0) {
                $(this).removeAttr('disabled');
            } else {
                $(this).attr('disabled', 'disabled');
            }
        });
    }

}

function InitQuickView() {

    $('.quickviewlis li').hover(function() {
        $(this).find('.quickicon').show();
    }, function() {
        $(this).find('.quickicon').hide();
    });

    if ($('.dlgquickview').length == 0) {
        $('body').append('<div class="dlgquickview"></div>');

    }

    $('.dlgquickview').html('Loading ...');

    $('.blog_entry a[href*="productid="]').addClass('quickprodcut');
    $('.slidecanvas a[href*="productid="]').not('.slidecanvas a[href*="productid=59372"]').addClass('quickprodcut');
    $('.quickprodcut').click(function() {
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

        $('.dlgquickview').show(0, function() {
            if (mode == 2) {
                $('.dlgquickview').css('padding', '10px');

            }
        });
        var mode = 1;
        if ($(this).find('img').length == 0) mode = 2;
        qvposition(this, mode);


        $('.dlgquickview').load('/do.aspx?action=quickprodcut_click&mode=' + mode + '&url=' + escape($(this).attr('href')), function(data) {

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

var qv_href = '';



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


function InitAutoPages() {
    $('.autopage').each(function(id) {
        InitAutoPage($(this), id);
    });
}



function InitAutoPage(p, id) {
    p.addClass('autopage_' + id);
    var c = p.find('.page_item').length;
    var pagesize = parseInt(p.find('.pages_count').text());

    var ps = Math.ceil((c * 1.0) / pagesize);
    p.find('.pages_count').html('<span class="page_size none">' + pagesize + '</span> <span class="page_current none">1</span> <span class="page_all none">' + ps + '</span> <span class="page_previous">PREVIOUS</span> &bull;  <span class="page_next">NEXT</span> : <span class="page_begin">1</span>~<span class="page_end">' + c + '</span> OF <span class="page_allitems">' + c + '</span> ITEM' + (c > 1 ? 'S' : ''));
    ShowCurrentPage(p, id);
}

function ShowCurrentPage(p, id) {
    var c = parseInt(p.find('.page_current').text());
    var ps = parseInt(p.find('.page_all').text());
    var t = parseInt(p.find('.page_allitems').text());
    var sz = parseInt(p.find('.page_size').text());
    var b = (c - 1) * sz;
    var e = c * sz;
    if (e > t) e = t;

    p.find('.page_item').hide();
    for (var i = b; (i < e && i < t); i++) {
        p.find('.page_item').eq(i).show();
    }
    p.find('.page_begin').html((b + 1) + '');
    p.find('.page_end').html(e + '');

    if (c > 1) {
        p.find('.page_previous').html('<a href="#" onclick="return page_PREVIOUS(' + (c - 1) + ',' + id + ');">PREVIOUS</a>');
    } else {
        p.find('.page_previous').html('PREVIOUS');
    }

    if (c < ps) {
        p.find('.page_next').html('<a href="#" onclick="return page_PREVIOUS(' + (c + 1) + ',' + id + ');">NEXT</a>');
    } else {
        p.find('.page_next').html('NEXT');
    }

}

function page_PREVIOUS(c, id) {
    var p = $('.autopage_' + id);
    p.find('.page_current').html(c + '');
    ShowCurrentPage(p, id);
    return false;
}


function InitDrpColor() {
    var colors = ',';
    $('.li_color').each(function(i) {
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

        $('.li_color[title="' + color + '"] .productid').each(function() {
            inproductids += ', .li_size_' + $(this).html();
        });


        if (inproductids.length > 0) {
            inproductids = inproductids.substr(1);
            $(inproductids).each(function() {
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




    $('#drpSize').val(oldSize);


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
        $('.li_color[title="' + color + '"] .productid').each(function() {
            productids += $(this).html() + ' ';
        });

        $('.li_size[title="' + size + '"] .productid').each(function() {
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

function InitPrintContent() {
    $('#txtPrintTitle').val(document.title);
    var v = '';
    $('.print_content').each(function(i) {
        v += $('.print_content').eq(i).html();
    });

    $('#txtPrintContent').val(v);
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

        $('.panel').each(function(i) {
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


function ToggleSE2(id, obj) {
    if (!$(id).html()) return;
    if ($(id).css('display') == 'none') {
        $(id).show();
        $(obj).removeClass('bold');
        $(obj).removeClass('ibtnadd');
        $(obj).addClass('ibtndelete');
    } else {
        $(id).hide();
        $(obj).addClass('bold');
        $(obj).addClass('ibtnadd');
        $(obj).removeClass('ibtndelete');
    }
}
function ToggleSE(id, obj) {
    if (!$(id).html()) return;
    if ($(id).css('display') == 'none') {
        $(id).show();
        $(obj).removeClass('bold');
        $(obj).removeClass('ibtnadd');
        $(obj).addClass('ibtndelete');
        $(id).find('a:last').focus();
    } else {
        $(id).hide();
        $(obj).addClass('bold');
        $(obj).addClass('ibtnadd');
        $(obj).removeClass('ibtndelete');
    }
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

function home_splash_remove() {
    if (goingremove == 1)
        $('.home_splash').remove();
}

var goingremove = -1;


function shop_side_title(i) {
    var show = $('.shopby_sub').eq(i);
    $('.shopby_sub').not(show).hide();
    show.show();
}




var MouseIsOnLogo = false;
function HideLogoHome() {
    if (MouseIsOnLogo) return;
    $('.logo_home').hide();
}

var noneedtoroll = false;

function InitTravelRoll() {
    $(".travelroll").mouseover(
	function() {
	    if ($(this).attr("src") && (!($(this).hasClass("button")))) {
	        $(this).attr("src", $(this).attr("src").replace("travel/", "travel/hover"));
	    }
	});

    $(".travelroll").mouseout(
	function() {
	    if ($(this).attr("src") && (!($(this).hasClass("button")))) {
	        $(this).attr("src", $(this).attr("src").replace("travel/hover", "travel/"));
	    }
	});

    if ($(".travelroll").filter(".button").length > 0)
        $(".travelroll").filter(".button").attr("src", $(".travelroll").filter(".button").attr("src").replace("travel/", "travel/hover"));

}

function InitRollover() {
    $('.rollover').mouseover(
    function() {

        if ($(this).attr('src')) {
            if ($(this).attr('src').indexOf('_button') != -1) {
                noneedtoroll = false;
                $(this).attr('src', $(this).attr('src').replace('_button', '_rollover'));
            } else {
                noneedtoroll = true;
            }
        }
    }
    );

    $('.rollover').mouseout(
    function() {
        if ($(this).attr('src')) {
            //  alert($(this).attr('src'));
            if (!noneedtoroll)
                $(this).attr('src', $(this).attr('src').replace('_rollover', '_button'));
        }
    }
    );
}


function dialogHTML(menutoColor, StaffName, StaffImg, preorder, t_lc, mid,shopid,usx) {
	//console.log('shopid:'+shopid);
    var html = '';
    
	if (shopid=='1533'){ //london
		html += '<div class="dialog_london"><a href="/products.asp?menuid=2&menuid2=1533"><img src="http://a2.ocimage.us/userfiles/image/london/OC797_london_sticker_071112.png" width="91" height="107" alt="" class="png" id="png_london" /><\/a><\/div>';
		$('body').css('background', 'url(/images/london-bkgd.png)');
		//console.log('shop triggered:'+shopid);
	}
    
    html += '<div class="dialog_f"><img src="http://a2.ocimage.us/images/buttons/featured_' + menutoColor + '.png" width="91" height="82" alt="" class="png" id="png_f" /><\/div>';
    html += '<div class="dialog_just_fm"><a href="/products.asp?menuid=' + mid + '&menuid2=5"><img src="http://a2.ocimage.us/images/flags/oc_' + menutoColor + '_just.png" width="93" height="96" alt="" class="png" id="png_just" /><\/a><\/div>';
    if (StaffImg.length > 0) {
        html += '<div class="dialog_staff_fm"><a href="/staffs.asp?name=' + StaffName + '"><img src="' + StaffImg + '"  width="104"  alt="" class="png" id="png_staff"  /></a><\/div>';

    } else {
        html += '<div class="dialog_staff_fm"><img src="http://a2.ocimage.us/images/flags/oc_' + menutoColor + '_staff.png" width="91"  height="83" alt="" class="png" id="png_staff"  /><\/div>';
    }
    html += '<div class="dialog_xclusive"><a href="/products.asp?menuid=' + mid + '&menuid2=116"><img src="http://a2.ocimage.us/images/buttons/xclusive_' + menutoColor + '.png" width="95" height="95" alt="" class="png" id="png_xclusive" /><\/a><\/div>';

    if ($('.product_right_flag').length > 0) {
        html += '<div>' + $('.product_right_flag').html().toLowerCase() + '</div>';
    }
    if (preorder == '1') {
        html += '<div><img src="http://a2.ocimage.us/images/buttons/preorder_' + menutoColor + '.png"  alt=""   /></div>';
        $('.ibtnaddtote').attr('src', '/images/buttons/presale_' + menutoColor + '_button.png');
        //$('.ibtnaddtote').parent().css('padding-top','2px');
    }

    if (usx == '1') {
        html += '<div><img src="http://a1.ocimage.us/images/buttons/USexclusive_' + menutoColor + '.png" /></div>';
    }

    if (t_lc.length > 0) {
        html += '<div><a href="/products.asp?menuid=' + mid + '&catid=' + t_lc + '"><img src="http://a2.ocimage.us/images/buttons/ocforlc-pdetail.png"  alt=""   /><\/a><\/div>';

        $('body').css('background', 'url(/images/lc_bg.jpg)');

    }

    if (html.length > 0) {
        $('.dialog').html(html);
    }

}
function showdialogHTML(mc, sn, si, t5, t4, t116, tf, preorder, t_lc, mid,shopid, usx) {
    $('.dialog').css({ 'top': '300px', 'left': '234px', 'width': '104px', 'height': 'auto' });
    dialogHTML(mc, sn, si, preorder, t_lc, mid,shopid,usx);
    $('.dialog').show();
    if (t5 != '1') $('.dialog_just_fm').remove();
    if (t4 != '1') $('.dialog_staff_fm').remove();
    if (t116 != '1') $('.dialog_xclusive').remove();
    if (tf != '1') $('.dialog_f').remove();
}


function CheckCountry() {
    $.get('/ajax_ip2country.asp', function(data) {
        if (data != 'US' && data != '-') {
            $('.product_addcart').html('this product can only be shipped within the US');
        }
    });
}

function ShowFeaturedIcon(color) {
    $(document).ready(function() {
        $('.dialog').css({ 'top': '261px', 'left': '234px', 'width': '97px', 'height': '296px' });
        $('.dialog').html('<img src="http://a2.ocimage.us/images/buttons/featured_' + color + '.png" width="91" height="82" class="png" id="png_featured" />');
        $('.dialog').show();
        if (document.all) {
            fixPng(document.getElementById('png_featured'));
        }
    });
}
function CheckOption(id) {
    if ($('#' + id + ' option').length > 1) return true;
    return false;
}
function InitValidations() {

    try {
        //checksize and color

        var AddToCartForm = $("#AddToCartForm").validate({
            rules: {
                Size: { required: CheckOption('drpSize') },
                Color: { required: CheckOption('drpColor') }
            }
        });

        var giftform = $("#giftform").validate({
            rules: {
                FirstName_For: "required",
                LastName_For: "required",
                Email_For: { required: true, email: true },
                FirstName_From: "required",
                LastName_From: "required",
                Email_From: { required: true, email: true }
            }
        });

        var login_form = $("#login_form").validate({
            rules: {
                UserName: { required: true, email: true },
                Password: "required"
            }
        });

        var email_form = $("#email_form").validate({
            rules: {
                Name: "required",
                Email: { required: true, email: true }
            }
        });
        var formcomment = $(".formcomment").validate();

        var payment_form = $("#payment_form").validate({
            rules: {

                FirstName: "required",
                LastName: "required",
                CCType: "required",
                CCNumber: "required",
                CSC: "required"
            },
            submitHandler: function (form) {
                    $('#processbtn').hide();
                    $('#processmessage').show();
                    form.submit();
            }
        });

        var fmregister = $("#fmregister").validate({
            rules: {
                Email: { required: true, email: true },
                Password: { required: true, minlength: 5 },
                Password2: { required: true, minlength: 5, equalTo: "#txtPassword" },
                FirstName: "required",
                LastName: "required"

            }
        });

        var accountinfo_form = $("#accountinfo_form").validate({
            rules: {
                Email: { required: true, email: true },
                Password: { required: true, minlength: 5 },
                Password2: { required: true, minlength: 5, equalTo: "#txtAccountInfoPassword" },
                FirstName: "required",
                LastName: "required",
                Address1: "required",
                City: "required",
                Country: "required",
                PostalCode: "required",

                Phone: "required",
                ShipFirstName: "required",
                ShipLastName: "required",
                ShipAddress1: "required",
                ShipCity: "required",
                ShipCountry: "required",
                ShipPostalCode: "required"

            }
        });

        $('.validate').each(function(i) { $(this).validate(); });
    } catch (err) { }
}


//fixpng
var blank = new Image();
blank.src = '/images/1.gif';
$(document).ready(function() {
    var badBrowser = (/MSIE ((5\.5)|6)/.test(navigator.userAgent) && navigator.platform == "Win32");
    if (badBrowser) {

        $('.png').each(function() {
            if ($(this).attr('class').indexOf('rollover') == -1) {
                if (!this.complete) {
                    this.onload = function() { fixPng(this) };
                } else {
                    fixPng(this);
                }
            }
        });
    }
});






function blog_entry_linkimg_click(pid) {
    $('#blog_entry_link_' + pid).toggle();
    $('#blog_entry_link_' + pid).focus();
    $('#blog_entry_link_' + pid).select()
}

//blog
var curpage_th = 0;
var curpage_sd = 0;
var pages_th = 0;
var pages_sd = 0;

function InitPopSlide() {
    $(document).ready(function() {
        var html_th = '';
        var html_sd = '';
        var j = 0;
        pages_th = 0;
        curpage_th = 0;
        pages_sd = 0;
        curpage_sd = 0;


        pages_th = $('.slide_th .slide_page').length;
        pages_sd = $('.slide_sd .slide_page').length;
        CheckSlideLinks();
        Show_sd_i(curpage_sd);
        Show_th_i(curpage_th);



        $('.lbtn_view_slideshow').focus();
		        if (imgwidth>600 || imgheight>600){
			        //console.log('big slideshow!!'); 
			        $('.slide_sd .slide_page img').css({'max-height':'1024px','max-width':'1024px'});
		        }

    });
}

function ShowTitleAlt(obj) {
    var alt = $(obj).attr('alt');
    var title = $(obj).attr('title');
    if (alt == title) alt = '';
    $('.slide_img_alt').html(alt.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
    $('.slide_img_title').html(title);



    var src = $('.slide_sd .slide_page_' + curpage_sd + ' img:eq(0)').attr('src');

}
function CheckSlideLinks() {
    $('.lblpages_th').html((pages_th + ''));
    $('.lblcurpage_th').html(((curpage_th + 1) + ''));

    $('.lbtnPrevious_th').removeClass('lbtn');
    $('.lbtnNext_th').removeClass('lbtn');

    if (curpage_th > 0) {
        $('.lbtnPrevious_th').addClass('lbtn');
    }
    if (curpage_th < (pages_th - 1)) {
        $('.lbtnNext_th').addClass('lbtn');
    }

    //sd
    $('.lblpages_sd').html((pages_sd + ''));
    $('.lblcurpage_sd').html(((curpage_sd + 1) + ''));

    $('.lbtnPrevious_sd').removeClass('lbtn');
    $('.lbtnNext_sd').removeClass('lbtn');

    if (curpage_sd > 0) {
        $('.lbtnPrevious_sd').addClass('lbtn');
    }
    if (curpage_sd < (pages_sd - 1)) {
        $('.lbtnNext_sd').addClass('lbtn');
    }

    //

}

function ShowPopSlide(url, pageid) {
    //alert(url)
    if ($.trim($('.dlgPop').html()).length == 0 || $.trim($('.dlgPop').html()).toLowerCase().indexOf('class="slideshow_fm"') == -1 || $.trim($('.dlgPop').html()).toLowerCase().indexOf('id="slideshow_fm_' + pageid + '"') == -1) {
        $('.dlgPop').load('ajax_slideshow.aspx?pageid=' + pageid, function() {
            InitPopSlide();
            SelectSlide(url);
            $('.dlgPop').show(500);
        });
    }
    else {
        SelectSlide(url);
        $('.dlgPop').show(500);
    }

    /*
    1. var posX = 0;
    2. var posy = 0;
    3. var event = event ? event : window.event;
    4. if(event.pageX || event.pageY) {
    5.     posX = event.pageX;
    6.     posY = event.pageY;
    7. } else if (event.clientX || event.clientY) {
    8.     posX = event.clientX + document.documentElement.scrolLeft +
    9.           document.body.scrolLeft;
    10.     posY = event.clientY + document.documentElement.scrolTop +
    11.           document.body.scrolTop;
    12.
    13. }*/

    var t = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
    } else if (document.body) {
        t = document.body.scrollTop;
    }

    $('.dlgPop').css('top', (t + 66) + 'px');
    $('.dlgPop').css('left', '210px');

    return false;
}

function SelectSlide(url) {

    //select th
    var sel = $('.slide_th img[src$="' + url + '"]');
    if (!sel.attr('src')) {
        sel = $('.slide_th .undownloaded[title*="' + url + '"]').find('img');
    }

    if (sel.attr('src')) {
        var id = sel.parents('.slide_page').attr('class');
        if (id.indexOf('_') != -1) {
            id = id.substr(id.lastIndexOf('_') + 1);

            Show_th_i(id);
        }
    }

    //select sd

    // alert($('.slide_sd').html());

    sel = $('.slide_sd img[src$="' + url + '"]');
    if (!sel.attr('src')) {

        sel = $('.slide_sd .undownloaded[title*="' + url + '"]').find('img');

    }

    if (sel.attr('src')) {
        var id = sel.parents('.slide_page').attr('class');
        if (id.indexOf('_') != -1) {
            id = id.substr(id.lastIndexOf('_') + 1);
            Show_sd_i(id);
        }
    }



    SwtichVIEW_th();
    $('.slideshow_mainimg').html(url);
}

function SwtichVIEW_th() {
    $('.slide_links_th').hide();
    $('.slide_links_sd').show();
    $('.slide_th').hide(); $('.slide_sd').show();

    $('.slide_img_alt').html('');
    $('.slide_img_title').html('');
    ShowTitleAlt($('.slide_sd .slide_page_' + curpage_sd + ' img:eq(0)'));
}

function SwtichVIEW_sd() {
    $('.slide_links_th').show();
    $('.slide_links_sd').hide();
    $('.slide_th').show();
    $('.slide_sd').hide();
    ShowTitleAlt($('.slide_th .slide_page_' + curpage_sd + ' img:eq(0)'));

    Show_th_i(curpage_th);
}

function Previous_th() {
    if (curpage_th < 1) {
        curpage_th = pages_th;
    }
    curpage_th--;

    Show_th_i(curpage_th);
}
function Next_th() {
    if (curpage_th >= (pages_th - 1)) {
        curpage_th = -1;
    }
    curpage_th++;

    Show_th_i(curpage_th);
}

function Show_th_i(i) {
    curpage_th = parseInt(i);

    $('.slide_th .slide_page').hide();



    if ($('.slide_th .slide_page_' + curpage_th + ' .undownloaded').length > 0) {
        $('.slide_th .slide_page_' + curpage_th + ' .undownloaded').each(function(j) {
            var title = $('.slide_th .slide_page_' + curpage_th + ' .undownloaded').eq(j).attr('title');
            $('.slide_th .slide_page_' + curpage_th + ' .undownloaded').eq(j).attr('title', '');
            if (title.indexOf('background') != -1) {
                $('.slide_th .slide_page_' + curpage_th + ' .undownloaded').eq(j).attr('style', title);
            } else {
                $('.slide_th .slide_page_' + curpage_th + ' .undownloaded').eq(j).find('img').attr('src', title);
            }
        });
        $('.slide_th .slide_page_' + curpage_th + ' .undownloaded').removeClass('undownloaded');
    }

    $('.slide_th .slide_page_' + curpage_th).show();
    ShowTitleAlt($('.slide_th .slide_page_' + curpage_th + ' img'));
    CheckSlideLinks();
}



function Show_sd_i(i) {
    curpage_sd = parseInt(i);


    curpage_th = parseInt(curpage_sd / 25.0);


    $('.slide_sd .slide_page').hide();


    if ($('.slide_sd .slide_page_' + curpage_sd + ' .undownloaded').length > 0) {
        $('.slide_sd .slide_page_' + curpage_sd + ' .undownloaded').each(function(j) {
            var title = $('.slide_sd .slide_page_' + curpage_sd + ' .undownloaded').eq(j).attr('title');

            $('.slide_sd .slide_page_' + curpage_sd + ' .undownloaded').eq(j).attr('title', '');
            $('.slide_sd .slide_page_' + curpage_sd + ' .undownloaded').eq(j).find('img').attr('src', title);
        });
        $('.slide_sd .slide_page_' + curpage_sd + ' .undownloaded').removeClass('undownloaded');
    }


    $('.slide_sd .slide_page_' + curpage_sd).show();
    ShowTitleAlt($('.slide_sd .slide_page_' + curpage_sd + ' img'));
    CheckSlideLinks();
}

function Previous_sd() {
    if (curpage_sd < 1) {
        curpage_sd = pages_sd;
    }
    curpage_sd--;
    Show_sd_i(curpage_sd);

}
function Next_sd() {
    if (curpage_sd >= (pages_sd - 1)) {
        curpage_sd = -1;
    }
    curpage_sd++;

    Show_sd_i(curpage_sd);

}


//


function ShowTravel(obj, pageid) {
    if ($('.dlgtravel').length == 0) $('body').append('<div class="dlgtravel"></div>');


    $('.dlgtravel').load('/do.aspx?action=travelpage&pageid=' + pageid + '&t=' + (new Date()).valueOf(), function() {

        $('.dlgtravel').show(500, function() {
            $('.dlgtravel .slideshow br').remove();
            $('.dlgtravel .slideshow').cycle({});


            if ($(obj).find('img').length > 0) {
                obj = $(obj).find('img').eq(0);
            }
            $(".dlgtravel").position({
                of: $(obj),
                at: 'left top',
                my: 'right bottom',
                offset: '0 0',
                collision: 'none'
            });



        });


        //icon

        var src = $(obj).parents('.travelcontent');
        if (src.length == 1) {
            src = $('.travelcontent').index(src);
        } else {
            src = $(obj).parents('.tvmap_stars');
            src = $('.tvmap_stars').index(src);
        }

        if (1 == 1) {

            if (src > -1) {
                if ($('.dlgtravel .dlgtravelicon').length == 0) {
                    if ($('.dlgtravel .slideshow').length > 0) {
                        $('.dlgtravel .slideshow:eq(0)').after('<img class=\"dlgtravelicon\" src=\"http://a2.ocimage.us/images/travel/' + TravelIcon(src).replace('star-', '') + '\" width="20" style="margin:5px 10px 0px 0px;" alt="" align="left" />');
                    } else {
                        if ($('.dlgtravel img').not('.pointer').length > 0)
                            $('.dlgtravel img').not('.pointer').eq(0).after('<img src=\"http://a2.ocimage.us/images/travel/' + TravelIcon(src).replace('star-', '') + '\" width="20" alt="" style="margin:5px 10px 0px 0px;"  align="left" />');
                    }
                }
            }
        }

    });

    return false;
}



function ShowAPage(pageid) {
    ShowPopSizeChart(pageid);
}

function ShowPopSizeChart(chartid) {
    $('.dlgPop').load('ajax_page.asp?pageid=' + chartid + '&t=' + (new Date()).valueOf(), function() {
        //  InitEmailVaildate();
        $('.dlgPop').show(500);
    });
}
function ShowPopEmail_main(url) {
    if ($.trim($('.dlgPop').html()).length == 0 || $.trim($('.dlgPop').html()).toLowerCase().indexOf('id="fmEmailToFriend"') == -1) {
        $('.dlgPop').load('ajax_friend.asp?t=' + (new Date()).valueOf(), function() {
            //  InitEmailVaildate();
            $('.dlgPop').show(500);
            InitEmailVaildate_main(url);
        });
    }
    else {
        $('.dlgPop').show(500);
    }
    return false;
}

function ShowPopNotifier(ProductID) {
	
    	$('.dlgPop').load('ajax_notify.asp?ProductID='+ProductID, function(){
    	initNotifySubmit();
    	$('.dlgPop').css('height','300px')
        $('.dlgPop').show(500);
        });
}

function initNotifySubmit(){
	$('#notifiersubmit').click(function(){
	
	var name = $('#notifyName').val();
	var email = $('#notifyEmail').val();
	var productid = $('#notifyProductID').val();
	//alert(name+' | '+email+' | '+productid);	
	$.get('/ajax_notify.asp',{productid:productid,name:name,email:email},function(rHTML){$('.dlgPop').html(rHTML)});
	
	});
}


function ShowPopEmail() {
    ShowPopEmail_main('');
}

function ResizePopThs() {
    var cols = $('.pop_image_col').length;
    if (cols > 1) {
        $('.popimage_ths').width(144);
        $('.dlgPop').width(544);
    } else {
        $('.popimage_ths').width(72);
        $('.dlgPop').width(472);

    }
}


function InitProductThs() {
    if ($('.pili').length < 5) return;

    $('.pili_btn').show();

    $('.pili_up').click(function() { pili_btn_click(-142); });
    $('.pili_down').click(function() { pili_btn_click(142); });
    pili_btn_check();
}
function pili_btn_click(len) {
    var height = $('.pili').length * 142;
    var top = parseInt($('.pili_fm_holder').css('top'));
    var dd = false;

    if ((len > 0 && top < 0) || (len < 0 && (height + top) > 142 * 4)) {
        top = top + len;
        $('.pili_fm_holder').animate({ 'top': top + 'px' }, function() { pili_btn_check(); });
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
function ShowPop(url) {
    //  $('.product_image_main').html('<a class="jqzoom" href="http://a2.ocimage.us/pimg/' + url + '"><img width="340" alt="" src="http://openingceremony.us/pimg/main_' + url + '" title=""></a>');
    $('.product_image_main a').attr('href', 'http://a2.ocimage.us/pimg/' + url);
    $('.product_image_main img').attr('src', 'http://a2.ocimage.us/pimg/pop_' + url);
    //   http: //openingceremony.us/pimg/main_' + url + '
    //  InitZoom();
    //
    return;

}

function SelectDefaultColor(url) {
    if ($('#drpColor option').length == 2) {
        if ($('#drpColor').val() == '') {
            $('#drpColor').val($('#drpColor option').eq(1).attr('value'));
            drpColor_Size_Change(url);
        }
    }
}


function fixPng(png) {
    if (!png) return;
    if (!png.src) return;
    // get src
    var src = png.src;
    // set width and height
    if (!png.style.width) { png.style.width = $(png).width(); }
    if (!png.style.height) { png.style.height = $(png).height(); }
    // replace by blank image
    png.onload = function() { };
    png.src = blank.src;
    // set filter (display original image)
    png.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "',sizingMethod='scale')";
}



function Search(menuid, cn, sid) {
    if (!menuid) menuid = 0;
    if ((menuid + '').length == 0) menuid = 0;
    var key = $.trim($('#txtKeyword').val());

    if (key.length > 1) {
        key=key.replace('&', '%26')
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

function ResizeWin() {

}

function InitEmailVaildate_main(url) {

    if (url.length == 0) url = location.href;
    else {
        if (url.indexOf('http') == -1) {
            var lc = location.href;
            lc = lc.substr(0, lc.indexOf('/', 9));
            url = lc + url;
            //  alert(lc);
        }
    }

    $('#txtURL').html(url);
    $("#fmEmailToFriend").validate({
        rules: {
            ToEmail: {
                required: true,
                email: true
            },
            FromEmail: {
                required: true,
                email: true
            }

        },
        messages: {
            ToEmail: {
                required: "*",
                email: "@"
            },
            FromEmail: {
                required: "*",
                email: "@"
            }
        },
        submitHandler: function() {

            $.post("ajax_friend.asp",
              {
                  URL: $('#txtURL').html(),
                  Note: $('#txtNote').val(),
                  To: $('#txtTo').val(),
                  ToEmail: $('#txtToEmail').val(),
                  FromEmail: $('#txtFromEmail').val(),
                  From: $('#txtFrom').val(),
                  Action: 'SendEmail'
              },
              function(data) {
                  $('.plEmailToFriend').html(data);
              }
            );
        }



    });
    setTimeout("txtTo_focus()", 1000);
}
function txtTo_focus() {
    $('#txtTo').focus();
}
function InitEmailVaildate() {
    InitEmailVaildate_main('');
}

//shop by

function getHighColor(menuid) {

    var recolor = '#ffff00';
    switch (menuid) {
        case '1':
            {

                recolor = "#CCFFFF";
                break;
            }
        case '2':
            {
                recolor = "#FFCCFF";
                break;
            }
    }


    return recolor;
}
function lbtnAllDesignerLink_click() {
    $('.sbd_sub').hide(); $('.sbd').show(); $('#lbtnAllDesignerLink').hide();
}

function sbd_click(obj, menuid, cn) {

    if ($(obj).attr('class').indexOf('_sub') == -1) {

        $('.sbd span').css('background-color', '#ffffff');
        $(obj).find('span').css('background-color', getHighColor(menuid));


    }
    var loc = 'products.asp?menuid=' + menuid + '&subcatid=0&designerid=' + $(obj).attr('id').replace('sbd_', '') + '&cn=' + cn + '&view=all';
    location.href = (loc);
}

function sbc_click(obj, menuid, cn) {
    if ($(obj).attr('class').indexOf('_sub') == -1) {
        $('.sbc span').css('background-color', '#ffffff');
        $(obj).find('span').css('background-color', getHighColor(menuid));
    }
    var loc = 'products.asp?menuid=' + menuid + '&subcatid=' + $(obj).attr('id').replace('sbc_', '') + '&designerid=0&cn=' + cn + '&view=all';
    location.href = (loc);
}

var Inited = false;

function InitShopBy(designerid, subcatid, color) {
    if (subcatid > 0) {

        shopby_c_click(color);
        $('#sbc_' + subcatid).find('span').css('background-color', getHighColor(menuid));
    }

    if (designerid > 0) {
        shopby_d_click(color);
        $('#sbd_' + designerid).find('span').css('background-color', getHighColor(menuid));
    }

    $('#lbtnAllDesignerLink').click(lbtnAllDesignerLink_click);
    var loc = location.href;
    loc = loc.substr(0, loc.lastIndexOf('=') + 1) + 'aaaaaaaaaaaaaaaaa';

    if (location.href.indexOf('mode=splash') != -1) {
        lbtnAllDesignerLink_click();

    }

    if (loc.indexOf('products.asp?menuid=aaaaaaaaaaaaaaaaa') != -1) {

        shopby_d_click(color);
    }

    Inited = true;
}


function shopby_d_click(color) {
    //  $('.shopby_c').css('background', '#999');
    // $('.shopby_d').css('background', '#000');
    //   alert(color);

    if (Inited) { $('.sbd_sub').hide(); $('.sbd').show(); $('#lbtnAllDesignerLink').hide(); }

    // $('.shopby_d img').eq(0).attr('src', '/images/buttons/designer_' + color + '_button.png');
    //$('.shopby_c img').eq(0).attr('src', '/images/buttons/category_gray_button.png');

    $('.shopby_sub_c').hide();
    $('.shopby_sub_d').show();
}

function shopby_c_click(color) {
    // alert(color);
    // $('.shopby_d').css('background', '#999');
    //$('.shopby_c').css('background', '#000');

    //$('.shopby_d img').eq(0).attr('src', '/images/buttons/designer_gray_button.png');
    // $('.shopby_c img').eq(0).attr('src', '/images/buttons/category_' + color + '_button.png');


    $('.shopby_sub_d').hide();
    $('.shopby_sub_c').show();
}



function GetCCID(ccnumber) {
    /*
    <option selected value="1">Visa</option>
    <option value="2">MasterCard</option>
    <option value="3">AMEX</option>
    <option value="4">Discover</option>
    */
    var cc = GetCreditCardTypeByNumber(ccnumber);
    var re = 0;
    switch (cc) {
        case 'Visa':
            {
                re = 1; break;
            } case 'MasterCard':
            {
                re = 2; break;
            } case 'AMEX':
            {
                re = 3; break;
            } case 'Discover':
            {
                re = 4; break;
            }
    }
    return re;

}
function GetCreditCardTypeByNumber(ccnumber) {
    cc = (ccnumber + '').replace(/\s/g, ''); //remove space

    if ((/^(34|37)/).test(cc) && cc.length == 15) {
        return 'AMEX'; //AMEX begins with 34 or 37, and length is 15.
    } else if ((/^(51|52|53|54|55)/).test(cc) && cc.length == 16) {
        return 'MasterCard'; //MasterCard beigins with 51-55, and length is 16.
    } else if ((/^(4)/).test(cc) && (cc.length == 13 || cc.length == 16)) {
        return 'Visa'; //VISA begins with 4, and length is 13 or 16.
    } else if ((/^(300|301|302|303|304|305|36|38)/).test(cc) && cc.length == 14) {
        return 'DinersClub'; //Diners Club begins with 300-305 or 36 or 38, and length is 14.
    } else if ((/^(2014|2149)/).test(cc) && cc.length == 15) {
        return 'enRoute'; //enRoute begins with 2014 or 2149, and length is 15.
    } else if ((/^(6011)/).test(cc) && cc.length == 16) {
        return 'Discover'; //Discover begins with 6011, and length is 16.
    } else if ((/^(3)/).test(cc) && cc.length == 16) {
        return 'JCB';  //JCB begins with 3, and length is 16.
    } else if ((/^(2131|1800)/).test(cc) && cc.length == 15) {
        return 'JCB';  //JCB begins with 2131 or 1800, and length is 15.
    }
    return '?'; //unknow type
}

function IsValidCC(str) { //A boolean version
    if (GetCreditCardTypeByNumber(str) == '?') return false;
    return true;
}                    

function InitLookbook() {
	//alert($('.productgrid').html());
	var Products = $('.productgrid').html();
    if (Products != null && Products.indexOf(',') < 0) {
        Products = $('.featured').html();
        $.get('/ocsearch.asp?mode=featured&cat=' + $('#menuType').val() + '&groupid=' + Products + '&featured=true', function (html) {
            $('.productgrid').html(html);
            InitQuickView();
        });
    } else {
        $.get('/ocsearch.asp?mode=ajax&cat=women&productid=' + Products, function (html) {
            $('.productgrid').html(html);
            InitQuickView();
        });
    }
	//$('.productgrid').html('')
	$('.productgrid').css('display','block');
	InitQuickView();
	

}