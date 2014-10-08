var Nativo = window.top.Nativo = window.top.Nativo || {};
Nativo.mode = 3;
Nativo.host = 'adserve.postrelease.com';
Nativo.protocol = 'http';
Nativo.displayPipe = Nativo.protocol +'://' + Nativo.host + (Nativo.mode == 3 ? '/content.js' : '/display.js');

Nativo.appendScript = function (element, doc) {
    doc = doc || window.top.document;
    var root = doc.body.getElementsByTagName('script')[0];
    root.parentNode.insertBefore(element, root);
}

Nativo.displayAd = function (ad) {
    ad.processed = true;
    ad.doc = ad.doc || window.top.document;
    var ntvElement = ad.doc.createElement('script');
    ntvElement.async = true;
    ntvElement.type = 'text/javascript';
    var param = ad.a ? "prx_a=" + ad.a : "prx_c=" + ad.c;

    // multiple placements support
    param += ad.z ? "&ntv_z=" + ad.z : "";
    if (ad.au) {
        param += "&ntv_au=" + ad.au;
        if (ad.clk) Nativo.tpc['#' + ad.au] = ad.clk;
    }

    // filter articles alerady displayed
    if (!ad.a && Nativo.atf.length > 0)
        param += "&ntv_atf=" + Nativo.atf.join();

    if (Nativo.pageURL) {
        param += "&prx_url=" + Nativo.pageURL;
    }

    var url = Nativo.adDisplayBase + "&async=true&" + param + "&rand=" + (Math.random() * 1000000000);


    ntvElement.src = url;;
    Nativo.appendScript(ntvElement, ad.doc);
}


// add NTV script if not aleady added
if (typeof PostRelease == 'undefined') {
    var _prx = Nativo.mode != 1 ?
        window.top._prx = window.top._prx || [] : [];

    // make sure we are not calling our ad server autoamtically (will be triggered by the DFP response)
    _prx.push(['cfg.SetNoAutoStart']);
    
    var doc = Nativo.mode == 1 ? window.document : window.top.document;
    Nativo.tmpTag = doc.createElement('script');
    Nativo.tmpTag.async = true;
    Nativo.tmpTag.type = 'text/javascript';
    Nativo.tmpTag.src = Nativo.protocol + '://a.postrelease.com/serve/load.js?async=true'; // need to replcae with dynamic URL & version
    Nativo.appendScript(Nativo.tmpTag, doc);
}

// setting base param
Nativo.adDisplayBase = Nativo.displayPipe + "?prx_pl=359451";

// third party clicks map (for multiple placements)
Nativo.tpc = Nativo.tpc || {};  

// this will hold all articles we alerady presented
Nativo.atf = Nativo.atf || [];

// create the array to hold the tags (ads/campaigns)
Nativo.ads = Nativo.ads || [];
Nativo.ads._push = Nativo.ads._push || Nativo.ads.push;
Nativo.ads.push = function (element) {
	Nativo.thirdPartyClickUrl = element.clk; // deprecated
	Nativo.displayAd(element);
	
	// now call the original push
	return this._push(element);
}


// for ads which were alerady pushed to the array, trigger a call to display
for (var i = 0; i < Nativo.ads.length; i++) {
    // TODO: this needs to be handle multiple ads
    Nativo.thirdPartyClickUrl = Nativo.ads[i].clk;

    if (!Nativo.ads[i].processed)
	    Nativo.displayAd(Nativo.ads[i]);	
}

