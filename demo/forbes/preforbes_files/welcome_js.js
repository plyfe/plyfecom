
	welcome_control = (function(){
	
		var redirect_timeout = null,
			cookie_contents = null,
			social_interval = null;
			
		_init = function() {
		
			cookie_contents = _get_welcome_cookie();
			_bind_events();
			redirect_timeout = setTimeout(_return_site,timer);
			social_interval = setTimeout(_social_poll,100);
		
		}
		
		_get_welcome_cookie = function() {
		
			var ret = {},
				c_names = ['refURL','toURL'];
			
			for(key in c_names) {
			
				var tmp_url = "http://www.forbes.com",
					c_start, c_end;
				
				if (document.cookie.length>0) {
				
					c_start=document.cookie.indexOf(c_names[key] + "=");
					
					if (c_start!=-1) {
					
						c_start=c_start + c_names[key].length+1;
						c_end=document.cookie.indexOf(";",c_start);
						if (c_end==-1) c_end=document.cookie.length;
						
						tmp_url = unescape(document.cookie.substring(c_start,c_end));
							
					}
				}
				ret[c_names[key]] = tmp_url;
			
			}
			
			return ret;

		};
		
		_bind_events = function() {
			
			if(document.addEventListener) {
				document.getElementById("continue_link").addEventListener('click',function(){_gaq.push(['_trackEvent','Welcome','NextClick']);_return_site();});
			} else {
				document.getElementById("continue_link").attachEvent("onclick",function(){_gaq.push(['_trackEvent','Welcome','NextClick']);_return_site();});
			}
		
		};
		
		_return_site = function() {
			
			clearTimeout(redirect_timeout);
			
			if(/(.*)\/sites\/(.*)\/$/.test(cookie_contents['toURL'])===false) {
				document.cookie="toURL"+ "=" +escape(cookie_contents['toUrl'])+";path=/; domain=.forbes.com; expires=Thu, 01-Jan-1900 00:00:01 GMT";
				document.cookie="refURL"+ "=" +escape(cookie_contents['refURL'])+";path=/; domain=.forbes.com; expires=Thu, 01-Jan-1900 00:00:01 GMT";
			}
			
			location.href = cookie_contents['toURL'];
		
		};
		
		_social_poll = function() {
		
			if(document.getElementsByTagName("blockquote").length>0) {
			
				var ie8_mode_uri = false;
				if(document.attachEvent && !document.addEventListener) {
					ie8_mode_uri = 'http://onforb.es/1mGLRCN';
				}

				var share_facebook = function(){
				
					clearTimeout(redirect_timeout);
					
					gigya.socialize.postBookmark({
						provider		:	'facebook',
						url				:	ie8_mode_uri||'http://onforb.es/1l0oaIz',
						shortURLs		:	'never',
						providerKey		:	'123694841080850',
						title			:	'Thought Of The Day',
						description		:	'\''+document.getElementsByTagName("blockquote")[0].getElementsByTagName("p")[0].innerHTML+'\''+
											' - '+document.getElementsByTagName("blockquote")[0].getElementsByTagName("cite")[0].innerHTML+'.'+
											((document.getElementsByTagName("blockquote")[0].getAttribute("data-sponsored-by")!="")?
											(' Sponsored by '+(document.getElementsByTagName("blockquote")[0].getAttribute("data-sponsored-by"))):'')
					});
					
				};
			
				if(document.addEventListener) {
					document.getElementById("share_facebook").addEventListener("click",share_facebook);
				} else {
					document.getElementById("share_facebook").attachEvent("onclick",share_facebook);
				}
				
				var share_twitter = function(){
				
					clearTimeout(redirect_timeout);
					var handle = '', trail = '', message = '';
					
					if(document.getElementsByTagName("blockquote")[0].getAttribute("data-twitter-handle")!="")
						handle = ' w/ '+document.getElementsByTagName("blockquote")[0].getAttribute("data-twitter-handle");
						
					else if(document.getElementsByTagName("blockquote")[0].getAttribute("data-sponsored-by")!="")
						handle = ' w/ '+document.getElementsByTagName("blockquote")[0].getAttribute("data-sponsored-by");
					
					trail = ' - ' + document.getElementsByTagName("blockquote")[0].getElementsByTagName("cite")[0].innerHTML + ' @forbesthoughts' + handle;
					
					message = '\''+document.getElementsByTagName("blockquote")[0].getElementsByTagName("p")[0].innerHTML;
					
					if(message.length+trail.length+24>140) {
						//							   Start at 140 characters. Subract 4 for ..., 24 for url
						message = message.substring(0,(140-4-24-trail.length));
						message = message.substring(0,message.lastIndexOf(" "))+'...\'';
					}
					
					gigya.socialize.postBookmark({
						provider		:	'twitter',
						url				:	ie8_mode_uri||'http://onforb.es/VgtWcY',
						shortURLs		:	'never',
						title			:	message+trail,
					});
					
				};
				
				if(document.addEventListener) {
					document.getElementById("share_twitter").addEventListener("click",share_twitter);
				} else {
					document.getElementById("share_twitter").attachEvent("onclick",share_twitter);
				}
				
				var share_linkedin = function(){
				
					clearTimeout(redirect_timeout);
						
					gigya.socialize.postBookmark({
						provider		:	'linkedin',
						url				:	ie8_mode_uri||'http://onforb.es/1uooZO5',
						shortURLs		:	'never',
						title			:	'Thought Of The Day',
						description		:	'\''+document.getElementsByTagName("blockquote")[0].getElementsByTagName("p")[0].innerHTML+'\''+
											' - '+document.getElementsByTagName("blockquote")[0].getElementsByTagName("cite")[0].innerHTML+'.'+
											((document.getElementsByTagName("blockquote")[0].getAttribute("data-sponsored-by")!="")?
											(' Sponsored by '+(document.getElementsByTagName("blockquote")[0].getAttribute("data-sponsored-by"))):'')
					});
						
				};
				
				if(document.addEventListener) {
					document.getElementById("share_linkedin").addEventListener("click",share_linkedin);
				} else {
					document.getElementById("share_linkedin").attachEvent("onclick",share_linkedin);
				}
				
				var share_google = function(){
				
					clearTimeout(redirect_timeout);
					
					gigya.socialize.postBookmark({
						provider		:	'googleplus',
						url				:	ie8_mode_uri||'http://onforb.es/1rnlgeS',
						shortURLs		:	'never',
						title			:	'Thought Of The Day',
						description		:	'\''+document.getElementsByTagName("blockquote")[0].getElementsByTagName("p")[0].innerHTML+'\''+
											' - '+document.getElementsByTagName("blockquote")[0].getElementsByTagName("cite")[0].innerHTML+'.'+
											((document.getElementsByTagName("blockquote")[0].getAttribute("data-sponsored-by")!="")?
											(' Sponsored by '+(document.getElementsByTagName("blockquote")[0].getAttribute("data-sponsored-by"))):'')
					});
					
				};
				
				if(document.addEventListener) {
					document.getElementById("share_google").addEventListener("click",share_google);
				} else {
					document.getElementById("share_google").attachEvent("onclick",share_google);
				}
			
			} else social_interval = setTimeout(_social_poll,100);
			
		}
		
		return {
			init: _init,
			return_site: _return_site
		};
	
	})();
			
forbes_dart.config({"keyvalues":["id=fdc/welcome"],"site":"fdc.forbes","zone":"welcome"});
