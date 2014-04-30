
var dealerOnPoiClientId=95398812;
var dealerOnPoiVisitId=1;
var dealerOnPoiPpc=0;
var poiKeyword='';
var AssetsPath='http://a.dlron.us/';
var JsPath='http://a.dlron.us/';
var MiscPath='http://a.dlron.us/';
var MediaPath='http://s3.amazonaws.com/dealeron/';
var cdnPath='http://s3.amazonaws.com/dealeron/';
var dealerOnGroup=0;
var dealerOnDMake='Toyota';
var dealerOnMultiMake=1;

var DealerOn_Tracker = {
  campaign: '0',
  p1: 'Sales: 703-359-1010',
  p2: 'Service: 703-359-2955',
  mp1: '703-359-1010',
  mp2: '703-359-2955',
  mpl1: 'Sales',
  mpl2: 'Service',
  cp1: 'Sales: 703-359-1010',
  cp2: 'Service: 703-359-2955',
  trackerName: 'dealerOn_tracker_6116',

   ParameterByName:function(name){
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regexS = "[\\?&]" + name + "=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.search);
      if(results == null)
        return "";
      else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    isBlank:function(str) {
      return (!str || /^\s*$/.test(str));
    },
    isEmpty:function(str) {
      return (!str || 0 === str.length);
    },
    hasValue:function(str) {
      return (!this.isBlank(str) && !this.isEmpty(str));
    },
   cmpgnParameter: function() {
     if(this.hasValue(this.ParameterByName("do_cmpgn")) ){
       return true;
     }
     else{
         return false;
     }
	},
   setValue:function(v,nv){
    var re = new RegExp(v, 'gim');
    var str='';
    var elm=document.getElementById('hHeader');
     if (typeof(elm) != 'undefined' && elm != null){
        str=elm.innerHTML;
        var newstr = str.replace(re, nv);
        elm.innerHTML=newstr;
       }     
  },
   setMobileValue:function(v,l,nv){
      var re = new RegExp(v,'gi');
      var rel = new RegExp(l,'gi');
      var newstr='';
      var elm=document.getElementById('mobileHeaderBlock');
      if (typeof(elm) != 'undefined' && elm != null){
        var str=elm.innerHTML;
        newstr = str.replace(rel, '');
        newstr = newstr.replace(re, nv); 
        elm.innerHTML=newstr;
      }
   },
   secondsInMilliseconds:function(numseconds){
      return numseconds * 1000;
    },
   minutesInMilliseconds:function(numminutes){
      return this.secondsInMilliseconds(numminutes * 60);
    },
   hoursInMilliseconds:function(numhours){
      return this.minutesInMilliseconds(numhours * 60);
    },
   daysInMilliseconds:function(numdays){
      return this.hoursInMilliseconds(numdays * 24);
    },
   createCookie:function(name, value, minutes,days){
      var expiremilliseconds=0;
      if (days > 0) {
       expiremilliseconds = this.daysInMilliseconds(days);
      }
      else if (minutes > 0) {
       expiremilliseconds = this.minutesInMilliseconds(minutes);
      }
     var currdate = new Date();
     var expirationdate = new Date(currdate.getTime() + expiremilliseconds);
     document.cookie = name + "=" + value + "; expires=" + expirationdate.toGMTString() + "; path=/";
   },
    parseGACookie:function(){
      var cv = {};
      var utmz =document.cookie.match(DealerOn_Campaign_Tracker.campaign_Tracker_Name + '=([^;]*)');
      if (utmz!=null && typeof(utmz[1])!='undefined') {
        utmz = utmz[1];
        utmz = utmz.replace(/^[0-9.]+/,'').split('%7C');
        for (var c=0,l=utmz.length;c < l;c++){
          var cn = utmz[c].split('%3D');
          switch (cn[0]) {
            case 'utmcsr' : cv.source=cn[1].replace("%20", " ").replace("%28", "").replace("%29", "");
            case 'utmccn' : cv.campaignName=cn[1].replace('%20'," ");
            case 'utmcmd' : cv.medium=cn[1].replace('%20'," ");
            case 'utmctr' : cv.term=cn[1].replace('%20'," ");
            case 'utmcct' : cv.content=cn[1].replace('%20'," ");
          }
        }
      }
      return cv;
   },
   readCookie:function(name){
   	var nameEQ = name + "=";
	  var ca = document.cookie.split(';');
	  for(var i=0;i < ca.length;i++) {
		  var c = ca[i];
		  while (c.charAt(0)==' ') c = c.substring(1,c.length);
		  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	  }
	  return null;
   },
   isMobile:function(){
      var elm=document.getElementById('mobileHeaderBlock');
      if (typeof(elm) != 'undefined' && elm != null)
        return true;
      else 
        return false;
    },     
  getPhone:function(){
      if(this.campaign=='1'){
        if (!this.cmpgnCookie()) // Save phone values to cookie
          this.setCmpgnCookie(this.cp1,this.cp2);
      }
      else if(this.cmpgnParameter()){
        if(this.hasValue(this.ParameterByName("p1")))
          this.cp1=this.ParameterByName("p1");
        if(this.hasValue(this.ParameterByName("p2")))
          this.cp2=this.ParameterByName("p2");
        
        if (!this.cmpgnCookie()) // Save phone values to cookie
          this.setCmpgnCookie(this.cp1,this.cp2);
      }
      else if (this.cmpgnCookie()) {
       var trackerCookie = this.readCookie(this.trackerName);
       var cr = trackerCookie.split('|'); 
       if (cr.length > 0 ){
        if(this.hasValue(cr[0]))
          this.cp1=cr[0];
        if(this.hasValue(cr[1]))
          this.cp2=cr[1];
       }               
      }
     
   }
  ,
  setPhone:function(){
     if(this.cmpgn()){
        this.getPhone();
        if(this.isMobile()){
          if(this.hasValue(this.mp1) )
              this.setMobileValue(this.mp1,this.mpl1,this.cp1);
          if(this.hasValue(this.mp2) )
           this.setMobileValue(this.mp2,this.mpl2,this.cp2);         
        }
        else{
          if(this.hasValue(this.p1) )
            this.setValue(this.p1,this.cp1);
          if(this.hasValue(this.p2) )
            this.setValue(this.p2,this.cp2);
        }
      }
   },
   setCmpgnCookie:function(p1,p2){
     var cookie_data = p1 + '|' + p2;
     
     this.createCookie(this.trackerName, cookie_data, 60,0);  
   },
   cmpgnCookie:function(){
      var value = this.readCookie(this.trackerName);
      if (value == null || value == 0) {
         return false;
       }
      else{
        return true;
      }
   },
   cmpgn:function(){
    if(this.campaign=='1' || this.cmpgnCookie() || this.cmpgnParameter() )
      return true;
    else
      return false;
   },

   hasjQuery :false,
   hasPrototype :false,
 loadingjQuery :false,
   
   trackerSetup:function() {
    //if (dealerOnPoiClientId == 0 || dealerOnPoiVisitId == 1) {}
    DealerOn_Tracker.dealerOnActivateVisit();
   },

   dealerOnActivateVisit:function() {
    DealerOn_Tracker.hasjQuery = 'undefined' != (typeof jQuery);
    var scripts = document.getElementsByTagName('script');
	  for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf("prototype") > 0) DealerOn_Tracker.hasPrototype = true;
   }
    if (DealerOn_Tracker.hasPrototype) {
      if (1) {
        DealerOn_Tracker.trackerSetupPrototype();
      }
    }
    else if (!DealerOn_Tracker.hasjQuery && !DealerOn_Tracker.hasPrototype) {
      if(! DealerOn_Tracker.loadingjQuery) {
        <!-- TODO: (STS) Determine if jQuery 1.10 or 1.8 will work here -->
        DealerOn_ContentManagement.loadjscssfile("http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", "js", "body");
        DealerOn_Tracker.loadingjQuery = true;
      }
        window.setTimeout(DealerOn_Tracker.dealerOnActivateVisit, 50);
    }
    else {
      if (1) {
        DealerOn_Tracker.trackerSetupJQ();
      }
    }
   },
    trackerSetupPrototype: function() {
        var dataList = 'gv=1';
		    dataList += '&refurl=' + encodeURIComponent(document.referrer);
		    dataList += '&entryurl=' + encodeURIComponent(window.location);
        var url = '/dealeron.js?' + dataList;
        new Ajax.Request(url, { 
            method: 'get', 
            evalJSON: 'force', 
            onSuccess: function (transport) { 
                dealerOnPoiClientId = transport.responseJSON.cid; 
                dealerOnPoiVisitId = transport.responseJSON.vid; 
                dealerOnPoiPpc = transport.responseJSON.ppc; 
                poiKeyword = transport.responseJSON.kw; 
            } 
        });
    },
    trackerSetupJQ: function() {
      var dataList = 'gv=1';
		  dataList += '&refurl=' + encodeURIComponent(document.referrer);
		  dataList += '&entryurl=' + encodeURIComponent(window.location);
      jQuery.ajax({
          url: '/dealeron.js',
          data: dataList,
          dataType: 'json',
          success: function (data) {
              dealerOnPoiClientId = data.cid;
              dealerOnPoiVisitId = data.vid;
              dealerOnPoiPpc = data.ppc;
              poiKeyword = data.kw;
          }
      });
    }
};
DealerOn_Tracker.setPhone();

