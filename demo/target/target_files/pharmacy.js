/**
 * @Target.ca Pharmacy
 * @Pharmacy area logic, this includes all pages revolving around pharmacy content.
 * @author paul.placido@target.com, alessandro.miralles@target.com, stuart.milsten@target.com
 */

 TargetCA.pharmacy = {
	flag: true,
	pharmData: null,
	presNumberMax : 2,  // must start at 2 because #1 is the default Rx field
	init : function() {
		//runs namespace only when on the correct page
		var location = TargetCA.helpers.getUriLocation();
		var thisLocation = document.URL;

		if ((thisLocation.indexOf("/pharmacy") != -1) || (thisLocation.indexOf("/locations") != -1) || (thisLocation.indexOf("/brunet") != -1) ) {
			this.setup();
			this.servicesToggle();
			this.updateTextField();
			if( thisLocation.indexOf("/brunet") != -1 ){
				$( '.gn--top-level.pharmacy' ).addClass( "open" );
			}
		}
	},
	setup: function() {
		this.service();
		this.events();
		this.prescriptions();
		this.pageVarification();
		$(".pharmacy-refill .form span.invalid").css({'display':'none'});
		$(".pharmacy-refill .errorList .invalid").css({'display':'none'});
		$(".pharmacy-refill .errorList h2.oop").css({'display':'none'});
	},
	pageVarification : function() {
		//TODO: not all status are target's doing, could be from user input
		var status = this.getVars()["Status"];
		if(status == "1") {
			$('.pharmacy-refill.submitted .pharmError').remove();
			//$('.submitted .storeLocator').remove();
		} else {
			$('.pharmacy-refill.submitted .success').remove();
		}
	},
	getVars : function() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	},
	service : function() {
		var pharmSource = 'pharms.js';
		if(culture == "fr"){
			pharmSource = 'pharms_fr.js';
		}
		$.ajax({
			url: "/assets/js/data/"+pharmSource,
			dataType: "json",
			success: function(data) {
				TargetCA.pharmacy.parse(data);
				pharmData = data;
			},
			error: function(xhr, error) {
				TargetCA.storeLocator.jsonpError();
			}
		});
	},
	parse : function(data) {

		var currentStoreNumber = this.getVars()["storeNumber"];
		var phrmFound = false;
		for(var x = 0; x < data.Pharms.length; x++) {
			if(data.Pharms[x].StoreNumber == currentStoreNumber) {
				this.displayData(data.Pharms[x]);
				phrmFound = true;
				$("#pharm_alert").hide();
			}
		}
		if(!phrmFound){
			$("#pharm_alert").html("<h3 style='color: #c00000;'>" + TargetCA.helpers.translation("Pharmacie non trouvée","Pharmacist not found") + "</h3>");
			$('.pharmacistInfo').children().hide();
		}
	},
	displayData : function(phm) {

		//console.log(phm);
		this.applyDetailedSection($("#pharm_name"), phm.Name)
		this.applyDetailedSection($("#pharm_details"), phm.FunFact);
		this.applyDetailedSection($("#pharm_clinical"), phm.ClinicalInterests);
		this.applyDetailedSection($("#pharm_interests"), phm.Interests);
		this.applyDetailedSection($("#pharm_excite"), phm.TargetExcitement);
		this.applyDetailedSection($("#pharm_lang"), phm.Languages);

		if(phm.LicenseNumber != '') {	 	
			this.applyDetailedSection($("#pharm_lic"), phm.LicenseNumber);	 	
			var href = $(".details a.license_link").attr("href");	 	
			var lic_file_name = phm.StoreNumber + ".pdf";	 	
			$(".details a.license_link").attr('href', href + lic_file_name);	 	
		} else {	 	
			$(".license").hide(); //hide if no license number	 	
		}

		if(phm.Photo != '') {
			$(".photo").attr('src','/assets/images/pharmacy/pharmacist/'+phm.Photo);
			$(".photo").attr('alt',phm.Name);
			//$(".photo").attr('alt', phm.Name);
		} else {
			$(".photo").attr('src', '');
			//$(".photo").attr('alt', '');
			$(".photo").removeClass('photo'); //remove if there is a default image
		}

		if (phm.Flu) {
			$('.service.flu').removeClass('hidden');
		}
	},
	// returns the pharmacy data object that includes the content of pharms.js
	getPharmData: function() {
		return pharmData;
	},
	applyDetailedSection: function(obj, str) {
		if(str != '') {
			obj.html(str);
		} else {
			obj.parent().prev().empty();
		}
	},
	getParameterByName: function(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if(results == null) {
			return "";
		} else {
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	},
	formResponsePage: function(data) {
		if (data) {
			var w = data;
			$(".pharmacy-refill.submitted #store_name").empty().html(w.Name);
			$(".pharmacy-refill.submitted .store_address").empty().html(w.Address.AddressLine1);
			$(".pharmacy-refill.submitted .store_city").empty().html(w.Address.City);
			$(".pharmacy-refill.submitted .store_province").empty().html(w.Address.Subdivision);
			$(".pharmacy-refill.submitted .store_postal").empty().html(w.Address.PostalCode);
			$(".pharmacy-refill.submitted .store_country").empty().html(w.Address.CountryName);

			// Pharmacy Telephone Number
			if (data.Capability) {
				
					data.Capability = $.makeArray(data.Capability);

					for (var i = 0; i < data.Capability.length; i++) {
						if (data.Capability[i].CapabilityName == TargetCA.helpers.translation('Pharmacie','Pharmacy')) {
							if (data.Capability[i].TelephoneNumber) {
								data.Capability[i].TelephoneNumber = $.makeArray(data.Capability[i].TelephoneNumber);
								// if array
								for (var x = 0; x < data.Capability[i].TelephoneNumber.length; x++) {
									if (data.Capability[i].TelephoneNumber[x]['FunctionalTypeDescription'] == 'Main') {
										$(".pharmacy-refill.submitted #store_phone").empty().html(data.Capability[i].TelephoneNumber[x]['PhoneNumber']);
									}
								} // end for loop
							}
							for (var z = 0; z < data.Capability[i].OperatingHours['Hours'].length; z++){
								$(".pharmacy-refill.submitted .times" + z).empty().text(TargetCA.storeLocatorSideMenu.hrsTranslate(data.Capability[i].OperatingHours['Hours'][z]['ShortName']) + ' : ' + data.Capability[i].OperatingHours['Hours'][z]['TimePeriod']['Summary']);
							}
						}
					} // end for loop
			} // End Pharmacy Telephone Number

			var href = $(".pharmacy-refill.submitted a.getDetails").attr("href");
			$(".pharmacy-refill.submitted a.getDetails").attr('href', href + w.ID);
		} else {
			// $('.pharmacy-refill.submitted').hide();
			$('.pharmacy-refill.submitted .storeInfo').html('<h2 class="error">' + TargetCA.helpers.translation("Nous sommes désolés, ce magasin n’a pas de pharmacie.","Sorry, the store you have requested doesn't appear to have a pharmacy.") + '</h2>');
		}
	},
	getPharmStoreDetails: function(data) {
		if (data) {
			//console.log('Match Found');
			$(".pharmacy-details section.storeInfo .closest-store").css("display","block");
			var w = data[x];
			$(".pharmacy-details #store_name").empty().html(data.Name);
			$(".pharmacy-details .store_address").empty().html(data.Address.AddressLine1);
			$(".pharmacy-details .store_city").empty().html(data.Address.City);
			$(".pharmacy-details .store_province").empty().html(data.Address.Subdivision);
				if(data.Address.Subdivision == 'QC'){ 
					$("h2.title").addClass("brunet_pharm"); 
				} else {
					$("h2.title").addClass("non_brunet_pharm");
				}
			$(".pharmacy-details .store_postal").empty().html(data.Address.PostalCode);
			$(".pharmacy-details .store_country").empty().html(data.Address.CountryName);

			var loc = data.Address.Latitude + ',' + data.Address.Longitude;
			var filePath = "http://api.target.com/v2/location/map/road/image/" + loc + "/13?pushpin=" + loc + ";37&mapSize=229,144&key=" + TargetCA.storeLocator.apigeeKey;

			$(".pharmacy-details #pharmDetailsMapImage").attr('src',filePath);

			// Pharmacy Telephone Number
			if (data.Capability) {
					data.Capability = $.makeArray(data.Capability);

					for (var i = 0; i < data.Capability.length; i++) {
						if (data.Capability[i].CapabilityName == TargetCA.helpers.translation('Pharmacie','Pharmacy')) {
							if (data.Capability[i].TelephoneNumber) {
								// check for pharmacy phone number
									data.Capability[i].TelephoneNumber = $.makeArray(data.Capability[i].TelephoneNumber);
									// if array
									for (var x = 0; x < data.Capability[i].TelephoneNumber.length; x++) {
										if (data.Capability[i].TelephoneNumber[x]['FunctionalTypeDescription'] == 'Main') {
											$(".pharmacy-details p.pharm_phone").empty().html(data.Capability[i].TelephoneNumber[x]['PhoneNumber']);
										}
									} // end for loop
									// check for pharmacy fax number 
								

									data.Capability[i].TelephoneNumber = $.makeArray(data.Capability[i].TelephoneNumber);

									// if array
									for (var x = 0; x < data.Capability[i].TelephoneNumber.length; x++) {
										if (data.Capability[i].TelephoneNumber[x]['FunctionalTypeDescription'] == 'Fax') {
											$(".pharmacy-details p.pharm_fax").empty().html(data.Capability[i].TelephoneNumber[x]['PhoneNumber']);
										}
									} // end for loop
															
							}
							var hourstext = "";
							for (var z = 0; z < data.Capability[i].OperatingHours['Hours'].length; z++){
								hourstext += "<p>" + TargetCA.storeLocatorSideMenu.hrsTranslate(data.Capability[i].OperatingHours['Hours'][z]['ShortName']) + ' : ' + data.Capability[i].OperatingHours['Hours'][z]['TimePeriod']['Summary'] + "</p>";
							}
							$(".pharmacy-details p.hours").empty().html(hourstext);
						}
					} // end for loop
			} // End Pharmacy Telephone Number
		} else {
			$(".pharmacy-details section.storeInfo .closest-store").css("display","block");
			$('.closest-pharm-store').hide();
			$('.storeInfo').html('<h2 class="error">' + TargetCA.helpers.translation("Nous sommes désolés, ce magasin n’a pas de pharmacie.","Sorry, the store you have requested doesn't appear to have a pharmacy.") + '</h2>');
		}
	},
	prescriptions: function() {
		$('.popup').css({'visibility':'hidden'});
		$('.prescriptionInformation #remove').css({'display':'none', 'cursor':'pointer'})
		$('.prescriptionInformation #add').click(function(e) {
			if(TargetCA.pharmacy.presNumberMax < 8) {
				$('.prescriptionInformation .group_Prescription').append('<br/><span class="firstlabel"><label class="reader" for="prefix'+TargetCA.pharmacy.presNumberMax+'">'+TargetCA.helpers.translation("Ordonnance supplémentaire nombre"+TargetCA.pharmacy.presNumberMax+" préfixe (3 chiffres)","Additional Prescription Number "+TargetCA.pharmacy.presNumberMax+" Prefix (3 digits)")+'<span class="presc_error">Invalid Prescription Number</span></label></span><input type="text" class="partOne"  name="prefix'+TargetCA.pharmacy.presNumberMax+'" id="prefix'+TargetCA.pharmacy.presNumberMax+'" maxlength="3"/><span class="rxDash">&nbsp;&ndash;&nbsp;</span><span class="firstlabel"><label class="reader" for="Rx'+TargetCA.pharmacy.presNumberMax+'">'+TargetCA.helpers.translation("Ordonnance supplémentaire nombre"+TargetCA.pharmacy.presNumberMax+" (7 chiffres)","Additional Prescription Number"+TargetCA.pharmacy.presNumberMax+" (7 digits)")+'</label></span><input type="text" class="partTwo"  name="Rx'+TargetCA.pharmacy.presNumberMax+'" id="Rx'+TargetCA.pharmacy.presNumberMax+'"  maxlength="7" >');
				$("#prefix" + TargetCA.pharmacy.presNumberMax).focus();
				$('.prescriptionInformation #remove').css({'color':'#cc0000', 'display':'inline'})
				TargetCA.pharmacy.presNumberMax++;
				//TargetCA.interactions.autotab();
			} else {
				$('.prescriptionInformation #add').css({'color':'#adadad'})
			}
			if(TargetCA.pharmacy.presNumberMax == 8) {
				$('.prescriptionInformation #add').css({'color':'#adadad'})
			}
		});
		$('.prescriptionInformation #remove').click(function(e) {
			if(TargetCA.pharmacy.presNumberMax > 2) {
				//$('.prescriptionInformation .group_Prescription br:last-child').remove();
				$('.prescriptionInformation .group_Prescription input:last-child').remove();
				$('.prescriptionInformation .group_Prescription span:last-child').remove();
				$('.prescriptionInformation .group_Prescription span:last-child').remove();
				$('.prescriptionInformation .group_Prescription input:last-child').remove();
				$('.prescriptionInformation .group_Prescription span:last-child').remove();
				$('.prescriptionInformation .group_Prescription br:last-child').remove();
				$('.prescriptionInformation #add').css({'color':'#cc0000'});
				TargetCA.pharmacy.presNumberMax--;
				//TargetCA.interactions.autotab();
			} else {
				$('.prescriptionInformation #remove').css({'display':'none'})
			}
			if(TargetCA.pharmacy.presNumberMax == 2) {
				$('.prescriptionInformation #remove').css({'display':'none'})
			}
		});
	},
	events: function() {

		$(".pharmacy-refill #refill").submit(function(e){
			var errors = TargetCA.pharmacy.validate();
			TargetCA.pharmacy.validationFeedback(errors);

			if(errors.length > 0) {
				//$('.active:first ~ input').focus();
				//$('.group_FirstName input').attr('tabIndex',-1).focus();
				$(".pharmacy-refill .errorList p.invalid").css({'display':'block'});
				$(".pharmacy-refill .errorList p.invalid").addClass('active');
				$(".pharmacy-refill .errorList p.invalid").removeClass('invalid');
				$(".pharmacy-refill .errorList h2.oop").css({'display':'block'});
				$('.pharmacy-refill .errorList').attr('tabIndex',-1).focus();
				$('.errorList').find('a').click(function(e){
    				var link = $(this);
    				$(link.attr('href')).focus();
				});
				return false;
			}

			return true;
		});
	},
	validate: function(field,regex) {
		var errorList = [];

		//firstname - done
		var field = $(".group_FirstName input:text");
		var regexObj = /^[A-Za-zÀ-ÿ'\- ]{2,30}$/; // /^[a-zA-ZÀ-ÿ\-]+$/;
		var flag = regexObj.test(field.val());
		if(!flag){
			errorList.push($(".group_FirstName span.invalid"));
			errorList.push($(".pharmacy-refill .errorList .fname.invalid"));
		}

		//lastname - done
		var field = $(".group_LastName input:text");
		var regexObj = /^[A-Za-zÀ-ÿ'\- ]{2,30}$/; // /^[a-zA-ZÀ-ÿ\-]+$/
		var flag = regexObj.test(field.val());
		if(!flag){
			errorList.push($(".group_LastName span.invalid"));
			errorList.push($(".pharmacy-refill .errorList .lname.invalid"));
		}

		//email - done
		var field = $(".group_Email input:text");
		var regexObj = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		// /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
		var flag = regexObj.test(field.val());

		if (field.val() != "" && field.val().length > 0) {
			if(!flag){
				errorList.push($(".group_Email span.invalid"));
				errorList.push($(".pharmacy-refill .errorList .email.invalid"));
			}
		} else { // if no email provided, submit a dummy email
			if (culture == 'fr') {
				$(".group_Email input:text").val("nom@domain.com");
			} else {
				$(".group_Email input:text").val("name@domain.com");
		}
	}

		//phone - done
		var field = $(".group_PhoneNumber input:text");
		var flag = TargetCA.pharmacy.verifyPhoneNumber($(".group_PhoneNumber input:text").val());

		if (field.val() != "" && field.length > 0) {
			if(flag == null){
				errorList.push($(".group_PhoneNumber span.invalid"));
				errorList.push($(".pharmacy-refill .errorList .fon.invalid"));
			} else {
				$(".group_PhoneNumber #CallBackAreaCode").val(flag.area);
				$(".group_PhoneNumber #CallBackPrefix").val(flag.prefix);
				$(".group_PhoneNumber #CallBackNumber").val(flag.line);
			}
		} else {  // if no email provided, submit a dummy email
				$(".group_PhoneNumber #CallBackAreaCode").val("555");
				$(".group_PhoneNumber #CallBackPrefix").val("555");
				$(".group_PhoneNumber #CallBackNumber").val("5555");
		}


		//storenumber - done
		var field = $(".group_StoreNumber input:text");
		// var regexObj = /^[0-9]{2,30}$/; // /\S/;
		// INVALID if anything but 4 numbers. May also include a T, t, or -
		var regexObj = /^[0-9 \-\s?t?\s]/i;
		var flag = regexObj.test(field.val());
		var storeNumTest = field.val().replace(/[^0-9]+/g, ''); // test only the number portion - max 4 digits
		if(storeNumTest.length != 4) { flag = false; }

		if(!flag){
			errorList.push($(".group_StoreNumber span.invalid"));
			errorList.push($(".pharmacy-refill .errorList .store.invalid"));
		} else {
			$("#Misc").val(function() {
				// strip all non-numbers
				var num = $(".group_StoreNumber input:text").val().replace(/[^0-9]+/g, '');
				return num;
			});
			$(".group_StoreNumber input:text").val(function() {
				// strip all non-numbers
				var storeNum = $(".group_StoreNumber input:text").val().replace(/[^0-9]+/g, '');
				storeNum = "T"+storeNum;  // added per voiceTech request
				return storeNum;
			});
		}

		//prescription number
		var field = $(".group_Prescription input");
		var regexObj = /^[A-Za-zÀ-ÿ0-9\-]{2,30}$/;
		$.each(field,function(index,element){
			var flag = regexObj.test($(element).val());
			if((index%2) == 0){
				if(!flag || ($(element).val().length < 3)){
					errorList.push($(".group_Prescription span.invalid"));
					errorList.push($(".group_Prescription span.presc_error"));
					errorList.push($(".pharmacy-refill .errorList .pres.invalid"));
				}
			}else{
				if(!flag || ($(element).val().length < 6)){
					errorList.push($(".group_Prescription span.invalid"));
					errorList.push($(".group_Prescription span.presc_error"));
					errorList.push($(".pharmacy-refill .errorList .pres.invalid"));
				}
			}
			
		})
		/*var flag = regexObj.test(field.val());

		if(!flag || (field.val().length < 7)){
			errorList.push($(".group_Prescription span.invalid"));
			errorList.push($(".pharmacy-refill .errorList .pres.invalid"));
		}*/

		return errorList;
	},
	verifyPhoneNumber: function(str) {
		if(!str || !str.length) return null;
		var tel = "";
		var regexObj = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if (str.match(regexObj)) {
			var zeroCode = '0'.charCodeAt(0), nineCode = '9'.charCodeAt(0);
			for(var i = 0; i < str.length; i++) {
				var c = str.charCodeAt(i);
				if(c >= zeroCode && c <= nineCode) {
					tel += String.fromCharCode(c);
				}
			}
			if(tel.length != 10) return null;
			return {
				"area": tel.substr(0,3),
				"prefix": tel.substr(3,3),
				"line": tel.substr(6,4)
			};
		} else {
			return null;
		}
	},
	validationFeedback: function(obj) {
		//clears all previous validations
		$(".pharmacy-refill .form span.invalid").css({'display':'none'});
		$(".pharmacy-refill .form span.invalid").removeClass('active');
		$(".pharmacy-refill .errorList .invalid").css({'display':'none'});
		$(".pharmacy-refill .errorList .invalid").removeClass('active');
		$(".pharmacy-refill .form span.presc_error").css({'display':'none'});
		$(".pharmacy-refill .form span.presc_error").removeClass('active');
		var count = 0;
		$.each(obj, function() {
			this.css({'display':'inline'}).addClass('active');
			//count++;
		});
	},
	setPharmStores: function(data) {
		// Sets up store listings for the Pharmacy Landing Page
		var checkLocation = window.location.href;
		var j = 0;
		pharmStores = [];
		//console.log( data );
		for(var x = 0; x < data.length; x++){
			if((typeof(data[x].Capability) === 'object') && (data[x].Capability.length > 0)) {
				for(var i = 0; i < data[x].Capability.length; i++) {
					if (data[x].Capability[i].CapabilityName == TargetCA.helpers.translation('Pharmacie','Pharmacy')) {
						if( ( checkLocation.indexOf( '/brunet' ) != -1 && data[x].Address.Subdivision == "QC" ) || ( checkLocation.indexOf( '/pharmacy' ) != -1 && data[x].Address.Subdivision != "QC") ){
							var pharmacies = TargetCA.pharmacy.getPharmData().Pharms;
							for( j = 0; j < pharmacies.length; j++ ){
								if( data[x].ID == pharmacies[j].StoreNumber ){
									data[x].brunetID = pharmacies[j].brunetID;
									break;
								}
							}
							pharmStores.push(data[x]);
						}
					}
				}
			}
		}

		$('.pharmacy-landing  .loader').css('display','none');
		var checkLocation = window.location.href;
		if (pharmStores.length == 0) {
			$(".pharmacy-landing .storeLocator .closest-store").hide();
			$(".pharmacy-landing .storeLocator .viewAllStores").hide();
			$(".pharmacy-landing .storeLocator #noStoresNearYou").show();
			
			if( checkLocation.indexOf( 'brunet' ) == -1 ){
				$(".pharmacy-landing .storeLocator .title h2").html(TargetCA.helpers.translation("Pharmacies Target près de","Target Pharmacies near") + " <span 	id='submittedText'>" + TargetCA.storeLocator.caClosestStores[0].Address.City + "</span>");
			} else {
				$(".pharmacy-landing .storeLocator .title h2").html(TargetCA.helpers.translation("Magasins près de","Locations near") + " <span 	id='submittedText'>" + TargetCA.storeLocator.caClosestStores[0].Address.City + "</span>");
			}
			if( $( '.pharmacy-page section.storeLocator p.error' ).length == 0 ){
				$( ".pharmacy-page section.storeLocator .ClosestStoreLocation label").prepend(TargetCA.helpers.translation("<p id='errorText' class='error'>Désolés, il ne semble y avoir aucun magasin dans un rayon de 100 km. Veuillez entrer votre ville et votre province ou votre code postal dans le champ ci-dessus.</p>","<p id='errorText' class='error'>Sorry, we couldn’t seem to detect a location within 100km. Please enter your city, province, or postal code in the following field.</p>"));
			}

			if( culture == "en" ){
				document.title = "Target Canada | Pharmacy locations near " + TargetCA.storeLocator.caClosestStores[0].Address.City;
			} else {
				document.title = "Target Canada | Pharmacy près de " + TargetCA.storeLocator.caClosestStores[0].Address.City;
			}
			var loc = window.location.href;
			if( loc.indexOf( '/brunet' ) != -1 ){
				if( culture == "en" ){
					document.title = "Target Canada | Brunet locations near " + TargetCA.storeLocator.caClosestStores[0].Address.City;
				} else {
					document.title = "Target Canada | Brunet près de " + TargetCA.storeLocator.caClosestStores[0].Address.City;
				}
				
			}
		} else if (pharmStores.length > 0) {
			if (pharmStores.length == 1) {
				$(".viewAllStores.border-top.accordion_title").hide();
				$(".pharmacy-landing.pharmacy-page section.storeLocator").css("min-height", "164px");
			} else {
				$(".viewAllStores.border-top.accordion_title").show();
				$(".pharmacy-landing.pharmacy-page section.storeLocator").css("min-height", "auto");
			}
			if (pharmStores.length >= 7) {
				$(".pharmacy-landing .storeLocator .closest-store").show();
				$(".pharmacy-landing .storeLocator .viewAllStores").show();
				y = 7;
			} else {
				y = pharmStores.length;
			}
			if( checkLocation.indexOf( 'brunet' ) == -1 ){
				$(".pharmacy-landing .storeLocator .title h2").html(TargetCA.helpers.translation("Pharmacies Target près de","Target Pharmacies near") + " <span id='submittedText'></span>");
			} else {
				$(".pharmacy-landing .storeLocator .title h2").html(TargetCA.helpers.translation("Magasins près de","Locations near") + " <span id='submittedText'></span>");
			}
			$(".pharmacy-landing .storeLocator #noStoresNearYou").hide();
			$(".pharmacy-page section.storeLocator #errorText").hide()

			$(".pharmacy-landing .closest-store.left").hide();
			if( $('.pharmacy-landing section.storeLocator .moreStores .mobile-border').css( 'clear' ) == 'both' ){
				$('.pharmacy-landing section.storeLocator .moreStores .mobile-border').hide();
			}
			for(var x = 0; x < y; x++) {
				//$(".pharmacy-landing .storeLocator .closest-store").css("display","block");
				$(".pharmacy-landing .storeLocator .accordion").css("display","block");
				$(".pharmacy-landing #store" + x).show();
				if( $('.pharmacy-landing section.storeLocator .moreStores .mobile-border').css( 'clear' ) == 'both' ){
					$( $('.pharmacy-landing section.storeLocator .moreStores .mobile-border')[x-2] ).show();
				}
				$(".pharmacy-landing #store" + x + " .store_name").empty().text(pharmStores[x].Name);
				$(".pharmacy-landing #store" + x + " .phStoreAddress").empty().text(pharmStores[x].Address.AddressLine1);
				$(".pharmacy-landing #store" + x + " .phStoreCity").empty().text(pharmStores[x].Address.City);
				$(".pharmacy-landing #store" + x + " .phStoreProvince").empty().text(pharmStores[x].Address.Subdivision);
				$(".pharmacy-landing #store" + x + " .phStorePostalCode").empty().text(pharmStores[x].Address.PostalCode);

				// Pharmacy Telephone Number
				if (pharmStores[x].Capability) {
					for (var i = 0; i < pharmStores[x].Capability.length; i++) {
							pharmStores[x].Capability = $.makeArray(pharmStores[x].Capability);
							for (var i = 0; i < pharmStores[x].Capability.length; i++) {
								if (pharmStores[x].Capability[i].CapabilityName == TargetCA.helpers.translation('Pharmacie','Pharmacy')) {
									if (pharmStores[x].Capability[i].TelephoneNumber) {
											pharmStores[x].Capability[i].TelephoneNumber = $.makeArray(pharmStores[x].Capability[i].TelephoneNumber);

											// if array
											for (var z = 0; z < pharmStores[x].Capability[i].TelephoneNumber.length; z++) {
												if (pharmStores[x].Capability[i].TelephoneNumber[z]['FunctionalTypeDescription'] == 'Main') {
													$(".pharmacy-page #store" + x + " .phStorePhone").empty().html(pharmStores[x].Capability[i].TelephoneNumber[z]['PhoneNumber']);
												}
											} // end for loop
										
									}
									
									if (x == 0) {
										var hourstext = "";
										for (var z = 0; z < pharmStores[0].Capability[i].OperatingHours['Hours'].length; z++) {
											if( culture == 'en' ){
												hourstext += "<p>" + TargetCA.storeLocatorSideMenu.hrsTranslate(pharmStores[0].Capability[i].OperatingHours['Hours'][z]['ShortName']) + ': ' + pharmStores[0].Capability[i].OperatingHours['Hours'][z]['TimePeriod']['Summary'] + "</p>";
											} else {
												var beginTime = pharmStores[0].Capability[i].OperatingHours['Hours'][z]['TimePeriod']['BeginTime'];
												beginTime = beginTime.slice( 0, beginTime.indexOf( ":" ) );
												var endTime = pharmStores[0].Capability[i].OperatingHours['Hours'][z]['TimePeriod']['ThruTime'];
												endTime = endTime.slice( 0, endTime.indexOf( ":" ) );
												hourstext += "<p>" + TargetCA.storeLocatorSideMenu.hrsTranslate(pharmStores[0].Capability[i].OperatingHours['Hours'][z]['ShortName']) + ': De ' + beginTime + ' à ' + endTime + " h </p>";
											}
										}
										$(".pharmacy-landing .closest-store.store0 .hours.left p").first().empty().html(hourstext);
									}
									
								}
							} // end for loop

					}
				} // End Pharmacy Telephone Number

				// Get the href attribute of the anchor tag
				var href = $(".pharmacy-landing #store" + x + " a.getDetails").attr("href");
				var loc = window.location.href;
				if( loc.indexOf( '/brunet' ) != -1 ){
					href = $(".pharmacy-landing #store" + x + " a.getDetails").attr("data-continue");
				}
				if( culture == "en" ){
					$(".pharmacy-landing #store" + x + " a.getDetails .screen-reader-only").html( "for " + pharmStores[x].Name );
				} else {
					$(".pharmacy-landing #store" + x + " a.getDetails .screen-reader-only").html( "pour " + pharmStores[x].Name );
				}

				// If the last four characters are numbers, remove them and pass back string to href variable
				if (href){
					if( loc.indexOf( '/brunet' ) != -1 ){
						href = href.slice( 0, href.indexOf( "id=" ) + 3 );
					} else {
						if (!isNaN(parseInt(href.substr(href.length - 4)))) {
							href = href.substring(0, href.length - 4);
						}
					}
				}
				// Append the store number to the anchor tag's href attribute
				if( loc.indexOf( '/brunet' ) != -1 ){
					if( typeof pharmStores[x].brunetID !== "undefined" ){
						$(".pharmacy-landing #store" + x + " a.getDetails").attr('data-continue', href + pharmStores[x].brunetID);
					}
				} else {
					$(".pharmacy-landing #store" + x + " a.getDetails").attr('href', href + pharmStores[x].ID);
				}
			}
			$("span#submittedText").empty().html(pharmStores[0].Address.City);
			if( culture == "en" ){
				document.title = "Target Canada | Pharmacy locations near " + pharmStores[0].Address.City;
			} else {
				document.title = "Target Canada | Pharmacy près de " + pharmStores[0].Address.City;
			}
			if( loc.indexOf( '/brunet' ) != -1 ){
				if( culture == "en" ){
					document.title = "Target Canada | Brunet locations near " + pharmStores[0].Address.City;
				} else {
					document.title = "Target Canada | Brunet près de " + pharmStores[0].Address.City;
				}
				
			}
		} else {
			$(".pharmacy-landing .storeLocator .closest-store").hide();
			$(".pharmacy-landing .storeLocator .viewAllStores").hide();
			$(".pharmacy-landing .storeLocator #noStoresNearYou").show();
			$(".pharmacy-landing .storeLocator .title h2").html(TargetCA.helpers.translation("Pharmacies Target près de:","Target Pharmacies near:") + " <span id=\"submittedText\"></span>");
			$(".pharmacy-landing .storeLocator #noStoresNearYou").html(TargetCA.helpers.translation("<p>Malheureusement, nous ne connaissons pas encore votre adresse.</p>","<p>Unfortunately, we don't know your location.</p>"));
			$("span#submittedText").empty().html(pharmacyLocationInput.value);
			if( culture == "en" ){
				document.title = "Target Canada | Pharmacy locations near " + pharmStores[0].Address.City;
			} else {
				document.title = "Target Canada | Pharmacy près de " + pharmStores[0].Address.City;
			}
			if( loc.indexOf( '/brunet' ) != -1 ){
				if( culture == "en" ){
					document.title = "Target Canada | Brunet locations near " + pharmStores[0].Address.City;
				} else {
					document.title = "Target Canada | Brunet près de " + pharmStores[0].Address.City;
				}
				
			}
		}
	},
	pharmStoresPopUp: function(data) {
		var y = data.length;
		var stores = data;
		var pa = [];
		for (var x = 0; x < y; x++) {
			//console.log(x);
			if (stores[x].Capability) {
				stores[x].Capability = $.makeArray(stores[x].Capability);

				for (var i = 0; i < data[x].Capability.length; i++) {
					if (stores[x].Capability[i].CapabilityName == TargetCA.helpers.translation('Pharmacie','Pharmacy')) {
						pa.push(stores[x]);
					} // end for loop
				}				
			}
		}

		$('.pharmDetailsPopUp .loader').css('display','none');
		$('.storeLocator-wrap').css('display','block');

		//$('storeLocator-wrap').show();
		// If no Target locations with pharmacies exist within 100 km, do this:
		if (pa.length == 0) {
			$("#pharmDetailsPopUp .storeLocator .closest-store").hide();
			$("#pharmDetailsPopUp .storeLocator #noStoresNearYou").show();
			if(culture == "fr"){
				$("#pharmDetailsPopUp .storeLocator .title h1").html('Pharmacies Target près de <span id="submittedText"></span>');
				$("#pharmDetailsPopUp .storeLocator #noStoresNearYou").html("<p>Malheureusement, il n’y a aucune pharmacie dans un rayon de 100 km.</p>");
			} else {
				$("#pharmDetailsPopUp .storeLocator .title h1").html('Target Pharmacies near <span id="submittedText"></span>');
				$("#pharmDetailsPopUp .storeLocator #noStoresNearYou").html("<p>Unfortunately, there aren’t any pharmacies within 100km.</p>");
			}
		// Otherwise, do this:
		} else {
			$("#pharmDetailsPopUp .storeLocator #noStoresNearYou").hide();
			if (pa.length >= 3){
				$("#pharmDetailsPopUp .storeLocator .closest-store").show();
				$("#pharmDetailsPopUp .storeLocator .viewAllStores").show();
				$("#pharmDetailsPopUp .storeLocator #noStoresNearYou").hide();
				y = 3;
			} else {
				y = pa.length;
			}

			$("#pharmDetailsPopUp .closest-store").hide();
			for(var x=0; x<y; x++) {
				$("#pharmDetailsPopUp #store" + x).show();
				$("#pharmDetailsPopUp #store" + x + " .store_name").empty().text(pa[x].Name);
				$("#pharmDetailsPopUp #store" + x + " .phStoreAddress").empty().text(pa[x].Address.AddressLine1);
				$("#pharmDetailsPopUp #store" + x + " .phStoreCity").empty().text(pa[x].Address.City);
				$("#pharmDetailsPopUp #store" + x + " .phStoreProvince").empty().text(pa[x].Address.Subdivision);
				$("#pharmDetailsPopUp #store" + x + " .phStorePostalCode").empty().text(pa[x].Address.PostalCode);
				// Get the href attribute of the anchor tag
				$("#pharmDetailsPopUp #store" + x + " a.getDetails").attr("href","/" + TargetCA.helpers.translation("fr","en") + "/pharmacy/details?storeNumber=" + pa[x].ID);

				// If the last four characters are numbers, remove them and pass back string to href variable
				// Append the store number to the anchor tag's href attribute
				//if (href) {
				//	if (!isNaN(parseInt(href.substr(href.length - 4)))) {
				//		href = href.substring(0, href.length - 4);
				//	}
				//}
			}
		}
	},
	servicesToggle: function() {
		$('.servicesToggle').click(function(e){
			e.preventDefault();
			$(this).toggleClass('expand').toggleClass('collapse');
			if(culture == "fr"){
				$('.servicesToggle.expand .text1').text('Vue');
				$('.servicesToggle.collapse .text1').text('Masquer');
			}else{
				$('.servicesToggle.expand .text1').text('show');
				$('.servicesToggle.collapse .text1').text('hide');
			}
			
			$('.services_section').toggleClass('display_none').toggleClass('display_block');
			if($('.services_section').hasClass('display_block')){
				$('.services_section h3').attr('tabindex',-1).focus();
			}else{
				$('.servicesToggle').focus();
			}
		});
		$('.close-pharmacy-services').click(function(e){
			e.preventDefault();
			$('.servicesToggle').trigger('click');
		});
	},
	updateTextField: function(){
		var topURL = window.location.href;
		if( topURL.indexOf( "loc=" ) == -1 ) return false;

		var str = topURL.slice( topURL.indexOf( "loc=" ) + 4, topURL.length );
		if (TargetCA.storeLocator.checkLocalStorageFunctionality() != false) {
			$( '#pharmacyLocationInput' ).val( decodeURIComponent( str ) );
		} else {
			$( window ).bind( 'load', function(){
				$( '#pharmacyLocationInput' ).val( decodeURIComponent( str ) );
				$( '.pharmacy-page section.storeLocator .ClosestStoreLocation input.submitPharmacyLocation' ).click();
			});
		}
	}
}