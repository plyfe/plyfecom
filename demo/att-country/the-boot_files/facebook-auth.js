(function($, window){


	var facebook_auth = {
		appId               : $('meta[property="fb:app_id"]').attr('content'),
		accountActivateBtn  : $('<a href="#fb-auth-account-activation"></a>').fancybox(),
		siteActivateBtn     : $('<a href="#fb-auth-site-activation"></a>').fancybox(),
		requiredFieldsBtn   : $('<a href="#fb-auth-required-fields"></a>').fancybox(),
		loginBtn            : $('.fb-auth-login-link').fancybox(),
		registrationBtn     : $('.fb-auth-registration-link').fancybox(),
		currentForm         : null,
		ajaxing             : false,
		postData            : {
			action  : 'facebook_user_auth',
			params  : {},
			required_meta   : {},
			wp_login_user   : {},
			fb_auth_form_nonce  : $('#fb-auth-form-nonce input[name="fb_auth_form_nonce"]').val(),
			_wp_http_referer    : $('#fb-auth-form-nonce input[name="_wp_http_referer"]').val()
		},
		init                : function() {
			var self = this;
			self.bindFormActions();
		},
		login  : function() {
			var self = this;
			FB.login(function(response) {
				if (response.authResponse) {
					FB.api('/me', function(response) {
						self.postData.params = response;
						self.auth('');
					});
				}
			}, { scope   : 'email,user_birthday,user_status,publish_actions,user_about_me,user_location,user_likes,user_hometown' });
		},
		auth    : function() {
			var self = this;
			self.ajaxing = true;
			self.postData.referer = window.location.href;
			$.fancybox.showActivity();
			$.ajax(
				{
					type    : 'post',
					url     : '/wp-admin/admin-ajax.php',
					data    : self.postData
				}
			).done(
				function( response ) {
					self.ajaxing = false;
					if(response.status == 'success') {
						if(! response.redirect) {
							$.fancybox.hideActivity();
						}
						if(response.error_messages) {
							self.postData.required_meta = {};
							self.showErrorMessages(response.error_messages);
							if(response.code == 10) {
								location.reload(true);
							}
						} else if(response.form == 'account-activation') {
							self.showActivationForm(response);
						} else if(response.form == 'site-activation') {
							self.showSiteActivateForm(response);
						} else if(response.form == 'required-fields') {
							self.showRequiredFieldsForm(response);
						} else if(response.redirect) {
							if(window.location.href == response.redirect.trim()) {
								window.location.reload();
							} else {
								self.setCookie('wordpress_new_user_registered_redirect', 1, 1);
								window.location.replace('http://'+window.location.host+window.location.pathname+'?redirect_to='+encodeURIComponent(response.redirect.trim()));
							}
						}
					}
				}
			);
		},
		register: function() {
			var self = this;
			self.ajaxing = true;
			$.fancybox.showActivity();
			$('#fb-auth-registration .error-messages').empty().hide();
			$('#fb-auth-registration .error').removeClass('error');
			$('#fb-auth-registration input:not([type=checkbox]):not([type=hidden]), #fb-auth-registration select').each(
				function() {
					if(!$(this).val()) {
						if($(this).prop('name') == 'tsm_mathcha_response') {
							$(this).parents('.tsm_mathcha_wrapper').addClass('error');
						} else {
							$(this).addClass('error');
						}
					}
				}
			);
			if($('#fb-auth-registration .error').length > 0) {
				$('#fb-auth-registration .error-messages').first().text('All fields are required.').show();
				$.fancybox.hideActivity();
				self.ajaxing = false;
				return;
			}
			$.ajax(
				{
					type: 'post',
					url: '/wp-admin/admin-ajax.php',
					data: 'action=tsm_register_user&' + self.currentForm.serialize() + '&referer=' + window.location.href,
					dataType: 'json',
					success: function(d) {
						self.ajaxing = false;
						if(d.success) {
							if(d.redirect) {
								window.location.href = d.redirect;
								return;
							} else {
								$('#registration-modal-form .registration-modal-message .message-title').html(d.title);
								$('#registration-modal-form .registration-modal-message .message-content').html(d.message);
								$('#registration-modal-form').children().hide();
								$('.fb-registration-block').hide();
								$('#registration-modal-form .registration-modal-message').show();
							}
						} else {
							for(var i in d.errors) {
								if(i == 'captcha') {
									$('#captcha_error').html(d.errors[i].join('<br/>')).show();
									$('#fb-auth-registration .tsm_mathcha_wrapper').addClass('error');
								} else if($('#' + i + '_error').length) {
									$('#' + i + '_error').html(d.errors[i].join('<br/>')).show();
									$('#modal_' + i).addClass('error');
								} else {
									$('#fb-auth-registration .error-messages').first().append(d.errors[i].join('<br/>') + '<br/>').show();
								}
							}
						}
						$.fancybox.hideActivity();
					},
					error: function(jqXHR, textStatus, errorThrown) {
						self.ajaxing = false;
						if(textStatus.toLowerCase() == 'parsererror') {
							window.location.reload();
							return;
						}
						$.fancybox.hideActivity();
						$('#fb-auth-registration .error-messages').first().text('There was an error. Please try again.').show();
					}
				}
			);
		},
		showActivationForm : function(response){
			var self = this;
			self.accountActivateBtn.trigger('click.fb');
			$('#fb-auth-account-activation').find('.blog-tag').attr('href', response.blog).text(response.blog);
		},
		showSiteActivateForm : function(response){
			var self = this;
			self.siteActivateBtn.trigger('click.fb');
			$('#fb-auth-site-activation').find('.user-email').text(self.postData.params.email);
		},
		showRequiredFieldsForm : function(response) {
			var self = this;
			self.requiredFieldsBtn.trigger('click.fb');
		},
		bindFormActions : function(){
			var self = this;
			$('body')
				.on('click', '#fb-auth-account-activation .default-button a', function(e){
					e.preventDefault();
					e.stopPropagation();
					if(self.ajaxing) return;
					self.currentForm = $(e.target).closest('.fb-auth-form');
					self.postData.required_meta.password = self.currentForm.find('.password').val();
					self.auth();
				})
				.on('click', '#fb-auth-site-activation .default-button a', function(e){
					e.preventDefault();
					e.stopPropagation();
					if(self.ajaxing) return;
					self.currentForm = $(e.target).closest('.fb-auth-form');
					self.postData.required_meta.activate = true;
					self.auth();
				})
				.on('click', '#fb-auth-required-fields .default-button a', function(e){
					e.preventDefault();
					e.stopPropagation();
					if(self.ajaxing) return;
					self.currentForm = $(e.target).closest('.fb-auth-form');
					self.postData.params.zip = self.currentForm.find('.zip').val();
					self.postData.params.newsletter = self.currentForm.find('.newsletter').is(':checked') ? 1 : '';
					self.postData.required_meta.zip = self.postData.params.zip;
					self.postData.required_meta.newsletter = self.postData.params.newsletter;
					self.auth();
				})
				.on('click', '.facebook-connect-button', function(e){
					e.preventDefault();
					e.stopPropagation();
					if(self.ajaxing) return;
					self.currentForm = $(e.target).closest('.fb-auth-form');
					self.postData.action = 'facebook_user_auth';
					self.login();
				})
				.on('click', '#fb-auth-login .login a', function(e){
					e.preventDefault();
					e.stopPropagation();
					if(self.ajaxing) return;
					self.postData.action = 'facebook_wp_user_auth';
					self.currentForm = $(e.target).closest('.fb-auth-form');
					self.postData.wp_login_user.username = self.currentForm.find('.username').val();
					self.postData.wp_login_user.password = self.currentForm.find('.password').val();
					self.auth();
				})
				.on('keyup', '#fb-auth-login input, #fb-auth-login select, #fb-auth-login textarea', function(e){
					if(e.keyCode != 13) return;
					e.preventDefault();
					e.stopPropagation();
					if(self.ajaxing) return;
					self.postData.action = 'facebook_wp_user_auth';
					self.currentForm = $(e.target).closest('.fb-auth-form');
					self.postData.wp_login_user.username = self.currentForm.find('.username').val();
					self.postData.wp_login_user.password = self.currentForm.find('.password').val();
					self.auth();
				})
				.on('click', '#fb-auth-registration .registration a', function(e){
					$(e.target).attr('href', '/registration/?redirect_to=' + encodeURIComponent(window.location.href));
					$.fancybox.showActivity();
				})
				.on('submit', '#registration-modal-form', function(e) {
					e.preventDefault();
					e.stopPropagation();
					if(self.ajaxing) return;
					self.currentForm = $(e.currentTarget);
					self.register();
				});

				if(!self.supportsPlaceholders()) {
					$('body')
						.on('focus', '#fb-auth-registration input[type=text], #fb-auth-registration input[type=password]', self.handlePlaceholders)
						.on('blur', '#fb-auth-registration input[type=text], #fb-auth-registration input[type=password]', self.handlePlaceholders);

					$('#fb-auth-registration input[type=text], #fb-auth-registration input[type=password]').each(function() { $(this).blur(); });
				}

		},
		showErrorMessages : function(messages){
			var self = this;
			self.currentForm.find('.error-messages').text(messages).show();
			self.currentForm.find('.forgot').show();
		},
		setCookie : function(c_name,value,exdays) {
			var exdate = new Date(); exdate.setDate(exdate.getDate() + exdays); var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()); document.cookie = c_name + "=" + c_value + ";path=/;";
		},
		handlePlaceholders : function(e) {
			var ffield = $(e.currentTarget);
			if(ffield.attr('placeholder')) {
				if((e.type == 'focus' || e.type == 'focusin') && !ffield.hasClass('ignore-focus') && ffield.val() == ffield.attr('placeholder')) {
					if(ffield.hasClass('field-placeholder')) {
						ffield.hide().prev('.ignore-focus').show();
						setTimeout(function() { ffield.prev('.ignore-focus').focus(); }, 10);
					} else {
						ffield.val('');
					}
				} else if((e.type == 'blur' || e.type == 'focusout') && ffield.val() == '') {
					if(ffield.prop('type') == 'password') {
						if(!ffield.hasClass('ignore-focus')) {
							ffield.addClass('ignore-focus').hide();
							ffield.after($('<input type="text" name="" class="field-placeholder" />').val(ffield.attr('placeholder')).attr('placeholder', ffield.attr('placeholder')).prop('tabindex', ffield.prop('tabindex')));
						} else {
							ffield.hide();
							ffield.next('.field-placeholder').show();
						}
					} else {
						ffield.val(ffield.attr('placeholder'));
					}
				}
			}

		},
		supportsPlaceholders : function() {
			var i = document.createElement('input');
			return 'placeholder' in i;
		}
	};
	window.facebook_auth = facebook_auth;
	facebook_auth.init();
})(jQuery, window);