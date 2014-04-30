/*!CK:698047372!*//*1392783877,178179357*/

if (self.CavalryLogger) { CavalryLogger.start_js(["Ni62x"]); }

__d("MCoreInit",["AddressBar","ErrorUtils","MCache","MPageController","Resource","Stratcom","ServerJS","MViewport","MWildeLink","MFacewebAndroidLink","ix"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){function r(s){q.add(s.ixData);if(s.hideLocationBar)g.setupLoadListener();if(s.isWildeWeb)o.setupListeners();if(s.isFacewebAndroid)p.setupListeners();l.mergeData(0);n.init();j.init();k.load(s.coreResources,function(){h.guard(function(){if(s.clearMCache)i.clear();if(s.onload)(new Function(s.onload))();if(s.onafterload)(new Function(s.onafterload))();(new m()).handle(s.serverJSData);l.invoke('m:root:render');},'onload')();});}f.init=r;});