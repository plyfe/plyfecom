/*****************************

SI.com Scoreboard Object
------------------------
* built assuming that:
	- may be used on any page
	- a config file holds game urls for each league
	- json data returned follows a particular structure
		
* Table of Contents
0. Ajax Object
1. Scoreboard Object
	A. Initialize Properties
	B. Define Methods
		- get24hour(time)	>>> passes in time as "10:10 PM ET" and returns 2010 (as int)
		- sortGamesByTime	>>> array sorting function that sorts games by time
		- retrieveGames		>>> the start of the process to display games on the scoreboard
		- displayGames		>>> writes the data into html elements
		- getmySIteams		>>> reads the mySIcom cookie to set MySI games
		- changeTab			>>> changes tabs and content that goes with tab
		- flipSportPage		>>> for tabs where the content has multiple 'pages', this changes from page to page
	C. Trigger MySI games
	D. Scoreboard Marketing Unit
2. Initialize Scoreboard Object

*******************************/

/*******	0. Ajax object	*******/

function ajaxer(url, callbackFunction) {
	var that=this;      
	this.updating = false;
	this.abort = function() {
		if (that.updating) {
			that.updating=false;
			that.AJAX.abort();
			that.AJAX=null;
		}
	}
	this.update = function(passData,postMethod) { 
		if (that.updating) { return false; }
		that.AJAX = null;                          
		if (window.XMLHttpRequest) {              
			that.AJAX=new XMLHttpRequest();              
		} else {                                  
			that.AJAX=new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (that.AJAX==null) {                             
			return false;                               
		} else {
			that.AJAX.onreadystatechange = function() {  
			if (that.AJAX.readyState==4) {             
				that.updating=false;                
				that.callback(that.AJAX.responseText,that.AJAX.status,that.AJAX.responseXML);        
				that.AJAX=null;                                         
			}                                                      
		}
		that.updating = new Date();                              
		if (/post/i.test(postMethod)) {
			var uri=urlCall+'?'+that.updating.getTime();
			that.AJAX.open("POST", uri, true);
			that.AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			that.AJAX.setRequestHeader("Content-Length", passData.length);
			that.AJAX.send(passData);
		} else {
			var uri=urlCall;
			var updatedTime = that.updating.getTime();
			var ifModifiedSince = new Date(0);
			that.AJAX.open("GET", uri, true); 
			if(navigator.appName == "Microsoft Internet Explorer"){ /* if IE, then set the header to see if the file has been modified since some time in the past */
				that.AJAX.setRequestHeader("If-Modified-Since", ifModifiedSince);
			}
			that.AJAX.send(null);                                         
		}              
			return true;                                             
		}                                                                           
	}
	var urlCall = url;        
	this.callback = callbackFunction || function () { };
}
/*******	[END] 0. Ajax object	*******/

/*************
1. Scoreboard Object
*************/

		function fixLongTeamNames( team ){
			var teams = {
				"alabam":"Alabama",	"alast":"Alabama St.",	"arizon":"Arizona",	"ark_lr":"UALR",
				"belmon":"Belmont",	"buck":"Bucknell",	"bu":"Boston U.", "byu":"BYU",
				"chrstn":"Charleston",	"cin":"Cincinnati",	"clemso":"Clemson", 
				"fairfi":"Fairfield",	"flaatl":"Florida Atl.",	"flast":"Florida St.",	"florid":"FLorida",
				"georgi": "Georgia",	"gmason":"G-Mason",	"gtown":"Georgetown",
				"hamp":"Hampton",	"harv":"Harvard",
				"illino":"Illinois",	"indst":"Indiana St.",
				"kentst":"Kent St.",	"kentuc":"Kentucky",	"kstate":"Kansas St.",
				"longbe":"Long Beach",	"lou":"Louisville",
				"marque":"Marquette",	"memphi":"Memphis",	"mich":"Michigan",	"michst":"Michigan St.",	"missou":"Missouri",	"missvl": "MVSU", "morehe":"Morehead St.",
				"nc_ash":"UNC Ash",	"nco":"N. Colorado",	"notred":"Notre Dame",
				"oaklan":"Oakland",	"ohiost":"Ohio St.",	"olddom":"ODU",
				"pitt":"Pittsburgh",	"prince":"Princeton",	"psu":"Penn St.",
				"richmo":"Richmond",
				"sdkst": "S Dakota St.", "sdsu": "San Diego St.", "stbona": "St. Bona", "stjohn":"St. John's",	"stmary":"St. Mary's",	"stpete":"St. Peter's",	"syracu":"Syracuse",
				"tenn":"Tennessee",	"texam":"Texas A&M",
				"uc-sb":"UCSB", "uc_sb":"UCSB",	"unc":"UNC",	"utahst":"Utah St.",
				"vandy":"Vanderbilt",	"vatech":"Va. Tech",	"vill":"Villanova",	"vcu":"VCU",
				"wash":"Washington",	"wisc":"Wisconsin",	"woffor":"Wofford"
			};
			
			var new_team_name = (typeof teams[team] !== "undefined") ? teams[team] : team;
			return new_team_name;
		}
		
var _csbi = null;								/*current scoreboard instance (globally set to be accessed from anywhere on page)*/
var _scoreboard = {};
_scoreboard.showMarketingUnit = false;	//a flag for controlling whether or not the market units should display
_scoreboard.firstLoad = true;
_scoreboard.activeTab = "";
_scoreboard.activePage = 0;
_scoreboard.refreshRate = 36000; //milliseconds
_scoreboard.lastautoflip = 0;
_scoreboard.mktg_unit = {
	normal:{
		file:"/.element/ssi/sect/4.1/MAIN/.branding/scoreboard/scoreboard_cm.html"
	},
	wide:{
		file:"/.element/ssi/sect/4.1/MAIN/.branding/scoreboard/scoreboard_cm_wide.html"
	}
};
_scoreboard.bracket_html = '<map name="cnnGameScores11MM">';
_scoreboard.bracket_html += '	<area title="Live Bracket" alt="Live Bracket" href="/basketball/ncaa/men/2013/ncaa_tourney/brackets/" coords="0,0,137,18" shape="rect">';
_scoreboard.bracket_html += '	<area title="Printable Men\'s Bracket" alt="Printable Men\'s Bracket" href="http://i.cdn.turner.com/si/basketball/ncaa/men/2013/ncaa_tourney/brackets/tourney_m.pdf" coords="0,19,94,37" shape="rect">';
_scoreboard.bracket_html += '	<area title="Printable Women\'s Bracket" alt="Printable Women\'s Bracket" href="    http://i.cdn.turner.com/si/basketball/ncaa/men/2013/ncaa_tourney/brackets/tourney_w.pdf" coords="95,19,137,37" shape="rect">';
_scoreboard.bracket_html += '	<area title="Bracket Challenge" alt="Bracket Challenge" href="http://sportsillustrated.collegehoops.upickem.net/" coords="0,38,137,56" shape="rect">';
_scoreboard.bracket_html += '</map>';
_scoreboard.bracket_html += '<img usemap="#cnnGameScores11MM" title="" alt="" src="http://i.cdn.turner.com/si/.element/img/4.1/sect/basketball/ncaa/mens-tournament-2012/mini_scoreboard/brackets_12.gif">';

function Scoreboard(tab,content,data){
	var _flipInterval = 12000;
	var current_page = 0;
	_csbi = this;							/*set the current scoreboard instance*/
	
	/*******	A. Initialize Properties	*******/
	//this._configURL = (typeof(confURI) == "string") ? confURI : "/.element/games/json/main_config.json";
	
	this._configJSON = data;
	this.t = tab;
	this.c = content;
	this.current_tab = "";
	this.current_year = '2010';
	this.activeTabs = new Array();
	this.mysi = {
		active:false,
		teams:{
			NFL:[],
			NBA:[],
			NHL:[],
			MLB:[],
			NCAAF:[],
			NCAAB:[],
			WCS:[]
		}
	};
		
	var completeScoreboardImgSrc = "http://i.cdn.turner.com/si/.element/img/4.2/global/refresh/scoreboard_complete_scoreboard.png";
	var mysiImgSrc = "http://i.cdn.turner.com/si/.element/img/4.2/global/refresh/scoreboard_mysi_edit_teams.gif";
	var showGolf = true;	//false;

	this.golfJSONurl = "http://data.golf.com/jsonp/golf/static/json/leaderboard/current_r/leaderboard_top10.json";
	this.golfJSON = {};
	
	this.tabs = {
		MYSI:{type:"MYSI",games:[],game_order:{},tabname:'MySI GAMES',img:{src:mysiImgSrc,alt:'Edit MySI Teams',link:'/mysi/personalization/'}},
		GOLF:{type:"GOLF",showTV:false,games:[],game_order:{},tabname:'GOLF',img:{src:completeScoreboardImgSrc,alt:'Complete Leaderboard',link:'http://www.golf.com/golf/tours_news/leaderboard/'}, postseason:false},
		NFL:{type:"NFL",games:[],game_order:{},tabname:'NFL',img:{src:completeScoreboardImgSrc,alt:'Complete NFL Scoreboard',link:'/football/nfl/scoreboards/today/'}, postseason:false},
		NBA:{type:"NBA",games:[],game_order:{},tabname:'NBA',img:{src:completeScoreboardImgSrc,alt:'Complete NBA Scoreboard',link:'/basketball/nba/scoreboards/today/'}, postseason:false},
		MLB:{type:"MLB",games:[],game_order:{},tabname:'MLB',img:{src:completeScoreboardImgSrc,alt:'Complete MLB Scoreboard',link:'/baseball/mlb/scoreboards/today/'}, postseason:false},
		NHL:{type:"NHL",games:[],game_order:{},tabname:'NHL',img:{src:completeScoreboardImgSrc,alt:'Complete NHL Scoreboard',link:'/hockey/nhl/scoreboards/today/'}, postseason:false},
		NCAAF:{type:"NCAAF",games:[],game_order:{},tabname:'NCAAf',img:{src:completeScoreboardImgSrc,alt:'Top 25 College Football Scoreboard',link:'/football/ncaa/scoreboards/top25/today/'}, postseason:false},
		NCAAB:{type:"NCAAB",games:[],game_order:{},tabname:'NCAAB',img:{src:completeScoreboardImgSrc,alt:'Top 25 College Basketball Scoreboard',link:'/basketball/ncaa/men/scoreboards/top25/today/'}, postseason:false},
		WCS:{type:"WCS",games:[],game_order:{},tabname:'WCS',img:{src:completeScoreboardImgSrc,alt:'Complete World Cup Scoreboard',link:'/soccer/world-cup-2010/scoreboards/today/'}, postseason:false}
	};
	/*******	[END] A. Initialize Properties	*******/
	
	/*******	B. Define Methods	*******/
	this.getXMLdoc = function(text){
		var xmlDoc;
		try {
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(text);
		 }
		catch(e)
		  {
			try{
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(text,"text/xml");
			}
			catch(e) {
				return false;
			}
		  }
		return xmlDoc;
	};
	
	this.get24hour = function(time){
		var isPM = (time.match(/PM/i) ) ? true : false;
		var hm = time.split(":");						
		var h = (parseInt(hm[0], 10));
		if(isPM && h<12){ h += 12; }
		var m = parseInt(hm[1], 10);									/*passing in a radix (base 10) as the 2nd param so '08' and '09' don't return '0'*/
		m = (m < 10) ? "0"+m.toString() : m.toString();
		h = h.toString();
		var _24hr = h+m;
		return parseInt(_24hr,10);
	};
	
	this.sortGamesByTime = function(a,b){
		var x = _csbi.get24hour(a.time) || 0;
		var y = _csbi.get24hour(b.time) || 0;

		return (x < y) ? -1 : (x > y) ? 1 : 0;
	};
	
	this.sortGamesByStatus = function(a,b){
				var x = y = 0;
				
				
		
		a.statusID = 2; 
		if (a.state == 'IP' && a.status == 'F') { a.statusID = 3; }
		else if (a.state == 'IP'  || a.time == 'Half-Time') { a.statusID = 1; }
		
		b.statusID = 2; 
		if (b.state == 'IP' && b.status == 'F') { b.statusID = 3; }
		else if (b.state == 'IP' || b.time == 'Half-Time') { b.statusID = 1; }

		x = a.statusID;
		y = b.statusID;
		
		if( x === y && x === 2){ //if both games are in the preview state, then sort based on game start time
			x = _csbi.get24hour( a.time );
			y = _csbi.get24hour( b.time );
		}
				
		return (x < y) ? -1 : (x > y) ? 1 : 0;
		
	};
	
	this.sortGamesByOrder = function(a,b){
		var x = y = 0;
			x = a.order || _csbi.get24hour(a.time);
			y = b.order || _csbi.get24hour(b.time);
				
		return (x < y) ? -1 : (x > y) ? 1 : 0;		
	};
	
	this.retrieveGames = function(){
		var o = _csbi;
		var game_url, game_data, game_pos, game_url_array, game_file_name, game_id, games, games_hidden;
		var sports = o._configJSON.scoreboard.sports.sport;
						
		/*loop through each sport available in main_config*/
		for(var i=0;i<sports.length;i++){
			var	sport = sports[i].type;
			var taborder = parseInt(sports[i].position)-1;
			games  = sports[i].games;
			o.tabs[sport].tabname = sports[i].tabname;
			o.tabs[sport].active = true;
			o.tabs[sport].img.link = sports[i].clickthru;
			o.tabs[sport].maintain_order = (sports[i].maintain_order == 'on') ? true : false;
			o.tabs[sport].postseason = (sports[i].postseason === 'on') ? true : false;
			/*
			try{
			if(sport === 'NCAAB' && typeof games[0].sport.game.bracket_id === 'undefined'){
				o.tabs[sport].postseason = false;
			}
			}catch(e){}
			*/
						
			o.activeTabs.splice(taborder,0,o.tabs[sport]);
			if(sport == "GOLF"){
				var golf_date_array = sports[i].date.split('/');
				
				showGolf = true;
				o.tabs.GOLF.showTV = sports[i].showTv;//false;
				o.tabs.GOLF.date = sports[i].date;
				o.tabs.GOLF.tv_data = {
					"tv1": sports[i].tv1,
					"tv2": sports[i].tv2
				}
			}
			/*loop through each game per sport*/
			for(var g=0;g<games.length; g++){
				this.pushGame(sport, games[g], g+1, true);
			}
			/* loop through hidden games if exist */
			if (sports[i]['hidden']) {
				games_hidden = sports[i].hidden;
				for(var g=0;g<games_hidden.length; g++){
					this.pushGame(sport, games_hidden[g], g+1);
				}
			}
		}
		if(showGolf){ _csbi.retrieveGolfData(_csbi.golfJSONurl); }
	};

	this.pushGame = function(sport, game, game_pos, display) {
	
	if( typeof game != "undefined"){
	
		var o = _csbi;
		//game_pos = g+1;
		var the_game = game.sport.game;
		game_id = the_game.id;
		o.tabs[sport].game_order[game_id] = parseInt(game_pos);
		
		//add postseason flag to game
		the_game.postseason = o.tabs[sport].postseason;
		
		var game_league	= game.sport.type;
		var visitor		= the_game.visitor.full_name;
		var home		= the_game.home.full_name;
		var v			= the_game.visitor.short_name;
		var h			= the_game.home.short_name;
		
		if(typeof(the_game.visitor.mysi_team_id) == "undefined" && typeof(the_game.home.mysi_team_id) == "undefined"){
			the_game.visitor.mysi_team_id		= this.handleSpecialCases(v.toLowerCase()).replace(/\s/g,'_');
			the_game.home.mysi_team_id 			= this.handleSpecialCases(h.toLowerCase()).replace(/\s/g,'_');
		}
		
		if(game_league == "NBA"){
			var v_abrv = the_game.visitor.three_letter_abrv;
			var h_abrv = the_game.home.three_letter_abrv;
			v_abrv = ( v == "Eastern" || visitor == "Eastern All-Stars") ? "East" : v_abrv;
			h_abrv = ( h == "Eastern" || home == "Eastern All-Stars") ? "East" : h_abrv;
			v_abrv = ( v == "Western"  || visitor == "Western All-Stars") ? "West" : v_abrv;
			h_abrv = ( h == "Western"  || home == "Western All-Stars") ? "West" : h_abrv;
			
			the_game.visitor.three_letter_abrv = v_abrv;
			the_game.home.three_letter_abrv = h_abrv;
			
		} 
		

		//fix potentially long team names so they don't overlap the tv logo for the tourneys
		if( game_league === 'NCAAB' && the_game.postseason){
			if(the_game.visitor.mysi_team_id.length <= 6){
				var truncated_v = fixLongTeamNames( the_game.visitor.mysi_team_id );
				if(truncated_v !== the_game.visitor.mysi_team_id){
					the_game.visitor.short_name = truncated_v;
				}
				
			}
			
			if(the_game.home.mysi_team_id.length <= 6){
				var truncated_h = fixLongTeamNames( the_game.home.mysi_team_id );
				if(truncated_h !== the_game.home.mysi_team_id){
					the_game.home.short_name  = truncated_h;
				}
			}
		}
		

		/*add game to respective league tab*/
		if (display) { o.tabs[game_league].games.push(the_game); }
		
		/*if either team is on the mysi list, then add to mysi tab game array*/
		/*
		if(o.mysi.active){
			for(var m=0;m<o.mysi.teams[game_league].length;m++){
				var mysiTeam = o.mysi.teams[game_league][m];
				if( typeof(the_game.visitor.mysi_team_id) != "undefined" || typeof(the_game.home.mysi_team_id) != "undefined" ){
				 var v_mysi_team_id = the_game.visitor.mysi_team_id.replace('-','_');
					var h_mysi_team_id = the_game.home.mysi_team_id.replace('-','_');
					if(mysiTeam == v_mysi_team_id || mysiTeam == h_mysi_team_id )
					{
						o.tabs["MYSI"].games.push(the_game);
						if (display) { ; } else { o.tabs[game_league].games.push(the_game); }
					}
				} 
			}
		}
		*/
		
	}
	}
	
	this.retrieveGolfData = function (url) {
		$.jsonp({
			url: this.golfJSONurl,
			callbackParameter: 'callback',
			callback:'displayGolfLB',
			cache:true,
			success: function(data, msg) {
				if ( data !== _csbi.golfJSON ){
					_csbi.golfJSON = data;
					_csbi.displayGolfLB();	
				}
			},
			error: function(data, msg) {
			    //TODO: appropriate error handling needed
			}
	   	 });
	};
	
	this.displayGames = function(){
		var t = this.t;
		var c = this.c;
		
		var Tabs = '';
		var Content = '';
		
		if( this.tabs["MYSI"].games.length > 0 ){ /* if mysi is active */
			if(this.tabs["MYSI"].first){
				this.activeTabs.splice(0,0,this.tabs["MYSI"]); 	/* if user elects, put mysi first */
			} else {
				this.activeTabs.push(this.tabs["MYSI"]);		/* otherwise put mysi last */
			}
		}
		
		this.current_tab = ( _scoreboard.firstLoad == false && _scoreboard.activeTab.length > 0) ? _scoreboard.activeTab : this.activeTabs[0].type;	
				
		/*render tabs and content*/
		Tabs = "<div class=\"cnnRight\"><a href=\"http://sportsillustrated.cnn.com/scoreboards/\" target=\"_top\">ALL SCORES</a></div>";
		Tabs += "<ul>";
		
		for(var current_tab=0;current_tab < this.activeTabs.length; current_tab++){
			var curr = this.activeTabs[current_tab];
			var site = "http://sportsillustrated.cnn.com";
			/*tab image links*/
			var tis 	= curr.img.src;
			var tia 	= curr.img.alt;
			/*organize games per tab before displaying*/
			var til 	= (curr.img.link.indexOf("http://") > -1) ? curr.img.link : site+curr.img.link;
			var gpp = (curr.type == "MYSI" || curr.type == "NCAAF" ||  curr.type == "NCAAB" || curr.type == "WCS" ) ? 4 : 7; 
						
			var games = curr.games;
			var game_order  = this.tabs[curr.type].game_order;					/*game order based on scoreboard tool*/
			for(var y=0;y<games.length;y++){														
				games[y].order = game_order[games[y].id];
				var p = y-1;
				if(p >= 0 && (games[p].id ==games[y].id)){							
					games.splice(y,1);
					/*remove duplicate games, if any*/
				}
			}

			games.sort(this.sortGamesByTime); 									/*sort the games by time*/
					
			if(curr.type != "MYSI" && curr.type != "GOLF"){
				if (curr.type != "NCAAB" && curr.type != "NCAAF" && this.tabs[curr.type].maintain_order){
					games.sort(this.sortGamesByOrder);									/*sort the games by status id*/
				}
				games.sort(this.sortGamesByStatus);									/*sort the games by status id*/
			}
			
			/**
				* IF this is the NCAAB postseason,
				* THEN duplicate every fourth game.
				* The technique is to create a cheap way to extend the array
				* in a way that will allow the game in the fifth slot,
				* which is the duplicate game, to be overwritten by the bracket links box.
				* see line: 486
			 */
			if(curr.type === 'NCAAB' && curr.postseason){
				for(var gm=0;gm<games.length;gm++){
					if((gm+1) % 4 == 0){
						games.splice(gm, 0, games[gm]);						
					}
				}
			}
			/*END:organize games per tab before displaying*/
			
			var nog = games.length;												/*# of games in current tab*/
			var nop = Math.ceil(nog/gpp);											/*# of pages in current tab*/
			this.tabs[curr.type].pages = nop;
			
				/*render each tab*/
				Tabs += ( current_tab == 0 ) ? "<li class=\"selected-tab\" id=\""+curr.type+"tab\">" : "<li id=\""+curr.type+"tab\">" ;
				Tabs += "<a href=\"javascript:_csbi.changeTab('"+curr.type+"');\">";
				Tabs += curr.tabname;
				Tabs += "<img id=\""+curr.type+"link\" onclick=\"javascript:window.parent.location.href='"+til+"'\" src=\""+tis+"\" alt=\""+tia+"\" title=\""+tia+"\"";
				Tabs += ( current_tab == 0 ) ? "/></a>" : "style=\"display:none;\"/></a>" ;
				Tabs += "</a>";
				Tabs += "</li>";
				/*END: render each tab*/
				for (var k=0;k<nop;k++){					/*render container per page for current tab*/
					var prevPage = k;
					var currPage = k+1;
					var lastOnPage = currPage*gpp;
					var firstOnPage = prevPage*gpp+1;	
					var lastPage = nop-1;
					var pageId = "cnnGameHolder"+curr.type;
					var firstPageId = pageId+"0";
					var currPageId = pageId+k;
					var prevPageId = pageId+parseInt(k-1);
					var nextPageId = pageId+currPage;
					var lastPageId = pageId+lastPage;

					var divName = 'cnnGameHolder'+curr.type+k;

					Content += "<div id=\"cnnGameHolder"+curr.type+k+"\"";

				if ( _scoreboard.firstLoad || _scoreboard.activeTab.length == 0){
					if(current_tab == 0 && k == 0) {
						if((_scoreboard.activePage == 0) || (divName == _scoreboard.activePage)) {
							Content += ">";
						} else {
							Content += "style=\"display:none\">";
						}
					} else {
						if(_scoreboard.activePage == 0) {
							Content += "style=\"display:none\">";
						} else {
							if(divName == _scoreboard.activePage) {
								Content += ">";
							} else {
								Content += "style=\"display:none\">";
							}
						}
					}
/*					Content +=  ( current_tab == 0 && k==0 ) ? ">" : "style=\"display:none\">"; */
				} else {
					Content +=  ( this.activeTabs[current_tab].type === _scoreboard.activeTab && ('cnnGameHolder'+curr.type+k) === _scoreboard.activePage) ? ">" : "style=\"display:none\">";
				}
					Content += (curr.type == "WCS") ? "<ul id=\"cnnGameScoresSoccer\">" : "<ul id=\"cnnGameScores"+curr.type+"\">";
					
					/*render first li*/
					Content += "<li class=\"cnnFirst\">";
					if(nop > 1 && k==0){ 		/*if first page in series, link to go to last page*/
						Content += "<a href=\"javascript:_csbi.flipSportPage('"+currPageId+"','"+lastPageId+"','"+lastPage+"')\"></a>";
					} else if(nop > 1){		/*otherwise go to previous page*/
						Content += "<a href=\"javascript:_csbi.flipSportPage('"+currPageId+"','"+prevPageId+"','"+prevPage+"')\"></a>";
					}
					Content += "</li>";
					/*END: render first li*/
					
					for(var j=0;j < lastOnPage;j++){								/*render each game*/
											
						var currGame = j+1;
												
						if((currGame >= firstOnPage) && (currGame <= lastOnPage) && games[j] != null){
							var league 	= games[j].sport;
							var date 	= games[j].date;
							var id 		= games[j].id;
							var state	= games[j].state;
							var status	= games[j].status;
							var home	= games[j].home;
							var visitor	= games[j].visitor;
							var time	= (games[j].time !== 'TBD') ? ( games[j].time.indexOf('0') === 0 ) ? games[j].time.replace('0', '12') : games[j].time : '12:01 AM ET';
							var url		= games[j].url;
							var clock	= games[j].clock;
							var gm_period	= games[j].period || games[j].inning || 0;
							var period	= parseInt( gm_period, 10 ) || 0;
							var OT		= (league === 'NCAAB') ? 3 : (league === 'MLB') ? 10 : (league === 'NHL') ? 4 : 5;
							var poststeason	= games[j].postseason;
							var tv_coverage	= games[j].tv_coverage || '';
							var bracket_id	= games[j].bracket_id || '';
							var stage 	= games[j].stage || '';
							var showTVLogo = false;//( ( tv_coverage === 'TBS' || tv_coverage === 'TNT' ) || ( league === 'NCAAB' && poststeason === true ) );
							var isFinal = ((state == "IP" && status == "F") || (state == "FINA" && status == "F"));
							
							// Start with machine date
							var datevalue = new Date();
							var themonth = datevalue.getMonth()+1;
							var monthvalue = (themonth < 10) ? "0" + themonth : themonth;
							var theday = datevalue.getDate();
							var dayvalue = (dayvalue < 10) ? "0" + theday : theday;
							
							// Process date from "Monthname DD" to "MM/DD"
							if (date.indexOf(', ')>0) { date = date.split(', ')[1]; }
							if (date.indexOf(' ')>0) {
								switch (date.split(' ')[0].substr(0,3).toLowerCase()) {
									case 'jan': monthvalue = '01'; break;
									case 'feb': monthvalue = '02'; break;
									case 'mar': monthvalue = '03'; break;
									case 'apr': monthvalue = '04'; break;
									case 'may': monthvalue = '05'; break;
									case 'jun': monthvalue = '06'; break;
									case 'jul': monthvalue = '07'; break;
									case 'aug': monthvalue = '08'; break;
									case 'sep': monthvalue = '09'; break;
									case 'oct': monthvalue = '10'; break;
									case 'nov': monthvalue = '11'; break;
									case 'dec': monthvalue = '12'; break;
								}
								dayvalue = date.split(' ')[1];
								if (dayvalue.length == 1) { dayvalue = "0"+dayvalue; }
							}
							
							//be sure that FINAL games go to recap.html
							if (status == "F" && state == "IP"){
								var statusFilename = url.match(/_.*\.html/);
								if(statusFilename != "_recap.html"){
									url = url.replace(statusFilename, "_recap.html");
								}
							}
							
							url = (url.indexOf(site) > -1 ) ? url :  site + url;
							/*
							if( league === 'NCAAB' && games[j].postseason ){
								if( state === "IP" && status !== "F"){
												url = "#";
								}
								if( state === "IP" && status === "F"){
									url = "http://si.ncaa.com/menshighlights/game/"+bracket_id;
								}
							}
							*/
							if( curr.type === 'NCAAB' && curr.postseason && currGame % 4 == 0 ){
								/**
								 *	overwrite that duplicate game we talked about
								 * 	see line: 371
								 */
								Content += "<li class=\"cnnGameScores"+league+" cnnGameScores11MM\">";
								Content +=		_scoreboard.bracket_html;
								Content += "</li>";
							} else {
								Content += (league == "WCS") ? '<li class="cnnGameScoresSoccer">' :'<li class="cnnGameScores'+league+'">';
								Content += "<a href=\""+url+"\" target=\""+((league === 'NCAAB' && games[j].postseason && state === "IP" && status === "F")?"_blank":"_top")+"\""+( (league === 'NCAAB' && games[j].postseason && status !== 'F' && state !== 'PRE')?" onclick=\"javascript:ncaaMmlLauncher.launchGameId('"+bracket_id+"');\"":"" )+">";
								Content += "<div class='game-container'>";
								
								var setMYSIclass = false;
								var mysiteams = this.mysi.teams[league];
								var showScore = ((curr.type != "WCS" && state !== "PRE" && period > 0) || (curr.type === "WCS" && state !== "SCHE"));
								
								/********	
								SHOW TEAMS
								conditions:
									- if team is a mysi team, then add class name "mysi-team" to span
									- if tab must show 4 games per page, use short name, otherwise if 7 games per page, use abbreviation
								********/
								
								/**********
								WCS Game Winner, if tie
								**********/
								if(league == "WCS"){
									var winner  = "none";
									if(visitor.score == home.score){ //we only care about a winner if they are tied
										if(home.shootoutScore > visitor.shootoutScore){
											winner = "home";
										} else if(home.shootoutScore < visitor.shootoutScore){
											winner = "vstr";
										}
									}
								}
								
								/*visitor*/
								Content += "<strong class='team visitor'";
								Content += (showTVLogo && !isFinal) ? ' class="cnnTelevisedGame"' : ''; //add the 'cnnTelevisedGame' class as needed
								Content += ">";
								if( showScore ){
									Content += "<strong class='score'>"+visitor.score+"</strong>";
								}
								
								if(visitor.rank != null && parseInt(visitor.rank) < 26) {
									Content += "<em>"+visitor.rank+"&nbsp;</em>";
								} else if (curr.type == "NCAAF" || curr.type == "NCAAB") {
									Content += "<em>&nbsp;</em>";
								}
							
								// GK - new variable in case short name doesn't come up
								var visitor_name;
								if (visitor.short_name) { visitor_name = visitor.short_name; }
								else if (visitor.city_name) { visitor_name = visitor.city_name.substr(0,12); }
								visitor_name = visitor_name.replace('State', 'St.');
								
								if(this.mysi.active){ 
									for(var l=0;l < mysiteams.length;l++){
										if (typeof(visitor.mysi_team_id) != "undefined" && visitor.mysi_team_id.replace('-','_') == mysiteams[l]){
											setMYSIclass = true;
											break;
										}
										else if(mysiteams[l] == visitor.short_name || visitor.full_name.indexOf(mysiteams[l])>-1){
											setMYSIclass = true;
											break;
										} 
									}
									if(setMYSIclass){
										Content += ( gpp==4 ) ? "<span class=\"mysi-team teamName\">"+visitor_name+"</span>" : "<span class=\"mysi-team teamName\">"+visitor.three_letter_abrv+"</span>";
									} else {
										Content += (gpp == 7 || (curr.type != "MYSI" && gpp != 4) ) ? "<span class='teamName'>"+visitor.three_letter_abrv+"</span>" : "<span class='teamName'>"+visitor_name+"</span>";
									}
								} else if (league == "WCS"){
									Content += (winner == "vstr") ? "<span class='teamName'>"+visitor.short_name+"*</span>" : "<span class='teamName'>"+visitor.short_name+"</span>";
								}else {
									Content += (gpp == 7) ? "<span class='teamName'>"+visitor.three_letter_abrv+"</span>" : "<span class='teamName'>"+visitor_name+"</span>";
								}
								Content += "</strong>";
								
								setMYSIclass = false;
								
								/*home*/
								Content += "<strong class='team home'";
								Content += (showTVLogo && !isFinal && (league === 'NCAAB' && poststeason === true && state === "PRE")) ? ' class="cnnTelevisedGame"' : ''; //add the 'cnnTelevisedGame' class as needed
								Content += ">";
								if( showScore ){
									Content += "<strong class='score'>"+home.score+"</strong>";
								}
								
								if(home.rank != null && parseInt(home.rank) < 26) {
									Content += "<em>"+home.rank+"&nbsp;</em>";
								} else if (curr.type == "NCAAF" || curr.type == "NCAAB") {
									Content += "<em>&nbsp;</em>";
								}
								
								var home_name;
								if (home.short_name) { home_name = home.short_name; }
								else if (home.city_name) { home_name = home.city_name.substr(0,12); }
								//if( home_name.indexOf('state') > -1 ) ? home_name.replace('state', 'st.') : home_name;
								home_name = home_name.replace('State', 'St.');
								
								if(this.mysi.active){ 
									for(var l=0;l < mysiteams.length;l++){
										if (typeof(home.mysi_team_id) != "undefined" && home.mysi_team_id.replace('-','_') == mysiteams[l]){
											setMYSIclass = true;
											break;
										}
										else if(mysiteams[l] == home.short_name || home.full_name.indexOf(mysiteams[l])>-1){
											setMYSIclass = true;
											break;
										}
									}
									if(setMYSIclass){
										Content += ( gpp==4 ) ? "<span class=\"mysi-team teamName\">"+home_name+"</span>" : "<span class=\"mysi-team teamName\">"+home.three_letter_abrv+"</span>";
									} else {
										Content += (gpp == 7 || (curr.type != "MYSI" && gpp != 4)) ? "<span class='teamName'>"+home.three_letter_abrv+"</span>" : "<span class='teamName'>"+home_name+"</span>";
									}
								} else if (league == "WCS"){
									Content += (winner == "home") ? "<span class='teamName'>"+home.short_name+"*</span>" : "<span class='teamName'>"+home.short_name+"</span>";
								}else {
									Content += (gpp == 7) ? "<span class='teamName'>"+home.three_letter_abrv+"</span>" : "<span class='teamName'>"+home_name+"</span>";
								}
								Content += "</strong>";
								
								/********	
								[END] SHOW TEAMS							
								********/
								
								/*status*/
								//pregame
								if (state == "PRE" || (status.indexOf("0") === 0 && state === "IP") || (league == "WCS" && (state == "SCHE" && status == "") || (state == "" && status == ""))){								/*if game not started, show time it starts*/
									if(league == "WCS" && time.indexOf('ET') < 0){
										var wcsT = time.split(':');
										var wcsH = ( parseFloat(wcsT[0]) > 12) ? parseFloat(wcsT[0]) - 12 : wcsT[0];
										var wcsM = wcsT[1];
										var wcsAMPM = ( parseFloat(wcsT[0]) > 12) ? "PM ET" : "AM ET";
										
										Content += "<div class='game-status'>"+wcsH+":"+wcsM+" "+wcsAMPM+"</div>";
									} else{
												if( time.toUpperCase().indexOf('ET') < 0 ){ time+= ' ET'; }
												
										Content += "<div class='game-status'>"+time.toUpperCase()+"</div>";
										
										if(showTVLogo && (league === 'NCAAB' && poststeason === true && state === "PRE") ){
											Content +=  "<div class=\"cnnTelevisedGame"+tv_coverage+"\">&nbsp;</div>";
										}
									}
								} 
								
								//final
								else if (isFinal){			/*if game is over, say FINAL*/
									/*if(league === 'NCAAB' && games[j].postseason ){
										Content +=	"<div style=\"text-align:left;\">";
										Content +=		"<div style=\"background-repeat:no-repeat;background-image: url(&quot;http://i.cdn.turner.com/si/.element/img/4.1/sect/basketball/ncaa/mens-tournament-2011/mini_scoreboard/highlights.png&quot;);\">FINAL</div>";
										Content +=	"</div>";
									} else */if (league === 'MLB'){
										Content += "<div class='game-status'>FINAL";
										if ( period >= OT ){
											Content += ' - ' + this.nthNumber(period);
										}
										Content += "</div>";
									} else {
										Content += "<div class='game-status'>FINAL";
										if( period >= OT){
											Content += '-';
											if( (period > OT && league !== 'NHL') || (league === 'NHL' && stage === 'post_season') ){
												Content += ( (period - (OT-1)) > 1 ) ? period - (OT-1) : '';
											}
											if( (league !== 'NHL') || (league === 'NHL' && stage !== 'post_season') ){
												Content += 'OT';
											} else if ( league === 'NHL' && stage !== 'post_season' && period === 5 ){
												Content += 'SO';
											}
										}
										Content += "</div>";
									}								
								} 
								
								//in-progress: MLB
								else if (state == "IP" && (league == "MLB")){		/*if game is in progress and MLB, say "Bot 5th"*/
									var inning = games[j].inning;
									var inningHalf = (
										(status.indexOf('Top') > -1) ? 'Top' :
										(status.indexOf('Bot') > -1) ? 'Bot' :
										(status.indexOf('Mid') > -1) ? 'Mid' :
										(status.indexOf('End') > -1) ? 'End' : ''
									);
									if(status == "POSTPONED" || status === "DELAYED" || status === "SUSPENDED" || status === "CANCELLED"){
										Content += "<div class='game-status'>"+status+"</div>";
									}else{
										if( inningHalf != '' && inning > 0){
											Content += "<div class='game-status'>"+inningHalf+" "+this.nthNumber(inning)+"</div>";
										} else {
											Content += "<div class='game-status'>"+time+"</div>";
										}
									}

									if(showTVLogo && (league === 'NCAAB' && poststeason === true && state === "PRE")){
										Content +=  "<div class=\"cnnTelevisedGame"+tv_coverage+"\">&nbsp;</div>";
									}									
								} 
								
								//in-progress: !MLB
								else if ( (state == "IP" && league != "MLB" )|| (state == "PROG" && league == "WCS"|| status == "PROG" && league == "WCS") ){		
									/*if game is in progress and not MLB, say "3rd | 2:01"*/
									if(league == "WCS"){
										Content += "<div class='game-status'>"+clock+ "'</div>";
									} else {
										//NBA, NCAAB, NFL, NCAAF: Halftime
										if ( (league === 'NCAAB' && status.indexOf('1') === 0 && clock === '0:00') ||
											(league !== 'NCAAB' && league !== 'NHL' && status.indexOf('2') === 0 && clock === '0:00') ||
											(league !== 'NCAAB' && league !== 'NHL' && status.indexOf('H') > -1) ) {
											if (league === 'NCAAB' && games[j].postseason ){
												Content += "<div class='game-status'>";
												Content += "<div style=\"background-image: url(&quot;http://i.cdn.turner.com/si/.element/img/4.1/sect/basketball/ncaa/mens-tournament-2011/mini_scoreboard/watchlive.png&quot;);\">";
												Content += "HALFTIME ";
												Content += "</div> ";
												Content += "</div> ";
											} else {
												Content += "<div class='game-status'> HALFTIME </div>";
											}
										} 
										//END of Period (End of 1st)
										else if ( clock === '0:00' ){
											if( period < OT ){
												Content += "<div class='game-status'> End of "+this.nthNumber(status)+" </div>";
											} else {
												Content += "<div class='game-status'> End of ";
												
												if( (league !== 'NHL') || (league === 'NHL' && stage === 'post_season') ){
													Content += ( period > OT) ? period - (OT - 1) : "";
													Content += "OT";		
												} else if ( league === 'NHL' && stage !== 'post_season' && period === 5 ){
													Content += 'SO';
												}
												
												Content += '</div>';
											}
										}
										//Period | Clock (4th | 2:14)
										else {
											if (league === 'NCAAB' && games[j].postseason ){
												Content += "<div>";
												Content += "	<div style=\"background-image: url(&quot;http://i.cdn.turner.com/si/.element/img/4.1/sect/basketball/ncaa/mens-tournament-2011/mini_scoreboard/watchlive.png&quot;);\" onclick=\"javascript:location.href=#live\">";
												if( period < OT ){
													Content += "<div class='game-status'>"+this.nthNumber(status)+"<span>|</span>" + clock + "</div>";
												} else {
													Content += "<div class='game-status'>";
													Content += ( period > OT ) ? period - (OT - 1) : "";
													Content += "OT<span>|</span>" + clock + "</div>";											
												}
												Content += "	</div> ";
												Content += "</div> ";
											} else {																					
												if( period < OT ){
													Content += "<div class='game-status'>"+this.nthNumber(status)+"<span>|</span>" + clock + "</div>";
												} else {
													Content += "<div class='game-status'>";
													Content += ( (period > OT && league !== 'NHL') || (league === 'NHL' && stage === 'post_season') ) ? period - (OT - 1) : "";
													Content += (league === 'NHL' && period === 5 && stage !== 'post_season') ? "SHOOTOUT</div>" : "OT<span>|</span>" + clock + "</div>";											
												}
											}
										}
									}
									
									if(showTVLogo && (league === 'NCAAB' && poststeason === true && state === "PRE") ){
										Content +=  "<div class=\"cnnTelevisedGame"+tv_coverage+"\">&nbsp;</div>";
									}
								} 
								
								//HALFTIME: WCS
								else if (state == "END-" && league == "WCS"){			/*if game is over, say FINAL*/
									Content += "<div>HALFTIME</div>";
								} 
															
								Content += "</div>";
								Content += "</a>";
								Content += "</li>";
							
							}
						}
												
						/*if the page isn't full, then add in place holders, the first empty place holder get a consumer marketing unit*/
						else if((currGame > firstOnPage) && (gpp - currGame) <= lastOnPage ){  
						
							var firstEmptyGame = nog + 1; //# of games + 1
							var marketing_size = (gpp == 7) ? "normal" : "wide";
							if( league === 'NCAAB' && curr.postseason && currGame == firstEmptyGame && currGame <= lastOnPage ){
								Content += "<li class=\"cnnFirstEmptyGame cnnGameScores11MM\"> "+_scoreboard.bracket_html+" </li>";							
							} else if(currGame == firstEmptyGame && currGame <= lastOnPage && _scoreboard.firstLoad && _scoreboard.showMarketingUnit){
								//create the li now to be populated once the ad is retrieved
								Content += "<li class=\"cnnFirstEmptyGame cnnCMUnit" + marketing_size + "\"> </li>";
							} else if ( currGame == firstEmptyGame && currGame <= lastOnPage && !( _scoreboard.firstLoad) && _scoreboard.showMarketingUnit) {
								Content += "<li class=\"cnnFirstEmptyGame cnnCMUnit" + marketing_size + "\">" + _scoreboard.mktg_unit[marketing_size].html + "</li>";							
							} else {
								Content += "<li class=\"cnnEmptyGame\"> </li>";
							}
						}
					}
					/*END: render each game*/
					
				/*render last li	*/
				Content += "<li class=\"cnnLast\">";
				if(nop > 1 && k==lastPage){				/*if last page in series, link to go to first page*/
					Content += "<a href=\"javascript:_csbi.flipSportPage('"+currPageId+"','"+firstPageId+"','0')\"></a>";
				} else if(nop > 1){						/*otherwise, link to go to next page*/
					Content += "<a href=\"javascript:_csbi.flipSportPage('"+currPageId+"','"+nextPageId+"','"+currPage+"')\"></a>";
				}
				Content += "</li>";
				/*END: render last li*/
				
				Content += "</ul>";
				Content += "</div>";
				/*END: render container per page for each tab		*/
				
				}
				
			/*END: render games*/
			
		}
		Tabs += "</ul>";
		
		if(showGolf){
			
				//show a loading message until the content shows, if no content is there
				Content += (this.current_tab != "GOLF") ? "<div id=\"cnnGameHolderGOLF0\" style=\"display:none;\">\n" : "<div id=\"cnnGameHolderGOLF0\">\n" ;
			if( $e('cnnGameScoresGolf')  === null ){
				Content += 		"<p style=\"position:absolute; top:-40px; left: 280px;\">\n";
				Content += 			"<img src=\"http://i.cdn.turner.com/si/.element/img/4.1/global/scoreboard_loading.png\" />";
				Content += 		"</p>\n";
			}
				Content += 	"</div>";
			
		}
		/*END: render tabs and content*/
		
		/*innerHTML assignments*/
		if (Tabs) { 
			if($e(t).innerHTML.length == 0 || _scoreboard.firstLoad == true){ //this is the first load
				$e(t).innerHTML = Tabs; 
				_scoreboard.firstLoad = false;
			}
		}
		if (Content) { $e(c).innerHTML = Content; } 		
		
		if(this.tabs[this.current_tab].pages > 1){
			if( typeof(_scoreboard.autochangepage) != "undefined") clearInterval(_scoreboard.autochangepage);	/* clear the interval */
			//_scoreboard.autochangepage = setInterval("_csbi.autopage()",_flipInterval);
		}
	};
	
	this.displayGolfTVData = function(){
		var tv_stations = this.tabs.GOLF.tv_data;
		var tv_stations_num = 0;
		for(station in tv_stations){
			if( tv_stations[station].channel !== '---'){
				tv_stations_num++;
			}
		}
									
		var months = ['', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
		var days = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
		var isDaylight = (  new Date().toTimeString().indexOf('DT') > -1);
		var ET = (isDaylight) ? 'EDT' : 'EST';
		var golf_date = this.tabs.GOLF.date;
		var golf_date_array = golf_date.split('/');
		
		//display date stuff
		var display_month = (golf_date_array[1].indexOf('0') === 0) ? months[ golf_date_array[1].substr(1) ] : months[ golf_date_array[1] ];
		var display_date = (golf_date_array[2].indexOf('0') === 0) ? golf_date_array[2].substr(1) : golf_date_array[2];
		var display_dow = days[ new Date( golf_date ).getDay() ];
		
		var date_string = display_dow + ' ' + display_month + ' ' + display_date;
		
		var ahora = new Date().getTime();
		var activeChannel = null;
		var image_base = 'http://i.cdn.turner.com/si/.element/img/4.1/sect/MAIN/scoreboard/CHANNEL_scoreboard-logo.png';
		
		//adding to tv1 data
		tv_stations.tv1.start_utc = new Date(golf_date + ' ' + tv_stations.tv1.start_time.replace('ET', ET)).getTime();
		tv_stations.tv1.end_utc = new Date(golf_date + ' ' + tv_stations.tv1.end_time.replace('ET', ET)).getTime();
		
		//adding to tv2 data
		tv_stations.tv2.start_utc = new Date(golf_date + ' ' + tv_stations.tv2.start_time.replace('ET', ET)).getTime();
		tv_stations.tv2.end_utc = new Date(golf_date + ' ' + tv_stations.tv2.end_time.replace('ET', ET)).getTime();
		
		switch ( tv_stations_num ){
			case 0:
				this.tabs.GOLF.showTV = false;	
				break;
			case 1:
				activeChannel = 'tv1';
				break;
			case 2:
				activeChannel = ( ahora >= tv_stations.tv2.start_utc || ahora >= tv_stations.tv1.end_utc ) ? "tv2" : "tv1";
				break;
			default:
				//change nothing
				break;
		}
		
		var tv_html = '';
		tv_html += '<span class="tv_coverage">';
		tv_html += 	'<img src="'+ image_base.replace('CHANNEL', tv_stations[activeChannel].channel )+'"/>';
		tv_html += 	'<p>' + date_string + '<br/>'+ tv_stations[activeChannel].start_time.toUpperCase() +'</p>';
		tv_html += '</span>';
		return tv_html;
	};
	
	this.displayGolfLB = function(){
		if( typeof(_csbi.golfJSON.lb) === "undefined"){
			if($e("GOLFtab")) $e("GOLFtab").style.display = "none";
			return false;
		}
		var tabLink =  this.tabs["GOLF"].img.link;
		var Content;
			Content = "<ul id=\"cnnGameScoresGolf\">\n";
			//Content += "<li class=\"cnnFirst\"> </li>\n";
			Content += "<li class=\"cnnGameScoresGolf"+ (this.tabs.GOLF.showTV?' cnnTelevisedMatch':'') +"\">\n";
				Content +="<a href=\""+tabLink+"\">\n";
					
					if( this.tabs.GOLF.showTV ){
						Content += this.displayGolfTVData();
					}
					
					Content += "<div class='golf-leaderboard'>\n";
					
					var playerNodes = this.golfJSON.lb.ps.p || [];
					var players = 9;
					if( playerNodes.length < 9){
						players = playerNodes.length;
					}
					
					if( players > 0 ){
						
					for(var i=0;i<9;i++){
						var playerNode = playerNodes[i];
						var fn = playerNode["fn"];
						var ln = playerNode["ln"];
						var rank = playerNode["curpos"] || playerNode["cp"] || '-';
						var score = playerNode["tournparrel"] || playerNode["tpr"] || '-';
						var thru = playerNode["thru"] || playerNode["th"] || '-';
						var name = fn+" "+ln.replace(' (a)','');
						var names = name.split(' ');
						if( names.length === 3 && this.tabs.GOLF.showTV){
							//check to see if the 'middle' name is less than 3 characters (b/c its usually something like "de" or "van", ie Brandon de Jonge)
							// and also that the last name is not a suffix (Jr., Sr., III, IV, etc)
							// and if not trim it to an initial
							if( (
								(names[1].length > 3) &&
								(names[2].indexOf('II') < 0) && (names[2].indexOf('IV') < 0 ) &&
								(names[2].indexOf('Jr.') < 0) && (names[2].indexOf('Sr.') < 0)
							     )
							){
								names[1] = names[1].substr(0,1)  + ".";
							}
							name = names.join(' ');
							
						}
						
						if( name.length > 20 ){
									names = name.split(' ');
									names[0] = names[0].substring(0,1) + ".";
									name = names.join(' ');
							}
							
						Content += "<div class=\"player-info cnnItem"+i+"\">";
							Content += "<strong class='thru'>"+thru+"</strong>";
							Content += "<div class='score'>"+score+"</div>";
							Content += "<em class='rank'>"+rank+"</em>";
							Content += "<span class='player-name'>"+name+"</span>";
						Content += "</div>\n";
					}
					
					} else {
						if($e("GOLFtab")) $e("GOLFtab").style.display = "none";
						return false;
					}
					Content += "</div>\n";
				Content +="</a>\n";
			Content += "</li>\n";
			//Content += "<li class=\"cnnLast\"> </li>\n";
		
		$e("cnnGameHolderGOLF0").innerHTML = Content;	
	
	};
	
	this.getmySIteams = function(){
		var mySIcookie = readCookie( 'mySIcom' );
		var mySIhide = ( readCookie( 'mySIcomScores' ) != null ) ? true : false;
		var value, team, league;
		
		var value, team, league;
		if ( mySITeams.length > 0 ){
			this.mysi.active = this.tabs["MYSI"].active = true;
			this.tabs["MYSI"].first = ( mySIhide ) ? false : true;
			for(var i=0; i<mySITeams.length;i++){
				team_id = mySITeams[i].teamID.replace('-','_');
				league = mySITeams[i].sportID.toUpperCase();
				if (typeof(this.mysi.teams[league]) == "undefined"){this.mysi.teams[league] = new Array();}
				this.mysi.teams[league].push(team_id);
			}
		} else {
			return false;
		}

	};
	
	this.changeTab = function(new_tab){
		_scoreboard.activeTab = new_tab;
		
		if( typeof(_scoreboard.autochangepage) != "undefined") clearInterval(_scoreboard.autochangepage);	/* clear the interval */
		
		var pagesInTab = this.tabs[new_tab].pages;
		var oldTabId = this.current_tab+"tab";
		var newTabId = new_tab+"tab";
		
		var oldLinkId = this.current_tab+"link";
		var newLinkId = new_tab+"link";
		
		var contentPrefix = "cnnGameHolder";
		var newContentId = contentPrefix+new_tab+"0";
		
		var content = $e("cnnGameScoresContent").getElementsByTagName('div');
		for(var i=0;i<content.length;i++){
			if(content[i].id.indexOf("cnnGameHolder") > -1 ) content[i].style.display = "none";
		}
		$e(newContentId).style.display = '';
		_scoreboard.activePage = newContentId;
		
		_csbi.showMarketingUnit( newContentId );
		
		$e(oldTabId).className = "";
		$e(oldLinkId).style.display = "none";
		
		$e(newTabId).className = "selected-tab";
		$e(newLinkId).style.display = "";
		
		/*set this.current_tab to new_tab*/
		this.current_tab = new_tab;

		if(pagesInTab > 1){ /* if the tab has more than one page */
			current_page = 0;
			if(typeof(_scoreboard.autochangepage) != "undefined"){clearInterval(_scoreboard.autochangepage);		/* clear the interval */}
			//_scoreboard.autochangepage = setInterval("_scoreboard.autopage()",_flipInterval);
		}	
	};
	
	this.autopage = function(  ) {
		var now = new Date().getTime(); 
				
		if(_scoreboard.lastautoflip == 0 || (now - _scoreboard.lastautoflip) > 12000){
			var pre = "cnnGameHolder"+this.current_tab;	
			var pgs = this.tabs[this.current_tab].pages - 1;
			var cp =  (typeof _scoreboard.activePage === 'string') ? parseInt( _scoreboard.activePage.substr(pre.length), 10 ) : 0;
			var next = (cp < pgs) ? cp+1 : 0;
			var off = pre+cp;
			var on = pre+next;

			_csbi.flipSportPage(off,on,'auto');

			current_page = next;

			_scoreboard.lastautoflip = now;
		}
		
	}
	
	this.flipSportPage = function(off,on,type){	
		if(type != "auto" && typeof(_scoreboard.autochangepage) != "undefined"){
			clearInterval(_scoreboard.autochangepage);		/* clear the interval */
		}
		
		_scoreboard.activePage = on;
		
		_csbi.showMarketingUnit( on );
		
		$e(off).style.display = "none";
		$e(on).style.display = "";
		
	};
	
	this.nthNumber = function(num){
		if (isNaN(num)) return num;
		num = num * 1;
		var low = num % 10;
		if( num > 10 && num < 21){
			return num+'th';
		}
		switch (low) {
			case 0: case 4: case 5: case 6: case 7: case 8: case 9: return num+'th';
			case 1: return num+'st';
			case 2: return num+'nd';
			case 3: return num+'rd';
		}
	}
	
	this.handleSpecialCases = function(item){
		var newitem = "";
		
		switch(item){
			case "d-backs": newitem = "diamondbacks";  break;
			case "twolves": newitem = "timberwolves";  break;
			case "blazers": newitem = "trail_blazers";  break;
			case "jackets": newitem = "blue_jackets"; break;
			default: newitem = item; break;
		}
		return newitem;
	}

	
	/*******	[END] B. Define Methods	*******/
	
	/*******	C. Pull Trigger to Set MySI Games/Teams	*******/
	this.getmySIteams();
	/*******	[END] C. Pull Trigger to Set MySI Games/Teams	*******/
	
	/********	D. Scoreboard Marketing Unit	***/
	this.getMarketingUnit = function(type){
		var mktg_unit = _scoreboard.mktg_unit;
		var fetch;
		
		$.get(
			mktg_unit[type].file,			//url
			function(data){		//callback
				if(data){
					mktg_unit[type].html = data;
					
					var CMUnitClassName = 'cnnCMUnit'+type;
					for( classname in  $c(CMUnitClassName) ){
						//if there are html tags in place, then show the marketing unit, otherwise set the classname to cnnEmptyGame
						if(data.indexOf('<') >= 0 ){
							$c(CMUnitClassName)[classname].innerHTML = mktg_unit[type].html;
						} else {
							$c(CMUnitClassName)[classname].className = 'cnnEmptyGame '+CMUnitClassName;
						}
					}
				} else {
					return;
				}
				_scoreboard.mktg_unit[type].html = data;
			}
		);
		
	};
	
	this.showMarketingUnit = function( container ){
		var linkClass = ( container.indexOf('NCAA') > -1 ) ? 'sb_cm_wide' : 'sb_cm';
		var links = $('#' + container + ' a.' + linkClass);
		
		//return false if there are no links to show
		if ( links.length < 1 ){ return false; }
		
		var random = Math.floor(Math.random() * links.length) - 1;
		
		//make sure random index is in array
		if( random >= links.length || random < 0){ random = links.length - 1; }
		
		//hide all
		$(links).hide();
		
		//show random one
		$(links[ random ]).show();
		
	};
		
	/********	[END] D. Scoreboard Marketing Unit ***/
};

/*************
[END] 1. Scoreboard Object
*************/

/***********
2. Initialize Scoreboard Instance and Make the AJAX Call
************/

var tabId 		= "cnnGameSportsTabs";
var contentId 	= "cnnGameScoresContent";
var hpsb = null;

function cnn_scoreboard_init(data) {
	
	//alert('start!')
	hpsb = new Scoreboard(tabId,contentId,data);	/* initialize new Scoreboard object*/
	//Fetch Scoreboard Marketing HTML
	
	if(_scoreboard.firstLoad){
		hpsb.getMarketingUnit("normal");
		hpsb.getMarketingUnit("wide");
	}
	hpsb.retrieveGames();
	hpsb.displayGames();	
	
	//var reload = setTimeout("window.frames['scoreboard_data'].location.reload();", _scoreboard.refreshRate);
	//TODO: Optimization: remove the setTimeout if ALL games are final or in preview and not close to game time
}


/***********
2. [END] Initialize Scoreboard Instance and Make the AJAX Call
************/
