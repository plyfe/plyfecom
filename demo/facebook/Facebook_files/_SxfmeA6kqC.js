/*!CK:1935095579!*//*1392692648,178130505*/

if (self.CavalryLogger) { CavalryLogger.start_js(["ywV7J"]); }

__d("CensorLogger",["Event","Banzai","DOM","debounce","ge","Keys"],function(a,b,c,d,e,f,g,h,i,j,k){var l=10*60*1000,m=b('Keys').RETURN,n=function(q){var r=(q.target||q.srcElement).id,s=(q.target||q.srcElement).value.trim().length,t=o.tracker(r);if(!t)return;if(s>5&&!t.submitted){if(t.type=='comment'&&t.parent_fbid=='unknown'){if(!o.syncTrackerWithForm(r))o.snowliftSync(r);t=o.tracker(r);}h.post('censorlogger',{impid:t.impid,clearcounter:t.clearcounter,instrument:t.type,elementid:r,parent_fbid:(t.parent_fbid=='unknown'?null:t.parent_fbid),version:"original"},h.VITAL);o.setSubmitted(r,true);}else if(s===0&&t.submitted&&q.which!=m){o.debouncers[r]=p(r);o.debouncers[r]();}else if(s>0&&t.submitted)if(o.debouncers[r])o.debouncers[r].reset();},o={init:function(q){this.impressionID=q;for(var r in this.trackedElements)if(!k(r))this.stopTracking(r);for(var s in this.unmatchedForms)if(!k(s))delete this.unmatchedForms[s];},trackElement:function(q,r,s){var t,u,v;this.debouncers=this.debouncers||{};this.trackedElements=this.trackedElements||{};this.unmatchedForms=this.unmatchedForms||{};r=r.toLowerCase();if(r=='composer'){t=(s?i.find(q,'div.uiMetaComposerMessageBox textarea.input'):i.find(q,'div.uiComposerMessageBox textarea.input'));u=i.find(q,'form.attachmentForm');var w=i.scry(q,'input[name="xhpc_targetid"]')[0];if(w)v=w.value;}else if(r=='comment')t=i.find(q,'div.commentBox textarea.textInput');if(t==null)return;var x=i.getID(t);if(u)this.addJoinTableInfoToForm(u,i.getID(t));g.listen(t,'keyup',n.bind(this));this.trackedElements[x]={submitted:false,clearcounter:0,type:r,impid:this.impressionID,parent_fbid:v||'unknown',formID:(u?i.getID(u):null)};if(r=='comment')this.syncTrackerWithForm(x);},registerForm:function(q,r){this.unmatchedForms=this.unmatchedForms||{};this.unmatchedForms[q]=r;},syncTrackerWithForm:function(q){for(var r in this.unmatchedForms){var s=k(r);if(s){var t=i.scry(s,'div.commentBox textarea.textInput')[0];if(t){var u=i.getID(t);if(u&&u==q){this.trackedElements[q].parent_fbid=this.unmatchedForms[r];this.trackedElements[q].formID=r;this.addJoinTableInfoToForm(s,q);delete this.unmatchedForms[r];return true;}}}}return false;},snowliftSync:function(q){var r,s=k(q);if(s&&(r=i.scry(s,'^.fbPhotosSnowboxFeedbackInput')[0])){var t=i.find(r,'input[name="feedback_params"]'),u=JSON.parse(t.value).target_fbid;this.trackedElements[q].parent_fbid=u;this.trackedElements[q].formID=r.id;this.addJoinTableInfoToForm(r,q);return true;}return false;},stopTracking:function(q){delete this.trackedElements[q];if(this.debouncers[q]){this.debouncers[q].reset();delete this.debouncers[q];}},tracker:function(q){return this.trackedElements[q];},getSubmitted:function(q){return (this.trackedElements[q]?this.trackedElements[q].submitted:false);},setSubmitted:function(q,r){if(this.trackedElements[q])this.trackedElements[q].submitted=r;},incrementClearCounter:function(q){if(!this.tracker(q))return;this.trackedElements[q].clearcounter++;this.trackedElements[q].submitted=false;var r=i.scry(k(this.trackedElements[q].formID),'input[name="clp"]')[0];if(r)r.value=JSON.stringify({censorlogger_impid:this.trackedElements[q].impid,clearcounter:this.trackedElements[q].clearcounter,element_id:q});},addJoinTableInfoToForm:function(q,r){i.prependContent(q,i.create('input',{type:'hidden',name:'clp',value:JSON.stringify({censorlogger_impid:this.impressionID,clearcounter:0,element_id:r,version:"original"})}));}},p=function(q){return j(function(){o.incrementClearCounter(q);},l,o);};e.exports=o;});