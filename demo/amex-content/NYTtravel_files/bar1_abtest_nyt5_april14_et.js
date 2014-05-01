/*globals window,NYTD,require,document*/
require(['foundation/main'], function () {
	var $ = require('jquery/nyt');

	$(function () {
		//ET tracking
		var adxCampaignName = $(".bar1-abtest-et-params").data("adxCampaignName");

		var runWhenReady = function(testFunction, inFunction, mlsecs, reps) {
			setTimeout(function z() {
				if(testFunction()) { inFunction(); }
				else if(--reps)    { setTimeout(z, mlsecs); }
			}, mlsecs);
		};

		var getCookie = function (name) {
			return new RegExp(name + '=([^;]+)').test(unescape(document.cookie)) ? RegExp.$1 : null;
		};

		var trackET = function(dataObj, config) {
			dataObj = dataObj || {};
			runWhenReady (
				function() { return (window.NYTD && NYTD.EventTracker && NYTD.EventTracker().track); },
				function() {
					NYTD.EventTracker().track(dataObj, config);
				},
				100, 50
			);
		};

		var currentVariation = getCookie("nytnow3p");
		//impressions and hover are for control and variations
		//this will be reused for hover: action: "hover"
		$('#nyt-button-sub').on("mouseenter", function () {
			trackET({
				contentCollection: adxCampaignName,
				subject : "page",
				module : "Ad",
				version: "Bar1HC",
				action: "hover",
				eventName: "adExpansion"
			}, {
				buffer: false
			});
		});

		$('#bar1-3panel').on("mouseenter", ".menu-item", function () {
			var tabId = $(this).attr('id');
			var mapping = {
				"digi": "Core",
				"hd": "HD",
				"nytnow": "NytNow"
			};

			trackET({
				"subject" : "module-interactions",
				"moduleData.module" : "Ad",
				"moduleData.version": "Bar1",
				"moduleData.action": "hover",
				"moduleData.eventName": "ad" + mapping[tabId] + "hover"
			}, {
				buffer: false
			});
		});


		trackET({
			subject: "adx-ab-allocation",
			testName: "Bar1NYTNow_Apr",
			treatment: currentVariation,
			UIDplatform: "ET",
			action: "impression",
			url: location.href,
			referrer: document.referrer || "",
			expId: null,
			module: "Bar1"
		}, {
			buffer: false
		});

	});
});