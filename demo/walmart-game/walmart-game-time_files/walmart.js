var walmart = walmart || {};

$j=jQuery.noConflict();

$j.fn.walmart_carousel = function() {
	var $this = $j(this),
		options = {
			data: {},
			index: 0,
			dir: undefined,
			auto: true
		},
		settings = $j.extend(options, arguments[0]);
	
	init = function() {
		if(!settings.data.length)
			return false;
	    $j.each(settings.data,function(id,img){
	        var div = $j('<div />').appendTo($this).attr('id','carousel_'+img.id).addClass('image').append('<img src="'+img.url+'" />').on('click', function(){
					walmart.load_popup(img.id);
					settings.auto=false;
				});
	        $j('<div />').appendTo(div).addClass('caption').html(img.caption);
	    });
		$j('<span />').appendTo($this).addClass('left button').on('click', this.left);
		$j('<span />').appendTo($this).addClass('right button').on('click', this.right);
		this.load();
		this.show_pager();
		carouselauto = setInterval(this.autoload,3000);
	};
	
	load = function(){
		var data = settings.data,
			index = settings.index,
			dir = settings.dir,
			auto = settings.auto,
			duration = 500,
			prev = this.get_prev(),
			next = this.get_next(),
			nextnext = this.get_nextnext(),
			prevprev = this.get_prevprev(),
			actcont = $j('#carousel_'+data[index].id),
			prevcont = $j('#carousel_'+data[prev].id),
			prevprevcont = $j('#carousel_'+data[prevprev].id),
			nextcont = $j('#carousel_'+data[next].id),
			nextnextcont = $j('#carousel_'+data[nextnext].id);
			
			
		if(data[prev].id == data[next].id){
			if(!$j('.walmart_carousel .image.right').length){
				prevcont = false;
			}
			else{
				nextcont = false;
			}
			prevprevcont = false;
			nextnextcont = false;
		}
		
		if(data[next].id == data[index].id && data[prev].id == data[index].id){
			nextcont = false;
			prevcont = false;
			auto = false;
		}
		
		if(!auto && (typeof(carouselauto)!="undefined")){
			clearInterval(carouselauto);
			carouselauto = false;
		}
		
		if(dir == 'right' || dir == 'left'){
			$j(".left.button",$this).hide();
			$j(".right.button",$this).hide();
		}
        
        switch (dir) {
            case 'right':
            	if(prevcont)
                	prevcont.removeClass('right').hide();
                //index to back
                actcont.children('.caption').slideUp(duration);
	            actcont.animate({
	                	left: '+=84',
	                	height: '237',
	                	width: '407',
	                	top: '14'
                	},duration,'easeOutQuad',function(){$j(this).removeClass('infront').addClass('inmiddle');}
                ).animate({
                	left: '77',
                	top: '35',
                	height: '208',
                	width: '381'
                },duration,'easeInQuad',
                	function(){
                		$j(this).removeClass('shadowed inmiddle actual').addClass('right').removeAttr('style');						
                	}
				).show();
				
				//next to front
				if(nextcont){
					nextcont.addClass('inmiddle').css('opacity','1').animate({
						left: '-=286',
						height: '237',
						width: '407',
						top: '14'
					},duration,'easeOutQuad',function(){$j(this).addClass('shadowed infront').removeClass('inmiddle');}
					).animate({
						left: '0',
						top: '0',
						height: '277',
						width: '434'
					},duration,'easeInQuad',function(){
						$j(this).children('img').animate({
							height: '237'
							},duration,function(){$j(this).removeAttr('style');});
						$j(this).addClass('actual').removeClass('left').removeAttr('style');
						$j(this).children('.caption').slideDown(duration,self.show_pager());
						}
					).show();
				}
				//next of next to left
				if(nextnextcont)
					nextnextcont.addClass('left hidden')
								.animate({left:'+=60'},duration)
								.show()
								.animate({left:'-=60',width: '381'},duration,function(){$j(this).removeClass('hidden').removeAttr('style');});
                break;
            case 'left':
            	if(nextcont)
                	nextcont.removeClass('left').hide();
                //caption close
                actcont.children('.caption').slideUp(duration);
                //actual to back
	            actcont.show()
	            .animate({
	                	left: '-=310',
	                	height: '237',
	                	width: '407',
	                	top: '13'
                	},duration,'easeOutQuad',function(){$j(this).removeClass('infront').css('opacity','');}
                ).animate({
                	left: '-24',
                	top: '35',
                	height: '208',
                	width: '381'
                },duration,'easeInQuad',
                	function(){
                		$j(this).removeClass('shadowed actual').addClass('left').removeAttr('style');
                	}
				);
				
				//prev to front
				if(prevcont){
					prevcont.addClass('inmiddle').animate({
						right: '-=60',
						opacity: '1',
						height: '237',
						width: '407',
						top: '14'
					},duration,'easeOutQuad',function(){$j(this).addClass('shadowed infront').removeClass('inmiddle');}
					).animate({
						right: '0',
						top: '0',
						height: '277',
						width: '434'
					},duration,'easeInQuad',function(){
						$j(this).children('img').animate({
							height: '237'
							},duration,function(){$j(this).removeAttr('style');});
						$j(this).addClass('actual').removeClass('right').removeAttr('style');
						$j(this).children('.caption').slideDown(duration,self.show_pager());
						}
					).show();
					
				}
				if(prevprevcont){
					//prev of prev to right
					prevprevcont.addClass('right hidden').show().animate({
						right:'+=60'
						},duration).animate({
							right:'-=60',width: '381'
						},duration,function(){
							$j(this).removeClass('hidden').removeAttr('style');
							});
				}
                break;
            default:
                actcont.children('.caption').show();
                actcont.addClass('shadowed actual infront').show();
                if(nextcont)
                	nextcont.addClass('left').show();
                if(prevcont)
                	prevcont.addClass('right').show();
                break;
        }
		
	};
	
	autoload = function(){
		if($j('.right.button').is(":visible")){
			this.right();
		}
		else if($j('.left.button').is(":visible")){
			this.left();
		}
	};
	
	left = function(e){
		settings.dir = 'left';
		if(e){
			e.stopPropagation();
			settings.auto = false;
			window.load();
			settings.index = window.get_prev();
		}
		else{
			this.load();
			settings.index = this.get_prev();
		}
	};
	
	right = function(e){
		settings.dir = 'right';
		if(e){
			e.stopPropagation();
			settings.auto = false;
			window.load();
			settings.index = window.get_next();
		}
		else{
			this.load();
			settings.index = this.get_next();
		}
	};
	
	get_prev = function(){
		if(settings.index <= 0){
			return settings.data.length - 1;
		} else {
			return settings.index - 1;
		}
	};
	
	get_next = function(){
		if(settings.index >= settings.data.length - 1){
			return 0;
		} else {
			return settings.index + 1;
		}
	};
	
	get_nextnext = function(){
		var next = this.get_next();
		if(next >= settings.data.length - 1){
			return 0;
		} else {
			return next + 1;
		}
	};
	
	get_prevprev = function(){
		var prev = this.get_prev();
		if(prev <= 0){
			return settings.data.length - 1;
		} else {
			return prev - 1;
		}
	};
	
	show_pager = function(){
		if($j('.walmart_carousel .image.left').length){
			$j(".right.button",$this).show();
		}
		if($j('.walmart_carousel .image.right').length){
			$j(".left.button",$this).show();
		}
	};

	init();
	
};

