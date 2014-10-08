 /*  ESPN open/close and Breaking news button script start */

 /*Start of Breaking news Cookie detection code*/
 
//create cookie
function createCookie( name, value, expires, path, domain, secure ) {

    var today = new Date();

    today.setTime( today.getTime() );
    if ( expires ) {
        expires = expires * 1000 * 60 * 60 * 24;
     }

     var expires_date = new Date( today.getTime() + (expires) );

     document.cookie = name+'='+escape( value ) +
                       ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) +
                       ( ( path ) ? ';path=' + path : '' ) +
                       ( ( domain ) ? ';domain=' + domain : '' ) +
                       ( ( secure ) ? ';secure' : '' );
}
//check if cookie defined
function readCookie(name) {

    var start = document.cookie.indexOf( name + "=" );
    var len = start + name.length + 1;

    if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
       return null;
    }

    if ( start == -1 ) return null;
    var end = document.cookie.indexOf( ';', len );
    if ( end == -1 ) end = document.cookie.length;
    return unescape( document.cookie.substring( len, end ) );
}
//Remove cookie
function deleteCookie(  name, path, domain) {
    if ( readCookie( name ) )
        document.cookie = name + '=' + ( ( path ) ? ';path=' + path : '') + ( ( domain ) ? ';domain=' + domain : '' ) + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}
//Get the domain name
function getDomainName () {
    var hostname = window.location.hostname.split('.');
    if ( hostname.length >= 2 ) {
        var len = hostname.length;
        var domainname = '.' +  hostname[len - 2] + '.' + hostname[len - 1];
    } else {
        var domainname = '.' + window.location.hostname;
    }
    return domainname;
}

/*begin cookie setting script*/
function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen){
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
		return getCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
		}
	return null;
}

function hex2dec(strVal){
		// where strVal is a string
		// parseInt('ff',16) == 255
		return parseInt(strVal,16);
	}

function Chr(CharCode){
		return String.fromCharCode(CharCode);
	}

var domaincookie=GetCookie("Q_scrum_cluster");
if (domaincookie != null){
	var char1 = domaincookie.substring(0,4);
	var char2 = domaincookie.substring(4,8);
	char1 = hex2dec(char1) % 255;
	char2 = hex2dec(char2) % 255;
	var cqanswer = Chr(char1)+Chr(char2);
	}
else{
	var cqanswer ="";
	}
/*end cookie setting script*/

/*Pop-up window code*/
function openVideoPopup(URL, WindowName, width, height){
	window.open(URL, WindowName, 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + width + ',height=' + height + ',left=0,top=0');
}
/*End of pop-up window code*/

/*begin Text boxes clear text script*/
function searchClrTxt(txtObj)
{
	var scrumSearch = document.getElementById("scrumSearch");
	var searchPhTxt = document.getElementById("scrumPhotoSearch");
	var scrumPhotoFrom = document.getElementById("scrumPhotoFrom");
	var scrumPhotoTo = document.getElementById("scrumPhotoTo");
	var playerStatsSearch = document.getElementById("playerStatsSearch");
	var generalSearch = document.getElementById("generalSearch");

	if((txtObj=='scrumSearch') && (scrumSearch.value == 'Search')){
		scrumSearch.value = "";
	}

	if((txtObj=='scrumPhotoSearch') && (searchPhTxt.value == 'Enter text here')){
		searchPhTxt.value = "";
	}

	if((txtObj=='scrumPhotoFrom') && (scrumPhotoFrom.value == 'dd/mm/yyyy')){
		scrumPhotoFrom.value = "";
	}

	if((txtObj=='scrumPhotoTo') && (scrumPhotoTo.value == 'dd/mm/yyyy')){
		scrumPhotoTo.value = "";
	}

	if((txtObj=='playerStatsSearch') && (playerStatsSearch.value == "Search")){
		playerStatsSearch.value = "";
	}

	if(txtObj=='generalSearch'){
		generalSearch.value = "";
	}
}
/*end Text boxes clear text script*/


/*   Top Nav Dropdown menu script   */
var timeout         = 100;
var closetimer		= 0;
var ddmenuitem      = 0;

// open hidden layer
function mopen(id){
	// cancel close timer
	mcancelclosetime();

	// close old layer
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

	// get new layer and show it
	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.visibility = 'visible';
}

// close showed layer
function mclose(){
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}

