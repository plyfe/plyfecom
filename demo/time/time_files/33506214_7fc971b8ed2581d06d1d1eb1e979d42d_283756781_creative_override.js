(function() {
  var creativeDefinition = {
    customScriptUrl: '',
    isDynamic: false,
    delayedImpression: false,
    standardEventIds: {
      DISPLAY_TIMER: '2',
      INTERACTION_TIMER: '3',
      INTERACTIVE_IMPRESSION: '4',
      FULL_SCREEN_VIDEO_PLAYS: '5',
      FULL_SCREEN_VIDEO_COMPLETES: '6',
      FULL_SCREEN_AVERAGE_VIEW_TIME: '7',
      MANUAL_CLOSE: '8',
      BACKUP_IMAGE_IMPRESSION: '9',
      EXPAND_TIMER: '10',
      VIDEO_PLAY: '11',
      VIDEO_VIEW_TIMER: '12',
      VIDEO_COMPLETE: '13',
      VIDEO_INTERACTION: '14',
      VIDEO_PAUSE: '15',
      VIDEO_MUTE: '16',
      VIDEO_REPLAY: '17',
      VIDEO_MIDPOINT: '18',
      FULL_SCREEN_VIDEO: '19',
      VIDEO_STOP: '20',
      VIDEO_FIRST_QUARTILE: '960584',
      VIDEO_THIRD_QUARTILE: '960585',
      VIDEO_UNMUTE: '149645',
      FULL_SCREEN: '286263',
      DYNAMIC_CREATIVE_IMPRESSION: '536393',
      HTML5_CREATIVE_IMPRESSION: '871060'
    },
    exitEvents: [
      {
        name: 'General',
        reportingId: '1945480',
        url: 'http://www.ibm.com/cloud-computing/us/en/index.html?cmp\x3dusbrb\x26cm\x3db\x26csr\x3dagus_cloud_140820\x26cr\x3dtime\x26ct\x3dusbrb301\x26cn\x3dCategory-Cloud_MWI-Developer-Pushdown-7sec-970x90-AUTO_motifrich_site#d',
        targetWindow: '_blank',
        windowProperties: ''
      },
      {
        name: 'Panel 1',
        reportingId: '1945482',
        url: 'http://www.ibm.com/cloud-computing/us/en/index.html?cmp\x3dusbrb\x26cm\x3db\x26csr\x3dagus_cloud_140820\x26cr\x3dtime\x26ct\x3dusbrb301\x26cn\x3dCategory-Cloud_MWI-Developer-Pushdown-7sec-970x90-AUTO_motifrich_site_Panel1#d',
        targetWindow: '_blank',
        windowProperties: ''
      },
      {
        name: 'Panel 2',
        reportingId: '1945483',
        url: 'http://www.ibm.com/cloud-computing/us/en/index.html?cmp\x3dusbrb\x26cm\x3db\x26csr\x3dagus_cloud_140820\x26cr\x3dtime\x26ct\x3dusbrb301\x26cn\x3dCategory-Cloud_MWI-Developer-Pushdown-7sec-970x90-AUTO_motifrich_site_Panel2#d',
        targetWindow: '_blank',
        windowProperties: ''
      },
      {
        name: 'Panel 3',
        reportingId: '1945481',
        url: 'http://www.ibm.com/cloud-computing/us/en/index.html?cmp\x3dusbrb\x26cm\x3db\x26csr\x3dagus_cloud_140820\x26cr\x3dtime\x26ct\x3dusbrb301\x26cn\x3dCategory-Cloud_MWI-Developer-Pushdown-7sec-970x90-AUTO_motifrich_site_Panel3#d',
        targetWindow: '_blank',
        windowProperties: ''
      }
    ],
    timerEvents: [
      {
        name: 'Panel_AUTO Expansion',
        reportingId: '1861394',
        videoData: null
      },
      {
        name: 'Panel_USER Expansion',
        reportingId: '1861393',
        videoData: null
      },
      {
        name: 'view slide 1',
        reportingId: '1958638',
        videoData: null
      },
      {
        name: 'view slide 2',
        reportingId: '1958639',
        videoData: null
      },
      {
        name: 'view slide 3',
        reportingId: '1958640',
        videoData: null
      }
    ],
    counterEvents: [
      {
        name: 'navigation arrow clicked',
        reportingId: '1854824',
        videoData: null
      },
      {
        name: 'navigation dot clicked',
        reportingId: '1854827',
        videoData: null
      }
    ],
    childFiles: [
      {
        name: 'AUTO.swf',
        url: '/ads/richmedia/studio/pv2/33173033/20140902071011725/AUTO.swf',
        isVideo: false
      },
      {
        name: 'USER.swf',
        url: '/ads/richmedia/studio/pv2/33173033/20140902071011725/USER.swf',
        isVideo: false
      },
      {
        name: 'Pushdown_970x90.jpg',
        url: '/ads/richmedia/studio/pv2/33173033/20140902071011725/Pushdown_970x90.jpg',
        isVideo: false
      }
    ],
    videoFiles: [
    ],
    videoEntries: [
    ],
    primaryAssets: [
      {
        id: '33458572',
        artworkType: 'FLASH',
        displayType: 'EXPANDABLE',
        width: '970',
        height: '415',
        servingPath: '/ads/richmedia/studio/pv2/33173033/20140902071011725/Developers_970x415_motifrich_site_PARENT.swf',
        zIndex: '1000000',
        customCss: '',
        flashArtworkTypeData: {
          actionscriptVersion: '3',
          wmode: 'transparent',
          sdkVersion: '2.4.2'
        },
        htmlArtworkTypeData: null,
        floatingDisplayTypeData: null,
        expandingDisplayTypeData: {
          collapsedRect: {
            left: 0,
            top: 0,
            width: 970,
            height: 90
          },
          isPushdown: true,
          pushdownAnimationTime: 0,
          expansionMode: 'NORMAL'
        },
        imageGalleryTypeData: null,
        pageSettings:{
          hideDropdowns: false,
          hideIframes: false,
          hideObjects: false,
          updateZIndex: true
        },
layoutsConfig: null,
layoutsApi: null
      }
    ]
  }
  var rendererDisplayType = '';
  rendererDisplayType += 'flash_';
  var rendererFormat = 'expanding';
  var rendererName = rendererDisplayType + rendererFormat;

  var creativeId = '59332730';
  var adId = '283756781';
  var templateVersion = '200_53';
  var studioObjects = window['studioV2'] = window['studioV2'] || {};
  var creativeObjects = studioObjects['creatives'] = studioObjects['creatives'] || {};
  var creativeKey = [creativeId, adId].join('_');
  var creative = creativeObjects[creativeKey] = creativeObjects[creativeKey] || {};
  creative['creativeDefinition'] = creativeDefinition;
  var adResponses = creative['adResponses'] || [];
  for (var i = 0; i < adResponses.length; i++) {
    adResponses[i].creativeDto && adResponses[i].creativeDto.csiEvents &&
        (adResponses[i].creativeDto.csiEvents['pe'] =
            adResponses[i].creativeDto.csiEvents['pe'] || (+new Date));
  }
  var loadedLibraries = studioObjects['loadedLibraries'] = studioObjects['loadedLibraries'] || {};
  var versionedLibrary = loadedLibraries[templateVersion] = loadedLibraries[templateVersion] || {};
  var typedLibrary = versionedLibrary[rendererName] = versionedLibrary[rendererName] || {};
  if (typedLibrary['bootstrap']) {
    typedLibrary.bootstrap();
  }
})();