//__________________

var DealerOn_ContentManagement = {
    getElementsByClass  :function(className,tag) {
        if(!DealerOn_Tracker.hasValue(tag)){
            tag = '*';
          }
        var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName(tag);
		var results = [];
        var element;
	  	  for (var i = 0; (element = allElements[i]) != null; i++) {
			      var elementClass = element.className;
			      if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)){
               results.push(element);
              }
		      }
       return results;
    },
   changeHtmlContentByClass:function(content,className,tag){
      var results = [];
      results=this.getElementsByClass(className,tag);

      for (var i = 0 ; i < results.length; i++) {
            results[i].innerHTML = content;
        }    
    },
   changeHtmlContentByID:function(content,elementId){
      var element =  document.getElementById(elementId);
      if (typeof(element) != 'undefined' && element != null)
      {
      element.innerHTML = content;
      }    
  }, 
  addHtmlContentByClass:function(content,className,tag,position){
      var results = [];
      results=this.getElementsByClass(className,tag);
      for (var i = 0 ; i < results.length; i++) {
        if(position==1){
         results[i].innerHTML = content + results[i].innerHTML;
         }
        else{
          results[i].innerHTML = results[i].innerHTML + content;
         }
            
        }    
    },
    appendHtmlContentByClass:function(content,className,tag,contentTag,contentID){
         var results = [];
         results=this.getElementsByClass(className,tag);
         if(results.length > 0){
          //Addes to first element found
          var element=results[0];
          if(!DealerOn_Tracker.hasValue(contentTag)){
              contentTag = 'div';
          }
           if(!DealerOn_Tracker.hasValue(contentID)){
              contentID = 'customContent';
          }
          if (typeof(element) != 'undefined' && element != null) {
               var newTag = document.createElement(contentTag);
               newTag.setAttribute('id',contentID);
               element.appendChild(newTag);
               newTag.innerHTML=content;
            }
       }
     },
  addHtmlContentByID:function(content,elementId,position){
      var element =  document.getElementById(elementId);
      if (typeof(element) != 'undefined' && element != null)
      {
       if(position==1){
         element.innerHTML = content + element.innerHTML;
         }
       else{
          element.innerHTML = element.innerHTML + content;
         }
      }    
  },
     appendHTMLContentByID:function(content,elementId,contentTag,contentID){
        var element = document.getElementById(elementId);
        if(!DealerOn_Tracker.hasValue(contentTag)){
            contentTag = 'div';
        }
         if(!DealerOn_Tracker.hasValue(contentID)){
            contentID = 'customContent';
        }
        if (typeof(element) != 'undefined' && element != null) {
             var newTag = document.createElement(contentTag);
             newTag.setAttribute('id',contentID);
             element.appendChild(newTag);
             newTag.innerHTML=content;
          }
     },

  addHtmlContentByCriteriaByClass:function(content,className,tag,position,criteria,value){
      if(DealerOn_Tracker.ParameterByName(criteria)==value ){
         if(DealerOn_Tracker.hasValue(DealerOn_Tracker.ParameterByName("rm")) ){
          if(DealerOn_Tracker.ParameterByName("rm")!=criteria ){
            this.addHtmlContentByClass(content,className,tag,position);
            return true;
          }
          else {
            return false;
            }
         }
         else{
          this.addHtmlContentByClass(content,className,tag,position);
          return true;
         }       
      }
      return false;
  },
  addHtmlContentByCriteriaByID:function(content,elementId,position,criteria,value){
      if(DealerOn_Tracker.ParameterByName(criteria)==value ){
         if(DealerOn_Tracker.hasValue(DealerOn_Tracker.ParameterByName("rm")) ){
          if(DealerOn_Tracker.ParameterByName("rm")!=criteria ){             
            this.addHtmlContentByID(content,elementId,position);
            return true;
          }
         }
         else{
          this.addHtmlContentByID(content,elementId,position);
          return true;
         }       
      }
      return false;
  },
  replaceHtmlContentByCriteriaByID:function(content,elementId,criteria,value){
    if(DealerOn_Tracker.ParameterByName(criteria) === value){
      var tElement = document.getElementById(elementId);
      if(content !== "" && tElement !== ""){
        tElement.innerHTML = content;
      }
      else { return; }
    }
    else { return; }
  },
  replaceHtmlContentByCriteriaByClass:function(content,elementClass,criteria,value){
    if(DealerOn_Tracker.ParameterByName(criteria) === value){
      var tElement = document.document.getElementsByClassName(elementClass);
      if(tElement.length > 1) return;
      if(content !== "" && tElement !== ""){
        tElement.innerHTML = content;
      }
      else { return; }
    }
    else { return; }
  },
  moveHtmlContentByID:function(elementId,newId){
      var element =  document.getElementById(elementId);
      var newElement =  document.getElementById(newId);
      if ((typeof(element) != 'undefined' && element != null) && (typeof(newElement) != 'undefined' && newElement != null))
      {
       newElement.innerHTML = element.innerHTML;
       this.removeElementByID(elementId);
      }      
  },
   removeElementByClass:function(className,tag){
      var results = [];
      var element;
      results=this.getElementsByClass(className,tag);

      for (var i = 0 ; i < results.length; i++) {
            element=results[i];
            element.parentNode.removeChild(element);
        }
  },
  getContentByID:function(elementId){
      var element =  document.getElementById(elementId);
      if (typeof(element) != 'undefined' && element != null)
      {
       return element.innerHTML;
      }      
      return '';
  },
   getContentByClass:function(className,tag){
      var results = [];
      var element;
      results=this.getElementsByClass(className,tag);
      if(results.length > 0){
        var element=results[0]
        if (typeof(element) != 'undefined' && element != null) {
          return element.innerHTML;
          }
        }
      return '';
  },

   removeElementByID:function(elementId){
     return(element=document.getElementById(elementId))?element.parentNode.removeChild(element):false;
  },
  clearContentByClass:function(className,tag){
    var results = [];
    var element;
    results=this.getElementsByClass(className,tag);
    for (var i = 0 ; i < results.length; i++) {
      element=results[i];
      while( element.hasChildNodes() ){
          element.removeChild(element.lastChild);
      }
    }
  },
  clearContentById:function(elementId){
    var element =  document.getElementById(elementId);
    while( element.hasChildNodes() ){
        element.removeChild(element.lastChild);
    }
  },
  addHTMLContentToParentByClass:function(content,className,tag,contentID,contentTag){
      var results = [];
      results=this.getElementsByClass(className,tag);
      if(!DealerOn_Tracker.hasValue(contentTag)){
            contentTag = 'div';
      }
     
      if(results.length > 0){
        //Addes to first element found
        var element=results[0].parentNode;
        if (typeof(element) != 'undefined' && element != null) {
             var newTag = document.createElement(contentTag);
             newTag.setAttribute('id',contentID);
             element.appendChild(newTag);
             newTag.innerHTML=content;
          }
        }
     },
    addHTMLContentToParentByID:function(content,contentID,elementId,contentTag){
        var element = document.getElementById(elementId);
        element=element.parentNode;
        if(!DealerOn_Tracker.hasValue(contentTag)){
            contentTag = 'div';
        }
        if (typeof(element) != 'undefined' && element != null) {
             var newTag = document.createElement(contentTag);
             newTag.setAttribute('id',contentID);
             element.appendChild(newTag);
             newTag.innerHTML=content;
          }
     },
    changeImageByClass:function(path,className){
      results=this.getElementsByClass(className,'img');
      for (var i = 0 ; i < results.length; i++) {
         results[i].src=path;            
        }
     },
    changeImageByID:function(path,elementId){
       var element =  document.getElementById(elementId);
       if (typeof(element) != 'undefined' && element != null) {
            element.src=path;
        }
     },
     changeImageByPath:function(oldPath,newPath){
        var allImages = document.getElementsByTagName('img');
        var element;
        for(var i = 0, max = allImages.length; i < max; i++){
            if (allImages[i].src === oldPath){
               element = allImages[i];
               if (typeof(element) != 'undefined' && element != null) {
                  element.src=newPath;
                }
            }
         }         
     },
    changeHrefByClass:function(path,className){
      results=this.getElementsByClass(className,'a');
      for (var i = 0 ; i < results.length; i++) {
         results[i].href=path;            
        }
     },
    changeHrefByID:function(path,elementId){
       var element =  document.getElementById(elementId);
       if (typeof(element) != 'undefined' && element != null) {
            element.href=path;
        }
     },
     changeHrefByPath:function(oldPath,newPath){
        var allAtags = document.getElementsByTagName('a');
        for(var i=0; i < allAtags.length; i++){
        	if (allAtags[i].href === oldPath) {
        		allAtags[i].href = newPath;
        	};
        }
     },
    addSocialIconsByClass:function(className,tag,dealerName,size,FBUrl,YoutubeUrl,TwitterUrl,GooglePlusUrl){
       GooglePlusUrl = (typeof GooglePlusUrl === "undefined") ? "" : GooglePlusUrl; 
       var content ='';
          if(FBUrl.length > 0)
            content +='<a target="_blank" href="' + FBUrl + '"><img alt="' + dealerName + ' Facebook" title="' + dealerName + ' Facebook" src="' + AssetsPath + 'assets/socialIcons/FaceBook_' + size + 'x' + size + '.png"></a>';
          if(YoutubeUrl.length > 0)
            content +='<a target="_blank" href="' + YoutubeUrl + '"><img alt="' + dealerName + ' Youtube" title="' + dealerName + ' Youtube" src="' + AssetsPath + 'assets/socialIcons/youtube_' + size + 'x' + size + '.png"></a>';
          if(TwitterUrl.length > 0)
            content +='<a target="_blank" href="' + TwitterUrl + '"><img alt="' + dealerName + ' Twitter" title="' + dealerName + ' Twitter" src="' + AssetsPath + 'assets/socialIcons/Twitter_' + size + 'x' + size + '.png"></a>';
          if(GooglePlusUrl.length > 0)
            content +='<a target="_blank" href="' + GooglePlusUrl + '"><img alt="' + dealerName + ' Google Plus" title="' + dealerName + ' Google Plus" src="' + AssetsPath + 'assets/socialIcons/gplus_' + size + 'x' + size + '.png"></a>';
      var results = [];
      results=this.getElementsByClass(className,tag);
      if(results.length > 0){
        var element=results[0];
        if (typeof(element) != 'undefined' && element != null) {
            var newdiv = document.createElement('div');
            newdiv.setAttribute('class','social');
            element.appendChild(newdiv);
            newdiv.innerHTML=content;
          }
        }
      },
    addSocialIconsByID:function(elementId,dealerName,size,FBUrl,YoutubeUrl,TwitterUrl,GooglePlusUrl){     
      GooglePlusUrl = (typeof GooglePlusUrl === "undefined") ? "" : GooglePlusUrl;
      var content ='';
          if(FBUrl.length > 0)
            content +='<a target="_blank" href="' + FBUrl + '"><img alt="' + dealerName + ' Facebook" title="' + dealerName + ' Facebook" src="' + AssetsPath + 'assets/socialIcons/FaceBook_' + size + 'x' + size + '.png"></a>';
          if(YoutubeUrl.length > 0)
            content +='<a target="_blank" href="' + YoutubeUrl + '"><img alt="' + dealerName + ' Youtube" title="' + dealerName + ' Youtube" src="' + AssetsPath + 'assets/socialIcons/youtube_' + size + 'x' + size + '.png"></a>';
          if(TwitterUrl.length > 0)
            content +='<a target="_blank" href="' + TwitterUrl + '"><img alt="' + dealerName + ' Twitter" title="' + dealerName + ' Twitter" src="' + AssetsPath + 'assets/socialIcons/Twitter_' + size + 'x' + size + '.png"></a>';
          if(GooglePlusUrl.length > 0)
            content +='<a target="_blank" href="' + GooglePlusUrl + '"><img alt="' + dealerName + ' Google Plus" title="' + dealerName + ' Google Plus" src="' + AssetsPath + 'assets/socialIcons/gplus_' + size + 'x' + size + '.png"></a>';
          var newdiv = document.createElement('div');
          newdiv.setAttribute('class','social');
          var element =  document.getElementById(elementId);
          element.appendChild(newdiv);
          newdiv.innerHTML=content;
      },
   createMap:function(dealerId,width,height){
    var map='';
    var map = document.createElement('iframe');
    map.setAttribute('id','googleMap');
    map.setAttribute('frameborder','0');
    map.setAttribute('scrolling','no');
    map.setAttribute('width',width);
    map.setAttribute('height',height);
    var url='http://maps.dealeron.com/map.aspx?dealerid=' + dealerId + '&mw='+ width + '&mh=' + height +'&mode=c';
    map.setAttribute('src',url);
    return map;
   },
    addMapByID:function(dealerId,width,height,elementId){
      var element =  document.getElementById(elementId);
      var newMap=this.createMap(dealerId,width,height);
      element.appendChild(newMap);
      return true;
   },
   addMapByClass:function(dealerId,width,height,className,tag){
      var results = [];
      results=this.getElementsByClass(className,tag);
      if(results.length > 0){
        var element=results[0].parentNode;
        if (typeof(element) != 'undefined' && element != null) {
           var newMap=this.createMap(dealerId,width,height);
           element.appendChild(newMap);
        }
      }
      return true;
   },
   loadjscssfile:function(filename, filetype, where) {
    var fileref;
    if (filetype == "js") {
        fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype == "css") {
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined") {
        if (where == "head") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
        else {
            document.getElementsByTagName("body")[0].appendChild(fileref);
        }
    }

  },
  changeCssByClass:function(property,value,className,tag){
    var results = [];
      var st=property +":" + value + ";"
    results=this.getElementsByClass(className,tag);
    for (var i = 0 ; i < results.length; i++) {
      results[i].setAttribute("style",st);
    }
  },
  changeCssByID:function(property,value,elementId){
       var element =  document.getElementById(elementId);
       var st=property +":" + value + ";"
       if (typeof(element) != 'undefined' && element != null) {
          element.setAttribute("style",st);
        }
  },
  icon:function(o) {
	  o.id = (typeof o.id == 'undefined') ? '' : o.id;
	  o.title = (typeof o.title == 'undefined') ? '' : o.title;
	  o.image = (typeof o.image == 'undefined') ? '' :o.image;
	  o.href = (typeof o.href == 'undefined') ? '' :o.href;	
      o.target = (typeof o.target == 'undefined') ? 'blank' :o.target;	
	  return o;
  },
  addCustomSocialIconsByID:function(elementId,socialIcons){     
	  var content ='';
	  var s;
	  for(var i=0;i < socialIcons.length;i++) {
		   s= socialIcons[i];
		   content +='<a id="' + s.id + '" target="_' + s.target +'" href="' + s.href + '"><img alt="' + s.title + '" src="' + s.image +'"></a>';
	  }
	  if(content > ''){
		  var newdiv = document.createElement('div');
		  newdiv.setAttribute('class','customSocialIcons');
		  var element =  document.getElementById(elementId);
		  element.appendChild(newdiv);
		  newdiv.innerHTML=content;
	  }
  },
  addCustomSocialIconsByClass:function(className,tag,socialIcons){
	  var content ='';
	  var s;
	  for(var i=0;i < socialIcons.length;i++) {
		  s= socialIcons[i];
		  content +='<a id="' + s.id +'" target="_' + s.target +'" href="' + s.href + '"><img alt="' + s.title + '" src="' + s.image +'"></a>';
	  }
	  if(content > ''){
		var results = [];
        results=this.getElementsByClass(className,tag);
        if(results.length > 0){
          var element=results[0];
          if (typeof(element) != 'undefined' && element != null) {
              var newdiv = document.createElement('div');
              newdiv.setAttribute('class','social');
              element.appendChild(newdiv);
              newdiv.innerHTML=content;
            }
          }
	  }
  },

  AddRotatingLogoByClass:function(className,tag,logos,width,height,time){
    var content='';
    var l;
    for(var i=0;i < logos.length;i++) {
      l= logos[i];
      content +='<img id="' + l.id + '" alt="' + l.title + '" title="' + l.title + '" src="' + l.image +'"';
	  if(l.target=='blank'){
         content +=' onclick="window.open(\'' + l.href + '\')" >';		
	  }
	  else{
		 content +=' onclick="location.href=\'' + l.href + '\'" >';
	  }
    }
    if(content>''){
      var css = document.createElement('style');
      css.type = 'text/css';
      var styles ='#rotatingLogo{position:relative;height:'+ height +'px;width:'+ width +'px;}';
      styles +='#rotatingLogo img{position:absolute;left:0;top:0;border:0;cursor:pointer;}';
      css.appendChild(document.createTextNode(styles));
      document.getElementsByTagName("head")[0].appendChild(css);

      var newdiv = document.createElement('div');
      newdiv.setAttribute('id','rotatingLogo');
			
	  results=this.getElementsByClass(className,tag);
      if(results.length > 0){
       var element=results[0];
	   this.clearContentByClass(className,tag);
       element.appendChild(newdiv);
       newdiv.innerHTML=content;
	   this.rotateBannerImages(time);
	  }
    }
  },
  AddRotatingLogoById:function(elementId,logos,width,height,time){
    var content='';
    var l;
    for(var i=0;i < logos.length;i++) {
      l= logos[i];
      content +='<img id="' + l.id + '" alt="' + l.title + '" title="' + l.title + '" src="' + l.image +'"';
	  if(l.target=='blank'){
         content +=' onclick="window.open(\'' + l.href + '\')" >';		
	  }
	  else{
		 content +=' onclick="location.href=\'' + l.href + '\'" >';
	  }
    }
    if(content>''){
      var css = document.createElement('style');
      css.type = 'text/css';
      var styles ='#rotatingLogo{ position:relative;height:'+ height +'px;width:'+ width +'px;}';
      styles +='#rotatingLogo img { position:absolute;left:0;top:0;border:0; cursor:pointer;}';
      css.appendChild(document.createTextNode(styles));
      document.getElementsByTagName("head")[0].appendChild(css);

      var newdiv = document.createElement('div');
      newdiv.setAttribute('id','rotatingLogo');
      var element =  document.getElementById(elementId);
      if (typeof(element) != 'undefined' && element != null) {
        this.clearContentById(elementId);
        element.appendChild(newdiv);
        newdiv.innerHTML=content;
        this.rotateBannerImages(time);
      }
    }
  },
  rotateBannerImages:function(time) {
    var img=document.getElementById('rotatingLogo').getElementsByTagName('img');
    var node=document.getElementById("rotatingLogo").firstChild.cloneNode(true);
    img[0].parentNode.removeChild(img[0]);
    document.getElementById("rotatingLogo").appendChild(node);
    window.setTimeout(function(){DealerOn_ContentManagement.rotateBannerImages(time);},time);		
  }
}

