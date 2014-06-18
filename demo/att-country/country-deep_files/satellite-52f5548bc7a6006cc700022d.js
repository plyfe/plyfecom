_satellite.pushAsyncScript(function(event, target, $variables){
    var CONFIG = {
   SEARCH_ENGINES : {
    GOOGLE : {
      NAME : "Google",
      QP : "q",
      HOST : "google"
    },

    YAHOO : {
      NAME : "Yahoo",
      QP : "p",
      HOST : "yahoo"
    },

    BING : {
      NAME : "Bing",
      QP : "q",
      HOST : "bing"
    },

    ASK : {
      NAME : "Ask",
      QP : "q",
      HOST : "ask"
    }
   }
  };
  var _result;

  function trackRequest(referrerURL, currentURL, cmpId, additionalParams) {
    _result = checkReferrer(referrerURL, currentURL, cmpId);
    if( (_result.modeOfAccess != "DIRECT") && (additionalParams != null) ) {
      var referrerURLParams = parseUri(referrerURL);
          var referrerHost=referrerURLParams.host;
          _result=checkCustomAccessModes(referrerHost,additionalParams,_result);
    }
    _result.randomId = Math.floor(Math.random() * 100001);
    _result.timestamp = new Date().getTime(); 
    _result.Utils=Utils;
    return _result;
  }


  function checkCustomAccessModes(referrerHost,additionalParams, result){
    result= checkCustomModeByRefferer(referrerHost,additionalParams, result);
    result= checkCustomModeByCurrentPageParams(referrerHost,additionalParams, result);
    return result;
  }

  
  function checkCustomModeByCurrentPageParams(referrerHost,additionalParams, result){
    var custommodes=additionalParams["CUSTOM_ACCESS_MODES_BY_CURRENT_PAGE_PARAMS"];
    var found=false;
    var cHost;
    for (var mode in custommodes){
      var custommode=custommodes[mode];
      for (i=0 ; i< custommode.length ; i++){
        if(result.current_page_params.queryKey.hasOwnProperty(custommode[i])){
          result.source = referrerHost;
          result.modeOfAccess = mode;
            found=true;
            break;
        }
      }
      if(found){
        break;
      }
    }
    return result;
  }
  

  function checkCustomModeByRefferer(referrerHost,additionalParams, result){
    var custommodes=additionalParams["CUSTOM_ACCESS_MODES_BY_REFERRER"];
    var found=false;
    var cHost;
    for (var mode in custommodes){
      
      var custommode=custommodes[mode];
      for (i=0 ; i< custommode.length ; i++){
        cHost = custommode[i];
        if (referrerHost.indexOf(cHost.toLowerCase()) != -1) {
            result.source = cHost;
            result.modeOfAccess = mode;
            found=true;
            break;
        }
      }
      if(found){
        break;
      }
    }
      return result;
  }


  function checkReferrer(referrerURL, currentURL, cmpId) {
    var result = new Object();
    var currentURLParams = parseUri(currentURL);

    // Initialize
    result.current_page_params=currentURLParams;
    result.modeOfAccess = "UNKNOWN";
    result.source = "NONE";
    result.isSearchEngine = false;

    if (!referrerURL || (referrerURL== null) || (referrerURL=="") )  {
      result.isRequestTracked = false;
      result.isSearchEngine = false;
      result.modeOfAccess = "DIRECT";
    } else {
      //result.isRequestTracked = "UNKNOWN";
      
      var searchEngines = CONFIG.SEARCH_ENGINES ;
      var referrerURLParams = parseUri(referrerURL);
      result.referrer_page_params=referrerURLParams;
      var referrerHost=referrerURLParams.host;
      for (var i in searchEngines){     
        var searchEngine = searchEngines[i];
        if (referrerHost.indexOf(searchEngine.HOST) != -1) {
          result.source = searchEngine.NAME;
          result.isSearchEngine = true;
          result.modeOfAccess = "ORGANIC";
          result.query = referrerURLParams['queryKey'][searchEngine.QP];
          result.isRequestTracked = validateCampaignIds(currentURLParams.queryKey,cmpId,referrerHost);
          if(result.isRequestTracked){
            result.modeOfAccess = "PAID";
          }
          break;
        } 
      } 
      
      if (!result.isSearchEngine) {
        result.source = encodeURI(referrerURL);
        result.isSearchEngine = false;
        result.isRequestTracked = validateCampaignIds(currentURLParams.queryKey,cmpId,referrerHost);
        
        if(result.isRequestTracked){
          result.modeOfAccess = "DISPLAY";
        } else {
          result.modeOfAccess = "UNKNOWN";        
        }
      }   
    }
      
    return result;
  }

  function validateCampaignIds(targetObject,domainIds,referrerHost){
    /*
      domainIds-> {'*':["gclid","cmp_id"],'t.co':["tw1","tw2"]}
      * applies to all domains
    */
        var campainIdExistance=false;
        for(var domainval in domainIds){
          var cmpIds=domainIds[domainval];
          for(var cmpId in cmpIds){
            if( hasCampaignID(targetObject,cmpIds[cmpId]) && ( domainval=="*" || referrerHost.indexOf(domainval.toLowerCase()) != -1 ) ){
                return true;
            };
          }
        }
    return campainIdExistance;
    }

  function hasCampaignID(targetObject,cmpId){
    if(cmpId.indexOf('*')!=-1){
      return hasWildCardMatch(targetObject,cmpId)
    }
    return (cmpId != null) && (targetObject.hasOwnProperty(cmpId));
  }

  function hasWildCardMatch(targetObject,cmpId){
    var matches=false;
    cmpId=cmpId.replace(/\*/g,""); 
    var patternstr="^"+cmpId;
    var pattern=new RegExp(patternstr,"g");
    for(var key in targetObject){
      if(pattern.test(key)){
        matches=true;
        break;
      }
    }
    return matches;
  }

  // parseUri 1.2.2
  // (c) Steven Levithan <stevenlevithan.com>
  // MIT License

  function parseUri (str) {
    var o   = parseUri.options,
      m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
      uri = {},
      i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
  };

  parseUri.options = {
    strictMode: true,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
      name:   "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@?]*)(?::([^:@?]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@?]*)(?::([^:@?]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  function IQSeoTag(referrerURL, currentURL, cmpId, additionalParams){
    return trackRequest(referrerURL, currentURL, cmpId, additionalParams)
  }

  function valueMatches(list,val){
      for (var li = 0, listlen = list.length; li < listlen; li++) {
      if(list[li].substring){
              if(list[li].toLowerCase()==val){
                  return true;


          }
          }
    }
      return false;
  }

  var Utils={
    valueMatches:valueMatches,
    getCurrentPageParamsKey:function (queryKeyName){
      queryKeyName=queryKeyName.toLowerCase();
      if(_result.current_page_params.queryKey[queryKeyName])
      {
        return _result.current_page_params.queryKey[queryKeyName];
      }
      else
      {       
      if(_result.current_page_params.source.toLowerCase().indexOf(queryKeyName+"=") > -1){
      var queryKeyValue=_result.current_page_params.source.toLowerCase().split(queryKeyName+"=");
      queryKeyValue=queryKeyValue[1].split("&");
      _result.current_page_params.queryKey[queryKeyName]=queryKeyValue[0];
      return _result.current_page_params.queryKey[queryKeyName];
      }
      else
      {
      return;
      }
      } 
    },
    getReferrerPageParamsKey:function (queryKeyName){
        queryKeyName=queryKeyName.toLowerCase();
      if(_result.referrer_page_params.queryKey[queryKeyName])
      {
        return _result.referrer_page_params.queryKey[queryKeyName];
      }
      else
      {       
      if(_result.referrer_page_params.source.toLowerCase().indexOf(queryKeyName+"=") > -1){
      var queryKeyValue=_result.referrer_page_params.source.toLowerCase().split(queryKeyName+"=");
      queryKeyValue=queryKeyValue[1].split("&");
      _result.referrer_page_params.queryKey[queryKeyName]=queryKeyValue[0];
      return _result.referrer_page_params.queryKey[queryKeyName];
      }
      else
      {
      return;
      }
      } 
    },
    getReferrerPageParams:function(){
      if(!_result.referrer_page_params.query == "")
      {
      return _result.referrer_page_params.query;
      }
      else
      {
      if(_result.referrer_page_params.path.indexOf("&") > -1 || _result.referrer_page_params.path.indexOf("=") > -1){
      var dir_temp=_result.referrer_page_params.path.split("/");
        _result.referrer_page_params.query="";
        var slash_temp="";
        for(var il=0;il<dir_temp.length;il++){
        if(dir_temp[il].indexOf("=")>-1 || slash_temp =="/"){
        _result.referrer_page_params.query=_result.referrer_page_params.query+slash_temp+dir_temp[il];
        slash_temp="/";
        }
        }
        return _result.referrer_page_params.query;  
      }
      }
    },
    getCurrentPageParams:function (){
      if(!_result.current_page_params.query == "")
      {
      return _result.current_page_params.query;
      }
      else
      {
      if(_result.current_page_params.path.indexOf("&") > -1 || _result.current_page_params.path.indexOf("=") > -1){
      var dir_temp=_result.current_page_params.path.split("/");
        _result.current_page_params.query="";
        var slash_temp="";
        for(var il=0;il<dir_temp.length;il++){
        if(dir_temp[il].indexOf("=")>-1 || slash_temp =="/"){
        _result.current_page_params.query=_result.current_page_params.query+slash_temp+dir_temp[il];
        slash_temp="/";
        }
        }
        return _result.current_page_params.query; 
      }
      }
    },
    tolowercaseCurrentPageParamsKeys:function(){
    
    if(_result.current_page_params && _result.current_page_params.queryKey){
    
  
      for(key in _result.current_page_params.queryKey){       
        if(key.toLowerCase() != key){
          _result.current_page_params.queryKey[key.toLowerCase()] = _result.current_page_params.queryKey[key];
          delete _result.current_page_params.queryKey[key];
        }
      }
    }
    }
    
  }
  
  window.IQSeoTag=IQSeoTag;

// 2 implementation.js


var CURRENT_URL=document.URL;
var REFERRER_URL=document.referrer;
var imageURLs;
var referrer = REFERRER_URL.split("?")[0];
var result =new IQSeoTag(REFERRER_URL,CURRENT_URL,null,null);
if(CURRENT_URL.toLowerCase().indexOf("ci=cj_affiliate") > -1 || CURRENT_URL.toLowerCase().indexOf("cjpid") > -1){
imageURLs={
ad:"https://view.atdmt.com/CNT/view/469031235/direct;wi.1;hi.1/01/",
act:"https://sact.atdmt.com/action/VIQ3/viq1."+encodeURIComponent(CURRENT_URL)+"/viq2."+referrer
};
}
else if(CURRENT_URL.toLowerCase().indexOf("partner=linkshare") > -1 || CURRENT_URL.toLowerCase().indexOf("partner") > -1){
imageURLs={
ad:"https://view.atdmt.com/CNT/view/469031235/direct;wi.1;hi.1/01/",
act:"https://sact.atdmt.com/action/VIQ3/viq1."+encodeURIComponent(CURRENT_URL)+"/viq2."+referrer
};
}
else if(result.modeOfAccess=="ORGANIC" && CURRENT_URL.toLowerCase().indexOf("wt.srch") === -1 && CURRENT_URL.toLowerCase().indexOf("wtpaidsearchterm") === -1 ){
imageURLs={
ad:"https://view.atdmt.com/CNT/view/469031170/direct;wi.1;hi.1/01/",
act:"https://sact.atdmt.com/action/VIQ4/viq1."+result.source+"/viq2."+result.query+"/viq3."+result.Utils.getCurrentPageParams()
};
}
else if(result.modeOfAccess=="DIRECT"){
imageURLs={
ad:"https://view.atdmt.com/CNT/view/469031234/direct;wi.1;hi.1/01/",
act:"https://sact.atdmt.com/action/VIQ2/viq1."+encodeURIComponent(CURRENT_URL)
};
}
if(imageURLs){
var image = new Image();
image.src = imageURLs.ad;
image.onload = function(){
image.onload=null;
image.src = imageURLs.act;
};
}
});
