// JavaScript Document

var currentSlide = 1;
var currentPanel = 1;

var trackMe = function(url){
	// fire off request for 1x1 for tracking
	var cacheBuster = new Date();
	var path = url + 'ord=' + cacheBuster.getTime();
	$('#avocado_nav_tracking').attr('src', path);
}






	/*TweenLite.to(avocado_email_sent1, 0, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_email_sent2, 0, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_email_sent3, 0, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_email_sent4, 0, {css:{autoAlpha:0}, delay:0});*/
	
	TweenLite.to(avocado4_character, 1, {css:{left:45}, delay:3});
	TweenLite.to(avocado_header_txt, 0, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_button_container, 0, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_button_container, 2, {css:{autoAlpha:1}, delay:3});
	TweenLite.to(avocado_header_txt, 2, {css:{autoAlpha:1}, delay:2});
			
	
	

/*$("#avocado_downNav").click(function() {
	currentPanel++;		
});*/
$("#avocado_upNav").click(function() {
	currentPanel--;		
	TweenLite.to(avocado_filmstrip_container, 1, {css:{top:0}, delay:0});
	
	currentSlide = 1
	TweenLite.to(avocado_upNav, .5,  {css:{top:-50}});	
		
	TweenLite.to(avocado_recipe1_container, .3,  {css:{top:1370}, delay:0});	
	TweenLite.to(avocado_recipe2_container, .3,  {css:{top:1370}, delay:0});
	TweenLite.to(avocado_recipe3_container, .3,  {css:{top:1370}, delay:0});
	TweenLite.to(avocado_recipe4_container, .3,  {css:{top:1370}, delay:0});
	
	TweenLite.to(avocado_recipe1_email, .5,  {css:{top:1200}, delay:0});
	TweenLite.to(avocado_recipe2_email, .5,  {css:{top:1200}, delay:0});	
	TweenLite.to(avocado_recipe3_email, .5,  {css:{top:1200}, delay:0});	
	TweenLite.to(avocado_recipe4_email, .5,  {css:{top:1200}, delay:0});	

});


/*panel2 slides--------*/

var next = function() {
	currentSlide++;	
	if( currentSlide === 2 ){
	// Slide 2 animations
	avocado_slide2()
	//End Slide 2 animations
	
	} else if ( currentSlide === 3 ) {
	// Slide 3 animations
	avocado_slide3()
	
	} else if ( currentSlide === 4 ) {
	// Slide 4 animations
	avocado_slide4()
	}else if ( currentSlide === 5 ) {
	// Slide 5 animations
	currentSlide = 1;
	if( currentSlide === 1 ){
	// Slide 1 animations
	avocado_slide1();
	//End Slide 1 animations
	
	} 
	
	}
	
	
	
}
var prev = function() {
	currentSlide--;
	
	if( currentSlide === 0 ){
		currentSlide = 4;
		if ( currentSlide === 4 ) {
	// Slide 4 animations
	avocado_slide4()
	}
	}
	
	if( currentSlide === 1 ){
	// Slide 1 animations	
	avocado_slide1();
	//End Slide 1 animations
	
	} else if ( currentSlide === 2 ) {
	// Slide 2 animations
	avocado_slide2();
	//End Slide 2 animations
	
	} else if ( currentSlide === 3 ) {
	// Slide 3 animations
	avocado_slide3();
	//End Slide 3 animations
	}
	
}


$("#avocado_btn1").click(function() {
	TweenLite.to(avocado_filmstrip_container, 1, {css:{top:-600}, delay:0});
	currentSlide = 1;
	avocado_slide1();
});
$("#avocado_btn2").click(function() {
	TweenLite.to(avocado_filmstrip_container, 1, {css:{top:-600}, delay:0});
	currentSlide = 2;
	avocado_slide2();
});
$("#avocado_btn3").click(function() {
	TweenLite.to(avocado_filmstrip_container, 1, {css:{top:-600}, delay:0});
	currentSlide = 3;
	avocado_slide3();
});
$("#avocado_btn4").click(function() {
	TweenLite.to(avocado_filmstrip_container, 1, {css:{top:-600}, delay:0});
	currentSlide = 4;
	avocado_slide4();
});

