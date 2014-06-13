/*
** Copyright IBM Corp., 2011. All Rights Reserved.
*/
function launchSyndicatedScoreboard(syn, crt){
var scoreBoardWindow = "";
var scoreBoardWindow;
var scoreBoardWindow;
var launchPage = "http://www.usopen.org/en_US/liteScores/scoreboard.html?";
var d = new Date();
var t = d.getTime();
launchPage += "ts=" + t;
launchPage += (syn)?"&syn="+syn:"&syn=none";
launchPage += "&ref=" + document.location.host + document.location.pathname;
launchPage += (crt)?"&court="+crt:"&court=none";
//alert(launchPage);
if (scoreBoardWindow.closed || scoreBoardWindow==""){
height = navigator.appVersion.indexOf('Chrome')>0?'684':'681';
scoreBoardWindow = window.open(launchPage,"syndUsoScoreBoard","width=936,height="+height+",top=0,left=0,statusbar=0,resize=0");
if (scoreBoardWindow.opener == null) scoreBoardWindow.opener=self;
}
scoreBoardWindow.focus();
}
function launchSyndicatedPointStream(syn, matchid){
var pointStreamWindow = "";
var pointStreamWindow;
var pointStreamWindow;
var launchPage = "http://www.usopen.org/en_US/pointstream/ps_console.html?";
var d = new Date();
var t = d.getTime();
launchPage += "ts=" + t;
launchPage += (syn)?"&syn="+syn:"&syn=none";
launchPage += "&ref=" + document.location.host + document.location.pathname;
launchPage += (matchid)?"&matchid="+matchid:"";
//alert(launchPage);
if (pointStreamWindow.closed || pointStreamWindow==""){
pointStreamWindow = window.open(launchPage, "IBM PointStream", "width=936,height=680,top=50,left=50,location='no',status='no',toolbar='no',resizable='no'");
if (pointStreamWindow.opener == null) pointStreamWindow.opener=self;
}
pointStreamWindow.focus();
}