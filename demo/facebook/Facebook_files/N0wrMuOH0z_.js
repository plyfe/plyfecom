/*!CK:613098685!*//*1394444382,178130527*/

if (self.CavalryLogger) { CavalryLogger.start_js(["7jZhc"]); }

__d("legacy:group-edit",["GroupEdit"],function(a,b,c,d){a.GroupEdit=b('GroupEdit');},3);
__d("FacebarTypeaheadMagKeywordSearch",["csx","DOM","Event","FacebarGlobalOptions","FacebarKeywordSearchUtils","FacebarStructuredText","FacebarURI","FacebarResultStoreUtils","$","SubscriptionsHandler","URI"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){function r(s){"use strict";this._typeahead=s;this._core=s.getCore();this._data=s.getData();this._view=this._core.view;this._input=this._core.input;this._handler=new p();}r.prototype.enable=function(){"use strict";var s=h.find(o('blueBar'),"._585_");this._handler.addSubscriptions(i.listen(s,'click',this._runQuery.bind(this)));};r.prototype.disable=function(){"use strict";this._handler.release();};r.prototype._focusInput=function(){"use strict";this._input.input.focus();};r.prototype._runQuery=function(){"use strict";if(this._view.index<0){this._focusInput();return;}var s=this._input.getValue(),t=this._data.getRawStructure(s);if(!t||t.is_empty){this._focusInput();return;}var u;if(!t.raw_text){u=n.getRawTextFromStructured(s.toArray());}else u=t.raw_text;if(j.keywordSearchEnabled){var v=k.makeFacebarEntry(u);return this._core.executeQuery(v);}var w=q(this._view.seeMoreSerpEndpoint).addQueryData('q',u).addQueryData('sid',this._core.getSessionID());w=m.getQualifiedURI(w);return this._core.executeQuery({uid:'see_more_serp',node:this._moreBar,structure:new l(),search:true,uri:w,type:'see_more_serp',text:u,selected:true,semantic:'seemore('+u+')'});};e.exports=r;});