//__________________

//DealerOn_Tracker.trackerSetup();

//__________________
  var DealerOn_Campaign_Tracker ={
    campaign_Tracker_Name: 'DLRON_CAMPAIGN_6116',
    createCookie:function(name, value, days){
      if (days > 0){
         var date = new Date();
         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
         var expires = "; expires=" + date.toGMTString();
    } else {
         var expires = "";
    }
      document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    },
    setCampaignCookie:function(){
     var cookie_info = DealerOn_Tracker.readCookie("__utmz");
     
     DealerOn_Campaign_Tracker.createCookie(DealerOn_Campaign_Tracker.campaign_Tracker_Name, cookie_info, 30);
    
      
   },

    eraseCookie:function(name){
     DealerOn_Campaign_Tracker.createCookie(name,"",-1);
    },
    getCookie:function(cname){
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) 
            return c.substring(name.length,c.length);
        }
       return "";
    },

    deleteCookie:function(){
      var name = DealerOn_Campaign_Tracker.campaign_Tracker_Name;
      var path = "/";
      domain = "";
      if(DealerOn_Campaign_Tracker.getCookie(name)){
        document.cookie = name + "=" + ( ( path ) ? ";path=" + path : "") + 
        ( ( domain ) ? ";domain=" + domain : "" ) + 
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
     }
    },

   campaignCookie:function(){
      var value = DealerOn_Tracker.readCookie("__utmz");
      if (value == null || value == 0) {
         DealerOn_Campaign_Tracker.setCampaignCookie();
         return false;
       }
      else{
         return true;
      }
   },
} 

