var tcmAds = tcmAds || {};

tcmAds.createHeaderTout = function(adVars) {
if (typeof adVars.name == "undefined") { throw "You must supply a name for this tout"; }

    var ad = {

        channels : {
            hp : [
                "#", //Subscribe
                "#", //Gift
                "#" //Swim
            ],
            ros: [
                "#", //Subscribe
                "#", //Gift
                "#" //Swim
            ]
        },

        width : 510,
        height : 40,
        toutName : adVars.name,
        micrositeName : "si-coreheadertout0414",

        buildLinks : function() {
            this.link1 = this.formatForDoubleClick(this.channels[this.channel][0]);
            this.link2 = this.formatForDoubleClick(this.channels[this.channel][1]);
            this.link3 = this.formatForDoubleClick(this.channels[this.channel][2]);
        },

        formatForDoubleClick : function(url) {
            var tcm_dfpGet = adVars.clickTracking.dartGet,
            extra_qs = "",
            qs_param, qs_val;
            if (tcm_dfpGet != "%c") {
                url = tcm_dfpGet + url.replace("://","%3a%2f%2f");
            }
            for (qs_param in adVars.subs3Tracking) {
                qs_val = adVars.subs3Tracking[qs_param];
                if (/^%%PATTERN/.test(qs_val) || /^%s$/.test(qs_val)) {
                    qs_val = "0000";
                }
                if (qs_val == "") qs_val = "null";
                extra_qs += "&" + qs_param + "=" + qs_val;
            }
            // the first "&" should be a "?"
            extra_qs = extra_qs.replace("&", "?");
            return url + extra_qs;
        },

        setup : function(){
            this.resources_path = '//subscription-assets.timeinc.com/prod/assets/themes/magazines/SUBS/templates/velocity/site/'+this.micrositeName+'/resources/';
            if(/tcmtools\.ecommerce\.timeinc\.com|file:\/\/\//.test(window.location.href)){
                this.resources_path = this.resources_path.replace('//subscription-assets.timeinc.com/prod/assets/themes/magazines/', '//tcmtools.ecommerce.timeinc.com/');
            } else if (/qa\/assets/.test(window.location.href)) {
                this.resources_path=this.resources_path.replace('.com/prod/assets/','.com/qa/assets/');
            }

            this.channel = adVars.TCMchannel;
            if(!(this.channel in this.channels)){
                this.channel = 'hp';
            }
        },

        showTout : function(obj1) {
            if(/MSIE 7/.test(window.navigator.userAgent)) {
                return;
            }
            var rollOver = this.getElementIdOveride(obj1);
            ebStyle1 = document.getElementById('ebStyle1'); // remove si.com zIndex for 'div#sitiSiteNav ul', allows rollover buttons to layer on top of sub nav.
            if(rollOver.style.display == 'none') {
                rollOver.style.display = 'block';
                if (!this.inIframe() && ebStyle1) {
                    ebStyle1.innerHTML = ' ';
                }
            }
        },

        inIframe : function() {
            return window.frameElement ? true : false;
        },

        closeTout : function(obj1) {
            var rollOver = this.getElementIdOveride(obj1);
            ebStyle1 = document.getElementById('ebStyle1');
            if(rollOver.style.display == 'block'){
                rollOver.style.display = 'none';
                if (!this.inIframe() && ebStyle1) {
                    ebStyle1.innerHTML = 'div#sitiSiteNav ul{z-index:10020!important}';
                }
            }
        },

        getElementIdOveride : function(elem) {
            return (this.inIframe()) ? window.parent.document.getElementById(elem) :
            window.document.getElementById(elem);
        },

        exposeTout: function() {
            tcmAds[this.toutName] = this;
            if (this.inIframe()) {
                if (typeof window.parent.tcmAds !== 'undefined') {
                    window.parent.tcmAds[this.toutName] = tcmAds[this.toutName];
                } else {
                    window.parent.tcmAds = tcmAds;
                }
            }

        },

        drawTout: function() {

            /////////////////////
            //TOUT CREATIVE, EDIT AS NEEDED
            ////////////////////

            document.write(
                '<div style="display: none;">' +
                    'IE' +
                '</div>' +
                '<link href=\"' + this.resources_path + 'styles.css\" rel=\"stylesheet\" type=\"text/css\" \/>' +
                '<div id=\"btns1395933626336\">' +
                    '<!-- Buttons Bar -->' +
                    '<div class=\"btn-link btn-link1\" onmouseover=\"tcmAds[\'' + this.toutName + '\'].showTout(\'btn-1\')\" onmouseout=\"tcmAds[\'' + this.toutName + '\'].closeTout(\'btn-1\')\">' +
                        'SUBSCRIBE TO SI' +
                        '<div class=\"rollover\" id=\"btn-1\" style=\"display:none;\" onclick=\"window.open(\'' + this.link1 + '\')\">' +
                            '<div class=\"btn\">' +
                                '<!-- Btn -->' +
                            '</div>' +
                            '<div class=\"btn-content\">' +
                                '<!-- Content -->' +
                            '</div>' +
                            '<div class=\"devices\">' +
                                '<div class=\"print-bkgd\">' +
                                    '<!-- Print Background -->' +
                                '</div>' +
                                '<img src=\"1730_top1_100_thumb.jpg\" class=\"cvr-print\" />' +
                                '<div class=\"tab-bkgd\">' +
                                    '<!-- Tab Background -->' +
                                '</div>' +
                                '<img src=\"1730_top1_100_thumb.jpg\" class=\"cvr-tab\" />' +
                                '<div class=\"phone-bkgd\">' +
                                    '<!-- Phone Background -->' +
                                '</div>' +
                                '<img src=\"1730_top1_100_thumb.jpg\" class=\"cvr-phone\" />' +
                                '<div class=\"laptop-bkgd\">' +
                                    '<!-- Laptop Background -->' +
                                '</div>' +
                                '<img src=\"1730_top1_100_thumb.jpg\" class=\"cvr-laptop\" />' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class=\"btn-link btn-link2\" onmouseover=\"tcmAds[\'' + this.toutName + '\'].showTout(\'btn-2\')\" onmouseout=\"tcmAds[\'' + this.toutName + '\'].closeTout(\'btn-2\')\">' +
                        'GIVE THE GIFT OF SI' +
                        '<div class=\"rollover\" id=\"btn-2\" style=\"display:none;\" onclick=\"window.open(\'' + this.link2 + '\')\">' +
                            '<div class="btn">' +
                                '<!-- Btn -->' +
                            '</div>' +
                            '<div class="content">' +
                                '<!-- Content -->' +
                            '</div>' +
                            '<img src="1730_top1_100_thumb.jpg" class="cvr-print" />' +
                        '</div>' +
                    '</div>' +
                    '<div class=\"btn-link btn-link3\" onmouseover=\"tcmAds[\'' + this.toutName + '\'].showTout(\'btn-3\')\" onmouseout=\"tcmAds[\'' + this.toutName + '\'].closeTout(\'btn-3\')\">' +
                        'GET SWIMSUIT 2014' +
                        '<div class=\"rollover\" id=\"btn-3\" style=\"display:none;\" onclick=\"window.open(\'' + this.link3 + '\')\">' +
                            '<div class=\"btn\">' +
                                '<!-- Btn -->' +
                            '</div>'+
                            '<div class=\"btn-content\">' +
                                '<!-- Content -->' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        },

        channel : '',
        dfpGet : '',
        resources_path : '',
        link : '',

        makeIt : function() {
            this.setup();
            this.buildLinks();
            this.drawTout();
            this.exposeTout();
        }
    }
    ad.makeIt();
};
tcmAds.createHeaderTout(tcmAds['si-coreheadertout0414.config']);