$j.fn.walmart_iframe= function() {
	
	var $this = $j(this),
		options = {
			id: 'walmart-iframe',
			action_link: "",
			width: '100%',
			height: '480px'
		},
		settings = $j.extend(options, arguments[0]),
		modal = $j("#walmart-modal-back");
	
	var init = function() {
		$this.append('<div id="' + settings.id + '" class="iframe"></div>');
        modal.show().on('click', this.destroyIframe);
        $j('#' + settings.id).html('<div class="closeiframe"></div>')
        					 .append(this.createIframe())
        					 .css('text-shadow','0px 0px 0px #000000')
        					 .centerPosition()
        					 .show(500)
        					 .find('.closeiframe')
        					 .on('click', this.destroyIframe);
	};
	
	createIframe = function() {
		var iframe = document.createElement('iframe');
		iframe.src = settings.action_link;
		iframe.width = settings.width;
		iframe.height = settings.height;
		return iframe;
	};
	
	destroyIframe = function() {
		$j('#walmart-modal-back').hide();
        $j('#' + settings.id).remove();
	};
		
	init();
};

$j.fn.centerPosition = function() {
	return $j(this).css({left : ($j('#main').offset().left-10)+"px",top : ($j('#header').innerHeight()-10)+'px'});
};

$j.fn.popupPos = function(){
	$j('.active.popup').centerPosition();
};

