window.hasOwnProperty = Object.prototype.hasOwnProperty;
var BF_STATIC = {
	country: 'us',
	language:'en',
	non_english:0, 
	translation_debug:0, 
	image_root: '#', 
	web_root: '', 
	version: '201408151345', 
};

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
