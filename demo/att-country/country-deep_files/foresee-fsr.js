var fsrWebPath = "";
if (window.Uverse) {
	fsrWebPath = Uverse.config.vendorPath;
} else if (window.opener && window.opener.Uverse) {
	fsrWebPath = window.opener.Uverse.config.vendorPath;
}
window.$$FSR = {
   'timestamp': 'April 26, 2012 @ 1:38 PM',
   'version': '12.2.5',
   'enabled': true,
   'sessionreplay': true,
   'auto' : true,
   'encode' : false,
   'files': fsrWebPath + 'Foresee_12_2_5/',
   'id': 'JxTg9PsUYKor4P5i9ne0Ug==',
   'definition': 'foresee-surveydef.js',
   'embedded': false,
   'replay_id': 'site.com',
   'renderer':'W3C',	// or "ASRECORDED"
   'layout':'CENTERFIXED',	// or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
   'sites': [
      {
         path: /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
      },
      {
         path: '.',
         domain: 'default'
      }
   ],
   storageOption: 'cookie'
};