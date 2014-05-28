/* 	SiteCatalyst code version: H.25.
	Copyright 1996-2012 Adobe, Inc. All Rights Reserved
	More info available at http://www.omniture.com
	This file s_code.js" will contain only SiteCatalyst Adobe code
   	Last update: 3/28/2013 */
var s_code_version = "2014-01-15 H.25.";


var s_omni=s_gi(s_account);
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Conversion Config */
s_omni.currencyCode="USD";
/* Character Set Config */
s_omni.charSet="ISO-8859-1";
/* Link Tracking Config */
s_omni.trackDownloadLinks=true;
s_omni.trackExternalLinks=true;
s_omni.trackInlineStats=false; //Disabled 11/15/12 to reduce s_sess cookie size - JE
s_omni.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s_omni.linkInternalFilters="javascript:,walmart,richrelevance.com";
s_omni.linkLeaveQueryString=false;
s_omni.linkTrackVars="prop50";
s_omni.linkTrackEvents="None";
s_omni.prop19 = s_code_version;
var externalWindowLink = '';

/* Track custom links */
function omniLinkClick(omniObject,linkType,omniLinkName) {
    if(typeof(externalWindowLink) != 'undefined')
		externalWindowLink = 'false';
    var s_linkTrackVarsTemp = s_omni.linkTrackVars;
    var s_linkTrackEventsTemp = s_omni.linkTrackEvents;
    s_omni.linkTrackVars = 'prop54';
    s_omni.linkTrackEvents = 'None';
    s_omni.prop54 = s_omni.prop2 + ' | ' + omniLinkName;
    s_omni.tl(omniObject, linkType, 'Link click');
    s_omni.linkTrackVars = s_linkTrackVarsTemp;
    s_omni.linkTrackEvents = s_linkTrackEventsTemp;
    s_omni.prop54 = '';
}

/* DynamicObjectIDs config - 1/11/2012 - ACE */
function s_getObjectID(o) {
	var ID=o.href;
	return ID;
}
if(typeof disableDynamicObjectIDs == 'undefined' || !disableDynamicObjectIDs)
	s_omni.getObjectID=s_getObjectID;

