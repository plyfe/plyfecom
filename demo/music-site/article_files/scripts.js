/*
 *	FACT magazine scripts
 *	ver. 0.80
 *	Contents:
 *	[1] jScrollPane - custom scrollers look [EXTERNAL FILE]
 *	[2] Mouse wheel - enables scrolling custom scrolling fields with mouse roller [EXTERNAL FILE]
 *	[3] New Music Slider [EXTERNAL FILE]
 *	[4] FACTmag personal scripts
 *		[4.0] Top Navigation
 *		[4.1] Searchform
 *		[4.2] Content Sub-Navigaiton / Events Navigation
 *		[4.3] Slider
 *			[4.3.1] Slider - clicker option
 *			[4.3.2] Slider - animated sliding option
 *				[3.3.2.1] Slider - animated sliding option: helpers
 *		[4.4] Gallery
 *			[4.4.1] Gallery - clicker option
 *			[4.4.2] Gallery - fader option
 *		[4.5] FACT tv - tabs
 *		[4.6] Lists - accordion
 *		[4.7] Article Switcher
 *		[4.8] Dialog Boxes / Forms
 *		[4.9] Helpers
 *	[5] Parsley
 *
 *	Last modified: 08 August 2012 10:57:30
 *	Author: The Vinyl Factory Ltd
 */
 
// [4] FACTmag personal scripts