$j.fn.popupSize = function(){
	var actpopup = $j('.active.popup'),
		whe = $j(window).height();
	if(!$j('#popupplaceholder').length)
		actpopup.parent().append('<div id="popupplaceholder" style="visibility:hidden;position:absolute;left:'+actpopup.offset().left+'px;height:'+actpopup.outerHeight()+'px;width:10px;top:'+($j('#header').innerHeight()-10)+'px">&nbsp;</div>');
	else{
		var popbasetop = parseInt($j('#popupplaceholder').offset().top),
			phe = actpopup.outerHeight(),
			actHeight = actpopup.outerHeight();
		if(!actHeight || actHeight==null)
			actHeight = 0;
		$j("#popupplaceholder").height(actHeight);
		if((whe-popbasetop)>=phe){
			actpopup.css('top',popbasetop+'px');
		}
	}
	if(actpopup.offset() && actpopup.offset().top+actpopup.outerHeight()-whe-$j(window).scrollTop()>0){
		var scroll = $j(window).scrollTop(),
			top = whe-actpopup.outerHeight()-$j('footer').outerHeight();
		if (scroll && scroll + top > 0) {
			actpopup.css('top', top + 'px');
			$j(window).scrollTop(scroll + top);
		}
	}
};

$j.fn.sidebarSize = function(){
	if($j('#sidebarplaceholder').length){
		$j('#sidebarplaceholder').css('height',$j('#sidebar').outerHeight());
	}
	if($j('#sidebar').outerHeight()<$j(window).height() && $j('#sidebar').attr('basetop')){
		$j('#sidebar').css('top',$j('#sidebar').attr('basetop')+'px');
	}
}

$j.fn.closePopup = function() {
	var topmedia = $j('.popup.active .topmediaholder'),
	mediahtml = topmedia.html();
    //hide back cover
    $j('#walmart-modal-back').css('z-index','10').hide();
    //reset video
    topmedia.html('');
    //store the content
    topmedia.attr('mediacontent',mediahtml);
    //hide the div
    $j('body').removeClass('blurclass');  
    $j('#walmart-popup-tandc').hide(); 
    $j(".plusotherbutton ~ div").hide();
    $j('.readmorebtn').html("&#187;&nbsp;"+walmart.translations['more']).next().hide();
    $j('.popup.active').removeClass('active').hide(500,function(){$j(this).popupSize();});   
};