$("#avocado_email1").click(function() {
	trackMe('http://adsremote.scrippsnetworks.com/image.ng/site=FOOD&adtype=TRACKING&TRACKING=FOOD_14MAY01_AFM_300X600_WEDGEEMAIL_1X1&adsize=1x1&PagePos=1');
	TweenLite.to(avocado_recipe1_email, .5,  {css:{top:940}, delay:0});	
});
$("#avocado_email2").click(function() {
	trackMe('http://adsremote.scrippsnetworks.com/image.ng/site=FOOD&adtype=TRACKING&TRACKING=FOOD_14MAY01_AFM_300X600_SPOONEMAIL_1X1&adsize=1x1&PagePos=1');
	TweenLite.to(avocado_recipe2_email, .5,  {css:{top:940}, delay:0});	
});

$("#avocado_email3").click(function() {
	trackMe('http://adsremote.scrippsnetworks.com/image.ng/site=FOOD&adtype=TRACKING&TRACKING=FOOD_14MAY01_AFM_300X600_SLIDERSEMAIL_1X1&adsize=1x1&PagePos=1');
	TweenLite.to(avocado_recipe3_email, .5,  {css:{top:940}, delay:0});	
});

$("#avocado_email4").click(function() {
	trackMe('http://adsremote.scrippsnetworks.com/image.ng/site=FOOD&adtype=TRACKING&TRACKING=FOOD_14MAY01_AFM_300X600_GUACEMAIL_1X1&adsize=1x1&PagePos=1');
	TweenLite.to(avocado_recipe4_email, .5,  {css:{top:940}, delay:0});	
});

$("#avocado_recipe1_header_txt").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=9823983&PluID=0&ord=$random$")
});
$("#avocado_recipe2_header_txt").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=9823982&PluID=0&ord=$random$")
});
$("#avocado_recipe3_header_txt").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=9823981&PluID=0&ord=$random$")
});
$("#avocado_recipe4_header_txt").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=9823984&PluID=0&ord=$random$")
});


$("#avocado_recipe4_image").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=9823984&PluID=0&ord=$random$")
});
$("#avocado_recipe3_image").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=9823981&PluID=0&ord=$random$")
});
$("#avocado_recipe2_image").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=9823982&PluID=0&ord=$random$")
});
$("#avocado_recipe1_image").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=9823983&PluID=0&ord=$random$")
});


//classic
$("#avocado_print4").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://adsremote.scrippsnetworks.com/event.ng/Type=click&FlightID=&AdID=&TargetID=&Values=2103988&Redirect=http:%2f%2fwww.theamazingavocado.com/recipes/basic-mexican-guacamole/?print=1")
});

//sliders
$("#avocado_print3").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://adsremote.scrippsnetworks.com/event.ng/Type=click&FlightID=&AdID=&TargetID=&Values=2103989&Redirect=http:%2f%2fwww.theamazingavocado.com/recipes/bbq-chicken-sliders-with-avocado/?print=1")
});

//spoon
$("#avocado_print2").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://adsremote.scrippsnetworks.com/event.ng/Type=click&FlightID=&AdID=&TargetID=&Values=2103990&Redirect=http:%2f%2fwww.theamazingavocado.com/recipes/avocado-spoon-snack/?print=1")
});

//wedge
$("#avocado_print1").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://adsremote.scrippsnetworks.com/event.ng/Type=click&FlightID=&AdID=&TargetID=&Values=2103991&Redirect=http:%2f%2fwww.theamazingavocado.com/recipes/spicy-avocado-wedge/?print=1")
});

/*//logo
$("#avocado_click").click(function() {
	//alert('cta click');
	$(this).target = "_blank";
	window.open("http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=8843806&PluID=0&ord=$random$")
});
*/



$(".avocado_close").click(function() {
	TweenLite.to(avocado_recipe1_email, .5,  {css:{top:1200}, delay:0});
	TweenLite.to(avocado_recipe2_email, .5,  {css:{top:1200}, delay:0});	
	TweenLite.to(avocado_recipe3_email, .5,  {css:{top:1200}, delay:0});	
	TweenLite.to(avocado_recipe4_email, .5,  {css:{top:1200}, delay:0});		
});


