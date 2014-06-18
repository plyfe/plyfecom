(function($,window){

    $.fn.featuredLink = function(options){
        options = $.extend({
            value : ''
        }, options);

        var link = $(this);

        link.bind('click', function(e){
            if ( link.attr('target') != '_blank' ) {
                e.preventDefault();
                var wLeft = (typeof(window.screenLeft) != 'undefined') ? window.screenLeft : window.screenX,
                    wTop = (typeof(window.screenTop) != 'undefined') ? window.screenTop : window.screenY,
                    dLeft = ($(window).width()/2)-(420),
                    dTop = ($(window).height()/2)-(300),
                    left = wLeft + dLeft,
                    top = wTop + dTop;
                window.open(link.attr('href'), '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=840, height=600, top='+top+', left='+left);

                link.attr({ href:link.attr('rel') });
                link.closest('p.fresh_ft')
                    .addClass('played')
                    .removeClass('fresh_ft');
                if(link.hasClass('ftlink-button-text'))
                    link.text('Already Played');
            }
        })
    }

    $('#content').find('.loyalty-featured-link-clicked, .loyalty-featured-link').each(function(){
        $(this).featuredLink();
    });

})(jQuery,window);