walmart.add_article_actions = function(){
	$j.fn.addSocialMedia = function(href, smtext, id) {
		var $this = $j(this),
			$href = href,
			$smtext = smtext,
			$id = id,
			facebook = function() {
				return $j('<div>').attr({"class": "fb_bar used-provider", "id": "fb_bar_article_" + $id})
				   		   .append('<div class="fb-like" data-href="' +  $href + '" data-send="false" data-width="200" data-show-faces="false"></div>');
			},
			facebook_script = function() {
				return '<script type="text/javascript">' +
				'var item = document.getElementById("fb_bar_article_' + $id + '");' +
				'if (document.getElementById("facebook-jssdk")) {FB.XFBML.parse(item);}' +
				'else {$j.getScript("//connect.facebook.net/en_US/all.js#xfbml=1&appId=334421106639600", function(){FB.XFBML.parse(item);});}</script>';
			},
			twitter = function() {
				return $j('<div>').attr({"class": "tw_feed used-provider", "id": "tw_feed_article_" + $id})
						   .append('<a href="https://twitter.com/share" data-count="none" data-size="medium" class="twitter-share-button" ' + 
				   				   'data-lang="en" data-url="' + $href + '" data-text="' + $smtext + '" >Tweet</a>'); 
			},
			twitter_script = function() {
				return '<script type="text/javascript">' +
				'if (document.getElementById("twitter-wjs")) {twttr.widgets.load();}' +
				'else {$j.getScript("//platform.twitter.com/widgets.js", function(){twttr.widgets.load();});}</script>';
			};
		
		if ($this.html() === "") {
			$this.append(facebook(), facebook_script(), twitter(), twitter_script());
		}
		return $this;
	};
	//grid box hover
    $j('article.walmart-article').each(function(){
    	var $this = $j(this),
    		permalink = $this.attr('permalink'),
    		smtext = $this.attr('smtext'),
    		id = $this.attr("post_id");
        $this.hover(
            function(){
            	if (!!$j('.box-copy > div', $j(this)).html()) {
            		$this.find('.box-copy').show();
            	}
                $this.find('.post-hover').show();
                $this.find('.editposticon').show();
                $this.find('.providers').addSocialMedia(permalink, smtext, id).css('z-index', '50');
            },
            function(){
            	$this.find('.box-copy').hide();
            	$this.find('.post-hover').hide();
            	$this.find('.editposticon').hide();
            	$this.find('.providers').css('z-index', '-1');
            }
        );
    });
    
    //modal self close
    $j("#walmart-modal-back").on('click', function() {$j(this).closePopup();});
    
    /*sm buttons to open*/
	$j(".plusotherbutton").on('click', function() {
		var $next = $j('~ div', $j(this));
		if ($next.css("display") == "none") {
			return $next.show(300);
		}
		return $next.hide(300);
	});
};

$j.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $j.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

walmart.load_popup = function(id){
	$j('[id^=walmart-popup]').closePopup();
	
	var divid = 'walmart-popup_post-'+id;
    
    if($j('#'+divid).length == 0){
    	$j.getJSON(
        	walmart.ajax_url,
        	{
        		action: 'popup',
				security: walmart.nonces['popup'],
        		'id' : id
        	},
        	function(response){
        		if(response === -1 || response.success === false) return false; //security check fail
        		if(response.post_type === 'walmart_action'){
        			if(response.action_open == 'iframe' && response.action_link !== false){
        				return $j('body').walmart_iframe({action_link: response.action_link});
        			}
        		} else {
        			if(response.login_required === true){
        				walmart.loginManager.open('login');
        			} else {
        				$j("#walmart-modal-back").show();        			
                		$j('body').append('<div id="'+divid+'" class="active popup"></div>');
    	                $j('#'+divid).html(response.content)
    	                			 .css('text-shadow','0px 0px 0px #000000')
    	                			 .show('slow',function(){$j(this).popupSize();})
    	                			 .popupPos();
    	                
            			var popup_url = $j('#permalink_bar .popup_url');
            			var url = window.location.protocol + '//' + window.location.host + '/show/' + response.id;
        				popup_url.val(url);

        				//popup functions 	
        				/*close popup*/
        				$j('#' + divid + ' .closepopup').on('click', function() {
        					$j(this).closePopup();
        				});
        				
        				/*read more or less*/
        				$j('#' + divid + '.popup.active .readmorebtn').on('click', function() {
        					var $this = $j(this);
        					if ($this.next().css("display") == "none") {
        						return $this.html("&#171;&nbsp;"+walmart.translations['less']).next().show(300,function(){$j(this).popupSize();});
        					}
        					return $this.html("&#187;&nbsp;"+walmart.translations['more']).next().hide(300,function(){$j(this).popupSize();});
        				});
        					
        				/*sm buttons to open*/
        				$j('#' + divid + '.popup.active .plusotherbutton').on('click', function() {
        					var $next = $j('~ div', $j(this));
        					if ($next.css("display") == "none") {
        						return $next.show(300);
        					}
        					return $next.hide(300);
        				});
        				
        				/*terms and conditions popup*/
        				if(walmart.open_tandc) walmart.opentandc(id);
        				$j('#post-tandc-link-'+id).click(function(){
        					walmart.opentandc(id);
        				});
        				
        				FB.XFBML.parse(document.getElementById('fb_comments_' + id));
        			}
        		} 
        	}
        );
    } else {        
        $j("#walmart-modal-back").show();
        //needed for chrome
        $j('#'+divid+' .topmediaholder').html($j('#'+divid+' .topmediaholder').attr('mediacontent'));
        $j('#'+divid).addClass('active').show(500,function(){$j(this).popupSize();}).popupPos();
    }
};

