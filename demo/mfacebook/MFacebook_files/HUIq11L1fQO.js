/*!CK:2070878911!*//*1392822809,178127449*/

if (self.CavalryLogger) { CavalryLogger.start_js(["ENhEF"]); }

__d("XIntlSeeTranslationControllerURIBuilder",["XControllerURIBuilder"],function(a,b,c,d,e,f,g){e.exports=g.create("\/intl\/see_translation\/",{ftid:{type:"String",required:true}});});
__d("MSeeTranslation",["cx","DOM","fbt","Stratcom","MRequest","XIntlSeeTranslationControllerURIBuilder"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m='m-see-translate-link',n=false;function o(q){var r=q.getNode(m),s=r.getAttribute('data-ftid'),t=new l().setString('ftid',s).getURI(),u=new k(t);u.listen('done',function(v){var w=v.payload.text||"No translation available",x=h.create('div',{'class':"_5yi4"},w);h.replace(r,x);});u.send();q.prevent();}var p={listenOnSeeTranslate:function(){if(n)return;j.listen('click',m,o);n=true;}};e.exports=p;});