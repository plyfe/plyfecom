$(document).ready(function() { 

	CheckUI();
	bindControls();

});

    function bindControls() {
    
	    $('#regEmail').change(function () {
	    	$.get('/ajax.aspx?action=emailexists', { email: $('#regEmail').val() }, function (data) {
	    		if (data == "1")
	    			if (confirm("Email already exists. Go to Login Page?"))
	    				window.location = "/login.asp";
	    			else {
	    				$('#regEmail').val('');
	    				$('#regEmail').focus();
	    			}
	    	});
	    });
	    $('#col3hide').click(function () {
	    	$('#col3Shipping').show();
	    	$('#col3hide').hide();
	    	$('#cbsab').removeAttr('checked');
	    });
	    $('.col2 input').each(function () {
	    	$(this).change(function () {
	    		if ($('#col3Shipping').css('display') == 'none')
	    			FillFields();
	    		if (!$('#cbsab').attr('checked'))
	    			FillFields();
	    	});
	    });
	    $('.col2 select').each(function () {
	    	$(this).change(function () {
	    		if ($('#col3Shipping').css('display') == 'none')
	    			FillFields();
	    		if (!$('#cbsab').attr('checked'))
	    			FillFields();
	    	});
	    });
	    
	    $('#cbsab').change(function(){
	    	 FillFields(); CheckUI();
	    });
	    
    }
    
    function selectShipCountry_change() {
        $('#drpShipState').val('');
        $('#txtShipState').val('');
        CheckUI();
    }

    function selectCountry_change() {
        $('#drpState').val('');
        $('#txtState').val('');
        CheckUI();
    }

    function CheckUI() {
        if ($('#selectCountry').val() == 'USA') {
            $('#txtState').hide();
            $('#drpState').show();
            $('#drpStateCA').hide();
        } else if ($('#selectCountry').val() == 'CA') {
            $('#txtState').hide();
            $('#drpState').hide();
            $('#drpStateCA').show();
        } else {
            $('#txtState').show();
            $('#drpState').hide();
            $('#drpStateCA').hide();
        }

        if ($('#selectShipCountry').val() == 'USA') {
            $('#txtShipState').hide();
            $('#drpShipState').show();
            $('#drpShipStateCA').hide();
        } else if ($('#selectShipCountry').val() == 'CA') {
            $('#txtShipState').hide();
            $('#drpShipState').hide();
            $('#drpShipStateCA').show();
        } else {
            $('#txtShipState').show();
            $('#drpShipState').hide();
            $('#drpShipStateCA').hide();
        }
        
        
    }
    
    function CheckPostalCode(){
    
    	if ($('#col3Shipping').attr('style')=='display:none;') {console.log('filling fields');FillFields();}
    	
    	if (CheckStateAgain()==false) {return false}
    
    	if ($('#selectShipCountry').val()=="KR") {
    		if ($('#ShipPostalCode').val().length<6) {
    				alert('Please enter 6 digits for the Postal Code');
    				$('#ShipPostalCode').focus();
    				return false;
    			}else{
    			$('#accountinfo_form').submit();
    			console.log('submit 1!');
    			return true;
    			}
    	}else{
    		console.log('txtShip:'+$('#txtShipState').val());
    		$('#accountinfo_form').submit();
    		return true;
    	}
    }
    
    function CheckStateAgain() {
        if ($('#selectShipCountry').val() == 'USA' && $('#txtShipState').val() == '') {
            alert('Please select a state for shipping.');
            return false;
        } else if ($('#selectShipCountry').val() == 'CA' && $('#txtShipState').val() == '') {
            alert('Please select a state for shipping.');
            return false;
        } else if ($('#selectCountry').val() == 'USA' && $('#txtState').val() == '') {
            alert('Please select a state for billing.');
            return false;
        } else if ($('#selectCountry').val() == 'CA' && $('#txtState').val() == '') {
            alert('Please select a state for billing.');
            return false;
        } else {
            return true;
        }

    }
    
    
    
function FillFields() {
			$("input[name='ShipFirstName']").val($("input[name='FirstName']").val());
			$("input[name='ShipLastName']").val($("input[name='LastName']").val());
			$("input[name='ShipAddress1']").val($("input[name='Address1']").val());
			$("input[name='ShipAddress2']").val($("input[name='Address2']").val());
			$("input[name='ShipCity']").val($("input[name='City']").val());
			$("input[name='ShipPostalCode']").val($("input[name='PostalCode']").val());
			$("#drpShipState").val($("#drpState").val());
			$("select[name='ShipCountry']").val($("select[name='Country']").val());

			if ($('#txtState').val()=='') {
				$('#txtState').val($("#drpState").val());
			}
			
			if ($('#txtShipState').val()=='') {
				$('#txtShipState').val($("#drpShipState").val());
			}
			
			//$('#drpShipState').val($('#drpState').val()); 
			$('#drpShipStateCA').val($('#drpStateCA').val()); 
			//$('#txtShipState').val($('#txtState').val());
			
			console.log('field values copied');
			return true;
}

function ChangeCountry(index,drpid){
	if(index>57){
		$('#'+drpid).val('Canada');
	}else{
		$('#'+drpid).val('USA');
	}
}