walmart.opentandc = function(post_id){
	if(!post_id || post_id=='undefined' || isNaN(post_id)){
		return false;
	}
	var tccontent = $j('#post-tandc-'+post_id),
		tcwindow = $j('#walmart-popup-tandc'),
		tcwcont = $j('#popup-tandc-content');
		if(!tccontent.html().length) return false;
		tcwcont.html(tccontent.html());
		tcwindow.slideDown(500);
		$j("#walmart-modal-back").css('z-index','109');
		window.scrollTo(0,0);
		if(walmart.open_tandc) walmart.open_tandc=false;
		return true;
}

walmart.set_permalink = function(){
	var input = $j('#permalink_bar .url');

	if(!input) {
		return false;
	}
	var params = walmart.post_filter.get_params(); 
	var filter = '';
	
	$j.each(params, function(i,e){
		if(e != undefined){
			filter += i + '/' + e + '/';
		}
	});
	if(filter != ''){
		filter = '?filter=' + filter;
	}
	
	$j(input).val(window.location.protocol + '//' + window.location.host + window.location.pathname + filter);
};

walmart.Filter = function(){
	this.params = {};
	this.filter; //all the possible filter parameters
	this.filter_filtered;  //the matching filter parameters
	this.posts;
	this.tag_id;
	this.redirect_to_index = walmart.page_template !== "" && walmart.page_template !== "grid.php";
	this.post_type_filters = {
        'walmart_date' : ['what', 'when', 'where'],
        'walmart_unit' : ['what', 'where']
    };
	
	this.get_params = function(){
		return this.params;
	};
	
	this.add_tagcloud = function(post_type, action, termId, tagNumber){
		//if no tag id is given we try to find it
		if(tagNumber === undefined){
			$j.each($j('.tagcloud a'),function(i,e){
				if($j(e).text() === termId){
					tagNumber = parseInt($j(e).attr('tag_id'), 10); 
				}
			});
		}
		if(tagNumber === undefined){
			return false;
		}
		
		if(this.tag_id !== undefined){
			$j(".tag-link-" + this.tag_id).removeClass('tagcloud-selected-tag');
		}
		
		if(this.tag_id === tagNumber){
			this.remove(post_type, action);
			this.tag_id = undefined;
		} else {
			$j(".tag-link-" + tagNumber).addClass('tagcloud-selected-tag');
			this.tag_id = tagNumber;
			this.add(post_type, action, termId);
		}
	};
	
	this.add = function(post_type, action, termId, html){
		if(termId === 'unfiltered' || (this.params[action] && this.params[action] === termId && parseInt(termId) !== -1)){
			this.params[action] = undefined;
		} else {
			this.params[action] = termId;
		}	
					
		this.call(post_type);
	};
	
	this.remove = function(post_type, action){
		this.params[action] = undefined;
		this.call(post_type);
	};
	
	this.call = function(post_type){
		var me = this,
			minHeight = "548px";
		$j.getJSON(
			walmart.ajax_url,
			{
				action: 'apply_filter',
				security: walmart.nonces['filter'],
				post_type: post_type,
				params: me.params
			},
			function(response){
				if(response === -1 || response.success === false) return false; //security check fail
				if(me.redirect_to_index === true){
					var url = window.location.protocol + '//' + window.location.host;
					if(me.params['tag']){
						url += '?filter=tag/' + me.params['tag'];
					}
					window.location.href = url;
					return;
				}
				
				me.filter = response.filter;
				me.filter_filtered = response.filter_filtered;
				me.posts = response.posts;
				
				if(response.filter_html !== ''){
					$j('.walmart_filter').html(response.filter_html);
				}
				if (me.posts.length === 0) {
					minHeight = "0";
				} 
				$j('.walmart_articles').html(response.content).css("min-height", minHeight);
				me.apply_filter();
				walmart.set_permalink();
				walmart.add_article_actions();
			}
		);
	};
	
	this.apply_filter = function(){
		var me = this;
		
		//set active tag in the tagcloud
		if(this.params['tag']){
			var tag_id = undefined;
			$j.each($j('.tagcloud a'),function(i,e){
				if($j(e).text() === me.params['tag']){
					tag_id = parseInt($j(e).attr('tag_id'), 10); 
				}
			});
		
			if(tag_id !== undefined){
				$j(".tag-link-" + tag_id).addClass('tagcloud-selected-tag');
				this.tag_id = tag_id;
			}
		}
		
		//highligh selected conditions
		if(this.filter){
			$j.each(me.post_type_filters, function(post_type, filters){
		    	for(var k = 0;  k < filters.length; k++){
		    		var selector_highlight = (function(post_type, action){
		    			return function(i,e){
		    				if(me.filter_filtered[action] && me.filter_filtered[action][$j(e).attr('key_value')]){
		    					$j(e).addClass('selected');
		    				} else {
		    					$j(e).removeClass('selected');
		    				}
		    			};
				    }(post_type, filters[k]));
		    		
					$j.each($j('.'+ post_type +'_filter_' + filters[k] + ' .option'), selector_highlight);
				}
		    });
		}
		
		//select active condition
		if(this.params){
			$j.each(me.post_type_filters, function(post_type, filters){
		    	for(var k = 0;  k < filters.length; k++){
		    		var selector_highlight = (function(post_type, action){
		    			return function(i,e){
		    				var span = $j('.' + post_type + '_filter_' + action + ' .title');
		    				
	    					if(me.params[action] && me.params[action] === $j(e).attr('key_value')){
	    						$j(e).addClass('active');
	    						span.html($j(e).html());
	    					}
		    			};
				    }(post_type, filters[k]));
		    		
		    		$j('.'+ post_type +'_filter_' + filters[k] + ' .option').removeClass('active');
		    		$j('.'+ post_type +'_filter_' + filters[k] + ' .title').html(walmart.translations[filters[k]]);
		    		
					$j.each($j('.'+ post_type +'_filter_' + filters[k] + ' .option'), selector_highlight);
				}
		    });
		}
		
		//set dropdown width
		$j.each(me.post_type_filters, function(post_type, filters){
	    	for(var k = 0;  k < filters.length; k++){
	    		if($j('.'+ post_type +'_filter_' + filters[k])){
	    			$j('.'+ post_type +'_filter_' + filters[k]).width($j('.'+ post_type +'_filter_' + filters[k] + ' .options').width() + 16);
	    			$j('.'+ post_type +'_filter_' + filters[k] + ' .options').css('padding-right', '21px');
	    		}
	    	}
	    });
	};
	
	this.init = function(){
		var me = this;
		if(window.location.search.substring(0,8) === '?filter='){
			var args = window.location.search.substring(8).split("/");
			args = $j.map(args, function(arg){ return decodeURIComponent(arg); });
			for(var i=0; i < args.length; i++){
				if(args[i+1] !== undefined && args[i+1] !== 'unfiltered' && args[i+1] !== ''){
					switch(args[i]){
						case 'when':
						case 'what':
						case 'where':
						case 'tag':
							me.params[args[i]] = args[i+1]; 
							i = i + 1;
							break;
						default:
							break;
					}
				}
			}
		}
		
		me.apply_filter();
	};
};

