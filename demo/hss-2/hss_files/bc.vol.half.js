/**
 * optionally set bcExperienceId to feed onTemplateReady
 * or, the first 'object' element having class='BrightcoveExperience' will be the winner
 * 
 */
var brightcove_video_volume = window.brightcove_video_volume || 0.25;

//alert(brightcove_video_volume);

function zBrightcove_SetVideoVolume(experienceID) {
    var player = brightcove.getPlayer(experienceID);
    var video = player.getModule(APIModules.VIDEO_PLAYER);
    //video.setVolume(brightcove_video_volume); 
    video.mute();
}

/**
 * there are times brightcove does not fire this event!
 * 
 */
function onTemplateLoaded(experienceID) {
    return;
}        
function onTemplateReady(e) {
    if (brightcove.checkFlashSupport() && brightcove.checkFlashSupport().majorVersion) {
        //alert("@BC-onTemplateReady - has flash player");
        var expId = window.bcExperienceId || "";
        if (!expId) {
            if ($('object.BrightcoveExperience').length) {
                expId = $($('object.BrightcoveExperience')[0]).attr('id');
            }
        }
        zBrightcove_SetVideoVolume(expId);
    } 
}
