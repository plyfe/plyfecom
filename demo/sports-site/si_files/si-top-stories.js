(function(module,formatter){'use strict';function SITopStories(){if(!(this instanceof(SITopStories))){return new SITopStories();}
var initialize,generateModel,loadData,write,model,view,target,template;initialize=function(){if($('#si-com-top-stories-content').length){model={};view=$('#template-si-com-top-stories-widget').html();template=formatter.compile(view);target='#si-com-top-stories-content';loadData();}};loadData=function(){$.jsonp({'url':SI_TOP_STORIES_URL,'callback':'sicallbackWrapper','error':function(options,status){$(target).html('Could not load feed!');},'success':generateModel});};generateModel=function(json,status,options){var i,x,shortheadline,headlinemaxlength,links=[];model={'items':[]};for(i=0;i<10;i+=1){links=[];links.push({'text':((!json[i].syndicationHeadline||json[i].syndicationHeadline=='')&&json[i].siteHeadline!=='')?json[i].siteHeadline:json[i].headline,'url':json[i].url});if(typeof(json[i].bullets)!=='undefined'){if(!$.isArray(json[i].bullets).bullet){json[i].bullets.bullet=[json[i].bullets.bullet];}
for(x=0;x<json[i].bullets.bullet.length;x+=1){links.push({'text':json[i].bullets.bullet[x].headline,'url':json[i].bullets.bullet[x].url,'hide-pipe':x===json[i].bullets.bullet.length-1});}}
model.items.push({'links':links});}
write();};write=function(){$(target).html(template(model));};module.topstories=module.topstories||{};module.topstories.update=loadData;try{initialize();return module.sitopstories;}catch(exception){console.log(exception);}}
function onDocumentReady(event){var siTopStories=new SITopStories();}
$(document).on('ready',onDocumentReady);}(window.SI_GLOBAL=window.SI_GLOBAL||{},Handlebars));