if (typeof add_mgl_validation !== 'function'){
function add_mgl_validation(formID,functionRef,theFunction){
if (typeof MGL_VALIDATION_FUNCTIONS == 'undefined')
MGL_VALIDATION_FUNCTIONS = new Array(); 

if (typeof formID == 'undefined' || formID == '')
return false;
if (typeof functionRef == 'undefined' || functionRef == '')
return false;
if (typeof theFunction !== 'function')
return false;
if (typeof MGL_VALIDATION_FUNCTIONS['' + formID] == 'undefined'){
MGL_VALIDATION_FUNCTIONS['' + formID] = [];
MGL_VALIDATION_FUNCTIONS['ref_' + formID] = [];
}
MGL_VALIDATION_FUNCTIONS['' + formID].push(theFunction);
MGL_VALIDATION_FUNCTIONS['ref_' + formID].push(functionRef);
return true;
}

}



//IE6 Compatibility 
 ie = (function(){
 
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
 
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
 
    return v > 4 ? v : undef;
 
}());
       window.onload = function () {
        if (document.getElementById('PatronName')){
            if (document.getElementById('PatronName').value == 'Name'){
                document.getElementById('PatronName').style.color = 'gray';
            }
        }
    if (document.getElementById('PatronSurname')){
            if (document.getElementById('PatronSurname').value == 'Surname'){
                document.getElementById('PatronSurname').style.color = 'gray';
            }
        }}
if (typeof mgl_selectall !== 'function'){
            function mgl_selectall(el,form){
                if (el.checked){
                    var action = true;
                    }else{
                    var action = false;
                }
                var attributes = el.attributes;
                var form = document.getElementById(form);
                elements = form.elements;
                for (i=0;i<elements.length;i++){
                    if (elements[i].name == attributes.getNamedItem('rel').value + '[]')
                        elements[i].checked = action;
                    }
                
                return;
                }
        
        }
    if (typeof mgl_set_optout !== 'function'){
        function mgl_set_optout(checkbox){
            var found = false;
            for(i=0;i<checkbox.attributes.length;i++){
                var attr = checkbox.attributes[i];
                if (attr.localName == 'rel')
                    var found = attr.nodeValue;
            }
            var parent = checkbox.parentNode;
            var inputs = parent.getElementsByTagName("input");
            var hidden = false;
            for(i=0;i<inputs.length;i++){
                var inp = inputs[i];
                var attr = inp.attributes;
                var attr = attr.getNamedItem('type')
                if (attr.name == "type" && attr.value == 'hidden'){
                    hidden = inp;
                    break;
                }
            }
            if (checkbox.checked)
                hidden.value = 0;
            else
                hidden.value = 1;

            return;
        }
    }
    
    if (typeof MGLSubmit !== 'function'){
        function MGLSubmit(formID,button){
            if(typeof document.compatMode !== 'string' && document.compatMode !== 'BackCompat'){
                mgl_warn('IE Compatibility mode detected');
                return;
            }                
            if (typeof formID !== 'undefined' && typeof document.getElementById(formID) !== null && document.getElementById(formID).onsubmit()){
                document.getElementById(formID).submit();
            }else if(typeof formID == 'undefined' && typeof button !== 'undefined' && typeof button.form !== 'undefined' && button.form.onsubmit()){
          		button.form.submit();
      		}else
      			mgl_warn('Could not find the form to be submitted, or a validation error occured');
        }
    }
  if(typeof $_GET !== 'function') {
    function $_GET(param)
{
   param = param.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
   var regexS = "[\?&]" + param + "=([^&#]*)";
   var regex = new RegExp(regexS);
   var results = regex.exec(window.location.href);
	
   if(results == null)
      return false;
   else
      return results[1];
}
    }
  
  if(typeof clickclear !== 'function') {     
    function clickclear(thisfield, defaulttext) {
        if (thisfield.value == defaulttext) {
            thisfield.value = "";
            thisfield.style.color = "";
        }
    }
 }
if(typeof clickrecall !== 'function') {
    function clickrecall(thisfield, defaulttext) {
        if (thisfield.value == "") {
            thisfield.value = defaulttext;
            thisfield.style.color = "gray";
        }
    }
}
if(typeof mgl_console !== 'function') {
    function mgl_console(message){
        if (typeof console != 'undefined') {
            console.log(message);
            }
        }
    }
if(typeof mgl_info !== 'function'){
	function mgl_info(message){
		if (typeof console != 'undefined' && typeof console.info == 'function'){
			console.info(message);
			}else {
				mgl_console(message);
			}
		}
	}
if(typeof mgl_warn !== 'function'){
	function mgl_warn(message){
		if (typeof console != 'undefined' && typeof console.warn == 'function'){
			console.warn(message);
			}else {
				mgl_console(message);
			}
		}
	}
if(typeof mgl_error !== 'function'){
	function mgl_error(message){
		if (typeof console != 'undefined' && typeof console.error == 'function'){
			console.error(message);
			}else {
				mgl_console(message);
			}
		}
	}
    mgl_info('MyGuestlist.com Generated Form');
    mgl_info('This is MyGuestlist Form mf502bc827766ae');
