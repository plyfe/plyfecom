// 2014-04-23, Josh Wang
// BBFFL Help them read
	

// 1 - Validate Email Format
// ------------------------------------------------------------------		
function validateEmailFormat(email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if( !emailReg.test( email ) ) {
		return false;
	} else {
		return true;
	}
}	


// 2 - Enable/Disable Button
// ------------------------------------------------------------------			
function enableButton(myObj) {
	$(myObj).removeAttr("disabled");
	//$(myObj).html($(myObj).attr("title"));				
	$(myObj).removeClass("disabled");		
}
function disableButton(myObj) {
	$(myObj).attr("disabled", "disabled");
	//$(myObj).html("Processing...");		
	$(myObj).addClass("disabled");
}
function disableButton2(myObj) {
	$(myObj).attr("disabled", "disabled");
	$(myObj).html("Processing...");		
	$(myObj).addClass("disabled");
}
	
function quizSlideResize(){
	//var voting_max_height = 0;
	// Run through all slide to determine the max height
	/*$(".quiz-question").each(function() {
		// Determine the max height
		if(voting_max_height <= $(this).outerHeight()){
			voting_max_height = $(this).outerHeight();	
		};
    });*/	
	// make sure the container is at max height
	//$(".quiz-holder").height(voting_max_height);	
	
	$(".quiz-holder").height($(".quiz-question:visible").outerHeight());
}
	

// When Document is Ready
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------	


