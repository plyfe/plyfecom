//FOOD FNR PRODUCTION AD RESTRICTIONS
var adRestrictionManager = new AdRestrictionManager();



// DEFAULT RULES //

// turn off all leaderboards on section fronts site wide
var default1 = new AdDefault();
default1.addParameter("adtype", "LEADERBOARD");
default1.addParameter("Type", "section");
default1.display=false;
//adRestrictionManager.adDefaults.push(default1);

// turn off leaderboard on homepage
var default2 = new AdDefault();
default2.addParameter("adtype", "LEADERBOARD");
default2.addParameter("Type", "homepage");
default2.display=false;
adRestrictionManager.adDefaults.push(default2);

// turn off leaderboard on single video asset
var default3 = new AdDefault();
default3.addParameter("adtype", "LEADERBOARD");
default3.addParameter("Type", "video");
default3.display=false;
adRestrictionManager.adDefaults.push(default3);

// turn off leaderboard on video channel
var default4 = new AdDefault();
default4.addParameter("adtype", "LEADERBOARD");
default4.addParameter("Type", "video-channel");
default4.display=false;
adRestrictionManager.adDefaults.push(default4);

// turn off leaderboard on video player
var default5 = new AdDefault();
default5.addParameter("adtype", "LEADERBOARD");
default5.addParameter("Type", "video-player");
default5.display=false;
adRestrictionManager.adDefaults.push(default5);

// turn off leaderboard on search page
var default6 = new AdDefault();
default6.addParameter("adtype", "LEADERBOARD");
default6.addParameter("Type", "search");
default6.display=false;
adRestrictionManager.adDefaults.push(default6);

// turn off Exchange on Universal Landing Page
var default7 = new AdDefault();
default7.addParameter("adtype", "EXCHANGE");
default7.addParameter("Type", "universal-landing");
default7.display=false;
adRestrictionManager.adDefaults.push(default7);


// DEFAULT RULE EXCEPTIONS //

// turn on Exchange on SHOWS Section Front
var restrictionExchange1 = new AdRestriction();
restrictionExchange1.addParameter("adtype", "EXCHANGE");
restrictionExchange1.addParameter("UniqueID", "food|universal-landing|c79030d3-e782-4b1e-9c47-fbcced428765|1");
restrictionExchange1.isActive = false;
restrictionExchange1.isIframe = false;
adRestrictionManager.restriction.push(restrictionExchange1);

// turn on Exchange on CHEFS Section Front
var restrictionExchange2 = new AdRestriction();
restrictionExchange2.addParameter("adtype", "EXCHANGE");
restrictionExchange2.addParameter("UniqueID", "food|universal-landing|a4f42a91-b160-4fec-842e-e38de7aa6634|1");
restrictionExchange2.isActive = false;
restrictionExchange2.isIframe = false;
adRestrictionManager.restriction.push(restrictionExchange2);

// turn on Exchange on RECIPES Section Front
var restrictionExchange3 = new AdRestriction();
restrictionExchange3.addParameter("adtype", "EXCHANGE");
restrictionExchange3.addParameter("UniqueID", "food|universal-landing|4d24061e-a71e-4e63-b213-2938db662de7|1");
restrictionExchange3.isActive = false;
restrictionExchange3.isIframe = false;
adRestrictionManager.restriction.push(restrictionExchange3);

// turn on Exchange on RESTAURANTS Section Front
var restrictionExchange4 = new AdRestriction();
restrictionExchange4.addParameter("adtype", "EXCHANGE");
restrictionExchange4.addParameter("UniqueID", "food|universal-landing|766f6117-3a41-478c-9ec1-e0f963e7494d|1");
restrictionExchange4.isActive = false;
restrictionExchange4.isIframe = false;
adRestrictionManager.restriction.push(restrictionExchange4);

/*****
 * TURN OFF LEADERBOARDS
 */
 
// turn off leaderboard on section front: Recipes
var restrictionLeader1 = new AdRestriction();
restrictionLeader1.addParameter("adtype", "LEADERBOARD");
restrictionLeader1.addParameter("UniqueID", "food|universal-landing|4d24061e-a71e-4e63-b213-2938db662de7|1");
restrictionLeader1.isActive = false;
restrictionLeader1.isIframe = false;
adRestrictionManager.restriction.push(restrictionLeader1);

// turn off leaderboard on section front: Shows
var restrictionLeader2 = new AdRestriction();
restrictionLeader2.addParameter("adtype", "LEADERBOARD");
restrictionLeader2.addParameter("UniqueID", "food|universal-landing|c79030d3-e782-4b1e-9c47-fbcced428765|1");
restrictionLeader2.isActive = false;
restrictionLeader2.isIframe = false;
adRestrictionManager.restriction.push(restrictionLeader2);

// turn off leaderboard on section front: Chefs
var restrictionLeader3 = new AdRestriction();
restrictionLeader3.addParameter("adtype", "LEADERBOARD");
restrictionLeader3.addParameter("UniqueID", "food|universal-landing|a4f42a91-b160-4fec-842e-e38de7aa6634|1");
restrictionLeader3.isActive = false;
restrictionLeader3.isIframe = false;
adRestrictionManager.restriction.push(restrictionLeader3);

