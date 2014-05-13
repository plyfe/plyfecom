/*
New integration against Youtube's iframe API:
  https://developers.google.com/youtube/iframe_api_reference

Handles callbacks and playback-related events.
*/

var yt_player;

function ytInit(player_id, width, height, video_id, stats_obj, autoplay){
    window.magnify = {};
    window.magnify.yt_params = {};
    window.magnify.yt_params.player_id = player_id;
    window.magnify.yt_params.width = width;
    window.magnify.yt_params.height = height;
    window.magnify.yt_params.video_id = video_id;
    window.magnify.yt_params.autoplay = autoplay;
    window.magnify.yt_params.stats_obj = stats_obj;
    if (typeof YT !=='undefined'){
        onYouTubeIframeAPIReady();
    }
    else {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
};

function onYouTubeIframeAPIReady(){
    var yt_player = new YT.Player(window.magnify.yt_params.player_id, {
        playerVars: { 'autoplay': window.magnify.yt_params.autoplay },
        height: window.magnify.yt_params.height,
        width: window.magnify.yt_params.width,
        videoId: window.magnify.yt_params.video_id,
        events: {
            'onReady': onYoutubeIframePlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

function onYoutubeIframePlayerReady(event) {
    window.magnify.yt_params.stats_obj.trackPlayer(event.target);
    var userAgent = window.navigator.userAgent;

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) ||  userAgent.match(/Android/i)) {
        // do not play video automatically, because this will break the player on iOS. Instead we have to wait for the user to initiate the playback - Apple's rules.
    }
    else {
        event.target.playVideo();
    }
};

var done = false;

function onPlayerStateChange(event){
    window.magnify.yt_params.stats_obj.monitorStateChange(event.data);
};

function stopVideo(){
    player.stopVideo();
};