DealerOn_Campaign_Tracker.setCampaignCookie();


var DealerOn_Coupon = {
  couponName: 'dealerOn_coupon_6116',
  createCookie:function(name, value){
     document.cookie = name + "=" + value + "; path=/";
  },
  setCouponCookie:function(){
      this.createCookie(this.couponName, '1');  
   },
  couponCookie:function(){
      var value = DealerOn_Tracker.readCookie(this.couponName);
      if (value == null || value == 0) {
         this.setCouponCookie();
         return false;
       }
      else{
         return true;
      }
   },
  couponParameter: function() {
     if(DealerOn_Tracker.hasValue(DealerOn_Tracker.ParameterByName("do_coupon")) ){
       return true;
     }
     else{
         return false;
     }
    },
  activateCoupon:function(){
     if(!this.couponCookie()){
     
        var couponPath = location.pathname;
        if(couponPath=="/"){
          return true;
         }
        else if(this.couponParameter()){
          return true;
        }
        else{
          return false;
         }
     
     }
     else{
      return false;
     }
  }
}

var couponLauncher=false;
if (true && DealerOn_Coupon.activateCoupon()){
  couponLauncher=true;
  fadeBackground="#000000";
var nothxid = 0;
DealerOn_ContentManagement.loadjscssfile('/assets/coupon/launcher/movingLauncherLoad_V1203.js','js','body');
DealerOn_ContentManagement.loadjscssfile('/assets/coupon/eas/css/launcher.css','css','head');

}

