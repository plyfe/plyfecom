/*
field decleration
Year: yearElm
Make: makeElm
Model: modelElm
Trim: trimElm
Body Style: bodyStyleElm

pages:
Home Page
*/

var activateMake = false;
var redirectUsed = false;

var vehicleYear='';
var vehicleMake='';
var vehicleModel = '';

var mpgStep = 5;
var invMpgMin = 10;
var invMpgMax = 60;

(function($){
	$.fn.dealerOnVehicleAjax = function(options){
		var defaults = {
			type:'',
			year:'',
			make:'',
			model:'',
			trim:'',
			bodyStyle: '',
			feature: '',
			mpgFrom: '',
			mpgTo: '',
  			preFill:false,
			preFillYear:false,
			preSelectYear:false,
			preSelectMake:false,
			preSelectModel:false,
            newOnly:false,
            usedOnly:false
		}
		
		var options = $.extend(defaults, options);
		var o =options;
		var updating = false;
        var focusYear = true;
        var focusMake = true;
        var focusModel = true;
        var focusBody = true;
        var focusFeature = true;

		var vehicleType;
		var typeElm;
		var yearElm;
		var makeElm;
		var typeElm;
		var modelElm;
		var trimElm;
		var bodyStyleElm;
		var featureElm;
		var mpgFromElm;
		var mpgToElm;
		
    var obj = $(this); 
		if(o.type !='') typeElm= o.type;
		if(o.year !='') yearElm= $("#" + o.year, obj);
		if(o.make !='') makeElm= $("#" + o.make, obj);
		if(o.model !='') modelElm= $("#" + o.model, obj);
		if(o.trim !='') trimElm= $("#" + o.trim, obj);
		if (o.bodyStyle != '') bodyStyleElm = $("#" + o.bodyStyle, obj);
		if (o.feature != '') featureElm = $("#" + o.feature, obj);
		if (o.mpgFrom != '') mpgFromElm = $("#" + o.mpgFrom, obj);
		if (o.mpgTo != '') mpgToElm = $("#" + o.mpgTo, obj);
		
	
		 return this.each(function() {
			 activateVehicleControl();
		 });
		 
		function activateVehicleControl(){
		    if(o.newOnly){
            	vehicleType='new';
            }
            
            if(o.usedOnly){
                vehicleType='used';
            }
			
			if(yearElm){
				if(o.preFillYear) {
					if (vehicleType!='new' && vehicleType!='used') {
						setVehicleType();
					}
					getDealerYear();
					activateMake = true;
					focusMake = false;
					yearChange();
				}
				else {				
					$(yearElm).focus(function() {
						if(focusYear){
							getDealerYear();
							focusYear=false;
							//	$(yearElm).removeAttr('disabled');	 
						}
					});
				}
				$(yearElm).change(function () {yearChange();});
			}

			if(makeElm){
			    $(makeElm).focus(function() {
                    if(focusMake){
                        getVehicleMakes();
                        focusMake=false;
                    }
                });
				$(makeElm).change(function () {
					makeChange();
					getBodyStyle();
					focusBody=false;
				});
            }
			
			if(modelElm){
				$(modelElm).attr('disabled', 'disabled');
				
				if(bodyStyleElm){				
					 $(modelElm).change(function () {getBodyStyle();});
				}
				
				if (featureElm) {
					$(modelElm).change(function () { getFeatures(); });
				}
				
				if(trimElm){
					  $(modelElm).change(function () {modelChange();});
				}
			}

			if(bodyStyleElm){
				if(o.preFillYear) {
					focusBody=false;
					getBodyStyle();
				}
				$(bodyStyleElm).focus(function() {
					if(focusBody){
						getBodyStyle();
						focusBody=false;
					}
				});				
			}

			if (featureElm) {
			  $(featureElm).focus(function () {
			    if (focusFeature) {
			      getFeatures();
			      focusFeature = false;
			    }
			  });
			}

            if(trimElm){
				$(trimElm).attr('disabled', 'disabled');
			}

			$('#' + typeElm +' input').change(function(){
				vehicleModeChange();
				if(o.preFillYear) {
					setVehicleType();
					getDealerYear();
					yearChange();
					getBodyStyle();
					focusMake = false;
					focusBody=false;
				}
			}); 
				/*		
			if(o.preFill){
			    vehicleModeChange();
			}*/



            if (o.mpgFrom && o.mpgTo) {
              getMpgRange();
              $(mpgFromElm).change(function () {
                    mpgValueChange(mpgFromElm, mpgToElm);
              });
            }
		};
		
		function vehicleModeChange(){
			setVehicleType();

			focusYear = true;
           clearSelect(yearElm); 

           focusMake=true;
           clearSelect(makeElm); 
           
           clearSelect(modelElm);   

           if(bodyStyleElm){
               focusBody=true;
               clearSelect(bodyStyleElm);
            }

           if(trimElm){
            clearSelect(trimElm);
            $(trimElm).attr('disabled', 'disabled');
           }

           if (featureElm) {
             focusFeature = true;
             clearSelect(featureElm);
           }

           if (o.mpgFrom && o.mpgTo) {
             clearSelect(mpgFromElm);
             clearSelect(mpgToElm);
             getMpgRange();
           }
          
		};
		
        function clearSelect(elm){
            $(elm).find('option').each(function(i){
             if( parseInt(i) > 0)
                $(this).remove();
            });
            selOptionIndex(elm,0);           
        }


		function setVehicleType(){
        	if ($('#' + typeElm +' :checked').val() == 'new') {
				vehicleType='new';
			}
        	else {
        	  if (redirectUsed == false) {
        	      vehicleType='used';
        	  }
        	  else {
        	    window.location.href = '/searchused.aspx';
        	  }			
			}
		};

		function getDealerYear(){
			if (updating) return;	
			var reqUrl = "/vehicle-ajax.aspx?fa=";
			
			if (o.isVirtual)
				reqUrl += "get_yearsv&select=1" ;	  
			else{	
				if (typeof vehicleType != 'undefined' && vehicleType.toUpperCase()=='USED')
					reqUrl += "get_years&type=u&select=1" ;
				else
					reqUrl += "get_years&type=n&select=1" ;	  
			}
			updating = true;	
			$.ajax({
				url: reqUrl,
				dataType: 'json',
				success: function(data) {
					fillSelect(data, yearElm);
					updating = false; 
					if($(yearElm).children().length > 0){
						if(vehicleYear !=''){
							selOptionValue(yearElm,vehicleYear);
							 yearChange();
							}
						else{
							if($(yearElm).children().length==2){
							 selOptionIndex(yearElm,1);
							 yearChange();
							 }
							 if(o.preSelectYear){
								selOptionIndex(yearElm,1);
								yearChange();
							 }
						}	 	
					}
				}
			});	
		};

	function yearChange(event){
		selOptionIndex(makeElm,0);
		$(makeElm).attr('disabled', 'disabled');
		selOptionIndex(modelElm,0);
		$(modelElm).attr('disabled', 'disabled');
        if (activateMake==false){
		    if ($(yearElm).val()=='') return;
        }
		
		var reqUrl = "/vehicle-ajax.aspx?fa=";
		if (typeof vehicleType != 'undefined' && vehicleType.toUpperCase()=='USED')
			reqUrl += "used_makes";  
		else
			reqUrl += "new_makes";
		reqUrl += "&year=" + $(yearElm).val() + "&select=1&hp=1"; 	  
		updating = true;	
		$.ajax({
			url: reqUrl,
			dataType: 'json',
			success: function(data) {
				fillSelect(data, makeElm);
				updating = false; 
				if($(makeElm).children().length > 0){
					if(vehicleMake !=''){
							selOptionValue(makeElm,vehicleMake);
							makeChange();
							}
					else{
						if(o.preSelectMake){
							selOptionIndex(makeElm,1);
							makeChange();
						}
						if($(makeElm).children().length==2){
							selOptionIndex(makeElm,1);
							makeChange();
						}
					 }
					$(makeElm).removeAttr('disabled');	 
				}
			}
		});
	};

	function getVehicleMakes(){	
		selOptionIndex(makeElm,0);
		$(makeElm).attr('disabled', 'disabled');
		selOptionIndex(modelElm,0);
		$(modelElm).attr('disabled', 'disabled');
		
		var reqUrl = "/vehicle-ajax.aspx?fa=";
		if (typeof vehicleType != 'undefined' && vehicleType.toUpperCase()=='USED')
			reqUrl += "used_makes";  
		else
			reqUrl += "new_makes";
	
		reqUrl += "&year=" + $(yearElm).val() + "&select=1&hp=1";   
	
		updating = true;	
		$.ajax({
			url: reqUrl,
			dataType: 'json',
			success: function(data) {
				fillSelect(data, makeElm);
				updating = false; 
				if($(makeElm).children().length > 0){
					$(makeElm).removeAttr('disabled');
				}
			}
		});
	};

	function makeChange(){
		if (updating) return; 
		selOptionIndex(modelElm,0);
		$(modelElm).attr('disabled', 'disabled');

        if(trimElm){
            selOptionIndex(trimElm,0);
            $(trimElm).attr('disabled', 'disabled');
        }

		if ($(makeElm).val()=='') return;
		
		var reqUrl = "/vehicle-ajax.aspx?fa=";
		if(o.isVirtual)
				reqUrl += "new_modelsv"; 
		else{		
			if (typeof vehicleType != 'undefined' && vehicleType.toUpperCase()=='USED')
				reqUrl += "used_models";  
			else
					reqUrl += "new_models"; 
			}
		reqUrl += "&year=" + $(yearElm).val() + "&make=" + $(makeElm).val() + "&select=1"; 	  
		updating = true;	
		$.ajax({
			url: reqUrl,
			dataType: 'json',
			success: function(data) {
				fillSelect(data, modelElm);
				updating = false; 
				if($(modelElm).children().length > 0){
					if(vehicleModel !='')
                    	selOptionValue(modelElm,vehicleModel);					

					if($(modelElm).children().length==2)
						selOptionIndex(vehicleModel,1);
					$(modelElm).removeAttr('disabled');	
				}					
			}
		});	
      if(bodyStyleElm){
       focusBody=false;
       //clearSelect(bodyStyleElm);   
	   getBodyStyle();
      }
      if (featureElm) {
        focusFeature = true;
        clearSelect(featureElm);
      }
	};

    function modelChange(){
		if (updating) return; 
		selOptionIndex(trimElm,0);
		$(trimElm).attr('disabled', 'disabled');
		if ($(modelElm).val()=='') return;
		
		var reqUrl = "/vehicle-ajax.aspx?fa=";
		if(o.isVirtual)
				reqUrl += "ref_trims&to=1"; 
		else{		
			if (typeof vehicleType != 'undefined' && vehicleType.toUpperCase()=='USED')
				reqUrl += "used_trims&to=1";  
			else
					reqUrl += "new_trims&to=1"; 
			}
		reqUrl += "&year=" + $(yearElm).val() + "&make=" + $(makeElm).val() + "&model=" + $(modelElm).val() + "&select=1"; 	  
		updating = true;	
		$.ajax({
			url: reqUrl,
			dataType: 'json',
			success: function(data) {
				fillSelect(data, trimElm);
				updating = false; 
				if($(trimElm).children().length > 0){
					$(trimElm).removeAttr('disabled');	
				}					
			}
		});		
	};

//________________________ REF DATA _____________________________

	function getRefYear(){
		var reqUrl = "/vehicle-ajax.aspx?fa=get_yearsr";
		if (dealerMake=='Lamborghini') reqUrl += "&make=Lamborghini";
		
		updating = true;
			$.ajax({
				url: reqUrl,
				dataType: 'json',
				success: function(data) {
					fillSelect(data,yearElm);
					updating = false; 
					if($(yearElm).children().length > 0){
						if(vehicleYear !=''){
							selOptionValue(yearElm,vehicleYear);	
							refYearChange();
							}
						else{
							if($(yearElm).children().length==2){
								selOptionIndex(yearElm,1);
								refYearChange();
							}	
							if(o.preSelectYear){
								selOptionIndex(yearElm,1);
								refYearChange();
							}	
						}
					}
				 }
			});
	};

	function refYearChange(){
		if (updating) return;
		
		selOptionIndex(makeElm,0);
		$(makeElm).attr('disabled', 'disabled');
		selOptionIndex(modelElm,0);
		$(modelElm).attr('disabled', 'disabled');
		if ($(trimElm)){
			selOptionIndex(trimElm,0);
			$(trimElm).attr('disabled', 'disabled');
		}
		if ($(yearElm).val()=='') return;
			
		var reqUrl = "/vehicle-ajax.aspx?fa=";
		if (dealerMake=='Lamborghini') 
			reqUrl += "new_makes";
		else
			reqUrl += "ref_makes";
		reqUrl +=	"&year=" + $(yearElm).val() + "&select=1"; 	  
		
		updating = true;	
		$.ajax({
			url: reqUrl,
			dataType: 'json',
			success: function(data) {
				fillSelect(data, makeElm);
				updating = false; 
				if($(makeElm).children().length > 0){
					if(vehicleMake !='')
						selOptionValue(makeElm,vehicleMake);	
					else{
						if(o.preSelectMake){
							selOptionIndex(makeElm,1);
							refMakeChange();
						}
					 }
					$(makeElm).removeAttr('disabled');	 
				}
			}
		});
	};
	
	
	function getRefMake(){
		selOptionIndex(makeElm,0);
		$(makeElm).attr('disabled', 'disabled');
		selOptionIndex(modelElm,0);
		$(modelElm).attr('disabled', 'disabled');
		if ($(trimElm)){
			selOptionIndex(trimElm,0);
			$(trimElm).attr('disabled', 'disabled');
		}
	
			
		var reqUrl = "/vehicle-ajax.aspx?fa=";
		if (dealerMake=='Lamborghini') 
			reqUrl += "new_makes";
		else
			reqUrl += "ref_makes";
		reqUrl +=	"&year=" + $(yearElm).val() + "&select=1"; 	  
		
		updating = true;
		$.ajax({
				url: reqUrl,
				dataType: 'json',
				success: function (data) {
						fillSelect(data, makeElm);
						updating = false;
						$(makeElm).removeAttr('disabled');
				}
		});
	};

	function refMakeChange(){
		if (updating) return; 
		selOptionIndex(modelElm,0);
		$(modelElm).attr('disabled', 'disabled');
		if ($(trimElm)){
			selOptionIndex(trimElm,0);
			$(trimElm).attr('disabled', 'disabled');
		}
		if ($(makeElm).val()=='') return;
		
		var reqUrl = "/vehicle-ajax.aspx?fa=ref_models"; 
		reqUrl += "&year=" + $(yearElm).val() + "&make=" + $(makeElm).val() + "&select=1"; 	  
		
		updating = true;	
		$.ajax({
			url: reqUrl,
			dataType: 'json',
			success: function(data) {
				fillSelect(data, modelElm);
				updating = false; 
				if($(modelElm).children().length > 0){
					if(vehicleModel !='')
						selOptionValue(modelElm,vehicleModel);						
					else{
						if( o.preSelectModel ){
							selOptionIndex(modelElm,1);
							if ($(trimElm)) refModelChange();
						 }
					 }
					$(modelElm).removeAttr('disabled');	 
				}		
			}
		});
	};


	function refModelChange(){
		if (updating) return; 
		selOptionIndex(trimElm,0);
		$(trimElm).attr('disabled', 'disabled');
		if ($(modelElm).val()=='') return;
	
		var reqUrl = "/vehicle-ajax.aspx?fa=ref_trims&to=1";
		reqUrl += "&year=" + $(yearElm).val() + "&make=" + $(makeElm).val() + "&model=" + $(modelElm).val();
		$.ajax({
				url: reqUrl,
				dataType: 'json',
				success: function(data) {
					fillSelect(data,trimElm);
					updating = false; 	
					$(trimElm).removeAttr('disabled');
				}
			});			
	};

	function getRefBodyStyle(){
	 // if (updating) return; 
       selOptionIndex(bodyStyleElm,0);
		$(bodyStyleElm).attr('disabled', 'disabled');
	
		var reqUrl = "/vehicle-ajax.aspx?fa=ref_bodystyles&select=1";
		if($(makeElm).val() != '' && $(makeElm).val() != null)
			reqUrl += "&make=" + $(makeElm).val();
		if($(modelElm).val() != ''&& $(modelElm).val() != null)	
			reqUrl += "&model=" + $(modelElm).val(); 	  
		$.ajax({
				url: reqUrl,
				dataType: 'json',
				success: function(data) {
					fillSelect(data,bodyStyleElm);
					updating = false; 	
					$(bodyStyleElm).removeAttr('disabled');
				}
			});			
	};
    
    function getBodyStyle(){
	   selOptionIndex(bodyStyleElm,0);
		$(bodyStyleElm).attr('disabled', 'disabled');
         var reqUrl = "/vehicle-ajax.aspx?fa=";
	    if ($('#' + typeElm +' :checked').val() == 'new') {
		        reqUrl += "new_bodystyles&select=1";
                }
        else{
                reqUrl += "used_bodystyles&select=1";
                }
		if($(makeElm).val() != '' && $(makeElm).val() != null)
			reqUrl += "&make=" + $(makeElm).val();
		if($(modelElm).val() != ''&& $(modelElm).val() != null)	
			reqUrl += "&model=" + $(modelElm).val(); 	  
		$.ajax({
				url: reqUrl,
				dataType: 'json',
				success: function(data) {
					fillSelect(data,bodyStyleElm);
					updating = false; 	
					$(bodyStyleElm).removeAttr('disabled');
				}
			});			
	};
    
    function getFeatures() {
      console.log("0");
      selOptionIndex(featureElm, 0);
      $(featureElm).attr('disabled', 'disabled');
      var reqUrl = "/vehicle-ajax.aspx?fa=get_features&type=";
      if ($('#' + typeElm + ' :checked').val() == 'new') {
        reqUrl += "n";
      }
      else {
        reqUrl += "u";
      }

      if ($(yearElm).val() != '' && $(yearElm).val() != null)
        reqUrl += "&year=" + $(yearElm).val();
      if ($(makeElm).val() != '' && $(makeElm).val() != null)
        reqUrl += "&make=" + $(makeElm).val();
      if ($(modelElm).val() != '' && $(modelElm).val() != null)
        reqUrl += "&model=" + $(modelElm).val();

      $.ajax({
        url: reqUrl,
        dataType: 'json',
        success: function (data) {
          fillSelect(data, featureElm);
          updating = false;
          $(featureElm).removeAttr('disabled');
        }
      });
    };
	  //________________________ MPG Functions

    function getMpgRange() {
      console.log(" get MPG");
      var mpgMin = 0;
      var mpgMax = 0;

      var reqUrl = "/vehicle-ajax.aspx?fa=get_mpg";
      reqUrl += '&type=' + vehicleType;

      updating = true;
      $.ajax({
        url: reqUrl,
        dataType: 'json',
        success: function (data) {
          updating = false;
          $.each(data, function (index, item) {
            if (parseInt(item.min) < 10) {
              mpgMin = 10;
            }
            else {
              mpgMin = item.min;
            }
            
            mpgMax = item.max;
          });
          if (parseInt(invMpgMin) != 10) {
            mpgMin = invMpgMin;
          }
          if (parseInt(invMpgMax) != 60) {
            mpgMax = invMpgMax;
          }
          calculateMpgRange(mpgMin, mpgMax, mpgFromElm, 0);
          calculateMpgRange(mpgMin, mpgMax, mpgToElm, 1);
        }
      });
     
    };

    function calculateMpgRange(min, max, elm, select) {
      var mpg = [];
      var i = 0;
      for (i = parseInt(min) ; i <= parseInt(max) + parseInt(mpgStep) ; i += parseInt(mpgStep)) {
        var obj = { value: i, name: i };
        mpg.push(obj);
      }
      fillSelect(mpg, elm);

      if (select == 0) {
        $(elm).prepend('<option value="">Min MPG</option>');
        $(elm).find('option').first().attr('selected', 'selected');
      }
      else {
        $(elm).append('<option value="">Max MPG</option>');
        $(elm).find('option').last().attr('selected', 'selected');
      }
    };

    function mpgValueChange(elmMin, elmMax) {
      var start = $(elmMin).val();
      $(elmMax).find('option').remove();
      $(elmMin).find('option').each(function (index, value) {
        if (start == '') {
          if (index > 0)
            $(elmMax).append($('<option></option>').val($(this).html()).html($(this).html()));
        }
        else {
          if (parseInt($(this).html()) > parseInt(start)) {
            $(elmMax).append($('<option></option>').val($(this).html()).html($(this).html()));
          }
        }
      });

      $(elmMax).append('<option value="">Max MPG</option>');
      $(elmMax).find('option').last().attr('selected', 'selected');
    };
	//_______________________________________________________________

	function fillSelect(data, elm){
		$(elm ).find('option').remove();
		$.each(data, function(index, item) {
					$(elm).get(0).options[$(elm).get(0).options.length] = new Option(item.name, item.value);
			 });	
		$(elm).attr('disabled', '');
        $(elm).removeAttr('disabled'); 
	}

	function selOptionIndex(elm,index){
		$(elm).find('option').each(function(i){
			if(i==index){
				$(this).attr('selected', 'selected');
			}
		});			
	};
	function selOptionValue(elm,value){
		$(elm).find('option').each(function(){
			if($(this).val()==value){
				$(this).attr('selected', 'selected');
			}
		});			
	};
	
	function debug(value) {
    if (window.console && window.console.log)
      window.console.log('Value' + value);
 	};
	 
}
})(jQuery);