$(document).ready(function(){
	
	/*googletag.cmd.push(function() {
    	googletag.pubads().refresh();
	});*/
	
	// Settings
	window.___gcfg = { lang: 'en-US', size: 'medium' };
	//set_social_icons();
	set_article_comments();
	set_lists();
	
	// article page
	if(is_article_comments()){
		set_article_left_column();
		set_article_breadcrumb();
		$('#article-breadcrumb').removeClass('hidden');
	}		
	
	// Gutters Offset (the top margin for sliding)
	var gutter_offset = 170;
	
	// Domain (with trailing slash)
	var domain = 'http://www.factmag.com/';
	
	// Offset for post list
	var offset = 5;
	
	// Offset multiplier for posts preloads 
	var pageNumber = 1;

	// Parsley Setup
	var parsley_apikey = "factmag.com";
	var parsley_secret = "7bphpu59nabEenfqDl2hMnvOxrNFQ0pW9u0zhw5yc2w";
	
	// Load styles setup
	$('a[rel]').removeAttr('rel');
	
	$('#gallery-content-wrapper > ul > li:first').siblings().removeClass('selected').addClass('hidden');
	$('#gallery-subcontent-wrapper > ul > li:first').removeClass('left-gap').addClass('selected');
	$('#gallery-subcontent-wrapper > ul > li:eq(3)').removeClass('left-gap');
	
	$('.dotted-list > li:last-child').removeClass('bottom-dotted-border');
	$('#header-nav-wrapper').removeClass('ui-tabs-hide');
	
	// News section custom scroll pane
	$('#news-other-container').jScrollPane();
	$("#features-scrollable").jScrollPane();
	
	// New Music custom slider initialization
	$('#slides').slides({preload: true,preloadImage: 'http://c3437691.r91.cf0.rackcdn.com/ajax-loader.gif',play: 5000,pause: 2500,hoverPause: true,
		animationStart: function(current){$('.caption').animate({bottom:-35},100);},
		animationComplete: function(current){$('.caption').animate({bottom:0},200);},
		slidesLoaded: function() {$('.caption').animate({bottom:0},200);}
	});		
	
	// Used for the skin advertisements - requires optimization
	if(is_on_page('#left-gutter')){
		var gutter_width = (($(document).width()-1007)/2-20);
		$('#left-gutter').css({'width': gutter_width + 'px', 'left': 0});
		$('#right-gutter').css({'width': gutter_width + 'px', 'left': gutter_width+1047});
		$('#left-gutter-wrapper').css({'width': gutter_width + 'px', 'left': 0});
		$('#right-gutter-wrapper').css({'width': gutter_width + 'px', 'left': gutter_width+1047});
		
		if($(document).scrollTop() > gutter_offset){ 
		    $('#left-gutter').css('top', '0px');
			$('#right-gutter').css('top', '0px');
			$('#left-gutter-wrapper').css('top', '0px');
			$('#right-gutter-wrapper').css('top', '0px');
		}
		 
		// repositioning the player to the top
		$(window).scroll(function(){
			if($(document).scrollTop() < gutter_offset){ 
				$('body').css('backgroundPosition', 'center ' + (gutter_offset-$(document).scrollTop()) + 'px');
				$('#left-gutter').css('top', gutter_offset-$(document).scrollTop()+'px');
				$('#right-gutter').css('top', gutter_offset-$(document).scrollTop()+'px');
				$('#left-gutter-wrapper').css('top', gutter_offset-$(document).scrollTop()+'px');
				$('#right-gutter-wrapper').css('top', gutter_offset-$(document).scrollTop()+'px');
			} else {
				$('body').css('backgroundPosition', 'center 0px');
				$('#left-gutter').css('top', '0px');
				$('#right-gutter').css('top', '0px');
				$('#left-gutter-wrapper').css('top', '0px');
				$('#right-gutter-wrapper').css('top', '0px');
			}
		});

	}
	
	// Fix for the images in the posts
	// set_post_big_images();
	
	// DISABLED IN VER 0.71
	// [4.0] Top Navigation
	
	// Positioning the arrow in the menu
	/*$("#header-nav-canvas").tabs({
		event: "mouseover",
		select: function(event, ui) {
			 w='#header-nav-submenu-wrapper';a='header-nav-submenu-arrow-';d='dark';
			 switch(ui.index){
			 	case 0: $(w).removeClass().addClass(a+'1 '+d); break;
			 	case 1: $(w).removeClass().addClass(a+'2 '+d); break; 
			 	case 2: $(w).removeClass().addClass(a+'3 '+d); break;
			 	case 3: $(w).removeClass().addClass(a+'4 '+d); break; 
			 	case 4: $(w).removeClass().addClass(a+'5 '+d); break;
			 }
		}
	});*/
		
	// [4.1] Searchform
	
	$('#s').focus(function() {
  		if($(this).val() == 'Search')
  			$(this).val(''); 
	});
	
	// [4.2] Content Sub-Navigaiton / Events Navigation
	
	$('#events-heading a').click(function(){
		highlight_selection($(this));
		display_tab('div.' + get_elem_text('#events-heading a.selected span') + '.events');
	});
	
	$('#popular-heading a').click(function(){
		highlight_selection($(this));

		if(get_elem_text($(this)) == 'latest'){
			$('#popular-sub-heading').slideUp(500, 'swing');
			$('.popular-arrows').slideDown(500, 'swing');
		} else if(get_elem_text($(this)) == 'ad'){ 
			$('#popular-sub-heading').slideUp(500, 'swing');
			$('.popular-arrows').slideUp(500, 'swing');
		} else { 
			$('#popular-sub-heading').slideDown(500, 'swing');
			$('.popular-arrows').slideUp(500, 'swing');
		}
			// ONLY if you want the first subtab to be displayed each time the main tab is clicked
			//$('#popular-sub-heading a:first').addClass('selected');
			//$('#popular-sub-heading a:first').siblings().removeClass('selected');
		
		filterTabContent(); // filter and display the correct tab
	});
	
	$('#popular-sub-heading a').click(function(){
		highlight_selection($(this));
		filterTabContent();	
	});
	
	function filterTabContent()
	{
		var main_filter = get_elem_text('#popular-heading a.selected');
		var sub_filter = get_elem_text('#popular-sub-heading a.selected');

		if(main_filter == 'latest' || main_filter == 'ad'){
			display_tab('div.' + main_filter);
			//make_invisible('div.' + main_filter); make_visible('div.' + main_filter);
		} else {
			display_tab('div.' + main_filter + '.' + sub_filter);
			//make_invisible('div.' + main_filter + '.' + sub_filter); make_visible('div.' + main_filter + '.' + sub_filter);			
		}
	}
	
	function display_tab(elem)
	{
		$(elem).siblings().stop().animate({opacity: 0},{duration: 'fast',easing: 'linear', complete: 
		function() {$(elem).siblings().removeClass('selected-hidden').addClass('hidden');$(elem).addClass('selected-hidden').removeClass('hidden');}});
		$(elem).stop().animate({opacity: 1},{duration: 'slow', easing: 'linear'});
	}
	
	// [4.3] Slider
	
	// [4.3.1] Slider - clicker option
	
	/*$('#slider-control-arrows > a:first').click(function(e){	
		if($('#slider-content > li.selected').prev().val() == 0) {
			$('#slider-content > li.selected').prev().addClass('selected').removeClass('hidden');	
			$('#slider-content > li.selected').next().removeClass('selected').addClass('hidden');
		} else {
			$('#slider-content > li:last').addClass('selected').removeClass('hidden');	
			$('#slider-content > li:first').removeClass('selected').addClass('hidden');
		}
		e.preventDefault();	
	});
	
	$('#slider-control-arrows > a:last').click(function(e){	
		if($('#slider-content > li.selected').next().val() == 0) {
			$('#slider-content > li.selected').next().addClass('selected').removeClass('hidden');
			$('#slider-content > li.selected').prev().removeClass('selected').addClass('hidden');
		} else {
			$('#slider-content > li:first').addClass('selected').removeClass('hidden');
			$('#slider-content > li:last').removeClass('selected').addClass('hidden');
		}
		e.preventDefault();	
	});*/

	// [4.3.2] Slider - animated sliding option
	
	// Automatic sliding
	var slider_auto = setInterval(slide_next, 15000);
	
	$('.slider-control-arrows > a.previous').click(function(e){
		clearInterval(slider_auto);	
		slide_previous();
		e.preventDefault();	
	});
	
	$('.slider-control-arrows > a.next').click(function(e){
		clearInterval(slider_auto);	
		slide_next();
		e.preventDefault();	
	});
	
	// [4.3.2.1] Slider - animated sliding option: helpers
	
	function slide_next() {
		if($('#slider-content > li.current').next().val() == 0){
			$('#slider-content > li.current').removeClass('current').next().addClass('current');
			slide_content('-', get_slider_width());
		} else {
			$('#slider-content > li.current').removeClass('current');
			$('#slider-content > li:first').addClass('current');
			slide_content('+', (get_slides_number()-1) * get_slider_width());	// can be automatic - number of slides-1 * width of the slider
		}
	}
	
	function slide_previous() {
		if($('#slider-content > li.current').prev().val() == 0) {
			$('#slider-content > li.current').removeClass('current').prev().addClass('current');
			slide_content('+', get_slider_width());
		} else {
		 	$('#slider-content > li.current').removeClass('current');
			$('#slider-content > li:last').addClass('current');
			slide_content('-', (get_slides_number()-1) * get_slider_width());
		}
	}
	
	function slide_content(leftSign, leftOffset) {
		$('.slider-caption-wrapper').fadeOut();
		var siblingNode = true;
		$('#slider-content').animate({left: leftSign+'='+leftOffset+'px'}, 2000, 'easeInOutExpo', function() {
					$('.slider-caption-wrapper').fadeIn();
		});
	}
	
	function get_slider_width(){
		return $('.slider-dimensions').width();
	}
	
	function get_slides_number(){
		return parseInt($('#slider-content').children().length);
	}
	
	// [4.4] Gallery
	
	// [4.4.1] Gallery - clicker option
	
	$('#gallery-subcontent-wrapper > ul > li > img').click(function(){
		$('#gallery-content-wrapper > ul > li#' + $(this).attr('id') +'-big').siblings().addClass('hidden').removeClass('selected');
		$('#gallery-content-wrapper > ul > li#' + $(this).attr('id') +'-big').addClass('selected').removeClass('hidden');
		$(this).parent().siblings().removeClass('selected');$(this).parent().addClass('selected');
	});
	
	// [4.4.2] Gallery - fader option
	
	/*$('#gallery-subcontent-wrapper > ul > li > img').hover(function(){
		$('#gallery-content-wrapper > ul > li#' + $(this).attr('id') +'-big').siblings().fadeOut('slow', 'easeInOutExpo').addClass('hidden').removeClass('selected');
		$('#gallery-content-wrapper > ul > li#' + $(this).attr('id') +'-big').fadeIn('slow', 'easeInOutExpo').addClass('selected').removeClass('hidden');
		$(this).parent().siblings().removeClass('selected');$(this).parent().addClass('selected');
		console.log('Height: ' + $('#gallery-content-wrapper > ul > li.selected').height());
	});*/
	
	// [4.5] FACT tv - tabs
	
	//$("#fact-tv-container").tabs();
	$(".ui-tabs-nav").mouseleave(function(){
		$('.ui-tabs-nav > li.ui-state-hover').removeClass('ui-state-hover');
	});
	
	$(".ui-tabs-nav > li").hover(function(){
		$(this).siblings().removeClass('ui-state-hover');
		$(this).addClass('ui-state-hover');
	});
	
	$(".ui-tabs-nav > li > a").click(function(e){
		$(this).parent().siblings().removeClass('ui-tabs-selected ui-state-active');
		$(this).parent().addClass('ui-tabs-selected ui-state-active');
		$('#'+$(this).attr('id')+'-content').addClass('display-block').removeClass('hidden');
		$('#'+$(this).attr('id')+'-content').siblings().removeClass('display-block').addClass('hidden');
		e.preventDefault();
	});
	
	
	// [4.6] Lists - accordion [NEED OPTIMIZATION!]
	activeItem = $("#lists-accordion li.nav:first");
    $(activeItem).addClass('active');
 
    $("#lists-accordion li.nav").click(function(){
        $(activeItem).animate({width: "50px"}, {duration:300, queue:false});
        $(this).animate({width: "582px"}, {duration:300, queue:false});
        activeItem = this;
        var accordion = $(this).attr('id');
       	if(accordion == 'first-accordion' && $('#'+ accordion + ' > img:first').attr('src') == 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/20bestB.png'){
       		$('#'+ accordion + ' > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/20bestR.png');
       		$('#second-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/endofyearB.png');
       		$('#third-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/theessentialb.png');
       	} else {
       		$('#first-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/20bestB.png');
       	}
       	
       	if(accordion == 'second-accordion' && $('#'+ accordion + ' > img:first').attr('src') == 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/endofyearB.png'){
       		$('#'+ accordion + ' > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/endofyearR.png');
       		$('#first-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/20bestB.png');
       		$('#third-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/theessentialb.png');
       	} else {
       		$('#second-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/endofyearB.png');
       	}
       	
       	if(accordion == 'third-accordion' && $('#'+ accordion + ' > img:first').attr('src') == 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/theessentialb.png'){
       		$('#'+ accordion + ' > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/theessentialr.png');
       		$('#first-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/20bestB.png');
       		$('#second-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/endofyearB.png');
       	} else {
       		$('#third-accordion > img:first').attr('src', 'http://762fc3f02c0991a1071d-02b50a03a46934f0ed8c2ffde0c6e044.r48.cf1.rackcdn.com/theessentialb.png');
       	}
        	
    });
   
	
	// [4.7] Article Switcher
	
	// When Back/Forward Buttons are pressed [NOT IMPLEMENTED YET]
	window.onpopstate = function(event) {
		//$("#loading").show();
		//console.log("pathname: http://www.thevfhosting.com.php53-26.dfw1-2.websitetestlink.com" + location.pathname);
	};
	
	isRunning = false;				// to check if ajax is running
	isPreloadRunning = false;
	preloadCounter = 0;
	set_navigation_arrows();		// to set navigation arrows in the beginning
	
	// keyboard events
	$(window).keydown(function(e) {
   		if(e.keyCode==37)
   			set_previous();
  		else if(e.keyCode==39)
  			set_next();
   	});
   	
   	// mouse events
   	$('#popular-content > .latest > ul > li >ul > li > a').live('click', function(e){
   		if(is_article_comments()) {
   			var post_id =$(this).attr('id').split('-');
   			set_article(post_id[1]);
   			load_posts_list();
			e.preventDefault();
		}
	});
	
	$('img#next-article').live('click', function() {
   		set_next();
   	});
   	
   	$('img#previous-article').live('click', function() {
   		set_previous();
   	});
   	
   	$('#next-post-list').click(function() {
   		if(is_next_list_page()) {
   			animate_next_list_page();
   			get_list_page_selection().next().addClass('selected-temp');
			set_list_page();
			load_posts_list();
			animate_list_page_height();
   		}
   		
   	});
   	
   	$('#previous-post-list').click(function(){
   		if(is_prev_list_page()) {
   			animate_previous_list_page();
   			get_list_page_selection().prev().addClass('selected-temp');
			set_list_page();
			load_posts_list();
			animate_list_page_height();
   		}
   	});
   	
   	// [4.8] Dialog Boxes / Forms
		
	// Tip News Form
   	$('#tip-news').click(function(e){
   		$("#tip-news-container").dialog({
			height: 340, width: 480,
			modal: true, position: ['center', 130],
			title: "<span class=heading light-gray>tip&nbsp;news</span>",
			resizable: false, show: "fade", hide: "fade",
			create: function(event, ui) {
				$(this).parent().attr('id', 'tip-news-form');
				$('#tip-news-form').wrap('<div class="form-container"></div>');
			}
		});
		$('#tip-news-container').removeClass('hidden');
		e.preventDefault();
   	});
   	
   	// Newsletter Signup Form
   	$('#newsletter-signup').click(function(e){
   		$("#newsletter-signup-container").dialog({
			height: 620, 
			width: 480,
			modal: true, 
			position: ['center', 40],
			title: "<span class=heading light-gray>sign&nbsp;up&nbsp;to&nbsp;our&nbsp;newsletter</span>",
			resizable: false, show: "fade", hide: "fade",
			create: function(event, ui) {
				$(this).parent().attr('id', 'newsletter-signup-form');
				$('#newsletter-signup-form').wrap('<div class="form-container"></div>');	
			}
		});
		$('#newsletter-signup-container').removeClass('hidden');
		e.preventDefault();
   	});

   	// [4.9] Helpers
	
	// Article switcher
   	function highlight_selection(elem) {
		$(elem).siblings().removeClass('selected');$(elem).addClass('selected');
	} 
	
	// Use: to highlight the article selection in the sidebar (view)
	function highlight_article_selection(article) {		
		if(typeof(article)=='boolean' && article) {
			if(get_article_selection().parent().next().children().html() != null){
				get_article_selection().parent().next().children().addClass('selected-temp');
			} else if(is_next_list_page()) {
				animate_next_list_page();
				get_list_page_selection().next().addClass('selected-temp');
				set_list_page();
				$('#popular-content > .latest > ul > li.selected > ul > li:first > a').addClass('selected-temp');
			}	
		} else if(typeof(article)=='boolean' && !article) {    			
   			if(get_article_selection().parent().prev().children().html() != null){
   				get_article_selection().parent().prev().children().addClass('selected-temp');
			} else if(is_prev_list_page()) {
				animate_previous_list_page();
				get_list_page_selection().prev().addClass('selected-temp');
				set_list_page();
				$('#popular-content > .latest > ul > li.selected > ul > li:last > a').addClass('selected-temp');
			}
		} else if(typeof(article)=='string') {
			$('#popular-content > .latest > ul > li > ul > li > a#latest-'+parseInt(article)).addClass('selected-temp');
		}
		
		get_article_selection().removeClass('selected');
   		$('#popular-content > .latest > ul > li > ul > li > a.selected-temp').addClass('selected').removeClass('selected-temp');
   		   		
	}
	
	function set_article_assets() {
		set_article_title();				// change article title
   		set_article_url(1);					// change article url
   		set_article_contents();				// change article contents
   		set_article_breadcrumb();			// change article breadcrumb
	}
	
	function set_article_url(int) {
		if(!isNaN(int)) {
			if(int == 1) {
				window.history.pushState("post", "", get_article_selection().attr('href')); 
				_gaq.push(['_trackPageview', get_article_selection().attr('href').slice(domain.length-1,get_article_selection().attr('href').length)]);
			
				var url = this.href,
            	urlref = location.href;
        		PARSELY.beacon.trackPageView({
            		url: url,
            		urlref: urlref,
            		js: 1,
            		action_name: "Next"
        		});
			
			} else {
				window.history.pushState("post", "", get_article_selection().attr('href')+int+'/'); 
				_gaq.push(['_trackPageview', get_article_selection().attr('href')+int+'/']);
				
				var url = this.href,
            	urlref = location.href;
        		PARSELY.beacon.trackPageView({
            		url: url,
            		urlref: urlref,
            		js: 1,
            		action_name: "Next"
        		});
        		
			}
			$('#column-main-left > h2:first > a').attr('href', get_article_selection().attr('href'));
		}
	}
	
	function set_article_title() {
		document.title = get_article_selection().attr('title') + ' - FACT Magazine: Music News, New Music.';
	}
	
	function set_article_contents() {
  		if($('#articles-preload').find('div#article-' + get_article_id()).length == 0)	{
  			var url = domain + 'stream-post/';
  			$('#column-main-left').html('<center><img src="http://c3437691.r91.cf0.rackcdn.com/ajax-loader.gif" alt="loading article"></center>').load(url, {id:get_article_id()}, function(){
  				set_article_left_column();
  				set_article_comments();
  				set_social_icons();
  				set_lists();
  			});
  		} else {
  			$('#cml-column-right').html(get_preload_article_field('#content').html());
  			set_article_left_column();
  			
  			set_elem_text('#column-main-left > h2:first > a', get_preload_article_field('#title').text());
  			set_elem_text('.page-num-total', get_preload_article_field('#numpages').text());
  			set_elem_text('.page-num', '1');
  			set_article_elem_text('article-rating', get_preload_article_field('#rating').html(), 'rating');
  			set_article_elem_text('article-eventdate', get_preload_article_field('#eventdate').html(), 'eventdate');
  			set_article_elem_text('article-wordsby', get_preload_article_field('#wordsby').text(), 'wordsby');
  			//set_elem_text('span#article-wordsby', get_preload_article_field('#wordsby').text());
  			set_article_elem_text('article-photoby', get_preload_article_field('#photoby').text(), 'photoby');
  			//set_elem_text('span#article-photoby', get_preload_article_field('#photoby').text());
  			set_article_elem_text('article-excerpt', get_preload_article_field('#excerpt').text(), 'excerpt');
  			//set_elem_text('span#article-excerpt', get_preload_article_field('#excerpt').text());
  			
  			set_page_no_content(1);
  			set_article_comments();
  			set_social_icons();
  			set_lists();
  		}
	}
	
	function set_article_breadcrumb() {
		var category = get_elem_text(get_article_selection_contents('first'));
		var title = get_elem_text(get_article_selection_contents('last'));
		if(title.length >= 50)
			title = title.substr(0, 50) + '...';

		$('#article-breadcrumb').html('<a href="http://www.factmag.com/">Home</a><img class="left-gap right-gap bottom-minor-gap" alt="right arrow" src="http://c3437691.r91.cf0.rackcdn.com/breadcrumb-arrow-psd.png"><a href="http://www.factmag.com/category/' + category.toLowerCase().replace(/ /g,'') +'">' + category + '</a><img class="left-gap right-gap bottom-minor-gap" alt="right arrow" src="http://c3437691.r91.cf0.rackcdn.com/breadcrumb-arrow-psd.png"><a href="' + get_article_selection().attr('href') + '">' + title + '</a>');
	}
	
	function set_next() {
		if(!is_post_paginated()) {
   			set_article(true);
   		} else {
   			if(get_page_no()!=get_pages_total()) 
   				set_article_subpage(true);
   			else
   				set_article(true);
   		}
   		load_posts_list();
   		//set_preload();
   		animate_list_page_height();
	}
	
	function set_previous() {
		if(!is_post_paginated() && !is_first_post_first_list_page()) {
   			set_article(false);
   		} else {
   			if(get_page_no()!=1) 
   				set_article_subpage(false);
   			else if(!is_first_post_first_list_page())
   				set_article(false);
   		}
   		load_posts_list();
   		//set_preload();
   		animate_list_page_height();
	}
	
	function set_article(article) {
		highlight_article_selection(article);		
   		set_article_assets();
   		set_ads();
   		set_scrollTop();
	}
	 
	function set_article_subpage(bool) {
		if(bool)
			set_page_no(get_page_no()+1);
		else
			set_page_no(get_page_no()-1);
   		
   		set_page_no_content(get_page_no());
   		set_article_left_column();
   		set_article_url(get_page_no());
   		set_ads();
   		set_scrollTop();
	}
	
	function get_article_selection() {
		return $('#popular-content > .latest > ul > li > ul > li > a.selected');
	}
	
	function get_article_selection_index() {
		return get_article_selection().parent().index();
	}
	
	function get_article_selection_contents(elem) {
		return $('#popular-content > .latest > ul > li > ul > li > a.selected > div:last > span:' + elem);
	}
	
	function get_article_id() {
		var post_id = get_article_selection().attr('id').split('-');
		return post_id[1];
	}
	
	function get_next_article_id() {
		var post_id;
		if(get_article_selection().parent().next().children().html() != null)
			post_id = get_article_selection().parent().next().children('.height-full').attr('id').split('-');
		else 
			post_id = get_article_selection().parent().parent().parent().next().find('li:first > a').attr('id').split('-');
			
		return post_id[1];
	}
	
	function get_prev_article_id() {
		var post_id;
		if(get_article_selection().parent().prev().children().html() != null)
			post_id = get_article_selection().parent().prev().children('.height-full').attr('id').split('-');
		else 
			post_id = get_article_selection().parent().parent().parent().prev().find('li:last > a').attr('id').split('-');
			
		return post_id[1];
	}
	
	function get_list_page_selection() {
		return $('#popular-content > .latest > ul > li.selected');
	}
	
	function get_list_page_selection_index() {
		return get_list_page_selection().index();
	}
	
	var last_known_height = 0;
	function get_list_height() {
		var height = 0;
		$('ul#latest-wrapper > li.selected > ul > li').each(function(){
			height += $(this).height();
		});
		last_known_height = height;
		return height;
	}
	
	function get_list_page_last_index() {
		return $('#popular-content > .latest > ul > li:last').index();
	}
	
	function get_preload_article_field(elem) {
		return $('#articles-preload').find('div#article-' + get_article_id() + ' > ' + elem + '-' + get_article_id());
	}
	
	function animate_next_list_page() {
		get_list_page_selection().prevAll().animate({marginLeft:'-=300px'}, 1000, 'swing');
		get_list_page_selection().animate({marginLeft:'-=300px'}, 1000, 'swing');
	}
	
	function animate_previous_list_page() {
		get_list_page_selection().prevAll().animate({marginLeft:'+=300px'}, 1000, 'swing');
	}
	
	function animate_list_page_height() {
		if(parseInt($('#popular-content > .latest').css('height')) != get_list_height() && get_list_height() != 0) 
			$('#popular-content > div.latest-news').animate({height:get_list_height() +'px'}, 100, 'swing');
		else 
			$('#popular-content > div.latest-news').animate({height:last_known_height +'px'}, 100, 'swing');
	}
	
	function set_list_page() {
		get_list_page_selection().removeClass('selected');
   		$('#popular-content > .latest > ul > li.selected-temp').addClass('selected').removeClass('selected-temp');
   		set_navigation_arrows();
	}
	
	function is_next_list_page() {
		if(get_list_page_selection().next().html()!=null)
			return true;
		else
			return false;
	}
	
	function is_prev_list_page() {
		if(get_list_page_selection().prev().html()!=null)
			return true;
		else
			return false;
	}
	
	function is_post_paginated() {
		if(get_pages_total() == 1)
   			return false;
   		else 
  			return true;
	}
	
	function is_first_post() {
		if(get_article_selection_index() == 0)
			return true;
		else
			return false;
	}
	
	function is_first_post_first_list_page() {
		 if(is_first_post() && get_article_selection().parent().parent().parent().index() == 0)
		 	return true;
		 else	
		 	return false;
	}
	
	function get_pages_total() {
		return parseInt(get_elem_text('#column-main-left > div:first > div.img-links-container > span.page-num-total'));
	}
	
	function get_page_no() {
		return parseInt(get_elem_text('#column-main-left > div:first > div.img-links-container > span.page-num'));
	}
	
	function set_page_no(int) {
		$('#column-main-left > div:first > div.img-links-container > span.page-num').text(int);
		$('span.page-num').text(int);
	}
	
	function set_page_no_content(int) {
		$('.page-'+int).siblings().addClass('hidden').removeClass('selected');
		$('.page-'+int).removeClass('hidden').addClass('selected');
	}
	
	function set_navigation_arrows() {
		set_previous_arrow();
		set_next_arrow();
		//set_preload();
	}
	
	function set_previous_arrow() {
		if(!is_prev_list_page())
			$('#previous-post-list').addClass('deactivated');
		else
			$('#previous-post-list').removeClass('deactivated');
	}
	
	function set_next_arrow() {
		if(!is_next_list_page())
			$('#next-post-list').addClass('deactivated');
		else
			$('#next-post-list').removeClass('deactivated');
	}
	
	function get_elem_text(elem) {
		return $(elem).text();
	}
	
	function set_elem_text(elem, text) {
		$(elem).text(text);
	}
	
	function set_article_elem_text(elem, contents, text) {
		$('#cml-column-left > ul > li#' + elem + '-container').remove();
		if(text == 'wordsby' && get_preload_article_field('#' + text).text().length > 0){
			$('#cml-column-left > ul > li:last').before('<li id="' + elem + '-container" class="top-padding-gap bottom-padding-gap bottom-solid-border clearfix"><h5 class="heading">words by</h5><span id="' + elem + '" class="facit dark-gray">' + contents + '</span></li>');
		}else if(text == 'photoby' && get_preload_article_field('#' + text).text().length > 0){
			$('#cml-column-left > ul > li:last').before('<li id="' + elem + '-container" class="top-padding-gap bottom-padding-gap bottom-solid-border clearfix"><h5 class="heading">photographed by</h5><span id="' + elem + '" class="facit dark-gray">' + contents + '</span></li>');
		} else if(text == 'excerpt' && get_preload_article_field('#' + text).text().length > 25) {
			$('#cml-column-left > ul > li:first').before('<li id="' + elem + '-container" class="top-padding-gap bottom-padding-gap bottom-solid-border facit light-crimson">' + contents + '</li>');
		} else if(text != 'excerpt' && get_preload_article_field('#' + text).html().length != 0) {
			$('#cml-column-left > ul > li:last').before('<li id="' + elem + '-container" class="top-padding-gap bottom-padding-gap bottom-solid-border clearfix"><h5 class="heading">' + text + '</h5><span id="' + elem + '" class="facit dark-gray">' + contents + '</span></li>');
		}
	}
	
	function set_post_big_images() {
		$('#cml-column-right img').each(function(){
		var width = $(this).width();
		if(width > 460)
			$(this).addClass('left-img');
		});
	}
	
	function load_posts_list() {
		if(!is_next_list_page() && !isRunning){
   			get_posts_list();
   			set_list_container_width();
   		}
	}
	
	function get_posts_list() {
		isRunning = true;
		$.ajax({
	       url: domain + "stream",	                            
	       type:'POST',
	       dataType: 'json',
	       data: { offset: offset*parseInt(get_list_page_last_index()+1) },
	       success:function(results) {
	       		if(results != 'null') {
	       			var list = '';
	       			list += '<li class="display-inline left">';
	       			list += '<ul class="solid-list sub-heading">';
	       			$.each(results, function(){
	       				list += '<li class="bottom-solid-border">';
	       				list += "<a href='" + this.permalink + "' id=latest-" + this.ID + " class='padding-gap clearfix column-280 height-full' title='" + this.title + "'>";
	       				list += '<div class="left right-gap clearfix"><img src=' + this.thumbnail + ' alt=' + htmlentities(this.title) + '"></div>';
	       				list += '<div class="right clearfix column-190">';
	       				list += '<span class="heading bold">' + this.category + '</span><br />';
	       				list += '<span class="chappral">' + this.title + '</span></div>';
	       				list += '</a></li>';
	       			});
	       			list += '</ul>';
	       			list += '</li>';
	       			$('#latest-wrapper').append(list);
	       			set_navigation_arrows();
	       		} 
	       		isRunning = false;
	       }
	    });
	}
	
	function get_preload_posts() {
		isPreloadRunning = true;
		var first_id = $('#popular-content > .latest > ul > li:first > ul > li:first > a').attr('id').split('-');
		$.ajax({
	       url: domain + "preload-post",	                            
	       type:'POST',
	       dataType: 'html',
	       data: { page: pageNumber, firstid: first_id[1] },
	       success:function(results) { 
	       		$('#articles-preload').append(results);
	       		pageNumber++;
	       		isPreloadRunning = false;
	       }
	    });
	}
	
	function set_list_container_width() {
		$('#latest-wrapper').css('width', parseInt($('#latest-wrapper').css('width'))+300+'px');
	}
	
	function is_article_comments() {
		if($('#disqus_thread').length > 0)
			return true;
		else
			return false;
	}
	
	function set_article_comments() {
		if(is_article_comments()){
			var disqus_shortname = 'factmagazine';
    		var disqus_identifier = get_article_id() + " http://www.factmag.com/?p=" + get_article_id();  
    		var disqus_container_id = 'disqus_thread';
    		var disqus_domain = 'disqus.com';
    		var disqus_title = get_article_selection().attr('title');
    	
    		unset_script('http://factmagazine.disqus.com/embed.js');
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        	dsq.src = 'http://'+disqus_shortname+'.disqus.com/embed.js';
        	document.getElementsByTagName('head')[0].appendChild(dsq);
        }

	}
	
	function set_social_icons() {
		// reload twitter button
		$('#tweeter-button').attr('src', 'https://platform.twitter.com/widgets/tweet_button.html?url=' + get_article_selection().attr('href'));
		
		// reload facebook 'like' button
		var fb_url = get_article_selection().attr('href');
		$( '#fb-button' ).html('<fb:like href="'+fb_url+'" send="false" layout="button_count" width="80" show_faces="true" />');
        if (typeof FB  != "undefined"){
        	FB.XFBML.parse(document.getElementById('#fb-button'));} 
		
		// reload google plus
		unset_script('https://apis.google.com/js/plusone.js');
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	}
	
	function unset_script(elem) {
		var scripts = document.getElementsByTagName('script');
        for(var i=0;i<scripts.length;i++){
        	if(scripts[i].src == elem)
        		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).removeChild(scripts[i]);
        }
	}
	
	function set_ads() {
		//console.log('fired: ' + slot1);
		googletag.pubads().refresh();
		
		/*//window.frames["ad-mpu-frame-2"].location.reload();
		//window.frames["ad-mpu-frame-3"].location.reload();
		
		if(is_on_page('#ad-mpu-frame-1'))
			window.frames["ad-mpu-frame-1"].location.reload();
			
		if(is_on_page('#ad-supermpu-frame-1'))
			window.frames["ad-supermpu-frame-1"].location.reload();
			
		if(is_on_page('#ad-billboard-frame-1'))
			window.frames["ad-billboard-frame-1"].location.reload();
			
		if(is_on_page('#ad-billboard-frame-2'))
			window.frames["ad-billboard-frame-2"].location.reload();
		
		window.frames["ad-leaderboard-frame-1"].location.reload();
		window.frames["ad-leaderboard-frame-2"].location.reload();*/
	}
	
	
	function set_lists() {
		$('.solid-list > li:last-child').removeClass('bottom-solid-border');
	}
	
	function is_on_page(elem) {
		if($(elem).length > 0)
			return true;
		else
			return false;
	}
	
	/*function set_preload() {
		set_preload_counter();
		set_preload_content();
	}
	
	function set_preload_content() {
		if(preloadCounter == 10 && !isPreloadRunning) {
			//get_preload_posts();
			preloadCounter = 0;
		}
	}
	
	function set_preload_counter() {
		if(preloadCounter != 10)
			preloadCounter++;
		else
			preloadCounter = 0;
	}*/
	
	function htmlentities(elem) {
    	if(elem) 
    	   return $('<div />').html(elem).text();
    	else
        	return '';
	}
	
	// THE ARTICLE SWITCHER ADD-ONS
	function set_article_nav_arrows(bool){
		if(bool) {
			$('#previous-article').addClass('display-block').removeClass('hidden');
			$('.page-num-total').addClass('display-block').removeClass('hidden');
			$('.page-num-divider').addClass('display-block').removeClass('hidden');
			$('.page-num').addClass('display-block').removeClass('hidden');
		} else {
			$('#previous-article').addClass('hidden').removeClass('display-block');
			$('.page-num-total').addClass('hidden').removeClass('display-block');
			$('.page-num-divider').addClass('hidden').removeClass('display-block');
			$('.page-num').addClass('hidden').removeClass('display-block');
		}
			
	}
	
	// other pages
	if(!is_article_comments()){
		//set_next();
		load_posts_list();
	}
	
	function get_first_element(elem) {
		return $('#cml-column-right > div.selected > p:first').find(elem + ':first');
	}
	
	function set_article_left_column() {
		if(get_first_element('img').width() > 500){
			get_first_element('img').addClass('post-first-img');
			$('#cml-column-left').css('marginTop', get_first_element('img').height()+28 + 'px');
		} else if(get_first_element('iframe').width() > 500) {
			get_first_element('iframe').addClass('post-first-video');
			$('#cml-column-left').css('marginTop', get_first_element('iframe').height()+28 + 'px');
		} else {
			get_first_element('img').removeClass('post-first-img');
			$('#cml-column-left').css('marginTop', '0px');
		}
	}
	
	function set_scrollTop() {
		//$('html, body').animate({scrollTop: 0}, 1, 'linear');
		$(document).scrollTop($(".top-scroll").offset().top);
	}
	
	// [5.0] Parsley plugin

	function parsley_load_tabs_contents(){
	
		// let's reload half-page just in case - delayed
		if(is_on_page('#ad-supermpu-frame-1')) {
			setTimeout(function(){window.frames["ad-supermpu-frame-1"].location.reload();console.log('Reloaded');}, 2000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "popular", "contents-popular-today", "today");},3000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "popular", "contents-popular-week", "week");},4000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "popular", "contents-popular-month", "month");},5000);
		
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "commented", "contents-commented-today", "today");}, 6000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "commented", "contents-commented-week", "week");}, 7000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "commented", "contents-commented-month", "month");}, 8000);
		} else {
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "popular", "contents-popular-today", "today");},2000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "popular", "contents-popular-week", "week");},3000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "popular", "contents-popular-month", "month");},4000);
		
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "commented", "contents-commented-today", "today");}, 5000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "commented", "contents-commented-week", "week");}, 6000);
			setTimeout(function(){parsley_load_posts(parsley_apikey, parsley_secret, 9, "commented", "contents-commented-month", "month");}, 7000);
	
		}
		
		
	}

	function parsley_load_posts(parsley_apikey, parsley_secret, limit, type, container, days) {
		
		var protocol = document.location.protocol == "file:" ? "http:" : document.location.protocol;
    	var apiURL = "api.parsely.com/v2";
    	var url = protocol + "//" + apiURL;

		var limit = limit || 5;
    	var type = type || "popular";
    	
    	// dates 
    	var date = new Date();
    	var today_date = new Date();
    	
    	switch (days){
    		case "today": date.setDate(date.getDate() - 1); break;
    		case "week": date.setDate(date.getDate() - 7); break;
    		case "month": date.setDate(date.getDate() - 30); break;
		}
		
    	var period_start = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    	var period_end = today_date.getFullYear() + "-" + (today_date.getMonth()+1) + "-" + today_date.getDate();
  		
    	if (type == "popular")
        	url = url + "/analytics/posts?period_start=" + period_start + "&period_end=" + period_end + "&limit=" + (limit + 1);
    	else if(type == "commented")
        	url = url + "/shares/posts?pub_date_start=" + period_start + "&pub_date_end=" + period_end + "&limit=" + limit;
	
	 	
		function onData(data) { 
        	var posts = data['data'];
        	
        	for (var i=0; i< posts.length; i++) {
   				if(posts[i].url != 'http://www.factmag.com'){
					$("#"+container).append("<li class='bottom-solid-border'>"
						+ "<a href=" + posts[i].url + " id=latest-" + posts[i]._hits + " class='display-block padding-gap clearfix column-280 height-full'>"
						+ "<div class='left right-gap clearfix'>"
						+ "<img src='" + posts[i].thumb_url_medium + "' alt='" + posts[i].title + "' class='popular-img'>"
						+ "</div><div class='right clearfix column-190'><span class='heading bold'>"+ posts[i].section +"</span><br /><span class='chappral'>"+ posts[i].title +"</span></div></a> </li>");
   				}
   			}
       	}  
		 
		parsley_load_json(url, parsley_apikey, parsley_secret, onData);
		
	} 

	// Wrapper function 
	function parsley_load_json(url, apikey, secret, callback) 
	{
			
    	var jsonpcallback = "parselyCallback" + new Date().getMilliseconds();
    	window[jsonpcallback] = function(response){
        	callback(response);
    	} 
    		 
    	url += "&apikey=" + apikey + "&secret=" + secret + "&callback=" + jsonpcallback;

    	var script = document.createElement("script");
    	script.setAttribute("src", url)
    	console.log('URL: ' + url);
    	document.body.appendChild(script);
	}
	
	// Load Parsley
	parsley_load_tabs_contents();
		
});