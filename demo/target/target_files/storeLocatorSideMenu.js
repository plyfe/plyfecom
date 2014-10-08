/**
 * @Target.ca Storelocator Side Menu
 * @Side Menu functionality for store locator.
 * @author mark.kimitch@target.com
 */

TargetCA.storeLocatorSideMenu = {
	savedAllStores: [],
	savedStores: [],

	// Init function
	init: function(stores) {
		// this.service(); 
		this.locatorDetails(stores);
		this.savedStores = stores;
		this.tabFunctionality();

	}, // End init function

	// *** TEMPORARY SOLUTION FOR HOLIDAY HOURS DISPLAY *** DELETE ALL THIS AFTER JAN 01 2014 ///
	/*
	service : function() {
		$.ajax({
			url: "/assets/js/data/altHours.js",
			dataType: "json",
			success: function(data) {
				TargetCA.storeLocatorSideMenu.parse(data);
			},
			error: function(xhr, error) {
				TargetCA.storeLocator.jsonpError();
			}
		});
	},
	parse : function(data) {
		var holidayHours = [];
		for(var x = 0; x < data.alt_hours.length; x++) {
			holidayHours.push(data.alt_hours[x]);
		}
		//this needs to be cleared
		this.displayHolidayHours(holidayHours)
	},
	displayHolidayHours : function(data) {
		// find the store and, if there is adjusted holiday hours, display the data from the static list. If not, use apigee data
		for(var q = 0; q < data.length; q++) {
			if (data[q].sWeekdayOpen != null && data[q].sWeekdayOpen != "") {
				$("#store-"+data[q].storeNumber+"-details.storeHoursContainer h3").html(TargetCA.helpers.translation("Heures d’ouverture durant les fêtes","Holiday Store Hours"));
				if (culture == "en") {
					// hours in English format
					$("#store-"+data[q].storeNumber+"-details.storeHoursContainer .locatorLocation.hours_0").html("Mon-Fri: "+ data[q].sWeekdayOpen + " - " + data[q].sWeekdayClose);
					$("#store-"+data[q].storeNumber+"-details.storeHoursContainer .locatorLocation.hours_1").html("Sat: "+ data[q].sSatOpen + " - " + data[q].sSatClose);
					$("#store-"+data[q].storeNumber+"-details.storeHoursContainer .locatorLocation.hours_2").html("Sun: "+ data[q].sSunOpen + " - " + data[q].sSunClose);
				} else {
					// hours in French format
					$("#store-"+data[q].storeNumber+"-details.storeHoursContainer .locatorLocation.hours_0").html("L-V: "+ this.convertTimeToFrench(data[q].sWeekdayOpen) + this.convertTimeToFrench(data[q].sWeekdayClose));
					$("#store-"+data[q].storeNumber+"-details.storeHoursContainer .locatorLocation.hours_1").html("Sam.: "+ this.convertTimeToFrench(data[q].sSatOpen) +  this.convertTimeToFrench(data[q].sSatClose));
					$("#store-"+data[q].storeNumber+"-details.storeHoursContainer .locatorLocation.hours_2").html("Dim.: "+ this.convertTimeToFrench(data[q].sSunOpen) +  this.convertTimeToFrench(data[q].sSunClose));
				}

			} // end if
		} // end for
	},
	// TEMPORARY FIX FOR CONVERTING TIME FORMAT FROM ENGLISH TO FRENCH
	convertTimeToFrench : function(eng_time) {
		// per biz group, none of the hours will need minutes displayed
		var newTime = "";
		newTime = eng_time.replace(':00',' h ');
		newTime = newTime.replace('a.m.','à ');
		newTime = newTime.replace('p.m.','');

		return newTime;
	},	
	*/
	// TEMPORARY FIX FOR HOLIDAY MESSAGING -- check date range and message to display or hide
	showHideHolidayMessage : function(holiday_msg) {
		// hard-coded effective dates for each message type
		var show_holiday = false;		
		// convert string of server date to js date object

		// needs to be manually parsed for IE8 and below 
		var s = serverDate.split(/\D/);
		var this_date = new Date(Date.UTC(s[0], --s[1]||'', s[2]||'', s[3]||'', s[4]||'', s[5]||'', s[6]||''))

		// set date ranges *** TODO -- these are test dates ONLY. Need to update to actual dates before launch
		var xmas_day_start = new Date(2013, 11, 17); // December is month 11 because the months are zero-base indexed
		var xmas_day_end = new Date(2013, 11, 25);
		var xmas_eve_start = new Date(2013, 11, 16);
		var xmas_eve_end = new Date(2013, 11, 24);
		var ny_day_start = new Date(2013, 11, 26);
		var ny_day_end = new Date(2014, 00, 02);
		var ny_eve_start = new Date(2013, 11, 25);
		var ny_eve_end = new Date(2014, 00, 01);
		var box_start = new Date(2013, 11, 18);
		var box_end = new Date(2013, 11, 26);


		if (((holiday_msg.indexOf('Christmas Day') > -1) || (holiday_msg.indexOf('le jour de Noël') > -1)) && (this_date < xmas_day_end) && (this_date > xmas_day_start)) {
			show_holiday = true;			
		}
		if (((holiday_msg.indexOf('Christmas Eve') > -1) || (holiday_msg.indexOf('la veille de Noël') > -1)) && (this_date < xmas_eve_end) && (this_date > xmas_eve_start)) {
			show_holiday = true;			
		}
		if (((holiday_msg.indexOf('Boxing') > -1) || (holiday_msg.indexOf('Ouvert le lendemain') > -1)) && (this_date < box_end) && (this_date > box_start)) {
			show_holiday = true;			
		}
		if (((holiday_msg.indexOf('New Year\'s Day') > -1) || (holiday_msg.indexOf('jour de l’An') > -1)) && (this_date < ny_day_end) && (this_date > ny_day_start)) {
			show_holiday = true;			
		}		
		if (((holiday_msg.indexOf('New Year\'s Eve') > -1) || (holiday_msg.indexOf('du jour de') > -1)) && (this_date < ny_eve_end) && (this_date > ny_eve_start)) {
			show_holiday = true;			
		}	

		/* **** TEMP FIX TO SHOW HOLIDAY MESSAGING *****  */
		/* **** REMOVE THE NEXT LINE (and possibly this function) WHEN THE API HANDLES THIS MESSAGING *****  */
		show_holiday = true;  /// force to be true when not in the above holidays season


		return show_holiday;

	},	


	// *** END TEMP HOLIDAY HOURS MESSAGING FIX ***

	// Handles side nav tab functionality
	tabFunctionality: function() {
		if($(".white-wrap #content").hasClass("store-locator")) {
			$(".gn--view-all-stores").click(function(e){
				e.preventDefault();
				$("li.tab.viewAllStores a").trigger("click");
				if($('.gn').hasClass('open')){
					$('.gn--expand a').trigger('click');
				}
			})
		}
		$('ul.tabs').each(function() {
			// For each set of tabs, we want to keep track of which tab is active and it's associated content
			var $active, $content, $links = $(this).find('a');
			// If the location.hash matches one of the links, use that as the active tab.
			// If no match is found, use the first link as the initial active tab.
			$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
			$active.addClass('active');
			$content = $($active.attr('href'));
			// Hide the remaining content
			$links.not($active).each(function () {
				$($(this).attr('href')).hide();
			});
			// Bind the click event handler
			$(this).on('click', 'a', function(e) {
				e.preventDefault();
				//$(this).click(function(e) {

				// close any infobox that may already be open
				if(TargetCA.bingApi.infobox){TargetCA.bingApi.infobox.setOptions({visible: false});}

				// Make the old tab inactive.
				$active.removeClass('active');
				$content.hide();
				// Update the variables with the new link and content
				$active = $(this);
				$content = $($(this).attr('href'));
				// Make the tab active.
				$active.addClass('active');
				$content.show();
				if(typeof TargetCA.bingApi.map.setView == 'function') {
					if($(".viewAllStores a").hasClass("active")) {
						// Sets up map to display ALL Cananda stores
						TargetCA.storeLocator.compileDynamicAndStaticStores('tab');
						$('#CanadaStores').hide();
						/*
						if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
							$('form#submitLocatorInformation .loc-select-sctn').css("top", "-10px");
						}else{
							$('form#submitLocatorInformation .loc-select-sctn').css("top", "-24px");
						}
						*/
					} else {
						// Sets up map to display closest stores only
						TargetCA.bingApi.setMap('mapDiv',TargetCA.storeLocatorSideMenu.savedStores,1);
						//TargetCA.bingApi.setMap('mapDiv',stores,1);
						TargetCA.bingApi.map.setView({
							center: new Microsoft.Maps.Location(TargetCA.storeLocator.getGeolocation('lat'),TargetCA.storeLocator.getGeolocation('lng')),
							zoom:12
						});
						$('#CanadaStores').show();
						/*
						if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
							var ieversion = navigator.appVersion.match(/MSIE ([\d.]+)/)[1];
							if(ieversion < 10){
								$('form#submitLocatorInformation .loc-select-sctn').css("top", "-32px");
							}else{
								$('form#submitLocatorInformation .loc-select-sctn').css("top", "-48px");
							}
						}else{
							$('form#submitLocatorInformation .loc-select-sctn').css("top", "-48px");
						}
						*/
					}
				}
				// Prevent the anchor's default click action
				e.preventDefault();
			});
		});
		if($(".viewAllStores a").hasClass("active")) {
			$('body,html').animate({
				scrollTop: 0
			}, 100);
		};
		// this has been moved to the interactions.js init to avoid calling it multiple times
		// TargetCA.interactions.storeLocatorAccordion();
		
	}, // End tabFunctionality function

	hrsTranslate: function(dayName) {
		var new_abbrev = dayName;
		var currentPage = window.location.href;

		if (dayName == "M-Fr") { 
			new_abbrev = "Mon-Fri";
			if( ( currentPage.indexOf( '/pharmacy' ) != -1 || currentPage.indexOf( '/brunet' ) != -1 ) && culture == 'fr' ){
				new_abbrev = "Du lundi au vendredi ";
			}
		}
		if (dayName == "Sa") { 
			new_abbrev = "Sat";

			if( ( currentPage.indexOf( '/pharmacy' ) != -1 || currentPage.indexOf( '/brunet' ) != -1 ) && culture == 'fr' ){
				new_abbrev = "Samedi ";
			}
		}
		if (dayName == "Su") { 
			new_abbrev = "Sun"; 
			if( ( currentPage.indexOf( '/pharmacy' ) != -1 || currentPage.indexOf( '/brunet' ) != -1 ) && culture == 'fr' ){
				new_abbrev = "Dimanche ";
			}
		}

		return new_abbrev;
		
	},

	locatorDetails: function(data) {
		$("ol.locator-closest-stores").empty();
		if(!data){
			data = [];
		}
		if(data.length == 0) {
			$("ol.locator-closest-stores").html("<div class='noStoresNearYou'>" + TargetCA.helpers.translation("Malheureusement, il n’y a aucun magasin dans un rayon de 100 km.","Unfortunately, there aren’t any stores within 100km.") + "</div>");
		}

		for(var x = 0; x<data.length;x++) {
			z = x;
			z = z+1;
			$("ol.locator-closest-stores").append(this.addThisStoreToList(data[x],z));
		}

		if( $( '.ieWork' ).length != 0 ){
			$.each( $( '.ieWork' ), function( index, value ){
				$( value ).get(0).placeholder = $( value ).attr( 'placeholder' );
				if( $( 'body' ).hasClass( 'ie9' ) ){
					$( value ).val( $( value ).attr( 'placeholder' ) );
				}
				$( value ).focus( function(){
					if( $( this ).val() == $( this ).attr( 'placeholder' ) ) {
						$( this ).val( '' );
					}
				});
				$( value ).blur( function(){
					if( $( this ).val().length == 0 ){
						$( this ).val( $( this ).attr( 'placeholder' ) );
					}
				});
			});
		}
		
		$(".mapIt").click(function(i) {
			//console.log("clicked closest");
			//var windowHeight = $(window).height();
			var storeNumber = $(this).data('storenumber');
			$('.store-locator').addClass('showingMap');
			//$('#mapDiv').height(windowHeight-110);

			TargetCA.storeLocatorSideMenu.mapIt(storeNumber,'closest');
			//TargetCA.bingApi.toggleLayerVisibility(storeNumber);
			i.preventDefault();
		});

		//-- Directions/Pharms Initial --//
		$('.store-locator-list .storeHoursContainer').hide();
		$('.store-locator-list .pharmHoursContainer').hide();
		$('.store-locator-list .mobileKioskHoursContainer').hide();
		$('.store-locator-list .alternateHours').hide();
		$('.store-locator-list .directionsArea').hide();

		//-- Directions/Pharms Details --//
		$('.store-locator-list .pharm-details-toggle').click(function(e) {
			e.preventDefault();
			//console.log('click');
			var item = $(this).parent();
			item.find('.pharm-details-toggle').text(TargetCA.helpers.translation('Masquer','Hide Details'));
			item.find('.storeHoursContainer').first().toggle();
			item.find('.pharmHoursContainer').first().toggle();
			item.find('.mobileKioskHoursContainer').first().toggle();
			item.find('.alternateHours').first().toggle();
			if(item.find('.storeHoursContainer').is(":visible")) {
				item.find('.directionsArea').first().show();
				$('.store-locator-list .store').show();
				//$($(this).attr('href')).find('h3').first().attr('tabindex',-1).focus();
			} else {
				var offscreen = item.find('.pharm-details-toggle').data("offscreen");
				item.find('.pharm-details-toggle').html(TargetCA.helpers.translation('Renseignements','Details') + "<span class='offscreen'>" + offscreen + "</span>");
				item.find('.directionsArea').first().hide();
			}
			item.find('.directionsArea .directions').first().hide();
			//$(".startingAddressLabel").remove();
			if($('.tabs li a.active').parent().hasClass('viewAllStores')){
				$('#tab2 .accordionContainer .sl-accordion #false').css("display", "block");
			}else{
				$("#filterSection").css("display", "block");
			}
			$(this).focus();
		});

		//-- Driving Directions --//
		$(".store-locator-list .directionForm").submit(function(e){
			$('.store-locator-list .store').hide();
			var item = $(this).parent();
			//console.log(item);
			item.show();
			item.find('.pharm-details-toggle').text(TargetCA.helpers.translation('Retourner aux détails du magasin','Back to store details'));
			var driveStoreAddress = item.children('.address').text() + " " + item.children('.locatorLocation:first').text();
			var origin = e.currentTarget.origin.value;
			var xlat = e.currentTarget.xlat.value;
			var xlong = e.currentTarget.xlong.value;
			//console.log(xlat + "," + xlong);
			item.find('.storeHoursContainer').first().hide();
			item.find('.pharmHoursContainer').first().hide();
			item.find('.mobileKioskHoursContainer').first().hide();
			item.find('.alternateHours').first().hide();
			item.find('.directionsArea').first().show();
			item.find('.directionsArea .directions').first().show();
			TargetCA.bingApi.map.setView({
				center: new Microsoft.Maps.Location(xlat,xlong),
				zoom: 15
			});
			TargetCA.storeLocator.getDrivingDirections(origin,driveStoreAddress,$(this));
			e.preventDefault();

		});

		$('.store-locator #returnToList').click(function(i){
			$('.store-locator').removeClass('showingMap');
			i.preventDefault();
		});
	},
	handleStoreCapabilityIcons : function(name) {
		if (TargetCA.helpers.translation('Uniforme','Uniform') == name) { // Uniform

			something = '<span class="uniformIconImage" title="Uniform"><img src="/assets/images/capability-icons-smaller.png"></span>';

		} else if (TargetCA.helpers.translation('Pharmacie','Pharmacy') == name) { // Pharmacy
			something = '<span class="storeCapabilityspan pharmacyIcon"><img src="/assets/images/storelocator/pharmacy-icon.png" alt="' + TargetCA.helpers.translation('Pharmacie','Pharmacy') + '" title="' + TargetCA.helpers.translation('Pharmacie','Pharmacy') + '"/></span>';
		} else if (TargetCA.helpers.translation('Lunetterie','Optical') == name) { // Optical
			something = '<span class="opticalIconImage" title="Optical"><img src="/assets/images/capability-icons-smaller.png"></span>';
		} else if (TargetCA.helpers.translation('Laboratoire photographique','Photo Lab') == name) { // Photo Lab
			something = '<span class="photoIconImage" title="Photo Lab"><img src="/assets/images/capability-icons-smaller.png"></span>';
		} else if (TargetCA.helpers.translation('Clinique','Clinic') == name) { // CLinic
			something = '<span class="clinicIconImage" title="Clinic"><img src="/assets/images/capability-icons-smaller.png"></span>';
		} else if (TargetCA.helpers.translation('Studio de photographie','Portrait') == name) { // Portrait
			something = '<span class="portraitIconImage" title="Portrait"><img src="/assets/images/capability-icons-smaller.png"></span>';
		} else if (TargetCA.helpers.translation('Produits frais','Fresh Grocery') == name) { // Fresh Grocery
			something = '<span class="groceryIconImage" title="Fresh Grocery"><img src="/assets/images/capability-icons-smaller.png"></span>';
		} else if (TargetCA.helpers.translation('Vaccination antigrippale','Flu Shot') == name) { // Flu Shot
			something = '<span class="fluIconImage" title="Flu Shot"><img src="/assets/images/capability-icons-smaller.png"></span>';
		} else if (TargetCA.helpers.translation('Kiosque de téléphonie mobile','Mobile Kiosk') == name) { // Mobile Kiosk
			something = '<span class="mobileIconImage" title="Mobile Kiosk"><img src="/assets/images/capability-icons-smaller.png"></span>';
		} else if (TargetCA.helpers.translation('Magasin Apple en magasin','In-Store Apple Store') == name) { // In-Store Apple Store (currently not a useable filter)
			something = ' '; // Has to be a space, otherwise 'undefined' is returned
		} else if (TargetCA.helpers.translation('Vin','Wine') == name) { // Wine
			something = '<span class="wineIconImage" title="Wine"><img src="/assets/images/capability-icons-smaller.png"></span>';
		} else if (TargetCA.helpers.translation('Starbucks','Starbucks') == name) { // Starbucks
			something = '<span class="starbucksIconImage" title="Starbucks"><img src="/assets/images/capability-icons-smaller.png"></span>';

			// something = ' '; // Has to be a space, otherwise 'undefined' is returned
		} else if (TargetCA.helpers.translation('Accepte les coupons WIC','Accepts WIC') == name) { // Accepts WIC (currently not a useable filter)
			something = ' '; // Has to be a space, otherwise 'undefined' is returned
		} else {
			something = ' '; // Has to be a space, otherwise 'undefined' is returned
		}
		if (something) {
			return something;
		}
	},
	addThisStoreToList: function(stores,int,source) {

		var newStore = '';
		newStore += "<li class='store'>";
		if (!source) {
			newStore += "<span class='locatorCount'>" + int + "</span>";
		}
		// Store Name and Address
		newStore += "<h3 class='locatorStoreName'>" + stores.Name + "</h3>";
		if (stores.Address.MallName != undefined) {	newStore += "<p class='address'>" + stores.Address.MallName + "</p>"; }
		newStore += "<p class='address'>" + stores.Address.AddressLine1 + "</p>";
		newStore += "<p class='locatorLocation'>" + stores.Address.City + ", " + stores.Address.Subdivision + " " + stores.Address.PostalCode + /*" " + stores.Address.CountryName + */ "</p>";

		// Store Distance
		newStore += "<p class='difference'>";
		var distanceTest = stores.difference
		if(stores.difference != undefined) {
			newStore +=  Math.round(stores.difference*100)/100 + " km";
		}
		newStore += "</p>";

		// Store Telephone Number
		if (stores.TelephoneNumber) {
			for (var i = 0; i < stores.TelephoneNumber.length; i++) {
				if (stores.TelephoneNumber[i].FunctionalTypeDescription == TargetCA.helpers.translation('Main','Main')) {
					if (stores.TelephoneNumber[i].PhoneNumber) {
						if (TargetCA.navigation.width < 1025) {
							newStore += "<p class='locatorLocation'>" + TargetCA.helpers.translation("Magasin : ","Store: ") + "<a href='tel://1-" + stores.TelephoneNumber[i].PhoneNumber + "'>" + stores.TelephoneNumber[i].PhoneNumber + "</a></p>";
						} else {
							newStore += "<p class='locatorLocation'>" + TargetCA.helpers.translation("Magasin : ","Store: ") + stores.TelephoneNumber[i].PhoneNumber + "</p>";
						}
					}
				}
			}
		}

		// Pharmacy Telephone Number
		if (stores.Capability) {

			stores.Capability = $.makeArray(stores.Capability);

			for (var i = 0; i < stores.Capability.length; i++) {
				if (stores.Capability[i].CapabilityName == TargetCA.helpers.translation('Pharmacie','Pharmacy')) {
					if (stores.Capability[i].TelephoneNumber) {
						 
						stores.Capability[i].TelephoneNumber = $.makeArray(stores.Capability[i].TelephoneNumber);

							for (var x = 0; x < stores.Capability[i].TelephoneNumber.length; x++) {
								if (stores.Capability[i].TelephoneNumber[x]['FunctionalTypeDescription'] == 'Main') {
									if (TargetCA.navigation.width < 1025) {
										newStore += "<p class='locatorLocation'>" + TargetCA.helpers.translation("Pharmacie : ","Pharmacy: ") + "<a href='tel://1-" + stores.Capability[i].TelephoneNumber[x]['PhoneNumber'] + "'>" + stores.Capability[i].TelephoneNumber[x]['PhoneNumber'] + "</a></p>";
									} else {
										newStore += "<p class='locatorLocation'>" + TargetCA.helpers.translation("Pharmacie : ","Pharmacy: ") + stores.Capability[i].TelephoneNumber[x]['PhoneNumber'] + "</p>";
									}
								}
							} // end for loop
						}
					}
				} // end for loop
			} // end Pharmacy Phone

		// Capability Icon
		if (stores.Capability) {
			newStore += '<div class="storeCapability">';
			

				stores.Capability = $.makeArray(stores.Capability);

				for (var i = 0; i < stores.Capability.length; i++) {
					newStore += this.handleStoreCapabilityIcons(stores.Capability[i].CapabilityName);
				}
			
			newStore += '</div>';
		}

		// Display when the store is opening, if it hasn't opened yet
		if (stores.storeLocatorOpenDate) {
			newStore += "<p class='locatorOpening'>" + TargetCA.helpers.translation("Ouverture à la fin de l’automne 2013","opening Late Fall 2013") + "</p>";
		} else { // Display the details button
			var offscreen = TargetCA.helpers.translation('du ','about ') + stores.Name;
			newStore += "<a class='pharm-details-toggle' href='#store-" + stores.ID + "-details' data-offscreen='" + offscreen + "' data-storeNumber='" + stores.ID + "'>" + TargetCA.helpers.translation('Renseignements','Details') + " <span class='offscreen'>" + offscreen + "</span></a>";
		}

		// Map it button
		newStore += "<a class='mapIt' href='#store-" + stores.ID + "' data-storeNumber='" + stores.ID + "'>" + TargetCA.helpers.translation("Carte ", "map it ") + "<span class='offscreen'> " + TargetCA.helpers.translation("Indiquer ","Locate ") + stores.Name + TargetCA.helpers.translation(" sur la carte"," on the map") + "</span></a>";


		// Store Hours
			if (stores.OperatingHours) {
				newStore += '<div id="store-' + stores.ID + '-details" class="storeHoursContainer">';
				newStore += '<h3 class="locatorHoursTitle">' + TargetCA.helpers.translation("Horaire du magasin","Store Hours") + '</h3>';
				for (var z = 0; z < stores.OperatingHours['Hours'].length; z++) {
					newStore += '<p class="locatorLocation hours_'+z+'">' + stores.OperatingHours['Hours'][z]['ShortName'] + ' : ' + stores.OperatingHours['Hours'][z]['TimePeriod']['Summary'] + '</p>';
				}

				newStore += '</div>';
			}


		// Pharmacy Hours
		if (stores.Capability) {
			var hrsAbbrev = "";
			var pharmData =  TargetCA.pharmacy.getPharmData();

			// if store has more than one Capability
		
				stores.Capability = $.makeArray(stores.Capability);

				for (var i = 0; i < stores.Capability.length; i++) {
					if (stores.Capability[i].CapabilityName == TargetCA.helpers.translation('Pharmacie','Pharmacy')) {
						newStore += '<div class="pharmHoursContainer">';
						newStore += '<h3 class="locatorHoursTitle">' + TargetCA.helpers.translation("Horaire de la pharmacie","Pharmacy Hours") + '</h3>';
						if(stores.Capability[i].OperatingHours){
							for (var z = 0; z < stores.Capability[i].OperatingHours['Hours'].length; z++) {
								hrsAbbrev = TargetCA.storeLocatorSideMenu.hrsTranslate(stores.Capability[i].OperatingHours['Hours'][z]['ShortName']);
								newStore += '<p class="locatorLocation">' + hrsAbbrev + ': ' + stores.Capability[i].OperatingHours['Hours'][z]['TimePeriod']['Summary'] + '</p>';
							}
						}

							newStore += '<div class="pharmDetailsLink">';

							if (stores.Address.Subdivision == 'QC') {  
								
								var brunet_ID = "";
								for (var q = 0; q < pharmData.Pharms.length; q++) {
									if (pharmData.Pharms[q].StoreNumber == stores.ID && pharmData.Pharms[q].brunetID != "") {
										newStore += '<a href="http://www.brunet.ca/en/find-pharmacy/sheet.html?id='+ pharmData.Pharms[q].brunetID +'" class="brunet_'+ stores.ID +'">' + TargetCA.helpers.translation("Renseignements sur le Brunet","Brunet Details") + '</a>';
									}
								}
														
							} else {

								newStore += '<a href="/' + TargetCA.helpers.translation('fr','en') + '/pharmacy/details?storeNumber=' + stores.ID + '" class="">' + TargetCA.helpers.translation("Renseignements sur le pharmacien","Pharmacy Details") + '</a>';	
							}				

							newStore += '</div>';
							newStore += '</div>';
					} // end pharmacy info

					// begin mobile kiosk info
					if (stores.Capability[i].CapabilityName == TargetCA.helpers.translation('Kiosque de téléphonie mobile','Mobile Kiosk')) { 

						newStore += '<div class="mobileKioskHoursContainer">';
						newStore += '<h3 class="locatorHoursTitle">' + TargetCA.helpers.translation("Horaire de la Kiosque de téléphonie mobile","Mobile Kiosk Hours") + '</h3>';
						if(stores.Capability[i].OperatingHours){
							for (var zz = 0; zz < stores.Capability[i].OperatingHours['Hours'].length; zz++) {
								hrsAbbrev = TargetCA.storeLocatorSideMenu.hrsTranslate(stores.Capability[i].OperatingHours['Hours'][zz]['ShortName']);
								newStore += '<p class="locatorLocation">' + hrsAbbrev + ': ' + stores.Capability[i].OperatingHours['Hours'][zz]['TimePeriod']['Summary'] + '</p>';
							}
						}

							newStore += '</div>';
							newStore += '</div>';	
					} // end pharmacy info					
	
				}
			
		} // outer if 

		// Holiday Message provided via apigee data
		if (stores.AlternateOperatingHours) {
			if (stores.AlternateOperatingHours.Hours) {
				newStore += '<div class="alternateHours">';

					stores.AlternateOperatingHours.Hours = $.makeArray(stores.AlternateOperatingHours.Hours);
					
					for (var i = 0; i < stores.AlternateOperatingHours.Hours.length; i++) {

						newStore += '<h3 class="holidayMessage">';

						var holiday_array = stores.AlternateOperatingHours.Hours[i].TextMessage.split(',');
						var holiday_array_length = holiday_array.length;

						for (var q = 0; q < holiday_array_length; q++) {
							if (TargetCA.storeLocatorSideMenu.showHideHolidayMessage(holiday_array[q])) {
								newStore += holiday_array[q] + '<br />';
							}  // if							
						} // for

						newStore += '</h3>';

					} // for
				

				newStore += '</div>';
			} // if
		}  // end Holiday Messaging outer if

		// Directions input
		if (!stores.storeLocatorOpenDate) {
			var placeholderCopy = '<input type="text" id="origin" placeholder="' + TargetCA.helpers.translation('Adresse de départ','starting address') + '"></input>';
			if( $( 'body' ).hasClass( 'ie9' ) || $( 'body' ).hasClass( 'ie8' ) ){
				placeholderCopy = $( '.placeholderIEFix' ).html();
			}
			newStore += '<form class="directionsArea directionForm" method="#">' + '<h3 class="locatorHoursTitle">' + TargetCA.helpers.translation("Itinéraire en voiture","Driving Directions") + '</h3>' + '<label for="origin" class="offscreen">starting address</label>' + placeholderCopy + '<input type="hidden" id="xlat" value="' + stores.Address.Latitude + '" />' + '<input type="hidden" id="xlong" value="' + stores.Address.Longitude + '" />' + '<div class="submitBttnWrapper"><input class="gobtn" type="image" alt="' + TargetCA.helpers.translation('Itinéraire','go') + '" value="go" src="/assets/images/blank.gif"><img alt="" src="/assets/images/sprite-main.png"></div>' + '<div class="loading"></div>' + '<div class="directions"></div>' + '</form>';
		}
		newStore += "</li>";
		// Return list of stores
		return newStore;
	},
	parseProvinces: function(province) {
		var results = [];
		if (province != null){
			for(var x=0; x<TargetCA.storeLocator.provinces[province].length; x++) {
				results.push(this.getSpecificStore(TargetCA.storeLocator.provinces[province][x]));
			}
		} else {
			for(var x=0; x<TargetCA.storeLocator.provinces[province].length; x++) {
				results.push(this.getSpecificStore(TargetCA.storeLocator.provinces[province][x]));
			}
		}
		return results;
	},
	setAllStores: function() {
		var AB = this.parseProvinces('AB');
		for (var x=0; x<AB.length; x++) {
			$(".province-AB").append(this.addThisStoreToList(AB[x],null,1));
		}
		var BC = this.parseProvinces('BC');
		for (var x=0; x<BC.length; x++) {
			$(".province-BC").append(this.addThisStoreToList(BC[x],null,1));
		}
		var MB = this.parseProvinces('MB');
		for (var x=0; x<MB.length; x++) {
			$(".province-MB").append(this.addThisStoreToList(MB[x],null,1));
		}
		var NB = this.parseProvinces('NB');
		for (var x=0; x<NB.length; x++) {
			$(".province-NB").append(this.addThisStoreToList(NB[x],null,1));
		}
		var NL = this.parseProvinces('NL');
		for (var x=0; x<NL.length; x++) {
			$(".province-NL").append(this.addThisStoreToList(NL[x],null,1));
		}
		var NS = this.parseProvinces('NS');
		for (var x=0; x<NS.length; x++) {
			$(".province-NS").append(this.addThisStoreToList(NS[x],null,1));
		}
		var ON = this.parseProvinces('ON');
		for (var x=0; x<ON.length; x++) {
			$(".province-ON").append(this.addThisStoreToList(ON[x],null,1));
		}
		var PE = this.parseProvinces('PE');
		for (var x=0; x<PE.length; x++) {
			$(".province-PE").append(this.addThisStoreToList(PE[x],null,1));
		}
		var QC = this.parseProvinces('QC');
		for (var x=0; x<QC.length; x++) {
			$(".province-QC").append(this.addThisStoreToList(QC[x],null,1));
		}
		var SK = this.parseProvinces('SK');
		for (var x=0; x<SK.length; x++) {
			$(".province-SK").append(this.addThisStoreToList(SK[x],null,1));
		}

		if( $( '.ieWork' ).length != 0 ){
			$.each( $( '.ieWork' ), function( index, value ){
				$( value ).get(0).placeholder = $( value ).attr( 'placeholder' );
				if( $( 'body' ).hasClass( 'ie9' ) ){
					$( value ).val( $( value ).attr( 'placeholder' ) );
				}
				$( value ).focus( function(){
					if( $( this ).val() == $( this ).attr( 'placeholder' ) ) {
						$( this ).val( '' );
					}
				});
				$( value ).blur( function(){
					if( $( this ).val().length == 0 ){
						$( this ).val( $( this ).attr( 'placeholder' ) );
					}
				});
			});
		}

		$(".mapIt").click(function(i){
			//console.log("clicked");
			var storeNumber = $(this).attr('data-storenumber');
			$('.store-locator').addClass('showingMap');
			TargetCA.storeLocatorSideMenu.mapIt(storeNumber,'all');
			i.preventDefault();
		});

		//-- Directions/Pharms Initial --//
		$('.viewAllStores .storeHoursContainer').hide();
		$('.viewAllStores .pharmHoursContainer').hide();
		$('.viewAllStores .mobileKioskHoursContainer').hide();
		$('.viewAllStores .alternateHours').hide();
		$('.viewAllStores .directionsArea').hide();

		//-- Directions/Pharms Details --//
		$('.viewAllStores .pharm-details-toggle').click(function(e) {
			e.preventDefault();
			var item = $(this).parent();
			item.find('.pharm-details-toggle').text(TargetCA.helpers.translation('Masquer','Hide Details'));
			item.find('.storeHoursContainer').first().toggle();
			item.find('.pharmHoursContainer').first().toggle();
			item.find('.mobileKioskHoursContainer').first().toggle();
			item.find('.alternateHours').first().toggle();
			if(item.find('.storeHoursContainer').is(":visible")) {
				item.find('.directionsArea').first().show();
				$('.viewAllStores .store').show();
			} else {
				item.find('.pharm-details-toggle').text(TargetCA.helpers.translation('Renseignements','Details'));
				item.find('.directionsArea').first().hide();
			}
			item.find('.directionsArea .directions').first().hide();
			if($('.tabs li a.active').parent().hasClass('viewAllStores')){
				$('#tab2 .accordionContainer .sl-accordion #false').css("display", "block");
			}else{
				$("#filterSection").css("display", "block");
			}
			$(this).focus();
		});

		//-- Driving Directions --//
		$(".viewAllStores .directionForm").submit(function(e){
			var item = $(this).parent();
			var list = $(this).parent().parent().parent().parent();
			//console.log(list);
			item.parent().children('li').hide();
			list.parent().children('li').hide();
			item.show();
			list.show();
			item.find('.pharm-details-toggle').text(TargetCA.helpers.translation('Retourner aux détails du magasin','Back to store details'));
			var driveStoreAddress = item.children('.address').text() + " " + item.children('.locatorLocation:first').text();
			var origin = e.currentTarget.origin.value;
			var xlat = e.currentTarget.xlat.value;
			var xlong = e.currentTarget.xlong.value;
			//console.log(xlat + "," + xlong);
			item.find('.storeHoursContainer').first().hide();
			item.find('.pharmHoursContainer').first().hide();
			item.find('.mobileKioskHoursContainer').first().hide();
			item.find('.alternateHours').first().hide();
			item.find('.directionsArea').first().show();
			item.find('.directionsArea .directions').first().show();
			TargetCA.bingApi.map.setView({
				center: new Microsoft.Maps.Location(xlat,xlong),
				zoom: 15
			});
			TargetCA.storeLocator.getDrivingDirections(origin,driveStoreAddress,$(this));
			e.preventDefault();
		});

		$('.store-locator #returnToList').click(function(i){
			$('.store-locator').removeClass('showingMap');
			i.preventDefault();
		});
	},
	loadAllStoresSideNav : function(data) {
		for (var x=0; data.length > x; x++) {
			TargetCA.storeLocator.provinces[data[x].Address.Subdivision].push(data[x].ID);
		}

		TargetCA.storeLocatorSideMenu.savedAllStores[0] = null;
		TargetCA.storeLocatorSideMenu.savedAllStores[0] = data;
		TargetCA.storeLocatorSideMenu.setAllStores();
		// TargetCA.storeLocatorSideMenu.service();  -- delete this end of January 2014
	},
	mobileMapToggle: function(){
		$('.mapIt').click(function(i) {
		});
	},
	mapIt: function(storeNumber,flag) {
		//console.log('mapIt');
		var store = this.getSpecificStore(storeNumber,flag);
		TargetCA.bingApi.map.setView({
			center: new Microsoft.Maps.Location(store.Address.Latitude,store.Address.Longitude),
			zoom:13,
			callback: focusPin(storeNumber)
		});
		if(TargetCA.navigation.width < 1024){
			$('body,html').animate({
				scrollTop: 0
			}, 100);
		}
		function focusPin(storeNumber){
			// Set focus to appropriate pin
		    var focus_pin = window.setInterval(function(){
	            $('#store-'+storeNumber).focus();
	            if($('#store-'+storeNumber).is(':focus')){
            		clearInterval(focus_pin);
            	}
		    },100);
		}
	},
	getSpecificStore: function(sn,flag) {
		if (flag == 'closest') {
			var storeInfo;
			$.each(TargetCA.storeLocatorSideMenu.savedStores, function(i){
				if(sn == TargetCA.storeLocatorSideMenu.savedStores[i].ID) {
					storeInfo = TargetCA.storeLocatorSideMenu.savedStores[i];
				}
			});
			return storeInfo;
		} else {
			var storeInfo;
			$.each(TargetCA.storeLocatorSideMenu.savedAllStores[0], function(i){
				if(sn == TargetCA.storeLocatorSideMenu.savedAllStores[0][i].ID) {
					storeInfo = TargetCA.storeLocatorSideMenu.savedAllStores[0][i];
				}
			});
			return storeInfo;
		}
	},
}