// go close timer
function mclosetime(){
	closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime(){
	if(closetimer)	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}
document.onclick = mclose;
/*   end of Top Nav Dropdown menu  */


/*  RH expand/collapse script  */

// current_rhs_tab is set in wrappers/scrum/rhs/scores.inc
function ScrumRHShow(me)
	{
	if (me == current_rhs_tab)
		{
		jQuery("#ScrumRHMenu_" + me).slideUp('500');
		document.getElementById("ScrumRHTab_" + me).className='ScrumRHcloseTab';
		current_rhs_tab = 0;
		}
	else
		{
		for (var i = 1; i <= 3; i++)
			{
			if (i != me)
				{
				jQuery("#ScrumRHMenu_" + i).slideUp('500');
				document.getElementById("ScrumRHTab_" + i).className='ScrumRHcloseTab';
				}
			}
    jQuery("#ScrumRHMenu_" + me).slideDown('100');
		document.getElementById("ScrumRHTab_" + me).className='ScrumRHopenTab';
		current_rhs_tab = me;
		}
	}

/*  end RH expand/collapse script  */

/*  Date validation script start here  */
function checkDates()
{
	var sDate = document.getElementById('scrumPhotoFrom').value;
	var eDate = document.getElementById('scrumPhotoTo').value;

	var now = new Date;
	var sccd=now.getDate();
	var sccm=now.getMonth();
	var sccy=now.getFullYear();

	if((sDate == "dd/mm/yyyy") || (sDate == ""))
	if((eDate == "dd/mm/yyyy") || (eDate == ""))
	{ return true; }

	if((sDate == "dd/mm/yyyy") && ((eDate != "") || (eDate != 'dd/mm/yyy'))) {
		alert("From date cannot be blank");
		document.getElementById('scrumPhotoFrom').focus();
		return false;
	}
	else if((sDate == "") && ((eDate != "") || (eDate != 'dd/mm/yyy'))) {
		alert("From date cannot be blank");
		document.getElementById('scrumPhotoFrom').focus();
		return false;
	}
	else
	{
		var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
	if (!validformat.test(sDate))
	{
			alert("The start date you have specified is incorrect, date should be in Two digits");
		document.getElementById('scrumPhotoFrom').focus();
		return false;
	}
		else
		{
			var fDate=sDate.split("/")[0]
			var fMonth=sDate.split("/")[1]
			var fYear=sDate.split("/")[2]
			var dayobj = new Date(fYear, fMonth-1, fDate)
			if ((dayobj.getDate()!=fDate)||(dayobj.getMonth()+1!=fMonth)||(dayobj.getFullYear()!=fYear))
		{
			alert("Invalid date, month, or year, please correct and Search again.");
			document.getElementById('scrumPhotoFrom').focus();
			return false;
			}
		}
	}

	if((eDate == "dd/mm/yyyy") && ((sDate != "") || (sDate != 'dd/mm/yyy'))) {
		alert("To date cannot be blank");
		document.getElementById('scrumPhotoTo').focus();
		return false;
	}
	else if((eDate == "") && ((sDate != "") || (sDate != 'dd/mm/yyy'))) {
		alert("To date cannot be blank");
		document.getElementById('scrumPhotoTo').focus();
		return false;
	}
	else
	{
		var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
	if (!validformat.test(eDate))
	{
			alert("The end date you have specified is incorrect, date should be in Two digits");
		document.getElementById('scrumPhotoTo').focus();
		return false;
	}
	else
	{
			var tDate=eDate.split("/")[0]
			var tMonth=eDate.split("/")[1]
			var tYear=eDate.split("/")[2]
			var dayobj = new Date(tYear, tMonth-1, tDate)
			if ((dayobj.getDate()!=tDate)||(dayobj.getMonth()+1!=tMonth)||(dayobj.getFullYear()!=tYear))
		{
			alert("Invalid date, month, or year, please correct and search again.");
			document.getElementById('scrumPhotoTo').focus();
			return false;
		}
	}
	}

	if((fYear > sccy) || (tYear > sccy)) {
		alert("Date should be less than or equal to Today's date");
		return false;
	}

	if(fYear < tYear) { return true; }
	else if((fYear == tYear) && (fMonth < tMonth)) { return true; }
	else if((fMonth == tMonth) && (fDate <= tDate))
		{
			return true;
		}
			else
	{
		alert('To date should be greater than or equal to From date');
		return false;
	}
}
/*  Date validation script ends here  */


/*Points table div manpulation script*/
function pointsTable(table)
{
	for(var i = 1; i <= 6; i++)
	{
			document.getElementById("table_" + i).style.display='none';
			document.getElementById("table_" + table).style.display='block';
	}
}
/*End of Points table div manpulation script*/


/*Begin Feedback page script*/
<!-- Disable/rename buttons and Block HTML entry from textbox -->
function openS(URL,WindowName)
{
	window.open(URL,WindowName, 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no,titlebar=0,width=450,height=300');
	if (openS.opener == null) openS.opener = window;
	openS.opener.name = "opener";
}

function Del(Word)
{
	a = Word.indexOf("<");
	b = Word.indexOf(">");
	len = Word.length;
	c = Word.substring(0, a);

	if(b == -1)
	b = a;
	d = Word.substring((b + 1), len);
	Word = c + d;
	tagCheck = Word.indexOf("<");

	if(tagCheck != -1)
	Word = Del(Word);
	return Word;
}

var temp=0;

function Trim(strValue)
{
	var j=strValue.length-1;i=0;
	while(strValue.charAt(i++)==' ');
	while(strValue.charAt(j--)==' ');
	return strValue.substr(--i,++j-i+1);
}

function emailValidate(incomingString, defaultValue)
{
	if(trimSpace(incomingString).length == 0 || incomingString.search(/[\_\-\d]*[A-Za-z]+[\w\_\-]*[\@][\d]*[A-Za-z]+[\w]*[\.][A-Za-z]+/g) == -1 || incomingString==defaultValue){
	return false;
	}
	else
	return true;
}

function Check()
{
	if(document.feedback.name.value == "") {
		alert ("Please enter your name");
		document.feedback.name.focus();
		return false;
	}

	var spChars = "!@#$%^&*()+=[]\\\';,/{}|\":<>?";
	for (var i = 0; i < document.feedback.name.value.length; i++) {
		if (spChars.indexOf(document.feedback.name.value.charAt(i)) != -1) {
			alert ("Your Name has special characters. \nThese are not allowed.\n");
			document.feedback.name.focus();
			return false;
		}
	}

	if(Trim(document.feedback.email.value) == "") {
		alert("Please enter your email address");
		document.feedback.email.focus();
		return false;
	}

	var emailexp = /^([a-zA-Z0-9])([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|([a-zA-Z0-9\-\.]+))\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/;

	if(emailexp.test(document.feedback.email.value.replace(/\s/g,""))==false) {
		alert("Please enter a valid email address");
		document.feedback.email.focus();
		document.feedback.email.select();
		return false;
	}

	if ((document.feedback.email.value.indexOf("@") == -1) || (document.feedback.email.value.indexOf(".") == -1) || (document.feedback.email.value.length<5))                {
		alert("Please enter a valid Email address");
		document.feedback.email.focus();
		return false;
	}

	if (document.feedback.country.selectedIndex==0) {
		alert("Please select your country of Residence");
		document.feedback.country.focus();
		return false;
	}

	if (document.getElementById("catid").selectedIndex==0) {
		alert("Please select a subject");
		document.getElementById("catid").focus();
		return false;
	}

	if((!(document.feedback.ckbox[0].checked || document.feedback.ckbox[1].checked))) {
		alert ("Please indicate your type of feedback - Suggestion / Need Help.");
		document.feedback.ckbox[0].focus();
		return false;
	}

	if (document.feedback.comments.value == "") {
		alert("Please write your message");
		document.feedback.comments.focus();
		return false;
	}

	if (document.feedback.code.value == "") {
		alert("Please enter the code shown.");
		document.feedback.code.focus();
		return false;
	}

	ToCheck = document.feedback.comments.value;
	Checked = Del(ToCheck);
	document.feedback.comments.value = Checked;
	return true;
}

function checkBoxValidate(cb)
{
	if(document.feedback.ckbox[cb].checked == true)
	{
		for (j = 0; j < 2; j++)
		{
			if (eval("document.feedback.ckbox[" + j + "].checked") == true)
			{
				document.feedback.ckbox[j].checked = false;
				if (j == cb)
				{
					document.feedback.ckbox[j].checked = true;
					temp=1;
				}
			}
		}
	} else
	{
		temp=0;
	}
}
/*End Feedback page script*/

/*Wales Competition page script*/
function trimSpace(x)
{
var emptySpace = / /g;
var trimAfter = x.replace(emptySpace,"");
return(trimAfter);
}

function numberValidate(incomingString, defaultValue)
{
if(trimSpace(incomingString).length < 7 || incomingString.search(/[^0-9\s]/g) != -1 || incomingString==defaultValue || parseInt(incomingString, 10) <= 0 )
{
return false;
}
else
return true;
}

function validateForm()
 {
	if(document.walescomp.answer.selectedIndex==0)
	{
	alert ("Please select the answer");
	document.walescomp.answer.focus();
	return false;
	}
	if(document.walescomp.name.value=="")
	//if(!textValidate(document.gatorade.fname.value==""))
	{
		alert("Please enter your name");
		document.walescomp.name.focus();
		return false;
	}
if(document.getElementById('email').value=="")
	{
		alert("Please enter your email id");
		document.walescomp.email.focus()
		return false;
	}
	else
	{
			var strS=document.walescomp.email.value;
			var blnB=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(strS);
			if(blnB)
			{

			}
			else
			{
				alert("Please enter valid email id");
				document.walescomp.email.focus()
				return false;
			}
	}
	//if(!emailValidate(document.walescomp.email.value, ''))
//	{
//	alert("Please enter a valid e-mail ID")
//	document.walescomp.email.focus();
//	return false;
//	}
//	if(!numberValidate(document.walescomp.phone.value, ''))
//	{
//	alert("Please enter a valid Mobile No")
//	document.walescomp.phone.focus();
//	return false;
//	}
	if(document.walescomp.residence.selectedIndex==0)
	{
	alert ("Please select your country of residence");
	document.walescomp.residence.focus();
	return false;
	}

	if(document.walescomp.support.selectedIndex==0)
	{
	alert ("Please select the country you support");
	document.walescomp.support.focus();
	return false;
	}
	if (document.walescomp.terms.checked == false)
	{
	alert("Please read the Terms and Conditions");
	document.walescomp.terms.focus();
	return false;
	}
}

<!-- JS for Image Tool Tip BEGIN-->

function toggleDiv(id,flagit) {
if (flagit=="1"){
if (document.layers) document.layers[''+id+''].visibility = "show"
else if (document.all) document.all[''+id+''].style.visibility = "visible"
else if (document.getElementById) document.getElementById(''+id+'').style.visibility = "visible"
}
else
if (flagit=="0"){
if (document.layers) document.layers[''+id+''].visibility = "hide"
else if (document.all) document.all[''+id+''].style.visibility = "hidden"
else if (document.getElementById) document.getElementById(''+id+'').style.visibility = "hidden"
}
}
<!-- JS for Image Tool Tip END -->

<!-- JS for btm mouse over BEGIN-->
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

<!-- ESPN Dropdown menu starts -->
var on = 0;

function espnHPmenu(){
  if(on == 0) {
    document.getElementById('espnExpCol').style.backgroundPosition = "-1646px 0px";
    on = 1;
  }else{
    document.getElementById('espnExpCol').style.backgroundPosition = "-1538px 0px";
    on = 0;
  }
  jQuery("#ciEspnbtn").toggle("slow");
}

function customize(){
  if(on == 0) {
    document.getElementById('espnExpCol').style.backgroundImage = "url(http://img.scrum.com/scrum/espnBtnUp.gif)";
    on = 1;
  }else{
    document.getElementById('espnExpCol').style.backgroundImage = "url(http://img.scrum.com/scrum/Img_expnbtndown.gif)";
    on = 0;
  }
  jQuery("#ciEspnbtn").toggle("slow");
}
<!-- ESPN Dropdown menu ends -->

<!-- JS for btm mouse over END-->

function swpTabhp(tabs,div) {
	for(var i = 0; i<=1; i++) {
		jQuery('#divs'+i).css("display","none");
		jQuery('#tab'+i).removeClass("current");
	}
	jQuery('#'+div).css("display","block");
	jQuery('#'+tabs).addClass("current");
	var cont = '#'+div
}
function swpTabhpint(div) {
	if(div == 'phdiv0' || div == 'phdiv1' || div == 'phdiv2'){
	for(var i = 0; i<=2; i++) {
		jQuery('#phdiv'+i).css("display","none");
	}
	}
	else{
	for(var i = 0; i<=2; i++) {
		jQuery('#gldiv'+i).css("display","none");
	}
	}
	jQuery('#'+div).css("display","block");
}

function loadImages(div){
	var images = [];
	$.each(jQuery(div+' img'), function(i,img){
		if(jQuery(img).attr('src')==''){
			images.push(img);
		}
	});
	jQuery(images).each( function(i,image) {
		jQuery(this).attr('src',jQuery(this).attr('longdesc'));
	});
}




/**
lightbox functionality across photos, galleries, story pages and section pages
added 05-08-10
**/
var _preLoader = 2;					//limits the number of images to preload in the lightbox
var _maxWidth = 900;				//limits the width of the image to be showed in the lightbox
var _imageNo = 5;						//the max number if images shown at a time in the photo page carousel
var _imgWidth = 620;				//max image width to be showed ... scale down to this number if image is greater in width..else keep it to it's original
var _keyNavOn = 1;					//identifier to check if keyboard navigation should be on. 1 by default means ON
var _isLightBox = 0;					//identifies whether the lightbox is open or not..by default it is NOT
var _relatedCache = [];				//hold the related links cache for a particular photo...check here if data exists before making the AJAX call.

function _toggleEnlarge(opt){
	var obj = jQuery("span.viewLB");
	if( parseInt(opt, 10) == -1 ){
		obj.css("visibility","hidden");
		jQuery("#pView > img#imgMain").css("cursor", "default");
	}
	else if( parseInt(opt, 10) == 1){
		obj.css("visibility","visible");
		jQuery("#pView > img#imgMain").css("cursor", "pointer");
	}
}
function _loadMetadata(){
	var objId = jQuery("div.currentP").find("img").attr("_objid");
	document.title = _json[objId].desc_short+" | Rugby Union | Photo | Scrum.com";
	var imgPath = _json[objId].icon;
	imgPath = imgPath.replace('.icon.', '.');
	jQuery('meta[property="og:url"]').attr("content",_json[objId].url);
	jQuery('meta[property="og:image"]').attr("content",imgPath);
	jQuery('meta[property="og:title"]').attr("content",_json[objId].desc_short);
	var keywords = 'rugby, rugby union, rugby photos, rugby pictures, '+_json[objId].desc_short+' , news, results, rugby world cup, rugby rules, rugby history, live rugby scores, rugby tickets';
	jQuery('meta[name="keywords"]').attr("content",keywords);
	jQuery('meta[name="description"]').attr("content",_json[objId].desc);
	return true;
}
function _loadImgInfo(){
	var objId = jQuery("div.currentP").find("img").attr("_objid");
	if (_json[objId] &&  _json[objId].desc.length > 1){	
		if( !(typeof(_isGallery) != "undefined" && _isGallery == 1) && jQuery("#pDetails").length == 0){
			//the DOM element doesn't exist, create that first
			var s = '<div id="giWrap" style="margin:0;border:0;padding:0;"><div class="top320"></div><div id="pDetails"><div class="scrumPanelsContent"><p class="desc"></p><iframe id="fbPhotoLikenew" src="http://www.facebook.com/plugins/like.php?href=http://www.espnscrum.com/[% c.url_component; %]/rugby/image/[% Path.id; %].html&amp;layout=button_count&amp;show_faces=true&amp;width=200&amp;action=like&amp;font&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:21px;" allowTransparency="true"></iframe></div></div><div class="botom320"></div></div>';
			jQuery("#scrumRhs").children("div:first").before(s);
		}
		jQuery("#pDetails p.desc").html(_json[objId].desc);
		jQuery("#photoSlides div.copy").html("&copy; "+_json[objId].copyright);
		var d = _json[objId].desc;
		d += " <span>&copy;"+_json[objId].copyright+"</span>";
		jQuery("#lboxArea > p.text").html(d);
	}
	else if( _json[objId] ){
		if( !(typeof(_isGallery) != "undefined" && _isGallery == 1) ){
			jQuery("#giWrap").remove();	
		}
		else{
			jQuery("#pDetails  p.desc").html(_json[objId].desc);
		}
		//change the lightbox caption with only the copyright (the desc is missing)..else with nothing if copyright also not present
		if(_json[objId].copyright.length > 1){
			var d = " <span>&copy;"+_json[objId].copyright+"</span>";	
		}
		else{
			var d = "";
		}
		jQuery("#lboxArea > p.text").html(d);
	}
	return true;
}
function _respFunc(resp){
	var photoid = jQuery("span.items div.currentP a img").attr("_cid");

	if( !_relatedCache[photoid] ){
		_relatedCache[photoid] = {"contents": resp};	
	}
	
	if(resp.length > 0){
		jQuery("#giRelatedLinks .scrumPanelsContent").remove();
		//parsing and making things work after the response recieved from the AJAX request
		var str = '<div class="scrumPanelsContent" style="_padding:0 3px 0 10px;"><div class="relatedLinksRHSHeader" style="margin-bottom:5px;">Related Links</div>';
		var len = 2;
		for (i =0 ; i < resp.length ; i++){
			str += '<div><span class="relatedLnksBlkTxt">'+resp[i].name+': </span>';
			for(j=0; j<resp[i].contents.length; j++){
				str += '<span><a class="lnkBlueTxt" href="'+resp[i].contents[j].href+'">'+resp[i].contents[j].href_name+'</a></span>';
				if ( j < resp[i].contents.length - 1){
					if( j%len == 0 && (resp[i].name.match(/eams/)  || resp[i].name.match(/ournament/))){
						str += ' - ';
					}
					else {
						str += ' | ';
					}
				}
			}
			str += '</div>';
			str += '<div class="ScrumSpLksSeperator"></div>';
		}
		str += '</div>';
		
		if(jQuery("#giRelatedLinks").length ==0){
			//if the related links div doesn't exist. then create that div first
			var s = '<div id="giRelatedLinks"><div class="top320"></div><div id="scrumRhsBg"></div><div class="botom320"></div></div>';
			if( jQuery("#giWrap").length > 0 ){
				jQuery("#giWrap").after(s);
			}
			else{
				jQuery("#scrumRhs > div:first").before(s);
			}
		}
		jQuery("#giRelatedLinks #scrumRhsBg").html(str);
	}
	else{
		//if no related links, then remove the sidebar
		jQuery("#giRelatedLinks").remove()
	}
}
function _loadRelatedLinks(){
	var photoid = jQuery("span.items div.currentP a img").attr("_objid");
	var url = "/scrum/rugby/image/rel.json?";
  	if (_relatedCache[photoid]){
  		_respFunc(_relatedCache[photoid].contents);
  	}
  	else{
  		if (typeof(p_alt) != "undefined"){
  			var param = "brand="+_pBrand+";id="+photoid+";alt="+_alt;
  			url += param;
  			$.get(url, _respFunc);
  		}
  		else{
  			var param = "brand="+_pBrand+";id="+photoid;
  			url += param;
  			$.get(url, _respFunc);	
  		}
  	}
	return true;
}
function _omniCall(){
	var attach = jQuery("span.items div.currentP a img:first").attr("_objid");
	omniMVO = "photoid="+attach;
	s_omni.prop32 = omniMVO;
	s_omni.t();
	return true;
}
function _syncControls(){
	var pObj = jQuery("span.prevP");
	var nObj = jQuery("span.nextP");
	var curSel = jQuery("span.items  div.currentP");
	if (pObj.attr("navigate") == 0 && curSel.prevAll().length == 0 && curSel.parent("li").prevAll().length == 0){
		pObj.addClass("disabled");
		jQuery("#pChoose > span.btn_prev > a").addClass("disabled");
		jQuery("#pNav > div.prevBtn").addClass("prevBtnOff");
		jQuery("#lbNav > div.prevBtn").addClass("prevBtnOff");
	}
	else{
		pObj.removeClass("disabled");
		jQuery("#pChoose > span.btn_prev > a").removeClass("disabled");
		jQuery("#pNav > div.prevBtn").removeClass("prevBtnOff");
		jQuery("#lbNav > div.prevBtn").removeClass("prevBtnOff");
	}
	
	if(nObj.attr("navigate") == 0 && curSel.nextAll().length == 0 && curSel.parent("li").nextAll().length == 0 ){
		nObj.addClass("disabled");
		jQuery("#pChoose > span.btn_nxt > a").addClass("disabled");
		jQuery("#pNav > div.nextBtn").addClass("nextBtnOff");
		jQuery("#lbNav > div.nextBtn").addClass("nextBtnOff");
	}
	else{
		nObj.removeClass("disabled");
		jQuery("#pChoose > span.btn_nxt > a").removeClass("disabled");
		jQuery("#pNav > div.nextBtn").removeClass("nextBtnOff");
		jQuery("#lbNav > div.nextBtn").removeClass("nextBtnOff");
	}
	return true;
}
function _syncPosition(){
	_syncControls();
	if (typeof(_isGallery) != "undefined" && _isGallery == 1){
		//sync the position of the image shown wrt to the total number of images available -- only for gallery 
		var currP = jQuery("div.currentP");
		var currV = jQuery("li.currentView");
		var liPos = parseInt(currV.prevAll("li").length, 10) * _imageNo;
		var divPos = parseInt(currP.prevAll("div").length, 10) + 1;
		var position = liPos + divPos;
		var cArea = jQuery("#pChoose > span.content > b");
		jQuery("#pChoose > span.content > b").html(position+" / "+cArea.html().split("/")[1]);	
	}
	return true;
}
function _getLbSrc(obj){
	if( typeof(_isGallery) != "undefined" && _isGallery == 1){
		var src = _json[obj.attr("_objId")].img_loc;
	}
	else{
		var src = obj.attr("src").replace(".icon.", ".");	
	}
	return src;
}
function _mpuCall(){
	window.frames['image-ad-iframe'].location.reload();
}
// function _fbLike(){
// 	//this is a seriously bad hack till facebook comes out with something for AJAX likes
// 	//try-catch this, because mozilla and IE have a bug which causes them to throw an uncaught exception..so have to manually catch the exception
// 	var attach = jQuery("span.items div.currentP a img:first").attr("url");
// 	var src = "http://www.scrum.com"+attach;
// 	src = encodeURIComponent(src);
// 	src+="&amp;layout=standard&amp;show_faces=true&amp;width=310&amp;action=like&amp;colorscheme=light&amp;height=65";
// 	try{
// 		jQuery("#fbPhotoLike").remove();
// 		jQuery("#photoSlides").after('<iframe id="fbPhotoLike" name="fbPhotoLike" scrolling="no" frameborder="0" src="http://www.facebook.com/widgets/like.php?href='+src+'" allowtransparency="true"  style="width: 310px; height: 65px; border: medium none; margin-top:10px;"></iframe>');
// 		window.frames['fbPhotoLike'].location.reload();
// 		
// 		jQuery("#fbPhotoLikenew").remove();
// 		jQuery("#pDetails p.desc").after('<iframe id="fbPhotoLikenew" name="fbPhotoLikenew" scrolling="no" frameborder="0" show_faces="false" layout="button_count" src="http://www.facebook.com/widgets/like.php?href='+src+'" allowtransparency="true"  style="width: 310px; height: 65px; border: medium none; margin-top:10px;"></iframe>');
// 		window.frames['fbPhotoLikenew'].location.reload();
// 	}
// 	catch(error){
// 		return true;
// 	}
// 	return true;
// }
function _fbLike(obj_id, title){
	var src = 'http://www.facebook.com/widgets/like.php?href=http://www.espnscrum.com/'+_pBrand+'/rugby/image/'+obj_id+'.html?page=1';
	document.getElementById("fbPhotoLike").setAttribute('src', src);
	return true;
}
function _tweetImage(obj_id, title){
	var twitter_code = '<a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-via="espnscrum" data-related="espnuk: The latest sporting news from ESPN.co.uk" data-text="'+title+'" data-url="http://www.espnscrum.com/'+_pBrand+'/rugby/image/'+obj_id+'.html?page=1">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
	jQuery("#tweetImage").html(twitter_code);
}
function _showImage(obj, title, obj_id){
	var title = obj.find("img").attr("title");
	var p = jQuery("#pView >  img");
	var i = jQuery("#imgWait");
	p.css({"visibility": "hidden"});
	i.css("display", "block");

	if( typeof(_isGallery) != "undefined" && _isGallery == 1){
		var medSrc = _json[obj.find("img").attr("_objid")].img_loc;
	}
	else{
		var medSrc = obj.find("img").attr("src").replace(".icon.", ".");	
	}
	var objImagePreloader = new Image();
	objImagePreloader.onload = function(){	
		var w = objImagePreloader.width;
		var h = objImagePreloader.height;
		if (w > _imgWidth){
			var r = h / w;
			w = _imgWidth;
			h = w * r;
			_toggleEnlarge(1);
		}
		else{
			_toggleEnlarge(-1);
		}
		p.attr("src", objImagePreloader.src).attr("height", h).attr("width", w).css("visibility", "visible");
		i.css("display", "none");
		p.css("visibility", "visible");
	};
	objImagePreloader.src = medSrc;
	p.attr("src", objImagePreloader.src).attr("title", title).attr("alt", title);
	if( typeof(_isGallery) != "undefined" && _isGallery == 1){
		_loadImgInfo();
		_syncPosition();
	}
	else{
		_loadImgInfo();
		_loadMetadata();
		_omniCall();
		_loadRelatedLinks();
		_syncPosition();
		_fbLike(obj_id, title);
		_tweetImage(obj_id, title);
	}
	
	if( _isLightBox == 0){
		_mpuCall();
	}
}
function _thumbClick(obj){
	if( ! obj.hasClass("currentP")){
		obj.parents("ul").find("div.currentP").removeClass("currentP");
		obj.addClass("currentP");
		if( ! obj.parent("li").hasClass("currentView")){
			obj.parents("ul").find("li.currentView").removeClass("currentView");
			obj.parent("li").addClass("currentView");
		}
		jQuery("div.nextBtn").removeClass("nextBtnOff");
		jQuery("div.prevBtn").removeClass("prevBtnOff");
		if (obj.next().length == 0 && obj.parent("li").next().length == 0){
			jQuery("div.nextBtn").addClass("nextBtnOff");
		}
		else if(obj.prev().length == 0 && obj.parent("li").prev().length == 0){
			jQuery("div.prevBtn").addClass("prevBtnOff");
		}
		if(obj.nextAll().length == 0 && obj.parent("li").nextAll().length == 0 && jQuery("#pList > span.nextP").attr("navigate") != 0){
			var uri = obj.find("img").attr("url");
			window.location = uri;	
		}
		else if( obj.prevAll().length == 0 && obj.parent("li").prevAll().length == 0 && jQuery("#pList span.prevP").attr("navigate") != 0 ){
			var loc = obj.find("img").attr("url");
			window.location = loc;	
		}
		else{
			_showImage(obj, obj.find("img").attr("title"), obj.find("img").attr("_objid"));
		}
	}
}
function _goCarousel(par){
	var currentLi = par.siblings("span.items").find("li.currentView");
	var liWidth =  parseInt(currentLi.width(), 10);
	var posUl = parseInt(currentLi.parent("ul").position().left, 10);
	if( par.hasClass("prevP") && currentLi.prevAll().length > 0){
		currentLi.removeClass("currentView");
		currentLi.prev().addClass("currentView");
		currentLi.parent("ul").animate({"left":posUl + liWidth}, 400);
		_thumbClick(jQuery("span.items li.currentView div:last"));
	}
	else if( par.hasClass("nextP") && currentLi.nextAll().length > 0){
		currentLi.removeClass("currentView");
		currentLi.next().addClass("currentView");
		currentLi.parent("ul").animate({"left":posUl - liWidth}, 400);
		_thumbClick(jQuery("span.items li.currentView div:first"));
	}
	else if(par.hasClass("prevP")){
		_thumbClick(jQuery("span.items li.currentView div:first"));
	}
	else if(par.hasClass("nextP")){
		_thumbClick(jQuery("span.items li.currentView div:last"));
	}
}
function _resizeLB(width, height, lbSrc){
	jQuery("#lbBg").css("height", jQuery(window).height()+jQuery(window).scrollTop());
	if (width > _maxWidth){
		var r = height / width;
		width = _maxWidth;
		height = width * r;
	}
	jQuery("#lbImg").css("width", width);
	jQuery("#lboxArea").css("height", "auto");
	jQuery("#lboxArea").animate({"width":width}, 300, function(){
		jQuery("#lbImg").animate({"height":height}, 300, function(){
			
			//small hack to prevent some IE issues
			jQuery("#photoLightBox").css({'height': jQuery("#lboxArea").height()});
		
			jQuery("#lbImg > img").attr({"width":width, "height":height});
			jQuery("#lbBg").css({'height':jQuery(document).height()});	
		});
	});
}
function _viewLbImage(lbSrc){
	jQuery("#lbImg > img").attr("src", "").css("visibility", "hidden");
	jQuery("#imgLoading").css("display", "block");
	var objImagePreloader = new Image();
	objImagePreloader.onload = function(){	
		_resizeLB(objImagePreloader.width,objImagePreloader.height, lbSrc);
		setTimeout( function(){ jQuery("#imgLoading").css("display", "none"); jQuery("#lbImg > img").attr("src", objImagePreloader.src); jQuery("#lbImg > img").css({"visibility": "visible"}) }, 800);
	};
	objImagePreloader.src = lbSrc;
}
function _imageNavigate(opt){
	var n = parseInt(opt, 10);
	var par = jQuery("span.items li.currentView");
	var currSelect = par.children("div.currentP");
	switch (n){
		case -1:
			if( currSelect.prev().length > 0){
				_thumbClick(currSelect.prev());
			}
			else if(par.prev().length > 0){
				var obj = jQuery("#pList > span.prevP");
				_goCarousel(obj);
			}
		break;
		case 1:
			if( currSelect.next().length > 0 ){
				_thumbClick(currSelect.next());
			}
			else if( par.next().length > 0 ){
				var obj = jQuery("#pList > span.nextP");
				_goCarousel(obj);
			}
		break;
	}
}
function _lbImageNavigate(opt){
	var check = _imageNavigate(opt);
	if ( check != false){
		var obj = jQuery("div.currentP img");
		_viewLbImage(_getLbSrc(obj));
	}
}
function _closeLB(){
	_isLightBox = 0;
	jQuery("#photoLightBox").css("display", "none");
	jQuery("#lbBg").css("display", "none");
	//remove all event handlers for the lighbox here
	//make sure to remove all the event handlers, else more than one handler will be binded to the same event
	jQuery("#lboxArea > p.close, #photoLightBox, #lboxArea, #lbNav > div").unbind("click");
	jQuery("#lboxArea, #lbNav").unbind("hover");
	jQuery("li.pInd a").unbind("click");
}
function _getLargeSrc(src){
	var re = /alt=/;
	if( src.match(re) ){
		var s = src.split("?");
		return s[0];
	}
	else{
		var s = src.split('/');
		var l = s.length;
		var ur = "";
		for(i=0;i<l-1;i++){
			ur += s[i]+'/';
		}
		var p = s[l-1].split(".");
		var pl = p.length;
		var comp = p[0]+'.'+p[pl-1];
		var uri = ur+comp;
		return uri;	
	}
}
function _stryImgView(obj){
	if ( obj.hasClass("stryPhotoEn") ){
		_viewLbImage( _getLargeSrc(obj.attr("src")));
		var cap = obj.parent("div").next("div").children("span:first").html().replace("<br>", "").replace("<br/>", "")+' <span>'+obj.parent("div").next("div").children(".scrumMainImageCopyright, .ScrumMainImageCopyright").html()+'</span>';
		jQuery("#lboxArea  p.text").html(cap);	
	}
	else if( obj.hasClass("stryEnlarge") ){
		_viewLbImage( _getLargeSrc(obj.parent("div").prev("div").children("img").attr("src")));
		var cap = obj.siblings("span:first").html()+' <span>'+obj.prev("span").html()+'</span>';
		jQuery("#lboxArea  p.text").html(cap);	
	}
	return false;
}
function _sectionImgView(obj){
	if( obj.hasClass("sectionImgEn")){
			_viewLbImage(_getLargeSrc(obj.parent("td").find("img.sectionImg").attr("src")));
			var cap = obj.prev("div").children("span:first").html()+' <span>'+obj.prev("div").children("span.ScrumMainImageCopyright").html()+'</span>';
			jQuery("#lboxArea  p.text").html(cap);	
	}
	else if( obj.hasClass("sectionImg")){
		_viewLbImage(_getLargeSrc(obj.attr("src")));
		var cap = obj.parent("div").next("div").children("span:first").html()+' <span>'+obj.parent("div").next("div").children("span.ScrumMainImageCopyright").html()+'</span>';
		jQuery("#lboxArea  p.text").html(cap);	
	}
}
function _openLB(){
	jQuery("#lbBg").css({'height':jQuery(document).height(), 'display': 'block'});
	jQuery("#photoLightBox").css({'height': parseInt(jQuery(window).height(), 10) - 20, 'display': 'block', 'top':parseInt(jQuery(window).scrollTop(), 10)+5});
	if( (typeof(_isStory) != "undefined" && _isStory == 1) || (typeof(_isSectionHome) != "undefined" && _isSectionHome == 1)){
		//story page handling..very specific..hand here only
		jQuery("#lboxArea > p.close, #photoLightBox").bind('click', function(){ _closeLB(); return false;});
		jQuery("#lboxArea").bind("click", function(){return false;});
		_isLightBox = 1;
	}
	else{
		var objId = jQuery("span.items div.currentP img").attr("_objid");
		var d = _json[objId].desc;
		d+= " <span>&copy; "+_json[objId].copyright+"</span>";
		jQuery("#lboxArea  p.text").html(d);
		var obj = jQuery("div.currentP img");
		_isLightBox = 1;
		_viewLbImage(_getLbSrc(obj));

		jQuery("#lboxArea > p.close, #photoLightBox").bind('click', function(){ _closeLB(); return false;});
		jQuery("#lboxArea").bind("click", function(){return false;});
		jQuery("li.pInd a").bind("click", function(e){
			e.stopPropagation();
		})
		jQuery("#lbNav > div").bind("click", function(){
			if(jQuery(this).hasClass("prevBtn") &&  !(jQuery("li.currentView").prev().length == 0 && jQuery("div.currentP").prev().length == 0)){
				_lbImageNavigate("-1");
			}
			else if( jQuery(this).hasClass("nextBtn") && !( jQuery("li.currentView").next().length == 0 && jQuery("div.currentP").next().length == 0 )){
				_lbImageNavigate("1");
			}
			return false;
		});
		jQuery("#lboxArea").hover(function(){
			jQuery("#lbNav").css("visibility", "visible");
		}, function(){
			jQuery("#lbNav").css("visibility", "hidden");
		});
		jQuery("#lbNav").hover(function(){
			jQuery("#lbNav").css("visibility", "visible");
		});
	}
}

//special onload to check if the currentP class is applied to the selected photo or not
//if not then do so
jQuery(function(){
	if ( jQuery("span.items div.currentP img").attr("selected") != "0" ){
		var o = jQuery("span.items");
		if( o.find("img[selected='0']").parents("li").prevAll().length == 0 ){
			o.find("div.currentP").removeClass("currentP");
			o.find('img[selected]').parents("div:first").addClass("currentP");
		}
		else{
			var o = jQuery("span.items");
			var sibs = o.find("img[selected='0']").parents("li").prevAll().length;
			var currentLi = o.find("li.currentView");
			var liWidth =  parseInt(currentLi.width(), 10);
			var posUl = parseInt(currentLi.parent("ul").position().left, 10);
			var move = posUl - (sibs * liWidth);
			currentLi.parent("ul").animate({"left":move}, 400);
			currentLi.removeClass("currentView");
			o.find("div.currentP").removeClass("currentP");
			o.find("img[selected='0']").parents("div:first").addClass("currentP");
			o.find("img[selected='0']").parents("li:first").addClass("currentView");
		}
	}
	_syncPosition();
});

jQuery(function(){
	jQuery("#scrumSearch").bind("focus", function(){
		_keyNavOn = 0;
	});
	jQuery("#scrumSearch").bind("blur", function(){
		_keyNavOn = 1;
	});

	jQuery("#pView").hover(function(){
		jQuery("#pNav > div").css("visibility", "visible");
		return false;
	}, function(){
		jQuery("#pNav > div").css("visibility", "hidden");
		return false;
	});
	jQuery("#pNav").hover(function(){
		jQuery("#pNav > div").css("visibility", "visible");
		return false;
	});
	jQuery("#pList > span").not("span.items").bind("click", function(){
		_goCarousel(jQuery(this));
		return false;
	});
	jQuery("span.items > ul > li > div").live("click", function(){
		_thumbClick(jQuery(this));
		return false;
	});
	jQuery("#pNav > div").bind("click", function(){
		if(jQuery(this).hasClass("prevBtn") && !jQuery(this).hasClass("prevBtnOff")){
			_imageNavigate("-1");
		}
		else if(jQuery(this).hasClass("nextBtn") && !jQuery(this).hasClass("nextBtnOff")){
			_imageNavigate("1");
		}
		return false;
	});
	jQuery("#pChoose > span").not("span.content").bind("click", function(){
		if(jQuery(this).hasClass("btn_prev") &&  !(jQuery("li.currentView").prev().length == 0 && jQuery("div.currentP").prev().length == 0)){
			_imageNavigate("-1");
		}
		else if( jQuery(this).hasClass("btn_nxt") && !( jQuery("li.currentView").next().length == 0 && jQuery("div.currentP").next().length == 0 )){
		_imageNavigate("1");
		}
		return false;
	});
	jQuery("span.viewLB, #pView > img#imgMain").bind("click", function(){
		if( jQuery("#pView > #imgMain").attr("width") >= _imgWidth){
			_openLB();
		}
		return false;
	});
	if( typeof(_isStory) != "undefined" && _isStory == 1){
		jQuery(".stryEnlarge, .stryPhotoEn").bind("click", function(){
			_openLB();
			_stryImgView(jQuery(this));
			return false;
		});
	}
	if( typeof(_isSectionHome) != "undefined" && _isSectionHome == 1){
		jQuery(".sectionImgEn, .sectionImg").bind("click", function(){
			_openLB();
			_sectionImgView(jQuery(this));
			return false;
		});
	}
});

jQuery(function(){
	jQuery(".printIcon").bind("click", function(){
		if( typeof(_isGallery) != "undefined" && _isGallery == 1){
			var uri = window.location.href;
			uri += "?printid="+jQuery("#pList").find("div.currentP img").attr("_objId")+";wrappertype=print";
		}
		else if ( typeof(_isPhoto) != "undefined" && _isPhoto == 1 ) {
			//photo page
			var uri = jQuery("#pList").find("div.currentP img").attr("url")+';wrappertype=print';
		}
		else{
			return true;
		}
		window.location = uri;
		return false;
	});
jQuery(".tool-tip").hide();
jQuery(".foot_author li").hover(function () {	
        jQuery(this).css('background','#fff');
		jQuery(this).children('.tool-tip').show();  
		},function(){
		jQuery(".tool-tip").hide();
		 jQuery('.foot_author li').css('background','none');
  });

});
function clickMap(id,home,browse,ths,c4,c){
	var track = 'zoom_photoid=' + id;
	var param;
	if(home){
		param = home;
		if(c.indexOf('team') != -1){
			param = 'team homepage';
		}
		if(c.indexOf('series') != -1){
			param = 'tournament homepage';
		}		
		if(c.indexOf('race') != -1){
			param = 'race homepage';
		}		
	}else{
		param = c4;
	}
		if(browse){
			param += browse; 
		}
	var ac;	
		if(s_account){
			ac = s_account;
		}
		else{
			ac = "wdgesptest";
		}
	var s_zoom=s_gi(ac);
	s_zoom.linkTrackVars = 'prop1,prop2,prop9,prop12';
	s_zoom.linkTrackEvents = track;
	s_zoom.events = track;
	s_zoom.tl(ths,'o','zoom_scrum_photoid=' + id + ' ' + param);
}


//Home gallery and lightbox for Home page 2/12/2013
if(typeof homegallery === 'undefined'){
	var homegallery = {};
}
// debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
// window resize is fired differently in safari, chrome, IE, Opera and firefox
(function($,sr){

  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
homegallery = (function($){
	var hg = {};
	hg.active_list = 1;
	hg.list_size = 1;
	hg.current_index = 1;
	hg.gallery_width = 310;
	hg.gallery_min_width = 200;
	hg.fb_appId = 136690983034347;
	hg.padding_top = 44;
	function enablePrevNext(){
		if((hg.list_size > 1)&&(hg.active_list < hg.list_size)){
			$('#hg-prev, #hg-next, #lb-prev, #lb-next').removeClass('navdisabled').addClass('navenabled');
		}else if(hg.list_size === 1){
			$('#hg-prev, #hg-next, #lb-prev, #lb-next').removeClass('navenabled').addClass('navdisabled');
		}
	}
	function showHGLightBox(){
		var docH = $(document).height();
		var currentTopPos = window.pageYOffset;
		if(currentTopPos === undefined){
			currentTopPos = document.documentElement.scrollTop;
		}
		$('#lb-home-gallery').css('top',currentTopPos);
		$('#lb-bg-home-gallery').css('height',docH);
		$('.lb-home-right-wrap').css('height',$('#lb-home-gallery').outerHeight());
		$('#lb-bg-home-gallery, #lb-home-gallery').css('display','block');

		var photoWrapW = $(window).width() - $('.lb-home-right-wrap').outerWidth();
		$('#lb-home-gallery-image-wrap').css('width',photoWrapW);
	}
	function updateLBBGHeight(){
		var docH = $(document).height();
		var winH = $(window).height();
		var bodyH = $('body').height();
		var maxH = $('#lb-home-gallery').outerHeight();
		$('#lb-home-gallery').css('height',winH);
		$('#lb-bg-home-gallery').css('height',bodyH);
		$('#lb-home-gallery-image-wrap').css('max-height',maxH);
		$('#lb-image').css('max-height',(maxH-hg.padding_top));
		$('#lb-gallery-table').css('height',(maxH-hg.padding_top));
		$('.lb-home-right-wrap').css('height',(maxH+4));
		var photoWrapW = $(window).width() - $('.lb-home-right-wrap').outerWidth();
		$('#lb-home-gallery-image-wrap').css('width',photoWrapW);
	}
	//hide the lightbox
	function hideHGLightBox(){
		$('#lb-bg-home-gallery, #lb-home-gallery').css('display','none');
	}
	function updateWrapperHeight(){
		var divH = $('#section-home-gallery li.active').outerHeight();
		var navPos = (divH/2) - ($('#hg-prev').outerHeight() / 2);
		$('#section-home-gallery').height(divH);
		$('#hg-prev, #hg-next').css('top',navPos-5);
	}
	function getImageDetails(){
		var imgObj = {};
		imgObj.url = $('#section-home-gallery li.active').attr('data-img-url');
		imgObj.shortdesc = $('#section-home-gallery li.active').attr('data-img-description');
		return imgObj;
	}
	//Update the social share buttons with current image URLs
	function updateSocialTags(){
		var imgObj = getImageDetails();
		var tweethtml = '<a href="'+imgObj.url+'" class="twitter-share-button" data-text="'+imgObj.shortdesc+'" data-url="'+imgObj.url+'" data-lang="en">Tweet</a>';
		var fbhtml = '<iframe src="//www.facebook.com/plugins/like.php?href='+encodeURIComponent(imgObj.url)+'&amp;send=false&amp;layout=standard&amp;width=100&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=35&amp;appId='+hg.fb_appId+'" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:35px;" allowTransparency="true"></iframe>';
		$('#twtbutton').html(tweethtml);
		$('#fbbutton').html(fbhtml);

		if(typeof twttr !== 'undefined' && typeof twttr.widgets !== 'undefined'){
			twttr.widgets.load();
		}
	}
	function updateLBImage(){
		var imgObj = $('#section-home-gallery li.active');
		var desc = imgObj.attr('data-img-description');
		var src = imgObj.attr('data-image-src');
		var copyright = imgObj.attr('data-copyright');
		$('#lb-image').hide().attr('src',src).fadeIn(300);
		$('.lb-description-wrap .descripton p').html(desc);
		$('.lb-description-wrap .credit').html('&copy; '+copyright);
		updateLBBGHeight();
		updateSocialTags();
	}
	function updateActive(n){
		$('#section-home-gallery ul').attr('data-active',n);
		$('#section-home-gallery li').removeClass('active');
		$('#section-home-gallery li').eq(n-1).addClass('active');
		updateWrapperHeight();
		updateLBImage();
	}
	function showPrevList(){
		var pos = '+='+hg.gallery_width;
		if(hg.active_list === 1){
			pos = '-='+(hg.gallery_width*(hg.list_size-1));
		}
		$('#section-home-gallery ul').stop().animate({
				left: pos
			}, 300, 'linear', function(){
				hg.active_list = hg.active_list - 1;
				if(hg.active_list === 0){
					hg.active_list = hg.list_size;
				}
				updateActive(hg.active_list);
				$('#hg-prev, #hg-next, #lb-prev, #lb-next').removeClass('navdisabled').addClass('navenabled');
				enablePrevNext();
		});
	}
	function showNextList(){
		var pos = '-='+hg.gallery_width;
		if(hg.active_list === hg.list_size){
			pos = 0;
		}
		$('#section-home-gallery ul').stop().animate({
				left: pos
			}, 300, 'linear', function(){
					hg.active_list = hg.active_list + 1;
					if(hg.active_list > hg.list_size){
						hg.active_list = 1;
					}
					updateActive(hg.active_list);
					$('#hg-prev, #hg-next, #lb-prev, #lb-next').removeClass('navdisabled').addClass('navenabled');
					enablePrevNext();
		});
	}
	function resizeLB(){
		updateWrapperHeight();
		updateLBBGHeight();
	}
	function initHandlers(){
		$('#hg-prev.navenabled, #lb-prev.navenabled').click(function(c){
			c.preventDefault();
			if($(this).hasClass('navenabled')){	
				$(this).removeClass('navenabled').addClass('navdisabled');
				showPrevList();
			}
		});
		$('#hg-next.navenabled, #lb-next.navenabled').click(function(c){
			c.preventDefault();
			if($(this).hasClass('navenabled')){	
				$(this).removeClass('navenabled').addClass('navdisabled');
				showNextList();
			}
		});
		$('#section-home-gallery li .img-gallery').click(function(c){
			c.preventDefault();
			showHGLightBox();
		});
		$('#hg-close-button, #lb-bg-home-gallery').click(function(c){
			c.preventDefault();
			hideHGLightBox();
		});
		//Keyup handlers
		$(document).keyup(function(e) {
			e.preventDefault();
			var keycode = (e.which) ? e.which : e.keyCode;
			if((keycode == 27)){
				hideHGLightBox();
			}
			if((keycode == 37)){
				if($('#hg-next.navenabled, #lb-next.navenabled').hasClass('navenabled')){	
					$('#hg-next.navenabled, #lb-next.navenabled').removeClass('navenabled').addClass('navdisabled');
					showPrevList();
				}
			}
			if((keycode == 39)){
				if($('#hg-next.navenabled, #lb-next.navenabled').hasClass('navenabled')){	
					$('#hg-next.navenabled, #lb-next.navenabled').removeClass('navenabled').addClass('navdisabled');
					showNextList();
				}
			}
		});
		$(window).smartresize(resizeLB);
		
	}
	function setListSize(){
		hg.list_size = $('#section-home-gallery li').size();
		$('#section-home-gallery ul').attr('data-list-size',hg.list_size);
		updateActive(hg.active_list);
	}
	function setGalleryLayout(){
		$('#section-home-gallery').css({'width':hg.gallery_width,'min-height':hg.gallery_min_width});
		$('#section-home-gallery ul').css('left',0);
		$('#section-home-gallery li').css('width',hg.gallery_width);
		updateActive(hg.active_list);
		var first_img_height = $('#section-home-gallery ul li:first img').outerHeight();
		setListSize();
		enablePrevNext();
	}
	homegallery.init = function(){
		initHandlers();
		setGalleryLayout();
	}
	return homegallery;
}(jQuery));
//End Home gallery and lightbox for Home page
$(document).ready(function(){
	homegallery.init();
});