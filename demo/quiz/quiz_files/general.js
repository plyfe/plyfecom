var Localization = function () {
        this.test_mode = false;
        this.language = null;
        this.non_english = null;
        this.init = function () {
            if (typeof BF_STATIC != "undefined") {
                localize.language = localize.returnLang();
                localize.non_english = localize.nonEnglish();
                localize.test_mode = localize.inTestMode()
            }
        };
        this.returnLang = function () {
            if (typeof BF_STATIC.language != "undefined") {
                return BF_STATIC.language
            } else {
                return null
            }
        };
        this.nonEnglish = function () {
            if (typeof BF_STATIC.non_english != "undefined" && BF_STATIC.non_english) {
                return true
            } else {
                return false
            }
        };
        this.inTestMode = function () {
            if (typeof BF_STATIC.translation_debug != "undefined" && BF_STATIC.translation_debug && localize.non_english && localize.language) {
                return true
            } else {
                return false
            }
        };
        this.dictionary = function () {
            if (!localize.language) {
                return null
            }
            try {
                return eval(localize.language + "_dictionary")
            } catch (e) {
                return null
            }
        };
        this.testMode = function (str) {
            return (str + " (" + localize.language + ")")
        };
        this.translate = function (string, args) {
            if (!string || typeof string != "string") {
                return null
            }
            var translation, start_space = string.charAt(0) == " " ? true : false,
                end_space = string.charAt(string.length - 1) == " " ? true : false;
            string = localize.strip_spaces(string);
            translation = localize.dictionary() && localize.dictionary()[string] ? localize.dictionary()[string] : string;
            if (translation && args && args.variables) {
                translation = localize.var_replace(translation, args.variables)
            }
            if (start_space) {
                translation = " " + translation
            }
            if (end_space) {
                translation = translation + " "
            }
            if (localize.test_mode) {
                translation = localize.testMode(translation)
            }
            return translation
        };
        this.strip_spaces = function (string) {
            if (string.charAt(0) == " ") {
                string = string.slice(1, string.length - 1)
            }
            if (string.charAt(string.length - 1) == " ") {
                string = string.slice(0, string.length - 2)
            }
            return string
        };
        this.var_replace = function (string, vars) {
            var variable, counter, subString, split = string.split("#{"),
                length = split.length;
            for (counter = 0; counter < length; counter++) {
                subString = split[counter];
                if (subString) {
                    subString = subString.split("}")[0];
                    variable = (vars.hasOwnProperty(subString) ? vars[subString].toString() : null);
                    if (variable) {
                        variable = localize.translate(variable);
                        string = string.replace("#{" + subString + "}", variable)
                    }
                }
            }
            return string
        }
    };
var localize = new Localization();
localize.init();
var local = localize;
local.t = local.translate;
var BF_SiteSpeedUpload = function () {
        this._start_track_time = {};
        this.opt_sampleRate = 1;
        this.filter_empty_time = true;
        this.start_track = function (a) {
            bf_site_speed._start_track_time[a] = new Date().getTime()
        };
        this.end_track = function (b, a, g) {
            var f = new Date().getTime();
            var c = bf_site_speed._start_track_time[b] ? f - bf_site_speed._start_track_time[b] : 0;
            delete(bf_site_speed._start_track_time[b]);
            if ((bf_site_speed.filter_empty_time && c) || !bf_site_speed.filter_empty_time) {
                gtrack.track_timing(b, a, c, g, bf_site_speed.opt_sampleRate)
            }
        }
    };
var s_account = "buzzfeedprod";
var s = s_gi(s_account);
s.debugTracking = false;
s.trackingServer = "buzzfeed.d1.sc.omtrdc.net";
s.visitorNamespace = "buzzfeed";
s.trackDownloadLinks = false;
s.trackExternalLinks = false;
s.trackInlineStats = true;
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters = "javascript:";
s.linkLeaveQueryString = false;
s.linkTrackVars = "None";
s.linkTrackEvents = "None";
s.usePlugins = true;

function s_doPlugins(a) {}
s.doPlugins = s_doPlugins;
var s_code = "",
    s_objectID;

function s_gi(o, p, F) {
    var r = "s.version='H.27.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisitorID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalyticsVisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplementalDataID) && (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
        A = window,
        g = A.s_c_il,
        b = navigator,
        D = b.userAgent,
        B = b.appVersion,
        q = B.indexOf("MSIE "),
        f = D.indexOf("Netscape6/"),
        z, k, h, t, E;
    if (o) {
        o = o.toLowerCase();
        if (g) {
            for (h = 0; h < 2; h++) {
                for (k = 0; k < g.length; k++) {
                    E = g[k];
                    t = E._c;
                    if ((!t || t == "s_c" || (h > 0 && t == "s_l")) && (E.oun == o || (E.fs && E.sa && E.fs(E.oun, o)))) {
                        if (E.sa) {
                            E.sa(o)
                        }
                        if (t == "s_c") {
                            return E
                        }
                    } else {
                        E = 0
                    }
                }
            }
        }
    }
    A.s_an = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    A.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
    A.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
    A.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)");
    A.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
    A.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
    A.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a");
    A.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
    r = s_d(r);
    if (q > 0) {
        z = parseInt(k = B.substring(q + 5));
        if (z > 3) {
            z = parseFloat(k)
        }
    } else {
        if (f > 0) {
            z = parseFloat(D.substring(f + 10))
        } else {
            z = parseFloat(B)
        }
    }
    if (z < 5 || B.indexOf("Opera") >= 0 || D.indexOf("Opera") >= 0) {
        r = s_ft(r)
    }
    if (!E) {
        E = new Object;
        if (!A.s_c_in) {
            A.s_c_il = new Array;
            A.s_c_in = 0
        }
        E._il = A.s_c_il;
        E._in = A.s_c_in;
        E._il[E._in] = E;
        A.s_c_in++
    }
    E._c = "s_c";
    (new Function("s", "un", "pg", "ss", r))(E, o, p, F);
    return E
}

function EventManagerBase() {
    this.EVENTS = {}
}
EventManagerBase.prototype = {
    constructor: EventManagerBase,
    observe: function (b, a) {
        if (!this.EVENTS[b]) {
            this.EVENTS[b] = {
                listeners: [],
                one_time_listeners: []
            }
        }
        if (this.EVENTS[b].listeners.indexOf(a) == -1) {
            this.EVENTS[b].listeners.push(a)
        }
    },
    observe_once: function (b, a) {
        if (!this.EVENTS[b]) {
            this.EVENTS[b] = {
                listeners: [],
                one_time_listeners: []
            }
        }
        if (this.EVENTS[b].one_time_listeners.indexOf(a) == -1) {
            this.EVENTS[b].one_time_listeners.push(a)
        }
    },
    stop_observing: function (c, b) {
        if (this.EVENTS[c]) {
            var a = this.EVENTS[c].listeners.indexOf(b);
            if (a > -1) {
                this.EVENTS[c].listeners.splice(a, 1)
            } else {
                return false
            }
            return true
        } else {
            return false
        }
    },
    fire: function (f, g, h) {
        if (BF_STATIC && BF_STATIC.bf_env && BF_STATIC.bf_env == "dev") {
            console.log("Firing: " + f);
            if (BF_STATIC.bf_test_mode) {
                if (!this.eventStack) {
                    this.eventStack = {}
                }
                if (!this.eventStack[f]) {
                    this.eventStack[f] = []
                }
                this.eventStack[f].push({
                    ev: f,
                    data: g,
                    target: h
                });
                if (this.eventListeners && this.eventListeners[f]) {
                    this.eventListeners[f].map(function (k) {
                        if (!k.fulfilled) {
                            k.fulfilled = true;
                            k.data = g;
                            k.target = h
                        }
                    })
                }
            }
        }
        window[f] = true;
        if (typeof g == "undefined") {
            g = {}
        }
        if (this.EVENTS[f]) {
            var c = this.EVENTS[f].listeners;
            for (var a = 0; a < c.length; a++) {
                this._single_fire(c[a], g, h)
            }
            for (var b; b = this.EVENTS[f].one_time_listeners.pop();) {
                this._single_fire(b, g, h)
            }
        }
    },
    _single_fire: function (a, c, f) {
        try {
            a(c, f)
        } catch (b) {
            console.dir(b)
        }
    }
};
if (BF_STATIC && BF_STATIC.bf_env && BF_STATIC.bf_env == "dev" && BF_STATIC.bf_test_mode) {
    EventManagerBase.prototype.eventStack = {};
    EventManagerBase.prototype.findEventInStack = function (a) {
        if (this.eventStack[a]) {
            return this.eventStack[a].pop()
        } else {
            return null
        }
    };
    EventManagerBase.prototype.clearEventStack = function (a) {
        if (this.eventStack[a]) {
            this.eventStack[a] = []
        }
    };
    EventManagerBase.prototype.eventListeners = {};
    EventManagerBase.prototype.addEventListener = function (a) {
        if (!this.eventListeners[a]) {
            this.eventListeners[a] = []
        }
        var b = {
            id: (new Date().getTime() + Math.random().toString().substr(2, 3)),
            fulfilled: false
        };
        this.eventListeners[a].push(b);
        return b.id
    };
    EventManagerBase.prototype.acceptEventOrAddEventListener = function (b) {
        if (!this.eventListeners[b]) {
            this.eventListeners[b] = []
        }
        var a = this.findEventInStack(b);
        var c = {
            id: (new Date().getTime() + Math.random().toString().substr(2, 3)),
            fulfilled: false
        };
        if (a) {
            c.fulfilled = true;
            c.data = a.data;
            c.target = a.target
        }
        this.eventListeners[b].push(c);
        return c.id
    };
    EventManagerBase.prototype.getEventListener = function (f, b) {
        try {
            var a = null;
            if (this.eventListeners[b]) {
                a = this.eventListeners[b].find(function (g) {
                    if (g.id == f) {
                        return true
                    } else {
                        return false
                    }
                })
            }
            return a
        } catch (c) {
            console.error(c)
        }
    }
}
var EventManager = new EventManagerBase();
var BuzzLoader = function () {
        var b = false;
        var a = {
            p1: [],
            p2: [],
            p3: [],
            p4: [],
            p5: [],
            p6: [],
            p7: [],
            p8: [],
            p9: [],
            p10: [],
            user: []
        };
        var c = function () {
                var f;
                for (f = 1; f <= 10; f++) {
                    a["p" + f].each(function (h) {
                        try {
                            h()
                        } catch (g) {
                            if (typeof window.BF_STATIC != "undefined" && BF_STATIC.bf_env == "dev") {
                                console.dir(g.message);
                                console.log(h)
                            }
                        }
                    })
                }
                b = true;
                a.user.each(function (g) {
                    g()
                })
            };
        return {
            waitForDOM: function () {
                if (Prototype.Browser.IE) {
                    if (!$("buzz-body")) {
                        setTimeout("BuzzLoader.waitForDOM();", 100)
                    } else {
                        c()
                    }
                } else {
                    document.observe("dom:loaded", c)
                }
            },
            callLoaded: function (f) {
                if (b) {
                    f()
                } else {
                    a.user.push(f)
                }
            },
            register: function (g, f) {
                if (b) {
                    g()
                }
                if (f > 10 || f < 1) {
                    return 0
                }
                a["p" + f].push(g);
                return 1
            },
            register_injection: function (f, g) {
                return BuzzLoader.register(function () {
                    setTimeout(function () {
                        BF_XSS.swift_injection(f)
                    }, 1)
                }, g)
            }
        }
    }();