walmart.debug_label = function(){
	if($j('#debug_cb').attr('checked')) {
		$j(".navtype-label.debug").addClass('show');
	} else {
		$j(".navtype-label.debug").removeClass('show');
	}
};

walmart.pos_elements = function(postype){
	var sidebar = $j("#sidebar"),
		popup = $j(".active.popup"),
		iframe = $j("#walmart-iframe"),
		he = sidebar.height()+$j('footer').outerHeight(),
		sidetop = sidebar.position().top,
		whe = $j(window).height();
	if(sidebar.css('position')!='fixed'){
		sidebar.parent().append('<div id="sidebarplaceholder" class="sidebar" style="height:'+he+'px;visibility:hidden;">&nbsp;</div>');
		sidebar.css('position','fixed').css('left',$j('#sidebarplaceholder').offset().left+'px');
	}
	
	if(popup.length){
		if(!$j('#popupplaceholder').length){
			$j(this).popupSize();
		}
		var phe = popup.outerHeight()+$j('footer').outerHeight(),
			popprevtop = parseInt(popup.attr('prevtop')),
			popbasetop = parseInt($j('#popupplaceholder').offset().top),
			poptop = popup.position().top;
		$j('#popupplaceholder').css('height',phe);
	}

	//window resize
	if(postype=='resize'){
		sidebar.css('left',$j('#sidebarplaceholder').offset().left+'px');
		if(popup.length) {
			popup.css('left',($j('#main').offset().left-10)+'px');
		}
		iframe.css('left',($j('#main').offset().left-10)+'px');
		if(whe-parseInt(sidebar.attr('basetop'))>=he){
			sidebar.css('top',parseInt(sidebar.attr('basetop'))+'px');
		}
	}
	
	$j('#sidebarplaceholder').css('height',he);
	if(postype=='scroll'){
		if(!sidebar.attr('basetop'))
			sidebar.attr('basetop',$j('#header').outerHeight(true));
		var basetop = parseInt(sidebar.attr('basetop'));
		if(!sidebar.attr('prevtop'))
			sidebar.attr('prevtop',basetop);
		var	sideprevtop = parseInt(sidebar.attr('prevtop')),
			acttop = $j(window).scrollTop(),
			actbottom = acttop+whe,
			prevtop = parseInt($j('body').attr('prevtop'));
			if(isNaN(prevtop))
				prevtop = 0;
		var delta = acttop-prevtop;

		//if sidebar out of screen
		if(whe-basetop<he){
			var sidebottom = sidetop+he;
				
			if(acttop<prevtop){
				//move down - scroll up
				if((sidetop-acttop)<basetop){
					newtop = sidetop+basetop-delta;
					if(newtop>basetop) newtop = basetop;
					sidebar.css('top',newtop+'px');
				}
				if((sidetop>acttop+basetop && sideprevtop==sidetop-acttop) || acttop==0){
					sidebar.css('top',$j('#sidebarplaceholder').css('top'));
				}
				sidebar.attr('prevtop',sidetop-acttop);
			}
			if(acttop>prevtop){
				//move up - scroll down
				if(sidebottom>actbottom){
					newtop = sidetop-acttop-delta;
					sidebar.css('top',newtop+'px');
				}
				if((sidebar.position().top+he)<actbottom){
					sidebar.css('top',(whe-he)+'px');
				}
			}
		}
		
		if(popup.length && (whe-popbasetop)<phe){
			var popbottom = poptop+phe;
			if(!popup.attr('prevtop'))
				popup.attr('prevtop',popbasetop);
			if(acttop<prevtop){
				//move down - scroll up
				if((poptop-acttop)<popbasetop){
					newtop = poptop-delta+popbasetop;
					if(newtop>popbasetop) newtop = popbasetop;
					popup.css('top',newtop+'px');
				}
				if((popup.position().top>acttop+popbasetop && popprevtop==poptop-acttop) || acttop==0){
					popup.css('top',$j('#popupplaceholder').css('top'));
				}
				popup.attr('prevtop',poptop-acttop);
			}
			if(acttop>prevtop){
				//move up - scroll down
				if(popbottom>actbottom){
					newtop = poptop-acttop-delta;
					popup.css('top',newtop+'px');
				}
				if((popup.position().top+phe)<actbottom){
					popup.css('top',(whe-phe)+'px');
				}
			}
		}

		$j('body').attr('prevtop',acttop);
	}
};

walmart.promo = function(action,postid){
	if('assign'==action && !$j('#accepttandc').is(':checked')){
		$j('.walmart-promo-error').slideDown(200,function(){
			$j(this).children('.walmart-promo-message-close').click(function(){
				$j('.walmart-promo-error').fadeOut(500,function(){
				});
			});
		});
		return false;
	}
	$j('#promocontainer').html('&nbsp;').addClass('ajaxload').addClass('promo-height');
	$j.getJSON(
		walmart.ajax_url,
		{
			action: 'promo',
			security: walmart.nonces['promo'],
			promoaction: action,
			postid: postid
		},
		function(response){
			if(response === -1 || response.success === false){
				return false; //security check fail
			}
			$j('#promocontainer').removeClass('ajaxload').removeClass('promo-height').addClass('justdone').html(response.content);
			$j('.walmart-promo-success').show(1,function(){
				$j(this).children('.walmart-promo-message-close').click(function(){
					$j('.walmart-promo-success').fadeOut(500,function(){
						$j('#promocontainer').removeClass('justdone');
					});
				});
			});
		}
	);
};


$j(document).ready(function(){
	//special style for iframe view
    if(top !== self)
        $j('#page').addClass('in-iframe');

	walmart.post_filter = new walmart.Filter();
	walmart.post_filter.init();
	walmart.add_article_actions();
	walmart.set_permalink();
	
	$j("input.walmart_search").on("focus",function() {
		if($j("input.walmart_search").attr("edited") !== "true"){
			$j("input.walmart_search").attr("edited","true");
			$j("input.walmart_search").val("");
		}
	});
	$j("input.walmart_search").on("blur",function() {
		if($j("input.walmart_search").val() === ""){
			$j("input.walmart_search").val($j("input.walmart_search").attr("searchtext"));
			$j("input.walmart_search").attr("edited","false");
		}
	});
	$j(".searchbox form").submit(function(){
		if($j("input.walmart_search").attr("edited") !== "true" || $j("input.walmart_search").val() === $j("input.walmart_search").attr("searchtext")){
			return false;
		}
		var val = $j("input.walmart_search").val(); 
		var pattern = XRegExp('[\\p{n}|\\p{L}]{4,}');
		if(!pattern.test(val)){
			$j("input.walmart_search").val($j("input.walmart_search").attr("searchtext"));
			$j("input.walmart_search").attr("edited","false").blur();
			return false;
		}
		
		return true;
	});
	
	//hide admin box in facebook
	if(window.location !== window.top.location){
		$j('#permalink_bar').hide();
	}
	
	// scrolling
	$j(window).scroll(function(){walmart.pos_elements('scroll');});
	$j(window).resize(function(){walmart.pos_elements('resize');});
	
	//footer-sized padding for the content bottom
	$j('#main').css('padding-bottom',($j('footer').outerHeight()+1)+'px');
	
	//tandc popup close
	$j('#popup-tandc-close').click(function(){
		$j(this).parent().slideUp(500);
		$j("#walmart-modal-back").css('z-index','10');
	});
});