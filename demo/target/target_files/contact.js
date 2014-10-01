/*
 * @Target.ca Contact
 * @Contact Us logic and validation for the forms.
 * @author paul.placido@target.com, alessandro.miralles@target.com, stuart.milsten@target.com
 */

TargetCA.contact = {
	init: function() {
		//runs namespace only when on the correct page
		//removed due to https secure.
		//var location = TargetCA.helpers.getUriLocation();
		//if (location == 'contact') {
			this.setup();
		//}
	},
	// sets the default styles (errors hidden) then changes them if there are errors to display
	setup: function() {
		$("#contact .form .invalid").css({'display':'none'});
		$(".CategoryBody .errorList .invalid").css({'display':'none'});
		$(".CategoryBody .errorList h2.oop").css({'display':'none'});
		// handler for form submit button
		$("#contact").submit(function(e) {
			var errors = TargetCA.contact.validate(); // a list of errors returned by the validate() function
			TargetCA.contact.validationFeedback(errors);
			if (errors.length > 0) {
				//$('.firstName label').attr('tabIndex',-1).focus();
				$('.CategoryBody .errorList').attr('tabIndex',-1).focus();
				$(".CategoryBody .errorList p.invalid").css({'display':'block'});
				$(".CategoryBody .errorList h2.oop").css({'display':'block'});
				$('.errorList').find('a').click(function(e){
    				var link = $(this);
    				$(link.attr('href')).focus();
				});
				return false;
			}
			TargetCA.contact.post(e);
		});
	},
	// submits the data from the submit() function tot he server
	post: function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "../../api/contact.php",
			data: $('#contact').serialize(),
			// routes user to the error page, if there are errors
			error: function(e) {
				if (culture == "fr") {
					window.location = "fr/contact/error"
				} else {
					window.location = "/contact/error"
				}
			},
			// routes user to the success page, if there are no errors
			success: function(e) {
				if (culture == "fr") {
					window.location = "fr/contact/success"
				} else {
					window.location = "/contact/success"
				}
			}
		});
	},
	// verifies the format for phone number input
	verifyDaytimePhone: function(str) {
		if (str && str.length) {
			str = str.replace(/[^0-9\.]+/g, ''); // strip non-numeric chars
			if(str.length != 10) return null; // must be 10 digits
			return true;
		} else {
			return null;
		}
	},
	// validates all form input
	validate: function(field,regex) {
		var error_list = [], // a list of all fields that did not meet validation criteria
			field,
			flag,
			regex_obj;

		/* definitions for the repeated variables below:
				field:     the form input object to be validated
				regex_obj:  the criteria to validate against
				flag:      boolean - true for valid data, false for invlaid data
		*/

		//firstname
		field = $("#contact .form #firstName");
		regex_obj = /^[a-zA-ZÀ-ÿ\-]+$/;
		flag = regex_obj.test(field.val());
		if (!flag) {
			error_list.push($("#contact .form .firstName .invalid"));
			error_list.push($(".CategoryBody .errorList .fname.invalid"));
		}
		//lastname
		field = $("#contact .form #lastName");
		regex_obj = /^[a-zA-ZÀ-ÿ \-]+$/;
		flag = regex_obj.test(field.val());
		if (!flag) {
			error_list.push($("#contact .form .lastName .invalid"));
			error_list.push($(".CategoryBody .errorList .lname.invalid"));
		}
		//email
		field = $("#contact .form #email");
		regex_obj = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
		flag = regex_obj.test(field.val());
		if (!flag) {
			error_list.push($("#contact .form .email .invalid"));
			error_list.push($(".CategoryBody .errorList .email.invalid"));
		}

		// phone
		field = $("#contact .form #daytimePhone");
		flag = TargetCA.contact.verifyDaytimePhone($("#contact .form #daytimePhone").val());
		if (flag == null) {
			error_list.push($("#contact .form .phone .invalid"));
			error_list.push($(".CategoryBody .errorList .fon.invalid"));
			$("#contact .form .phone .field2").css('padding-top',15);
		}else{$("#contact .form .phone .field2").css('padding-top',0);}

		//postal code
		field = $("#contact .form #postalCode2");
		if (field.val().length < 6) {
			error_list.push($("#contact .form .fieldpostal .invalid"));
			error_list.push($(".CategoryBody .errorList .zip.invalid"));
			$("#contact .form .addr .fieldprov").css('padding-top',33);
		}else{$("#contact .form .addr .fieldprov").css('padding-top',0);}

		/* fields no longer required 
		//product type
		field = $("#contact .form #productType");
		if (field.val() == "") {
			error_list.push($("#contact .form .productType .invalid"));
		}

		//product name
		field = $("#contact .form #productName");
		if (field.val() == "") {
			error_list.push($("#contact .form .productName .invalid"));
		}

		*/

		//selection
		field = $("#contact .form #subject");
		if (field.prop("selectedIndex") <= 0) {
			error_list.push($("#contact .form .subject .invalid"));
			error_list.push($(".CategoryBody .errorList .subject.invalid"));
		}
		//questions
		field = $("#contact .form #comments");
		if (field.val() == "") {
			error_list.push($("#contact .form .comments .invalid"));
			error_list.push($(".CategoryBody .errorList .comment.invalid"));
		}
		return error_list;
	},
	// populates the error display field for input fields that failed validation, and makes them visible
	validationFeedback: function(obj) {
		$("#contact .form .invalid").css({'display':'none'});
		$(".CategoryBody .errorList .invalid").css({'display':'none'});
		$.each(obj, function() {
			this.css({'display':'inline'});
		});
	}
}