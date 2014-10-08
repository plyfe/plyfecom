/*
 * @Target.ca Video
 * @Video Functionality added through Simply Accessible logic base, recently added
 * @author paul.placido@target.com, alessandro.miralles@target.com
 */

TargetCA.video = {
    isOpened : false,
    player: null,
    originalFocus : null,
    originalPos : null,
    intValTemp : 0,
    init: function() {
        $(window).on('load',function(){
            if ( $( 'body' ).hasClass( 'mobile' ) ){
                // Small
                TargetCA.video.smallVideo();
            } else {
                // Big
                TargetCA.video.largeVideo();
            }
        });
        TargetCA.video.ieHashtagFix();
    },
    ieHashtagFix : function() {
        if( !$( 'body' ).hasClass( 'ie8' ) ) return false;

        var originalTitle = document.title.split("#")[0];
        
        document.attachEvent( 'onpropertychange', function (evt) {
            if( evt.propertyName === 'title' && document.title !== originalTitle ) {
                setTimeout(function () {
                    document.title = originalTitle;
                }, 1);
            }
        });
    },
    // video functionality for screensizes under 720px wide (tablet and mobile)
    smallVideo: function() {
        $.each($(".video"), function(i, object){
            var obj = $(object),
                video_url = obj.find('a').data('video'),
                poster,
                width,
                height,
                video,
                source;

            if(obj.find('#poster').attr('src') != undefined) {
                poster = obj.find('#poster').attr('src');
                width = obj.find('#poster').width();
                height = obj.find('#poster').height();

                if(obj.find('#poster').width() <= 10) {  //being careful
                    width = 200;
                    height = 100;
                }
            } else {
                poster = obj.find('a img').attr('src');
                width = obj.find('a img').width();
                height = obj.find('a img').height();
            }

            video = $('<video/>', {
                id: 'video_'+i,
                'controls': '',
                'autobuffer': '',
                'preload': 'auto',
                'poster': poster,
                Width: width, // case of attribute name is important to bypass jQuery's width() method
                Height: height // case of attribute name is important to bypass jQuery's height() method
            });
            video.addClass( 'noSwipe' );

            source = $('<source/>', {
                'src': video_url+'.mp4',
                'type': 'video/mp4'
            });

            obj.empty();
            obj.append(video.append(source));

            source = $('<source/>', {
                'src': video_url+'.ogg',
                'type': 'video/ogg'
            });
            obj.append(video.append(source));

            source = $('<source/>', {
                'src': video_url+'.webm',
                'type': 'video/webm'
            });
            obj.append(video.append(source));
        });
    },
    // video functionality for screensizes 720px or wider (desktop)
    largeVideo: function() {
        $(".video a.thumbnail").each(initVideoThumbnails);
        var windowWidth = $( window ).width();
        
        $( window ).bind( 'load resize orientationchange', function(){
            if( $('.vid_popup .vid_center').hasClass( 'vid_group' ) ){
                var lightbox_height,
                    lightbox_width = $('.vid_popup').width() - 40;
             
                if(lightbox_width > 900) {
                    lightbox_width = 900;
                }
                lightbox_height = lightbox_width*.5625;
                //beauty secrets beauty cosmetic hack
                if($(".beauty-secrets").length > 0) {
                    lightbox_height++;
                    /*if($("body").hasClass("ff")) {
                        lightbox_height-=0.25;
                    }*/
                    if( lightbox_height > 506 ){
                        lightbox_height = 506;
                    }
                    if( $( 'body' ).hasClass( 'ie8' ) ){
                        lightbox_height -= 1;
                    }
                    if(!video_group || video_group == ''){
                        gallery_height = 0;
                    }
                }

                $('.vid_popup .vid_center').css({ 'width': lightbox_width });
                var setHeight = ($(window).height() - $(".vid_popup .vid_center").outerHeight(true))/2;
                if( setHeight < 0 ){
                    setHeight = 0;
                }
                $('.vid_popup .vid_center').css({
                    'top': setHeight,
                });
                
                $( '.vid_popup #video' ).css( 'width', '100%' );

                var topValue = ($(window).height() - $(".vid_popup .vid_center").outerHeight())/2;
                if( topValue < 0 ){
                    topValue = 0;
                }
                $('.vid_popup .vid_center').css({
                    'top': topValue,
                });
            }
        });
        function initVideoThumbnails() {
            var link = $(this),
                player,
                video_player_labels,
                has_playlist = false;
            
            if( $('body').hasClass('ff') && $('.playIcon', link).css('pointer-events') == 'none') {
                link.hover(
                    function(){
                        $('.playIcon', link).css('opacity','0.6');
                    },
                    function(){
                        $('.playIcon', link).css('opacity','1');
                    }
                )
            }

            // opens video player and loads the apropriate video
            link.click(function(e){
                /*if(TargetCA.video.player){
                    TargetCA.video.player.pause();
                    TargetCA.video.player.dispose();
                }*/
                if(TargetCA.video.player == null){
                    TargetCA.video.originalFocus = link;
                    TargetCA.video.originalPos = link.offset().top;
                }
                var cc_lang = "English",
                    lightbox_height,
                    lightbox_width = $('.vid_popup').width() - 40,
                    video_id = link.attr('href').substring(1),
                    video_group = $(this).parent().data('group'),
                    gallery_height = 100;

                if(lightbox_width > 900) {
                    lightbox_width = 900;
                }
                lightbox_height = lightbox_width*.5625;
                //beauty secrets beauty cosmetic hack
                if($(".beauty-secrets").length > 0) {
                    lightbox_height++;
                    /*if($("body").hasClass("ff")) {
                        lightbox_height-=0.25;
                    }*/
                    if( lightbox_height > 506 ){
                        lightbox_height = 506;
                    }
                    if( $( 'body' ).hasClass( 'ie8' ) ){
                        lightbox_height -= 1;
                    }
                    if(!video_group || video_group == ''){
                        gallery_height = 0;
                    }
                }

                $('.vid_popup .vid_center').css({'width': lightbox_width, 'margin-top': '-' + lightbox_height/2 + 'px'});
                if(video_group && video_group != ''){
                    $('.vid_popup .vid_center').addClass( 'vid_group' );
                }
                if(video_group && video_group != ''){

                    $('.vid_popup .vid_center').css({
                        'top': '1%',
                        "margin-top": 0
                    });

                    $( '.vid_popup' ).css( 'overflow', 'scroll' );

                    $('.vid_popup .vid_center').on("touchmove", function(e){
                        e.stopPropagation();
                    });
                    
                    $("html, body").css({
                        "height": "100%",
                        "overflow": "hidden"
                    });
                }
                
                $('a,input,select,textarea,button').attr('tabIndex', -1);
                $('.vid_popup').find('a,input,select,textarea,button').attr('tabIndex', 0);

                e.preventDefault();

                
                if ($('body').hasClass('fr')) { cc_lang = "Français"; }

                if( $( 'body' ).hasClass( 'ff' ) ){
                    lightbox_height = Math.floor( lightbox_height );
                }

                video = $('<video/>', {
                    id: video_id,
                    'class': 'video-js vjs-default-skin',
                    'controls': '',
                    'preload': 'auto',
                    Width: lightbox_width, // case of attribute name is important to bypass jQuery's width() method
                    Height: lightbox_height // case of attribute name is important to bypass jQuery's height() method
                }),
                video_types = {
                    'mp4': 'video/mp4',
                    'webm': 'video/webm',
                    'ogv': 'video/ogg'
                },
                source = [],
                captions = $('<track/>', {
                    'kind': 'captions',
                    'src': link.data('captions'),
                    'srclang': 'en',
                    'label': cc_lang
                }),

                close_link = (!$('.vid_close').length)?$('<a/>', {
                    html: '<img src="/assets/images/sprite-main.png" alt="close video">',
                    'class': 'vid_close accessibleSprite',
                    href: link.attr('href'),
                    // click handler for the close button
                    click: function(e) {
                        e.preventDefault();
                        TargetCA.video.stopPlayer(TargetCA.video.player, link);
                    }
                }):'';

                $.each(video_types, function(ext, type){
                    source.push({
                        'src': link.data('video') + '.' + ext,
                        'type': type
                    });
                });
                
                if(video_group && video_group != ''){
                    has_playlist = true;
                    if(!$('#gallery_container').length){
                        var gallery_container = $('<div>', {
                            'id': 'gallery_container'
                        });
                        
                        gallery_container.append($('.multivideo').clone());

                        $('#lightbox').append($('<div class="videoDetails"><h2></h2><div class="videoLinks"></div><div class="multivideoShare"></div></div>'), gallery_container);
                        
                        $('.gallery_trigger', gallery_container).each(function(){
                            $(this).attr('id', $(this).attr('data-clone-id'));
                        });

                        $(".video a.thumbnail", gallery_container).each(initVideoThumbnails);
                        //reinitialize video here
                        // TargetCA.bts.initBTSCarousels($(".multivideo", gallery_container));
                        $('#gallery_container .multislide nav').css({
                            "top": $('#gallery_container .multislide .video').height()/2 - 19 - $('#gallery_container .multislide .slide').height()/2 + 40
                        });
                        //$('.multislide .page', gallery_container).insertBefore($('.multislide nav', gallery_container));
                    } else {
                        $('#lightbox').append($('.videoDetails'), $('#gallery_container'));
                    }

                    $.each( $( '#gallery_container .item a.thumbnail.gallery_trigger' ), function( index, value ){
                        var newTrack = $('<track/>', {
                            'kind': 'captions',
                            'src': $( value ).attr( 'data-captions' ),
                            'srclang': 'en',
                            'label': cc_lang
                        });
                        video.append(newTrack);
                    });
                }

                //Check if the video is associated with a group, add the player to the page
                $('#lightbox').prepend(close_link, video.append(captions));

                if ($('body').hasClass('fr') ) {
                    video_player_labels = {
                        'play': 'Play (Français)',
                        'pause': 'Pause (Français)',
                        'play_video': 'play video (Français)',
                        'current_time': 'Current Time (Français)',
                        'duration_time': 'Duration Time (Français)',
                        'remaining_time': 'Remaining Time (Français)',
                        'video_progress_bar': 'video progress bar (Français)',
                        'loaded': 'Loaded (Français)',
                        'progress': 'Progress (Français)',
                        'fullscreen': 'Fullscreen (Français)',
                        'nonfullscreen': 'Non-fullscreen (Français)',
                        'mute': 'Mute (Français)',
                        'unmute': 'Unmute (Français)',
                        'volume_level': 'volume level (Français)',
                        'captions': 'Captions (Français)',
                        'subtitles': 'Subtitles (Français)',
                        'chapters': 'Chapters (Français)',
                        'captions_menu': 'Captions Menu (Français)',
                        'subtitles_menu': 'Subtitles Menu (Français)',
                        'chapters_menu': 'Chapters Menu (Français)',
                        'off': 'Off (Français)',
                        'selected': 'Selected (Français)'
                    };
                } else {
                    video_player_labels = {
                        'play': 'Play',
                        'pause': 'Pause',
                        'play_video': 'play video',
                        'current_time': 'Current Time',
                        'duration_time': 'Duration Time',
                        'remaining_time': 'Remaining Time',
                        'video_progress_bar': 'video progress bar',
                        'loaded': 'Loaded',
                        'progress': 'Progress',
                        'fullscreen': 'Fullscreen',
                        'nonfullscreen': 'Non-fullscreen',
                        'mute': 'Mute',
                        'unmute': 'Unmute',
                        'volume_level': 'volume level',
                        'captions': 'Captions',
                        'subtitles': 'Subtitles',
                        'chapters': 'Chapters',
                        'captions_menu': 'Captions Menu',
                        'subtitles_menu': 'Subtitles Menu',
                        'chapters_menu': 'Chapters Menu',
                        'off': 'Off',
                        'selected': 'Selected'
                    };
                }

                if( $( 'body' ).hasClass( 'ie10' ) ){
                    // open video modal
                    player = _V_(video.attr('id'), {
                        'labels': video_player_labels,
                        'image': '/assets/images/video.png',
                        'flash': { swf: '/assets/swf/video.swf' },
                        'techOrder': ['flash']
                    // load and play video
                    }, function() {});
                } else {
                     // open video modal
                    player = _V_(video.attr('id'), {
                        'labels': video_player_labels,
                        'image': '/assets/images/video.png',
                        'flash': { swf: '/assets/swf/video.swf' },
                        'techOrder': ['html5', 'flash']
                    // load and play video
                    }, function() {});
                }
                TargetCA.video.player = player;
                player.src(source);
                player.off('ended');
                player.on('ended', function(){
                    var video_next_index;
                    $('#gallery_container .item').each(function(index){
                        if($(this).hasClass('current')){
                            video_next_index = index+1;
                            return false;
                        }
                    });
                    var total_videos = $('#gallery_container .video').length-1;
                    video_next_index = (video_next_index <= total_videos)?video_next_index:0;
                    var itemPerSlide = $("#gallery_container .inpage-look-book").data("carousel").settings.itemPerSlide;
                    if(video_next_index % itemPerSlide == 0) $("#gallery_container .inpage-look-book").Carousel("next");
                    $('.gallery_trigger', $('#gallery_container .video')[video_next_index]).click();
                    clearInterval( TargetCA.video.intValTemp );
                });
                
                $(".vid_popup").fadeIn(600, function() {
                    if(has_playlist){
                        $('#gallery_container .current').removeClass('current');
                        var current_video = link.attr('data-clone-id');
                        $('#'+current_video).parent().parent().parent().addClass('current');
                        $('#lightbox .multivideoShare').html( $('.videoSocial', $('#'+current_video).closest('.item')).clone() );
                        $('#lightbox .videoDetails h2').html( $('#'+current_video).attr('data-videotitle'));
                        //videoLinks
                        $('#lightbox .videoLinks').html( $('.transcript', $('#'+current_video).closest('.item')).clone() );
                        $('#lightbox .videoLinks .transcript').attr( 'href', $('#lightbox .videoLinks .transcript').attr('href') + '&v=true' );
                        $( '.vid_popup video#video' ).remove();
                        $( '#lightbox .vjs-captions-button .vjs-menu-item' ).hide();
                        var video_next_index = 0;
                        $('#gallery_container .item').each(function(index){
                            if($(this).hasClass('current')){
                                video_next_index = index+1;
                                return false;
                            }
                        });
                        var setHeight = ($(window).height() - $(".vid_popup .vid_center").outerHeight(true))/2;
                        if( setHeight < 0 ){
                            setHeight = 0;
                        }
                        $('.vid_popup .vid_center').css({
                            'top': setHeight,
                        });
                        
                        var showCC = false;
                        if( !$( $( '#lightbox .vjs-captions-button .vjs-menu-item' )[0] ).hasClass( 'vjs-selected' ) ) {
                            showCC = true;
                        }
                        $( $( '#lightbox .vjs-captions-button .vjs-menu-item' )[0] ).show().click(); //show the "off" button
                        $( $( '#lightbox .vjs-captions-button .vjs-menu-item' )[video_next_index] ).show();
                        if( showCC ){
                            $( $( '#lightbox .vjs-captions-button .vjs-menu-item' )[video_next_index] ).click();
                        }
                        $( '#lightbox .vjs-captions-button .vjs-menu' ).hide();       
					}

                    if( ( $( 'body' ).hasClass( 'ie8' ) || $( 'body' ).hasClass( 'ie10' ) ) && TargetCA.video.isOpened == false ) {
                        setTimeout( function(){
                            $( 'button.vjs-play-control.vjs-control' ).click();
                        }, 1000 );
                    }

                    TargetCA.video.isOpened == true;

                    if( TargetCA.helpers.getHash() == link.data( 'videohash' ) && TargetCA.video.isOpened == false ){
                        player.pause();
                    } else {
                        player.play();
                    }

                }).addClass('is-visible').attr('tabindex',-1).focus();

                // stop video and close modal on escape key press
                $(document).bind('keyup.modal', function(e) {
                    if ( (e.keyCode === 27) && ($('.vjs-fullscreen, .vjs-fullwindow').length === 0) ) {
                        e.preventDefault();
                        TargetCA.video.stopPlayer(player, link);
                        $(document).unbind('keyup.modal')
                    }
                });
            });
        }
    },
    // video 'stop' functionality
    stopPlayer: function(player, link) {
        player.pause();
        player.dispose();
        TargetCA.video.player = null;
        clearInterval( TargetCA.video.intValTemp );

        $('a,input,select,textarea,button').attr('tabIndex', 0);
        // close modal
        $(".vid_popup").fadeOut(600, function() {
            // Focus on the link that opened the video
            link.focus();
            // Remove the video player
            $('#lightbox').empty();
            // Dispose of the player object
            $('.vid_popup').show();
            TargetCA.video.originalFocus.attr( 'tabIndex', 0 ).focus();
            $( 'html, body' ).animate( { scrollTop:TargetCA.video.originalPos }, 10 );
            TargetCA.video.originalFocus = null;
            $("html, body").css({
                "height": "auto",
                "overflow": "visible" 
            });
        }).removeClass("is-visible");
    }
}