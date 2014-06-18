(function($){

    $.fn.tscSliders = function(options){
        options = $.extend({
            viewWidth: 630,
            playDuration: 5000,
            easing:'easeOutCubic',
            easingSpeed: 800,
            intervalNamespace: 'dynamicLeadInterval',
            playOnLoad: true,
            rejectSliderClasses : '.three-grid, .breaking, .breaking-text-only'
        }, options);
        var dynamicLead = $(this),
            nav = dynamicLead.find('nav'),
            navPause = nav.find('.pause'),
            navPlay = nav.find('.play'),
            wrapper = dynamicLead.find('.wrapper'),
            isPlaying = true,
            previous = function(){
                if(isPlaying)
                    clearInterval(options['intervalNamespace']);
                wrapper.children('article:last').prependTo(wrapper);
                wrapper
                    .css({left : '-'+options['viewWidth']+'px'})
                    .animate(
                        {left : '0px'},
                        {
                            duration : options['easingSpeed'],
                            easing : options['easing'],
                            queue : false,
                            complete : function(){
                                if(isPlaying)
                                    play();
                            }
                        }
                    );
            },
            next = function(){
                if(isPlaying)
                    clearInterval(options['intervalNamespace']);
                wrapper
                    .animate(
                    {left : '-'+options['viewWidth']+'px'},
                    {
                        duration : options['easingSpeed'],
                        easing : options['easing'],
                        queue : false,
                        complete : function(){
                            wrapper.children('article:first').appendTo(wrapper);
                            wrapper.css({left : '0px'});
                            if(isPlaying)
                                play();
                        }
                    }
                );
            },
            play = function(){
                options['intervalNamespace'] = setInterval(function(){
                    next();
                }, options['playDuration']);
            },
            pause = function(){
                clearInterval(options['intervalNamespace']);
            };

        if(dynamicLead.is(options['rejectSliderClasses']) || wrapper.find('article').size() <= 1)
            return false;


        nav.on('click','.prev, .next, .pause, .play', function(e){
            if(wrapper.is(':animated'))
                return false;
            if($(e.target).hasClass('prev')){
                previous();
            }else if($(e.target).hasClass('next')){
                next();
            }else if($(e.target).hasClass('pause')){
                navPause.css({display:'none'});
                navPlay.css({display:'block'});
                isPlaying = false;
                pause();
            }else if($(e.target).hasClass('play')){
                navPause.css({display:'block'});
                navPlay.css({display:'none'});
                isPlaying = true;
                play();
            }
        });

        if(options['playOnLoad'])
            play();

    };

})(jQuery);