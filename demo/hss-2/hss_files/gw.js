//ag-develop-unit 14.06.20-779-779 (2014-06-20 12:59:34 GMT)
var rsi_now= new Date();
var rsi_csid= 'J06575';if(typeof(csids)=="undefined"){var csids=[rsi_csid];}else{csids.push(rsi_csid);};function rsiClient(Fa){this._rsiaa=Fa;this._rsiba=1;this._rsica=1;this._rsida=0;this._rsiea=0;this._rsifa=0;this._rsiga="1204111";this._rsiha="pix04.revsci.net";this._rsiia="js";this._rsija="b";this._rsika="3";this._rsila=3;this._rsima=1;this._rsina=0;this._rsioa=new Array();this._rsipa=0;this._rsiqa=null;this._rsira=null;this._rsisa=null;this._rsita=null;this._rsiua=null;this._rsiva=null;this._rsiwa=0;this.DM_cat=function(Ga){this._rsiqa=Ga;};this.DM_name=function(Ha){this._rsira=Ha;};this.DM_keywords=function(st){this._rsisa=st;};this.DM_event=function(Ia){this._rsita=Ia;};this.DM_addToLoc=function(n,v){this._rsiua=_rsixa(this._rsiua,n,v);};this.DM_addEncToLoc=function(n,v){this.DM_addToLoc(_rsiya(n),_rsiya(v));};this.DM_setLoc=function(u){this._rsiua=u;};this.rsi_c=function(Fa){this._rsiaa=Fa;};this.rsi_ral=function(Ja){this._rsiba=Ja;};this.rsi_riu=function(Ka){this._rsica=Ka;};this.rsi_tiu=function(La){this._rsida=La;};this.rsi_m=function(Ma){this._rsiea=Ma;};this.rsi_dw=function(Na){this._rsifa=Na;};this.rsi_s=function(Oa){this._rsiha=Oa;};this.rsi_t=function(Pa){this._rsiia=Pa;};this.rsi_en=function(Qa){this._rsija=Qa;};this.rsi_cn=function(Ra){this._rsika=Ra;};this.rsi_us=function(Sa){this._rsila=Sa;};this.rsi_ra=function(ra){this._rsima=ra;};this.rsi_ieac=function(ac){this._rsina=ac;};this.DM_tag=function(){var Ta;if(this._rsipa==0||this._rsiea==1){if(typeof(DM_prepClient)=="function"){try{DM_prepClient(this._rsiaa,this);}catch(ignore){}}var Ua=this._rsiza();if(this._rsiia=="gif"){Ta=new Image(2,3);Ta.src=Ua;this._rsioa[this._rsioa.length]=Ta;}else if(this._rsiia=="js"){if(this._rsifa==1){document.write("<script language=\"JavaScript\" type=\"text/javascript\" src=\""+Ua+"\"><"+"/script>");}else{var Va=document.createElement("script");Va.language="JavaScript";Va.type="text/javascript";Va.src=Ua;var Wa=(document.body==null)?document.getElementsByTagName("head")[0]:document.body;if(this._rsina&&_rsiAa()){Wa.appendChild(Va);}else{Wa.insertBefore(Va,Wa.firstChild);}Ta=Va;}}this._rsipa=1;}this.rsi_r();return Ta;};this._rsiza=function(){var Xa="";this.DM_addEncToLoc("_rsiL",this._rsiwa);Xa="DM_LOC="+_rsiya(this._rsiua);if(this._rsiqa){Xa+="&DM_CAT="+_rsiya(this._rsiqa);}if(this._rsita){Xa+="&DM_EVT="+_rsiya(this._rsita);}if(this._rsisa){Xa+="&DM_KYW="+_rsiya(this._rsisa);}if(this._rsica==1&&this._rsiva){Xa+="&DM_REF="+_rsiya(this._rsiva);}if(this._rsida==1){Xa+="&DM_TIT="+_rsiya(document.title);}if(this._rsira){Xa+="&DM_NAM="+_rsiya(this._rsira);}Xa+="&DM_EOM=1";var Ya="http"+(location.protocol=="https:"?"s":"")+"://";var Za="/"+this._rsiaa+"/"+this._rsija+this._rsika+"/0/"+this._rsila+"/"+this._rsiga+"/";var $a=Math.floor(Math.random()*1000000000)+"."+this._rsiia;var ab=Ya+this._rsiha+Za+$a+"?D="+_rsiya(Xa)+"&C="+_rsiya(csids);var bb=ab.length;if(bb>=2000){if(ab.charAt(1998)=='%'){ab=ab.substr(0,1998);}else if(ab.charAt(1999)=='%'){ab=ab.substr(0,1999);}else{ab=ab.substr(0,2000);}if(ab.charAt(ab.length-3)=='%'&&ab.charAt(ab.length-2)=='2'&&ab.charAt(ab.length-1)=='5'){ab=ab.substr(0,ab.length-3);}}return ab;};this.rsi_r=function(){var cb;var db;var eb=0;var fb=0;if(this._rsiba==1){var gb=window;while(true){try{cb=gb.document.location;db=gb.document.referrer;eb=fb;}catch(notAllowed){}if(gb==window.top||gb==gb.parent){break;}gb=gb.parent;fb++;}}else{cb=window.document.location;db=window.document.referrer;}this._rsiwa=fb-eb;this._rsiva=this._rsima?_rsiBa(db.toString()):db.toString();if(this._rsiwa==0){this._rsiua=(this._rsima)?_rsiBa(cb.href):cb.href;}else{this._rsiua=this._rsiva;}this._rsiqa=null;this._rsira=null;this._rsisa=null;this._rsita=null;};this.rsi_r();}var _rsiya;if(typeof(encodeURIComponent)=="function"){_rsiya=encodeURIComponent;}else{var _rsiCa=new RegExp("[\x00-\x20]|[\x22-\x26]|[\x2B-\x2C]|\x2F|[\x3A-\x40]|[\x5B-\x5E]|\x60|[\x7B-\x7D]|[\x7F-\uFFFF]","g");_rsiya=function(v){return v.toString().replace(_rsiCa,_rsiDa);}}function _rsixa(u,n,v){return u+(u.indexOf("?")==-1?"?":"&")+n+"="+v;}function _rsiBa(u){var i=u.indexOf('#');return(i>=0)?u.substr(0,i):u;}function _rsiEa(i){var hb=i.toString(16).toUpperCase();return hb.length<2?"0"+hb:hb;}function _rsiDa(c){var i=c.charCodeAt(0);if(isNaN(i))return "";if(i<128)return "%"+_rsiEa(i);if(i<2048)return "%"+_rsiEa(0xC0+(i>>6))+"%"+_rsiEa(0x80+(i&0x3F));if(i<65536)return "%"+_rsiEa(0xE0+(i>>12))+"%"+_rsiEa(0x80+(i>>6&0x3F))+"%"+_rsiEa(0x80+(i&0x3F));return "%"+_rsiEa(0xF0+(i>>18))+"%"+_rsiEa(0x80+(i>>12&0x3F))+"%"+_rsiEa(0x80+(i>>6&0x3F))+"%"+_rsiEa(0x80+(i&0x3F));}function _rsiAa(){return(navigator.appName=='Microsoft Internet Explorer');}window[rsi_csid]=new rsiClient(rsi_csid);
function DM_cat(aa){window[rsi_csid].DM_cat(aa);}function DM_name(ba){window[rsi_csid].DM_name(ba);}function DM_keywords(kw){window[rsi_csid].DM_keywords(kw);}function DM_event(ca){window[rsi_csid].DM_event(ca);}function DM_addToLoc(n,v){window[rsi_csid].DM_addToLoc(n,v);}function DM_addEncToLoc(n,v){window[rsi_csid].DM_addEncToLoc(n,v);}function DM_setLoc(u){window[rsi_csid].DM_setLoc(u);}function DM_tag(){window[rsi_csid].DM_tag();}
if(window[rsi_csid])window[rsi_csid].rsi_m(1);else rsi_m(1);
function asi_addElem(e){var p=document.body==null?document.getElementsByTagName('head')[0]:document.body;p.insertBefore(e,p.firstChild);}
function asi_makeIFrame(u,h,w){var e=document.createElement("iframe");e.height=h?h:0;e.width=w?w:0;e.frameBorder=0;e.src=u;return e;}
function asi_makeJS(u){var e=document.createElement("script");e.language="JavaScript";e.type="text/javascript";e.src=u;return e;}
function asi_makeGIF(u){var i=new Image(2,2);i.src=u;return i;}
function asi_scheme(){return "http"+(location.protocol=="https:"?"s":"");}
function asi_addOnSegs(wa){var xa=DM_onSegsAvailable;var ya=rsi_csid.toLowerCase();return function(za,Aa){wa(za,Aa);if(typeof(xa)=="function"&&Aa==ya){xa(za,Aa);}};}

