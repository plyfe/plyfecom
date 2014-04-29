(function ($) {
    $.fn.dealerOnVehicleBanner = function (options) {
        var defaults = {
            delay: 5000,
            bullet: false,
            num: false,
            controls: false
        }
        var options = $.extend(defaults, options);
        var interval = 0;
        var o = options;
        var obj = $(this);
        var banner = $('ul', obj);
        var nav = $('div', obj);

        return this.each(function () {
            // debug(nav);
            $('img', obj).css('display', 'block');
            if (o.controls) {
                AddControls();
            }
            if (o.bullet) {
                AddBullet();
            }
            if (o.num) {
                //debug(o.num);
                AddNumber();
            }

            SlidShow();

        });

        function RotateGallery() {
            var first_li = $('li:first', banner).remove();
            banner.append(first_li);
            $('li:last', banner).hide().fadeIn(800);
            if (nav && o.bullet) {
                var lastChild = $('span', nav).last().remove();
                $('#thumbnails').prepend(lastChild);
            }
            if (nav && o.num) {
                $('#thumbnails span.current').first().removeClass('current');
                var active_class = $('#vehicleBanner li:last').attr('class');
                $('#thumbnails span.' + active_class).addClass('current');
            }
        };

        function RotateGalleryBack() {
            $('li:last', banner).fadeOut(200, function () {
                $(this).remove().show();
                banner.prepend(this);
                var acImg = $('li:last', banner).attr('class');
                $('#thumbnails span.current').removeClass('current');
                $('#thumbnails span.' + acImg).addClass("current");
                $('li', banner).css('display', 'block');
            });
        };

        function AddNumber() {
            var Html = '';
            $('li', obj).each(function (i) { Html += '<span class="bn' + parseInt(i + 1) + '">' + parseInt(i + 1) + '</span>'; });
            nav.append('<p id="thumbnails">' + Html + '</p>');
            $('#thumbnails span').first().addClass('current');
            $('#thumbnails span').each(function (i) {
                $(this).bind('click', function () {
                    //debug(i);
                    ShowImage('bn' + parseInt(i + 1));
                });
            });
        };
        function AddBullet() {
            var Html = '';
            $('li', obj).each(function () { Html += '<span>&bull; </span>'; });
            nav.append('<p id="thumbnails">' + Html + '</p>');
            $('#thumbnails span').first().addClass('current');

        };
        function AddControls() {
            nav.append('<div id="cButtons"><div id="prevBtn"></div><div id="playBtn" class="pause"></div><div id="nextBtn"></div></div>');
            $('#nextBtn').bind('click', RotateGallery);
            $('#playBtn').bind('click', SlidShow);
            $('#prevBtn').bind('click', RotateGalleryBack);
        };
        function ShowImage(acImg) {
            clearInterval(interval);
            //debug(acImg);
            var activNum;
            var gallery_li = $('li', obj);
            for (var i = 0; i < gallery_li.length; i++) {
                if ($(gallery_li[i]).attr('class') == acImg) {
                    activNum = i;
                    for (var i = 0; i <= activNum; i++) {
                        var gal_elm = $(gallery_li[i]).remove();
                        banner.append(gal_elm);
                    }
                }
            }
            $('#thumbnails span.current').first().removeClass('current');
            $('#thumbnails span.' + acImg).addClass("current");
        }

        function SlidShow() {
            var delay = o.delay;
       
            if (interval == 0) {
                interval = setInterval(RotateGallery, delay);
                if ($('#playBtn'))
                    $('#playBtn').addClass("pause");

            }
            else {
                clearInterval(interval);
                interval = 0;
                if ($('#playBtn'))
                    $('#playBtn').removeClass("pause");
            }
        };

        function debug(value) {
            if (window.console && window.console.log)
                window.console.log('hilight selection count: ' + value);
        };

    }
})(jQuery);

if (typeof (delayValue) == "undefined") {
    delayValue = 5000;
}

if ($('#vehiclemBulletThum')) $('#vehiclemBulletThum').dealerOnVehicleBanner({ delay: delayValue, bullet: true });
if ($('#vehicleNumThumbnail')) $('#vehicleNumThumbnail').dealerOnVehicleBanner({ delay: delayValue, num: true, controls: true });
	