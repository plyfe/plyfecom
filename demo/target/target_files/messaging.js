/**
 * @Target.ca Messaging
 * @Messaging system for specific errors
 * @author mark.kimitch@target.com
 */
 
//-- Target.ca messaging --//
TargetCA.messaging = {
	init : function(flag) {
		// If the service is down for any reason
		var globalMessage;
		if (flag == 'serviceDown') { 
			//console.log(flag);
				globalMessage = TargetCA.helpers.translation(
				'Désolé. Le localisateur de magasins n’est pas disponible pour le moment. Nous faisons le nécessaire pour résoudre la situation. Veuillez réessayer plus tard.',
				'Sorry. Our store locator page is currently down. We’re working hard to fix the problem — please try again later.');
			// Global Nav Messaging
			$("ol.closest-stores").hide();
			$(".gn--dd.locations .gn--dd-title").html(globalMessage);
			// Store Locator Side Nav Messaging
			$("ol.locator-closest-stores").html("<div class='noStoresNearYou'>" + globalMessage + "</div>");
			// Pharmacy Landing Page Messaging
			$(".loader").css("display","none");
			$(".storeLocator .title h2.postalCode").html(TargetCA.helpers.translation(
				'We cannot determine your loaction (french)',
				'We cannot determine your loaction'));
			$(".pharmacy-landing .storeLocator #noStoresNearYou").html("<p>" + globalMessage + "</p>");

		// TO DO: Consolidate the rest of messaging here

		} else if (flag == 'unknownLocation') { // Unknown location
			//console.log(flag);
			// Global Nav Messaging
			// Store Locator Side Nav Messaging
			// Pharmacy Landing Page Messaging
			//console.log('Where is my mind?');
		} else if (flag == 'noStoresNearby') { // No stores are found nearby
			//console.log(flag);
			// Global Nav Messaging
			// Store Locator Side Nav Messaging
			// Pharmacy Landing Page Messaging
		} else if (flag == 'noPharmaciesNearby') { // No pharmacies are found nearby

		} else { // Time and space have ripped apart
			//console.log('Something weird just happened.');
		}
	}
} // end messaging namespace