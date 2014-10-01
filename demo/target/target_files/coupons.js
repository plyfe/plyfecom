/*
 * @Target.ca Coupons
 * @Coupons logic, interacting with News Marketing API.
 * @author carlo@babyrobot.com
 */

TargetCA.coupons = {
	apiPath: "/api/coupons/index.php",
	postalCodeValue: "",
	currentDevice: "desktop",
	featuring: {
		backtoschool: {
			title: "back-to-school coupons",
			title_fr: "Coupons pour la rentrée des classes",
			hideLink: true,
			/*ids: [27806,27809,27826,27810,27807,27808,27815,27805,27814,27824,27811,27825,27812,27822,27817,27818,27819,27803,27820,27804,27821,27823,27813]*/
			ids: [27806,27809,27826,27810,27807,27808,27815,27805,27814,27824,27811,27825,27812,27822,27817,27818,27819,27803,27820,27804,27821,27823,27813,28376,28377,28378]
			//ids: [27500,27499,26892, 27455]
		}
	},
	init: function(){
		this.setup();
	},
	setup: function(){
		if($(".CategoryBody.coupons").length < 1 && $(".couponsPopup").length < 1) {
			return false;
		}

		//cookie fallback
		if(!this.tool.isLocalStorageSupported()) {
			Object.defineProperty(window.localStorage,"postalCode", {
			   	set: function(postal){
			   		document.cookie="couponPostalCode="+postal;
			   	},
			   	get: function(){
			   		var cookies = document.cookie.split(";");
			   		for(var i = 0, iLen = cookies.length; i<iLen;i++) {
			   			var item = cookies[i];
			   			var items = item.split("=");
			   			if(items[0] == "couponPostalCode") {
			   				return items[1];
			   			} else if (i == iLen-1) {
			   				return undefined;
			   			}
			   		}

			   	}
			});
		}

		$(".gn--top-level.coupons").addClass("currentPage");
		

		if(window.location.hash.indexOf("#?") > -1) {
			var hash = window.location.hash;
			var location = window.location;
			window.location.hash = "";
			window.location = location.pathname + hash.replace("#?","?");
		}

		//fall back for String.trim in ie8
		if (!String.prototype.trim) {
		    String.prototype.trim = function() {
		      return this.replace(/^\s+|\s+$/g, '');
		    };
		}

		this.basket.update();

		//check localStorage
		if(window.localStorage.postalCode) {
			TargetCA.coupons.postalCodeValue=window.localStorage.postalCode;
		} else {

			$.ajax(TargetCA.coupons.apiPath, {
				data: {
					request: "getPostalcode"
				},
				success: function(data){
					window.localStorage.postalCode=TargetCA.coupons.postalCodeValue = data[0];
				},
				dataType: "json",
				type: "post",
				async: false
			});
		}

		var postalcodeModifyHandler = function(e){
			e.preventDefault();
			if((e.type == "keyup" && (e.keyCode == 13 || e.charCode == 13)) || e.type == "click"){ 
				var postalCode = $(".header .interactions .postalcode input.textbox").val();
				if($(".couponsPopup").length > 0)
					postalCode = $(".couponsPopup input.textbox").val();
				if(!TargetCA.coupons.tool.validatePostalcode(postalCode.toUpperCase())) {
					$(".header .interactions .postalcode p.error").show();
					$(".couponsPopup p.error").show();
				} else {
					window.localStorage.postalCode = TargetCA.coupons.postalCodeValue = postalCode.trim();

					TargetCA.coupons.getCategories();
					window.location.reload();
				}
			}
			
		}

		if(this.tool.isDesktop()){
			$("body").addClass("couponDesktop");
			this.currentDevice = "desktop";
		}

		//set place-holder as inputed postal code
		if(TargetCA.coupons.postalCodeValue != "none"){
			$(".header .interactions .postalcode input").attr("placeholder",TargetCA.coupons.postalCodeValue).attr("value",TargetCA.coupons.postalCodeValue);
		} else {
			$(".header .interactions .postalcode input").attr("placeholder","");
		}

		$(".header .interactions .postalcode .submitButtonWrapper, .couponsPopup .submitButtonWrapper").on("click", postalcodeModifyHandler);
		$(".header .interactions .postalcode input.textbox, .couponsPopup input.textbox").on("keyup", postalcodeModifyHandler);

		$( ".header .links a, .introSteps .step2 a" ).click(function(e){
			if("#"+$(this).attr("href").split("#")[1] != window.location.hash) {
				$(".section").attr("aria-hidden","true").hide();
				$(window.location.hash).attr("aria-hidden","false").hide();
				$("#"+$(this).attr("href").split("#")[1]).show().find("h2").attr("tabindex", "-1").attr("aria-hidden","false").focus();
				if($(this).attr("href").split("#")[1] == 'faq')
					document.title = (culture == "en")?"Target Canada | Coupons | FAQ":"Target Canada | Coupons | Foire aux questions";
				else if ($(this).attr("href").split("#")[1] == "policy")
					document.title = (culture == "en")?"Target Canada | Coupons | Coupon Policy":"Target Canada | Coupons | Politique sur les coupons";
			}
		});

		

		

		if(window.chrome) {
			$(".couponsChromeNoPrintError").prependTo("body");
			$("body").addClass("chrome");
		}

		//fous on textbox when it's mobile popup
		if($(".couponsPopup").length){
			$(".couponsPopup input.textbox").focus();
		} else {
			this.lightbox.init();		
		}

	},
	registerEvents: function(){
		$(".coupon a.body, .sharedCoupon a.body").on("click", function(e){
			e.preventDefault();
			TargetCA.coupons.couponToggle($(this).parent().attr("data-id"), $(this).parent().attr("data-value"));
		}).on("keypress", function(e){
			
			if(e.keyCode == 32 || e.charCode == 32) {
				e.preventDefault();
				TargetCA.coupons.couponToggle($(this).parent().attr("data-id"), $(this).parent().attr("data-value"));
				return false;
			}
		});

		$(".coupon input[type=checkbox]").on("click", function(e){
			var parentEl = $(this).parent().parent().parent();
			TargetCA.coupons.couponToggle(parentEl.attr("data-id"), parentEl.attr("data-value"));
			e.stopPropagation();

		}).on("keypress", function(e){
			if(e.keyCode == 32 || e.charCode == 32) {
				e.stopPropagation();
			}
		});
		$(".sharedCoupon input[type=checkbox]").on("click", function(e){
			var parentEl = $(this).parent().parent().parent().parent();
			TargetCA.coupons.couponToggle(parentEl.attr("data-id"), parentEl.attr("data-value"));
			e.stopPropagation();

		}).on("keypress", function(e){
			if(e.keyCode == 32 || e.charCode == 32) {
				e.stopPropagation();
			}
		});

		$(".section .head #brand_dropdown").change(function(){
			window.location = "/"+culture+"/coupons?lnk=content&brand="+this.value.replace(/'/g, "%27");
		});

		$("#categoryDropdown").change(function(){
			if(this.value == encodeURIComponent("all") || this.value == encodeURIComponent("tous")){
				window.location = "/"+culture+"/coupons?lnk=content";
			} else {
				window.location = "/"+culture+"/coupons?lnk=content&category="+this.value;
			}
			
		});

		$(".tabNavContainer ul li a").on("keyup", function(e){
			if(e.keyCode == 37 || e.charCode == 37) 
				$(this).parent().parent().prev().find("a").focus();
			else if (e.keyCode == 39 || e.charCode == 39)
				$(this).parent().parent().next().find("a").focus();
		});

		$(".tabNavContainer ul li a").on("click", function(e){
			e.preventDefault();
			$(".tabNavContainer ul li:not(:first-child)").remove();
			$("#categoryDropdown").remove();
			$(".section").remove();
			var link = this.href;
			TargetCA.coupons.pageBuilder.init(TargetCA.coupons.tool.getQueryString(link));
			window.location.hash = "?"+this.href.split("?")[1];

		});
		

		this.basket.get(function(data){
			for(var i = 0, iLen = data.selectedOffers.length; i<iLen;i++)
				if(data.selectedOffers[i])
					TargetCA.coupons.couponToggle(data.selectedOffers[i]);
			
		});

		TargetCA.interactions.backToTop();
	},
	couponToggle: function(couponId, couponValue){
		couponValue = couponValue || 0;
		if($(".coupon_"+couponId).hasClass("selected")) {
			$(".coupon_"+couponId).removeClass("selected").attr("aria-selected","false").find("input[type=checkbox]").prop('checked',false);
			this.basket.remove(couponId, couponValue);
		} else {

			$(".coupon_"+couponId).addClass("selected").attr("aria-selected","true").find("input[type=checkbox]").prop('checked',true);
			this.basket.add(couponId, couponValue);
		}
		this.basket.update();
	},
	basket: {
		cache: [],
		add: function(offerID, offerValue, cb){
			TargetCA.coupons.callAPI({
				request: 'addToBasket',
				offerID: offerID,
				savingAmount: offerValue
			}, cb);
		},
		remove: function(offerID, offerValue, cb){
			TargetCA.coupons.callAPI({
				request: 'removeFromBasket',
				offerID: offerID,
				savingAmount: offerValue
			}, cb);
		},
		get: function(cb){
			TargetCA.coupons.callAPI({
				request: 'getBasket'
			}, cb);
		},
		update: function(){
			this.get(function(data){
				var printText = (culture == 'en')?"print coupons":"Imprimer mes coupons";
				var mobilePrintText = (culture == 'en')?"get barcodes":"get barcodes FR";
				if(data.selectedOffers.length < 1 || (data.selectedOffers.length == 1 && data.selectedOffers[0] == null)) {
					$(".savingStatus.desktopOnly a.redButton").replaceWith("<div class='redButton printBtn disabled'>"+printText+" <span class='verticalLine'></span> <span class='selectedCouponCount'>0</span></div>");
					$(".savingStatus.mobileDeviceOnly a.redButton").replaceWith("<div class='redButton printBtn disabled'>"+mobilePrintText+" <span class='verticalLine'></span> <span class='selectedCouponCount'>0</span></div>");
				} else {
					$(".header .savingStatus.desktopOnly div.redButton").replaceWith('<a href="" onclick="try{Bootstrapper.__trackClick(this);}catch(e){}" id="mss1002" class="redButton printBtn" aria-disabled="false">'+printText+' <span class="verticalLine"></span> <span class="selectedCouponCount">0</span></a>');
					$(".header .savingStatus.mobileDeviceOnly div.redButton").replaceWith('<a href="/'+culture+'/coupons?lnk=content&barcode=true" onclick="try{Bootstrapper.__trackClick(this);}catch(e){}" id="mss1002" class="redButton printBtn" aria-disabled="false">'+mobilePrintText+' <span class="verticalLine"></span> <span class="selectedCouponCount">0</span></a>');
					$(".footer .savingStatus.desktopOnly div.redButton").replaceWith('<a href="" onclick="try{Bootstrapper.__trackClick(this);}catch(e){}" id="mss1003" class="redButton printBtn" aria-disabled="false">'+printText+' <span class="verticalLine"></span> <span class="selectedCouponCount">0</span></a>');
					$(".footer .savingStatus.mobileDeviceOnly div.redButton").replaceWith('<a href="/'+culture+'/coupons?lnk=content&barcode=true" onclick="try{Bootstrapper.__trackClick(this);}catch(e){}" id="mss1003" class="redButton printBtn" aria-disabled="false">'+mobilePrintText+' <span class="verticalLine"></span> <span class="selectedCouponCount">0</span></a>');
				}

				TargetCA.coupons.basket.cache = [].concat(data.selectedOffers);
				var oValue = data.offerValue;
				if((data.offerValue.toString().split(".")[1] && data.offerValue.toString().split(".")[1].length <2) || (data.offerValue.toString().split(",")[1] && data.offerValue.toString().split(",")[1].length <2))oValue += "0";
				$(".selectedCouponSaving").html(oValue);
				//a random bug...
				if(data.selectedOffers.length >= 1 && data.selectedOffers[0] == null){
					$(".selectedCouponCount").html(data.selectedOffers.length - 1);
				} else {
					$(".selectedCouponCount").html(data.selectedOffers.length);
				}

				
				
			});	

			$(".header .savingStatus.desktopOnly .printBtn, .footer .savingStatus.desktopOnly a").click(function(e){
				e.preventDefault();
				TargetCA.coupons.setupPrintJob(function(data){
					if(data.status == "SUCCESS") {
						window.location = data.printURL;
					}
				});
			});
		}
	},
	tool: {
		getQueryString: function(s) {
			if(!s) {
				var a = window.location.search.substr(1).split('&');
				if (a != "") {
					var b = {};
					for (var i = 0; i < a.length; ++i)
					{
					    var p=a[i].split('=');
					    if (p.length != 2) continue;
					    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
					}
					return b;
				} else {
					return {};
				}
			} else {
				var a = s.split("?")[1].split('&');
				if (a != "") {
					var b = {};
					for (var i = 0; i < a.length; ++i)
					{
					    var p=a[i].split('=');
					    if (p.length != 2) continue;
					    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
					}
					return b;
				} else {
					return {};
				}
			}
		},
		validatePostalcode: function(s){
			return /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/.test($.trim(s));
		},
		isDesktop: function(){
			// var isTouchDevice = function() {  return 'ontouchstart' in window || 'onmsgesturechange' in window; };
			// return window.screenX != 0 && !isTouchDevice() ? true : false;
			return $(".CategoryBody").hasClass("desktop");
		},
		isMobile: function(){
			// var isTouchDevice = function() {  return 'ontouchstart' in window || 'onmsgesturechange' in window; };
			// return window.screenX != 0 && !isTouchDevice() ? true : false;
			return $(".CategoryBody").hasClass("mobile");
		},
		isLocalStorageSupported: function() {
		  var testKey = 'test', storage = window.localStorage;

		  try {
		    storage.setItem(testKey, '1');
		    storage.removeItem(testKey);
		    return true;
		  } catch (error) {
		    return false;
		  }
		}
	},
	lightbox: {
		init: function(cb){
			if(!TargetCA.coupons.postalCodeValue && TargetCA.coupons.tool.isDesktop()){
				$("a, input").attr("tabindex", "-1");
				$("#postalcodeOverlay a, #postalcodeOverlay input").attr("tabindex", "0");
				$("#postalcodeOverlay").show().find("input.textbox").focus();

				//event handler for submitting postal code lightbox
				$("#postalcodeOverlay .submitButtonWrapper").on('click',TargetCA.coupons.lightbox.postalcodeSubmitHandler);
				$("#postalcodeOverlay .postalcode").on('keyup',TargetCA.coupons.lightbox.postalcodeSubmitHandler);

				//event handler for lightbox cancle
				$("#postalcodeOverlay .shadow").on('click',TargetCA.coupons.lightbox.postalcodeCancleHandler);
				$(document).on("keyup",TargetCA.coupons.lightbox.postalcodeCancleHandler);

			} else {
				TargetCA.coupons.lightbox.dissmisLightbox();
				TargetCA.coupons.pageBuilder.init(TargetCA.coupons.tool.getQueryString());
			}
		},
		postalcodeSubmitHandler: function(e){
			e.preventDefault();

			if((e.type == "keyup" && (e.keyCode == 13 || e.charCode == 13)) || e.type == "click"){
				var postalcode = $("#postalcodeOverlay .postalcode").val();
				if(postalcode){
					if(TargetCA.coupons.tool.validatePostalcode(postalcode.toUpperCase())){
						window.localStorage.postalCode = TargetCA.coupons.postalCodeValue = $.trim(postalcode);

						TargetCA.coupons.lightbox.dissmisLightbox();

						//build out the page
						TargetCA.coupons.pageBuilder.init(TargetCA.coupons.tool.getQueryString());
					} else {
						$("#postalcodeOverlay .error").show();
					}
				} else {
					$("#postalcodeOverlay .error").show();
				}
			}
		},
		postalcodeCancleHandler: function(e){
			if((e.type == "keyup" && (e.keyCode == 27 || e.charCode == 27)) || e.type == "click"){
				window.localStorage.postalCode = TargetCA.coupons.postalCodeValue = "none";
				TargetCA.coupons.pageBuilder.init(TargetCA.coupons.tool.getQueryString());

				TargetCA.coupons.lightbox.dissmisLightbox();
			}
		},
		dissmisLightbox: function(){
			//dismiss lightbox
			$("#postalcodeOverlay").hide();
			//restore tabindex
			$("a, input").removeAttr("tabindex");

			var noTabIndexEls = ["#skipToMainContentLink"];
			for(var i = 0, iLen = noTabIndexEls.length;i<iLen;i++)
				$(noTabIndexEls[i]).removeAttr("tabindex");

			//remove event handler
			$(document).off("keyup",TargetCA.coupons.lightbox.postalcodeCancleHandler);

			$(".preloader").hide();
			$(".nav").show();

			if(TargetCA.coupons.postalCodeValue != "none"){
				$(".header .interactions .postalcode input").attr("placeholder",TargetCA.coupons.postalCodeValue).attr("value",TargetCA.coupons.postalCodeValue);
			} else {
				$(".header .interactions .postalcode input").attr("placeholder","");
			}
		}

	},
	pageBuilder: {
		pageInitialized: false,
		init: function(queryString){
			
			if(queryString["printId"]) {
				TargetCA.coupons.getPrintSummary(queryString["printId"], function(data){
					if(data.status != "SUCCESS") {

						TargetCA.coupons.pageBuilder.defaultTemplate();
					}
					else {
						var printedCoupons = [];
						if(data.offerDetailList.constructor == Array) {

							TargetCA.coupons.pageBuilder.printSummaryTemplate(data.offerDetailList);
						}
						else {
							
							printedCoupons.push(data.offerDetailList);
							TargetCA.coupons.pageBuilder.printSummaryTemplate(printedCoupons);
						}
					}
				});
			} else if (queryString["category"] && !queryString["brand"]) {
			 	this.categoryTemplate(queryString["category"]);
			} else if (!queryString["category"] && queryString["brand"]) {
			 	if(queryString["brand"]=="all")
			 		this.brandsTemplate();
			 	else
			 		this.brandTemplate(queryString["brand"]);
			} else if (window.location.search.indexOf("brands") > 0) {
				this.brandsTemplate();
			} else if (queryString["featuring"] && TargetCA.coupons.featuring[queryString["featuring"]]) {
				this.couponListTemplate(TargetCA.coupons.featuring[queryString["featuring"]].ids);
			} else if (queryString["id"]) {
				if(queryString["id"].split(',').length <= 1) {
					this.detailPageTemplate(queryString["id"]);
				} else {
					this.couponListTemplate(queryString["id"].split(','));
				}
			} else {
				var loc = window.location.href;
			 	if( loc.indexOf( "#faq" ) != -1 || loc.indexOf( "#policy" ) != -1 )
			 		this.staticPageHandler();
			 	else if(queryString["share"])
			 		this.sharePageTemplate(queryString["share"]);
			 	else
			 		this.defaultTemplate();
			}
			 
			TargetCA.coupons.registerEvents();
		},
		addCategory: function(o, cb){
			var navElHTML = o.isActive?"\
				<li class='active'>\
					<div class='tabWrap'>\
						<a href='"+o.url+"' class='middle tab' role='tab' aria-selected='true' tabindex='0' id='"+o.copy.replace(/\s+/g, '-').toLowerCase()+"'>\
							 	"+o.copy+"\
						</a>\
					</div>\
				</li>\
			":"\
				<li>\
					<div class='tabWrap'>\
						<a href='"+o.url+"' class='middle tab' role='tab' aria-selected='false' tabindex='-1' id='"+o.copy.replace(/\s+/g, '-').toLowerCase()+"'>\
							 	"+o.copy+"\
						</a>\
					</div>\
				</li>\
			";
			$(".nav .tabNavContainer ul").append(navElHTML);
			if(typeof cb == "function")cb.call(this);
		},
		addCoupon: function(o, cb){
			var exc = "";
			var capClass = "";
			if(o.exclusive){
				exc = (culture == 'en')?"<img src='/assets/images/content-pages/coupons/exclusive.png' alt='TARGET EXCLUSIVE'>":"<img src='/assets/images/content-pages/coupons/exclusive_fr.jpg' alt='TARGET EXCLUSIVE'>";

			}

			if( o.price.indexOf( 'Target Mobile' ) != -1 || o.price.indexOf( 'Target Mobilité' ) != -1 ){
				capClass = "normal";
			}

			if(culture == 'en') {
				var elHTML = "\
					<div class='coupon coupon_"+o.id+" "+o.extraClasses+"' data-value='"+o.offerValue+"' data-id='"+o.id+"'>\
						<a href='javascript:void(0);' class='body' onclick='try{Bootstrapper.__trackClick(this);}catch(e){}' id='mss1001_"+o.id+"' aria-role='checkbox' role='checkbox' aria-selected='false'>\
							<div class='redLine'></div>\
							<img src='"+o.imgURL+"' alt=\""+o.imgAltText+"\" class='couponImage'>\
							<span class='exclusiveImage'>"+exc+"</span>\
							<div class='couponText'>\
								<h3 class='" + capClass + "'>"+o.price+"</h3>\
								<p>"+o.desc+"</p>\
							</div>\
							<div class='selectBox'>\
								<div class='checkbox'><img src='/assets/images/content-pages/coupons/selectboxChecked.png' alt='' /></div>\
								<input type='checkbox' tabindex='-1'>\
								select coupon\
							</div>\
							<span class='clearfloat'></span>\
						</a>\
						\
						<div class='socialMedia'>\
							share: \
							<a id='coupon"+o.id+"' href='#externalLinkPrompt' data-continue='"+o.facebookLink+"' class='facebook overlay'><img src='/assets/images/content-pages/coupons/facebook.png' alt='Facebook: "+o.desc+"'></a>\
							<a id='twitterCoupon"+o.id+"' href='#externalLinkPrompt' data-continue='"+o.twitterLink.replace(/'/g, "%27")+"' class='twitter overlay'><img src='/assets/images/content-pages/coupons/twitter.png' alt='Twitter:"+o.desc+"'></a>\
						</div>\
					</div>\
				";
			} else {
				var elHTML = "\
					<div class='coupon coupon_"+o.id+" "+o.extraClasses+"' data-value='"+o.offerValue+"' data-id='"+o.id+"'>\
						<a href='javascript:void(0);' class='body' onclick='try{Bootstrapper.__trackClick(this);}catch(e){}' id='mss1001_"+o.id+"' aria-role='checkbox' role='checkbox' aria-selected='false'>\
							<div class='redLine'></div>\
							<img src='"+o.imgURL+"' alt=\""+o.imgAltText+"\" class='couponImage'>\
							<span class='exclusiveImage'>"+exc+"</span>\
							<div class='couponText'>\
								<h3 class='" + capClass + "'>"+o.price+"</h3>\
								<p>"+o.desc+"</p>\
							</div>\
							<div class='selectBox'>\
								<div class='checkbox'><img src='/assets/images/content-pages/coupons/selectboxChecked.png' alt='' /></div>\
								<input type='checkbox' tabindex='-1'>\
								<span class='text'>Choisir ce coupon</span>\
							</div>\
							<span class='clearfloat'></span>\
						</a>\
						\
						<div class='socialMedia'>\
							Partager : \
							<a href='"+o.facebookLink+"' target='_blank' class='facebook'><img src='/assets/images/content-pages/coupons/facebook.png' alt='facebook'></a>\
							<a href='"+o.twitterLink.replace(/'/g, "%27")+"' target='_blank' class='twitter'><img src='/assets/images/content-pages/coupons/twitter.png' alt='twitter'></a>\
						</div>\
					</div>\
				";
				 
			}
			
			if(o.exclusive)
				if($(".sharedCoupon").length)
					$(elHTML).insertAfter(o.container + " .sharedCoupon");
				else
					$(elHTML).insertAfter(o.container + " .head");
			else
				if(o.backTop)
					$(elHTML).insertBefore(o.container + " .backTop");
				else
					$(elHTML).appendTo(o.container);
			if(typeof cb == "function")cb.call(this);
		},
		addSharedCoupon: function(o,cb){
			var exc = "";
			var capClass = "";
			if(o.exclusive){
				exc = "<img src='/assets/images/content-pages/coupons/exclusive.png' alt='TARGET EXCLUSIVE'>";
			}

			if( o.price.indexOf( 'Target Mobile' ) != -1 || o.price.indexOf( 'Target Mobilité' ) != -1 ){
				capClass = "normal";
			}

			if(culture == 'en') {
				var elHTML = "\
					<div class='sharedCoupon coupon_"+o.id+" "+o.extraClasses+"' data-value='"+o.offerValue+"' data-id='"+o.id+"'>\
						<img src='/assets/images/content-pages/coupons/sharedCouponBackground.png' alt='"+o.imgAltText+"' class='sharedCouponBackground' />\
						<div class='redLine'></div>\
						<a href='' class='body' onclick='try{Bootstrapper.__trackClick(this);}catch(e){}' id='mss1001_"+o.id+"' aria-role='checkbox'>\
							<div class='imgContainer'>\
								<img src='"+o.imgURL+"' alt='"+o.imgAltText+"' class='sharedCouponImage'>\
							</div>\
							<div class='contentContainer'>\
								<span class='exclusiveImage'>"+exc+"</span>\
								<div class='couponText'>\
									<h3 class='" + capClass + "'>"+o.price+"</h3>\
									<p>"+o.desc+"</p>\
								</div>\
								<div class='selectBox'>\
									<div class='checkbox'><img src='/assets/images/content-pages/coupons/selectboxChecked.png' alt='' /></div>\
									<input type='checkbox' tabindex='-1'>\
									select coupon\
								</div>\
								<span class='clearfloat'></span>\
							</div>\
						</a>\
						<div class='socialMedia'>\
							share: \
							<a href='"+o.facebookLink+"' class='facebook'><img src='/assets/images/content-pages/coupons/facebook.png' alt='facebook'></a>\
							<a href='"+o.twitterLink.replace(/'/g, "%27")+"' class='twitter'><img src='/assets/images/content-pages/coupons/twitter.png' alt='twitter'></a>\
						</div>\
					</div>\
				";
			} else {
				var elHTML = "\
					<div class='sharedCoupon coupon_"+o.id+" "+o.extraClasses+"' data-value='"+o.offerValue+"' data-id='"+o.id+"'>\
						<img src='/assets/images/content-pages/coupons/sharedCouponBackground.png' alt='"+o.imgAltText+"' class='sharedCouponBackground' />\
						<div class='redLine'></div>\
						<a href='' class='body' onclick='try{Bootstrapper.__trackClick(this);}catch(e){}' id='mss1001_"+o.id+"' aria-role='checkbox'>\
							<div class='imgContainer'>\
								<img src='"+o.imgURL+"' alt='"+o.imgAltText+"' class='sharedCouponImage'>\
							</div>\
							<div class='contentContainer'>\
								<span class='exclusiveImage'>"+exc+"</span>\
								<div class='couponText'>\
									<h3 class='" + capClass + "'>"+o.price+"</h3>\
									<p>"+o.desc+"</p>\
								</div>\
								<div class='selectBox'>\
									<div class='checkbox'><img src='/assets/images/content-pages/coupons/selectboxChecked.png' alt='' /></div>\
									<input type='checkbox' tabindex='-1'>\
									<span class='text'>Choisir ce coupon</span>\
								</div>\
								<span class='clearfloat'></span>\
							</div>\
						</a>\
						<div class='socialMedia'>\
							Partager : \
							<a href='"+o.facebookLink+"' class='facebook'><img src='/assets/images/content-pages/coupons/facebook.png' alt='facebook'></a>\
							<a href='"+o.twitterLink.replace(/'/g, "%27")+"' class='twitter'><img src='/assets/images/content-pages/coupons/twitter.png' alt='twitter'></a>\
						</div>\
					</div>\
				";
			}
			
			$(elHTML).insertAfter(o.container + " .head");
			if(typeof cb == "function")cb.call(this);
		},
		addBrand: function(o, cb){
			var link = o.link;
			link = link.replace(/'/g, "%27");
			var elHTML = "\
				<a class='brand' href=\""+link+"\">\
					<img src='"+o.imgURL+"' alt='"+o.imgAltText+"' class='brandPic'>\
					<p class='red'>"+decodeURIComponent(encodeURIComponent(o.brand).replace("%C2%92", "%27"))+"</p>\
				</a>\
			";

			$(o.container + " .backTop").before(elHTML);
			if(typeof cb == "function")cb.call(this);
		},
		addPrintedCoupon: function(o, cb){
			var exc = "";
			if(o.exclusive){
				exc = "<img src='/assets/images/content-pages/coupons/exclusive.png' alt='TARGET EXCLUSIVE'>";

			}
			
			if(culture == 'en') {
				var elHTML = "\
					<div class='printedCoupon coupon_"+o.id+" "+o.extraClasses+"'>\
						<div class='couponImage'>\
							<img src='"+o.imgURL+"' alt='"+o.imgAltText+"'>\
						</div>\
						<div class='couponText'>\
							<span class='exclusiveImage'>"+exc+"</span>\
							<h3>"+o.price+"</h3>\
							<p>"+o.desc+"</p>\
						</div>\
						<div class='couponBarcode mobileDeviceOnly'>\
							<img src='/assets/images/content-pages/coupons/fakebarcode.jpg' alt='' />\
						</div>\
						<div class='couponExpireDate'>\
							<p>Expires: "+o.expireDate+"</p>\
						</div>\
					</div>\
				";
			} else {
				var elHTML = "\
					<div class='printedCoupon coupon_"+o.id+" "+o.extraClasses+"'>\
						<div class='couponImage'>\
							<img src='"+o.imgURL+"' alt='"+o.imgAltText+"'>\
						</div>\
						<div class='couponText'>\
							<span class='exclusiveImage'>"+exc+"</span>\
							<h3>"+o.price+"</h3>\
							<p>"+o.desc+"</p>\
						</div>\
						<div class='couponBarcode mobileDeviceOnly'>\
							<img src='/assets/images/content-pages/coupons/fakebarcode.jpg' alt='' />\
						</div>\
						<div class='couponExpireDate'>\
							<p>Expire le : "+o.expireDate+"</p>\
						</div>\
					</div>\
				";
			}
			
			$(elHTML).prependTo(".printSummary .printCouponsContainer");
			if(typeof cb == "function")cb.call(this);
		},
		addCategoryList: function(list, selectedCategory){
			var options = "";

			for(var i = 0, iLength = list.length;i<iLength;i++) {
				var option = list[i];
				var selected = (option==selectedCategory)?"selected ":" ";
				options += "<option value=\""+encodeURIComponent(option)+"\" "+selected+">"+option.toLowerCase()+"</option>";
			}

			var elHTML = "\
				<select name='categoryDropdown' id='categoryDropdown' class='mobileOnly'>\
					"+options+"\
				</select>\
			";
			$(elHTML).insertBefore(".mainCouponContainer");
		},
		addSection: function(type, o, cb){
			var elHTML = "";
			var backToTopCopy = (culture=='en')?'back to top':'retour au haut de la page';
			var subHeadingCopy = function(title) {
				if(culture=='en') {
					return "see all "+title.toLowerCase()+" coupons";
				} else {
					return "Voir tous les coupons : "+title;
				}
			}
			switch(type) {
				case "categories":
					elHTML = "\
						<div class='section overview "+o.title.replace(/\s+/g, '-').toLowerCase()+"' aria-labelledby='"+o.title.replace(/\s+/g, '-').toLowerCase()+"'>\
							<div class='head'>\
								<h2>"+o.title+"</h2>\
								<div><a href='"+o.link+"' class='redLink'>"+subHeadingCopy(o.title)+"</a></div>\
							</div>\
							<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
							"+((o.last)?"\
								<div class='couponBarcodeLegal mobileDeviceOnly'>\
								<p>Valid in Canada stores only. Limit one manufacturer and one Target coupon per item unless otherwise prohibited. Limit of 4 identical coupons per household, per day unless otherwise stated. Void if copied, scanned, altered, transferred, purchased, sold or prohibited by law. Item(s) may not be available at all stores. Applicable sales taxes will be charged on the full value of the item(s) before the reduction in coupon value and are included in the face value, where applicable. Coupon value may not exceed value of item purchased. No cash value. Target reserves the right to accept, refuse, or limit the use of any&nbsp;coupon.</p>\
								</div>":"")+"\
						</div>\
					";
					
					break;
				case "category":
					if(culture == 'en') {
						elHTML = "\
							<div class='section "+o.title.replace(/\s+/g, '-').toLowerCase()+"' aria-labelledby='"+o.title.replace(/\s+/g, '-').toLowerCase()+"'>\
								<div class='head'>\
									<h2>"+o.title+"</h2>\
									<p class='shareCouponHeadline'>Here is the coupon that was shared with you.</p>\
								</div>\
								<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
								<div class='couponBarcodeLegal mobileDeviceOnly'>\
								<p>Valid in Canada stores only. Limit one manufacturer and one Target coupon per item unless otherwise prohibited. Limit of 4 identical coupons per household, per day unless otherwise stated. Void if copied, scanned, altered, transferred, purchased, sold or prohibited by law. Item(s) may not be available at all stores. Applicable sales taxes will be charged on the full value of the item(s) before the reduction in coupon value and are included in the face value, where applicable. Coupon value may not exceed value of item purchased. No cash value. Target reserves the right to accept, refuse, or limit the use of any&nbsp;coupon.</p>\
								</div>\
							</div>\
						";
					} else {
						elHTML = "\
							<div class='section "+o.title.replace(/\s+/g, '-').toLowerCase()+"' aria-labelledby='"+o.title.replace(/\s+/g, '-').toLowerCase()+"'>\
								<div class='head'>\
									<h2>"+o.title+"</h2>\
									<p class='shareCouponHeadline'>Voici le coupon qui a été partagé avec vous.</p>\
								</div>\
								<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
							</div>\
						";
					}
					
					break;
				case "brands":
					if(culture == 'en'){
						elHTML = "\
							<div class='section brands' aria-labelledby='brands'>\
								<div class='head'>\
									<h2>brands</h2>\
									<p>Select a brand to see available coupons.</p>\
								</div>\
								<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
							</div>\
						";
					} else {
						elHTML = "\
							<div class='section brands' aria-labelledby='brands'>\
								<div class='head'>\
									<h2>Marques</h2>\
									<p>Sélectionnez une marque pour voir les coupons offerts. </p>\
								</div>\
								<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
							</div>\
						";
					}
					break;
				case "brand":
					var options = "";
					for(var i = 0, length = o.selectList.length;i<length;i++) {
						var val = o.selectList[i].value;
						
						var option = o.selectList[i].option;
						option = encodeURIComponent( option );
						option = option.replace( "%C2%92", "%27" );
						option = decodeURIComponent( option );
						options+= "<option value=\""+val+"\" "+o.selectList[i].selected+">"+option+"</option>";
					}
					if(culture == 'en'){
						elHTML = "\
							<div class='section brand "+o.title.replace(/\s+/g, '-').toLowerCase()+"' aria-labelledby='"+o.title.replace(/\s+/g, '-').toLowerCase()+"'>\
								<div class='head'>\
									<h2>"+decodeURIComponent(encodeURIComponent(o.title).replace( "%C2%92", "%27" ))+"</h2>\
									<div class='dropdown'>\
										<p>select a brand: </p>\
										<select name='brand_dropdown' id='brand_dropdown'>\
											"+options+"\
										</select>\
									</div>\
								</div>\
								<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
								<div class='couponBarcodeLegal mobileDeviceOnly'>\
								<p>Valid in Canada stores only. Limit one manufacturer and one Target coupon per item unless otherwise prohibited. Limit of 4 identical coupons per household, per day unless otherwise stated. Void if copied, scanned, altered, transferred, purchased, sold or prohibited by law. Item(s) may not be available at all stores. Applicable sales taxes will be charged on the full value of the item(s) before the reduction in coupon value and are included in the face value, where applicable. Coupon value may not exceed value of item purchased. No cash value. Target reserves the right to accept, refuse, or limit the use of any&nbsp;coupon.</p>\
								</div>\
							</div>\
						";
					} else {
						elHTML = "\
							<div class='section brand "+o.title.replace(/\s+/g, '-').toLowerCase()+"' aria-labelledby='"+o.title.replace(/\s+/g, '-').toLowerCase()+"'>\
								<div class='head'>\
									<h2>"+decodeURIComponent(encodeURIComponent(o.title).replace( "%C2%92", "%27" ))+"</h2>\
									<div class='dropdown'>\
										<p>Sélectionnez une marque</p>\
										<select name='brand_dropdown' id='brand_dropdown'>\
											"+options+"\
										</select>\
									</div>\
								</div>\
								<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
							</div>\
						";
					}
					
					break;
				case "featuredCoupons":
					if(culture == 'en'){
						// alert(o.hideLink);
						elHTML = "\
							<div class='section featuredCoupons'>\
								<div class='head'>\
									<h2>"+((o.sectionHeadline)?o.sectionHeadline:"featured coupons")+"</h2>\
									"+((o.hideLink == true)?"":"<div><a href='/en/coupons/' class='redLink'>see all categories</a></div>")+"\
								</div>\
								<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
								<div class='couponBarcodeLegal mobileDeviceOnly'>\
								<p>Valid in Canada stores only. Limit one manufacturer and one Target coupon per item unless otherwise prohibited. Limit of 4 identical coupons per household, per day unless otherwise stated. Void if copied, scanned, altered, transferred, purchased, sold or prohibited by law. Item(s) may not be available at all stores. Applicable sales taxes will be charged on the full value of the item(s) before the reduction in coupon value and are included in the face value, where applicable. Coupon value may not exceed value of item purchased. No cash value. Target reserves the right to accept, refuse, or limit the use of any&nbsp;coupon.</p>\
								</div>\
							</div>\
						";
					} else {
						elHTML = "\
							<div class='section featuredCoupons'>\
								<div class='head'>\
									<h2>"+((o.sectionHeadline)?o.sectionHeadline:"coupons vedettes")+"</h2>\
									"+((o.hideLink == true)?"":"<div><a href='/fr/coupons/' class='redLink'>voir toutes les catégories</a></div>")+"\
								</div>\
								<div class='backTop'><a href='#top'><span>"+backToTopCopy+"</span><span class='arrow'></span></a></div>\
							</div>\
						";
					}
					break;
			}
			$(".mainCouponContainer").append(elHTML);
			if(typeof cb == "function")cb.call(this);
		},
		isCouponInBasket: function(couponID){
			TargetCA.coupons.basket.update();
			var basket = TargetCA.coupons.basket.cache;
			for(var i = 0, length = basket.length; i<length;i++){
				if(couponID==basket[i]) return true;
			}
			return false;
		},
		isCouponExclusive: function(couponDesc){
			if((couponDesc.toUpperCase().indexOf("TARGET EXCLUSIVE") != -1) || (couponDesc.toUpperCase().indexOf("EXCLUSIVITÉ TARGET") != -1)){
				return true;
			} else {
				return false;
			}
		},
		removeExclusive: function(couponDesc){
			return couponDesc.replace("TARGET EXCLUSIVE","").replace("EXCLUSIVITÉ TARGET","");
		},
		defaultTemplate: function(){
			document.title = "Target Canada | Coupons";
			//generate categories
			this.addCategory({
				url: "/"+culture+"/coupons?lnk=content",
				isActive: 1,
				copy: (culture=="en")?"all":"tous"
			});

			
			TargetCA.coupons.getCategories(function(data){
				var categories = [];
				if(culture == "en") {
					categories.push("all");
				} else {
					categories.push("tous");
				}
				for(var i = 0, length = data.categories.length;i<length;i++) {
					var category = data.categories[i];
					categories.push(category);
					TargetCA.coupons.pageBuilder.addCategory({
						url: "/"+culture+"/coupons?lnk=content&category="+category,
						isActive: 0,
						copy: category
					});

					//generate sections and contents
					TargetCA.coupons.pageBuilder.addSection("categories", {
						title: category,
						link: "/"+culture+"/coupons?lnk=content&category="+category,
						last: (i == length - 1)
					}, function(){
						TargetCA.coupons.getCouponsByCategory(category, function(data){
							var twitterCopy = (culture == "en")?"at Target Canada. Check it out:":"chez Target Canada. Jetez-y un coup d’œil :";
							for(var g = 0;g<4;g++){
								var offer = data.offers[g];
								if(!offer)break;
								if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(offer.offerHeadLine))offer.offerHeadLine = offer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢");
								//var imgAlt = (culture == "en")?"Target coupon for "+ offer.brandName+ ":":"Coupon Target pour "+ offer.brandName+ " :";
								var imgAlt = "";
								TargetCA.coupons.pageBuilder.addCoupon({
									container: ".section."+category.replace(/\s+/g, '-').toLowerCase(),
									imgURL: offer.imageURL,
									imgAltText: imgAlt,
									price: offer.offerHeadLine,
									desc: TargetCA.coupons.pageBuilder.removeExclusive(offer.offerDescription),
									facebookLink: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://"+window.location.hostname+"/api/coupons?share="+offer.offerId+"&l="+culture),
									twitterLink: "http://twitter.com/share?url="+encodeURIComponent("http://www.target.ca/"+culture+"/coupons?share="+offer.offerId)+"&text="+encodeURIComponent(offer.offerHeadLine +" " +offer.offerDescription.replace(/(<([^>]+)>)/ig,"") +" " +  twitterCopy),
									extraClasses: (TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription)?"exclusive ":" "),
									id: offer.offerId,
									offerValue: offer.offerValue,
									exclusive: TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription),
									backTop: true
								});
							}
						});
						
					});
				}
				if(culture == "en") {
					TargetCA.coupons.pageBuilder.addCategoryList(categories, "all");
				} else {
					TargetCA.coupons.pageBuilder.addCategoryList(categories, "tous");
				}
				var queryString = TargetCA.coupons.tool.getQueryString();
				if(queryString["err"] == "category") $(".noCategoryError").show();
				
			});
			this.addCategory({
				url: "/"+culture+"/coupons?lnk=content&brand=all",
				isActive: 0,
				copy: (culture=="en")?"brands":"Marques"
			});

			
			

		},
		categoryTemplate: function(selectedCategory, noFocus){
			document.title = "Target Canada | Coupons | " + selectedCategory;
			//generate categories
			this.addCategory({
				url: "/"+culture+"/coupons?lnk=content",
				isActive: 0,
				copy: (culture=="en")?"all":"tous"
			});

			var categories = [];

			var isCategoryExist = false;
			if(culture == "en") {
				categories.push("all");
			} else {
				categories.push("tous");
			}
			TargetCA.coupons.getCategories(function(data){
				for(var i = 0, length = data.categories.length;i<length;i++) {
					var category = data.categories[i];
					if(category.toLowerCase() == selectedCategory.toLowerCase()) {
						isCategoryExist = true;
						selectedCategory = category;
					}
					categories.push(category);
					TargetCA.coupons.pageBuilder.addCategory({
						url: "/"+culture+"/coupons?lnk=content&category="+category,
						isActive: (category == selectedCategory)?1:0,
						copy: category.toLowerCase()
					});
				}
			});

			if(!isCategoryExist) {
				window.location = '/'+culture+'/coupons?err=category';
			} else {
				TargetCA.coupons.pageBuilder.addCategoryList(categories, selectedCategory);

				this.addCategory({
					url: "/"+culture+"/coupons?lnk=content&brand=all",
					isActive: 0,
					copy: (culture=="en")?"brands":"Marques"
				});

				//generate sections and contents
				TargetCA.coupons.pageBuilder.addSection("category", {
					title: selectedCategory
				}, function(){

					TargetCA.coupons.getCouponsByCategory(selectedCategory, function(data){
						var twitterCopy = (culture == "en")?"at Target Canada. Check it out:":"chez Target Canada. Jetez-y un coup d’œil :";
						for(var g = 0, gLength = data.offers.length;g<gLength;g++){
							var offer = data.offers[g];
							var imgAlt = (culture == "en")?"Target coupon for "+ offer.brandName+ ":":"Coupon Target pour "+ offer.brandName+ " :";
							if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(offer.offerHeadLine))offer.offerHeadLine = offer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢");
							TargetCA.coupons.pageBuilder.addCoupon({
								container: ".section."+selectedCategory.replace(/\s+/g, '-').toLowerCase(),
								imgURL: offer.imageURL,
								imgAltText: imgAlt,
								price: offer.offerHeadLine,
								desc: TargetCA.coupons.pageBuilder.removeExclusive(offer.offerDescription),
								facebookLink: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://"+window.location.hostname+"/api/coupons?share="+offer.offerId+"&l="+culture),
								twitterLink: "http://twitter.com/share?url="+encodeURIComponent("http://www.target.ca/"+culture+"/coupons?share="+offer.offerId)+"&text="+encodeURIComponent(offer.offerHeadLine +" " +offer.offerDescription.replace(/(<([^>]+)>)/ig,"") +" " +  twitterCopy),
								extraClasses: (TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription)?"exclusive ":" "),
								id: offer.offerId,
								offerValue: offer.offerValue,
								exclusive: TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription),
								backTop: true
							});
						}
					});
					if(!noFocus) $(".section .head h2").attr("tabindex", "-1").focus();
				});
			}


		},
		brandsTemplate: function(){
			document.title = (culture=='en')?'Target Canada | Coupons | Brands':'Target Canada | Coupons | Marques';
			//nav initialized
			this.addCategory({
				url: "/"+culture+"/coupons?lnk=content",
				isActive: 0,
				copy: (culture=="en")?"all":"tous"
			});
			TargetCA.coupons.getCategories(function(data){

				for(var i = 0, length = data.categories.length;i<length;i++) {
					var category = data.categories[i];
					TargetCA.coupons.pageBuilder.addCategory({
						url: "/"+culture+"/coupons?lnk=content&category="+category,
						isActive: 0,
						copy: category.toLowerCase()
					});
				}
			});
			this.addCategory({
				url: "/"+culture+"/coupons?lnk=content&brand=all",
				isActive: 1,
				copy: (culture=="en")?"brands":"Marques"
			});
			$(".tabNavContainer ul li:first-child").removeClass("active").attr("aria-selected","false");

			this.addSection("brands", {}, function(){
				TargetCA.coupons.getBrands(function(data){

					for(var i = 0, iLength = data.brands.length;i<iLength;i++){
						var brand = data.brands[i];

						TargetCA.coupons.pageBuilder.addBrand({
							imgURL: brand.imageURL,
							link: "/"+culture+"/coupons?brand="+ encodeURIComponent(brand.brand),
							imgAltText: brand.brand,
							brand: brand.brand,
							container: ".section.brands"
						});
					}
				});
				$(".section .head h2").attr("tabindex", "-1").focus();
			});
		},
		brandTemplate: function(selectedBrand){
			document.title = "Target Canada | Coupons | " + selectedBrand;
	 		//nav initialized
	 		this.addCategory({
	 			url: "/"+culture+"/coupons?lnk=content",
	 			isActive: 0,
	 			copy: (culture=="en")?"all":"tous"
	 		});

	 		
	 		TargetCA.coupons.getCategories(function(data){
	 			for(var i = 0, length = data.categories.length;i<length;i++) {
	 				var category = data.categories[i];
	 				TargetCA.coupons.pageBuilder.addCategory({
	 					url: "/"+culture+"/coupons?lnk=content&category="+category,
	 					isActive: 0,
	 					copy: category.toLowerCase()
	 				});
	 			}
	 		});
	 		this.addCategory({
	 			url: "/"+culture+"/coupons?lnk=content&brand=all",
	 			isActive: 1,
	 			copy: (culture=="en")?"brands":"Marques"
	 		});
	 		$(".tabNavContainer ul li:first-child").removeClass("active");


	 		var isBrandExist = false;

	 		TargetCA.coupons.getBrands(function(data){
	 			var brandList = [];
	 			for(var i = 0, iLength = data.brands.length;i<iLength;i++){
	 				var brand = data.brands[i];

	 				if(brand.brand.toLowerCase() == selectedBrand.toLowerCase()) {
	 					isBrandExist=true;
	 					selectedBrand = brand.brand;
	 				}

	 				brandList.push({
	 					option: brand.brand,
	 					value: encodeURIComponent(brand.brand),
	 					selected: (decodeURIComponent(brand.brand) == selectedBrand)?"selected":""
	 				});
	 			}
	 			if(!isBrandExist){
	 				window.location = '/'+culture+'/coupons?brands';
	 			} else {
		 			TargetCA.coupons.pageBuilder.addSection("brand",{
		 				title: selectedBrand,
		 				selectList: [].concat(brandList)
		 			}, function(){
		 				TargetCA.coupons.getCouponsByBrand(selectedBrand, function(data){
		 					var twitterCopy = (culture == "en")?"at Target Canada. Check it out:":"chez Target Canada. Jetez-y un coup d’œil :";
		 					for(var i=0, iLength = data.offers.length;i<iLength;i++){
		 						var offer = data.offers[i];
		 						var imgAlt = (culture == "en")?"Target coupon for "+ offer.brandName+ ":":"Coupon Target pour "+ offer.brandName+ " :";
		 						if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(offer.offerHeadLine))offer.offerHeadLine = offer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢");
		 						TargetCA.coupons.pageBuilder.addCoupon({
		 							container: ".section",
		 							imgURL: offer.imageURL,
		 							imgAltText: imgAlt,
		 							price: offer.offerHeadLine,
		 							desc: TargetCA.coupons.pageBuilder.removeExclusive(offer.offerDescription),
									facebookLink: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://"+window.location.hostname+"/api/coupons?share="+offer.offerId+"&l="+culture),
		 							twitterLink: "http://twitter.com/share?url="+encodeURIComponent("http://www.target.ca/"+culture+"/coupons?share="+offer.offerId)+"&text="+encodeURIComponent(offer.offerHeadLine +" " +offer.offerDescription.replace(/(<([^>]+)>)/ig,"") +" " +  twitterCopy),
		 							extraClasses: (TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription)?"exclusive ":" "),
		 							id: offer.offerId,
		 							offerValue: offer.offerValue,
									exclusive: TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription),
									backTop: true
		 						});
		 					}
		 					
		 				});

						$(".section .head h2").attr("tabindex", "-1").focus();
		 			});
	 			}
	 		});
		},
		sharePageTemplate: function(sharedCouponId){

			TargetCA.coupons.getCoupon(sharedCouponId, function(data){
				if(!data) {
					TargetCA.coupons.pageBuilder.defaultTemplate();
					$(".nav .noCouponError").show();
				} else {
					var offer = data.offer;
					if(offer.categoryName) {
						var category = (typeof offer.categoryName == "string")?offer.categoryName:offer.categoryName[0];
					} else {
						window.location = '/'+culture+'/coupons?err=category';
						return;
					}
					
					TargetCA.coupons.pageBuilder.categoryTemplate(category, true);

					$(".mainCouponContainer .coupon.coupon_"+offer.offerId).remove();
					$(".section p.shareCouponHeadline").show();
					var twitterCopy = (culture == "en")?"at Target Canada. Check it out:":"chez Target Canada. Jetez-y un coup d’œil :";
					var imgAlt = (culture == "en")?"Target coupon for "+ offer.brandName+ ":":"Coupon Target pour "+ offer.brandName+ " :";
					if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(offer.offerHeadLine))offer.offerHeadLine = offer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢");
					TargetCA.coupons.pageBuilder.addSharedCoupon({
						container: ".section."+category.replace(/\s+/g, '-').toLowerCase(),
						imgURL: offer.imageURL,
						imgAltText: imgAlt,
						price: offer.offerHeadLine,
						desc: TargetCA.coupons.pageBuilder.removeExclusive(offer.offerDescription),
						facebookLink: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://"+window.location.hostname+"/api/coupons?share="+offer.offerId+"&l="+culture),
						twitterLink: "http://twitter.com/share?url="+encodeURIComponent("http://www.target.ca/"+culture+"/coupons?share="+offer.offerId)+"&text="+encodeURIComponent(offer.offerHeadLine +" " +offer.offerDescription.replace(/(<([^>]+)>)/ig,"") +" " +  twitterCopy),
						extraClasses: (TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription)?"exclusive ":" "),
						id: offer.offerId,
						offerValue: offer.offerValue,
						exclusive: TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription),
						backTop: false
					});
				}
				
			});
		},
		couponListTemplate: function(couponList){

			TargetCA.coupons.getCouponByList(couponList, function(data){
				if(!data) {
					TargetCA.coupons.pageBuilder.defaultTemplate();
					$(".nav .noCouponError").show();
				} else {
					var coupons = data;
					document.title = (culture=="en")?"Target Canada | Coupons | Featured Coupons":"Target Canada | Coupons | Coupons Vedettes";
					//generate categories
					TargetCA.coupons.pageBuilder.addCategory({
						url: "/"+culture+"/coupons?lnk=content",
						isActive: 0,
						copy: (culture=="en")?"all":"tous"
					});

					TargetCA.coupons.getCategories(function(data){
						for(var i = 0, length = data.categories.length;i<length;i++) {
							var category = data.categories[i];
							TargetCA.coupons.pageBuilder.addCategory({
								url: "/"+culture+"/coupons?lnk=content&category="+category,
								isActive: 0,
								copy: category.toLowerCase()
							});
						}
					});
					TargetCA.coupons.pageBuilder.addCategory({
						url: "/"+culture+"/coupons?lnk=content&brand=all",
						isActive: 0,
						copy: (culture=="en")?"brands":"Marques"
					});
					$(".tabNavContainer ul li:first-child").removeClass("active");


					var queryString = TargetCA.coupons.tool.getQueryString(), sectionHeadline = 0, hideLink = false;
					if(queryString["sH"]){
						sectionHeadline = queryString.sH;
						hideLink = queryString["hL"];
					} else if (queryString["featuring"] && TargetCA.coupons.featuring[queryString["featuring"]]) {
						var featuredPage = TargetCA.coupons.featuring[queryString["featuring"]];
						sectionHeadline = ((culture=="en")?featuredPage.title:featuredPage.title_fr);
						hideLink = queryString["hL"] || featuredPage.hideLink;
							// var sharedCouponId = queryString["id"];
							// console.log(sharedCouponId);
							// TargetCA.coupons.getCoupon(sharedCouponId, function(data){

							// 	if(data) {
							// 		var offer = data.offer;
							// 		if(offer.categoryName) {
							// 			var category = (typeof offer.categoryName == "string")?offer.categoryName:offer.categoryName[0];
							// 		} else {
							// 			window.location = '/'+culture+'/coupons?err=category';
							// 			return;
							// 		}
							// 		$(".mainCouponContainer .coupon.coupon_"+offer.offerId).remove();
							// 		var twitterCopy = (culture == "en")?"at Target Canada. Check it out:":"chez Target Canada. Jetez-y un coup d’œil :";
							// 		var imgAlt = (culture == "en")?"Target coupon for "+ offer.brandName+ ":":"Coupon Target pour "+ offer.brandName+ " :";
							// 		if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(offer.offerHeadLine))offer.offerHeadLine = offer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢"); 
							// 		TargetCA.coupons.pageBuilder.addSharedCoupon({
							// 			container: ".section",
							// 			imgURL: offer.imageURL,
							// 			imgAltText: imgAlt,
							// 			price: offer.offerHeadLine,
							// 			desc: TargetCA.coupons.pageBuilder.removeExclusive(offer.offerDescription),
							// 			facebookLink: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://"+window.location.hostname+"/api/coupons?share="+offer.offerId+"&l="+culture),
							// 			twitterLink: "http://twitter.com/share?url="+encodeURIComponent("http://www.target.ca/"+culture+"/coupons?share="+offer.offerId)+"&text="+encodeURIComponent(offer.offerHeadLine +" " +offer.offerDescription.replace(/(<([^>]+)>)/ig,"") +" " +  twitterCopy),
							// 			extraClasses: (TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription)?"exclusive ":" "),
							// 			id: offer.offerId,
							// 			offerValue: offer.offerValue,
							// 			exclusive: TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription),
							// 			backTop: false
							// 		}, function(){
							// 			if(!TargetCA.coupons.pageBuilder.isCouponInBasket(sharedCouponId)) TargetCA.coupons.basket.add(offer.offerId, offer.offerValue);
							// 			$(".section .head p").css("visibility","hidden");
							// 		});
							// 	}
							// });
					}
					TargetCA.coupons.pageBuilder.addSection("featuredCoupons", {sectionHeadline: sectionHeadline, hideLink: hideLink}, function(){
						var twitterCopy = (culture == "en")?"at Target Canada. Check it out:":"chez Target Canada. Jetez-y un coup d’œil :";

						for(var g = 0;g<coupons.length;g++){
							var offer = coupons[g];

							if(!offer)break;
							if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(offer.offerHeadLine))offer.offerHeadLine = offer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢");
							var imgAlt = (culture == "en")?"Target coupon for "+ offer.brandName+ ":":"Coupon Target pour "+ offer.brandName+ " :";
							if(queryString["id"] && queryString["id"] == offer.offerId) {
								TargetCA.coupons.pageBuilder.addSharedCoupon({
									container: ".section.featuredCoupons",
									imgURL: offer.imageURL,
									imgAltText: imgAlt,
									price: offer.offerHeadLine,
									desc: TargetCA.coupons.pageBuilder.removeExclusive(offer.offerDescription),
									facebookLink: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://"+window.location.hostname+"/api/coupons?share="+offer.offerId+"&l="+culture),
									twitterLink: "http://twitter.com/share?url="+encodeURIComponent("http://www.target.ca/"+culture+"/coupons?share="+offer.offerId)+"&text="+encodeURIComponent(offer.offerHeadLine +" " +offer.offerDescription.replace(/(<([^>]+)>)/ig,"") +" " +  twitterCopy),
									extraClasses: (TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription)?"exclusive ":" "),
									id: offer.offerId,
									offerValue: offer.offerValue,
									exclusive: TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription),
									backTop: false
								}, function(){
									if(!TargetCA.coupons.pageBuilder.isCouponInBasket(offer.offerId)) TargetCA.coupons.basket.add(offer.offerId, offer.offerValue);
								});
							} else {
								TargetCA.coupons.pageBuilder.addCoupon({
									container: ".section.featuredCoupons",
									imgURL: offer.imageURL,
									imgAltText: imgAlt,
									price: offer.offerHeadLine,
									desc: TargetCA.coupons.pageBuilder.removeExclusive(offer.offerDescription),
									facebookLink: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://"+window.location.hostname+"/api/coupons?share="+offer.offerId+"&l="+culture),
									twitterLink: "http://twitter.com/share?url="+encodeURIComponent("http://www.target.ca/"+culture+"/coupons?share="+offer.offerId)+"&text="+encodeURIComponent(offer.offerHeadLine +" " +offer.offerDescription.replace(/(<([^>]+)>)/ig,"") +" " +  twitterCopy),
									extraClasses: (TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription)?"exclusive ":" "),
									id: offer.offerId,
									offerValue: offer.offerValue,
									exclusive: TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription),
									backTop: true
								});
							}
						}
					});

				}
			});
		},
		detailPageTemplate: function(sharedCouponId){
			TargetCA.coupons.getCoupon(sharedCouponId, function(data){
				if(!data) {
					TargetCA.coupons.pageBuilder.defaultTemplate();
					$(".nav .noCouponError").show();
				} else {
					var offer = data.offer;
					if(offer.categoryName) {
						var category = (typeof offer.categoryName == "string")?offer.categoryName:offer.categoryName[0];
					} else {
						window.location = '/'+culture+'/coupons?err=category';
						return;
					}
					TargetCA.coupons.pageBuilder.categoryTemplate(category, true);

					$(".mainCouponContainer .coupon.coupon_"+offer.offerId).remove();
					$(".section p.shareCouponHeadline").show();
					var twitterCopy = (culture == "en")?"at Target Canada. Check it out:":"chez Target Canada. Jetez-y un coup d’œil :";
					var imgAlt = (culture == "en")?"Target coupon for "+ offer.brandName+ ":":"Coupon Target pour "+ offer.brandName+ " :";
					if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(offer.offerHeadLine))offer.offerHeadLine = offer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢");
					TargetCA.coupons.pageBuilder.addSharedCoupon({
						container: ".section."+category.replace(/\s+/g, '-').toLowerCase(),
						imgURL: offer.imageURL,
						imgAltText: imgAlt,
						price: offer.offerHeadLine,
						desc: TargetCA.coupons.pageBuilder.removeExclusive(offer.offerDescription),
						facebookLink: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("http://"+window.location.hostname+"/api/coupons?share="+offer.offerId+"&l="+culture),
						twitterLink: "http://twitter.com/share?url="+encodeURIComponent("http://www.target.ca/"+culture+"/coupons?share="+offer.offerId)+"&text="+encodeURIComponent(offer.offerHeadLine +" " +offer.offerDescription.replace(/(<([^>]+)>)/ig,"") +" " +  twitterCopy),
						extraClasses: (TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription)?"exclusive ":" "),
						id: offer.offerId,
						offerValue: offer.offerValue,
						exclusive: TargetCA.coupons.pageBuilder.isCouponExclusive(offer.offerDescription),
						backTop: false
					}, function(){
						if(!TargetCA.coupons.pageBuilder.isCouponInBasket(sharedCouponId)) TargetCA.coupons.basket.add(offer.offerId, offer.offerValue);
						$(".section .head p").css("visibility","hidden");
					});

					
				}
				
			});
		},
		printSummaryTemplate: function(printedCouponList){
			document.title = (culture == 'en')?"Target Canada | Coupons | Print Summary":"Target Canada | Coupons | Sommaire d’impression";
			$(".header, .nav .tabContainer, .footer, .couponsChromeNoPrintError").hide().attr("aria-hidden","true");
			$(".nav .printSummary").show().attr("aria-hidden","false");

			for(var i = 0, iLen = printedCouponList.length;i<iLen;i++) {
				
				TargetCA.coupons.getCoupon(printedCouponList[i].offerId, function(data){
					var printedOffer = data.offer;
					var printedOfferExpireDate = new Date(printedCouponList[i].offerExpirationDate.split("-").join(","));
					if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(printedOffer.offerHeadLine))printedOffer.offerHeadLine = printedOffer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢");
					TargetCA.coupons.pageBuilder.addPrintedCoupon({
						id: printedOffer.offerId,
						imgURL: printedOffer.imageURL,
						price: printedOffer.offerHeadLine,
						desc: TargetCA.coupons.pageBuilder.removeExclusive(printedOffer.offerDescription),
						expireDate: (printedOfferExpireDate.getMonth()+1) + "/" + printedOfferExpireDate.getDate() + "/" + printedOfferExpireDate.getFullYear(),
						extraClasses: TargetCA.coupons.pageBuilder.isCouponExclusive(printedOffer.offerDescription)?"exclusive ":""
					});
				});
				
			}

			
		},
		barcodeSummaryTemplate: function(printedCouponList){
			document.title = (culture == 'en')?"Target Canada | Coupons | Mobile Coupons":"Target Canada | Coupons | ";
			$(".header, .nav .tabContainer, .footer, .couponsChromeNoPrintError").hide().attr("aria-hidden","true");
			$(".nav .printSummary").show().attr("aria-hidden","false");

			for(var i = 0, iLen = printedCouponList.length;i<iLen;i++) {
				
				TargetCA.coupons.getCoupon(printedCouponList[i], function(data){
					var printedOffer = data.offer;
					var printedOfferExpireDate = new Date();
					printedOfferExpireDate.setMonth(10);
					if(culture=="fr" && /[0-9]{1}[0-9]{1} [$¢]{1}/g.test(printedOffer.offerHeadLine))printedOffer.offerHeadLine = printedOffer.offerHeadLine.replace(" $", "&nbsp;$").replace(" ¢", "&nbsp;¢");
					TargetCA.coupons.pageBuilder.addPrintedCoupon({
						id: printedOffer.offerId,
						imgURL: printedOffer.imageURL,
						price: printedOffer.offerHeadLine,
						desc: TargetCA.coupons.pageBuilder.removeExclusive(printedOffer.offerDescription),
						expireDate: (printedOfferExpireDate.getMonth()+1) + "/" + printedOfferExpireDate.getDate() + "/" + printedOfferExpireDate.getFullYear(),
						extraClasses: TargetCA.coupons.pageBuilder.isCouponExclusive(printedOffer.offerDescription)?"exclusive ":""
					});
				});
				
			}

			
		},
		staticPageHandler: function() {
			this.addCategory({
				url: "/"+culture+"/coupons?lnk=content",
				isActive: 0,
				copy: (culture=="en")?"all":"tous"
			});
			TargetCA.coupons.getCategories(function(data){
				for(var i = 0, length = data.categories.length;i<length;i++) {
					var category = data.categories[i];
					TargetCA.coupons.pageBuilder.addCategory({
						url: "/"+culture+"/coupons?lnk=content&category="+category,
						isActive: 0,
						copy: category.toLowerCase()
					});
				}
			});
			this.addCategory({
				url: "/"+culture+"/coupons?lnk=content&brand=all",
				isActive: 0,
				copy: (culture=="en")?"brands":"Marques"
			});
			$(window.location.hash).show().attr("aria-hidden","false").find("h2").attr("tabindex","-1").focus();
			$(".tabNavContainer ul li:first-child").removeClass("active").find(".tab").attr("aria-selected", "false");
			if(window.location.hash == '#faq')
				document.title = (culture == "en")?"Target Canada | Coupons | FAQ":"Target Canada | Coupons | Foire aux questions";
			else if (window.location.hash == "#policy")
				document.title = (culture == "en")?"Target Canada | Coupons | Coupon Policy":"Target Canada | Coupons | Politique sur les coupons";
		}

	},
	callAPI: function(data, cb){
		var myData = {
			postalCode: (TargetCA.coupons.postalCodeValue == "none")?"":TargetCA.coupons.postalCodeValue,
			culture: culture
		}
		$.extend(myData, data);
		$.ajax(TargetCA.coupons.apiPath, {
			data: myData,
			success: cb,
			dataType: "json",
			type: "post",
			async: false
		});
	},
	/*
		Load all the coupons based on postal code parameter. cb = callback
	*/
	getCoupons: function(postalCode, cb){
		TargetCA.coupons.postalCodeValue = postalCode;
		TargetCA.coupons.callAPI({
			request: 'getCoupons'
		}, cb);
	},
	setPostalCode: function(postalCode, cb){
		TargetCA.coupons.postalCodeValue = postalCode;
		TargetCA.coupons.callAPI({
			request: 'setPostalCode',
			postalCode: postalCode
		}, cb);
	},
	getPostalCode: function(cb){
		TargetCA.coupons.callAPI({
			request: 'getPostalcode'
		}, cb);
	},
	/*
		Load coupon base on couponId
	*/
	getCoupon: function(couponId, cb){

		TargetCA.coupons.callAPI({
			request: 'getCoupon',
			couponId: couponId
		}, cb);
	},
	getCouponByList: function(couponList, cb){

		TargetCA.coupons.callAPI({
			request: 'getCouponByList',
			couponList: couponList
		}, cb);
	},
	/*
		Returns an array of offers within a category
	*/
	getCouponsByCategory: function(category, cb){
		TargetCA.coupons.callAPI({
			request: 'getCouponsByCategory',
			category: category
		}, cb);
	},
	/*
		Returns an array of offers from a specific brand
	*/
	getCouponsByBrand: function(brand, cb){
		var tempBrand = brand;
		tempBrand = tempBrand.replace(/%27/g, "'");
		TargetCA.coupons.callAPI({
			request: 'getCouponsByBrand',
			brand: tempBrand
		}, cb);
	},
	/*
		Get a list of brands that have coupons available
	*/
	getBrands: function(cb){
		TargetCA.coupons.callAPI({
			request: 'getBrands'
		}, cb);
	},
	/*
		Get a list of categories that have coupons available. Some offers don't have categories associated with them, weird.
	*/
	getCategories: function(cb){
		TargetCA.coupons.callAPI({
			request: 'getCategories'
		}, cb);
	},
	/*
		Get a URL to open in order to print the coupons
	*/
	setupPrintJob: function(cb){
		TargetCA.coupons.callAPI({
			request: 'setupPrintJob'
		}, cb);
	},
	/*
		Returns the summary of the coupons the user has printed. 
		After opening the url returned by "setupPrintJob", the coupons will print and the page will redirect back to the target server with a "printID" url variable.
		Send that prinID through to this call to get the summary of the print job.
	*/
	getPrintSummary: function(printID, cb){
		TargetCA.coupons.callAPI({
			request: 'getPrintSummary',
			printID: printID
		}, cb);
	},
	
	
}