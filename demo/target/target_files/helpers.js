/*
 * @Target.ca Helpers
 * @Helper methods for reusability through all of target.ca
 * @author paul.placido@target.com, alessandro.miralles@target.com, stuart.milsten@target.com
 */

TargetCA.helpers = {
	init: function() {
		this.fitSetup();
		TargetCA.interactions.maintainBoxHeight();
		TargetCA.spotlights.init();
	},
	// retrieve parameter data from URL
	getUriVars: function() {
		var vars = {}, // array to be populated with parameter data
			parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, // the string which will be split into discrete variables
			// splits the parts variable into separate variables, using ? and & delimiteres
			function(m,key,value) {
				vars[key] = value;
			});
		return vars;
	},
	// parse location from URL
	getUriLocation: function() {
		var id = document.URL.replace(/^.*\/(.*)$/, "$1").split("?")[0]; // the URL minus the parameters
		return id;	
	},
	// parse hash from URL
	getHash : function() {
		var hash = window.location.hash; // the contents of the URL hash
		hash = hash.slice( 1, hash.length );
		return hash;
	},
	checkCADomain: function(domain) {
		if((domain == "http://www.target.ca")||(domain == "")) {
			return true;
		} else {
			return false;
		}
	},
	// toggles content visibility based on the hash data
	checkStoreHash : function( hashName ) {
		if (hashName == "store-members-careers") {
			$("#storeCareers").addClass("hide");
			$("#storeCareers").removeClass('active-tab');
			$("#storeMembersCareers").removeClass("hide");
			$("#storeMembersCareers").addClass('active-tab');
		} else {
			$("#storeCareers").removeClass("hide");
			$("#storeCareers").addClass('active-tab');
			$("#storeMembersCareers").addClass("hide");
			$("#storeMembersCareers").removeClass('active-tab');
		}
	},
	hashUpdate : function(){
		if ( ( "onhashchange" in window ) && !( $.browser.msie ) ) {
			$( window ).bind( "hashchange", function () {
				TargetCA.interactions.checkVideoHash();
			});
		} else {
			var previousHash = window.location.hash;
			setInterval( function(){
				if( window.location.hash != previousHash ){
					previousHash = window.location.hash;
					TargetCA.interactions.checkVideoHash();
				}
			}, 150);
		}
	},
	// input French and English text, and return the appropriate language based on the user's language selection
	translation:function(french,english) {
		// helper function to handle translation logic
		if (culture == 'fr') {
			return french;
		} else {
			return english;
		}
	},
	// passes data into the fitText() function
	fitSetup:function() {
		//text fits
		this.fitText(".electric .cat-hero-headline2", .55, 35, 175);
		this.fitText(".beauty .cat-hero-headline2", .5, 65, 175);
		this.fitText(".essentials .cat-hero-headline2", .5, 40, 175);
		this.fitText(".home .cat-hero-headline2", .5, 35, 175);
		this.fitText(".toys .cat-hero-headline2", .46);
		this.fitText(".apparel .cat-hero-headline2", .5, 35, 175);
		this.fitText(".fr .apparel .cat-hero-headline2", .5, 35, 100);
		//this.fitText(".explore .cat-hero-headline2", .5, 35, 175);
		this.fitText(".hp--hero-line.l1", .34, 53, 170);
		this.fitText(".hp--hero-line.l2", .45, 40, 126);
		this.fitText(".hp--hero-intro", 2.15, 10, 18);

				 	
		var babyHeroBlurb_en = $("body.en .category.baby #hero .blurb");	 	
		var babyHeroBlurb_fr = $("body.fr .category.baby #hero .blurb");	 	
		//linear equation to scale baby headline font to 62px within @480px container and 152px w/in @930px container	 	
		this.fitText(babyHeroBlurb_en, (-.000256*babyHeroBlurb_en.width()+1.01), 62, 152);	 	
		 	
		//linear equation to scale baby headline font to 45px within @4296px container and 95px w/in @930px container	 	
		this.fitText(babyHeroBlurb_fr, (-.000256*babyHeroBlurb_fr.width()+1.09), 50, 152);


		if ($('body').hasClass('fr') ) {
			this.fitText(".grocery .cat-hero-headline2", .5, 35);
			this.fitText(".baby .cat-hero-headline2", .56, 35, 175);
			this.fitText(".personal .cat-hero-headline2", .55, 35, 175);
		} else {
			this.fitText(".grocery .cat-hero-headline2", .4, 35);
			this.fitText(".baby .cat-hero-headline2", .5, 35, 175);
			this.fitText(".personal .cat-hero-headline2", .5, 35, 175);
		}
	},
	// adjusts hero font sizes to fit in the alloted space
	fitText:function(objClass,compress,minFont,maxFont) {
		var compressor = compress, // the multiplier for the font size
			obj = $(objClass), // the DOM object to be adjusted
			settings = $.extend({ // min/max font sizes for the object
				'minFontSize' : Number.NEGATIVE_INFINITY,
				'maxFontSize' : Number.POSITIVE_INFINITY
			}, { minFontSize: minFont, maxFontSize: maxFont});
		obj.css(
			'font-size', 
			Math.max(Math.min(obj.width() / (compressor*10), 
				parseFloat(settings.maxFontSize)), 
				parseFloat(settings.minFontSize)
			)
		);
	},
	supports: function(prop) {
		var div = document.createElement('div'),
		vendors = 'Khtml Ms O Moz Webkit'.split(' '),
		len = vendors.length;
		
		if ( prop in div.style ) return true;
		
		prop = prop.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
		
		while(len--) {
			if ( vendors[len] + prop in div.style ) {
				return true;
			} 
		}
	
		return false;
	},
	// handles the window resize event by triggering various resize functions
	resizeHandler: function() {
		this.fitSetup();
        TargetCA.navigation.resizing();
        TargetCA.spotlights.resizing();
        TargetCA.interactions.maintainBoxHeight();
	}
}