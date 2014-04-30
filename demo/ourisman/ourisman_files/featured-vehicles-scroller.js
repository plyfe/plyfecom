function mycarousel_initCallback(carousel) {
  jQuery('#fvsCarousel-next').bind('click', function () {
    carousel.next();
    return false;
  });

  jQuery('#fvsCarousel-prev').bind('click', function () {
    carousel.prev();
    return false;
  });

  // Pause autoscrolling if the user moves with the cursor over the clip.
  carousel.clip.hover(function () {
    carousel.stopAuto();
  }, function () {
    carousel.startAuto();
  });
};

function mycarousel_itemLoadCallback(carousel, state) {
  if (state != 'init')
    return;
  for (var i = 0; i < vehiclesAsJSON.length; i++) {
    carousel.add(i + 1, mycarousel_getItemHTML(i));
  }
};

function mycarousel_getItemHTML(i) {
  var fvsValue = '<div class="slideBlock">';
  fvsValue += '<a alt="' + vehiclesAsJSON[i].VehicleYear + ' ' + vehiclesAsJSON[i].VehicleMake + ' ' + vehiclesAsJSON[i].VehicleModel + '" href="/vehicledetailsvin.aspx?vin=' + vehiclesAsJSON[i].VehicleVin + '&type=' + vehiclesAsJSON[i].VehicleType + '">';
  fvsValue += '<img class="vehiclepic" src="' + vehiclesAsJSON[i].VehiclePhoto + '" alt="' + vehiclesAsJSON[i].VehicleYear + ' ' + vehiclesAsJSON[i].VehicleMake + ' ' + vehiclesAsJSON[i].VehicleModel + '">';
  fvsValue += '<span class="vehicle">' + vehiclesAsJSON[i].VehicleYear + ' ' + vehiclesAsJSON[i].VehicleMake + ' ' + vehiclesAsJSON[i].VehicleModel + '</span>';
  fvsValue += '<span class="vType">' + vehiclesAsJSON[i].VehicleType + '</span>';
  fvsValue += '<span class="vStock">' + vehiclesAsJSON[i].VehicleStock + '</span>';
  fvsValue += '<span class="vPrice"><span  class="iPrice">Internet Price:</span> ' + vehiclesAsJSON[i].VehiclePrice + '</span>';
  fvsValue += '<span class="vVehicleInfo">View Vehicle Info</span>';
  fvsValue += '</a>';
  fvsValue += '</div>';
  return fvsValue;
}

var fvsVehicles = [];
var vehiclesAsJSON = [];
var scrollNum = 1;
var autoNum = 2;
var wrapMode = 'circular';

if ($('#featuredVehiclesScroller')) {
  featuredFVSActivation();
}



function featuredFVSActivation() {

  if (typeof (invGalleryfvsParams) != "undefined") {
    fvsVehicles = eval(invGalleryfvsParams.vin);
    //featuredVCActivation();
  }

  var url = "/api/InventoryWidget/FeaturedVehicles?vehicleVins=";
  for (var i = 0; i < fvsVehicles.length; i++)
    url += fvsVehicles[i] + "-";

  url = Left(url, url.length - 1)


  if (typeof (sMakeOnly) != "undefined") {
    url += '&make=' + sMakeOnly;
  }

  if (typeof (featuredVehType) != "undefined") {
    url += '&type=' + featuredVehType;
  }

  if (typeof (featuredCpoOnly) != "undefined") {
    url += '&cpoOnly=1';
  }

  $.ajax({
    url: url,
    type: "get",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      vehiclesAsJSON = JSON.parse(response);
      $('#fvsCarousel').jcarousel({
        auto: autoNum,
        scroll: scrollNum,
        vertical: true,
        wrap: wrapMode,
        size: vehiclesAsJSON.length,
        itemLoadCallback: mycarousel_itemLoadCallback,
        initCallback: mycarousel_initCallback,
        buttonNextHTML: null,
        buttonPrevHTML: null
      });
    }
  })
}

function Left(str, n) {
  if (n <= 0)
    return "";
  else if (n > String(str).length)
    return str;
  else
    return String(str).substring(0, n);
}