if(typeof mgl_validator_mf502bc827766ae !== 'function') {
    
        mgl_info('Using MyGuestlist form validation function');
        if (typeof mgl_validator_mf502bc827766ae !== 'function'){
function mgl_validator_mf502bc827766ae(formID){
	elements = document.getElementById(formID).elements;
	form_parent = document.getElementById(formID);
	error = 0;
    checkbox  = 0;
	for(i=0;i<elements.length;i++)
	{
	element = elements[i];
	if(element.getAttribute("rel") == "required")
	{
	   if (element.type == "checkbox"){
	       if (!element.checked){
	           element.style.border = "2px solid red";
               checkbox = 1;
               error = 1;
	       }
	   }
       
       if ((document.getElementById('PatronName')) && (element.id == "PatronName") && (element.value == "Name")){
            error = 1;
            element.style.border = "2px solid red";
       }
        else if ((document.getElementById('PatronSurname')) && (element.id == "PatronSurname") && (element.value == "Surname")){
            error = 1;
            element.style.border = "2px solid red";
       }
	else if(element.value == "" || (element.value.length < 1 && element.value == 0 && element.getAttribute('mgltype') !== 'time') || element.value == 'Year') {
	   element.style.border = "2px solid red";
	   error = 1;
	}

       else if (element.getAttribute("rel") == "email"){
        //check this for valid email address
       if ((element.value.indexOf('@') < 0) || ((element.value.indexOf('.') < 0))){
            element.style.border = "2px solid red";
            error = 1;
       }
       else {
	       element.style.border = "";
	   }
        }
       
	else {
	   element.style.border = "";
	}
	}

       else if (element.getAttribute("rel") == "requiredAttendees")
       {
            if (element.name == "Attendees" && !document.getElementById('requiredAttendeeCheck').checked && (element.value == '' || element.value.length < 2)){
                element.style.border = "2px solid red";
                error = 1;
            }
            else if (element.name == "numberOfGuests" && document.getElementById('requiredAttendeeCheck').checked && (element.value == '' || element.value.length < 1)){
                element.style.border = "2px solid red";
                error = 1;
            }
            else if ((element.name == "Attendees" && document.getElementById('requiredAttendeeCheck').checked) || (element.name == "Attendees" && element.value.length > 2)){
                element.style.border = "";
            }
            else if ((element.name == "numberOfGuests" && !document.getElementById('requiredAttendeeCheck').checked) || (element.name == "numberOfGuests" && element.value.length > 0)){
                element.style.border = "";
            }
       }
       
    else if (element.getAttribute("rel") == "email"){
	   //check this for valid email address
       if ((element.value.indexOf('@') < 0) || ((element.value.indexOf('.') < 0))){
            element.style.border = "2px solid red";
            error = 1;
       }
       else {
	       element.style.border = "";
	   }
	}
	
	}
	
    if (getElementsByClassName('errordisplay',form_parent).length > 0){
        getElementsByClassName('errordisplay',form_parent)[0].style.color = '#F00';
           
    }
    
    
    if (typeof mgl_fb_app == 'function'){
        mgl_fb_app();
    }
    //Custom Form Validation Hook

if(typeof MGL_VALIDATION_FUNCTIONS !== 'undefined' && typeof MGL_VALIDATION_FUNCTIONS['mf502bc827766ae'] !== 'undefined' && MGL_VALIDATION_FUNCTIONS['mf502bc827766ae'].length > 0){
    			//Loop through each form validation function for this form
    			for (i in MGL_VALIDATION_FUNCTIONS['mf502bc827766ae']){
    				//get the function
					var f = MGL_VALIDATION_FUNCTIONS['mf502bc827766ae'][i];
					var thistry = f();
					if (!thistry){
						error = true;
            			mgl_warn('Your extended form validator function with ID ' + MGL_VALIDATION_FUNCTIONS["ref_mf502bc827766ae"][i] + ' returned an error');
   					}else
   						mgl_info('Extended form validator function ' + MGL_VALIDATION_FUNCTIONS["ref_mf502bc827766ae"][i] + ' returned no errors');
   				}
   			}


	if (checkbox){
	   if (getElementsByClassName('errordisplay',form_parent).length > 0){
            getElementsByClassName('errordisplay',form_parent)[0].innerHTML = "<strong>Please accept the Terms and Conditions</strong>";
        }
        return false;
    }
    else if(error) {
        if (getElementsByClassName('errordisplay',form_parent).length > 0){
	       getElementsByClassName('errordisplay',form_parent)[0].innerHTML = "<strong>Please make sure that all fields are filled in</strong>";
        }
	return false;
	}
	else
	return true;
    }
	}
}
function getElementsByClassName(classname, node) { if (!node) { node = document.getElementsByTagName('body')[0]; } var a = [], re = new RegExp('\\b' + classname + '\\b'); els = node.getElementsByTagName('*'); for (var i = 0, j = els.length; i < j; i++) { if ( re.test(els[i].className) ) { a.push(els[i]); } } return a; }
function mgl_jquery_ready(callback){
	if (typeof MGLJQUERY == 'undefined'){
	window.setTimeout(function(){
	mgl_jquery_ready(callback);
	},300);
	}
	else{
	return callback(MGLJQUERY);
	}
	}

	var MGL_USE_DOLLAR = false;
	function mgl_jquery_ui_mf502bc827766ae(){
if (typeof ie !== 'undefined' && ie < 7)
 return;

		if (typeof MGLJQUERY.ui == 'undefined' || typeof MGLJQUERY.ui.version == 'undefined' || MGLJQUERY.ui.version == 'undefined'){
		//load jquery ui
		 mgl_info('Loading jQuery UI from MyGuestlist');
		mgl_poll_jquery_ui_mf502bc827766ae(0);
		 return;
	}
	else{
		mgl_info('jQuery UI ' + MGLJQUERY.ui.version + ' detected');
		mgl_info('This form will use the theme from your own installation of jQuery UI');

	if (typeof MGLJQUERY().datepicker !== 'function' || typeof MGLJQUERY().button !== 'function'){
		mgl_warn('You do not have the jQuery UI Datepicker widget or button element, MyGuestlist will include our version of jQuery UI for you');
mgl_poll_jquery_ui_mf502bc827766ae(0);
	}else{
		mgl_info('You have the jQuery UI Datepicker widget');
 		setTimeout('mgl_jquerify_mf502bc827766ae()',2000);
}
}
}//end mgl_jquery_ui_mf502bc827766ae()
	function mgl_poll_jquery_ui_mf502bc827766ae(time_elapsed){
		if (time_elapsed < 1){
			if (document.getElementById('MGLIncludeJqueryUI') == null){
				var script = document.createElement('script')
  script.setAttribute("type","text/javascript")
  script.setAttribute("src", "//www.myguestlist.com.au/mgl/lib/forms/jqueryUI.js")
  script.setAttribute("id", "MGLIncludeJqueryUI")
  if (typeof script!="undefined")
  document.getElementsByTagName("body")[0].appendChild(script)
		}
			var style = document.createElement('link')
  style.setAttribute("type","text/css")
  style.setAttribute("rel","stylesheet")
  style.setAttribute("href", "//ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/smoothness/jquery-ui.css")
  if (typeof style!="undefined")
  document.getElementsByTagName("head")[0].appendChild(style)
			setTimeout('mgl_poll_jquery_ui_mf502bc827766ae()',500);
 return; 
		}
else{
			if (time_elapsed > 20000) return;
			if (typeof MGLJQUERY().datepicker !== 'function') setTimeout('mgl_poll_jquery_ui_mf502bc827766ae()',time_elapsed + 200);
			else return mgl_jquerify_mf502bc827766ae();

}
}

