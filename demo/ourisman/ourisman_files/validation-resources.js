var dealerMake='Toyota';var isVirtual=false;var phoneRequired=true;var canadian=false;var errName='Name';var errFirstName='First Name';var errLastName='Last Name';var errPhoneNumber='Phone Number';var errEmail='E-Mail Address';var errStartYear='Please select a start year that is earlier or the same as the end year.';var errYearFrom='Year From';var errYearTo='Year To';var errYear='Year';var errMake='Make';var errModel='Model';var errParts='Parts';var errMileage='Mileage';var errDate='Date';var errTime='Time';var errShoppingStatus='Shopping Status';var errServiceNeeds='Service Needs';var stateLable='State';var zipLable='Zip';var cityLable='City';var priceLabel='Price Range';var mileageLable='Mileage';
//Valid Phone
function validPhone(formField,fieldLabel){
var result = true;
var value=formField.val();
var pattern=new RegExp(/^((\+?\d{1,3}(-| |.|,|_)?\(?\d\)?(-| |.|,|_)?\d{1,5})|(\(?\d{2,6}\)?))(-| |.|,|_)?(\d{3,4})(-| |.|,|_)?(\d{4})(( x| ext)\d{1,5}){0,1}(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/);
if (!pattern.test(value)){

alert('Please enter a 10-digit phone number for "' + fieldLabel +'" field as xxx-xxx-xxxx.');

formField.focus();
result=false;
}
return result;
}
// Valid Requierd
function validRequired(formField,fieldLabel){
var result = true;
var value=formField.val();
if(!value) {

alert('Please enter a value for the "'+fieldLabel+'" field.');

formField.focus();
result=false;
}
return result;
}//Valid Email
function validEmail(formField,fieldLabel){
var result=true;
var value=formField.val();

if (value.indexOf(" ") != -1) {
  value = value.split(" ").slice(0, 1).toString();
}

var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
if (!pattern.test(value)){

alert('Please enter a valid E-Mail for the "'+fieldLabel+'" field.');

formField.focus();
result=false;
}
return result;
}


//Valid CA Zip Cose
function isValidCaPostalCode(formField,fieldLabel){
var result=true;
var value=formField.val();
var pattern = new RegExp(/^\D{1}\d{1}\D{1}\-?\d{1}\D{1}\d{1}$/);
if (!pattern.test(value)){

alert('Please enter a Canadian postal code for "' + fieldLabel +'" field as xxxxxx.');

formField.focus();
result=false;
}
return result;
}
//Valid US Zip Cose
function isValidZipCode(formField,fieldLabel){
var result=true;
var value=formField.val();
var pattern = new RegExp(/^\d{5}([\-]\d{4})?$/);
if (!pattern.test(value)){

alert('Please enter a States zip code in 5 digit format for "' + fieldLabel +'" field as xxxxx.');

formField.focus();
result=false;
}
return result;
}
//Valid Number
function validNumber(formField,fieldLabel){
var result=true;
var value=formField.val();
if(isNaN(value)){

alert('Please enter a numeric value for the "'+fieldLabel+'" field.');

formField.focus();
result=false;
}
return result;
}
//Valid Alphabetical 
function isAlphabet(formField,fieldLabel){
var result=true;
var value=formField.val();
var pattern = new RegExp(/^[a-zA-Z]+$/);
if (!pattern.test(value)){

alert('Please enter a valid value for the " + fieldLabel + " field.');

formField.focus();
result=false;
}
return result;
}
//Valid SIN
function isValidSocialInsurance(formField,fieldLabel){
var result = true;
var value=formField.val();
var pattern = new RegExp(/^\d{9}$/);
if (!pattern.test(value)){

alert('Please enter a 9-digit Social Insurance Number for "' + fieldLabel +'" field as xxxxxxxxx.');

formField.focus();
result = false;
}
return result;
}
//Valid SSN
function validSSN(formField,fieldLabel){
var result=true;
var value=formField.val();
if(!isValidSSN(value)){

alert('Please enter a valid Social Security Number for the "'+fieldLabel+'" field.');

formField.focus();
result=false;
}
return result;
}
function isValidSSN(value){
//var re=/^([0-6]\d{2}|7[0-6]\d|77[0-2])([ \-]?)(\d{2})\2(\d{4})$/;
var re=/^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
if(!re.test(value)) {return false;}
var temp=value;
if(value.indexOf("-")!=-1){temp=(value.split("-")).join("");}
if(value.indexOf(" ")!=-1){temp=(value.split(" ")).join("");}
if(temp.substring(0,3)=="000"){return false;}
if(temp.substring(3,5)=="00"){return false;}
if(temp.substring(5,9)=="0000"){return false;}
return true;
}
//Valid Date
function validDate(formField,fieldLabel){
var result=true;
var value=formField.val();
var pattern = new RegExp(/^(?=\d)(?:(?:(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2}))($|\ (?=\d)))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\ [AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/);
if (!pattern.test(value)){

alert('Please enter valid date for the "'+fieldLabel+'" field as month, day, and four digit year.\nFormat mm/dd/yyyy.');

formField.focus();
result=false;
}
return result;
}
//Valid Currency
function validCurrency(formField,fieldLabel){
var result=true;
var value=formField.val();
var pattern = new RegExp(/^\$?(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,2}){0,1}$/);
if (!pattern.test(value)){

alert('Please enter a number or dollar amount for the "'+fieldLabel+'" field.\n Example: $1,000');

formField.focus();
return false;
}
return result;
}

