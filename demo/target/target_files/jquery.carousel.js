/*jQuery carousel*/
(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false)}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){return J[a7].distance}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}})(jQuery);

(function($){
	var methods = {
		init: function(options){
			//console.log($(this).attr("id")+options.vpSelector);
			var settings = {
				vpSelector: ".viewPort",
				vpWidth: 500,
				vpHeight: 200,
				slSelector: ".slide",
				currentSelector: "selected",
				navSelector: null,
				transition: "slide",
				transitionSpeed: "slow",
				rolloverClass: null,
				activeClass: null,
				onStart: null,
				onComplete: null,
				onFirstSlide: null,
				onMiddleSlide: null,
				onLastSlide: null,
				onInitialize: null,
				autoRotate: false,
				rotateDuration: 5000,
				hasFlash:false,
				showNextPrevSlides : false
			}
			return this.each(function(){
				settings = $.extend(settings, options);
				var data = $(this).data("carousel");
				if(!data){
					$(this).data("carousel", {
						target: $(this),
						currentSlide: $(settings.vpSelector+" "+settings.slSelector, $(this))[0],
						currentSlideIndex: 0,
						settings: settings,
						animating: false,
						rotateTimeout:null,
						btnPressed: false,
						direction: "left",
						slideIndex: 0
					});
				}
				$(this).Carousel("applyStyle");
				$(this).Carousel("hideInactive");
				if(settings.navSelector) $(this).Carousel("initNav");
				if(settings.onFirstSlide) settings.onFirstSlide();
				if(settings.autoRotate) $(this).Carousel("rotate");
				if(settings.onInitialize) settings.onInitialize(settings);
			});
		},
		applyStyle: function(){
			return this.each(function(){
				var data = $(this).data("carousel");
				var vp = $(data.settings.vpSelector, $(this));
				var vpWidth = data.settings.vpWidth;
				
				if( data.settings.showNextPrevSlides ){
					vpWidth = '100%';
				}
				
				$(vp).css({ //Style the viewport
					width: vpWidth,
					height: data.settings.vpHeight,
					position: "relative",
					overflow: "hidden"
				});
				$(data.settings.slSelector, vp).each(function(index){
					$(this).css({ //Style the slides
						width: vpWidth,
						height: data.settings.vpHeight,
						position: "absolute",
						top: 0,
						left: ((data.settings.transition=="slide"||data.settings.transition=="loopingSlide"||data.settings.transition=="displayAllLoopingSlide")?index*data.settings.vpWidth:0)
					}).attr("tabindex", "-1");
				});
				
				if( data.settings.transition == "displayAllLoopingSlide" ){
					$( $(data.settings.slSelector, vp)[$(data.settings.slSelector, vp).length-1] ).css( 'left', -data.settings.vpWidth );
				}
			});
		},
		initNav: function(){
			return this.each(function(){
				var data = $(this).data("carousel");
				var el = $(this);
				var vp = $(data.settings.vpSelector, $(this));
				
				if(data.settings.activeClass) $($(data.settings.navSelector+" > li > a", el)[0]).addClass(data.settings.activeClass);
				$(data.settings.navSelector, el).each(function(){
					$("li > a", this).each(function(){
						$(this).click(function(){

							if( data.animating ) return false;
							var slideID = $(this).attr("href");
							$(el).Carousel("stopRotating");
							if( $(slideID).index() > data.currentSlideIndex ) {
								data.direction = "left";
							} else if( $(slideID).index() < data.currentSlideIndex ){
								data.direction = "right";
							}
							var slideIdIndex = $(slideID).index();
							/*if( $('.category.threshold').length != 0) {
								slideIdIndex -= 1;
							}*/
							if(!$(this).hasClass(data.settings.activeClass)) $(el).Carousel("setSlideIndex", slideIdIndex);
							$(this).addClass(data.settings.activeClass);
							return false;
						}).mouseover(function(){
							if(data.settings.rolloverClass && !$(this).hasClass(data.settings.activeClass) ) $(this).addClass(data.settings.rolloverClass);
						}).mouseleave(function(){
							if(data.settings.rolloverClass ) $(this).removeClass(data.settings.rolloverClass);
						});
					});
				});
				
				$( this ).css( 'visibility', 'visible' );
				
				$(el).Carousel( "windowSizeHandler", data, vp );
				$( window ).resize( function(){
					$(el).Carousel( "windowSizeHandler", data, vp );
				});
				$( this ).swipe({ 
					swipeLeft : function( evt, direction, distance ) {
						$(this).Carousel("next", true);
					},
					swipeRight : function( evt, direction, distance ) {
						$(this).Carousel("previous", true);
					}
				});
			});
		},
		windowSizeHandler : function( data, vp ){
			if( $( window ).width() <= 1025 ){
				vp.css( 'width', '100%' ); //set the width to 100%;
				if( $( window ).width() >= data.settings.vpWidth ) {
					$( '.slide', vp ).css( 'width', '100%' );
				} else {
					$( '.slide', vp ).css( 'width', data.settings.vpWidth );
				}
			} else {
				var vpWidth = data.settings.vpWidth;
				if( data.settings.showNextPrevSlides ){
					vpWidth = '100%';
				}
				vp.css( 'width', vpWidth );
				$( '.slide', vp ).css( 'width', data.settings.vpWidth );
			}
		},
		reset: function(){
			return this.each(function(){
				var data = $(this).data("carousel");
				$(data.target).Carousel("setSlideIndex", 0, 0, true);
			});
		},
		setSlideIndex: function(slideIndex, forceSpeed, cancelFocus){
			return this.each(function(){
				var data = $(this).data("carousel");
				if( data.animating ) return;
				if(forceSpeed == undefined){
					forceSpeed = data.settings.transitionSpeed;
				}
				var totalSlides = $(data.settings.slSelector, vp).length;
				if(slideIndex == 0){
					if(data.settings.onFirstSlide) data.settings.onFirstSlide();
				} else if(slideIndex == totalSlides-1){
					if(data.settings.onLastSlide) data.settings.onLastSlide();
				} else {
					if(data.settings.onMiddleSlide) data.settings.onMiddleSlide();
				}
				var vp = $(data.settings.vpSelector, $(this));
				var c = $(this);
				data.animating = true;
				data.slideIndex = slideIndex;
				
				if(data.settings.transition == "slide"){

					if( data.settings.hasFlash ){
						$(data.settings.slSelector, vp).css("visibility", "visible");
					} else {
						$(data.settings.slSelector, vp).css("display", "block");
					}
					if(data.settings.onStart) data.settings.onStart(data);
					
					$(vp).animate({
						scrollLeft: slideIndex*data.settings.vpWidth
					}, forceSpeed, function(){
						data.currentSlideIndex = slideIndex;
						data.currentSlide = $(data.settings.slSelector, vp)[slideIndex];
						$( data.settings.slSelector ).removeClass( data.settings.currentSelector );
						$( data.currentSlide ).addClass( data.settings.currentSelector );
						if(!cancelFocus) $(data.currentSlide).attr('tabindex', -1).focus();
						$(c).Carousel("hideInactive");
						if( data.settings.autoRotate ) {
							$(data.target).Carousel("rotate");
							data.btnPressed = false;
						}
						data.animating = false;
						if(data.settings.onComplete) data.settings.onComplete(data);
					});
				} else if(data.settings.transition == "fade"){
					$(data.settings.slSelector, vp).each(function(){
						if(this != $(data.settings.slSelector, vp)[slideIndex]){
							$(this).fadeOut(forceSpeed);
						} else {
							$(this).fadeIn(forceSpeed, function(){
								data.currentSlideIndex = slideIndex;
								data.currentSlide = $(data.settings.slSelector, vp)[slideIndex];
								$( data.settings.slSelector ).removeClass( data.settings.currentSelector );
								$( data.currentSlide ).addClass( data.settings.currentSelector );
								if(!cancelFocus) $(data.currentSlide).attr('tabindex', -1).focus();
								if( data.settings.autoRotate ) {
									$(data.target).Carousel("rotate");
									data.btnPressed = false;
								}
								data.animating = false;
								if(data.settings.onComplete) data.settings.onComplete(data);
							});
							if(data.settings.onStart) data.settings.onStart(data);
						}
					});
				} else if( data.settings.transition == "loopingSlide" ) {
					if(data.settings.onStart) data.settings.onStart(data);
					var leftPosition = data.settings.vpWidth;
					if( $( window ).width() >= data.settings.vpWidth && $( window ).width() <= 1025 ) {
						leftPosition = $( window ).width();
					}

					if( data.direction == "left" ){
						if( slideIndex != data.currentSlideIndex ){
							$( $(data.settings.slSelector, vp)[slideIndex] ).show().css( 'left', leftPosition );
							
							$( $(data.settings.slSelector, vp)[data.currentSlideIndex] ).animate({
								left:-leftPosition
							}, forceSpeed );
						}
					} else if( data.direction == "right" ) {
						if( slideIndex != data.currentSlideIndex ){
							$( $(data.settings.slSelector, vp)[slideIndex] ).show().css( 'left', -leftPosition );
						
							$( $(data.settings.slSelector, vp)[data.currentSlideIndex] ).animate({
								left:leftPosition
							}, forceSpeed );
						}
					}
					$( $(data.settings.slSelector, vp)[slideIndex] ).animate({
						left: 0
					}, forceSpeed, function(){
						data.currentSlideIndex = slideIndex;
						data.currentSlide = $(data.settings.slSelector, vp)[slideIndex];
						$( data.settings.slSelector ).removeClass( data.settings.currentSelector );
						$( data.currentSlide ).addClass( data.settings.currentSelector );
						$( $(data.settings.slSelector, vp)[slideIndex] ).addClass( data.settings.currentSelector );
						//if(!cancelFocus) $(data.currentSlide).attr('tabindex', -1).focus();
						$(c).Carousel("hideInactive");
						if( data.settings.autoRotate ) {
							$(data.target).Carousel("rotate");
							data.btnPressed = false;
						}
						data.animating = false;
						if(data.settings.onComplete) data.settings.onComplete(data);
					});
				} else if( data.settings.transition == "displayAllLoopingSlide" ){
					if(data.settings.onStart) data.settings.onStart(data);
					
					var indexDifference = slideIndex - data.currentSlideIndex;
					//var direction = "left";
					data.direction = "left";
					//determine if we should be going left or right
					if( indexDifference > Math.floor( $( data.settings.slSelector, vp ).length / 2 ) || indexDifference < -( Math.floor( $( data.settings.slSelector, vp ).length / 2 ) ) ) {
						if( indexDifference > Math.floor( $( data.settings.slSelector, vp ).length / 2 ) ) {
							//going right
							indexDifference = -( $( data.settings.slSelector, vp ).length - indexDifference );
							//direction = "right";
							data.direction = "right";
						} else if( indexDifference < -( Math.floor( $( data.settings.slSelector, vp ).length / 2 ) ) ) {
							//going left
							indexDifference = $( data.settings.slSelector, vp ).length + indexDifference;
						}
					}
					
					var i;
					var clonedArray = new Array();
					var originalArray = new Array();
					var positionArray = new Array();
					var maxLength = $( data.settings.slSelector, vp ).length;
					var maxLeft = 0;
					var inverseLeft = 0;
					var minLeft = 0;
					
					var nextIndex = slideIndex + 1;
					var prevIndex = slideIndex - 1;
					
					if( nextIndex >= $( data.settings.slSelector, vp ).length ){
						nextIndex = 0;
					}
					
					if( prevIndex < 0 ){
						prevIndex = $( data.settings.slSelector, vp ).length - 1;
					}
					
					$.each( $( data.settings.slSelector, vp ), function( index, value ){
						originalArray.push( $( value ) );
						var clonedElement = $( value ).clone();
						clonedElement.addClass( "clone" );
						clonedArray.push( clonedElement );
						positionArray.push( clonedElement );
						
						var checkLeft = parseFloat( $( value ).css( 'left' ), 10 );
						if( checkLeft > maxLeft ){
							maxLeft = checkLeft;
						}
						if( checkLeft < minLeft ){
							minLeft = checkLeft;
						}
						inverseLeft = minLeft * -1;
						if( inverseLeft > maxLeft ){
							maxLeft = inverseLeft;
						}
					});
					
					//adds the cloned items to the DOM in the proper CSS positioning
					for( i = 0; i < clonedArray.length; i++ ){
						clonedArray[i].insertAfter( $( $( data.settings.slSelector, vp )[$(data.settings.slSelector, vp).length-1] ) );
					}
					if( data.direction == "left" ){
						var lastElement = clonedArray.pop();
						clonedArray.unshift( lastElement );
						
						for( i = 0; i < clonedArray.length; i++ ){
							var clonedLeftStart = maxLeft + ( data.settings.vpWidth * ( i + 2 ) ); // +2 to set the next cloned element one slide to the left
							clonedArray[i].css( 'left', clonedLeftStart );
						}
					} else if( data.direction == "right" ){
						for( i = clonedArray.length - 1; i >= 0; i-- ){
							var clonedLeftStart = minLeft - ( data.settings.vpWidth * ( maxLength - 1 - i ) );
							clonedArray[i].css( 'left', clonedLeftStart );
						}
					}
					
					positionArray[nextIndex].css( 'left', data.settings.vpWidth * 2 );
					positionArray[prevIndex].css( 'left', -data.settings.vpWidth * 2 );
					
					$.each( $( data.settings.slSelector, vp ), function( index, value ) {
						var parseLeft = parseFloat( $( this ).css( 'left' ), 10 );
						var leftValue = parseLeft - ( data.settings.vpWidth * indexDifference );
						$( value ).animate({
							left : leftValue
						}, forceSpeed, function(){
							if( index == ($( data.settings.slSelector, vp ).length / 2 ) - 1 ){
								$( '.clone', vp ).remove();
								originalArray[nextIndex].css( 'left', data.settings.vpWidth );
								originalArray[slideIndex].css( 'left', 0 );
								originalArray[prevIndex].css( 'left', -data.settings.vpWidth );
								
								data.currentSlideIndex = slideIndex;
								data.currentSlide = $(data.settings.slSelector, vp)[slideIndex];
								
								$( data.settings.slSelector ).removeClass( data.settings.currentSelector );
								$( data.currentSlide ).addClass( data.settings.currentSelector );
								
								$(c).Carousel("hideInactive");
								if( data.settings.autoRotate ) {
									$(data.target).Carousel("rotate");
									data.btnPressed = false;
								}
								data.animating = false;
								if(data.settings.onComplete) data.settings.onComplete(data);
								if (!cancelFocus){
                                    // SA: Requires tabindex = -1 to set programmatic focus
									if( !$( 'body' ).hasClass( 'ie8' ) ){
										$(data.currentSlide).attr('tabindex', -1).focus();
									}
                                }
							}
						} );
					});
				}
				if(data.settings.activeClass){
					$(data.settings.navSelector+" > li > a", this).removeClass(data.settings.activeClass).each(function(){
						if($(this).attr("href") == "#"+$($(data.settings.slSelector, vp)[slideIndex]).attr("id")){
							$(this).addClass(data.settings.activeClass);
						}
					});
				}
			});
		},
		rotate: function(){
			return this.each(function(){
				var data = $(this).data("carousel");
				if(typeof data === "undefined") return;
				if( data.settings.autoRotate ){
					data.rotateTimeout = setTimeout( function(){$(data.target).Carousel("next", true, false);}, data.settings.rotateDuration + data.settings.transitionSpeed );
				}
			});
		},
		stopRotating: function(){
			return this.each(function(){
				var data = $(this).data("carousel");
				if( typeof data.rotateTimeout !== "undefined" ) clearTimeout(data.rotateTimeout);
			});
		},
		next: function(cancelFocus, btnClick){

			return this.each(function(){
				var data = $(this).data("carousel");
				var cancel = false;
				var userClick = true;
				if( typeof cancelFocus !== "undefined" ) cancel = cancelFocus;
				if( typeof btnClick !== "undefined" ) userClick = btnClick;
				if( userClick ){
					$(data.target).Carousel("stopRotating");
				}
				data.direction = "left";
				if(data.currentSlideIndex >= $(data.settings.slSelector, $(data.settings.vpSelector, $(this))).length-1){
					$(this).Carousel("setSlideIndex", 0, data.settings.transitionSpeed, cancelFocus);
					
				} else {

					$(this).Carousel("setSlideIndex", data.currentSlideIndex+1, data.settings.transitionSpeed, cancelFocus);

				}
				data.btnPressed = userClick;

			});
		},
		previous: function(cancelFocus, btnClick){
			return this.each(function(){
				var data = $(this).data("carousel");
				var cancel = false;
				var userClick = true;
				if( typeof cancelFocus !== "undefined" ) cancel = cancelFocus;
				if( typeof btnClick !== "undefined" ) userClick = btnClick;
				if( userClick ){
					$(data.target).Carousel("stopRotating");
				}
				data.direction = "right";
				if(data.currentSlideIndex <= 0){
					$(this).Carousel("setSlideIndex", $(data.settings.slSelector, $(data.settings.vpSelector, $(this))).length-1, data.settings.transitionSpeed, cancelFocus);
				} else {
					$(this).Carousel("setSlideIndex", data.currentSlideIndex-1, data.settings.transitionSpeed, cancelFocus);
				}
				data.btnPressed = userClick;
			});
		},
		hideInactive: function(){
			return this.each(function(){
				var data = $(this).data("carousel");
				var vp = $(data.settings.vpSelector, $(this));
				$(data.settings.slSelector, vp).each(function(){
					if(this != data.currentSlide) {
						$(this).attr("aria-hidden", true); // SA: just to ensure that these slides are hidden from screen readers when they are off screen
						if( data.settings.hasFlash ){
							$(this).css("visibility", "hidden");
						} else {
							if( !data.settings.showNextPrevSlides ){
								$(this).css("display", "none");
							}
						}
					} else {
						$(this).attr("aria-hidden", false); // SA: the opposite of above for the current slide
					}
				});
			});
		},
		updateWidth : function ( newWidth, lookbooktype ) {
			return this.each(function(){
				var data = $(this).data("carousel");
				//console.log( data.settings );
				data.settings.vpWidth = newWidth;
				if( lookbooktype != "inpage" ){
					$( data.settings.slSelector, $( this ) ).css( { 'width' : '100%', 'height' : $( data.settings.slSelector + ' img', $( this ) ).height() } );
					$( data.settings.vpSelector, $( this ) ).css( 'height', $( data.settings.slSelector + ' img', $( this ) ).height() );
				} else {
					$( data.settings.slSelector, $( this ) ).css( { 'width' : '100%' } );
					$( data.settings.vpSelector, $( this ) ).css( { 'width' : data.settings.vpWidth } );
				}
				
				$(this).Carousel( "setSlideIndex", data.slideIndex, data.settings.transitionSpeed, false );
			});
		},
		updateHeight : function( newHeight ){
			return this.each(function(){
				var data = $(this).data("carousel");
				data.settings.vpHeight = newHeight;
				$( data.settings.slSelector, $( this ) ).css( { 'height' : newHeight } );
				$( data.settings.vpSelector, $( this ) ).css( { 'height' : newHeight } );
			});
		},
		inpageswipe : function(){
			return this.each(function(){
				$( this ).swipe({ 
					swipeLeft : function( evt, direction, distance ) {
						$(this).Carousel("next");
					},
					swipeRight : function( evt, direction, distance ) {
						$(this).Carousel("previous");
					}
				});
			});
		},
		initSlideItems: function(options){
			var itemCache = [],
				setting = $(this).data("carousel").settings;
			
			var itemIndex = this.data("carousel").currentSlideIndex * setting.itemPerSlide,
				_itemSelector = options.itemSelector || setting.itSelector || ".item",
				_itemPerSlide = options.itemPerSlide || setting.itemPerSlide || 1,
				newSlideIndex = Math.floor(itemIndex/_itemPerSlide);
			
			
			if(setting.itemPerSlide == _itemPerSlide) return;
			setting.itemPerSlide = _itemPerSlide;

			$(_itemSelector, this).each(function(index){

				itemCache.push($(this).detach());
			});

			$(setting.slSelector, this).remove();

			var i = 0;
			while (i < itemCache.length) {
				var el = "<li id='slide"+(Math.floor(i/_itemPerSlide)+1)+"' class='"+setting.slSelector.split(".")[1]+" "+(((Math.floor(i/_itemPerSlide)+1) == newSlideIndex)?"selected":"")+"'>";
				el += "</li>";
				$(setting.vpSelector + " ul", this).append(el);
				for(var t = 0; t < _itemPerSlide; t++) {
					if(itemCache[i+t]) {
						$(setting.vpSelector + " ul #slide"+(Math.floor(i/_itemPerSlide)+1), this).append(itemCache[i+t]);
					}
				}
				i += _itemPerSlide;
			}
			var navEl = "";
			var c = 0, cLen = itemCache.length%_itemPerSlide?Math.floor(itemCache.length/_itemPerSlide)+1:itemCache.length/_itemPerSlide;
			for(; c<cLen; c++) {
				navEl += "<li>"
					navEl += '<a href="#slide'+(c+1)+'"> <img src="/assets/images/content-pages/inpage-look-book/gallery-combined.png" alt="'+c+' '+((culture == "en")?"of":"de")+' '+cLen+'" /> </a>';
				navEl += "</li>";
			}
			$("nav .nav", this).empty().append(navEl);

			if(itemCache.length <= _itemPerSlide) {
				$( 'p.page', this ).css("visibility","hidden");
				$( 'nav', this ).hide();
			} else {
				$( 'p.page', this ).css("visibility","visible");
				$( 'nav', this ).show();
			}

			$(this).Carousel("applyStyle");
			$(this).Carousel("setSlideIndex", newSlideIndex, 0, true);

			//$(this).Carousel("hideInactive");
			//if(setting.navSelector) $(this).Carousel("initNav");
		}
	}
	$.fn.Carousel = function(method){
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.Carousel' );
		}
	}
})(jQuery);