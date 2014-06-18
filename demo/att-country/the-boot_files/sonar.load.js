(function($, window){
	var sonar = {
		init : function(){

			$('.sonar_facebook_app')
				.bind(
				'scrollin',
				{ distance:400 },
				function(e){
					var holder  	= $(e.target),
						type    	= holder.attr('data-app-type'),
						dataset 	= e.target.attributes,
						fbApp   	= $('<fb:'+type+'></fb:'+type+'>'),
						attrNames 	= [];
					holder.removeAttr('data-app-type').removeClass('sonar_facebook_app').unbind('scrollin');
					$.each(dataset, function(key, object){
						if(object.name != 'class') {
							var attribute = object.name
								.replace(/data\-/g, '')
								.replace(/\-/g, '_');
							fbApp.attr(attribute, object.value);
							attrNames.push(object.name);
						}
					});
					// Clean up wrapper
					$.each(attrNames, function(index, value){ holder.removeAttr(''+value+''); });
					holder.append(fbApp);
					FB.XFBML.parse(holder.get(0), function(){
						if(type == 'comments-count') {
							var count = parseInt(holder.find('.fb_comments_count').text());
							if(count > 0){
								holder.removeClass('comment-count-zero').addClass('comment-count');
							}
						}
					});
				}
			);


			$('.sonar_image')
				.bind(
				'scrollin',
				{ distance:400 },
				function(e){
					var image = $(e.target),
						source = image.attr('datasrc');
					image.attr(
						{
							src     : source,
							sonar   : 'true'
						}
					)
						.removeAttr('datasrc')
						.unbind('scrollin');
				}
			);

			$('.sonar_stumble')
				.bind(
				'scrollin',
				{ distance:400 },
				function(e){
					var iframe = $(e.target),
						source = iframe.attr('data-src');
					iframe.attr(
						{
							src     : source,
							sonar   : 'true'
						}
					)
						.removeClass('sonar_stumble')
						.removeAttr('data-src')
						.unbind('scrollin');
				}
			);

		}
	};

	$(document).ready(function(){
		sonar.init();
	});
})(jQuery, window);