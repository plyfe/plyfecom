


(function() {

	/**
	 * Global Uverse Namespace
	 */
	window.Uverse = {
		config: {
			entitlement: {}
		}
		, controls: {}
		, utils: {}
		, widgets: {
			epg: {}
			, cards: {}
			, marketing: {}
		}
		, players: {}
		, playerExtensions: {}
		, Enums: {}
		, services: {}
	};

})();

(function() {

	/**
	 * Here is where we put all Uverse.config settings
	 */

		Uverse.config.consoleEnabled = false;

	Uverse.config.buildVersion = "6.5.23.2";
	Uverse.config.scriptPath = "/web_files/NEXTGEN/web_files/nes/js/src/";
	Uverse.config.vendorPath = "/web_files/NEXTGEN/web_files/nes/vendors/";
	Uverse.config.jsLibPath = "/web_files/NEXTGEN/web_files/nes/js/lib/";
	Uverse.config.pageOptions = {
		pageContainerId: 'pageContainer1'
		,modalManagerOptions: {
			modalContainerId: 'modalContainer1'
			,modalShadowId: 'modalShadow1'
		}
		,pageWidthOptions: null
	};
	Uverse.config.cltDomainList = null;
	Uverse.config.cltAppName = null;

	Uverse.config.personalization = {
		urls: {
			saveUserSetting: '/personalisationSetting.json'
		}
	};

	Uverse.config.favorite = {
		urls: {
			save: '/favorites.addItem'
			,remove: '/favorites.removeItem'
		}
	};
	
	Uverse.config.foxOnDemand = {
		url :
				'http://player.foxfdm.com/mvpd/fox/player_att_qa.js'
	};
	
	Uverse.config.liveAjax = {
		initialAmountOfTime: 60
	};
	
	Uverse.config.inHomeApplet = {
		html: "<applet code='com.att.nextgen.inhome.applet.InHomeApplet' id='inHomeApplet'" +
				"archive='/web_files/NEXTGEN/web_files/nes/applet/in-home-plugin-6.4.0_1.jar' width='1' height='1' mayscript>" +
				"<param name='jnlp_href' value='/web_files/NEXTGEN/web_files/nes/applet/in-home-applet-6.4.0_1.jnlp'></param>" +
				"<param name='webappHost' value='" +
				"uverse.com" +
				"'></param>" +
				"<param name='completionCallback' value='setInHomeStatus'></param>" +
				"<param name='probeRetries' value='4'></param>" +
				"<param name='separate_jvm' value='true'></param>" +
				"<param name='codebase_lookup' value='false'></param>" +
				"</applet>"
	};

	Uverse.config.notification = {
		urls: {
			create: '/notification/episode.json'
		}
		, emailResendLink : 'Verify this email address'
		, toast : {
			button : 'Ok'
			, message : 'An email has been sent to the address {0} for verification'
			, timeout: 30
		}
		
	};
	
	Uverse.config.parentalControls = {
		newControls: "true"

		, errors: {
			invalidPIN : 'Please enter a 4-digit PIN'
			, wrongPIN : 'Please enter the current 4-digit PIN'
		}

		, messages: {
			errors: {
				confirmPIN: 'This PIN did not match the one you just created'
				, wrongPIN: 'The PIN you entered is incorrect'	
			}

			, notices: {
				PINUpdated: 'Your new PIN has been saved'
				, levelUpdated: 'Your viewing level has been updated'
				, PINSent: 'Your PIN has been sent to {{email}}'
			}
			
			, levels: {
				noRestriction: 'No restrictions'
				, restrictedTo: 'Restricted to {{ratings}}'
				, lower: '{{message}} and lower'
			}
		}
	};
	
	Uverse.config.parentalControlsPlayerExtension = {
		messages : {
			errors : {
				pinReminderFailure: 'We were unable to email a PIN reminder. Please try again later.'
				, pinVerificationFailure: 'We were unable to verify your PIN. Please try again later.'
			}
		}
	};

	Uverse.config.livePlayerIncompatible = {
		pageUrl: ''
		, osVersions: {
			mac: {major: 10, minor: 7, update: 3 }
			, win: {major: 6, minor: 1 }
		}
		, browserVersions: {
			ie: {major: 9, minor: 0 }
		}
	};
	
	// TODO: move to messages_en:
	Uverse.config.messages = {
		error: {
			generic: '<p>Sorry, there was an error.</p><p>Please try again later.</p>'
			, invalidEmail: '<p>You entered an invalid email address.</p><p>Please try again.</p>'
		}
	};

	Uverse.config.templates = {
		bannersPrefix: 'bannersTemplate-'
	};

	Uverse.config.emailValidation = {
		regex : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	};

	Uverse.config.token = {
		urls: {
			token: '/rest/token/?videoKey={key}' // Currently used by Turner / TokenHandler
			,tokenFoxLive: '{remoteUrl}/rest/token/?videoKey={itemId}'
		}
	};

	Uverse.config.unsupportedBrowsers = {
		
			'MSIE [1-6]\\.': {name: 'Internet Explorer', src: 'unsupported-browser.png', url: '/unsupported-browser'},
			'MSIE 7\\.': {name: 'Internet Explorer 7', src: '', url: '/unsupported-browser', disabledBanner:true},
			'MSIE 8\\.': {name: 'Internet Explorer 8', src: '', url: '/unsupported-browser', disabledBanner:true},
			'Firefox\\/[0-6]\\.': {name: 'firefox', src: 'unsupported-browser.png', url: 'http://getfirefox.com'},
			'iPad': {name: 'iPad', src: 'ipad-banner.png', url: 'http://itunes.apple.com/us/app/at-t-u-verse/id410354613?mt=8#', disabledToast: true},
			'Android': {name: 'Android', src: '', url: '', disabledToast: true},
			'Version\\/4(.*)Safari': {'name': 'Safari 4', src: 'unsupported-browser.png', url: 'http://www.apple.com/safari/'},
		
	};
	
	Uverse.config.unsupportedBrowsersToast = {
		text: 'Uverse.com does not support your browser. Update your browser so all site features work properly.'
		, buttonText: 'Learn More'
		, cookie: 'NEXTGEN_UBW'
	};
	
	Uverse.config.favoriteErrorToast = {
		add: 'Sorry, an error occurred while favoriting this item. Please try again.'
		, remove: 'Sorry, an error occurred while removing this favorite. Please try again.'
		, button: 'Try Again'
	};
	
	Uverse.config.bookmarkErrorToast = {
		add: 'Sorry, an error occurred while bookmarking this item. Please try again.'
		, remove: 'Sorry, an error occurred while removing this bookmark. Please try again.'
		, button: 'Try Again'
	};
	
		Uverse.config.clickTracking = {
			enable: true
			, url : '/report/click_tracking_nes.json'
			, attributeMap : {
				prefix : 'data-clicktrack-'
				, names : {
					category : 'category'
					, subcategory : 'subcategory'
					, action : 'action'
					, label : 'label'
				}
			}
		
			, classNameMap : {
				prefix : 'track-'
				, names : {
					category : 'hasCategory'
					, subcategory : 'hasSubcategory'
					, action : 'hasAction'
					, label : 'hasLabel'
				}
			}
			, startTracking: function(target) {
				var trackingData = new Uverse.utils.ClickTracking.data(target, Uverse.config.clickTracking.attributeMap, Uverse.config.clickTracking.classNameMap);
				new Request({
					url: Uverse.config.clickTracking.url
					, method: 'POST'
					, data: trackingData.getData()
					, onSucess: Uverse.config.clickTracking.started()
					, link: 'chain'
				}).send();
				Uverse.console.log('[ClickTracking]', 'Click tracking data: ', trackingData.getData() );
			}
			, started: function() {
				Uverse.config.clickTracking.canStartTrack = true;
			}
			, canStartTrack: false
		};

	Uverse.config.players = {
		callbacks: {
			cbs: {}
			, mtv: {}
			, osmf: {}
			, extend: {}
			, hbo: {}
			, disney: {}
			, espn: {}
		}
		, versions: {
			osmf: '1.1.1'
		}
		, options: {
			vars: {
				osmfAkamaiPluginUrl: 'http://players.edgesuite.net/flash/plugins/osmf/advanced-streaming-plugin/v3.1/osmf2.0/AkamaiAdvancedStreamingPlugin.swf'
			}
		}
	};
	

	Uverse.config.drawer = {
		headers: {
			recording: {
				'classname': 'recordingTitle'
				, text: 'Record'
			}
			, notification: {
				'classname': 'notificationsTitle'
				, text: 'Notifications'
			}
			, favorite: {
				'classname': 'favoritesTitle'
				, text: 'Favorites'
			}
			, information: {
				'classname': 'informationTitle'
				, text: 'More Info'
			}
			, signIn: {
				'classname': 'notLoggedInTitle'
				, text: 'Sign In'
			}
		}
	};

	Uverse.config.liveTiles = {
		progressBarInterval: 20000
		, scheduleSizeWindowSizeMinutes: 60
		, expirationToast: {
			infoAlert: ''
			, infoMessage: 'Due to a lack of activity, this information is out of date. Please refresh the browser.'
			, buttonText: 'Refresh'
		}
		, simulated: {
			enable: false
			, date: null
			, dateDiff: 0
			, repopulateMethods: []
			, updateDate: function(date) {
				Uverse.config.liveTiles.simulated.date = date;
				Uverse.config.liveTiles.simulated.dateDiff = date - (new Date());
				Uverse.config.liveTiles.simulated.repopulateMethods.each(function(method) { method(); });
			}
		}
		, text: {
			footer: {
				blackout: {
					icon: 'TV'
					, message: 'Watch LIVE on your TV on channel {0}.'
				}
			}
		}
	};

	
	Uverse.config.liveCards = {
		overlay: {
			message: {
				inhome: {
					noplugin: "Install Plug-in to<br />watch LIVE in-home"
					, notconnected: "Connect to your U-verse<br />home network to watch LIVE"
					, signin: "Sign in to watch<br />LIVE in-home"
					, javaupdate: "Update Java to watch<br />LIVE in home"
				}
				, upgrade: "U-verse TV upgrade<br />required to watch"
				, signin: "Please sign in to watch online"
				, blackout: "Program temporarily<br />unavailable online"
				, geo: "Channel unavailable<br />in your region"
			}
			, link: {
				install: '/uv/configure-live-player-plugin'
				, upgrade: 'https://www.att.com/myuverse/index.jsp?_requestid=620069#vucbbb'
			}
		}
	};

	Uverse.config.uverseMobileApps = {
		iOS: {
			itunesURL: 'https://itunes.apple.com/us/app/at-t-u-verse/id410354613?mt=8'
			, customURIProtocol: 'uversetv://'
		}
	};

	Uverse.config.cards = {
		shortDescriptionLimit : 150
		, defaultLength : 25
		, airDateSeries : 'Aired {0}'
		, airDateMovies : 'Released {0}'
		, assetDuration : '({0})'
		, metadataSeasonEpisode : 'S{0} E{1} {2}'
		, movieDurationDetails : '{0} Minutes'
	};
	
	Uverse.config.promoCards = {
		tag : {
			app_smartphone: 'Smartphone App'
			, app_tablet: 'Tablet App'
			, app_tv: 'TV App'
			, feature: 'Feature'
			, package_uverse: 'Package'
			, package_premium: 'Premium Package'
		}
		, overlay : {
			app: 'Learn More'
			, feature: 'Learn More'
			, package_uverse: 'View Details'
			, package_premium: 'View Details'
		}
		, ppvTime : '{0} ET / {1} PT'
	};
	
	Uverse.config.search = {
		advancedSearch : {
			modelNames: {
				DESCRIPTIONS: 'searchEpisodeAndClipDescriptions'
				, HDONLY: 'searchHdOnly'
				, FREEONLY: 'searchFreeOnly'
				, ESPANOLONLY: 'searchEspanolOnly'
			}
			, currentDataValues: {
				searchEpisodeAndClipDescriptions: false
				, searchHdOnly: false
				, searchFreeOnly: false
				, searchEspanolOnly: false
			}
		}
		, headerAdvancedSearchDescription : {
			episodeAndClipDescriptions : 'descriptions'
			, hdOnly : 'HD only'
			, freeOnly : 'Free only'
			, espanolOnly : 'En Espa&#241;ol only'
		}
	};
	
	Uverse.config.refreshUserSessionHeaders = {
		'X-Requires-Authentication' : 'true'
	};

	Uverse.config.siteSwitch = {
		siteSwitchUrlTemplate: '/siteSwitch.html?device-type={deviceType}&return={returnUrl}'
	};

	Uverse.config.nbcuPlayerMvpd = 'ATT';

	// TODO: Remove this if the imageFillMode property was added to each card from the BE
	Uverse.config.networksThatNeedThumbnailToCoverCard = ['HBO'];

	Uverse.config.autoAuth = {
		enabled: false
	};

})();

(function() {

	Uverse.config.google_analytics = {
		code: 'UA-6309852-3'
	};

		// Digitalsmiths
		Uverse.config.digitalsmiths = {
			baseUrl: 'http://uverse-prod-elb.digitalsmiths.net/sd/uverse'
		};

	
		// ComScore
		Uverse.config.comscore = {
			clientid: '7718380'
			, c1: '2'
		};

		// adobe analytics
		Uverse.config.adobeAnalytics = true;

		// foresee
		Uverse.config.foresee = {
			sp: 13
			, lf: 1
		};
	
		// ATT E-commerce
		Uverse.config.ATTEcommerce = {
			url: 'https://jact.atdmt.com/jaction/cntcp9_{userType}CustomerIDJAction_1/v3/ato/atc1{nextgenUverseCookie}'
		};

})();