function avocado_slide1(){
	trackMe('http://adsremote.scrippsnetworks.com/image.ng/site=FOOD&adtype=TRACKING&TRACKING=FOOD_14MAY01_AFM_300X600_WEDGE_1X1&adsize=1x1&PagePos=1');
	TweenLite.to(avocado_upNav, .5,  {css:{top:0}, delay:1});
	
	TweenLite.to(avocado_recipe4_header_txt, 1, {css:{autoAlpha:1}, delay:0});
	TweenLite.to(avocado_recipe3_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe2_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe1_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	
	TweenLite.to(avocado_recipe4_image, 1, {css:{autoAlpha:1}, delay:.5});
	TweenLite.to(avocado_recipe3_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe2_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe1_image, .2, {css:{autoAlpha:0}, delay:0});
	
	TweenLite.to(avocado_recipe1_container, 1,  {css:{top:1070}, delay:.5});	
	TweenLite.to(avocado_recipe2_container, .3,  {css:{top:1370}, delay:0});
	TweenLite.to(avocado_recipe3_container, .3,  {css:{top:1370}, delay:0});
	TweenLite.to(avocado_recipe4_container, .3,  {css:{top:1370}, delay:0});
}
function avocado_slide2(){
	trackMe('http://adsremote.scrippsnetworks.com/image.ng/site=FOOD&adtype=TRACKING&TRACKING=FOOD_14MAY01_AFM_300X600_SPOON_1X1&adsize=1x1&PagePos=1');
	TweenLite.to(avocado_upNav, .5,  {css:{top:0}, delay:1});
	
	TweenLite.to(avocado_recipe4_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe3_image, 1, {css:{autoAlpha:1}, delay:.5});
	TweenLite.to(avocado_recipe2_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe1_image, .2, {css:{autoAlpha:0}, delay:0});
	
	TweenLite.to(avocado_recipe4_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe3_header_txt, 1, {css:{autoAlpha:1}, delay:0});
	TweenLite.to(avocado_recipe2_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe1_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	
	TweenLite.to(avocado_recipe1_container, .3,  {css:{top:1370}, delay:0});	
	TweenLite.to(avocado_recipe2_container, 1,  {css:{top:1070}, delay:.5});
	TweenLite.to(avocado_recipe3_container, .3,  {css:{top:1370}, delay:0});
	TweenLite.to(avocado_recipe4_container, .3,  {css:{top:1370}, delay:0});
}
function avocado_slide3(){
	trackMe('http://adsremote.scrippsnetworks.com/image.ng/site=FOOD&adtype=TRACKING&TRACKING=FOOD_14MAY01_AFM_300X600_SLIDERS_1X1&adsize=1x1&PagePos=1');
	TweenLite.to(avocado_upNav, .5,  {css:{top:0}, delay:1});
	
	TweenLite.to(avocado_recipe4_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe3_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe2_image, 1, {css:{autoAlpha:1}, delay:.5});
	TweenLite.to(avocado_recipe1_image, .2, {css:{autoAlpha:0}, delay:0});
	
	TweenLite.to(avocado_recipe4_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe3_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe2_header_txt, 1, {css:{autoAlpha:1}, delay:0});
	TweenLite.to(avocado_recipe1_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	
	TweenLite.to(avocado_recipe1_container, .3,  {css:{top:1370}, delay:0});	
	TweenLite.to(avocado_recipe2_container, .3,  {css:{top:1370}, delay:0});
	TweenLite.to(avocado_recipe3_container, 1,  {css:{top:1070}, delay:.5});
	TweenLite.to(avocado_recipe4_container, .3,  {css:{top:1370}, delay:0});
}
function avocado_slide4(){
	trackMe('http://adsremote.scrippsnetworks.com/image.ng/site=FOOD&adtype=TRACKING&TRACKING=FOOD_14MAY01_AFM_300X600_GUAC_1X1&adsize=1x1&PagePos=1');
	TweenLite.to(avocado_upNav, .5,  {css:{top:0}, delay:1});
	
	TweenLite.to(avocado_recipe4_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe3_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe2_image, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe1_image, 1, {css:{autoAlpha:1}, delay:.5});
	
	TweenLite.to(avocado_recipe4_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe3_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe2_header_txt, .2, {css:{autoAlpha:0}, delay:0});
	TweenLite.to(avocado_recipe1_header_txt, 1, {css:{autoAlpha:1}, delay:0});
	
	TweenLite.to(avocado_recipe1_container, .3,  {css:{top:1370}, delay:0});	
	TweenLite.to(avocado_recipe2_container, .3,  {css:{top:1370}, delay:0});
	TweenLite.to(avocado_recipe3_container, .3,  {css:{top:1370}, delay:.5});
	TweenLite.to(avocado_recipe4_container, 1,  {css:{top:1070}, delay:.5});
}
