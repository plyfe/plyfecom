/*!CK:3425700107!*//*1394540479,178191957*/

if (self.CavalryLogger) { CavalryLogger.start_js(["noJ9n"]); }

__d("endsWith",[],function(a,b,c,d,e,f){function g(h,i){return h.indexOf(i,h.length-i.length)>-1;}e.exports=g;});
__d("MMentions",["DataStore","DOM","HashtagParser","HTML","MJSEnvironment","MParent","MTouchHelper","MViewport","Stratcom","StratcomManager","Style","Vector","copyProperties","endsWith","mtx","repeatString","setIntervalAcrossTransitions","setTimeoutAcrossTransitions","startsWith"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y){var z={};function aa(ca){var da=z[ca];if(!da){da=v('<br>\n',ca.length);z[ca]=da;}return da;}function ba(ca,da){"use strict";this._onBeforeEdit=this._onBeforeEdit.bind(this);this._onEdit=this._onEdit.bind(this);this._onFocusChange=this._onFocusChange.bind(this);this._onQueryResult=this._onQueryResult.bind(this);this._onSuggestionClick=this._onSuggestionClick.bind(this);this._onSuggestionTouchStart=this._onSuggestionTouchStart.bind(this);this._onBodyTouch=this._onBodyTouch.bind(this);this._processInput=this._processInput.bind(this);this._sync=this._sync.bind(this);this._syncShadow=this._syncShadow.bind(this);this._updatePosition=this._updatePosition.bind(this);this._hideSuggestion=this._hideSuggestion.bind(this);this._hideSuggestionInternal=this._hideSuggestionInternal.bind(this);this._forceInputPosition=this._forceInputPosition.bind(this);this._parse=this._parse.bind(this);this._renderHashtags=this._renderHashtags.bind(this);this._mentionId=ca.id;this._bottomMargin=null;var ea=ca.getElementsByTagName('textarea')[0];this._listeners=[];this._editListeners=[];this._query=null;this._queryResult=null;this._focused=false;this._disabled=false;this._hasHashtags=false;this._ignoreFocusChange=false;this._ignoreFocusChangeTimeout=null;this.shouldShowHashtags=false;this._typeObjects=null;this._typeObjectsOrder=null;this._uids={};this._weakReferences={};this._source=da;this._sourceForShowOnFocus=null;this._showBootstrappedResultsOnFocus=false;this._element=ca;this._input=ea;this._queryStringMatcher=/[^\s]+$/;this._resultMustMatchQueryExactly=true;this._isBroadcastRequestMode=false;var fa=g.get(this._input);this._initialWeakReferences=fa.initial_weak_references?fa.initial_weak_references:{};this._eventData={input:this._input,hasTags:false};this._shadow=h.create('div',{className:'mentions-shadow','aria-hidden':true},'');this._measurer=h.create('div',{className:'mentions-measurer','aria-hidden':true});ba._suggestion=ba._suggestion||h.create('div',{className:'mentions-suggest'});this._hiddenInput=h.create('input',{type:'hidden',name:ea.name,sigil:'mentionsHiddenInput'});ea.removeAttribute('name');h.uniqID(ea);this._syncStyles(this._shadow);this._syncStyles(this._measurer);p.enableDispatch(ea,'cut');p.enableDispatch(ea,'paste');p.enableDispatch(ea,'scroll');this._listeners.push(h.listen(ea,'blur',null,this._onFocusChange),h.listen(ea,'focus',null,this._onFocusChange),h.listen(this._input,'scroll',null,this._syncShadow));this._listeners.push(o.listen('MMentions:update',null,this._sync),o.listen('MMentions:disable',null,this._disable.bind(this)),o.listen('MMentions:enable',null,this._enable.bind(this)));if(this._input.form){p.enableDispatch(this._input.form,'reset');this._onSubmit=this._onSubmit.bind(this);this._listeners.push(h.listen(this._input.form,'submit',null,this._onSubmit),h.listen(this._input.form,'reset',null,this._onEdit));}this._listeners.push(o.listen('MMentions:decorations:hide',null,function(event){h.hide(this._shadow);h.hide(this._measurer);}.bind(this)));this._listeners.push(o.listen('MMentions:decorations:show',null,function(event){h.show(this._shadow);h.show(this._measurer);}.bind(this)));var ga=document.createDocumentFragment();ga.appendChild(this._hiddenInput);ga.appendChild(this._shadow);ga.appendChild(this._measurer);ca.appendChild(ga);var ha=q.getScrollParent(ca);if(ha===window){n.appendNode(ba._suggestion);}else h.appendContent(ha,ba._suggestion);if(this._input.value)this._parse(this._input.value);}ba.prototype.dispose=function(){"use strict";if(!this._disposed){while(this._listeners.length)this._listeners.pop().remove();while(this._editListeners.length)this._editListeners.pop().remove();clearTimeout(this._inputTimer);clearTimeout(this._hideSuggestionTimer);clearTimeout(this._forceInputPositionTimer);this._releaseSuggestion();h.remove(this._hiddenInput);h.remove(this._shadow);h.remove(this._measurer);h.remove(ba._suggestion);for(var ca in this)delete this[ca];this._disposed=true;}};ba.prototype.setTypeObjects=function(ca){"use strict";this._typeObjects=ca;};ba.prototype.setTypeObjectsOrder=function(ca){"use strict";this._typeObjectsOrder=ca;};ba.prototype.setBroadcastRequestMode=function(ca){"use strict";this._isBroadcastRequestMode=true;this._resultMustMatchQueryExactly=false;this._showBootstrappedResultsOnFocus=true;this._sourceForShowOnFocus=ca;this._alternateMatchingRegex=/^[a-z]{1}/i;this._queryStringMatcher=/((\w+\s)?){1,2}\w+\s?$/;return this;};ba.prototype._getExpandElement=function(){"use strict";return l.bySigil(this._element,'m-mentions-expand')||this._element;};ba.prototype._onSubmit=function(){"use strict";var ca=this._input.value,da=w(function(){if(this._disposed){clearInterval(da);}else if(this._input.value!==ca){this._sync();clearInterval(da);}}.bind(this),100);x(function(){clearInterval(da);},10000);};ba.prototype._onFocusChange=function(ca){"use strict";if(this._suggestionShown&&this._ignoreFocusChange)return;switch(ca.getType()){case 'focus':if(ca.getTarget()===this._input){this._focus();}else this._blur();break;default:this._blur();break;}};ba.prototype._focus=function(){"use strict";if(this._focused)return;this._focused=true;var ca=this._sourceForShowOnFocus,da=this._showBootstrappedResultsOnFocus&&ca;if(!this._editListeners.length){var ea=ba._suggestion,fa=this._SUGGESTION_SIGIL;this._editListeners.push(o.listen('scroll',null,function(event){this._updatePosition(event);this.setIgnoreFocusChange(false);}.bind(this)),this._source.listen('waiting',this._hideSuggestion),this._source.listen('resultsready',this._onQueryResult),h.listen(this._input,'touchmove',null,this._syncShadow),h.listen(this._input,'keydown',null,this._onBeforeEdit),h.listen(this._input,'keyup',null,this._onEdit),h.listen(this._input,'input',null,this._onEdit),h.listen(this._input,'cut',null,this._onEdit),h.listen(this._input,'paste',null,this._onEdit),h.listen(document.body,m.EVT_TOUCHSTART,null,this._onBodyTouch),h.listen(this._input,m.EVT_TOUCHSTART,null,this._hideSuggestion),h.listen(ea,m.EVT_TOUCHSTART,fa,this._onSuggestionTouchStart),h.listen(ea,'click',fa,this._onSuggestionClick));if(da)this._editListeners.push(ca.listen('resultsready',this._onQueryResult),ca.listen('bootstrapped',ca.showOnFocus));}if(!this._source._startedByMentions){this._source._startedByMentions=true;this._source.didChange('');this._source.didStart();if(da){ca.didChange('');ca.didStart();}}da?ca.showOnFocus():this._hideSuggestion();clearTimeout(this._forceInputPositionTimer);this._forceInputPositionTimer=x(this._forceInputPosition,100);this._sync();};ba.prototype._blur=function(){"use strict";if(!this._focused||document.activeElement===this._input)return;delete this._focused;while(this._editListeners.length)this._editListeners.pop().remove();clearTimeout(this._forceInputPositionTimer);clearTimeout(this._inputTimer);delete this._forceInputPositionTimer;this._getExpandElement().style.marginBottom='';this._hideSuggestion(true);this._sync();};ba.prototype._forceInputPosition=function(){"use strict";var ca=this._input.getBoundingClientRect(),da=n.getHeight();if(ca.top<0||ca.top>da){this._forceInputPositionTimer=x(this._forceInputPosition,16);return;}if(document.activeElement!==this._input){this._blur();return;}};ba.prototype.setIgnoreFocusChange=function(ca){"use strict";this._ignoreFocusChange=ca;};ba.prototype._onSuggestionTouchStart=function(event){"use strict";if(!this._suggestionShown){event.prevent();return;}this.setIgnoreFocusChange(true);};ba.prototype._onSuggestionClick=function(event){"use strict";if(!this._suggestionShown){event.prevent();return;}this.setIgnoreFocusChange(false);var ca=event.getNode(this._SUGGESTION_SIGIL);this._onSuggestionSelect(this._queryResult[ca.queryIndex]);this._hideSuggestion(true);this._input.focus();};ba.prototype._onBodyTouch=function(event){"use strict";var ca=event.getTarget();if(ba._suggestion===ca||this._element===ca||this._element.contains(ca)||ba._suggestion.contains(ca))return;this._blur();};ba.prototype._onSuggestionSelect=function(ca){"use strict";var da=this._input,ea=da.selectionStart;if(ea!==da.selectionEnd)return;var fa=da.value,ga=this._query;if(this._showBootstrappedResultsOnFocus){fa=fa||'';ga=this._query||'';}var ha=ca.display,ia=this._createRegex(ha,'i'),ja=this._createRegex(ga,'i'),ka=ha+this._NAME_SUFFIX,la,ma,na=fa.substring(ea-ga.length,ea);if(!ja.test(na))return;if(ia.test(fa.substring(ea-ha.length,ea))){la=fa.substring(0,ea-ha.length);}else if(ja.test(fa)){var oa=na.substr(-ga.length);if(oa===ga){la=fa.substring(0,ea-ga.length);var pa='';for(var qa=0,ra=ka.length;qa<ra;qa++){pa+=ka.charAt(qa);if(t(la,pa))break;}if(t(la,' '+pa)||la===pa)la=la.substr(0,la.lastIndexOf(pa));}else return;}else if(this._showBootstrappedResultsOnFocus){la='';}else return;if(la&&la.charAt(la.length-1)==='@')la=la.slice(0,-1);ma=la+ka+fa.substring(ea);da.value=ma;ea+=ma.length-fa.length;if(k.IS_APPLE_WEBKIT_IOS){this.setIgnoreFocusChange(true);da.blur();da.focus();this.setIgnoreFocusChange(false);}da.setSelectionRange(ea,ea);var sa=this._uids[ka];if(!sa)sa=this._uids[ka]=[];if(sa.indexOf(ca.uid)===-1){sa.push(ca.uid);if(this._isBroadcastRequestMode)o.invoke('MMentions:broadcastRequestAdd',this._input.form.id,ca);this._tagsUpdated();}if(ca.getAttribute('weak_reference'))this._weakReferences[ca.uid]=true;this._sync();};ba.prototype._hideSuggestion=function(ca){"use strict";if(this._suggestionShown){delete this._suggestionShown;clearTimeout(this._hideSuggestionTimer);if(ca===true){delete this._hideSuggestionTimer;this._hideSuggestionInternal();}else this._hideSuggestionTimer=x(this._hideSuggestionInternal,350);}};ba.prototype._hideSuggestionInternal=function(){"use strict";delete this._hideSuggestionTimer;if(this._isInstanceSuggestion()){this._releaseSuggestion();h.hide(ba._suggestion);h.setContent(ba._suggestion,'');}this._input.removeAttribute('spellcheck');this._input.removeAttribute('autocapitalize');this._input.removeAttribute('autocorrect');this._getExpandElement().style.marginBottom=this._bottomMargin;};ba.prototype._assignSuggestion=function(){"use strict";g.get(ba._suggestion).mentionId=this._mentionId;};ba.prototype._releaseSuggestion=function(){"use strict";g.get(ba._suggestion).mentionId=null;};ba.prototype._isInstanceSuggestion=function(){"use strict";return g.get(ba._suggestion).mentionId===this._mentionId;};ba.prototype._showSuggestion=function(){"use strict";this._assignSuggestion();if(this._suggestionShown)return;this._suggestionShown=true;var ca=this._input,da=ba._suggestion;q.apply(da,{display:'block',width:ca.offsetWidth+'px'});ca.setAttribute('spellcheck','false');ca.setAttribute('autocapitalize','off');ca.setAttribute('autocorrect','off');if(this._bottomMargin===undefined)this._bottomMargin=this._getExpandElement().style.marginBottom;var ea=ba._MIN_DISTANCE,fa=ca.getBoundingClientRect(),ga=document.elementFromPoint(1,fa.bottom+ea);if(!ga&&!this._isBroadcastRequestMode){var ha=n.getScroll();this._getExpandElement().style.marginBottom=ea+'px';n.scrollTo(ha.x,Math.max(ha.y,ha.y+fa.top-30));}if(this._hideSuggestionTimer){clearTimeout(this._hideSuggestionTimer);delete this._hideSuggestionTimer;}};ba.prototype._updatePosition=function(){"use strict";if(!this._suggestionShown)return;var ca=ba._suggestion,da=ca.offsetHeight,ea=this._input,fa=ea.offsetHeight,ga=r.getElementPosition(ea),ha=ea.getBoundingClientRect(),ia=ca.offsetParent,ja;if(ia===document.documentElement){ja=new r(0,0);}else ja=r.getElementPosition(ia);var ka=ha.left-ja.x,la=ga.y-ja.y,ma=n.getHeight()/2,na=ka,oa=la+fa,pa=ha.bottom+da>ma&&ha.top-da>=0;if(pa||this._isBroadcastRequestMode)oa=la-da;q.apply(ca,{left:na+'px',top:oa+'px'});};ba.prototype._onBeforeEdit=function(event){"use strict";if(!this._focused)return;if(this._inputTimer)clearTimeout(this._inputTimer);switch(event.getRawEvent().keyCode){case 8:this._onBackSpaceKey(event);break;}};ba.prototype._onEdit=function(event){"use strict";if(this._inputTimer)clearTimeout(this._inputTimer);switch(event.getRawEvent().keyCode){case 13:this._hideSuggestion();this._syncShadow();return;default:this._sync();this._inputTimer=x(this._processInput,160);}};ba.prototype._onBackSpaceKey=function(event){"use strict";var ca=this._input,da=ca.selectionStart;if(da!==ca.selectionEnd)return;var ea=ca.value,fa=this._getTokenByCursorPosition(da-1);if(fa){var ga=ea.substring(0,da),ha=fa.name;if(ga.indexOf(ha)===(ga.length-ha.length)){var ia;if(ba._CJK_ALTER_NAME.test(ha)){ia=this._trim(ha.replace(ba._CJK_ALTER_NAME,''));}else if(ba._LATIN_ALTER_NAME.test(ha)){ia=this._trim(ha.replace(ba._LATIN_ALTER_NAME,''));}else{var ja=ha.split(/\s+/g);if(ja.length>1){ja.pop();ia=ja.join(' ');}}if(ia){ia+=this._NAME_SUFFIX;this._uids[ha].splice(this._uids[ha].indexOf(fa.uid),1);this._uids[ia]=this._uids[ia]||[];this._uids[ia].push(fa.uid);ea=ea.substr(0,da-ha.length)+ia+ea.substr(da);da-=(ha.length-ia.length);ca.value=ea;ca.setSelectionRange(da,da);event.prevent();this._sync();return;}}}var ka;while(true){var la=ea.charAt(da-1);if(la==='\u200B'){ea=ea.substring(0,da-2)+ea.substr(da);da-=1;ka=true;}else break;}if(ka){event.prevent();ea=ea.substring(0,da-2)+ea.substr(da);ca.value=ea;}};ba.prototype._processInput=function(){"use strict";if(this._disabled)return;this._sync();this._onQueryResult(null,null);this._hideSuggestion();this._query=null;this._inputTimer=null;var ca=this._input,da=ca.value,ea=ca.selectionStart;if(ea!==ca.selectionEnd)return;var fa=da.charAt(ea);if(fa&&!(/\s/).test(fa))return;var ga=ca.value.substr(0,ea),ha=ga.match(this._queryStringMatcher);if(!ha)return;var ia=ha[0],ja;if(ia.charAt(0)==='@'){ia=ia.slice(1);ja=ia.length>0;}else ja=ia.length>2&&(ba._EN_NAMES.test(ia)||ba._JP_SYLLABARY_CHARS.test(ia)||ba._CJK_CHARS.test(ia)||(this._alternateMatchingRegex&&this._alternateMatchingRegex.test(ia)));var ka=ga.lastIndexOf('@');if(ka>-1){ia=ga.substr(ka+1);ja=true;}ja=ja&&!this._getTokenByCursorPosition(ea);if(ja){this._query=ia;this._source.didChange(ia);this._source.didStart();}};ba.prototype._onQueryResult=function(ca){"use strict";var da=ca&&ca.length>0,ea=this._showBootstrappedResultsOnFocus||(this._query&&this._input.value.indexOf(this._query)>=0);if(!ea||!da||this._disposed)return;this._hideSuggestion();this._queryResult=null;if(this._resultMustMatchQueryExactly&&!this._createRegex(this._query,'ig').test(ca[0].display))return;var fa=[],ga=document.createDocumentFragment(),ha=0,ia={};for(var ja in this._uids){var ka=this._uids[ja];for(var la=0,ma=ka.length;la<ma;la++)ia[ka[la]]=true;}var na=function(ua){if(!ia[ua.uid]){ua.htmlFor=this._input.id;o.addSigil(ua,this._SUGGESTION_SIGIL);o.addSigil(ua,'touchable');g.set(ua,{nativeClick:true});ua.queryIndex=ha;ga.appendChild(ua);fa[ha]=ua;ha++;if(ha>5)return true;}};if(this._typeObjects&&this._typeObjectsOrder){var oa={};for(var pa=0;pa<ca.length;pa++){var qa=ca[pa].getAttribute('renderType');if(!qa)continue;if(!(qa in oa))oa[qa]=[];oa[qa].push(ca[pa]);}for(pa in this._typeObjectsOrder){qa=this._typeObjectsOrder[pa];var ra=this._typeObjects[qa],sa=oa[qa],ta=sa?sa.filter(function(ua){return !ia[ua.uid];}):[];if(ta.length>0){ga.appendChild(this._buildSectionHeader(ra));ta.some(na,this);}else if(ra.show_always){ga.appendChild(this._buildSectionHeader(ra));ga.appendChild(this._buildNoResultEntry());}}}else ca.some(na,this);if(ha){h.setContent(ba._suggestion,'');this._queryResult=fa;ba._suggestion.appendChild(ga);this._showSuggestion();this._updatePosition();}};ba.prototype._buildSectionHeader=function(ca){"use strict";if(ca==null)return null;return (new j(ca.xhp)).getFragment().firstChild;};ba.prototype._buildNoResultEntry=function(){"use strict";var ca=h.create('i',{className:'mentions-suggest-item-img noResultsIcon'}),da=h.create('span',{className:'no-results'},"No Results"),ea=h.create('label',{className:'mentions-suggest-item'},ca,da);ea.appendChild(ca);ea.appendChild(da);return ea;};ba.prototype._sync=function(){"use strict";if(!this._disposed&&!this._disabled){this._syncMentionedUIDs();this._syncHashtags();this._syncShadow();this._syncMeasurer();this._syncValue();}};ba.prototype._disable=function(ca){"use strict";this._disabled=true;};ba.prototype._enable=function(){"use strict";this._disabled=false;};ba.prototype._parse=function(ca){"use strict";this._uids={};var da=/[0-9]+/,ea=/^@\[(?:[0-9]+:){2}(.+)\]/,fa=ca.match(ba._MENTIONS_REGEX);if(fa){for(var ga=0;ga<fa.length;ga++){var ha=fa[ga].match(da),ia=fa[ga].match(ea);ia=ia?ia[1].replace(/\\([^\\])/g,'$1').replace(/\\\\/g,'\\'):null;if(!ia)continue;if(!this._uids[ia])this._uids[ia]=[];this._uids[ia].push(ha);ca=ca.replace(fa[ga],ia);}this._input.value=ca;}this._sync();};ba.prototype._syncMentionedUIDs=function(){"use strict";var ca=this._input.value;if(!ca){this._uids={};return;}var da=false;for(var ea in this._uids){var fa=this._createRegex(ea,'g'),ga=ca.match(fa);if(!ga||!ga.length){delete this._uids[ea];da=true;continue;}var ha=this._uids[ea];if(!ha.length){delete this._uids[ea];}else if(ha.length>ga.length)ha.length=ga.length;}if(da)this._tagsUpdated();};ba.prototype._syncHashtags=function(){"use strict";var ca=this._input.value;if(this.shouldShowHashtags)this._hasHashtags=ba._HASHTAG_TRIGGER.test(ca);};ba.prototype._renderHashtags=function(ca){"use strict";if(!this._hasHashtags)return h.htmlize(ca);var da=i.parseWithoutMentions(ca),ea=[],fa=0;for(var ga=0;ga<da.length;ga++){ea.push(h.htmlize(ca.substring(fa,da[ga].offset)),'<span class="mentions-highlight">',ca.charAt(da[ga].offset),da[ga].hashtag,'</span>');fa=da[ga].offset+da[ga].hashtag.length+1;}ea.push(h.htmlize(ca.substring(fa)));return ea.join('');};ba.prototype._syncShadow=function(ca){"use strict";var da=this._input,ea=da.value,fa=this._shadow;if(!ea){h.setContent(fa,'');return;}if(ca&&(ca.getType()==='scroll'||ca.getType()==='touchmove')){fa.scrollTop=da.scrollTop;fa.scrollLeft=da.scrollLeft;return;}var ga='\u200B{\u200B',ha='\u200B}',ia='\u200B{\u200B\u200B}',ja,ka=function(ra,sa){var ta=this._uids[ra][ja],ua=this._weakReferences[ta]||this._initialWeakReferences[ta];ja++;return ((ua?ia:ga)+sa+ga);};for(var la in this._uids){var ma=this._createRegex(la,'g');ja=0;ea=ea.replace(ma,ka.bind(this,la));}var na=ea.split(ga),oa=[],pa=false;for(var qa in na){if(pa){if(y(na[qa],ha)){oa.push('<span class="mentions-highlight-weak-reference">',h.htmlize(na[qa].substr(ha.length)),'</span>');}else oa.push('<span class="mentions-highlight">',h.htmlize(na[qa]),'</span>');}else oa.push(this._renderHashtags(na[qa]));pa=!pa;}ea=oa.join('');ea=ea.replace(/\n+$/,aa);if(this._shadowHTML!==ea){this._shadowHTML=ea;fa.innerHTML=ea;}fa.scrollTop=da.scrollTop;fa.scrollLeft=da.scrollLeft;};ba.prototype._syncMeasurer=function(){"use strict";var ca=this._input,da=ca.value;if(!da){h.setContent(this._measurer,'');return;}var ea=ca.selectionStart,fa=ca.selectionEnd;if(ea!==fa)return;var ga=h.create('div',{},ca.value.substr(0,ea));this._measurer.innerHTML=ga.innerHTML+'<br><div></div>';};ba.prototype._syncValue=function(){"use strict";var ca=this._input.value;for(var da in this._uids){var ea=this._createRegex(da,'g'),fa=this._uids[da],ga=0;ca=ca.replace(ea,function(ha){var ia=parseInt(fa[ga++],10);if(ia){return '@['+ia+':'+ha+']';}else return ha;});}ca=ca.replace(/\u200B/g,'');this._hiddenInput.value=ca;};ba.prototype._syncStyles=function(ca){"use strict";var da=getComputedStyle(this._input,null),ea=ca.style,fa=['fontSize','fontFamily','letterSpacing','lineHeight','paddingTop','paddingLeft','paddingRight','paddingBottom','textIndent','wordSpacing'];while(fa.length){var ga=fa.pop();ea[ga]=da[ga];}};ba.prototype._getTokenByCursorPosition=function(ca){"use strict";var da=this._input.value,ea=null,fa=this._uids;for(var ga in fa){if(ea)break;var ha=da.indexOf(ga);if(ha<0)continue;var ia=this._createRegex(ga,'g'),ja=0;da.replace(ia,function(ka,la){if(!ea&&ca>la&&ca<la+ka.length)ea={name:ga,uid:fa[ga][ja]};ja++;});}return ea;};ba.prototype._trim=function(ca){"use strict";return ca.trim?ca.trim():ca.replace(/(^\s*)|(\s*$)/g,'');};ba.prototype._createRegex=function(ca,da){"use strict";ca=ca.replace(ba._REGEX_SPECIAL_CHARS,'\\$&');return new RegExp(ca,da);};ba.prototype._tagsUpdated=function(){"use strict";this._eventData.hasTags=Object.keys(this._uids).length>0;o.invoke('MMentions:change',null,this._eventData);};s(ba,{_MENTIONS_REGEX:/@\[([0-9]+)\:(([^\\\]]*(?:\\.)*)*)\]/g,_EN_NAMES:/^[A-Z][a-z]{1}/,_CJK_ALTER_NAME:/\uff08[^\uff09]+\uff09(\u200B\u200B)?$/g,_LATIN_ALTER_NAME:/\([^\)]+\)(\u200B\u200B)?$/g,_JP_SYLLABARY_CHARS:/(^[\u3040-\u309F]{3,3})|(^[\u30A0-\u30FF]{3,3})/g,_CJK_CHARS:/^[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]{2,2}/g,_REGEX_SPECIAL_CHARS:/[\/\.\*\+\?\}\(\)\[\]\{\}\\]/g,_HASHTAG_TRIGGER:/[#\uFF03]/,_MIN_DISTANCE:130});s(ba.prototype,{_NAME_SUFFIX:'\u200B\u200B',_SUGGESTION_SIGIL:'mentionsSuggestionItem',_COMPOSER_SIGIL:'composer-textarea'});e.exports=ba;});
__d("MMentionsRenderer",["DOM"],function(a,b,c,d,e,f,g){var h={createSuggestionNode:function(i){var j=g.create('img',{src:i.photo,className:'mentions-suggest-item-img'}),k=g.create('div',{className:'mentions-suggest-item-text'});k.appendChild(g.create('span',{className:'mentions-suggest-item-name'},i.display));if(i.subtext){var l=i.subtext;if(i.type&&(i.type!='user'))l=l?i.type+' \u00b7 '+l:i.type;k.appendChild(g.create('span',{className:'mentions-suggest-item-subtext'},l));}var m=g.create('label',{className:'mentions-suggest-item',display:i.display,uid:i.id,rel:i.id,photo:i.photo,subtext:i.subtext},j,k);m.appendChild(j);m.appendChild(k);if(i.weak_reference)m.setAttribute('weak_reference','y');if(i.renderType)m.setAttribute('renderType',i.renderType);return m;}};e.exports=h;});
__d("MTypeaheadTouchSourceShowOnFocus",["MTypeaheadTouchSource"],function(a,b,c,d,e,f,g){var h=5;for(var i in g)if(g.hasOwnProperty(i))k[i]=g[i];var j=g===null?null:g.prototype;k.prototype=Object.create(j);k.prototype.constructor=k;k.__superConstructor__=g;function k(l,m){"use strict";g.call(this,l,m);this._bootstrapData=[];}k.prototype.showOnFocus=function(){"use strict";var l=this.renderNodes(null,this._bootstrapData);this.invoke('resultsready',l);this.invoke('complete');};k.prototype.ondata=function(l){"use strict";g.prototype.ondata.call(this,l);var m=Math.min(l.length,h);for(var n=0;n<m;++n)if(l[n].uid)this._bootstrapData.push(l[n].uid);};e.exports=k;});
__d("MMentionsBootstrapDataSource",["MMentionsRenderer","MTypeaheadTouchSourceShowOnFocus"],function(a,b,c,d,e,f,g,h){for(var i in h)if(h.hasOwnProperty(i))k[i]=h[i];var j=h===null?null:h.prototype;k.prototype=Object.create(j);k.prototype.constructor=k;k.__superConstructor__=h;function k(l,m){"use strict";h.call(this,l,m);}k.prototype.createNode=function(l){"use strict";return g.createSuggestionNode(l);};e.exports=k;});
__d("MMentionsOnDemandDataSource",["MMentionsRenderer","MTypeaheadOnDemandSource"],function(a,b,c,d,e,f,g,h){for(var i in h)if(h.hasOwnProperty(i))k[i]=h[i];var j=h===null?null:h.prototype;k.prototype=Object.create(j);k.prototype.constructor=k;k.__superConstructor__=h;function k(l){"use strict";h.call(this,l);}k.prototype.createNode=function(l){"use strict";return g.createSuggestionNode(l);};e.exports=k;});
__d("InitMMentions",["MMentions","MMentionsBootstrapDataSource","MMentionsOnDemandDataSource","Stratcom","TypeaheadCompositeSource"],function(a,b,c,d,e,f,g,h,i,j,k){var l={},m={},n={},o=function(p){var q=p.element;if(!q)return;if(!q.getBoundingClientRect)return;var r=[],s=p.sources.bootstrapped,t=p.sources.online,u=p.typeObjects,v=p.typeObjectsOrder,w=null,x='|',y='',z,aa='';if(s){w=new h(s.src,s.source_key);if(!p.isBroadcastRequest){z=s.source_key+x+s.src;if(!l[z])l[z]=w;r.push(l[z]);}}if(t){aa=x+t.src;if(!m[aa])m[aa]=new i(t.src);r.push(m[aa]);}if(!r.length)return;y=z+x+aa;if(!(y in n))n[y]=new k(r);var ba=n[y],ca=new g(q,ba);if(p.isBroadcastRequest)ca.setBroadcastRequestMode(w);ca.setTypeObjects(u);ca.setTypeObjectsOrder(v);ca.shouldShowHashtags=p.shouldShowHashtags;j.listen('m:page:unload-complete',null,function(event){if(!document.documentElement.contains(q)){j.removeCurrentListener();ca.dispose();ca=null;q=null;}});};f.main=o;});