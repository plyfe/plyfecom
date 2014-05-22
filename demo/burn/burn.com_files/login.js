$j(document).ready(function(){
	jQuery.extend(jQuery.validator.messages, {
	    required: BURN.translations.error_validator_required,
	    remote: BURN.translations.error_validator_remote,
	    email: BURN.translations.error_validator_email,
	    url: BURN.translations.error_validator_url,
	    date: BURN.translations.error_validator_date,
	    dateISO: BURN.translations.error_validator_dateISO,
	    number: BURN.translations.error_validator_number,
	    digits: BURN.translations.error_validator_digits,
	    creditcard: BURN.translations.error_validator_creditcard,
	    equalTo: BURN.translations.error_validator_equalTo,
	    maxlength: jQuery.validator.format(BURN.translations.error_validator_maxlength),
	    minlength: jQuery.validator.format(BURN.translations.error_validator_minlength),
	    rangelength: jQuery.validator.format(BURN.translations.error_validator_rangelength),
	    range: jQuery.validator.format(BURN.translations.error_validator_range),
	    max: jQuery.validator.format(BURN.translations.error_validator_max),
	    min: jQuery.validator.format(BURN.translations.error_validator_min)
	});

	var LoginManager = function(){
		this.dialogs = {};
		this.captcha_url = undefined;
		
		this.open = function(type){
			this.close();
			
			var mainDiv = $j('#main');
		    var left = mainDiv.offset().left;
		    var width = mainDiv.width();

		    var me = this;
		    
			var defaults = {
				modal: true,
				draggable: false,
				resizable: false,
				position:[left],
				width: width,
				dialogClass : 'dialog_container',
				hide: {effect: 'fade', duration: 500},
		        show: {effect: 'fade', duration: 500},
		        beforeClose: function(event, ui) {
		        	me.gohome();
		        }
			};
			
			$j.post(
				BURN.ajax_url,
				{
					action: 'login_manager',
					type: type,
					security: BURN.nonces['login_manager']
				},
				function(response){
					if(response && response.success){
						me.dialogs[type] = $j(response.content).dialog(defaults);
						me.dialogs[type].dialog( "option", "position", { my: "left top", at: "left-10 top-10", of: "#main" } );

						if(!$j.isEmptyObject(response.error)){
							$j('.popup_error').show();
						}
						
						switch(type){
							case 'login':
								me.loginCase();
								break;
							case 'logout':
								me.gohome(undefined, true);
								break;
							case 'register':
								me.registerCase();
								break;
							case 'activation':
							case 'complete':
								break;
							case 'profile':
								me.profileCase();
								break;
							case 'forgot_password':
								me.forgotPasswordCase();
								break;
							case 'change_password':
								me.changePasswordCase();
								break;
							case 'reset_password':
								me.resetPasswordCase();
								break;
							default:
								break;
						}
						
						$j.each($j('#'+type+'form input'), function(i,e){
							var $e = $j(e),
							hide = function() {
								$e.next(".placeholder").hide();
							},
							show = function() {
								if (!$e.val()) {
									$e.parent().find(".placeholder").show();
								}
							};
							
							$e.keypress(function(event) {
								if ( event.which == 13 ) {
									event.preventDefault();
									$j('#'+type+'form').submit();
								}
							});
							if ($j.browser.msie && +$j.browser.version < 10) {
								$e
									.on('focus', hide)
									.on('blur', show);
							} else {
								hide();
							}
						});
						
						me.dialogs[type].focus();
					}
				},
				'json'
			);
		};
		
		this.profileCase = function(){
			var me = this;
			
			$j("#date_of_birth_year").burn_combobox({'class': 'dob year'});
			$j("#date_of_birth_month").burn_combobox({'class': 'dob'});
			$j("#date_of_birth_day").burn_combobox({'class': 'dob'});
			$j("#country_select").burn_combobox();
			$j("#language_select").burn_combobox();
			$j('input[name="t_and_c"]').burn_checkbox();
			
			$j('#profileform').validate({
				submitHandler: function(form){
					$j.post(
						BURN.ajax_url,
						{
							action: 'profile',
							security: BURN.nonces['profile'],
							form: $j(form).serializeObject()
						},
						function(response){
							if(response.success){
								me.close('profile', undefined, true);
							} else {
								me.error_handler("profile", response);
							}
						},
						'json'
					);
				},
				rules: {
					phone: {
						required: true
					},
					first_name: {
						required: true,
						maxlength: 50
					},
					date_of_birth_year: {
    					required: true
    				},
    				date_of_birth_month: {
    					required: true
    				},
    				date_of_birth_day: {
    					required: true
    				},
					t_and_c: {
						required: true
					}
    			}
    		});
		};
		
		this.forgotPasswordCase = function(){
			var me = this;
			
			$j('#forgot_passwordform').validate({
				submitHandler: function(form){
					$j.post(
						BURN.ajax_url,
						{
							action: 'forgot_password',
							security: BURN.nonces['forgot_password'],
							form: $j(form).serializeObject()
						},
						function(response){
							me.new_captcha();
							me.error_handler("forgot_password", response);
							/* for security reasons
							if(response.success){
								me.close('forgot_password');
							} else {
								me.error_handler("forgot_password", response);
							}
							*/
						},
						'json'
					);
				},
				rules: {
					email: {
    					required: true,
    					email: true
    				},
    				captcha: {
    					required: true
    				}
    			}
    		});
		};
		
		this.changePasswordCase = function(){
			var me = this;
			
			$j('#change_passwordform').validate({
				submitHandler: function(form){
					$j.post(
						BURN.ajax_url,
						{
							action: 'change_password',
							security: BURN.nonces['change_password'],
							form: $j(form).serializeObject()
						},
						function(response){
							if(response.success){
								me.close('change_password');
							} else {
								me.error_handler("change_password", response);
							}
						},
						'json'
					);
				},
				rules: {
					old_pwd: {
    					required: true
    				},
    				pwd: {
    					required: true,
    					minlength: 6,
    					maxlength: 20
    				},
    				pwd_check: {
    					required: true,
    					equalTo: '#change_passwordform input[name="pwd"]'
    				}
    			}
    		});
		};
		
		this.resetPasswordCase = function(){
			var me = this;
			
			$j('#reset_passwordform').validate({
				submitHandler: function(form){
					$j.post(
						BURN.ajax_url,
						{
							action: 'reset_password',
							security: BURN.nonces['reset_password'],
							form: $j(form).serializeObject()
						},
						function(response){
							if(response.success){
								me.close('reset_password');
							} else {
								me.error_handler("reset_password", response);
							}
						},
						'json'
					);
				},
				rules: {
    				pwd: {
    					required: true,
    					minlength: 6,
    					maxlength: 20
    				},
    				pwd_check: {
    					required: true,
    					equalTo: '#reset_passwordform input[name="pwd"]'
    				}
    			}
    		});
		};
		
		this.loginCase = function(){
			var me = this;
			
			$j('#loginform').validate({
				submitHandler: function(form){
					$j.post(
						BURN.ajax_url,
						{
							action: 'login',
							security: BURN.nonces['login'],
							form: $j(form).serializeObject()
						},
						function(response){
							if(response.success){
								if(response.burn_redirect_to_post_id !== false){
									me.close('login', response.burn_redirect_to_post_id);
								} else {
									me.close('login', undefined, true);
								}
							} else {
								me.error_handler("login", response);
							}
						},
						'json'
					);
				},
				rules: {
    				email: {
    					required: true,
    					email: true
    				},
    				pwd: {
    					required: true
    				}
    			}
    		});
		};
		
		this.registerCase = function(){
			var me = this;
			
			$j("#date_of_birth_year").burn_combobox({'class': 'dob year'});
			$j("#date_of_birth_month").burn_combobox({'class': 'dob'});
			$j("#date_of_birth_day").burn_combobox({'class': 'dob'});
			$j("#country_select").burn_combobox();
			$j("#language_select").burn_combobox();
			$j('input[name="t_and_c"]').burn_checkbox();
			
			$j('#registerform').validate({
				submitHandler: function(form){
					$j.post(
						BURN.ajax_url,
						{
							action: 'register',
							security: BURN.nonces['register'],
							form: $j(form).serializeObject()
						},
						function(response){
							if(response.success){
								me.close('register');
								me.open('activation');
							} else {
								me.new_captcha();
								me.error_handler("register", response);
							}
						},
						'json'
					);
				},
				ignore: "",
    			rules: {
    				email: {
    					required: true,
    					email: true
    				},
    				email_check: {
    					required: true,
    					email: true,
    					equalTo: '#registerform input[name="email"]'
    				},
    				phone: {
    					required: true
    				},
    				pwd: {
    					required: true
    				},
    				pwd_check: {
    					required: true,
    					equalTo: '#registerform input[name="pwd"]'
    				},
    				first_name: {
    					required: true,
    					maxlength: 50
    				},
    				date_of_birth_year: {
    					required: true
    				},
    				date_of_birth_month: {
    					required: true
    				},
    				date_of_birth_day: {
    					required: true
    				},
    				t_and_c: {
    					required: true
    				},
    				captcha: {
    					required: true
    				}
    			}
    		});
		};
		
		this.error_handler = function(type, response){
			$j('#'+type+'_error').html('');
			
			if(response == -1){
				$j('#'+type+'_error').append(BURN.translations.error_session_timeout+'<br>');
				$j('.popup_error').show();
			} else {
				if(!$j.isEmptyObject(response.error)){
					$j.each(response.error, function(i,e){
						$j('#'+type+'_error').append(e+'<br>');
					});
					
					$j('.popup_error').show();
				}
			}
		};
		
		this.new_captcha = function(){
			if(!this.captcha_url){
				this.captcha_url = $j('#captcha_image').attr('src');
			}
			
			$j('#captcha_image').attr('src', this.captcha_url + '?' + Math.random());	
		};
		
		this.gohome = function(popup_id, force){
			var url = BURN.ajax_home_url;
			if(popup_id){
				url = window.location.protocol + '//' + window.location.host + '/show/' + popup_id;
			}
			
			if(window.location.href != url || force){
				window.location.href = url;
			}
		};
		
		this.close = function(type, popup_id, force){
			var me = this;
			
			//clicked the close button
			if(type){
				this.gohome(popup_id, force);
				if(popup_id) return true;
				
				if(me.dialogs[type]){
					$j(me.dialogs[type]).dialog('close');
					setTimeout(function(){
						$j(me.dialogs[type]).remove();
						me.dialogs[type] = undefined;
					}, 500);
				}
			} else {
				$j.each(me.dialogs, function(i,e){
					$j(e).remove();
				});
			}
		};
	};
	
	BURN.loginManager = new LoginManager();
});