// turn off leaderboard on section front: Restaurants
var restrictionLeader4 = new AdRestriction();
restrictionLeader4.addParameter("adtype", "LEADERBOARD");
restrictionLeader4.addParameter("UniqueID", "food|universal-landing|766f6117-3a41-478c-9ec1-e0f963e7494d|1");
restrictionLeader4.isActive = false;
restrictionLeader4.isIframe = false;
adRestrictionManager.restriction.push(restrictionLeader4);

// turn off leaderboard on Share our Strength page
var restrictionLeader5 = new AdRestriction();
restrictionLeader5.addParameter("adtype", "LEADERBOARD");
restrictionLeader5.addParameter("UniqueID", "food|free-form-text|8f28e3b7-afa5-45ed-9e04-4b23a4ab7b47|1");
restrictionLeader5.isActive = false;
restrictionLeader5.isIframe = false;
adRestrictionManager.restriction.push(restrictionLeader5);

// turn on leaderboard on Star Salvation page...can remove 8/17/14
var restrictionLeader6 = new AdRestriction();
restrictionLeader6.addParameter("adtype", "LEADERBOARD");
restrictionLeader6.addParameter("UniqueID", "food|video-channel|82c26563-84e5-46b0-a43b-7580123b8a27|1");
restrictionLeader6.isActive = false;
restrictionLeader6.isIframe = false;
adRestrictionManager.restriction.push(restrictionLeader6);
/*
 * END TURN OFF LEADERBOARDS
 ******/
 
 
 

// MISCELLANEOUS //

// turn off Exchange on Recipe Listing
var restrictionExchange5 = new AdRestriction();
restrictionExchange5.addParameter("adtype", "EXCHANGE");
restrictionExchange5.addParameter("Type", "asset-recipes");
restrictionExchange5.isActive = false;
restrictionExchange5.isIframe = false;
adRestrictionManager.restriction.push(restrictionExchange5);






// FNR PREVIEW RESTRICTIONS //
// restrictions disabled 1-15-14 JT

// turn off Superstitial on FNR Preview
var restrictionPreview1 = new AdRestriction();
restrictionPreview1.addParameter("adtype", "SUPERSTITIAL");
restrictionPreview1.isActive = false;
restrictionPreview1.isIframe = false;
//adRestrictionManager.restriction.push(restrictionPreview1);

// turn off Exchange on FNR Preview
var restrictionPreview2 = new AdRestriction();
restrictionPreview2.addParameter("adtype", "EXCHANGE");
restrictionPreview2.isActive = false;
restrictionPreview2.isIframe = false;
//adRestrictionManager.restriction.push(restrictionPreview2);

// turn off Logo on FNR Preview
var restrictionPreview3 = new AdRestriction();
restrictionPreview3.addParameter("adtype", "LOGO");
restrictionPreview3.isActive = false;
restrictionPreview3.isIframe = false;
//adRestrictionManager.restriction.push(restrictionPreview3);

// turn off 300x150 on FNR Preview
var restrictionPreview4 = new AdRestriction();
restrictionPreview4.addParameter("adtype", "SPONSORSHIP_CONTENT");
restrictionPreview4.isActive = false;
restrictionPreview4.isIframe = false;
//adRestrictionManager.restriction.push(restrictionPreview4);








(function( window ) {

/* $.toJSON extension */
(function($){var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var type=typeof o;if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return''+o;}
if(type==='string'){return $.quoteString(o);}
if(type==='object'){if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(o.constructor===Date){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i])||'null');}
return'['+ret.join(',')+']';}
var name,val,pairs=[];for(var k in o){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type==='function'||type==='undefined'){continue;}
val=$.toJSON(o[k]);pairs.push(name+':'+val);}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){return eval('('+src+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){var filtered=src.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+src+')');}else{throw new SyntaxError('Error parsing JSON, source is not valid.');}};$.quoteString=function(string){if(string.match(escapeable)){return'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+string+'"';};})(jQuery);

window.clog = function() { if ( window.console && window.console.log ) { window.console.log( arguments ); } };
if ( typeof window.csADS != 'undefined' ) { return false; }

( window.csADS = function( options ) {
	return new window.csADS.fn.init( options );
}).fn = prototype = {
	
	init : function( options ) {
	},
	
	setupMessage : function() {
		/* create some listeners for the parent page */
		if ( window.attachEvent ) {
			window.attachEvent( 'onmessage', this.message );
		} else if ( window.addEventListener ) {
			window.addEventListener( 'message', this.message, false );
		}
	},
	
	message : function( event ) {
		if ( event && event.data && typeof event.data === 'string' && event.data.indexOf( 'csADS' ) != -1 ) {
			var data	= $.parseJSON( event.data ) || null;
			
			if ( data ) {
				var fn		= typeof data.fn != 'undefined' ? data.fn : null,
					HTML	= typeof data.HTML != 'undefined' ? data.HTML : '';
				
				/* run any supplied instructions from iframe */
				if ( fn ) {
					eval( '(' + decodeURI( fn ) + ')();' );
				}
			}
		}
	}
};
window.csADS.fn.init.prototype = window.csADS.fn;
/* setup postMessage */
window.csADS().setupMessage();

})( window );



 
 



 


 