$(document).ready(function(){
	// ----------------------------------------------------------------------------------------------------------------	
	// Smooth Scrolling to anchor
	// ----------------------------------------------------------------------------------------------------------------
	
	// using class smooth to control the function
	jQuery("body").on("click", ".smooth", function(){
		jQuery('html, body').animate({
			scrollTop: jQuery( jQuery.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});
	
	// ----------------------------------------------------------------------------------------------------------------	
	// Quiz Section
	// ----------------------------------------------------------------------------------------------------------------
	// Show first quiz
	$(".quiz-question").first().show();
	
	// Resize the slide
	quizSlideResize();
	
	
	// Characters
	// ------------------------------------------------------------------
	var myCharacters = Array();
	for(var i = 0; i < 9; i++) {myCharacters[i] = 0.00;}
	function getCharacter() {
		// Find Index
		var _myIndex = 0;
		var _myCurScore = 0.00;
		for(var i = 0; i < 9; i++) {
			if(myCharacters[i] > _myCurScore) {
				_myCurScore = myCharacters[i];
				_myIndex = i;
			}
		}
		$("input[name=CharacterInx]").val(_myIndex);
		
		// Return Value
		if(_myIndex == "1") {return "Clifford";}
		else if(_myIndex == "2") {return "Sam";}		
		else if(_myIndex == "3") {return "Madeline";}		
		else if(_myIndex == "4") {return "The Giving Tree";}		
		else if(_myIndex == "5") {return "Peter";}		
		else if(_myIndex == "6") {return "The Velveteen Rabbit";}		
		else if(_myIndex == "7") {return "The Very Hungry Caterpillar";}	
		else if(_myIndex == "8") {return "Max";}		
		else {return "Rosalba";}												
		
			
	}
	
	// 1.00, 1.01, 1.03, 1.06, 1.10, 1.15
	function getScore(myQuiz) {
		if(myQuiz == "2") {return 1.01;}
		else if(myQuiz == "3") {return 1.03;}
		else if(myQuiz == "4") {return 1.06;}
		else if(myQuiz == "5") {return 1.10;}
		else if(myQuiz == "6") {return 1.15;}
		else {return 1.00;}							
	}
	
	// Move to next slide
	$(".quiz-question .button-advance").click(function(){

		var _myObj = $(this); 
		var _myAnswer = 0;  /* 1 ~ 9 */
		var _myScore = getScore(_myObj.data('index'));
		// make sure at least one question is select

		if($(this).closest(".quiz-question").find("table td.active").size() > 0){

			_myAnswer = $(this).closest(".quiz-question").find("table td.active").closest(".three-col").index();
			myCharacters[_myAnswer] += _myScore;			

			// Complete
			if(_myObj.hasClass("button-complete")) {

				// Disable the Button
				disableButton2(_myObj);

				// Get Character 				
				$("input[name=Character]").val(getCharacter());

				// GA Tracking
				ga('send', 'event', 'Quiz Submission', 'BBFFL - 2014 Microsit 2 Help Them Read');
				nexusAddAudit({auditTypeID: 30, description: "Quiz"}, function(){
								
					// 1.6.1 - Save Quiz
					var myData = getFormValuesToObject($("#quiz-answer"));						
					$.post("ajax/ajax.php", {task: "save_quiz", user: myData}, function(data) {									
						var _myFeedback = new Object();
						_myFeedback.firstName = myData.FirstName;
						_myFeedback.lastName = myData.LastName;				
						_myFeedback.email = myData.Email;
						_myFeedback.comments = "Character: " + myData.Character + "\nQuiz1: " + myData.Quiz1 + "\nQuiz2: " + myData.Quiz2 + "\nQuiz3: " + myData.Quiz3 + "\nQuiz4: " + myData.Quiz4 + "\nQuiz5: " + myData.Quiz5 + "\nQuiz6: " + myData.Quiz6;						

						// 1.6.1.1 - Save Feedback Parameters
						nexusAddFeedback(_myFeedback, function(){										

							$("#quiz-answer").submit();
						}); // Close nexusAddFeedback
					
					});	// Close Ajax Call
	
				}); // Close nexusAddAudit				
		
				
			} // Close _myObj.hasClass("button-complete")
			
			// Next Question
			else {
				// hide all
				$(".quiz-question").hide();			
				// show the select one
				$(".quiz-question[data-quiz="+$(this).data('index')+"]").show();			
				quizSlideResize();	 
			}
		}else{
			// notify user to select the answer
			alert("Please select a answer");	
		}
		
		return false;
	});
	
	// Click event on the quiz answer
	$(".quiz-question table td").click(function(){
		// Get current index
		var _index = $(this).closest('.quiz-question').data("quiz");
		// remove all highlight
		$(this).closest('.quiz-question').find('td').removeClass('active');		
		// hightlight current selection
		$(this).addClass('active');
		// change hidden field values
		$('input[name=Quiz'+(_index + 1)+']').val($(this).text());
		
		setTimeout(function(){advance(_index);}, 100);
	});
	
	// Advance	
	// inx = 0 ~ 5	
	function advance(inx) {
		var _myScore = getScore(parseInt(inx) + 1); // inx: 1 ~ 6						
		var _myAnswer = 0;  /* 1 ~ 9 */		
		var _myComplete = false;		
		
		if(inx >= 5) {_myComplete = true;}		
		_myAnswer = parseInt($(".quiz-question:eq(" + inx +")").find("table td.active").closest(".three-col").index()) - 1;
		myCharacters[_myAnswer] += _myScore;					

		
		if(_myComplete) {
			$("input[name=Character]").val(getCharacter());			
			ga('send', 'event', 'Quiz Submission', 'BBFFL - 2014 Microsit 2 Help Them Read');
			nexusAddAudit({auditTypeID: 30, description: "Quiz"}, function(){
							
				// 1.6.1 - Save Quiz
				var myData = getFormValuesToObject($("#quiz-answer"));						
				$.post("ajax/ajax.php", {task: "save_quiz", user: myData}, function(data) {									
					var _myFeedback = new Object();
					_myFeedback.firstName = myData.FirstName;
					_myFeedback.lastName = myData.LastName;				
					_myFeedback.email = myData.Email;
					_myFeedback.comments = "Character: " + myData.Character + "\nQuiz1: " + myData.Quiz1 + "\nQuiz2: " + myData.Quiz2 + "\nQuiz3: " + myData.Quiz3 + "\nQuiz4: " + myData.Quiz4 + "\nQuiz5: " + myData.Quiz5 + "\nQuiz6: " + myData.Quiz6;						

					// 1.6.1.1 - Save Feedback Parameters
					nexusAddFeedback(_myFeedback, function(){										
						$("#quiz-answer").submit();
					}); // Close nexusAddFeedback
				
				});	// Close Ajax Call

			}); // Close nexusAddAudit					
		}
		else {
			$(".quiz-question").hide();			
			// show next question
			$(".quiz-question[data-quiz="+(parseInt(inx) + 1)+"]").show();			
			quizSlideResize();			
		}
		
		
	}
	
	

	
	
	// Quiz Submission
/*	
	$(".button-complete").click(function(){
		
		var _myObj = $("#quiz-answer");
		// make sure at least one question is select
		if($(this).closest(".quiz-question").find("table td").hasClass("active")){	

				
		}else{
			// notify user to select the answer
			alert("Please select a answer");	
		}
		return false;
	});	
*/	
	
	
	
	// Javascript and jQuery Functions
	// ----------------------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------------------	
  	
	// Validation for all form
	
	
	
	// 4.4 - Vote Now Button
	$("#btnSubmit").click(function() {

		// 4.1 - Initialize Variable
		var _myInvalid = false;		
		var _myObj = $(this).closest("form");	
		var _myButton = $(this);					
		var _myPage = $("input[name=Page]").val();
		
		// Lock Self
		if($(this).attr("disabled") == "disabled") {return false;}		
		disableButton(_myButton);		
		
		// 1.2 - Validate			
			
			// 1.2.1 - Check Donation Options
			
				
			// 1.2.2 - Check Required Fields 
			_myObj.find(".required").each(function() {
				if($(this).val() == "") {
					_myInvalid = true;
					alert("Please fill in " + $(this).attr("title"));
					$(this).focus();
					enableButton(_myButton);					
					return false;
				}			
			});
			if(_myInvalid) {return false;}		
		
		
			// 1.2.3 - Check Email Field
			_myObj.find(".email").each(function() {
				if(!validateEmailFormat($(this).val())) {
					_myInvalid = true;
					alert("Invalid Email address");
					$(this).focus();
					enableButton(_myButton);					
					return false;
				}			
			});
			if(_myInvalid) {return false;}	
			
			
		// GA Tracking
		ga('send', 'event', 'Name Conversion', 'BBFFL - 2014 Microsit 2 Help Them Read');		
	
		
		// 1.6 - Nexus Tracking
		// 30: "Form Submission"
		nexusAddAudit({auditTypeID: 30, description: "Name - " + _myPage}, function(){
			_myObj.submit();		
		}); // Close nexusAddAudit*/		
	
	
	}); // Close of $("#donationSubmit").click(function() 
	
	
	$("#give-form input").keydown(function(event) {
		if (event.keyCode == 13){$(this).closest("form").find("#donationSubmit").click();}
	});	// End of Hit Enter and Submit Donate Button
	
	
	
	 // 4.3 limit key input 	  
	$(".digit-only").keydown(function(event) {
				
		// 2.1 - Allow: Backspace, Delete, Tab, Escape, Enter, Comma
		//		 Ctrl + A => Select all
		//		 Home, End, Left, Right
		if ( (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13  || event.keyCode == 188) || 
			 (event.keyCode == 65 && (event.ctrlKey === true || event.metaKey === true) ) || 
			 (event.keyCode >= 35 && event.keyCode <= 39)) { 				 
			 return;
		}
		// 2.2 - Ensure It is a Number and Stop the Keypress
		else {
			if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {

				// 2.2.1 - If Not Integer Allow Period
				if(!($(this).hasClass("integer")) && event.keyCode == 190 && $(this).val().indexOf(".") == -1 ) {					
					return;
				}
				// 2.2.2 - If Not Integer Allow Decimal Point
				if(!($(this).hasClass("integer")) && event.keyCode == 110 && $(this).val().indexOf(".") == -1 ) {					
					return;
				}
				
				// 2.2.3 - Blocking
				else {
					event.preventDefault();
				}
			}   
		} // end else
	});
	
	// --- Placeholder, Using Modelizer to Fit Place Holder to all of Browsers --- // 
	if(!Modernizr.input.placeholder){
		$('[placeholder]')
			.focus(function() {
				var input = $(this);
				  if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				  }
			})
			.blur(function() {
				  var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			})
			.blur();
		$('[placeholder]').parents('form').submit(function() {
			  $(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
				  input.val('');
				}
			  })
		});
	}// Modernizr input for IE	
	
	
	// Social Share Buttons
	// Facebook Share Button
	$(".facebook a").on("click", function(event){
		ga('send', 'event', 'Click', 'Facebook Share');						
		nexusAddAudit({auditTypeID: 41}); // 41 - Facebook Link
//		var _url = "http://www.facebook.com/sharer.php?s=100&p[title]=" + encodeURIComponent($(this).data("title")) + "&p[summary]=" + encodeURIComponent($(this).data("desc")) + "&p[url]=" + encodeURIComponent($(this).data("url")) + "&p[images][0]=" + encodeURIComponent($(this).data("image"));		
		var _url = "http://www.facebook.com/sharer.php?m2w&s=100&&p[url]=" + $(this).attr("data-url");		
		window.open(_url,'r','toolbar=0,status=0,width=550,height=420');						

	});	
	
	// Twitter Share
	$(".twitter a").on("click", function(event){
		ga('send', 'event', 'Click', 'Twitter Share');			
		nexusAddAudit({auditTypeID: 42}); // 42 - Twitter Link
		var _url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent($(this).data("desc")) + "&url=" + encodeURIComponent($(this).data("url"));
		window.open(_url,'r','toolbar=0,status=0,width=550,height=420');				
	});		
	

	// Facebook Connect
	$(".btnFBConnect").click(function() {
		FB.login(function(response) {
        	if (response.status && response.status == "connected") {            
            	FB.api('/me', function(user) {
                	if(user != null) {											
						var _myObj = $("form.formSurvey");                   								
						_myObj.find("input[name=FacebookID]").val(user.id);						
						_myObj.find("input[name=IsFacebookConnect]").val("YES");																		
						_myObj.find("input[name=FirstName]").val(user.first_name);
						_myObj.find("input[name=LastName]").val(user.last_name);
						_myObj.find("input[name=Email]").val(user.email);
						ga('send', 'event', 'Click', 'FB Connect');									
						nexusAddAudit({auditTypeID: 38, description: "Facebook Connect"}); // 38 - Web Link						
                	}
                	else {
                    	alert("Your Facebook authentication failed.");
					}
		        });
        	}
		}, {scope: 'email'});	
	});
	
	
	// Convert Form Values into Object
	function getFormValuesToObject(myObj) {
		var _data = {};
		$.each(myObj.serializeArray(), function(_, kv) {_data[kv.name] = kv.value;});		
		return _data;
	}
	
	// --------------------------------------------------------------------
	// NEXUS & TRACKING
	// --------------------------------------------------------------------
	
	// 1 - Initialize
	nexusInit(NEXUS_CLIENT_ID, NEXUS_CAMPAIGN_ID);

	// 2 - Get User and Audit Page View
	// 	   5 - Landing Page
	//     37 - Article
	nexusGetUser(function(data){
		nexusAddAudit({auditTypeID: NEXUS_AUDIT_TYPE_ID, description: NEXUS_AUDIT_DESC});			
		
		// If we have an User
		if(data != "false") {
			
			// Prefill the Data

		}
	});	
		
});



