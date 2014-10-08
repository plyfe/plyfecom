/**
 * 		forbes js module:
 * 			analytics
 *
 *		desc:
 * 			Some helper functions for analytics
 *
 * 		requires:
 * 			(nothing - needs to work on legacy pages)
 */

var forbes = (function( app ) {
  app.analytics = (function() {
    /**
     * _get_var(name, [default = null])
     *  name is a dot notation string such as forbes.page_meta.author.display_name,
     *  if it exists returns the value otherwise returns the default
     */
    function _get_var(name) {
      var namespaces = name.split('.'),
        namespace = window;
      while(true) {
        if("undefined" == typeof namespace[namespaces[0]]) {
          if(arguments.length>1) return arguments[1];
          return null;
        }
        if(namespaces.length > 1) {
          namespace = namespace[namespaces.shift()];
        }
        else {
          return namespace[namespaces[0]];
        }
      }
    }

	function _get_cookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1)
				return c.substring(name.length,c.length);
		}
		return "";
	}

    function Meta() {
      var meta = document.getElementsByTagName('META');
      this.meta = {};
      for(var i=0;i<meta.length;i++) {
        this.meta[meta[i].name] = meta[i].content;
      }
    }
    Meta.prototype.get = function(name) {
      var response = this.meta[name];
      if(undefined === response) return null;
      return response;
    }
    var meta;

    /**
     * _get_meta(name)
     * loads meta tags and returns the value of the named one or null
     */
    function _get_meta(name) {
      if(undefined===meta) meta = new Meta();
      return meta.get(name);
    }

    /* return public-facing methods and/or vars */
    return {
      get_var: _get_var,
      get_meta: _get_meta,
	  get_cookie: _get_cookie
    };
  }());

  return app; /* return augmented app object */
}(forbes || {})); /* import app if exists, or create new */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*************  comScore Start  *****************************/
  var _comscore = _comscore || [];
  _comscore.push({c1: "2", c2: "6872493"});

  (function() {
    var s = document.createElement("script"),
        el = document.getElementsByTagName("script")[0];

    s.async = true;
    s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
el.parentNode.insertBefore(s, el);

  })();
/*************  comScore End  *****************************/

/*************  Google Analytics Start *****************************/

var _gaq = _gaq || [];

(function() {
  _gaq.push(['_setAccount', 'UA-5883199-3']);
  _gaq.push(['_setDomainName', '.forbes.com']);
  var helper = forbes.analytics;

  /* Username of the logged in user */
  var username = helper.get_var('forbes.user_meta.username');
  if(null!==username) {
    _gaq.push(['_setCustomVar', 1, 'Account', username, 3]);
  }

  /* Get the Author */
  var author = helper.get_var('forbes.page_meta.author.display_name');
  if(null === author) {
    author = helper.get_meta('author');
  }
  if(null !== author) {
    _gaq.push(['_setCustomVar', 2, 'Author', author, 3]);
  }

  /* Site Slug */
  var site_slug = helper.get_var('forbes.page_meta.site_slug');
  if( null !== site_slug ) {
    _gaq.push(['_setCustomVar', 3, 'Site', site_slug, 3]);
  }

  /* Get the Channel */
  var channel = helper.get_var('forbes.page_meta.channel');
  if(null === channel) {
    channel = helper.get_var('displayedChannel');
  }

  var section = helper.get_var('forbes.page_meta.section');
  if(null === section) {
    section = helper.get_var('displayedSection');
  }

  if( "forbeswoman" === section ) {
    channel = section;
  }

  if( "markets" == channel || "personalFinance" == channel) {
    channel = "investing";
  }

  if( null !== channel ) {
    _gaq.push(['_setCustomVar', 4, 'Channel', channel, 3]);
  }

  /* special_slot */
  var special_slot = helper.get_var('forbes.page_meta.special_slot');
  if( null === special_slot ) {
    special_slot = helper.get_var('specialslot');
  }
  if( null !== special_slot ) {
    _gaq.push(['_setCustomVar', 5, 'Slot', special_slot,3]);
  }

  // Referrer override
  var referrer = helper.get_var('forbes.page_meta.referrer');
  if( null !== referrer ) {
    _gaq.push(['_setReferrerOverride', referrer]);
  }

  _gaq.push(['_trackPageview']);

  var ga = document.createElement('script');ga.type = 'text/javascript';ga.async = true;
  //ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
  var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga, s);
}());

/*************  Google Analytics End *****************************/

pageURL = this.location.href;

/*************  Chart beat (1st script,2nd script is in footer) ******/
var _sf_startpt=(new Date()).getTime();
/*************  Chart beat (1st script end) *************************/



/************* Google Tag Data Layer *************************/
var	dataLayerFDC = dataLayerFDC || [];

(function (){

	var helper = forbes.analytics;

	/* Get the Author */
	var author = helper.get_var('forbes.page_meta.author.display_name');
	if(null === author) {
		author = helper.get_meta('author');
	}

	/* Site Slug */
	var site = helper.get_var('forbes.page_meta.site_slug');


	/* Get the Channel */
	var channel = helper.get_var('forbes.page_meta.channel');
	if(null === channel) {
		channel = helper.get_var('displayedChannel');
	}

	var section = helper.get_var('forbes.page_meta.section');
	if(null === section) {
		section = helper.get_var('displayedSection');
	}

	if( "forbeswoman" === section ) {
		channel = section;
	}

	if( "markets" == channel || "personalFinance" == channel) {
		channel = "investing";
	}

	/* special_slot */
	var special_slot = helper.get_var('forbes.page_meta.special_slot');
	if( null === special_slot ) {
		special_slot = helper.get_var('specialslot');
	}

	var referrer_url = helper.get_cookie("referrer");
	if(typeof referrer_url == "undefined" ||  null == referrer_url || "" == referrer_url){
		referrer_url = document.referrer;
	}else{
		document.cookie = "referrer=http://www.forbes.com; path=/; domain=.forbes.com; expires=Thu, 01-Jan-1900 00:00:01 GMT";
	}

	dataLayerFDC.push({
			'author': author,
			'site': site,
			'channel': channel,
			'slot': special_slot,
			'referrer' : unescape(referrer_url)
		});
})();
/************* Google Tag DataLayer *************************/

/************* Google Tag Manager *************************/
(function(w,d,s,l,i){
	w[l]=w[l]||[];
	w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'});
	var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),
		dl=l!='dataLayer'?'&l='+l:'';
	j.async=true;
	j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;
	f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayerFDC','GTM-NMQJM4');
/************* End Google Tag Manager *************************/
