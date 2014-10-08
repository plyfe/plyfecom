// 2013-06-11, Raymond Chan
// Version: 1.1.0
// Javascript and jQuery for Nexus 

// Pursuant-Nexus Auditing and Data Prepopulation Tool
// 2013-04-10, Kevin Peters
// Version: 1.0.0

// Section 0 - Configuration
// Section 1 - Campaign
// Section 2 - User
// Section 3 - Audit
// Section 4 - Feedback
// Section 5 - Donation
// Section D - Debug

// Javascript and jQuery Global Functions
// ----------------------------------------------------------------------------------------------------------------	
$(function() {
	
	// ------------------------------------------------------------------------------------------------	
	// Section 0 - Configuration
	// ------------------------------------------------------------------------------------------------
	
		// 1 - Variables
		var INITIALIZED = false;				// If Nexus Campaign Initialized Yet, Check this Function Each Time Before Running Any Function
		var WEB_SERVICE_URL = "";				// Nexus Web Service URL 
		var	CLIENT_ID = "210";					// CLIENT ID, default "210" => Pursuant, this should be initialized each project 
		var	CAMPAIGN_ID62 = "TPG+ACAM";			// CAMPAIGN_ID62, default "TPG+ACAM" => Pursuant Dev Project, this should be initialized each project
		var	SEND_INSTANCE_ID62 = null;			// SID, Nexus User ID
		var PURL = "";							// PURL, personal URL, eg: raymond.chan from raymond.chan.pursuant7.com
		var	RECIPIENT_ID = null;				// Nexus User Recipient ID
		var COOKIE_ON = true;					// If Cookie is On or Not		
		var COOKIE_EXP = 7;						// Default Cookie Expiration Day	
		var	IP_ADDRESS = null;					// User IP Address
		var USER_PROFILE = {};					// User Profile as Object
		var HISTORY_URL = new Array()			// For Debug: Save all WebService Call URL
 

		// 2 - Configurate
		WEB_SERVICE_URL = ('https:' == document.location.protocol ? 'https://' : 'http://')  + 'conductor.pursuant.net/TrackingServices/TrackingServices.asmx';			// Production
		//WEB_SERVICE_URL = ('https:' == document.location.protocol ? 'https://' : 'http://')  + 'conductor.pursuant.net/TrackingServicesStaging/TrackingServices.asmx';  // Staging


	// ------------------------------------------------------------------------------------------------	
	// Section 1 - Campaign
	// ------------------------------------------------------------------------------------------------
	
		// 1.1 - Initialize Campaign
		nexusInit = function(client_id, campaign_id62) {	

			// 1.1.1 - Set my global variables
			CLIENT_ID = client_id;
			CAMPAIGN_ID62 = encodeURIComponent(campaign_id62);		

			// 1.1.2 - Get IP Address		
			getIP(function(ip) {IP_ADDRESS = ip;});

			// 1.1.3 - Set Initialized as True
			INITIALIZED = true;			

		}		
	
	// ------------------------------------------------------------------------------------------------	
	// Section 2 - User
	// ------------------------------------------------------------------------------------------------	
	
		// 2.1 - Get User
		//       myType => string, case insensitive 
		//                 Possible Values:
		//				   sendInstanceID62 => "sid", "sendInstanceID62", "send_instance_id62"
		//  			   purl => "purl" 		
		//				   recipientID => "recipientID", "recipient_ID" 
		//				   tpgid => "tpgid", "tpg_id"
		//				   personID => "personID". "person_ID" 
		//		 myValue => string, case sensitive
		//		 Proority:
		//		 1 - Hard Set Type and Value, eg: nexusGetUser("sid", "TPG+9ClLfCEF");
		//       2 - PURL, eg: raymond.chan.pursuant.com 
		//       3 - Query String, all the possible type that listed above eg: sid, tpgid, personid
		//       4 - Cookie
		nexusGetUser = function(myType, myValue, callback) {	

			// 2.1.1 - Validate Initialized
			validateInitialized(); 
		
			// 2.1.2 - Initialize Variables
			var _myPost = false;								// If we should send out Ajax call to Web Service
			var _myContiue = true;								// Stop if we found info already, We have Priority => Hard Set Value => purl => sid
			var _myType = "";									// If we have hard set type
			var _myCallback = false;							// Callback function						
			var _myTmp = "";									// Temperoray variable to save value

			if(typeof myType != "undefined" && typeof myType != "function" && typeof myType != "") {
				_myType = myType.toLowerCase();
			}
			
			if(typeof callback == "function") {
				_myCallback = callback;
			}
			else if(typeof myType == "function") {
				_myCallback = myType;							
			}
			
			var parameters = {
				clientID : CLIENT_ID, 
				campaignID62 : CAMPAIGN_ID62,
				sendInstanceID62: "",
				personID: "",	
				tpgid: 0,
				purl: "",	
				recipientID: 0
			};							// Parameter for Ajax Call
			
			// 2.1.3 - Start to Gathering Information
			
				// 2.1.3.1 - From Hard Set Values
				if(_myContiue && _myType != "") {
					
					// 2.1.3.1.1 - SID
					if(_myType == "sid" || _myType == "sendinstanceid62" || _myType == "send_instance_id62") {
						parameters['sendInstanceID62'] = encodeURIComponent(myValue.replace(" ", "+"));
						SEND_INSTANCE_ID62 = encodeURIComponent(myValue.replace(" ", "+"));				
						_myPost = true;
						_myContiue = false;						
					}
					
					// 2.1.3.1.2 - PURL
					else if(_myType == "purl") {
						parameters['purl'] = myValue;
						PURL = myValue;
						_myPost = true;						
						_myContiue = false;												
					}					
	
					// 2.1.3.1.3 - Recipient ID
					else if(_myType == "recipientid" || _myType == "recipient_id") {					
						parameters['recipientID'] = myValue;
						RECIPIENT_ID = myValue;
						_myPost = true;
						_myContiue = false;											
					}
					
	
					// 2.1.3.1.4 - TPG ID
					else if(_myType == "tpgid" || _myType == "tpg_id") {
						parameters['tpgid'] = myValue;
						_myPost = true;						
						_myContiue = false;																		
					}
						
					// 2.1.3.1.5 - Person ID				
					else if(_myType == "personid" || _myType == "person_id") {
						parameters['personID']= myValue;
						_myPost = true;						
						_myContiue = false;																								
					}
					
					
				}
				
				// 2.1.3.2 - From PURL
				if(_myContiue) {
					
					// 2.1.3.2.1 - Detect PURL 
					
						// 2.1.3.2.1.1 - Initialize Variables
						var _myUrl = document.domain;		// Assign domain into URL
						var _mySeg = _myUrl.split(".");		// Segment Domain by Dots
						var _myPurl = "";					// my PURL
						var _myIsPurl = false;				// Is there a PURL
					
						// 2.1.3.2.1.2 - When we have more than at least 3 dots
						//			     This will prevent the case pursuant.com
						//				 eg: raymond.chan.pursuant.com pr raymond.chan.www.pursuant.com
						if(_mySeg.length > 2) {
							_myPurl = _mySeg[0] + "." + _mySeg[1];
						}
						
						// 2.1.3.2.1.3 - Check Value
						//				 When we have www, then it is a false PURL
						if(_myPurl.indexOf("www") < 0 && _myPurl.indexOf("webdev") < 0) {
							_myIsPurl = true;
						}


					// 2.1.3.2.2 - Set PURL
					if(_myIsPurl) {
						parameters['purl'] = _myPurl;
						PURL = _myPurl;
						_myPost = true;
						_myContiue = false;						
					}							

				}
				
				// 2.1.3.3 - From Query String
				if(_myContiue) {
					
					// 2.1.3.3.1 - SID
					if(getQueryString("sid") != "" || getQueryString("sendinstanceid62") != "" || getQueryString("send_instance_id62") != "") {						
						
						// 2.1.3.3.1.1 - Assign Value from Query String
						if(getQueryString("sid") != "") {_myTmp = getQueryString("sid");}
						else if(getQueryString("sendinstanceid62") != "") {_myTmp = getQueryString("sendinstanceid62");}
						else if(getQueryString("send_instance_id62") != "") {_myTmp = getQueryString("send_instance_id62");}						
						
						// 2.1.3.3.1.2 - Validate
						if(_myTmp == "") {return false;}
						
						// 2.1.3.3.1.3 - Reformat
						_myTmp = encodeURIComponent(_myTmp.replace(" ", "+"));

						// 2.1.3.3.1.4 - Assign to Parameter
						parameters['sendInstanceID62'] = _myTmp;
						SEND_INSTANCE_ID62 = parameters['sendInstanceID62'];				
						_myPost = true;
						_myContiue = false;
					}	
	
					// 2.1.3.3.2 - PURL				
					else if(getQueryString("purl") != "") {								
						parameters['purl'] = getQueryString("purl");
						PURL = parameters['purl'];
						_myPost = true;						
						_myContiue = false;															
					}
					
					// 2.1.3.3.3 - Recipient ID
					else if(getQueryString("recipientid") != "" || getQueryString("recipient_id") != "") {						
						
						// 2.1.3.3.3.1 - Assign Value from Query String
						if(getQueryString("recipientid") != "") {_myTmp = getQueryString("recipientid");}
						else if(getQueryString("recipient_id") != "") {_myTmp = getQueryString("recipient_id");}
						
						// 2.1.3.3.3.2 - Validate
						if(_myTmp == "") {return false;}

						// 2.1.3.3.3.3 - Assign to Parameter
						parameters['recipientID'] = _myTmp;
						RECIPIENT_ID = parameters['recipientID'];
						_myPost = true;
						_myContiue = false;	
					}		
					
					// 2.1.3.3.4 - TPG ID
					else if(getQueryString("tpgid") != "" || getQueryString("tpg_id") != "") {						
						
						// 2.1.3.3.4.1 - Assign Value from Query String
						if(getQueryString("tpgid") != "") {_myTmp = getQueryString("tpgid");}
						else if(getQueryString("tpg_id") != "") {_myTmp = getQueryString("tpg_id");}
						
						// 2.1.3.3.4.2 - Validate
						if(_myTmp == "") {return false;}

						// 2.1.3.3.4.3 - Assign to Parameter
						parameters['tpgid'] = _myTmp;
						RECIPIENT_ID = parameters['tpgid'];
						_myPost = true;
						_myContiue = false;	
					}	
					
					// 2.1.3.3.5 - Person ID
					else if(getQueryString("personid") != "" || getQueryString("person_id") != "") {						
						
						// 2.1.3.3.5.1 - Assign Value from Query String
						if(getQueryString("personid") != "") {_myTmp = getQueryString("personid");}
						else if(getQueryString("person_id") != "") {_myTmp = getQueryString("person_id");}
						
						// 2.1.3.3.5.2 - Validate
						if(_myTmp == "") {return false;}

						// 2.1.3.3.5.3 - Assign to Parameter
						parameters['personID'] = _myTmp;
						RECIPIENT_ID = parameters['personID'];
						_myPost = true;
						_myContiue = false;	
					}														

				}
					
				// 2.1.3.4 - From Cookie
				//           2013-07-10, Raymond Chan
				//           It might not be good to save personal info in cookie; so, save recipientid and then call Nexus				
				if(_myContiue && COOKIE_ON) {
					_myTmp = getCookie("c_recipientid");
					if(_myTmp != "" && _myTmp != null && _myTmp > 0) {
						parameters['recipientID'] = _myTmp;
						RECIPIENT_ID = parameters['recipientID'];
						_myPost = true;
						_myContiue = false;							
					}		
				}
					
							
			// 2.1.4 - Call Web Service & Try to Get User Info
			if(_myPost) {
				callWebService("GetUser", parameters, function(data){					
					if(typeof data.d == "object") {
						
						// 2.1.4.1 - Assign into User Profile
						USER_PROFILE = data.d;
						
						// 2.1.4.1 - We found an user
						if(USER_PROFILE != null && USER_PROFILE != "null" && USER_PROFILE.hasOwnProperty("RecipientID")) {

							// 2.1.4.1.1 - Save into USER_PROFILE & RECIPIENT_ID
							RECIPIENT_ID = USER_PROFILE.RecipientID;
							USER_PROFILE = data.d;					
							
							// 2.1.4.1.2 - Callback
							if(typeof _myCallback == "function") {
								_myCallback(USER_PROFILE);
							}			
							
							// 2.1.4.1.3 - Save into Cookie
							if(COOKIE_ON) {
								setCookie("c_recipientid", USER_PROFILE.RecipientID, COOKIE_EXP); // Expire in 7 days
							}
																		
						}

						// 2.1.4.2 - Not Found Matched User
						else {
							USER_PROFILE = {};							
							if(typeof _myCallback == "function") {
								_myCallback(USER_PROFILE);
							}	
						}
						
					}
					else {
						// Error Handler
						throw new SyntaxError('Nexus Cannot Get This User');						
					}
				});
			}
			else {
				USER_PROFILE = false;
				if(typeof _myCallback == "function") {
					_myCallback(USER_PROFILE);
				}				
			}
			
		}		


		// 2.2 - Get User Profile
		//		 Return USER_PROFILE object
		//		 Logically we should call nexusGetUser first to call Web Service to get User Profile
		nexusGetUserProfile = function() {	
			return USER_PROFILE;
		}
	
	
		// 2.3 - Update User
		//		 Update or add new Nexus User by passed data. Data is an object like {email: "raymond.chan@pursuant.com", firstName: "Raymond", lastName: "Chan"}.
		//		 data is required, and email in data is also required		
		//       You can refer to Web Service UpdateUser method for all possible fields. 
		//		 callback is optional
		//		 It tried to find if Email in data matches Email in UserProfile, if yes, we will merge data into UserProfile
		//       This function will also update UserProfile after service call finished
		nexusUpdateUser = function(data, callback) {	

			// 2.3.1 - Validate Initialized
			validateInitialized(); 
						
			// 2.3.2 - Initialize Variables
			var _myCallback = false;							// Callback function						

			if(typeof callback == "function") {
				_myCallback = callback;
			}
			
			// 2.3.3 - Validate passed parameter
			
				// 2.3.3.1 - Check if Data is an object and with at least one parameter (email)
				if(typeof data != "object" || getObjectLength(data) < 1) {
					throw new SyntaxError('Invalid User Data');
					return false;
				}
				
				// 2.3.3.2 - Check if Email is set
				if(!data.hasOwnProperty("email")) {
					throw new SyntaxError('Email is required');
					return false;					
				}
				
				// 2.3.3.3 - Check if Valid Email
				if(data.email == "" || !validateEmail(data.email)) {
					throw new SyntaxError('Invalid Email address');
					return false;										
				}

			// 2.3.4 - Some Local Support Functions
			
				// 2.3.4.1 - Reformat to URL safe characters	
				var _getFormatedParams = function(_params) {
					for(var key in _params) {
						if(key != "clientID" && key != "recipientID" && key != "campaignID62") {
							_params[key] = encodeURIComponent(_params[key]);
						}
					}
					return _params;
				}


				// 2.3.4.2 - Merge USER_PROFILE into parameter
				//			 WHY not use jQuery.extend(parameters, USER_PROFILE) ???
				//			 Because CASE SENSITIVE
				var _getMergedUserProfile = function(_param) {
					
					// 2.3.4.2.1 - Mapping
					var _myObj = {};
					var _myMapping = {
							Address1: "address1",
							Address2: "address2",
							Address3: "address3",
							AppealCode: "appealCode",
							BAddress1: "bAddress1",
							BAddress2: "bAddress2",
							BAddress3: "bAddress3",
							BCell: "bCell",
							BCity: "bCity",
							BCountry: "bCountry",
							BEmail: "bEmail",
							BEmail2: "bEmail2",
							BEmail3: "bEmail3",
							BFax: "bFax",
							BPhone: "bPhone",
							BPostalCode: "bPostalCode",
							BProvince: "bProvince",
							BState: "bState",
							BirthDay: "birthDay",
							BusinessDepartment: "businessDept",
							BusinessJobTitle: "businessJobTitle",
							BusinessName: "businessName",
							Cell: "cell",
							Chapter: "chapter",
							City: "city",
							ClientID: "clientID", 							
							Country: "country",
							DonorStatus: "donorStatus",
							Email: "email",
							Email2: "email2",
							Email3: "email3",
							Fax: "fax",
							FirstName: "firstName",
							FullName: "fullName",
							Gender: "gender",
							GraduationYear: "gradYear",
							GreekOrganization: "greekOrganization",
							InitiationDate: "ignore",
							LastGiftAmount: "ignore",
							LastGiftDate: "ignore",
							LastName: "lastName",
							LifetimeTotalGiving: "ignore",
							MaidenName: "maidenName",
							MailCode: "mailCode",
							MiddleName: "middleName",
							Organization: "ignore",
							OrganizationJobTitle: "ignore",
							PURL: "ignore",
							PersonID: "ignore",
							PersonID2: "ignore",
							Phone: "phone",
							PostalCode: "postalCode",
							PrePopField: "prePopField",
							PrePopField2: "prePopField2",
							PrePopField3: "prePopField3",
							PreferredFirstName: "prefFirstName",
							Prefix: "prefix",
							Province: "province",
							RecipientID: "ignore",
							SendID: "ignore",
							SendTypeID: "ignore",
							SendTypeName: "ignore",
							Source: "source",
							State: "state",
							Suffix: "suffix",
							Tpgid: "ignore",
							University: "ignore",
							YearTotalGiving: "ignore"						
					};	
					
					// 2.3.4.2.2 - Running Mapping
					for(var _key in _myMapping) {
						if(_myMapping[_key] != "ignore") {
							if(USER_PROFILE.hasOwnProperty(_key)) {
								_myObj[_myMapping[_key]] = USER_PROFILE[_key];
							}
						}
					}
					
					// 2.3.4.2.3 - Return Object
					jQuery.extend(_param, _myObj);
					return _param;
				}

				// 2.3.4.3 - Update User
				var _runUpdateUser = function(_params) {
					
					// 2.3.4.3.1 - Now Merge data into parameter
					jQuery.extend(_params, data);	
					
					// 2.3.4.3.2 - Reformat Current Parameter
					_params = _getFormatedParams(_params);
			

					// 2.3.4.3.3 - Call Web Service to UPDATE USER
					callWebService("UpdateUser", _params, function(data){
		
						if(typeof data == "object" && data != null) {	
						
							// 2.3.4.3.3.1 - Check if recipientID is Returned
							if(data.hasOwnProperty("d") && data.d > 0) {
								
								// 2.3.4.3.3.1.1 - Update API RecipientID
								RECIPIENT_ID = data.d;
								
								// 2.3.4.3.3.1.2 - Update API USER PROFILE object
								nexusGetUser("recipientID", RECIPIENT_ID, _myCallback);
							}
							
							// 2.3.4.4 - Update Failed
							else {
								throw new SyntaxError('Nexus Cannot Update this User');						
							}
							
						}
						else {
							// Error Handler
							throw new SyntaxError('Nexus Cannot Update this User');
						}				
						
					});	
					
				}

			// 2.3.5 - Now Prepare Default UserInfo		
			
				// 2.3.5.1 - Set Default Value, the following fields are required to call Web Service
				var parameters = {
					clientID : CLIENT_ID, 
					campaignID62 : CAMPAIGN_ID62,
					recipientID: -1,
					email: "",
					prefix: "",
					firstName: "",
					lastName: "",
					fullName: "",
					prefFirstName: "",
					middleName: "",
					maidenName: "",
					suffix: "",
					address1: "",
					address2: "",
					address3: "",
					city: "",
					state: "",
					province: "",
					postalCode: "",
					country: "",
					gender: "",
					birthDay: "",
					email2: "",
					email3: "",
					phone: "",
					cell: "",
					fax: "",
					gradYear: "",
					businessName: "",
					businessJobTitle: "",
					businessDept: "",
					bAddress1: "",
					bAddress2: "",
					bAddress3: "",
					bCity: "",
					bState: "",
					bProvince: "",
					bPostalCode: "",
					bCountry: "",
					bEmail: "",
					bEmail2: "",
					bEmail3: "",
					bPhone: "",
					bCell: "",
					bFax: "",
					chapter: "",
					initDate: "",
					donorStatus: "",
					appealCode: "",
					mailCode: "",
					greekOrganization: "",
					source: "",
					prePopField: "",
					prePopField2: "",
					prePopField3: ""
					
				};								// Parameter for Ajax Call
			   //http://conductor.pursuant.net/TrackingServices/TrackingServices.asmx/UpdateUser?
			   //clientID=210&campaignID62=%22TPG%2BDhCAM%22&recipientID=-1&email=%22raymond.chan%40pursuant.com%22&prefix=%22%22&fullName=%22%22&firstName=%22RaymondABC%22&lastName=%22Chan%22&prefFirstName=%22%22&middleName=%22%22&maidenName=%22%22&suffix=%22%22&address1=%22%22&address2=%22%22&address3=%22%22&city=%22%22&state=%22%22&province=%22%22&postalCode=%22%22&country=%22%22&gender=%22%22&birthDay=%22%22&email2=%22%22&email3=%22%22&phone=%22%22&cell=%22%22&fax=%22%22&gradYear=%22%22&businessName=%22%22&businessJobTitle=%22%22&businessDept=%22%22&bAddress1=%22%22&bAddress2=%22%22&bAddress3=%22%22&bCity=%22%22&bState=%22%22&bProvince=%22%22&bPostalCode=%22%22&bCountry=%22%22&bEmail=%22%22&bEmail2=%22%22&bEmail3=%22%22&bPhone=%22%22&bCell=%22%22&bFax=%22%22&chapter=%22%22&initDate=%22%22&donorStatus=%22%22&appealCode=%22%22&mailCode=%22%22&greekOrganization=%22%22&source=%22%22&prePopField=%22%22&prePopField2=%22%22&prePopField3=%22%22

				// 2.3.5.2 - Check if data matches USERPROFILE
				if(USER_PROFILE.hasOwnProperty("Email") && USER_PROFILE.Email == data.email) {									
					
					// 2.3.4.2.1 - Merge with UserProfile
					parameters = _getMergedUserProfile(parameters);
					
					// 2.3.4.2.2 - Ready to Update User
					_runUpdateUser(parameters);
				}
				
				// 2.3.4.3 - If Not, We will need to Update Twice
				//           2013-07-12, Raymond Chan
				//           Most of the fields are required when we call Web Service, so I have to set default as empty
				//           But at the front end form, we may not have all of the info, we may have Email, First Name, and Last Name
				
				else {
					
					// 2.3.4.3.1 - Reformat Current Parameter
					jQuery.extend(parameters, data);
					parameters = _getFormatedParams(parameters);

					// 2.3.4.3.2 - Call First Time Update User to get Receipient ID
					callWebService("UpdateUser", parameters, function(data){		
						if(typeof data == "object" && data != null) {	

							// 2.3.4.3.3.1 - Check if recipientID is Returned
							if(data.hasOwnProperty("d") && data.d > 0) {								

								// 2.3.4.3.3.1.1 - Update API RecipientID
								RECIPIENT_ID = data.d;								

								// 2.3.4.3.3.1.2 - Get User Profile
								nexusGetUser("recipientID", RECIPIENT_ID, function(data) {

									// 2.3.4.3.3.1.2.1 - Merge with UserProfile
									parameters = _getMergedUserProfile(parameters);
									
									// 2.3.4.3.3.1.2.2 - Ready to Update User
									_runUpdateUser(parameters);									
									
								});								
								
							}							
							// 2.3.4.4 - Update Failed
							else {
								throw new SyntaxError('Nexus Cannot Update this User');						
							}
							
						}	
						
					});						
					
				}
				
		}
	
	
	

	// ------------------------------------------------------------------------------------------------	
	// Section 3 - Audit
	// ------------------------------------------------------------------------------------------------		
	
		// 3.1 - Get Audit Page Views
		//		 callback is required; otherwise, it currently make no sense of this function.
		//       callback(data), data is an object with audit type id as key and audit description (page view) as value
		nexusGetAuditPageViews = function(callback) {	

			// 3.1.1 - Validate Initialized
			validateInitialized(); 
						
			// 3.1.2 - Initialize Variables
			var _myCallback = false;							// Callback function						
			var _myData = {};									// Formatted Object to return

			if(typeof callback == "function") {
				_myCallback = callback;
			}
			
			var parameters = {	
			};	
			
			// 3.1.3 - Validate
			if(typeof _myCallback != "function") {
				return false;
			}
			
			// 3.1.4 - Call Web Service
			callWebService("GetAuditPageViews", parameters, function(data){
				
				if(typeof data == "object") {
					
					// 3.1.4.1 - Reformat Data
					for (i in data) {
						for(j in data[i]) {
							_myData[data[i][j].AuditTypeID] = data[i][j].PageView;
						}
					}					
					
					// 3.1.4.2 - Trigger Callback
					callback(_myData);
					
				}
				else {
					// Error Handler
					throw new SyntaxError('Nexus Cannot Get Audit Page Views');
				}				
				
			});					
		}
		
		
		// 3.2 - Add Aduit
		//       nexusAddAudit(data, callback), data is an object like {auditTypeID: 18, description: "index page"}, callback is the callback function
		//
		//		 Possible Key, case sensitive:
		//		     auditTypeID, required => The Audit Type ID, refer to nexusGetAuditPageViews();
		//		     sendInstanceID62, optional => dara value > query string for sid, sendinstanceid62, or send_instance_id62 > API variable SEND_INSTANCE_ID62 > ""
		//		     recipientID, optional => data value > API variable RECIPIENT_ID > 0
		//		     sendID, optional => data value > API variable USER_PROFILE.SendID > 0		
		//		     sendTypeID, optional => data value > API variable USER_PROFILE.SendTypeID > 0
		//		     fromMobile, optional => data value (possible value case i, "yes/no/y/n/true/false/0/1") > auto detect > "false"
		//		     fromShare, optional => data value (possible value case i, "yes/no/y/n/true/false/0/1") > "false"		
		//		     description, optional => data value > ""
		//		     referredBy, optional => data value > document.referrer > ""
		//
		//	     Other Keys:
		//	         campaignID62 => API variable CAMPAIGN_ID62 (CAMPAIGN_ID62 is set in NexusInit())		
		//		     accessedFrom => API variable IP_ADDRESS (auto detected in NexusInit())

		//       AuditTypeID:
		//		     0: "Open"
		//		     1: "Email 1 Web Version"
		//		     2: "Email 2 Web Version"
		//		     3: "Email 3 Web Version"
		//		     4: "Email 4 Web Version"
		//		     5: "Landing Page"
		//		     6: "Share/Embed Page"
		//		     7: "Video 01%"
		//		     8: "10"
		//		     9: "20"
		//		     10: "Video 25%"
		//		     11: "30"
		//		     12: "40"
		//		     13: "Video 50%"
		//		     14: "60"
		//		     15: "70"
		//		     16: "Video 75%"
		//		     17: "80"
		//		     18: "Index Page"
		//		     19: "Video 99%"
		//		     20: "Donation Page 1"
		//		     21: "Donation Page 2"
		//		     22: "Donation Redirect"
		//		     23: "Donation Page 3"
		//		     24: "Donation Process"
		//		     25: "Donation Page 4"
		//		     26: "Reply Form"
		//		     27: "Client Homepage"
		//		     28: "Email Update"
		//		     29: "Download"
		//		     30: "Form Submission"
		//		     31: "Client Email Mailto"
		//		     32: "Address Update"
		//		     33: "Thank You Page"
		//		     34: "Share Button"
		//		     35: "Embed Button"
		//		     36: "Page"
		//		     37: "Article"
		//		     38: "Web Link"
		//		     39: "Media"
		//		     40: "Forward Link"
		//		     41: "Facebook Link"
		//		     42: "Twitter Link"
		//		     43: "Subscribe Link"		
		nexusAddAudit = function(data, callback) {	
		
			// 3.2.1 - Validate Initialized
			validateInitialized(); 					
			
			// 3.2.2 - Validate data
			
				// 3.2.2.1 - Check if Data is an object and with at least one parameter (auditTypeID)
				if(typeof data != "object" || getObjectLength(data) < 1) {
					throw new SyntaxError('Invalid Audit Data');
					return false;
				}					
				
				// 3.3.3.2 - Check if auditTypeID is set
				if(!data.hasOwnProperty("auditTypeID")) {
					throw new SyntaxError('auditTypeID is required');
					return false;					
				}
							
						
			// 3.2.3 - Initialize Variables			

				// 3.2.3.1 - Callback
				var _myCallback = false;							// Callback function									
				if(typeof callback == "function") {
					_myCallback = callback;
				}	

				// 3.2.3.2 - Parameters
				var parameters = {
					campaignID62 : CAMPAIGN_ID62,								
					auditTypeID : 0,				
					sendInstanceID62 : "",
					recipientID: 0,
					sendID : 0,
					sendTypeID : 0,
					fromMobile : 0,
					fromShare : 0,
					description : "",
					accessedFrom : "",
					referredBy : ""
				};							// Parameter for Ajax Call
			
			
				// 3.2.3.3  - Self Help Functions
				var _callWebService = function() {
					callWebService("AddAudit", parameters, function(data){				
						if(typeof data == "object") {
							if(_myCallback) {_myCallback();}
						}
						else {
							// Error Handler
							throw new SyntaxError('Nexus Cannot Audit This Page');
						}										
					});									
				}				
			
			// 3.2.4 - Set Up Values
			
				// 3.2.4.1 - Audit Type ID
				if(data.auditTypeID == "" || parseInt(data.auditTypeID) < 0 || parseInt(data.auditTypeID) > 43) {
					throw new SyntaxError('Invalid auditTypeID');
					return false;
				}
				else {
					parameters.auditTypeID = data.auditTypeID;
				}
				
				// 3.2.4.2 - sendInstanceID62
				if(data.hasOwnProperty("sendInstanceID62") && data.sendInstanceID62 != "") {
					parameters.sendInstanceID62 = data.sendInstanceID62;
				}
				else if(getQueryString("sid") != "" || getQueryString("sendinstanceid62") != "" || getQueryString("send_instance_id62") != "") {
					if(getQueryString("sid") != "") {parameters.sendInstanceID62 = encodeURIComponent(getQueryString("sid"));}
					else if(getQueryString("sendinstanceid62") != "") {parameters.sendInstanceID62 = encodeURIComponent(getQueryString("sendinstanceid62"));}
					else if(getQueryString("send_instance_id62") != "") {parameters.sendInstanceID62 = encodeURIComponent(getQueryString("send_instance_id62"));}
				}
				else if(SEND_INSTANCE_ID62 != "" && SEND_INSTANCE_ID62 != null && SEND_INSTANCE_ID62 != "null") {
					parameters.sendInstanceID62	= SEND_INSTANCE_ID62;
				}
				else {
					parameters.sendInstanceID62	= "";					
				}

				// 3.2.4.3 - recipientID
				if(data.hasOwnProperty("recipientID")) {
					parameters.recipientID = data.recipientID;
				}
				else if(RECIPIENT_ID != "" && RECIPIENT_ID != null && RECIPIENT_ID != "null") {
					parameters.recipientID = RECIPIENT_ID;
				}
				if(parameters.recipientID == "" || parameters.recipientID == null || parameters.recipientID == "null") {
					parameters.recipientID = 0;
				}
				
				// 3.2.4.4 - sendID
				if(data.hasOwnProperty("sendID")) {
					parameters.sendID = parseInt(data.sendID);
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("SendID")) {
					parameters.sendID = USER_PROFILE.SendID;
				}
				if(parameters.sendID == "" || parameters.sendID == null || parameters.sendID == "null") {
					parameters.sendID = 0;
				}				
				
				// 3.2.4.5 - sendTypeID
				if(data.hasOwnProperty("sendTypeID")) {
					parameters.sendTypeID = parseInt(data.sendTypeID);
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("SendTypeID")) {
					parameters.sendTypeID = parseInt(USER_PROFILE.SendTypeID);
				}
				if(parameters.sendTypeID == "" || parameters.sendTypeID == null || parameters.sendTypeID == "null") {
					parameters.sendTypeID = 0;
				}
				
				// 3.2.4.6 - fromMobile
				if(data.hasOwnProperty("fromMobile") && (data.fromMobile || data.fromMobile.toLowerCase() == "yes" || data.fromMobile.toLowerCase() == "y" || data.fromMobile.toLowerCase() == "true" || data.fromMobile == "1")) {					
					parameters.fromMobile = "true";
				}
				else if(data.hasOwnProperty("fromMobile") && (!data.fromMobile || data.fromMobile.toLowerCase() == "no" || data.fromMobile.toLowerCase() == "n" || data.fromMobile.toLowerCase() == "false" || data.fromMobile == "0")) {					
					parameters.fromMobile = "false";
				}				
				else {
					parameters.fromMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) );
					if (parameters.fromMobile) {parameters.fromMobile = "true";}
					else {parameters.fromMobile = "false";}					
				}

				// 3.2.4.7 - fromShare
				if(data.hasOwnProperty("fromShare") && (data.fromShare || data.fromShare.toLowerCase() == "yes" || data.fromShare.toLowerCase() == "y" || data.fromShare.toLowerCase() == "true" || data.fromShare == "1")) {					
					parameters.fromShare = "true";
				}
				else if(data.hasOwnProperty("fromShare") && (!data.fromShare || data.fromShare.toLowerCase() == "no" || data.fromShare.toLowerCase() == "n" || data.fromShare.toLowerCase() == "false" || data.fromShare == "0")) {					
					parameters.fromShare = "false";
				}				
				else {
					parameters.fromShare = "false";
				}
				
				// 3.2.4.8 - description
				if(data.hasOwnProperty("description")) {
					parameters.description = encodeURIComponent(data.description);
				}
				else {
					parameters.description = "";					
				}
				
				// 3.2.4.9 - referredBy
				if(data.hasOwnProperty("referredBy")) {
					parameters.referredBy = data.referredBy;
				}
				else {
					parameters.referredBy = encodeURIComponent(document.referrer);
				}
				
				// 3.2.4.10 - accessedFrom
				parameters.accessedFrom = IP_ADDRESS;						
			
			
			// 3.2.5 - Make Sure that we have IP
			if(parameters.accessedFrom == "" || parameters.accessedFrom == null || parameters.accessedFrom == "null") {
				getIP(function(ip) {
					IP_ADDRESS = ip;
					parameters.accessedFrom = IP_ADDRESS;											
					_callWebService();
				});
			}
			else {
				_callWebService();				
			}			
	
		}
		
		
		
		// 3.3 - Add Mag Aduit
		//       nexusAddMagAudit(data, callback), data is an object like {auditTypeID: 18, description: "Article 2", page: 2}, callback is the callback function
		//
		//		 Possible Key, case sensitive:
		//		     auditTypeID, required => The Audit Type ID, refer to nexusGetAuditPageViews();
		//		     sendInstanceID62, optional => dara value > query string for sid, sendinstanceid62, or send_instance_id62 > API variable SEND_INSTANCE_ID62 > ""
		//		     recipientID, optional => data value > API variable RECIPIENT_ID > 0
		//		     sendID, optional => data value > API variable USER_PROFILE.SendID > 0		
		//		     sendTypeID, optional => data value > API variable USER_PROFILE.SendTypeID > 0
		//		     fromMobile, optional => data value (possible value case i, "yes/no/y/n/true/false/0/1") > auto detect > "false"
		//		     fromShare, optional => data value (possible value case i, "yes/no/y/n/true/false/0/1") > "false"		
		//		     description, optional => data value > ""
		//		     referredBy, optional => data value > document.referrer > ""
		//			 page, optional => data value > 0 (1, 2, 3, unknown should be 0)
		//
		//	     Other Keys:
		//	         campaignID62 => API variable CAMPAIGN_ID62 (CAMPAIGN_ID62 is set in NexusInit())		
		//		     accessedFrom => API variable IP_ADDRESS (auto detected in NexusInit())

		//       AuditTypeID:
		//		     0: "Open"
		//		     1: "Email 1 Web Version"
		//		     2: "Email 2 Web Version"
		//		     3: "Email 3 Web Version"
		//		     4: "Email 4 Web Version"
		//		     5: "Landing Page"
		//		     6: "Share/Embed Page"
		//		     7: "Video 01%"
		//		     8: "10"
		//		     9: "20"
		//		     10: "Video 25%"
		//		     11: "30"
		//		     12: "40"
		//		     13: "Video 50%"
		//		     14: "60"
		//		     15: "70"
		//		     16: "Video 75%"
		//		     17: "80"
		//		     18: "Index Page"
		//		     19: "Video 99%"
		//		     20: "Donation Page 1"
		//		     21: "Donation Page 2"
		//		     22: "Donation Redirect"
		//		     23: "Donation Page 3"
		//		     24: "Donation Process"
		//		     25: "Donation Page 4"
		//		     26: "Reply Form"
		//		     27: "Client Homepage"
		//		     28: "Email Update"
		//		     29: "Download"
		//		     30: "Form Submission"
		//		     31: "Client Email Mailto"
		//		     32: "Address Update"
		//		     33: "Thank You Page"
		//		     34: "Share Button"
		//		     35: "Embed Button"
		//		     36: "Page"
		//		     37: "Article"
		//		     38: "Web Link"
		//		     39: "Media"
		//		     40: "Forward Link"
		//		     41: "Facebook Link"
		//		     42: "Twitter Link"
		//		     43: "Subscribe Link"		
		nexusAddMagAudit = function(data, callback) {	
		
			// 3.3.1 - Validate Initialized
			validateInitialized(); 					
			
			// 3.3.2 - Validate data
			
				// 3.3.2.1 - Check if Data is an object and with at least one parameter (auditTypeID)
				if(typeof data != "object" || getObjectLength(data) < 1) {
					throw new SyntaxError('Invalid Audit Data');
					return false;
				}					
				
				// 3.3.3.2 - Check if auditTypeID is set
				if(!data.hasOwnProperty("auditTypeID")) {
					throw new SyntaxError('auditTypeID is required');
					return false;					
				}
							
						
			// 3.3.3 - Initialize Variables			

				// 3.3.3.1 - Callback
				var _myCallback = false;							// Callback function									
				if(typeof callback == "function") {
					_myCallback = callback;
				}	

				// 3.3.3.2 - Parameters
				var parameters = {
					campaignID62 : CAMPAIGN_ID62,								
					auditTypeID : 0,				
					sendInstanceID62 : "",
					recipientID: 0,
					sendID : 0,
					sendTypeID : 0,
					fromMobile : 0,
					fromShare : 0,
					description : "",
					accessedFrom : "",
					referredBy : "",
					page: 0
				};							// Parameter for Ajax Call
			
			
				// 3.3.3.3  - Self Help Functions
				var _callWebService = function() {				
					callWebService("AddMagAudit", parameters, function(data){				
						if(typeof data == "object") {if(_myCallback) {_myCallback();}}
						else {
							// Error Handler
							throw new SyntaxError('Nexus Cannot Audit This Page');
						}										
					});									
				}				
			
			// 3.3.4 - Set Up Values
			
				// 3.3.4.1 - Audit Type ID
				if(data.auditTypeID == "" || parseInt(data.auditTypeID) < 0 || parseInt(data.auditTypeID) > 43) {
					throw new SyntaxError('Invalid auditTypeID');
					return false;
				}
				else {
					parameters.auditTypeID = data.auditTypeID;
				}
				
				// 3.3.4.2 - sendInstanceID62
				if(data.hasOwnProperty("sendInstanceID62") && data.sendInstanceID62 != "") {
					parameters.sendInstanceID62 = data.sendInstanceID62;
				}
				else if(getQueryString("sid") != "" || getQueryString("sendinstanceid62") != "" || getQueryString("send_instance_id62") != "") {
					if(getQueryString("sid") != "") {parameters.sendInstanceID62 = encodeURIComponent(getQueryString("sid"));}
					else if(getQueryString("sendinstanceid62") != "") {parameters.sendInstanceID62 = encodeURIComponent(getQueryString("sendinstanceid62"));}
					else if(getQueryString("send_instance_id62") != "") {parameters.sendInstanceID62 = encodeURIComponent(getQueryString("send_instance_id62"));}
				}
				else if(SEND_INSTANCE_ID62 != "" && SEND_INSTANCE_ID62 != null && SEND_INSTANCE_ID62 != "null") {
					parameters.sendInstanceID62	= SEND_INSTANCE_ID62;
				}
				else {
					parameters.sendInstanceID62	= "";					
				}

				// 3.3.4.3 - recipientID
				if(data.hasOwnProperty("recipientID")) {
					parameters.recipientID = data.recipientID;
				}
				else if(RECIPIENT_ID != "" && RECIPIENT_ID != null && RECIPIENT_ID != "null") {
					parameters.recipientID = RECIPIENT_ID;
				}
				if(parameters.recipientID == "" || parameters.recipientID == null || parameters.recipientID == "null") {
					parameters.recipientID = 0;
				}
				
				// 3.3.4.4 - sendID
				if(data.hasOwnProperty("sendID")) {
					parameters.sendID = parseInt(data.sendID);
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("SendID")) {
					parameters.sendID = USER_PROFILE.SendID;
				}
				if(parameters.sendID == "" || parameters.sendID == null || parameters.sendID == "null") {
					parameters.sendID = 0;
				}				
				
				// 3.3.4.5 - sendTypeID
				if(data.hasOwnProperty("sendTypeID")) {
					parameters.sendTypeID = parseInt(data.sendTypeID);
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("SendTypeID")) {
					parameters.sendTypeID = parseInt(USER_PROFILE.SendTypeID);
				}
				if(parameters.sendTypeID == "" || parameters.sendTypeID == null || parameters.sendTypeID == "null") {
					parameters.sendTypeID = 0;
				}
				
				// 3.3.4.6 - fromMobile
				if(data.hasOwnProperty("fromMobile") && (data.fromMobile || data.fromMobile.toLowerCase() == "yes" || data.fromMobile.toLowerCase() == "y" || data.fromMobile.toLowerCase() == "true" || data.fromMobile == "1")) {					
					parameters.fromMobile = "true";
				}
				else if(data.hasOwnProperty("fromMobile") && (!data.fromMobile || data.fromMobile.toLowerCase() == "no" || data.fromMobile.toLowerCase() == "n" || data.fromMobile.toLowerCase() == "false" || data.fromMobile == "0")) {					
					parameters.fromMobile = "false";
				}				
				else {
					parameters.fromMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) );
					if (parameters.fromMobile) {parameters.fromMobile = "true";}
					else {parameters.fromMobile = "false";}					
				}

				// 3.3.4.7 - fromShare
				if(data.hasOwnProperty("fromShare") && (data.fromShare || data.fromShare.toLowerCase() == "yes" || data.fromShare.toLowerCase() == "y" || data.fromShare.toLowerCase() == "true" || data.fromShare == "1")) {					
					parameters.fromShare = "true";
				}
				else if(data.hasOwnProperty("fromShare") && (!data.fromShare || data.fromShare.toLowerCase() == "no" || data.fromShare.toLowerCase() == "n" || data.fromShare.toLowerCase() == "false" || data.fromShare == "0")) {					
					parameters.fromShare = "false";
				}				
				else {
					parameters.fromShare = "false";
				}
				
				// 3.3.4.8 - description
				if(data.hasOwnProperty("description")) {
					parameters.description = encodeURIComponent(data.description);
				}
				else {
					parameters.description = "";					
				}
				
				// 3.3.4.9 - referredBy
				if(data.hasOwnProperty("referredBy")) {
					parameters.referredBy = data.referredBy;
				}
				else {
					parameters.referredBy = document.referrer;					
				}
				
				// 3.3.4.10 - accessedFrom
				parameters.accessedFrom = IP_ADDRESS;						
				
				// 3.3.4.11 - page
				if(data.hasOwnProperty("page")) {
					parameters.page = data.page;
				}
				if(parseInt(parameters.page) < 0 || parseInt(parameters.page) > 500) {
					parameters.page = 0;
				}
			
			
			// 3.3.5 - Make Sure that we have IP
			if(parameters.accessedFrom == "" || parameters.accessedFrom == null || parameters.accessedFrom == "null") {
				getIP(function(ip) {
					IP_ADDRESS = ip;
					parameters.accessedFrom = IP_ADDRESS;											
					_callWebService();
				});
			}
			else {
				_callWebService();				
			}			
	
		}		
	
	
	// ------------------------------------------------------------------------------------------------			
	// Section 4 - Feedback		
	// ------------------------------------------------------------------------------------------------		
	
		
		// 4.1 - Add Feedback
		//       nexusAddFeedback(data, callback), data is an object like {firstName: "Raymond", lastName: "Chan"}, callback is the callback function
		//
		//		 Possible Key, case sensitive:
		//		     recipientID, optional => data value > API variable RECIPIENT_ID > 0
		//		     personID, optional => data value > API variable USER_PROFILE > ""
		//		     personID2, optional => data value > API variable USER_PROFILE > ""
		//		     appealCode, optional => data value > API variable USER_PROFILE > ""
		//		     firstName, optional => data value > API variable USER_PROFILE > ""
		//		     lastName, optional => data value > API variable USER_PROFILE > ""
		//		     email, optional => data value > API variable USER_PROFILE > ""
		//		     address1, optional => data value > API variable USER_PROFILE > ""
		//		     address2, optional => data value > API variable USER_PROFILE > ""
		//		     address3, optional => data value > API variable USER_PROFILE > ""
		//		     city, optional => data value > API variable USER_PROFILE > ""
		//		     state, optional => data value > API variable USER_PROFILE > ""
		//		     postalCode, optional => data value > API variable USER_PROFILE > ""
		//		     phone, optional => data value > API variable USER_PROFILE > ""
		//		     organizationName, optional => data value > API variable USER_PROFILE > ""
		//		     businessJobTitle, optional => data value > API variable USER_PROFILE > ""	
		//		     comments, optional => data value > ""
		//		     country, optional => data value > API variable USER_PROFILE > ""												
		//
		//	     Other Keys:
		//	         campaignID62 => API variable CAMPAIGN_ID62 (CAMPAIGN_ID62 is set in NexusInit())				
		nexusAddFeedback = function(data, callback) {	
		
			// 4.1.1 - Validate Initialized
			validateInitialized(); 					
			
			// 4.1.2 - Validate data
			
				// 4.1.2.1 - Callback
				var _myCallback = false;							// Callback function									
				if(typeof callback == "function") {
					_myCallback = callback;
				}				
			
				// 4.1.2.2 - Check if Data is an object and with at least one parameter (auditTypeID)
				if(typeof data != "object" || getObjectLength(data) < 1) {
					throw new SyntaxError('Invalid Input Data');
					return false;
				}					
											
						
			// 4.1.3 - Initialize Variables			

				// 4.1.3.1 - Parameters
				var parameters = {
					campaignID62 : CAMPAIGN_ID62,								
					recipientID: 0,
					personID : "",
					personID2 : "",
			        appealCode : "",
					firstName : "",
					lastName : "", 
					email : "", 
					address1 : "",
					address2 : "",
					address3 : "",
					city : "",
					state : "",
					postalCode : "",
					phone : "",
					organizationName : "",
					businessJobTitle : "",
					comments : "",
					country : ""
				};							// Parameter for Ajax Call
	

			
				// 4.1.3.2  - Self Help Functions
				var _callWebService = function() {				
					callWebService("AddFeedback", parameters, function(data){							
						if(typeof data == "object") {if(_myCallback) {_myCallback();}}
						else {
							// Error Handler
							throw new SyntaxError('Nexus Cannot Add the Feedback');
						}										
					});									
				}				
			
			// 4.1.4 - Set Up Values		
				
				// 4.1.4.1 - recipientID
				if(data.hasOwnProperty("recipientID")) {
					parameters.recipientID = data.recipientID;
				}
				else if(RECIPIENT_ID != "" && RECIPIENT_ID != null) {
					parameters.recipientID = RECIPIENT_ID;
				}
				
				// 4.1.4.2 - personID
				if(data.hasOwnProperty("personID")) {
					parameters.personID = data.personID;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("PersonID")) {
					parameters.personID = USER_PROFILE.PersonID;
				}	
				
				// 4.1.4.3 - personID2
				if(data.hasOwnProperty("personID2")) {
					parameters.personID2 = data.personID2;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("PersonID2")) {
					parameters.personID2 = USER_PROFILE.PersonID2;
				}	
				
				// 4.1.4.4 - appealCode
				if(data.hasOwnProperty("appealCode")) {
					parameters.appealCode = data.appealCode;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("AppealCode")) {
					parameters.appealCode = USER_PROFILE.AppealCode;
				}
				
				// 4.1.4.5 - firstName
				if(data.hasOwnProperty("firstName")) {
					parameters.firstName = data.firstName;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("FirstName")) {
					parameters.firstName = USER_PROFILE.FirstName;
				}		
				
				// 4.1.4.6 - lastName
				if(data.hasOwnProperty("lastName")) {
					parameters.lastName = data.lastName;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("LastName")) {
					parameters.lastName = USER_PROFILE.LastName;
				}
				
				// 4.1.4.7 - email
				if(data.hasOwnProperty("email")) {
					parameters.email = data.email;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("Email")) {
					parameters.email = USER_PROFILE.Email;
				}				
				
				// 4.1.4.8 - address1
				if(data.hasOwnProperty("address1")) {
					parameters.address1 = data.address1;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("Address1")) {
					parameters.address1 = USER_PROFILE.Address1;
				}								
				
				// 4.1.4.9 - address2
				if(data.hasOwnProperty("address2")) {
					parameters.address2 = data.address2;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("Address2")) {
					parameters.address2 = USER_PROFILE.Address2;
				}	
				
				// 4.1.4.10 - address3
				if(data.hasOwnProperty("address3")) {
					parameters.address3 = data.address3;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("Address3")) {
					parameters.address3 = USER_PROFILE.Address3;
				}
				
				// 4.1.4.11 - city
				if(data.hasOwnProperty("city")) {
					parameters.city = data.city;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("City")) {
					parameters.city = USER_PROFILE.City;
				}				

				// 4.1.4.12 - state
				if(data.hasOwnProperty("state")) {
					parameters.state = data.state;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("State")) {
					parameters.state = USER_PROFILE.State;
				}	
				
				// 4.1.4.13 - postalCode
				if(data.hasOwnProperty("postalCode")) {
					parameters.postalCode = data.postalCode;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("PostalCode")) {
					parameters.postalCode = USER_PROFILE.PostalCode;
				}
				
				// 4.1.4.14 - phone
				if(data.hasOwnProperty("phone")) {
					parameters.phone = data.phone;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("Phone")) {
					parameters.phone = USER_PROFILE.Phone;
				}
				
				// 4.1.4.15 - organizationName
				if(data.hasOwnProperty("organizationName")) {
					parameters.organizationName = data.organizationName;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("Organization")) {
					parameters.organizationName = USER_PROFILE.Organization;
				}		
				
				// 4.1.4.16 - businessJobTitle
				if(data.hasOwnProperty("businessJobTitle")) {
					parameters.businessJobTitle = data.businessJobTitle;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("OrganizationJobTitle")) {
					parameters.businessJobTitle = USER_PROFILE.OrganizationJobTitle;
				}
				
				// 4.1.4.17 - comments
				if(data.hasOwnProperty("comments")) {
					parameters.comments = data.comments;
				}
				
				// 4.1.4.18 - country
				if(data.hasOwnProperty("country")) {
					parameters.country = data.country;
				}		
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("Country")) {
					parameters.country = USER_PROFILE.Country;
				}												
			
			// 4.1.5 - Execute
			_callWebService();	
	
		}		
		
		
	// ------------------------------------------------------------------------------------------------			
	// Section 5 - Donation		
	// ------------------------------------------------------------------------------------------------		
	
		
		// 5.1 - Add Donation
		//       nexusAddDonation(data, callback), data is an object like {donationAmount: "0.01", donationRecurrence: "1", donationFrequencyID: "1"},
		//       callback(data) is the callback function, which data is the DonationID. callback is optional.
		//
		//		 Possible Key for data, case sensitive:		
		//		     sendInstanceID62, optional => data value > API variable SEND_INSTANCE_ID62 > 0		
		//		     recipientID, optional => data value > API variable RECIPIENT_ID > 0		
		//		     sendID, optional => data value > API variable USER_PROFILE > 0
		//		     sendTypeID, optional => data value > API variable USER_PROFILE > 0
		//		     donationAmount, required => data value 		
		//		     donationRecurrence, optional => data value > 1
		//		     donationFrequencyID, optional => data value > 1
		//           donationStatusID, optional => data value > 1
		//
		//	     Other Keys:
		//	         campaignID62 => API variable CAMPAIGN_ID62 (CAMPAIGN_ID62 is set in NexusInit())				
		//
		//       DonationFrequencyID:
		//		 1 = One Time
		//       2 = Bi-weekly
		//       3 = Weekly
		//       4 = Bi-monthly
		//       5 = Monthly
		//       6 = Quarterly
		//       7 = Semi-Annually
		//       8 = Annually
		//
		//       Donation Status ID:
		//	     1 = NO
		//       2 = YES
		//       3 = PLEDGE
		//       4 = REJECT	
		nexusAddDonation = function(data, callback) {		
		
			// 5.1.2 - Validate Initialized
			validateInitialized(); 					
			
			// 5.1.2 - Validate data
					
				// 5.1.2.1 - Check if Data is an object and with at least one parameter (donationAmount)
				if(typeof data != "object" || getObjectLength(data) < 1) {
					throw new SyntaxError('Invalid Input Data');
					return false;
				}		
				
				// 5.1.2.2 - Check if donationAmount is set
				if(!data.hasOwnProperty("donationAmount")) {
					throw new SyntaxError('donationAmount is required');
					return false;					
				}	
				
				// 5.1.2.3 - Check if a Number
				if(!isNumber(data.donationAmount)) {
					throw new SyntaxError('Invalid donationAmount');
					return false;										
				}
											
						
			// 5.1.3 - Initialize Variables			

				// 5.1.3.1 - Callback
				var _myCallback = false;							// Callback function									
				if(typeof callback == "function") {
					_myCallback = callback;
				}	
			
				// 5.1.3.2 - Parameters
				var parameters = {
					campaignID62 : CAMPAIGN_ID62,								
					sendInstanceID62 : 0 ,
					recipientID : 0,
					sendID : 0,
					sendTypeID : 0,
					donationAmount : 0,
					donationRecurrence : 1,
					donationFrequencyID : 1,
		            donationStatusID :  1
				};							// Parameter for Ajax Call
	

			
				// 5.1.3.3  - Self Help Functions
				var _callWebService = function() {				
					callWebService("AddDonation", parameters, function(data){												
						if(typeof data == "object") {
							if(typeof _myCallback == "function") {
								_myCallback(data.d);
							}
						}
						else {
							// Error Handler
							throw new SyntaxError('Nexus Cannot Add the Donation');
						}										
					});									
				}				
			
			// 5.1.4 - Set Up Values						
	
				// 5.1.4.1 - sendInstanceID62
				if(data.hasOwnProperty("sendInstanceID62")) {
					parameters.sendInstanceID62 = data.sendInstanceID62;
				}
				else if(SEND_INSTANCE_ID62 != "") {
					parameters.sendInstanceID62 = SEND_INSTANCE_ID62;
				}	
						
				// 5.1.4.2 - recipientID
				if(data.hasOwnProperty("recipientID")) {
					parameters.recipientID = data.recipientID;
				}
				else if(RECIPIENT_ID != "" && RECIPIENT_ID != null) {
					parameters.recipientID = RECIPIENT_ID;
				}
				
				// 5.1.4.3 - sendID
				if(data.hasOwnProperty("sendID")) {
					parameters.sendID = data.sendID;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("SendID")) {
					parameters.sendID = USER_PROFILE.SendID;
				}	
				
				// 5.1.4.4 - sendTypeID
				if(data.hasOwnProperty("sendTypeID") && data.sendTypeID != "") {
					parameters.sendTypeID = data.sendTypeID;
				}
				else if(typeof USER_PROFILE == "object" && USER_PROFILE.hasOwnProperty("SendTypeID")) {
					parameters.sendTypeID = USER_PROFILE.SendTypeID;
				}	
				
				// 5.1.4.5 - donationAmount
				parameters.donationAmount = data.donationAmount;
				
				// 5.1.4.6 - donationRecurrence	
				if(data.hasOwnProperty("donationRecurrence") && data.donationRecurrence != "") {
					parameters.donationRecurrence = data.donationRecurrence;
				}
				
				// 5.1.4.7 - donationFrequencyID	
				if(data.hasOwnProperty("donationFrequencyID") && data.donationFrequencyID != "") {
					parameters.donationFrequencyID = data.donationFrequencyID;
				}
				
				// 5.1.4.8 - donationStatusID								
				if(data.hasOwnProperty("donationStatusID") && data.donationStatusID != "") {
					parameters.donationStatusID = data.donationStatusID;
				}				
																		
			// 5.1.5 - Execute
			_callWebService();	
		}		
		
			
		// 5.2 - Update Donation
		//       nexusUpdateDonation(data, callback), data is an object like {donationID: "78204", donationRecurrence: "1", donationFrequencyID: "1"}		
		//       callback is the callback function which is optional
		//
		//		 Possible Key for data, case sensitive:		
		//		     donationID, required => data value 
		//		     donationAmount, required => data value 		
		//		     donationRecurrence, required => data value 
		//		     donationFrequencyID, required => data value 
		//           donationStatusID, required => data value 
		//
		//	     Other Keys:
		//	         campaignID62 => API variable CAMPAIGN_ID62 (CAMPAIGN_ID62 is set in NexusInit())				
		//
		//       DonationFrequencyID:
		//		 1 = One Time
		//       2 = Bi-weekly
		//       3 = Weekly
		//       4 = Bi-monthly
		//       5 = Monthly
		//       6 = Quarterly
		//       7 = Semi-Annually
		//       8 = Annually
		//
		//       Donation Status ID:
		//	     1 = NO
		//       2 = YES
		//       3 = PLEDGE
		//       4 = REJECT	
		nexusUpdateDonation = function(data, callback) {		
		
			// 5.2.2 - Validate Initialized
			validateInitialized(); 					
			
			// 5.2.2 - Validate data
					
				// 5.2.2.1 - Check if Data is an object and with at least 5 parameters (donationID, donationAmount, donationRecurrence, donationFrequencyID, donationStatusID)
				if(typeof data != "object" || getObjectLength(data) < 5) {
					throw new SyntaxError('Invalid Input Data');
					return false;
				}		
	
				// 5.2.2.2 - Check donationID
				if(!data.hasOwnProperty("donationID")) {
					throw new SyntaxError('donationID is required');
					return false;					
				}	
				if(!isNumber(data.donationID)) {
					throw new SyntaxError('Invalid donationID');
					return false;										
				}
								
				// 5.2.2.3 - Check donationAmount
				if(!data.hasOwnProperty("donationAmount")) {
					throw new SyntaxError('donationAmount is required');
					return false;					
				}								
				if(!isNumber(data.donationAmount)) {
					throw new SyntaxError('Invalid donationAmount');
					return false;										
				}
				
				// 5.2.2.4 - Check donationRecurrence
				if(!data.hasOwnProperty("donationRecurrence")) {
					throw new SyntaxError('donationRecurrence is required');
					return false;					
				}								
				if(!isNumber(data.donationRecurrence)) {
					throw new SyntaxError('Invalid donationRecurrence');
					return false;										
				}
				
				// 5.2.2.5 - Check donationFrequencyID
				if(!data.hasOwnProperty("donationFrequencyID")) {
					throw new SyntaxError('donationFrequencyID is required');
					return false;					
				}								
				if(!isNumber(data.donationFrequencyID)) {
					throw new SyntaxError('Invalid donationFrequencyID');
					return false;										
				}
				
				// 5.2.2.6 - Check donationFrequencyID
				if(!data.hasOwnProperty("donationStatusID")) {
					throw new SyntaxError('donationStatusID is required');
					return false;					
				}								
				if(!isNumber(data.donationStatusID)) {
					throw new SyntaxError('Invalid donationStatusID');
					return false;										
				}												
											
						
			// 5.2.3 - Initialize Variables				
			
				// 5.2.3.1 - Callback
				var _myCallback = false;							// Callback function									
				if(typeof callback == "function") {
					_myCallback = callback;
				}				
			
				// 5.2.3.2 - Parameters
				var parameters = {
					campaignID62 : CAMPAIGN_ID62,								
					donationID : 0 ,
					donationAmount : 0,
					donationRecurrence : 1,
					donationFrequencyID : 1,
		            donationStatusID :  1
				};							// Parameter for Ajax Call
					
				// 5.1.3.3  - Self Help Functions
				var _callWebService = function() {							
					callWebService("UpdateDonation", parameters, function(data){														
						if(typeof data == "object") {
							if(typeof _myCallback == "function") {
								_myCallback(data.d);  // data.d - Donation ID
							}							
						}
						else {
							// Error Handler
							throw new SyntaxError('Nexus Cannot Update the Donation');
						}										
					});									
				}				
			
			// 5.2.4 - Set Up Values						
			parameters.donationID = data.donationID;				
			parameters.donationAmount = data.donationAmount;	
			parameters.donationRecurrence = data.donationRecurrence;				
			parameters.donationFrequencyID = data.donationFrequencyID;	
			parameters.donationStatusID = data.donationStatusID;				
																						
			// 5.2.5 - Execute
			_callWebService();	
		}			 
	
	// ------------------------------------------------------------------------------------------------	
	// Section F1 - System Support Functions
	// ------------------------------------------------------------------------------------------------			
	
	// 1 - Call Nexus Web Service
	function callWebService(method, parameters, callback) {
		
		// 1.1 - Initialize Variable
		var _url;					// The Final URL to Call Ajax
		
		// 1.2 - Set Up URL
		_url = getJsonCodify({
			url: WEB_SERVICE_URL,
			method: method,
			data: parameters
		});

		// 1.3 - Save URL into History
		HISTORY_URL.push(_url);

		// 1.4 - Fire Ajax and Trigger callback
		$.ajax({
			type: "post",			
			cache: false,
			dataType: "jsonp",
			success: function(data) { 					
				callback(data)
			},
			url: _url + "&format=json"
		});		
	}
	
	// 2 - Check if Initialized
	function validateInitialized() {
		if(INITIALIZED == false) {
			throw new SyntaxError('Nexus Not Initialized');
		}
	}	
	
	// ------------------------------------------------------------------------------------------------	
	// Section F2 - Other Internal Support Functions
	// ------------------------------------------------------------------------------------------------		
	
	// 1 - Get IP Address by Ajax Call
	function getIP(callback){
		$.ajax({ 
			cache: true,
			dataType: "jsonp",
			success: function(d) { 
				callback(d.ip);
			},
			url: "http://jsonip.com/"
		});		
    }
	
	
	// 2 - Returns a query string value if it exists
	function getQueryString(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if(results == null) {
			return "";
		}
		else {
			//return decodeURIComponent(results[1].replace(/\+/g, " "));	
			return decodeURIComponent(results[1]);				
		}
	}	
	
		
	// 3 - Need this function to properly encode the data I send over for the web service
	function getJsonCodify(options) {
		var url = options.url;
		if (url[url.length - 1] != "/") url += "/";
		url += options.method; if (options.data) {
			var data = ""; for (var i in options.data) {
				if (data != "")
					data += "&"; data += i + "=" + getMsJson.stringify(options.data[i]);
			}
		url += "?" + data; data = null; options.data = "{}";
		}
		return url;
	}
	getMsJson= function() {
		function f(n) { return n < 10 ? '0' + n : n; }
		//Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z';};
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) {
			escapeable.lastIndex = 0; return escapeable.test(string) ? '"' + string.replace(escapeable, function(a) {
				var c = meta[a]; if (typeof c === 'string') { return c; }
				return '\\u' + ('0000' + (+(a.charCodeAt(0))).toString(16)).slice(-4);}) + '"' : '"' + string + '"';
			}
		function str(key, holder) {
			var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); }
			if (typeof rep === 'function') { value = rep.call(holder, key, value); }
			switch (typeof value) {
				case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; }
					if (value.toUTCString) { return '"\\/Date(' + (value.getTime()) + ')\\/"'; }
						gap += indent; partial = []; if (typeof value.length === 'number' && !(value.propertyIsEnumerable('length'))) {
						length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; }
						v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v;
					}
					if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === 'string') { v = str(k, value, rep); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value, rep); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } }
						v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v;
					}
				}
			return { stringify: function(value, replacer, space) {
			var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; }
			rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); }
			return str('', { '': value });
		}, parse: function(text, reviver) {
		
		var j; function walk(holder, key) {
		var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } }
		return reviver.call(holder, key, value);
		}
		cx.lastIndex = 0; if (cx.test(text)) {
			text = text.replace(cx, function(a) {
				return '\\u' + ('0000' + (+(a.charCodeAt(0))).toString(16)).slice(-4);
			});
		}
		if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j; }
			throw new SyntaxError('JSON.parse');
		}}; 
	} ();
	
 	
	// 4 - Get /Set Cookie
	function setCookie(c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}	
	
	function getCookie(c_name) {
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1) {c_start = c_value.indexOf(c_name + "=");}
		if (c_start == -1) {c_value = null;}
		else{
			c_start = c_value.indexOf("=", c_start) + 1;
		  	var c_end = c_value.indexOf(";", c_start);
		  	if (c_end == -1){c_end = c_value.length;}
			c_value = unescape(c_value.substring(c_start,c_end));
		}
		return c_value;
	}	
		
	// 5 - Get Object Length	
	function getObjectLength(obj) {
		var result = 0;
  		for(var prop in obj) {
    		if (obj.hasOwnProperty(prop)) {result++;}
 		}
  		return result;		
	}		
	
	// 6 - Check if Email is Valid
	function validateEmail(email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( email ) ) {return false;} 
		else {return true;}
	}
	
	// 7 - Check if Numeric
	function isNumber(n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	}
		
		
	// ------------------------------------------------------------------------------------------------	
	// Section D - Debug
	// ------------------------------------------------------------------------------------------------	
	
	// 1 - Print Out Variables to Console
	nexusDebug = function() {	
		console.log("------------------------ CAMPAIGN ------------------------");	
		console.log("ClientID: " + CLIENT_ID);
		console.log("CAMPAIGN_ID62: " + CAMPAIGN_ID62);
		console.log("SEND_INSTANCE_ID62: " + SEND_INSTANCE_ID62);
		console.log("RECIPIENT_ID: " + RECIPIENT_ID);
		console.log("PURL: " + PURL);
		console.log("IP_ADDRESS: " + IP_ADDRESS);
		console.log("INITIALIZED: " + INITIALIZED);
		console.log("");
		
		console.log("------------------------ USER PROFILE ------------------------");
		console.log(USER_PROFILE);
		console.log("");		
		
		console.log("------------------------ CALL HISTORY  ------------------------");
		console.log(HISTORY_URL);
	}
	
});






