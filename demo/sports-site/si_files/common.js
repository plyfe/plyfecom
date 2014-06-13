/* -----------------------------------------------
	1. GLOBAL UTILITY FUNCTIONS
----------------------------------------------- */

	/* Stub for siLog object */
	var tmp = new Array('toggle','clear','profile','group','time','timeEnd','fatal','trace','traceEnd','error','warn','debug','info','move','resize');	
	var siLog = new Object();
	for (i=0;i<tmp.length;i++){ 
		siLog[tmp[i]] = function(e){};
	}
	if (typeof console != 'object') {
		var console = new Object();
		for (i=0;i<tmp.length;i++){
			console[tmp[i]] = function(e){};
		}
	}

	/* get element by id (and optionally by class and tag) */
	function $e (id, className, tagName) { 
		if (className==null) { 
			if ( document.getElementById ) {
				return document.getElementById( id );
			} else if ( document.all ) {
				return  document.all[ id ];
			} else { return false; }
		} else {
			if (tagName == null) tagName = '*';
			var x = $c(className,tagName,document.getElementById(id));
			if (x) { if (x.length > 0) { return x[0]; } }
			return false;
		}
	}

	function $c (className,tagName,node) {
		var classElements = new Array();
		if ( node == null ) node = document;
		if ( tagName == null ) tagName = '*';
		if (!node.getElementsByTagName) return false;
		var els = node.getElementsByTagName(tagName);
		var elsLen = els.length;
		var pattern = new RegExp('(^|\\s)'+className+'(\\s|$)');
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) { classElements[j] = els[i]; j++; }
		}
		return classElements;
	}

	/* Function for including internal JS and CSS files */
	function cnnInc(file) {
		var host='';
		if (file.indexOf('http://')==-1) { 
			host = 'http://i.cdn.turner.com/si';
		}
		if (file.indexOf('.css')>0) { 
			document.write('<link rel="stylesheet" type="text/css" href="' + host + file + '" media="all" />'); 
		} else { 
			document.write('<scri'+'pt language="JavaScript" src="' + host + file + '"></scr'+'ipt>'); 
		}
	}
	function cnnJS(src) {
		siLog.debug('cnnJS: '+src);
		cnnInc(src);
	}
	function cnnJSrun(js) {
		document.write( '<scr'+'ipt type="text/javascript">'+js+'</scr'+'ipt>'+"\n");
	}
	
	/* Functions for accessing Query parameters */
	function pageQuery( q ) {
		if( q.length > 1 ) this.q = q.substring( 1, q.length );
		else this.q = null;
		this.keyValuePairs = new Array();
		if( q ) {
			for( var i = 0; i < this.q.split( "&" ).length; i++ ) {
				this.keyValuePairs[i] = this.q.split( "&" )[i];
			}
		}
		this.getKeyValuePairs = function() { return this.keyValuePairs; }
		this.getValue = function( s ) {
			for( var j = 0; j < this.keyValuePairs.length; j++ ) {
				if( this.keyValuePairs[j].split( "=" )[0] == s )
				return this.keyValuePairs[j].split( "=" )[1];
			}
			return false;
		}
		this.getParameters = function() {
			var a = new Array( this.getLength() );
			for( var j = 0; j < this.keyValuePairs.length; j++ ) {
				a[j] = this.keyValuePairs[j].split( "=" )[0];
			}
			return a;
		}
		this.getLength = function() { return this.keyValuePairs.length; } 
	}
	function queryString( key ){
		var page = new pageQuery( window.location.search ); 
		return unescape( page.getValue( key ) ); 
	}
	
	// get Param: returns URL query parameter of 'name'
	function getParam( name ) {
		var regex = new RegExp( "[\\?&]"+name+"=*([^&#]*)" );
		var results = regex.exec( window.location.href );
		if( results == null ) { return false; } else { return results[1]; }
	}
	/* cnnPage - page attributes */
	var cnnPage = new Object();
	cnnPage.url = window.location.href.toString();
	cnnPage.path = cnnPage.url.replace(/http:\/\/[^\/]*/, '').replace(/[\?\#].*$/, '').replace(/\/[^\/]+\.(html|htm|js|jsp)$/i, '/').replace(/\/$/, '');
	cnnPage.title = document.title;
	cnnPage.isHomepage = (cnnPage.path == '/' || cnnPage.path.length == '') ? true : false;
	cnnPage.host = window.location.hostname.toString();
	cnnPage.isLive = (cnnPage.host.indexOf('si.com')>-1) ? true : false;
	cnnPage.debug = false;
	if (getParam('debug')=='y') { cnnPage.debug = true; }
	
	/* Include log file if in debug mode*/
	if (cnnPage.debug) {
		cnnJS('/.e/js/4.1/global/lib/log4javascript.js');
	}
	
	/* Cookie functions */
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length).split('&');
		}
		return null;
	}
	function eraseCookie(name) { createCookie(name,"",-1); }
	function CNN_getCookies() {
		var hash = new Array;
		if ( document.cookie ) {
			var cookies = document.cookie.split( '; ' );
			for ( var i = 0; i < cookies.length; i++ ) {
				var namevaluePairs = cookies[i].split( '=' );
				hash[namevaluePairs[0]] = unescape( namevaluePairs[1] ) || null;
			}
		}
		return hash;
	}
	function CNN_parseCookieData( cookieDataString ) {
		var cookieValues = new Object();
		var separatePairs = cookieDataString.split( '&' );
		for ( var i = 0; i < separatePairs.length; i++  ) {
			var separateValues = separatePairs[i].split( ':' );
			cookieValues[separateValues[0]] = separateValues[1] || null;
		}
		return cookieValues;
	}
	function CNN_setCookie( name, value, hours, path, domain, secure ) {
			var numHours = 0;
			if ( hours) {
				if ( (typeof(hours) == 'string') && Date.parse(hours) ) { // already a Date string
					numHours = hours;
				} else if ( typeof(hours) == 'number' ) { // calculate Date from number of hours
					numHours = ( new Date((new Date()).getTime() + hours*3600000) ).toGMTString();
				}
			}
			document.cookie = name + '=' + escape(value) + ((numHours)?(';expires=' + numHours):'') + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:'') + ((secure && (secure == true))?'; secure':''); // Set the cookie, adding any parameters that were specified.
	}
	function CNN_killCookie( name, path, domain ) {
		var allCookies = CNN_getCookies();

		var theValue = allCookies[ name ] || null; // We need the value to kill the cookie
		if ( theValue ) {
			document.cookie = name + '=' + theValue + '; expires=Fri, 13-Apr-1970 00:00:00 GMT' + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:''); // set an already-expired cookie
		}
	}
	var allCookies = CNN_getCookies();
	
