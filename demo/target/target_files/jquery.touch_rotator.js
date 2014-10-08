
/**
 * jquery.touchwipe
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.2 (17th July 2012) - moved prevent default to left right only - JI
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function(a){a.fn.touchwipe=function(c){var b={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(c){a.extend(b,c)}this.each(function(){var e;var d;var i=false;function h(){this.removeEventListener("touchmove",f);e=null;i=false}function f(m){if(i){var j=m.touches[0].pageX;var n=m.touches[0].pageY;var l=e-j;var k=d-n;if(Math.abs(l)>=b.min_move_x){if(b.preventDefaultEvents){m.preventDefault()}h();if(l>0){b.wipeLeft()}else{b.wipeRight()}}else{if(Math.abs(k)>=b.min_move_y){h();if(k>0){b.wipeDown()}else{b.wipeUp()}}}}}function g(j){if(j.touches.length==1){e=j.touches[0].pageX;d=j.touches[0].pageY;i=true;this.addEventListener("touchmove",f,false)}}if("ontouchstart" in document.documentElement){this.addEventListener("touchstart",g,false)}});return this}})(jQuery);


/**
* tgt.Rotator
* jQuery Plugin style re-useable UI controller 
* for accessible display of Rotating slides of content
*/
(function($){
	
	function Rotator(el,options) {
		
		var self = this;
		var elem = $(el);
		var config;
		
		var defaults = {
			CLASSES: {
				page: 'rotator-nav-page',
				next: 'rotator-control-next',
				prev: 'rotator-control-previous',
				active: 'rotator-nav-active',
				countPrefix: 'rotator-count-',
				rotator: 'rotator',
				rotatorItem: 'rotator-item',
				rotatorItemPrefix: 'rotator-item-',
				rotatorItemNext: 'rotator-item-next',
				rotatorItemPrev: 'rotator-item-prev',
				rotatorSliding: 'rototor-sliding',
				activeItem: 'rotator-item-active',
				activeOut: 'rotator-item-out',
				removeIn: 'rotator-item-next rotator-item-prev',
				removeOut: 'rotator-item-next rotator-item-prev rotator-item-out rotator-item-active'
			},
			animation: {
				duration: 500,
				easing: 'easeInOutQuart'
			},
			cssTransitionsSupported:false
		};
		
		var $this,$parent,$slides,$control;
				
		/*
		EVENT HANDLERS
		*/
		
		this.handleShow = function() {
			
			$(document).trigger('tgtDoRotator');
						
			if(!$parent.hasClass(config.CLASSES.rotatorSliding)) {
				
				var _active = $('.'+config.CLASSES.activeItem,$parent);
				var _currentIndex = getActiveIndex(_active);
				
				if($this[0] === $('li .'+config.CLASSES.active,$control)[0]) {
					return false;
				}
				
				if($this.hasClass(config.CLASSES.next)) {
					handleNext(_active,_currentIndex);
					return false;
				}
				
				if($this.hasClass(config.CLASSES.prev)) {
					handlePrev(_active,_currentIndex);
					return false;
				}
				
				if($this.hasClass(config.CLASSES.page)) {
					var toIndex = getThumbIndex();
					handlePage(_active,toIndex,'next');
					return false;
				}
			}
			
		}
		
		var handleNext = function(_active,_currentIndex) {
			
			var toIndex;
			
			if(_currentIndex === $slides.length - 1) {
				toIndex = 0;
			} else {
				toIndex = _currentIndex+1;
			}
			
			handlePage(_active,toIndex,'next');
			
		}
		
		var handlePrev = function(_active,_currentIndex) { 
			
			var toIndex;
			
			if(_currentIndex === 0) {
				toIndex = $slides.length-1;
			} else {
				toIndex = _currentIndex-1;
			}
			
			handlePage(_active,toIndex,'prev');
			
		}
		
		var handlePage = function(_active,toIndex,dir) {
			
			var obj = {
				"inEl":$slides.eq(toIndex),
				"outEl":_active,
				"dir":dir
			}
			doRotate(obj);
			setActiveState(toIndex);
			
		}
		
		var setActiveState = function(toIndex) {
			var old = $('li .'+config.CLASSES.active,$control);
			if(old.length !== 0) {
				old.removeClass(config.CLASSES.active);
				changeElementType(old,'a');
			}
			
			var current = $('li > a, li > span',$control).eq(toIndex);
			if(current.length !== 0) {
				current.addClass(config.CLASSES.active);
				changeElementType(current,'span');
			}
			
			$(document).trigger('tgtRotatorSetActive',{'toIndex':toIndex});
		}
		
		var changeElementType = function(el,newType) {
			var attrs = {};
	
			$.each(el[0].attributes, function(idx, attr) {
				attrs[attr.nodeName] = attr.nodeValue;
			});
	
			el.replaceWith(function() {
				return $("<" + newType + "/>", attrs).append($(this).contents());
			});
		}
		
		/*
		UTILITY
		*/
		
		var doRotate = function(obj) {
			
			if(config.cssTransitionsSupported) {
				
				doCssAnimate(obj);
				
			} else {
				
				doJsAnimate(obj);
				
			}
			
			
			
		}
		
		var doCssAnimate = function(obj) {
			
			$parent.addClass(config.CLASSES.rotatorSliding);
			
			obj.inEl.addClass(config.CLASSES.rotatorItemPrefix + (obj.dir == 'next' ? 'next' : 'prev')).addClass(config.CLASSES.activeItem);
			obj.inEl[0].offsetWidth;
			obj.inEl.removeClass(config.CLASSES.rotatorItemPrefix + (obj.dir == 'next' ? 'next' : 'prev'));
			
			obj.outEl.addClass(config.CLASSES.activeOut);
			obj.outEl.addClass(config.CLASSES.rotatorItemPrefix + (obj.dir == 'next' ? 'prev' : 'next'));
			
			var transitionEnd = getTransitionCallback();
						
			obj.outEl.bind(transitionEnd,function(){
				obj.outEl.unbind(transitionEnd);
				outComplete(obj.outEl);
			});
			
			obj.inEl.bind(transitionEnd,function(){
				obj.inEl.unbind(transitionEnd);
				inComplete(obj.inEl);
			});
			
		}
		
		var doJsAnimate = function(obj) {
			
			$parent.addClass(config.CLASSES.rotatorSliding);
			
			obj.inEl.addClass(config.CLASSES.rotatorItemPrefix + (obj.dir == 'next' ? 'next' : 'prev')).addClass(config.CLASSES.activeItem);
			obj.inEl.animate(
				{ left:0 },
				{
					queue: false,
					duration: config.animation.duration,
					easing: config.animation.easing,
					complete: function() {
						obj.inEl.removeClass(config.CLASSES.rotatorItemPrefix + (obj.dir == 'next' ? 'next' : 'prev')).removeAttr('style');
						inComplete(obj.inEl);
					}
				}
			);
			
			obj.outEl.addClass(config.CLASSES.activeOut);
			obj.outEl.animate(
				{ left:(obj.dir == 'next' ? '-100%' : '100%') },
				{
					queue: false,
					duration: config.animation.duration,
					easing: config.animation.easing,
					complete: function() {
						obj.outEl.removeAttr('style');
						outComplete(obj.outEl);
					}
				}
			);
			
		}
		
		var inComplete = function(el) {
			
			$parent.removeClass(config.CLASSES.rotatorSliding);
			
			el.removeClass(config.CLASSES.removeIn);
			el.attr('tabindex','-1');
			el[0].offsetWidth;
			
			$(document).trigger('tgtRotatorComplete',{'el':el});
			
		}
		
		var outComplete = function(el) {
		
			el.removeClass(config.CLASSES.removeOut);
			el.removeAttr('tabindex');
			el[0].offsetWidth;
			
		}
		
		var cssAnimationReset = function(el,css) {
			
			el.removeClass(config.CLASSES.rotatorItem);
			el[0].offsetWidth;
			el.addClass(config.CLASSES.rotatorItem);
			
		}
		
		var getTransitionCallback = function() {
			
			var transitionEnd = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd';
			return transitionEnd;
	
		}
		
		var getActiveIndex = function(_active) {
			
			var index = $slides.index(_active);
			return index;
			
		}
		
		var getThumbIndex = function() {
			
			var index = $('li',$control).index($this.parent('li'));
			return index;
			
		}
		
		/*
		STARTUP
		*/
		
		var init = function() {
			config = $.extend(true, defaults, options || {});
			getElements();
			setUp();
		}
		
		var getElements = function() {
			$this = elem;
			if($this.hasClass(config.CLASSES.page)) {
				var ul = $this.closest('.rotator-thumbs');
				$parent = $('#' + ul.attr('data-rotator-id'));
			} else if($this.attr('data-rotator-id')) {
				$parent = $('#' + $this.attr('data-rotator-id'));
			} else {
				$parent = $this.closest('.'+config.CLASSES.rotator);
			}
			$slides = $('.'+config.CLASSES.rotatorItem,$parent);
			$control = $('#' + $parent.attr('data-control-id'));
			
		}
		
		var setUp = function() {
			self.handleShow();
			$slides.each(function(index, el){ $(this).addClass(config.CLASSES.rotatorItemPrefix+(index+1));});
			$parent.addClass(config.CLASSES.countPrefix+$slides.length);
		}
		
		return init();
		
	}
	
	/*
	PUBLIC METHODS
	*/
	
	var methods = {
		init: function(options) {
			return this.each(function(){
				var element = $(this);
				if (element.data('tgtRotator')) return;
				var rotator = new Rotator(this,options);
				element.data('tgtRotator', rotator);
			});
		},
		show: function(options) {
			return this.each(function(){
				var element = $(this);
				if (element.data('tgtRotator')) {
					element.data('tgtRotator').handleShow();
				} else {
					var rotator = new Rotator(this,options);
					element.data('tgtRotator', rotator);
				}
			});
		}
	};
	
	/*
	PLUGIN
	*/
	
	$.fn.tgtRotator = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tgtRotator' );
		}    
	};
	
	$(function () {
		$('body').on('click.rotator','[data-component=rotator]',function(e){
			e.preventDefault();
			$(this).tgtRotator('show',{cssTransitionsSupported:TargetCA.helpers.supports('transition')});
		});
		
		if(jQuery().touchwipe) {
			$(".rotator-container").each(function(index, el){
				$(this).touchwipe({
					 wipeLeft: function() { $('.rotator-control-next', el).click(); },
					 wipeRight: function() { $('.rotator-control-previous', el).click(); },
					 min_move_x: 20,
					 min_move_y: 20,
					 preventDefaultEvents: true
				});
			});	
		}
	});
	
})(jQuery);