BuzzLoader.waitForDOM();
BFW_COOKIE = "bf2-b";
BFW_INFO_COOKIE = "bf2-b_info";
DEFAULT_USER = "default_user";


function Tracker() {
    this.entries = [];
    this.registered = new Array();
    this.url = window.location.toString();
    this.url = this.url.replace(/#H\w+$/i, "");
    this.url = encodeURIComponent(this.url);
    if (typeof window.HASH_REFER != "undefined") {
        this.referrer = window.HASH_REFER
    } else {
        this.referrer = document.referrer.toString()
    }
    this.referrer = encodeURIComponent(this.referrer);
    this.network_cookie = BFW_Util.getCookie("BUZZ_WIDGET");
    if ((this.network_cookie && window.location.href.match(this.network_cookie)) || window.IS_HASH_WIDGET_CLICK) {
        if (this.url.indexOf(encodeURIComponent("?")) > 0) {
            this.url += encodeURIComponent("&w=1")
        } else {
            this.url += encodeURIComponent("?w=1")
        }
        BFW_Util.deleteCookie("BUZZ_WIDGET");
        if (Tracker.DEBUG) {
            console.debug("Tracking this page as a widget referrer %s", decodeURIComponent(this.url))
        }
    }
    this.defaults = {
        c: "",
        u: "",
        type: "",
        user: "",
        buzz: "",
        query: "",
        url: this.url,
        referrer: this.referrer
    };
    this.cloud = Cloud.servers[Math.floor(Math.random() * Cloud.servers.length)];
    this.source = "http://" + this.cloud + "/small.gif?type="
}
Tracker.gClick = function (a) {
    return
};
Tracker.video = function (a) {
    return
};
Tracker.browser = function (a) {
    return
};
Tracker.prototype = {
    setDefaults: function (a) {
        for (key in a) {
            this.defaults[key] = a[key]
        }
    },
    add: function (a, b) {
        valid = true;
        entry = {};
        for (key in this.defaults) {
            entry[key] = this.defaults[key]
        }
        for (key in a) {
            entry[key] = a[key]
        }
        if (b) {
            valid = false;
            if (BFW_Util.getCookie("BF-U")) {
                BFW_Util.deleteCookie("BF-U")
            }
        }
        if (valid) {
            this.entries.push(entry)
        }
    },
    run: function (h) {
        if (this.entries.length) {
            var b = this.entries.find(function (k) {
                return k.type == 100
            });
            if (b && b.query) {
                this.entries.unshift({
                    buzz: b.user,
                    user: b.user,
                    c: b.u,
                    u: b.u,
                    type: this.types.VXN_CLICK_IN,
                    types: [this.types.VXN_CLICK_IN],
                    domain: "",
                    query: "",
                    url: ""
                });
                this.entries.unshift({
                    buzz: "buzz",
                    user: "buzz",
                    c: "7BA7",
                    u: "7BA7",
                    type: this.types.VXN_CLICK_OUT,
                    types: [this.types.VXN_CLICK_OUT],
                    domain: "",
                    query: "",
                    url: ""
                })
            }
            if (this.DEBUG) {
                console.log("Tracking " + this.entries.length + " entry positions");
                this.entries.each(function (l) {
                    var k = {};
                    ["buzz", "query", "type", "user"].each(function (m) {
                        if (l[m]) {
                            k[m] = l[m] + "";
                            k[m] = k[m].split(",").first()
                        }
                    });
                    if (k.type == 30 || k.type == 35 && k.query) {
                        console.log([k.user, k.buzz, tracker.positions[k.query]])
                    } else {
                        if (l.type == "") {
                            console.log([k.user, k.buzz, "Primary page impression"])
                        } else {
                            if (l.type == "12") {
                                console.log([k.user, k.buzz, "Unique page impression"])
                            } else {
                                console.log([k.user, k.buzz, l.type])
                            }
                        }
                    }
                })
            }
            list = this.entries.shift();
            if (list.type != "") {
                list.referrer = ""
            }
            different = {};
            last = Object.clone(list);
            multiple = false;
            while (this.entries.length) {
                multiple = true;
                entry = this.entries.shift();
                if (entry.type != "") {
                    entry.referrer = ""
                }
                for (key in list) {
                    list[key] += "," + entry[key];
                    if (!different[key] && last[key] != entry[key]) {
                        different[key] = 1
                    }
                }
            }
            if (multiple) {
                for (key in list) {
                    if (!different[key] && key != "type") {
                        list[key] = list[key].replace(/,.*$/, "")
                    }
                }
            }
            var a = new Image;
            var g = list.type + "&user=" + list.user + "&buzz=" + list.buzz + "&url=" + list.url + "&query=" + list.query + "&referrer=" + list.referrer + "&c=" + list.c + "&u=" + list.u + "&z=" + (new Date).getTime();
            a.src = this.source + g;
            if (Tracker.DEBUG) {
                console.log("Pixel: ", list, (this.source + g))
            }
            try {
                if (Cloud.staging.sample > 0 && (Math.random() <= Cloud.staging.sample)) {
                    var c = "http://" + Cloud.staging.server + "/small.gif?type=";
                    (new Image()).src = c + g
                }
            } catch (f) {
                console.error(f)
            }
            this.pixels.push(a)
        }
    },
    track: function () {
        var reg_tracker = this.tracker.registered[this.index];
        var reg_event = reg_tracker.events[this.event];
        if (!reg_tracker.data_obj) {
            reg_tracker.data_obj = reg_tracker.data.length == 0 ? {} : eval("(" + reg_tracker.data + ")")
        }
        if (!reg_event.data_obj) {
            reg_event.data_obj = eval("(" + reg_event.data + ")")
        }
        $H(reg_event.data_obj).each(function (pair) {
            if (pair.key == "callback") {
                try {
                    eval(pair.value + "(" + reg_tracker.data + ");")
                } catch (e) {
                    console.error(e)
                }
                return true
            }
            if (!Object.isArray(pair.value)) {
                pair.value = [pair.value]
            }
            pair.value.each(function (query) {
                data = Object.clone(reg_tracker.data_obj);
                data.type = this.tracker.types[pair.key];
                data.query = query;
                this.tracker.add(data)
            }.bind(this))
        }.bind(this));
        if (this.run) {
            this.tracker.run()
        }
    },
    trackSiteClick: function (e) {
        var external_click = false;
        var ignore_click = false;
        el = e.element();
        if (e.srcElement) {
            el = e.srcElement
        } else {
            if (e.currentTarget) {
                el = e.currentTarget
            }
        }
        if (!el.hasAttribute("track") || (el.tagName && el.tagName.toLowerCase() == "img")) {
            if (el.parentNode && el.parentNode.tagName.toLowerCase() == "a") {
                el = el.parentNode
            }
        }
        if (el.getAttribute("track") == "") {
            return
        }
        track_data = eval("(" + el.getAttribute("track") + ")");
        if (el.hasAttribute("rel:gt_act") && el.getAttribute("rel:gt_act").match("share/")) {
            ignore_click = true
        }
        if (!track_data) {
            ignore_click = true
        }
        if (ignore_click) {
            return true
        }
        if (!el.href.match(/#/)) {
            external_click = true;
            track_data.referrer = encodeURIComponent(el.href)
        }
        if (BF_STATIC.tt_page == "Buzz" || BF_STATIC.tt_page == "User") {
            if (BF_STATIC.tt_page == "User") {
                track_data = tracker.defaults
            }
            if (typeof (hashtrack) != "undefined" && typeof (hashtrack.tracked_hash_tag) != "undefined") {
                track_data.types = ["101"]
            } else {
                track_data.types = ["100"]
            }
        }
        ctracker = new Tracker();
        for (i = 0; i < track_data.types.length; i++) {
            track_data.type = track_data.types[i];
            if (typeof track_data.queries != "undefined" && track_data.queries[i]) {
                track_data.query = track_data.queries[i]
            } else {
                if (external_click) {
                    track_data.query = encodeURIComponent(el.href)
                } else {
                    track_data.query = ""
                }
            }
            ctracker.add(track_data)
        }
        ctracker.run()
    },
    attach: function () {
        if (arguments && arguments.length > 0) {
            base_el = $(arguments[0])
        } else {
            base_el = document
        }
        var a = function (f) {
                if (f.hasClassName("flex_ab")) {
                    var h = f.id.match(/-(\d+)/);
                    if (h && BF_SELECTED_PROMOS[h[1]]) {
                        var c = BF_SELECTED_PROMOS[h[1]];
                        f.setAttribute("track_load", '{"FLEX_PRO_IMP": ' + c.promo_id + "}");
                        f.setAttribute("track_mousedown", '{"FLEX_PRO_CLICK": ' + c.promo_id + "}")
                    }
                }
                var k = f.getAttribute("track");
                var b = {
                    data: k,
                    events: {}
                };
                this.registered.push(b);
                this.events.each(function (m) {
                    if (!k) {
                        return false
                    }
                    try {
                        b.events[m] = {};
                        var l = f.readAttribute("track_" + m);
                        if (l) {
                            b.events[m].data = l;
                            if (m == "load") {
                                this.track.bind({
                                    tracker: this,
                                    event: m,
                                    index: (this.registered.length - 1)
                                })()
                            } else {
                                Event.observe(f, m, this.track.bind({
                                    tracker: this,
                                    event: m,
                                    index: (this.registered.length - 1),
                                    run: true
                                }))
                            }
                        }
                    } catch (n) {
                        console.error(n)
                    }
                }, this);
                var g;
                if ((BF_STATIC.tt_page == "Buzz" && objExists(buzzDetails) && buzzDetails.ad == "1") || BF_STATIC.tt_page == "User") {
                    g = $$(".PageContent a")
                } else {
                    if (BF_STATIC.tt_page == "Buzz") {
                        g = []
                    } else {
                        g = $A(f.getElementsByTagName("A"))
                    }
                }
                g.each(function (l) {
                    l.setAttribute("track", k);
                    Event.observe(l, "mousedown", Tracker.prototype.trackSiteClick);
                    if (f.getAttribute("rel:ext_track_pixel")) {
                        l.setAttribute("rel:ext_track_pixel", f.getAttribute("rel:ext_track_pixel"));
                        Event.observe(l, "mousedown", function (n) {
                            var m = new Image();
                            m.src = l.getAttribute("rel:ext_track_pixel");
                            if (Tracker.DEBUG) {
                                console.debug("External click tracking call made to %s", m.src)
                            }
                        })
                    }
                });
                f.removeClassName("track")
            }.bind(this);
        universal_dom.assign_handler({
            bucket: "track",
            handler: a
        });
        this.run()
    },
    registered: [],
    pixels: [],
    events: ["load", "mousedown", "mouseover", "submit"],
    positions: ["", "Header", "Homepage Flow", "B-Page Viral Alert", "Index Sidebar", "B-Page Sidebar", "C-Page Sidebar", "Non-ad Flow", "Non-ad Header", "Non-ad Sidebar Partner", "Non-ad Sidebar Raw", "Non-ad Sidebar Badge", "Non-ad Permalink Flow", "Non-ad Clickable Sidebar", "Non-ad Related Buzz", "Non-ad Viral Related Unit", "Viral Related Unit", "Bottom-Of-Page Promo", "Multi Homepage Flow", "Valley of The Nerds", "AOL Related Promo", "Targeted-B", "Targeted-C", "Targeted-A"],
    types: {
        REFERRER_DIRECT: 0,
        REFERRER_INTERNAL: 1,
        REFERRER_LINK: 2,
        REFERRER_SEARCH: 3,
        REFERRER_NETWORK: 4,
        SHARE_EMAIL: 5,
        SHARE_FACEBOOK: 6,
        SHARE_STUMBLE: 7,
        SHARE_DELICIOUS: 8,
        SHARE_DIGG: 9,
        SHARE_REDDIT: 10,
        SHARE_MIXX: 11,
        SHARE_TWITTER: 15,
        SHARE_FARK: 16,
        SHARE_MYSPACE: 17,
        SHARE_REBUZZ: 18,
        SHARE_RESERVED4: 19,
        SHARE_RESERVED5: 20,
        UNIQUE_VISIT: 12,
        WIDGET_IMPRESSION: 13,
        WIDGET_CLICK: 14,
        BUZZBOX_IMPRESSION: 21,
        BUZZBOX_CLICK: 22,
        VXN_CLICK_OUT: 23,
        VXN_CLICK_IN: 24,
        BUZZBOX_RES4: 25,
        BUZZBOX_RES5: 26,
        BUZZBOX_RES6: 27,
        BUZZBOX_RES7: 28,
        BUZZBOX_RES8: 29,
        PROMO_IMPRESSION: 30,
        PROMO_AD_IMP: 31,
        BOOST_IMPRESSION: 32,
        FLEX_PRO_IMP: 33,
        PROMO_IMP_RES4: 34,
        PROMO_CLICK: 35,
        PROMO_AD_CLICK: 36,
        BOOST_CLICK: 37,
        FLEX_PRO_CLICK: 38,
        PROMO_CLICK_RES4: 39,
        SITE_CLICK: 100,
        HASH_CLICK: 101
    }
};
Tracker.DEBUG = document.location.search.match(/tracker=true/) ? true : false;


function TT_cleanEntities(f) {
    var c = {
        160: "nbsp",
        161: "iexcl",
        164: "curren",
        162: "cent",
        163: "pound",
        165: "yen",
        166: "brvbar",
        167: "sect",
        168: "uml",
        169: "copy",
        170: "ordf",
        171: "laquo",
        172: "not",
        173: "shy",
        174: "reg",
        8482: "trade",
        175: "macr",
        176: "deg",
        177: "plusmn",
        178: "sup2",
        179: "sup3",
        180: "acute",
        181: "micro",
        182: "para",
        183: "middot",
        184: "cedil",
        185: "sup1",
        186: "ordm",
        187: "raquo",
        188: "frac14",
        189: "frac12",
        190: "frac34",
        191: "iquest",
        215: "times",
        247: "divide",
        192: "Agrave",
        193: "Aacute",
        194: "Acirc",
        195: "Atilde",
        196: "Auml",
        197: "Aring",
        198: "AElig",
        199: "Ccedil",
        200: "Egrave",
        201: "Eacute",
        202: "Ecirc",
        203: "Euml",
        204: "Igrave",
        205: "Iacute",
        206: "Icirc",
        207: "Iuml",
        208: "ETH",
        209: "Ntilde",
        210: "Ograve",
        211: "Oacute",
        212: "Ocirc",
        213: "Otilde",
        214: "Ouml",
        216: "Oslash",
        217: "Ugrave",
        218: "Uacute",
        219: "Ucirc",
        220: "Uuml",
        221: "Yacute",
        222: "THORN",
        223: "szlig",
        224: "agrave",
        225: "aacute",
        226: "acirc",
        227: "atilde",
        228: "auml",
        229: "aring",
        230: "aelig",
        231: "ccedil",
        232: "egrave",
        233: "eacute",
        234: "ecirc",
        235: "euml",
        236: "igrave",
        237: "iacute",
        238: "icirc",
        239: "iuml",
        240: "eth",
        241: "ntilde",
        242: "ograve",
        243: "oacute",
        244: "ocirc",
        245: "otilde",
        246: "ouml",
        248: "oslash",
        249: "ugrave",
        250: "uacute",
        251: "ucirc",
        252: "uuml",
        253: "yacute",
        254: "thorn",
        255: "yuml",
        338: "OElig",
        339: "oelig",
        352: "Scaron",
        353: "scaron",
        376: "Yuml",
        710: "circ",
        732: "tilde",
        8194: "ensp",
        8195: "emsp",
        8201: "thinsp",
        8204: "zwnj",
        8205: "zwj",
        8206: "lrm",
        8207: "rlm",
        8211: "ndash",
        8212: "mdash",
        8216: "lsquo",
        8217: "rsquo",
        8218: "sbquo",
        8220: "ldquo",
        8221: "rdquo",
        8222: "bdquo",
        8224: "dagger",
        8225: "Dagger",
        8230: "hellip",
        8240: "permil",
        8249: "lsaquo",
        8250: "rsaquo",
        8364: "euro"
    };
    var b = f.split("");
    var g = "";
    for (i = 0; i < b.length; i++) {
        var a = b[i].charCodeAt(0);
        if (c[a]) {
            g += "&" + c[a] + ";"
        } else {
            if (a > 127) {
                g += "&#" + a + ";"
            } else {
                g += b[i]
            }
        }
    }
    return g
}
var effect_callbacks = {};
var BF_Effect = {
    OpenMenu: function (c, f, b) {
        if (!b) {
            b = {}
        }
        b.top = (objExists(b.top) ? b.top : 0);
        b.left = (objExists(b.left) ? b.left : 0);
        var g = $(c);
        var a = g.positionedOffset();
        var c = {
            el: g,
            offSetTop: Number(a[1]) + Number(g.getHeight()),
            offSetLeft: Number(a[0])
        };
        $(c.el).insert(f);
        $(f).setStyle({
            top: c.offSetTop + b.top + "px",
            left: c.offSetLeft + b.left + "px",
            position: "absolute"
        }).show()
    },
    EffectCallbacks: function (a) {
        EventManager.fire("BF_Effect:" + a, {});
        if (objExists(effect_callbacks[a])) {
            effect_callbacks[a].each(function (b) {
                b()
            })
        }
    },
    EffectCallbacksAdd: function (a, b) {
        effect_callbacks[a] = [];
        effect_callbacks[a].push(b)
    },
    MarqueeOn: function (c, b) {
        if (!c) {
            return
        }
        if (!b) {
            b = 250
        }
        if (!$(c).hasClassName("marquee")) {
            $(c).addClassName("marquee");
            $(c).setAttribute("rel:mtext", $(c).innerHTML.replace("&nbsp;", " ").toString());
            $(c).setAttribute("rel:mstatus", "on");
            $(c).setAttribute("rel:mpos", 0)
        }
        if ($(c).hasClassName("marquee") && $(c).getAttribute("rel:mstatus") == "on") {
            var f = Number($(c).getAttribute("rel:mpos"));
            var a = $(c).getAttribute("rel:mtext").toString();
            $(c).innerHTML = a.substr(a.length - f, a.length);
            $(c).setAttribute("rel:mpos", f + 1)
        }
        setTimeout(function () {
            BF_Effect.MarqueeOn(c, b)
        }, b)
    },
    ScrollIntoView: function (k, g) {
        if (!$(k) || $(k).viewportOffset().top == 0 || (window.BF_STATIC && BF_STATIC.bf_test_mode)) {
            return
        }
        var c = false;
        Event.observe(window, "mousewheel", a);
        if (typeof (g) == "undefined") {
            g = 0.5
        }
        var b = document.viewport.getHeight();
        var f = $(k).getHeight();
        var n = document.viewport.getScrollOffsets().top + $(k).viewportOffset().top;
        var l = Math.ceil($(k).viewportOffset().top / g / 100);
        if ($(k).viewportOffset().top > 0) {
            if (b >= f) {
                var m = (b - f) / 2;
                n -= m;
                l = Math.ceil(($(k).viewportOffset().top - m) / g / 100)
            }
        }
        function a() {
            c = true
        }
        function h(q, p) {
            if (c) {
                Event.stopObserving(window, "mousewheel", a);
                return
            }
            var o = document.viewport.getScrollOffsets().top;
            if (Math.abs(q - o) < Math.abs(p)) {
                p = q - o
            }
            window.scrollTo(0, (o + p));
            if (o == document.viewport.getScrollOffsets().top) {
                Event.stopObserving(window, "mousewheel", a);
                return
            }
            if ((o + p) != q) {
                setTimeout(function () {
                    h(q, p)
                }, 1)
            } else {
                Event.stopObserving(window, "mousewheel", a);
                return
            }
        }
        h(n, l)
    },
    FadeOut: function (b, a, c, f) {
        if (f) {
            BF_Effect.EffectCallbacksAdd("FadeOut", f)
        }
        if (!c) {
            c = 50
        }
        if (!a) {
            $(b).setOpacity(1).show();
            a = 100 - 2;
            setTimeout(function () {
                BF_Effect.FadeOut(b, a, c)
            }, c)
        } else {
            a = a - 10;
            if (a > 0) {
                $(b).setOpacity(a / 100);
                setTimeout(function () {
                    BF_Effect.FadeOut(b, a, c)
                }, c)
            } else {
                $(b).hide();
                BF_Effect.EffectCallbacks("FadeOut")
            }
        }
    },
    FadeIn: function (b, a, c, g) {
        try {
            if (g) {
                BF_Effect.EffectCallbacksAdd("FadeIn", g)
            }
            if (!c) {
                c = 5
            }
            if (!a) {
                $(b).setOpacity(0.01);
                $(b).show();
                a = 1;
                setTimeout(function () {
                    BF_Effect.FadeIn(b, a, c)
                }, c)
            } else {
                a = a + 10;
                if (a < 100) {
                    $(b).setOpacity(a / 100);
                    setTimeout(function () {
                        BF_Effect.FadeIn(b, a, c)
                    }, c)
                } else {
                    $(b).setOpacity(1);
                    BF_Effect.EffectCallbacks("FadeIn")
                }
            }
        } catch (f) {
            console.error(f)
        }
    },
    SlideDown: function (a, b) {
        try {
            if (!$(a)) {
                return
            }
            if (!b) {
                b = 20
            }
            if (isIE7() || isIE8() || (window.BF_STATIC && BF_STATIC.bf_test_mode)) {
                $(a).setStyle({
                    height: "auto"
                }).show();
                return
            }
            if (!$(a).hasClassName("SlideDown")) {
                $(a).addClassName("SlideDown");
                $(a).setStyle({
                    height: "auto",
                    overflow: "hidden"
                });
                $(a).setAttribute("rel:SlideGoal", $(a).getHeight());
                $(a).setAttribute("rel:Step", Math.max(1, Math.round($(a).getHeight() / 20)));
                $(a).setStyle({
                    height: "0px"
                });
                $(a).show()
            } else {
                if ($(a).getHeight() >= (parseInt($(a).getAttribute("rel:SlideGoal")))) {
                    $(a).setStyle({
                        height: "auto",
                        overflow: "visible"
                    });
                    $(a).removeClassName("SlideDown");
                    return
                }
            }
            $(a).setStyle({
                height: (Number($(a).getHeight()) + Number($(a).getAttribute("rel:Step"))) + "px"
            });
            setTimeout(function () {
                BF_Effect.SlideDown(a, b)
            }, b)
        } catch (c) {
            console.error(c)
        }
    },
    SlideUp: function (a, b) {
        try {
            if (!$(a)) {
                return
            }
            if (!b) {
                b = 20
            }
            if (isIE7() || isIE8() || (window.BF_STATIC && BF_STATIC.bf_test_mode)) {
                $(a).hide();
                return
            }
            if (!$(a).hasClassName("SlideUp")) {
                $(a).addClassName("SlideUp");
                $(a).setAttribute("rel:Step", Math.max(1, Math.round($(a).getHeight() / 20)));
                $(a).setStyle({
                    overflow: "hidden"
                });
                $(a).show()
            } else {
                if ($(a).cleanHeight() <= (Number($(a).getAttribute("rel:Step")) * 2)) {
                    $(a).removeClassName("SlideUp");
                    $(a).hide();
                    return
                }
            }
            $(a).setStyle({
                height: (Number($(a).cleanHeight()) - Number($(a).getAttribute("rel:Step"))) + "px"
            });
            setTimeout(function () {
                BF_Effect.SlideUp(a, b)
            }, b)
        } catch (c) {
            console.error(c)
        }
    }
};
Object.extend(Element.Methods, {
    showOnScreen: function (a, b) {
        a.show();
        BF_Effect.ScrollIntoView(a, b)
    }
});
Object.extend(Element.Methods, {
    BFOnAttributeChange: function (b, c, a) {
        if (typeof b.observers == "undefined") {
            b.observers = {}
        }
        if (typeof b.observers[c] == "undefined") {
            b.observers[c] = []
        }
        b.observers[c].push(a)
    }
});
Object.extend(Element.Methods, {
    BFSetAttribute: function (b, c, f) {
        var a = b.getAttribute(c);
        b.setAttribute(c, f);
        if (typeof b.observers != "undefined" && typeof b.observers[c] != "undefined") {
            b.observers[c].each(function (g) {
                g({
                    element: b,
                    old_value: a,
                    new_value: f
                })
            })
        }
    }
});
Element.addMethods();
var BF_PrototypeExtend = {
    getTextDescendants: function (c, b) {
        var a = [];

        function f(g) {
            var h = g.firstChild;
            while (h) {
                if (Node.TEXT_NODE == h.nodeType) {
                    if (!b || ( !! b && !h.nodeValue.match(/^([\s\n\t\r]+)$/))) {
                        a.push(h)
                    }
                }
                if (Object.isElement(h) && ["script", "style", "iframe", "embed", "object", "head"].indexOf(h.tagName.toLowerCase()) == -1) {
                    f(h)
                }
                h = h.nextSibling
            }
        }
        f(c);
        return a
    }
};
Element.addMethods(BF_PrototypeExtend);
try {
    var bf_ee = bf_ee || {};
    bf_ee.keys = [], bf_ee.code = "38,38,40,40,37,39,37,39,66,65";
    document.observe("keydown", function (g) {
        try {
            bf_ee.keys.push(g.keyCode);
            if (bf_ee.keys.toString().indexOf(bf_ee.code) >= 0) {
                bf_ee.keys = [];
                var c = 0,
                    f = ["thumb.jpg", "thumb1.jpg", "thumb2.jpg", "thumb3.jpg", "thumb4.jpg", "thumb5.jpg", "thumb6.jpg", "thumb7.jpg"],
                    a = ["bigstory.jpg", "bigstory1.jpg", "bigstory2.jpg", "bigstory3.jpg", "bigstory4.jpg", "bigstory5.jpg"];
                $$(".thumb img, img.bf-image, img.thumb, .thumb-unit img, .thumbbb img, .sub_buzz_content img").each(function (b) {
                    b.src = BF_STATIC.static_root + "/images/public/slothsgiving/" + f[c % f.length];
                    c++
                });
                $$(".pinned-image, .bf-image-bigstory").each(function (b) {
                    b.src = BF_STATIC.static_root + "/images/public/slothsgiving/" + a[c % a.length];
                    c++
                });
                $("splash-image") && ($("splash-image").src = BF_STATIC.static_root + "/images/public/slothsgiving/splash.jpg");
                $$("body").first().setStyle({
                    "background-color": "#6235ac"
                });
                $$(".page_header").each(function (b) {
                    b.setStyle({
                        "border-bottom-color": "#6235ac"
                    })
                });
                bf_ee.words = $$("body").first().getTextDescendants(true);
                if (bf_ee.words.length > 0) {
                    bf_ee.words.each(function (m) {
                        var k = 0,
                            h = "",
                            b = 0,
                            n = m.nodeValue.length;
                        while (n > b) {
                            h += "sloths ";
                            b = h.length;
                            k++
                        }
                        h = h.substr(0, n);
                        m.nodeValue = h
                    })
                }
            }
        } catch (g) {}
    })
} catch (e) {}
var BF_UI = {
    init: function () {
        universal_dom.assign_handler({
            bucket: "toggle_bf_dropdown",
            event: "click",
            handler: BF_UI.openDropdownEventHandler
        });
        universal_dom.assign_handler({
            bucket: "bf_radio",
            event: "click",
            handler: function (c) {
                var a = c.target.up(".bf_radio");
                if (!a) {
                    return
                }
                var b = a.getAttribute("data-checked") * 1 ? 0 : 1;
                a.setAttribute("data-checked", b);
                if (b) {
                    a.down(".bf_radio_left", 0).addClassName("active");
                    a.down(".bf_radio_right", 0).removeClassName("active")
                } else {
                    a.down(".bf_radio_left", 0).removeClassName("active");
                    a.down(".bf_radio_right", 0).addClassName("active")
                }
                EventManager.fire("bf_ui:radio_toggle", {
                    target: a,
                    checked: b,
                    field: a.getAttribute("data-field")
                }, true)
            }
        });
        universal_dom.assign_handler({
            bucket: "animatedgifs",
            event: "click",
            handler: function () {
                var p = arguments[0].target;
                var o = 0;
                var l, c, b, q;
                if ($(p).up(".sub_buzz_content")) {
                    var m = $(p).up(".sub_buzz_content").down("img");
                    if (m.getAttribute("rel:fake_photorow")) {
                        o = 1;
                        l = parseInt(m.getStyle("left")) * -1;
                        c = parseInt(m.getStyle("top")) * -1;
                        b = parseInt(m.getStyle("width"));
                        q = parseInt(m.getStyle("height"))
                    }
                } else {
                    if ($(p).up(".grid_cell_image_wrapper")) {
                        var m = $(p).up(".grid_cell_image_wrapper").down("img");
                        o = 1;
                        l = parseInt(m.getStyle("left")) * -1;
                        c = parseInt(m.getStyle("top")) * -1;
                        b = parseInt(m.up().getStyle("width"));
                        q = parseInt(m.up().getStyle("height"))
                    } else {
                        return false
                    }
                }
                if (m) {
                    var k = m.getAttribute("src");
                    var g = k.substr(0, k.indexOf("static") - 1);
                    var h = m.getAttribute("rel:bf_image_src");
                    var a = m.getAttribute("width");
                    var n = m.getAttribute("height");
                    var f = m.getAttribute("rel:version");
                    $(p).hide();
                    m.insert({
                        after: "<iframe src='" + g + "/static/js/public/rubbable/loader.html?v=" + f + "&gif=" + h + "&width=" + a + "&height=" + n + (o ? "&vp_l=" + l + "&vp_t=" + c + "&vp_w=" + b + "&vp_h=" + q + "&c_w=" + a + "&c_h=" + n : "&vp_w=" + a + "&vp_h=" + n + "&vp_l=0&vp_t=0") + "' width='" + a + "' height='" + n + "' border='0' frameborder='0' scrolling='no'" + (o ? " style='left: " + (l * -1) + "px; top: " + (c * -1) + "px; position: relative;'" : "") + "></iframe>"
                    });
                    m.addClassName("hidden")
                }
            }
        })
    },
    closeDialog: function (k, c) {
        if (!c) {
            c = {}
        }
        var f = $(k);
        f.hide();
        if (typeof picks_controller != "undefined") {
            picks_controller.stop_spinner()
        }
        if (typeof user_post != "undefined" && user_post.show_video_preview) {
            $("video-form-preview").show()
        }
        var a = $(k).getElementsByTagName("IFRAME")[0];
        var b = a;
        if (a) {
            a = (a.contentWindow) ? a.contentWindow : (a.contentDocument.document) ? a.contentDocument.document : a.contentDocument
        }
        try {
            if (c.loadDefaultDiv) {
                if (a && a.document) {
                    if (a.document.getElementById(c.loadDefaultDiv)) {
                        a.document.getElementById(c.loadDefaultDiv).style.display = "block"
                    }
                }
            } else {
                if ($("user_post_preview_iframe")) {
                    var h = $("user_post_preview_iframe").contentWindow.document.getElementById("preview_div");
                    if (typeof h != "undefined" && h != null) {
                        h.innerHTML = '<img src="' + BF_STATIC.image_root + '/static/images/public/spinners/loading.gif" alt="spinner">'
                    }
                } else {
                    if (b) {
                        b.src = BF_STATIC.image_root + "/static/images/public/spinners/loading.gif"
                    }
                }
            }
            if (a && typeof a.minimizeEventHandler == "function") {
                a.minimizeEventHandler()
            }
        } catch (g) {
            console.error(g)
        }
        if (c.onComplete) {
            c.onComplete()
        }
        if (c.id == "user-image-edit") {
            BF_UI.closeDialog("super-image-edit")
        }
        f.fire("bf_ui:closeDialog")
    },
    create_or_show_dialog: function (f) {
        var k = 35;
        if (!f.width) {
            f.width = 800
        }
        if (!f.height) {
            f.height = 465
        }
        if (!f.scrolling) {
            f.scrolling = "no"
        }
        if (!$(f.id)) {
            if (!f.title) {
                f.title = "Dialog"
            }
            if (!f.url.match(/^https?:\/\//)) {
                f.url = f.url
            }
            f.m_height = f.height + k;
            var l = new Template(' 				<div class="bf_overlay_mask"></div> 				<div class="bf_dialog" style="width: #{width}px; height: #{m_height}px !important;"> 					<div class="bf_dialog_header"><span class="title">#{title}</span> <a href="javascript:;" onclick="BF_UI.closeDialog(\'#{id}\',{loadDefaultDiv:\'#{url}\'});return false;" class="close">&times;</a></div> 					<div class="bf_dialog_content" style="width: #{width}px; height: #{height}px !important;"> 						<iframe id="#{id}_iframe" src="#{url}" name="#{id}_iframe" frameborder="0" scrolling="#{scrolling}" allowTransparency="true" style="width: 100%; height: 100% !important"></iframe> 					</div> 				</div> 			');
            var g = l.evaluate(f);
            var a = document.createElement("div");
            a.id = f.id;
            a.style.display = "none";
            a.className = "bf_canvas";
            a.innerHTML = g;
            document.getElementsByTagName("BODY")[0].appendChild(a)
        } else {
            var b = $$("#" + f.id + " .bf_dialog").first(),
                m = $$("#" + f.id + " .bf_dialog_content").first();
            if (b) {
                b.setStyle({
                    height: (f.height + k) + "px !important",
                    width: f.width + "px"
                })
            }
            if (m) {
                m.setStyle({
                    height: f.height + "px !important",
                    width: f.width + "px"
                })
            }
        }
        var c = $(f.id + "_iframe");
        if (c && !escape(c.src).match(new RegExp(escape(f.url)))) {
            c.up(0).update('<iframe id="' + f.id + '_iframe" src="' + f.url + '" name="' + f.id + '_iframe" frameborder="0" scrolling="' + f.scrolling + '" allowTransparency="true" style="width: 100%; height: 100% !important"></iframe>')
        }
        BF_UI.showDialog(f.id, f.title);
        if (f.onload) {
            try {
                c.observe("load", function () {
                    f.onload.each(function (n) {
                        n()
                    })
                })
            } catch (h) {}
        }
    },
    showDialog: function (k, f) {
        try {
            if (typeof user_post != "undefined" && $("video-form-preview") && $("video-form-preview").visible()) {
                $("video-form-preview").hide();
                user_post.show_video_preview = true
            } else {
                if (typeof user_post != "undefined") {
                    user_post.show_video_preview = false
                }
            }
        } catch (c) {
            user_post.show_video_preview = false
        }
        var b = $(k);
        var h = "Crop Image";
        if (arguments.length > 1) {
            h = arguments[1]
        }
        b.show();
        if (typeof f != "undefined" && f && $(f)) {
            $(f).insert({
                top: b
            })
        }
        var g = b.select(".title");
        if (g && g.length > 0) {
            g.first().update(h)
        }
        var a = b.select(".bf_dialog").first();
        if (a) {
            a.style.top = Math.floor(Math.max(document.viewport.getScrollOffsets().top, document.viewport.getScrollOffsets().top + (document.viewport.getHeight() / 2) - ($(a).getHeight() / 2))) + "px"
        }
    },
    showBarChart: function (w) {
        var n = w.getAttribute("rel:chart_data");
        var b = n.evalJSON ? n.evalJSON() : jQuery.parseJSON(n);
        var c = 0,
            h = 0;
        if (window.Prototype) {
            $H(b).each(function (A) {
                if (A.key.match(/baseline/)) {
                    c++
                } else {
                    if (A.key.match(/column_.*\.0/)) {
                        h++
                    }
                }
            })
        } else {
            jQuery.each(b, function (A) {
                if (A.match(/baseline/)) {
                    c++
                } else {
                    if (A.match(/column_.*\.0/)) {
                        h++
                    }
                }
            })
        }
        if (c > h - 1) {
            var z = function (B) {
                    if (!window.Prototype) {
                        B.key = B
                    }
                    var D = B.key.split(".")[0];
                    var A = B.key.split(".")[1];
                    if (D == "baseline") {
                        if (typeof b[D + "." + (parseInt(A) + 1)] != "undefined") {
                            b[B.key] = b[D + "." + (parseInt(A) + 1)]
                        } else {
                            delete b[B.key]
                        }
                    }
                };
            if (window.Prototype) {
                $H(b).each(z)
            } else {
                jQuery.each(b, z)
            }
        }
        var l = [];
        var m;
        var r;
        var o = [];
        var a = [];
        var k = [];
        var q;
        var p;
        var f = 0;
        var v = [];
        for (item in b) {
            if (item.split("_")[0] == "column") {
                var g = item.split(".")[1];
                v.push(g)
            }
            switch (item.split(".")[0]) {
            case "x_axis":
                m = b[item];
                o[f] = b[item];
                f++;
                break;
            case "y_axis":
                r = b[item];
                break;
            case "baseline":
                o[f] = b[item];
                f++;
                break;
            case "barchart_color":
                k.push(b[item]);
                break
            }
        }
        if (window.Prototype) {
            v = v.uniq()
        } else {
            v = jQuery.unique(v)
        }
        t();

        function t() {
            for (var E = 0; E < v.length; E++) {
                for (item in b) {
                    if (item.split("_")[0] == "column") {
                        var D = item.split(".")[0];
                        var B = item.split(".")[1];
                        if (D == "column_one") {
                            if (E == B) {
                                a[E] = [String(b[D + "." + E])]
                            }
                        } else {
                            if (D == "column_two" || D == "column_three" || D == "column_four" || D == "column_five" || D == "column_six") {
                                if (E == B) {
                                    a[E].push(parseInt(b[D + "." + E]))
                                }
                            }
                        }
                    }
                }
            }
            a.splice(0, 0, o);
            var G = google.visualization.arrayToDataTable(a);
            var A = {
                hAxis: {
                    title: m
                },
                vAxis: {
                    title: r
                },
                colors: k,
                chartArea: {
                    width: "75%",
                    height: "75%"
                },
                legend: {
                    position: "top"
                }
            };
            var F = new google.visualization.ColumnChart(w);
            F.draw(G, A)
        }
    },
    showPieChart: function (k) {
        var c = [];
        var b = [];
        var a = k.getAttribute("rel:chart_data");
        var g = a.evalJSON ? a.evalJSON() : jQuery.parseJSON(a);
        for (item in g) {
            if (item.match("chart_caption")) {
                if (!c[item.split(".")[1]]) {
                    c[item.split(".")[1]] = []
                }
                c[item.split(".")[1]][0] = g[item]
            } else {
                if (item.match("chart_value")) {
                    if (!c[item.split(".")[1]]) {
                        c[item.split(".")[1]] = []
                    }
                    c[item.split(".")[1]][1] = parseInt(g[item])
                } else {
                    if (item.match("chart_color")) {
                        b[item.split(".")[1]] = g[item]
                    }
                }
            }
        }
        c.splice(0, 0, ["title", "value"]);
        var h = google.visualization.arrayToDataTable(c);
        var f = {
            colors: b,
            chartArea: {
                width: "85%",
                height: "65%"
            },
            legend: {
                position: "top"
            }
        };
        var g = new google.visualization.PieChart(k);
        g.draw(h, f)
    },
    json2vennchart: function (h) {
        var b = [],
            l = [],
            f = [];
        var a = function (o) {
                var n = {};
                if (!window.Prototype) {
                    n.key = o;
                    n.value = h[o]
                } else {
                    n = o
                }
                var p = n.key.split(".")[0];
                var m = n.key.split(".")[1];
                if (typeof b[m] == "undefined" && p != "vennchart_intersection") {
                    b[m] = {}
                }
                if (p == "vennchart_color") {
                    b[m]["color"] = n.value
                } else {
                    if (p == "vennchart_title") {
                        b[m]["title"] = n.value
                    } else {
                        if (p == "vennchart_value") {
                            b[m]["value"] = n.value
                        } else {
                            if (p == "vennchart_intersection") {
                                l[m] = n.value
                            } else {
                                if (p == "vennchart_metadata") {
                                    f = n.value.evalJSON ? n.value.evalJSON() : jQuery.parseJSON(n.value)
                                }
                            }
                        }
                    }
                }
            };
        if (window.Prototype) {
            $H(h).each(a)
        } else {
            jQuery.each(h, a)
        }
        var k = 0;
        for (var g = 0; g < b.length - 1; g++) {
            b[g]["intersections"] = [];
            for (var c = 0; c < b.length - 1 - g; c++) {
                b[g]["intersections"].push(l[k]);
                k++
            }
        }
        return {
            areas: b,
            conf: f
        }
    },
    showVennChart: function (m, k) {
        k = k || false;
        var f = m.getAttribute("rel:chart_data");
        var n = f.evalJSON ? f.evalJSON() : jQuery.parseJSON(f);
        var h = BF_UI.json2vennchart(n);
        areas = h.areas;
        var o = [],
            l = [],
            b = [];
        for (var g = 0; g < areas.length; g++) {
            o[g] = areas[g].value || 0;
            l[g] = areas[g].title;
            b[g] = areas[g].color
        }
        size = m.getDimensions ? m.getDimensions() : window.jQuery ? {
            width: $(m).width(),
            height: $(m).height()
        } : {
            width: 0,
            height: 0
        };
        if (!k) {
            var a = Raphael(m);
            venn = a.vennchart(0, 0, size.width || 559, size.height || 345, {
                values: o
            }, {
                colors: b,
                titles: l,
                conf: h.conf,
                positionrecalc: true,
                fallback: k
            });
            if (window.jQuery != "undefined") {
                $(a.canvas).mousemove(venn.mousemove)
            } else {
                $(a.canvas).onmousemove = venn.mousemove
            }
        } else {
            var c = document.createElement("canvas");
            c.width = size.width || 300;
            c.height = size.height || 250;
            $(m).append(c);
            Raphael.fn.vennchart(0, 0, c.width, c.height, {
                values: o
            }, {
                colors: b,
                titles: l,
                conf: h.conf,
                positionrecalc: true,
                fallback: k,
                fallbackelem: c
            })
        }
    },
    renderEntities: function (b) {
        var f = "BF_RENDER_ENTITIES_DIV_73625";
        var a = $(f);
        if (!a) {
            var c = document.getElementsByTagName("body")[0];
            a = document.createElement("DIV");
            a.setAttribute("id", f);
            a.id = f;
            a.style.display = "none";
            c.appendChild(a)
        }
        a.innerHTML = b;
        b = a.innerHTML;
        b = b.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
        return b
    },
    initialize_simple_color_picker: function (b) {
        var g = $(b.field);
        if (!g) {
            return
        }
        var a = function (o) {
                g.BFSetAttribute("value", o);
                g.setValue(o);
                if (b.callback) {
                    b.callback.call(this, {
                        target: g,
                        stop: function () {}
                    })
                }
            };
        g.disabled = true;
        g.addClassName("hidden");
        var n = function (q) {
                var p = $(q.target.parentNode.current);
                var o = $(q.target.parentNode.select);
                if (q.forceOff) {
                    BF_Effect.SlideUp(o, 1);
                    p.removeClassName("hidden");
                    o.addClassName("hidden")
                } else {
                    if (o.hasClassName("hidden")) {
                        o.removeClassName("hidden");
                        BF_Effect.SlideDown(o, 1)
                    } else {
                        o.addClassName("hidden")
                    }
                }
            };
        var h = function (v) {
                if (!v.match("^#")) {
                    v = "#" + v
                }
                if (v.length == 4) {
                    v = v.substring(0, 4) + v.substring(1, 4)
                }
                if (v.length != 7) {
                    return
                }
                var t = parseInt((p(v)).substring(0, 2), 16);
                var q = parseInt((p(v)).substring(2, 4), 16);
                var o = parseInt((p(v)).substring(4, 6), 16);

                function p(r) {
                    return (r.charAt(0) == "#") ? r.substring(1, 7) : r
                }
                if ((t + q + o) > 400) {
                    return "black"
                } else {
                    return "white"
                }
            };
        g.BFOnAttributeChange("value", function (p) {
            if (!p.new_value) {
                return
            }
            var o = h(p.new_value);
            p.element.setStyle({
                backgroundColor: p.new_value,
                color: o
            });
            n({
                forceOff: true,
                target: {
                    parentNode: p.element.picker
                }
            });
            p.element.picker.current.setStyle({
                backgroundColor: p.new_value,
                color: o
            });
            p.element.picker.current.update(p.new_value)
        });
        var c = document.createElement("div");
        c.addClassName("simple_color_picker");
        var k = document.createElement("div");
        k.addClassName("holder");
        var m = document.createElement("div");
        m.addClassName("select");
        m.setAttribute("style", "float:left;");
        m.addClassName("hidden");
        var f = document.createElement("div");
        f.addClassName("current");
        f.addClassName("preview");
        f.appendChild(document.createTextNode("None"));
        f.observe("click", n);
        k.appendChild(f);
        k.appendChild(m);
        c.appendChild(k);
        b.colors.each(function (q) {
            if (!q.match("^#") && !q.match("Transparent")) {
                q = "#" + q
            }
            var p = h(q);
            var o = document.createElement("div");
            o.addClassName("preview");
            o.setStyle({
                backgroundColor: q,
                color: p
            });
            o.appendChild(document.createTextNode(q));
            o.observe("click", function () {
                a(q)
            });
            m.appendChild(o)
        });
        if (b.allow_custom) {
            var l = document.createElement("input");
            l.addClassName("preview");
            l.addClassName("input");
            l.setAttribute("placeholder", "Custom");
            l.observe("blur", function (p) {
                var o = p.target.value;
                if (o.match("^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})")) {
                    o = "#" + o
                }
                if (o.match("^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$")) {
                    a(o.toUpperCase());
                    p.target.value = o
                } else {
                    if (o == "Transparent") {
                        a(o.toUpperCase());
                        p.target.value = o
                    } else {
                        l.value = ""
                    }
                }
            });
            m.appendChild(l)
        }
        k.current = f;
        k.select = m;
        g.picker = k;
        $(g.parentNode).appendChild(c);
        if (objExists(b.default_color)) {
            defColor = b.default_color;
            if (!defColor.match("^#") && !defColor.match("Transparent")) {
                defColor = "#" + defColor
            }
            g.BFSetAttribute("value", defColor)
        }
    },
    closeDropdowns: function () {
        $$(".bf_dropdown.open").each(function (a) {
            a.removeClassName("open")
        });
        $$("body")[0].stopObserving("click", BF_UI.dropdownClickHandler);
        EventManager.fire("bf_ui:close_dropdowns")
    },
    dropdownClickHandler: function (a) {
        var b = a.findElement(".bf_dropdown");
        if (!b) {
            BF_UI.closeDropdowns()
        }
    },
    openDropdownEventHandler: function (b) {
        b.stop();
        BF_UI.closeDropdowns();
        var f = (b.dropdown_id) ? $(b.dropdown_id) : b.findElement(".bf_dropdown");
        if (f.hasClassName("open")) {
            return BF_UI.closeDropdowns()
        }
        f.addClassName("open");
        var c = $(f).down(".bf_dropdown_menu");
        var a = {
            top: 0,
            left: 0
        };
        if ($(f).hasClassName("bf_unpositioned_dropdown")) {
            c.show()
        } else {
            BF_Effect.OpenMenu(f, c, a)
        }
        $$("body")[0].observe("click", BF_UI.dropdownClickHandler);
        EventManager.fire("bf_ui:open_dropdowns", {}, f);
        if (typeof gtrack != "undefined" && $(b.element)) {
            BF_UI.trackUploadDropdown($(b.element))
        }
    },
    trackUploadDropdown: function (a) {
        if (a.descendantOf($s(".thumbnail-chooser"))) {
            gtrack.track_events("[ttp]:thumbnail-edit", "thumbnail-dropdown")
        }
        if (a.descendantOf($("suplist_module_photo_row_launcher"))) {
            gtrack.track_events("[ttp]:edit-item", "multi-image-upload")
        }
        if (a.descendantOf($("suplist_module_photo_area"))) {
            gtrack.track_events("[ttp]:edit-item", "drop-down")
        }
    }
};
if (typeof window.BuzzLoader != "undefined") {
    BuzzLoader.register(BF_UI.init, 5)
}
var BFJS = function () {
        this.selector = (typeof window.jQuery != "undefined") ? "find" : "select";
        this.observer = (typeof window.jQuery != "undefined") ? "on" : "observe";
        this.read_attr = (typeof window.jQuery != "undefined") ? "attr" : "getAttribute";
        this.write_attr = (typeof window.jQuery != "undefined") ? "attr" : "setAttribute";
        this.stop_observing = (typeof window.jQuery != "undefined") ? "unbind" : "stopObserving";
        this.remove_class = (typeof window.jQuery != "undefined") ? "removeClass" : "removeClassName";
        this.add_class = (typeof window.jQuery != "undefined") ? "addClass" : "addClassName";
        this.has_class = (typeof window.jQuery != "undefined") ? "hasClass" : "hasClassName";
        this.update_html = (typeof window.jQuery != "undefined") ? "html" : "update";
        this.get_height = (typeof window.jQuery != "undefined") ? "height" : "getHeight";
        this.get_width = (typeof window.jQuery != "undefined") ? "width" : "getWidth";
        this.up = (typeof window.jQuery != "undefined") ? "parents" : "up";
        this.gtrack_cat = (typeof window.jQuery != "undefined") ? "data-category" : "rel:gt_cat";
        this.gtrack_act = (typeof window.jQuery != "undefined") ? "data-action" : "rel:gt_act";
        this.gtrack_label = (typeof window.jQuery != "undefined") ? "data-label" : "rel:gt_label";
        this.datetime = (typeof window.jQuery != "undefined") ? "data-datetime" : "rel:datetime";
        this.dateformat = (typeof window.jQuery != "undefined") ? "data-dateformat" : "rel:date_format";
        this.prefix = (typeof window.jQuery != "undefined") ? "data-prefix" : "rel:prefix";
        this.read_cookie = function (a) {
            if (bfjs.isMobile()) {
                return readCookie(a)
            } else {
                return BFW_Util.getCookie(a)
            }
        };
        this.write_cookie = function (a, b) {
            if (bfjs.isMobile()) {
                createCookie(a, b, 9999)
            } else {
                BFW_Util.setCookie({
                    name: a,
                    value: b
                })
            }
        };
        this.eventFindEl = function (b, a) {
            if (bfjs.isMobile()) {
                return $(b.currentTarget).closest(a)[0]
            } else {
                return b.findElement(a)
            }
        };
        this.windowEvent = function (b, a) {
            if (bfjs.isMobile()) {
                $(window).on(b, a)
            } else {
                Event.observe(window, b, a)
            }
        };
        this.getFirstEl = function (a) {
            return (bfjs.isMobile() && a.jquery) ? a[0] : a
        };
        this.getElsByAttr = function (a) {
            if (bfjs.isMobile()) {
                return $(a)
            } else {
                return $$(a)
            }
        };
        this.getElementFromEvent = function (a) {
            if (bfjs.isMobile()) {
                return a.target
            } else {
                return a.element()
            }
        };
        this.getOffset = function (a) {
            if (bfjs.isMobile()) {
                var c = $(a).offset().top,
                    b = $(a).offset().left;
                return [b, c]
            } else {
                return $(a).cumulativeOffset()
            }
        };
        this.setStyle = function (a, b) {
            if (bfjs.isMobile()) {
                for (key in b) {
                    $(a).css(key, b[key])
                }
            } else {
                a.setStyle(b)
            }
        };
        this.universal_each = function (b, a) {
            if (bfjs.isMobile()) {
                $.each(b, function (f, c) {
                    a(c, f)
                })
            } else {
                b.each(function (f, c) {
                    a(f, c)
                })
            }
        };
        this.universal_compare_els = function (a, b) {
            if (bfjs.isMobile()) {
                return a.is(b)
            } else {
                return a == b
            }
        };
        this.isMobile = function () {
            if (typeof window.jQuery != "undefined" && /^mobile/i.test(BF_STATIC.tt_page)) {
                return true
            } else {
                if (typeof window.jQuery != "undefined" && /^ab_debug/i.test(BF_STATIC.tt_page)) {
                    return true
                } else {
                    return false
                }
            }
        };
        this.onPageLoad = function (a) {
            if (bfjs.isMobile()) {
                $(document).ready(a)
            } else {
                BuzzLoader.register(a, 1)
            }
        };
        this.toggleClass = function (c, b, f) {
            f = (typeof f === "undefined") ? false : f;
            var a = $(bfjs.getFirstEl(c));
            if (!f && a[bfjs.has_class](b)) {
                a[bfjs.remove_class](b)
            } else {
                if (f) {
                    a[bfjs.add_class](b)
                }
            }
        };
        this.indexOf = function (b, a) {
            if (bfjs.isMobile()) {
                return $.inArray(b, a)
            } else {
                return a.indexOf(b)
            }
        }
    };
var bfjs = new BFJS();
bfjs.onPageLoad(function () {
    if (document.location.href.match("/_buzz_preview")) {
        document.body.addClassName("DraftPage")
    }
});
String.prototype.replaceAll = function (b, a) {
    return this.split(b).join(a)
};
String.prototype.capitalize = function () {
    return this.replace(/\w+/g, function (b) {
        return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()
    })
};
String.prototype.commafy = function () {
    return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};
if (typeof (String.prototype.trim) != "function") {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }
}
Array.prototype.remove = function () {
    var g, c = arguments,
        b = c.length,
        f;
    while (b && this.length) {
        g = c[--b];
        while ((f = this.indexOf(g)) !== -1) {
            this.splice(f, 1)
        }
    }
    return this
};

function IsNumeric(a) {
    return !isNaN(parseFloat(a)) && isFinite(a)
}
function BF_cumulativeScrollOffset(b) {
    var a = 0,
        c = 0;
    do {
        if (b === document.body) {
            var f = document.documentElement || document.body.parentNode || document.body;
            a += !Object.isUndefined(window.pageYOffset) ? window.pageYOffset : f.scrollTop || 0;
            c += !Object.isUndefined(window.pageXOffset) ? window.pageXOffset : f.scrollLeft || 0;
            break
        } else {
            a += b.scrollTop || 0;
            c += b.scrollLeft || 0;
            b = b.parentNode
        }
    } while (b);
    return new Element.Offset(c, a)
}
var $s = function (a) {
        var b = $$(a);
        if (b.length == 0) {
            if (/dev\./.test(window.location.href)) {
                console.error("No " + a + " in document!");
                console.trace()
            }
            return new Element("div")
        } else {
            return b[0]
        }
    };

function isHTMLElement(a) {
    if (typeof (HTMLElement) == "object" || typeof (HTMLElement) == "function") {
        return (a && (a instanceof HTMLElement))
    } else {
        return (a && typeof (a) == "object" && a !== null && a.nodeType === 1 && typeof (a.nodeName) == "string")
    }
}
function isNumber(a) {
    return !isNaN(parseFloat(a)) && isFinite(a)
}
function clearTimer(a) {
    if (objExists(a)) {
        clearTimeout(a)
    }
}
function notEmptyStr(a) {
    return "string" === typeof a && 0 < a.length ? !0 : !1
}
function truncateStr(f, a) {
    var c, b;
    if ("string" !== typeof f) {
        return ""
    }
    c = f.split("");
    if (c.length > a) {
        for (b = c.length - 1; b > -1; --b) {
            if (b > a) {
                c.length = b
            } else {
                if (" " === c[b]) {
                    c.length = b;
                    break
                }
            }
        }
        c.push("...")
    }
    return c.join("")
}
function hasLocalStorage() {
    var a;
    a = ("localStorage" in window) && window.localStorage !== null ? true : false;
    if (a) {
        try {
            localStorage.setItem("__test", "data")
        } catch (b) {
            a = false
        }
    }
    return a
}
function findMatchesExec(f, g) {
    if (!(f instanceof RegExp)) {
        if (BF_STATIC.env != "live") {
            throw new Error("Error: findMatchesExec() : pattern is not RegExp object")
        }
        return false
    }
    var c = (f.global) ? true : false;
    var b = [];
    var a;
    f.lastIndex = 0;
    while ((a = f.exec(g)) != null) {
        b.push(a);
        if (!c) {
            break
        }
    }
    return (b.length) ? b : null
}

function isIE7() {
    var a = false;
    if (navigator.appVersion.indexOf("MSIE") != -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) < 8) {
        a = true
    }
    return a
}
function isIE8() {
    var a = false;
    if (navigator.appVersion.indexOf("MSIE") != -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) == 8) {
        a = true
    }
    return a
}
function isIE9() {
    var a = false;
    if (navigator.appVersion.indexOf("MSIE") != -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) == 9) {
        a = true
    }
    return a
}
function isIE10() {
    if (uagent.match("msie 10")) {
        return true
    }
}
function isIE11() {
    return !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/))
}
function isMSIE() {
    return (navigator.appVersion.indexOf("MSIE") != -1) || isIE11()
}
function isFirefox() {
    return (navigator.userAgent.toLowerCase().indexOf("firefox") != -1)
}
function isMac() {
    return (navigator.platform.toLowerCase().indexOf("mac") != -1)
}
function isSafari5() {
    if ((uagent.match("safari") && !uagent.match("chrome")) && !(uagent.match(/Version\/[6-9](?:\.[0-9])* Safari/i) || uagent.match(/Version\/[5-9](?:\.\d+)*\.\d+ Mobile\/\S*\sSafari/i))) {
        return true
    }
}
function getUrlVars() {
    var b = {};
    var a = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (c, f, g) {
        b[f] = g
    });
    return b
}
function is_touch() {
    var a;
    if (("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        a = true
    } else {
        a = false
    }
    return a
}
function is_mobile() {
    var a = navigator.userAgent.toLowerCase();
    if (a.match(/iphone|ipod|android|ipad/)) {
        return true
    } else {
        return false
    }
}
function BFWebPath() {
    var a = BF_STATIC.bf_env == "dev" ? "dev." : BF_STATIC.bf_env == "stage" ? "stage." : "www.";
    return a + "#" + BF_STATIC.web_root
}
function getWidth(a) {
    return $(a).getWidth()
}
function objExists(b) {
    try {
        if (typeof (b) != "undefined") {
            return true
        } else {
            return false
        }
    } catch (a) {
        return false
    }
}
function removeAllCssClasses(a) {
    $w($(a).className).each(function (b) {
        $(a).removeClassName(b)
    })
}
function trackPixel(a) {
    var c = new Image();
    var b = (Math.random() * 100000000000000000);
    a = a.replace("[timestamp]", b);
    if (BF_STATIC.bf_env == "dev" || BF_STATIC.bf_test_mode) {
        console.log("Pixel Tracked: ", a)
    } else {
        c.src = a
    }
}
function ukBackground() {
    if (BF_STATIC.country == "uk" && (acl.user_can("homepage_edit") || acl.user_can("uk_homepage_edit"))) {
        $$("body")[0].addClassName("uk_edit")
    }
}
function toggleGraphicImage(c, g) {
    if (!isSafari5() && !isIE10()) {
        var h = c.getOffsetParent(),
            f = h.select(".graphic_image")[0],
            b = h.select(".graphic_image_warning")[0],
            a = h.select("reblur")[0];
        if (!g) {
            if (f) {
                f.removeClassName("graphic_image")
            }
            if (b) {
                b.addClassName("hidden")
            }
            h.addClassName("no_blur")
        } else {
            if (g) {
                f = h.select("img")[0];
                if (f) {
                    f.addClassName("graphic_image")
                }
                if (b) {
                    b.removeClassName("hidden")
                }
                h.removeClassName("no_blur")
            }
        }
    }
}
(function () {
})();