/* -----------------------------------------------
	2. PAGE LEVEL FUNCTIONS
----------------------------------------------- */

	startList = function() {
		if (document.all&&document.getElementById) {
			cssdropdownRoot = document.getElementById("cssdropdown");
			if(cssdropdownRoot) {
				for (i=0; i<cssdropdownRoot.childNodes.length; i++) {
					node = cssdropdownRoot.childNodes[i];
					if (node.nodeName=="LI") {
						node.onmouseover=function() {
							this.className+=" over";
						}
						node.onmouseout=function() {
							this.className=this.className.replace(" over", "");
						}
					}
				}
			}
		}
	}

	if (window.attachEvent) { 
		window.attachEvent("onload", startList) 
	} else { 
		window.onload=startList; 
	}

	function mainmenu(){
		$(" #nav ul ").css({display: "none"}); // Opera Fix
		$(" #nav li").hover(function(){
				$(this).find('ul:first').css({visibility: "visible",display: "none"}).slideDown("fast");
				},function(){
				$(this).find('ul:first').css({visibility: "hidden"});
				});
		}
		 $(document).ready(function(){
			mainmenu();
		}
	);

	function cnnad_createSL() {
	}

	/* start flash sync */
	var __pageTimeStamp = new Date().getTime();
	function cnnad_getPageTimeStamp(){
		 return __pageTimeStamp;
	}
	/* end flash sync */	

	var siAds = {
		render			: function (id, w, h) {
			siLog.debug('siAds.render: ',id, w, h);
			var zone = '';
			var sport = '';
			switch( id ) {
				case 'tracking/top.728x90':			zone = 'trackingblog'; break;	// sitracking aka tracking.si.com aka Tracking
				case 'tracking/rgt.300x250':		zone = 'trackingblog'; break;	// sitracking aka tracking.si.com aka Tracking
				case 'football_ncaa/top.728x90':	zone = 'collegefootball/campusunions'; sport = 'collegefootball'; break;	// sicollegefootball aka college-football.si.com aka Campus Union
				case 'football_ncaa/rgt.300x250':	zone = 'collegefootball/campusunions'; sport = 'collegefootball'; break;	// sicollegefootball aka college-football.si.com aka Campus Union
				case 'mma_boxing/top.728x90':		zone = 'mmaboxing/counterpunch'; sport = 'mma_boxing'; break;	// sicounterpunch-child aka mma-boxing.si.com aka 
				case 'mma_boxing/rgt.300x250':		zone = 'mmaboxing/counterpunch'; sport = 'mma_boxing'; break;	// sicounterpunch-child aka mma-boxing.si.com aka 
				case 'nba/writers/top.728x90.wp':	zone = 'nba/pointforward'; sport = 'nba'; break;	// sinbapointforward aka nba-point-forward.si.com aka The Point Forward
				case 'nba/writers/rgt.300x250.wp':	zone = 'nba/pointforward'; sport = 'nba'; break;	// sinbapointforward aka nba-point-forward.si.com aka The Point Forward
				case 'nfl/top.728x90':				zone = 'nfl/audibles'; sport = 'nfl'; break;	// sinfl-child aka nfl.si.com aka Audibles
				case 'nfl/rgt.300x250':				zone = 'nfl/audibles'; sport = 'nfl'; break;	// sinfl-child aka nfl.si.com aka Audibles
				case 'nhl/writers/top.728x90':		zone = 'nhl/redlight'; sport = 'nhl'; break;	// sinhlredlight aka nhl-red-light.si.com aka Red Light
				case 'nhl/writers/rgt.300x250':		zone = 'nhl/redlight'; sport = 'nhl'; break;	// sinhlredlight aka nhl-red-light.si.com aka Red Light
				case 'tennis/writers/top.728x90':	zone = 'tennis/beyondthebaseline'; sport = 'tennis'; break;	// siusopen aka tennis.si.com aka Beyond the Baseline
				case 'tennis/writers/rgt.300x250':	zone = 'tennis/beyondthebaseline'; sport = 'tennis'; break;	// siusopen aka tennis.si.com aka Beyond the Baseline
				case 'mlb/top.728x90':				zone = 'mlb/hitandrun'; sport = 'mlb'; break;	// simlb aka mlb.si.com aka Hit and Run
				case 'mlb/rgt.300x250':				zone = 'mlb/hitandrun'; sport = 'mlb'; break;	// simlb aka mlb.si.com aka Hit and Run
				case 'ros/top.728x90':				zone = 'mlb/hitandrun'; sport = 'mlb'; break;	// simlb aka mlb.si.com aka Hit and Run
				case 'ros/rgt.300x250':				zone = 'mlb/hitandrun'; sport = 'mlb'; break;	// simlb aka mlb.si.com aka Hit and Run
				default: 							zone = ''; break;
			}
			if( location.hostname == "nhl.si-wpdev.us" ) zone = 'nhl/homeice';
			if( adFactory ) {
				adFactory.setZone( zone );
				if( sport ) adFactory.setParam( "sport", sport );
				if( w == 728 ) {
					adFactory.getMultiAd(new Array("728x90","101x1")).write();
				} else if( w == 300 ) {
					adFactory.getMultiAd(new Array("300x250","300x600")).write();
				}
			} else {
				document.write ('<iframe scrolling="no" frameborder="0" marginwidth="0" height="'+h+'" width="'+w+'" ' +
				'marginheight="0" src="http://sportsillustrated.cnn.com/si_adspaces/4.0/' + id + '.html" ></iframe>' );
			}
		},
		tracking		: function() {
			if( adFactory ) {
				var lb = "Time Inc News Business and Sports,Sports Illustrated";
				var lb_ch = (jsmd.get("m:page.section[0]") ? jsmd.get("m:page.section[0]") : "");
				lb+=(lb_ch != null && typeof(lb_ch) == "string" && lb_ch.length > 0) ? "." + lb_ch:"";
				_qoptions={
					qacct:"p-5dyPa639IrgIw",
					labels:lb
				};
				cnnJS('http://edge.quantserve.com/quant.js');
				cnnJS('http://js.revsci.net/gateway/gw.js?csid=H07710&auto=t');
			} else {
				this.gdyn();
				this.rev_science();
			}
		},
		dynamic_logic	: function () {
			cnnJS('http://content.dl-rms.com/rms/mother/548/nodetag.js');
		},
		tynt			: function () {
			cnnJS('http://tcr.tynt.com/javascripts/Tracer.js?user=bso3t6KYer3Qp2ab7jrHtB&s=21');
		},
		gdyn			: function () {
			document.write('<img src="http://i.cdn.turner.com/si/.e/img/4.0/global/pixels/blank_pixel.gif" alt="" id="TargetImageDE" name="TargetImageDE" onload="cnnad_getDEAdHeadCookie(this)" height="1" width="1"> ');
		},
		rev_science		: function () {
			cnnJS('http://js.revsci.net/gateway/gw.js?csid=A09801');
			var out = 'cnnad_sendADMData();'
			cnnJSrun(out);
		}
	};

	var CNN_FONT_COOKIE_NAME="cnnFont";var CNN_FONT_COOKIE=readCookie(CNN_FONT_COOKIE_NAME)||null;function setActiveStyleSheet(CNN_CSS_TITLE){var i,a;for(i=0;(a=document.getElementsByTagName("link")[i]);i++){if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){a.disabled=true;if(a.getAttribute("title")==CNN_CSS_TITLE)a.disabled=false;}}}
	function setActiveStyleSheet2(CNN_CSS_TITLE){setActiveStyleSheet(CNN_CSS_TITLE)
	if(CNN_CSS_TITLE=='LargeFont'){createCookie(CNN_FONT_COOKIE_NAME,'LargeFont',24*31);}else{eraseCookie(CNN_FONT_COOKIE_NAME);}}