/**
* tgt.Reveal
* jQuery Plugin style re-useable UI controller for
* accessible display of collapseable blocks of content
*/
(function($){

	function Reveal(el,options) {
		
		var self = this;
		var elem = $(el);
		var config;
		
		var defaults = {
			classes: {
				content:'reveal',
				contentOpen: 'reveal-open'
			},
			animation: {
				duration: 400,
				easing: 'easeInOutQuart'
			},
			handleReveal:true,
			cssTransitionsSupported:false,
			inGroup:false
		};
		
		var $this;
		
		/*
		EVENT HANDLERS
		*/
		
		this.handleReveal = function() {
						
			if($this.hasClass(config.classes.contentOpen)) {
				self.hide();
			} else {
				self.show();
			}
			
		}
		
		this.show = function() {
				$this.parent().addClass('reveal-parent-open'); 

			$this.css('display','block');		
			var from = 0;
			var to = $this[0].scrollHeight;
			
			doReveal(to,from,openComplete);
		}
		
		this.hide = function() {
				$this.parent().removeClass('reveal-parent-open');				

			var from = $this.outerHeight();
			var to = 0;
			
			doReveal(to,from,closedComplete);
			
		}
		
		this.remove = function() {
			closedComplete();
		}
		
		var openComplete = function() {
			cssAnimationReset($this,'auto');
			$(document).trigger('tgtRevealOpen',{'el':$this});
		}
		
		var closedComplete = function() {
			
			$this.removeClass(config.classes.contentOpen);
			cssAnimationReset($this,0);
			$this.removeAttr('style');
			$(document).trigger('tgtRevealClosed');
				
		}
		
		/*
		UTILITY
		*/
		
		var doReveal = function(to,from,callback) {
			
			if(from == 0) {
				$this.addClass(config.classes.contentOpen);
			} else {
				$this.removeClass(config.classes.contentOpen);
			}
			
			if(!config.cssTransitionsSupported) {
								
				$this.css({"height":from, "display":"block"});
				
				var css = {"height":to};
				doAnimate($this,css,callback);
				
			} else {
								
				cssAnimationReset($this,from);
				$this.css({"height":to, "display":"block"});
				
				var transitionEnd = getTransitionCallback();
				
				$this.bind(transitionEnd,function(){
					$this.unbind(transitionEnd);
					callback();
				});
				
			}
			
		}
		
		var doAnimate = function(el,css,callback) {
			
			el.stop();
			el.animate(
				css,
				{
					duration: config.animation.duration,
					easing: config.animation.easing,
					complete: function() {
						callback();
					}
				}
			);
			
		}
		
		var cssAnimationReset = function(el,height) {
			
			el.removeClass(config.classes.content);
			el.css('height',height)[0].offsetWidth;
			el.addClass(config.classes.content);
			
		}
		
		var getTransitionCallback = function() {
			
			var transitionEnd = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd';
			return transitionEnd;
	
		}
		
		/*
		STARTUP
		*/
		
		var init = function() {
			config = $.extend(true, defaults, options || {});
			getElements();
			setUp();
		}
		
		var getElements = function() {
			$this = elem;
		}
		
		var setUp = function() {
			config.cssTransitionsSupported = TargetCA.helpers.supports('transition');
			if(config.handleReveal) { self.handleReveal(); }
		}
		
		return init();
		
	}
	
	/*
	PUBLIC METHODS
	*/
	
	var methods = {
		init: function(options) {
			return this.each(function(){
				var element = $(this);
				if (element.data('tgtReveal')) return;
				var reveal = new Reveal(this,options);
				element.data('tgtReveal', reveal);
			});
		},
		toggle: function(options) {
			return this.each(function(){
				var element = $(this);
				if (element.data('tgtReveal')) {
					element.data('tgtReveal').handleReveal();
				} else {
					var reveal = new Reveal(this,options);
					element.data('tgtReveal', reveal);
				}
			});
		},
		close: function(options) {
			return this.each(function(){
				var element = $(this);
				if (element.data('tgtReveal')) {
					element.data('tgtReveal').hide();
				}
			});
		},
		open: function(options) {
			return this.each(function(){
				var element = $(this);				
				if (element.data('tgtReveal')) {
					element.data('tgtReveal').show();
				} else {
					var reveal = new Reveal(this,options);
					element.data('tgtReveal', reveal);
				}
			});
		}
	};
	
	/*
	PLUGIN
	*/
	
	$.fn.tgtReveal = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tgtReveal' );
		}    
	};
	
	$(function() {
		$('body').on('click.accordion', '.section.reveal-container .row.label', function(e) {
			if ($('#guides-overview').css('display') == 'none') {
				var currentElement = $(this).parent().find('.reveal');	
				
				if (currentElement.hasClass('reveal-open') == false) {
					currentElement.tgtReveal('open');
				} else {
					currentElement.tgtReveal('close');
				}

				currentElement.focus();
			}
			return false;
		});
	});
	
})(jQuery);