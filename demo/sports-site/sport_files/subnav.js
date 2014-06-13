var siNav = {
	load : function (nav) {
		nav.ncaab = nav.ncaabb;
		for (var t in nav) {
			var html = this.buildSubNav(nav[t]);
			$('#cnnBotnav li[nav=\''+t+'\']').append(html);
			siLog.debug('siNav: built ' + t + ' subnav');
			var html2 = this.buildSubNav2(nav[t]);
			$('#sitiSiteNav li[nav=\''+t+'\']').append(html2);
			siLog.debug('siNav2: built ' + t + ' subnav');
		}
		cnnStartList();
	},
	buildSubNav : function (nav) {
		var out = "<ul>\n";
		for (var i=0; i<nav.length; i++) {
			var item = nav[i];
			if (item.u && item.l) {
				if(item.u == "#") {
					if (item.c) {out += '<li class="' + item.c + '">' + item.l;}
					else {out += '<li>' + item.l;}
				} else {
					out += '<li><a href="' + item.u + '">' + item.l + '</a>';
				}
				if (item.s) {
					out += "\n";
					out += this.buildSubNav(item.s);
				}
				out += "</li>\n";
			}
		}
		out += "</ul>\n";
		return out;
	},

	buildSubNav2 : function (nav) {
		var out = "<ul>\n";
		for (var i=0; i<nav.length; i++) {
			var item = nav[i];
			if (item.u && item.l) {
				if(item.u == "#") {
					if (item.c) {out += '<li class="' + item.c + '">' + item.l;}
					else {out += '<li>' + item.l;}
				} else {
					out += '<li><a href="' + item.u + '">' + item.l + '</a>';
				}
				if( item.t ) {
					out += '</li><li>';
					for( var j=0; j<item.t.length; j++ ) {
						out += '<a href="' + item.t[j].u + '">' + item.t[j].l + '</a>';
					}
				}
				if (item.s2) {
					out += "\n";
					out += this.buildSubNav2(item.s2);
				}
				out += "</li>\n";
			}
		}
		out += "</ul>\n";
		return out;
	}
};

