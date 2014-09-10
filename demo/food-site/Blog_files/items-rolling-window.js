// vim: set ts=8 sts=8 sw=8 noet:
/*
 * Copyright (c) 2006-2012 Echo <solutions@aboutecho.com>. All rights reserved.
 * You may copy and modify this script as long as the above copyright notice,
 * this condition and the following disclaimer is left intact.
 * This software is provided by the author "AS IS" and no warranties are
 * implied, including fitness for a particular purpose. In no event shall
 * the author be liable for any damages arising in any way out of the use
 * of this software, even if advised of the possibility of such damage.
 * Version: v2.6.34
 */

(function($) {

var plugin = Echo.createPlugin({
	"name": "ItemsRollingWindow",
	"applications": ["Stream"],
	"init": function(plugin, application) {
		application.subscribe("Stream.Item.onRender", function(topic, args) {
			if (application.isRootItem(application.items[args.item.data.unique])) {
				var maxCount = plugin.get(application, "maxCount");
				var rest = application.threads.slice(maxCount);
				$.map(rest, function(item) {
					if (!item.dom || !item.dom.content) return;
					application.deleteItemSpotUpdate(item);
					application.applyStructureUpdates("delete", item);
				});
				if (plugin.config.get(application, "moreButton") && rest.length) {
					application.isViewComplete = false;
					plugin.updateNextPageAfter(application);
					if (application.dom.get("more").is(":hidden")) {
						application.rerender("more");
					}
				}
			}
		});
		application.subscribe("Stream.onRerender", function() {
			plugin.setMaxCount(application);
		});
		application.subscribe("Stream.onDataReceive", function(topic, args) {
			if (args.type === "children") return;
			plugin.setMaxCount(application, !args.initial);
		});
		plugin.extendRenderer("Stream", "more", function(element) {
			var application = this;
			if (!plugin.config.get(application, "moreButton")) {
				element.empty().hide();
				return;
			}
			application.parentRenderer("more", arguments);
		});
	}
});

plugin.setMaxCount = function(application, incremental) {
	var maxCount = parseInt(application.config.get("itemsPerPage"));
	if (incremental) {
		maxCount += plugin.get(application, "maxCount");
	}
	plugin.set(application, "maxCount", maxCount);
};

plugin.updateNextPageAfter = function(application) {
	var lastItem = application.threads[application.threads.length - 1];
	if (lastItem.data.pageAfter) {
		application.nextPageAfter = lastItem.data.pageAfter;
	}
};

})(jQuery);