function mgl_jquery(){
if (typeof ie !== 'undefined' && ie < 7)
 return;

mgl_info('Loading jQuery from Google CDN')
if (typeof $ !== 'null' && typeof $ == 'function' && typeof $() == 'function' && $().jquery){
	MGL_USE_DOLLAR = true;
}
if (typeof jQuery == 'function') current_jquery = jQuery.noConflict();
else current_jquery = false;
if(window.MooTools){
mgl_warn('Warning: MooTools ' + window.MooTools.version + ' detected.');}
 if(typeof Prototype != 'undefined'){
mgl_warn('Prototype detected. jQuery compatibility has not been tested with this');
 }
if (MGL_USE_DOLLAR || typeof $ == 'undefined') $ = current_jquery;
if (document.getElementById('MGLJqueryInclude') == null){
var script = document.createElement('script')
  script.setAttribute("type","text/javascript")
  script.setAttribute("id","MGLJqueryInclude")
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js")
  if (typeof script!="undefined")
  document.getElementsByTagName("body")[0].appendChild(script)
}
mgl_poll_jquery(0);
}
function mgl_poll_jquery(time_elapsed){
//Polls for new jQuery version

if (typeof jQuery == 'function' && typeof current_jquery == 'function'){
if (jQuery().jquery == current_jquery().jquery && time_elapsed < 20000){
    setTimeout('mgl_poll_jquery(' + (time_elapsed + 200) + ')',200);
    return;
}
}else if (typeof jQuery !== 'function' && time_elapsed < 20000){
setTimeout('mgl_poll_jquery(' + (time_elapsed + 200) + ')',200);
return;
}
else if (time_elapsed > 20000){
mgl_error(time_elapsed + ' timeout loading new jQuery');
return false;
}
if (typeof MGLJQUERY == 'function')
	return MGLJQUERY;
MGLJQUERY = $.noConflict();
mgl_info('jQuery ' + MGLJQUERY().jquery + ' loaded');
mgl_jquery_ui_mf502bc827766ae();
if (MGL_USE_DOLLAR) $ = current_jquery;
if (typeof current_jquery == "function" && current_jquery().jquery) jQuery = current_jquery;
return;
}


