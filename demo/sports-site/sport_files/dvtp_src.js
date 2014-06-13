function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj === null)
                return errorsArr;
            else {
                handler.onFailure();
                errorsArr.push(errorObj);
            }
        }

        var errorObjHandler = handleSpecificHandler(baseHandler);
        if (errorObjHandler) {
            errorObjHandler['dvp_isLostImp'] = 1;
            errorsArr.push(errorObjHandler);
        }
        return errorsArr;
    }

    function handleSpecificHandler(handler) {
        var url;
        var errorObj = null;

        try {
            url = handler.createRequest();
            if (url) {
                if (!handler.sendRequest(url))
                    errorObj = createAndGetError('sendRequest failed.', url, handler.getVersion(), handler.getVersionParamName(), handler.dv_script);
            }
            else
                errorObj = createAndGetError('createRequest failed.', url, handler.getVersion(), handler.getVersionParamName(), handler.dv_script);
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, url, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD')
            errorObj['dvp_isOnHead'] = '1';
        if (url)
            errorObj['dvp_jsErrUrl'] = url;
        return errorObj;
    }

    function chooseEvaluationHandler(handlersArray) {
        var config = window._dv_win.dv_config;
        var index = 0;
        var isEvaluationVersionChosen = false;
        if (config.handlerVersionSpecific) {
            for (var i = 0; i < handlersArray.length; i++) {
                if (handlersArray[i].handler.getVersion() == config.handlerVersionSpecific) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }
        else if (config.handlerVersionByTimeIntervalMinutes) {
            var date = config.handlerVersionByTimeInputDate || new Date();
            var hour = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            index = Math.floor(((hour * 60) + minutes) / config.handlerVersionByTimeIntervalMinutes) % (handlersArray.length + 1);
            if (index != handlersArray.length) //This allows a scenario where no evaluation version is chosen
                isEvaluationVersionChosen = true;
        }
        else {
            var rand = config.handlerVersionRandom || (Math.random() * 100);
            for (var i = 0; i < handlersArray.length; i++) {
                if (rand >= handlersArray[i].minRate && rand < handlersArray[i].maxRate) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }

        if (isEvaluationVersionChosen == true && handlersArray[index].handler.isApplicable())
            return handlersArray[index].handler;
        else
            return null;
    }    
}

function getCurrentTime() {
    "use strict";
    if (Date.now) {
        return Date.now();
    }
    return (new Date()).getTime();
}

function doesBrowserSupportHTML5Push() {
    "use strict";
    return typeof window.parent.postMessage === 'function' && window.JSON;
}

function dv_GetParam(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS, 'i');
    var results = regex.exec(url);
    if (results == null)
        return null;
    else
        return results[1];
}

function dv_GetKeyValue(url) {
    var keyReg = new RegExp(".*=");
    var keyRet = url.match(keyReg)[0];
    keyRet = keyRet.replace("=", "");

    var valReg = new RegExp("=.*");
    var valRet = url.match(valReg)[0];
    valRet = valRet.replace("=", "");

    return { key: keyRet, value: valRet };
}

function dv_Contains(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function dv_GetDynamicParams(url, prefix) {
    try {
        prefix = (prefix != undefined && prefix != null) ? prefix : 'dvp';
        var regex = new RegExp("[\\?&](" + prefix + "_[^&]*=[^&#]*)", "gi");
        var dvParams = regex.exec(url);

        var results = [];
        while (dvParams != null) {
            results.push(dvParams[1]);
            dvParams = regex.exec(url);
        }
        return results;
    }
    catch (e) {
        return [];
    }
}

function dv_createIframe() {
    var iframe;
    if (document.createElement && (iframe = document.createElement('iframe'))) {
        iframe.name = iframe.id = 'iframe_' + Math.floor((Math.random() + "") * 1000000000000);
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
    }

    return iframe;
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function dv_SendErrorImp(serverUrl, errorsArr) {

    for (var j = 0; j < errorsArr.length; j++) {
        var errorObj = errorsArr[j];
        var errorImp = dv_CreateAndGetErrorImp(serverUrl, errorObj);
        dv_sendImgImp(errorImp);
    }
}

function dv_CreateAndGetErrorImp(serverUrl, errorObj) {
    var errorQueryString = '';
    for (var key in errorObj) {
        if (errorObj.hasOwnProperty(key)) {
            if (key.indexOf('dvp_jsErrUrl') == -1) {
                errorQueryString += '&' + key + '=' + errorObj[key];
            } else {
                var params = ['ctx', 'cmp', 'plc', 'sid'];
                for (var i = 0; i < params.length; i++) {
                    var pvalue = dv_GetParam(errorObj[key], params[i]);
                    if (pvalue) {
                        errorQueryString += '&dvp_js' + params[i] + '=' + pvalue;
                    }
                }
            }
        }
    }

    return window._dv_win.location.protocol + '//' + serverUrl + errorQueryString;
}

function dv_sendImgImp(url) {
    (new Image()).src = url;
}

function dv_getPropSafe(obj, propName) {
    try {
        if (obj)
            return obj[propName];
    } catch (e) { }
}

function dvType() {
    var that = this;
    this.t2tEventDataZombie = {};

    this.processT2TEvent = function (data, tag) {
        try {
            if (tag.ServerPublicDns) {
                var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;

                if (!tag.uniquePageViewId) {
                    tag.uniquePageViewId = data.uniquePageViewId;
                }

                tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
                $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
            }
        } catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tProcess=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (ex) { }
        }
    };

    this.processTagToTagCollision = function (collision, tag) {
        var i;
        for (i = 0; i < collision.eventsToFire.length; i++) {
            this.pubSub.publish(collision.eventsToFire[i], tag.uid);
        }
        var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
        tpsServerUrl += '&colltid=' + collision.allReasonsForTagBitFlag;

        for (i = 0; i < collision.reasons.length; i++) {
            var reason = collision.reasons[i];
            tpsServerUrl += '&' + reason.name + "ms=" + reason.milliseconds;
        }

        if (collision.thisTag) {
            tpsServerUrl += '&tlts=' + collision.thisTag.t2tLoadTime;
        }
        if (tag.uniquePageViewId) {
            tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
        }
        $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
    };

    this.processBSIdFound = function (bsID, tag) {
        var tpsServerUrl = tag.dv_protocol + '//' + tag.ServerPublicDns + '/event.gif?impid=' + tag.uid;
        tpsServerUrl += '&bsimpid=' + bsID;
        if (tag.uniquePageViewId) {
            tpsServerUrl += '&upvid=' + tag.uniquePageViewId;
        }
        $dv.domUtilities.addImage(tpsServerUrl, tag.tagElement.parentElement);
    };

    var messageEventListener = function (event) {
        try {
            var timeCalled = getCurrentTime();
            var data = window.JSON.parse(event.data);
            if (!data.action) {
                data = window.JSON.parse(data);
            }
            var myUID;
            var visitJSHasBeenCalledForThisTag = false;
            if ($dv.tags) {
                for (var uid in $dv.tags) {
                    if ($dv.tags.hasOwnProperty(uid) && $dv.tags[uid] && $dv.tags[uid].t2tIframeId === data.iFrameId) {
                        myUID = uid;
                        visitJSHasBeenCalledForThisTag = true;
                        break;
                    }
                }
            }

            var tag;
            switch (data.action) {
                case 'uniquePageViewIdDetermination':
                    if (visitJSHasBeenCalledForThisTag) {
                        $dv.processT2TEvent(data, $dv.tags[myUID]);
                        $dv.t2tEventDataZombie[data.iFrameId] = undefined;
                    }
                    else {
                        data.wasZombie = 1;
                        $dv.t2tEventDataZombie[data.iFrameId] = data;
                    }
                    break;
                case 'maColl':
                    tag = $dv.tags[myUID];
                    if (!tag.uniquePageViewId) { tag.uniquePageViewId = data.uniquePageViewId; }
                    data.collision.commonRecievedTS = timeCalled;
                    $dv.processTagToTagCollision(data.collision, tag);
                    break;
                case 'bsIdFound':
                    tag = $dv.tags[myUID];
                    if (!tag.uniquePageViewId) { tag.uniquePageViewId = data.uniquePageViewId; }
                    $dv.processBSIdFound(data.id, tag);
                    break;
            }

        } catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tListener=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (ex) { }
        }
    };

    if (window.addEventListener)
        addEventListener("message", messageEventListener, false);
    else
        attachEvent("onmessage", messageEventListener);

    this.pubSub = new function () {

        var subscribers = [];

        this.subscribe = function (eventName, uid, actionName, func) {
            if (!subscribers[eventName + uid])
                subscribers[eventName + uid] = [];
            subscribers[eventName + uid].push({ Func: func, ActionName: actionName });
        }

        this.publish = function (eventName, uid) {
            var actionsResults = [];
            if (eventName && uid && subscribers[eventName + uid] instanceof Array)
                for (var i = 0; i < subscribers[eventName + uid].length; i++) {
                    var funcObject = subscribers[eventName + uid][i];
                    if (funcObject && funcObject.Func && typeof funcObject.Func == "function" && funcObject.ActionName) {
                        var isSucceeded = runSafely(function () {
                            return funcObject.Func(uid);
                        });
                        actionsResults.push(encodeURIComponent(funcObject.ActionName) + '=' + (isSucceeded ? '1' : '0'));
                    }
                }
            return actionsResults.join('&');
        }
    };

    this.domUtilities = new function () {

        this.addImage = function (url, parentElement) {
            var image = parentElement.ownerDocument.createElement("img");
            image.width = 0;
            image.height = 0;
            image.style.display = 'none';
            image.src = appendCacheBuster(url);
            parentElement.insertBefore(image, parentElement.firstChild);
        };

        this.addScriptResource = function (url, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.src = appendCacheBuster(url);
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addScriptCode = function (srcCode, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.innerHTML = srcCode;
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addHtml = function (srcHtml, parentElement) {
            var divElem = parentElement.ownerDocument.createElement("div");
            divElem.style = "display: inline";
            divElem.innerHTML = srcHtml;
            parentElement.insertBefore(divElem, parentElement.firstChild);
        }
    };

    this.resolveMacros = function (str, tag) {
        var viewabilityData = tag.getViewabilityData();
        var viewabilityBuckets = viewabilityData && viewabilityData.buckets ? viewabilityData.buckets : {};
        var upperCaseObj = objectsToUpperCase(tag, viewabilityData, viewabilityBuckets);
        var newStr = str.replace('[DV_PROTOCOL]', upperCaseObj.DV_PROTOCOL);
        newStr = newStr.replace('[PROTOCOL]', upperCaseObj.PROTOCOL);
        newStr = newStr.replace(/\[(.*?)\]/g, function (match, p1) {
            var value = upperCaseObj[p1];
            if (value === undefined || value === null)
                value = '[' + p1 + ']';
            return encodeURIComponent(value);
        });
        return newStr;
    };

    this.settings = new function () {
    };

    this.tagsType = function () { };

    this.tagsPrototype = function () {
        this.add = function (tagKey, obj) {
            if (!that.tags[tagKey])
                that.tags[tagKey] = new that.tag();
            for (var key in obj)
                that.tags[tagKey][key] = obj[key];
        }
    };

    this.tagsType.prototype = new this.tagsPrototype();
    this.tagsType.prototype.constructor = this.tags;
    this.tags = new this.tagsType();

    this.tag = function () { }
    this.tagPrototype = function () {
        this.set = function (obj) {
            for (var key in obj)
                this[key] = obj[key];
        }

        this.getViewabilityData = function () {
        }
    };

    this.tag.prototype = new this.tagPrototype();
    this.tag.prototype.constructor = this.tag;

    this.registerEventCall = function (impressionId, values, timeoutMs) {
        var url = this.tags[impressionId].protocol + '//' + this.tags[impressionId].ServerPublicDns + "/event.gif?impid=" + impressionId + '&' + createQueryStringParams(values);
        this.domUtilities.addImage(url, $dv.tags[impressionId].tagElement.parentNode);
    };

    var createQueryStringParams = function (values) {
        var params = '';
        for (var key in values) {
            if (typeof values[key] !== 'function') {
                var value = encodeURIComponent(values[key]);
                if (params === '')
                    params += key + '=' + value;
                else
                    params += '&' + key + '=' + value;
            }
        }

        return params;
    };

    this.Enums = {
        BrowserId: { Others: 0, IE: 1, Firefox: 2, Chrome: 3, Opera: 4, Safari: 5 },
        TrafficScenario: { OnPage: 1, SameDomain: 2, CrossDomain: 128 }
    };

    this.CommonData = {};

    var runSafely = function (action) {
        try {
            var ret = action();
            return ret !== undefined ? ret : true;
        } catch (e) { return false; }
    };

    var objectsToUpperCase = function () {
        var upperCaseObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    upperCaseObj[key.toUpperCase()] = obj[key];
                }
            }
        }
        return upperCaseObj;
    };

    var appendCacheBuster = function (url) {
        if (url !== undefined && url !== null && url.match("^http") == "http") {
            if (url.indexOf('?') !== -1) {
                if (url.slice(-1) == '&')
                    url += 'cbust=' + dv_GetRnd();
                else
                    url += '&cbust=' + dv_GetRnd();
            }
            else
                url += '?cbust=' + dv_GetRnd();
        }
        return url;
    };
}