/* -----------------------------------------------
	3. OMNITURE
----------------------------------------------- */

	var cnn_omnitureData = new Array();
	cnn_omnitureData = {
		pageName: null,
		section: null,
		path: null, // set automatically
		pageType: null,
		pageTopics: null,
		referrer: null,
		server: null // set automatically
	}
	cnn_omnitureData['path'] = cnn_omnitureGetPath();
	cnn_omnitureData['pageName'] = cnn_omnitureGetPageName();
	cnn_omnitureData['section'] = cnn_omnitureGetSection();
	cnn_omnitureData['pageType'] = cnn_omnitureData['section'] + ' - ' + cnn_omnitureGetPageType();
	cnn_omnitureData['referrer'] = cnn_omnitureGetReferrer();
	cnn_omnitureData['server'] = document.domain;

	function cnn_omnitureGetPath() {
		//finds url
		retValue = document.location.hostname;
		//i.e. worldcup.si.com
		retValue += document.location.pathname;
		//gives /2010/06/18/united-states-2-slovenia-2/
		retValue += document.location.search;
		//will give any xid's, erefs, whatever.
		return retValue;
	}

	function cnn_omnitureGetReferrer() {
		// return a proper string for referrer if one exists
		var retValue = '';
		var myQuery = queryString( 'eref' );
		var myQuery2 = queryString( 'xid' );
		if( myQuery != "false" ) {
			retValue += "from " + myQuery;
			if( myQuery2 != "false" ) { retValue += ", xid " + myQuery2; }
			retValue += " - " + cnn_omnitureGetPath();
			retValue = retValue.replace( 'eref=' + myQuery, "" ); // remove our eref
			retValue = retValue.replace( 'xid=' + myQuery2, "" ); // remove our xid
			retValue = retValue.replace( /\?$/, "" ); // remove ending question mark cause there are no more parameters
			retValue = retValue.replace( /\?&$/, "" ); // remove ending question mark cause there are no more parameters
		} else if( myQuery2 != "false" ) {
			retValue += "xid " + myQuery2 + " - " + cnn_omnitureGetPath();
			retValue = retValue.replace( 'xid=' + myQuery2, "" ); // remove our xid
			retValue = retValue.replace( /\?$/, "" ); // remove ending question mark cause there are no more parameters
		}
		if( retValue == '' ) retValue = null;
		return retValue;
	}

	function cnn_omnitureGetSection(){
		var retValue = 'SI Blogs';
		return retValue;
	}

	function cnn_omnitureGetPageType() {
		var host = location.hostname;
		//parse the subdomain
		var retDomain = host.split('.');
		var subDomain = retDomain[0];
		switch( subDomain ){
			//this is where you add new sites's name
			case 'worldcup': retValue = "Worldcup"; break;
			case 'joeposnanski': retValue = "Joe Posnanski"; break;
			case 'lebron-james-watch': retValue = "SI Lebron James Watch";break;
			case 'wp': retValue = "Testing";break;
			default: break;
		}
		return retValue;

	}

	function cnn_omnitureGetPageName() {
		var retValue = '';
		var tempValue = document.location.pathname;
		if( ( tempValue == '/' ) || ( tempValue.charAt( tempValue.length ) == "/" ) ) { tempValue += "index.htm"; }// make sure there's always a filename
		if(  tempValue == '/index.htm' ) { 
			retValue = 'SI Blogs - ' + cnn_omnitureGetPageType() + ' - Home'; 
		}
		else{
			var path_array = ( tempValue.substr( 1 ).split( "/" ));
			if(path_array[0].match( /^\d{4}/ ) ) {
				if(path_array[1] == '' || path_array[1] == 'undefined'){
					retValue = path_array[0] + ' - Archive';
				}
				else if(path_array[2] == '' || path_array[2] == 'undefined'){
					retValue = path_array[0] + '/' + path_array[1]  + ' - Archive';
				}
				else if(path_array[3] == '' || path_array[3] == 'undefined'){
					retValue = cnn_omnitureGetDate() + ' - Archive';
				}
				else{
					retValue = path_array[3];
				}
			}
			else if( (path_array[0] == "tag") || (path_array[0] == "category") ){
				switch(path_array[0])
				{
					case "tag": retValue = 'Tag - ' + path_array[1]; break;
					case "category": retValue =  'Category - ' + path_array[1]; break;
					default: retValue =  'Undefined Plugin Section'; break;
				}
			}
			else if( path_array[0] != '' || path_array[0] != 'undefined') {
				switch(path_array[0])
				{
					case "joes-words": retValue = 'Joes Words'; break;
					case "halls-of-fame": retValue = 'Halls of Fame'; break;
					case "glossary": retValue = 'Glossary'; break;
					case "contact": retValue = 'Contact'; break;
					case "books": retValue = 'Books'; break;
					case "joe": retValue = 'About Joe'; break;
					case "archive": retValue = 'Archive'; break;
					default: retValue = "Unknown Page"; break;
				}
			}
			else{
			retValue = "Unknown Page"
			}
		retValue ='SI Blogs - ' + cnn_omnitureGetPageType() + ' - ' + retValue;
		}
		return retValue;
		
	}

	function writeData() {
		document.write( '<a name="cnnOmniture"></a>' );
		document.write( '<table border="0" cellpadding="0" cellspacing="0" style="font-size:10px;">' );
		document.write( '<tr><td colspan="2" style="background-color:#f00;color:#fff;text-align:center;">Omniture Values</td></tr>' );
		for( key in cnn_omnitureData ) {
			document.write( '<tr><td>' + key + '</td><td>' + cnn_omnitureData[key] + '</td></tr>' );
		}
		siLog.debug('Omniture', cnn_omnitureData);
		document.write( '</table>' );
	}

	function cnn_omnitureGetDate(){
		var retValue = '';
		var tempValue = document.location.pathname;
		var path_array = ( tempValue.substr( 1 ) ).split( "/" );
		retValue = path_array[0] + '/' + path_array[1] +  '/' + path_array[2];
		return retValue;
	}

	function cnn_OmnitureGetHeadline() {
		var retValue = '';
		if( $c( 'siv_pageTitle', 'div' ) ) {
			var matchTag = /<(?:.|\s)*?>/gi;
			var counter = 0;
			var temp = '';
			for( classname in  $c('siv_pageTitle') ){
				if( counter == 0 ) {
					temp = $c('siv_pageTitle')[classname].innerHTML;
				}
				counter++;
			}
			retValue += ( ( temp.replace( /<h1>/i, "" ) ).replace( /<\/h1>/i, "" ) ).replace( matchTag, " " );
		}
		return retValue;
	}
