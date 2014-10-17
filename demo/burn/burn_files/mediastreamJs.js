		    $(document)
		        .ready(
		            function () {
		                var ajaxurl = $("#ajaxUrl").val();
		                var buttonclicked = 'all';
		                //If Home Page Dont Show filters & Show Latest 8 Posts.
		                var homepage = $("#isHomePage").val();
		                if (homepage == 'homepage') {
		                    $("#mediastreamnav").hide();
		                }
		                var offset = $("#offset").val();
		                if (offset == "") {
		                    offset = 0;
		                }		 
		
		                var dataForAll = "detailsrequested=" + "reload" + "&offset=" + offset + "&homepage=" + homepage;
		
		                callAjax(ajaxurl, dataForAll);
		           
		    //End of Document.ready Hhere.
		    //Below Jquery for  onclick of filter.
		    $("#Tab1,#Tab2,#Tab3,#Tab4,#Tab5,#Tab6,#all,#reload,#loadmore")
		        .click(
		            function () {
		            	
		                buttonclicked = $(this).attr("rel");

		                if($(this).attr('class') == 'active') {
		                	$(this).removeAttr("class");
		                } else {
		                	if(buttonclicked != 'btn loadmore'){
		                		$("#all").removeAttr("class");
		                		$(this).attr('class', 'active');
		                	}
		                }
		                if (buttonclicked == 'all') {
		                    buttonclicked = 'reload';
		                }

                        var activecount = [];
		                for(var i=1; i<=6; i++) {
	                		 if($("#Tab" + i).attr("class") == 'active'){
	                			 activecount.push(i);
	                		 }
	                	 }	
		                if(activecount.length == 0 ) {
		                	$("#all").removeAttr("class");			               
		                	$("#all").attr('class', 'active');
		                }
		                
		                if(buttonclicked == 'reload') {
		                	 for(var i=1; i<=6; i++) {
		                		 $("#Tab" + i).removeAttr("class");
		                	 }		                	
			                $("#all").removeAttr("class");
			                $("#reload").removeAttr("class");
		                	$("#all").attr('class', 'active');
		                }
		                
		                if (buttonclicked != 'btn loadmore') {		                	
		                	 //
			                var clickedProviders = new Array();
			                for(var i=1; i<=6; i++) {
			                	//alert("Coming In Loop::");
			                	if($("#Tab" + i).attr('class') == 'active') {
			                		clickedProviders.push($("#Tab" + i).attr('rel'));
			                	}
			                }
			                //console.log(clickedProviders);
			                if(clickedProviders.length == 0) {
			                	clickedProviders.push('all');
			                }
			                //alert("Coming Here:::: Clicked Providers" + clickedProviders);
			                buttonclicked = clickedProviders.join(",");
			               // alert("Coming Here::::" + buttonclicked);
			                //
		                	//alert("Cmg Here");
		                    offset = 0;
		                    $("#loadmore").show();
		                    $('#clcikedButton').val(buttonclicked);
		                    var elems = [];
		                    
		                     $('.media-stream-wrap .ms-item').each(function () {
		                        elems.push(this);
		                    })
		                    $('.media-stream-wrap').masonry('remove', elems);
		                     $(".media-stream-wrap").imagesLoaded(function() {
		                     	$(".media-stream-wrap").masonry();
		                     });
		                }		                
		                if (buttonclicked == 'btn loadmore') {
		                    buttonclicked = $("#clcikedButton").val();
		                    //alert("Button::Button::" + buttonclicked);
		                    offset = $("#offset").val();
		                   // alert("After Add Offset::" + offset);
		                }
		                //var countryaccount = $("#" + buttonclicked + "accountname").val();               
		
		                if (buttonclicked == 'all' || buttonclicked == 'reload') {
		                    var dataToSend =  "detailsrequested=" + "reload" + "&offset=" + offset + "&homepage=" + homepage;
		                } else {
		                    dataToSend = "detailsrequested=" + buttonclicked + "&offset=" + offset + "&homepage=" + homepage;
		
		                }
		                //var dataToSend = "detailsrequested="+ buttonclicked;
		                callAjax(ajaxurl, dataToSend);
		    })
		
		    });
		 
		
		    function constructSocialProviderTemplate(json) {
		    	
		         
		         //var username = $("#" + socialMedia + "username").val();
		         var designpath = $("#designPath").val();

		    	var total = [];
		    	$.each(json.mediaStreamDataList, function (index, element) {

		    		$(this).each(function () {
		    			total.push(this);
		    		})
		    		//alert("total::" + total);
		    		var postText = "";
		    		var postUrl = "";
		    		var dateToShow = "";
		    		var postTitle = "";
		    		var iconImage = "";
		    		var postImage = "";
		    		var socialMedia = element.socialProvider;
		    		if (element.postText != null) {
		    			postText = element.postText;
		    		}
		    		if (element.postUrl != null) {
		    			postUrl = element.postUrl;
		    		}
		    		if (element.postTitle != null) {
		    			postTitle = element.postTitle;
		    		}
		    		if (element.dateToShow != null) {
		    			dateToShow = element.dateToShow;
		    		}
		    		if (element.iconImage != null) {
		    			iconImage = element.iconImage;
		    		}
		    		if (element.postImage != null) {
		    			postImage = element.postImage;
		    		}
		    		
		    		


		    		var el = "";		                 
		            if (socialMedia == 'facebook') {
                        el = $('<div class="ms-item"><div class="ms-media"><a href="' + postUrl + '"target="_blank"> <span class="bar"></span>	<img src="' + postImage + '" /></a></div><h3 class="ms-title" itemprop="name"><a href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank">' + postTitle + '</a></h3> <p><a href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img class ="iconimageclass" src="' + iconImage + '"><a><br><a href="'+$("#" + socialMedia + "socialurl").val()+' "target="_blank">'+$("#" + socialMedia + "username").val()+'</a></p><p class="ms-desc">' + postText + '</p><p class="ms-date">' + dateToShow + '</p><div class="ms-icon"><a href="' + $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img src="' + $("#" + socialMedia + "iconpath").val() + '" /></a></div></div>');
                    } else if (socialMedia == 'twitter') {
                    	var tweetid = postUrl.split('/');
    		    		var reqId = tweetid[tweetid.length - 1];                    	
                        el = $('<div class="ms-item"><a class="ms-social-header" href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img class="ms-social-icon" src="' + iconImage + '"><span class="ms-social-profile-name" "target="_blank">'+$("#" + socialMedia + "username").val()+'</span></a></a><div class="ms-media"><a href="' + postUrl + '"target="_blank"> <span class="bar"></span>	<img src="' + postImage + '" /></a></div><h3 class="ms-title" itemprop="name"><a href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank">' + postTitle + '</a></h3><p class="ms-desc">' + postText + '</p><p class="ms-date">' + dateToShow + '</p><p><a href="' + "https://twitter.com/intent/tweet?in_reply_to="+reqId + '" class="ms-twitter-sprite reply" target="_blank">Reply</a> <a href="' + "https://twitter.com/intent/retweet?tweet_id="+reqId + '" class="ms-twitter-sprite retweet" target="_blank">Retweet</a> <a href="' + "https://twitter.com/intent/favorite?tweet_id=" +reqId+ '" class="ms-twitter-sprite favorite" target="_blank">Favorite</a></p><div class="ms-icon"><a href="' + $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img src="' + $("#" + socialMedia + "iconpath").val() + '" /></a></div>');
                    } else if (socialMedia == 'flickr') {
                        el = $('<div class="ms-item" itemscope itemtype="http://schema.org/ImageObject"><div class="ms-media"><a itemprop="url" href="' + postUrl + '" target="_blank"><span class="bar"></span><img itemprop="thumbnail" src="' + postImage + '" /></a></div><h3 class="ms-title" itemprop="name"><a href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank">' + postTitle + '</a></h3><p><a href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img class ="iconimageclass" src="' + iconImage + '"></a><br><a href="'+$("#" + socialMedia + "socialurl").val()+'" target="_blank">'+$("#" + socialMedia + "username").val()+'</a></p><p class="ms-desc">' + postText + '</p><p class="ms-date">' + dateToShow + '</p><div class="ms-icon"><a href="' + $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img src="' + $("#" + socialMedia + "iconpath").val() + '" /></a></div></div>');
                    } else if (socialMedia == 'googleplus') {
                        el = $('<div class="ms-item"><div class="ms-media"><a href="' + postUrl + '"target="_blank"> <span class="bar"></span>	<img src="' + postImage + '" /></a></div><h3 class="ms-title" itemprop="name"><a href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank">' + postTitle + '</a></h3><p> <a href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img class ="iconimageclass" src="' + iconImage + '"></a><br><a href="'+$("#" + socialMedia + "socialurl").val()+' "target="_blank">'+$("#" + socialMedia + "username").val()+'</a></p><p class="ms-desc">' + postText + '</p><p class="ms-date">' + dateToShow + '</p><div class="ms-icon"><a href="' + $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img src="' + $("#" + socialMedia + "iconpath").val() + '" /></a></div></div>');
                    } else if (socialMedia == 'instagram') {
                        el = $('<div class="ms-item" itemscope itemtype="http://schema.org/ImageObject"><div class="ms-media"><a itemprop="url" href="' + postUrl + '"target="_blank"> <span class="bar"></span>	<img itemprop="thumbnail" src="' + postImage + '" /></a></div><h3 class="ms-title" itemprop="name"><a href="' + $("#" + socialMedia + "socialurl").val() + '" target="_blank">' + postTitle + '</a></h3><a href="' + $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img class ="iconimageclass" src="' + iconImage + '"></a><br><a href="'+$("#" + socialMedia + "socialurl").val()+'" target="_blank">'+$("#" + socialMedia + "username").val()+'</a></p> <p class="ms-desc" itemprop="name">' + postText + '</p><p class="ms-date">' + dateToShow + '</p><div class="ms-icon"><a href="' + $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img src="' + $("#" + socialMedia + "iconpath").val() + '"/></a></div></div>');
                    } else if (socialMedia == 'youtube') {
                        el = $('<div class="ms-item" itemscope itemtype="http://schema.org/VideoObject"><a class="ms-social-header" href="' +  $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img class="ms-social-icon" src="' + iconImage + '"><span class="ms-social-profile-name" "target="_blank">'+$("#" + socialMedia + "username").val()+'</span></a><div class="ms-media"><a itemprop="url" class="fancybox-media ms-video-thumb" href="' + postUrl + '" title ="' + postTitle + '" target="_blank"> <span class="bar"></span><img itemprop="thumbnail" src="' + postImage + '" /><span class="ms-video-icon"></span></a><img src="'+designpath+'/main/images/icon-play-video-thumb.png" alt="video play icon" class="videoPlayIcon"></div><h3 class="ms-title" itemprop="name"><a href="' +  $("#" + socialMedia + "socialurl").val() + '" title="' + postTitle + '" target="_blank">' + postTitle + '</a></h3> <p class="ms-date">' + dateToShow + '</p><div class="ms-icon"><a href="' + $("#" + socialMedia + "socialurl").val() + '" target="_blank"><img src="' + $("#" + socialMedia + "iconpath").val() + '" /></a></div></div>');
                    }
		    		$(".media-stream-wrap").append(el).masonry('appended', el, true);

		    		$(".media-stream-wrap").imagesLoaded(function() {
		    			$(".media-stream-wrap").masonry();
		    		});

		    	});
		    	$('.media-stream-wrap .ms-item .ms-media').each(function(){
		    		// $(this).find('a img');
		    		if($(this).find('a img').attr('src') == "") {
		    			// $(this).closest('.bar').remove();
		    			$(this).remove();		        		
		    		}

		    	})
		    	var noofpostconfig = $("#noofpostconfig").val();
		    	if(noofpostconfig == null || noofpostconfig == "") {
		    		noofpostconfig = 20;
		    	}
		    	if (total.length < noofpostconfig) {		    		
		    		$("#loadmore").hide();
		    	}
		    }
		
		            function callAjax(ajaxurl, dataToSend) {
		/*             	
		            alert("Coming Inside Ajax Call");
		            alert("Coming Inside Ajax Call" + ajaxurl);
		            alert("Coming Inside Ajax Call dataToSend" + dataToSend);
		            alert("Coming Inside Ajax Call buttonclicked" + buttonclicked); */
		                $.ajax({
		                        url: ajaxurl,
		                        datatype: 'json',
		                        data: dataToSend,
		                        error: function () {
		                            alert('Error');
		                        },
		                        success: function (data) {
		                            var json = data;
		                            if (data.offsetValue != null) {
		                               // offset = data.offsetValue;
		                                $("#offset").val(data.offsetValue);
		                            }
		                            
		                            constructSocialProviderTemplate(json)
		                            // $(".media-stream-wrap").masonry();
		                            //  alert(element.postText);
		                        }
		                });
		                }
