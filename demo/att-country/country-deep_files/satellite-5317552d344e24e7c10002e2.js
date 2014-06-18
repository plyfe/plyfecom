_satellite.pushBlockingScript(function(event, target, $variables){
  var wtMetaTag=document.createElement('meta');
wtMetaTag.id="wtMetaTag";
wtMetaTag.name = "DCSext.wtDTMInd";
wtMetaTag.content = "1";
document.getElementsByTagName('head')[0].appendChild(wtMetaTag);
});
