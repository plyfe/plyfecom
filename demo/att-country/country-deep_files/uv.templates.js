angular.module('snes-tpls', ['/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components-shared/templates/header.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/banner-campaign/templates/banner-campaign.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/card-container/templates/card-container.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/collection-filter/templates/collection-filter.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/coupon-tabs.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/coupons.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/purchase-history.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/saved-coupons.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketing.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCTA.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCountdown.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCountdownTimer.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingFourByFour.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingHeroHtml.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingHeroImage.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingStandard.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/package-addons/templates/package-addons.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/page-title/templates/page-title.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/sec-football-rush-tour-2014/templates/sec-football-rush-tour-2014.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/slide-component/templates/slide-component.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/tv-packages/templates/tv-packages.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/tabs/templates/tab-heading.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/tabs/templates/tabset.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/level-selector.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/pin-input.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/settings.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/card-badge.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/card-wrapper.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/category-card.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/coupon-card.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/landscape-video-card.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/movie-card.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/music-card.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/tv-card.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/bookmark.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/entitlementFooter.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/favorite.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/header.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/rentalFooter.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/thumbnail.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/cardFlyout.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/category.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/coupon.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/music.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/toolTip.tpl', '/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/templates/carousel.tpl']);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components-shared/templates/header.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components-shared/templates/header.tpl",
    "<header class=\"component-header\">\n" +
    "	<h2 class=\"component-title\" ng-bind-html=\"headerData.title\"></h2>\n" +
    "\n" +
    "    <tool-tip-icon\n" +
    "        ng-if=\"headerData.toolTipText\"\n" +
    "        class=\"tool-tip-icon\"\n" +
    "        hover=\"setHovered($event, hover)\"\n" +
    "        is-hovered=\"isHovered\"\n" +
    "        data-track-component=\"'Tooltip'\"\n" +
    "        data-track-metadata=\"isHovered\"\n" +
    "    ></tool-tip-icon>\n" +
    "\n" +
    "	<p class=\"promo-header\">\n" +
    "		<span ng-if=\"headerData.promoText\" ng-bind-html=\"headerData.promoText\"></span>\n" +
    "\n" +
    "		<a ng-if=\"headerData.link && headerData.link.linkMetadata\"\n" +
    "			ng-bind-html=\"headerData.link.linkMetadata\"\n" +
    "			uv-href=\"{{headerData.link.linkUrl}}\"\n" +
    "			uv-target=\"headerData.link.externalLink\"\n" +
    "			data-track-component=\"'Header Link'\"\n" +
    "			data-track-metadata=\"headerData.link.linkMetadata\"\n" +
    "		></a>\n" +
    "	</p>\n" +
    "</header>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/banner-campaign/templates/banner-campaign.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/banner-campaign/templates/banner-campaign.tpl",
    "<div ng-controller=\"BannerCampaignCtrl\" id=\"targeted-ads\" class=\"component targeted-ads\">\n" +
    "	<a uv-href=\"{{ banner.link }}\" target=\"{{ banner.target }}\" data-track-component=\"'Promotional Banner'\">\n" +
    "		<img ng-src=\"{{ banner.image }}\" alt=\"{{ banner.alt }}\">\n" +
    "	</a>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/card-container/templates/card-container.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/card-container/templates/card-container.tpl",
    "<section class=\"component card-container\" ng-controller=\"CardContainerCtrl\" data-track-component=\"'Card Container'\">\n" +
    "    <component-header header-data=\"header\"></component-header>\n" +
    "    <article>\n" +
    "        <div carousel=\"true\" slide-adjust=\"20\">\n" +
    "            <card ng-repeat=\"card in cards\" card-data=\"card\"></card>\n" +
    "        </div>\n" +
    "    </article>\n" +
    "</section>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/collection-filter/templates/collection-filter.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/collection-filter/templates/collection-filter.tpl",
    "<div class=\"collection-page\" ng-controller=\"CollectionFilterCtrl as collection\">\n" +
    "	<div class=\"collection-filter\">\n" +
    "		<img ng-src=\"{{ pageLogo }}\" alt=\"{{ pageLogoAlt }}\" class=\"collection-image\" />\n" +
    "		<div class=\"filter-list\" ng-if=\"groups.length > 1\">\n" +
    "			<a class=\"filter-name\"\n" +
    "			   ng-class=\"{ selected: collection.currentIndex === -1 }\"\n" +
    "			   ng-click=\"collection.currentIndex = -1\">All</a>\n" +
    "			<a class=\"filter-name\"\n" +
    "			   ng-repeat=\"group in groups\"\n" +
    "			   ng-class=\"{ selected: collection.currentIndex === $index }\"\n" +
    "			   ng-click=\"collection.currentIndex = $index\">{{ group.title }}</a>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-if=\"groups.length > 1\" class=\"standard-fade\" ng-class=\"{ 'standard-fade-in': collection.currentIndex === -1 }\" ng-show=\"collection.currentIndex === -1\">\n" +
    "		<div ng-repeat=\"group in groups\" class=\"collection-row\">\n" +
    "			<h2 class=\"group-title\">{{ group.title }}</h2>\n" +
    "			<div carousel=\"true\" slide-adjust=\"20\">\n" +
    "				<card ng-repeat=\"item in group.items\" card-data=\"item\"></card>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div ng-repeat=\"group in groups\" class=\"standard-fade collection-grid\" ng-class=\"{ 'standard-fade-in': collection.currentIndex === $index }\" ng-show=\"collection.currentIndex === $index\">\n" +
    "		<h2 class=\"group-title\">{{ group.title }}</h2>\n" +
    "		<card ng-repeat=\"item in group.items\" card-data=\"item\"></card>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/coupon-tabs.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/coupon-tabs.tpl",
    "<section class=\"component coupon-tabs\" ng-controller=\"CouponTabsCtrl\" ng-class=\"{ 'logged-in': isUverseUser }\" data-track-component=\"'Coupon Tabs'\">\n" +
    "    <component-header header-data=\"header\"></component-header>\n" +
    "	<article>\n" +
    "		<tabset></tabset>\n" +
    "	</article>\n" +
    "</section>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/coupons.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/coupons.tpl",
    "<div ng-controller=\"CouponsCtrl\">\n" +
    "	<tab-heading data-track-component=\"'Coupons'\">{{ tab.model.title }}</tab-heading>\n" +
    "	<card ng-repeat=\"card in couponCards\" card-data=\"card\"></card>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/purchase-history.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/purchase-history.tpl",
    "<div ng-controller=\"PurchaseHistoryCtrl\" class=\"component purchase-history\">\n" +
    "	<tab-heading data-track-component=\"'Purchase History'\">{{ tab.model.title }}</tab-heading>\n" +
    "	<table class=\"purchase-history-table\">\n" +
    "		<thead>\n" +
    "			<tr>\n" +
    "				<td class=\"title\">Title</td>\n" +
    "				<td class=\"price\">Price</td>\n" +
    "				<td class=\"coupon-code\">Coupon Code</td>\n" +
    "				<td class=\"purchase-date\">Purchase Date</td>\n" +
    "			</tr>\n" +
    "		</thead>\n" +
    "		<tbody>\n" +
    "			<tr ng-repeat=\"purchase in purchases\">\n" +
    "				<td class=\"title\">{{purchase.title}}</td>\n" +
    "				<td class=\"price\">{{purchase.price | currency: '$'}}</td>\n" +
    "				<td class=\"coupon-code\">{{purchase.couponCode}}</td>\n" +
    "				<td class=\"purchase-date\">{{purchase.purchaseDate | date: 'M/D/YY'}}</td>\n" +
    "			</tr>\n" +
    "		</tbody>\n" +
    "	</table>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/saved-coupons.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/coupon-tabs/templates/saved-coupons.tpl",
    "<div ng-controller=\"SavedCouponsCtrl\">\n" +
    "	<tab-heading data-track-component=\"'Saved Coupons'\">{{ tab.model.title }} ({{savedCouponsCount}})</tab-heading>\n" +
    "	<card ng-repeat=\"card in savedCoupons\" card-data=\"card\"></card>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketing.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketing.tpl",
    "<article ng-controller=\"MarketingCtrl\" class=\"component marketing-component\">\n" +
    "	<div ng-if=\"data.marketingItems.length > 0\">\n" +
    "		<component-header header-data=\"header\"></component-header>\n" +
    "\n" +
    "		<div class=\"component-content marketing-component\">\n" +
    "			<div ng-repeat=\"item in data.marketingItems\" data-track-component=\"item.clickTrackingSubcategory\">\n" +
    "				<i class=\"component-content-separator\"></i>\n" +
    "\n" +
    "				<div class=\"component-content-wrapper\">\n" +
    "\n" +
    "					<marketing-hero ng-if=\"item.hero.position === 'LEFT'\"></marketing-hero>\n" +
    "					<marketing-body item=\"item\" on-remove-self=\"removeItem\"></marketing-body>\n" +
    "					<marketing-hero ng-if=\"item.hero.position === 'RIGHT'\"></marketing-hero>\n" +
    "					\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</article>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCTA.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCTA.tpl",
    "<div class=\"marketing-cta\">\n" +
    "	<div class=\"marketing-cta-items\">\n" +
    "		<p ng-if=\"cta.text.length > 0\" class=\"marketing-cta-text\" ng-bind-html=\"cta.text\"></p>\n" +
    "		<div class=\"marketing-cta-wrapper\" ng-repeat=\"link in cta.links\">\n" +
    "			<div ng-if=\"link.type === 'image'\">\n" +
    "				<a ng-if=\"link.linkUrl.length > 0\" class=\"image-action\" href=\"#\" uv-href=\"{{link.linkUrl}}\" ng-attr-target=\"getLinkTarget(link.externalLink)\" data-track-component=\"'image'\" data-track-metadata=\"link.clickTrackingAction\">\n" +
    "					<img class=\"image-action-img\" ng-src=\"{{link.linkMetadata}}\" alt=\"{{link.linkAlt}}\" />\n" +
    "				</a>\n" +
    "				<img ng-if=\"link.linkUrl.length === 0\" class=\"image-action-img\" ng-src=\"{{link.linkMetadata}}\" alt=\"{{link.linkAlt}}\" />\n" +
    "			</div>\n" +
    "			<div ng-if=\"link.type === 'button'\">\n" +
    "				<uv-button class=\"morpheus\" ng-if=\"link.linkMetadata.length > 0\" url=\"link.linkUrl\" text=\"link.linkMetadata\" button-target=\"getLinkTarget(link.externalLink)\" data-track-component=\"'button'\" data-track-metadata=\"link.linkMetadata\"></uv-button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCountdown.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCountdown.tpl",
    "<section ng-controller=\"MarketingCountdownCtrl\">\n" +
    "	<article class=\"countdown-pre-event\" ng-if=\"isPreEvent()\">\n" +
    "		<h3 class=\"marketing-body-title\" ng-bind-html=\"item.body.countdown.preGame.title\"></h3>\n" +
    "		<marketing-countdown-timer class=\"countdown-timer\" expire-time=\"item.body.countdown.eventTimes.start\" on-expire=\"changeToDuringEvent\"></marketing-countdown-timer>\n" +
    "		<p class=\"marketing-body-description\" ng-if=\"item.body.countdown.preGame.description.length > 0\" ng-bind-html=\"item.body.countdown.preGame.description\"></p>\n" +
    "		<marketing-cta cta=\"item.body.countdown.preGame.cta\"></marketing-cta>\n" +
    "	</article>\n" +
    "	<article class=\"countdown-in-event\" ng-if=\"!isPreEvent()\">\n" +
    "		<h3 class=\"marketing-body-title\" ng-bind-html=\"item.body.countdown.inGame.title\"></h3>\n" +
    "		<div class=\"countdown-timer\" ng-bind-html=\"item.body.countdown.inGameCountdownText\"></div>\n" +
    "		<p class=\"marketing-body-description\" ng-if=\"item.body.countdown.inGame.description.length > 0\" ng-bind-html=\"item.body.countdown.inGame.description\"></p>\n" +
    "		<marketing-cta cta=\"item.body.countdown.inGame.cta\"></marketing-cta>\n" +
    "	</article>\n" +
    "</section>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCountdownTimer.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingCountdownTimer.tpl",
    "<div><span class=\"timer\">{{timeRemaining}}</span></div>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingFourByFour.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingFourByFour.tpl",
    "<h3 class=\"marketing-body-title\" ng-bind-html=\"item.body.title\"></h3>\n" +
    "<p class=\"marketing-body-description\" ng-if=\"item.body.description.length > 0\" ng-bind-html=\"item.body.description\"></p>\n" +
    "\n" +
    "<div class=\"marketing-four-by-four-wrapper\">\n" +
    "	<div class=\"marketing-four-by-four-items\" ng-repeat=\"el in item.body.fourByFour\">\n" +
    "		<span ng-if=\"el.count.length > 0\" class=\"count\" ng-bind-html=\"el.count\"></span>\n" +
    "		<span ng-if=\"el.gender.length > 0\" class=\"gender\" ng-bind-html=\"el.gender\"></span>\n" +
    "		<span ng-if=\"el.gameType.length > 0\" class=\"game-type\" ng-bind-html=\"el.gameType\"></span>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingHeroHtml.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingHeroHtml.tpl",
    "<div class=\"marketing-hero-html\" ng-bind-html=\"item.hero.html\"></div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingHeroImage.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingHeroImage.tpl",
    "<div class=\"marketing-hero-image\">\n" +
    "	<img src=\"\" alt=\"{{item.hero.alt}}\" ng-src=\"{{item.hero.path}}\" />\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingStandard.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/marketing/templates/marketingStandard.tpl",
    "<h3 class=\"marketing-body-title\" ng-bind-html=\"item.body.textTitle\"></h3>\n" +
    "<p class=\"marketing-body-description\" ng-if=\"item.body.description.length > 0\" ng-bind-html=\"item.body.description\"></p>\n" +
    "\n" +
    "<marketing-cta cta=\"item.body.cta\"></marketing-cta>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/package-addons/templates/package-addons.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/package-addons/templates/package-addons.tpl",
    "<section class=\"component package-addons\" ng-controller=\"PackageAddonsCtrl\" data-track-component=\"'Package Add-ons'\">\n" +
    "    <component-header header-data=\"header\"></component-header>\n" +
    "	<ul class=\"package-addon-list\">\n" +
    "		<li class=\"package-addon\" ng-repeat=\"packageAddon in packageAddons.items\" ng-class=\"{ checked: userHasAddon(packageAddon), 'first-column': isFirstColumn($index) }\">\n" +
    "			<span class=\"checkmark\"></span>\n" +
    "			<a-wrap if=\"!packageAddon.checked\" uv-target=\"packageAddon.external_link\" uv-href=\"{{ packageAddon.checked ? '' : packageAddon.overlay_button_url }}\"\n" +
    "				data-track-component=\"packageAddon.user_package\" data-track-metadata=\"packageAddon.overlay_button_text\">\n" +
    "				<div class=\"addon-logo-container\">\n" +
    "					<div class=\"addon-overlay\" ng-show=\"!packageAddon.checked\">\n" +
    "						<span class=\"overlay-link\">{{ packageAddon.overlay_button_text }}</span>\n" +
    "					</div>\n" +
    "					<img class=\"addon-logo-image\" ng-src=\"{{ packageAddon.image_path }}\" />\n" +
    "				</div>\n" +
    "			</a-wrap>\n" +
    "			<i class=\"separator\"></i>\n" +
    "			<span class=\"description-text\">{{ packageAddon.text_description }}</span>\n" +
    "			<a class=\"description-link\" uv-target=\"packageAddon.external_link\" uv-href=\"{{ packageAddon.link_url }}\" data-track-component=\"packageAddon.user_package\" data-track-metadata=\"$innerText\">\n" +
    "				{{ packageAddon.link_text }}\n" +
    "			</a>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</section>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/page-title/templates/page-title.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/page-title/templates/page-title.tpl",
    "<div ng-controller=\"PageTitleCtrl\" class=\"component page-title\">\n" +
    "	<h1 ng-bind-html=\"title\"></h1>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/sec-football-rush-tour-2014/templates/sec-football-rush-tour-2014.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/sec-football-rush-tour-2014/templates/sec-football-rush-tour-2014.tpl",
    "\n" +
    "<section class=\"component sec-football-rush-tour-2014\" ng-controller=\"SecFootballRushTour2014Ctrl\">\n" +
    "	<article\n" +
    "	class=\"sec-football-rush-tour-2014-wrapper\">\n" +
    "		<table class=\"table\" ng-repeat=\"month in months\">\n" +
    "			<tr>\n" +
    "				<th colspan=\"2\" ng-bind-html=\"month.name\"></th>\n" +
    "			</tr>\n" +
    "			<tr ng-repeat=\"row in month.rows\">\n" +
    "				<td ng-repeat=\"el in row\" ng-bind-html=\"el\"></td>\n" +
    "			</tr>\n" +
    "		</table>\n" +
    "	</article>\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/slide-component/templates/slide-component.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/slide-component/templates/slide-component.tpl",
    "\n" +
    "<section class=\"component slide-component\" ng-controller=\"SlideComponentCtrl\">\n" +
    "	<article\n" +
    "	class=\"slide-component-wrapper\" ng-class=\"{'right-alignment': !imageHasLeftAlignment}\" hover=\"onSlideComponentHover($event, hover)\">\n" +
    "		<ul class=\"slide-component-list\">\n" +
    "			<li class=\"slide-component-item\" slide-component ng-repeat=\"slide in slides\" ng-show=\"$index === currentSlideIndex\">\n" +
    "				<div class=\"slide-component-container\">\n" +
    "					<div class=\"image-container\">\n" +
    "						<img ng-src=\"{{ slide.imagePath }}\" alt=\"{{ slide.imageAlt }}\" />\n" +
    "					</div>\n" +
    "					<div class=\"text-container\">\n" +
    "						<div class=\"logo-container\" ng-if=\"slide.networkLogo\">\n" +
    "							<a-wrap if=\"slide.networkUrl\" class=\"logo-link\" uv-href=\"{{ slide.networkUrl }}\" target=\"{{ getLinkTarget(slide.networkLinkIsExternal) }}\" data-track-component=\"'Slide Component'\" data-track-metadata=\"slide.networkLogoAlt\">\n" +
    "								<img class=\"logo\" ng-src=\"{{ slide.networkLogo }}\" alt=\"{{ slide.networkLogoAlt }}\" />\n" +
    "							</a-wrap>\n" +
    "						</div>\n" +
    "						<div class=\"title-container\" ng-if=\"slide.title\">\n" +
    "							<a-wrap if=\"slide.titleUrl\" class=\"title-link\" uv-href=\"{{ slide.titleUrl }}\" target=\"{{ getLinkTarget(slide.titleLinkIsExternal) }}\" data-track-component=\"'Slide Component'\" data-track-metadata=\"slide.title\">\n" +
    "								<h2 class=\"title\" ng-bind-html=\"slide.title\"></h2>\n" +
    "							</a-wrap>\n" +
    "						</div>\n" +
    "						<div class=\"subtitle-container\" ng-if=\"slide.subtitle\">\n" +
    "							<a-wrap if=\"slide.subtitleUrl\" class=\"subtitle-link\" uv-href=\"{{ slide.subtitleUrl }}\" target=\"{{ getLinkTarget(slide.subtitleLinkIsExternal) }}\" data-track-component=\"'Slide Component'\" data-track-metadata=\"slide.subtitle\">\n" +
    "								<h3 class=\"subtitle\" ng-bind-html=\"slide.subtitle\"></h3>\n" +
    "							</a>\n" +
    "						</div>\n" +
    "						<span class=\"description\" ng-if=\"slide.description\" ng-bind-html=\"slide.description\"></span>\n" +
    "						<div class=\"link-container\" ng-if=\"slide.secondaryCtaText\">\n" +
    "							<a class=\"link\" uv-href=\"{{ slide.secondaryCtaUrl }}\" target=\"{{ getLinkTarget(slide.secondaryCtaLinkIsExternal) }}\" ng-bind-html=\"slide.secondaryCtaText\" data-track-component=\"'Slide Component'\" data-track-metadata=\"slide.secondaryCtaText\"></a>\n" +
    "						</div>\n" +
    "						<div class=\"button-container\" ng-if=\"slide.buttonText\">\n" +
    "							<uv-button\n" +
    "								ng-if=\"!isPlayLink(slide.buttonUrl)\"\n" +
    "								url=\"slide.buttonUrl\"\n" +
    "								text=\"slide.buttonText\"\n" +
    "								button-target=\"getLinkTarget(slide.buttonLinkIsExternal)\"\n" +
    "								data-track-component=\"'Slide Component'\"\n" +
    "								data-track-metadata=\"slide.buttonText\"></uv-button>\n" +
    "							<uv-button\n" +
    "								ng-if=\"isPlayLink(slide.buttonUrl)\"\n" +
    "								text=\"slide.buttonText\"\n" +
    "								data-track-component=\"'Slide Component'\"\n" +
    "								data-track-metadata=\"slide.buttonText\"\n" +
    "								ng-click=\"playVideo(slide.buttonUrl)\"></button>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "		\n" +
    "		<div ng-if=\"hasMoreThanOneSlide()\" class=\"pagination\">\n" +
    "			<ul class=\"pagination-wrap\">\n" +
    "				<li class=\"pagination-item-container\" ng-repeat=\"slide in slides\" ng-click=\"goToSelectedSlide($index)\" ng-class=\"{active: $index == currentSlideIndex}\" data-track-component=\"'Slide Component'\" data-track-metadata=\"'Slide Component pagination dots'\"><div class=\"pagination-item\"></div></li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-if=\"hasMoreThanOneSlide()\" ng-click=\"goToPreviousSlide()\" left-arrow data-track-component=\"'Slide Component'\" data-track-metadata=\"'Slide Component pagination arrow left'\">\n" +
    "		</div>\n" +
    "		\n" +
    "		<div ng-if=\"hasMoreThanOneSlide()\" ng-click=\"goToNextSlide()\" data-track-component=\"'Slide Component'\" right-arrow data-track-metadata=\"'Slide Component pagination arrow right'\">\n" +
    "		</div>\n" +
    "	</article>\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/tv-packages/templates/tv-packages.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/components/tv-packages/templates/tv-packages.tpl",
    "<section class=\"component tv-packages\" ng-controller=\"TVPackagesCtrl\" data-track-component=\"'TV Packages'\">\n" +
    "    <component-header header-data=\"header\"></component-header>\n" +
    "	<table class=\"tv-packages-table\">\n" +
    "\n" +
    "		<tr ng-repeat=\"tvPackage in tvPackages.items\" class=\"tv-package\" ng-class=\"{ checked: isUserPackage(tvPackage.package), last: $last }\">\n" +
    "			<td class=\"package-logo\">\n" +
    "				<div class=\"package-logo-container\">\n" +
    "					<a class=\"package-logo-link\" data-track-component=\"tvPackage.package\" data-track-metadata=\"tvPackage.logo.logo_link_text\" uv-href=\"{{ tvPackage.logo.logo_link_url }}\" target=\"{{ getTarget(tvPackage.logo.external_link) }}\">\n" +
    "						<span class=\"package-logo-image normal\" ng-style=\"{ backgroundImage: 'url(\\'{{tvPackage.logo.logo_image_path}}\\')'}\"></span>\n" +
    "						<span class=\"package-logo-image hover\" ng-style=\"{ backgroundImage: 'url(\\'{{tvPackage.logo.logo_image_hover}}\\')'}\"></span>\n" +
    "						<span class=\"package-logo-text\">{{ tvPackage.logo.logo_link_text }}</span>\n" +
    "					</a>\n" +
    "				</div>\n" +
    "			</td>\n" +
    "			<td class=\"metadata\" ng-class=\"{ 'first': $first, 'second': $index === 1, 'image-column': metadata.image_path }\" ng-repeat=\"metadata in tvPackage.metadata\">\n" +
    "				<div class=\"metadata-container\">\n" +
    "					<span class=\"metadata-header\">{{ metadata.header }}</span>\n" +
    "					<div class=\"metadata-content\" ng-if=\"metadata.text\">\n" +
    "						<span class=\"metadata-main-text\">{{ metadata.text.main_text }}</span>\n" +
    "						<span class=\"metadata-sub-text\">{{ metadata.text.sub_text }}</span>\n" +
    "						<a class=\"metadata-link\" data-track-component=\"tvPackage.package\" data-track-metadata=\"$innerText\" uv-href=\"{{ metadata.text.link_url }}\" ng-if=\"metadata.text.link_url\" target=\"{{ getTarget(metadata.text.external_link) }}\">\n" +
    "							{{ metadata.text.link_text }}\n" +
    "						</a>\n" +
    "					</div>\n" +
    "					<div class=\"metadata-logo-container\" ng-if=\"metadata.image_path\">\n" +
    "						<img class=\"metadata-network-logo\" ng-class=\"{ 'image-centered': !metadata.header }\" ng-src=\"{{ metadata.image_path }}\" alt=\"{{ metadata.image_alt_text }}\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</td>\n" +
    "		</tr>\n" +
    "	</table>\n" +
    "</section>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/tabs/templates/tab-heading.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/tabs/templates/tab-heading.tpl",
    "<li ng-class=\"{ active: active, disabled: disabled }\">\n" +
    "	<a ng-click=\"select()\" ng-transclude></a>\n" +
    "</li>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/tabs/templates/tabset.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/tabs/templates/tabset.tpl",
    "<div class=\"tabbable\">\n" +
    "	<ul class=\"nav nav-tabs\" tab-headings></ul>\n" +
    "	<div class=\"tab-content\">\n" +
    "		<tab class=\"tab-pane\"\n" +
    "			ng-repeat=\"tab in tabs\"\n" +
    "			tab=\"tab\"\n" +
    "			ng-class=\"{active: tab.active}\"\n" +
    "		>\n" +
    "		</tab>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/level-selector.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/level-selector.tpl",
    "<div class=\"parental-level-selector\"\n" +
    "     ng-mouseleave=\"changeDisplayLevel(currentLevel)\">\n" +
    "	<a class=\"parental-level-selector-icon parental-level-{{listLevel}}\"\n" +
    "		ng-repeat=\"listLevel in levels\"\n" +
    "		hover=\"changeDisplayLevel(listLevel, hover)\"\n" +
    "		ng-click=\"triggerChange(listLevel)\"\n" +
    "		ng-class=\"{active: isDisplayLevel(listLevel), highlighted: isLowerDisplayLevel($index), current: isCurrent(listLevel)}\"\n" +
    "		data-track-component=\"'Setting rating level'\"\n" +
    "		data-track-metadata=\"listLevel\"\n" +
    "		>\n" +
    "		<span class=\"parental-level-background\">\n" +
    "			<span class=\"parental-level-background-text\">{{ listLevel.capitalize() }}</span>\n" +
    "			<span class=\"parental-level-background-ticker\"></span>\n" +
    "		</span>\n" +
    "	</a>\n" +
    "\n" +
    "	<p class=\"parental-level-selector-description parental-page-description\" ng-bind-html=\"restrictionsMessage\"></p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/pin-input.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/pin-input.tpl",
    "<div class=\"parental-pin-input\">\n" +
    "	<input pin-input-field type=\"password\" step=\"1\" min=\"0\" max=\"9\" maxlength=\"1\" ng-repeat=\"pin in pins track by $index\"\n" +
    "		ng-model=\"pin.value\"\n" +
    "		ng-keydown=\"focusMovement($index, $event)\"\n" +
    "		ng-keypress=\"formatInputAndFocusNext($index, $event)\"\n" +
    "		ng-keyup=\"submitIfValid()\"\n" +
    "		data-track-metadata=\"'Submit'\" />\n" +
    "</div>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/settings.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/common-modules/parental-controls/templates/settings.tpl",
    "<div class='new-parental-controls-settings' data-track-component=\"'Parental Controls modal'\" ng-controller='SettingsCtrl'>\n" +
    "	<div class='parental-controls-message' ng-class='{error: message.isError}' ng-show='message.visible'>\n" +
    "		{{message.text}}\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"parental-controls-section\" ng-controller='CreatePinCtrl' ng-switch='status.step' ng-if='isCurrentView(\"CREATE_PIN\")'>\n" +
    "\n" +
    "		<div ng-switch-when='0'>\n" +
    "			<h3 class='parental-page-title'>Current viewing level</h3>\n" +
    "			<level-selector change='setNewLevel(val)' level='data.newLevel' current-level='{{ currentLevel }}'></level-selector>\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-switch-when='1'>\n" +
    "			<h3 class='parental-page-title'>\n" +
    "				<strong>Create a 4-digit PIN*</strong><br/>to apply your settings\n" +
    "			</h3>\n" +
    "			<pin-input change='setNewPin(val)' pin='data.newPin' data-track-component=\"getTrackComponentOfCurrentView()\"></pin-input>\n" +
    "			<p class='parental-page-description'>*PIN applicable to uverse.com only</p>\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-switch-when='2'>\n" +
    "			<h3 class='parental-page-title'><strong>Confirm</strong> your new PIN</h3>\n" +
    "			<pin-input change='setPinConfirmation(val)' pin='data.newPinConfirmation' data-track-component=\"getTrackComponentOfCurrentView()\"></pin-input>\n" +
    "			<p class='parental-page-description'></p>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<div class=\"parental-controls-section\" ng-controller='ChangeLevelCtrl' ng-switch='status.step' ng-if='isCurrentView(\"CHANGE_LEVEL\")'>\n" +
    "\n" +
    "		<div ng-switch-when='0'>\n" +
    "			<h3 class='parental-page-title'>Current viewing level</h3>\n" +
    "			<level-selector change='setNewLevel(val)' level='data.newLevel' current-level='{{ currentLevel }}'></level-selector>\n" +
    "			<a class='parental-change-pin-button' ng-click='changeMode(\"CHANGE_PIN\")' data-track-component=\"getTrackComponentOfCurrentView()\" data-track-metadata=\"$innerText\">Change PIN</a>\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-switch-when='1'>\n" +
    "			<h3 class='parental-page-title'>Enter your PIN</h3>\n" +
    "			<pin-input change='setNewPin(val)' pin='data.newPin' data-track-component=\"getTrackComponentOfCurrentView()\"></pin-input>\n" +
    "			<p class='parental-page-description'></p>\n" +
    "			<a class=\"parental-forgot-pin\" ng-click=\"emailPin()\" data-track-component=\"getTrackComponentOfCurrentView()\" data-track-metadata=\"$innerText\">Forgot PIN?</a>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<div class=\"parental-controls-section\" ng-controller='ChangePinCtrl' ng-switch='status.step' ng-if='isCurrentView(\"CHANGE_PIN\")'>\n" +
    "\n" +
    "		<div ng-switch-when='1'>\n" +
    "			<h3 class='parental-page-title'>Enter your current PIN</h3>\n" +
    "			<pin-input change='checkCurrentPin(val)' pin='data.currentPin' data-track-component=\"getTrackComponentOfCurrentView()\"></pin-input>\n" +
    "			<p class='parental-page-description'></p>\n" +
    "			<a class=\"parental-forgot-pin\" ng-click=\"emailPin()\" data-track-component=\"getTrackComponentOfCurrentView()\" data-track-metadata=\"$innerText\">Forgot PIN?</a>\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-switch-when='2'>\n" +
    "			<h3 class='parental-page-title'>Create a new PIN*</h3>\n" +
    "			<pin-input change='goToConfirmPin(val)' pin='data.newPin' data-track-component=\"getTrackComponentOfCurrentView()\"></pin-input>\n" +
    "			<p class='parental-page-description'>*PIN applicable to uverse.com only</p>\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-switch-when='3'>\n" +
    "			<h3 class='parental-page-title'><strong>Confirm</strong> your new PIN</h3>\n" +
    "			<pin-input change='submitPinChange(val)' pin='data.newPinConfirmation' data-track-component=\"getTrackComponentOfCurrentView()\"></pin-input>\n" +
    "			<p class='parental-page-description'></p>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<a class=\"parental-back\" ng-click=\"previousStep()\" ng-show=\"status.step > 0\" data-track-component=\"getTrackComponentOfCurrentView()\" data-track-metadata=\"$innerText\">Back</a>\n" +
    "</div>  \n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/card-badge.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/card-badge.tpl",
    "\n" +
    "<div class=\"badge\">\n" +
    "    <span class=\"badge-wrapper\" ng-if=\"cardData.cardType !== 'music' && cardData.fullCount > 0\">\n" +
    "        <span ng-if=\"badgeState === 'FREE'\">\n" +
    "           <span class=\"badge-text free\">FREE</span>\n" +
    "           <span class=\"badge-slant free-slant\"></span>\n" +
    "        </span>\n" +
    "\n" +
    "        <span ng-if=\"badgeState === 'WATCH'\">\n" +
    "            <span class=\"badge-text watch\">WATCH</span>\n" +
    "            <span class=\"badge-slant watch-slant\"></span>\n" +
    "        </span>\n" +
    "\n" +
    "        <span ng-if=\"badgeState === 'NEW'\">\n" +
    "            <span class=\"badge-text new\">NEW</span>\n" +
    "            <span class=\"badge-slant new-slant\"></span>\n" +
    "        </span>\n" +
    "\n" +
    "        <!--<span ng-if=\"badgeState === 'OFF-AIR'\">\n" +
    "            <span class=\"badge-text off-air\">OFF-AIR</span>\n" +
    "            <span class=\"badge-slant off-air-slant\"></span>\n" +
    "        </span>-->\n" +
    "\n" +
    "        <!--<span ng-if=\"badgeState === 'LIVE'\">\n" +
    "            <span class=\"badge-text live\">LIVE</span>\n" +
    "            <span class=\"badge-slant live-slant\"></span>\n" +
    "        </span>-->\n" +
    "    </span>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/card-wrapper.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/card-wrapper.tpl",
    "<div\n" +
    "	class=\"card-wrapper\"\n" +
    "	hover=\"setHovered($event, hover)\"\n" +
    "	is-hovered=\"isHovered\"\n" +
    "	data-track-component=\"'Card'\"\n" +
    "	data-track-metadata=\"card.title\">\n" +
    "	<div ng-include=\"template\"></div>\n" +
    "    <card-badge></card-badge>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/category-card.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/category-card.tpl",
    "<section class=\"card category-card\" ng-class=\"{ 'image-thumbnail': cardData.categoryImageType == 'thumbnail' }\">\n" +
    "	<div class=\"movie-card\" ng-if=\"cardData.contentType == contentTypes.movies\" ng-include=\"jsSrc + 'uv/cards/templates/movie-card.tpl'\"></div>\n" +
    "	<div class=\"music-card\" ng-if=\"cardData.contentType == contentTypes.music\" ng-include=\"jsSrc + 'uv/cards/templates/music-card.tpl'\"></div>\n" +
    "	<div class=\"tv-card\" ng-if=\"cardData.contentType == contentTypes.tv\" ng-include=\"jsSrc + 'uv/cards/templates/tv-card.tpl'\"></div>\n" +
    "</section>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/coupon-card.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/coupon-card.tpl",
    "<section class=\"card coupon-card\">\n" +
    "	<header class=\"card-image-wrapper image-size-poster\">\n" +
    "		<img class=\"card-image\" ng-src=\"{{cardData.imagePath}}\" alt=\"{{cardData.title}}\" />\n" +
    "	</header>\n" +
    "	<article class=\"metadata\">\n" +
    "		<span class=\"availability\">Coupon Available {{ [ cardData.startDate, cardData.endDate ] | datespan }}</span>\n" +
    "		<span class=\"discount\">{{cardData.discount}}</span>\n" +
    "		<span>CODE: <strong>{{cardData.code}}</strong></span>\n" +
    "	</article>\n" +
    "</section>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/landscape-video-card.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/landscape-video-card.tpl",
    "<section class=\"card landscape-video-card\">\n" +
    "	<header class=\"card-image-wrapper image-size-thumbnail\">\n" +
    "		<img class=\"card-image image-size-thumbnail\" ng-src=\"{{cardData.imageUrl}}\" alt=\"{{cardData.title}}\" />\n" +
    "		<a ng-if=\"isEntitled() && cardData.playLink\" class=\"card-image-overlay play\" ng-click=\"playVideo(cardData.playLink)\" data-track-component=\"'Play'\" data-track-metadata=\"cardData.title\"></a>\n" +
    "		<div ng-if=\"!isEntitled()\" class=\"card-image-overlay locked\"></div>\n" +
    "	</header>\n" +
    "	<article class=\"metadata single-line-ellipsis\">\n" +
    "		{{cardData.title}}\n" +
    "	</article>\n" +
    "</section>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/movie-card.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/movie-card.tpl",
    "<header class=\"card-image-wrapper\">\n" +
    "	<a uv-href=\"{{ cardData.categoryUrl }}\">\n" +
    "		<img class=\"card-image\" ng-src=\"{{ cardData.categoryImageUrl }}\" alt=\"{{ cardData.categoryImageAltText }}\" />\n" +
    "	</a>\n" +
    "</header>\n" +
    "<article class=\"metadata\">\n" +
    "	<h3 class=\"show-name single-line-ellipsis\" ng-if=\"cardData.categoryImageType == 'thumbnail'\"><a uv-href=\"{{ cardData.categoryUrl }}\">{{ cardData.categoryTitle }}</a></h3>\n" +
    "	<p class=\"video-count\">\n" +
    "		<span ng-if=\"!cardData.fullCount && cardData.clipCount === 1\">Trailer</span>\n" +
    "		<span ng-if=\"cardData.fullCount\">Movie<span ng-if=\"cardData.clipCount === 1\">, trailer</span><span ng-if=\"cardData.clipCount > 1\">, {{ cardData.clipCount }} clips</span></span>\n" +
    "		<span ng-if=\"!cardData.fullCount && cardData.clipCount > 1\">{{ cardData.clipCount}} clips</span>\n" +
    "	</p>\n" +
    "	<p class=\"network-rating\">\n" +
    "		<a uv-href=\"{{ cardData.networkUrl }}\" class=\"network-link\">{{ cardData.networkName }}</a>\n" +
    "		<span class=\"asset-rating\">{{ cardData.assetRating }}</span>\n" +
    "		<span ng-show=\"cardData.hasHd\">HD</span>\n" +
    "	</p>\n" +
    "</article>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/music-card.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/music-card.tpl",
    "<header class=\"card-image-wrapper\">\n" +
    "	<a uv-href=\"{{ cardData.categoryUrl }}\">\n" +
    "		<img class=\"card-image\" ng-src=\"{{ cardData.categoryImageUrl }}\" alt=\"{{ cardData.categoryImageAltText }}\" />\n" +
    "	</a>\n" +
    "</header>\n" +
    "<article class=\"metadata\">\n" +
    "	<h3 class=\"artist-name single-line-ellipsis\"><a uv-href=\"{{ cardData.categoryUrl }}\">{{ cardData.categoryTitle }}</a></h3>\n" +
    "	<p class=\"video-count\">{{ cardData.fullCount }} music {{ cardData.fullCount | choice:\"video\":\"videos\" }}</p>\n" +
    "</article>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/tv-card.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/cards/templates/tv-card.tpl",
    "<header class=\"card-image-wrapper\">\n" +
    "	<a uv-href=\"{{ cardData.categoryUrl }}\">\n" +
    "		<img class=\"card-image\" ng-src=\"{{ cardData.categoryImageUrl }}\" alt=\"{{ cardData.categoryImageAltText }}\" />\n" +
    "	</a>\n" +
    "</header>\n" +
    "<article class=\"metadata\">\n" +
    "	<h3 class=\"show-name single-line-ellipsis\" ng-if=\"cardData.categoryImageType == 'thumbnail'\"><a uv-href=\"{{ cardData.categoryUrl }}\">{{ cardData.categoryTitle }}</a></h3>\n" +
    "	<p class=\"video-count\">\n" +
    "		<span ng-if=\"cardData.seasonCount > 0 && cardData.fullCount > 0\">{{ cardData.seasonCount }} {{ cardData.seasonCount | choice:\"season\":\"seasons\" }}, </span>\n" +
    "		<span ng-if=\"cardData.fullCount > 0\">{{ cardData.fullCount }} {{ cardData.fullCount | choice:\"episode\":\"episodes\" }}</span>\n" +
    "		<span ng-if=\"cardData.fullCount == 0 && cardData.clipCount > 0\">\n" +
    "			<span ng-if=\"cardData.clipCount > 1\">{{ cardData.clipCount }}</span>\n" +
    "			{{ cardData.clipCount | choice:\"Clip\":\"clips\" }}\n" +
    "		</span>\n" +
    "	</p>\n" +
    "	<p class=\"network-rating\">\n" +
    "		<a uv-href=\"{{ cardData.networkUrl }}\" class=\"network-link\">{{ cardData.networkName }}</a>\n" +
    "		<span class=\"asset-rating\">{{ cardData.assetRating }}</span>\n" +
    "		<span ng-show=\"cardData.hasHd\">HD</span>\n" +
    "	</p>\n" +
    "</article>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/bookmark.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/bookmark.tpl",
    "<figure class=\"card-details-bookmark-bar\">\n" +
    "    <figcaption class=\"card-details-bookmark-bar-thumb\" ng-attr-style=\"width:{{bookmarkProgress}}\"></figcaption>\n" +
    "</figure>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/entitlementFooter.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/entitlementFooter.tpl",
    "<footer class=\"entitlement-footer {{ entitlementClass }}\" ng-controller=\"FlyoutFooterCtrl\">\n" +
    "	<div class=\"lock-icon\"></div>\n" +
    "	<div class=\"error-message\" ng-bind-html=\"entitlementMessage\"></div>\n" +
    "</footer>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/favorite.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/favorite.tpl",
    "<span class=\"flyout-favorite\" ng-class=\"{active:isFavorited}\"\n" +
    "    data-clicktrack-action=\"{{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}}\"\n" +
    "    data-track-metadata=\"{{flyout.data.categoryUrl}}\"\n" +
    "    ng-attr-title=\"{{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}}\"\n" +
    "    ng-click=\"toggleFavorite(isFavorited)\">\n" +
    "</span>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/header.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/header.tpl",
    "<header class=\"flyout-header\">\n" +
    "	<h2 ng-if=\"!flyoutUrl\" class=\"flyout-title\" title=\"{{ flyoutTitle }}\">{{ flyoutTitle }}</h2>\n" +
    "	<a ng-if=\"flyoutUrl\" class=\"flyout-title\" data-track-component=\"'Header Title'\" data-track-metadata=\"flyoutTitle\" uv-href=\"{{ flyoutUrl }}\" title=\"{{ flyoutTitle }}\">{{ flyoutTitle }}</a>\n" +
    "	<div ng-transclude></div>\n" +
    "</header>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/rentalFooter.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/rentalFooter.tpl",
    "<footer class=\"rental-footer\" ng-controller=\"RentalFooterCtrl\">\n" +
    "	<uv-button\n" +
    "		class=\"rental-button\"\n" +
    "		url=\"orderLink\"\n" +
    "		button-target=\"'_blank'\"\n" +
    "		data-track-component=\"'How To Order'\"\n" +
    "		data-track-metadata=\"flyout.data.categoryTitle\"\n" +
    "		text=\"'How To Order'\">\n" +
    "	</uv-button>\n" +
    "	<div class=\"flyout-rental-metadata\" ng-switch=\"flyout.data.rentalPeriod\">\n" +
    "		<span ng-switch-when=\"1_day\">1 Day Rental</span>\n" +
    "		<span ng-switch-when=\"2_days\">2 Day Rental</span>\n" +
    "		<span ng-switch-when=\"3_days\">3 Day Rental</span>\n" +
    "	</div>\n" +
    "	<ul class=\"flyout-rental-pricing\">\n" +
    "		<li ng-if=\"flyout.data.price3D\"><span class=\"rental-format\">3D</span> {{ flyout.data.price3D | price }}</li>\n" +
    "		<li ng-if=\"flyout.data.priceHD\"><span class=\"rental-format\">HD</span> {{ flyout.data.priceHD | price }}</li>\n" +
    "		<li ng-if=\"flyout.data.priceSD && !(flyout.data.priceHD && flyout.data.price3D)\"><span class=\"rental-format\">SD</span> {{ flyout.data.priceSD | price }}</li>\n" +
    "	</ul>\n" +
    "</footer>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/thumbnail.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/flyout-components/templates/thumbnail.tpl",
    "<div class=\"flyout-thumbnail\">\n" +
    "	<div class=\"flyout-thumb-wrapper\">\n" +
    "		<a ng-click=\"playVideo(thumbnail.playUrl)\"\n" +
    "		   data-track-component=\"'Thumbnail'\"\n" +
    "		   data-track-metadata=\"flyout.data.categoryTitle\"\n" +
    "		   target=\"_self\"\n" +
    "		   class=\"flyout-play-thumb-overlay\"></a>\n" +
    "		<img class=\"flyout-thumb\" ng-src=\"{{ thumbnail.imgSrc }}\" />\n" +
    "        <div ng-if=\"hasBookmark\" ng-include=\"jsSrc + 'uv/flyouts/flyout-components/templates/bookmark.tpl'\"></div>\n" +
    "	</div>\n" +
    "	<button ng-repeat=\"button in buttons\"\n" +
    "			data-track-component=\"button.text\"\n" +
    "			data-track-metadata=\"flyout.data.categoryTitle\"\n" +
    "			ng-click=\"playVideo(button.playUrl)\"\n" +
    "			class=\"button blue\">{{ button.text }}</button>\n" +
    "	<span ng-if=\"flyout.data.contentType === contentTypes.rental\" class=\"flyout-rent\">Rent on your TV</span>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/cardFlyout.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/cardFlyout.tpl",
    "<div class=\"snes-card-flyout {{flyout.data.contentType}}\" hover=\"flyoutHovered($event, hover)\" ng-class=\"{ open: flyout.isOpen }\" ng-controller=\"CardFlyoutCtrl\">\n" +
    "	<div ng-transclude></div>\n" +
    "	<div class=\"flyout-arrow\" ng-class=\"{ right: flyout.side == 'left' }\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/category.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/category.tpl",
    "<card-flyout ellipsify-parent>\n" +
    "	<div class=\"inner-flyout category-flyout\" ng-class=\"{ 'music': flyout.data.contentType === contentTypes.music, 'no-clip': (!thumbnail || !buttons) }\"\n" +
    "         ng-controller=\"CategoryCtrl\"\n" +
    "         data-track-component=\"'Category Flyout'\">\n" +
    "		<flyout-header flyout-title=\"{{ flyout.data.categoryTitle }}\" flyout-url=\"{{ flyout.data.categoryUrl }}\">\n" +
    "            <div ng-controller=\"FlyoutFavoriteCtrl\" ng-if=\"showFavorite\" ng-include=\"jsSrc + 'uv/flyouts/flyout-components/templates/favorite.tpl'\"></div>\n" +
    "		</flyout-header>\n" +
    "		<article class=\"flyout-article\">\n" +
    "            <div ng-if=\"flyout.data.contentType === contentTypes.music\" ng-include=\"jsSrc + 'uv/flyouts/templates/music.tpl'\" class=\"flyout-music\"></div>\n" +
    "			<div ng-if=\"flyout.data.contentType !== contentTypes.music\" >\n" +
    "                <div ng-if=\"thumbnail && buttons\" ng-include=\"jsSrc + 'uv/flyouts/flyout-components/templates/thumbnail.tpl'\" class=\"flyout-left\"></div>\n" +
    "                <div class=\"flyout-right\">\n" +
    "                	<div ng-if=\"flyout.data.contentType === contentTypes.tv\">\n" +
    "						<span ng-if=\"hasEntitledFullContent\" class=\"flyout-latest-episode\">Latest Episode</span>\n" +
    "						<h3 ng-if=\"hasEntitledFullContent\" class=\"flyout-subtitle\">{{flyout.data.flyoutTitle}}</h3>\n" +
    "						<div class=\"flyout-episode-metadata\" ng-if=\"flyout.data.assetSeasonNumber && flyout.data.assetEpisodeNumber\">\n" +
    "							<span>Season {{flyout.data.assetSeasonNumber}} Episode {{flyout.data.assetEpisodeNumber}}</span>\n" +
    "							<span ng-if=\"flyout.data.assetDuration\">({{ flyout.data.assetDuration | cardDuration:'hh:mm:ss' }})</span>\n" +
    "						</div>\n" +
    "                	</div>\n" +
    "                    <div ng-if=\"flyout.data.flyoutDescription\" class=\"flyout-description\" ellipsify=\"{{ flyout.data.flyoutDescription }}\" is-expanded=\"isExpanded\">\n" +
    "                        <span ellipsify-expand>... <a data-track-component=\"'Description'\" data-track-metadata=\"flyout.data.categoryTitle\" class=\"show-more\">more</a></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"category-metadata\">\n" +
    "       					<p ng-if=\"flyout.data.contentType === contentTypes.tv && hasEntitledFullContent\">\n" +
    "							<span ng-if=\"flyout.data.assetReleaseDate\">Aired {{flyout.data.assetReleaseDate| date:'ddd MMM D, YYYY'}}</span>\n" +
    "						</p>\n" +
    "                        <p ng-if=\"flyout.data.contentType === contentTypes.movies\">\n" +
    "                            <span ng-if=\"flyout.data.assetDuration > 0\">{{ flyout.data.assetDuration | cardDuration:'m' }} Minutes</span><span ng-if=\"flyout.data.assetDuration > 0 && flyout.data.assetReleaseDate > 0\">, </span>\n" +
    "                            <span ng-if=\"flyout.data.assetReleaseDate > 0\">Released {{flyout.data.assetReleaseDate| date:'YYYY'}}</span>\n" +
    "                        </p>\n" +
    "                        <p ng-if=\"flyout.data.assetGenres.length > 0\">\n" +
    "                            <span ng-repeat=\"genre in flyout.data.assetGenres\">{{ genre }}<span ng-if=\"!$last\">, </span></span>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "		</article>\n" +
    "		<footer ng-if=\"flyout.data.entitlementLevel\" ng-include=\"jsSrc + 'uv/flyouts/flyout-components/templates/entitlementFooter.tpl'\"></footer>\n" +
    "		<footer ng-if=\"flyout.data.contentType === contentTypes.rental\" ng-include=\"jsSrc + 'uv/flyouts/flyout-components/templates/rentalFooter.tpl'\"></footer>\n" +
    "	</div>\n" +
    "</card-flyout>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/coupon.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/coupon.tpl",
    "<card-flyout ellipsify-parent>\n" +
    "	<div class=\"inner-flyout\" ng-controller=\"CouponCtrl\" data-track-component=\"'Coupon Flyout'\">\n" +
    "		<flyout-header flyout-title=\"{{ flyout.data.categoryTitle }}\" flyout-url=\"{{ flyout.data.categoryUrl }}\">\n" +
    "			<a class=\"save-coupon\"\n" +
    "			   ng-show=\"isUverseUser && !isCouponSaved\"\n" +
    "			   data-track-component=\"'Save Coupon'\"\n" +
    "			   data-track-metadata=\"flyout.data.categoryTitle\"\n" +
    "			   ng-click=\"saveCoupon()\">Save Coupon</a>\n" +
    "			<div class=\"coupon-saved\" ng-show=\"isCouponSaved\"><i class=\"checkmark\"></i> Saved</div>\n" +
    "		</flyout-header>\n" +
    "		<article class=\"flyout-article\">\n" +
    "			<div ng-if=\"thumbnail && buttons\" ng-include=\"jsSrc + 'uv/flyouts/flyout-components/templates/thumbnail.tpl'\" class=\"flyout-left\"></div>\n" +
    "			<div class=\"flyout-right\">\n" +
    "				<div class=\"coupon-duration\">{{ flyout.data.promoTitle }}</div>\n" +
    "				<div class=\"flyout-description\" ellipsify=\"{{ flyout.data.flyoutDescription }}\" is-expanded=\"isExpanded\">\n" +
    "					<span ellipsify-expand>... <a data-track-component=\"'Description'\" data-track-metadata=\"flyout.data.categoryTitle\" class=\"show-more\">more</a></span>\n" +
    "				</div>\n" +
    "				<div class=\"coupon-metadata\">\n" +
    "					<p ng-if=\"flyout.data.assetGenres.length > 0\">\n" +
    "						<span ng-repeat=\"genre in flyout.data.assetGenres\">{{ genre }}<span ng-if=\"!$last\">, </span></span>\n" +
    "					</p>\n" +
    "					<p>{{ flyout.data.assetRating }}</p>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</article>\n" +
    "		<footer class=\"flyout-coupon-footer\">\n" +
    "			<div class=\"price-information\">\n" +
    "				<div class=\"promo-text\">{{ flyout.data.promoText }}</div>\n" +
    "				<div class=\"price\" ng-if=\"flyout.data.price3d\">\n" +
    "					<div class=\"dollars\">{{ flyout.data.price3d }}</div>\n" +
    "					<div class=\"quality\">(3D)</div>\n" +
    "				</div>\n" +
    "				<div class=\"price\" ng-if=\"flyout.data.pricehd\">\n" +
    "					<div class=\"dollars\">{{ flyout.data.pricehd }}</div>\n" +
    "					<div class=\"quality\">(HD)</div>\n" +
    "				</div>\n" +
    "				<div class=\"price\" ng-if=\"flyout.data.pricesd\">\n" +
    "					<div class=\"dollars\">{{ flyout.data.pricesd }}</div>\n" +
    "					<div class=\"quality\">(SD)</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<a class=\"button blue redeem\"\n" +
    "			   data-track-component=\"'Reedem Coupon'\"\n" +
    "			   data-track-metadata=\"flyout.data.categoryTitle\"\n" +
    "			   uv-href=\"{{ flyout.data.redeemUrl }}\"\n" +
    "			   target=\"_blank\">How To Redeem</a>\n" +
    "		</footer>\n" +
    "	</div>\n" +
    "</card-flyout>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/music.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/music.tpl",
    "<div class=\"flyout-large-thumbnail\">\n" +
    "    <div class=\"flyout-large-thumb-wrapper\">\n" +
    "        <a ng-click=\"playVideo(thumbnail.playUrl)\"\n" +
    "           data-track-component=\"'Thumbnail'\"\n" +
    "           data-track-metadata=\"flyout.data.categoryTitle\"\n" +
    "           target=\"_self\"\n" +
    "           class=\"flyout-play-large-thumb-overlay\"></a>\n" +
    "        <img class=\"flyout-large-thumb\" ng-src=\"{{ thumbnail.imgSrc }}\" />\n" +
    "    </div>\n" +
    "</div>\n" +
    "<h3 class=\"category-video-subtitle\">\n" +
    "    <span ng-attr-title=\"{{flyout.data.flyoutTitle}}\" class=\"music-title single-line-ellipsis\">{{ flyout.data.flyoutTitle }}</span>\n" +
    "    <span class=\"duration\">({{ flyout.data.assetDuration | cardDuration:'hh:mm:ss' }})</span>\n" +
    "</h3>\n" +
    "<div class=\"category-metadata\">\n" +
    "    <p ng-if=\"flyout.data.assetGenres.length > 0\">\n" +
    "        <span ng-repeat=\"genre in flyout.data.assetGenres\">{{ genre }}<span ng-if=\"!$last\">, </span></span>\n" +
    "    </p>\n" +
    "</div>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/toolTip.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/flyouts/templates/toolTip.tpl",
    "<card-flyout class=\"tool-tip-flyout\" ellipsify-parent>\n" +
    "    <flyout-header flyout-title=\"{{flyout.data.title}}\" flyout-url=\"{{flyout.data.link.linkUrl}}\">\n" +
    "        <a data-track-component=\"'ToolTip'\" data-track-metadata=\"flyout.data.title\"></a>\n" +
    "    </flyout-header>\n" +
    "    <article class=\"flyout-article\">\n" +
    "        <div class=\"flyout-description\" ellipsify=\"{{ flyout.data.toolTipText }}\" is-expanded=\"isExpanded\">\n" +
    "            <span ellipsify-expand>... <a data-track-component=\"'ToolTipText'\" data-track-metadata=\"flyout.data.toolTipText\" class=\"show-more\">more</a></span>\n" +
    "        </div>\n" +
    "    </article>\n" +
    "</card-flyout>");
}]);

angular.module("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/templates/carousel.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/TEAMSITE/DEVELOPMENT/web_files/snes/javascripts/src/uv/templates/carousel.tpl",
    "<div class=\"carousel-container\">\n" +
    "	<carousel-button direction=\"left\" ng-show=\"canMoveLeft\"><i left-arrow></i></carousel-button>\n" +
    "	<carousel-button direction=\"right\" ng-show=\"canMoveRight\"><i right-arrow></i></carousel-button>\n" +
    "	<carousel-content></carousel-content>\n" +
    "</div>");
}]);
