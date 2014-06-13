/*jslint devel: false, browser: true, maxerr: 50, indent: 4, white: true*/
/*global alert: false, clsExtensions: false, $: false, jQuery: false, console: false, clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*!
 *	SI Newsletter Overlays
 *	Author: mstills
 *		Class to handle all newsletter signup overlays on SI.com sites
 */
(function () {
	'use strict';

	// define available newsletters here
	var newsletters = {
			'siextra': {
				'label': 'SI\'s latest news',					// set overlay descriptor label
				'home': 'http://sportsillustrated.cnn.com',		// URL to this newsletter's (default) home
				'formSource': 'siextra_overlay',				// identify the newsletter sign-up source for Sailthru API tracking
				'submitImage': 'http://i.cdn.turner.com/si/blogs/assets/global/img/newsletter/siextra/overlay-submit.png',
				'defaultSite': /sportsillustrated\.cnn\.com/,		// set the default site for this newsletter
				'autoTriggerEvery': 7,							// set how often in days that this overlay will auto-trigger on its home site
				'hostname': 'sportsillustrated.cnn.com'
			},
			'extramustard': {
				'label': 'Extra Mustard',
				'home': 'http://extramustard.si.com',
				'formSource': 'extramustard_overlay',
				'submitImage': 'http://i.cdn.turner.com/si/blogs/assets/extramustard/img/newsletter/overlay-submit.png',
				'defaultSite': /extramustard\.si\.com/,
				'autoTriggerEvery': 7,
				'hostname': 'extramustard.si.com'
			},
			'swimdaily': {
				'label': 'Swim Daily',
				'home': 'http://swimdaily.si.com',
				'formSource': 'swimdaily_overlay',
				'submitImage': 'http://i.cdn.turner.com/si/blogs/assets/swim/img/newsletter/overlay-submit.png',
				'defaultSite': /swimdaily\.si\.com/,
				'autoTriggerEvery': 7,
				'hostname': 'swimdaily.si.com'
			}
			//'mmqb': {
			//	'label': 'The MMQB',
			//	'home': 'http://mmqb.si.com',
			//	'formSource': 'mmqb_overlay',
			//	'submitImage': 'http://i.cdn.turner.com/si/blogs/assets/swim/img/newsletter/overlay-submit.png',
			//	'defaultSite': /mmqb\.si\.com/,
			//	'autoTriggerEvery': 7
			//}
		},
		// de facto default, better one will get picked based on document.location during init()
		defaultNewsletter = 'siextra',
		cookieId = 'nlsuDontTrigger',		// this 1st cookie tracks visits	
		signupCookieId = 'nlsuSignedUp',	// this 2nd cookie tracks sign-ups, and prevents ad flight .open() from ever running
		error;

	error = function (msg) {
		if (typeof console !== 'object' || typeof console.error !== 'function') {
			return; // fail silently
		}

		console.error('SI Newsletter Overlays: ' + msg);
	};

	function SINewsletter() {
		var init, error, setCookie, setListeners, openOverlay, closeOverlay, renderOverlay,
			newsletterIds = [], urlParams = {}, activeOverlay = false, checkShouldTrigger, $overlay;

		init = function () {
			var $target = $('body');

			// gather URL parameters (?nlsu=1 forces the auto-trigger regardless of cookie state)
			(function () {
				var match,
					pl		= /\+/g,  // regex for replacing addition symbol with a space
					search	= /([^&=]+)=?([^&]*)/g,
					decode	= function (s) { return decodeURIComponent(s.replace(pl, " ")); },
					query	= window.location.search.substring(1);

			    while (match = search.exec(query)) {
					urlParams[decode(match[1])] = decode(match[2]);
				}
			}());

			// gather all newsletter IDs into an array to assist rendering and locate a default based on the current site
			(function () {
				var site = window.location.hostname;

				$.each(newsletters, function (key, val) {
					newsletterIds.push(key);

					if (site.match(val.defaultSite)) {
						defaultNewsletter = key;
					}
				});
			}());

			$overlay = $('<div/>', {
				'id': 'si-newsletter-overlay-wrapper',
				'style': 'display: none;'
			});

			// attach overlay wrapper to DOM and set listeners, it will be fleshed out by .open() method when/if called
			$target.append($overlay);

			// trigger signal to any interested 3rd party scripts (ie. ads) that .open() is safe to call
			jQuery(document).trigger('siNewsletter:overlayRendered');

			// ad-trigger takes precedence over auto-trigger, auto-trigger takes precedence over cookie
			setTimeout(function () {
				checkShouldTrigger();
			}, 50); // give ad-trigger a moment to act first
		};

		closeOverlay = function () {
			$overlay.hide();
		};

		setListeners = function () {
			var $submit = $('#si-newsletter-overlay-submit'),
				$input = $('#si-newsletter-overlay-input');

			// clicking 'X' button closes overlay
			$('#si-newsletter-overlay-close').bind('click', function (event) {
				closeOverlay();
			});

			// ESC key closes overlay
			$(document).bind('keyup', function (event) {
				if (event.keyCode === 27) { 
					closeOverlay();
				}
			});

			// clear and replace the placeholder text on blur/focus
			$input.bind('focus', function (event) {
				$(this).attr('placeholder', '');
			});

			$input.bind('blur', function (event) {
				// replace the placeholder text if the input is left empty on blur
				if ($(this).val() === '') {
					$(this).attr('placeholder', 'YOUR EMAIL ADDRESS HERE');
				}
			});
			
			// validate and submit
			$submit.unbind();
			$submit.bind('click', function (event) {
				var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; // a simple regex pattern for validating e-mails

				event.preventDefault();

				// validate the form input
				if (!$input.val().match(pattern)) {
					// shut it down
					alert('Please enter a valid email address.');
				} else {
					// if everything looks good, submit the form and set a cookie to ensure that this user never gets an 
					// auto-trigger overlay (ads or otherwise)
					setCookie(signupCookieId, 365 * 10);
					closeOverlay();
					$('#si-newsletter-overlay-form').submit();
				}
			});
		};

		openOverlay = function (newsletter, overrideCookies) {
			newsletter = (typeof newsletter === 'undefined' || !newsletter) ? defaultNewsletter : newsletter;
			overrideCookies = overrideCookies || false;

			if (overrideCookies !== true && $.cookie(signupCookieId) === 'true') {
				// check for the signed up cookie and prevent opening of the overlay if it is set
				return false;
			}

			if (activeOverlay === newsletter && $overlay.is(':visible')) {
				return; // requested overlay is already open
			} else if ($overlay.is(':visible')) {
				$overlay.hide();	// hide overlay briefly while we re-render it
			} 

			if (activeOverlay !== newsletter) {
				renderOverlay(newsletter);
			}

			activeOverlay = newsletter;
			$overlay.show();
		};

		renderOverlay = function (newsletter) {
			var $target = $('body'),
				newsletterMeta = newsletters[newsletter],
				mu = '',
				blurbText, folder, source, makeButtons, sourcePrefix;

			// pick out two buttons for whatever overlay we're not showing
			makeButtons = function () {
				var nids = newsletterIds.slice(0),	// copy the array so we can mess with it
					idx = $.inArray(newsletter, nids),
					retVal = '',
					limit = 2, i;

				nids.splice(idx, 1);

				for (i = 0; i < nids.length; i += 1) {
					if (i >= limit) {
						return;
					}
					retVal += '<a href="' + newsletters[nids[i]].home + '/?nlsu=1' + '" target="_blank"><div class="button-' + nids[i] + '"></div></a>'; 
				}

				return retVal;
			};

			mu += '<div class="si-newsletter-overlay ' + newsletter + '">'
				+	'<div class="heading"></div>'
				+	'<div class="blurb"><h2>Get ' + newsletterMeta.label + ',</h2><h3>features, and more info delivered daily</h3></div>'
				+	'<form id="si-newsletter-overlay-form" name="newsletter-overlay" action="http://www.si-apps.com/newsletter/multireceiver.php" method="post" target="_blank">'
				+	'<input type="hidden" name="source" value="' + newsletterMeta.formSource + '">'
				+	'<input type="hidden" name="newsletter" value="' + newsletter + '">'
				+	'<input id="si-newsletter-overlay-input" class="email" name="email" maxlength="150" placeholder="YOUR EMAIL ADDRESS HERE" />'
				+	'<div class="clear"></div>'
				+	'<input id="si-newsletter-overlay-submit" class="signup" name="signup" type="image" src="' + newsletterMeta.submitImage + '" value="SIGN UP" />'
				+	'</form>'
				+	'<div id="si-newsletter-overlay-close" class="close"></div>'
				+	'<div class="button-row">'
				+	'<div class="sign-up">Sign up for</div>'
				+	makeButtons()
				+	'</div>'
				+ '</div>';

			$overlay.html(mu);

			// if this is the first time rendering an overlay, set listeners now
			setListeners();
		};

		checkShouldTrigger = function () {
			var target, checkSection, 
				locale = window.location.hostname,
				foundLocale = false;

			// check if this locale (active site) has a specific newsletter associated with it or not
			$.each(newsletters, function (id, newsletterData) {
				//if (typeof newsletterData.defaultSite !== 'undefined' && locale.match(newsletterData.defaultSite)) {
				if (typeof newsletterData.hostname !== 'undefined' && newsletterData.hostname == locale) {
					foundLocale = true;
					return false; // break;
				}
			});

			// if current locale doesn't match any newsletter defaults, disable auto-triggering by exiting this method early
			if (!foundLocale) {
				return false; // bail!
			}

			if (typeof $.cookie !== 'function') {
				error('jQuery $.cookie plugin is required.');
				return false;
			}

			if (typeof urlParams.nlsu !== 'undefined' && parseInt(urlParams.nlsu, 10) === 1) {
				// auto trigger
				target = (typeof urlParams.nlid === 'string') ? urlParams.nlid : target;
				openOverlay(target, true); // override any cookies that might be set, ?nlsu=1 forces the overlay no matter what
			} else {
				return false;
			}

			// @NOTICE @WARNING @TODO - 3/15/13 we were requested to disable the auto-triggering across SI network -mstills
			// to re-enable the auto-trigger, uncomment this line:

			// else if ($.cookie(cookieId) !== 'true') {
			// 	checkSection = window.location.pathname.split('/');

			// 	// check if this is an SI section front and if so, do not auto-trigger
			// 	if (defaultNewsletter === 'siextra' && checkSection.length <= 4) {
			// 		return;
			// 	}

			// 	// no '1st visit' cookie set, openOverlay() will check for 'form submitted' cookie before triggering
			// 	setCookie();
			// 	openOverlay();
			// }
		};

		setCookie = function (cid, expireAfter) {
			cid = cid || cookieId;
			expireAfter = expireAfter || newsletters[defaultNewsletter].autoTriggerEvery;

			if (typeof $.cookie !== 'function') {
				error('jQuery $.cookie plugin is required.');
				return false;
			}

			$.cookie(cid, true, { 
				'path': '/',
				'expires': expireAfter
			});
		};

		// auto-init this class
		try {
			init();
		} catch (e) {}

		return {
			'open': openOverlay,
			'close': closeOverlay,
			'getActive': function () {
				return activeOverlay;
			},
			'getDefault': function () {
				return defaultNewsletter;
			}
		};
	}

	$(document).ready(function () {
		window.siNewsletter = new SINewsletter();
	});
}());