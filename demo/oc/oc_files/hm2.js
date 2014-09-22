var step = 0;
var cn = 0;
var cn2 = 0;
var cn3 = 0;
var otop;
$(document).ready(function () {
	if ($('.plBlimp').length>0){
	    otop = parseInt($('.plBlimp').css('top').replace('px', ''));
	    $('.plBlimp').show();
	    Blimp();
	    neon(); neon2(); neon3();
	    //$('.hm2_tv_flv').html('<embed type="application/x-shockwave-flash" src="http://a2.ocimage.us/images/hm2/homeplayer.2.swf" wmode="transparent" quality="high" allowfullscreen="true"  flashvars="clickTag=/entry.asp?sid=5&amp;file=' + $.trim($('.hm2_tv_flv').text()) + '&amp;autostart=true&amp;height=83&amp;width=102"   height="76"   width="101"></embed>');
	}
});



function Blimp() { var left = parseInt($('.plBlimp').css('left')); var top = otop; if (step % 2 == 0) top = otop + (new Date()).valueOf() % 6 - 3; if (left > -1272) { left = left - 3; step++; } else { left = document.body.clientWidth; step = 0; } $('.plBlimp').css({ 'left': left + 'px', 'top': top + 'px' }); setTimeout("Blimp()", 25); }
function neon() { $('.neon').attr('src', '/images/hm2/ne_shop' + (cn++) % 2 + '.png'); setTimeout("neon()", 1000); }
function neon2() { $('.neon2').attr('src', '/images/hm2/la_banner' + (cn2++) % 2 + '.png'); setTimeout("neon2()", 1500); }
var neon3src = '';

function neon3() {
    if (neon3src.length == 0) {
        neon3src = $('.neon3').attr('src');
        if (!neon3src) return;
        neon3src = neon3src.substring(neon3src.lastIndexOf('_') + 1, neon3src.lastIndexOf('.'));
    }

    if ((' 00 01 02 03 04 05 ').indexOf(' ' + neon3src + ' ') == -1) {
        return;
    }

    $('.neon3').attr('src', '/images/hm2/cd/OC_CNTDWN_' + neon3src + (cn3++) % 2 + '.gif');

  setTimeout("neon3()", 700);
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
