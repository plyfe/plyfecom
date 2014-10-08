/**
 * @Target.ca Bing API
 * @Interaction with Bing API from target.ca storelocator
 * @author mark.kimitch@target.com
 */

TargetCA.bingApi = {
	apiKey : 'As1dpaLNUYaANWGwOnKtebaElZh62khGltzZcH82ZGgkY3NnjlWMgXOJytPhc-f0',
	eventlistener : false,
	infobox : null,
	infoboxLayer : null,
	map : {
		item : null,
		infobox : new Object(),
		dataLayer : new Object()
	},
	oPins : [],
	pin : [],
	windowHeight : null,

	// init function
	init: function(stores) {
		if( $( '#mapDiv' ).length != 0 ){
			this.setMap('mapDiv',stores,1);
		}
		TargetCA.storeLocatorSideMenu.mobileMapToggle(); //switch between map and list on mobile
		TargetCA.bingApi.updatePlaceName();
	}, // End init function

	// Return latitude
	latitude: function() {
		if (TargetCA.storeLocator.getGeoLocation('lat') == null) {
			return 43.6481;
		} else {
			return TargetCA.storeLocator.getGeoLocation('lat');
		}
	}, // End latitude

	// Return longitude
	longitude: function() {
		if (TargetCA.storeLocator.getGeoLocation('lng') == null) {
			return -79.4042;
		} else {
			return TargetCA.storeLocator.getGeoLocation('lng');
		}
	}, // End longitude

	// Sets up the Bing map
	setMap: function(div, stores, type, view) {
		//this.map.entities.clear();
		$('.MapPushpinBase').remove();
		Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', {
			callback: function() {
				TargetCA.bingApi.map = new Microsoft.Maps.Map(document.getElementById(div),{
					credentials: TargetCA.bingApi.apiKey,
					center: new Microsoft.Maps.Location(TargetCA.storeLocator.latitude,TargetCA.storeLocator.longitude),
					mapTypeId: Microsoft.Maps.MapTypeId.road,
					zoom: 12,
					theme: new Microsoft.Maps.Themes.BingTheme(),
					enableSearchLogo: false,
					enableClickableLogo: false,
					c: TargetCA.helpers.translation('fr-CA', 'en-US'),
					disableKeyboardInput: true, // Disables default keyboard controls
				    showDashboard: false, // Disables default visual controls
				    disableZooming: true // Prevents user from accidentally zooming with mouse.
				});
				// Creates entity layers for the two kinds of pushpins (numbered vs when the map pans)
				var layer1 = new Microsoft.Maps.EntityCollection();
				var layer2 = new Microsoft.Maps.EntityCollection();

				// This block of code will probably be removed to accommodate accessibility code
				TargetCA.bingApi.map.blur();
				Microsoft.Maps.Events.addHandler(TargetCA.bingApi.map, 'mouseover', function(e) {
					TargetCA.bingApi.map.focus();
				});
				Microsoft.Maps.Events.addHandler(TargetCA.bingApi.map, 'mouseout', function(e) {
					TargetCA.bingApi.map.blur();
				});

				TargetCA.bingApi.infoboxLayer = new Microsoft.Maps.EntityCollection();

				TargetCA.bingApi.infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), {
					typeName: Microsoft.Maps.InfoboxType.standard,
					showPointer: true,
					visible: true,
					offset: new Microsoft.Maps.Point(0, 20),
					zIndex: 999
				});

				Microsoft.Maps.Events.addHandler(TargetCA.bingApi.map, 'tiledownloadcomplete', TargetCA.bingApi.mapReady(stores));
				TargetCA.bingApi.infoboxLayer.push(TargetCA.bingApi.infobox);
				TargetCA.bingApi.map.entities.push(TargetCA.bingApi.infoboxLayer);

				TargetCA.bingApi.addPins(stores,type,view,TargetCA.bingApi.pin);

				if ($(".viewAllStores a").hasClass("active")) {
					// Do nothing
				} else {
					//Use a throttled event to reduce the number of unwanted events being fired.
					Microsoft.Maps.Events.addThrottledHandler(TargetCA.bingApi.map,'viewchangeend',TargetCA.bingApi.getMapBounds,250);
				}
				TargetCA.bingApi.visualControls(div); // enables custom visual controls
				TargetCA.bingApi.keyboardControls(div); // enables custom keyboard controls
				Microsoft.Maps.Events.addHandler(TargetCA.bingApi.map, 'tiledownloadcomplete', TargetCA.bingApi.mapReady(stores));
				Microsoft.Maps.Events.addHandler(TargetCA.bingApi.map, 'targetviewchanged', TargetCA.bingApi.mapReady(stores));
			}
		});
		$('.store-locator-list').animate({
			scrollTop: 0
		}, 100);
	}, // End setMap function
	visualControls: function(div){
	    var mapCenter,
	        zoomLevel,
	        panFactor,
	        $mapCanvas = $('#' + div),
	        $controls = $('<form />',{
	            'class': 'controls',
	            'action': '#',
	            'name': 'controls'
	        }),
	        $controlsPan = $('<div />',{
	            'class': 'pan'
	        }),
	        $controlsUp = $('<button />',{
	            'name': 'pan-up',
	            'class': 'pan-up',
	            click: function(e) {
	                e.preventDefault();
	                mapCenter = TargetCA.bingApi.map.getCenter();
	                zoomLevel = TargetCA.bingApi.map.getZoom();
	                panFactor = 1 / zoomLevel;
	                // latitude +
	                TargetCA.bingApi.map.setView({
	                    animate: true,
	                    center: {
	                        latitude: mapCenter.latitude + panFactor,
	                        longitude: mapCenter.longitude
	                    }
	                });
	            }
	        }),
	        $controlsLeft = $('<button />',{
	            'name': 'pan-left',
	            'class': 'pan-left',
	            click: function(e) {
	                e.preventDefault();
	                mapCenter = TargetCA.bingApi.map.getCenter();
	                zoomLevel = TargetCA.bingApi.map.getZoom();
	                panFactor = 1 / zoomLevel;
	                // longitude -
	                TargetCA.bingApi.map.setView({
	                    animate: true,
	                    center: {
	                        latitude: mapCenter.latitude,
	                        longitude: mapCenter.longitude - panFactor
	                    }
	                });
	            }
	        }),
	        $controlsRight = $('<button />',{
	            'name': 'pan-right',
	            'class': 'pan-right',
	            click: function(e) {
	                e.preventDefault();
	                mapCenter = TargetCA.bingApi.map.getCenter();
	                zoomLevel = TargetCA.bingApi.map.getZoom();
	                panFactor = 1 / zoomLevel;
	                // longitude +
	                TargetCA.bingApi.map.setView({
	                    animate: true,
	                    center: {
	                        latitude: mapCenter.latitude,
	                        longitude: mapCenter.longitude + panFactor
	                    }
	                });
	            }
	        }),
	        $controlsDown = $('<button />',{
	            'name': 'pan-down',
	            'class': 'pan-down',
	            click: function(e) {
	                e.preventDefault();
	                mapCenter = TargetCA.bingApi.map.getCenter();
	                zoomLevel = TargetCA.bingApi.map.getZoom();
	                panFactor = 1 / zoomLevel;
	                // latitude -
	                TargetCA.bingApi.map.setView({
	                    animate: true,
	                    center: {
	                        latitude: mapCenter.latitude - panFactor,
	                        longitude: mapCenter.longitude
	                    }
	                });
	            }
	        }),
	        $controlsZoom = $('<div />',{
	            'class': 'zoom'
	        }),
	        $controlsBearing = $('<img />',{
	            'src': '/assets/images/bearing.png',
	            'class': 'bearing'
	        }),
	        $controlsOut = $('<button />',{
	            'name': 'zoom-out',
	            'class': 'zoom-out',
	            click: function(e) {
	                e.preventDefault();
	                mapCenter = TargetCA.bingApi.map.getCenter();
	                zoomLevel = TargetCA.bingApi.map.getZoom();
	                // zoom out
	                TargetCA.bingApi.map.setView({
	                    animate: true,
	                    zoom: zoomLevel - 1
	                });
	            }
	        }),
	        $controlsIn = $('<button />',{
	            'name': 'zoom-in',
	            'class': 'zoom-in',
	            click: function(e) {
	                e.preventDefault();
	                mapCenter = TargetCA.bingApi.map.getCenter();
	                zoomLevel = TargetCA.bingApi.map.getZoom();
	                // zoom in
	                TargetCA.bingApi.map.setView({
	                    animate: true,
	                    zoom: zoomLevel + 1
	                });
	            }
	        }),
	        labels = {
	            bearing: {
	                en: 'Map bearing is North',
	                fr: 'Portant Carte est nord'
	            },
	            panUp: {
	                en: 'Pan up',
	                fr: 'Pan carte vers le haut'
	            },
	            panRight: {
	                en: 'Pan right',
	                fr: 'Pan carte à droite'
	            },
	            panDown: {
	                en: 'Pan down',
	                fr: 'Pan carte vers le bas'
	            },
	            panLeft: {
	                en: 'Pan left',
	                fr: 'Pan carte à gauche'
	            },
	            zoomIn: {
	                en: 'Zoom in',
	                fr: 'Zoomer sur la carte'
	            },
	            zoomOut: {
	                en: 'Zoom out',
	                fr: 'Zoom arrière de la carte'
	            }
	        },
	        language = $('html').attr('lang');

	    // Create the controls

	    // Zoom controls
	    $controlsIn.append('<img src="/assets/images/zoom-in.png">');
	    $controlsOut.append('<img src="/assets/images/zoom-out.png">');

	    $controlsZoom.append($controlsOut, $controlsIn);
	    $controls.append($controlsZoom);

	    // Pan controls
	    $controlsUp.append('<img src="/assets/images/pan-up.png">');
	    $controlsLeft.append('<img src="/assets/images/pan-left.png">');
	    $controlsRight.append('<img src="/assets/images/pan-right.png">');
	    $controlsDown.append('<img src="/assets/images/pan-down.png">');

	    $controlsPan.append($controlsUp, $controlsLeft, $controlsBearing, $controlsRight, $controlsDown);
	    $controls.append($controlsPan);

	    // Set the appropriate alt text based on language
	    $controlsBearing.attr('alt',labels.bearing[language]);
	    $controlsIn.attr('aria-label',labels.zoomIn[language]).find('img').attr('alt',labels.zoomIn[language]);
	    $controlsOut.attr('aria-label',labels.zoomOut[language]).find('img').attr('alt',labels.zoomOut[language]);
	    $controlsUp.attr('aria-label',labels.panUp[language]).find('img').attr('alt',labels.panUp[language]);
	    $controlsLeft.attr('aria-label',labels.panLeft[language]).find('img').attr('alt',labels.panLeft[language]);
	    $controlsRight.attr('aria-label',labels.panRight[language]).find('img').attr('alt',labels.panRight[language]);
	    $controlsDown.attr('aria-label',labels.panDown[language]).find('img').attr('alt',labels.panDown[language]);

	    // Add to the page
	    $mapCanvas.prepend($controls);
	}, // end visual controls function
	keyboardControls: function(div){
	    $(document).keydown(function(e){
	        if($('#' + div).find(':focus').length > 0){
	            // If the keycode isn't in this group, stop right here
	            if ([27, 37, 38, 39, 40, 109, 189, 219, 107, 187, 221].indexOf(e.keyCode) == -1) {
	                return;
	            }

	            e.preventDefault();
	            e.stopPropagation();

	            var mapCenter = TargetCA.bingApi.map.getCenter(),
	                zoomLevel = TargetCA.bingApi.map.getZoom(),
	                panFactor = 1 / zoomLevel;

	            switch(e.keyCode) {
	                case 27: // esc
	                    // close infobox
	                    var storeId = $('.infobox-close').attr('href').substring(1),
	                        storeInfo = TargetCA.bingApi.getSpecificStore(storeId);
	                    TargetCA.bingApi.infobox.setOptions({ visible: false });
	                    $('.pin-'+storeInfo.storeIndex).focus();
	                    break;
	                case 37: // left arrow
	                    // longitude -
	                    TargetCA.bingApi.map.setView({
	                        animate: true,
	                        center: {
	                            latitude: mapCenter.latitude,
	                            longitude: mapCenter.longitude - panFactor
	                        }
	                    });
	                    break;
	                case 38: // up arrow
	                    // latitude +
	                    TargetCA.bingApi.map.setView({
	                        animate: true,
	                        center: {
	                            latitude: mapCenter.latitude + panFactor,
	                            longitude: mapCenter.longitude
	                        }
	                    });
	                    break;
	                case 39: // right arrow
	                    // longitude +
	                    TargetCA.bingApi.map.setView({
	                        animate: true,
	                        center: {
	                            latitude: mapCenter.latitude,
	                            longitude: mapCenter.longitude + panFactor
	                        }
	                    });
	                    break;
	                case 40: // down arrow
	                    // latitude -
	                    TargetCA.bingApi.map.setView({
	                        animate: true,
	                        center: {
	                            latitude: mapCenter.latitude - panFactor,
	                            longitude: mapCenter.longitude
	                        }
	                    });
	                    break;
	                case 109: // numpad -
	                case 189: // minus
	                case 219: // open bracket
	                    // zoom out
	                    TargetCA.bingApi.map.setView({
	                        animate: true,
	                        zoom: zoomLevel - 1
	                    });
	                    break;
	                case 107: // numpad +
	                case 187: // equal
	                case 221: // close bracket
	                    // zoom in
	                    TargetCA.bingApi.map.setView({
	                        animate: true,
	                        zoom: zoomLevel + 1
	                    });
	                    break;
	            }
	        }
	    });
	}, // end keyboard controls function
	// Gets information about the map being displayed
	getMapBounds : function() {
		var mapBounds = TargetCA.bingApi.map.getBounds();
		var mapEast = TargetCA.bingApi.map.getBounds().getEast();
		var mapWest = TargetCA.bingApi.map.getBounds().getWest();
		var mapNorth = TargetCA.bingApi.map.getBounds().getNorth();
		var mapSouth = TargetCA.bingApi.map.getBounds().getSouth();
		var mapZoom = TargetCA.bingApi.map.getZoom();
		var mapCenter = TargetCA.bingApi.map.getCenter();
		var mapCenterLat = mapCenter.latitude;
		var mapCenterLng = mapCenter.longitude;

		TargetCA.bingApi.findDistance(mapEast,mapWest,mapNorth,mapSouth,mapCenterLat,mapCenterLng);
	}, // End getMapBounds

	// Find the distance between two points, and calculate the map's radius from there
	findDistance : function(east, west, north, south, lat, lng) {
		//var meanLat =  (north + south)/2;
		//6372 * Math.cos(meanLat/180*Math.PI);
		var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
		var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator

		var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km;

		// get values for lat1, lon1, lat2, and lon2
		t1 = north;
		n1 = east;
		t2 = south;
		n2 = west;

		// convert coordinates to radians
		lat1 = this.deg2rad(t1);
		lon1 = this.deg2rad(n1);
		lat2 = this.deg2rad(t2);
		lon2 = this.deg2rad(n2);

		// find the differences between the coordinates
		dlat = lat2 - lat1;
		dlon = lon2 - lon1;

		// here's the heavy lifting
		a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
		c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
		dm = c * Rm; // great circle distance in miles
		dk = c * Rk; // great circle distance in km

		// round the results down to the nearest 1/1000
		mi = dm;
		km = dk;

		var diameter = km;
		var range = km/2; // Get's radius
		TargetCA.storeLocator.getDynamicStores(lat, lng, null, range, true);
	}, // End findDistance

	// Converts degrees to rads
	deg2rad : function(deg) {
		rad = deg * Math.PI/180; // radians = degrees * pi/180
		return rad;
	}, // End deg2rad function

	// Add blank alt attributes to map tiles
	mapReady : function(stores) {
	        $('img[src*="tiles.virtualearth.net/tiles/"]:not([alt])').attr('alt', '');
	}, // End mapReady function

	// Limits map zoom
	limitZoom: function() { // I don't think this is being used anywhere?
		if(this.map.getZoom() < 9) {
			return false;
		} else {
			return true;
		}
	}, // End limitZoom function

	// Adds pins to the map
	addPins: function(stores, type, view, pinType) {
		for (z = 0; z < TargetCA.bingApi.oPins.length; z++) {
			var index = TargetCA.bingApi.map.entities.indexOf(TargetCA.bingApi.oPins[z]);
			if (index != -1) {
				//console.log('removing pin: ' + TargetCA.bingApi.oPins[z].ID + ' : ' + TargetCA.bingApi.oPins[z].Name);
				TargetCA.bingApi.map.entities.removeAt(index);
			}
		}

		if(!stores) {
			stores = [];
		}

		for (var i=0; stores.length>i; i++) {
			if (type == 1) { // If set to 1, numbers will appear on pushpins (used only for closest stores tab)
				n = i;
				n = n+1;
			} else {
				n = '';
				//$('#content.store-locator .mapContainer .MicrosoftMap .MapPushpinBase div').css('display','none');
			}

			//console.log(stores[i].ID + ' : ' + stores[i].Name + ' : Country Name: ' + stores[i].Address.CountryName);

			// Determin pushpin icon based on location country and open status
			if (stores[i].Address.CountryName == "Canada") {
				if (stores[i].storeLocatorOpenDate) {
					var pushpinIcon = '/assets/images/pin01.png';
				} else {
					var pushpinIcon = '/assets/images/pin02.png';
				}
			} else {
				var pushpinIcon = '/assets/images/pin03.png';
			}

			var loc = new Microsoft.Maps.Location(stores[i].Address.Latitude, stores[i].Address.Longitude);
			pinType[i] = new Microsoft.Maps.Pushpin(loc, {
				draggable: false,
				height: 63,
				id: 'store-'+stores[i].ID,
				text: String(n),
				icon: pushpinIcon,
				typename: 'pushpin',
				width: 42,
				c: TargetCA.helpers.translation('fr-CA', 'en-US')
			});
			pinType[i].Title = stores[i].Name;

			pinType[i].Description = stores[i].Address.AddressLine1 + "<br />" + stores[i].Address.City + ", " + stores[i].Address.Subdivision + ' ' + stores[i].Address.PostalCode + ' ' + stores[i].Address.CountryName;

			var pharmSpan = ""; // the HTML for the pharmacy icon in the infobox (empty if the store has no pharmacy)
			if(stores[i].Capability){
				var caps = stores[i].Capability; // the store's capabilities
				for(var x=0; x<caps.length; x++){

					if(caps[x].CapabilityName == "Pharmacy" && stores[i].Address.Subdivision == "QC"){ 
						pharmSpan = "<span class='pharmacyIcon'><img src='/assets/images/storelocator/pharmacy-icon.png' alt='' /> Brunet</span>";
					} else if (caps[x].CapabilityName == "Pharmacy" || caps[x].CapabilityName == "Pharmacie") {						

						pharmSpan = TargetCA.helpers.translation("<span class='pharmacyIcon'><img src='/assets/images/storelocator/pharmacy-icon.png' alt='' /> Pharmacie</span>","<span class='pharmacyIcon'><img src='/assets/images/storelocator/pharmacy-icon.png' alt='' /> Pharmacy</span>");
					}
				}
			}

		// Display when the store is opening, if it hasn't opened yet
		if (!stores[i].storeLocatorOpenDate) {
			pinType[i].Description += TargetCA.helpers.translation("<p class='openDate'>" + pharmSpan + "</p>","<p class='openDate'>" + pharmSpan + "</p>");
		} else { // Display the details button
			pinType[i].Description += TargetCA.helpers.translation("<p class='openDate'>Ouverture à la fin de l’automne 2013","<p class='openDate'>opening in Late Fall 2013") + "</p>";
		}

			//Microsoft.Maps.Events.addHandler(TargetCA.bingApi.pin[i], 'enter', TargetCA.bingApi.displayInfobox);
			Microsoft.Maps.Events.addHandler(pinType[i], 'click', TargetCA.bingApi.displayInfobox);
			//console.log(TargetCA.bingApi.pin[i]);
			//Microsoft.Maps.Events.addHandler(TargetCA.bingApi.pin[i], 'keypress', TargetCA.bingApi.displayInfobox);
			//add accessability functionality to space and enter keys

			pinType[i].ID = stores[i].ID;
			pinType[i].Name = stores[i].Name;

			TargetCA.bingApi.map.entities.push(pinType[i]);
		} // End loop adding pins

		for (x = 0; x < TargetCA.bingApi.oPins.length; x++) {
			TargetCA.bingApi.oPins.slice(x);
		}

		if(view == 'all') {
			TargetCA.bingApi.map.setView({
				center: new Microsoft.Maps.Location(49.89952850341797,-97.14111328125),
				zoom: 3.45
			});
		}

	}, // End addPins function

	// Updates the placeholder text of the #locationfield input
	updatePlaceName: function(placeName2) {
		var placeName = $('#locationfield').prop('value'); // the last location searched for
	    if (placeName != "") {
	        //$("#locationfield").attr("placeholder", placeName).prev('h2').show();
	        $('label[for="locationfield"] .title').text(TargetCA.helpers.translation('Ce n’est pas votre magasin?','not your location?'));
	    } else {
	        //$("#locationfield").prev('h2').hide();
	    	$('label[for="locationfield"] .title').text(TargetCA.helpers.translation('Choisissez votre emplacement','Choose your location'));
	    }
	}, // End updatePlaceName function

	// Logic to handle displaying the infobox
	displayInfobox : function(e) {
		if (e.targetType == 'pushpin') {
			//console.log(e.targetType);
			//console.log(e.eventName);

			// close any infobox that may already be open (fix for IE9)
			if (TargetCA.bingApi.infobox) {
				TargetCA.bingApi.infobox.setOptions({
					visible: false
				});
			}

			// Start infobox relative orientation
			var mapCenterLat = TargetCA.bingApi.map.getCenter().latitude;
			var mapCenterLng = TargetCA.bingApi.map.getCenter().longitude;
			var pinLocationLat = e.target.getLocation().latitude;
			var pinLocationLng = e.target.getLocation().longitude;
			var offsetX, offsetY;

			if (pinLocationLat <= mapCenterLat) {
				offsetY = 0;
			} else {
				offsetY = -TargetCA.bingApi.infobox.getHeight();
			}

			if (pinLocationLng <= mapCenterLng) {
				offsetX = 0;
			}else {
				offsetX = -TargetCA.bingApi.infobox.getWidth();
			}
			//End infobox relative orientation

			// Centers map on pin before creating infobox - Plan B if the infobox relative orientation doesn't work out
			//TargetCA.bingApi.map.setView({center:e.target.getLocation()});

			TargetCA.bingApi.infobox.setLocation(e.target.getLocation());
			TargetCA.bingApi.infobox.setOptions({
				description: e.target.Description,
				title: e.target.Title,
				visible: true,
				// The next two paramers are used for the infobox relative orientation
				showPointer: false,
				offset: new Microsoft.Maps.Point(offsetX, offsetY)
			});
		} else {
			//console.log('else!!!!');
				TargetCA.bingApi.infobox.setLocation(new Microsoft.Maps.Location(e.latitude,e.longitude))
				TargetCA.bingApi.infobox.setOptions({
					description: e.target.Description,
					title: e.target.Title,
					visible: true
				});
		}
		// Assign an id to the infobox
		$('.Infobox2').attr('id', 'infobox');
		// Move focus to the infoBox
		$('.Infobox2').attr('tabindex', -1).focus();
		// custom close icon
		var infoboxElement = $('.Infobox2');
		var closeImage = $('<img />', {
		    'src': '/assets/images/category-pages/exclusive-line/icon_x_white-red.png'
		});
		closeImage.attr('alt', TargetCA.helpers.translation('Fermer','Close'));
		// Update close button for infobox to use image
		infoboxElement.find('.infobox-close').html(closeImage);
		// Assign an id to the infobox
		infoboxElement.attr('id', 'infobox').find('a').first().attr('href','#store-'+e.target.ID);
		// Move focus to the infoBox
		infoboxElement.attr('tabindex', -1).focus();
	} // End displayInfobox function
} // End bingApi namespace