if(typeof jQuery != 'function'){
mgl_info('jQuery not detected. Attempting to load it');
setTimeout('mgl_jquery()',1000)}
else{
mgl_info('jQuery ' + jQuery().jquery + ' detected');

if (typeof jQuery == 'function' && parseFloat(jQuery().jquery) >= 1.3 && parseFloat(jQuery().jquery) < 1.9){
mgl_info('jQuery ' + parseFloat(jQuery().jquery) + ' is OK')
MGLJQUERY = jQuery;
 mgl_jquery_ui_mf502bc827766ae();
}else{
mgl_warn('Note: Your version of jQuery is not compatible with the MyGuestlist calendar widget.')
setTimeout('mgl_jquery()',1000)
}
}
function mgl_jquerify_mf502bc827766ae(){
if (MGLJQUERY('#MGLSubmitButton').length > 0 && typeof MGLJQUERY('#MGLSubmitButton').button == 'function'){
	MGLJQUERY('#MGLSubmitButton').button();
}

MGLJQUERY('[mglrel="date"]','#mf502bc827766ae').each(function(){
		if (MGLJQUERY(this).attr('name') !== 'DOB_yyyy'){
		var name = MGLJQUERY(this).attr('name');
 name = name.replace('_yyyy','');
		var required = MGLJQUERY(this).attr('rel') == 'required' ? true : false;
		if (MGLJQUERY('option',this).length > 0){
			if (MGLJQUERY("option[value='2016']").length > 0){
					 maxyear = 2;
}
		else{
		maxyear = 1;}
}
	else if(MGLJQUERY('option',this).length < 1){ maxyear = false; }
	else{ maxyear = 1; }
			var parent = MGLJQUERY(this).parent('div');
			MGLJQUERY('[name="' + name + '_dd"],[name="' + name + '_mm"],[name="' + name + '_yyyy"]',parent).remove();
			var input = MGLJQUERY('mf502bc827766ae_' + name);
				input = MGLJQUERY('#mf502bc827766ae_' + name);
			input.css('padding-left',16).css('display','');
 			 input.css('background-image','url(//www.myguestlist.com.au/mgl/images/formgen/date.png)')
 			 input.css('background-repeat','no-repeat');
			input.attr('readonly','readonly')
			if (required) input.attr('rel','required');
				eval('MGLJQUERY(input).datepicker({ dateFormat: \'dd/mm/yy\',changeYear: true, minDate: 0, beforeShowDay: mgl_date_mf502bc827766ae_' + name + ' })');
			if (maxyear){ MGLJQUERY(input).datepicker('option','maxDate','+' + maxyear + 'y');
}
 setTimeout('MGL_set_datepicker_options_mf502bc827766ae()',1000);
}
})
}
function MGL_set_datepicker_options_mf502bc827766ae(){

}