//________________________________________
var oldOnload=window.onload;
window.onload = function() {

  // call any previously set onload function, if it exists
  oldOnload && oldOnload();

  var DealerOn_FormGeneration = {
	  hasjQuery :false,
	  hasMask : false,
	  hasForm : false,
	  setupLibrary:function(){
	  if (navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
		  return false;
	  }
	  var scripts = document.getElementsByTagName('script');
	  for (var i = 0; i < scripts.length; i++) {
	  if (scripts[i].src.indexOf("jquery.min.js") > 0 || scripts[i].src.indexOf("jquery.js") > 0) DealerOn_FormGeneration.hasjQuery = true;
	  if (scripts[i].src.indexOf("jquery.maskedinput-1.2.2.min.js") > 0) DealerOn_FormGeneration.hasMask = true;
	  if (scripts[i].src.indexOf("form.js") > 0) DealerOn_FormGeneration.hasForm = true;
	  }
	  if (!DealerOn_FormGeneration.hasjQuery){
      <!-- TODO: (STS) Determine if jQuery 1.10 or 1.8 will work here -->
		  DealerOn_ContentManagement.loadjscssfile("http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", "js", "body");
	  }
    DealerOn_FormGeneration.jQueryPlugins();
    },
    jQueryPlugins:function() {
	    if( window.$ ) {
		    if (!DealerOn_FormGeneration.hasMask)
			    DealerOn_ContentManagement.loadjscssfile(JsPath + "js/jQuery/jquery.maskedinput-1.3.1.min.js", "js", "body");
				
		    if (!DealerOn_FormGeneration.hasForm){
			    DealerOn_ContentManagement.loadjscssfile(JsPath + "js/jQuery/jquery.dealerOn.formSubmission.js", "js", "body");
		    }
	    } 
	    else {
		    window.setTimeout( DealerOn_FormGeneration.jQueryPlugins, 50 );
	    }
    },
    activateFormPlugin:function(theform){
	    jQuery('#' + theform).dealerOnFormSubmission();
    },
    finalizeForm:function() {
    if (typeof dealerOnFormSub != 'undefined') { 
	    window.setTimeout(DealerOn_FormGeneration.activateForm, 150 );
    } 
    else {
	    window.setTimeout(DealerOn_FormGeneration.finalizeForm, 50 );
    }
    },
    activateForm:function(){
    for (var i = 0; i < DealerOnCustomForms.length; i++) {
	    var elm=DealerOnCustomForms[i].id;
		    DealerOn_FormGeneration.activateFormPlugin(elm);
    } 	
  }
};

  var DealerOnCustomForms =  DealerOn_ContentManagement.getElementsByClass('dealerOnform','div');
  if(DealerOnCustomForms.length > 0 ){
	  DealerOn_FormGeneration.setupLibrary();
	  DealerOn_FormGeneration.finalizeForm();
  }
};

