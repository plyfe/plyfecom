var adWordsAccount = '0000000000';

$(document).ready(function() {
	$('.out').click(function(){
		alert('out: '+$(this).attr('href'));
		_gaq.push(['_trackPageview',$(this).attr('href')]);		
		return false;
	});
	
	$('#regbutton').click(function(){
		_gaq.push(['_trackPageview', '/showregister']);
		adConversion('ShowReg');
		//$.get('/inc/form.html',function(html){
		//	new Boxy(html,{title:'Kelly-Moore Paints Registration',modal:true});
			bindForm();
		//})
      		return false;
	});
});

function bindForm(){
	$('#regform .submit').click(function(){
		$.post('/ajax.asp',{site:'www.openingceremony.us',firstname:firstname,lastname:lastname,email:email,phone:phone,address:address,city:city,state:state,postalcode:postalcode,agree:agree},function(){
			adConversion('Registered');
			_gaq.push(['_trackPageview', '/thankyou']);
			$('#regformtable').hide();
			$('#thankyouinfo').show();
		})
	});
}


function adConversion(conversionType){

	switch(conversionType)
	{
	case "Home":
	  adConversionPixel('MyElCIXQxwIQ84TtzgM');
	  break;
	case "ShowReg":
	  adConversionPixel('iy8GCPXuyQIQ84TtzgM');
	  break;
	case "Registered":
	  adConversionPixel('hstVCPXRxwIQ84TtzgM');
	  break;
	case "Twitter"://
	  adConversionPixel('cYKqCO3SxwIQ84TtzgM');
	  break;
	case "Facebook":
	  adConversionPixel('yaesCOXTxwIQ84TtzgM');
	  break;	  
	default:
	  //code to be executed if n is different from case 1 and 2
	}
}

function adConversionPixel(label){
var adConversionPixel = '<img height="1" width="1" style="border-style:none;" alt="" src="http://www.googleadservices.com/pagead/conversion/'+adWordsAccount+'/?label='+label+'&amp;guid=ON&amp;script=0"/>'
$('body').append(adConversionPixel);
}