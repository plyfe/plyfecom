var _AvantMetrics=_AvantMetrics||[];var AvantMetrics;if(this._AvantMetrics&&!(this.AvantMetrics)){AvantMetrics=(function(){var k=("https:"==document.location.protocol?"https://ssl":"http://www")+".avmws.com/1011707/",b=document,l=window,m=l.encodeURIComponent||escape,n=l.decodeURIComponent||unescape,j=function(r){var u=new RegExp('[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]',"g"),s={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function i(v){u.lastIndex=0;return u.test(v)?'"'+v.replace(u,function(w){var x=s[w];return typeof x==="string"?x:"\\u"+("0000"+w.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+v+'"'}function q(v){return v<10?"0"+v:v}function t(B,A){var z,y,x,w,C=A[B];if(C===null){return"null"}switch(typeof C){case"string":return i(C);case"number":return isFinite(C)?String(C):"null";case"boolean":case"null":return String(C);case"object":w=[];if(C instanceof Array){for(z=0;
z<C.length;z++){w[z]=t(z,C)||"null"}x=w.length===0?"[]":"["+w.join(",")+"]";return x}if(C instanceof Date){return i(C.getUTCFullYear()+"-"+q(C.getUTCMonth()+1)+"-"+q(C.getUTCDate())+"T"+q(C.getUTCHours())+":"+q(C.getUTCMinutes())+":"+q(C.getUTCSeconds())+"Z")}for(y in C){x=t(y,C);if(x){w[w.length]=i(y)+":"+x}}x=w.length===0?"{}":"{"+w.join(",")+"}";return x}}return t("",{"":r})},h=false;function p(i){return typeof i!=="undefined"}function o(r){var i=new RegExp("(^|;)[ ]*"+r+"=([^;]*)"),q=i.exec(b.cookie);return q?n(q[2]):"0"}function d(q){var i=document.createElement("script");i.type="text/javascript";i.async=true;i.src=q;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(i,r)}function c(){var i="";try{i=top.document.referrer}catch(r){if(parent){try{i=parent.document.referrer}catch(q){i=""}}}if(i===""){i=b.referrer}return i}function a(q){var i;i=k+"?url="+m(b.location.href)+"&ref="+m(c())+"&name="+m(b.title)+"&avmws="+m(o("avmws"))+"&rand="+Math.random()+"&lib=1";
if(p(q)){i+="&data="+m(j(q))}d(i)}function f(){var q=o("avmws");if(q.indexOf("-hgco.1")>-1){try{var s=b.getElementsByTagName("input");var u=s.length;for(var r=0;r<u;r++){if(s[r].type=="image"){if(s[r].src.toLowerCase().indexOf("https://checkout.google.com")==0){s[r].style.visibility="hidden";break}}}}catch(t){}}}try{f();for(var g in this._AvantMetrics){switch(this._AvantMetrics[g][0]){case"order":h=true;break;default:break}}if(h){a(this._AvantMetrics)}else{if(true){a()}}}catch(e){}})()};
