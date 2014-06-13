function showTab(tabId, tabNo) {
  var tabCollection=document.getElementById(tabId);
  tabCollection.className=tabId+tabNo+'Visible';
}

var siCVPCounter = 0;
var siCVPAutoStart = false;
var siCVPSubsequent = false;
var siCVPPreviousId = '';
var siCVPAdTitle = '';
var cnnCVP;
var BCL = {};

// BRIGHTCOVE PLAYER MAPPING
var siVideoPlayerMap = [];
siVideoPlayerMap.videosection_4_1 = { playerId: '2546892348001', playerKey: 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'videohub_bc', width : 640, height: 373, autoStart: true };
siVideoPlayerMap.mmqbIframe = { playerId : '2574867243001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuesmJE_-v6y1KSsttioahs', playerAdZone: 'mmqb_bc', width : 776 , height: 436, autoStart: true };
siVideoPlayerMap.blogIframe = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'siblogs_bc', width : 576 , height: 324, autoStart: true };
siVideoPlayerMap.blog_embed = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'siblogs_bc', width : 275 , height: 200, autoStart: true };
siVideoPlayerMap.FN_rightrail = { playerId : '2551309455001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhu-df-vnWhwqt5OhmsPRCxC', playerAdZone: 'fannation/rightrail_bc', width : 288 , height: 162, autoStart: true };
siVideoPlayerMap.cms3HomepageVideoBox = { playerId : '2551309391001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsEimp0Rh5LiE2shF7a6HEA', playerAdZone: 'home_bc', width : 320, height: 180, autoStart: true };
siVideoPlayerMap.t1 = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 't1_bc', width : 640, height: 373, autoStart: true };
siVideoPlayerMap.sinow = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'sinow_bc', width : 640, height: 373, autoStart: true };
siVideoPlayerMap.sinowLive = { playerId : '2637573163001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhs4gGZOQ4IPmUtyJFRhCgg8', playerAdZone: 'sinow_bc', width : 640, height: 373, autoStart: true };
siVideoPlayerMap.sinowT1 = { playerId : '2551309390001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhtbHOMVXx0P0jHkj-Qw69-N', playerAdZone: 'sinow_bc', width : 640, height: 373, autoStart: false };
siVideoPlayerMap.profootballnow = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'profootballnow_bc', width : 640, height: 373, autoStart: true };
siVideoPlayerMap.profootballnowLive = { playerId : '2637573163001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhs4gGZOQ4IPmUtyJFRhCgg8', playerAdZone: 'profootballnow_bc', width : 640, height: 373, autoStart: true };
siVideoPlayerMap.profootballnowT1 = { playerId : '2551309390001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhtbHOMVXx0P0jHkj-Qw69-N', playerAdZone: 'sinow_bc', width : 640, height: 373, autoStart: false };
siVideoPlayerMap.storyEmbed = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: '', width: 400 , height: 225, autoStart: false };
siVideoPlayerMap.story_4_1 = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: '', width: 640 , height: 373, autoStart: false };
siVideoPlayerMap.roadtoatlanta = { playerId : '2574867260001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsWnGn2_DVffoM8-GRbc4zz', playerAdZone: 'roadtoatlanta_bc', width: 576 , height: 397, autoStart: true };
siVideoPlayerMap.fastbreak = { playerId : '2574867260001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsWnGn2_DVffoM8-GRbc4zz', playerAdZone: 'fastbreak_bc', width: 576 , height: 397, autoStart: true };
siVideoPlayerMap.freshtakes = { playerId : '2574867260001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsWnGn2_DVffoM8-GRbc4zz', playerAdZone: 'freshtakes_bc', width: 576 , height: 397, autoStart: true };
siVideoPlayerMap.ncaab_microsite_fastbreakflavor = { playerId : '2574867260001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsWnGn2_DVffoM8-GRbc4zz', playerAdZone: 'freshtakes_bc', width: 576 , height: 397, autoStart: true };
siVideoPlayerMap.ncaab_microsite_breakdown = { playerId : '2574867260001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsWnGn2_DVffoM8-GRbc4zz', playerAdZone: 'sethdavismicrosite_bc', width: 576 , height: 397, autoStart: true };
siVideoPlayerMap.remarkableperformances = { playerId : '2574867260001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsWnGn2_DVffoM8-GRbc4zz', playerAdZone: 'remarkableperformances_bc', width: 576 , height: 397, autoStart: true };
siVideoPlayerMap.theshow = { playerId : '2574867260001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsWnGn2_DVffoM8-GRbc4zz', playerAdZone: 'theshow_bc', width: 576 , height: 397, autoStart: true };
siVideoPlayerMap.futuregamechangers = { playerId : '2574867260001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsWnGn2_DVffoM8-GRbc4zz', playerAdZone: 'gamechangers_bc', width: 576 , height: 397, autoStart: true };
siVideoPlayerMap.recapPlayer = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'gameflash_bc', width: 640 , height: 373, autoStart: false };
siVideoPlayerMap.swim13 = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'swimsuit_bc', width: 640 , height: 423, autoStart: true };
siVideoPlayerMap.swim09 = { playerId : '2551309459001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhsohDQFp7WAwxgORu_hAXxT', playerAdZone: 'swimsuit_bc', width : 640 , height: 373, autoStart: true };
siVideoPlayerMap.underdogs = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'underdogs_bc', width: 853 , height: 480, autoStart: true };
siVideoPlayerMap.hspotw = { playerId : '2546892348001', playerKey : 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'hspotw_bc', width: 640 , height: 373, autoStart: false };
siVideoPlayerMap.offtherecord = { playerId: '2546892348001', playerKey: 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'offtherecord_bc', width : 640, height: 373, autoStart: true };
siVideoPlayerMap.aroundtheworld = { playerId: '2546892348001', playerKey: 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhuasNZF5WPK5LWKKRK4p1HG', playerAdZone: 'aroundtheworld_bc', width : 640, height: 373, autoStart: true };

/* create cvpPlayers array for legacy code */
var cvpPlayers = [];

/* 
instantiate cvp
  videoId - video to play
  vArea - div id to embed player
  vContext - player context name
  vReturn - return the name of the player if mulitple players on the page (0,1)
 */
function cnnVideoNewPlayer(videoId, vArea, vContext, vReturn, width, height) {
  var vWidth, vHeight, playerID, playerKey, videoUrl, contentId;

  if (typeof vArea == 'undefined') {
    vArea = "player"+videoId;
  }
  if (typeof vContext == 'undefined') {
    vContext = "videosection_4_1";
  }
  if (typeof width == 'undefined') {
    width = 0;
  }
  if (typeof height == 'undefined') {
    height = 0;
  }

  if(typeof siVideoPlayerMap[vContext] != 'undefined') {
    vWidth = siVideoPlayerMap[vContext].width;
    vHeight = siVideoPlayerMap[vContext].height;
  } else if (width !== 0 && height !== 0) {
    vWidth = width;
    vHeight = height;
  } else { // main, GotuitStream
    vWidth = 662; vHeight = 373;
  }

    playerID = siVideoPlayerMap[vContext].playerId;
//    playerID = '2159103141001';
    playerKey = siVideoPlayerMap[vContext].playerKey;
//    playerKey = 'AQ~~,AAAB9mw57HE~,xU4DCdZtHhva60KhJ4SMErR-CrOhlQmx';

	if(window.location.pathname.indexOf('2013_swimsuit') != -1) {
		videoId = 'swimsuit/' + videoId;
	}
	
	if(window.location.pathname.indexOf('/vault/swimsuit/') != -1) {
		videoId = 'swimsuit/' + videoId;
	}

  // BRIGHTCOVE FUNCTIONALITY
  BCL = {
    videoData: {},
    playerData: {
      "playerID" : playerID,
      "playerKey" : playerKey,
      "width" : vWidth,
      "height" : vHeight,
      "videoID": "",
	  "autoStart": siVideoPlayerMap[vContext].autoStart
    },
    isPlayerAdded: false,
    isPaused: false,
    isFifty: false,
    isReplay: false,
    isComplete: false,
    newContent: false,
	cvpContext: vContext,
	templateReadyCalled: false,
    playerTemplate: "<div style=\"display:none\"></div><object id=\"myExperience\" class=\"BrightcoveExperience\"><param name=\"bgcolor\" value=\"#000000\" /><param name=\"width\" value=\"{{width}}\" /><param name=\"height\" value=\"{{height}}\" /><param name=\"playerID\" value=\"{{playerID}}\" /><param name=\"playerKey\" value=\"{{playerKey}}\" /><param name=\"autoStart\" value=\"{{autoStart}}\" /><param name=\"isVid\" value=\"true\" /><param name=\"isUI\" value=\"true\" /><param name=\"dynamicStreaming\" value=\"true\" /><param name=\"@videoPlayer\" value=\"{{videoID}}\"; /><param name=\"includeAPI\" value=\"true\" /><param name=\"templateLoadHandler\" value=\"BCL.onTemplateLoaded\" /><param name=\"templateReadyHandler\" value=\"BCL.onTemplateReady\" />",
    addPlayer: function(video) {
      //ADD THE VIDEO'S CLICKBACK URL FROM CMS
      BCL.playerTemplate+="<param id=\"videoShareUrl\" name=\"linkBaseURL\" value=\""+videoUrl+"\" /></object>";
      // if we don't already have a player
      if (BCL.isPlayerAdded === false) {
        BCL.isPlayerAdded = true;
        var playerHTML = "";
        // set the videoID to the selected video
        BCL.playerData.videoID = video;
        // populate the player object template
        playerHTML = BCL.markup(BCL.playerTemplate, BCL.playerData);
        // inject the player code into the DOM
        document.getElementById(vArea).innerHTML = playerHTML;
        // instantiate the player
        brightcove.createExperiences();
      } else { // user must have requested a different video for player already loaded
        BCL.videoPlayer.loadVideoByID(video);
      }
    },
    markup: function (html, data) {
      var m;
      var i = 0;
      var match = html.match(data instanceof Array ? /{{\d+}}/g : /{{\w+}}/g) || [];

      while (m = match[i++]) {
        html = html.replace(m, data[m.substr(2, m.length-4)]);
      }
      return html;
    },
    onTemplateLoaded: function (experienceID) {
      BCL.player = brightcove.api.getExperience(experienceID);
      BCL.videoPlayer = BCL.player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
      BCL.experienceModule = BCL.player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
      BCL.contentModule = BCL.player.getModule(brightcove.api.modules.APIModules.CONTENT);
      BCL.adModule = BCL.player.getModule(brightcove.api.modules.APIModules.ADVERTISING);
      BCL.adEvents = brightcove.api.events.AdEvent;
	  try {
		BCL.setAdPolicy(BCL.videoData.category, BCL.videoData.subcategory, siGetAdsTitle(BCL.videoData.title));
	  } catch (e) { 
	  	siLog.debug(e);
	  }
    },
    onTemplateReady: function (evt) {
      BCL.adModule.addEventListener(brightcove.api.events.AdEvent.START, BCL.onAdBegin);
      BCL.adModule.addEventListener(brightcove.api.events.AdEvent.COMPLETE, BCL.onAdComplete);
      BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.BEGIN, BCL.onContentBegin);
      BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, BCL.onContentPlay);
      BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.STOP, BCL.onContentPause);
	  BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.SEEK_NOTIFY, BCL.onTrackingContentSeek);
      BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, BCL.onTrackingContentProgress);
      BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, BCL.onContentComplete);
      BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.ERROR, BCL.onContentError);
      BCL.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.CHANGE, BCL.onContentChange);
	  BCL.videoPlayer.getCurrentVideo( function (videoDTO) {
		videoDTO.displayName = "";
		BCL.contentModule.updateMedia(videoDTO, function (newVideoDTO) {
			if (siVideoPlayerMap[vContext].autoStart == true) {
				BCL.videoPlayer.play();
			}
		});
	  });
	  
		if (BCL.templateReadyCalled === false) {
			try {
				siTemplateReady(BCL.videoData, siVideoPlayerMap[vContext].playerAdZone);
			} catch(e) {
				siLog.debug('siTemplateReady: '+e);
			}
			BCL.templateReadyCalled = true;
		}
		siLog.debug('siTemplateReady: Complete');      
   
    },
	setAdPolicy: function (category, subcategory, adTitle) {
		var adPolicy = new Object();
		var adKeys = "";
		adPolicy.adServerURL = "http://pubads.g.doubleclick.net/gampad/ads?env=vp&gdfp_req=1&impl=s&output=xml_vast2&iu=/8484/si/video_bc/" + siGetAdZone(siVideoPlayerMap[vContext].playerAdZone) + "&sz=1000x1&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]";	  
		try {
			adKeys = "category=" + BCL.videoData.category + "&subcategory=" + BCL.videoData.subcategory + "&title=" + siGetAdsTitle(BCL.videoData.title);
		} catch (e) { 
			siLog.debug(e);
		}
		adPolicy.prerollAdKeys = adKeys;
		BCL.adModule.setAdPolicy(adPolicy);		 
	},
    getVideo: function(id, dataOnly) {
      // CHECK THE CMS3 GENERATED JSON FOR VIDEO INFORMATION
      var cvpDataUrl = 'http://sportsillustrated.cnn.com/.element/auto/json/video/'+id+'_callback.json?callback=?';
      //if(window.location.hostname.indexOf('turner') !== -1 && window.location.hostname.indexOf('sipreview') == -1) {
      //  cvpDataUrl = 'http://jcmsref9.turner.com:84/.element/auto/json/video/'+id+'_callback.json?callback=?';
      //}

      if (id != null && id != 'false') {
		try {
			var idVersion = id.match(/(\d{4})\/(\d{2})\/(\d{2})/);
			if (idVersion != null && id.indexOf('.SportsIllustrated') === -1) {
				var cvpDataUrl = 'http://sportsillustrated.cnn.com/.element/auto/json/video/'+id+'.SportsIllustrated_callback.json?callback=?';
			}
		} catch(e) {}
	}

      // SET DATAONLY TO FALSE IF NOT PROVIDED
      if((typeof dataOnly === 'undefined' || dataOnly === '') && dataOnly !== true) {
        dataOnly = false;
      }

      $.ajax({
        url: cvpDataUrl,
        dataType: 'jsonp',
        jsonpCallback: 'sibc_video',
        cache: true,
        success: function(data) {
          if(typeof data[0] !== 'undefined') {
            BCL.videoData = data[0];
            BCL.videoData.playerId = playerID;
            BCL.videoData.playerKey = playerKey;
            videoUrl = data[0].clickbackUrl;
            // IF DATA ONLY NO NEED TO ADD VIDEO PLAYER
            if(dataOnly === false) {
              // CHECK THAT THE CMS3 JSON INCLUDES THE BRIGHTCOVE MEDIA ID, IF NOT, QUERY BRIGHTCOVE DIRECTLY FOR VIDEO INFORMATION
              if(typeof data[0].brightcoveId !== 'undefined' && data[0].brightcoveId !== '') {
                BCL.addPlayer(data[0].brightcoveId);
              } else {
                BCL.getVideoBC(id);
              }
            }
          }
        }
      });
    },
    getVideoBC: function(id) {
      // RETRIEVE VIDEO INFORMATION BY QUERYING BRIGHTCOVE MEDIA API
      var mediaAPI = "http://api.brightcove.com/services/library?callback=?",
      token = 'HYk6klcc_dX8GkFqbW1C2tZHLqgLDxGWBMlica9EroqvNv-skogPlw..',
      searchTerm = 'reference_id:'+id;
      $.getJSON(mediaAPI, {
          command: 'search_videos',
          any: searchTerm,
          get_item_count: true,
          token: token,
          format: "json"
        }, function(data) {
          // CHECK THAT THE BRIGHTCOVE MEDIA ID EXISTS, IF NOT, DO NOTHING
          if(typeof data.items[0] !== 'undefined' && typeof data.items[0].id !== 'undefined' && data.items[0].id !== '') {
            // ONLY POPULATE OBJECT IF CMS3 QUERY FAILED TO PULL ANY DATA AT ALL
            if(typeof BCL.videoData.videoId === 'undefined' || BCL.videoData.videoId === '') {
              BCL.videoData = data.items[0];
              BCL.videoData.playerId = playerID;
              BCL.videoData.playerKey = playerKey;
            }
            BCL.addPlayer(data.items[0].id);
          }
        });
    },
    onAdBegin: function(evt) {
      try {
        siAdBegin(BCL.videoData, BCL.videoData.videoId);
      } catch(e) {
        siLog.debug('siAdBegin: '+e);
      }
      if(BCL.isComplete === true && BCL.isReplay === false && BCL.newContent === false) {
        clearInterval(interval);
        if($('div.videoTimer').is('*')) {
          $('div.videoTimer').hide();
        }
        try{
        	$e('adCountdown').innerHTML = "&nbsp;";
        }catch(e){}
        BCL.isComplete = false;
        BCL.isReplay = true;
        BCL.isFifty = false;
//        console.log('replay ad-begin fired');
      } else if (siVideoPlayerMap[vContext].playerAdZone != 't1_bc') {
	  // } else {
        try {
          siVideoBegin(BCL.videoData, BCL.videoData.videoId);
        } catch(e) {
          siLog.debug('siVideoBegin: '+e);
        }
//        console.log('regular ad-begin fired');
      }
    },
    onAdComplete: function(evt) { },
    onContentBegin: function(evt) {
      try {
        siVideoBegin(BCL.videoData, BCL.videoData.videoId);
      } catch(e) {
        siLog.debug('siVideoBegin: '+e);
      }
      siLog.debug('siVideoBegin: Complete');
//      console.log('video-begin fired');
    },
    onContentPlay: function(evt) {
      BCL.setOmnitureValues(evt);
      try {
        var vdata = BCL.videoData;
        vdata.isAuto = siCVPAutoStart;
        if (BCL.videoData.videoId != siCVPPreviousId) {
          vdata.isSubsequent = siCVPSubsequent;
        } else if(evt.media.referenceId === siCVPPreviousId && BCL.isComplete === true) {
          clearInterval(interval);
          if($('div.videoTimer').is('*')) {
            $('div.videoTimer').hide();
          }
          try{
        	$e('adCountdown').innerHTML = "&nbsp;";
          }catch(e){}
          BCL.isComplete = false;
          BCL.isReplay = true;
          BCL.isFifty = false;
//          console.log('video-replay start');
        }
        var sdata = JSON.stringify(vdata);
        if(BCL.isPaused !== true) {
          try {
            sendVideoEvent(sdata,"video-start",playerID);
//          console.log('video-start fired');
          } catch (e) {}
        } else {
          BCL.isPaused = false;
        }        
        siCVPAutoStart = false;
        siCVPSubsequent = true;
      } catch(e) {
        siLog.debug('onContentPlay: '+e);
      }
      try {
        siVideoPlay(vdata, BCL.videoData.videoId);
        if ($e('adCountdown')) { 
          $e('adCountdown').innerHTML = '';
        }
      } catch(e) {
        siLog.debug('siVideoPlay: '+e);
      }
      siLog.debug('siVideoPlay: Complete');  
    },
    onContentPause: function(evt) {
      BCL.setOmnitureValues(evt);
      var vdata = BCL.videoData,
      paused = false;
      if (evt.duration > evt.position) {
        paused = true;
        BCL.isPaused = true;
        var sdata = JSON.stringify(vdata);
        try {
          sendVideoEvent(sdata,"video-pause",playerID);
//        console.log('video-pause fired');
        } catch (e) {}
        try {
          siVideoPause(vdata, BCL.videoData.videoId, paused);
        } catch(e) {
          siLog.debug('siVideoPause: '+e);
        };
        siLog.debug('siVideoPause: Complete');     
      }
    },
    onTrackingContentSeek: function(evt) {
      BCL.setOmnitureValues(evt);
      var vdata = BCL.videoData;
      var sdata = JSON.stringify(vdata);
      try {
        sendVideoEvent(sdata,"video-scrub",playerID);
//      console.log('video-scrub fired');
      } catch (e) {}
      try {
        siVideoSeek();
      } catch(e) {
        siLog.debug('siVideoSeek: '+e);
      };      
    },
    onTrackingContentProgress: function(evt) {
      BCL.setOmnitureValues(evt);
      var vdata = BCL.videoData,
      videoLengthInSec = evt.media.length/1000,
      videoFiftyPercent = videoLengthInSec/2;
      if(Math.floor(evt.position) === Math.floor(videoFiftyPercent) && BCL.isFifty === false) {
        BCL.isFifty = true;
        var sdata = JSON.stringify(vdata);
        try {
          sendVideoEvent(sdata,"video-fifty_percent",playerID);
        } catch (e) {}
        try {
          siVideoFifty(vdata, BCL.videoData.videoId);
        } catch(e) {}
        siLog.debug('onTrackingContentProgress: 50%');
//        console.log('video-fifty_percent fired');
      } else if(BCL.isReplay === true && (Math.floor(evt.position) == Math.floor(evt.duration))) {
//        console.log('replay complete');
        BCL.onContentComplete(evt);
      }
    },
    onContentComplete : function(evt) {
      BCL.isComplete = true;
      BCL.newContent = false;
      BCL.isReplay = false;
      BCL.setOmnitureValues(evt);
      var vdata = BCL.videoData;
      var sdata = JSON.stringify(vdata);
      try {
        sendVideoEvent(sdata,"video-complete",playerID);
//        console.log('video-complete fired');
      } catch (e) { }
      siCVPPreviousId = BCL.videoData.videoId;
      try {
        siVideoComplete(vdata, BCL.videoData.videoId);
      } catch(e) {
        siLog.debug('siVideoComplete: '+e);
      }
      siLog.debug('siVideoComplete: Complete');      
    },
    onContentError : function(evt) {
      siLog.debug('CVP error');        
    },
    onContentChange : function(evt) {
      BCL.newContent = true;
      BCL.isPaused = false;
      BCL.isFifty = false;
      BCL.isReplay = false;
      BCL.isComplete = false;
      BCL.getVideo(evt.media.referenceId, true);
      
	  try {
			BCL.setAdPolicy(BCL.videoData.category, BCL.videoData.subcategory, siGetAdsTitle(BCL.videoData.title));
		} catch(e) {
			siLog.debug('onContentChange: '+e);
		}
		siLog.debug('CVP Content Change');
    },
    setOmnitureValues : function(bcData) {
      //SET THE MAIN ID
      BCL.videoData.id = BCL.videoData.videoId;
      //SET TRT WHICH IS TOTAL SECONDS
      BCL.videoData.trt = bcData.duration;
      //FORMAT TIME FOR DURATION, LENGTH, and FORMATTED LENGTH
      var totalSec = bcData.duration,
      hours = parseInt( totalSec / 3600 ) % 24,
      minutes = parseInt( totalSec / 60 ) % 60,
      seconds = parseInt(totalSec % 60, 10),
      result;
      //if value is 0 clear it out
      hours = (hours === 0 ? '' : hours);
      minutes = (minutes === 0 ? '' : minutes);
      seconds = (seconds === 0 ? '' : seconds);
      //set correct time in HH:MM:SS format
      result = (hours !== '' ? (hours < 10 ? "0" + hours : hours) + ":" : hours) + (minutes !== '' ? (minutes < 10 ? "0" + minutes : minutes) + ":" : minutes) + (seconds !== '' ? (seconds < 10 ? "0" + seconds : seconds) : seconds);
      //SET DURATION, LENGTH, and FORMATTEDLENGTH
      BCL.videoData.duration = result;
      BCL.videoData.length = result;
      BCL.videoData.formattedLength = result;      
    }
  };

  BCL.getVideo(videoId);
}

