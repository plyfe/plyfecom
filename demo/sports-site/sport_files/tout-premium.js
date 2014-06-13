(function(){

    obj = {
	adObj : ticmAdParams1398711882376,
	channels : {
	    "dflt" : {
		"link" : "#",
		"creative" : "<div id='tcmGlobalTout90x70' onclick='window.open(\"CLICKTHROUGHSTRING\");' style='cursor: pointer;width: 153px;height: 148px;'><div style='width: 153px;height: 148px;background: url(\"#\") 0px 0px no-repeat;top: 0px;left: 0px;z-index: 999999;display: block;'><!-- Content --></div><img src='1730_top1_100_thumb.jpg' style='display: block;position:absolute;cursor: pointer;width: 81px;height: 108px;top: 27px;left: 33px;z-index: 9999; margin:0;'/><img src='#' style='width: 61px;height: 54px;top: 92px;left: 89px;z-index: 9999;margin:0;display: block;position: absolute;cursor: pointer;' /></div>"
	    },
	    "ros" : {
		"link" : "#",
		"creative" : "<div id='tcmGlobalTout90x70' onclick='window.open(\"CLICKTHROUGHSTRING\");' style='cursor: pointer;top: -10px;width: 153px;height: 148px;'><div style='width: 153px;height: 148px;background: url(\"#\") 0px 0px no-repeat;top: 0px;left: 0px;z-index: 999999;display: block;'><!-- Content --></div><img src='1730_top1_100_thumb.jpg' style='display: block;position: absolute;cursor: pointer;width: 81px;height: 108px;top: 27px;left: 33px;z-index: 9999; margin:0;'/><img src='#' style='width: 61px;height: 54px;top: 92px;left: 89px;margin:0;z-index: 9999;display: block;position: absolute;cursor: pointer;'/></div>"
	    }

	},

	//TOUT CREATIVE, EDIT AS NEEDED


	clickThrough : "",

	setChannelSpecs : function(){
	    var channel = this.channels[this.adObj.channel] || this.channels["dflt"];
	    this.clickThrough = channel.link;
	    this.creative = channel.creative;
	},

	formatForDCLK : function(){

	    var dfpGet = this.adObj.clickTracking.dartGet,str = "",
	    fpa_adid = "", fpa_crid = "";

	    // ADD SUBS3 FPA VARIABLES TO CAMPAIGN CLICKTHROUGH (THESE ARE ADDED EVEN IF NOT EXPANDED, FOR CLARITY IN TESTING)
	    for(n in this.adObj.subs3Tracking){
		fpa = this.adObj.subs3Tracking[n];
		if( /^%%PATTERN/.test(fpa)  ||  /^%s$/.test(fpa) ){fpa = "0000";}
		else if(fpa == ""){fpa = "null";}
		str += "&"+n+"="+escape(fpa);
	    }

	    if( this.clickThrough.indexOf("?") == -1 ) {
		str = str.replace("&","?");
	    }

	    if (dfpGet !== "%c") {
		this.clickThrough = dfpGet+this.clickThrough.replace("://","%3a%2f%2f");
	    }

	    this.clickThrough+=str;

	},


	render : function(){
	    this.setChannelSpecs();
	    this.formatForDCLK();
	    document.write(this.creative.replace("CLICKTHROUGHSTRING",this.clickThrough));
	}

    };

    obj.render();
})();














