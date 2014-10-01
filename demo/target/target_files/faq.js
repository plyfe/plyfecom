/**
 * @Target.ca FAQ
 * @Logic created for the FAQ page functionality.
 * @author paul.placido@target.com, stuart.milsten@target.com
 */

TargetCA.faq = {
	init: function() {
		//runs namespace only when on the correct page
		var location = TargetCA.helpers.getUriLocation();
		if (location == 'faq') {
			this.setup();
		}
	},
	setup: function() {
		if ($("#filterTopic").length == 0) return false;
		var hash = TargetCA.helpers.getHash();
		if (hash != "all" && hash != "") {
			$(".faqCategory").each(function(index, value) {
				if ($(value).attr("id") != hash) {
					$(value).hide();
				}
			});
			$("#filterTopic select").val(hash);
		}

		$("#filterTopic select").bind('change blur', function() {
			var selectedValue = $(this).val();
			if ($(this).val() == "all") {
				$( ".faqCategory" ).show();
			} else {
				$(".faqCategory").each(function(index, value) {
					if ($(value).attr("id") != selectedValue) {
						$(value).hide();
					} else {
						$(value).show();
					}
				});
			}
		});
	} // End setup function
} // End faq namespace