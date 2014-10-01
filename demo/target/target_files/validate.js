(function($){
	var methods = {
		init: function(options){
			var settings = {
				ariaEnabled: true,
				matchCase: true,
				errorClass: "error",
				validateOnly: false,
				onError: null,
				onFirstError : null,
				onValid: null,
				onAllValid: null,
				useAutomaticFocus : true,
				errorMsgs: []
			}
			return this.each(function(){
				settings = $.extend(settings, options);
				var data = $(this).data("Validate");
				if(!data){
					$(this).data("Validate", {
						target: $(this),
						settings: settings
					});
				}
				var form = this;
				
				var validateFunction = function(element){
					$(element).bind("validate", function(){
						$(element).removeClass("error");
						if(settings.ariaEnabled){
							$(element).attr("aria-describedby","");
							$(element).attr("aria-invalid", "false");
						}
						
						var errMsgsEl = $(element).data("errMsgs");
						if(errMsgsEl){
							for(var j=0;j<errMsgsEl.err.length;j++){
								$(errMsgsEl.err[j][1]).hide();
							}
						}
						
						var classes = $(element).attr('class').split(/\s+/);
						for(var i=0;i<classes.length;i++){
							if(typeof methods[classes[i]] == "function"){
								if(!$(form).Validate(classes[i], element)){
									invokeError(element, classes[i]);
									break;
								}
							} else if(/^match-/i.test(classes[i])){
								var matchField = classes[i].substring(6, classes[i].length);
								if(settings.matchCase){
									if($(element).val() != $("#"+matchField).val()){
										invokeError(element, classes[i]);
										break;
									}
								} else {
									if($(element).val().toLowerCase() != $("#"+matchField).val().toLowerCase()){
										invokeError(element, classes[i]);
										break;
									}
								}
							} else if(/^minChar-/i.test(classes[i])){
								var minCharAmount = parseInt(classes[i].substring(8, classes[i].length));
								if(methods.stripSpaces($(element).val()).length < minCharAmount){
									invokeError(element, classes[i]);
									break;
								}
							} else if(/^maxChar-/i.test(classes[i])){
								var maxCharAmount = parseInt(classes[i].substring(8, classes[i].length));
								if(methods.stripSpaces($(element).val()).length > maxCharAmount){
									invokeError(element, classes[i]);
									break;
								}
							}
						}
						if(!$(element).hasClass(settings.errorClass) && settings.onValid){
							settings.onValid(element);
						}
					});
				}
				
				function invokeError(element, errorClass){
					if(settings.onError) settings.onError($(element).attr("id"), errorClass);
					if(!$(element).hasClass(settings.errorClass)) $(element).addClass(settings.errorClass);
					var errs = $(element).data("errMsgs");
					if(settings.ariaEnabled) $(element).attr("aria-invalid", "true");
					if(errs){
						for(var i=0;i<errs.err.length;i++){
							var errorID = errs.err[i][1];
							if(errs.err[i][0] == errorClass){
								$(errorID).show();
								if(settings.ariaEnabled){
									$(element).attr("aria-describedby",errorID.substring(1, errorID.length));
								}
							}
						}
					}
				}
				
				
				if(settings.ariaEnabled){
					$(".required", this).attr("aria-required", true);
				}
				
				$("input", this).each(function(){
					if($(this).attr("class") != undefined){
						validateFunction(this);
					}
				})
				
				$("select", this).each(function(){
					if($(this).attr("class") != undefined){
						validateFunction(this);
					}
				})
				
				$("textarea", this).each(function(){
					if($(this).attr("class") != undefined){
						validateFunction(this);
					}
				})
				
				$(this).submit(function(){
					$("input", this).trigger("validate").keyup(function(){
						$(this).trigger("validate");
					}).change(function(){
						$(this).trigger("validate");
					});
					$("select", this).trigger("validate").change(function(){
						$(this).trigger("validate");
					});
					$("textarea", this).trigger("validate").keyup(function(){
						$(this).trigger("validate");
					});
					var valid = ($("."+settings.errorClass, this).length)?false:true;
					if(!valid && settings.useAutomaticFocus ) $($("."+settings.errorClass)[0]).focus();
					if( !valid && settings.onFirstError ) settings.onFirstError( this ); 
					if( valid && settings.onAllValid ){
						settings.onAllValid( this );
					}
					if( settings.validateOnly ){
						return false; //to stop the form from submitting
					}
					return valid;
				});
			});
		},
		stripSpaces: function(value){
			return value.replace(/[\s\xA0]+/g, '');
		},
		required: function(context){
			switch($(context).attr("type")){
				case "text":
					return (methods.stripSpaces($(context).val()) != "");
				break;
				case "password":
					return (methods.stripSpaces($(context).val()) != "");
				break;
				case "checkbox":
					return $(context).attr("checked");
				break;
			}
			if($(context).get(0).tagName == "SELECT"){
				return ($(context).val() != "" && $(context).val() != "null");
			} else if($(context).get(0).tagName == "TEXTAREA"){
				return (methods.stripSpaces($(context).val()) != "");
			}
		},
		email: function(context){
			if(methods.stripSpaces($(context).val()) == "") return true;
			return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(methods.stripSpaces($(context).val()));
		},
		postal: function(context){ //a1a1a1 - whitespace and case insensitive
			/*if(methods.stripSpaces($(context).val()) == "") return true;
			return /^\s*[a-ceghj-npr-tvxy]\d[a-ceghj-npr-tv-z](\s)?\d[a-ceghj-npr-tv-z]\d\s*$/i.test(methods.stripSpaces($(context).val()));*/
			return /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test($(context).val());
		},
		zip: function(context){ //12345 -OR- 12345-6789
			if(methods.stripSpaces($(context).val()) == "") return true;
			return /^\d{5}([\-]\d{4})?$/.test(methods.stripSpaces($(context).val()));
		},
		postalZip: function(context){ //postal or zip code, either will pass
			if(methods.stripSpaces($(context).val()) == "") return true;
			return (methods.postal(context) || methods.zip(context));
		},
		phone: function(context){
			if(methods.stripSpaces($(context).val()) == "") return true;
			return /^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/.test(methods.stripSpaces($(context).val()));
		},
		digits: function(context){
			if(methods.stripSpaces($(context).val()) == "") return true;
			return /^\s*\d+\s*$/.test(methods.stripSpaces($(context).val()));
		},
		addErrorMsg: function(fieldID, errorClass, errorMsgID){
			var errs = $(fieldID).data("errMsgs");
			if(!errs){
				$(fieldID).data("errMsgs", {
					"err": []
				});
				errs = $(fieldID).data("errMsgs");
			}
			errs.err.push([errorClass, errorMsgID]);
			
			var data = $(this).data("Validate");
			data.settings.errorMsgs.push(errorMsgID);
		},
		getWordCount: function(value){
			if(methods.stripSpaces(value) == "") return 0;
			var count = value.match(/\S+/g).length;
			return count;
		},
		getCharCount: function(value, includeWhitespace){
			if(includeWhitespace){
				return value.split("").length;
			}
			return methods.stripSpaces(value).split("").length;
		}
	}
	$.fn.Validate = function(method){
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.Validate' );
		}
	}
})(jQuery)