(function($, window){
	var hpobj = $("#make_my_homepage");

if ( hpobj.length !== 0 ){
	$(".make_my_homepage").fancybox( {
		width : 500,
		height : 300,
		showCloseButton: true
		//'onComplete' : makeMyHomepage
	});

	var _myhp_b = navigator.userAgent,
	//_myhp_b = hpobj.data("b"),
	//_myhp_bname = hpobj.data("bname"),
	//_myhp_os = hpobj.data("os"),
	_myhp_name = hpobj.data("sitename") || "this site", 
	_myhp_url = "http://"+window.location.hostname;

	if ( _myhp_b.search("Macintosh") != -1 ) { _myhp_os = "Mac";} 
	else { _myhp_os = "Win";} 

	if ( _myhp_b.search("Arora") != -1 ) { _myhp_b = "Arora"; _myhp_bname = "Arora";}
	else if ( _myhp_b.search(" OPR") != -1 ) { _myhp_b = "Opera"; _myhp_bname = "Opera";} 
	else if ( _myhp_b.search("Opera") != -1 ) { _myhp_b = "Opera"; _myhp_bname = "Opera";} 
	else if ( _myhp_b.search("Chrome") != -1 ) { _myhp_b = "Chrome"; _myhp_bname = "Chrome";} 
	else if ( _myhp_b.search("Firefox") != -1 ) { _myhp_b = "Firefox"; _myhp_bname = "Firefox";}
	else if ( _myhp_b.search("Safari") != -1 ) { _myhp_b = "Safari"; _myhp_bname = "Safari";}
	//else if ( _myhp_b.search("MSIE 10") != -1 ) { _myhp_b = "IE10"; _myhp_bname = "Internet Explorer";}
	//else if ( _myhp_b.search("MSIE") != -1 ) { _myhp_b = "IE"; _myhp_bname = "Internet Explorer";}// 8 + 9
	//else { _myhp_b = "IE11"; _myhp_bname = "Internet Explorer";} //Trident
	else if ( _myhp_b.search("IE") != -1 ) { _myhp_b = "IE"; _myhp_bname = "Internet Explorer";}
	else { _myhp_b = "unknown"; _myhp_bname = "your browser";}

	var _myhp_inst = {
	"Mac" : {
		"Chrome" : [
		'Click the <em>Chrome</em> menu on the browser toolbar.',
		'Select <em>Settings</em>.',
		'Under the <em>Appearance</em> section, check the <em>Show Home button</em> checkbox.',
		'Click the blue <em>Change</em> link under <em>Show Home button</em>.',
		'Check the <em>Open this page</em> radio button.',
		'Type or copy and paste <em>'+_myhp_url+'</em> into the <em>Open this page</em> text field.',
		'Click <em>OK</em>.'
		],
		"Opera" : [
		'Click the <em>Opera</em> menu on the browser toolbar.',
		'Select <em>Preferences</em> &gt; <em>General</em> tab.',
		'Click the <em>Use Current</em> button, OR type or copy and paste <em>'+_myhp_url+'</em> into the <em>Home Page</em> text field.'
		],
		"Arora" : [
		'Click the <em>Tools</em> menu on the browser toolbar.',
		'Select <em>Options</em> &gt;<em> General</em> tab.',
		'Click the <em>Select Current Page</em> button, OR type or copy and paste <em>'+_myhp_url+'</em> into the <em>Home Page</em> text field.'
		],
		"Firefox" : [
		'Click the icon to the left of the web address, (e.g. <img src="http://s3.amazonaws.com/tsm-images/global/ff1.png"> <img src="http://s3.amazonaws.com/tsm-images/global/ff2.png"> <img src="http://s3.amazonaws.com/tsm-images/global/ff3.png">) drag it to the <em>Home</em> <img src="http://s3.amazonaws.com/tsm-images/global/home.png"> button on the right of the search bar, and release.',
		'Click <em>Yes</em> to set this as your homepage.'
		],
		"Safari" : [
		'Click the <em>Safari</em> menu on the browser toolbar.',
		'Select <em>Preferences</em> &gt; <em>General</em> tab.',
		'Click the <em>Set to Current Page</em> button, OR type or copy and paste <em>'+_myhp_url+'</em> into the <em>Home Page</em> text field.'
		],
		"unknown" : [
		'Open your browser&#39;s general panel from the settings menu on the browser toolbar.',
		'Find the option that lets you set a custom homepage',
		'Click the <em>Use Current</em> button, OR type or copy and paste <em>'+_myhp_url+'</em> into the <em>Home Page</em> text field.'
		]
	},
	"Win" : {
		"Chrome" : [
		'Click the <em>Chrome</em> menu on the browser toolbar.',
		'Select <em>Settings</em>.',
		'Under the <em>Appearance</em> section, check the <em>Show Home button</em> checkbox.',
		'Click the blue <em>Change</em> link under <em>Show Home button</em>.',
		'Check the <em>Open this page</em> radio button.',
		'Type or copy and paste <em>'+_myhp_url+'</em> into the <em>Open this page</em> text field.',
		'Click <em>OK</em>.'
		],
		"Opera" : [
		'Click the <em>Opera</em> menu on the browser toolbar.',
		'Select <em>Settings</em> &gt; <em>Browser</em> tab.',
		'Under <em>On startup</em> select <em>Set pages</em> tab.',
		'Click the <em>Use Current</em> button, OR type or copy and paste <em>'+_myhp_url+'</em> into the <em>Add a new page</em> text field.'
		],
		"Arora" : [
		'Click the <em>Tools</em> menu on the browser toolbar.',
		'Select <em>Options</em> &gt;<em> General</em> tab.',
		'Click the <em>Select Current Page</em> button, OR type or copy and paste <em>'+_myhp_url+'</em> into the <em>Home Page</em> text field.'
		],
		"Firefox" : [
		'Click the icon to the left of the web address, (e.g. <img src="http://s3.amazonaws.com/tsm-images/global/ff1.png"> <img src="http://s3.amazonaws.com/tsm-images/global/ff2.png"> <img src="http://s3.amazonaws.com/tsm-images/global/ff3.png">) drag it to the <em>Home</em><img src="http://s3.amazonaws.com/tsm-images/global/ff1.png"> button on the right of the search bar, and release.',
		'Click <em>Yes</em> to set this as your homepage.'
		],
		"Safari" : [
		'Click the <em>Safari</em> menu on the browser toolbar.',
		'Select <em>Preferences</em> &gt; <em>General</em> tab.',
		'Click the <em>Set to Current Page</em> button, OR type or copy and paste <em>'+_myhp_url+'</em> into the <em>Home Page</em> text field.'
		],
		"IE10" : [
		'Tap or click <em>Tools</em>, and then tap or click <em>Internet options</em>.',
		'Under the <em>General</em> tab, enter <em>'+_myhp_url+'</em> and then tap or click <em>Apply</em>.'
		],
		"IE11" : [
		'Swipe in from the right edge of the screen and tap <em>Settings</em>, or using a mouse, point to the lower-right corner of the screen and click Settings.',
		'Tap or click Options, and under Home pages, tap or click Customize.',
		'Tap or click <em>Add</em>.'
		],
		"IE" : [
		'Tap or click the <em>Tools</em> button, and then tap or click <em>Internet options</em>.',
		'Under the <em>General</em> tab, tap or click <em>Use current</em>.',
		'Tap or click <em>Add current site</em>, OR type or copy and paste <em>'+_myhp_url+'</em> into the text field.',
		],
		"unknown" : [
		'Open your browser&#39;s general panel from the settings menu on the browser toolbar.',
		'Find the option that lets you set a custom homepage',
		'Click the <em>Use Current</em> button, OR type or copy and paste <em>'+_myhp_url+'</em> into the <em>Home Page</em> text field.'
		]
	} };

	Handlebars.registerHelper('list', function(items, options) {
		var out = "";
		for (var i=0, l=items.length; i<l; i++)
			out = out + options.fn(items[i]);
		return out;
	});

	var _myhp_source   = $("#template_1").html();
	var _myhp_template = Handlebars.compile(_myhp_source);
	var _myhp_context  = {
		url: "http://"+window.location.hostname,
		site : _myhp_name,
		browser : _myhp_bname,
		instructions: _myhp_inst[ _myhp_os ][ _myhp_b ]
	};
	var _myhp_html     = _myhp_template(_myhp_context);
	$("#make_my_homepage").html(_myhp_html);
}

})(jQuery, window);