/** OLD VIDEO PLAYER INSTANCES **/
/*
instantiate cvp
  videoId - video to play
  vArea - div id to embed player
  vContext - player context name
 */
function cnnVideoPlayer(videoId, vArea, vContext) {
  cnnVideoNewPlayer(videoId, vArea, vContext, 0);
}

/* 
embed video in a story
  videoId - video to play
  vArea - div id to embed player
 */
function cnnStoryPlayer(videoId, vArea) {
  cnnVideoNewPlayer(videoId, vArea, "story_4_1", 0, 640, 373);
}

/* 
embed video in a story
  videoId - video to play
  vArea - div id to embed player
 */
function cnnSmallStoryPlayer(videoId, vArea) {
  cnnVideoNewPlayer(videoId, vArea, "storyEmbed", 0, 400, 225);
}

/*
cvp function for behind the mic instance
  videoId - video to play
  vArea - div id to embed player
  vContenxt - player context name
  vreturn - return instance as a var
*/
function cnnVideoNewPlayerBtm(videoId,vArea,vContext,vReturn) {
  cnnVideoNewPlayer(videoId, vArea, vContext, vReturn);
}

/*
embed video in a story
  videoId - video to play
  vContext - player context name
  playerObjId - specified id for cvp player
*/
function buildCVP(videoId,vContext,playerObjId){
  var thiscvpplayer = cnnVideoNewPlayer(videoId, '', vContext, 1);
  return thiscvpplayer;
}

