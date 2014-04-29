jQuery(function ($) {
  if ($('#inventorySearchWidget').length != 0) {
    $('#inventorySearchWidget').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      bodyStyle: 'isbodyStyle',
      preFill: true,
      preFillYear: true
    });
    activateInventorySearch($('#inventorySearchWidget'));
  }
  if ($('#newInventorySearchWidget').length != 0) {
    $('#newInventorySearchWidget').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      bodyStyle: 'isbodyStyle',
      preFill: true,
      newOnly:true,
      preFillYear: true
    });
    activateInventorySearch($('#newInventorySearchWidget'));
  }
  if ($('#inventorySearchTrimWidget').length != 0) {
    $('#inventorySearchTrimWidget').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      trim: 'isTrimStyle',
      preFill: true,
      preFillYear: true
    });
    activateInventorySearch($('#inventorySearchTrimWidget'));
  }

  if ($('#usedInventorySearchWidget').length != 0) {
    $('#usedInventorySearchWidget').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      bodyStyle: 'isbodyStyle',
      preFill: true,
      usedOnly: true,
      preFillYear: true
    });
    var invWiOnlyU = true;
    activateInventorySearch($('#usedInventorySearchWidget'));
  }

  if ($('#inventorySearchFeatureWidget').length != 0) {
    $('#inventorySearchFeatureWidget').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      bodyStyle: 'isbodyStyle',
      feature: 'isfeature',
      preFill: true,
      usedOnly: true,
      preFillYear: true
    });
    activateInventorySearch($('#inventorySearchFeatureWidget'));
  }

  if ($('#inventorySearchMpgWidget').length != 0) {
    $('#inventorySearchMpgWidget').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      bodyStyle: 'isbodyStyle',
      mpgFrom: 'mpgFrom',
      mpgTo: 'mpgTo',
      preFill: true,
      preFillYear: true
    });
    activateInventorySearch($('#inventorySearchMpgWidget'));
  }

  if ($('#inventorySearchMileageWidget').length != 0) {
    $('#inventorySearchMileageWidget').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      bodyStyle: 'isbodyStyle',
      mileageTo: 'mileageTo',
      preFill: true,
      preFillYear: true
    });
    activateInventorySearch($('#inventorySearchMileageWidget'));
  }
  
  if ($('#inventorySearchFeatureMpgWidget').length != 0) {
    $('#inventorySearchFeatureMpgWidget').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      bodyStyle: 'isbodyStyle',
      feature: 'isfeature',
      mpgFrom: 'mpgFrom',
      mpgTo: 'mpgTo',
      preFill: true,
      usedOnly: true
    });
    activateInventorySearch($('#inventorySearchFeatureMpgWidget'));
  }

  if ($('#inventorySearchWidgetWithPrice').length != 0) {
    $('#inventorySearchWidgetWithPrice').dealerOnVehicleAjax({
      type: 'isVehicleType',
      year: 'isyear',
      make: 'ismake',
      model: 'ismodel',
      bodyStyle: 'isbodyStyle',
      preFill: true
    });
    activateInventorySearch($('#inventorySearchWidgetWithPrice'));
  }

  if ($('#isVehicleStock').length != 0) {
    $('#isVehicleStock label').inFieldLabels({ fadeOpacity: 0.2 });
    $('#isVehicleStock input').attr('autocomplete', 'off');
  }
});

function activateInventorySearch(theWidget) {
	
  if ($(theWidget).find('#isprice').length != 0) {
    $(theWidget).find('#isprice').attr('disabled', 'disabled');
    fillPriceLists(theWidget);
  }
  if ($(theWidget).find('#isCpoInv').length != 0) {
    var urlCPO = '/searchused.aspx?cpo=1';
    if (typeof (cpoUrl) != "undefined") urlCPO = cpoUrl;


    $.ajax({
      url: '/widgets-ajax.aspx?fa=get_dmake',
      dataType: 'json',
      success: function (data) {
        var dm;
        dm = data.dmake;
        if (dm != 'GROUP') {
          urlCPO += '&make=' + data.dmake;
        }
      }
    });

    $(theWidget).find('#cpoInv').click(function () {
      if (typeof (cpoMake) != "undefined") {
        if (cpoMake == false) {
          window.location.href = '/searchused.aspx?cpo=1';
        }
        else {
          window.location.href = urlCPO;
        }
      }
      else {
        window.location.href = urlCPO;
      }
    });
  }  
    $(theWidget).find('#isSubmit').click(function () { submitSearch(theWidget); });
}