function dv_handler39(){function q(b){if(window._dv_win.document.body)return window._dv_win.document.body.insertBefore(b,window._dv_win.document.body.firstChild),!0;var a=0,c=function(){if(window._dv_win.document.body)try{window._dv_win.document.body.insertBefore(b,window._dv_win.document.body.firstChild)}catch(d){}else a++,150>a&&setTimeout(c,20)};setTimeout(c,20);return!1}function u(b){var a;if(document.createElement&&(a=document.createElement("iframe")))a.name=a.id=window._dv_win.dv_config.emptyIframeID||
"iframe_"+Math.floor(1E12*(Math.random()+"")),a.width=0,a.height=0,a.style.display="none",a.src=b;return a}function A(b){var a={};try{for(var c=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),d=c.exec(b);null!=d;)"eparams"!==d[1]&&(a[d[1]]=d[2]),d=c.exec(b);return a}catch(f){return a}}function B(b){try{if(1>=b.depth)return{url:"",depth:""};var a,c=[];c.push({win:window._dv_win.top,depth:0});for(var d,f=1,g=0;0<f&&100>g;){try{if(g++,d=c.shift(),f--,0<d.win.location.toString().length&&d.win!=b)return 0==d.win.document.referrer.length||
0==d.depth?{url:d.win.location,depth:d.depth}:{url:d.win.document.referrer,depth:d.depth-1}}catch(v){}a=d.win.frames.length;for(var j=0;j<a;j++)c.push({win:d.win.frames[j],depth:d.depth+1}),f++}return{url:"",depth:""}}catch(q){return{url:"",depth:""}}}function w(b){var a=String(),c,d,f;for(c=0;c<b.length;c++)f=b.charAt(c),d="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(f),0<=d&&(f="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((d+
47)%94)),a+=f;return a}function D(){try{if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||!1==document.webkitHidden))return 3;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&void 0!=
window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject))return 1;if("function"===typeof window.callPhantom)return 99;try{if("function"===typeof window.top.callPhantom)return 99}catch(b){}var a=
!1;try{new Text("!")}catch(c){a=!0}var d=!1;try{var f=document.createElement("p");f.innerText=".";f.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";d=void 0!=f.style.textShadow}catch(g){}return 0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&a&&d&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(q){return 0}}this.createRequest=function(){var b,a,c,d=!1;a=window._dv_win;var f=0,g=!1,v=getCurrentTime();window._dv_win.t2tTimestampData=[{dvTagCreated:v}];
var j,C="https:"===window._dv_win.location.protocol?"https:":"http:";b=!0;var h=doesBrowserSupportHTML5Push();if(h)try{j=u(window._dv_win.dv_config.t2turl||"https://cdn3.doubleverify.com/t2tv4.html"),b=q(j)}catch(G){}try{for(c=0;10>=c;c++)if(null!=a.parent&&a.parent!=a)if(0<a.parent.location.toString().length)a=a.parent,f++,d=!0;else{d=!1;break}else{0==c&&(d=!0);break}}catch(H){d=!1}0==a.document.referrer.length?d=a.location:d?d=a.location:(d=a.document.referrer,g=!0);var x=null,y=null;window._dv_win.external&&
(x=void 0!=window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,y=void 0!=window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:null);window._dv_win._dvScripts||(window._dv_win._dvScripts=[]);var n=document.getElementsByTagName("script");for(c in n){var e=n[c].src,i=window._dv_win.dv_config.reqex||/^[ \t]*(http(s)?:\/\/)?[a-z\-]*cdn(s)?\.doubleverify\.com:?[0-9]*\/dvtp_src.js/;if(e&&e.match(i)&&!dv_Contains(window._dv_win._dvScripts,n[c])){this.dv_script=n[c];
window._dv_win._dvScripts.push(n[c]);var i=dv_GetParam(e,"region")||"",z="http:",n="0";"https"==e.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&(z="https:",n="1");try{for(var p=a,l=a,k=0;10>k&&l!=window._dv_win.top;)k++,l=l.parent;p.depth=k;var m=B(a);dv_aUrlParam="&aUrl="+encodeURIComponent(m.url);dv_aUrlDepth="&aUrlD="+m.depth;dv_referrerDepth=a.depth+f;g&&a.depth--}catch(I){dv_aUrlDepth=dv_aUrlParam=dv_referrerDepth=a.depth=""}f=dv_GetDynamicParams(e,"dvp");g=dv_GetDynamicParams(e,
"dvpx");for(m=0;m<g.length;m++)p=dv_GetKeyValue(g[m]),g[m]=p.key+"="+encodeURIComponent(p.value);"41"==i&&(i=50>100*Math.random()?"41":"8",f.push("dvp_region="+i));f=f.join("&");g=g.join("&");m=window._dv_win.dv_config.tpsAddress||"tps"+i+".doubleverify.com";p="visit.js";1==dv_GetParam(e,"dvapi")&&(p="dvvisit.js");l="";i=dv_GetParam(e,"xff");null!=i&&(l+="&xff="+i);i=dv_GetParam(e,"useragent");null!=i&&(l+="&useragent="+i);for(var k="ctx cmp ipos sid plc adid crt btreg btadsrv adsrv advid num pid crtname unit chnl uid scusrid tagtype".split(" "),
r=[],s=0;s<k.length;s++)r.push(k[s]+"="+(dv_GetParam(e,k[s])||""));k=r.join("&");(r=dv_GetParam(e,"turl"))&&(k+="&turl="+r);var E=e,e=(window._dv_win.dv_config.visitJSURL||z+"//"+m+"/"+p)+"?"+k+"&dvtagver=6.1.src&srcurlD="+a.depth+"&curl="+(null==y?"":encodeURIComponent(y))+"&qpgid="+(null==x?"":x)+"&ssl="+n+"&refD="+dv_referrerDepth+l+"&htmlmsging="+(h?"1":"0");"http:"==e.match("^http:")&&"https"==window._dv_win.location.toString().match("^https")&&(e+="&dvp_diffSSL=1");a=c&&c.parentElement&&c.parentElement.tagName&&
"HEAD"===c.parentElement.tagName;if(!b||a)e+="&dvp_isBodyExistOnLoad="+(b?"1":"0"),e+="&dvp_isOnHead="+(a?"1":"0");f&&(e+="&"+f);g&&(e+="&"+g);b="srcurl="+encodeURIComponent(d);if((a=window._dv_win[w("=@42E:@?")][w("2?46DE@C~C:8:?D")])&&0<a.length){c=[];c[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(h=0;h<a.length;h++)c[h+1]=a[h];a=c.reverse().join(",")}else a=null;a&&(b+="&ancChain="+encodeURIComponent(a));a=dv_GetParam(e,"uid");null==a?(a=dv_GetRnd(),e+="&uid="+
a):(a=dv_GetRnd(),e=e.replace(/([?&]uid=)(?:[^&])*/i,"$1"+a));a=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&(a=2E3);c=navigator.userAgent.toLowerCase();if(-1<c.indexOf("webkit")||-1<c.indexOf("chrome"))c="&referrer="+encodeURIComponent(window._dv_win.location),e.length+c.length<=a&&(e+=c);dv_aUrlParam.length+dv_aUrlDepth.length+e.length<=a&&(e+=dv_aUrlDepth,b+=dv_aUrlParam);e+="&"+this.getVersionParamName()+"="+this.getVersion();e+="&eparams="+encodeURIComponent(w(b));
if(void 0!=window._dv_win.$dv.CommonData.BrowserId&&void 0!=window._dv_win.$dv.CommonData.BrowserVersion&&void 0!=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent)b=window._dv_win.$dv.CommonData.BrowserId,a=window._dv_win.$dv.CommonData.BrowserVersion,c=window._dv_win.$dv.CommonData.BrowserIdFromUserAgent;else{h=i?decodeURIComponent(i):navigator.userAgent;a=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7",verRegex:"(MSIE |rv:)"},{id:2,
brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}];b={ID:0,version:""};for(c=0;c<a.length;c++)if(null!=h.match(RegExp(a[c].brRegex))){b.ID=a[c].id;
if(null==a[c].verRegex)break;h=h.match(RegExp(a[c].verRegex+"[0-9]*"));null!=h&&(a=h[0].match(RegExp(a[c].verRegex)),b.version=h[0].replace(a[0],""));break}c=b;b=a=D();a=a===c.ID?c.version:"";c=c.ID;window._dv_win.$dv.CommonData.BrowserId=b;window._dv_win.$dv.CommonData.BrowserVersion=a;window._dv_win.$dv.CommonData.BrowserIdFromUserAgent=c}e+="&brid="+b+"&brver="+a+"&bridua="+c;void 0!=window._dv_win.$dv.CommonData.Scenario?b=window._dv_win.$dv.CommonData.Scenario:(b=this.getTrafficScenarioType(),
window._dv_win.$dv.CommonData.Scenario=b);var e=e+("&tstype="+b),t="";try{window.top==window?t="1":window.top.location.host==window.location.host&&(t="2")}catch(J){t="3"}b="dvCallback_"+(window._dv_win.dv_config&&window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():dv_GetRnd());var F=this.dv_script;window._dv_win[b]=function(a,c,b,d){var f=getCurrentTime();c.$uid=b;c=A(E);a.tags.add(b,c);c=A(e);a.tags[b].set(c);a.tags[b].beginVisitCallbackTS=f;a.tags[b].set({tagElement:F,dv_protocol:z,
protocol:C,uid:b});a.tags[b].ImpressionServedTime=getCurrentTime();a.tags[b].getTimeDiff=function(){return(new Date).getTime()-this.ImpressionServedTime};try{"undefined"!=typeof d&&null!==d&&(a.tags[b].ServerPublicDns=d),a.tags[b].adServingScenario=t,a.tags[b].t2tIframeCreationTime=v,a.tags[b].t2tProcessed=!1,a.tags[b].t2tIframeId=j.id,a.tags[b].t2tIframeWindow=j.contentWindow,$dv.t2tEventDataZombie[j.id]&&(a.tags[b].uniquePageViewId=$dv.t2tEventDataZombie[j.id].uniquePageViewId,$dv.processT2TEvent($dv.t2tEventDataZombie[j.id],
a.tags[b]))}catch(g){}};return e+"&jsCallback="+b}}};this.sendRequest=function(b){var a;a=this.getVersionParamName();var c=this.getVersion(),d={};d[a]=c;d.dvp_jsErrUrl=b;d.dvp_jsErrMsg=encodeURIComponent("Error loading visit.js");window._dv_win.dv_config=window._dv_win.dv_config||{};window._dv_win.dv_config.tpsErrAddress=window._dv_win.dv_config.tpsAddress||"tps30.doubleverify.com";a='try{ script.onerror = function(){ try{(new Image()).src = "'+dv_CreateAndGetErrorImp(window._dv_win.dv_config.tpsErrAddress+
"/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_isLostImp=1",d)+'";}catch(e){}}}catch(e){}';a='<html><head></head><body><script id="TPSCall" type="text/javascript" src="'+b+'"><\/script><script type="text/javascript">var script = document.getElementById("TPSCall"); if (script && script.readyState) { script.onreadystatechange = function() { if (script.readyState == "complete") document.close(); } } else document.close(); '+a+"<\/script></body></html>";c=u("about:blank");this.dv_script.id=c.id.replace("iframe",
"script");dv_GetParam(b,"uid");q(c);b=dv_getPropSafe(c,"contentDocument")||dv_getPropSafe(dv_getPropSafe(c,"contentWindow"),"document")||dv_getPropSafe(window._dv_win.frames[c.name],"document");window._dv_win.t2tTimestampData.push({beforeVisitCall:getCurrentTime()});if(b){b.open();if(c=c.contentWindow||window._dv_win.frames[c.name])c.$dv=window._dv_win.$dv;b.write(a)}else b='javascript: (function(){document.open(); document.domain="'+window.document.domain+"\"; window.$dv = window.parent.$dv; document.write('"+
encodeURIComponent(a)+"');})()",c=u(b),this.dv_script.id=c.id.replace("iframe","script"),q(c);return!0};this.isApplicable=function(){return!0};this.onFailure=function(){var b=window._dv_win._dvScripts,a=this.dv_script;null!=b&&(void 0!=b&&a)&&(a=b.indexOf(a),-1!=a&&b.splice(a,1))};this.getTrafficScenarioType=function(){var b=window._dv_win.$dv.Enums.TrafficScenario;try{if(window.top==window)return b.OnPage;if(window.top.document.domain==window.document.domain)return b.SameDomain}catch(a){}return b.CrossDomain};
this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"39"}};