/*
cvp function for swimsuit11
  videoId - video to play
  vArea - div id to embed player
  vContext - player context name
 */
function cnnSwim11Video(videoId, vArea, vContext) {
  cnnVideoNewPlayer(videoId, vArea, vContext);
}

/*
embed video externally 
*/
function si_watercooler_vid(videoId) {
  var inc = Math.floor(Math.random()*90000);
  var dom_id = "sivid_" + inc;
  document.write('<div id="'+dom_id+'"></div>');
  cnnVideoNewPlayer(videoId, dom_id, "storyEmbed", inc);
}

/* NEW FUNCTIONS */
/* Check if apple mobile device */
function isAppleMobile() {
  var appleDevice = false;
  /* Test for iPAD */
  if(navigator.userAgent.indexOf('iPad')>-1) {
    appleDevice = true;
  }
  /* Test for iPhone, iPod */
  if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    appleDevice = true;
  }
  return appleDevice;
}

function cnnSetVol() {
  document.getElementById('cnnSound').style.display='none';
  cnnCVP.setVolume('0.50');
}

/* deprecated - normalize namespace */
function siads_getAdsTitle() {
  return siGetAdsTitle();
}

function siGetAdsTitle(title) {
  var siCVPAdTitle = "";
  if (title != '') {
    siCVPAdTitle = String(title);
    siCVPAdTitle = siCVPAdTitle.replace(/[^a-zA-Z 0-9]+/g,'');
    if (location.href.indexOf('testads=1')>-1) {
      siCVPAdTitle += ";test=1";
    }
    siCVPAdTitle = siCVPAdTitle.replace(/ /g,'');
  }
  return siCVPAdTitle;
}

/* SI-5932 - new functions to detect SI Adzone, since it varies for iOS devices */
function siGetAdZone(adZone) {
  if(isAppleMobile() == 'true') {
    return adZone + '/mobile_bc';
  } else {
    return adZone;
  }
  siLog.debug("Setting adZone: " + adZone);
}

/* SI Omniture tracking - use this for any click to play video 
  videoId = the video id to play
  cvpInstance = if in a custom instance, else defaults to cnnCVP
*/
function siPlayVideo(videoId, cvpInstance) {
  siCVPAutoStart = false;
  siCVPSubsequent = false;
  if (typeof cvpInstance != 'undefined') {
    try {
      cvpInstance.play(videoId);
      return true;
    } catch (e) {
      siLog.debug('siPlayVideo Error: ' + e);
    }
  } else {
    cnnCVP.play(videoId);
    return true;
  }
  return false;
}