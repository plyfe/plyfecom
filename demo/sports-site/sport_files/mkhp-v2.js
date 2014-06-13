/**
 *	Homepage Header Button Swapper
 *		Provides a random button to the SI.com global heading that is one of these three
 *		options (each option fires an accompanying overlay on-click):
 *			- Make SI My Homepage
 *			- Bookmark SI
 *			- SI Extra newsletter (moved, @see: http://docs/display/SI/SI.com+Newsletter+Overlays)
 *
 *	originally authored by dfowler
 *	refactored by mstills (SI-6635 - 4/8/13) 
 */
(function ($) {
	'use strict';

	var browser, version, os, osVersion, selectedFeature, $overlay, $wrapper, rendered,
		// array of our options for the random test
		// don't forget to add cases to 'images.buttons' when adding here
		testOptions = ['homepage', 'bookmark', 'newsletter'],
		// array of browsers that we support for this functionality
		browsers = [
			{
				identity: 'chrome',
				subString: 'Chrome',
				search: navigator.userAgent
			},
			{
				identity: 'safari',
				subString: 'Safari',
				search: navigator.vendor
			},
			{
				identity: 'firefox',
				subString: 'Firefox',
				search: navigator.userAgent
			},
			{
				identity: 'explorer',
				subString: 'MSIE',
				search: navigator.userAgent
			}
		],
		// array of operating systems that we support for this functionality
		operatingSystems = [
			{
				identity: 'windows',
				subString: 'Win',
				search: navigator.platform
			},
			{
				identity: 'ipad',
				subString: 'iPad',
				search: navigator.platform
			},
			{
				identity: 'mac',
				subString: 'Mac',
				search: navigator.platform
			}
		],
		// images for the various homepage & boomark instruction overlays
		images = {
			homepage: {
				windows: {
					chrome: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/win_chrome.jpg',
					firefox: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/win_firefox.jpg',
					explorer: {
						'5.1': 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/winxp_ie.jpg',
						'6.1': 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/win7_ie.jpg'
					}
				},
				mac: {
					chrome: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/mac_chrome.jpg',
					safari: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/mac_safari.jpg',
					firefox: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/mac_firefox.jpg'
				}
			},
			bookmark: {
				windows: {
					chrome: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bkm_win_chrome.jpg',
					firefox: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bkm_win_firefox.jpg',
					explorer: {
						'5.1': 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bkm_winxp_ie.jpg',
						'6.1': 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bkm_win7_ie.jpg'
					}
				},
				mac: {
					chrome: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bkm_mac_chrome.jpg',
					safari: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bkm_mac_safari.jpg',
					firefox: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bkm_mac_firefox.jpg'
				}
			},
			buttons: {
				homepage: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/mkhp-btn.png',
				newsletter: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/si_newsletter.png',
				bookmark: 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bookmark_si.png'
			}
		},
		init, openOverlay, showOverlay, hideOverlay, fireOmniture;

	init = function () {
		var i,
			rand,
			$buttonImg = $('#make_hp'),
			$buttonA = $('#make_hplnk');

		rendered = false;

		// detect browser (by way of user-agent sniffing)
		browser = (function () {
			var browserDefault = 'explorer';

			for (i = 0; i < browsers.length; i += 1) {
				if (typeof browsers[i].search !== 'undefined' && 
					typeof browsers[i].subString !== 'undefined' && 
					browsers[i].search.indexOf(browsers[i].subString) !== -1) {

					return browsers[i].identity;
				}
			}

			// default to our most common browser - internet explorer
			return browserDefault;
		}());

		// detect OS
		os = (function () {
			for (i = 0; i < operatingSystems.length; i += 1) {
				if (operatingSystems[i].search.indexOf(operatingSystems[i].subString) !== -1) {
					return operatingSystems[i].identity;
				}
			}

			// default to our most common OS - windows
			return 'windows';
		}());

		// detect version (win 7 vs win xp) if windows
		if (os === 'windows') {
			version = (navigator.userAgent.indexOf('Windows NT 5.1') !== -1) ? '5.1' : '6.1';
		}

		// choose (pseudo-randomly) a test from the options array
		rand = Math.floor(Math.random() * testOptions.length);	// pulls a random index from our array of test options
		selectedFeature = testOptions[rand];
		selectedFeature = 'homepage'; // hardcode to homepage for now

		// setup the button based on the selected feature
		switch (selectedFeature) {
			case 'bookmark':
				$buttonA.attr('href', 'http://ad.doubleclick.net/clk;267566716;78785520;b?');
				break;
			case 'newsletter':
				$buttonA.attr('href', 'http://ad.doubleclick.net/clk;268294959;78785520;j?');
				break;
			case 'homepage':
				$buttonA.attr('href', 'http://ad.doubleclick.net/clk;268294631;78785520;w?');
				break;
		}

		$buttonImg.attr('src', images.buttons[selectedFeature]);

		// set click listener to trigger the appropriate feature overlay
		$buttonA.click(function (event) {
			openOverlay();
			event.preventDefault();
		});

		// set ESC key listener that closes overlay
		$(document).bind('keyup', function (event) {
			if ($wrapper.is(':visible') && event.keyCode === 27) { 
				hideOverlay();
			}
		});

		// attach a placeholder SPAN to the DOM that we'll use to house the overlay later
		$wrapper = $('<div id="mkhp_wrapper" style="display: none;"><div id="mkhp_popup"></div></div>');
		$('body').prepend($wrapper);
		$overlay = $('#mkhp_popup');
	};

	openOverlay = function (feature) {
		var mu = '',
			omniAction = 'top nav - si ',
			imgSrc;

		// allow the feature to be overridden by caller
		feature = feature || selectedFeature;

		// if the overlay is already open, this method will act as a toggle (legacy)
		if ($overlay.is(':visible')) {
			hideOverlay();
			return;
		} else if (rendered === true) {
			showOverlay();
			return true;
		}

		// generate the markup for the requested overlay
		switch (feature) {
			case 'homepage':
				if (os === 'ipad') {
					imgSrc = 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/ipad.jpg';
				} else if (typeof images.homepage[os] !== 'undefined' &&
						   typeof images.homepage[os][browser] !== 'undefined') {

					imgSrc = images.homepage[os][browser];
				} else {
					imgSrc = 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/default.jpg';
				}

				omniAction += 'homepage';

				break;
			case 'bookmark':
				if (typeof images.bookmark[os] !== 'undefined' &&
					typeof images.bookmark[os][browser] !== 'undefined') {

					if (browser === 'explorer' && 
						typeof version !== 'undefined' &&
						typeof images.bookmark[os][browser][version] !== 'undefined') {

						imgSrc = images.bookmark[os][browser][version];
					} else if (browser === 'explorer') {
						imgSrc = images.bookmark[os][browser]['6.1']; // use Win 7 as default, more likely than XP these days
					} else {
						imgSrc = images.bookmark[os][browser];
					}
				} else {
					imgSrc = 'http://i.cdn.turner.com/si/.element/img/4.2/global/mkhp/bkm_mac_chrome.jpg';
				}

				omniAction += 'bookmark';

				break;
			case 'newsletter':
				// the newsletter overlays are generated by a standalone script now /www/si/.element/js/4.2/global/si-newsletter-overlays.js -mstills
				if (typeof window.siNewsletter !== 'undefined' && typeof window.siNewsletter.open === 'function') {
					// open site-specific overlay (eg. SI.com defaults to 'siextra') and override cookies
					window.siNewsletter.open('', true);
				}

				omniAction += 'newsletter';

				fireOmniture(omniAction);
				return; // bail, newsletter overlay is handled outside of this script
		}

		// craft the guts markup
		mu = '<img src="' + imgSrc + '" />' + 
			 '<a id="mkhp_popup_close" title="Dismiss popup" href="#">' + 
			 '<img src"http://ad.doubleclick.net/ad/3475.si2/home;kw=cnnoverlay;sz=1x1;ord=123456789?" height="1" width="1"/>' + 
			 '</a>';

		// set the CSS class for this particular overlay type in order to align things properly
		$overlay.attr('class', (feature + ' ' + os + ' ' + browser.toLowerCase()));
		$overlay.append(mu);
		rendered = true;

		// set the close button listener here now that the overlay has been added to DOM
		$('#mkhp_popup_close').click(function (e) {
			e.preventDefault();
			hideOverlay();
		});

		// finally, reveal the overlay & fire off omniture metrics call
		showOverlay();
		fireOmniture(omniAction);
	};

	fireOmniture = function (action) {
		action = action || 'top nav - unknown';

		if (typeof trackMetrics !== 'function') {
			return;
		}

		try {
			trackMetrics({ 
				'type': 'livefyre-click', 
				'data': { 
					'action': action 
				} 
			}); 
		} catch (e) {}
	};

	showOverlay = function () {
		$('body').css('overflow', 'hidden');
		$wrapper.show();
	};

	hideOverlay = function () {
		$('body').css('overflow', 'auto');
		$wrapper.hide();
	};

	// init on DOM-ready
	$(document).ready(function () {
		init();
	});

	// support the legacy way of calling the overlay too jic any other scripts depend on it
	window.mkhp = {
		'launch_popup': openOverlay,
		'dismiss_popup': hideOverlay
	};
}(jQuery));