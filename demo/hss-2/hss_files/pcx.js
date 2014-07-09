/* ag-develop-unit 14.06.20-779-779 (2014-06-20 12:59:34 GMT) */

rsinetsegs=['D08734_70082','D08734_70099','D08734_70081','D08734_70664','D08734_70691','D08734_71737','D08734_71738','D08734_72078','D08734_70053','D08734_70007','D08734_72790','D08734_70098','D08734_70105','D08734_72525','D08734_70110','D08734_70113','D08734_70063','D08734_70066'];
var rsiExp=new Date((new Date()).getTime()+2419200000);
var rsiDom=location.hostname;
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]{3,}\.[a-zA-Z]{2}$)/,'$1');
var rsiSegs="";
var rsiPat=/.*_5.*/;
for(x=0;x<rsinetsegs.length;++x){if(!rsiPat.test(rsinetsegs[x]))rsiSegs+='|'+rsinetsegs[x];}
document.cookie="rsi_segs="+(rsiSegs.length>0?rsiSegs.substr(1):"")+";expires="+rsiExp.toGMTString()+";path=/;domain="+rsiDom;
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(['D08734_70082','D08734_70099','D08734_70081','D08734_70664','D08734_70691','D08734_71737','D08734_71738','D08734_72078','D08734_70053','D08734_70007','D08734_72790','D08734_70098','D08734_70105','D08734_72525','D08734_70110','D08734_70113','D08734_70063','D08734_70066'],'j06575');} 