siNav.load({
	"nfl" : [
		{ "u": "http://nfl.si.com",								"l":"Audibles Blog" },
		{ "u": "/football/nfl/scoreboards/today/",	"l":"Scores" },
		{ "u":"/football/nfl/teams/",				"l":"Teams",
			"s": [
				{ "u":"#", "c":"cnnTeamDivisionTitle fb-american",		"l":"American Football Conference" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"EAST" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"NORTH" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"SOUTH" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"WEST" },
				{ "u":"/football/nfl/teams/buffalo-bills/",				"l":"Bills" },
				{ "u":"/football/nfl/teams/cincinnati-bengals/",			"l":"Bengals" },
				{ "u":"/football/nfl/teams/indianapolis-colts/",			"l":"Colts" },
				{ "u":"/football/nfl/teams/denver-broncos/",				"l":"Broncos" },
				{ "u":"/football/nfl/teams/miami-dolphins/",				"l":"Dolphins" },
				{ "u":"/football/nfl/teams/cleveland-browns/",			"l":"Browns" },
				{ "u":"/football/nfl/teams/jacksonville-jaguars/",		"l":"Jaguars" },
				{ "u":"/football/nfl/teams/san-diego-chargers/",			"l":"Chargers" },
				{ "u":"/football/nfl/teams/new-york-jets/",				"l":"Jets" },
				{ "u":"/football/nfl/teams/baltimore-ravens/",			"l":"Ravens" },
				{ "u":"/football/nfl/teams/houston-texans/",				"l":"Texans" },
				{ "u":"/football/nfl/teams/kansas-city-chiefs/",			"l":"Chiefs" },
				{ "u":"/football/nfl/teams/new-england-patriots/",		"l":"Patriots" },
				{ "u":"/football/nfl/teams/pittsburgh-steelers/",		"l":"Steelers" },
				{ "u":"/football/nfl/teams/tennessee-titans/",			"l":"Titans" },
				{ "u":"/football/nfl/teams/oakland-raiders/",			"l":"Raiders" },
				{ "u":"#", "c":"cnnTeamDivisionTitle fb-national bottom",	"l":"National Football Conference" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"EAST" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"NORTH" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"SOUTH" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"WEST" },
				{ "u":"/football/nfl/teams/dallas-cowboys/",				"l":"Cowboys" },
				{ "u":"/football/nfl/teams/chicago-bears/",				"l":"Bears" },
				{ "u":"/football/nfl/teams/tampa-bay-buccaneers/",		"l":"Buccaneers" },
				{ "u":"/football/nfl/teams/arizona-cardinals/",			"l":"Cardinals" },
				{ "u":"/football/nfl/teams/philadelphia-eagles/",		"l":"Eagles" },
				{ "u":"/football/nfl/teams/detroit-lions/",				"l":"Lions" },
				{ "u":"/football/nfl/teams/atlanta-falcons/",			"l":"Falcons" },
				{ "u":"/football/nfl/teams/san-francisco-49ers/",		"l":"Niners" },
				{ "u":"/football/nfl/teams/new-york-giants/",			"l":"Giants" },
				{ "u":"/football/nfl/teams/green-bay-packers/",			"l":"Packers" },
				{ "u":"/football/nfl/teams/carolina-panthers/",			"l":"Panthers" },
				{ "u":"/football/nfl/teams/st-louis-rams/",				"l":"Rams" },
				{ "u":"/football/nfl/teams/washington-redskins/",		"l":"Redskins" },
				{ "u":"/football/nfl/teams/minnesota-vikings/",			"l":"Vikings" },
				{ "u":"/football/nfl/teams/new-orleans-saints/",			"l":"Saints" },
				{ "u":"/football/nfl/teams/seattle-seahawks/",			"l":"Seahawks" }
			],
			"s2": [
				{ "u":"#", "c":"division",	"l":"<span class=\"nfl-american\"></span>" },
				{ "u":"#",					"l":"E<br />A<br />S<br />T",
					"t": [
						{ "u":"/football/nfl/teams/buffalo-bills/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/bills_50.png\" alt=\"Buffalo Bills\" title=\"Buffalo Bills\" />" },
						{ "u":"/football/nfl/teams/miami-dolphins/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/dolphins_50.png\" alt=\"Miami Dolphins\" title=\"Miami Dolphins\" />" },
						{ "u":"/football/nfl/teams/new-york-jets/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/jets_50.png\" alt=\"New York Jets\" title=\"New York Jets\" />" },
						{ "u":"/football/nfl/teams/new-england-patriots/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/patriots_50.png\" alt=\"New England Patriots\" title=\"New England Patriots\" />" }
					]
				},
				{ "u":"#",					"l":"N<br />O<br />R<br />T<br />H",
					"t": [
						{ "u":"/football/nfl/teams/cincinnati-bengals/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/bengals_50.png\" alt=\"Cincinnati Bengals\" title=\"Cincinnati Bengals\" />" },
						{ "u":"/football/nfl/teams/cleveland-browns/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/browns_50.png\" alt=\"Cleveland Browns\" title=\"Cleveland Browns\" />" },
						{ "u":"/football/nfl/teams/baltimore-ravens/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/ravens_50.png\" alt=\"Baltimore Ravens\" title=\"Baltimore Ravens\" />" },
						{ "u":"/football/nfl/teams/pittsburgh-steelers/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/steelers_50.png\" alt=\"Pittsburgh Steelers\" title=\"Pittsburgh Steelers\" />" }
					]
				},
				{ "u":"#",					"l":"S<br />O<br />U<br />T<br />H",
					"t": [
						{ "u":"/football/nfl/teams/indianapolis-colts/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/colts_50.png\" alt=\"Indianapolis Colts\" title=\"Indianapolis Colts\" />" },
						{ "u":"/football/nfl/teams/jacksonville-jaguars/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/jaguars_50.png\" alt=\"Jacksonville Jaguars\" title=\"Jacksonville Jaguars\" />" },
						{ "u":"/football/nfl/teams/houston-texans/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/texans_50.png\" alt=\"Houston Texans\" title=\"Houston Texans\" />" },
						{ "u":"/football/nfl/teams/tennessee-titans/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/titans_50.png\" alt=\"Tennessee Titans\" title=\"Tennessee Titans\" />" }
					]
				},
				{ "u":"#",					"l":"W<br />E<br />S<br />T",
					"t": [
						{ "u":"/football/nfl/teams/denver-broncos/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/broncos_50.png\" alt=\"Denver Broncos\" title=\"Denver Broncos\" />" },
						{ "u":"/football/nfl/teams/san-diego-chargers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/chargers_50.png\" alt=\"San Diego Chargers\" title=\"San Diego Chargers\" />" },
						{ "u":"/football/nfl/teams/kansas-city-chiefs/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/chiefs_50.png\" alt=\"Kansas City Chiefs\" title=\"Kansas City Chiefs\" />" },
						{ "u":"/football/nfl/teams/oakland-raiders/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/raiders_50.png\" alt=\"Oakland Raiders\" title=\"Oakland Raiders\" />" }
					]
				},
				{ "u":"#", "c":"division",	"l":"<span class=\"nfl-national\"></span>" },
				{ "u":"#",					"l":"E<br />A<br />S<br />T",
					"t": [
						{ "u":"/football/nfl/teams/dallas-cowboys/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/cowboys_50.png\" alt=\"Dallas Cowbowys\" title=\"Dallas Cowbowys\" />" },
						{ "u":"/football/nfl/teams/philadelphia-eagles/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/eagles_50.png\" alt=\"Philadelphia Eagles\" title=\"Philadelphia Eagles\" />" },
						{ "u":"/football/nfl/teams/new-york-giants/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/giants_50.png\" alt=\"New York Giants\" title=\"New York Giants\" />" },
						{ "u":"/football/nfl/teams/washington-redskins/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/redskins_50.png\" alt=\"Washington Redskins\" title=\"Washington Redskins\" />" }
					]
				},
				{ "u":"#",					"l":"N<br />O<br />R<br />T<br />H",
					"t": [
						{ "u":"/football/nfl/teams/chicago-bears/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/bears_50.png\" alt=\"Chicago Bears\" title=\"Chicago Bears\" />" },
						{ "u":"/football/nfl/teams/detroit-lions/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/lions_50.png\" alt=\"Detroit Lions\" title=\"Detroit Lions\" />" },
						{ "u":"/football/nfl/teams/green-bay-packers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/packers_50.png\" alt=\"Green Bay Packers\" title=\"Green Bay Packers\" />" },
						{ "u":"/football/nfl/teams/minnesota-vikings/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/vikings_50.png\" alt=\"Minnesota Vikings\" title=\"Minnesota Vikings\" />" }
					]
				},
				{ "u":"#",					"l":"S<br />O<br />U<br />T<br />H",
					"t": [
						{ "u":"/football/nfl/teams/tampa-bay-buccaneers/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/buccaneers_50.png\" alt=\"Tampa Bay Buccaneers\" title=\"Tampa Bay Buccaneers\" />" },
						{ "u":"/football/nfl/teams/atlanta-falcons/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/falcons_50.png\" alt=\"Atlanta Falcons\" title=\"Atlanta Falcons\" />" },
						{ "u":"/football/nfl/teams/carolina-panthers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/panthers_50.png\" alt=\"Carolina Panthers\" title=\"Carolina Panthers\" />" },
						{ "u":"/football/nfl/teams/new-orleans-saints/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/saints_50.png\" alt=\"New Orleans Saints\" title=\"New Orleans Saints\" />" }
					]
				},
				{ "u":"#",					"l":"W<br />E<br />S<br />T",
					"t": [
						{ "u":"/football/nfl/teams/arizona-cardinals/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/cardinals_50.png\" alt=\"Arizona Cardinals\" title=\"Arizona Cardinals\" />" },
						{ "u":"/football/nfl/teams/san-francisco-49ers/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/49ers_50.png\" alt=\"San Francisco 49ers\" title=\"San Francisco 49ers\" />" },
						{ "u":"/football/nfl/teams/st-louis-rams/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/rams_50.png\" alt=\"St. Louis Rams\" title=\"St. Louis Rams\" />" },
						{ "u":"/football/nfl/teams/seattle-seahawks/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/football/nfl/logos/seahawks_50.png\" alt=\"Seattle Seahawks\" title=\"Seattle Seahawks\" />" }
					]
				}
			]
		},
		{ "u":"/football/nfl/rosters/alpha/A.html",	"l":"Players" },
		{ "u":"/fantasy/player_news/nfl/",			"l":"Player News" },
		{ "u":"/football/nfl/standings/",			"l":"Standings" },
		{ "u":"/football/nfl/schedules/weekly/",		"l":"Schedules" },
		{ "u":"/football/nfl/stats/",				"l":"Stats" },
		{ "u":"/football/nfl/teams/",				"l":"Transactions" },
		{ "u":"/football/nfl/teams/",				"l":"Injuries" },
		{ "u":"/podcasts/peter_king/",				"l":"Podcasts" }
	],
	"ncaaf" : [
		{ "u":"http://college-football.si.com",						"l":"Campus Union Blog" },
		{ "u":"/football/ncaa/scoreboards/divia/today/",	"l":"Scores",
			"s": [
				{ "u":"/football/ncaa/scoreboards/top25/today/",		"l":"Top 25" },
				{ "u":"/football/ncaa/scoreboards/midam/today/",		"l":"MAC" },
				{ "u":"/football/ncaa/scoreboards/divia/today/",		"l":"FBS" },
				{ "u":"/football/ncaa/scoreboards/meac/today/",		"l":"MEAC" },
				{ "u":"/football/ncaa/scoreboards/diviaa/today/",	"l":"FCS" },
				{ "u":"/football/ncaa/scoreboards/gate/today/",		"l":"Missouri Valley" },
				{ "u":"/football/ncaa/scoreboards/acc/today/",		"l":"ACC" },
				{ "u":"/football/ncaa/scoreboards/mwest/today/",		"l":"MWC" },
				{ "u":"/football/ncaa/scoreboards/big12/today/",		"l":"Big 12" },
				{ "u":"/football/ncaa/scoreboards/nec/today/",		"l":"Northeast" },
				{ "u":"/football/ncaa/scoreboards/bige/today/",		"l":"Big East" },
				{ "u":"/football/ncaa/scoreboards/ovc/today/",		"l":"Ohio Valley" },
				{ "u":"/football/ncaa/scoreboards/bsky/today/",		"l":"Big Sky" },
				{ "u":"/football/ncaa/scoreboards/pac12/today/",		"l":"Pac-12" },
				{ "u":"/football/ncaa/scoreboards/bsou/today/",		"l":"Big South" },
				{ "u":"/football/ncaa/scoreboards/patr/today/",		"l":"Patriot" },
				{ "u":"/football/ncaa/scoreboards/big10/today/",		"l":"Big Ten" },
				{ "u":"/football/ncaa/scoreboards/pio/today/",		"l":"Pioneer" },
				{ "u":"/football/ncaa/scoreboards/caa/today/",		"l":"Colonial Athletic" },
				{ "u":"/football/ncaa/scoreboards/sec/today/",		"l":"SEC" },
				{ "u":"/football/ncaa/scoreboards/cusa/today/",		"l":"C-USA" },
				{ "u":"/football/ncaa/scoreboards/south/today/",		"l":"Southern" },
				{ "u":"/football/ncaa/scoreboards/ia/today/",		"l":"FBS Independents" },
				{ "u":"/football/ncaa/scoreboards/sland/today/",		"l":"Southland" },
				{ "u":"/football/ncaa/scoreboards/iaa/today/",		"l":"FCS Independents" },
				{ "u":"/football/ncaa/scoreboards/swac/today/",		"l":"SWAC" },
				{ "u":"/football/ncaa/scoreboards/gwest/today/",		"l":"Great West" },			
				{ "u":"/football/ncaa/scoreboards/sbelt/today/",		"l":"Sun Belt" },
				{ "u":"/football/ncaa/scoreboards/ivy/today/",		"l":"Ivy" },
				{ "u":"/football/ncaa/scoreboards/wac/today/",		"l":"WAC" }			
			],
			"s2": [
				{ "u":"/football/ncaa/scoreboards/top25/today/",		"l":"Top 25" },
				{ "u":"/football/ncaa/scoreboards/midam/today/",		"l":"MAC" },
				{ "u":"/football/ncaa/scoreboards/divia/today/",		"l":"FBS" },
				{ "u":"/football/ncaa/scoreboards/meac/today/",		"l":"MEAC" },
				{ "u":"/football/ncaa/scoreboards/diviaa/today/",	"l":"FCS" },
				{ "u":"/football/ncaa/scoreboards/gate/today/",		"l":"Missouri Valley" },
				{ "u":"/football/ncaa/scoreboards/acc/today/",		"l":"ACC" },
				{ "u":"/football/ncaa/scoreboards/mwest/today/",		"l":"MWC" },
				{ "u":"/football/ncaa/scoreboards/big12/today/",		"l":"Big 12" },
				{ "u":"/football/ncaa/scoreboards/nec/today/",		"l":"Northeast" },
				{ "u":"/football/ncaa/scoreboards/aac/today/",		"l":"American Athletic" },
				{ "u":"/football/ncaa/scoreboards/ovc/today/",		"l":"Ohio Valley" },
				{ "u":"/football/ncaa/scoreboards/bsky/today/",		"l":"Big Sky" },
				{ "u":"/football/ncaa/scoreboards/pac12/today/",		"l":"Pac-12" },
				{ "u":"/football/ncaa/scoreboards/bsou/today/",		"l":"Big South" },
				{ "u":"/football/ncaa/scoreboards/patr/today/",		"l":"Patriot" },
				{ "u":"/football/ncaa/scoreboards/big10/today/",		"l":"Big Ten" },
				{ "u":"/football/ncaa/scoreboards/pio/today/",		"l":"Pioneer" },
				{ "u":"/football/ncaa/scoreboards/caa/today/",		"l":"Colonial Athletic" },
				{ "u":"/football/ncaa/scoreboards/sec/today/",		"l":"SEC" },
				{ "u":"/football/ncaa/scoreboards/cusa/today/",		"l":"C-USA" },
				{ "u":"/football/ncaa/scoreboards/south/today/",		"l":"Southern" },
				{ "u":"/football/ncaa/scoreboards/ia/today/",		"l":"FBS Independents" },
				{ "u":"/football/ncaa/scoreboards/sland/today/",		"l":"Southland" },
				{ "u":"/football/ncaa/scoreboards/iaa/today/",		"l":"FCS Independents" },
				{ "u":"/football/ncaa/scoreboards/swac/today/",		"l":"SWAC" },
				{ "u":"/football/ncaa/scoreboards/gwest/today/",		"l":"Great West" },			
				{ "u":"/football/ncaa/scoreboards/sbelt/today/",		"l":"Sun Belt" },
				{ "u":"/football/ncaa/scoreboards/ivy/today/",		"l":"Ivy" },
				{ "u":"/football/ncaa/scoreboards/wac/today/",		"l":"WAC" }			
			]
		},
		{ "u":"/football/ncaa/teams/divia.html",				"l":"Teams" },
		{ "u":"/football/ncaa/conferences/",					"l":"Conferences",
			"s": [
				{ "u":"/football/ncaa/schedules/conference/acc/",	"l":"ACC" },
				{ "u":"/football/ncaa/schedules/conference/midam/",	"l":"MAC" },
				{ "u":"/football/ncaa/schedules/conference/big12/",	"l":"Big 12" },
				{ "u":"/football/ncaa/schedules/conference/mwest/",	"l":"Mountain West" },
				{ "u":"/football/ncaa/schedules/conference/bige/",	"l":"Big East" },
				{ "u":"/football/ncaa/schedules/conference/pac12/",	"l":"Pac-12" },
				{ "u":"/football/ncaa/schedules/conference/big10/",	"l":"Big Ten" },
				{ "u":"/football/ncaa/schedules/conference/sec/",	"l":"SEC" },
				{ "u":"/football/ncaa/schedules/conference/cusa/",	"l":"C-USA" },
				{ "u":"/football/ncaa/schedules/conference/sbelt/",	"l":"Sun Belt" },
				{ "u":"/football/ncaa/schedules/conference/ia/",		"l":"Independents" },
				{ "u":"/football/ncaa/schedules/conference/wac/",	"l":"WAC" }
			],
			"s2": [
				{ "u":"/football/ncaa/schedules/conference/acc/",	"l":"ACC" },
				{ "u":"/football/ncaa/schedules/conference/midam/",	"l":"MAC" },
				{ "u":"/football/ncaa/schedules/conference/big12/",	"l":"Big 12" },
				{ "u":"/football/ncaa/schedules/conference/mwest/",	"l":"Mountain West" },
				{ "u":"/football/ncaa/schedules/conference/aac/",	"l":"American Athletic" },
				{ "u":"/football/ncaa/schedules/conference/pac12/",	"l":"Pac-12" },
				{ "u":"/football/ncaa/schedules/conference/big10/",	"l":"Big Ten" },
				{ "u":"/football/ncaa/schedules/conference/sec/",	"l":"SEC" },
				{ "u":"/football/ncaa/schedules/conference/cusa/",	"l":"C-USA" },
				{ "u":"/football/ncaa/schedules/conference/sbelt/",	"l":"Sun Belt" },
				{ "u":"/football/ncaa/schedules/conference/ia/",		"l":"Independents" },
				{ "u":"/football/ncaa/schedules/conference/wac/",	"l":"WAC" }
			]
		},
		{ "u":"/football/ncaa/teams/divia.html",				"l":"Players" },
		{ "u":"/football/ncaa/standings/",					"l":"Standings" },
		{ "u":"/football/ncaa/polls/ap/",					"l":"Rankings" },
		{ "u":"/football/ncaa/schedules/weekly/",			"l":"Schedules" },
		{ "u":"/football/ncaa/stats/divia/",					"l":"Stats" },
		{ "u":"/podcasts/stewart_mandel/",					"l":"Podcasts" },
		{ "u":"http://college-football.si.com/category/heisman-watch/",					"l":"Heisman Watch" }
	],
	"mlb" : [
		{ "u": "http://mlb.si.com",										"l":"The Strike Zone Blog" },
		{ "u": "/baseball/mlb/scoreboards/today/",			"l":"Scores" },
		{ "u":"/baseball/mlb/teams/",						"l":"Teams",
			"s": [
				{ "u":"#", "c":"cnnTeamDivisionTitle bb-national",			"l":"National League" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"EAST" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"CENTRAL" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"WEST" },
				{ "u":"/baseball/mlb/teams/atlanta-braves/",			"l":"Braves" },
				{ "u":"/baseball/mlb/teams/milwaukee-brewers/",		"l":"Brewers" },
				{ "u":"/baseball/mlb/teams/arizona-diamondbacks/",	"l":"Diamondbacks" },
				{ "u":"/baseball/mlb/teams/miami-marlins/",			"l":"Marlins" },
				{ "u":"/baseball/mlb/teams/st-louis-cardinals/",		"l":"Cardinals" },
				{ "u":"/baseball/mlb/teams/los-angeles-dodgers/",	"l":"Dodgers" },
				{ "u":"/baseball/mlb/teams/new-york-mets/",			"l":"Mets" },
				{ "u":"/baseball/mlb/teams/chicago-cubs/",			"l":"Cubs" },
				{ "u":"/baseball/mlb/teams/san-francisco-giants/",	"l":"Giants" },
				{ "u":"/baseball/mlb/teams/washington-nationals/",	"l":"Nationals" },
				{ "u":"/baseball/mlb/teams/pittsburgh-pirates/",		"l":"Pirates" },
				{ "u":"/baseball/mlb/teams/san-diego-padres/",		"l":"Padres" },
				{ "u":"/baseball/mlb/teams/philadelphia-phillies/",	"l":"Phillies" },
				{ "u":"/baseball/mlb/teams/cincinnati-reds/",		"l":"Reds" },
				{ "u":"/baseball/mlb/teams/colorado-rockies/",		"l":"Rockies" },
				{ "u":"#", "c":"cnnTeamDivisionTitle bb-american bottom",	"l":"American League" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"EAST" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"CENTRAL" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"WEST" },
				{ "u":"/baseball/mlb/teams/toronto-blue-jays/",		"l":"Blue Jays" },
				{ "u":"/baseball/mlb/teams/cleveland-indians/",		"l":"Indians" },
				{ "u":"/baseball/mlb/teams/houston-astros/",			"l":"Astros" },
				{ "u":"/baseball/mlb/teams/baltimore-orioles/",		"l":"Orioles" },
				{ "u":"/baseball/mlb/teams/kansas-city-royals/",		"l":"Royals" },
				{ "u":"/baseball/mlb/teams/los-angeles-angels/",		"l":"Angels" },
				{ "u":"/baseball/mlb/teams/tampa-bay-rays/",			"l":"Rays" },
				{ "u":"/baseball/mlb/teams/detroit-tigers/",			"l":"Tigers" },
				{ "u":"/baseball/mlb/teams/oakland-athletics/",		"l":"Athletics" },
				{ "u":"/baseball/mlb/teams/boston-red-sox/",			"l":"Red Sox" },
				{ "u":"/baseball/mlb/teams/minnesota-twins/",		"l":"Twins" },
				{ "u":"/baseball/mlb/teams/seattle-mariners/",		"l":"Mariners" },
				{ "u":"/baseball/mlb/teams/new-york-yankees/",		"l":"Yankees" },
				{ "u":"/baseball/mlb/teams/chicago-white-sox/",		"l":"White Sox" },
				{ "u":"/baseball/mlb/teams/texas-rangers/",			"l":"Rangers" }
			],
			"s2": [
				{ "u":"#", "c":"division",	"l":"<span class=\"mlb-national\"></span>" },
				{ "u":"#",					"l":"E<br />A<br />S<br />T",
					"t": [
						{ "u":"/baseball/mlb/teams/atlanta-braves/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/braves_50.png\" alt=\"Atlanta Braves\" title=\"Atlanta Braves\" />" },
						{ "u":"/baseball/mlb/teams/miami-marlins/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/marlins_50.png\" alt=\"Miami Marlins\" title=\"Miami Marlins\" />" },
						{ "u":"/baseball/mlb/teams/new-york-mets/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/mets_50.png\" alt=\"New York Mets\" title=\"New York Mets\" />" },
						{ "u":"/baseball/mlb/teams/washington-nationals/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/nationals_50.png\" alt=\"Washington Nationals\" title=\"Washington Nationals\" />" },
						{ "u":"/baseball/mlb/teams/philadelphia-phillies/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/phillies_50.png\" alt=\"Philadelphia Phillies\" title=\"Philadelphia Phillies\" />" }
					]
				},
				{ "u":"#",					"l":"C<br />E<br />N<br />T<br />R<br />A<br />L",
					"t": [
						{ "u":"/baseball/mlb/teams/milwaukee-brewers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/brewers_50.png\" alt=\"Milwaukee Brewers\" title=\"Milwaukee Brewers\" />" },
						{ "u":"/baseball/mlb/teams/st-louis-cardinals/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/cardinals_50.png\" alt=\"St. Louis Cardinals\" title=\"St. Louis Cardinals\" />" },
						{ "u":"/baseball/mlb/teams/chicago-cubs/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/cubs_50.png\" alt=\"Chicago Cubs\" title=\"Chicago Cubs\" />" },
						{ "u":"/baseball/mlb/teams/pittsburgh-pirates/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/pirates_50.png\" alt=\"Pittsburgh Pirates\" title=\"Pittsburgh Pirates\" />" },
						{ "u":"/baseball/mlb/teams/cincinnati-reds/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/reds_50.png\" alt=\"Chicinnati Reds\" title=\"Chicinnati Reds\" />" }
					]
				},
				{ "u":"#",					"l":"W<br />E<br />S<br />T",
					"t": [
						{ "u":"/baseball/mlb/teams/arizona-diamondbacks/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/diamondbacks_50.png\" alt=\"Arizona Diamondbacks\" title=\"Arizona Diamondbacks\" />" },
						{ "u":"/baseball/mlb/teams/los-angeles-dodgers/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/dodgers_50.png\" alt=\"Los Angeles Dodgers\" title=\"Los Angeles Dodgers\" />" },
						{ "u":"/baseball/mlb/teams/san-francisco-giants/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/giants_50.png\" alt=\"San Francisco Giants\" title=\"San Francisco Giants\" />" },
						{ "u":"/baseball/mlb/teams/san-diego-padres/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/padres_50.png\" alt=\"San Diego Padres\" title=\"San Diego Padres\" />" },
						{ "u":"/baseball/mlb/teams/colorado-rockies/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/rockies_50.png\" alt=\"Colorado Rockies\" title=\"Colorado Rockies\" />" }
					]
				},
				{ "u":"#", "c":"division",	"l":"<span class=\"mlb-american\"></span>" },
				{ "u":"#",					"l":"E<br />A<br />S<br />T",
					"t": [
						{ "u":"/baseball/mlb/teams/toronto-blue-jays/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/blue-jays_50.png\" alt=\"Toronto Blue Jays\" title=\"Toronto Blue Jays\" />" },
						{ "u":"/baseball/mlb/teams/baltimore-orioles/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/orioles_50.png\" alt=\"Baltimore Orioles\" title=\"Baltimore Orioles\" />" },
						{ "u":"/baseball/mlb/teams/tampa-bay-rays/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/rays_50.png\" alt=\"Tampa Bay Rays\" title=\"Tampa Bay Rays\" />" },
						{ "u":"/baseball/mlb/teams/boston-red-sox/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/red-sox_50.png\" alt=\"Boston Red Sox\" title=\"Boston Red Sox\" />" },
						{ "u":"/baseball/mlb/teams/new-york-yankees/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/yankees_50.png\" alt=\"New York Yankees\" title=\"New York Yankees\" />" }
					]
				},
				{ "u":"#",					"l":"C<br />E<br />N<br />T<br />R<br />A<br />L",
					"t": [
						{ "u":"/baseball/mlb/teams/cleveland-indians/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/indians_50.png\" alt=\"Cleveland Indians\" title=\"Cleveland Indians\" />" },
						{ "u":"/baseball/mlb/teams/kansas-city-royals/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/royals_50.png\" alt=\"Kansas City Royals\" title=\"Kansas City Royals\" />" },
						{ "u":"/baseball/mlb/teams/detroit-tigers/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/tigers_50.png\" alt=\"Detroit Tigers\" title=\"Detroit Tigers\" />" },
						{ "u":"/baseball/mlb/teams/minnesota-twins/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/twins_50.png\" alt=\"Minnesota Twins\" title=\"Minnesota Twins\" />" },
						{ "u":"/baseball/mlb/teams/chicago-white-sox/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/white-sox_50.png\" alt=\"Chicago White Sox\" title=\"Chicago White Sox\" />" }
					]
				},
				{ "u":"#",					"l":"W<br />E<br />S<br />T",
					"t": [
						{ "u":"/baseball/mlb/teams/houston-astros/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/astros_50.png\" alt=\"Houston Astros\" title=\"Houston Astros\" />" },
						{ "u":"/baseball/mlb/teams/los-angeles-angels/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/angels_50.png\" alt=\"Los Angeles Angels\" title=\"Los Angeles Angels\" />" },
						{ "u":"/baseball/mlb/teams/oakland-athletics/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/athletics_50.png\" alt=\"Oakland Athletics\" title=\"Oakland Athletics\" />" },
						{ "u":"/baseball/mlb/teams/seattle-mariners/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/mariners_50.png\" alt=\"Seattle Mariners\" title=\"Seattle Mariners\" />" },
						{ "u":"/baseball/mlb/teams/texas-rangers/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/baseball/mlb/logos/rangers_50.png\" alt=\"Texas Rangers\" title=\"Texas Rangers\" />" }
					]
				}
			]
		},
		{ "u":"/baseball/mlb/players/",														"l":"Players" },
		{ "u":"/fantasy/player_news/mlb/",													"l":"Player News" },
		{ "u":"/baseball/mlb/standings/",													"l":"Standings" },
		{ "u":"/baseball/mlb/probables/today/",												"l":"Probables" },
		{ "u":"/baseball/mlb/schedules/weekly/today/",										"l":"Schedules" },
		{ "u":"/baseball/mlb/stats/",														"l":"Stats" },
		{ "u":"/baseball/mlb/stats/alltime/american_league/",								"l":"Historical Stats" },
		{ "u":"/baseball/mlb/transactions/",													"l":"Transactions" },
		{ "u":"/baseball/mlb/injuries/",														"l":"Injuries" },
		{ "u":"http://mlb.mlb.com/mlb/subscriptions/index.jsp?product=si&vbID=simlbtv_test&eref=sinav",	"l":"MLB.TV" }
	],
	"nba" : [
		{ "u": "http://nba.si.com",									"l":"The Point Forward Blog" },
		{ "u": "/basketball/nba/scoreboards/today/",						"l":"Scores" },
		{ "u":"/basketball/nba/teams/",									"l":"Teams",
			"s": [
				{ "u":"#", "c":"cnnTeamDivisionTitle bb-eastern",			"l":"Eastern Conference" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"ATLANTIC" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"CENTRAL" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"SOUTHEAST" },
				{ "u":"/basketball/nba/teams/boston-celtics/",			"l":"Celtics" },
				{ "u":"/basketball/nba/teams/milwaukee-bucks/",			"l":"Bucks" },
				{ "u":"/basketball/nba/teams/charlotte-bobcats/",		"l":"Bobcats" },
				{ "u":"/basketball/nba/teams/new-york-knicks/",			"l":"Knicks" },
				{ "u":"/basketball/nba/teams/chicago-bulls/",			"l":"Bulls" },
				{ "u":"/basketball/nba/teams/atlanta-hawks/",			"l":"Hawks" },
				{ "u":"/basketball/nba/teams/brooklyn-nets/",			"l":"Nets" },
				{ "u":"/basketball/nba/teams/cleveland-cavaliers/",		"l":"Cavaliers" },
				{ "u":"/basketball/nba/teams/miami-heat/",				"l":"Heat" },
				{ "u":"/basketball/nba/teams/toronto-raptors/",			"l":"Raptors" },
				{ "u":"/basketball/nba/teams/indiana-pacers/",			"l":"Pacers" },
				{ "u":"/basketball/nba/teams/orlando-magic/",			"l":"Magic" },
				{ "u":"/basketball/nba/teams/philadelphia-76ers/",		"l":"Sixers" },
				{ "u":"/basketball/nba/teams/detroit-pistons/",			"l":"Pistons" },
				{ "u":"/basketball/nba/teams/washington-wizards/",		"l":"Wizards" },
				{ "u":"#", "c":"cnnTeamDivisionTitle bb-western bottom",	"l":"Western Conference" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"NORTHWEST" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"PACIFIC" },
				{ "u":"#", "c":"cnnTeamDivision",							"l":"SOUTHWEST" },
				{ "u":"/basketball/nba/teams/utah-jazz/",				"l":"Jazz" },
				{ "u":"/basketball/nba/teams/los-angeles-clippers/",		"l":"Clippers" },
				{ "u":"/basketball/nba/teams/memphis-grizzlies/",		"l":"Grizzlies" },
				{ "u":"/basketball/nba/teams/denver-nuggets/",			"l":"Nuggets" },
				{ "u":"/basketball/nba/teams/sacramento-kings/",			"l":"Kings" },
				{ "u":"/basketball/nba/teams/new-orleans-pelicans/",		"l":"Pelicans" },
				{ "u":"/basketball/nba/teams/oklahoma-city-thunder/",	"l":"Thunder" },
				{ "u":"/basketball/nba/teams/los-angeles-lakers/",		"l":"Lakers" },
				{ "u":"/basketball/nba/teams/dallas-mavericks/",			"l":"Mavericks" },
				{ "u":"/basketball/nba/teams/minnesota-timberwolves/",	"l":"Timberwolves" },
				{ "u":"/basketball/nba/teams/phoenix-suns/",				"l":"Suns" },
				{ "u":"/basketball/nba/teams/houston-rockets/",			"l":"Rockets" },
				{ "u":"/basketball/nba/teams/portland-trail-blazers/",	"l":"Trail Blazers" },
				{ "u":"/basketball/nba/teams/golden-state-warriors/",	"l":"Warriors" },
				{ "u":"/basketball/nba/teams/san-antonio-spurs/",		"l":"Spurs" }
			],
			"s2": [
				{ "u":"#", "c":"division",	"l":"<span class=\"nba-eastern\"></span>" },
				{ "u":"#",					"l":"A<br />T<br />L<br />A<br />N<br />T<br />I<br />C",
					"t": [
						{ "u":"/basketball/nba/teams/boston-celtics/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/celtics_50.png\" alt=\"Boston Celtics\" title=\"Boston Celtics\" />" },
						{ "u":"/basketball/nba/teams/new-york-knicks/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/knicks_50.png\" alt=\"New York Knicks\" title=\"New York Knicks\" />" },
						{ "u":"/basketball/nba/teams/brooklyn-nets/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/nets_50.png\" alt=\"Brooklyn Nets\" title=\"Brooklyn Nets\" />" },
						{ "u":"/basketball/nba/teams/toronto-raptors/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/raptors_50.png\" alt=\"Toronto Raptors\" title=\"Toronto Raptors\" />" },
						{ "u":"/basketball/nba/teams/philadelphia-76ers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/76ers_50.png\" alt=\"Philadelphia 76ers\" title=\"Philadelphia 76ers\" />" }
					]
				},
				{ "u":"#",					"l":"C<br />E<br />N<br />T<br />R<br />A<br />L",
					"t": [
						{ "u":"/basketball/nba/teams/milwaukee-bucks/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/bucks_50.png\" alt=\"Milwaukee Bucks\" title=\"Milwaukee Bucks\" />" },
						{ "u":"/basketball/nba/teams/chicago-bulls/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/bulls_50.png\" alt=\"Chicago Bulls\" title=\"Chicago Bulls\" />" },
						{ "u":"/basketball/nba/teams/cleveland-cavaliers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/cavaliers_50.png\" alt=\"Cleveland Cavaliers\" title=\"Cleveland Cavaliers\" />" },
						{ "u":"/basketball/nba/teams/indiana-pacers/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/pacers_50.png\" alt=\"Indiana Pacers\" title=\"Indiana Pacers\" />" },
						{ "u":"/basketball/nba/teams/detroit-pistons/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/pistons_50.png\" alt=\"Detroit Pistons\" title=\"Detroit Pistons\" />" }
					]
				},
				{ "u":"#",					"l":"S<br />O<br />U<br />T<br />H<br />E<br />A<br />S<br />T",
					"t": [
						{ "u":"/basketball/nba/teams/charlotte-bobcats/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/bobcats_50.png\" alt=\"Charlotte Bobcats\" title=\"Charlotte Bobcats\" />" },
						{ "u":"/basketball/nba/teams/atlanta-hawks/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/hawks_50.png\" alt=\"Atlanta Hawks\" title=\"Atlanta Hawks\" />" },
						{ "u":"/basketball/nba/teams/miami-heat/",				"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/heat_50.png\" alt=\"Miami Heat\" title=\"Miami Heat\" />" },
						{ "u":"/basketball/nba/teams/orlando-magic/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/magic_50.png\" alt=\"Orlando Magic\" title=\"Orlando Magic\" />" },
						{ "u":"/basketball/nba/teams/washington-wizards/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/wizards_50.png\" alt=\"Washington Wizards\" title=\"Washington Wizards\" />" }
					]
				},
				{ "u":"#", "c":"division",	"l":"<span class=\"nba-western\"></span>" },
				{ "u":"#",					"l":"N<br />O<br />R<br />T<br />H<br />W<br />E<br />S<br />T",
					"t": [
						{ "u":"/basketball/nba/teams/utah-jazz/",				"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/jazz_50.png\" alt=\"Utah Jazz\" title=\"Utah Jazz\" />" },
						{ "u":"/basketball/nba/teams/denver-nuggets/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/nuggets_50.png\" alt=\"Denver Nuggets\" title=\"Denver Nuggets\" />" },
						{ "u":"/basketball/nba/teams/oklahoma-city-thunder/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/thunder_50.png\" alt=\"Oklahoma City Thunder\" title=\"Oklahoma City Thunder\" />" },
						{ "u":"/basketball/nba/teams/minnesota-timberwolves/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/timberwolves_50.png\" alt=\"Minnesota Timberwolves\" title=\"Minnesota Timberwolves\" />" },
						{ "u":"/basketball/nba/teams/portland-trail-blazers/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/trail_blazers_50.png\" alt=\"Portland Trail Blazers\" title=\"Portland Trail Blazers\" />" }
					]
				},
				{ "u":"#",					"l":"P<br />A<br />C<br />I<br />F<br />I<br />C",
					"t": [
						{ "u":"/basketball/nba/teams/los-angeles-clippers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/clippers_50.png\" alt=\"Los Angeles Clippers\" title=\"Los Angeles Clippers\" />" },
						{ "u":"/basketball/nba/teams/sacramento-kings/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/kings_50.png\" alt=\"Sacramento Kings\" title=\"Sacramento Kings\" />" },
						{ "u":"/basketball/nba/teams/los-angeles-lakers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/lakers_50.png\" alt=\"Los Angeles Lakers\" title=\"Los Angeles Lakers\" />" },
						{ "u":"/basketball/nba/teams/phoenix-suns/",				"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/suns_50.png\" alt=\"Phoenix Suns\" title=\"Phoenix Suns\" />" },
						{ "u":"/basketball/nba/teams/golden-state-warriors/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/warriors_50.png\" alt=\"Golden State Warriors\" title=\"Golden State Warriors\" />" }
					]
				},
				{ "u":"#",					"l":"S<br />O<br />U<br />T<br />H<br />W<br />E<br />S<br />T",
					"t": [
						{ "u":"/basketball/nba/teams/memphis-grizzlies/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/grizzlies_50.png\" alt=\"Memphis Grizzlies\" title=\"Memphis Grizzlies\" />" },
						{ "u":"/basketball/nba/teams/new-orleans-pelicans/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/pelicans_50.png\" alt=\"New Orleans Pelicans\" title=\"New Orleans Pelicans\" />" },
						{ "u":"/basketball/nba/teams/dallas-mavericks/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/mavericks_50.png\" alt=\"Dallas Mavericks\" title=\"Dallas Mavericks\" />" },
						{ "u":"/basketball/nba/teams/houston-rockets/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/rockets_50.png\" alt=\"Houston Rockets\" title=\"Houston Rockets\" />" },
						{ "u":"/basketball/nba/teams/san-antonio-spurs/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/basketball/nba/logos/spurs_50.png\" alt=\"San Antonio Spurs\" title=\"San Antonio Spurs\" />" }
					]
				}
			]
		},
		{ "u":"/basketball/nba/rosters/alpha/A.html",					"l":"Players" },
		{ "u":"/fantasy/player_news/nba/",								"l":"Player News" },
		{ "u":"/basketball/nba/standings/",								"l":"Standings" },
		{ "u":"/basketball/nba/schedules/weekly/today/",					"l":"Schedules" },
		{ "u":"/basketball/nba/stats/",									"l":"Stats" },
		{ "u":"/basketball/nba/teams/",									"l":"Transactions" },
		{ "u":"/basketball/nba/teams/",									"l":"Injuries" },
		{ "u":"http://sports.sportsillustrated.cnn.com/wnbafront.asp",	"l":"WNBA" },
		{ "u":"/podcasts/nba/",											"l":"Podcasts" }
	],
	"ncaabb" : [
		{ "u":"http://college-basketball.si.com/",									"l":"One And One Blog" },
		{ "u":"/basketball/ncaa/men/scoreboards/ncaa64/today/",			"l":"Scores",
			"s": [
				{ "u":"/basketball/ncaa/men/scoreboards/top25/today/",	"l":"Top 25" },
				{ "u":"/basketball/ncaa/men/scoreboards/ivy/today/",		"l":"Ivy League" },
				{ "u":"/basketball/ncaa/men/scoreboards/divia/today/",	"l":"Division I" },
				{ "u":"/basketball/ncaa/men/scoreboards/maac/today/",	"l":"MAAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/ncaa64/today/",	"l":"NCAA Tournament" },
				{ "u":"/basketball/ncaa/men/scoreboards/mac/today/",		"l":"MAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/acc/today/",		"l":"ACC" },
				{ "u":"/basketball/ncaa/men/scoreboards/meac/today/",	"l":"MEAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/aeast/today/",	"l":"America East" },
				{ "u":"/basketball/ncaa/men/scoreboards/mvc/today/",		"l":"MVC" },
				{ "u":"/basketball/ncaa/men/scoreboards/atl10/today/",	"l":"Atlantic 10" },
				{ "u":"/basketball/ncaa/men/scoreboards/mwest/today/",	"l":"MWC" },
				{ "u":"/basketball/ncaa/men/scoreboards/atsun/today/",	"l":"Atlantic Sun" },
				{ "u":"/basketball/ncaa/men/scoreboards/nec/today/",		"l":"Northeast" },
				{ "u":"/basketball/ncaa/men/scoreboards/big12/today/",	"l":"Big 12" },
				{ "u":"/basketball/ncaa/men/scoreboards/ovc/today/",		"l":"OVC" },
				{ "u":"/basketball/ncaa/men/scoreboards/bige/today/",	"l":"Big East" },
				{ "u":"/basketball/ncaa/men/scoreboards/pac12/today/",	"l":"Pac-12" },
				{ "u":"/basketball/ncaa/men/scoreboards/bsky/today/",	"l":"Big Sky" },
				{ "u":"/basketball/ncaa/men/scoreboards/patr/today/",	"l":"Patriot" },
				{ "u":"/basketball/ncaa/men/scoreboards/bsou/today/",	"l":"Big South" },
				{ "u":"/basketball/ncaa/men/scoreboards/sec/today/",		"l":"SEC" },
				{ "u":"/basketball/ncaa/men/scoreboards/big10/today/",	"l":"Big Ten" },
				{ "u":"/basketball/ncaa/men/scoreboards/swac/today/",	"l":"SWAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/bigw/today/",	"l":"Big West" },
				{ "u":"/basketball/ncaa/men/scoreboards/south/today/",	"l":"Southern" },
				{ "u":"/basketball/ncaa/men/scoreboards/cusa/today/",	"l":"C-USA" },
				{ "u":"/basketball/ncaa/men/scoreboards/sland/today/",	"l":"Southland" },
				{ "u":"/basketball/ncaa/men/scoreboards/coln/today/",	"l":"Colonial" },
				{ "u":"/basketball/ncaa/men/scoreboards/sum/today/",		"l":"Summit League" },
				{ "u":"/basketball/ncaa/men/scoreboards/gwc/today/",		"l":"GWC" },
				{ "u":"/basketball/ncaa/men/scoreboards/sbelt/today/",	"l":"Sunbelt" },
				{ "u":"/basketball/ncaa/men/scoreboards/horiz/today/",	"l":"Horizon" },
				{ "u":"/basketball/ncaa/men/scoreboards/wac/today/",		"l":"WAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/indp/today/",	"l":"Independents" },
				{ "u":"/basketball/ncaa/men/scoreboards/wcc/today/",		"l":"West Coast" }
			],
			"s2": [
				{ "u":"/basketball/ncaa/men/scoreboards/top25/today/",	"l":"Top 25" },
				{ "u":"/basketball/ncaa/men/scoreboards/ivy/today/",		"l":"Ivy League" },
				{ "u":"/basketball/ncaa/men/scoreboards/divia/today/",	"l":"Division I" },
				{ "u":"/basketball/ncaa/men/scoreboards/maac/today/",	"l":"MAAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/ncaa64/today/",	"l":"NCAA Tournament" },
				{ "u":"/basketball/ncaa/men/scoreboards/mac/today/",		"l":"MAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/acc/today/",		"l":"ACC" },
				{ "u":"/basketball/ncaa/men/scoreboards/meac/today/",	"l":"MEAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/aeast/today/",	"l":"America East" },
				{ "u":"/basketball/ncaa/men/scoreboards/mvc/today/",		"l":"MVC" },
				{ "u":"/basketball/ncaa/men/scoreboards/atl10/today/",	"l":"Atlantic 10" },
				{ "u":"/basketball/ncaa/men/scoreboards/mwest/today/",	"l":"MWC" },
				{ "u":"/basketball/ncaa/men/scoreboards/atsun/today/",	"l":"Atlantic Sun" },
				{ "u":"/basketball/ncaa/men/scoreboards/nec/today/",		"l":"Northeast" },
				{ "u":"/basketball/ncaa/men/scoreboards/big12/today/",	"l":"Big 12" },
				{ "u":"/basketball/ncaa/men/scoreboards/ovc/today/",		"l":"OVC" },
				{ "u":"/basketball/ncaa/men/scoreboards/bige/today/",	"l":"Big East" },
				{ "u":"/basketball/ncaa/men/scoreboards/pac12/today/",	"l":"Pac-12" },
				{ "u":"/basketball/ncaa/men/scoreboards/bsky/today/",	"l":"Big Sky" },
				{ "u":"/basketball/ncaa/men/scoreboards/patr/today/",	"l":"Patriot" },
				{ "u":"/basketball/ncaa/men/scoreboards/bsou/today/",	"l":"Big South" },
				{ "u":"/basketball/ncaa/men/scoreboards/sec/today/",		"l":"SEC" },
				{ "u":"/basketball/ncaa/men/scoreboards/big10/today/",	"l":"Big Ten" },
				{ "u":"/basketball/ncaa/men/scoreboards/swac/today/",	"l":"SWAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/bigw/today/",	"l":"Big West" },
				{ "u":"/basketball/ncaa/men/scoreboards/south/today/",	"l":"Southern" },
				{ "u":"/basketball/ncaa/men/scoreboards/cusa/today/",	"l":"C-USA" },
				{ "u":"/basketball/ncaa/men/scoreboards/sland/today/",	"l":"Southland" },
				{ "u":"/basketball/ncaa/men/scoreboards/coln/today/",	"l":"Colonial" },
				{ "u":"/basketball/ncaa/men/scoreboards/sum/today/",		"l":"Summit League" },
				{ "u":"/basketball/ncaa/men/scoreboards/gwc/today/",		"l":"GWC" },
				{ "u":"/basketball/ncaa/men/scoreboards/sbelt/today/",	"l":"Sunbelt" },
				{ "u":"/basketball/ncaa/men/scoreboards/horiz/today/",	"l":"Horizon" },
				{ "u":"/basketball/ncaa/men/scoreboards/wac/today/",		"l":"WAC" },
				{ "u":"/basketball/ncaa/men/scoreboards/indp/today/",	"l":"Independents" },
				{ "u":"/basketball/ncaa/men/scoreboards/wcc/today/",		"l":"West Coast" }
			]
		},
		{ "u": "/basketball/ncaa/men/teams/",							"l":"Teams" },
		{ "u": "/basketball/ncaa/men/conferences/",						"l":"Conferences",
			"s": [
				{ "u":"/basketball/ncaa/men/conferences/aac/",			"l":"AAC" },
				{ "u":"/basketball/ncaa/men/conferences/acc/",			"l":"ACC" },
				{ "u":"/basketball/ncaa/men/conferences/midam/",			"l":"MAC" },
				{ "u":"/basketball/ncaa/men/conferences/aeast/",			"l":"America East" },
				{ "u":"/basketball/ncaa/men/conferences/meac/",			"l":"MEAC" },
				{ "u":"/basketball/ncaa/men/conferences/atl10/",			"l":"Atlantic 10" },
				{ "u":"/basketball/ncaa/men/conferences/mvc/",			"l":"Missouri Valley" },
				{ "u":"/basketball/ncaa/men/conferences/atsun/",			"l":"Atlantic Sun" },
				{ "u":"/basketball/ncaa/men/conferences/mwest/",			"l":"Mountain West" },
				{ "u":"/basketball/ncaa/men/conferences/big12/",			"l":"Big 12" },
				{ "u":"/basketball/ncaa/men/conferences/nec/",			"l":"NEC" },
				{ "u":"/basketball/ncaa/men/conferences/bige/",			"l":"Big East" },
				{ "u":"/basketball/ncaa/men/conferences/ovc/",			"l":"Ohio Valley" },
				{ "u":"/basketball/ncaa/men/conferences/bsky/",			"l":"Big Sky" },
				{ "u":"/basketball/ncaa/men/conferences/pac12/",			"l":"Pac-12" },
				{ "u":"/basketball/ncaa/men/conferences/bsou/",			"l":"Big South" },
				{ "u":"/basketball/ncaa/men/conferences/patr/",			"l":"Patriot" },
				{ "u":"/basketball/ncaa/men/conferences/big10/",			"l":"Big Ten" },
				{ "u":"/basketball/ncaa/men/conferences/sec/",			"l":"SEC" },
				{ "u":"/basketball/ncaa/men/conferences/bigw/",			"l":"Big West" },
				{ "u":"/basketball/ncaa/men/conferences/south/",			"l":"Southern" },
				{ "u":"/basketball/ncaa/men/conferences/coln/",			"l":"Colonial" },
				{ "u":"/basketball/ncaa/men/conferences/sland/",			"l":"Southland" },
				{ "u":"/basketball/ncaa/men/conferences/cusa/",			"l":"C-USA" },
				{ "u":"/basketball/ncaa/men/conferences/sum/",			"l":"Summit" },
				{ "u":"/basketball/ncaa/men/conferences/gwc/",			"l":"GWC" },
				{ "u":"/basketball/ncaa/men/conferences/sbelt/",			"l":"Sun Belt" },
				{ "u":"/basketball/ncaa/men/conferences/horiz/",			"l":"Horizon" },
				{ "u":"/basketball/ncaa/men/conferences/swac/",			"l":"SWAC" },
				{ "u":"/basketball/ncaa/men/conferences/indp/",			"l":"Independents" },
				{ "u":"/basketball/ncaa/men/conferences/wac/",			"l":"WAC" },
				{ "u":"/basketball/ncaa/men/conferences/ivy/",			"l":"Ivy League" },
				{ "u":"/basketball/ncaa/men/conferences/wcc/",			"l":"WCC" },
				{ "u":"/basketball/ncaa/men/conferences/maac/",			"l":"MAAC" }
			],
			"s2": [
				{ "u":"/basketball/ncaa/men/conferences/aac/",			"l":"AAC" },
				{ "u":"/basketball/ncaa/men/conferences/acc/",			"l":"ACC" },
				{ "u":"/basketball/ncaa/men/conferences/midam/",			"l":"MAC" },
				{ "u":"/basketball/ncaa/men/conferences/aeast/",			"l":"America East" },
				{ "u":"/basketball/ncaa/men/conferences/meac/",			"l":"MEAC" },
				{ "u":"/basketball/ncaa/men/conferences/atl10/",			"l":"Atlantic 10" },
				{ "u":"/basketball/ncaa/men/conferences/mvc/",			"l":"Missouri Valley" },
				{ "u":"/basketball/ncaa/men/conferences/atsun/",			"l":"Atlantic Sun" },
				{ "u":"/basketball/ncaa/men/conferences/mwest/",			"l":"Mountain West" },
				{ "u":"/basketball/ncaa/men/conferences/big12/",			"l":"Big 12" },
				{ "u":"/basketball/ncaa/men/conferences/nec/",			"l":"NEC" },
				{ "u":"/basketball/ncaa/men/conferences/bige/",			"l":"Big East" },
				{ "u":"/basketball/ncaa/men/conferences/ovc/",			"l":"Ohio Valley" },
				{ "u":"/basketball/ncaa/men/conferences/bsky/",			"l":"Big Sky" },
				{ "u":"/basketball/ncaa/men/conferences/pac12/",			"l":"Pac-12" },
				{ "u":"/basketball/ncaa/men/conferences/bsou/",			"l":"Big South" },
				{ "u":"/basketball/ncaa/men/conferences/patr/",			"l":"Patriot" },
				{ "u":"/basketball/ncaa/men/conferences/big10/",			"l":"Big Ten" },
				{ "u":"/basketball/ncaa/men/conferences/sec/",			"l":"SEC" },
				{ "u":"/basketball/ncaa/men/conferences/bigw/",			"l":"Big West" },
				{ "u":"/basketball/ncaa/men/conferences/south/",			"l":"Southern" },
				{ "u":"/basketball/ncaa/men/conferences/coln/",			"l":"Colonial" },
				{ "u":"/basketball/ncaa/men/conferences/sland/",			"l":"Southland" },
				{ "u":"/basketball/ncaa/men/conferences/cusa/",			"l":"C-USA" },
				{ "u":"/basketball/ncaa/men/conferences/sum/",			"l":"Summit" },
				{ "u":"/basketball/ncaa/men/conferences/gwc/",			"l":"GWC" },
				{ "u":"/basketball/ncaa/men/conferences/sbelt/",			"l":"Sun Belt" },
				{ "u":"/basketball/ncaa/men/conferences/horiz/",			"l":"Horizon" },
				{ "u":"/basketball/ncaa/men/conferences/swac/",			"l":"SWAC" },
				{ "u":"/basketball/ncaa/men/conferences/indp/",			"l":"Independents" },
				{ "u":"/basketball/ncaa/men/conferences/wac/",			"l":"WAC" },
				{ "u":"/basketball/ncaa/men/conferences/ivy/",			"l":"Ivy League" },
				{ "u":"/basketball/ncaa/men/conferences/wcc/",			"l":"WCC" },
				{ "u":"/basketball/ncaa/men/conferences/maac/",			"l":"MAAC" }
			]
		},
		{ "u": "/basketball/ncaa/men/teams/",							"l":"Players" },
		{ "u": "/basketball/ncaa/men/stats/",							"l":"Stats" },
		{ "u": "/basketball/ncaa/men/standings/",						"l":"Standings" },
		{ "u": "/basketball/ncaa/men/polls/",							"l":"Rankings" },
		{ "u": "/basketball/ncaa/men/schedules/weekly/today/",			"l":"Schedules" },
		{ "u": "http://sports.sportsillustrated.cnn.com/wcbkfront.asp",	"l":"Women's Hoops" }
	],
	"golf" : [
		{ "u": "http://www.golf.com/news/leaderboards",																										"l":"Leaderboards" },
		{ "u": "http://www.golf.com/tours_news/tourschedule",																								"l":"Schedules &amp; Results" },
		{ "u": "http://www.golf.com/tours_news/tourstats",																									"l":"Stats" },
		{ "u": "http://www.golf.com/tours_news",																												"l":"Golf News" },
		{ "u": "http://www.golf.com/search/apachesolr_search/pga%20tour%20confidential?filters=is_cck_field_article_contributor_ref:151111&solrsort=created%20desc",	"l":"PGA Tour Confidential" },
		{ "u": "http://www.golf.com/instruction",																														"l":"Instruction",
			"s": [
				{ "u":"http://www.golf.com/instruction/power",			"l":"Power" },
				{ "u":"http://www.golf.com/instruction/slice-hook",		"l":"Slice/Hook" },
				{ "u":"http://www.golf.com/instruction/putting",			"l":"Putting" },
				{ "u":"http://www.golf.com/instruction/short-game",		"l":"Short Game" },
				{ "u":"http://www.golf.com/instruction/solid-contact",	"l":"Solid Contact" },
				{ "u":"http://www.golf.com/instruction/sand",			"l":"Sand" }
			],
			"s2": [
				{ "u":"http://www.golf.com/instruction/power",			"l":"Power" },
				{ "u":"http://www.golf.com/instruction/slice-hook",		"l":"Slice/Hook" },
				{ "u":"http://www.golf.com/instruction/putting",			"l":"Putting" },
				{ "u":"http://www.golf.com/instruction/short-game",		"l":"Short Game" },
				{ "u":"http://www.golf.com/instruction/solid-contact",	"l":"Solid Contact" },
				{ "u":"http://www.golf.com/instruction/sand",			"l":"Sand" }
			]
		},
		{ "u": "http://www.golf.com/equipment",																															"l":"Equipment",
			"s": [
				{ "u":"http://www.golf.com/equipment/see-try-buy",	"l":"See-Try-Buy" },
				{ "u":"http://www.golf.com/equipment/club-test",		"l":"Club Test" },
				{ "u":"http://shop.golf.com",						"l":"Shop.GOLF.com" },
				{ "u":"#",														"l":"&#160;" }
			],
			"s2": [
				{ "u":"http://www.golf.com/equipment/see-try-buy",	"l":"See-Try-Buy" },
				{ "u":"http://www.golf.com/equipment/club-test",		"l":"Club Test" },
				{ "u":"http://shop.golf.com",						"l":"Shop.GOLF.com" }
			]
		},
		{ "u": "http://www.golf.com/courses_travel",																											"l":"Courses &amp; Travel",
			"s": [
				{ "u":"http://www.golf.com/courses-and-travel/general-top-courses",	"l":"Course Rankings" },
				{ "u":"http://www.golf.com/courses",									"l":"Golf Course Finder" },
				{ "u":"http://www.golf.com/courses-and-travel/trip-guides",			"l":"Trip Guides" },
				{ "u":"#",																		"l":"&#160;" }
			],
			"s2": [
				{ "u":"http://www.golf.com/courses-and-travel/general-top-courses",	"l":"Course Rankings" },
				{ "u":"http://www.golf.com/courses",									"l":"Golf Course Finder" },
				{ "u":"http://www.golf.com/courses-and-travel/trip-guides",			"l":"Trip Guides" }
			]
		}
	],
	"nhl" : [
		{ "u": "http://nhl.si.com/",						"l":"Home Ice Blog" },
		{ "u": "/hockey/nhl/scoreboards/today/",			"l":"Scores" },
		{ "u": "/hockey/nhl/teams/",						"l":"Teams",
			"s": [
				{ "u":"#", "c":"cnnTeamDivisionTitle h-eastern",		"l":"Eastern Conference" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"ATLANTIC" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"NORTHEAST" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"SOUTHEAST" },
				{ "u":"/hockey/nhl/teams/new-jersey-devils/",		"l":"Devils" },
				{ "u":"/hockey/nhl/teams/boston-bruins/",			"l":"Bruins" },
				{ "u":"/hockey/nhl/teams/washington-capitals/",		"l":"Capitals" },
				{ "u":"/hockey/nhl/teams/philadelphia-flyers/",		"l":"Flyers" },
				{ "u":"/hockey/nhl/teams/montreal-canadiens/",		"l":"Canadiens" },
				{ "u":"/hockey/nhl/teams/carolina-hurricanes/",		"l":"Hurricanes" },
				{ "u":"/hockey/nhl/teams/new-york-islanders/",		"l":"Islanders" },
				{ "u":"/hockey/nhl/teams/toronto-maple-leafs/",		"l":"Maple Leafs" },
				{ "u":"/hockey/nhl/teams/winnipeg-jets/",			"l":"Jets" },
				{ "u":"/hockey/nhl/teams/pittsburgh-penguins/",		"l":"Penguins" },
				{ "u":"/hockey/nhl/teams/buffalo-sabres/",			"l":"Sabres" },
				{ "u":"/hockey/nhl/teams/tampa-bay-lightning/",		"l":"Lightning" },
				{ "u":"/hockey/nhl/teams/new-york-rangers/",			"l":"Rangers" },
				{ "u":"/hockey/nhl/teams/ottawa-senators/",			"l":"Senators" },
				{ "u":"/hockey/nhl/teams/florida-panthers/",			"l":"Panthers" },
				{ "u":"#", "c":"cnnTeamDivisionTitle h-western bottom",	"l":"Western Conference" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"CENTRAL" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"NORTHWEST" },
				{ "u":"#", "c":"cnnTeamDivision",						"l":"PACIFIC" },
				{ "u":"/hockey/nhl/teams/chicago-blackhawks/",		"l":"Blackhawks" },
				{ "u":"/hockey/nhl/teams/colorado-avalanche/",		"l":"Avalanche" },
				{ "u":"/hockey/nhl/teams/phoenix-coyotes/",			"l":"Coyotes" },
				{ "u":"/hockey/nhl/teams/columbus-blue-jackets/",	"l":"Blue Jackets" },
				{ "u":"/hockey/nhl/teams/vancouver-canucks/",		"l":"Canucks" },
				{ "u":"/hockey/nhl/teams/anaheim-ducks/",			"l":"Ducks" },
				{ "u":"/hockey/nhl/teams/st-louis-blues/",			"l":"Blues" },
				{ "u":"/hockey/nhl/teams/calgary-flames/",			"l":"Flames" },
				{ "u":"/hockey/nhl/teams/los-angeles-kings/",		"l":"Kings" },
				{ "u":"/hockey/nhl/teams/nashville-predators/",		"l":"Predators" },
				{ "u":"/hockey/nhl/teams/edmonton-oilers/",			"l":"Oilers" },
				{ "u":"/hockey/nhl/teams/san-jose-sharks/",			"l":"Sharks" },
				{ "u":"/hockey/nhl/teams/detroit-red-wings/",		"l":"Red Wings" },
				{ "u":"/hockey/nhl/teams/minnesota-wild/",			"l":"Wild" },
				{ "u":"/hockey/nhl/teams/dallas-stars/",				"l":"Stars" }
			],
			"s2": [
				{ "u":"#", "c":"division",	"l":"<span class=\"nhl-eastern\"></span>" },
				{ "u":"#",					"l":"A<br />T<br />L<br />A<br />N<br />T<br />I<br />C",
					"t": [
						{ "u":"/hockey/nhl/teams/boston-bruins/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/bruins_50.png\" alt=\"Boston Bruins\" title=\"Boston Bruins\" />" },
						{ "u":"/hockey/nhl/teams/montreal-canadiens/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/canadiens_50.png\" alt=\"Montreal Canadiens\" title=\"Montreal Canadiens\" />" },
						{ "u":"/hockey/nhl/teams/tampa-bay-lightning/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/lightning_50.png\" alt=\"Tampa Bay Lightning\" title=\"Tampa Bay Lightning\" />" },
						{ "u":"/hockey/nhl/teams/toronto-maple-leafs/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/maple_leafs_50.png\" alt=\"Toronto Maple Leafs\" title=\"Toronto Maple Leafs\" />" },
						{ "u":"/hockey/nhl/teams/florida-panthers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/panthers_50.png\" alt=\"Florida Panthers\" title=\"Florida Panthers\" />" },
						{ "u":"/hockey/nhl/teams/detroit-red-wings/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/red_wings_50.png\" alt=\"Detroit Red Wings\" title=\"Detroit Red Wings\" />" },
						{ "u":"/hockey/nhl/teams/buffalo-sabres/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/sabres_50.png\" alt=\"Buffalo Sabres\" title=\"Buffalo Sabres\" />" },
						{ "u":"/hockey/nhl/teams/ottawa-senators/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/senators_50.png\" alt=\"Ottawa Senators\" title=\"Ottawa Senators\" />" }
					]
				},
				{ "u":"#",					"l":"M<br />E<br />T<br />R<br />O<br />P<br />O<br />L<br />I<br />T<br />A<br />N",
					"t": [
						{ "u":"/hockey/nhl/teams/columbus-blue-jackets/",	"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/blue_jackets_50.png\" alt=\"Columbus Blue Jackets\" title=\"Columbus Blue Jackets\" />" },
						{ "u":"/hockey/nhl/teams/washington-capitals/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/capitals_50.png\" alt=\"Washington Capitals\" title=\"Washington Capitals\" />" },
						{ "u":"/hockey/nhl/teams/new-jersey-devils/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/devils_50.png\" alt=\"New Jersey Devils\" title=\"New Jersey Devils\" />" },
						{ "u":"/hockey/nhl/teams/philadelphia-flyers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/flyers_50.png\" alt=\"Philadelphia Flyers\" title=\"Philadelphia Flyers\" />" },
						{ "u":"/hockey/nhl/teams/carolina-hurricanes/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/hurricanes_50.png\" alt=\"Carolina Hurricanes\" title=\"Carolina Hurricanes\" />" },
						{ "u":"/hockey/nhl/teams/new-york-islanders/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/islanders_50.png\" alt=\"New York Islanders\" title=\"New York Islanders\" />" },
						{ "u":"/hockey/nhl/teams/pittsburgh-penguins/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/penguins_50.png\" alt=\"Pittsburgh Penguins\" title=\"Pittsburgh Penguins\" />" },
						{ "u":"/hockey/nhl/teams/new-york-rangers/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/rangers_50.png\" alt=\"New York Rangers\" title=\"New York Rangers\" />" }
					]
				},
				{ "u":"#", "c":"division",	"l":"<span class=\"nhl-western\"></span>" },
				{ "u":"#",					"l":"C<br />E<br />N<br />T<br />R<br />A<br />L",
					"t": [
						{ "u":"/hockey/nhl/teams/colorado-avalanche/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/avalanche_50.png\" alt=\"Colorado Avalanche\" title=\"Colorado Avalanche\" />" },
						{ "u":"/hockey/nhl/teams/chicago-blackhawks/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/blackhawks_50.png\" alt=\"Chicago Blackhawks\" title=\"Chicago Blackhawks\" />" },
						{ "u":"/hockey/nhl/teams/st-louis-blues/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/blues_50.png\" alt=\"St. Louis Blues\" title=\"St. Louis Blues\" />" },
						{ "u":"/hockey/nhl/teams/winnipeg-jets/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/jets_50.png\" alt=\"Winnipeg Jets\" title=\"Winnipeg Jets\" />" },
						{ "u":"/hockey/nhl/teams/nashville-predators/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/predators_50.png\" alt=\"Nashville Predators\" title=\"Nashville Predators\" />" },
						{ "u":"/hockey/nhl/teams/dallas-stars/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/stars_50.png\" alt=\"Dallas Stars\" title=\"Dallas Stars\" />" },
						{ "u":"/hockey/nhl/teams/minnesota-wild/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/wild_50.png\" alt=\"Minnesota Wild\" title=\"Minnesota Wild\" />" }
					]
				},
				{ "u":"#",					"l":"P<br />A<br />C<br />I<br />F<br />I<br />C",
					"t": [
						{ "u":"/hockey/nhl/teams/vancouver-canucks/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/canucks_50.png\" alt=\"Vancouver Cancuks\" title=\"Vancouver Cancuks\" />" },
						{ "u":"/hockey/nhl/teams/phoenix-coyotes/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/coyotes_50.png\" alt=\"Phoenix Coyotes\" title=\"Phoenix Coyotes\" />" },
						{ "u":"/hockey/nhl/teams/anaheim-ducks/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/ducks_50.png\" alt=\"Anaheim Ducks\" title=\"Anaheim Ducks\" />" },
						{ "u":"/hockey/nhl/teams/calgary-flames/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/flames_50.png\" alt=\"Calgary Flames\" title=\"Calgary Flames\" />" },
						{ "u":"/hockey/nhl/teams/los-angeles-kings/",		"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/kings_50.png\" alt=\"Los Angeles Kings\" title=\"Los Angeles Kings\" />" },
						{ "u":"/hockey/nhl/teams/edmonton-oilers/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/oilers_50.png\" alt=\"Edmonton Oilers\" title=\"Edmonton Oilers\" />" },
						{ "u":"/hockey/nhl/teams/san-jose-sharks/",			"l":"<img src=\"http://i.cdn.turner.com/si/.e1d/img/4.0/global/hockey/nhl/logos/sharks_50.png\" alt=\"San Jose Sharks\" title=\"San Jose Sharks\" />" }
					]
				}
			]
		},
		{ "u": "/hockey/nhl/rosters/alpha/A.html",		"l":"Players" },
		{ "u": "/fantasy/player_news/nhl/",				"l":"Player News" },
		{ "u": "/hockey/nhl/standings/",					"l":"Standings" },
		{ "u": "/hockey/nhl/schedules/weekly/today/",	"l":"Season Schedules" },
		{ "u": "/hockey/nhl/stats/",						"l":"Stats" },
		{ "u": "/hockey/nhl/teams/",						"l":"Transactions" },
		{ "u": "/hockey/nhl/teams/",						"l":"Injuries" },
		{ "u": "http://gamecenter.nhl.com/nhlgc/servlets/refer/si?cmpid=gcl-referral-SInav",		"l":"NHL GameCenter" }
	],
	"racing" : [
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=NASCAR&eref=sinav",		"l":"NASCAR" },
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=NATIONWIDE&eref=sinav",	"l":"Nationwide" },
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=TRUCK&eref=sinav",		"l":"Camping World Truck Series" },
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=IRL&eref=sinav",			"l":"IndyCar" },
		{ "u": "http://sports.sportsillustrated.cnn.com/racingfront.asp?series=Form1&eref=sinav",		"l":"Formula One" }
	],
	"soccer" : [
		{ "u": "http://soccer.si.com",	"l":"Planet Futbol Blog"},
		{ "u": "http://sports.sportsillustrated.cnn.com/soccerfront.asp",	"l":"Leagues",
			"s": [
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=mls&eref=sinav",		"l":"MLS" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=gold&eref=sinav",		"l":"CONCACAF Gold Cup" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=arge&eref=sinav",		"l":"Argentina" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=copa&eref=sinav",		"l":"Copa America" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=epl&eref=sinav",		"l":"England" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=lib&eref=sinav",		"l":"Copa Lib" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=fran&eref=sinav",		"l":"France" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=sud&eref=sinav",		"l":"Copa Sud" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=bund&eref=sinav",		"l":"Germany" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=eng_ch&eref=sinav",	"l":"English Champ" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=seri&eref=sinav",		"l":"Italy" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=fmf&eref=sinav",		"l":"Mexico" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=uefa&eref=sinav",		"l":"Europa League" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=holl&eref=sinav",		"l":"Netherlands" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=u20&eref=sinav",		"l":"FIFA U-20" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=scot&eref=sinav",		"l":"Scotland" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=jlg&eref=sinav",		"l":"J-League" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=liga&eref=sinav",		"l":"Spain" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=worldcup&eref=sinav",	"l":"World Cup" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=chlg&eref=sinav",		"l":"Champions" }
			],
			"s2": [
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=mls&eref=sinav",		"l":"MLS" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=gold&eref=sinav",		"l":"CONCACAF Gold Cup" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=arge&eref=sinav",		"l":"Argentina" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=copa&eref=sinav",		"l":"Copa America" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=epl&eref=sinav",		"l":"England" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=lib&eref=sinav",		"l":"Copa Lib" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=fran&eref=sinav",		"l":"France" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=sud&eref=sinav",		"l":"Copa Sud" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=bund&eref=sinav",		"l":"Germany" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=eng_ch&eref=sinav",	"l":"English Champ" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=seri&eref=sinav",		"l":"Italy" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=fmf&eref=sinav",		"l":"Mexico" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=uefa&eref=sinav",		"l":"Europa League" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=holl&eref=sinav",		"l":"Netherlands" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=u20&eref=sinav",		"l":"FIFA U-20" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=scot&eref=sinav",		"l":"Scotland" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=jlg&eref=sinav",		"l":"J-League" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=liga&eref=sinav",		"l":"Spain" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=worldcup&eref=sinav",	"l":"World Cup" },
				{ "u":"http://sports.sportsillustrated.cnn.com/soccerfront.asp?lg=chlg&eref=sinav",		"l":"Champions" }
			]
		},
		{ "u": "http://sports.sportsillustrated.cnn.com/soccerfront.asp",	"l":"Scores",
			"s": [
				{ "u":"http://sports.sportsillustrated.cnn.com/epl/scoreboard_daily.asp",	"l":"England" },
				{ "u":"http://sports.sportsillustrated.cnn.com/fran/scoreboard_daily.asp",	"l":"France" },	
				{ "u":"http://sports.sportsillustrated.cnn.com/bund/scoreboard_daily.asp",	"l":"Germany" },
				{ "u":"http://sports.sportsillustrated.cnn.com/seri/scoreboard_daily.asp",	"l":"Italy" },
				{ "u":"http://sports.sportsillustrated.cnn.com/fmf/scoreboard_daily.asp",	"l":"Mexico" },
				{ "u":"http://sports.sportsillustrated.cnn.com/holl/scoreboard_daily.asp",	"l":"Netherlands" },
				{ "u":"http://sports.sportsillustrated.cnn.com/scot/scoreboard_daily.asp",	"l":"Scotland" },
				{ "u":"http://sports.sportsillustrated.cnn.com/liga/scoreboard_daily.asp",	"l":"Spain" },
				{ "u":"http://sports.sportsillustrated.cnn.com/mls/scoreboard_daily.asp",	"l":"United States" },
				{ "u":"#",																	"l":"&#160;" }
			],
			"s2": [
				{ "u":"http://sports.sportsillustrated.cnn.com/epl/scoreboard_daily.asp",	"l":"England" },
				{ "u":"http://sports.sportsillustrated.cnn.com/fran/scoreboard_daily.asp",	"l":"France" },	
				{ "u":"http://sports.sportsillustrated.cnn.com/bund/scoreboard_daily.asp",	"l":"Germany" },
				{ "u":"http://sports.sportsillustrated.cnn.com/seri/scoreboard_daily.asp",	"l":"Italy" },
				{ "u":"http://sports.sportsillustrated.cnn.com/fmf/scoreboard_daily.asp",	"l":"Mexico" },
				{ "u":"http://sports.sportsillustrated.cnn.com/holl/scoreboard_daily.asp",	"l":"Netherlands" },
				{ "u":"http://sports.sportsillustrated.cnn.com/scot/scoreboard_daily.asp",	"l":"Scotland" },
				{ "u":"http://sports.sportsillustrated.cnn.com/liga/scoreboard_daily.asp",	"l":"Spain" },
				{ "u":"http://sports.sportsillustrated.cnn.com/mls/scoreboard_daily.asp",	"l":"United States" }
			]
		},
		{ "u": "/podcasts/soccer/",											"l":"Podcasts" }
	],
	"boxmma" : [
		{ "u": "http://mma-boxing.si.com",									"l":"Counterpunch Blog" },
		{ "u": "/mma/news/20130117/mma-schedule-results/",		"l":"MMA Schedules &amp; Results" },
		{ "u": "/mma/news/20130206/upcoming-boxing-schedule/",	"l":"Boxing Schedules &amp; Results" },
		{ "u": "/mma/news/20130507/pound-for-pound-rankings-boxing/",		"l":"Pound-for-Pound Ratings" }
	],
	"tennis" : [
		{ "u": "http://tennis.si.com",	"l":"Beyond The Baseline Blog" },
		{ "u": "http://sports.sportsillustrated.cnn.com/tennisfront.asp?tour=ATP",	"l":"ATP",
			"s": [
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/scoreboard.asp?tour=ATP",	"l":"Men's Results" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/schedule.asp?tour=ATP",	"l":"Men's Schedules" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/rankings.asp?tour=ATP",	"l":"Men's Players" },
				{ "u":"#",																					"l":"&#160;" }
			],
			"s2": [
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/scoreboard.asp?tour=ATP",	"l":"Men's Results" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/schedule.asp?tour=ATP",	"l":"Men's Schedules" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/rankings.asp?tour=ATP",	"l":"Men's Players" }
			]
		},
		{ "u": "http://sports.sportsillustrated.cnn.com/tennisfront.asp?tour=WTA",	"l":"WTA",
			"s": [
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/scoreboard.asp?tour=WTA",	"l":"Women's Results" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/schedule.asp?tour=WTA",	"l":"Women's Schedules" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/rankings.asp?tour=WTA",	"l":"Women's Players" },
				{ "u":"#",																					"l":"&#160;" }
			],
			"s2": [
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/scoreboard.asp?tour=WTA",	"l":"Women's Results" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/schedule.asp?tour=WTA",	"l":"Women's Schedules" },
				{ "u": "http://sports.sportsillustrated.cnn.com/tennis/rankings.asp?tour=WTA",	"l":"Women's Players" }
			]
		},
		{ "u": "/podcasts/tennis/",													"l":"Podcasts" }
	],
	"more" : [
		{ "u": "/cycling/wires/",											"l":"Cycling" },
		{ "u": "http://sports.sportsillustrated.cnn.com/cfl/scoreboard.asp",	"l":"CFL" },
		{ "u": "http://sports.sportsillustrated.cnn.com/cricketfront.asp",	"l":"Cricket" },
		{ "u": "/figure_skating/wires/",										"l":"Figure Skating" },
		{ "u": "/highschool/",												"l":"High School" },
		{ "u": "/horse_racing/wires/",										"l":"Horse Racing" },
		{ "u": "/mma/",														"l":"MMA &amp; Boxing" },
		{ "u": "http://olympics.si.com/olympics/sochi-2014-winter-olympics", "l":"Olympics" },
		{ "u": "/racing/",													"l":"Racing" },
		{ "u": "/sifk/",														"l":"SI Kids" },
		{ "u": "http://tracking.si.com/",									"l":"SI Wire" },
		{ "u": "/magazine/sportsman/",										"l":"Sportsman" },
		{ "u": "/track_field/wires/",										"l":"Track &amp; Field" },
		{ "u": "http://sports.sportsillustrated.cnn.com/wcbkfront.asp",		"l":"Women's College Basketball" },
		{ "u": "http://sports.sportsillustrated.cnn.com/wnbafront.asp",		"l":"WNBA" },
		{ "u": "/travelplaybook",		"l":"Travel Playbook" }
	],
	"video" : [
		{ "u": "/aroundtheworld/",			"l":"Around The World" },
		{ "u": "/specials/freshtakes/",			"l":"Fresh Takes" },
		{ "u": "/offtherecord/",			"l":"Off The Record" },
		{ "u": "/profootballnow/",			"l":"Pro Football Now" },
		{ "u": "/specials/risingstars/",			"l":"Rising Stars" },
		{ "u": "/sinow/",	"l":"SI Now" },
		{ "u": "http://swimsuit.si.com/swimsuit/video/",	"l":"Swimsuit" }
	]
});