// When Document is Loaded
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------	
$(window).load(function() {

});

// When Window Resize
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------	
jQuery(window).resize(function() {
  	// re-run the slide resize
	quizSlideResize()
});	






// VIDEO TRACKING
var hit01 = false, hit25 = false, hit50 = false, hit75=false, hit99=false;
var pastTime = 0;

// 7: "Video 01%"
// 10: "Video 25%"
// 13: "Video 50%"
// 16: "Video 75%"
// 19: "Video 99%"
function nexusTrackVideo(obj) {	

	//	if($("video").length > 0)
	//		time = $("video").get(0).currentTime / $("video").get(0).duration;
	time = obj.position / obj. duration;

	//Reset the time if they scrubbed backwards
	if(time < pastTime) {
		hit01 = false; 
		hit25 = false;
		hit50 = false; 
		hit75=false; 
		hit99=false;
	}				
	if(time > 0 && !hit01){
		hit01 = true;		
		nexusAddAudit({auditTypeID: 7});					
	}
	else if(time > .25 && !hit25) {
		hit25 = true;
		nexusAddAudit({auditTypeID: 10});				
	}
	else if(time > .50 && !hit50) {
		hit50 = true;		
		nexusAddAudit({auditTypeID: 13});			
	}
	else if(time > .75 && !hit75) {
		hit75 = true;
		nexusAddAudit({auditTypeID: 16});				
	}
	else if(time > .99 && !hit99) {
		hit99 = true;		
		nexusAddAudit({auditTypeID: 19});			
	}
	pastTime = time;	
}	
 
