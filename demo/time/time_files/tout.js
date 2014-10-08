var tcmAds = tcmAds || {};
tcmAds.createHeaderTout = function (adVars){	
	if (typeof adVars.name == "undefined") { throw "You must supply a name for this tout"; }
	var ad = {
		channels: {
		  "dflt" : "http://fortune.com/2013/06/13/linkedin-how-its-changing-business-and-how-to-make-it-work-for-you/?pcd=pw2-FortuneLinkedIn900x500"
		},
		micrositeName : 'td-900x500FortuneLinkedIntout',
		setup : function() {
			this.resources_path = '//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/'+this.micrositeName+'/resources/';
			if(/tcmtools\.ecommerce\.timeinc\.com|file:\/\/\//.test(window.location.href)) {
				this.resources_path=this.resources_path.replace('//subscription-assets.timeinc.com/prod/assets/themes/magazines/','//tcmtools.ecommerce.timeinc.com/');
			} else if (/qa\/assets/.test(window.location.href)) {
				this.resources_path=this.resources_path.replace('.com/prod/assets/','.com/qa/assets/');
			}

			tcmAds['td-900x500FortuneLinkedIntout.config'].resources_path = this.resources_path;
		},
		formatForDoubleClick : function(url){
           var tcm_dfpGet = adVars.clickTracking.dartGet,
                extra_qs = "",
                qs_param, qs_val;

            if (tcm_dfpGet != "%c") {
                url = tcm_dfpGet + url.replace("://","%3a%2f%2f");
            }

            for (qs_param in adVars.subs3Tracking) {
                qs_val = adVars.subs3Tracking[qs_param];

                if (/^%%PATTERN/.test(qs_val) || /^%s$/.test(qs_val)) qs_val = "0000";
                if (qs_val == "") qs_val = "null";

                extra_qs += "&" + qs_param + "=" + qs_val;
            }

            // the first "&" should be a "?"
            extra_qs = extra_qs.replace("&", "?");

            return url + extra_qs;
		},
		drawTout: function() {
		    document.write('<a href="' + this.clickThroughUrl + '" id="tout1393957681784" target="_blank"></a>');
		},
		build: function(){
			this.setup();
			this.clickThroughUrl = this.formatForDoubleClick(this.channels[adVars.channel]);
			this.drawTout();
		}
	}
	ad.build();
	return ad;
};

tcmAds.createHeaderTout(tcmAds['td-900x500FortuneLinkedIntout.config']);
document.write(	'<style type="text/css">',
	'#tout1393957681784 @charset "UTF-8";',
	'#tout1393957681784 *{margin:0;padding:0;border:0;font-weight:inherit;font-style:inherit;font-size:100%;line-height:inherit;letter-spacing:inherit;list-style:none;text-decoration:none;}',
	'#tout1393957681784{ display: inline-block; width: 900px; height: 500px; background-image: url(' + tcmAds['td-900x500FortuneLinkedIntout.config'].resources_path + 'images/900x500_linkedIn.jpg); }',
	'@media (max-width: 1260px) {',
		'#tout1393957681784 { width: 450px; height: 375px; background-image: url(' + tcmAds['td-900x500FortuneLinkedIntout.config'].resources_path + 'images/450x375_linkedIn.jpg); }',
	'}',
	'@media (max-width: 450px) {',
		'#tout1393957681784 { width: 300px; height: 250px; background-image: url(' + tcmAds['td-900x500FortuneLinkedIntout.config'].resources_path + 'images/300x250_linkedIn.jpg); }',
	'}',
'</style>');