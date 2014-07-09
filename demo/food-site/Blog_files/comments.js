
// RealTidbits Stuff
if (typeof window.RealTidbits !== 'object') window.RealTidbits = {};
if (typeof window.RealTidbits.settings !== 'object') window.RealTidbits.settings = {};
if (typeof window.RealTidbits.Comments !== 'object') window.RealTidbits.Comments = {};
if (typeof window.RealTidbits.applications !== 'object') window.RealTidbits.applications = {};

// get paths
function getRTBScriptPath() {
    var scripts = document.getElementsByTagName('SCRIPT');
    var path = '';
    if(scripts && scripts.length>0) {
        for(var i in scripts) {
            if(scripts[i].src && scripts[i].src.match(/realtidbits.com\/.+?comments\.js/)) {
                path = scripts[i].src.toString();
				//path = scripts[i].src.replace(/(.*)comments\.js$/, '$1');
            }
            if(scripts[i].src && scripts[i].src.match(/c299782.+?comments\.js/)) {
                path = scripts[i].src.toString();
				//path = scripts[i].src.replace(/(.*)comments\.js$/, '$1');
            }
        }
    }
	var path = path.split('/').slice(0, -2).join('/');
    return path;
}

// determine the script path for application
if(typeof _rtbScriptPath == "undefined") {
	var _rtbScriptPath = getRTBScriptPath();
	// check for ssl protocol
	if(_rtbScriptPath.indexOf("https:") == 0) {
		// override rtb ssl redirect and use full paths
		var dir = _rtbScriptPath.split('/').pop();
		_rtbScriptPath = "https://c299782.ssl.cf1.rackcdn.com/libs/" + dir;
	};
};
// document.location.protocol == "https:"
var _rtbScriptProtocol = "http://";
if(_rtbScriptPath.indexOf("https:") == 0) {
	_rtbScriptProtocol = "https://"
};

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

var dependenciesEcho = [
	['echo-backplane', '//cdn.echoenabled.com/clientapps/v2/backplane.js'],
	['echo-submit', '//cdn.echoenabled.com/clientapps/v2/submit.js'],
	['echo-stream', '//cdn.echoenabled.com/clientapps/v2/stream.js'],
	['echo-user-list', '//cdn.echoenabled.com/clientapps/v2/user-list.js'],
	['echo-counter', '//cdn.echoenabled.com/clientapps/v2/counter.js'],
	['echo-mini-app', 'http://cdn.echoenabled.com/clientapps/v2/plugins/items-rolling-window.js'],
	['echo-submitcounter', '//cdn.echoenabled.com/clientapps/v2/plugins/submit-text-counter.js'],
	['echo-auth', '//cdn.echoenabled.com/clientapps/v2/auth.js'],
	//['echo-form-auth', '//cdn.echoenabled.com/clientapps/v2/plugins/form-auth.js'],
	['echo-reply', '//cdn.echoenabled.com/clientapps/v2/plugins/reply.js'],
	//['echo-curation', '//cdn.echoenabled.com/clientapps/v2/plugins/curation.js'],
	['echo-like', '//cdn.echoenabled.com/clientapps/v2/plugins/like.js'],
	//['echo-user-privileges', '//cdn.echoenabled.com/clientapps/v2/plugins/user-privileges.js'],
	//['echo-user-ban', '//cdn.echoenabled.com/clientapps/v2/plugins/user-ban.js'],
	['echo-community-flag', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/echo/rtb/community-flag-hotfix.js']
];

if(SNI_COMMUNITY_COMMENT_APP.IS_BOT) {
	var dependenciesRTB = [
		['config', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/config/echo_app_config.js'],
		['jquery-cookie-plugin', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/sni/jqueryPlugins/cookie.js'],
		['jquery-postToAIM-plugin', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/sni/jqueryPlugins/postToAIM.js'],
		['rtb-UpdateSort', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/echo/rtb/UpdateSort.js'],
		['rtb-sanitize', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/echo/rtb/sanitize.js'],
		['rtb-comments-locale-en', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/echo/rtb/en.js'],
		['rtb-comments-core', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/echo/rtb/comments_core.js'],
		['sni-comments-bootstrap', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/sni/'+SNI_COMMUNITY_ECHO_ASSET.ASSET_SITE_NAME+ '/' +SNI_COMMUNITY_ECHO_ENVIORNMENT_CONFIG+'/bootstrap.js']
	];
} else {
	var dependenciesRTB = [
		['config', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/config/echo_app_config.js'],
		['rtb-comments-core', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/echo/rtb/rtb.min.js'],
		['sni-comments-bootstrap', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/sni/'+SNI_COMMUNITY_ECHO_ASSET.ASSET_SITE_NAME+ '/' +SNI_COMMUNITY_ECHO_ENVIORNMENT_CONFIG+'/sni.min.js']
	];
}

/*if(SNI_COMMUNITY_COMMENT_APP.IS_BOT) {
	var seo = ['sni-comments-bootstrap', SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/sni/'+SNI_COMMUNITY_ECHO_ASSET.ASSET_SITE_NAME+ '/' +SNI_COMMUNITY_ECHO_ENVIORNMENT_CONFIG+'/sni.seo.js']
dependenciesRTB.splice(2,1);
dependenciesRTB.insert(2,seo);
}*/

document.writeln('<script type="text/javascript" src="' + SNI_COMMUNITY_ECHO_ENVIORNMENT + '/js/apps/echo/rtb/jquery-pack.js"></script>');

// attach the required javascripts
for(var i=0;i<dependenciesEcho.length;i++) {
	document.writeln('<script type="text/javascript" src="' + dependenciesEcho[i][1] + '"></script>');
};

// attach the required javascripts
for(var i=0;i<dependenciesRTB.length;i++) {
	document.writeln('<script type="text/javascript" src="' + dependenciesRTB[i][1] + '"></script>');
};

//
if(RealTidbits.settings.ads == true) {
	document.writeln(unescape('%3Cscript%3E'+
	'google_ad_client = "ca-pub-6500071870655865";'+
	'google_ad_slot = "0167440026";'+
	'google_ad_width = 468;'+
	'google_ad_height = 60;'+
	'%3C\/script%3E'+
	'%3Cscript src="http:\/\/pagead2.googlesyndication.com\/pagead\/show_ads.js"%3E%3C\/script%3E'));
};