/* Plugin Config */
s_omni.usePlugins=true;
function s_omni_doPlugins(s_omni) {
	/* Force s_sess cookie to expire after 30 minutes of inactivity - 11/15/12 - JE*/
	if(!s_omni.c_r('s_v')){
		document.cookie = 's_sess=; domain=.walmart.com; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
	}
	var dt=new Date();
	dt.setTime(dt.getTime()+1800000);
	s_omni.c_w('s_v','Y',dt);

	/* Report suites in a variable - 11/15/2012 - JE*/
	if(s_account){
		if(s_omni.linkTrackVars=='None') s_omni.linkTrackVars = 'prop50';
		else s_omni.linkTrackVars=s_omni.apl(s_omni.linkTrackVars,'prop50',",",2);
		s_omni.prop50= s_account.toLowerCase().replace(/walmart/g,'').split(',').sort().join(',');
	}
	
	s_omni.events=s_omni.events?s_omni.events:s_omni.events="";
	/* Add calls to plugins here */

	/* Collect CRR parameter */
	if(!s_omni.eVar37)
		s_omni.eVar37=s_omni.getQueryParam('omppovid');

	/* Collect campaign parameters */
	var tempAdid=s_omni.getQueryParam('adid');
	var tempSourceId=s_omni.getQueryParam('sourceid');
	if(!s_omni.campaign && tempAdid)
		s_omni.campaign=tempAdid;
	if(!s_omni.campaign && tempSourceId)
		s_omni.campaign=tempSourceId;
	if(s_omni.campaign) s_omni.eVar3="D=v0";

	/* Automate Cross Platform Extraction based on the referrer - 7/7/2011 - ACE */
	var s_referrer = s_omni.referrer ? s_omni.referrer : document.referrer;
	var s_ref_domain = '';
	var referrer_clean = ''
	var internalReferrer = false;
	if(s_referrer){
		s_ref_domain = s_referrer.split('/')[2];
		//pass into the variable only if the referring domain contains 'walmart.com' and is different from the domain of the current page
		if(/walmart.com/.test(s_ref_domain) && s_ref_domain != document.location.hostname)
			s_omni.eVar23= s_ref_domain;
		var filters = s_omni.linkInternalFilters.replace(/\./g,'\\.').replace(/\//g,'\\/').replace(/,/g,'|');
		var filters_patt=new RegExp('('+filters+')','gi');
		var referrer_clean = s_referrer.match(/^[^\?#]*/).join('');
		if(referrer_clean.match(filters_patt))
			internalReferrer = true; // JE - Check to see if the referrer is external or internal
	}
	/* Collect flash POV tracking parameter */
	if(!s_omni.eVar22)
		s_omni.eVar22=s_omni.getQueryParam('povid');
	/*Homepage POVID tracking*/
	if(s_omni.eVar22&&s_omni.eVar22.indexOf('cat1070145')!=-1&&s_referrer&&(s_referrer=='http://www.walmart.com/'||s_referrer=='http://www.walmart.com/index.gsp'))
		s_omni.eVar22=s_omni.eVar22.replace('cat1070145','cat14503');
	/* Disabled 11/15 to shorten s_sess cookie - JE
	s_omni.eVar22=s_omni.getValOnce(s_omni.eVar22,'v22',0);*/
	
	var wmlspartner = s_omni.getQueryParam('wmlspartner');
	var cmpdtl = s_omni.getQueryParam('cmpdtl');
	var veh = s_omni.getQueryParam('veh');
	if(!s_omni.eVar60&&wmlspartner)
		s_omni.eVar60=wmlspartner;

	var now=new Date;
	
	var tempAdidSourceId = '';
	tempAdidSourceId = tempAdid?tempAdid:tempSourceId;
	var tagged = (wmlspartner || cmpdtl || tempAdidSourceId || veh)?true:false;
	
	//SEO, SEM, Campaign, Social detection
	//Cookie Saftey//
	//Remove the old 's_cmpchannel' cookie value
	if(s_omni.c_r('s_cmpchannel').length > 0){
		s_omni.c_w('s_cmpchannel','',now);
	}
	//Remove the cookie if it is inflated
	if(s_omni.c_r('s_cmpstack').length > 150){
		s_omni.c_w('s_cmpstack','',now);
	}
	
	/* Clean up search cookies - 11/15/12 - JE*/
	if(s_omni.c_r('evar2')) s_omni.c_w('evar2','',now);
	if(s_omni.c_r('evar15')) s_omni.c_w('evar15','',now);
	if(s_omni.c_r('evar16')) s_omni.c_w('evar16','',now);
	if(s_omni.c_r('evar26')) s_omni.c_w('evar26','',now);
	if(s_omni.c_r('evar32')) s_omni.c_w('evar32','',now);
	if(s_omni.c_r('evar34')) s_omni.c_w('evar34','',now);
	if(s_omni.c_r('evar35')) s_omni.c_w('evar35','',now);
	if(s_omni.c_r('evar46')) s_omni.c_w('evar46','',now);
	if(s_omni.c_r('evar47')) s_omni.c_w('evar47','',now);
	if(s_omni.c_r('prop8')) s_omni.c_w('prop8','',now);
	if(s_omni.c_r('prop36')) s_omni.c_w('prop36','',now);
	if(s_omni.c_r('event47')) s_omni.c_w('event47','',now);
	if(s_omni.c_r('event48')) s_omni.c_w('event48','',now);
	
	var chan = "";
	if(veh){
		if(veh=="sem") chan="sem_un";
		else if(veh=="soc") chan="soc_ac";
		else chan=veh;
	} else if(!chan && s_ref_domain && s_ref_domain.match(/google|search\.yahoo|bing\.com|search\.aol|dogpile\.com|lycos|ask\.co/i)){
		chan=(tagged)?'sem_un':'seo_un';
	}
	if(chan=='sem_un' || chan=='seo_un'){
		var s_query = s_referrer.match(/[\?&](q|as_q|p|as_epq|as_oq|as_eq|ask|query)=([^&#]*)/gi);
		if(s_query){
			s_query = s_query.join(" ");
			s_query = s_query.replace(/([\?&][^=]*=|%20|\+)/g," ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(s_query!=''){
				if (/^\s*(walmart|wal-mart|wal\smart|walmart.com)\s*$/i.test(s_query))
					chan=chan.replace("_un","_eb");
				else if (/((almart|wal\s?m|w(a|la|l|ala)mart|wal[lt]?\s?mart|walam?rt|wal-mart)|^wal$)/i.test(s_query))
					chan=chan.replace("_un","_br");
				else chan=chan.replace("_un","_nb");
			}
		}
	}
else if(!chan && s_ref_domain && (s_ref_domain.match(/facebook|twitter|youtube|flickr|myspace|pinterest/i)||s_ref_domain=='t.co'))
	chan=(tagged)?'soc_ac':'soc_pa';
	else if(!chan && tagged)
		chan="unk";

	if(chan){
		var AdidLength = tempAdidSourceId.length;
		if(AdidLength==20 || (AdidLength >=37 && AdidLength <= 100)){
			if(wmlspartner && wmlspartner!='')
				s_omni.eVar4=chan+':'+wmlspartner+'_ADID';
			else s_omni.eVar4=chan+':1098765432101234567';
		}
		else s_omni.eVar4=chan+':'+tempAdidSourceId;
		s_omni.eVar43="D=v4";
		s_omni.eVar44="D=v4";
		s_omni.eVar10="Other channel";
		s_omni.eVar13="Other channel";
		if(s_omni.eVar4.match(/^soc_pa/i) && s_ref_domain){
			s_omni.eVar4='soc_pa:'+s_ref_domain;
		}
		else if(s_omni.eVar4.match(/^sem/i)){
			s_omni.eVar10="Unknown-PAID";
			s_omni.eVar13=(s_query)?s_query.toLowerCase():"keyword unavailable";
		}
		else if(s_omni.eVar4.match(/^seo/i)){
			s_omni.eVar10="Unknown-NS";
			s_omni.eVar13=(s_query)?s_query.toLowerCase():"keyword unavailable";
		}
		s_omni.eVar66=s_omni.crossVisitParticipation(chan,'s_cmpstack','30','5','>','',0);
	}
	else chan = "None";

     /* 1/26/12 walmart, change to lower case for eVar2 and prop14 */
    if(s_omni.prop14 && s_omni.prop14 != 'undefined'){
        s_omni.prop14=s_omni.prop14.toLowerCase();
    }
    if(s_omni.eVar2 && s_omni.eVar2 != 'undefined'){
        s_omni.eVar2=s_omni.eVar2.toLowerCase();
    }

	/* Get previous page
	Updated 2/14/11 ACE - include original Search Dept */
	var s_omni_prevPage=s_omni.getPreviousValue(s_omni.pageName,'gpv_p11','');
	var s_omni_prevDept=s_omni.getPreviousValue(s_omni.prop8,'gpv_p44','');
	s_omni.prop57 = s_omni_prevPage; /* 1/10/13 - Previous page in a prop - JE */
	/*When a search occurs, record the previous page as the originating search page */
	if(s_omni.eVar2 && s_omni.eVar2 != 'undefined' && s_omni.eVar2 != 'non search'){
		s_omni.prop11=s_omni_prevPage;
		s_omni.prop44=s_omni_prevDept;
		/* create productnum product for search term merchandising eVar binding 3/24/2011 ACE 
		Functionality disabled 11/15/12, reenabled 2/28/13*/
		if(!s_omni.products)
		{
			if(!s_omni.c_r('ps'))
				s_omni.productNum=1;
			else
				s_omni.productNum=parseInt(s_omni.c_r('ps'))+1;
			s_omni.products=';productsearch' + s_omni.productNum;
			s_omni.c_w('ps',s_omni.productNum,0);
		}
	}
	if(s_omni.c_r('ps')&&s_omni.events.indexOf('purchase')>-1)
		s_omni.c_w('ps','',now);

	/*Track mid-visit entries and click-pasts - 10/25/2012 - JE*/
	var currentobj=s_omni.eo?s_omni.eo:s_omni.lnk; //Used to identify if page load versus link click
	var newCampaign = false;
	var s_unique_campaign = '';
	if(s_omni.eVar4)
		s_unique_campaign = ''+s_omni.eVar4+s_omni.getQueryParam('adid');
	else s_unique_campaign = ''+s_omni.getQueryParam('adid');
	s_unique_campaign = s_unique_campaign.slice(-10);
	if(s_unique_campaign&&s_unique_campaign!=s_omni.c_r('cmp')){
		newCampaign = true;
		s_omni.c_w('cmp',s_unique_campaign,0);
	}
	s_omni.visitstart=s_omni.getVisitStart('s_vs');
	if(!s_omni.prop2) s_omni.prop2=s_omni.pageName;
    var s_unique_page_id=''; // fix null prop2 case
    if(typeof s_omni.prop2 !='undefined'){
       s_unique_page_id = s_omni.prop2.replace(/\ /g,'').slice(-25);
    }
	if(typeof currentobj=='undefined'){ /*page load*/
		if(newCampaign /*new campaign*/
		||(s_referrer&&!internalReferrer&&s_omni.c_r('ent')!=s_unique_page_id)/*mid-visit referral*/
		||s_omni.c_r('ent')==""
		||(s_omni.visitstart&&s_omni.visitstart==1)){ /*site entry*/
			s_omni.c_w('ent',s_unique_page_id,0);
			s_omni.c_w('cp','Y',0);
			s_omni.events=s_omni.apl(s_omni.events,'event60',",",2);
		}
		else if(s_omni.c_r('cp')=='Y'&&s_omni.c_r('ent')&&(s_omni.c_r('ent')!=s_unique_page_id||s_unique_page_id=='Search-SearchResults')){
			s_omni.c_w('cp','',now);
			s_omni.events=s_omni.apl(s_omni.events,'event61',",",2);
		}
	}
	if(!s_omni.eVar4 && /event60/g.test(s_omni.events)){
		if(s_ref_domain&&!internalReferrer){
			s_omni.eVar44="Other referrer";
			chan = "ref";
		}
		else{
			s_omni.eVar44="Organic";
			chan = "org";
		}
	}

	/* Track Campaign Page Flow - Updated 7/9/2012 - JE */
	if(!s_omni.prop12){
		if(chan!='None') s_omni.c_w('chan',chan,0);
		else if(s_omni.c_r('chan') && s_omni.c_r('chan') != 'None')
			s_omni.c_w('chan',s_omni.c_r('chan'),0);
		else s_omni.c_w('chan','org',0);
		s_omni.prop12='D="'+s_omni.c_r('chan')+':"+pageName';
	}

	//Fulfillment method visits and items
	if(s_omni.events&&s_omni.events.indexOf('prodView')!=-1)
		s_omni.c_w('c21_i','',now);
	if(s_omni.prop21&&s_omni.prop21.indexOf(':')==-1&&s_omni.prop21.indexOf('-V')==-1&&s_omni.prop21.indexOf('-I')==-1)
	{	
		s_omni.prop21=s_omni.prop21.replace('Site to Store','S2S').replace('Home Delivery','HD').replace('Ship to home','S2H').replace('Threshold shipping','ThS');
		if(typeof OmniWalmart !='undefined'){
            if(OmniWalmart.Enable_Consolidated_Calls!='true'){
		        if(s_omni.events&&s_omni.events.indexOf('prodView')!=-1) s_omni.events='';
            }
        }
		var prop21_split = s_omni.prop21.split(',');
		var prop21_add = '';
		var fulfil_items = s_omni.c_r('c21_i');
		for (var i = 0; i < prop21_split.length; i++){
			if(!fulfil_items||fulfil_items.indexOf(prop21_split[i])==-1)
					prop21_add = prop21_split[i]+','+prop21_add;
		}
		if(prop21_add){
			s_omni.prop21=prop21_add.replace(/,/g,'-I,')+s_omni.prop21;
			s_omni.c_w('c21_i',prop21_add+fulfil_items,0);
			prop21_add = '';
		}
		var fulfil_visits = s_omni.c_r('c21_v');
		for (var i = 0; i < prop21_split.length; i++){
			if(!fulfil_visits||fulfil_visits.indexOf(prop21_split[i])==-1)
					prop21_add = prop21_split[i]+','+prop21_add;
		}
		if(prop21_add){
			s_omni.prop21=prop21_add.replace(/,/g,'-V,')+s_omni.prop21;
			s_omni.c_w('c21_v',prop21_add+fulfil_visits,0);
		}
	}
	else if(s_omni.prop21&&(s_omni.prop21.indexOf('-V')!=-1||s_omni.prop21.indexOf('-I')!=-1)) s_omni.prop21="";//prop21 should not persist
	if(s_omni.prop32&&s_omni.prop32.indexOf(':')==-1&&s_omni.prop32.indexOf('-V')==-1)
	{	
		var fulfil_visits = s_omni.c_r('c32_v');
		var prop32_add = '';
		var prop32_split = s_omni.prop32.split(',');
		for (var i = 0; i < prop32_split.length; i++){
			if(!fulfil_visits||fulfil_visits.indexOf(prop32_split[i])==-1)
					prop32_add = prop32_split[i]+','+prop32_add;
		}
		if(prop32_add){
			s_omni.prop32=prop32_add.replace(/,/g,'-V,')+s_omni.prop32;
			s_omni.c_w('c32_v',prop32_add+fulfil_visits,0);
			prop32_add = '';
		}
	}
	else if(s_omni.prop32&&(s_omni.prop32.indexOf('-V')!=-1||(s_omni.events&&s_omni.events.indexOf('prodView')!=-1))) s_omni.prop32="";
		
	/* Track Photo Merchandising - 7/7/2011 - ACE */
	if(/photo.*walmart.com/.test(document.location.hostname)){
		if(!s_omni.eVar15)
			s_omni.eVar15="Photo";
		if(!s_omni.eVar16)
			s_omni.eVar16="Photo";
		if(!s_omni.eVar35)
			s_omni.eVar35="Photo";
		if(!s_omni.eVar34)
			s_omni.eVar34=s_omni.pageName;

	}

	/* Track Entry Department - 7/7/2011 - ACE */
	if(!s_omni.eVar59)
		if(s_omni.c_r('v59')){
			s_omni.eVar59=s_omni.c_r('v59');
			s_omni.c_w('v59',s_omni.eVar59,0);
		}
		else {
			s_omni.eVar59=s_omni.prop8;
			s_omni.c_w('v59',s_omni.eVar59,0);
		}

	/* Track Entry Page - 7/7/2011 - JE */
	if(!s_omni.eVar54)
		if(s_omni.c_r('v54')){
			s_omni.eVar54=s_omni.c_r('v54');
			s_omni.c_w('v54',s_omni.eVar54,0);
		}
		else {
			s_omni.eVar54=s_omni.pageName;
			s_omni.c_w('v54',s_omni.eVar54,0);
		}
	// Copy page name in an eVar
	s_omni.eVar55="D=pageName";
	s_omni.eVar64="D=c2"; /* JE- 1/10/13 Page name granular in eVar*/
	s_omni.eVar63="D=pageName";  /* JE- 1/10/13 Original prodview page*/
	
	//Copy error variables
	if(s_omni.prop48&&s_omni.prop48!="D=c49") s_omni.prop49="D=c48";
	else if(s_omni.prop49&&s_omni.prop49!="D=c48") s_omni.prop48="D=c49";
	// Copy prop20
	if(s_omni.prop20) s_omni.prop58='D=c20';
	
	/* Track content provider - JE*/
	if(typeof DefaultItem!='undefined'&&DefaultItem&&typeof DefaultItem.primaryContentProviderId!='undefined'&&DefaultItem.primaryContentProviderId)
	{
		s_omni.prop56=DefaultItem.primaryContentProviderId+'';
	}

	//Social App tracking - JE
	/* Disabled until implemented on social sites - JE
	if(!s_omni.c_r('v53'))
	{
		s_omni.eVar53="No social 30 day";
		s_omni.c_w('v53','Y',0);
		var s_socstack=s_omni.crossVisitParticipation('w','s_socstack','30','10','>','',0).replace(/>w>/g,'>').replace(/>w$/,'').replace(/^w>/,'');
		if(s_socstack!='w'){
			var s_socarray=s_socstack.split('>');
			var s_socarrayuniques = [];
			s_socarrayuniques.push(s_socarray[0]);
			for (var i = 0; i < s_socarray.length - 1; i++) {
				if (s_socarray[i + 1] != s_socarray[i]) {
						s_socarrayuniques.push(s_socarray[i+1]); // Remove consecutive duplicates
				}
			}
			s_omni.eVar53=s_socarrayuniques.slice(-5).join('>'); //Record the most recent 5 social apps visited
		}
		else s_omni.c_w('s_socstack','',now);
	}*/

	/* Collect value from com.wm.visitor and set it in prop17  - 7/7/2011 - ACE */
	s_omni.prop17=s_omni.c_r('com.wm.visitor');

	/* Collect email customer id parameter - 3/2/2012 - ACE */
	if(!s_omni.prop15)
		s_omni.prop15=s_omni.getQueryParam('emcusid');	
	/* Collect value from com.wm.customer and set it in prop15 */
	var tempCustomer=s_omni.c_r('com.wm.customer');
	if(tempCustomer){
		tempCustomer=tempCustomer.substring(5,tempCustomer.indexOf('~~'));
		if(tempCustomer)
			s_omni.prop15=tempCustomer;
	}

	/* Collect value from WMSessionID and set it in prop26 */
	var s_wmsessionID=s_omni.c_r('WMSessionID');
	if(s_wmsessionID){
		if(s_wmsessionID.indexOf('_')!=-1)
			s_wmsessionID=s_wmsessionID.substring(0,s_wmsessionID.indexOf('_'));
		s_omni.prop26=s_wmsessionID;
	}

	/* Check for purchase event and populate eVar20 with the purchaseID */
	if(s_omni.events && s_omni.events.indexOf('purchase')>-1){
		var pid=s_omni.purchaseID;
		if(pid)
			s_omni.eVar20=pid;
		else
			s_omni.eVar20='no order id with purchase';
	}

	/* Automate Finding Method eVar if not set - 7/7/2011 - ACE*/
	if(s_omni.campaign || tagged)
		s_omni.eVar35='External Campaign';
	if(s_omni.eVar23&&!s_omni.eVar35)
		s_omni.eVar35='Cross-platform Marketing';

	/* Set s_eVar25 with the value in query parameter as the server side page might have been cached */
	var tempFindingMethod=s_omni.getQueryParam('findingMethod');
	if(tempFindingMethod && !s_omni.eVar35)
		s_omni.eVar35=tempFindingMethod;

	/*If the click was on POV then set the findingMethod as POV
	3/30/2011 - ACE - Adjusted to allow Merch Modules to be tracked as PFM	*/
	if(s_omni.eVar22 && s_omni.eVar22.indexOf('Module') == -1){
		var prevPageCat = s_omni.eVar22.substring(3,s_omni.eVar22.indexOf("-"));
		//s_omni.eVar35='POV';
	}

	/*Other External Sites*/
	if(document.referrer&&!s_omni.eVar35)
	{
		var filters = s_omni.split(s_omni.linkInternalFilters,',');
		var internalFlag = false;
		var docRef = s_omni.split(document.referrer,'/');
		docRef = docRef[2];
		for(var f in filters)
		{
			if(docRef.indexOf(filters[f])>-1)
				internalFlag = true;
		}
		if(!internalFlag)
			s_omni.eVar35="External Non-campaign";
	}

    // Set channel based on hostname.
	if(document.location.hostname == "www.walmart.com")
		// This page is from www.walmart.com.  Set channel to "walmart.com".
		// Channel "walmart.com" is only for traffic from www.walmart.com.
		s_omni.channel = "walmart.com";
	else
		// This page is not from www.walmart.com.  Set channel to the
		// full hostname.  Example:  traffic from photos.walmart.com will get
		// channel "photos.walmart.com".
		s_omni.channel = document.location.hostname;

	/* To setup Dynamic Object IDs - 1/11/2012 - ACE */
	if(typeof disableDynamicObjectIDs == 'undefined' || !disableDynamicObjectIDs)
		s_omni.setupDynamicObjectIDs();

	/* Add to Cart Location - 7/7/2011 - ACE
	Exclude Care - 9/20/2011 - ACE */
	if(s_omni.events&&s_omni.events.indexOf('scAdd')>-1)
	{
		s_omni.linkTrackVars=s_omni.apl(s_omni.linkTrackVars,'eVar5',',',2);
		if(s_omni_prevPage && !(/CARE/.test(s_omni_prevPage)))
			s_omni.eVar5=s_omni_prevPage;
	}
	if(s_omni.events&&s_omni.events.indexOf('prodView')>-1 && !(/CARE/.test(s_omni.pageName)))
	{
		s_omni.linkTrackVars=s_omni.apl(s_omni.linkTrackVars,'eVar5',',',2);
		if(s_omni.pageName)
			s_omni.eVar5=s_omni.pageName;
	}

	/* getTimeParting() calls */
	var theYear = new Date().getFullYear();
	s_omni.eVar28=s_omni.getTimeParting('h','-8',theYear);

	/* insert event46 when the first action a user takes is a search - 2/14/11 ACE*/
	s_omni.clickPastSearch(s_omni.pageName,'','event46','cps');

	/* insert event49 when there is a prodView and event50 when there is a scAdd - 2/14/11 ACE
	Disabled 11/15 - JE.  This will stop event49 and event50 from firing at all */
	/*
	if(s_omni.eVar35)
		s_omni.c_w('pfm',s_omni.eVar35,0);

	var re = new RegExp(s_omni.c_r('pfm') );
	if(/prodView/.test(s_omni.events) && !(re.test(s_omni.c_r('pfm_pv')))){
		s_omni.events=s_omni.apl(s_omni.events,'event49',",",2);
		s_omni.c_w('pfm_pv',s_omni.apl(s_omni.c_r('pfm_pv'),s_omni.c_r('pfm'),"|",2),0);
	}

	if(/scAdd/.test(s_omni.events) && !(re.test(s_omni.c_r('pfm_ca')))){
		s_omni.events=s_omni.apl(s_omni.events,'event50',",",2);
		s_omni.c_w('pfm_ca',s_omni.apl(s_omni.c_r('pfm_ca'),s_omni.c_r('pfm'),"|",2),0);
	}
*/
	//Fix for eVar15 on a product page - 1/12/12 - ACE
	if(s_omni.prop8 && s_omni.prop8.match(/Product Details/i))
		s_omni.eVar15="";
	
	s_omni.prop61=s_omni.mobileOrientation;
}


s_omni.doPlugins=s_omni_doPlugins;
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/* screen orientation added Jan 15, 2014 */
	s_omni.checkMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
	s_omni.mobileOrientation = (s_omni.checkMobile) ? (window.innerHeight > window.innerWidth) ? "Portrait" : "Landscape" : "";
	
/*
 *	Plug-in: crossVisitParticipation v1.7 - stacks values from
 *	specified variable in cookie and returns value
 */

s_omni.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");


/*
* Plugin: clickPastSearch - version 1.0
*/
s_omni.clickPastSearch=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!"
+"cpc){cpc='s_cpc';}ev=s.events?s.events+',':'';if(!(s.c_r(cpc))){s"
+".c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1 && s.eVar2 && s.eVar2 != '"
+"undefined'){s.events=ev+cp_ev;}s.c_w(cpc,0,0);}}");

/*
* Plugin: clickPast - version 1.0
*/
s_omni.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");



/*
 * Plugin: getQueryParam 2.3
 */
s_omni.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s_omni.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s_omni.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s_omni.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Plugin: getValOnce_v1.0
 */
s_omni.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");

/*
 * Plugin Utility: split v1.5 (JS 1.0 compatible)
 */
s_omni.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: p_fo
 */
s_omni.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Plugin Utility: apl v1.1
 */
s_omni.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * Plugin Utility: s.join: 1.0 - s.join(v,p)
 */
s_omni.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin Utility: Replace v1.0
 */
s_omni.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Function - read combined cookies v 0.3
 */
if(!s_omni.__ccucr){s_omni.c_rr=s_omni.c_r;s_omni.__ccucr = true;
s_omni.c_r=new Function("k",""
+"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+"urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
+"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+"Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
+"urn v;");}

/*
 * Function - write combined cookies v 0.3
 */
if(!s_omni.__ccucw){s_omni.c_wr=s_omni.c_w;s_omni.__ccucw = true;
s_omni.c_w=new Function("k","v","e",""
+"this.new2 = true;"
+"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+"{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+"='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
+".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
+"ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
+"Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");}
/*
* Plugin: Flash ClickMap */
s_omni.inlineStatsHandleMovie=new Function("id",""
+"var s=this,f=id+\"_DoFSCommand\";s.d.write(\"<s\"+\"cript langauge="
+"\\\"JavaScript\\\">var s=s_c_il[\"+s._in+\"];if(!s.fscb)s.fscb=new "
+"Object;s.fscb.\"+id+\"=s.wd.\"+f+\";s.wd.\"+f+\"=new Function(\\\"c"
+"md\\\",\\\"args\\\",\\\"var s=s_c_il[\"+s._in+\"];if(cmd==\\\\\\\"s"
+"_clickmap\\\\\\\"&&(!s.d||!s.d.all||!s.d.all.cppXYctnr)){s.eo=new O"
+"bject;s.eo.tagName=\\\\\\\"FLASH\\\\\\\";s.eo.s_oidt=0;s.eo.s_oid="
+"\\\\\\\"\"+id+\":\\\\\\\"+args;s.t();s.eo=0}if(s.fscb.\"+id+\")s.fs"
+"cb.\"+id+\"(cmd,args)\\\")</s\"+\"cript><s\"+\"cript language=\\\"V"
+"BScript\\\">\\nSub \"+id+\"_FSCommand(cmd,args)\\ncall \"+id+\"_DoF"
+"SCommand(cmd,args)\\nEnd Sub\\n</s\"+\"cript>\");");



/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s_omni.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");

/*
 * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
 */
s_omni.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");
s_omni.setOIDs=new Function("e",""
+"var s=s_c_il["+s_omni._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_omni.semaphore=0;return true");

/*
 * Plugin: getTimeParting 2.0
 */
s_omni.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");

/*Plugin: facebookSocialPlugins v1.1*/
s_omni.facebookSocialPlugins=new Function("a","b","c","d","e","f","g","h",""
+"var s=this;s.fbICount++;if(s.fbICount>=5){clearInterval(socialInter"
+"val);}if(typeof(FB)!='undefined'){clearInterval(socialInterval);fun"
+"ction re(a,b){a=s.split(a,'>'),FB.Event.subscribe(b,function(){trac"
+"k(a[0],a[1]);});}if(b){re(b,'edge.create');}if(c){re(c,'edge.remove"
+"');}if(d){re(d,'comment.create');}if(e){re(e,'comment.remove');}if("
+"f){re(f,'auth.login');}if(g){re(g,'auth.logout');}if(h){re(h,'messa"
+"ge.send');}}function track(m,n){s.ltVT=s.linkTrackVars;s.ltET=s.lin"
+"kTrackEvents;s.etE=s.events;s.linkTrackVars=a?(a+',events'):'events"
+"';s.linkTrackEvents=n;s.events=n;if(a){s[a]=m;}s.tl(this,'o',m);con"
+"sole.log(m);s.linkTrackVars=s.ltVT;s.linkTrackEvents=s.ltET;s.event"
+"s=s.etE;}");
s_omni.fbICount = 0;
var socialInterval = setInterval( function() { s_omni.facebookSocialPlugins('eVar49','fb:like>event39','fb:unlike>event39','fb:comment>event39','fb:remove comment>event39','fb:login>event39','fb:logout>event39','fb:send>event39'); }, 1000);

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
/* Switch from third-party cookies to first-party - ACE - 7/7/2011
s_omni.visitorNamespace="walmart"
s_omni.dc="112"
*/

s_omni.trackingServer="omniture.walmart.com";
s_omni.trackingServerSecure="omniture-ssl.walmart.com";
/* Adjusted to end on 11/2/2011  - ACE - 9/20/2011 */
s_omni.visitorMigrationKey="4EB1C758";
s_omni.visitorMigrationServer="walmart.112.2o7.net";


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.25';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\"
+"\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return "
+"y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;retur"
+"n 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AU"
+"TO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B"
+"';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substri"
+"ng(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x)"
+":unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t="
+"z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&"
+"t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s"
+"=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){"
+"s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].ap"
+"ply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.leng"
+"th;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s."
+"pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.coo"
+"kieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_"
+"d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_"
+"w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+("
+"t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=functio"
+"n(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b"
+":f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try"
+"{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=functi"
+"on(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return "
+"window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.t"
+"fs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r"
+".t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,u"
+"n=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1'"
+")dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')"
+"+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.r"
+"l[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debu"
+"gTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onlo"
+"ad=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src="
+"rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr()}',s.forcedLinkTracking"
+"Timeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+"
+"rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=t"
+"his,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y"
+".substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring("
+"i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t"
+"=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'"
+"')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&"
+"(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm="
+"1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.leng"
+"th]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substrin"
+"g(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+"
+"ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfil"
+"eID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.subst"
+"ring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;"
+"i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp'"
+")q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visi"
+"torMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationS"
+"erver)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';els"
+"e if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';e"
+"lse if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';els"
+"e if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='ev"
+"ents2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncr"
+"ementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2"
+"q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring"
+"(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='"
+".'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.lin"
+"kExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring("
+"0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t()"
+";s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.loc"
+"ation=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else"
+" if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e"
+".target;s.t();s.eo=0;if(s.nrs>0&&s.useForcedLinkTracking&&e.target){t=e.target.target;if(e.target.dispatchEvent&&(!t||t==\\'_self\\'||t==\\'_top\\'||(s.wd.name&&t==s.wd.name))){e.stopPropagation();"
+"e.stopImmediatePropagation();e.preventDefault();n=s.d.createEvent(\"MouseEvents\");n.initMouseEvent(\"click\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKe"
+"y,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget);n.s_fe=1;s.bct=e.target;s.bce=n;}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?"
+"');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.ho"
+"st?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t="
+"t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){va"
+"r s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s"
+".rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o"
+".src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&"
+"&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if"
+"(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);"
+"return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,','"
+",'sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototyp"
+"e[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);fo"
+"r(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');"
+"s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&s.n.userAgent.indexOf('WebK"
+"it')>=0&&s.d.createEvent){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var "
+"s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n="
+"x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x="
+"t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x"
+"&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=functio"
+"n(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring"
+"(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in+"
+"+;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r."
+"_m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._i"
+"n+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n"
+",1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var "
+"s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);e"
+"lse u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g"
+"=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.inde"
+"xOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','ht"
+"tps:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e"
+"+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;"
+"try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTime"
+"out(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else "
+"if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k"
+"])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in"
+"+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if"
+"(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length"
+"]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm."
+"getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset("
+"),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k="
+"s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5'"
+";a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+scree"
+"n.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n."
+"javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBeha"
+"vior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}"
+"catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.j"
+"avaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.d"
+"oPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s."
+"eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if"
+"(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeav"
+"eQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else t"
+"rk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-o"
+"bject-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;"
+"if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt("
+"oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','"
+"var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+("
+"x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('"
+"t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s."
+"pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bc"
+"t=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,"
+"t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'"
+"_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if"
+"(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq"
+"[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)"
+"s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Op"
+"era';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=pa"
+"rseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCh"
+"arCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationK"
+"ey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreFo"
+"rSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,"
+"contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkNa"
+"me,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2='"
+",tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g="
+"s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,"
+"dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames"
+",lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.w"
+"d.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
/* 	This file ?omnitureWalmart.js? will contain only Walmart Omniture code
   	and "s_code.js" file will contain only SiteCatalyst Adobe code
   	Last update: 08/06/2012 */

s_omni.walmart ={};   // property to hold walmart specific values
var OmniWalmart={"Enable_Consolidated_Calls":"false"};
//alert("enable consolidate calls? " + OmniWalmart.Enable_Consolidated_Calls);
s_omni.walmart.prePrefStore=(typeof BrowserPreference!='undefined'&&BrowserPreference!=null)?BrowserPreference.PREFSTORE:undefined;

/*when search/browse results page load completely this function will be invoked. added in 11.4 Smart Search project*/
function resultsPageOnload(searchKeyword,cdnId,isHomePage,merchType,isBrowse,merchType1,merchType2,isTypeAheadEnabled){
	addListenerForMerch("icamp",searchKeyword,"brandHeaderMerchModule",merchClick);
	if(isBrowse){
		addListenerForMerch(merchType1,searchKeyword,"browseMerchModule_1",merchClick);
		addListenerForMerch(merchType2,searchKeyword,"browseMerchModule_2",merchClick);
	}else{
		addListenerForMerch(merchType,searchKeyword,"featuredMerchModule",merchClick);
		addListenerForMerch("icamp",searchKeyword,"topNonItemMerchModule",merchClick);
		var manualRelSe = WALMART.$("#manual_relatedSearch").get(0);
		if(!manualRelSe && isTypeAheadEnabled){
			WALMART.$(document).ready(function(){
				if (WALMART.$('#auto_relatedSearch').length > 0) {

					var cdnHost = document.getElementById(cdnId).value;
					WALMART.namespace("search.typeahead").AutoComplete.autoRelatedSearch = true;
					WALMART.$.ajax({
                       		url: "http://" + cdnHost + "/typeahead/keyword?relatedSearch=true&searchQuery="+escape(searchKeyword),
                        	dataType: "script",
                        	cache:true
                	});
                }
			});
		}else if(manualRelSe){
			addListenerForMerch('',searchKeyword,"manual_relatedSearch",relatedSearchClick);
		}

	}
}

function addListenerForMerch(merchType,keyword,divId,handleFunction){
	var ele = document.getElementById(divId);
	if(ele){
		if(ele.hasChildNodes()){
			var children = ele.getElementsByTagName("*");
			for(var i=0;i<children.length;i++){
				if(children[i].nodeName == "A"){
					var aele = children[i];
					WALMART.$(aele).click([merchType,keyword,aele],handleFunction);

				}
			}
		}
	}
}
function merchClick(ev){
    var obj = ev.data;
	var ele = obj[2];
	if(ele){
		var link = ele.href;
		var mm = '';
		if(obj[0].indexOf("3") != -1){
			mm = "3up";
		}else if(obj[0].indexOf("5") != -1 ){
			mm = "5up";
		}else{
			mm = obj[0];
		}
		var currentURL = window.location.host;
		if(link.indexOf(currentURL) != -1){
			if(link.indexOf('?') != -1){
				ele.href = link+"&_mm="+mm;
			}
		}
	}


}

function relatedSearchClick(ev){
    var obj = ev.data;
	var ele = obj[2];
	if(ele){
		var link = ele.href;
		if(link.indexOf('?') != -1){
			ele.href = link+"&_rel="+obj[1];
		}else{
			ele.href = link+"?_rel="+obj[1];
		}
	}
}

/* Convenience Functions */
function trackSpotLightLink(target){
  	if (typeof(window.s_omni.pageName)=="undefined")
  	s_omni.pageName="";
  	if(target.indexOf("?") == -1) {
		document.location = target+"?findingMethod=SpotLight&fromSection=SpotLight:"+s_omni.pageName;
  	}
  	else {
   		document.location = target+"&findingMethod=SpotLight&fromSection=SpotLight:"+s_omni.pageName;
  	}
  	return false;
}

function trackRefinementTypes(targetURL, refineType, refineValue) {
	document.location=targetURL+"&refineType="+refineType+"&refineValue="+refineValue;
}

function trackValueOfTheDay(){
    s_omni.c_w('evar35', "Value of the Day", 0);
    s_omni.c_w('evar34', "Non-Browse", 0);
    s_omni.c_w('evar16', "Non-Browse", 0);
    s_omni.c_w('evar15', "Non-Browse", 0);
}

function trackDeliveryOptionsOnItemPage(strDeliveryMethods, loc) {
    if(OmniWalmart.Enable_Consolidated_Calls=="false"){
	   s_omni.linkTrackVars='prop21';
	   s_omni.linkTrackEvents = '';  // don't fire any events
	   //s_omni.products=s_omni.products+'; eVar31='+ strDeliveryMethods;  // comment out as a workaround for CASE00387773
	   s_omni.prop21=strDeliveryMethods;   // Added for OCC tracking delivery method
	   s_omni.tl(true,'o', 'DeliveryMethods-' + loc);
	   s_omni.prop21='';
    }else{
        var message = {};
        message.linkTrackVars='prop21';
        message.linkTrackEvents = '';  // don't fire any events
        // s_omni.products=s_omni.products+'; eVar31='+ strDeliveryMethods;  // comment out as a workaround for CASE00387773
        message.prop21=strDeliveryMethods;   // Added for OCC tracking delivery method
        WALMART.JSMS.insertIntoQueue(message);
    }
}

function trackOCCDeliveryOptionsOnItemPage(strDeliveryMethods) {
    s_omni.linkTrackVars='prop21';
    s_omni.linkTrackEvents = '';  // don't fire any events
    s_omni.prop21 = strDeliveryMethods;
    s_omni.tl(true,'o', 'OCC DeliveryMethods - ItemPage and QL');
    s_omni.prop21='';
}

function trackOutOfStockOnItemPageQuickLook(oosMsg, marketOOS, linkName, isSameItem ){
    var savedEvents=s_omni.events;
    var events =[];
    if(!s_omni.walmart.event32AlreadyFired) {
            // if OOS in store and evnet10 for store OOS has not fired
            if(oosMsg.indexOf('walmart.com:OOS')>=0 || marketOOS){
                events.push("event32");
                if(isSameItem){
                    s_omni.walmart.event32AlreadyFired=true;
                }
            }
    }
    if(!s_omni.walmart.event10AlreadyFired) {
            // if OOS in store and evnet10 not fired
            if(oosMsg.indexOf('WMStore:OOS')>=0){
                events.push("event10");
                s_omni.walmart.event10AlreadyFired=true;
            }
    }
    if(OmniWalmart.Enable_Consolidated_Calls=="false"){
        s_omni.linkTrackVars='events,eVar61,products';
        s_omni.eVar61=oosMsg;
        s_omni.linkTrackEvents=events.toString();
        s_omni.events=events.toString();
        s_omni.tl(true,'o',linkName);
        s_omni.eVar61='';
        s_omni.events=savedEvents;
    }else{
        var message={};
        message.linkTrackVars='events,eVar61,products';
        message.eVar61=oosMsg;
        message.linkTrackEvents=events.toString();
        message.events=events.toString();
        WALMART.JSMS.insertIntoQueue(message);
    }
}

// new fix for track store change 6/8/12
// assume storeId is new BrowserPreference.PREFSTORE
function trackStoreSelectionChange(storeId, loc){
    if(typeof WALMART.bot.OmnitureHelper!='undefined'){
         WALMART.bot.OmnitureHelper.trackDeliveryMethodsFired = false;
    }
    var prop34='';
    if(typeof storeId!='undefined'){
        var dt=new Date;
        dt.setTime(dt.getTime()+31536000000);
        s_omni.c_w('u_setStore',storeId,dt);
        if(typeof s_omni.walmart.prePrefStore!='undefined'){
          //prop34=s_omni.walmart.prePrefStore + '>' + BrowserPreference.PREFSTORE;
          if(s_omni.walmart.prePrefStore!==storeId){
            prop34=s_omni.walmart.prePrefStore + '>' + storeId;
            s_omni.walmart.prePrefStore=storeId;
          }
        }else{
          s_omni.walmart.prePrefStore=storeId;
          //prop34=s_omni.walmart.prePrefStore;
        }
    }
    s_omni.linkTrackVars='events,prop34,eVar40,eVar57';
    s_omni.linkTrackEvents='event8';
    s_omni.events='event8';
    s_omni.prop34=prop34;
    s_omni.eVar57="Store Selected:" +loc;
    s_omni.eVar40='User store selected';
    s_omni.tl(true,'o','Store Selection and Change');
    s_omni.prop34='';
    s_omni.events='';
    s_omni.eVar57='';
    s_omni.prop34='';
}

function trackStoreGeoChange(storeId){
    if(typeof storeId !='undefined' && s_omni.c_r('isGeo')!='yes'){
        s_omni.walmart.prePrefStore=storeId;
        s_omni.linkTrackVars='events,eVar40';
        s_omni.linkTrackEvents='event8';
        s_omni.events='event8';
        s_omni.eVar40='Auto store selected';
        s_omni.tl(true,'o','geo Store selection');
        var dt=new Date;
        dt.setTime(dt.getTime()+31536000000);
        s_omni.c_w('isGeo','yes',dt);
	}
}

function getDepartmentFromAccountVar() {
var departmentStr = '';
var delimiter =',';
var delimiterLocation = 0;
	if (s_account != null && s_account != '') {
		delimiterLocation = s_account.lastIndexOf(delimiter);
		if (delimiterLocation > 0) {
			departmentStr = s_account.substring(delimiterLocation+1);
		}
	}
	return departmentStr;
}

function getDepartmentFromProductVar() {
var departmentStr = '';
var delimiter =';';
var delimiterLocation = 0;
	if (s_omni.products != null && s_omni.products != '') {
		delimiterLocation = s_omni.products.indexOf(delimiter);
		if (delimiterLocation > 0) {
				departmentStr = s_omni.products.substring(0,delimiterLocation);
		}
	}
	return departmentStr;
}
// SCENE 7 AND STATIC IMAGE CODE - removed 12/24/09 pending review of product interaction functions
// additional semicolon inserted between price and eVar26
/*function trackSolutionItemZoom(sourceObject,productID,price,zoomType){
	s_omni.linkTrackVars='events,products,eVar26';
	s_omni.linkTrackEvents='event6,event7';
			s_omni.products=getDepartmentFromProductVar()+';'+productID+';1;'+price+';;evar26='+zoomType;
	if(zoomType == 'Image')
		s_omni.events='event6';
	else
		s_omni.events='event7';
	s_omni.tl(true,'o',sourceObject);
}
*/

function trackSolutionAddToCart(solutionId, productId, price) {
	s_omni.linkTrackVars='events,products,eVar27';
	s_omni.linkTrackEvents='scAdd';
	s_omni.events='scAdd';
	s_omni.eVar27=solutionId;
	s_omni.products=getDepartmentFromProductVar()+';'+productId+';1;'+price;
	s_omni.tl(true,'o','SolutionAddToCart');
}

function trackReminderItemOrders() {
   	s_omni.pageName="Order Confirmation (Thank-You) Page";
   	s_omni.events="event59,purchase";
   	s_omni.linkTrackEvents='event59,purchase';
   	s_omni.linkTrackVars='events';
   	s_omni.tl(true,'o','Reminder List Item Ordered');
   }
function trackSolutionRemoveFromCart(solutionId, productId, price) {
	s_omni.linkTrackVars='events,products,eVar27';
    s_omni.linkTrackEvents='scRemove';
    s_omni.events='scRemove';
    s_omni.eVar27=solutionId;
   	s_omni.products=getDepartmentFromProductVar()+';'+productId+';1;'+price;
	s_omni.tl(true,'o','SolutionRemoveFromCart');
}

function trackProductZoom(sourceObject, productDetailStr, zoomType) {
	s_omni.linkTrackVars='prop1,prop3,prop4,prop5,prop8,events,products';
	s_omni.linkTrackEvents='event6,event7';
	if (zoomType == 'Image') {
		s_omni.events='event6';
   	if(s_omni.pageName.indexOf('Enlarge') == -1)
   		s_omni.pageName=s_omni.pageName.substring(0,s_omni.pageName.indexOf('Product Page')+12)+': Enlarge';
	}
	else {
   		s_omni.events='event7';
   		if(s_omni.pageName.indexOf('Zoom In') == -1)
   			s_omni.pageName=s_omni.pageName.substring(0, s_omni.pageName.indexOf('Product Page')+12)+': Zoom In';
	}
	/* Removed 12/24/09 pending review of product interaction functions */
	//if (productDetailStr.indexOf('evar26') < 0)
	//	s_omni.products=productDetailStr+';;evar26='+zoomType;
	s_omni.prop1= 'Product Tab';
	s_omni.prop3=s_omni.pageName.substring(0, s_omni.pageName.indexOf('Product Page')+12);
	s_omni.prop4=s_omni.prop3;
	s_omni.prop5=s_omni.prop3;
	s_omni.prop8='Product Details';
	s_omni.tl(true,'o',zoomType);
}

//this function is added for Omniture R11.9 for tracking zip code in store searching results page.
function trackZipCodeInStoreSearchResult(searchTerm, loc, incProp33) {
   s_omni.linkTrackVars='prop33';
   //event 11 is being commentd out for 12.9 PUT requirment
   //s_omni.linkTrackEvents='event11';
   //s_omni.events='event11';
    s_omni.events=''; // 10/7/13, yihuan instead of s_code.js is setting the events ="", set it here.
    if(incProp33==undefined){
        s_omni.prop33 = typeof searchTerm!='undefined'?searchTerm.toLowerCase():'';
        if(s_omni.prop33!=''){
            s_omni.tl(true,'o','FindInStore' + loc);
            s_omni.prop33='';
        }
    }
}

//This function is added for Omniture R11.9 for tracking Store selection changes in base pages ONLY
function trackStoreSelectionChangeInStoreLocatorPage(storeId, storeZIP, isInitialSelection, searchPhrase) {
       var s_omni=s_gi('walmartcom');
       s_omni.linkTrackVars='events,eVar42,eVar58,eVar40,prop33';

       if (isInitialSelection) {
          s_omni.events = 'event9';
       }
       else {
          s_omni.events = 'event8';
       }
       s_omni.eVar42 = storeId;
       s_omni.eVar58 = storeZIP;

       // Set eVar40 -> name of search tool (Store Locator in this case)
       s_omni.eVar40 = "Store Selected:Store Locator";
       // Set prop33 -> search phrase used
       s_omni.prop33 = searchPhrase;

       s_omni.tl(true,'o','Store Selection and Change');
}

function trackFindInStoreForOverlays(overlayName) {
 	s_omni.linkTrackVars='prop1,prop2,prop3,prop4,prop5,prop8,products,eVar40';
    if(s_omni.pageName.indexOf('Store') == -1)
   	{
   		if(overlayName == "SLAP"){
   			popupName = 'Product SLAP Overlay';
	   		s_omni.prop1= popupName;
	   		pageNameValue = s_omni.pageName.substring(0, s_omni.pageName.indexOf(']'))+'] '+popupName;
	   		s_omni.pageName=pageNameValue;
	   		s_omni.prop2=pageNameValue;
   		}
   		if(overlayName == "SPUL"){
   			popupName = 'Product SPUL Overlay';
	   		s_omni.prop1= popupName;
	   		pageNameValue = s_omni.pageName.substring(0, s_omni.pageName.indexOf(']'))+'] '+popupName;
	   		s_omni.pageName=pageNameValue;
	   		s_omni.prop2=pageNameValue;
   		}
   	}
   	s_omni.prop3="D=c2";
   	s_omni.prop4=s_omni.prop3;
   	s_omni.prop5=s_omni.prop3;
   	s_omni.prop8='Product Details';
   	s_omni.eVar40 = s_omni.eVar40;
   	s_omni.products = s_omni.products;
   	s_omni.tl(true,'o','FindInStore');
}
function trackFindInStoreWithZipCodeForOverlays(zipCode,overlayName) {
	s_omni.linkTrackVars='prop1,prop2,prop3,prop4,prop5,prop8,products,eVar40';
   	if(s_omni.pageName.indexOf('Store') == -1)
   	{
   		if(overlayName == "SLAP"){
   			popupName = 'Product SLAP Overlay';
	   		s_omni.prop1= popupName;
	   		pageNameValue = s_omni.pageName.substring(0, s_omni.pageName.indexOf(']'))+'] '+popupName;
	   		s_omni.pageName=pageNameValue;
	   		s_omni.prop2=pageNameValue;
   		}
   		if(overlayName == "SPUL"){
   			popupName = 'Product SPUL Overlay';
	   		s_omni.prop1= popupName;
	   		if(s_omni.pageName == "Search Results Search"){
	   			pageNameValue = '['+ s_omni.pageName+'] '+popupName;
	   		}
	   		else{
	   			pageNameValue = s_omni.pageName.substring(0, s_omni.pageName.indexOf(']'))+'] '+popupName;
	   		}
	   		s_omni.pageName=pageNameValue;
	   		s_omni.prop2=pageNameValue;
   		}
   	}
   	s_omni.prop3="D=c2";
   	s_omni.prop4=s_omni.prop3;
   	s_omni.prop5=s_omni.prop3;
   	s_omni.prop8='Product Details';
   	s_omni.eVar40 = s_omni.eVar40;
   	s_omni.products = s_omni.products;
   	s_omni.tl(true,'o','FindInStore');
}

// Start Add for Pharmacy2
//this method will be called from all the pharmacy 2 jsp pages(which doesn't need to capture event)
function trackPharmacy2OmnitureDetails(pagename, prop1, prop2, prop3, prop4, prop5, prop8) {
  	s_omni.linkTrackVars='pageName,prop1,prop2,prop3,prop4,prop5,prop8';
	//call omniPropPopulation() to create s_omni object and populate all params
	s_omni = omniPropPopulation(pagename, prop1, prop2, prop3, prop4, prop5, prop8);
	//send request to omniture
    s_omni.t();
}
//this method will be called from all the pharmacy 2 jsp pages(which needs to capture event)
function trackPharmacy2OmnitureWithEventDetails(pagename, prop1, prop2, prop3, prop4, prop5, prop8, event, product) {
    s_omni.linkTrackVars='events,products,pageName,prop1,prop2,prop3,prop4,prop5,prop8';
	//call omniPropPopulation() to create s_omni object and populate all params
	s_omni = omniPropPopulation(pagename, prop1, prop2, prop3, prop4, prop5, prop8);
  	s_omni.linkTrackEvents=event;
  	s_omni.events=event;
	s_omni.products=product;

	//send request to omniture
    s_omni.t();
}
//this method creates a s_omni object and populates the prop values and return the s_omni object
function omniPropPopulation(pagename, prop1, prop2, prop3, prop4, prop5, prop8){
    s_omni.channel = 'walmart.com';
    s_omni.pageName = pagename;

    s_omni.prop1 = prop1;
    s_omni.prop2 = prop2;
    s_omni.prop3 = prop3;
    s_omni.prop4 = prop4;
    s_omni.prop5 = prop5;
    s_omni.prop8 = prop8;

    return s_omni;
}
// End Add for Pharmacy2

//this method will be called from gr_main_registry.jsp for error message
function trackGiftRegistryOmnitureErrorDetails(prop2, prop48) {
    s_omni.prop2 = prop2;
    s_omni.prop48 = prop48;
	//send request to omniture
    s_omni.t();
}

//eVar9 removed 12/24/09
function trackSlapPrint() {
   	s_omni.linkTrackVars='products,prop1,prop3,prop4,prop5,prop8';
   	//s_omni.eVar9='SlapPrint';
   	if(s_omni.pageName.indexOf('Store') == -1)
   		s_omni.pageName=s_omni.pageName.substring(0, s_omni.pageName.indexOf('Product Page')+12)+': Store';
   	s_omni.prop1= 'Product SLAP Popup';
   	s_omni.prop3=s_omni.pageName.substring(0, s_omni.pageName.indexOf('Product Page')+12);
   	s_omni.prop4=s_omni.prop3;
   	s_omni.prop5=s_omni.prop3;
   	s_omni.prop8='Product Details';
   	s_omni.tl(true,'o','FindInStore');
}

function trackPrintProduct(){
    s_omni.linkTrackVars='events,prop1,products,pageName';
  	s_omni.linkTrackEvents='event20';
  	s_omni.events='event20';
	s_omni.products=s_omni.products;
	var oriPageName=s_omni.pageName;
    s_omni.pageName+=': Print Product';
	s_omni.prop1='Product: Print Button';
    s_omni.tl(true,'o','item print');
    s_omni.pageName=oriPageName;
}

function trackPUTProductView (events) {
    /*
    if(!s_omni.walmart.event29AlreadyFired){
        var savedEvents=s_omni.events;
        s_omni.walmart.event29AlreadyFired=true;
        s_omni.linkTrackVars='events,products';
        s_omni.linkTrackEvents=events;
        s_omni.events = events;
        s_omni.tl(true,'o', 'PUT Product View');
        s_omni.events=savedEvents;
        s_omni.linkTrackEvents=savedEvents;
    }
    */
    // comment out, as it does not work properly.
     if(OmniWalmart.Enable_Consolidated_Calls=="false"){
        if(!s_omni.walmart.event29AlreadyFired){
            s_omni.walmart.event29AlreadyFired=true;
            s_omni.linkTrackVars='events,products';
            s_omni.linkTrackEvents=events;
            s_omni.events = events;
            s_omni.tl(true,'o', 'PUT Product View');
        }
     }else{
        if(!s_omni.walmart.event29AlreadyFired){
            s_omni.walmart.event29AlreadyFired=true;
            var message = {};
            message.linkTrackVars='events,products';
            message.linkTrackEvents = events;
            message.events=events;
            WALMART.JSMS.insertIntoQueue(message);
        }
     }
}

function trackRichMediaZoom() {
  s_omni.linkTrackVars = 'events';
  s_omni.linkTrackEvents = 'event6';
  s_omni.events = 'event6';
  s_omni.tl(true, 'o', 'Rich Media Zoom');
}

function trackRichMedia360() {
  s_omni.linkTrackVars = 'events';
  s_omni.linkTrackEvents = 'event7';
  s_omni.events = 'event7';
  s_omni.tl(true, 'o', 'Rich Media 360 View');
}

function trackRichMediaVideo() {
  s_omni.linkTrackVars = 'events';
  s_omni.linkTrackEvents = 'event5';
  s_omni.events = 'event5';
  s_omni.tl(true, 'o', 'Rich Media Video');
}

function trackQLPrevNextClick() {
  s_omni.linkTrackVars = 'events';
  s_omni.linkTrackEvents = 'event52';
  s_omni.events = 'event52';
  s_omni.tl(true, 'o', 'QL Prev or Next Click');
}

function trackThresholdShipping(trackingMessage){
    if(OmniWalmart.Enable_Consolidated_Calls=="false"){
        s_omni.linkTrackVars='eVar62';
        s_omni.linkTrackEvents = '';  // don't fire any events
        s_omni.eVar62=trackingMessage;
        s_omni.tl(true,'o','isThresholdShippingDisplayedOnItemPage');
        s_omni.eVar62='';
    }else{
        var message = {};
        message.linkTrackVars='eVar62';
        message.eVar62=trackingMessage;
        WALMART.JSMS.insertIntoQueue(message);
    }
}

/**
 * Creates a call to omniture for use when a bidding item from SEARCHANDISE is clicked.
 */
function trackProductClickForSearchandise(itemId, position, influencedFlag) {
   	if (influencedFlag.toLowerCase() == "true") {
   		s_omni.linkTrackVars='prop36';
   		s_omni.prop36=itemId+';'+position+';'+influencedFlag;
   		s_omni.tl(true,'o','ProductClickForSearchandise');
   	}
}
/**
 * Creates a call to omniture When PUT store is not available for user provided zip.
 */
function trackSLAPSPULOverlayError(){
	s_omni.linkTrackVars='prop48,prop49';
	s_omni.prop48 = 'checkoutPUTNoLongerAvailable';
	s_omni.prop49 = 'D=c48';
	s_omni.tl(true,'o','checkoutPUTNoLongerAvailable');
}

function trackProductClickOmniture(isSearchandise,isSearchPage,onBrowsePage,itemId, position, influencedFlag,currentPage,pageSize,itemPosition,evar26,defaultPageSize){
	if(isSearchandise == 'true' && influencedFlag.toLowerCase() == "true"){
		//s_omni.linkTrackVars='prop36';
   		//s_omni.prop36=itemId+';'+position+';'+influencedFlag;
   		//s_omni.tl(true,'o','ProductClickForSearchandise');
   		var prop36 = itemId+';'+position+';'+influencedFlag;
	}
	if(isSearchPage == 'yes'){
		var cp = parseInt(currentPage);
		var ps = parseInt(pageSize);
		var ip = parseInt(itemPosition);
		var dps = parseInt(defaultPageSize);
		if(!isNumeric(cp)){
			cp = 1;
		}
		prodPosition = (cp-1)*ps + ip;
		if(ps == dps){
			var evar32 = "D>" + pageSize+":" + prodPosition;
		}else{
			var evar32 = "S>" + pageSize+":" + prodPosition;
		}
		s_omni.c_w('event48',prodPosition,0);
		if(evar26)
			s_omni.c_w('evar26',evar26,0);
		 s_omni.c_w('evar32',evar32,0);
		 if(onBrowsePage == 'true'){
			 s_omni.c_w('evar35','Browse: Shelf',0);
		 }else{
			 s_omni.c_w('evar35','Internal Search',0);
		 }
		 if(s_omni.eVar46){
			 s_omni.c_w('evar46',s_omni.eVar46,0);
		 }else{
			 s_omni.c_w('evar46','',0);
		 }
		 if(prop36)
		 	s_omni.c_w('prop36',prop36,0);
		 if(s_omni.prop14)
		 s_omni.c_w('evar2',s_omni.prop14,0);
	}
}
function isNumeric(value)
{
    return typeof value === 'number' && isFinite(value);
}

function trackOCCBOT(isQLView){

	var occDiv1;
	var occDiv2;
	if( !isQLView){
		occDiv1 = document.getElementById("ITEM_PUT_RADIO_TEST_A");
		occDiv2 = document.getElementById("ITEM_PUT_RADIO_TEST_B");
    }
    if( isQLView){
    	occDiv1 = document.getElementById("QL_PUT_RADIO_TEST_A");
    	occDiv2= document.getElementById("QL_PUT_RADIO_TEST_B");
    }
    if( occDiv1!=null && occDiv2!=null && typeof occDiv1!='undefined' &&  typeof occDiv2 !='undefined'){

    		if( occDiv1.style.display =='none' && occDiv2.style.display == 'block'){
    			if(isQLView){
    				s_omni.prop5="QuickLook_optimized";
    			}else{
    				s_omni.prop5="Product Page_optimized";
    			}
            }
    		if( occDiv1.style.display =='block' && occDiv2.style.display == 'none'){
    			if(isQLView){
    				s_omni.prop5="QuickLook";
    			}else{
    				s_omni.prop5="Product Page";
    			}
            }


    }

    s_omni.t();
}
/* convenience function to set eVar9 */
function trackQuickViewAddToCart() {
   	//s_omni.eVar9='Quick View';
}

// Social networking clicks FB, Twitter, Like etc
function trackSocialNetworkingClicks(productId, CustomerId, type) {
    s_omni.linkTrackVars='products,prop1,pageName,eVar49,events,prop15';
    s_omni.linkTrackEvents='event39';
    s_omni.prop1 = "Product: Social Interaction";
    s_omni.pageName=s_omni.pageName.substring(0, s_omni.pageName.indexOf('Product Page') + 12);
    s_omni.pageName=s_omni.pageName + ": Social " + type;
    s_omni.eVar49= type;
    s_omni.events='event39';
    s_omni.products=';'+productId;
    s_omni.prop15=CustomerId;
    s_omni.tl(this,'o', type);
}

/******************************** methods for VUDU project ***************************************/
/**
 * This method will be used to track the cross link clicks from users:
 * <ul><li>if user is on a DVD product and goes to a vudu page</li>
 * <li>if user is on a blu-ray product and goes to a vudu page</li>
 * <li>if user is on a vudu_product and goes to a vudu product</li>
 * <li>if user is on a vudu_product and goes to a dvd product</li>
 * <li>if user is on a vudu_product and goes to a blu-ray product</li></ul>
 * @param crossLinkType
 */
function trackCrossLinkVudu(crossLinkType) {
    if (crossLinkType) {
        s_omni.linkTrackVars='eVar23';
        if ("dvd_vudu" == crossLinkType) {
            s_omni.eVar23 = "DVD product > VUDU product";
        }
        if ("bluray_vudu" == crossLinkType) {
            s_omni.eVar23 = "Blu-ray product > VUDU product";
        }
        if ("vudu_vudu" == crossLinkType) {
            s_omni.eVar23 = "VUDU product > VUDU product";
        }
        if ("vudu_bluray" == crossLinkType) {
            s_omni.eVar23 = "VUDU product > DVD product";
        }
        if ("vudu_bluray" == crossLinkType) {
            s_omni.eVar23 = "VUDU product > Blu-ray product";
        }
        s_account="walmartcom,walmartmovies";
        s_omni.tl(this,'o','Cross-Platform Marketing');
    }
}

/**
 * This method will call omniture every time the customer clicks on rent or buy.
 * the parameter type should be either 'Rent' or 'Buy'.
 * @param type String of 'Rent' or 'Buy' or 'pto' or 'ptr'
 * @param productId
 */
function trackVuduCheckout(type, productId) {
    if ("Rent" == type || "Buy" == type || "pto" == type || "ptr" == type) {
        if ("pto" == type) {
            type = "Buy";
        }
        if ("ptr" == type) {
            type = "Rent";
        }
        s_omni.linkTrackVars = 'products,events,eVar50,eVar31';
        s_omni.linkTrackEvents = 'scAdd,scOpen';
        s_omni.events = 'scAdd,scOpen';
        s_omni.products = ';' + productId;
        s_omni.eVar50 = 'VUDU: ' + type;
        s_omni.eVar31='VUDU';
            s_omni.tl(this, 'o', 'Add to Cart');
    }
}

/************************** methods for persistent cart *************************/
/**
 * Creates a call to omniture for when items are added using persistent cart.
 */

function trackAddToPCart(s_events,s_products, isOptimizedFlow) {
    s_omni.pageName = "Shopping Persistent Cart";
	s_omni.pageType = "Persistent Cart";
    s_omni.server = "";
    s_omni.channel = "walmart.com";
    s_omni.campaign = "";
    s_omni.prop1 = "Cart";
    s_omni.prop2 = "Shopping Persistent Cart";
    s_omni.prop3 = "Cart";
    s_omni.prop4 = "Cart:Persistent";
    s_omni.prop5 = "Cart";
    s_omni.prop8 = "Cart";
    s_omni.prop38 = "Cart";
    //Prop10 value populates sellername. if there are any changes in sellername for walmart.com vs MP items,
    // please check prop10 value populated in OmnitureIncludeProduct.java
    if(s_omni.prop10 !=null&&s_omni.prop10!=""&&s_omni.prop10!="Walmart.com"){
        s_omni.prop18 = "add to cart";
    }
    if(s_omni.prop10){
        s_omni.prop10="";// prevent fire in persistent card
    }

    s_omni.events = s_events;
    s_omni.products = s_products;
    s_omni.t();
}

/**
 * Creates a call to omniture for use when checkout is initiated from persistent cart.
 */
function trackPCartCheckout() {
	s_omni.linkTrackVars='prop1,prop3,prop4,prop5,prop8';
	s_omni.prop1='Checkout - Persistent Cart';
   	s_omni.prop2='Checkout Initiation - Persistent Cart';
   	s_omni.prop3='Checkout Initiation - Persistent Cart';
   	s_omni.prop4='Checkout Initiation - Persistent Cart';
   	s_omni.prop5='Checkout Initiation - Persistent Cart';
   	s_omni.prop8='Checkout Initiation - Persistent Cart';
	s_omni.tl(true,'o','Checkout Button Persistent Cart');
}

/**
 * Creates a call to omniture for use when PayPal checkout is initiated from persistent cart.
 */
function trackPCartCheckoutPaypal() {
   	s_omni.linkTrackVars='prop1,prop3,prop4,prop5,prop8';
   	s_omni.prop1='Checkout - PayPal';
   	s_omni.prop2='PayPal Checkout Initiation - Persistent Cart';
   	s_omni.prop3='PayPal Checkout Initiation - Persistent Cart';
    s_omni.prop4='PayPal Checkout Initiation - Persistent Cart';
   	s_omni.prop5='PayPal Checkout Initiation - Persistent Cart';
   	s_omni.prop8='PayPal Checkout Initiation - Persistent Cart';
   	s_omni.eVar19='PayPal';
   	s_omni.tl(true,'o','PayPal Button Persistent Cart');
}



function trackGalleryItemView(itemId){
	s_omni.events="event44";
	s_omni.linkTrackVars="events,products";
	s_omni.linkTrackEvents="event44";
	s_omni.products=";"+itemId;
//	s_omni.t();
}

function trackOSOXLoginOverlay(pageName){
    s_omni.pageName=pageName;
    s_omni.events="scCheckout";
    s_omni.prop1="Checkout";
    s_omni.prop2="[Guest]"+pageName;
    s_omni.prop3="[Guest] Checkout";
    s_omni.prop4="Checkout:Login";
    s_omni.prop5="Checkout";
    s_omni.prop8="Checkout";
    s_omni.prop38="Checkout";
    s_omni.prop42="Checkout";
    s_omni.eVar50="Guest";
    s_omni.t();
}


function trackEmailAlreadyExistsGuestForm(storeInfo){
    s_omni.pageName="[Guest][Login - Email already Exists] Checkout";
    s_omni.prop1="Checkout";
    s_omni.prop2="[Guest][Login - Email already Exists] Checkout";
    s_omni.prop3="Checkout";
    s_omni.prop4="Checkout";
    s_omni.prop5="Checkout";
    s_omni.prop8="Checkout";
    s_omni.prop38="Checkout";
    s_omni.prop39=storeInfo;
    s_omni.eVar40=storeInfo;
    s_omni.t();
}
function triggerChildOmniture(fieldName,linkName){
	if(typeof parentPageName == 'undefined'){
		parentPageName = s_omni.pageName;
	}
	if(typeof parentProp2 == 'undefined'){
		parentProp2 = s_omni.prop2;
	}
	s_omni.pageName=parentPageName+": "+fieldName+" - "+linkName;
	s_omni.prop2=parentProp2+": "+fieldName+" - "+linkName;
	s_omni.t();
}
function trackOmnitureForOCC(pageName,checkoutType,p4){
	s_omni.pageName = pageName;
	s_omni.prop1 = 'Checkout';
	if(checkoutType != ''){
		s_omni.prop2 = '['+checkoutType+']'+pageName;
		s_omni.prop3 = '['+checkoutType+'] Checkout';
	}
	s_omni.prop4 = p4;
	s_omni.prop5 = 'Checkout';
	s_omni.prop8 = 'Checkout';
	s_omni.prop38 = 'Checkout';
	s_omni.t();
}

function trackOmnitureForOCCLink (pageName,checkoutType,p4) {
	s_omni.linkTrackVars='prop1,prop2,prop3,prop4,prop5,prop8,prop38';
	s_omni.pageName = pageName;
	s_omni.prop1 = 'Checkout';
	if(checkoutType != ''){
		s_omni.prop2 = '['+checkoutType+']'+pageName;
		s_omni.prop3 = '['+checkoutType+'] Checkout';
	}
	s_omni.prop4 = p4;
	s_omni.prop5 = 'Checkout';
	s_omni.prop8 = 'Checkout';
	s_omni.prop38 = 'Checkout';
	s_omni.linkTrackEvents = 'None';

      s_omni.tl(true,'o', 'Care Plan Popup');
}

function trackOCCPlaceOrder(total,ccType,giftCard,balanceDue,paypal){
	s_omni.linkTrackVars = 'products,events,eVar18,eVar19';
	s_omni.linkTrackEvents="event2,event3,event4";
	s_omni.pageName = '';

	/*if(balanceDue != null && balanceDue != ''){
		total = '$'+Math.round(balanceDue*100)/100;
	}*/

	if(ccType != null && ccType != ''){
		ccType = ccType.replace("Walmart", 'Wal-Mart');
	}

	if(paypal != null && paypal != ''){
		ccType = 'PayPal';
	}
	var product = s_omni.products;
	var productCookieVal = '';
	var evar19CookieVal = '';
	var evar19Val = ccType;
	var c_name = 'omniture.psr';

    var cookie_val = '';
    var events = '';


    if(giftCard != null && giftCard != ''){
    	giftCard = 'Gift Card';
    }
    if((giftCard != null && giftCard != '') && (ccType != null && ccType != '') ){
    	evar19Val = giftCard+'|'+ ccType;
   }
    if((giftCard != null && giftCard != '') && (ccType == null || ccType == '') ){
    	evar19Val = giftCard;
    }
    cookie_val = getCookie(c_name);


    if(cookie_val != '' && cookie_val != null && cookie_val != 'null'){
    	productCookieVal = 	cookie_val.substring(0,cookie_val.indexOf('@'));
    	evar19CookieVal = cookie_val.substring(cookie_val.indexOf('@')+1,cookie_val.length);
    }
   if(product == productCookieVal ){
		if(evar19Val != evar19CookieVal){
		 setCookie(c_name,productCookieVal+'@'+evar19Val,'','','','');
		 events = "event3,event4";
		}else{
			events = "event4";
		}
	}else{

		setCookie(c_name,product+'@'+evar19Val,'','','','');
		events = "event2,event3,event4";
	}
   s_omni.eVar19=evar19Val;
   s_omni.eVar18=total;
   s_omni.events = events;

   s_omni.tl(true,'o', 'PSR Place Order');
}



function trackOmnitureForOCCError(pageName,fieldName,checkoutType){
	pageName = pageName+': Error';
	s_omni.pageName = pageName;
	s_omni.prop1 = 'Error';
	if(checkoutType != ''){
		s_omni.prop2 = '['+checkoutType+']'+pageName;
	}
	s_omni.prop3 = 'Error';
	s_omni.prop4 = 'Error';
	s_omni.prop5 = 'Error';
	s_omni.prop8 = 'Error';
	s_omni.prop38 = 'Error';
	s_omni.prop48 = fieldName;
	s_omni.prop49 = 'D=c48';
	s_omni.t();
}


function trackOmnitureForOCCStoreLink(pageName,checkoutType,p4,fieldName){
   	s_omni.linkTrackVars='prop1,prop2,prop3,prop4,prop5,prop8,prop38,prop48,prop49,eVar28,eVar40,eVar50';
	s_omni.pageName = pageName;
	s_omni.prop1 = 'Checkout';
	if(checkoutType != ''){
		s_omni.prop2 = '['+checkoutType+']'+pageName;
		s_omni.prop3 = '['+checkoutType+'] Checkout';
	}
	s_omni.prop4 = p4;
	s_omni.prop5 = 'Checkout';
	s_omni.prop8 = 'Checkout';
	s_omni.prop38 = 'Checkout';
	//s_omni.prop39 = s_omni.prop39;  // removed. use eVar40   8/29/12

	if(fieldName != ''){
		s_omni.prop48 = fieldName;
		s_omni.prop49 = fieldName;
	}
	/* getTimeParting() calls */
	var theYear = new Date().getFullYear();
	s_omni.eVar28=s_omni.getTimeParting('h','-8',theYear);
	//s_omni.eVar40 = s_omni.prop39;   use eVar 40 populated in OnnnitureInclude
	s_omni.eVar50 = checkoutType;
	s_omni.linkTrackEvents = 'None';

    s_omni.tl(true,'o', 'Pay in Person');

}

function trackHelpClicks(fieldName){
    s_omni.pageName="[Guest][Enter Customer Information] Checkout:"+fieldName+" - Why we ask for this?";
    s_omni.prop1="Checkout";
    s_omni.prop2="[Guest][Enter Customer Information] Checkout:"+fieldName+" - Why we ask for this?";
    s_omni.prop3="Checkout";
    s_omni.prop4="Checkout";
    s_omni.prop5="Checkout";
    s_omni.prop8="Checkout";
    s_omni.prop38="Checkout";
    s_omni.t();
}

function trackConvertGuestToUser(storeInfo){
    s_omni.pageName="[Guest][Create Account] Checkout";
    s_omni.prop1="Checkout";
    s_omni.prop2="[Guest][Create Account] Checkout";
    s_omni.prop3="Checkout";
    s_omni.prop4="Checkout";
    s_omni.prop5="Checkout";
    s_omni.prop8="Checkout";
    s_omni.prop38="Checkout";
    s_omni.prop39=storeInfo;
    s_omni.eVar40=storeInfo;
    s_omni.t();
}

function trackGuestToUserConfirmation(storeInfo){

    s_omni.pageName="[Guest][Account Created] Checkout";
    s_omni.prop1="Checkout";
    s_omni.prop2="[Guest][Account Created] Checkout";
    s_omni.prop3="Checkout";
    s_omni.prop4="Checkout";
    s_omni.prop5="Checkout";
    s_omni.prop8="Checkout";
    s_omni.prop38="Checkout";
    s_omni.prop39=storeInfo;
    s_omni.eVar40=storeInfo;
    s_omni.t();
}

function trackGuestUnderThirteen(){

    s_omni.pageName=s_omni.pageName+ "[Guest][Under Thirteen] Checkout";
    s_omni.prop1="Checkout";
    s_omni.prop2="[Guest][Under Thirteen] Checkout";
    s_omni.prop3="Checkout";
    s_omni.prop4="Checkout";
    s_omni.prop5="Checkout";
    s_omni.prop8="Checkout";
    s_omni.prop38="Checkout";
    s_omni.t();
}

function trackChangeAdLocation(){
	s_omni.channel 	= 	"eCircular";
	s_omni.prop1	= 	"eCircular";
	s_omni.pageName	=	"eCirc_ChangeAdLocation";
	s_omni.prop2	=	"eCirc_ChangeAdLocation";
	s_omni.prop3	=	"eCirc_Location";
	s_omni.prop4	=	"eCirc_Location";
	s_omni.prop5	=	"eCirc_Location";
	s_omni.prop8	=	"eCircular";
	s_omni.t();
}

function trackLocalAdFinder(){
	s_omni.channel 	= 	"eCircular";
	s_omni.prop1	= 	"eCircular";
	s_omni.pageName	=	"eCirc_LocalAdFinder";
	s_omni.prop2	=	"eCirc_LocalAdFinder";
	s_omni.prop3	=	"eCirc_Location";
	s_omni.prop4	=	"eCirc_Location";
	s_omni.prop5	=	"eCirc_Location";
	s_omni.prop8	=	"eCircular";
	s_omni.t();
}

function trackChangeStoreLocation(){
	s_omni.channel 	= 	"eCircular";
	s_omni.prop1	= 	"eCircular";
	s_omni.pageName	=	"eCirc_ChangeStoreLocation";
	s_omni.prop2	=	"eCirc_ChangeStoreLocation";
	s_omni.prop3	=	"eCirc_Location";
	s_omni.prop4	=	"eCirc_Location";
	s_omni.prop5	=	"eCirc_Location";
	s_omni.prop8	=	"eCircular";
	s_omni.t();
}
function trackLocalAdAmbiguousResultsMessage(){
	s_omni.channel 	= 	"eCircular";
	s_omni.prop1	= 	"eCircular";
	s_omni.pageName = 	"eCirc_LocalAdFinder";
	s_omni.prop2	=	"eCirc_LocalAdFinder_AmbiguousResultsMessage";
	s_omni.prop3	=	"eCirc_Location";
	s_omni.prop4	=	"eCirc_Location";
	s_omni.prop5	=	"eCirc_Location";
	s_omni.prop8	=	"eCircular";
	s_omni.t();

}

function trackSeeAllAvailItems(){
	s_omni.pageName="No Results: See All Items Link Click";
	s_omni.t();
}


/**
 * Creates a call to omniture track Notify me when OOS
 */
function trackNotifyMeWhenOOS(omniObject,omniLinkName) {
	    var s_linkTrackVarsTemp = s_omni.linkTrackVars; 
	    var s_linkTrackEventsTemp = s_omni.linkTrackEvents; 
	    s_omni.linkTrackVars = 'prop54';
	    s_omni.linkTrackEvents = 'None';
	    s_omni.prop54 = '[product page]' + ' | ' + omniLinkName;
	    s_omni.tl(omniObject, 'o', 'Notify Me when OOS');
	    s_omni.linkTrackVars = s_linkTrackVarsTemp; 
	    s_omni.linkTrackEvents = s_linkTrackEventsTemp; 
	    s_omni.prop54 = '';
}