//_____________________________


var DealerOn_CouponManagment = {
	coupon:function(o) {
		o.id = (typeof o.id == 'undefined') ? 'couponDealerOn' : o.id;
		o.title = (typeof o.title == 'undefined') ? '' : o.title;
		o.image = (typeof o.image == 'undefined') ? '' :o.image;
		o.content = (typeof o.html == 'undefined') ? '' :o.html;
		o.contentTag = (typeof o.contentTag == 'undefined') ? 'div' :o.contentTag;
		o.contentId = (typeof o.contentId == 'undefined') ? 'couponContent' :o.contentId;
		o.width = (typeof o.width == 'undefined') ? '0' :o.width;
		o.height = (typeof o.height == 'undefined') ? '0' :o.height;
		o.top = (typeof o.top == 'undefined') ? '0' :o.top;
		o.right = (typeof o.right == 'undefined') ? '0' :o.right;
		o.bottom = (typeof o.bottom == 'undefined') ? '0' :o.bottom;
		o.left = (typeof o.left == 'undefined') ? '0' :o.left;
		o.close = (typeof o.left == 'undefined') ? 1 :o.left;
		o.overlay = (typeof o.overlay == 'undefined') ? 0 :o.overlay;
		o.overlayId = (typeof o.overlayId == 'undefined') ? 'dealeronOverlay' :o.overlayId;
		o.overlayColor = (typeof o.overlayColor == 'undefined') ? '#000000' :o.overlayColor;
		o.overlayClose = (typeof o.overlayClose == 'undefined') ? 0 :o.overlayClose;
		o.overlayHref = (typeof o.overlayHref == 'undefined') ? '' :o.overlayHref;
	    o.overlayTarget = (typeof o.overlayTarget == 'undefined') ? '' :o.overlayTarget;
        o.overlayPopUpWidth = (typeof o.overlayPopUpWidth == 'undefined') ? '600' :o.overlayPopUpWidth;
        o.overlayPopUpHeight = (typeof o.overlayPopUpHeight == 'undefined') ? '400' :o.overlayPopUpHeight;
		o.href = (typeof o.href == 'undefined') ? '' :o.href;
        o.target = (typeof o.target == 'undefined') ? '' :o.target;
        o.popUpWidth = (typeof o.popUpWidth == 'undefined') ? '600' :o.popUpWidth;
        o.popUpHeight = (typeof o.popUpHeight == 'undefined') ? '400' :o.popUpHeight;
		o.button = (typeof o.button == 'undefined') ? '[]' :o.button;
		o.session = (typeof o.session == 'undefined') ? 0 :o.session;
		o.cookieName = (typeof o.cookieName == 'undefined') ? 'dealeronPopUp' :o.cookieName;
		o.pageName = (typeof o.pageName == 'undefined') ? '[]' :o.pageName;
		o.pageCriteria = (typeof o.pageCriteria == 'undefined') ? '[]' :o.pageCriteria;
		return o;
	},
	pageHeight:function() {
	  var D = document;
	  return Math.max(
		  Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		  Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		  Math.max(D.body.clientHeight, D.documentElement.clientHeight)
		  );
	},
  createBackgroundOverlay:function(id,color){
	var overlayDiv = document.createElement('div');
	overlayDiv.setAttribute('id', id);
	overlayDiv.style.display = 'block';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.width = '100%';
	overlayDiv.style.height = this.pageHeight() + 'px';
	overlayDiv.style.backgroundColor = color;
	overlayDiv.style.zIndex = '9998';
	overlayDiv.style.opacity = '0.8';
	overlayDiv.style.filter = 'alpha(opacity=80)';
	document.body.appendChild(overlayDiv);
  },
  couponButton:function(button,pId1,pId2){
	if (typeof button == 'undefined') return false;
	var buttonDiv = document.createElement('div');
  if (button.id='couponDealerOn')
    buttonDiv.setAttribute('id', 'couponDealerOnBtn');
  else
    buttonDiv.setAttribute('id', button.id);
	buttonDiv.setAttribute('alt', button.title);
	buttonDiv.setAttribute('title', button.title);

	if(button.image > '')
		buttonDiv.style.backgroundImage='url("' + button.image + '")';
		
	buttonDiv.style.width = button.width +'px';
	buttonDiv.style.height = button.height +'px';
	buttonDiv.style.cursor = 'pointer';
	buttonDiv.style.position = 'absolute';
	buttonDiv.style.dislay = 'block';
	if (button.top > 0)
		buttonDiv.style.top = button.top +'px';
	if (button.right > 0)
		buttonDiv.style.right = button.right + 'px';
	if (button.bottom > 0)
		buttonDiv.style.bottom = button.bottom +'px';
	if (button.left > 0)
		buttonDiv.style.left = button.left + 'px';
	buttonDiv.style.zIndex = '2';

	buttonDiv.onclick=function(){
		if (typeof pId2 != 'undefined') DealerOn_ContentManagement.removeElementByID(pId2);
		if (typeof pId1 != 'undefined') DealerOn_ContentManagement.removeElementByID(pId1);
		
		if(button.href > ''){
          if(button.target=='blank'){
            var btnPopUp_opt="toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=" + button.popUpWidth + ", height=" + button.popUpHeight ;
            window.open(button.href ,"_blank",btnPopUp_opt);
          }
          else{
			window.location=button.href;
          }
		}
	};
	if (typeof pId1 != 'undefined')
		document.getElementById(pId1).appendChild(buttonDiv);
	},
	popUpCookie:function(cookieName){
      var value = DealerOn_Tracker.readCookie(cookieName);
      if (value == null || value == 0) {
         DealerOn_Coupon.createCookie(cookieName,'1');
         return false;
       }
      else{
         return true;
      }
   },
 pageCheck:function(name){
	var path = window.location.pathname;
	var filename = path.match(/.*\/([^/]+)\.([^?]+)/i)[1];
		if(filename == name){
			return true;
		 }
		else{
			return false;
		 }
 },
 criteriaCheck:function(value){
  var result=false;
  var c=eval(value);
  var name=c.n.toLowerCase();
  var value=c.v.toLowerCase();

	if(DealerOn_Tracker.ParameterByName(name).toLowerCase()==value ){
		if(DealerOn_Tracker.hasValue(DealerOn_Tracker.ParameterByName("rm")) ){
			if(DealerOn_Tracker.ParameterByName('rm') != name ){
				 result= true;
			}
		}
		else
			 result= true;
	}      
	return result;
 },
 createCoupon:function(coupon){	 
	if(coupon.session) {
		if(this.popUpCookie(coupon.cookieName)) return false;
	}
	
	var p= eval(coupon.pageName);
	var activate=true;
	if ( p.length > 0 ) activate=false;
  for(var i=0;i < p.length;i++) {
		if(!activate){
			activate=this.pageCheck(p[i]);
		}
	}
	if(!activate) return false;
	
  //-------------

	p= eval(coupon.pageCriteria);
	activate=true;
	if ( p.length > 0 ) activate=false;
  for(var i=0;i < p.length;i++) {
		if(!activate){
			activate=this.criteriaCheck(p[i]);
		}
	}
	if(!activate) return false;	
		
	var couponDiv = document.createElement('div');
	couponDiv.setAttribute('id', coupon.id);
	couponDiv.style.dislay = 'none';
	couponDiv.style.position = 'absolute';
	if (coupon.top > 0)
		couponDiv.style.top = coupon.top +'px';
	else{
		if ( parseInt(this.pageHeight()) > 800){
			couponDiv.style.top = '10%';
		}
		else{
			couponDiv.style.top = '25%';
		}
	}
	if (coupon.left > 0)
		couponDiv.style.left = coupon.left +'px';
	else
		couponDiv.style.left = '25%';
		
	couponDiv.style.zIndex = '99999';
	couponDiv.style.backgroundColor = '#fff';
  if(coupon.image>'')
	  couponDiv.style.backgroundImage='url("' + coupon.image + '")';
	couponDiv.style.width = coupon.width +'px';
	couponDiv.style.height = coupon.height +'px';
	if(coupon.close){
		var closeDiv = document.createElement('div');
		closeDiv.setAttribute('id', 'closeForm');
		closeDiv.setAttribute('alt', 'Close');
		closeDiv.setAttribute('title', 'Close');
		closeDiv.style.backgroundImage='url('+ AssetsPath +'images/close.png)';
		closeDiv.style.width = '27px';
		closeDiv.style.height = '31px';
		closeDiv.style.cursor = 'pointer';
		closeDiv.style.position = 'absolute';
		closeDiv.style.dislay = 'block';
		closeDiv.style.top = '-7px';
		closeDiv.style.right = '-5px';
		closeDiv.style.zIndex = '2';
		couponDiv.appendChild(closeDiv);
		closeDiv.onclick=function(){
			DealerOn_ContentManagement.removeElementByID(coupon.id);
			if(coupon.overlay){
				DealerOn_ContentManagement.removeElementByID(coupon.overlayId);
			}
			if(coupon.href > ''){
              if(coupon.target=='blank'){
                var couponPopUp_opt="toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=" + coupon.popUpWidth + ", height=" + coupon.popUpHeight;
                window.open(coupon.href ,"_blank",couponPopUp_opt);
              }
              else{
			    window.location=coupon.href;
              }
			}
		};
	}
	
	if(coupon.content>''){		
		var contentDiv = document.createElement(coupon.contentTag);
		contentDiv.setAttribute('id', coupon.contentId);	
		contentDiv.innerHTML=coupon.content;
		couponDiv.appendChild(contentDiv);
	}
	
	if(coupon.overlay){
		this.createBackgroundOverlay(coupon.overlayId,coupon.overlayColor);
		if(coupon.overlayClose){
			document.getElementById(coupon.overlayId).onclick=function(){
			DealerOn_ContentManagement.removeElementByID(coupon.id);
			DealerOn_ContentManagement.removeElementByID(coupon.overlayId);
			if(coupon.overlayHref > ''){
              if(coupon.overlayTarget=='blank'){
                var overlayPopUp_opt="toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=" + coupon.overlayPopUpWidth + ", height=" + coupon.overlayPopUpHeight;
                window.open(coupon.overlayHref ,"_blank",overlayPopUp_opt);
             }
              else{
			     window.location=coupon.overlayHref;
              }              
            }
			
		};
	  }
	}
	document.body.appendChild(couponDiv);
	var b= eval(coupon.button);
    for(var i=0;i < b.length;i++) {
		this.couponButton(b[i],coupon.id,coupon.overlayId);
	}
 }
}