ie = (function(){
 
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
 
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
 
    return v > 4 ? v : undef;
 
}());
if (typeof ie == 'undefined' || ie > 6){
if ($_GET('formSubmitted') == 'mf502bc827766ae'){
    document.write("<div class=\"MGLSuccessMessage\">Thanks for signing up to the FACT newsletter, check your inbox for weekly updates.</div>");
    }else if ($_GET('formEmailVerification') == 'mf502bc827766ae'){
    document.write("Thanks! A confirmation e-mail with instructions has been sent to you. Please check your e-mail inbox and the junk mail folder...just incase.");
    }else{
    if ($_GET('formAllowedError') == 'mf502bc827766ae'){
document.write('<div class="MGLSubmissionNotAllowed">Sorry - This form is not available for everyone');
}document.write("<style>\ndiv.MGLLabel{\n            width: 30%;\n            float: left;\n            font-weight: bold;\n            text-align: right;\n            }\n            div.MGLField{\n                width: 60%;\n                float:left;\n                margin-left: 4%;\n            }\n            div.MGLRow{\n                clear: both;\n                padding-bottom: 40px;\n                margin-right: 5%;\n            }\n            div.MGLField input{\n                padding: 0;\n                }\n            div.MGLSeperator{\n                border-bottom: 1px solid gray;\n                padding-bottom: 10px;\n                margin-bottom: 10px;\n            }\n            div.MGLText{\n                padding-bottom: 10px;\n                margin-bottom: 10px;\n            }\n            \n            span.MGLTitle{\n                font-weight: bold;\n            }\n            \n            .MGLFormAllowedError,.MGLFormVerification{\n            display: none;\n            color: #F00;\n            }input[type=text]{\nwidth:200px;\n}\n#MGLDOB{\nwidth:70px;\n}\n#MGLWrapperm02aec9d5e83e{\npadding-left:20px;\nbackground:white;\nopacity:0.8;\npadding-top:1px;\ncolor:black;\nborder-radius:8px;\n}\ndiv.mglrow{\npadding-bottom:39px;\n}\n.fieldOption{\nfont-size:12px;\n}\n</style>\n<div id=\"MGLWrappermf502bc827766ae\" style=\"width:416px\">\n<form action=\"//www.myguestlist.com.au/mgl/formreceiver.php\" method=\"post\" id=\"mf502bc827766ae\" onsubmit=\"return mgl_validator_mf502bc827766ae('mf502bc827766ae')\">\n<input type=\"hidden\" name=\"formID\" value=\"mf502bc827766ae\" />\n<div class=\"MGLRow MGLFormAllowedError\" id=\"\">Sorry - This form is not available for everyone</div><div class=\"MGLRow MGLFormVerification\">Thanks! A confirmation e-mail with instructions has been sent to you. Please check your e-mail inbox and the junk mail folder...just incase.</div><div class=\"MGLRow\">\n<div class=\"MGLLabel\">Name*</div>\n<div class=\"MGLField\"><input type=\"text\" name=\"PatronName\" value=\"\" rel=\"required\" id=\"mf502bc827766ae_PatronName\" /></div>\n</div>\n<div class=\"MGLRow\">\n<div class=\"MGLLabel\">Surname*</div>\n<div class=\"MGLField\"><input type=\"text\" name=\"PatronSurname\" value=\"\" rel=\"required\" id=\"mf502bc827766ae_PatronSurname\" /></div>\n</div>\n<div class=\"MGLRow\">\n<div class=\"MGLLabel\">E-mail*</div>\n<div class=\"MGLField\"><input type=\"text\" name=\"PatronEmail\" value=\"\" rel=\"email\" id=\"mf502bc827766ae_PatronEmail\" /></div>\n</div>\n<div class=\"MGLRow\">\n<div class=\"MGLLabel\">Date of Birth*</div>\n<div class=\"MGLField\"><select name=\"DOB_dd\" rel=\"required\" id=\"DOB_dd\">\n<option value=\"\" selected=\"selected\">Day</option>\n<option value=\"1\">01</option>\n<option value=\"2\">02</option>\n<option value=\"3\">03</option>\n<option value=\"4\">04</option>\n<option value=\"5\">05</option>\n<option value=\"6\">06</option>\n<option value=\"7\">07</option>\n<option value=\"8\">08</option>\n<option value=\"9\">09</option>\n<option value=\"10\">10</option>\n<option value=\"11\">11</option>\n<option value=\"12\">12</option>\n<option value=\"13\">13</option>\n<option value=\"14\">14</option>\n<option value=\"15\">15</option>\n<option value=\"16\">16</option>\n<option value=\"17\">17</option>\n<option value=\"18\">18</option>\n<option value=\"19\">19</option>\n<option value=\"20\">20</option>\n<option value=\"21\">21</option>\n<option value=\"22\">22</option>\n<option value=\"23\">23</option>\n<option value=\"24\">24</option>\n<option value=\"25\">25</option>\n<option value=\"26\">26</option>\n<option value=\"27\">27</option>\n<option value=\"28\">28</option>\n<option value=\"29\">29</option>\n<option value=\"30\">30</option>\n<option value=\"31\">31</option>\n</select> <select name=\"DOB_mm\" rel=\"required\" id=\"DOB_mm\">\n<option value=\"\" selected=\"selected\">Month</option>\n<option value=\"1\">Jan</option>\n<option value=\"2\">Feb</option>\n<option value=\"3\">Mar</option>\n<option value=\"4\">Apr</option>\n<option value=\"5\">May</option>\n<option value=\"6\">Jun</option>\n<option value=\"7\">Jul</option>\n<option value=\"8\">Aug</option>\n<option value=\"9\">Sep</option>\n<option value=\"10\">Oct</option>\n<option value=\"11\">Nov</option>\n<option value=\"12\">Dec</option>\n</select> <input type=\"text\" name=\"DOB_yyyy\" value=\"Year\" size=\"4\" maxlength=\\\"4\\\" onfocus=\"clickclear(this, 'Year')\" onblur=\"clickrecall(this, 'Year')\" id=\"MGLDOB\" rel=\"required\" mglrel=\"date\" id=\"DOB_yyyy\" />\n<input type=\"text\" style=\"display:none;\" name=\"DOB\" id=\"mf502bc827766ae_DOB\" /></div>\n</div>\n<div class=\"MGLRow\">\n<div class=\"MGLLabel\">Country*</div>\n<div class=\"MGLField\"><select name=\"Country\" rel=\"required\" id=\"mf502bc827766ae_Country\">\n<option value=\"\" selected=\"selected\"></option>\n<option value=\"5034b4aef0911\">United Kingdom</option>\n<option value=\"5034f0148b134\">Poland</option>\n<option value=\"5034f3ac79991\">Netherlands</option>\n<option value=\"503507537f65d\">Iceland</option>\n<option value=\"503508e4825fe\">Belgium</option>\n<option value=\"5035221cdd60c\">Germany</option>\n<option value=\"50352b0f68b16\">South Africa</option>\n<option value=\"503541fe6ba80\">England</option>\n<option value=\"5035abb928f60\">Afghanistan</option>\n<option value=\"5035abb93375a\">Albania</option>\n<option value=\"5035abb93569a\">Algeria</option>\n<option value=\"5035abb9379c2\">Andorra</option>\n<option value=\"5035abb939902\">Angola</option>\n<option value=\"5035abb93b842\">Antigua & Deps</option>\n<option value=\"5035abb93d781\">Argentina</option>\n<option value=\"5035abb93f6c2\">Armenia</option>\n<option value=\"5035abb941602\">Australia</option>\n<option value=\"5035abb943542\">Austria</option>\n<option value=\"5035abb9456cf\">Azerbaijan</option>\n<option value=\"5035abb9477d5\">Bahamas</option>\n<option value=\"5035abb949ad4\">Bahrain</option>\n<option value=\"5035abb94bdfb\">Bangladesh</option>\n<option value=\"5035abb94dd3b\">Barbados</option>\n<option value=\"5035abb94fc7b\">Belarus</option>\n<option value=\"5035abb95332b\">Belize</option>\n<option value=\"5035abb95526b\">Benin</option>\n<option value=\"5035abb9571ab\">Bhutan</option>\n<option value=\"5035abb9590ec\">Bolivia</option>\n<option value=\"5035abb95b044\">Bosnia Herzegovina</option>\n<option value=\"5035abb95cf72\">Botswana</option>\n<option value=\"5035abb95f295\">Brazil</option>\n<option value=\"5035abb9615bc\">Brunei</option>\n<option value=\"5035abb965825\">Bulgaria</option>\n<option value=\"5035abb967b4d\">Burkina</option>\n<option value=\"5035abb969e75\">Burundi</option>\n<option value=\"5035abb96c1bc\">Cambodia</option>\n<option value=\"5035abb96e4c5\">Cameroon</option>\n<option value=\"5035abb9707ee\">Canada</option>\n<option value=\"5035abb972b16\">Cape Verde</option>\n<option value=\"5035abb974e42\">Central African Rep</option>\n<option value=\"5035abb97754e\">Chad</option>\n<option value=\"5035abb979878\">Chile</option>\n<option value=\"5035abb97bb9f\">China</option>\n<option value=\"5035abb97ea8b\">Colombia</option>\n<option value=\"5035abb981960\">Comoros</option>\n<option value=\"5035abb98406e\">Congo</option>\n<option value=\"5035abb986398\">Congo {Democratic Rep}</option>\n<option value=\"5035abb9886c0\">Costa Rica</option>\n<option value=\"5035abb98a9e8\">Croatia</option>\n<option value=\"5035abb98cd10\">Cuba</option>\n<option value=\"5035abb98f039\">Cyprus</option>\n<option value=\"5035abb99138c\">Czech Republic</option>\n<option value=\"5035abb993693\">Denmark</option>\n<option value=\"5035abb9959bd\">Djibouti</option>\n<option value=\"5035abb997ce4\">Dominica</option>\n<option value=\"5035abb99a04d\">Dominican Republic</option>\n<option value=\"5035abb99ceed\">East Timor</option>\n<option value=\"5035abb99f216\">Ecuador</option>\n<option value=\"5035abb9a1925\">Egypt</option>\n<option value=\"5035abb9a4037\">El Salvador</option>\n<option value=\"5035abb9a6745\">Equatorial Guinea</option>\n<option value=\"5035abb9a8a6e\">Eritrea</option>\n<option value=\"5035abb9abd36\">Estonia</option>\n<option value=\"5035abb9ae445\">Ethiopia</option>\n<option value=\"5035abb9b2e9a\">Fiji</option>\n<option value=\"5035abb9b558f\">Finland</option>\n<option value=\"5035abb9b78b7\">France</option>\n<option value=\"5035abb9b9bfe\">Gabon</option>\n<option value=\"5035abb9bc2f0\">Gambia</option>\n<option value=\"5035abb9beded\">Georgia</option>\n<option value=\"5035abb9c2887\">Ghana</option>\n<option value=\"5035abb9c537a\">Greece</option>\n<option value=\"5035abb9c7a8a\">Grenada</option>\n<option value=\"5035abb9d0341\">Guatemala</option>\n<option value=\"5035abb9d2a50\">Guinea</option>\n<option value=\"5035abb9d5162\">Guinea-Bissau</option>\n<option value=\"5035abb9d7873\">Guyana</option>\n<option value=\"5035abb9d9f82\">Haiti</option>\n<option value=\"5035abb9dc692\">Honduras</option>\n<option value=\"5035abb9df18a\">Hungary</option>\n<option value=\"5035abb9e2c23\">India</option>\n<option value=\"5035abb9e5334\">Indonesia</option>\n<option value=\"5035abb9e7e2b\">Iran</option>\n<option value=\"5035abb9ea53b\">Iraq</option>\n<option value=\"5035abb9ecc40\">Ireland {Republic}</option>\n<option value=\"5035abb9ef350\">Israel</option>\n<option value=\"5035abb9f1e48\">Italy</option>\n<option value=\"5035abba0070c\">Ivory Coast</option>\n<option value=\"5035abba03203\">Jamaica</option>\n<option value=\"5035abba05cfc\">Japan</option>\n<option value=\"5035abba08401\">Jordan</option>\n<option value=\"5035abba0ab12\">Kazakhstan</option>\n<option value=\"5035abba0d222\">Kenya</option>\n<option value=\"5035abba0f932\">Kiribati</option>\n<option value=\"5035abba12042\">Korea North</option>\n<option value=\"5035abba14f2e\">Korea South</option>\n<option value=\"5035abba17a26\">Kosovo</option>\n<option value=\"5035abba1a136\">Kuwait</option>\n<option value=\"5035abba1c846\">Kyrgyzstan</option>\n<option value=\"5035abba1ef57\">Laos</option>\n<option value=\"5035abba21a84\">Latvia</option>\n<option value=\"5035abba24546\">Lebanon</option>\n<option value=\"5035abba27bee\">Lesotho</option>\n<option value=\"5035abba2a6e3\">Liberia</option>\n<option value=\"5035abba2d1db\">Libya</option>\n<option value=\"5035abba2fcd4\">Liechtenstein</option>\n<option value=\"5035abba327cc\">Lithuania</option>\n<option value=\"5035abba352c5\">Luxembourg</option>\n<option value=\"5035abba37dbf\">Macedonia</option>\n<option value=\"5035abba3a8b8\">Madagascar</option>\n<option value=\"5035abba3d3ad\">Malawi</option>\n<option value=\"5035abba3fea5\">Malaysia</option>\n<option value=\"5035abba4299d\">Maldives</option>\n<option value=\"5035abba45496\">Mali</option>\n<option value=\"5035abba47f95\">Malta</option>\n<option value=\"5035abba4aa86\">Marshall Islands</option>\n<option value=\"5035abba4d57f\">Mauritania</option>\n<option value=\"5035abba50077\">Mauritius</option>\n<option value=\"5035abba52b6f\">Mexico</option>\n<option value=\"5035abba55668\">Micronesia</option>\n<option value=\"5035abba58160\">Moldova</option>\n<option value=\"5035abba5ac58\">Monaco</option>\n<option value=\"5035abba5d750\">Mongolia</option>\n<option value=\"5035abba602ef\">Montenegro</option>\n<option value=\"5035abba65077\">Morocco</option>\n<option value=\"5035abba67f57\">Mozambique</option>\n<option value=\"5035abba6b22f\">Myanmar, {Burma}</option>\n<option value=\"5035abba6e0fc\">Namibia</option>\n<option value=\"5035abba70bf5\">Nauru</option>\n<option value=\"5035abba73ad5\">Nepal</option>\n<option value=\"5035abba78126\">New Zealand</option>\n<option value=\"5035abba7ac1e\">Nicaragua</option>\n<option value=\"5035abba7d716\">Niger</option>\n<option value=\"5035abba805f8\">Nigeria</option>\n<option value=\"5035abba834d7\">Norway</option>\n<option value=\"5035abba85fcf\">Oman</option>\n<option value=\"5035abba88ac7\">Pakistan</option>\n<option value=\"5035abba8b5bf\">Palau</option>\n<option value=\"5035abba8e0b7\">Panama</option>\n<option value=\"5035abba90bb2\">Papua New Guinea</option>\n<option value=\"5035abba93a91\">Paraguay</option>\n<option value=\"5035abba96971\">Peru</option>\n<option value=\"5035abba99851\">Philippines</option>\n<option value=\"5035abba9dab9\">Portugal</option>\n<option value=\"5035abbaa05b1\">Qatar</option>\n<option value=\"5035abbaa3492\">Romania</option>\n<option value=\"5035abbaa5f89\">Russian Federation</option>\n<option value=\"5035abbaa8a82\">Rwanda</option>\n<option value=\"5035abbaab57a\">St Kitts & Nevis</option>\n<option value=\"5035abbaae073\">St Lucia</option>\n<option value=\"5035abbab0f54\">Saint Vincent & the Grenadines</option>\n<option value=\"5035abbab3e32\">Samoa</option>\n<option value=\"5035abbab692b\">San Marino</option>\n<option value=\"5035abbab980b\">Sao Tome & Principe</option>\n<option value=\"5035abbabc303\">Saudi Arabia</option>\n<option value=\"5035abbabedfb\">Senegal</option>\n<option value=\"5035abbac18fd\">Serbia</option>\n<option value=\"5035abbac47d4\">Seychelles</option>\n<option value=\"5035abbac76b4\">Sierra Leone</option>\n<option value=\"5035abbaca725\">Singapore</option>\n<option value=\"5035abbacdc3a\">Slovakia</option>\n<option value=\"5035abbade5dd\">Slovenia</option>\n<option value=\"5035abbae14ba\">Solomon Islands</option>\n<option value=\"5035abbae439b\">Somalia</option>\n<option value=\"5035abbae91bb\">South Sudan</option>\n<option value=\"5035abbaec09b\">Spain</option>\n<option value=\"5035abbaeef7c\">Sri Lanka</option>\n<option value=\"5035abbaf2dfd\">Sudan</option>\n<option value=\"5035abbb01a9e\">Suriname</option>\n<option value=\"5035abbb04d64\">Swaziland</option>\n<option value=\"5035abbb0802d\">Sweden</option>\n<option value=\"5035abbb0ce4e\">Switzerland</option>\n<option value=\"5035abbb1149e\">Syria</option>\n<option value=\"5035abbb14766\">Taiwan</option>\n<option value=\"5035abbb17647\">Tajikistan</option>\n<option value=\"5035abbb1a527\">Tanzania</option>\n<option value=\"5035abbb1dfc1\">Thailand</option>\n<option value=\"5035abbb20ea5\">Togo</option>\n<option value=\"5035abbb24574\">Tonga</option>\n<option value=\"5035abbb27c09\">Trinidad & Tobago</option>\n<option value=\"5035abbb2aecb\">Tunisia</option>\n<option value=\"5035abbb2e196\">Turkey</option>\n<option value=\"5035abbb3145e\">Turkmenistan</option>\n<option value=\"5035abbb34725\">Tuvalu</option>\n<option value=\"5035abbb379ee\">Uganda</option>\n<option value=\"5035abbb3acbd\">Ukraine</option>\n<option value=\"5035abbb3db9e\">United Arab Emirates</option>\n<option value=\"5035abbb425db\">United States</option>\n<option value=\"5035abbb4589e\">Uruguay</option>\n<option value=\"5035abbb48f4f\">Uzbekistan</option>\n<option value=\"5035abbb4c216\">Vanuatu</option>\n<option value=\"5035abbb4f0f7\">Vatican City</option>\n<option value=\"5035abbb527a7\">Venezuela</option>\n<option value=\"5035abbb55e93\">Vietnam</option>\n<option value=\"5035abbb59509\">Yemen</option>\n<option value=\"5035abbb5cbb9\">Zambia</option>\n<option value=\"5035abbb5fe82\">Zimbabwe</option>\n<option value=\"50630348b8530\">UK</option>\n<option value=\"506303492077b\">USA</option>\n<option value=\"5063034ce9e75\">Russia</option>\n<option value=\"515ed95006afa\">United Kingdom + Channel Islands</option>\n<option value=\"515ed95018817\">Ireland</option>\n<option value=\"515ed952a2375\">Hong Kong</option>\n</select></div>\n</div>\n<div class=\"MGLRow\">\n<div class=\"MGLLabel\">What's your music genre of choice:</div>\n<div class=\"MGLField\"><table border=\"0\" cellpadding=\"2\">\n<tr>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b6cc3c\"  /> Disco<br/></td>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b6b4cc\"  /> Dubstep<br/></td>\n</tr>\n<tr>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b6a52c\"  /> Experimental<br/></td>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b72de5\"  /> Grime<br/></td>\n</tr>\n<tr>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b6c084\"  /> Hip-Hop<br/></td>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b6f735\"  /> House<br/></td>\n</tr>\n<tr>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b706d7\"  /> Pop<br/></td>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b6e794\"  /> Rock/Metal<br/></td>\n</tr>\n<tr>\n<td class=\"fieldOption\"><input type=\"checkbox\" name=\"MusicGenre[]\" value=\"502aeb8b69974\"  /> Techno<br/></td>\n</table>\n</div>\n</div>\n<div class=\"MGLRow\">\n<div class=\"MGLLabel\">What do like to read about on FACT?</div>\n<div class=\"MGLField\"><input type=\"checkbox\" name=\"WhatFactReadersRead[]\" value=\"5034a885b648d\"  /> News<br/><input type=\"checkbox\" name=\"WhatFactReadersRead[]\" value=\"5034a885b6c5c\"  /> Reviews<br/><input type=\"checkbox\" name=\"WhatFactReadersRead[]\" value=\"5034a885b742d\"  /> New Music<br/><input type=\"checkbox\" name=\"WhatFactReadersRead[]\" value=\"5034a885b7bfd\"  /> FACT Mixes<br/><input type=\"checkbox\" name=\"WhatFactReadersRead[]\" value=\"5034a885b83cd\"  /> FACT TV<br/><input type=\"checkbox\" name=\"WhatFactReadersRead[]\" value=\"5034a885b8b9d\"  /> Events<br/></div>\n</div>\n<div class=\"MGLRow\"><br class=\"MGLSubmitBreak\" />\n<div id=\"MGLSubmit\" style=\"text-align:center;\"><input type=\"submit\" value=\"Sign Up\" /><br />\n<span style=\"text-align:center;display:block;position:relative;margin-left:auto;margin-right:auto;\" class=\"errordisplay\" id=\"errordisplay\"></span>\n<div class=\"MGLPoweredBy\">Powered by <a href=\"http://www.myguestlist.com.au?utm_source=poweredby&utm_medium=forms&utm_campaign=Powered%2BBy%2BTracking\" target=\"_blank\">MyGuestlist</a></div>\n</div>\n</div>\n</form>\n</div>\n")

}}