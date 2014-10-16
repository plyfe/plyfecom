// ADWORDS REMARKETING - Brand
_satellite.google.addPixel({
  google_conversion_id: '1003921035',
  google_conversion_label: 	'',
  google_remarketing_only: true
});
// ADWORDS REMARKETING - GDN
_satellite.google.addPixel({
  google_conversion_id: '922915392',
  google_custom_params: window.google_custom_params,
  google_remarketing_only: true
});
// ADWORDS REMARKETING - NB
_satellite.google.addPixel({
  google_conversion_id: '1005775407',
  google_conversion_label: 'GdMPCLm3xwYQr9TL3wM',
  google_remarketing_only: true
});
// FACEBOOK-Site Remarketing
(function(){
  window._fbds = window._fbds || {};
  _fbds.pixelId = 687113298007767;
  var fbds = document.createElement('script');
  fbds.async = true;
  fbds.src = '//connect.facebook.net/en_US/fbds.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(fbds, s);
})();
window._fbq = window._fbq || [];
window._fbq.push(["track", "PixelInitialized", {}]);
// QUANTCAST-Homepage
var _qevents = _qevents || [];

(function() {
var elem = document.createElement('script');
elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
elem.async = true;
elem.type = "text/javascript";
var scpt = document.getElementsByTagName('script')[0];
scpt.parentNode.insertBefore(elem, scpt);
})();

_qevents.push(
{qacct:"p-W1drbJdHtBPG6",labels:"_fp.event.Home Page"}
);

// TWITTER - Remarketing
try {
  window.twttr.conversion.trackPid('l4k29');
}
catch(e){}

// Social Events
try {
  var process = require('process');
  process.on('social.share', function(service){
    if(service != 'facebook'){
      _satellite.setVar('social_service', service);
      _satellite.track('social share');
    }
  });
}
catch(e){}
try {
  FB.Event.subscribe('edge.create', function(){
    _satellite.setVar('social_service', 'facebook');
    _satellite.track('social share');
  });
}
catch(e){}