var DM_onSegsAvailable = asi_addOnSegs(function(userSegs,csid){
asi_makeGIF("//cm.g.doubleclick.net/pixel?google_nid=audsci&google_cm");
asi_makeGIF("//www.googleadservices.com/pagead/conversion/1031221371/?label=n822CPPRiAIQ--Dc6wM&guid=ON&script=0");
});
function _asiTICallback(score, zip, byear1, sex1, ts1, byear2, sex2, ts2, segs) {
  var segArr = [];var segQS = '';if(segs!='') {if(segs.length>1){segArr = segs.split(',');}else{segArr = [segs]}
  for(var i=0; i<segArr.length; i++) {if(i < segArr.length-1) {segQS += segArr[i] + '%253DT%2526';}else {segQS += segArr[i] + '%253DT';}}}else{segQS+='segs%253D';}
  asi_addElem(asi_makeJS('http://pix04.revsci.net/D08734/a1/0/3/0.js?D=DM_LOC%3Dhttp%253A%252F%252Fti.com%253Fscore%253D' + score
         + '%2526zip%253D' + zip + '%2526byear1%253D' + byear1 + '%2526sex1%253D' + sex1 + '%2526ts1%253D' + ts1
         + '%2526byear2%253D' + byear2 + '%2526sex2%253D' + sex2 + '%2526ts2%253D' + ts2 + '%2526' + segQS));
}
asi_addElem(asi_makeJS('http://adadvisor.net/adscores/g.js?sid=9227243633'));
asi_addElem(asi_makeJS('' + 'http' + (location.protocol=='https:'?'s':'') + '://pix04.revsci.net/' + rsi_csid + '/a4/0/0/pcx.js?csid=J06575'));
function createRSIActivateCB(custCode){
   var prevDM_onSegsAvail = DM_onSegsAvailable;
   return function(userSegs,csid) {
      if (csid == custCode) { asi_addElem(asi_makeJS(asi_scheme() + '://ads.revsci.net/adserver/ako?activate&csid='+csid)); }
      if (typeof(prevDM_onSegsAvail) == "function") { prevDM_onSegsAvail(userSegs,csid); }
   };
};
var DM_onSegsAvailable = createRSIActivateCB(rsi_csid.toLowerCase());
function createDoubleClickBidManagerCB(custCode){
   var prevDM_onSegsAvail = DM_onSegsAvailable;
   var origCsid = rsi_csid.toLowerCase();
   custCode = custCode.toLowerCase();
   return function(userSegs,csid) {
		if (csid == custCode) {
			if (userSegs.length > 0) {
				var url = asi_scheme() + "://3266374.fls.doubleclick.net/activityi;src=3266374;type=audsci;cat=audsci;u1=";
				var csidInSegId;
				
				for (var x = 0; x < userSegs.length && url.length < 2000; ++x) {
					csidInSegId = userSegs[x].toLowerCase().substr(0,6);    
					
					if(csidInSegId == custCode){
						url += userSegs[x].toLowerCase() + "-";
					}                
				}
				url += ";ord=1;num=1?";
				asi_makeGIF(url);
			}
		}
		if (typeof(prevDM_onSegsAvail) == "function" && csid == origCsid) {
			 prevDM_onSegsAvail(userSegs,csid);
		}	
	};
};
var DM_onSegsAvailable = createDoubleClickBidManagerCB("J11259");
asi_addElem(asi_makeJS("//pix04.revsci.net/J11259/a0/0/0/0.js"));
if(window[rsi_csid])window[rsi_csid].DM_tag();else DM_tag();
