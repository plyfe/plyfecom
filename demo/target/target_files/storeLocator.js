/**
 * @Target.ca StoreLocator v2
 * @Second version of the storelocator application.
 * @author paul.placido@target.com, alessandro.miralles@target.com
 */

TargetCA.storeLocator = {
	allClosestStores: [],
	apigeeKey: 'c5ae29ff8c4ffb85fdd93029e196e251', //apikey
	caClosestStores: [],
	canadaFlag: true, // Filtering flag
	capabilities: [], // Capabilities array
	keepLocation: false,
	latitude: 43.64820000001, // default lat value
	longitude: -79.4042, //default lng value
	loaded: false,
	mapChangeClosestStores: [],
	province: ['AB','BC','MB','NB','NL','NT','NS','NU','ON','PE','QC','SK','YT'],
	provinceCount: 0,
	provinces : {
		AB: [],
		BC: [],
		MB: [],
		NB: [],
		NL: [],
		NT: [],
		NS: [],
		NU: [],
		ON: [],
		PE: [],
		QC: [],
		SK: [],
		YT: []
	},
	seeAllCaStores: [],
	staticStores: [], // Static stores array
	focusObj : null,
	// Init function
	init: function() {
		// Checking to see if localStorage is supported, and fully supported with checkLocalStorageFunctionality(), by the browser
		//must wrap the localStorage in a try catch for now to avoid any "do not track" issues cross browser
		try {
			if (typeof localStorage == 'object') {
				if (TargetCA.storeLocator.checkLocalStorageFunctionality() == false) {
					this.keepLocation = true;
				} else {
					this.keepLocation = this.checkLocalKeepLocation(this.keepLocation);
					this.latitude = this.checkLocalLatitude(this.latitude);
					this.longitude = this.checkLocalLongitude(this.longitude);
				}
			}
		} catch ( err ){
			//user is in "do not track mode"
		}

		this.checkStoreIdHash();
		this.getGeoLocationService();
		this.events();
		this.pageLoadComplete();
		this.setApigeeKey(); 

		// Set JSONP Globals
		$.jsonp.setup({
			timeout: 10000
		});
	}, // End init function

	// sets the "loaded" variable to true when the page is loaded
	// the store locator error modal is supressed when this is false
	pageLoadComplete: function() {
		$(window).load(function () {
			TargetCA.storeLocator.loaded = true;
		});
	}, // End pageLoadComplete function

	// if we're not on prod, use dev apigee key
	setApigeeKey: function() {
		if (document.URL.indexOf('target.ca') == -1) {
			TargetCA.storeLocator.apigeeKey = '7b8e3783d11efdff0702bd7693ba469e'; //switch to dev api key
		}

	}, // End setApigeeKey function

	// Grabs lat/long from URL, primarily used for store links in global nav
	// Lat/long parameters may be replaced by store ID in the future
	checkStoreIdHash: function() {
		// Makes use of the getUriVars from the helpers namespace
		var x = TargetCA.helpers.getUriVars();
		if (typeof x == 'object') {
			if (x.lat && x.lng) {
				this.latitude = x.lat;
				this.longitude = x.lng;
				//TargetCA.storeLocator.getGeoCode(x.lat,x.lng);
				//this.getSpecificStoreDetails(x.storeId);
			}
		}
	}, // End checkStoreIdHash function

	// checkLocalStorageFunctionality checks to see if the browser allows setting localStorage parameters. This is important, as Safari, in Private Browsing Mode, doesn't allow setting paramters in localStorage.
	checkLocalStorageFunctionality: function() {
		try {
			uid = new Date;
			(storage = window.localStorage).setItem(uid, uid);
			fail = storage.getItem(uid) != uid;
			storage.removeItem(uid);
			fail && (storage = false);
		} catch(e) {
			return false;
		}
	}, // End checkLocalStorageFunctionality function

	// Returns latitude and longitude values
	getGeolocation: function(type) {
		if (type == "lat")
			return this.latitude;
		if (type == "lng")
			return this.longitude;
	}, // End getGeolocation function

	// Triggers "loading" animation on
	mapLoadingOn: function(flag) {
		$(".mapDiv .loading").css("display","block");
		if (flag == 'closest') {
			$(".store-locator-list .loading").css("display","block");
		} else if (flag == 'all') {
			$(".viewAllStores .loading").css("display","block");
		}
	}, // End mapLoadingOn function

	// Triggers "loading" animation off
	mapLoadingOff: function(flag) {
		$(".mapDiv .loading").css("display","none");
		if (flag == 'closest') {
			$(".store-locator-list .loading").css("display","none");
		} else if (flag == 'all') {
			$(".viewAllStores .loading").css("display","none");
		}
	}, // End mapLoadingOff function

	// Handles JSONP Error Messaging
	jsonpError: function(flag, focusOnClose) {
		
		var errorMessage;
		if (flag == 'error') {
			errorMessage = TargetCA.helpers.translation(
				'Désolé. Les renseignements que vous avez entrés sont erronés ou incomplets. Veuillez modifier les critères de recherche et réessayer.',
				'Sorry. The information you entered is invalid or incomplete. Please check your information and try your search again.');
		} else if (flag == 'timeout') {
			errorMessage = TargetCA.helpers.translation(
				'Le délai est écoulé. Veuillez réessayer.',
				'Your request has timed out – please try again.');
			this.mapLoadingOff('closest');
			this.mapLoadingOff('all');
			$("ol.closest-stores").hide();
			$('.timeoutMessage').empty().html(errorMessage);
			$('.timeoutMessage').css('display','block');
			$('.timeoutMessage').css('opacity','1');
		} else {
			errorMessage = TargetCA.helpers.translation(
				'Désolé. Une erreur s’est produite. Veuillez actualiser votre navigateur et réessayer.',
				'Sorry. It appears something went wrong, please refresh your browser and try again.');
		}

		if( $( '#overlayContainer' ).css( 'display' ) != 'none' && $( '#overlayContainer #selectLocation' ).length < 1 ){
			// Check to see if the popup already exists. If it doesn't, display it; if it does, do nothing.
			if (flag != 'timeout' && TargetCA.storeLocator.loaded) {
				if ($.find('#sl-alert').length === 1) {
					//console.log("Alert display already exists, do nothing");
				} else {
					//console.log("Alert doesn't exist, go ahead and display it.");
					var sl_alert = '<div id="sl-alert"><div id="sl-alert-box"><h2>Error</h2><p>' + errorMessage + '</p><a id="sl-alert-btn" href="#">OK</a></div></div>';
					//var focusOnClose = $("input#origin");
				
					$("body").append(sl_alert);
					$('a,input,select,textarea,button,label').attr('tabIndex', -1);
					$("#sl-alert h3").attr('tabindex', -1).focus();
					$("#sl-alert a").attr('tabindex', 0);
					window.setTimeout(function() {
						$("#sl-alert h3").focus();
					}, 1000);
					$("#sl-alert a").click(function(e) {
						e.preventDefault();
						$("#sl-alert").remove();
						$('a,input,select,textarea,button').attr('tabIndex', 0);
						focusOnClose.focus();
					});
				}
				if ($('.gn--expand').hasClass('open')) {
					$('.gn--expand').trigger('click');
				}
			}
		}
	}, // End jsonpError function

	// Handles JSONP Success events
	jsonpSuccess: function() {
		$("ol.closest-stores").show();
		$('.timeoutMessage').css('display','none');
	}, // End jsonpSuccess function

	// Checks and returns keepLocation parameter in localStorage, if available
	checkLocalKeepLocation: function(value) {
		if (localStorage.keepLocation == undefined) {
			return value;
		}
		return localStorage.keepLocation;
	}, // End checkLocalKeepLocation function

	// Checks and returns latitude in localStorage, if available
	checkLocalLatitude: function(value) {
		if (localStorage.latitude == undefined) {
			return value;
		}
		return localStorage.latitude;
	}, // End checkLocalLatitude function

	// Checks and returns longitude in localStorage, if available
	checkLocalLongitude: function(value) {
		if (localStorage.longitude == undefined) {
			return value;
		}
		return localStorage.longitude;
	}, // End checkLocalLongitude function

	// Gets user's geolocation
	getGeoLocationService: function() {
		//console.log('getGeoLocation');
		// Turn map loader on
		TargetCA.storeLocator.mapLoadingOn('closest');
		$("ol.closest-stores").show();
		$('.timeoutMessage').css('display','none');
		var lat = this.latitude;
		var lng = this.longitude;
		if (!this.keepLocation) {
			if (navigator.geolocation) { // IE8 and below does not support geolocation, this checks for such instances
				if (typeof navigator.geolocation.getCurrentPosition.position == "undefined") {
					TargetCA.storeLocator.getStaticStores(lat, lng);
					return false;
				}
				navigator.geolocation.getCurrentPosition(function foundPosition(position) {
					//console.log('GEOLOCATION SUCCESS');
					lat = position.coords.latitude;
					lng = position.coords.longitude;
					TargetCA.storeLocator.getStaticStores(lat, lng);
				}, function noLocation(error) {
					//console.log('GEOLOCATION ERROR');
					TargetCA.storeLocator.getStaticStores(lat, lng);
				}, {
					// Default settings defined for geolocation
					timeout: 10000,
					enableHighAccuracy: true,
					maximumAge: 0
				});
			} else {
				this.getStaticStores(lat, lng);
			}
			this.keepLocation = true;
		} else {
			this.getStaticStores(lat, lng);
		}
	}, // End getGeoLocationService function

	// calling static list data
	getStaticStores: function(lat, lng) {
		//console.log('getStaticStores');
		$.ajax({
			url: fullpath + "/assets/js/data/storelocations.js",
			dataType: "jsonp",
			jsonpCallback: "results",
			success: function(data) { // runs on success
				//console.log('getStaticStores SUCCESS');
				TargetCA.storeLocator.jsonpSuccess();
				with (TargetCA.storeLocator) {
					staticStores = data;
					getGeoCode(lat,lng);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) { // runs on error
				//console.log('getStaticStores ERROR');
				TargetCA.storeLocator.jsonpError(textStatus);
			}
		});
	}, // End getStaticStores function

	// obtaining geoCode from Target Services for percision and possibly city, if necessary
	getGeoCode: function(lat, lng, loc, increaseRange) {
		// Update both search fields when either is set
		if (loc) {
			$("#submitLocatorInformation #locationfield").attr("value", loc);
			$("#submitPostalCode #postalCode").attr("value", loc);
			$("#pharmacyLocationInput").attr("value", loc);
		} else {
			loc = lat + "," + lng;
		} // for any falsey value of loc, use default lat & lng

		// if (loc == null || loc === undefined) {
		// 	loc = lat + "," + lng;
		// }
		
		
		$.jsonp({
			url: "http://api.target.com/v2/location/geocode?place=" + loc + "&locale=" + TargetCA.helpers.translation("fr","en") + "-CA&key=" + TargetCA.storeLocator.apigeeKey,
			callbackParameter: "callback",
			cache: true,
			success: function(data, textStatus, xOptions) {
				TargetCA.storeLocator.jsonpSuccess();
				if (data.Locations.Location != undefined) {
					with(TargetCA.storeLocator) {
						//console.log(data.Locations.Location);
						latitude = data.Locations.Location.Address.Latitude;
						longitude = data.Locations.Location.Address.Longitude;

						/** TEMP FIX UNTIL BING FIXES THEIR API FOR WINNIPEG - JIRA #2107 **/
						/** REMOVE WHEN API IS RESOLVED **/
						/** START **/
						if((latitude == 52.148941040039062) && (longitude == -97.718460083007812)) {
							latitude = 49.8997541;
							longitude = -97.1374937;
						}

						if( typeof increaseRange !== "undefined" && increaseRange ){
							getDynamicStores(latitude, longitude, null, 1000, null, increaseRange);
						} else {
							getDynamicStores(latitude, longitude, null, 100, null);
						}
					}
				} else {
					with(TargetCA.storeLocator) {
						jsonpError('error', $('#locationfield'));
						mapLoadingOff('closest');
						mapLoadingOff('all');
					}
				}
			},
			error: function (xOptions, textStatus) {
				//console.log('getGeoCode ERROR');
				TargetCA.storeLocator.jsonpError(textStatus, $('#locationfield'));
				TargetCA.storeLocator.mapLoadingOff('closest');
				TargetCA.storeLocator.mapLoadingOff('all');
			},
			complete: function(xOptions, textStatus) {
				//console.log('JSNOP Call Complete');
			}
		});
	}, // End getGeoCode function

	// getDynamicStores returns API response for search results and geolocation, as well as when the user pans the map
	getDynamicStores: function(lat, lng, loc, range, mapChange, increaseRange) {
		var capabilityFilter = ''; // Instantiate capabilities variable
		range = range.toFixed(2); // Round up the range to the closest two decimal places

		// Check if the range is less than 1 or greater than 400 and set default values accordingly
		if (range <= 1) {
			range = 1;
		} else if (range > 400) {
			range = 400;
		}

		if( typeof increaseRange !== "undefined" && increaseRange ){
			range = 1000; //max range
		}

		/**#2107**/
		/**added for showing winnipeg,mantioba in store locations**START*/

		if (loc == null) {
			if((lat == 52.148941040039062) && (lng == -97.718460083007812)) {
				lat = 49.8997541;
				lng = -97.1374937;
			}
			loc = lat + "," + lng;
		}
		/****END**/

		if (this.capabilities.length > 0) {
			capabilityFilter += '&capabilities=';
			capabilityFilter += this.capabilities.join();
		}

		$.jsonp({ // Replaces jQuery AJAX call to handle JSONP errors
			url: "http://api.target.com/v2/store?nearby=" + loc + "&range=" + range + capabilityFilter + "&limit=100&locale=" + TargetCA.helpers.translation("fr","en") + "-CA&key=" + TargetCA.storeLocator.apigeeKey,
			callbackParameter: "callback",
			cache: false,
			success: function(data, textStatus, xOptions) {
				TargetCA.storeLocator.jsonpSuccess();
				with(TargetCA.storeLocator) {
					if (mapChange) {
						//console.log(data);
						reorgStaticStores(staticStores,lat,lng,range,mapChange);
						reorgAllClosestStores(data,lat,lng,range,mapChange);
					} else {
						updateLocalStorage(lat, lng);
						reorgStaticStores(staticStores,lat,lng);
						reorgAllClosestStores(data,lat,lng,null,null,increaseRange);
					}

					if ($('.viewAllStores').children().hasClass('active')) {
						TargetCA.storeLocator.compileDynamicAndStaticStores('hash');
					}
				}
			},
			error: function (xOptions, textStatus) {
				//console.log('getGeoCode ERROR');
				TargetCA.storeLocator.jsonpError(textStatus, $('#locationfield'));
			},
			complete: function(xOptions, textStatus) {
				//console.log('JSNOP Call Complete');
			}
		});
	},

	// Reorganizes static store list by distance and appends French translation for storeLocatorOpenDate parameter
	reorgStaticStores: function(data,lat,lng,range,mapChange) {  //Data Manipulation for static list
		this.caClosestStores = [];
		var caStores = [];
		var data = data.Locations.Location;
		var distances = [];
		var ranking = [];
		for(var i = 0; i < data.length; i++) {
			if (culture == "fr") {
				var str = "";
				switch (data[i].storeLocatorOpenDate) {
					case "Spring 2013":
					str = "au printemps 2013";
					break;
					case "Summer 2013":
					str = "à l’été 2013";
					break;
					case "Fall 2013":
					str = "à l’automne 2013";
					break;
					case "Early Fall 2013":
					str = "au début de l’automne 2013";
					break;
					case "Late Fall 2013":
					str = "à la fin de l’automne 2013";
					break;
					case "Winter 2014":
					str = "à l’hiver 2014";
					break;
					default: str = "";
				}
				data[i].storeLocatorOpenDate = str;
			}
			var difference = this.calcDistanceBetween(lat, lng, data[i].Address.Latitude, data[i].Address.Longitude);
			data[i].difference = difference;
			distances.push(difference);
			caStores.push(data[i]);
			//TargetCA.storeLocator.caAllStores.push(data[i]);
		}
		distances.sort(function(a,b) {
			return a - b;
		});
		for (var i = 0; i < distances.length; i++) {
			for (var e = 0; e < caStores.length; e++) {
				if (distances[i] == caStores[e].difference) {
					ranking[i] = caStores[e];
					this.caClosestStores.push(ranking[i]);
				}
			}
		}
	}, //End reorgStaticStores function
	createPreFilteredStores: function(data, lat, lng) {
		var result = [];
		var distances = [];
		data = data.Locations.Location;
		if(data === undefined)return result;
		if (data instanceof Array) {

			
			
			for (var i = 0; i < data.length; i++) {
				var difference = this.calcDistanceBetween(lat, lng, data[i].Address.Latitude, data[i].Address.Longitude);
				data[i].difference = difference;
				distances.push(difference);
				result.push(data[i]);
			}
		} else {
			if( typeof data !== "undefined" && data.hasOwnProperty( 'Address' ) ){
				var difference = this.calcDistanceBetween(lat, lng, data.Address.Latitude, data.Address.Longitude);
				data.difference = difference;
				distances.push(difference);
				result.push(data);
			}
		}
		return result;
	},
	// Reorganizes and filters all closest stores, appends static stores list, if needed
	reorgAllClosestStores: function(data,lat,lng,range,mapChange,normalData) {
		if (mapChange) {
			// Do nothing. If the user pans we want to maintain the allClosestStores list
		} else {
			this.allClosestStores = [];
		}
		this.mapChangeClosestStores = [];
		var caStores = this.caClosestStores;
		var preFilteredStores = [];
		var postFilteredStores = [];
		var ranking = [];
		var allStores;

		preFilteredStores = this.createPreFilteredStores(data, lat, lng); // grab the result of createPreFilteredStores

		// Filter Canada/US Stores
		//console.log(preFilteredStores)

		for (var i = 0; i < preFilteredStores.length; i++) {
			if (this.canadaFlag) {
				if (preFilteredStores[i].Address.CountryName == "Canada") {
					postFilteredStores.push(preFilteredStores[i]);
				}
			} else {
				//console.log("All Stores");
				postFilteredStores.push(preFilteredStores[i]);
			}
		}
		// Pass data to appropriate arrays depending on whether or not the map has been moved
		if (mapChange) {
			this.mapChangeClosestStores = postFilteredStores; // closest stores in map radius, plus all static stores
		} else {
			this.allClosestStores = postFilteredStores;
			allStores = this.allClosestStores;
		}
		/**
			* If no capability checkboxes have been selected, concatenate the static stores
			* No store from the static stores list should appear if filtering by a capabilitie,
			* because static stores will never have capabilities listed
			*/

		if (this.capabilities.length == 0) {
			if (mapChange) {
				this.mapChangeClosestStores = this.mapChangeClosestStores.concat(caStores); // closest stores in map radius, plus all static stores
			} else {
				this.allClosestStores = this.allClosestStores.concat(caStores);
			}
		}

		if( typeof normalData !== "undefined" && normalData ){
			this.allClosestStores = allStores;
		}

		//console.log(this.allClosestStores)

		// Make sure no duplicates appear in the array(s)
		if (mapChange) {
			for (var i = 0; i < this.mapChangeClosestStores.length; i++) {
				for (var x = i+1; x < this.mapChangeClosestStores.length; x++) {
					if (this.mapChangeClosestStores[x].ID == this.mapChangeClosestStores[i].ID ) {
						this.mapChangeClosestStores.splice(x,1);
						--x;
					}
				}
			}
			for (var j = 0; j < this.mapChangeClosestStores.length; j++) {
				if (this.mapChangeClosestStores[j].difference > range) {
					this.mapChangeClosestStores.splice(j,this.mapChangeClosestStores.length - j);
				}
			}
		} else {
			for (var i = 0; i < this.allClosestStores.length; i++) {
				for (var x = i+1; x < this.allClosestStores.length; x++) {
					if (this.allClosestStores[x].ID == this.allClosestStores[i].ID ) {
						this.allClosestStores.splice(x,1);
						--x;
					}
				}
			}
			if( typeof normalData === "undefined"  ){
				for (var j = 0; j < this.allClosestStores.length; j++) {
					if (this.allClosestStores[j].difference > 100) {
						this.allClosestStores.splice(j,this.allClosestStores.length - j);
					}
				}
			}
		}

		if (mapChange) {
			//console.log(this.mapChangeClosestStores);
			for (var a=0; this.allClosestStores.length > a; a++) {
				for (var b=0; this.mapChangeClosestStores.length > b; b++) {
					if (this.allClosestStores[a].ID == this.mapChangeClosestStores[b].ID) {
						this.mapChangeClosestStores.splice(b,1);
					}
				}
			}
			TargetCA.bingApi.addPins(this.mapChangeClosestStores,null,null,TargetCA.bingApi.oPins);
		} else {
			if (this.allClosestStores.length > 0) {
				this.allClosestStores.sort(function(a,b) {
					if (a.difference < b.difference)
						return -1;
					if (a.difference > b.difference)
						return 1;
					return 0;
				});
				this.refresh(this.allClosestStores,"stores");
				//console.log('stores returned');
			} else {
				//console.log(null);
				this.refresh(this.allClosestStores,null);
			}
		}
		var checkLocation = window.location.href;
		if( typeof postFilteredStores[0] !== "undefined" && postFilteredStores[0].Address.Subdivision == "QC" ) { //first result is quebec
			$( '.gn--top-level a.gn--top-level-link.pharmacyLink' ).attr( 'href', '/' + culture + '/brunet/' );
		 	$( '.homepage .hp--details .hp--details-link.pharmacy' ).attr( 'href', '/' + culture + '/brunet/?lnk=content' );

			var redirectURL = "";
			if( checkLocation.indexOf( "/pharmacy" ) != -1 && checkLocation.indexOf( "/pharmacy/refill" ) == -1 && checkLocation.indexOf( '/careers' ) == -1 ){
				if( $( '#pharmacyLocationInput' ).val() != "" && $( '#pharmacyLocationInput' ).val() != "enter city, province or postal code" && $( '#pharmacyLocationInput' ).val() != 'Entrez la ville, la province ou le code postal' && $( '#pharmacyLocationInput' ).val() != 'entrez ville, province ou code postal' ){
		 			redirectURL = window.location.protocol + "//" + window.location.hostname + "/" + culture + '/brunet/?loc=' + $( '#pharmacyLocationInput' ).val();
		 			window.location.href = redirectURL;
		 		}
		 	}
		 } else {
		 	$( '.gn--top-level a.gn--top-level-link.pharmacyLink' ).attr( 'href', '/' + culture + '/pharmacy/' );
		 	$( '.homepage .hp--details .hp--details-link.pharmacy' ).attr( 'href', '/' + culture + '/pharmacy/?lnk=content' );
		 	if( checkLocation.indexOf( "/brunet" ) != -1 ){
		 		if( $( '#pharmacyLocationInput' ).val() != "" && $( '#pharmacyLocationInput' ).val() != "enter city, province or postal code" && $( '#pharmacyLocationInput' ).val() != 'Entrez la ville, la province ou le code postal' && $( '#pharmacyLocationInput' ).val() != 'entrez ville, province ou code postal' ){
		 			redirectURL = window.location.protocol + "//" + window.location.hostname + "/" + culture + '/pharmacy/?loc=' + $( '#pharmacyLocationInput' ).val();
		 			window.location.href = redirectURL;
		 		}
		 	}
		}

	}, // End reorgAllClosestStores function

	// Checks list against eisting numbered stores and removes them from original list
	checkAgainstExistingStores: function() {
		var removeList = new Array();
		for (var a = 0; result.length > a; a++) {
			for (var b = 0; staticList.length > b; b++) {
				if (result[a].ID == staticList[b].ID) {
					removeList.push(staticList[b].ID)
				}
			}
		}
		for (var c=0; staticList.length > c; c++) {
			var test = $.inArray(staticList[c].ID, removeList)
			if (test >= 0) {
				//console.log('Store ID: '+staticList[c].ID+' already exists ('+c+')');
			} else {
				//console.log('Store ID: '+staticList[c].ID+' DOES NOT already exist ('+c+')');
				result.push(staticList[c]);
			}
		}
	}, // End checkAgainstExistingStores function

	// Calculates the distance between two points (may be redundant)
	calcDistanceBetween: function (lat1,lon1,lat2,lon2) {
		var R = 6371;
		var dLat = (lat2-lat1) * Math.PI / 180;
		var dLon = (lon2-lon1) * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		return d;
	}, // End calcDistanceBetween function

	// Grabs store details by store ID, used on Pharmacy Details page
	getSpecificPharmDetails: function() {
		//console.log('getSpecificPharmDetails');
		var storeID = TargetCA.pharmacy.getParameterByName('storeNumber');
		$.jsonp({ // Replaces jQuery AJAX call to handle JSONP errors
			url: "http://api.target.com/v2/store/" + storeID + "?locale=" + TargetCA.helpers.translation("fr","en") + "-CA&key=" + TargetCA.storeLocator.apigeeKey,
			callbackParameter: "callback",
			cache: true,
			success: function(data, textStatus, xOptions) {
				//console.log('getSpecificPharmDetails SUCCESS');
				TargetCA.storeLocator.jsonpSuccess();
				with(TargetCA.pharmacy) {
					data = data.Location;
					getPharmStoreDetails(data);
				}
			},
			error: function (xOptions, textStatus) {
				//console.log('getSpecificPharmDetails ERROR');
				TargetCA.storeLocator.jsonpError(textStatus, $('#pharmacyLocationInput'));
			},
			complete: function(xOptions, textStatus) {
				$('.pharmacy-details .storeInfo .loader').css('display','none');
			}
		});
	}, // End getSpecificPharmDetails function

	// Grabs store details by store ID, used on Pharmacy Refill Results page (could possibly be conmbined with getSpecificPharmDetails)
	getSpecificPharmRefillResults: function() {
		//console.log('getSpecificPharmRefillResults');
		var storeID = TargetCA.pharmacy.getParameterByName('Misc');
		$.jsonp({ // Replaces jQuery AJAX call to handle JSONP errors
			url: "http://api.target.com/v2/store/" + storeID + "?locale=" + TargetCA.helpers.translation("fr","en") + "-CA&key=" + TargetCA.storeLocator.apigeeKey,
			callbackParameter: "callback",
			cache: true,
			success: function(data, textStatus, xOptions) { // runs on success
				//console.log('getSpecificPharmRefillResults SUCCESS');
				TargetCA.storeLocator.jsonpSuccess();
				with(TargetCA.pharmacy) {
					data = data.Location;
					formResponsePage(data);
				}
			},
			error: function (xOptions, textStatus) { // runs on error
				//console.log('getSpecificPharmRefillResults ERROR');
				TargetCA.storeLocator.jsonpError(textStatus, $('#pharmacyLocationInput'));
			},
			complete: function(xOptions, textStatus) { // runs after success or error
				//console.log('JSNOP Call Complete');
				//console.log(textStatus);
			}
		});
	}, // End getSpecificPharmRefillResults function

	// Grabs EVERY Canada store from service and static list (might be redundant)
	compileDynamicAndStaticStores: function(flag) {
		TargetCA.storeLocator.mapLoadingOn('all');
		$("ol.closest-stores").show();
		$('.timeoutMessage').css('display','none');
		if (this.seeAllCaStores.length > 0) {
			TargetCA.storeLocator.resultsFromAllProv(this.seeAllCaStores, flag, false);
		} else {
			var ajaxCounter = 1;
			for (var i = 0; TargetCA.storeLocator.province.length > i; i++) {
				$.jsonp({
					url: "http://api.target.com/v2/store?adminarea=" + TargetCA.storeLocator.province[i] + "&locale=" + TargetCA.helpers.translation("fr","en") + "-CA&key=" + TargetCA.storeLocator.apigeeKey,
					callbackParameter: "callback",
					cache: true,
					success: function(data, textStatus, xOptions) {
						TargetCA.storeLocator.jsonpSuccess();
						with(TargetCA.storeLocator) {
							if (typeof data.Locations.Location != "undefined") {
								//if (data.Locations.Location instanceof Array) {

									data.Locations.Location = $.makeArray(data.Locations.Location);

									//console.log("data.Locations.Location is: an " + Object.prototype.toString.call(data.Locations.Location)); // PDP debug

									for (var j = 0; data.Locations.Location.length > j; j++) {
										seeAllCaStores.push(data.Locations.Location[j]);
									}
								
							}
							if (province.length == ajaxCounter) {
								resultsFromAllProv(seeAllCaStores, flag, true);
							}
							ajaxCounter++;
						}
					},
					error: function (xOptions, textStatus) {
						TargetCA.storeLocator.jsonpError(textStatus, $('#locationfield'));
					}
				});
			}
		}
	}, // End compileDynamicAndStaticStores function

	// Grabs every store from every Canadian province (may be redundant)
	resultsFromAllProv: function(result, flag, firstRound) {
		//console.log('compileDynamicAndStaticStores DONE');
		$(".mapDiv .allStores.loading").css("display","none");
		$(".viewAllStores .loading").css("display","none");
		// Only runs once every AJAX call has been completed
		var staticList = [];
		staticList = TargetCA.storeLocator.staticStores.Locations.Location;

		var removeList = new Array();
		for (var a=0; result.length > a; a++) {
			for (var b=0; staticList.length > b; b++) {
				if (result[a].ID == staticList[b].ID) {
					removeList.push(staticList[b].ID)
				}
			}
		}
		for (var c=0; staticList.length > c; c++) {
			var test = $.inArray(staticList[c].ID, removeList)
			if (test >= 0) {
				//console.log('Store ID: '+staticList[c].ID+' already exists ('+c+')');
			} else {
				//console.log('Store ID: '+staticList[c].ID+' DOES NOT already exist ('+c+')');
				result.push(staticList[c]);
			}
		}
		if (firstRound) {
			TargetCA.storeLocatorSideMenu.loadAllStoresSideNav(result);
		}
		if (flag == 'hash') {
			$('#tab2').click();
		}
		TargetCA.bingApi.setMap('mapDiv',result, null, 'all');
		TargetCA.storeLocator.mapLoadingOff('all');
	}, // End resultsFromAllProv function

	// Updates localStorage with lat/long
	updateLocalStorage: function(lat,lng) { //updating localStorage with new values
		if (TargetCA.storeLocator.checkLocalStorageFunctionality() == false) {
			this.keepLocation = false;
			this.latitude = lat;
			this.longitude = lng;
		} else {
			localStorage.keepLocation = this.keepLocation;
			localStorage.latitude = lat;
			localStorage.longitude = lng;
		}
	}, // End updateLocalStorage function

	// Public method - use for updating content
	updateResponses: function(lat,lng,loc) {
		// close any infobox that may already be open
		if (TargetCA.bingApi.infobox) {
			TargetCA.bingApi.infobox.setOptions({
				visible: false
			});
		}
		this.mapLoadingOn('closest');
		if (TargetCA.storeLocator.checkLocalStorageFunctionality() == false) {
			this.getGeoCode(lat,lng,loc);
		} else {
			this.getGeoCode(localStorage.latitude,localStorage.longitude,loc);
		}
	}, //End updateResponses function

	// Event handling
	events: function() {
		// Navigation - submission
		$("#submitPostalCode").submit(function(event) {
			//console.log("++++++++++ Data Clear - Global Nav Re-submission ++++++++++");
			event.preventDefault();
			if (event.currentTarget[0].value == '') {
				//TargetCA.storeLocator.updateResponses(localStorage.latitude,localStorage.longitude,null);
				TargetCA.storeLocator.jsonpError('error', $(this).find('input').filter(':first'));
			} else {
				// Turn map loader on
				TargetCA.storeLocator.mapLoadingOn('closest');
				TargetCA.storeLocator.updateResponses(null,null,event.currentTarget[0].value);
			}
			return false;
		});

		// Store locator side nav - submission
		$("#submitLocatorInformation").submit(function(event) {
			//console.log("++++++++++ Data Clear - Store locator side nav Re-submission ++++++++++");
			event.preventDefault();
			if ($( '#locationfield' ).val() == '') {
				//TargetCA.storeLocator.updateResponses(localStorage.latitude,localStorage.longitude,null);
				TargetCA.storeLocator.jsonpError('error', $(this).find('input').filter(':first'));
			} else {
				// Turn map loader on
				if ($(".viewAllStores a").hasClass("active")) {
					$(".closestStore a").click();
				}
				TargetCA.storeLocator.mapLoadingOn('closest');
				TargetCA.storeLocator.updateResponses(null,null,$( '#locationfield' ).val());
			}
			return false;
		});

		//Search form on Pharmacy Landing Page
		$('form#submitPharm').submit(function(event) {
			//console.log("++++++++++ Data Clear - Pharmacy re-submission ++++++++++");
			event.preventDefault();
			if (event.currentTarget[0].value == '') {
				//TargetCA.storeLocator.updateResponses(localStorage.latitude,localStorage.longitude,null);
				TargetCA.storeLocator.jsonpError('error', $(this).find('input').filter(':first'));
			} else {
				$('.pharmacy-details .loader').css('display','block');
				TargetCA.storeLocator.updateResponses(null,null,event.currentTarget[0].value);
			}
		});

		//Search form on Pharmacy Details
		$("#submitPharmFromDetails").submit(function(event) {
			//console.log("++++++++++ Data Clear - Pharmacy Details Page re-submission ++++++++++");
			event.preventDefault();
			if (event.currentTarget[0].value == '') {
				TargetCA.storeLocator.jsonpError('error', $(this).find('input').filter(':first'));
			} else {
				TargetCA.storeLocator.updateResponses(null,null,event.currentTarget[0].value);
				$('#pharmDetailsPopUp').css({'visibility':'visible'});
				$('#pharmDetailsPopUp').show();
				$('.storeLocator-wrap').hide();
				$('#pharmDetailsPopUp .loader').css('display','block');
			}
			if (TargetCA.navigation.width < 720) {
				$('body,html').animate({ scrollTop: 0 }, 800);
			}
		});

		//Search form on Pharmacy Details Page Pop Up
		$("#submitPharmFromDetailsPopUp").submit(function(event) {
			//console.log("++++++++++ Data Clear - Pharmacy Details Page Pop Up re-submission ++++++++++");
			event.preventDefault();
			if (event.currentTarget[0].value == '') {
				TargetCA.storeLocator.jsonpError('error', $(this).find('input').filter(':first'));
			} else {
				TargetCA.storeLocator.updateResponses(null, null, event.currentTarget[0].value);
				$('#pharmDetailsPopUp').css({
					'visibility':'visible'
				});
				$('#pharmDetailsPopUp').show();
				$('.storeLocator-wrap').hide();
				$('#pharmDetailsPopUp .loader').css('display','block');
			}
			if (TargetCA.navigation.width < 720) {
				$('body,html').animate({
					scrollTop: 0
				}, 800);
			}
		});

		// Checkbox logic / Capability filtering
		$('#filterToggle').click(function(e) {
										  	
			e.preventDefault();
			$('#filterSection').toggleClass("open");
			if($("#filterSection").hasClass('open')){
				$("#hiding").html("Click to Collapse");
			e.preventDefault();
				
			}
			else
			{
				$("#hiding").html("Click to Expand");
				e.preventDefault();
			}

			// toggle the alt text for the plusMinus of the store services box			
			var toggleAlt = $('#filterToggle img').attr('alt');
		
			(toggleAlt == "Expand" || toggleAlt == "Agrandir") ? $('#filterToggle img').attr('alt', TargetCA.helpers.translation('RÃ©duire', 'Collapse')) : $('#filterToggle img').attr('alt', TargetCA.helpers.translation('Agrandir', 'Expand'));

		});

		// Hide/Show checkboxes for US only services
		$('.CanadaStoresSelect input').prop("checked","true")
		function toggleCheckboxes(){
			$('#filterStoresList li.filterOption').removeClass("hidden");
			if($("#checkCanadaStores").is(":checked")){
				var allCheckboxes = $('#filterStoresList li.filterOption'); // each <li> in the <ul> that holds the checkboxes
				for(var i=0; i<allCheckboxes.length; i++){
					if($('#filterStoresList li.filterOption:nth-child('+(i+1)+')').attr("data-can") == "false"){
						$('#filterStoresList li.filterOption:nth-child('+(i+1)+')').addClass("hidden");
					}
				}
			}
		}
		toggleCheckboxes();

		// handle checkbox controls for custom checkboxes
		$('input').data('counter', 0);
		$('input.filterCheckbox').removeAttr('checked');
		$('.filterOption a, a#CanadaStores').click(function(e) {
			e.preventDefault();
			$("#check"+$(this).attr("id")).trigger('click');
			var counter = $(this).parent().children("input").data("counter");
			counter++;
			$(this).parent().children("input").data("counter", counter);
			if (counter == 1) {
				$(this).trigger("click");
			}
		});

		// handle keyup events for checkboxes
		$('.filterOption a, a#CanadaStores').keyup(function(e) {
			e.preventDefault();
			if ( (e.keyCode == 13) || (e.keyCode == 32) ) {
				$(this).trigger('click');
			}
		});

		// disable spacebar keydown event for checkboxes
		$('.filterOption a, a#CanadaStores').keydown(function(e) {
			if (e.keyCode == 13 || e.keyCode == 32) {
				e.preventDefault();
				if( !$( 'body' ).hasClass( 'ie8' ) ){
					Event.stop(e);
				}
			}
		});

		$('.CanadaStoresSelect input').click(function(e) {
			if ($(this).is(':checked')) {
				//console.log('++++++++++ Data Clear - Filtering Results (unchecked -> CHECKED) - ' + $(this).attr('id').replace("check", "") + ' ++++++++++');
				$(this).parent().children('a').attr('class', 'checkCanadaStores-checked box-checked2');
				$(this).parent().children('a').children('.offscreen.state').html(' checked');
				$(this).parent().children('a').attr('aria-checked', 'true');
				TargetCA.storeLocator.canadaFlag = true;
			} else {
				//console.log('++++++++++ Data Clear - Filtering Results (checked -> UNCHECKED) - ' + $(this).attr('id').replace("check", "") + ' ++++++++++');
				$(this).parent().children('a').attr('class', 'checkCanadaStores-unchecked box-unchecked2');
				$(this).parent().children('a').children('.offscreen.state').html(' unchecked');
				$(this).parent().children('a').attr('aria-checked', 'false');
				TargetCA.storeLocator.canadaFlag = false;
			}
			TargetCA.storeLocator.updateResponses(localStorage.latitude, localStorage.longitude, null);
			toggleCheckboxes();
		});

		$('#filterStoresList .filterOption input').click(function(e) {
			TargetCA.storeLocator.capabilities = Array();

			if ($(this).is(':checked')) {
				$(this).parent().children('a').attr('class', 'box-checked');
				$(this).parent().children('a').attr('aria-checked', 'true');
				$(this).parent().children('a').children('.offscreen.state').html(' checked');
			}else{
				$(this).parent().children('a').attr('class', 'box-unchecked');
				$(this).parent().children('a').attr('aria-checked', 'false');
				$(this).parent().children('a').children('.offscreen.state').html(' unchecked');
			}

			var checkLen = $('#filterStoresList .filterOption input').length;
			for(var i = 0; i < checkLen; i++){
				var checkID = $('#filterStoresList .filterOption input')[i].id;

				var thisID;
				if (checkID == "checkPhoto") {
					thisID = "photolab";
				} else if (checkID == "checkGrocery") {
					thisID = "freshgrocery";
				} else if (checkID == "checkFlu") {
					thisID = "flushot";
				} else if (checkID == "checkMobile") {
					thisID = "mobilekiosk";
				} else {
					thisID = checkID.replace("check","").toLowerCase();
				}

				if ($('#filterStoresList .filterOption input#'+checkID).parent().children('a').hasClass('box-checked')) {
					TargetCA.storeLocator.capabilities.push(thisID);
				}
			}
			TargetCA.storeLocator.updateResponses(localStorage.latitude, localStorage.longitude, null)
/*
			if ($(this).is(':checked')) {
				//console.log('++++++++++ Data Clear - Filtering Results (unchecked -> CHECKED) - ' + $(this).attr('id').replace("check", "") + ' ++++++++++');
				$(this).parent().children('a').attr('class', 'box-checked');
				$(this).parent().children('a').children('.offscreen.state').html(' checked');
				if ($(this).attr('id') == "checkUniform") {
					TargetCA.storeLocator.capabilities.push('uniform');
				}
				if ($(this).attr('id') == "checkPharmacy") {
					TargetCA.storeLocator.capabilities.push('pharmacy');
				}
				if ($(this).attr('id') == "checkOptical") {
					TargetCA.storeLocator.capabilities.push('optical');
				}
				if ($(this).attr('id') == "checkPhoto") {
					TargetCA.storeLocator.capabilities.push('photolab');
				}
				if ($(this).attr('id') == "checkClinic") {
					TargetCA.storeLocator.capabilities.push('clinic');
				}
				if ($(this).attr('id') == "checkPortrait") {
					TargetCA.storeLocator.capabilities.push('portrait');
				}
				if ($(this).attr('id') == "checkGrocery") {
					TargetCA.storeLocator.capabilities.push('freshgrocery');
				}
				if ($(this).attr('id') == "checkFlu") {
					TargetCA.storeLocator.capabilities.push('flushot');
				}
				if ($(this).attr('id') == "checkMobile") {
					TargetCA.storeLocator.capabilities.push('mobilekiosk');
				}
				if ($(this).attr('id') == "checkWine") {
					TargetCA.storeLocator.capabilities.push('wine');
				}
				if ($(this).attr('id') == "checkStarbucks") {
					TargetCA.storeLocator.capabilities.push('starbucks');
				}
				// The following capabilities are currently not in use, but are available if we choose to filter by these one day
				if ($(this).attr('id') == "checkApple") {
					TargetCA.storeLocator.capabilities.push('apple');
				}
				if ($(this).attr('id') == "checkBeauty") {
					TargetCA.storeLocator.capabilities.push('beauty');
				}
				if ($(this).attr('id') == "checkWic") {
					TargetCA.storeLocator.capabilities.push('wic');
				}
				// End unused capability filters
			} else {
				//console.log('++++++++++ Data Clear - Filtering Results (checked -> UNCHECKED) - ' + $(this).attr('id').replace("check", "") + ' ++++++++++');
				$(this).parent().children('a').attr('class', 'box-unchecked');
				$(this).parent().children('a').children('.offscreen.state').html(' unchecked');
					if( $( 'body' ).hasClass( 'ie8' ) ){
						TargetCA.storeLocator.capabilities.indexOf = function( searchElement ){
							if (this === void 0 || this === null) {
								throw new TypeError();
							}
							var t = Object(this);
							var len = t.length >>> 0;
							if (len === 0) {
								return -1;
							}
							var n = 0;
							if (arguments.length > 0) {
								n = Number(arguments[1]);
								if (n !== n) { // shortcut for verifying if it's NaN
									n = 0;
								} else if (n !== 0 && n !== Infinity && n !== -Infinity) {
									n = (n > 0 || -1) * Math.floor(Math.abs(n));
								}
							}
							if (n >= len) {
								return -1;
							}
							var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
							for (; k < len; k++) {
								if (k in t && t[k] === searchElement) {
									return k;
								}
							}
							return -1;
						}
					}
					if ($(this).attr('id') == "checkUniform") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('uniform');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkPharmacy") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('pharmacy');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkOptical") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('optical');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkPhoto") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('photolab');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkClinic") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('clinic');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkPortrait") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('portrait');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkGrocery") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('freshgrocery');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkFlu") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('flushot');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkMobile") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('mobilekiosk');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkWine") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('wine');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkStarbucks") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('starbucks');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					// The following capabilities are currently not in use, but are available if we choose to filter by these one day
					if ($(this).attr('id') == "checkApple") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('apple');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkBeauty") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('beauty');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
					if ($(this).attr('id') == "checkWic") {
						if( TargetCA.storeLocator.capabilities.length != 0 ) {
							var index = TargetCA.storeLocator.capabilities.indexOf('wic');
							TargetCA.storeLocator.capabilities.splice(index,1);
						}
					}
				// End unused capability filters
				TargetCA.storeLocator.focusObj = $( this );
			}
*/
		});
	}, // End events function

	// Refresh
	refresh: function(stores, type, flag) {  //refreshing display
		TargetCA.storeLocator.mapLoadingOff('closest');
		//if( !$( 'body' ).hasClass( 'ie8' ) ){
			TargetCA.navigation.setNavStores(stores); //sets up navigation
		//}
		if ($('body').find('div').hasClass('store-locator')) {
			TargetCA.storeLocatorSideMenu.init(stores);  //sets up side menu for store locator
			TargetCA.bingApi.init(stores);  //set ups bing maps
		}
		if ($('body').find('div').hasClass('pharmacy-page')) {
			TargetCA.pharmacy.setPharmStores(stores); //sets up Pharmacy stores
		}
		if ($('body').find('div').hasClass('pharmacy-details')) {
			TargetCA.storeLocator.getSpecificPharmDetails(); //sets up Pharmacy details page
			TargetCA.pharmacy.pharmStoresPopUp(stores); //sets up Pharmacy details Page Pop Up
		}
		if ($('body').find('div.pharmacy-refill').hasClass('submitted')) {
			TargetCA.storeLocator.getSpecificPharmRefillResults(); //sets up Pharmacy details page
		}
	}, // End refresh function

	// Calculate driving directions
	getDrivingDirections: function(origin, destination, obj) {
		$("ol.closest-stores").show();
		$('.timeoutMessage').css('display','none');
		
		//get user's start driving location
		$.jsonp({
			url: "http://api.target.com/v2/location/geocode?place=" + origin + "&locale=" + TargetCA.helpers.translation("fr","en") + "-CA&key=" + TargetCA.storeLocator.apigeeKey,
			callbackParameter: "callback",
			cache: true,
			success: function(data, textStatus, xOptions) {
				TargetCA.storeLocator.jsonpSuccess();
				
				var formattedAddress = '';
				if( typeof data.Locations.Location === "undefined" ){
					formattedAddress = origin;
				} else {
					formattedAddress = data.Locations.Location.Address.FormattedAddress;
				}
				var uri = 'http://api.target.com/v2/location/route/driving?origin=' + formattedAddress + '&destination=' + destination + '&c=' + TargetCA.helpers.translation('fr-CA', 'en-US') + '&optimize=time&key=' + TargetCA.storeLocator.apigeeKey;
				obj.children('.loading').css('display','inline-block');
				obj.children('.directions').empty();
				$('.printDirections .directionsList').empty();
				$('.printDirections .directionsMap').empty();
				$.jsonp({
					url: uri,
					callbackParameter: "callback",
					success: function(data) {
						//console.log("DIRECTIONS SUCCESS");
						TargetCA.storeLocator.jsonpSuccess();
						var str = "";
						var time = TargetCA.storeLocator.convertToTime(data.Routes.Route.Itinerary.TotalTravelDuration)
						if (time.h > 0) {
							str = time.h + " " + TargetCA.helpers.translation('heures', 'hours') + " ";
						}
						if (time.m > 0) {
							str += time.m + " " + TargetCA.helpers.translation('minutes', 'minutes') + " ";
						}
						if (time.s > 0) {
							str += time.s + " " + TargetCA.helpers.translation('secondes', 'seconds') + " ";
						}

						TargetCA.storeLocator.getDrivingDirectionsImage(origin, destination, null);

						// Starting Address
						var startingAddress = '<p><span class="startingAddressLabel">' + TargetCA.helpers.translation('Adresse de départ : </span><br />','Starting Address:</span><br /> ') + formattedAddress + '</p>';
						obj.children('.directions').append(startingAddress);

						// Ending Address
						var endingAddress = '<p><span class="endingAddress">' + TargetCA.helpers.translation('Adresse de fin : </span><br />','Ending Address:</span><br /> ') + destination + '</p>';
						obj.children('.directions').append(endingAddress);

						// Reverse Directions Button
						obj.children('.directions').append('<a class="reverse" href="#reverse-directions">'+ TargetCA.helpers.translation('Trajet inverse','Reverse Directions') + '</a>');

						$('.reverse').click(function(e) {
							TargetCA.storeLocator.getDrivingDirections(destination,formattedAddress,obj);
							TargetCA.storeLocator.getDrivingDirectionsImage(destination,origin,obj);
							e.preventDefault();
						});

				// Print Button
				obj.children('.directions').append('<a href="#printDirections" class="popupWindowLink print">' + TargetCA.helpers.translation('Imprimer','Open Print View') + '</a>');

						//Direction Details
						var directionDetails = '<p>' + TargetCA.helpers.translation('Itinéraire en voiture : ', 'Driving Directions: ') + ' <br />' + TargetCA.helpers.translation('Distance ', 'Distance') + ': ' + Math.round(data.Routes.Route.Itinerary.TotalTravelDistance) + 'km<br />' + '' + TargetCA.helpers.translation('Durée ', 'Time') + ': ' + str + '</p>';
						obj.children('.directions').append(directionDetails);

						// For Print Driving Directions
						$('.directionsList').append(directionDetails);

				var route_list_length = data.Routes.Route.Itinerary.ItineraryItem.length;
				var instructions = '<ul>';  // begin directions list
				var print_ins = '<ul>';  // begin print directions

				for(var x = 0; x < route_list_length; x++) {
					var item = x;
					if (x==0) {
						item = "S";
					}

					instructions += '<li class="directions-li"><span class="number">'+ item +"</span> <span class='direction-steps'>" + data.Routes.Route.Itinerary.ItineraryItem[x].Instruction + '</span></li>';

					// For Print Driving Directions
					print_ins += '<li><span>'+ item +"</span> " + data.Routes.Route.Itinerary.ItineraryItem[x].Instruction + '</li>';
				
				}

					instructions += '</ul>';  // close list
					print_ins += '</ul>';  // close list

					obj.children('.directions').append(instructions);
					$('.directionsList').append(instructions);

					// For Print Driving Directions
					$('.directionsPop').append(print_ins);

	
						$('.closestStores .directions .number:first').css('background-color','#2abf07');
						$('.closestStores .directions .number:last').css('background-color','#f50303');
						$('.viewAllStores .directions .number:first').css('background-color','#2abf07');
						$('.viewAllStores .directions .number:last').css('background-color','#f50303');
						// For Print Driving Directions
						$('.printDirections .number:first').css('background-color','#2abf07');
						$('.printDirections .number:last').css('background-color','#f50303');

						// Populate Print Driving Directions
						$(".directionsList").prepend('<p><strong>' + TargetCA.helpers.translation('Adresse de fin : ','Ending Address:</strong> ') + destination + '</p>');
						$(".directionsList").prepend('<p><strong>' + TargetCA.helpers.translation('Adresse de départ : ','Starting Address:</strong> ') + origin + '</p>');

						TargetCA.interactions.popupOpenLink(); // add print button click handler (opens the "print directions" window)
						TargetCA.interactions.printWindow(); // add print button click handler (prints the "print directions" window)
					},
					error: function (xOptions, textStatus) { // runs on error
						TargetCA.storeLocator.jsonpError(textStatus, $('#origin'));
					},
					complete: function(xOptions, textStatus) { // runs after success or error
						obj.children('.loading').css('display','none');
						if ($('.tabs li a.active').parent().hasClass('viewAllStores')) {
							$('#tab2 .accordionContainer .sl-accordion #false').css("display", "none");
						} else {
							$("#filterSection").css("display", "none");
						}
						obj.find('.startingAddressLabel').first().attr("tabindex", -1).focus();
					}
				});
			}
		});
		
		
	}, // End getDrivingDirections function

	// Gets the direction's map image
	getDrivingDirectionsImage: function(origin, destination, obj) {
		var uri = 'http://api.target.com/v2/location/map/road/route/image/driving?mapSize=425,400&origin=' + origin + '&destination=' + destination + '&optimize=time&key=' + this.apigeeKey;
		var img = new Image();
		img.src = uri;
		$('.directionsMap').html(img).attr("alt","Map of directions from " + origin + " to " + destination);
	}, // End getDrivingDirectionsImage function

	// Converts time
	convertToTime: function(secs) {
		var hours = Math.floor(secs / (60 * 60));
		var divisor_for_minutes = secs % (60 * 60);
		var minutes = Math.floor(divisor_for_minutes / 60);
		var divisor_for_seconds = divisor_for_minutes % 60;
		var seconds = Math.ceil(divisor_for_seconds);
		var obj = {
			"h": hours,
			"m": minutes,
			"s": seconds
		};
		return obj;
	} // Ende convertToTime function

} // End storeLocator namespace