function dv_baseHandler(){function u(b){if(window._dv_win.document.body)return window._dv_win.document.body.insertBefore(b,window._dv_win.document.body.firstChild),!0;var a=0,c=function(){if(window._dv_win.document.body)try{window._dv_win.document.body.insertBefore(b,window._dv_win.document.body.firstChild)}catch(e){}else a++,150>a&&setTimeout(c,20)};setTimeout(c,20);return!1}function v(b){var a;if(document.createElement&&(a=document.createElement("iframe")))a.name=a.id=window._dv_win.dv_config.emptyIframeID||
"iframe_"+Math.floor(1E12*(Math.random()+"")),a.width=0,a.height=0,a.style.display="none",a.src=b;return a}function A(b){var a={};try{for(var c=RegExp("[\\?&]([^&]*)=([^&#]*)","gi"),e=c.exec(b);null!=e;)"eparams"!==e[1]&&(a[e[1]]=e[2]),e=c.exec(b);return a}catch(i){return a}}function B(b){try{if(1>=b.depth)return{url:"",depth:""};var a,c=[];c.push({win:window._dv_win.top,depth:0});for(var e,i=1,f=0;0<i&&100>f;){try{if(f++,e=c.shift(),i--,0<e.win.location.toString().length&&e.win!=b)return 0==e.win.document.referrer.length||
0==e.depth?{url:e.win.location,depth:e.depth}:{url:e.win.document.referrer,depth:e.depth-1}}catch(j){}a=e.win.frames.length;for(var r=0;r<a;r++)c.push({win:e.win.frames[r],depth:e.depth+1}),i++}return{url:"",depth:""}}catch(g){return{url:"",depth:""}}}function w(b){var a=String(),c,e,i;for(c=0;c<b.length;c++)i=b.charAt(c),e="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(i),0<=e&&(i="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((e+
47)%94)),a+=i;return a}function C(){var b=window._dv_win.$dv.Enums.BrowserId,a=function(a){var b=a.indexOf(this.versionSearchString);if(-1!=b)return parseFloat(a.substring(b+this.versionSearchString.length+1))},c={ID:b.Others,version:0};c.ID=function(a){switch(a){case "Explorer":return b.IE;case "Firefox":return b.Firefox;case "Chrome":return b.Chrome;case "Opera":return b.Opera;case "Safari":return b.Safari;default:return 0}}(function(a){for(var b=0;b<a.length;b++){var c=a[b].string,j=a[b].prop;
this.versionSearchString=a[b].versionSearch||a[b].identity;if(c){if(-1!=c.indexOf(a[b].subString))return a[b].identity}else if(j)return a[b].identity}}([{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",
identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Trident/7",identity:"Explorer",versionSearch:"rv"},{string:navigator.userAgent,subString:"Gecko",
identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}]))||b.Others;c.version=a(navigator.userAgent)||a(navigator.appVersion)||"";return c}this.createRequest=function(){var b=!1,a=window._dv_win,c=0,e=!1,i=getCurrentTime();window._dv_win.t2tTimestampData=[{dvTagCreated:i}];var f,j,r="https:"===window._dv_win.location.protocol?"https:":"http:",g=!0,q=doesBrowserSupportHTML5Push();if(q)try{j=v(window._dv_win.dv_config.t2turl||
"https://cdn3.doubleverify.com/t2tv4.html"),g=u(j)}catch(F){}try{for(f=0;10>=f;f++)if(null!=a.parent&&a.parent!=a)if(0<a.parent.location.toString().length)a=a.parent,c++,b=!0;else{b=!1;break}else{0==f&&(b=!0);break}}catch(G){b=!1}0==a.document.referrer.length?b=a.location:b?b=a.location:(b=a.document.referrer,e=!0);var x=null,y=null;window._dv_win.external&&(x=void 0!=window._dv_win.external.QueuePageID?window._dv_win.external.QueuePageID:null,y=void 0!=window._dv_win.external.CrawlerUrl?window._dv_win.external.CrawlerUrl:
null);window._dv_win._dvScripts||(window._dv_win._dvScripts=[]);var m=document.getElementsByTagName("script");for(f in m){var d=m[f].src,n=window._dv_win.dv_config.reqex||/^[ \t]*(http(s)?:\/\/)?[a-z\-]*cdn(s)?\.doubleverify\.com:?[0-9]*\/dvtp_src.js/;if(d&&d.match(n)&&!dv_Contains(window._dv_win._dvScripts,m[f])){this.dv_script=m[f];window._dv_win._dvScripts.push(m[f]);var n=dv_GetParam(d,"region")||"",z="http:",m="0";"https"==d.match("^https")&&"https"==window._dv_win.location.toString().match("^https")&&
(z="https:",m="1");try{for(var k=a,h=a,p=0;10>p&&h!=window._dv_win.top;)p++,h=h.parent;k.depth=p;var l=B(a);dv_aUrlParam="&aUrl="+encodeURIComponent(l.url);dv_aUrlDepth="&aUrlD="+l.depth;dv_referrerDepth=a.depth+c;e&&a.depth--}catch(H){dv_aUrlDepth=dv_aUrlParam=dv_referrerDepth=a.depth=""}c=dv_GetDynamicParams(d,"dvp");e=dv_GetDynamicParams(d,"dvpx");for(l=0;l<e.length;l++)k=dv_GetKeyValue(e[l]),e[l]=k.key+"="+encodeURIComponent(k.value);"41"==n&&(n=50>100*Math.random()?"41":"8",c.push("dvp_region="+
n));c=c.join("&");e=e.join("&");n=window._dv_win.dv_config.tpsAddress||"tps"+n+".doubleverify.com";l="visit.js";1==dv_GetParam(d,"dvapi")&&(l="dvvisit.js");k="";h=dv_GetParam(d,"xff");null!=h&&(k+="&xff="+h);h=dv_GetParam(d,"useragent");null!=h&&(k+="&useragent="+h);for(var h="ctx cmp ipos sid plc adid crt btreg btadsrv adsrv advid num pid crtname unit chnl uid scusrid tagtype".split(" "),p=[],s=0;s<h.length;s++)p.push(h[s]+"="+(dv_GetParam(d,h[s])||""));h=p.join("&");(p=dv_GetParam(d,"turl"))&&(h+=
"&turl="+p);var D=d,d=(window._dv_win.dv_config.visitJSURL||z+"//"+n+"/"+l)+"?"+h+"&dvtagver=6.1.src&srcurlD="+a.depth+"&curl="+(null==y?"":encodeURIComponent(y))+"&qpgid="+(null==x?"":x)+"&ssl="+m+"&refD="+dv_referrerDepth+k+"&htmlmsging="+(q?"1":"0");"http:"==d.match("^http:")&&"https"==window._dv_win.location.toString().match("^https")&&(d+="&dvp_diffSSL=1");a=f&&f.parentElement&&f.parentElement.tagName&&"HEAD"===f.parentElement.tagName;if(!g||a)d+="&dvp_isBodyExistOnLoad="+(g?"1":"0"),d+="&dvp_isOnHead="+
(a?"1":"0");c&&(d+="&"+c);e&&(d+="&"+e);g="srcurl="+encodeURIComponent(b);if((a=window._dv_win[w("=@42E:@?")][w("2?46DE@C~C:8:?D")])&&0<a.length){f=[];f[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(q=0;q<a.length;q++)f[q+1]=a[q];a=f.reverse().join(",")}else a=null;a&&(g+="&ancChain="+encodeURIComponent(a));a=dv_GetParam(d,"uid");null==a?(a=dv_GetRnd(),d+="&uid="+a):(a=dv_GetRnd(),d=d.replace(/([?&]uid=)(?:[^&])*/i,"$1"+a));a=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&
7>=new Number(RegExp.$1)&&(a=2E3);f=navigator.userAgent.toLowerCase();if(-1<f.indexOf("webkit")||-1<f.indexOf("chrome"))f="&referrer="+encodeURIComponent(window._dv_win.location),d.length+f.length<=a&&(d+=f);dv_aUrlParam.length+dv_aUrlDepth.length+d.length<=a&&(d+=dv_aUrlDepth,g+=dv_aUrlParam);d+="&"+this.getVersionParamName()+"="+this.getVersion();d+="&eparams="+encodeURIComponent(w(g));void 0!=window._dv_win.$dv.CommonData.BrowserId&&void 0!=window._dv_win.$dv.CommonData.BrowserVersion?g={ID:window._dv_win.$dv.CommonData.BrowserId,
version:window._dv_win.$dv.CommonData.BrowserVersion}:(g=C(),window._dv_win.$dv.CommonData.BrowserId=g.ID,window._dv_win.$dv.CommonData.BrowserVersion=g.version);d+="&brid="+g.ID+"&brver="+g.version;void 0!=window._dv_win.$dv.CommonData.Scenario?g=window._dv_win.$dv.CommonData.Scenario:(g=this.getTrafficScenarioType(),window._dv_win.$dv.CommonData.Scenario=g);var d=d+("&tstype="+g),t="";try{window.top==window?t="1":window.top.location.host==window.location.host&&(t="2")}catch(I){t="3"}var g="dvCallback_"+
(window._dv_win.dv_config&&window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():dv_GetRnd()),E=this.dv_script;window._dv_win[g]=function(a,b,c,e){var f=getCurrentTime();b.$uid=c;b=A(D);a.tags.add(c,b);b=A(d);a.tags[c].set(b);a.tags[c].beginVisitCallbackTS=f;a.tags[c].set({tagElement:E,dv_protocol:z,protocol:r,uid:c});a.tags[c].ImpressionServedTime=getCurrentTime();a.tags[c].getTimeDiff=function(){return(new Date).getTime()-this.ImpressionServedTime};try{"undefined"!=typeof e&&null!==
e&&(a.tags[c].ServerPublicDns=e),a.tags[c].adServingScenario=t,a.tags[c].t2tIframeCreationTime=i,a.tags[c].t2tProcessed=!1,a.tags[c].t2tIframeId=j.id,a.tags[c].t2tIframeWindow=j.contentWindow,$dv.t2tEventDataZombie[j.id]&&(a.tags[c].uniquePageViewId=$dv.t2tEventDataZombie[j.id].uniquePageViewId,$dv.processT2TEvent($dv.t2tEventDataZombie[j.id],a.tags[c]))}catch(g){}};return d+"&jsCallback="+g}}};this.sendRequest=function(b){var a;a=this.getVersionParamName();var c=this.getVersion(),e={};e[a]=c;e.dvp_jsErrUrl=
b;e.dvp_jsErrMsg=encodeURIComponent("Error loading visit.js");window._dv_win.dv_config=window._dv_win.dv_config||{};window._dv_win.dv_config.tpsErrAddress=window._dv_win.dv_config.tpsAddress||"tps30.doubleverify.com";a='try{ script.onerror = function(){ try{(new Image()).src = "'+dv_CreateAndGetErrorImp(window._dv_win.dv_config.tpsErrAddress+"/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&dvp_isLostImp=1",e)+'";}catch(e){}}}catch(e){}';a='<html><head></head><body><script id="TPSCall" type="text/javascript" src="'+
b+'"><\/script><script type="text/javascript">var script = document.getElementById("TPSCall"); if (script && script.readyState) { script.onreadystatechange = function() { if (script.readyState == "complete") document.close(); } } else document.close(); '+a+"<\/script></body></html>";c=v("about:blank");this.dv_script.id=c.id.replace("iframe","script");dv_GetParam(b,"uid");u(c);b=dv_getPropSafe(c,"contentDocument")||dv_getPropSafe(dv_getPropSafe(c,"contentWindow"),"document")||dv_getPropSafe(window._dv_win.frames[c.name],
"document");window._dv_win.t2tTimestampData.push({beforeVisitCall:getCurrentTime()});if(b){b.open();if(c=c.contentWindow||window._dv_win.frames[c.name])c.$dv=window._dv_win.$dv;b.write(a)}else b='javascript: (function(){document.open(); document.domain="'+window.document.domain+"\"; window.$dv = window.parent.$dv; document.write('"+encodeURIComponent(a)+"');})()",c=v(b),this.dv_script.id=c.id.replace("iframe","script"),u(c);return!0};this.isApplicable=function(){return!0};this.onFailure=function(){var b=
window._dv_win._dvScripts,a=this.dv_script;null!=b&&(void 0!=b&&a)&&(a=b.indexOf(a),-1!=a&&b.splice(a,1))};this.getTrafficScenarioType=function(){var b=window._dv_win.$dv.Enums.TrafficScenario;try{if(window.top==window)return b.OnPage;if(window.top.document.domain==window.document.domain)return b.SameDomain}catch(a){}return b.CrossDomain};this.getVersionParamName=function(){return"jsver"};this.getVersion=function(){return"38"}};


function dv_src_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dv = (window._dv_win.$dv || new dvType());
            
            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.tpsErrAddress = window._dv_win.dv_config.tpsAddress || 'tps30.doubleverify.com';
            
            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src', errorsArr);
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_isLostImp=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (e) { }
        }
    }
}

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	dv_handler39.prototype = dv_baseHandlerIns;
dv_handler39.prototype.constructor = dv_handler39;

    var dv_handlersDefs = [{handler: new dv_handler39(), minRate: 0, maxRate: 5}];
    (new dv_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }
