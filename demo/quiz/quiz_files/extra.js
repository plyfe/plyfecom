window.hasOwnProperty = Object.prototype.hasOwnProperty;
var BF_STATIC = {
	country: 'us',
	language:'en',
	non_english:0, 
	translation_debug:0, 
	static_root: 'http://s3-ak.buzzfed.com/static', 
	image_root: '#', 
	web_root: '', 
	version: '201408151345', 
	fb_app_id:'45075597673', 
	fb_api_key: '', 
	fb_template_bundle_id: '', 
	fb_quickpost_template_bundle_id: '', 
	fb_badge_vote_template_bundle_id:'', 
	fb_love_vote_template_bundle_id:'', 
	fb_server_root: '', 
	twitter_api_key:'vQjpMo8qABmqag9607Hg', 
	terminal_root_url:'#', 
	fb_loader_server:'', 
	cookie_age_limit_hours:24,
	generated_timestamp:1408457405, 
	page: 'Buzz', 
	tt_page: 'Buzz', 
	login_cookie_version:'1.0',
	html5_video : false, 
	front_page_click_sample: 100, 
	bf_env:'live', 
	referer:'', 
	bf_test_mode: false, 
	bf_category: '12', 
	big_image_root: 'http://s3-ec.buzzfed.com', 
	custom_ga_url: false, 
	BF_Beta_HP: false, 
	react_cam: true ,
	buzz_name: "Which Coen Brothers Movie Are You?",
	buzz_blurb: "<b>You&#8217;re out of your element.</b>",
	vertical: "",
	campaignid: "3421352",
	f_ad: "",
	username: "candacelowry",
	user_is_f_ad: "0",
	google_plus_client_id: "895639880237-tcoheof19odpd88p676rjc70v0iqit0o.apps.googleusercontent.com",
	google_public_api_browser_key: 'AIzaSyBNj6Jq504-YFNx7I1SQei5x73orklpwnQ',
	google_plus_client_id: "895639880237-tcoheof19odpd88p676rjc70v0iqit0o.apps.googleusercontent.com",
    timequeue: []
};

var Cloud = {
	"servers": ['newbuzz-collection-1925855828.us-east-1.elb.amazonaws.com'],
	"report": 'http://wac.09fc.edgecastcdn.net/8009FC/dg-stats/_stats/buzz',
	"staging" : {server:'ec2-50-16-13-235.compute-1.amazonaws.com',sample:0}
};
BF_server = "/buzzzfeed/";
if (!window.console) {window.console = {};}

$A([ "assert", "count", "debug", "dir", "dirxml", "error", "group", "groupEnd", "info", "log", "profile", "profileEnd", "time", "timeEnd", "trace", "warn" ]).each(function(method) { 
	if (!console[method]) { 
		if (method == 'error') {
			console[method] = function(info) {
				var error_image = new Image();
				if (typeof(info) == 'object') info = Object.toJSON(info);
				var page = window.location.href, user_agent = navigator.userAgent;
				error_image.src = '/go/small.gif?error_info='+escape(info)+'&page='+escape(page)+'&useragent='+escape(user_agent);
			}
		} else {
			console[method] = function(){};
		}
	}
});

/* ie? */
var ieV = parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5));
Prototype.Browser.IE6 = (Prototype.Browser.IE && ieV == 6);
Prototype.Browser.IE7 = (Prototype.Browser.IE && ieV == 7);
Prototype.Browser.IE8 = (Prototype.Browser.IE && ieV == 8);
Prototype.Browser.IE9 = (Prototype.Browser.IE && ieV == 9);
Prototype.Browser.IE10 = (Prototype.Browser.IE && ieV == 1 || ieV == 10);

/* ff? */
Prototype.Browser.FF2 = ( navigator.userAgent.indexOf( "Firefox/2" ) != -1 && navigator.userAgent.match( /Firefox\/2\d+/ ).length == 0 );
Prototype.Browser.FF3_5 = ( navigator.userAgent.indexOf( "Firefox/3.5" ) != -1 );
Prototype.Browser.FF3_6 = ( navigator.userAgent.indexOf( "Firefox/3.6" ) != -1 );

/* clicktrack */
function bfct(ct) { var img = new Image(); img.src = ct; }