//combobox
(function( $ ) {
    $.widget( "ui.burn_combobox", {
    	options:{},
    	_create: function(parameters) {
    		
    		var label,
	            that = this,
	            options,
	            select = this.element.hide(),
	            selected = select.children( ":selected" );
    		
    		$( select ).wrap( "<div />" );
	        
    		wrapper = $( select ).parent();
	        combo = this.combo = $( "<div />" ).prependTo( wrapper ).addClass( "burn-combobox" );
	            
	        if(this.options['class']){
	        	wrapper.addClass(this.options['class']);
	        }

	        label = $( "<span>" )
	            .appendTo( combo )
	            .html( selected.text() )
	            .attr( "value", selected.attr("value"))
	            .addClass( "burn-combobox-label" );
	        if (selected.attr( "class" ) ) {
	        	label.addClass( selected.attr( "class" ) );
	        }
	       
	        //arrow 
	        $( "<div> ")
            	.appendTo( combo )
            	.addClass( "burn-combobox-arrow" );
	           
	        options = $( "<div>" )
	         	.appendTo( combo )
	           	.addClass( "options" );
	            
	        $.each(select.children("option"), function(i, e){
	        	var $e = $j(e),
	        	value = $e.attr("value");
	        	if (value) {
	        		$( "<div> ")
	           		.appendTo( options )
	           		.html( $e.text() )
	           		.addClass( "option" )
	           		.attr( "value", value )
	           		.click(function(){
	           			var $this = $(this),
	           			value = $this.attr( "value" );
	           			label.html( $this.text() );
	           			label.attr({"value": value, "class": "burn-combobox-label" });
	           			select.val( value );
	           		});
	        	}
	        });
	        
	        //OLD
	        var d_height = ($(window).height()  - ((wrapper.offset().top - $(window).scrollTop()) + wrapper.height()) - 100);
	        
	        var popup_type = that.element.attr('popup');
	        if(popup_type){
	        	var dialog = $j('#'+that.element.attr('popup')+'_dialog');
	        	var d_height = dialog.height() - (wrapper.offset().top - dialog.offset().top) - wrapper.height() - 30; // 10+10 border 10 margin
	        	if(popup_type == 'register'){
	        		d_height += 80; //height of captcha image
	        	}
	        }
	        
	        if(options.height() > d_height){
	        	options.css({
	           		'height': d_height,
	           		'overflow-y': 'scroll'
	        	});
	        }
	        
        },

        destroy: function() {
            this.combo.remove();
            this.element.show();
            $.Widget.prototype.destroy.call( this );
        },
    });

})( jQuery );   	

//checkbox
(function( $ ) {
    $.widget( "ui.burn_checkbox", {
    	_create: function() {
    		var image,
	            that = this,
	            checkbox = this.element.hide(),
	            checked = !!checkbox.attr( "checked" ),
	            wrapper = this.wrapper = $( "<div>" )
	                .addClass( "burn-checkbox" )
	                .insertAfter( checkbox );
    		
    		image = $( "<div>" )
	            .appendTo( wrapper )
	            .addClass( "burn-checkbox-image" )
	            .click(function(){
	            	checkbox.attr( "checked" , !checked);
	            	checked = !!checkbox.attr( "checked" );
	            	
	            	if(checked){
	    	        	image.addClass( "checked" );
	    	        } else {
	    	        	image.removeClass( "checked" );
	    	        }
	            });
	        
	        if(checked){
	        	image.addClass( "checked" );
	        }
        },

        destroy: function() {
            this.wrapper.remove();
            this.element.show();
            $.Widget.prototype.destroy.call( this );
        }
    });

})( jQuery );