function fillPriceLists(theWidget) {
  var list = "[";
  list = "[";
  list += "{\"value\":\"\",\"name\":\"- " + priceLabel + " -\"},";
  list += "{\"value\":\"0,5000\",\"name\":\"Up to $5,000\"},";
  list += "{\"value\":\"5000,10000\",\"name\":\"$5,001 to $10,000\"},";
  list += "{\"value\":\"10001,15000\",\"name\":\"$10,001 to $15,000\"},";
  list += "{\"value\":\"15001,20000\",\"name\":\"$15,001 to $20,000\"},";
  list += "{\"value\":\"20001,25000\",\"name\":\"$20,001 to $25,000\"},";
  list += "{\"value\":\"25001,30000\",\"name\":\"$25,001 to $30,000\"},";
  list += "{\"value\":\"30001,40000\",\"name\":\"$30,001 to $40,000\"},";
  list += "{\"value\":\"40001,50000\",\"name\":\"$40,001 to $50,000\"},";
  list += "{\"value\":\"50001,60000\",\"name\":\"$50,001 to $60,000\"},";
  list += "{\"value\":\"60000,500000\",\"name\":\"$60,001 or more+\"}";
  list += "]";
  eval("var prices =" + list);
  var priceOption = $(theWidget).find('#isprice');
  $(priceOption).find('option').remove();
  $.each(prices, function (index, item) {
    $(priceOption).get(0).options[$(priceOption).get(0).options.length] = new Option(item.name, item.value);
  });

  $(priceOption).removeAttr('disabled');
}

function submitSearch(theWidget) {
    var price_array;
    var priceValue, price1, price2, bodyStyle, trim, minPrice, maxPrice;

    if ($(theWidget).find('#isTrimStyle').length != 0) {
      trim = $(theWidget).find('#isTrimStyle').val();
    }

    bodyStyle = $(theWidget).find('#isbodyStyle').val();

    if ($(theWidget).find('#isprice').length != 0) {
      priceValue = $(theWidget).find('#isprice').val();
    }
    else if ($(theWidget).find('#providePrice').length != 0) {
	  minPrice = $(theWidget).find('#isGivenMinPrice').val().replace(",","");
	  maxPrice = $(theWidget).find('#isGivenMaxPrice').val().replace(",","");
      if (minPrice !== 'Minimum Price: ' && maxPrice !== 'Maximum Price: ') {
        if (isNaN(minPrice) || isNaN(maxPrice)) {
          alert('Please provide a valid values for Minimum Price and Maximum Price');
          return;
        }
        priceValue = minPrice + ', ' + maxPrice;
      }
      else if (minPrice !== 'Minimum Price: ' && maxPrice === 'Maximum Price: ') {
        if (isNaN(minPrice)) {
          alert('Please provide a valid value for Minimum Price');
          return;
        }
        priceValue = minPrice + ', 99999999';
      }
      else if (maxPrice !== 'Maximum Price: ' && minPrice === 'Minimum Price: ') {
        if (isNaN(maxPrice)) {
          alert('Please provide a valid value for Maximum Price');
          return;
        }
        priceValue = '0 ,' + maxPrice;
      }
      else {
        priceValue = '0, 9999999';
      }
    }
    else {
      priceValue = '';
    }

    if (priceValue == '') {
      price1 = "";
      price2 = "";
    }
    else {
      price_array = priceValue.split(",");
      price1 = price_array[0];
      price2 = price_array[1];
    }

    var tmpModel = $(theWidget).find('#ismodel').val();
    tmpModel = encodeURIComponent(tmpModel);

    var reqUrl = "/widgets-ajax.aspx?fa=";
    reqUrl += "redirect_search&year=" + $(theWidget).find('#isyear').val() + "&make=" + $(theWidget).find('#ismake').val() + "&model=" + tmpModel + "&bodystyle=" + bodyStyle + "&price1=" + price1 + "&price2=" + price2 + "&trim=" + trim;

    if ($(theWidget).find('#isfeature').length != 0) {
      reqUrl += '&features=' + $(theWidget).find('#isfeature').val();
    }

    if ($(theWidget).find('#mpgFrom').length != 0) {
      if ($.isNumeric($(theWidget).find('#mpgFrom').val())) reqUrl += '&hwympg1=' + $(theWidget).find('#mpgFrom').val();
    }

    if ($(theWidget).find('#mpgTo').length != 0) {
      if ($.isNumeric($(theWidget).find('#mpgTo').val())) reqUrl += '&hwympg2=' + $(theWidget).find('#mpgTo').val();
    }
  
    if ($(theWidget).find('#mileageTo').length != 0) {
      if ($.isNumeric($(theWidget).find('#mileageTo').val())) reqUrl += '&mileage2=' + $(theWidget).find('#mileageTo').val();
    }



    if ($(theWidget).find('#isnew')) {
      if ($(theWidget).find("input[name='istype']:checked").val() == 'new')
        reqUrl += "&type=new";
      else
        reqUrl += "&type=used";
    }
    else {
      if (invWiOnlyU == true)
        reqUrl += "&type=used";
      else
        reqUrl += "&type=new";
    }

    if ($(theWidget).find('#isstocknum').length != 0) {
      if ($(theWidget).find('#isstocknum').val() != '') {
        if ($(theWidget).find("input[name='istype']:checked").val() == 'new')
          reqUrl = "/searchnew.aspx?stock=" + $(theWidget).find('#isstocknum').val();
        else
          reqUrl = "/searchused.aspx?stock=" + $(theWidget).find('#isstocknum').val();
      }
    }

    window.location.href = reqUrl;
  }
