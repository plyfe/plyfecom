var _hashtable = {
			"foodnetwork.com": "http://my.foodnetwork.com/community/",
			"travelchannel.com": "http://my.travelchannel.com/community/",
			"hgtvremodels.com": "http://my.hgtvremodels.com/community/",
			"cookingchanneltv.com": "http://my.cookingchanneltv.com/community/",
			"recipezaar.com": "http://share.recipezaar.com/community/",
			"food.com": "http://share.food.com/community/"
		};

if (typeof(SNI_COMMUNITY_ECHO_SERVICE_ENVIORNMENT) == 'undefined') {
	SNI_COMMUNITY_ECHO_SERVICE_ENVIORNMENT = {};
}

if (typeof(SNI_COMMUNITY_ECHO_ENVIORNMENT) != 'undefined') {
	SNI_COMMUNITY_ECHO_SERVICE_ENVIORNMENT = SNI_COMMUNITY_ECHO_ENVIORNMENT.replace("echoapp", "echoint");
}

if (typeof(SNI_COMMUNITY_ECHO_ASSET) == 'undefined') {
                SNI_COMMUNITY_ECHO_ASSET = {};
            }
if (typeof SNI_COMMUNITY_ECHO_ASSET.ASSETPROVISIONONLOAD === 'undefined') {
                SNI_COMMUNITY_ECHO_ASSET.ASSETPROVISIONONLOAD = {};
                 SNI_COMMUNITY_ECHO_ASSET.ASSETPROVISIONONLOAD = false;
            }

var SNI_COMMUNITY_ECHO_APP = {
	BUS_NAME: "scrippsnetworks", //Not set by WCM
	RPX_URL: "https://echo-scrippsnetworks.rpxnow.com/", //Not set by WCM
	APP_KEY: "echo.realtidbits.commenting.scrippsnetworks.prod", //Not set by WCM
	SOCIALSHARING_APPID: "bdpnmgcflhmieapgjdon", //Not set by WCM
	SOCIALSHARING_XD_RECIEVER_URL: "CommentsApp/rpx_xdcomm.html", //Not set by WCM
	ASSET_PROV_SERVLET_URL: SNI_COMMUNITY_ECHO_SERVICE_ENVIORNMENT + "/echo/secured/asset-provision",
	FLAG_SCRIPT_SERVLET_URL: SNI_COMMUNITY_ECHO_SERVICE_ENVIORNMENT + "/echo/secured/flag-service",
	DELETE_SCRIPT_SERVLET_URL: SNI_COMMUNITY_ECHO_SERVICE_ENVIORNMENT + "/echo/secured/delete-service",
	EMAIL_SERVLET_URL: SNI_COMMUNITY_ECHO_SERVICE_ENVIORNMENT + "/echo/shared/email-service",
	ECHO_FEDERAION_SERVLET_URL: SNI_COMMUNITY_ECHO_SERVICE_ENVIORNMENT + "/echo/secured/echo-federation",
	EQL_DOMAIN: "http://scrippsnetworks.com",
	FACEBOOK_APPID: "319214671442937",
	ASSETTYPE_LIST: {
		"food": {
			"5": "http://activitystrea.ms/schema/1.0/article",
			"490": "http://activitystrea.ms/schema/1.0/article",
			"41073": "http://activitystrea.ms/schema/1.0/article",
			"93219": "http://activitystrea.ms/schema/1.0/article",
			"347549": "http://activitystrea.ms/schema/1.0/article",
			"347550": "http://activitystrea.ms/schema/1.0/article",
			"article": "http://activitystrea.ms/schema/1.0/article"
		},
		"travel": {
			"tc_travel_idea_article": "http://activitystrea.ms/schema/1.0/article"
		},
		"cook": {
			"5": "http://activitystrea.ms/schema/1.0/article",
			"490": "http://activitystrea.ms/schema/1.0/article",
			"41073": "http://activitystrea.ms/schema/1.0/article",
			"93219": "http://activitystrea.ms/schema/1.0/article",
			"347549": "http://activitystrea.ms/schema/1.0/article",
			"347550": "http://activitystrea.ms/schema/1.0/article"
		}
	},
	CQ_JB_ASSETTYPE_LIST: {
		"food": {
			"company": "41073",
			"recipe": "93219"
		}
	},
	"muxAPIUrl":'http://api.echoenabled.com/v2/mux',
	SEO_DEFAULT_URL: {
		"food": "http://my.foodnetwork.com/community/",
		"travel": "http://my.travelchannel.com/community/",
		"hgtv": "http://my.hgtvremodels.com/community/",
		"cctv": "http://my.cookingchanneltv.com/community/",
		"recipe": "http://share.recipezaar.com/community/",
		"foodcom": "http://share.food.com/community/"
	},
	AWSBUCKETURL: "echo-prod-seo.sniaws.com",
	ererrorQueue: "https://sqs.us-east-1.amazonaws.com/314495532666/Brombone_seo_error_queue",
	CSS_MAPPING: {
		"food": {
			"default":"/css/food/custom-reviews-jbug.css",
			"41073": "/css/food/custom-reviews-jbug.css",
			"93219": "/css/food/custom-reviews-jbug.css",
			"recipe": "/css/food/custom-reviews.css",
			"company": "/css/food/custom-reviews.css"
		},
		"travel" : {
			"default":"/css/travel/custom-comments.css",
			"tc_travel_idea_article": "/css/travel/custom-comments.css"
		}
	},
	SERVICES_ON_OFF_LIST: {
		"food": {
			"assetprovision": "on",
			"assetupdate": "off"
		},
		"travel" : {
			"assetprovision": "on",
			"assetupdate": "off"
		}
	}
};