//__________________________________________

var DealerOn_Base64 = {
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode : function (data) {
var output = "";
var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
var i = 0;
data = DealerOn_Base64._utf8_encode(data);
while (i < data.length) {
chr1 = data.charCodeAt(i++);
chr2 = data.charCodeAt(i++);
chr3 = data.charCodeAt(i++);
enc1 = chr1 >> 2;
enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
enc4 = chr3 & 63;
if (isNaN(chr2)) {
enc3 = enc4 = 64;
} else if (isNaN(chr3)) {
enc4 = 64;
}
output = output +
this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
}
return output;
},
decode : function (data) {
var output = "";
var chr1, chr2, chr3;
var enc1, enc2, enc3, enc4;
var i = 0;
data = data.replace(/[^A-Za-z0-9\+\/\=]/g, "");
while (i < data.length) {
enc1 = this._keyStr.indexOf(data.charAt(i++));
enc2 = this._keyStr.indexOf(data.charAt(i++));
enc3 = this._keyStr.indexOf(data.charAt(i++));
enc4 = this._keyStr.indexOf(data.charAt(i++));
chr1 = (enc1 << 2) | (enc2 >> 4);
chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
chr3 = ((enc3 & 3) << 6) | enc4;
output = output + String.fromCharCode(chr1);
if (enc3 != 64) {
output = output + String.fromCharCode(chr2);
}
if (enc4 != 64) {
output = output + String.fromCharCode(chr3);
}
}
output = DealerOn_Base64._utf8_decode(output);
return output;
}, 
_utf8_encode : function (string) {
string = string.replace(/\r\n/g,"\n");
var utftext = "";
for (var n = 0; n < string.length; n++) {
var c = string.charCodeAt(n);
if (c < 128) {
utftext += String.fromCharCode(c);
}
else if((c > 127) && (c < 2048)) {
utftext += String.fromCharCode((c >> 6) | 192);
utftext += String.fromCharCode((c & 63) | 128);
}
else {
utftext += String.fromCharCode((c >> 12) | 224);
utftext += String.fromCharCode(((c >> 6) & 63) | 128);
utftext += String.fromCharCode((c & 63) | 128);
}
}
return utftext;
},
_utf8_decode : function (utftext) {
var string = "";
var i = 0;
var c = c1 = c2 = 0;
while ( i < utftext.length ) {
c = utftext.charCodeAt(i);
if (c < 128) {
string += String.fromCharCode(c);
i++;
}
else if((c > 191) && (c < 224)) {
c2 = utftext.charCodeAt(i+1);
string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
i += 2;
}
else {
c2 = utftext.charCodeAt(i+1);
c3 = utftext.charCodeAt(i+2);
string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
i += 3;
}
}
return string;
} 
}