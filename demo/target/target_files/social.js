/**
 * @Target.ca Social
 * @Possibly to be obsolete - Social Media Functionality
 * @author paul.placido@target.com, alessandro.miralles@target.com
 */

//-- Target.ca Social --//
TargetCA.social = {
		
	// initialize the function
	init: function() {
		if($('.category').hasClass('exclusive-line') || $('.category').hasClass('addPopup') ) {
			this.implementation('facebook-jssdk', '//connect.facebook.net/en_US/all.js#xfbml=1'); // calling implementation function with an id, source
			this.implementation('twitter-wjs', '//platform.twitter.com/widgets.js'); // calling implementation function with an id, source
			this.implementation('pinit-jssdk', '//assets.pinterest.com/js/pinit.js'); // calling implementation function with an id, source

			// Fix for ie8 laptop bug - like button popup height
			setTimeout(function(){
				$('.ie8 .fb-like iframe').css({ height: 233 });
			}, 1000);

			/*
			$('body').on('load', '.fb-like iframe', function(){
				//$(this).css({height: 233});
				console.log('HELLO EVERYONE')
				$(this).addClass('test-class');
			})*/
		}
	},
	// implementation function to get the id name and source
	implementation: function(id, src) {
		var d = document; // assinged document keyword
		var s = 'script'; // assigned script keywork
		var js, fjs = d.getElementsByTagName(s)[0]; // get the name of the particular tag
		if (d.getElementById(id))
			return;
		js = d.createElement(s);
		js.id = id;
		js.src = src;
		fjs.parentNode.insertBefore(js, fjs);
	} // end implementation function
} // end social namespace