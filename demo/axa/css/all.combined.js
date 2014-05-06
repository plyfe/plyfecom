/*!
 * Bootstrap v3.0.0-rc.2
 *
 * Copyright 2013 Twitter, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Designed and built with all the love in the world @twitter by @mdo and @fat.
 */

+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function f(){e.trigger("closed.bs.alert").remove()}var c=a(this),d=c.attr("data-target");d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));var e=a(d);b&&b.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(b=a.Event("close.bs.alert"));if(b.isDefaultPrevented())return;e.removeClass("in"),a.support.transition&&e.hasClass("fade")?e.one(a.support.transition.end,f).emulateTransitionEnd(150):f()};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),typeof b=="string"&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d)};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",e.resetText||c.data("resetText",c[d]()),c[d](e[a]||this.options[a]),setTimeout(function(){a=="loadingText"?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons"]');if(a.length){var b=this.$element.find("input").prop("checked",!this.$element.hasClass("active")).trigger("change");b.prop("type")==="radio"&&a.find(".active").removeClass("active")}this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f=typeof c=="object"&&c;e||d.data("bs.button",e=new b(this,f)),c=="toggle"?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(window.jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.pause=="hover"&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();if(b>this.$items.length-1||b<0)return;return this.sliding?this.$element.one("slid",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){if(this.sliding)return;return this.slide("next")},b.prototype.prev=function(){if(this.sliding)return;return this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g=b=="next"?"left":"right",h=b=="next"?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}this.sliding=!0,f&&this.pause();var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});if(e.hasClass("active"))return;this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")}));if(a.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(j);if(j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)}).emulateTransitionEnd(600)}else{this.$element.trigger(j);if(j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),typeof c=="object"&&c),g=typeof c=="string"?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),typeof c=="number"?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c=a(this),d,e=a(c.attr("data-target")||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),c.data()),g=c.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=c.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(window.jQuery),+function(a){function e(){a(b).remove(),a(c).each(function(b){var c=f(a(this));if(!c.hasClass("open"))return;c.trigger(b=a.Event("hide.bs.dropdown"));if(b.isDefaultPrevented())return;c.removeClass("open").trigger("hidden.bs.dropdown")})}function f(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}"use strict";var b=".dropdown-backdrop",c="[data-toggle=dropdown]",d=function(b){var c=a(b).on("click.bs.dropdown",this.toggle)};d.prototype.toggle=function(b){var c=a(this);if(c.is(".disabled, :disabled"))return;var d=f(c),g=d.hasClass("open");e();if(!g){"ontouchstart"in document.documentElement&&!d.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",e),d.trigger(b=a.Event("show.bs.dropdown"));if(b.isDefaultPrevented())return;d.toggleClass("open").trigger("shown.bs.dropdown"),c.focus()}return!1},d.prototype.keydown=function(b){if(!/(38|40|27)/.test(b.keyCode))return;var d=a(this);b.preventDefault(),b.stopPropagation();if(d.is(".disabled, :disabled"))return;var e=f(d),g=e.hasClass("open");if(!g||g&&b.keyCode==27)return b.which==27&&e.find(c).focus(),d.click();var h=a("[role=menu] li:not(.divider):visible a",e);if(!h.length)return;var i=h.index(h.filter(":focus"));b.keyCode==38&&i>0&&i--,b.keyCode==40&&i<h.length-1&&i++,~i||(i=0),h.eq(i).focus()};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),e=c.data("dropdown");e||c.data("dropdown",e=new d(this)),typeof b=="string"&&e[b].call(c)})},a.fn.dropdown.Constructor=d,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",c,d.prototype.toggle).on("keydown.bs.dropdown.data-api",c+", [role=menu]",d.prototype.keydown)}(window.jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d);if(this.isShown||d.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.$element.on("click.dismiss.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show(),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)})},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b);if(!this.isShown||b.isDefaultPrevented())return;this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]!==a.target&&!this.$element.has(a.target).length&&this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){a.which==27&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this,d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var e=a.support.transition&&d;this.$backdrop=a('<div class="modal-backdrop '+d+'" />').appendTo(document.body),this.$element.on("click.dismiss.modal",a.proxy(function(a){if(a.target!==a.currentTarget)return;this.options.backdrop=="static"?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!b)return;e?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),typeof c=="object"&&c);f||e.data("bs.modal",f=new b(this,g)),typeof c=="string"?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(window.jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);var e=this.options.trigger.split(" ");for(var f=e.length;f--;){var g=e[f];if(g=="click")this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if(g!="manual"){var h=g=="hover"?"mouseenter":"focus",i=g=="hover"?"mouseleave":"blur";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(c.timeout),c.hoverState="in";if(!c.options.delay||!c.options.delay.show)return c.show();c.timeout=setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show)},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);clearTimeout(c.timeout),c.hoverState="out";if(!c.options.delay||!c.options.delay.hide)return c.hide();c.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this.tip();this.setContent(),this.options.animation&&c.addClass("fade");var d=typeof this.options.placement=="function"?this.options.placement.call(this,c[0],this.$element[0]):this.options.placement,e=/\s?auto?\s?/i,f=e.test(d);f&&(d=d.replace(e,"")||"top"),c.detach().css({top:0,left:0,display:"block"}).addClass(d),this.options.container?c.appendTo(this.options.container):c.insertAfter(this.$element);var g=this.getPosition(),h=c[0].offsetWidth,i=c[0].offsetHeight;if(f){var j=this.$element.parent(),k=d,l=document.documentElement.scrollTop||document.body.scrollTop,m=this.options.container=="body"?window.innerWidth:j.outerWidth(),n=this.options.container=="body"?window.innerHeight:j.outerHeight(),o=this.options.container=="body"?0:j.offset().left;d=d=="bottom"&&g.top+g.height+i-l>n?"top":d=="top"&&g.top-l-i<0?"bottom":d=="right"&&g.right+h>m?"left":d=="left"&&g.left-h<o?"right":d,c.removeClass(k).addClass(d)}var p=this.getCalculatedOffset(d,g,h,i);this.applyPlacement(p,d),this.$element.trigger("shown.bs."+this.type)}},b.prototype.applyPlacement=function(a,b){var c,d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),a.top=a.top+g,a.left=a.left+h,d.offset(a).addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;b=="top"&&j!=f&&(c=!0,a.top=a.top+f-j);if(/bottom|top/.test(b)){var k=0;a.left<0&&(k=a.left*-2,a.left=0,d.offset(a),i=d[0].offsetWidth,j=d[0].offsetHeight),this.replaceArrow(k-e+i,i,"left")}else this.replaceArrow(j-f,j,"top");c&&d.offset(a)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function e(){b.hoverState!="in"&&c.detach()}var b=this,c=this.tip(),d=a.Event("hide.bs."+this.type);this.$element.trigger(d);if(d.isDefaultPrevented())return;return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?c.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),this.$element.trigger("hidden.bs."+this.type),this},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},typeof b.getBoundingClientRect=="function"?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return a=="bottom"?{top:b.top+b.height,left:b.left+b.width/2-c/2}:a=="top"?{top:b.top-d,left:b.left+b.width/2-c/2}:a=="left"?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f=typeof c=="object"&&c;e||d.data("bs.tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||(typeof b.content=="function"?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f=typeof c=="object"&&c;e||d.data("bs.popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target");d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));if(b.parent("li").hasClass("active"))return;var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});b.trigger(f);if(f.isDefaultPrevented())return;var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})},b.prototype.activate=function(b,c,d){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),f?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var e=c.find("> .active"),f=d&&a.support.transition&&e.hasClass("fade");f?e.one(a.support.transition.end,g).emulateTransitionEnd(150):g(),e.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),typeof c=="string"&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;typeof f!="object"&&(h=g=f),typeof g=="function"&&(g=f.top()),typeof h=="function"&&(h=f.bottom());var i=this.unpin!=null&&d+this.unpin<=e.top?!1:h!=null&&e.top+this.$element.height()>=c-h?"bottom":g!=null&&d<=g?"top":!1;if(this.affixed===i)return;this.unpin&&this.$element.css("top",""),this.affixed=i,this.unpin=i=="bottom"?e.top-d:null,this.$element.removeClass(b.RESET).addClass("affix"+(i?"-"+i:"")),i=="bottom"&&this.$element.offset({top:document.body.offsetHeight-h-this.$element.height()})};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f=typeof c=="object"&&c;e||d.data("bs.affix",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in"))return;var b=a.Event("show.bs.collapse");this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])},b.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in"))return;var b=a.Event("hide.bs.collapse");this.$element.trigger(b);if(b.isDefaultPrevented())return;var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};if(!a.support.transition)return d.call(this);this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350)},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),typeof c=="object"&&c);e||d.data("bs.collapse",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c=a(this),d,e=c.attr("data-target")||b.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":c.data(),i=c.attr("data-parent"),j=i&&a(i);if(!g||!g.transitioning)j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(c).addClass("collapsed"),c[f.hasClass("in")?"addClass":"removeClass"]("collapsed");f.collapse(h)})}(window.jQuery),+function(a){function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}"use strict",b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this,d=this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#\w/.test(e)&&a(e);return f&&f.length&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,c=b-this.$scrollElement.height(),d=this.offsets,e=this.targets,f=this.activeTarget,g;if(a>=c)return f!=(g=e.last()[0])&&this.activate(g);for(g=d.length;g--;)f!=e[g]&&a>=d[g]&&(!d[g+1]||a<=d[g+1])&&this.activate(e[g])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parents(".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f=typeof c=="object"&&c;e||d.data("bs.scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),+function(a){function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(a.style[c]!==undefined)return{end:b[c]}}"use strict",a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(window.jQuery)
/*! jQuery Mobile 1.3.2 | Git HEAD hash: 528cf0e <> 2013-07-19T22:17:57Z | (c) 2010, 2013 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b,c){"function"==typeof define&&define.amd?define(["jquery"],function(d){return c(d,a,b),d.mobile}):c(a.jQuery,a,b)}(this,document,function(a,b,c,d){!function(a){a.mobile={}}(a),function(a,b,d){var e={};a.mobile=a.extend(a.mobile,{version:"1.3.2",ns:"",subPageUrlKey:"ui-page",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,minScrollBack:250,touchOverflowEnabled:!1,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"e",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,orientationChangeEnabled:!0,buttonMarkup:{hoverDelay:200},window:a(b),document:a(c),keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},behaviors:{},silentScroll:function(c){"number"!==a.type(c)&&(c=a.mobile.defaultHomeScroll),a.event.special.scrollstart.enabled=!1,setTimeout(function(){b.scrollTo(0,c),a.mobile.document.trigger("silentscroll",{x:0,y:c})},20),setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},nsNormalizeDict:e,nsNormalize:function(b){return b?e[b]||(e[b]=a.camelCase(a.mobile.ns+b)):void 0},getInheritedTheme:function(a,b){for(var c,d,e=a[0],f="",g=/ui-(bar|body|overlay)-([a-z])\b/;e&&(c=e.className||"",!(c&&(d=g.exec(c))&&(f=d[2])));)e=e.parentNode;return f||b||"a"},closestPageData:function(a){return a.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("mobile-page")},enhanceable:function(a){return this.haveParents(a,"enhance")},hijackable:function(a){return this.haveParents(a,"ajax")},haveParents:function(b,c){if(!a.mobile.ignoreContentEnabled)return b;for(var d,e,f,g=b.length,h=a(),i=0;g>i;i++){for(e=b.eq(i),f=!1,d=b[i];d;){var j=d.getAttribute?d.getAttribute("data-"+a.mobile.ns+c):"";if("false"===j){f=!0;break}d=d.parentNode}f||(h=h.add(e))}return h},getScreenHeight:function(){return b.innerHeight||a.mobile.window.height()}},a.mobile),a.fn.jqmData=function(b,c){var e;return"undefined"!=typeof b&&(b&&(b=a.mobile.nsNormalize(b)),e=arguments.length<2||c===d?this.data(b):this.data(b,c)),e},a.jqmData=function(b,c,d){var e;return"undefined"!=typeof c&&(e=a.data(b,c?a.mobile.nsNormalize(c):c,d)),e},a.fn.jqmRemoveData=function(b){return this.removeData(a.mobile.nsNormalize(b))},a.jqmRemoveData=function(b,c){return a.removeData(b,a.mobile.nsNormalize(c))},a.fn.removeWithDependents=function(){a.removeWithDependents(this)},a.removeWithDependents=function(b){var c=a(b);(c.jqmData("dependents")||a()).remove(),c.remove()},a.fn.addDependents=function(b){a.addDependents(a(this),b)},a.addDependents=function(b,c){var d=a(b).jqmData("dependents")||a();a(b).jqmData("dependents",a.merge(d,c))},a.fn.getEncodedText=function(){return a("<div/>").text(a(this).text()).html()},a.fn.jqmEnhanceable=function(){return a.mobile.enhanceable(this)},a.fn.jqmHijackable=function(){return a.mobile.hijackable(this)};var f=a.find,g=/:jqmData\(([^)]*)\)/g;a.find=function(b,c,d,e){return b=b.replace(g,"[data-"+(a.mobile.ns||"")+"$1]"),f.call(this,b,c,d,e)},a.extend(a.find,f),a.find.matches=function(b,c){return a.find(b,null,null,c)},a.find.matchesSelector=function(b,c){return a.find(c,null,null,[b]).length>0}}(a,this),function(a,b){var c=0,d=Array.prototype.slice,e=a.cleanData;a.cleanData=function(b){for(var c,d=0;null!=(c=b[d]);d++)try{a(c).triggerHandler("remove")}catch(f){}e(b)},a.widget=function(b,c,d){var e,f,g,h,i=b.split(".")[0];b=b.split(".")[1],e=i+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e.toLowerCase()]=function(b){return!!a.data(b,e)},a[i]=a[i]||{},f=a[i][b],g=a[i][b]=function(a,b){return this._createWidget?(arguments.length&&this._createWidget(a,b),void 0):new g(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,e){a.isFunction(e)&&(d[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},d=function(a){return c.prototype[b].apply(this,a)};return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=d,b=e.apply(this,arguments),this._super=c,this._superApply=f,b}}())}),g.prototype=a.widget.extend(h,{widgetEventPrefix:f?h.widgetEventPrefix:b},d,{constructor:g,namespace:i,widgetName:b,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g)},a.widget.extend=function(c){for(var e,f,g=d.call(arguments,1),h=0,i=g.length;i>h;h++)for(e in g[h])f=g[h][e],g[h].hasOwnProperty(e)&&f!==b&&(c[e]=a.isPlainObject(f)?a.isPlainObject(c[e])?a.widget.extend({},c[e],f):a.widget.extend({},f):f);return c},a.widget.bridge=function(c,e){var f=e.prototype.widgetFullName||c;a.fn[c]=function(g){var h="string"==typeof g,i=d.call(arguments,1),j=this;return g=!h&&i.length?a.widget.extend.apply(null,[g].concat(i)):g,h?this.each(function(){var d,e=a.data(this,f);return e?a.isFunction(e[g])&&"_"!==g.charAt(0)?(d=e[g].apply(e,i),d!==e&&d!==b?(j=d&&d.jquery?j.pushStack(d.get()):d,!1):void 0):a.error("no such method '"+g+"' for "+c+" widget instance"):a.error("cannot call methods on "+c+" prior to initialization; "+"attempted to call method '"+g+"'")}):this.each(function(){var b=a.data(this,f);b?b.option(g||{})._init():a.data(this,f,new e(g,this))}),j}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(b,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=c++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=a.widget.extend({},this.options,this._getCreateOptions(),b),this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(c,d){var e,f,g,h=c;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof c)if(h={},e=c.split("."),c=e.shift(),e.length){for(f=h[c]=a.widget.extend({},this.options[c]),g=0;g<e.length-1;g++)f[e[g]]=f[e[g]]||{},f=f[e[g]];if(c=e.pop(),d===b)return f[c]===b?null:f[c];f[c]=d}else{if(d===b)return this.options[c]===b?null:this.options[c];h[c]=d}return this._setOptions(h),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,"disabled"===a&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!b).attr("aria-disabled",b),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){return b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled")?("string"==typeof g?f[g]:g).apply(f,arguments):void 0}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^(\w+)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.delegate(k,j,h):c.bind(j,h)})},_off:function(a,b){b=(b||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,a.unbind(b).undelegate(b)},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}})}(a),function(a,b){a.widget("mobile.widget",{_createWidget:function(){a.Widget.prototype._createWidget.apply(this,arguments),this._trigger("init")},_getCreateOptions:function(){var c=this.element,d={};return a.each(this.options,function(a){var e=c.jqmData(a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}));e!==b&&(d[a]=e)}),d},enhanceWithin:function(b,c){this.enhance(a(this.options.initSelector,a(b)),c)},enhance:function(b,c){var d,e,f=a(b);f=a.mobile.enhanceable(f),c&&f.length&&(d=a.mobile.closestPageData(f),e=d&&d.keepNativeSelector()||"",f=f.not(e)),f[this.widgetName]()},raise:function(a){throw"Widget ["+this.widgetName+"]: "+a}})}(a),function(a){a.extend(a.mobile,{loadingMessageTextVisible:d,loadingMessageTheme:d,loadingMessage:d,showPageLoadingMsg:function(b,c,d){a.mobile.loading("show",b,c,d)},hidePageLoadingMsg:function(){a.mobile.loading("hide")},loading:function(){this.loaderWidget.loader.apply(this.loaderWidget,arguments)}});var b="ui-loader",c=a("html"),e=a.mobile.window;a.widget("mobile.loader",{options:{theme:"a",textVisible:!1,html:"",text:"loading"},defaultHtml:"<div class='"+b+"'>"+"<span class='ui-icon ui-icon-loading'></span>"+"<h1></h1>"+"</div>",fakeFixLoader:function(){var b=a("."+a.mobile.activeBtnClass).first();this.element.css({top:a.support.scrollTop&&e.scrollTop()+e.height()/2||b.length&&b.offset().top||100})},checkLoaderPosition:function(){var b=this.element.offset(),c=e.scrollTop(),d=a.mobile.getScreenHeight();(b.top<c||b.top-c>d)&&(this.element.addClass("ui-loader-fakefix"),this.fakeFixLoader(),e.unbind("scroll",this.checkLoaderPosition).bind("scroll",a.proxy(this.fakeFixLoader,this)))},resetHtml:function(){this.element.html(a(this.defaultHtml).html())},show:function(f,g,h){var i,j,k;this.resetHtml(),"object"===a.type(f)?(k=a.extend({},this.options,f),f=k.theme||a.mobile.loadingMessageTheme):(k=this.options,f=f||a.mobile.loadingMessageTheme||k.theme),j=g||a.mobile.loadingMessage||k.text,c.addClass("ui-loading"),(a.mobile.loadingMessage!==!1||k.html)&&(i=a.mobile.loadingMessageTextVisible!==d?a.mobile.loadingMessageTextVisible:k.textVisible,this.element.attr("class",b+" ui-corner-all ui-body-"+f+" ui-loader-"+(i||g||f.text?"verbose":"default")+(k.textonly||h?" ui-loader-textonly":"")),k.html?this.element.html(k.html):this.element.find("h1").text(j),this.element.appendTo(a.mobile.pageContainer),this.checkLoaderPosition(),e.bind("scroll",a.proxy(this.checkLoaderPosition,this)))},hide:function(){c.removeClass("ui-loading"),a.mobile.loadingMessage&&this.element.removeClass("ui-loader-fakefix"),a.mobile.window.unbind("scroll",this.fakeFixLoader),a.mobile.window.unbind("scroll",this.checkLoaderPosition)}}),e.bind("pagecontainercreate",function(){a.mobile.loaderWidget=a.mobile.loaderWidget||a(a.mobile.loader.prototype.defaultHtml).loader()})}(a,this),function(a,b,d){function e(a){return a=a||location.href,"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}var f,g="hashchange",h=c,i=a.event.special,j=h.documentMode,k="on"+g in b&&(j===d||j>7);a.fn[g]=function(a){return a?this.bind(g,a):this.trigger(g)},a.fn[g].delay=50,i[g]=a.extend(i[g],{setup:function(){return k?!1:(a(f.start),void 0)},teardown:function(){return k?!1:(a(f.stop),void 0)}}),f=function(){function c(){var d=e(),h=n(j);d!==j?(m(j=d,h),a(b).trigger(g)):h!==j&&(location.href=location.href.replace(/#.*/,"")+h),f=setTimeout(c,a.fn[g].delay)}var f,i={},j=e(),l=function(a){return a},m=l,n=l;return i.start=function(){f||c()},i.stop=function(){f&&clearTimeout(f),f=d},b.attachEvent&&!b.addEventListener&&!k&&function(){var b,d;i.start=function(){b||(d=a.fn[g].src,d=d&&d+e(),b=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){d||m(e()),c()}).attr("src",d||"javascript:0").insertAfter("body")[0].contentWindow,h.onpropertychange=function(){try{"title"===event.propertyName&&(b.document.title=h.title)}catch(a){}})},i.stop=l,n=function(){return e(b.location.href)},m=function(c,d){var e=b.document,f=a.fn[g].domain;c!==d&&(e.title=h.title,e.open(),f&&e.write('<script>document.domain="'+f+'"</script>'),e.close(),b.location.hash=c)}}(),i}()}(a,this),function(a){b.matchMedia=b.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(c),a.mobile.media=function(a){return b.matchMedia(a).matches}}(a),function(a){var b={touch:"ontouchend"in c};a.mobile.support=a.mobile.support||{},a.extend(a.support,b),a.extend(a.mobile.support,b)}(a),function(a){a.extend(a.support,{orientation:"orientation"in b&&"onorientationchange"in b})}(a),function(a,d){function e(a){var b=a.charAt(0).toUpperCase()+a.substr(1),c=(a+" "+n.join(b+" ")+b).split(" ");for(var e in c)if(m[c[e]]!==d)return!0}function f(a,b,d){for(var e,f=c.createElement("div"),g=function(a){return a.charAt(0).toUpperCase()+a.substr(1)},h=function(a){return""===a?"":"-"+a.charAt(0).toLowerCase()+a.substr(1)+"-"},i=function(c){var d=h(c)+a+": "+b+";",i=g(c),j=i+(""===i?a:g(a));f.setAttribute("style",d),f.style[j]&&(e=!0)},j=d?d:n,k=0;k<j.length;k++)i(j[k]);return!!e}function g(){var e="transform-3d",f=a.mobile.media("(-"+n.join("-"+e+"),(-")+"-"+e+"),("+e+")");if(f)return!!f;var g=c.createElement("div"),h={MozTransform:"-moz-transform",transform:"transform"};l.append(g);for(var i in h)g.style[i]!==d&&(g.style[i]="translate3d( 100px, 1px, 1px )",f=b.getComputedStyle(g).getPropertyValue(h[i]));return!!f&&"none"!==f}function h(){var b,c,d=location.protocol+"//"+location.host+location.pathname+"ui-dir/",e=a("head base"),f=null,g="";return e.length?g=e.attr("href"):e=f=a("<base>",{href:d}).appendTo("head"),b=a("<a href='testurl' />").prependTo(l),c=b[0].href,e[0].href=g||location.pathname,f&&f.remove(),0===c.indexOf(d)}function i(){var a,d=c.createElement("x"),e=c.documentElement,f=b.getComputedStyle;return"pointerEvents"in d.style?(d.style.pointerEvents="auto",d.style.pointerEvents="x",e.appendChild(d),a=f&&"auto"===f(d,"").pointerEvents,e.removeChild(d),!!a):!1}function j(){var a=c.createElement("div");return"undefined"!=typeof a.getBoundingClientRect}function k(){var a=b,c=navigator.userAgent,d=navigator.platform,e=c.match(/AppleWebKit\/([0-9]+)/),f=!!e&&e[1],g=c.match(/Fennec\/([0-9]+)/),h=!!g&&g[1],i=c.match(/Opera Mobi\/([0-9]+)/),j=!!i&&i[1];return(d.indexOf("iPhone")>-1||d.indexOf("iPad")>-1||d.indexOf("iPod")>-1)&&f&&534>f||a.operamini&&"[object OperaMini]"==={}.toString.call(a.operamini)||i&&7458>j||c.indexOf("Android")>-1&&f&&533>f||h&&6>h||"palmGetResource"in b&&f&&534>f||c.indexOf("MeeGo")>-1&&c.indexOf("NokiaBrowser/8.5.0")>-1?!1:!0}var l=a("<body>").prependTo("html"),m=l[0].style,n=["Webkit","Moz","O"],o="palmGetResource"in b,p=b.opera,q=b.operamini&&"[object OperaMini]"==={}.toString.call(b.operamini),r=b.blackberry&&!e("-webkit-transform");a.extend(a.mobile,{browser:{}}),a.mobile.browser.oldIE=function(){var a=3,b=c.createElement("div"),d=b.all||[];do b.innerHTML="<!--[if gt IE "+ ++a+"]><br><![endif]-->";while(d[0]);return a>4?a:!a}(),a.extend(a.support,{cssTransitions:"WebKitTransitionEvent"in b||f("transition","height 100ms linear",["Webkit","Moz",""])&&!a.mobile.browser.oldIE&&!p,pushState:"pushState"in history&&"replaceState"in history&&!(b.navigator.userAgent.indexOf("Firefox")>=0&&b.top!==b)&&-1===b.navigator.userAgent.search(/CriOS/),mediaquery:a.mobile.media("only all"),cssPseudoElement:!!e("content"),touchOverflow:!!e("overflowScrolling"),cssTransform3d:g(),boxShadow:!!e("boxShadow")&&!r,fixedPosition:k(),scrollTop:("pageXOffset"in b||"scrollTop"in c.documentElement||"scrollTop"in l[0])&&!o&&!q,dynamicBaseTag:h(),cssPointerEvents:i(),boundingRect:j()}),l.remove();var s=function(){var a=b.navigator.userAgent;return a.indexOf("Nokia")>-1&&(a.indexOf("Symbian/3")>-1||a.indexOf("Series60/5")>-1)&&a.indexOf("AppleWebKit")>-1&&a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}();a.mobile.gradeA=function(){return(a.support.mediaquery||a.mobile.browser.oldIE&&a.mobile.browser.oldIE>=7)&&(a.support.boundingRect||null!==a.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/))},a.mobile.ajaxBlacklist=b.blackberry&&!b.WebKitPoint||q||s,s&&a(function(){a("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")}),a.support.boxShadow||a("html").addClass("ui-mobile-nosupport-boxshadow")}(a),function(a,b){var c,d=a.mobile.window;a.event.special.navigate=c={bound:!1,pushStateEnabled:!0,originalEventName:b,isPushStateEnabled:function(){return a.support.pushState&&a.mobile.pushStateEnabled===!0&&this.isHashChangeEnabled()},isHashChangeEnabled:function(){return a.mobile.hashListeningEnabled===!0},popstate:function(b){var c=new a.Event("navigate"),e=new a.Event("beforenavigate"),f=b.originalEvent.state||{};location.href,d.trigger(e),e.isDefaultPrevented()||(b.historyState&&a.extend(f,b.historyState),c.originalEvent=b,setTimeout(function(){d.trigger(c,{state:f})},0))},hashchange:function(b){var c=new a.Event("navigate"),e=new a.Event("beforenavigate");d.trigger(e),e.isDefaultPrevented()||(c.originalEvent=b,d.trigger(c,{state:b.hashchangeState||{}}))},setup:function(){c.bound||(c.bound=!0,c.isPushStateEnabled()?(c.originalEventName="popstate",d.bind("popstate.navigate",c.popstate)):c.isHashChangeEnabled()&&(c.originalEventName="hashchange",d.bind("hashchange.navigate",c.hashchange)))}}}(a),function(a,c){var d,e,f="&ui-state=dialog";a.mobile.path=d={uiStateKey:"&ui-state",urlParseRE:/^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,getLocation:function(a){var b=a?this.parseUrl(a):location,c=this.parseUrl(a||location.href).hash;return c="#"===c?"":c,b.protocol+"//"+b.host+b.pathname+b.search+c},parseLocation:function(){return this.parseUrl(this.getLocation())},parseUrl:function(b){if("object"===a.type(b))return b;var c=d.urlParseRE.exec(b||"")||[];return{href:c[0]||"",hrefNoHash:c[1]||"",hrefNoSearch:c[2]||"",domain:c[3]||"",protocol:c[4]||"",doubleSlash:c[5]||"",authority:c[6]||"",username:c[8]||"",password:c[9]||"",host:c[10]||"",hostname:c[11]||"",port:c[12]||"",pathname:c[13]||"",directory:c[14]||"",filename:c[15]||"",search:c[16]||"",hash:c[17]||""}},makePathAbsolute:function(a,b){if(a&&"/"===a.charAt(0))return a;a=a||"",b=b?b.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"";for(var c=b?b.split("/"):[],d=a.split("/"),e=0;e<d.length;e++){var f=d[e];switch(f){case".":break;case"..":c.length&&c.pop();break;default:c.push(f)}}return"/"+c.join("/")},isSameDomain:function(a,b){return d.parseUrl(a).domain===d.parseUrl(b).domain},isRelativeUrl:function(a){return""===d.parseUrl(a).protocol},isAbsoluteUrl:function(a){return""!==d.parseUrl(a).protocol},makeUrlAbsolute:function(a,b){if(!d.isRelativeUrl(a))return a;b===c&&(b=this.documentBase);var e=d.parseUrl(a),f=d.parseUrl(b),g=e.protocol||f.protocol,h=e.protocol?e.doubleSlash:e.doubleSlash||f.doubleSlash,i=e.authority||f.authority,j=""!==e.pathname,k=d.makePathAbsolute(e.pathname||f.filename,f.pathname),l=e.search||!j&&f.search||"",m=e.hash;return g+h+i+k+l+m},addSearchParams:function(b,c){var e=d.parseUrl(b),f="object"==typeof c?a.param(c):c,g=e.search||"?";return e.hrefNoSearch+g+("?"!==g.charAt(g.length-1)?"&":"")+f+(e.hash||"")},convertUrlToDataUrl:function(a){var c=d.parseUrl(a);return d.isEmbeddedPage(c)?c.hash.split(f)[0].replace(/^#/,"").replace(/\?.*$/,""):d.isSameDomain(c,this.documentBase)?c.hrefNoHash.replace(this.documentBase.domain,"").split(f)[0]:b.decodeURIComponent(a)},get:function(a){return a===c&&(a=d.parseLocation().hash),d.stripHash(a).replace(/[^\/]*\.[^\/*]+$/,"")},set:function(a){location.hash=a},isPath:function(a){return/\//.test(a)},clean:function(a){return a.replace(this.documentBase.domain,"")},stripHash:function(a){return a.replace(/^#/,"")},stripQueryParams:function(a){return a.replace(/\?.*$/,"")},cleanHash:function(a){return d.stripHash(a.replace(/\?.*$/,"").replace(f,""))},isHashValid:function(a){return/^#[^#]+$/.test(a)},isExternal:function(a){var b=d.parseUrl(a);return b.protocol&&b.domain!==this.documentUrl.domain?!0:!1},hasProtocol:function(a){return/^(:?\w+:)/.test(a)},isEmbeddedPage:function(a){var b=d.parseUrl(a);return""!==b.protocol?!this.isPath(b.hash)&&b.hash&&(b.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&b.hrefNoHash===this.documentBase.hrefNoHash):/^#/.test(b.href)},squash:function(a,b){var c,e,f,g,h=this.isPath(a),i=this.parseUrl(a),j=i.hash,k="";return b=b||(d.isPath(a)?d.getLocation():d.getDocumentUrl()),e=h?d.stripHash(a):a,e=d.isPath(i.hash)?d.stripHash(i.hash):e,g=e.indexOf(this.uiStateKey),g>-1&&(k=e.slice(g),e=e.slice(0,g)),c=d.makeUrlAbsolute(e,b),f=this.parseUrl(c).search,h?((d.isPath(j)||0===j.replace("#","").indexOf(this.uiStateKey))&&(j=""),k&&-1===j.indexOf(this.uiStateKey)&&(j+=k),-1===j.indexOf("#")&&""!==j&&(j="#"+j),c=d.parseUrl(c),c=c.protocol+"//"+c.host+c.pathname+f+j):c+=c.indexOf("#")>-1?k:"#"+k,c},isPreservableHash:function(a){return 0===a.replace("#","").indexOf(this.uiStateKey)}},d.documentUrl=d.parseLocation(),e=a("head").find("base"),d.documentBase=e.length?d.parseUrl(d.makeUrlAbsolute(e.attr("href"),d.documentUrl.href)):d.documentUrl,d.documentBaseDiffers=d.documentUrl.hrefNoHash!==d.documentBase.hrefNoHash,d.getDocumentUrl=function(b){return b?a.extend({},d.documentUrl):d.documentUrl.href},d.getDocumentBase=function(b){return b?a.extend({},d.documentBase):d.documentBase.href}}(a),function(a,b){a.mobile.path,a.mobile.History=function(a,b){this.stack=a||[],this.activeIndex=b||0},a.extend(a.mobile.History.prototype,{getActive:function(){return this.stack[this.activeIndex]},getLast:function(){return this.stack[this.previousIndex]},getNext:function(){return this.stack[this.activeIndex+1]},getPrev:function(){return this.stack[this.activeIndex-1]},add:function(a,b){b=b||{},this.getNext()&&this.clearForward(),b.hash&&-1===b.hash.indexOf("#")&&(b.hash="#"+b.hash),b.url=a,this.stack.push(b),this.activeIndex=this.stack.length-1},clearForward:function(){this.stack=this.stack.slice(0,this.activeIndex+1)},find:function(a,b,c){b=b||this.stack;var d,e,f,g=b.length;for(e=0;g>e;e++)if(d=b[e],(decodeURIComponent(a)===decodeURIComponent(d.url)||decodeURIComponent(a)===decodeURIComponent(d.hash))&&(f=e,c))return f;return f},closest:function(a){var c,d=this.activeIndex;return c=this.find(a,this.stack.slice(0,d)),c===b&&(c=this.find(a,this.stack.slice(d),!0),c=c===b?c:c+d),c},direct:function(c){var d=this.closest(c.url),e=this.activeIndex;d!==b&&(this.activeIndex=d,this.previousIndex=e),e>d?(c.present||c.back||a.noop)(this.getActive(),"back"):d>e?(c.present||c.forward||a.noop)(this.getActive(),"forward"):d===b&&c.missing&&c.missing(this.getActive())}})}(a),function(a){var d=a.mobile.path,e=location.href;a.mobile.Navigator=function(b){this.history=b,this.ignoreInitialHashChange=!0,a.mobile.window.bind({"popstate.history":a.proxy(this.popstate,this),"hashchange.history":a.proxy(this.hashchange,this)})},a.extend(a.mobile.Navigator.prototype,{squash:function(e,f){var g,h,i=d.isPath(e)?d.stripHash(e):e;return h=d.squash(e),g=a.extend({hash:i,url:h},f),b.history.replaceState(g,g.title||c.title,h),g},hash:function(a,b){var c,e,f;if(c=d.parseUrl(a),e=d.parseLocation(),e.pathname+e.search===c.pathname+c.search)f=c.hash?c.hash:c.pathname+c.search;else if(d.isPath(a)){var g=d.parseUrl(b);f=g.pathname+g.search+(d.isPreservableHash(g.hash)?g.hash.replace("#",""):"")}else f=a;return f},go:function(e,f,g){var h,i,j,k,l=a.event.special.navigate.isPushStateEnabled();i=d.squash(e),j=this.hash(e,i),g&&j!==d.stripHash(d.parseLocation().hash)&&(this.preventNextHashChange=g),this.preventHashAssignPopState=!0,b.location.hash=j,this.preventHashAssignPopState=!1,h=a.extend({url:i,hash:j,title:c.title},f),l&&(k=new a.Event("popstate"),k.originalEvent={type:"popstate",state:null},this.squash(e,h),g||(this.ignorePopState=!0,a.mobile.window.trigger(k))),this.history.add(h.url,h)},popstate:function(b){var c,f;if(a.event.special.navigate.isPushStateEnabled())return this.preventHashAssignPopState?(this.preventHashAssignPopState=!1,b.stopImmediatePropagation(),void 0):this.ignorePopState?(this.ignorePopState=!1,void 0):!b.originalEvent.state&&1===this.history.stack.length&&this.ignoreInitialHashChange&&(this.ignoreInitialHashChange=!1,location.href===e)?(b.preventDefault(),void 0):(c=d.parseLocation().hash,!b.originalEvent.state&&c?(f=this.squash(c),this.history.add(f.url,f),b.historyState=f,void 0):(this.history.direct({url:(b.originalEvent.state||{}).url||c,present:function(c,d){b.historyState=a.extend({},c),b.historyState.direction=d}}),void 0))},hashchange:function(b){var e,f;if(a.event.special.navigate.isHashChangeEnabled()&&!a.event.special.navigate.isPushStateEnabled()){if(this.preventNextHashChange)return this.preventNextHashChange=!1,b.stopImmediatePropagation(),void 0;e=this.history,f=d.parseLocation().hash,this.history.direct({url:f,present:function(c,d){b.hashchangeState=a.extend({},c),b.hashchangeState.direction=d},missing:function(){e.add(f,{hash:f,title:c.title})}})}}})}(a),function(a){a.mobile.navigate=function(b,c,d){a.mobile.navigate.navigator.go(b,c,d)},a.mobile.navigate.history=new a.mobile.History,a.mobile.navigate.navigator=new a.mobile.Navigator(a.mobile.navigate.history);var b=a.mobile.path.parseLocation();a.mobile.navigate.history.add(b.href,{hash:b.hash})}(a),function(a,b,c,d){function e(a){for(;a&&"undefined"!=typeof a.originalEvent;)a=a.originalEvent;return a}function f(b,c){var f,g,h,i,j,k,l,m,n,o=b.type;if(b=a.Event(b),b.type=c,f=b.originalEvent,g=a.event.props,o.search(/^(mouse|click)/)>-1&&(g=D),f)for(l=g.length,i;l;)i=g[--l],b[i]=f[i];if(o.search(/mouse(down|up)|click/)>-1&&!b.which&&(b.which=1),-1!==o.search(/^touch/)&&(h=e(f),o=h.touches,j=h.changedTouches,k=o&&o.length?o[0]:j&&j.length?j[0]:d))for(m=0,n=B.length;n>m;m++)i=B[m],b[i]=k[i];return b}function g(b){for(var c,d,e={};b;){c=a.data(b,y);for(d in c)c[d]&&(e[d]=e.hasVirtualBinding=!0);b=b.parentNode}return e}function h(b,c){for(var d;b;){if(d=a.data(b,y),d&&(!c||d[c]))return b;b=b.parentNode}return null}function i(){L=!1}function j(){L=!0}function k(){P=0,J.length=0,K=!1,j()}function l(){i()}function m(){n(),F=setTimeout(function(){F=0,k()},a.vmouse.resetTimerDuration)}function n(){F&&(clearTimeout(F),F=0)}function o(b,c,d){var e;return(d&&d[b]||!d&&h(c.target,b))&&(e=f(c,b),a(c.target).trigger(e)),e}function p(b){var c=a.data(b.target,z);if(!(K||P&&P===c)){var d=o("v"+b.type,b);d&&(d.isDefaultPrevented()&&b.preventDefault(),d.isPropagationStopped()&&b.stopPropagation(),d.isImmediatePropagationStopped()&&b.stopImmediatePropagation())}}function q(b){var c,d,f=e(b).touches;if(f&&1===f.length&&(c=b.target,d=g(c),d.hasVirtualBinding)){P=O++,a.data(c,z,P),n(),l(),I=!1;var h=e(b).touches[0];G=h.pageX,H=h.pageY,o("vmouseover",b,d),o("vmousedown",b,d)}}function r(a){L||(I||o("vmousecancel",a,g(a.target)),I=!0,m())}function s(b){if(!L){var c=e(b).touches[0],d=I,f=a.vmouse.moveDistanceThreshold,h=g(b.target);I=I||Math.abs(c.pageX-G)>f||Math.abs(c.pageY-H)>f,I&&!d&&o("vmousecancel",b,h),o("vmousemove",b,h),m()}}function t(a){if(!L){j();var b,c=g(a.target);if(o("vmouseup",a,c),!I){var d=o("vclick",a,c);d&&d.isDefaultPrevented()&&(b=e(a).changedTouches[0],J.push({touchID:P,x:b.clientX,y:b.clientY}),K=!0)}o("vmouseout",a,c),I=!1,m()}}function u(b){var c,d=a.data(b,y);if(d)for(c in d)if(d[c])return!0;return!1}function v(){}function w(b){var c=b.substr(1);return{setup:function(){u(this)||a.data(this,y,{});var d=a.data(this,y);d[b]=!0,E[b]=(E[b]||0)+1,1===E[b]&&N.bind(c,p),a(this).bind(c,v),M&&(E.touchstart=(E.touchstart||0)+1,1===E.touchstart&&N.bind("touchstart",q).bind("touchend",t).bind("touchmove",s).bind("scroll",r))},teardown:function(){--E[b],E[b]||N.unbind(c,p),M&&(--E.touchstart,E.touchstart||N.unbind("touchstart",q).unbind("touchmove",s).unbind("touchend",t).unbind("scroll",r));var d=a(this),e=a.data(this,y);e&&(e[b]=!1),d.unbind(c,v),u(this)||d.removeData(y)}}}var x,y="virtualMouseBindings",z="virtualTouchID",A="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),B="clientX clientY pageX pageY screenX screenY".split(" "),C=a.event.mouseHooks?a.event.mouseHooks.props:[],D=a.event.props.concat(C),E={},F=0,G=0,H=0,I=!1,J=[],K=!1,L=!1,M="addEventListener"in c,N=a(c),O=1,P=0;a.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(var Q=0;Q<A.length;Q++)a.event.special[A[Q]]=w(A[Q]);M&&c.addEventListener("click",function(b){var c,d,e,f,g,h,i=J.length,j=b.target;if(i)for(c=b.clientX,d=b.clientY,x=a.vmouse.clickDistanceThreshold,e=j;e;){for(f=0;i>f;f++)if(g=J[f],h=0,e===j&&Math.abs(g.x-c)<x&&Math.abs(g.y-d)<x||a.data(e,z)===g.touchID)return b.preventDefault(),b.stopPropagation(),void 0;e=e.parentNode}},!0)}(a,b,c),function(a,b,d){function e(b,c,d){var e=d.type;d.type=c,a.event.dispatch.call(b,d),d.type=e}var f=a(c);a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)},a.attrFn&&(a.attrFn[c]=!0)});var g=a.mobile.support.touch,h="touchmove scroll",i=g?"touchstart":"mousedown",j=g?"touchend":"mouseup",k=g?"touchmove":"mousemove";a.event.special.scrollstart={enabled:!0,setup:function(){function b(a,b){c=b,e(f,c?"scrollstart":"scrollstop",a)}var c,d,f=this,g=a(f);g.bind(h,function(e){a.event.special.scrollstart.enabled&&(c||b(e,!0),clearTimeout(d),d=setTimeout(function(){b(e,!1)},50))})}},a.event.special.tap={tapholdThreshold:750,setup:function(){var b=this,c=a(b);c.bind("vmousedown",function(d){function g(){clearTimeout(j)}function h(){g(),c.unbind("vclick",i).unbind("vmouseup",g),f.unbind("vmousecancel",h)}function i(a){h(),k===a.target&&e(b,"tap",a)
}if(d.which&&1!==d.which)return!1;var j,k=d.target;d.originalEvent,c.bind("vmouseup",g).bind("vclick",i),f.bind("vmousecancel",h),j=setTimeout(function(){e(b,"taphold",a.Event("taphold",{target:k}))},a.event.special.tap.tapholdThreshold)})}},a.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,start:function(b){var c=b.originalEvent.touches?b.originalEvent.touches[0]:b;return{time:(new Date).getTime(),coords:[c.pageX,c.pageY],origin:a(b.target)}},stop:function(a){var b=a.originalEvent.touches?a.originalEvent.touches[0]:a;return{time:(new Date).getTime(),coords:[b.pageX,b.pageY]}},handleSwipe:function(b,c){c.time-b.time<a.event.special.swipe.durationThreshold&&Math.abs(b.coords[0]-c.coords[0])>a.event.special.swipe.horizontalDistanceThreshold&&Math.abs(b.coords[1]-c.coords[1])<a.event.special.swipe.verticalDistanceThreshold&&b.origin.trigger("swipe").trigger(b.coords[0]>c.coords[0]?"swipeleft":"swiperight")},setup:function(){var b=this,c=a(b);c.bind(i,function(b){function e(b){g&&(f=a.event.special.swipe.stop(b),Math.abs(g.coords[0]-f.coords[0])>a.event.special.swipe.scrollSupressionThreshold&&b.preventDefault())}var f,g=a.event.special.swipe.start(b);c.bind(k,e).one(j,function(){c.unbind(k,e),g&&f&&a.event.special.swipe.handleSwipe(g,f),g=f=d})})}},a.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(b,c){a.event.special[b]={setup:function(){a(this).bind(c,a.noop)}}})}(a,this),function(a){a.event.special.throttledresize={setup:function(){a(this).bind("resize",f)},teardown:function(){a(this).unbind("resize",f)}};var b,c,d,e=250,f=function(){c=(new Date).getTime(),d=c-g,d>=e?(g=c,a(this).trigger("throttledresize")):(b&&clearTimeout(b),b=setTimeout(f,e-d))},g=0}(a),function(a,b){function d(){var a=e();a!==f&&(f=a,i.trigger(j))}var e,f,g,h,i=a(b),j="orientationchange",k={0:!0,180:!0};if(a.support.orientation){var l=b.innerWidth||i.width(),m=b.innerHeight||i.height(),n=50;g=l>m&&l-m>n,h=k[b.orientation],(g&&h||!g&&!h)&&(k={"-90":!0,90:!0})}a.event.special.orientationchange=a.extend({},a.event.special.orientationchange,{setup:function(){return a.support.orientation&&!a.event.special.orientationchange.disabled?!1:(f=e(),i.bind("throttledresize",d),void 0)},teardown:function(){return a.support.orientation&&!a.event.special.orientationchange.disabled?!1:(i.unbind("throttledresize",d),void 0)},add:function(a){var b=a.handler;a.handler=function(a){return a.orientation=e(),b.apply(this,arguments)}}}),a.event.special.orientationchange.orientation=e=function(){var d=!0,e=c.documentElement;return d=a.support.orientation?k[b.orientation]:e&&e.clientWidth/e.clientHeight<1.1,d?"portrait":"landscape"},a.fn[j]=function(a){return a?this.bind(j,a):this.trigger(j)},a.attrFn&&(a.attrFn[j]=!0)}(a,this),function(a){a.widget("mobile.page",a.mobile.widget,{options:{theme:"c",domCache:!1,keepNativeDefault:":jqmData(role='none'), :jqmData(role='nojs')"},_create:function(){return this._trigger("beforecreate")===!1?!1:(this.element.attr("tabindex","0").addClass("ui-page ui-body-"+this.options.theme),this._on(this.element,{pagebeforehide:"removeContainerBackground",pagebeforeshow:"_handlePageBeforeShow"}),void 0)},_handlePageBeforeShow:function(){this.setContainerBackground()},removeContainerBackground:function(){a.mobile.pageContainer.removeClass("ui-overlay-"+a.mobile.getInheritedTheme(this.element.parent()))},setContainerBackground:function(b){this.options.theme&&a.mobile.pageContainer.addClass("ui-overlay-"+(b||this.options.theme))},keepNativeSelector:function(){var b=this.options,c=b.keepNative&&a.trim(b.keepNative);return c&&b.keepNative!==b.keepNativeDefault?[b.keepNative,b.keepNativeDefault].join(", "):b.keepNativeDefault}})}(a),function(a,b,c){var d=function(d){return d===c&&(d=!0),function(c,e,f,g){var h=new a.Deferred,i=e?" reverse":"",j=a.mobile.urlHistory.getActive(),k=j.lastScroll||a.mobile.defaultHomeScroll,l=a.mobile.getScreenHeight(),m=a.mobile.maxTransitionWidth!==!1&&a.mobile.window.width()>a.mobile.maxTransitionWidth,n=!a.support.cssTransitions||m||!c||"none"===c||Math.max(a.mobile.window.scrollTop(),k)>a.mobile.getMaxScrollForTransition(),o=" ui-page-pre-in",p=function(){a.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-"+c)},q=function(){a.event.special.scrollstart.enabled=!1,b.scrollTo(0,k),setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},r=function(){g.removeClass(a.mobile.activePageClass+" out in reverse "+c).height("")},s=function(){d?g.animationComplete(t):t(),g.height(l+a.mobile.window.scrollTop()).addClass(c+" out"+i)},t=function(){g&&d&&r(),u()},u=function(){f.css("z-index",-10),f.addClass(a.mobile.activePageClass+o),a.mobile.focusPage(f),f.height(l+k),q(),f.css("z-index",""),n||f.animationComplete(v),f.removeClass(o).addClass(c+" in"+i),n&&v()},v=function(){d||g&&r(),f.removeClass("out in reverse "+c).height(""),p(),a.mobile.window.scrollTop()!==k&&q(),h.resolve(c,e,f,g,!0)};return p(),g&&!n?s():t(),h.promise()}},e=d(),f=d(!1),g=function(){return 3*a.mobile.getScreenHeight()};a.mobile.defaultTransitionHandler=e,a.mobile.transitionHandlers={"default":a.mobile.defaultTransitionHandler,sequential:e,simultaneous:f},a.mobile.transitionFallbacks={},a.mobile._maybeDegradeTransition=function(b){return b&&!a.support.cssTransform3d&&a.mobile.transitionFallbacks[b]&&(b=a.mobile.transitionFallbacks[b]),b},a.mobile.getMaxScrollForTransition=a.mobile.getMaxScrollForTransition||g}(a,this),function(a,d){function e(b){!p||p.closest("."+a.mobile.activePageClass).length&&!b||p.removeClass(a.mobile.activeBtnClass),p=null}function f(){t=!1,s.length>0&&a.mobile.changePage.apply(null,s.pop())}function g(b,c,d,e){c&&c.data("mobile-page")._trigger("beforehide",null,{nextPage:b}),b.data("mobile-page")._trigger("beforeshow",null,{prevPage:c||a("")}),a.mobile.hidePageLoadingMsg(),d=a.mobile._maybeDegradeTransition(d);var f=a.mobile.transitionHandlers[d||"default"]||a.mobile.defaultTransitionHandler,g=f(d,e,b,c);return g.done(function(){c&&c.data("mobile-page")._trigger("hide",null,{nextPage:b}),b.data("mobile-page")._trigger("show",null,{prevPage:c||a("")})}),g}function h(b,c){c&&b.attr("data-"+a.mobile.ns+"role",c),b.page()}function i(){var b=a.mobile.activePage&&k(a.mobile.activePage);return b||x.hrefNoHash}function j(a){for(;a&&("string"!=typeof a.nodeName||"a"!==a.nodeName.toLowerCase());)a=a.parentNode;return a}function k(b){var c=a(b).closest(".ui-page").jqmData("url"),d=x.hrefNoHash;return c&&n.isPath(c)||(c=d),n.makeUrlAbsolute(c,d)}var l=a.mobile.window,m=(a("html"),a("head")),n=a.extend(a.mobile.path,{getFilePath:function(b){var c="&"+a.mobile.subPageUrlKey;return b&&b.split(c)[0].split(u)[0]},isFirstPageUrl:function(b){var c=n.parseUrl(n.makeUrlAbsolute(b,this.documentBase)),e=c.hrefNoHash===this.documentUrl.hrefNoHash||this.documentBaseDiffers&&c.hrefNoHash===this.documentBase.hrefNoHash,f=a.mobile.firstPage,g=f&&f[0]?f[0].id:d;return e&&(!c.hash||"#"===c.hash||g&&c.hash.replace(/^#/,"")===g)},isPermittedCrossDomainRequest:function(b,c){return a.mobile.allowCrossDomainPages&&"file:"===b.protocol&&-1!==c.search(/^https?:/)}}),o=null,p=null,q=a.Deferred(),r=a.mobile.navigate.history,s=[],t=!1,u="&ui-state=dialog",v=m.children("base"),w=n.documentUrl,x=n.documentBase,y=(n.documentBaseDiffers,a.mobile.getScreenHeight),z=a.support.dynamicBaseTag?{element:v.length?v:a("<base>",{href:x.hrefNoHash}).prependTo(m),set:function(a){a=n.parseUrl(a).hrefNoHash,z.element.attr("href",n.makeUrlAbsolute(a,x))},reset:function(){z.element.attr("href",x.hrefNoSearch)}}:d;a.mobile.getDocumentUrl=n.getDocumentUrl,a.mobile.getDocumentBase=n.getDocumentBase,a.mobile.back=function(){var a=b.navigator;this.phonegapNavigationEnabled&&a&&a.app&&a.app.backHistory?a.app.backHistory():b.history.back()},a.mobile.focusPage=function(a){var b=a.find("[autofocus]"),c=a.find(".ui-title:eq(0)");return b.length?(b.focus(),void 0):(c.length?c.focus():a.focus(),void 0)};var A,B,C=!0;A=function(){if(C){var b=a.mobile.urlHistory.getActive();if(b){var c=l.scrollTop();b.lastScroll=c<a.mobile.minScrollBack?a.mobile.defaultHomeScroll:c}}},B=function(){setTimeout(A,100)},l.bind(a.support.pushState?"popstate":"hashchange",function(){C=!1}),l.one(a.support.pushState?"popstate":"hashchange",function(){C=!0}),l.one("pagecontainercreate",function(){a.mobile.pageContainer.bind("pagechange",function(){C=!0,l.unbind("scrollstop",B),l.bind("scrollstop",B)})}),l.bind("scrollstop",B),a.mobile._maybeDegradeTransition=a.mobile._maybeDegradeTransition||function(a){return a},a.mobile.resetActivePageHeight=function(b){var c=a("."+a.mobile.activePageClass),d=parseFloat(c.css("padding-top")),e=parseFloat(c.css("padding-bottom")),f=parseFloat(c.css("border-top-width")),g=parseFloat(c.css("border-bottom-width"));b="number"==typeof b?b:y(),c.css("min-height",b-d-e-f-g)},a.fn.animationComplete=function(b){return a.support.cssTransitions?a(this).one("webkitAnimationEnd animationend",b):(setTimeout(b,0),a(this))},a.mobile.path=n,a.mobile.base=z,a.mobile.urlHistory=r,a.mobile.dialogHashKey=u,a.mobile.allowCrossDomainPages=!1,a.mobile._bindPageRemove=function(){var b=a(this);!b.data("mobile-page").options.domCache&&b.is(":jqmData(external-page='true')")&&b.bind("pagehide.remove",function(){var b=a(this),c=new a.Event("pageremove");b.trigger(c),c.isDefaultPrevented()||b.removeWithDependents()})},a.mobile.loadPage=function(b,c){var e=a.Deferred(),f=a.extend({},a.mobile.loadPage.defaults,c),g=null,j=null,k=n.makeUrlAbsolute(b,i());f.data&&"get"===f.type&&(k=n.addSearchParams(k,f.data),f.data=d),f.data&&"post"===f.type&&(f.reloadPage=!0);var l=n.getFilePath(k),m=n.convertUrlToDataUrl(k);if(f.pageContainer=f.pageContainer||a.mobile.pageContainer,g=f.pageContainer.children("[data-"+a.mobile.ns+"url='"+m+"']"),0===g.length&&m&&!n.isPath(m)&&(g=f.pageContainer.children("#"+m).attr("data-"+a.mobile.ns+"url",m).jqmData("url",m)),0===g.length)if(a.mobile.firstPage&&n.isFirstPageUrl(l))a.mobile.firstPage.parent().length&&(g=a(a.mobile.firstPage));else if(n.isEmbeddedPage(l))return e.reject(k,c),e.promise();if(g.length){if(!f.reloadPage)return h(g,f.role),e.resolve(k,c,g),z&&!c.prefetch&&z.set(b),e.promise();j=g}var o=f.pageContainer,p=new a.Event("pagebeforeload"),q={url:b,absUrl:k,dataUrl:m,deferred:e,options:f};if(o.trigger(p,q),p.isDefaultPrevented())return e.promise();if(f.showLoadMsg)var r=setTimeout(function(){a.mobile.showPageLoadingMsg()},f.loadMsgDelay),s=function(){clearTimeout(r),a.mobile.hidePageLoadingMsg()};return!z||"undefined"!=typeof c&&"undefined"!=typeof c.prefetch||z.reset(),a.mobile.allowCrossDomainPages||n.isSameDomain(w,k)?a.ajax({url:l,type:f.type,data:f.data,contentType:f.contentType,dataType:"html",success:function(d,i,o){var p=a("<div></div>"),r=d.match(/<title[^>]*>([^<]*)/)&&RegExp.$1,t=new RegExp("(<[^>]+\\bdata-"+a.mobile.ns+"role=[\"']?page[\"']?[^>]*>)"),u=new RegExp("\\bdata-"+a.mobile.ns+"url=[\"']?([^\"'>]*)[\"']?");if(t.test(d)&&RegExp.$1&&u.test(RegExp.$1)&&RegExp.$1&&(b=l=n.getFilePath(a("<div>"+RegExp.$1+"</div>").text())),!z||"undefined"!=typeof c&&"undefined"!=typeof c.prefetch||z.set(l),p.get(0).innerHTML=d,g=p.find(":jqmData(role='page'), :jqmData(role='dialog')").first(),g.length||(g=a("<div data-"+a.mobile.ns+"role='page'>"+(d.split(/<\/?body[^>]*>/gim)[1]||"")+"</div>")),r&&!g.jqmData("title")&&(~r.indexOf("&")&&(r=a("<div>"+r+"</div>").text()),g.jqmData("title",r)),!a.support.dynamicBaseTag){var v=n.get(l);g.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function(){var b=a(this).is("[href]")?"href":a(this).is("[src]")?"src":"action",c=a(this).attr(b);c=c.replace(location.protocol+"//"+location.host+location.pathname,""),/^(\w+:|#|\/)/.test(c)||a(this).attr(b,v+c)})}g.attr("data-"+a.mobile.ns+"url",n.convertUrlToDataUrl(l)).attr("data-"+a.mobile.ns+"external-page",!0).appendTo(f.pageContainer),g.one("pagecreate",a.mobile._bindPageRemove),h(g,f.role),k.indexOf("&"+a.mobile.subPageUrlKey)>-1&&(g=f.pageContainer.children("[data-"+a.mobile.ns+"url='"+m+"']")),f.showLoadMsg&&s(),q.xhr=o,q.textStatus=i,q.page=g,f.pageContainer.trigger("pageload",q),e.resolve(k,c,g,j)},error:function(b,d,g){z&&z.set(n.get()),q.xhr=b,q.textStatus=d,q.errorThrown=g;var h=new a.Event("pageloadfailed");f.pageContainer.trigger(h,q),h.isDefaultPrevented()||(f.showLoadMsg&&(s(),a.mobile.showPageLoadingMsg(a.mobile.pageLoadErrorMessageTheme,a.mobile.pageLoadErrorMessage,!0),setTimeout(a.mobile.hidePageLoadingMsg,1500)),e.reject(k,c))}}):e.reject(k,c),e.promise()},a.mobile.loadPage.defaults={type:"get",data:d,reloadPage:!1,role:d,showLoadMsg:!1,pageContainer:d,loadMsgDelay:50},a.mobile.changePage=function(b,j){if(t)return s.unshift(arguments),void 0;var k,l=a.extend({},a.mobile.changePage.defaults,j);l.pageContainer=l.pageContainer||a.mobile.pageContainer,l.fromPage=l.fromPage||a.mobile.activePage,k="string"==typeof b;var m=l.pageContainer,o=new a.Event("pagebeforechange"),p={toPage:b,options:l};if(p.absUrl=k?n.makeUrlAbsolute(b,i()):b.data("absUrl"),m.trigger(o,p),!o.isDefaultPrevented()){if(b=p.toPage,k="string"==typeof b,t=!0,k)return l.target=b,a.mobile.loadPage(b,l).done(function(b,c,d,e){t=!1,c.duplicateCachedPage=e,d.data("absUrl",p.absUrl),a.mobile.changePage(d,c)}).fail(function(){e(!0),f(),l.pageContainer.trigger("pagechangefailed",p)}),void 0;b[0]!==a.mobile.firstPage[0]||l.dataUrl||(l.dataUrl=w.hrefNoHash);var q=l.fromPage,v=l.dataUrl&&n.convertUrlToDataUrl(l.dataUrl)||b.jqmData("url"),x=v,y=(n.getFilePath(v),r.getActive()),z=0===r.activeIndex,A=0,B=c.title,C="dialog"===l.role||"dialog"===b.jqmData("role");if(q&&q[0]===b[0]&&!l.allowSamePageTransition)return t=!1,m.trigger("pagechange",p),l.fromHashChange&&r.direct({url:v}),void 0;h(b,l.role),l.fromHashChange&&(A="back"===j.direction?-1:1);try{c.activeElement&&"body"!==c.activeElement.nodeName.toLowerCase()?a(c.activeElement).blur():a("input:focus, textarea:focus, select:focus").blur()}catch(D){}var E=!1;C&&y&&(y.url&&y.url.indexOf(u)>-1&&a.mobile.activePage&&!a.mobile.activePage.is(".ui-dialog")&&r.activeIndex>0&&(l.changeHash=!1,E=!0),v=y.url||"",v+=!E&&v.indexOf("#")>-1?u:"#"+u,0===r.activeIndex&&v===r.initialDst&&(v+=u));var F=y?b.jqmData("title")||b.children(":jqmData(role='header')").find(".ui-title").text():B;if(F&&B===c.title&&(B=F),b.jqmData("title")||b.jqmData("title",B),l.transition=l.transition||(A&&!z?y.transition:d)||(C?a.mobile.defaultDialogTransition:a.mobile.defaultPageTransition),!A&&E&&(r.getActive().pageUrl=x),v&&!l.fromHashChange){var G;!n.isPath(v)&&v.indexOf("#")<0&&(v="#"+v),G={transition:l.transition,title:B,pageUrl:x,role:l.role},l.changeHash!==!1&&a.mobile.hashListeningEnabled?a.mobile.navigate(v,G,!0):b[0]!==a.mobile.firstPage[0]&&a.mobile.navigate.history.add(v,G)}c.title=B,a.mobile.activePage=b,l.reverse=l.reverse||0>A,g(b,q,l.transition,l.reverse).done(function(c,d,g,h,i){e(),l.duplicateCachedPage&&l.duplicateCachedPage.remove(),i||a.mobile.focusPage(b),f(),m.trigger("pagechange",p)})}},a.mobile.changePage.defaults={transition:d,reverse:!1,changeHash:!0,fromHashChange:!1,role:d,duplicateCachedPage:d,pageContainer:d,showLoadMsg:!0,dataUrl:d,fromPage:d,allowSamePageTransition:!1},a.mobile.navreadyDeferred=a.Deferred(),a.mobile._registerInternalEvents=function(){var c=function(b,c){var d,e,f,g,h=!0;return!a.mobile.ajaxEnabled||b.is(":jqmData(ajax='false')")||!b.jqmHijackable().length||b.attr("target")?!1:(d=b.attr("action"),g=(b.attr("method")||"get").toLowerCase(),d||(d=k(b),"get"===g&&(d=n.parseUrl(d).hrefNoSearch),d===x.hrefNoHash&&(d=w.hrefNoSearch)),d=n.makeUrlAbsolute(d,k(b)),n.isExternal(d)&&!n.isPermittedCrossDomainRequest(w,d)?!1:(c||(e=b.serializeArray(),o&&o[0].form===b[0]&&(f=o.attr("name"),f&&(a.each(e,function(a,b){return b.name===f?(f="",!1):void 0}),f&&e.push({name:f,value:o.attr("value")}))),h={url:d,options:{type:g,data:a.param(e),transition:b.jqmData("transition"),reverse:"reverse"===b.jqmData("direction"),reloadPage:!0}}),h))};a.mobile.document.delegate("form","submit",function(b){var d=c(a(this));d&&(a.mobile.changePage(d.url,d.options),b.preventDefault())}),a.mobile.document.bind("vclick",function(b){var d,f,g=b.target,h=!1;if(!(b.which>1)&&a.mobile.linkBindingEnabled){if(o=a(g),a.data(g,"mobile-button")){if(!c(a(g).closest("form"),!0))return;g.parentNode&&(g=g.parentNode)}else{if(g=j(g),!g||"#"===n.parseUrl(g.getAttribute("href")||"#").hash)return;if(!a(g).jqmHijackable().length)return}~g.className.indexOf("ui-link-inherit")?g.parentNode&&(f=a.data(g.parentNode,"buttonElements")):f=a.data(g,"buttonElements"),f?g=f.outer:h=!0,d=a(g),h&&(d=d.closest(".ui-btn")),d.length>0&&!d.hasClass("ui-disabled")&&(e(!0),p=d,p.addClass(a.mobile.activeBtnClass))}}),a.mobile.document.bind("click",function(c){if(a.mobile.linkBindingEnabled&&!c.isDefaultPrevented()){var f,g=j(c.target),h=a(g);if(g&&!(c.which>1)&&h.jqmHijackable().length){if(f=function(){b.setTimeout(function(){e(!0)},200)},h.is(":jqmData(rel='back')"))return a.mobile.back(),!1;var i=k(h),l=n.makeUrlAbsolute(h.attr("href")||"#",i);if(!a.mobile.ajaxEnabled&&!n.isEmbeddedPage(l))return f(),void 0;if(-1!==l.search("#")){if(l=l.replace(/[^#]*#/,""),!l)return c.preventDefault(),void 0;l=n.isPath(l)?n.makeUrlAbsolute(l,i):n.makeUrlAbsolute("#"+l,w.hrefNoHash)}var m=h.is("[rel='external']")||h.is(":jqmData(ajax='false')")||h.is("[target]"),o=m||n.isExternal(l)&&!n.isPermittedCrossDomainRequest(w,l);if(o)return f(),void 0;var p=h.jqmData("transition"),q="reverse"===h.jqmData("direction")||h.jqmData("back"),r=h.attr("data-"+a.mobile.ns+"rel")||d;a.mobile.changePage(l,{transition:p,reverse:q,role:r,link:h}),c.preventDefault()}}}),a.mobile.document.delegate(".ui-page","pageshow.prefetch",function(){var b=[];a(this).find("a:jqmData(prefetch)").each(function(){var c=a(this),d=c.attr("href");d&&-1===a.inArray(d,b)&&(b.push(d),a.mobile.loadPage(d,{role:c.attr("data-"+a.mobile.ns+"rel"),prefetch:!0}))})}),a.mobile._handleHashChange=function(c,e){var f=n.stripHash(c),g=0===a.mobile.urlHistory.stack.length?"none":d,h={changeHash:!1,fromHashChange:!0,reverse:"back"===e.direction};if(a.extend(h,e,{transition:(r.getLast()||{}).transition||g}),r.activeIndex>0&&f.indexOf(u)>-1&&r.initialDst!==f){if(a.mobile.activePage&&!a.mobile.activePage.is(".ui-dialog"))return"back"===e.direction?a.mobile.back():b.history.forward(),void 0;f=e.pageUrl;var i=a.mobile.urlHistory.getActive();a.extend(h,{role:i.role,transition:i.transition,reverse:"back"===e.direction})}f?(f=n.isPath(f)?f:n.makeUrlAbsolute("#"+f,x),f===n.makeUrlAbsolute("#"+r.initialDst,x)&&r.stack.length&&r.stack[0].url!==r.initialDst.replace(u,"")&&(f=a.mobile.firstPage),a.mobile.changePage(f,h)):a.mobile.changePage(a.mobile.firstPage,h)},l.bind("navigate",function(b,c){var d;b.originalEvent&&b.originalEvent.isDefaultPrevented()||(d=a.event.special.navigate.originalEventName.indexOf("hashchange")>-1?c.state.hash:c.state.url,d||(d=a.mobile.path.parseLocation().hash),d&&"#"!==d&&0!==d.indexOf("#"+a.mobile.path.uiStateKey)||(d=location.href),a.mobile._handleHashChange(d,c.state))}),a.mobile.document.bind("pageshow",a.mobile.resetActivePageHeight),a.mobile.window.bind("throttledresize",a.mobile.resetActivePageHeight)},a(function(){q.resolve()}),a.when(q,a.mobile.navreadyDeferred).done(function(){a.mobile._registerInternalEvents()})}(a),function(a){a.mobile.transitionFallbacks.flip="fade"}(a,this),function(a){a.mobile.transitionFallbacks.flow="fade"}(a,this),function(a){a.mobile.transitionFallbacks.pop="fade"}(a,this),function(a){a.mobile.transitionHandlers.slide=a.mobile.transitionHandlers.simultaneous,a.mobile.transitionFallbacks.slide="fade"}(a,this),function(a){a.mobile.transitionFallbacks.slidedown="fade"}(a,this),function(a){a.mobile.transitionFallbacks.slidefade="fade"}(a,this),function(a){a.mobile.transitionFallbacks.slideup="fade"}(a,this),function(a){a.mobile.transitionFallbacks.turn="fade"}(a,this),function(a){a.mobile.page.prototype.options.degradeInputs={color:!1,date:!1,datetime:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:"number",search:"text",tel:!1,time:!1,url:!1,week:!1},a.mobile.document.bind("pagecreate create",function(b){var c,d=a.mobile.closestPageData(a(b.target));d&&(c=d.options,a(b.target).find("input").not(d.keepNativeSelector()).each(function(){var b=a(this),d=this.getAttribute("type"),e=c.degradeInputs[d]||"text";if(c.degradeInputs[d]){var f=a("<div>").html(b.clone()).html(),g=f.indexOf(" type=")>-1,h=g?/\s+type=["']?\w+['"]?/:/\/?>/,i=' type="'+e+'" data-'+a.mobile.ns+'type="'+d+'"'+(g?"":">");b.replaceWith(f.replace(h,i))}}))})}(a),function(a){a.widget("mobile.dialog",a.mobile.widget,{options:{closeBtn:"left",closeBtnText:"Close",overlayTheme:"a",corners:!0,initSelector:":jqmData(role='dialog')"},_handlePageBeforeShow:function(){this._isCloseable=!0,this.options.overlayTheme&&this.element.page("removeContainerBackground").page("setContainerBackground",this.options.overlayTheme)},_handlePageBeforeHide:function(){this._isCloseable=!1},_create:function(){var b=this.element,c=this.options.corners?" ui-corner-all":"",d=a("<div/>",{role:"dialog","class":"ui-dialog-contain ui-overlay-shadow"+c});b.addClass("ui-dialog ui-overlay-"+this.options.overlayTheme),b.wrapInner(d),b.bind("vclick submit",function(b){var c,d=a(b.target).closest("vclick"===b.type?"a":"form");d.length&&!d.jqmData("transition")&&(c=a.mobile.urlHistory.getActive()||{},d.attr("data-"+a.mobile.ns+"transition",c.transition||a.mobile.defaultDialogTransition).attr("data-"+a.mobile.ns+"direction","reverse"))}),this._on(b,{pagebeforeshow:"_handlePageBeforeShow",pagebeforehide:"_handlePageBeforeHide"}),a.extend(this,{_createComplete:!1}),this._setCloseBtn(this.options.closeBtn)},_setCloseBtn:function(b){var c,d,e=this;this._headerCloseButton&&(this._headerCloseButton.remove(),this._headerCloseButton=null),"none"!==b&&(d="left"===b?"left":"right",c=a("<a href='#' class='ui-btn-"+d+"' data-"+a.mobile.ns+"icon='delete' data-"+a.mobile.ns+"iconpos='notext'>"+this.options.closeBtnText+"</a>"),this.element.children().find(":jqmData(role='header')").first().prepend(c),this._createComplete&&a.fn.buttonMarkup&&c.buttonMarkup(),this._createComplete=!0,c.bind("click",function(){e.close()}),this._headerCloseButton=c)},_setOption:function(a,b){"closeBtn"===a&&this._setCloseBtn(b),this._super(a,b)},close:function(){var b,c,d=a.mobile.navigate.history;this._isCloseable&&(this._isCloseable=!1,a.mobile.hashListeningEnabled&&d.activeIndex>0?a.mobile.back():(b=Math.max(0,d.activeIndex-1),c=d.stack[b].pageUrl||d.stack[b].url,d.previousIndex=d.activeIndex,d.activeIndex=b,a.mobile.path.isPath(c)||(c=a.mobile.path.makeUrlAbsolute("#"+c)),a.mobile.changePage(c,{direction:"back",changeHash:!1,fromHashChange:!0})))}}),a.mobile.document.delegate(a.mobile.dialog.prototype.options.initSelector,"pagecreate",function(){a.mobile.dialog.prototype.enhance(this)})}(a,this),function(a){a.mobile.page.prototype.options.backBtnText="Back",a.mobile.page.prototype.options.addBackBtn=!1,a.mobile.page.prototype.options.backBtnTheme=null,a.mobile.page.prototype.options.headerTheme="a",a.mobile.page.prototype.options.footerTheme="a",a.mobile.page.prototype.options.contentTheme=null,a.mobile.document.bind("pagecreate",function(b){var c=a(b.target),d=c.data("mobile-page").options,e=c.jqmData("role"),f=d.theme;a(":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')",c).jqmEnhanceable().each(function(){var b,g,h,i,j=a(this),k=j.jqmData("role"),l=j.jqmData("theme"),m=l||d.contentTheme||"dialog"===e&&f;if(j.addClass("ui-"+k),"header"===k||"footer"===k){var n=l||("header"===k?d.headerTheme:d.footerTheme)||f;j.addClass("ui-bar-"+n).attr("role","header"===k?"banner":"contentinfo"),"header"===k&&(b=j.children("a, button"),g=b.hasClass("ui-btn-left"),h=b.hasClass("ui-btn-right"),g=g||b.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length,h=h||b.eq(1).addClass("ui-btn-right").length),d.addBackBtn&&"header"===k&&a(".ui-page").length>1&&c.jqmData("url")!==a.mobile.path.stripHash(location.hash)&&!g&&(i=a("<a href='javascript:void(0);' class='ui-btn-left' data-"+a.mobile.ns+"rel='back' data-"+a.mobile.ns+"icon='arrow-l'>"+d.backBtnText+"</a>").attr("data-"+a.mobile.ns+"theme",d.backBtnTheme||n).prependTo(j)),j.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({role:"heading","aria-level":"1"})}else"content"===k&&(m&&j.addClass("ui-body-"+m),j.attr("role","main"))})})}(a),function(a,b){function d(a){for(var b;a&&(b="string"==typeof a.className&&a.className+" ",!(b&&b.indexOf("ui-btn ")>-1&&b.indexOf("ui-disabled ")<0));)a=a.parentNode;return a}function e(d,e,f,g,h){var i=a.data(d[0],"buttonElements");d.removeClass(e).addClass(f),i&&(i.bcls=a(c.createElement("div")).addClass(i.bcls+" "+f).removeClass(e).attr("class"),g!==b&&(i.hover=g),i.state=h)}var f=function(a,c){var d=a.getAttribute(c);return"true"===d?!0:"false"===d?!1:null===d?b:d};a.fn.buttonMarkup=function(d){var e,h=this,i="data-"+a.mobile.ns;d=d&&"object"===a.type(d)?d:{};for(var j=0;j<h.length;j++){var k,l,m,n,o,p,q=h.eq(j),r=q[0],s=a.extend({},a.fn.buttonMarkup.defaults,{icon:d.icon!==b?d.icon:f(r,i+"icon"),iconpos:d.iconpos!==b?d.iconpos:f(r,i+"iconpos"),theme:d.theme!==b?d.theme:f(r,i+"theme")||a.mobile.getInheritedTheme(q,"c"),inline:d.inline!==b?d.inline:f(r,i+"inline"),shadow:d.shadow!==b?d.shadow:f(r,i+"shadow"),corners:d.corners!==b?d.corners:f(r,i+"corners"),iconshadow:d.iconshadow!==b?d.iconshadow:f(r,i+"iconshadow"),mini:d.mini!==b?d.mini:f(r,i+"mini")},d),t="ui-btn-inner",u="ui-btn-text",v=!1,w="up";for(e in s)s[e]===b||null===s[e]?q.removeAttr(i+e):r.setAttribute(i+e,s[e]);for(p=a.data("INPUT"===r.tagName||"BUTTON"===r.tagName?r.parentNode:r,"buttonElements"),p?(r=p.outer,q=a(r),m=p.inner,n=p.text,a(p.icon).remove(),p.icon=null,v=p.hover,w=p.state):(m=c.createElement(s.wrapperEls),n=c.createElement(s.wrapperEls)),o=s.icon?c.createElement("span"):null,g&&!p&&g(),s.theme||(s.theme=a.mobile.getInheritedTheme(q,"c")),k="ui-btn ",k+=v?"ui-btn-hover-"+s.theme:"",k+=w?" ui-btn-"+w+"-"+s.theme:"",k+=s.shadow?" ui-shadow":"",k+=s.corners?" ui-btn-corner-all":"",s.mini!==b&&(k+=s.mini===!0?" ui-mini":" ui-fullsize"),s.inline!==b&&(k+=s.inline===!0?" ui-btn-inline":" ui-btn-block"),s.icon&&(s.icon="ui-icon-"+s.icon,s.iconpos=s.iconpos||"left",l="ui-icon "+s.icon,s.iconshadow&&(l+=" ui-icon-shadow")),s.iconpos&&(k+=" ui-btn-icon-"+s.iconpos,"notext"!==s.iconpos||q.attr("title")||q.attr("title",q.getEncodedText())),p&&q.removeClass(p.bcls||""),q.removeClass("ui-link").addClass(k),m.className=t,n.className=u,p||m.appendChild(n),o&&(o.className=l,p&&p.icon||(o.innerHTML="&#160;",m.appendChild(o)));r.firstChild&&!p;)n.appendChild(r.firstChild);p||r.appendChild(m),p={hover:v,state:w,bcls:k,outer:r,inner:m,text:n,icon:o},a.data(r,"buttonElements",p),a.data(m,"buttonElements",p),a.data(n,"buttonElements",p),o&&a.data(o,"buttonElements",p)}return this},a.fn.buttonMarkup.defaults={corners:!0,shadow:!0,iconshadow:!0,wrapperEls:"span"};var g=function(){var c,f,h=a.mobile.buttonMarkup.hoverDelay;a.mobile.document.bind({"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart":function(g){var i,j=a(d(g.target)),k=g.originalEvent&&/^touch/.test(g.originalEvent.type),l=g.type;j.length&&(i=j.attr("data-"+a.mobile.ns+"theme"),"vmousedown"===l?k?c=setTimeout(function(){e(j,"ui-btn-up-"+i,"ui-btn-down-"+i,b,"down")},h):e(j,"ui-btn-up-"+i,"ui-btn-down-"+i,b,"down"):"vmousecancel"===l||"vmouseup"===l?e(j,"ui-btn-down-"+i,"ui-btn-up-"+i,b,"up"):"vmouseover"===l||"focus"===l?k?f=setTimeout(function(){e(j,"ui-btn-up-"+i,"ui-btn-hover-"+i,!0,"")},h):e(j,"ui-btn-up-"+i,"ui-btn-hover-"+i,!0,""):("vmouseout"===l||"blur"===l||"scrollstart"===l)&&(e(j,"ui-btn-hover-"+i+" ui-btn-down-"+i,"ui-btn-up-"+i,!1,"up"),c&&clearTimeout(c),f&&clearTimeout(f)))},"focusin focus":function(b){a(d(b.target)).addClass(a.mobile.focusClass)},"focusout blur":function(b){a(d(b.target)).removeClass(a.mobile.focusClass)}}),g=null};a.mobile.document.bind("pagecreate create",function(b){a(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a",b.target).jqmEnhanceable().not("button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()})}(a),function(a,b){a.widget("mobile.collapsible",a.mobile.widget,{options:{expandCueText:" click to expand contents",collapseCueText:" click to collapse contents",collapsed:!0,heading:"h1,h2,h3,h4,h5,h6,legend",collapsedIcon:"plus",expandedIcon:"minus",iconpos:"left",theme:null,contentTheme:null,inset:!0,corners:!0,mini:!1,initSelector:":jqmData(role='collapsible')"},_create:function(){var c=this.element,d=this.options,e=c.addClass("ui-collapsible"),f=c.children(d.heading).first(),g=e.wrapInner("<div class='ui-collapsible-content'></div>").children(".ui-collapsible-content"),h=c.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set"),i="";f.is("legend")&&(f=a("<div role='heading'>"+f.html()+"</div>").insertBefore(f),f.next().remove()),h.length?(d.theme||(d.theme=h.jqmData("theme")||a.mobile.getInheritedTheme(h,"c")),d.contentTheme||(d.contentTheme=h.jqmData("content-theme")),d.collapsedIcon=c.jqmData("collapsed-icon")||h.jqmData("collapsed-icon")||d.collapsedIcon,d.expandedIcon=c.jqmData("expanded-icon")||h.jqmData("expanded-icon")||d.expandedIcon,d.iconpos=c.jqmData("iconpos")||h.jqmData("iconpos")||d.iconpos,d.inset=h.jqmData("inset")!==b?h.jqmData("inset"):!0,d.corners=!1,d.mini||(d.mini=h.jqmData("mini"))):d.theme||(d.theme=a.mobile.getInheritedTheme(c,"c")),d.inset&&(i+=" ui-collapsible-inset",d.corners&&(i+=" ui-corner-all")),d.contentTheme&&(i+=" ui-collapsible-themed-content",g.addClass("ui-body-"+d.contentTheme)),""!==i&&e.addClass(i),f.insertBefore(g).addClass("ui-collapsible-heading").append("<span class='ui-collapsible-heading-status'></span>").wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().buttonMarkup({shadow:!1,corners:!1,iconpos:d.iconpos,icon:d.collapsedIcon,mini:d.mini,theme:d.theme}),e.bind("expand collapse",function(b){if(!b.isDefaultPrevented()){var c=a(this),e="collapse"===b.type;b.preventDefault(),f.toggleClass("ui-collapsible-heading-collapsed",e).find(".ui-collapsible-heading-status").text(e?d.expandCueText:d.collapseCueText).end().find(".ui-icon").toggleClass("ui-icon-"+d.expandedIcon,!e).toggleClass("ui-icon-"+d.collapsedIcon,e||d.expandedIcon===d.collapsedIcon).end().find("a").first().removeClass(a.mobile.activeBtnClass),c.toggleClass("ui-collapsible-collapsed",e),g.toggleClass("ui-collapsible-content-collapsed",e).attr("aria-hidden",e),g.trigger("updatelayout")}}).trigger(d.collapsed?"collapse":"expand"),f.bind("tap",function(){f.find("a").first().addClass(a.mobile.activeBtnClass)}).bind("click",function(a){var b=f.is(".ui-collapsible-heading-collapsed")?"expand":"collapse";e.trigger(b),a.preventDefault(),a.stopPropagation()})}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.collapsible.prototype.enhanceWithin(b.target)})}(a),function(a){a.mobile.behaviors.addFirstLastClasses={_getVisibles:function(a,b){var c;return b?c=a.not(".ui-screen-hidden"):(c=a.filter(":visible"),0===c.length&&(c=a.not(".ui-screen-hidden"))),c},_addFirstLastClasses:function(a,b,c){a.removeClass("ui-first-child ui-last-child"),b.eq(0).addClass("ui-first-child").end().last().addClass("ui-last-child"),c||this.element.trigger("updatelayout")}}}(a),function(a,b){a.widget("mobile.collapsibleset",a.mobile.widget,a.extend({options:{initSelector:":jqmData(role='collapsible-set')"},_create:function(){var c=this.element.addClass("ui-collapsible-set"),d=this.options;d.theme||(d.theme=a.mobile.getInheritedTheme(c,"c")),d.contentTheme||(d.contentTheme=c.jqmData("content-theme")),d.corners||(d.corners=c.jqmData("corners")),c.jqmData("inset")!==b&&(d.inset=c.jqmData("inset")),d.inset=d.inset!==b?d.inset:!0,d.corners=d.corners!==b?d.corners:!0,d.corners&&d.inset&&c.addClass("ui-corner-all"),c.jqmData("collapsiblebound")||c.jqmData("collapsiblebound",!0).bind("expand",function(b){var c=a(b.target).closest(".ui-collapsible");
c.parent().is(":jqmData(role='collapsible-set')")&&c.siblings(".ui-collapsible").trigger("collapse")})},_init:function(){var a=this.element,b=a.children(":jqmData(role='collapsible')"),c=b.filter(":jqmData(collapsed='false')");this._refresh("true"),c.trigger("expand")},_refresh:function(b){var c=this.element.children(":jqmData(role='collapsible')");a.mobile.collapsible.prototype.enhance(c.not(".ui-collapsible")),this._addFirstLastClasses(c,this._getVisibles(c,b),b)},refresh:function(){this._refresh(!1)}},a.mobile.behaviors.addFirstLastClasses)),a.mobile.document.bind("pagecreate create",function(b){a.mobile.collapsibleset.prototype.enhanceWithin(b.target)})}(a),function(a){a.fn.fieldcontain=function(){return this.addClass("ui-field-contain ui-body ui-br").contents().filter(function(){return 3===this.nodeType&&!/\S/.test(this.nodeValue)}).remove()},a(c).bind("pagecreate create",function(b){a(":jqmData(role='fieldcontain')",b.target).jqmEnhanceable().fieldcontain()})}(a),function(a){a.fn.grid=function(b){return this.each(function(){var c,d=a(this),e=a.extend({grid:null},b),f=d.children(),g={solo:1,a:2,b:3,c:4,d:5},h=e.grid;if(!h)if(f.length<=5)for(var i in g)g[i]===f.length&&(h=i);else h="a",d.addClass("ui-grid-duo");c=g[h],d.addClass("ui-grid-"+h),f.filter(":nth-child("+c+"n+1)").addClass("ui-block-a"),c>1&&f.filter(":nth-child("+c+"n+2)").addClass("ui-block-b"),c>2&&f.filter(":nth-child("+c+"n+3)").addClass("ui-block-c"),c>3&&f.filter(":nth-child("+c+"n+4)").addClass("ui-block-d"),c>4&&f.filter(":nth-child("+c+"n+5)").addClass("ui-block-e")})}}(a),function(a,b){a.widget("mobile.navbar",a.mobile.widget,{options:{iconpos:"top",grid:null,initSelector:":jqmData(role='navbar')"},_create:function(){var d=this.element,e=d.find("a"),f=e.filter(":jqmData(icon)").length?this.options.iconpos:b;d.addClass("ui-navbar ui-mini").attr("role","navigation").find("ul").jqmEnhanceable().grid({grid:this.options.grid}),e.buttonMarkup({corners:!1,shadow:!1,inline:!0,iconpos:f}),d.delegate("a","vclick",function(b){var d=a(b.target).is("a")?a(this):a(this).parent("a");if(!d.is(".ui-disabled, .ui-btn-active")){e.removeClass(a.mobile.activeBtnClass),a(this).addClass(a.mobile.activeBtnClass);var f=a(this);a(c).one("pagehide",function(){f.removeClass(a.mobile.activeBtnClass)})}}),d.closest(".ui-page").bind("pagebeforeshow",function(){e.filter(".ui-state-persist").addClass(a.mobile.activeBtnClass)})}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.navbar.prototype.enhanceWithin(b.target)})}(a),function(a){var b={};a.widget("mobile.listview",a.mobile.widget,a.extend({options:{theme:null,countTheme:"c",headerTheme:"b",dividerTheme:"b",icon:"arrow-r",splitIcon:"arrow-r",splitTheme:"b",corners:!0,shadow:!0,inset:!1,initSelector:":jqmData(role='listview')"},_create:function(){var a=this,b="";b+=a.options.inset?" ui-listview-inset":"",a.options.inset&&(b+=a.options.corners?" ui-corner-all":"",b+=a.options.shadow?" ui-shadow":""),a.element.addClass(function(a,c){return c+" ui-listview"+b}),a.refresh(!0)},_findFirstElementByTagName:function(a,b,c,d){var e={};for(e[c]=e[d]=!0;a;){if(e[a.nodeName])return a;a=a[b]}return null},_getChildrenByTagName:function(b,c,d){var e=[],f={};for(f[c]=f[d]=!0,b=b.firstChild;b;)f[b.nodeName]&&e.push(b),b=b.nextSibling;return a(e)},_addThumbClasses:function(b){var c,d,e=b.length;for(c=0;e>c;c++)d=a(this._findFirstElementByTagName(b[c].firstChild,"nextSibling","img","IMG")),d.length&&(d.addClass("ui-li-thumb"),a(this._findFirstElementByTagName(d[0].parentNode,"parentNode","li","LI")).addClass(d.is(".ui-li-icon")?"ui-li-has-icon":"ui-li-has-thumb"))},refresh:function(b){this.parentPage=this.element.closest(".ui-page"),this._createSubPages();var d,e,f,g,h,i,j,k,l,m,n,o,p=this.options,q=this.element,r=q.jqmData("dividertheme")||p.dividerTheme,s=q.jqmData("splittheme"),t=q.jqmData("spliticon"),u=q.jqmData("icon"),v=this._getChildrenByTagName(q[0],"li","LI"),w=!!a.nodeName(q[0],"ol"),x=!a.support.cssPseudoElement,y=q.attr("start"),z={};w&&x&&q.find(".ui-li-dec").remove(),w&&(y||0===y?x?j=parseInt(y,10):(k=parseInt(y,10)-1,q.css("counter-reset","listnumbering "+k)):x&&(j=1)),p.theme||(p.theme=a.mobile.getInheritedTheme(this.element,"c"));for(var A=0,B=v.length;B>A;A++){if(d=v.eq(A),e="ui-li",b||!d.hasClass("ui-li")){f=d.jqmData("theme")||p.theme,g=this._getChildrenByTagName(d[0],"a","A");var C="list-divider"===d.jqmData("role");g.length&&!C?(n=d.jqmData("icon"),d.buttonMarkup({wrapperEls:"div",shadow:!1,corners:!1,iconpos:"right",icon:g.length>1||n===!1?!1:n||u||p.icon,theme:f}),n!==!1&&1===g.length&&d.addClass("ui-li-has-arrow"),g.first().removeClass("ui-link").addClass("ui-link-inherit"),g.length>1&&(e+=" ui-li-has-alt",h=g.last(),i=s||h.jqmData("theme")||p.splitTheme,o=h.jqmData("icon"),h.appendTo(d).attr("title",a.trim(h.getEncodedText())).addClass("ui-li-link-alt").empty().buttonMarkup({shadow:!1,corners:!1,theme:f,icon:!1,iconpos:"notext"}).find(".ui-btn-inner").append(a(c.createElement("span")).buttonMarkup({shadow:!0,corners:!0,theme:i,iconpos:"notext",icon:o||n||t||p.splitIcon})))):C?(e+=" ui-li-divider ui-bar-"+(d.jqmData("theme")||r),d.attr("role","heading"),w&&(y||0===y?x?j=parseInt(y,10):(l=parseInt(y,10)-1,d.css("counter-reset","listnumbering "+l)):x&&(j=1))):e+=" ui-li-static ui-btn-up-"+f}w&&x&&e.indexOf("ui-li-divider")<0&&(m=e.indexOf("ui-li-static")>0?d:d.find(".ui-link-inherit"),m.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>"+j++ +". </span>")),z[e]||(z[e]=[]),z[e].push(d[0])}for(e in z)a(z[e]).addClass(e).children(".ui-btn-inner").addClass(e);q.find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(".ui-li-aside").each(function(){var b=a(this);b.prependTo(b.parent())}).end().find(".ui-li-count").each(function(){a(this).closest("li").addClass("ui-li-has-count")}).addClass("ui-btn-up-"+(q.jqmData("counttheme")||this.options.countTheme)+" ui-btn-corner-all"),this._addThumbClasses(v),this._addThumbClasses(q.find(".ui-link-inherit")),this._addFirstLastClasses(v,this._getVisibles(v,b),b),this._trigger("afterrefresh")},_idStringEscape:function(a){return a.replace(/[^a-zA-Z0-9]/g,"-")},_createSubPages:function(){var c,d=this.element,e=d.closest(".ui-page"),f=e.jqmData("url"),g=f||e[0][a.expando],h=d.attr("id"),i=this.options,j="data-"+a.mobile.ns,k=this,l=e.find(":jqmData(role='footer')").jqmData("id");if("undefined"==typeof b[g]&&(b[g]=-1),h=h||++b[g],a(d.find("li>ul, li>ol").toArray().reverse()).each(function(b){var e,g,k=a(this),m=k.attr("id")||h+"-"+b,n=k.parent(),o=a(k.prevAll().toArray().reverse()),p=o.length?o:a("<span>"+a.trim(n.contents()[0].nodeValue)+"</span>"),q=p.first().getEncodedText(),r=(f||"")+"&"+a.mobile.subPageUrlKey+"="+m,s=k.jqmData("theme")||i.theme,t=k.jqmData("counttheme")||d.jqmData("counttheme")||i.countTheme;c=!0,e=k.detach().wrap("<div "+j+"role='page' "+j+"url='"+r+"' "+j+"theme='"+s+"' "+j+"count-theme='"+t+"'><div "+j+"role='content'></div></div>").parent().before("<div "+j+"role='header' "+j+"theme='"+i.headerTheme+"'><div class='ui-title'>"+q+"</div></div>").after(l?a("<div "+j+"role='footer' "+j+"id='"+l+"'>"):"").parent().appendTo(a.mobile.pageContainer),e.page(),g=n.find("a:first"),g.length||(g=a("<a/>").html(p||q).prependTo(n.empty())),g.attr("href","#"+r)}).listview(),c&&e.is(":jqmData(external-page='true')")&&e.data("mobile-page").options.domCache===!1){var m=function(b,c){var d,g=c.nextPage,h=new a.Event("pageremove");c.nextPage&&(d=g.jqmData("url"),0!==d.indexOf(f+"&"+a.mobile.subPageUrlKey)&&(k.childPages().remove(),e.trigger(h),h.isDefaultPrevented()||e.removeWithDependents()))};e.unbind("pagehide.remove").bind("pagehide.remove",m)}},childPages:function(){var b=this.parentPage.jqmData("url");return a(":jqmData(url^='"+b+"&"+a.mobile.subPageUrlKey+"')")}},a.mobile.behaviors.addFirstLastClasses)),a.mobile.document.bind("pagecreate create",function(b){a.mobile.listview.prototype.enhanceWithin(b.target)})}(a),function(a){var b=a("meta[name=viewport]"),c=b.attr("content"),d=c+",maximum-scale=1, user-scalable=no",e=c+",maximum-scale=10, user-scalable=yes",f=/(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(c);a.mobile.zoom=a.extend({},{enabled:!f,locked:!1,disable:function(c){f||a.mobile.zoom.locked||(b.attr("content",d),a.mobile.zoom.enabled=!1,a.mobile.zoom.locked=c||!1)},enable:function(c){f||a.mobile.zoom.locked&&c!==!0||(b.attr("content",e),a.mobile.zoom.enabled=!0,a.mobile.zoom.locked=!1)},restore:function(){f||(b.attr("content",c),a.mobile.zoom.enabled=!0)}})}(a),function(a){a.widget("mobile.textinput",a.mobile.widget,{options:{theme:null,mini:!1,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type]), input[type='file']",clearBtn:!1,clearSearchButtonText:null,clearBtnText:"clear text",disabled:!1},_create:function(){function b(){setTimeout(function(){d.toggleClass("ui-input-clear-hidden",!f.val())},0)}var c,d,e=this,f=this.element,g=this.options,h=g.theme||a.mobile.getInheritedTheme(this.element,"c"),i=" ui-body-"+h,j=g.mini?" ui-mini":"",k=f.is("[type='search'], :jqmData(type='search')"),l=g.clearSearchButtonText||g.clearBtnText,m=f.is("textarea, :jqmData(type='range')"),n=!!g.clearBtn&&!m,o=f.is("input")&&!f.is(":jqmData(type='range')");if(a("label[for='"+f.attr("id")+"']").addClass("ui-input-text"),c=f.addClass("ui-input-text ui-body-"+h),"undefined"==typeof f[0].autocorrect||a.support.touchOverflow||(f[0].setAttribute("autocorrect","off"),f[0].setAttribute("autocomplete","off")),k?c=f.wrap("<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield"+i+j+"'></div>").parent():o&&(c=f.wrap("<div class='ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow"+i+j+"'></div>").parent()),n||k?(d=a("<a href='#' class='ui-input-clear' title='"+l+"'>"+l+"</a>").bind("click",function(a){f.val("").focus().trigger("change"),d.addClass("ui-input-clear-hidden"),a.preventDefault()}).appendTo(c).buttonMarkup({icon:"delete",iconpos:"notext",corners:!0,shadow:!0,mini:g.mini}),k||c.addClass("ui-input-has-clear"),b(),f.bind("paste cut keyup input focus change blur",b)):o||k||f.addClass("ui-corner-all ui-shadow-inset"+i+j),f.focus(function(){g.preventFocusZoom&&a.mobile.zoom.disable(!0),c.addClass(a.mobile.focusClass)}).blur(function(){c.removeClass(a.mobile.focusClass),g.preventFocusZoom&&a.mobile.zoom.enable(!0)}),f.is("textarea")){var p,q=15,r=100;this._keyup=function(){var a=f[0].scrollHeight,b=f[0].clientHeight;if(a>b){var c=parseFloat(f.css("padding-top")),d=parseFloat(f.css("padding-bottom")),e=c+d;f.height(a-e+q)}},f.on("keyup change input paste",function(){clearTimeout(p),p=setTimeout(e._keyup,r)}),this._on(!0,a.mobile.document,{pagechange:"_keyup"}),a.trim(f.val())&&this._on(!0,a.mobile.window,{load:"_keyup"})}f.attr("disabled")&&this.disable()},disable:function(){var a,b=this.element.is("[type='search'], :jqmData(type='search')"),c=this.element.is("input")&&!this.element.is(":jqmData(type='range')"),d=this.element.attr("disabled",!0)&&(c||b);return a=d?this.element.parent():this.element,a.addClass("ui-disabled"),this._setOption("disabled",!0)},enable:function(){var a,b=this.element.is("[type='search'], :jqmData(type='search')"),c=this.element.is("input")&&!this.element.is(":jqmData(type='range')"),d=this.element.attr("disabled",!1)&&(c||b);return a=d?this.element.parent():this.element,a.removeClass("ui-disabled"),this._setOption("disabled",!1)}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.textinput.prototype.enhanceWithin(b.target,!0)})}(a),function(a){a.mobile.listview.prototype.options.filter=!1,a.mobile.listview.prototype.options.filterPlaceholder="Filter items...",a.mobile.listview.prototype.options.filterTheme="c",a.mobile.listview.prototype.options.filterReveal=!1;var b=function(a,b){return-1===a.toString().toLowerCase().indexOf(b)};a.mobile.listview.prototype.options.filterCallback=b,a.mobile.document.delegate("ul, ol","listviewcreate",function(){var c=a(this),d=c.data("mobile-listview");if(d&&d.options.filter){d.options.filterReveal&&c.children().addClass("ui-screen-hidden");var e=a("<form>",{"class":"ui-listview-filter ui-bar-"+d.options.filterTheme,role:"search"}).submit(function(a){a.preventDefault(),g.blur()}),f=function(){var e,f=a(this),g=this.value.toLowerCase(),h=null,i=c.children(),j=f.jqmData("lastval")+"",k=!1,l="",m=d.options.filterCallback!==b;if(!j||j!==g){if(d._trigger("beforefilter","beforefilter",{input:this}),f.jqmData("lastval",g),m||g.length<j.length||0!==g.indexOf(j)?h=c.children():(h=c.children(":not(.ui-screen-hidden)"),!h.length&&d.options.filterReveal&&(h=c.children(".ui-screen-hidden"))),g){for(var n=h.length-1;n>=0;n--)e=a(h[n]),l=e.jqmData("filtertext")||e.text(),e.is("li:jqmData(role=list-divider)")?(e.toggleClass("ui-filter-hidequeue",!k),k=!1):d.options.filterCallback(l,g,e)?e.toggleClass("ui-filter-hidequeue",!0):k=!0;h.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden",!1),h.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden",!0).toggleClass("ui-filter-hidequeue",!1)}else h.toggleClass("ui-screen-hidden",!!d.options.filterReveal);d._addFirstLastClasses(i,d._getVisibles(i,!1),!1)}},g=a("<input>",{placeholder:d.options.filterPlaceholder}).attr("data-"+a.mobile.ns+"type","search").jqmData("lastval","").bind("keyup change input",f).appendTo(e).textinput();d.options.inset&&e.addClass("ui-listview-filter-inset"),e.bind("submit",function(){return!1}).insertBefore(c)}})}(a),function(a){a.mobile.listview.prototype.options.autodividers=!1,a.mobile.listview.prototype.options.autodividersSelector=function(b){var c=a.trim(b.text())||null;return c?c=c.slice(0,1).toUpperCase():null},a.mobile.document.delegate("ul,ol","listviewcreate",function(){var b=a(this),d=b.data("mobile-listview");if(d&&d.options.autodividers){var e=function(){b.find("li:jqmData(role='list-divider')").remove();for(var e,f,g=b.find("li"),h=null,i=0;i<g.length;i++){if(e=g[i],f=d.options.autodividersSelector(a(e)),f&&h!==f){var j=c.createElement("li");j.appendChild(c.createTextNode(f)),j.setAttribute("data-"+a.mobile.ns+"role","list-divider"),e.parentNode.insertBefore(j,e)}h=f}},f=function(){b.unbind("listviewafterrefresh",f),e(),d.refresh(),b.bind("listviewafterrefresh",f)};f()}})}(a),function(a){a(c).bind("pagecreate create",function(b){a(":jqmData(role='nojs')",b.target).addClass("ui-nojs")})}(a),function(a){a.mobile.behaviors.formReset={_handleFormReset:function(){this._on(this.element.closest("form"),{reset:function(){this._delay("_reset")}})}}}(a),function(a){a.widget("mobile.checkboxradio",a.mobile.widget,a.extend({options:{theme:null,mini:!1,initSelector:"input[type='checkbox'],input[type='radio']"},_create:function(){var b=this,d=this.element,e=this.options,f=function(a,b){return a.jqmData(b)||a.closest("form, fieldset").jqmData(b)},g=a(d).closest("label"),h=g.length?g:a(d).closest("form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')").find("label").filter("[for='"+d[0].id+"']").first(),i=d[0].type,j=f(d,"mini")||e.mini,k=i+"-on",l=i+"-off",m=f(d,"iconpos"),n="ui-"+k,o="ui-"+l;if("checkbox"===i||"radio"===i){a.extend(this,{label:h,inputtype:i,checkedClass:n,uncheckedClass:o,checkedicon:k,uncheckedicon:l}),e.theme||(e.theme=a.mobile.getInheritedTheme(this.element,"c")),h.buttonMarkup({theme:e.theme,icon:l,shadow:!1,mini:j,iconpos:m});var p=c.createElement("div");p.className="ui-"+i,d.add(h).wrapAll(p),h.bind({vmouseover:function(b){a(this).parent().is(".ui-disabled")&&b.stopPropagation()},vclick:function(a){return d.is(":disabled")?(a.preventDefault(),void 0):(b._cacheVals(),d.prop("checked","radio"===i&&!0||!d.prop("checked")),d.triggerHandler("click"),b._getInputSet().not(d).prop("checked",!1),b._updateAll(),!1)}}),d.bind({vmousedown:function(){b._cacheVals()},vclick:function(){var c=a(this);c.is(":checked")?(c.prop("checked",!0),b._getInputSet().not(c).prop("checked",!1)):c.prop("checked",!1),b._updateAll()},focus:function(){h.addClass(a.mobile.focusClass)},blur:function(){h.removeClass(a.mobile.focusClass)}}),this._handleFormReset(),this.refresh()}},_cacheVals:function(){this._getInputSet().each(function(){a(this).jqmData("cacheVal",this.checked)})},_getInputSet:function(){return"checkbox"===this.inputtype?this.element:this.element.closest("form, :jqmData(role='page'), :jqmData(role='dialog')").find("input[name='"+this.element[0].name+"'][type='"+this.inputtype+"']")},_updateAll:function(){var b=this;this._getInputSet().each(function(){var c=a(this);(this.checked||"checkbox"===b.inputtype)&&c.trigger("change")}).checkboxradio("refresh")},_reset:function(){this.refresh()},refresh:function(){var b=this.element[0],c=" "+a.mobile.activeBtnClass,d=this.checkedClass+(this.element.parents(".ui-controlgroup-horizontal").length?c:""),e=this.label;b.checked?e.removeClass(this.uncheckedClass+c).addClass(d).buttonMarkup({icon:this.checkedicon}):e.removeClass(d).addClass(this.uncheckedClass).buttonMarkup({icon:this.uncheckedicon}),b.disabled?this.disable():this.enable()},disable:function(){this.element.prop("disabled",!0).parent().addClass("ui-disabled")},enable:function(){this.element.prop("disabled",!1).parent().removeClass("ui-disabled")}},a.mobile.behaviors.formReset)),a.mobile.document.bind("pagecreate create",function(b){a.mobile.checkboxradio.prototype.enhanceWithin(b.target,!0)})}(a),function(a){a.widget("mobile.button",a.mobile.widget,{options:{theme:null,icon:null,iconpos:null,corners:!0,shadow:!0,iconshadow:!0,inline:null,mini:null,initSelector:"button, [type='button'], [type='submit'], [type='reset']"},_create:function(){var b,c=this.element,d=function(a){var b,c={};for(b in a)null!==a[b]&&"initSelector"!==b&&(c[b]=a[b]);return c}(this.options),e="";return"A"===c[0].tagName?(c.hasClass("ui-btn")||c.buttonMarkup(),void 0):(this.options.theme||(this.options.theme=a.mobile.getInheritedTheme(this.element,"c")),~c[0].className.indexOf("ui-btn-left")&&(e="ui-btn-left"),~c[0].className.indexOf("ui-btn-right")&&(e="ui-btn-right"),("submit"===c.attr("type")||"reset"===c.attr("type"))&&(e?e+=" ui-submit":e="ui-submit"),a("label[for='"+c.attr("id")+"']").addClass("ui-submit"),this.button=a("<div></div>")[c.html()?"html":"text"](c.html()||c.val()).insertBefore(c).buttonMarkup(d).addClass(e).append(c.addClass("ui-btn-hidden")),b=this.button,c.bind({focus:function(){b.addClass(a.mobile.focusClass)},blur:function(){b.removeClass(a.mobile.focusClass)}}),this.refresh(),void 0)},_setOption:function(b,c){var d={};d[b]=c,"initSelector"!==b&&(this.button.buttonMarkup(d),this.element.attr("data-"+(a.mobile.ns||"")+b.replace(/([A-Z])/,"-$1").toLowerCase(),c)),this._super("_setOption",b,c)},enable:function(){return this.element.attr("disabled",!1),this.button.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.button.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)},refresh:function(){var b=this.element;b.prop("disabled")?this.disable():this.enable(),a(this.button.data("buttonElements").text)[b.html()?"html":"text"](b.html()||b.val())}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.button.prototype.enhanceWithin(b.target,!0)})}(a),function(a,d){a.widget("mobile.slider",a.mobile.widget,a.extend({widgetEventPrefix:"slide",options:{theme:null,trackTheme:null,disabled:!1,initSelector:"input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",mini:!1,highlight:!1},_create:function(){var e,f,g=this,h=this.element,i=a.mobile.getInheritedTheme(h,"c"),j=this.options.theme||i,k=this.options.trackTheme||i,l=h[0].nodeName.toLowerCase(),m=(this.isToggleSwitch="select"===l,h.parent().is(":jqmData(role='rangeslider')")),n=this.isToggleSwitch?"ui-slider-switch":"",o=h.attr("id"),p=a("[for='"+o+"']"),q=p.attr("id")||o+"-label",r=p.attr("id",q),s=this.isToggleSwitch?0:parseFloat(h.attr("min")),t=this.isToggleSwitch?h.find("option").length-1:parseFloat(h.attr("max")),u=b.parseFloat(h.attr("step")||1),v=this.options.mini||h.jqmData("mini")?" ui-mini":"",w=c.createElement("a"),x=a(w),y=c.createElement("div"),z=a(y),A=this.options.highlight&&!this.isToggleSwitch?function(){var b=c.createElement("div");return b.className="ui-slider-bg "+a.mobile.activeBtnClass+" ui-btn-corner-all",a(b).prependTo(z)}():!1;if(w.setAttribute("href","#"),y.setAttribute("role","application"),y.className=[this.isToggleSwitch?"ui-slider ":"ui-slider-track ",n," ui-btn-down-",k," ui-btn-corner-all",v].join(""),w.className="ui-slider-handle",y.appendChild(w),x.buttonMarkup({corners:!0,theme:j,shadow:!0}).attr({role:"slider","aria-valuemin":s,"aria-valuemax":t,"aria-valuenow":this._value(),"aria-valuetext":this._value(),title:this._value(),"aria-labelledby":q}),a.extend(this,{slider:z,handle:x,type:l,step:u,max:t,min:s,valuebg:A,isRangeslider:m,dragging:!1,beforeStart:null,userModified:!1,mouseMoved:!1}),this.isToggleSwitch){f=c.createElement("div"),f.className="ui-slider-inneroffset";for(var B=0,C=y.childNodes.length;C>B;B++)f.appendChild(y.childNodes[B]);y.appendChild(f),x.addClass("ui-slider-handle-snapping"),e=h.find("option");for(var D=0,E=e.length;E>D;D++){var F=D?"a":"b",G=D?" "+a.mobile.activeBtnClass:" ui-btn-down-"+k,H=(c.createElement("div"),c.createElement("span"));H.className=["ui-slider-label ui-slider-label-",F,G," ui-btn-corner-all"].join(""),H.setAttribute("role","img"),H.appendChild(c.createTextNode(e[D].innerHTML)),a(H).prependTo(z)}g._labels=a(".ui-slider-label",z)}r.addClass("ui-slider"),h.addClass(this.isToggleSwitch?"ui-slider-switch":"ui-slider-input"),this._on(h,{change:"_controlChange",keyup:"_controlKeyup",blur:"_controlBlur",vmouseup:"_controlVMouseUp"}),z.bind("vmousedown",a.proxy(this._sliderVMouseDown,this)).bind("vclick",!1),this._on(c,{vmousemove:"_preventDocumentDrag"}),this._on(z.add(c),{vmouseup:"_sliderVMouseUp"}),z.insertAfter(h),this.isToggleSwitch||m||(f=this.options.mini?"<div class='ui-slider ui-mini'>":"<div class='ui-slider'>",h.add(z).wrapAll(f)),this.isToggleSwitch&&this.handle.bind({focus:function(){z.addClass(a.mobile.focusClass)},blur:function(){z.removeClass(a.mobile.focusClass)}}),this._on(this.handle,{vmousedown:"_handleVMouseDown",keydown:"_handleKeydown",keyup:"_handleKeyup"}),this.handle.bind("vclick",!1),this._handleFormReset(),this.refresh(d,d,!0)},_controlChange:function(a){return this._trigger("controlchange",a)===!1?!1:(this.mouseMoved||this.refresh(this._value(),!0),void 0)},_controlKeyup:function(){this.refresh(this._value(),!0,!0)},_controlBlur:function(){this.refresh(this._value(),!0)},_controlVMouseUp:function(){this._checkedRefresh()},_handleVMouseDown:function(){this.handle.focus()},_handleKeydown:function(b){var c=this._value();if(!this.options.disabled){switch(b.keyCode){case a.mobile.keyCode.HOME:case a.mobile.keyCode.END:case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:b.preventDefault(),this._keySliding||(this._keySliding=!0,this.handle.addClass("ui-state-active"))}switch(b.keyCode){case a.mobile.keyCode.HOME:this.refresh(this.min);break;case a.mobile.keyCode.END:this.refresh(this.max);break;case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:this.refresh(c+this.step);break;case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:this.refresh(c-this.step)}}},_handleKeyup:function(){this._keySliding&&(this._keySliding=!1,this.handle.removeClass("ui-state-active"))},_sliderVMouseDown:function(a){return this.options.disabled||1!==a.which&&0!==a.which&&a.which!==d?!1:this._trigger("beforestart",a)===!1?!1:(this.dragging=!0,this.userModified=!1,this.mouseMoved=!1,this.isToggleSwitch&&(this.beforeStart=this.element[0].selectedIndex),this.refresh(a),this._trigger("start"),!1)},_sliderVMouseUp:function(){return this.dragging?(this.dragging=!1,this.isToggleSwitch&&(this.handle.addClass("ui-slider-handle-snapping"),this.mouseMoved?this.userModified?this.refresh(0===this.beforeStart?1:0):this.refresh(this.beforeStart):this.refresh(0===this.beforeStart?1:0)),this.mouseMoved=!1,this._trigger("stop"),!1):void 0},_preventDocumentDrag:function(a){return this._trigger("drag",a)===!1?!1:this.dragging&&!this.options.disabled?(this.mouseMoved=!0,this.isToggleSwitch&&this.handle.removeClass("ui-slider-handle-snapping"),this.refresh(a),this.userModified=this.beforeStart!==this.element[0].selectedIndex,!1):void 0},_checkedRefresh:function(){this.value!==this._value()&&this.refresh(this._value())},_value:function(){return this.isToggleSwitch?this.element[0].selectedIndex:parseFloat(this.element.val())},_reset:function(){this.refresh(d,!1,!0)},refresh:function(b,d,e){var f,g,h,i,j=this,k=a.mobile.getInheritedTheme(this.element,"c"),l=this.options.theme||k,m=this.options.trackTheme||k;j.slider[0].className=[this.isToggleSwitch?"ui-slider ui-slider-switch":"ui-slider-track"," ui-btn-down-"+m," ui-btn-corner-all",this.options.mini?" ui-mini":""].join(""),(this.options.disabled||this.element.attr("disabled"))&&this.disable(),this.value=this._value(),this.options.highlight&&!this.isToggleSwitch&&0===this.slider.find(".ui-slider-bg").length&&(this.valuebg=function(){var b=c.createElement("div");return b.className="ui-slider-bg "+a.mobile.activeBtnClass+" ui-btn-corner-all",a(b).prependTo(j.slider)}()),this.handle.buttonMarkup({corners:!0,theme:l,shadow:!0});var n,o,p=this.element,q=!this.isToggleSwitch,r=q?[]:p.find("option"),s=q?parseFloat(p.attr("min")):0,t=q?parseFloat(p.attr("max")):r.length-1,u=q&&parseFloat(p.attr("step"))>0?parseFloat(p.attr("step")):1;if("object"==typeof b){if(h=b,i=8,f=this.slider.offset().left,g=this.slider.width(),n=g/((t-s)/u),!this.dragging||h.pageX<f-i||h.pageX>f+g+i)return;o=n>1?100*((h.pageX-f)/g):Math.round(100*((h.pageX-f)/g))}else null==b&&(b=q?parseFloat(p.val()||0):p[0].selectedIndex),o=100*((parseFloat(b)-s)/(t-s));if(!isNaN(o)){var v=o/100*(t-s)+s,w=(v-s)%u,x=v-w;2*Math.abs(w)>=u&&(x+=w>0?u:-u);var y=100/((t-s)/u);if(v=parseFloat(x.toFixed(5)),"undefined"==typeof n&&(n=g/((t-s)/u)),n>1&&q&&(o=(v-s)*y*(1/u)),0>o&&(o=0),o>100&&(o=100),s>v&&(v=s),v>t&&(v=t),this.handle.css("left",o+"%"),this.handle[0].setAttribute("aria-valuenow",q?v:r.eq(v).attr("value")),this.handle[0].setAttribute("aria-valuetext",q?v:r.eq(v).getEncodedText()),this.handle[0].setAttribute("title",q?v:r.eq(v).getEncodedText()),this.valuebg&&this.valuebg.css("width",o+"%"),this._labels){var z=100*(this.handle.width()/this.slider.width()),A=o&&z+(100-z)*o/100,B=100===o?0:Math.min(z+100-A,100);this._labels.each(function(){var b=a(this).is(".ui-slider-label-a");a(this).width((b?A:B)+"%")})}if(!e){var C=!1;if(q?(C=p.val()!==v,p.val(v)):(C=p[0].selectedIndex!==v,p[0].selectedIndex=v),this._trigger("beforechange",b)===!1)return!1;!d&&C&&p.trigger("change")}}},enable:function(){return this.element.attr("disabled",!1),this.slider.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.slider.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)}},a.mobile.behaviors.formReset)),a.mobile.document.bind("pagecreate create",function(b){a.mobile.slider.prototype.enhanceWithin(b.target,!0)})}(a),function(a){a.widget("mobile.rangeslider",a.mobile.widget,{options:{theme:null,trackTheme:null,disabled:!1,initSelector:":jqmData(role='rangeslider')",mini:!1,highlight:!0},_create:function(){var b,c=this.element,d=this.options.mini?"ui-rangeslider ui-mini":"ui-rangeslider",e=c.find("input").first(),f=c.find("input").last(),g=c.find("label").first(),h=a.data(e.get(0),"mobileSlider").slider,i=a.data(f.get(0),"mobileSlider").slider,j=a.data(e.get(0),"mobileSlider").handle,k=a('<div class="ui-rangeslider-sliders" />').appendTo(c);c.find("label").length>1&&(b=c.find("label").last().hide()),e.addClass("ui-rangeslider-first"),f.addClass("ui-rangeslider-last"),c.addClass(d),h.appendTo(k),i.appendTo(k),g.prependTo(c),j.prependTo(i),a.extend(this,{_inputFirst:e,_inputLast:f,_sliderFirst:h,_sliderLast:i,_targetVal:null,_sliderTarget:!1,_sliders:k,_proxy:!1}),this.refresh(),this._on(this.element.find("input.ui-slider-input"),{slidebeforestart:"_slidebeforestart",slidestop:"_slidestop",slidedrag:"_slidedrag",slidebeforechange:"_change",blur:"_change",keyup:"_change"}),this._on({mousedown:"_change"}),this._on(this.element.closest("form"),{reset:"_handleReset"}),this._on(j,{vmousedown:"_dragFirstHandle"})},_handleReset:function(){var a=this;setTimeout(function(){a._updateHighlight()},0)},_dragFirstHandle:function(b){return a.data(this._inputFirst.get(0),"mobileSlider").dragging=!0,a.data(this._inputFirst.get(0),"mobileSlider").refresh(b),!1},_slidedrag:function(b){var c=a(b.target).is(this._inputFirst),d=c?this._inputLast:this._inputFirst;return this._sliderTarget=!1,"first"===this._proxy&&c||"last"===this._proxy&&!c?(a.data(d.get(0),"mobileSlider").dragging=!0,a.data(d.get(0),"mobileSlider").refresh(b),!1):void 0},_slidestop:function(b){var c=a(b.target).is(this._inputFirst);this._proxy=!1,this.element.find("input").trigger("vmouseup"),this._sliderFirst.css("z-index",c?1:"")},_slidebeforestart:function(b){this._sliderTarget=!1,a(b.originalEvent.target).hasClass("ui-slider-track")&&(this._sliderTarget=!0,this._targetVal=a(b.target).val())},_setOption:function(a){this._superApply(a),this.refresh()},refresh:function(){var a=this.element,b=this.options;a.find("input").slider({theme:b.theme,trackTheme:b.trackTheme,disabled:b.disabled,mini:b.mini,highlight:b.highlight}).slider("refresh"),this._updateHighlight()},_change:function(b){if("keyup"===b.type)return this._updateHighlight(),!1;var c=this,d=parseFloat(this._inputFirst.val(),10),e=parseFloat(this._inputLast.val(),10),f=a(b.target).hasClass("ui-rangeslider-first"),g=f?this._inputFirst:this._inputLast,h=f?this._inputLast:this._inputFirst;if(this._inputFirst.val()>this._inputLast.val()&&"mousedown"===b.type&&!a(b.target).hasClass("ui-slider-handle"))g.blur();else if("mousedown"===b.type)return;return d>e&&!this._sliderTarget?(g.val(f?e:d).slider("refresh"),this._trigger("normalize")):d>e&&(g.val(this._targetVal).slider("refresh"),setTimeout(function(){h.val(f?d:e).slider("refresh"),a.data(h.get(0),"mobileSlider").handle.focus(),c._sliderFirst.css("z-index",f?"":1),c._trigger("normalize")},0),this._proxy=f?"first":"last"),d===e?(a.data(g.get(0),"mobileSlider").handle.css("z-index",1),a.data(h.get(0),"mobileSlider").handle.css("z-index",0)):(a.data(h.get(0),"mobileSlider").handle.css("z-index",""),a.data(g.get(0),"mobileSlider").handle.css("z-index","")),this._updateHighlight(),d>=e?!1:void 0},_updateHighlight:function(){var b=parseInt(a.data(this._inputFirst.get(0),"mobileSlider").handle.get(0).style.left,10),c=parseInt(a.data(this._inputLast.get(0),"mobileSlider").handle.get(0).style.left,10),d=c-b;this.element.find(".ui-slider-bg").css({"margin-left":b+"%",width:d+"%"})},_destroy:function(){this.element.removeClass("ui-rangeslider ui-mini").find("label").show(),this._inputFirst.after(this._sliderFirst),this._inputLast.after(this._sliderLast),this._sliders.remove(),this.element.find("input").removeClass("ui-rangeslider-first ui-rangeslider-last").slider("destroy")}}),a.widget("mobile.rangeslider",a.mobile.rangeslider,a.mobile.behaviors.formReset),a(c).bind("pagecreate create",function(b){a.mobile.rangeslider.prototype.enhanceWithin(b.target,!0)})}(a),function(a){a.widget("mobile.selectmenu",a.mobile.widget,a.extend({options:{theme:null,disabled:!1,icon:"arrow-d",iconpos:"right",inline:!1,corners:!0,shadow:!0,iconshadow:!0,overlayTheme:"a",dividerTheme:"b",hidePlaceholderMenuItems:!0,closeText:"Close",nativeMenu:!0,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"select:not( :jqmData(role='slider') )",mini:!1},_button:function(){return a("<div/>")
},_setDisabled:function(a){return this.element.attr("disabled",a),this.button.attr("aria-disabled",a),this._setOption("disabled",a)},_focusButton:function(){var a=this;setTimeout(function(){a.button.focus()},40)},_selectOptions:function(){return this.select.find("option")},_preExtension:function(){var b="";~this.element[0].className.indexOf("ui-btn-left")&&(b=" ui-btn-left"),~this.element[0].className.indexOf("ui-btn-right")&&(b=" ui-btn-right"),this.select=this.element.removeClass("ui-btn-left ui-btn-right").wrap("<div class='ui-select"+b+"'>"),this.selectID=this.select.attr("id"),this.label=a("label[for='"+this.selectID+"']").addClass("ui-select"),this.isMultiple=this.select[0].multiple,this.options.theme||(this.options.theme=a.mobile.getInheritedTheme(this.select,"c"))},_destroy:function(){var a=this.element.parents(".ui-select");a.length>0&&(a.is(".ui-btn-left, .ui-btn-right")&&this.element.addClass(a.is(".ui-btn-left")?"ui-btn-left":"ui-btn-right"),this.element.insertAfter(a),a.remove())},_create:function(){this._preExtension(),this._trigger("beforeCreate"),this.button=this._button();var c=this,d=this.options,e=d.inline||this.select.jqmData("inline"),f=d.mini||this.select.jqmData("mini"),g=d.icon?d.iconpos||this.select.jqmData("iconpos"):!1,h=(-1===this.select[0].selectedIndex?0:this.select[0].selectedIndex,this.button.insertBefore(this.select).buttonMarkup({theme:d.theme,icon:d.icon,iconpos:g,inline:e,corners:d.corners,shadow:d.shadow,iconshadow:d.iconshadow,mini:f}));this.setButtonText(),d.nativeMenu&&b.opera&&b.opera.version&&h.addClass("ui-select-nativeonly"),this.isMultiple&&(this.buttonCount=a("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(h.addClass("ui-li-has-count"))),(d.disabled||this.element.attr("disabled"))&&this.disable(),this.select.change(function(){c.refresh(),d.nativeMenu&&this.blur()}),this._handleFormReset(),this.build()},build:function(){var b=this;this.select.appendTo(b.button).bind("vmousedown",function(){b.button.addClass(a.mobile.activeBtnClass)}).bind("focus",function(){b.button.addClass(a.mobile.focusClass)}).bind("blur",function(){b.button.removeClass(a.mobile.focusClass)}).bind("focus vmouseover",function(){b.button.trigger("vmouseover")}).bind("vmousemove",function(){b.button.removeClass(a.mobile.activeBtnClass)}).bind("change blur vmouseout",function(){b.button.trigger("vmouseout").removeClass(a.mobile.activeBtnClass)}).bind("change blur",function(){b.button.removeClass("ui-btn-down-"+b.options.theme)}),b.button.bind("vmousedown",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.label.bind("click focus",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.select.bind("focus",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}),b.button.bind("mouseup",function(){b.options.preventFocusZoom&&setTimeout(function(){a.mobile.zoom.enable(!0)},0)}),b.select.bind("blur",function(){b.options.preventFocusZoom&&a.mobile.zoom.enable(!0)})},selected:function(){return this._selectOptions().filter(":selected")},selectedIndices:function(){var a=this;return this.selected().map(function(){return a._selectOptions().index(this)}).get()},setButtonText:function(){var b=this,d=this.selected(),e=this.placeholder,f=a(c.createElement("span"));this.button.find(".ui-btn-text").html(function(){return e=d.length?d.map(function(){return a(this).text()}).get().join(", "):b.placeholder,f.text(e).addClass(b.select.attr("class")).addClass(d.attr("class"))})},setButtonCount:function(){var a=this.selected();this.isMultiple&&this.buttonCount[a.length>1?"show":"hide"]().text(a.length)},_reset:function(){this.refresh()},refresh:function(){this.setButtonText(),this.setButtonCount()},open:a.noop,close:a.noop,disable:function(){this._setDisabled(!0),this.button.addClass("ui-disabled")},enable:function(){this._setDisabled(!1),this.button.removeClass("ui-disabled")}},a.mobile.behaviors.formReset)),a.mobile.document.bind("pagecreate create",function(b){a.mobile.selectmenu.prototype.enhanceWithin(b.target,!0)})}(a),function(a,d){function e(a,b,c,d){var e=d;return e=b>a?c+(a-b)/2:Math.min(Math.max(c,d-b/2),c+a-b)}function f(){var c=a.mobile.window;return{x:c.scrollLeft(),y:c.scrollTop(),cx:b.innerWidth||c.width(),cy:b.innerHeight||c.height()}}a.widget("mobile.popup",a.mobile.widget,{options:{theme:null,overlayTheme:null,shadow:!0,corners:!0,transition:"none",positionTo:"origin",tolerance:null,initSelector:":jqmData(role='popup')",closeLinkSelector:"a:jqmData(rel='back')",closeLinkEvents:"click.popup",navigateEvents:"navigate.popup",closeEvents:"navigate.popup pagebeforechange.popup",dismissible:!0,history:!a.mobile.browser.oldIE},_eatEventAndClose:function(a){return a.preventDefault(),a.stopImmediatePropagation(),this.options.dismissible&&this.close(),!1},_resizeScreen:function(){var a=this._ui.container.outerHeight(!0);this._ui.screen.removeAttr("style"),a>this._ui.screen.height()&&this._ui.screen.height(a)},_handleWindowKeyUp:function(b){return this._isOpen&&b.keyCode===a.mobile.keyCode.ESCAPE?this._eatEventAndClose(b):void 0},_expectResizeEvent:function(){var b=f();if(this._resizeData){if(b.x===this._resizeData.winCoords.x&&b.y===this._resizeData.winCoords.y&&b.cx===this._resizeData.winCoords.cx&&b.cy===this._resizeData.winCoords.cy)return!1;clearTimeout(this._resizeData.timeoutId)}return this._resizeData={timeoutId:setTimeout(a.proxy(this,"_resizeTimeout"),200),winCoords:b},!0},_resizeTimeout:function(){this._isOpen?this._expectResizeEvent()||(this._ui.container.hasClass("ui-popup-hidden")&&(this._ui.container.removeClass("ui-popup-hidden"),this.reposition({positionTo:"window"}),this._ignoreResizeEvents()),this._resizeScreen(),this._resizeData=null,this._orientationchangeInProgress=!1):(this._resizeData=null,this._orientationchangeInProgress=!1)},_ignoreResizeEvents:function(){var a=this;this._ignoreResizeTo&&clearTimeout(this._ignoreResizeTo),this._ignoreResizeTo=setTimeout(function(){a._ignoreResizeTo=0},1e3)},_handleWindowResize:function(){this._isOpen&&0===this._ignoreResizeTo&&(!this._expectResizeEvent()&&!this._orientationchangeInProgress||this._ui.container.hasClass("ui-popup-hidden")||this._ui.container.addClass("ui-popup-hidden").removeAttr("style"))},_handleWindowOrientationchange:function(){!this._orientationchangeInProgress&&this._isOpen&&0===this._ignoreResizeTo&&(this._expectResizeEvent(),this._orientationchangeInProgress=!0)},_handleDocumentFocusIn:function(b){var d,e=b.target,f=this._ui;if(this._isOpen){if(e!==f.container[0]){if(d=a(b.target),0===d.parents().filter(f.container[0]).length)return a(c.activeElement).one("focus",function(){d.blur()}),f.focusElement.focus(),b.preventDefault(),b.stopImmediatePropagation(),!1;f.focusElement[0]===f.container[0]&&(f.focusElement=d)}this._ignoreResizeEvents()}},_create:function(){var b={screen:a("<div class='ui-screen-hidden ui-popup-screen'></div>"),placeholder:a("<div style='display: none;'><!-- placeholder --></div>"),container:a("<div class='ui-popup-container ui-popup-hidden'></div>")},c=this.element.closest(".ui-page"),d=this.element.attr("id"),e=this.options;e.history=e.history&&a.mobile.ajaxEnabled&&a.mobile.hashListeningEnabled,0===c.length&&(c=a("body")),e.container=e.container||a.mobile.pageContainer||c,c.append(b.screen),b.container.insertAfter(b.screen),b.placeholder.insertAfter(this.element),d&&(b.screen.attr("id",d+"-screen"),b.container.attr("id",d+"-popup"),b.placeholder.html("<!-- placeholder for "+d+" -->")),b.container.append(this.element),b.focusElement=b.container,this.element.addClass("ui-popup"),a.extend(this,{_scrollTop:0,_page:c,_ui:b,_fallbackTransition:"",_currentTransition:!1,_prereqs:null,_isOpen:!1,_tolerance:null,_resizeData:null,_ignoreResizeTo:0,_orientationchangeInProgress:!1}),this._applyTheme(this.element,e.theme,"body"),this._applyTheme(this._ui.screen,e.overlayTheme,"overlay"),this._applyTransition(e.transition),this.element.toggleClass("ui-overlay-shadow",e.shadow).toggleClass("ui-corner-all",e.corners),this._setTolerance(e.tolerance),b.screen.bind("vclick",a.proxy(this,"_eatEventAndClose")),this._on(a.mobile.window,{orientationchange:a.proxy(this,"_handleWindowOrientationchange"),resize:a.proxy(this,"_handleWindowResize"),keyup:a.proxy(this,"_handleWindowKeyUp")}),this._on(a.mobile.document,{focusin:a.proxy(this,"_handleDocumentFocusIn")})},_applyTheme:function(a,b,c){for(var d,e=(a.attr("class")||"").split(" "),f=null,g=String(b);e.length>0;){if(f=e.pop(),d=new RegExp("^ui-"+c+"-([a-z])$").exec(f),d&&d.length>1){f=d[1];break}f=null}b!==f&&(a.removeClass("ui-"+c+"-"+f),null!==b&&"none"!==b&&a.addClass("ui-"+c+"-"+g))},_setTheme:function(a){this._applyTheme(this.element,a,"body")},_setOverlayTheme:function(a){this._applyTheme(this._ui.screen,a,"overlay"),this._isOpen&&this._ui.screen.addClass("in")},_setShadow:function(a){this.element.toggleClass("ui-overlay-shadow",a)},_setCorners:function(a){this.element.toggleClass("ui-corner-all",a)},_applyTransition:function(b){this._ui.container.removeClass(this._fallbackTransition),b&&"none"!==b&&(this._fallbackTransition=a.mobile._maybeDegradeTransition(b),"none"===this._fallbackTransition&&(this._fallbackTransition=""),this._ui.container.addClass(this._fallbackTransition))},_setTransition:function(a){this._currentTransition||this._applyTransition(a)},_setTolerance:function(b){var c={t:30,r:15,b:30,l:15};if(b!==d){var e=String(b).split(",");switch(a.each(e,function(a,b){e[a]=parseInt(b,10)}),e.length){case 1:isNaN(e[0])||(c.t=c.r=c.b=c.l=e[0]);break;case 2:isNaN(e[0])||(c.t=c.b=e[0]),isNaN(e[1])||(c.l=c.r=e[1]);break;case 4:isNaN(e[0])||(c.t=e[0]),isNaN(e[1])||(c.r=e[1]),isNaN(e[2])||(c.b=e[2]),isNaN(e[3])||(c.l=e[3])}}this._tolerance=c},_setOption:function(a,b){var c="_set"+a.charAt(0).toUpperCase()+a.slice(1);this[c]!==d&&this[c](b),this._super(a,b)},_placementCoords:function(a){var b,d,g=f(),h={x:this._tolerance.l,y:g.y+this._tolerance.t,cx:g.cx-this._tolerance.l-this._tolerance.r,cy:g.cy-this._tolerance.t-this._tolerance.b};this._ui.container.css("max-width",h.cx),b={cx:this._ui.container.outerWidth(!0),cy:this._ui.container.outerHeight(!0)},d={x:e(h.cx,b.cx,h.x,a.x),y:e(h.cy,b.cy,h.y,a.y)},d.y=Math.max(0,d.y);var i=c.documentElement,j=c.body,k=Math.max(i.clientHeight,j.scrollHeight,j.offsetHeight,i.scrollHeight,i.offsetHeight);return d.y-=Math.min(d.y,Math.max(0,d.y+b.cy-k)),{left:d.x,top:d.y}},_createPrereqs:function(b,c,d){var e,f=this;e={screen:a.Deferred(),container:a.Deferred()},e.screen.then(function(){e===f._prereqs&&b()}),e.container.then(function(){e===f._prereqs&&c()}),a.when(e.screen,e.container).done(function(){e===f._prereqs&&(f._prereqs=null,d())}),f._prereqs=e},_animate:function(b){return this._ui.screen.removeClass(b.classToRemove).addClass(b.screenClassToAdd),b.prereqs.screen.resolve(),b.transition&&"none"!==b.transition&&(b.applyTransition&&this._applyTransition(b.transition),this._fallbackTransition)?(this._ui.container.animationComplete(a.proxy(b.prereqs.container,"resolve")).addClass(b.containerClassToAdd).removeClass(b.classToRemove),void 0):(this._ui.container.removeClass(b.classToRemove),b.prereqs.container.resolve(),void 0)},_desiredCoords:function(b){var c,d=null,e=f(),g=b.x,h=b.y,i=b.positionTo;if(i&&"origin"!==i)if("window"===i)g=e.cx/2+e.x,h=e.cy/2+e.y;else{try{d=a(i)}catch(j){d=null}d&&(d.filter(":visible"),0===d.length&&(d=null))}return d&&(c=d.offset(),g=c.left+d.outerWidth()/2,h=c.top+d.outerHeight()/2),("number"!==a.type(g)||isNaN(g))&&(g=e.cx/2+e.x),("number"!==a.type(h)||isNaN(h))&&(h=e.cy/2+e.y),{x:g,y:h}},_reposition:function(a){a={x:a.x,y:a.y,positionTo:a.positionTo},this._trigger("beforeposition",d,a),this._ui.container.offset(this._placementCoords(this._desiredCoords(a)))},reposition:function(a){this._isOpen&&this._reposition(a)},_openPrereqsComplete:function(){this._ui.container.addClass("ui-popup-active"),this._isOpen=!0,this._resizeScreen(),this._ui.container.attr("tabindex","0").focus(),this._ignoreResizeEvents(),this._trigger("afteropen")},_open:function(b){var c=a.extend({},this.options,b),d=function(){var a=navigator.userAgent,b=a.match(/AppleWebKit\/([0-9\.]+)/),c=!!b&&b[1],d=a.match(/Android (\d+(?:\.\d+))/),e=!!d&&d[1],f=a.indexOf("Chrome")>-1;return null!==d&&"4.0"===e&&c&&c>534.13&&!f?!0:!1}();this._createPrereqs(a.noop,a.noop,a.proxy(this,"_openPrereqsComplete")),this._currentTransition=c.transition,this._applyTransition(c.transition),this.options.theme||this._setTheme(this._page.jqmData("theme")||a.mobile.getInheritedTheme(this._page,"c")),this._ui.screen.removeClass("ui-screen-hidden"),this._ui.container.removeClass("ui-popup-hidden"),this._reposition(c),this.options.overlayTheme&&d&&this.element.closest(".ui-page").addClass("ui-popup-open"),this._animate({additionalCondition:!0,transition:c.transition,classToRemove:"",screenClassToAdd:"in",containerClassToAdd:"in",applyTransition:!1,prereqs:this._prereqs})},_closePrereqScreen:function(){this._ui.screen.removeClass("out").addClass("ui-screen-hidden")},_closePrereqContainer:function(){this._ui.container.removeClass("reverse out").addClass("ui-popup-hidden").removeAttr("style")},_closePrereqsDone:function(){var b=this._ui.container;b.removeAttr("tabindex"),a.mobile.popup.active=d,a(":focus",b[0]).add(b[0]).blur(),this._trigger("afterclose")},_close:function(b){this._ui.container.removeClass("ui-popup-active"),this._page.removeClass("ui-popup-open"),this._isOpen=!1,this._createPrereqs(a.proxy(this,"_closePrereqScreen"),a.proxy(this,"_closePrereqContainer"),a.proxy(this,"_closePrereqsDone")),this._animate({additionalCondition:this._ui.screen.hasClass("in"),transition:b?"none":this._currentTransition,classToRemove:"in",screenClassToAdd:"out",containerClassToAdd:"reverse out",applyTransition:!0,prereqs:this._prereqs})},_unenhance:function(){this._setTheme("none"),this.element.detach().insertAfter(this._ui.placeholder).removeClass("ui-popup ui-overlay-shadow ui-corner-all"),this._ui.screen.remove(),this._ui.container.remove(),this._ui.placeholder.remove()},_destroy:function(){a.mobile.popup.active===this?(this.element.one("popupafterclose",a.proxy(this,"_unenhance")),this.close()):this._unenhance()},_closePopup:function(c,d){var e,f,g=this.options,h=!1;b.scrollTo(0,this._scrollTop),c&&"pagebeforechange"===c.type&&d&&(e="string"==typeof d.toPage?d.toPage:d.toPage.jqmData("url"),e=a.mobile.path.parseUrl(e),f=e.pathname+e.search+e.hash,this._myUrl!==a.mobile.path.makeUrlAbsolute(f)?h=!0:c.preventDefault()),g.container.unbind(g.closeEvents),this.element.undelegate(g.closeLinkSelector,g.closeLinkEvents),this._close(h)},_bindContainerClose:function(){this.options.container.one(this.options.closeEvents,a.proxy(this,"_closePopup"))},open:function(c){var d,e,f,g,h,i,j=this,k=this.options;if(!a.mobile.popup.active){if(a.mobile.popup.active=this,this._scrollTop=a.mobile.window.scrollTop(),!k.history)return j._open(c),j._bindContainerClose(),j.element.delegate(k.closeLinkSelector,k.closeLinkEvents,function(a){j.close(),a.preventDefault()}),void 0;if(i=a.mobile.urlHistory,e=a.mobile.dialogHashKey,f=a.mobile.activePage,g=f.is(".ui-dialog"),this._myUrl=d=i.getActive().url,h=d.indexOf(e)>-1&&!g&&i.activeIndex>0)return j._open(c),j._bindContainerClose(),void 0;-1!==d.indexOf(e)||g?d=a.mobile.path.parseLocation().hash+e:d+=d.indexOf("#")>-1?e:"#"+e,0===i.activeIndex&&d===i.initialDst&&(d+=e),a(b).one("beforenavigate",function(a){a.preventDefault(),j._open(c),j._bindContainerClose()}),this.urlAltered=!0,a.mobile.navigate(d,{role:"dialog"})}},close:function(){a.mobile.popup.active===this&&(this._scrollTop=a.mobile.window.scrollTop(),this.options.history&&this.urlAltered?(a.mobile.back(),this.urlAltered=!1):this._closePopup())}}),a.mobile.popup.handleLink=function(b){var c,d=b.closest(":jqmData(role='page')"),e=0===d.length?a("body"):d,f=a(a.mobile.path.parseUrl(b.attr("href")).hash,e[0]);f.data("mobile-popup")&&(c=b.offset(),f.popup("open",{x:c.left+b.outerWidth()/2,y:c.top+b.outerHeight()/2,transition:b.jqmData("transition"),positionTo:b.jqmData("position-to")})),setTimeout(function(){var c=b.parent().parent();c.hasClass("ui-li")&&(b=c.parent()),b.removeClass(a.mobile.activeBtnClass)},300)},a.mobile.document.bind("pagebeforechange",function(b,c){"popup"===c.options.role&&(a.mobile.popup.handleLink(c.options.link),b.preventDefault())}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.popup.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){var d=function(d){var e,f,g,h=(d.select,d._destroy),i=d.selectID,j=i?i:(a.mobile.ns||"")+"uuid-"+d.uuid,k=j+"-listbox",l=j+"-dialog",m=d.label,n=d.select.closest(".ui-page"),o=d._selectOptions(),p=d.isMultiple=d.select[0].multiple,q=i+"-button",r=i+"-menu",s=a("<div data-"+a.mobile.ns+"role='dialog' id='"+l+"' data-"+a.mobile.ns+"theme='"+d.options.theme+"' data-"+a.mobile.ns+"overlay-theme='"+d.options.overlayTheme+"'>"+"<div data-"+a.mobile.ns+"role='header'>"+"<div class='ui-title'>"+m.getEncodedText()+"</div>"+"</div>"+"<div data-"+a.mobile.ns+"role='content'></div>"+"</div>"),t=a("<div id='"+k+"' class='ui-selectmenu'>").insertAfter(d.select).popup({theme:d.options.overlayTheme}),u=a("<ul>",{"class":"ui-selectmenu-list",id:r,role:"listbox","aria-labelledby":q}).attr("data-"+a.mobile.ns+"theme",d.options.theme).attr("data-"+a.mobile.ns+"divider-theme",d.options.dividerTheme).appendTo(t),v=a("<div>",{"class":"ui-header ui-bar-"+d.options.theme}).prependTo(t),w=a("<h1>",{"class":"ui-title"}).appendTo(v);d.isMultiple&&(g=a("<a>",{text:d.options.closeText,href:"#","class":"ui-btn-left"}).attr("data-"+a.mobile.ns+"iconpos","notext").attr("data-"+a.mobile.ns+"icon","delete").appendTo(v).buttonMarkup()),a.extend(d,{select:d.select,selectID:i,buttonId:q,menuId:r,popupID:k,dialogID:l,thisPage:n,menuPage:s,label:m,selectOptions:o,isMultiple:p,theme:d.options.theme,listbox:t,list:u,header:v,headerTitle:w,headerClose:g,menuPageContent:e,menuPageClose:f,placeholder:"",build:function(){var c=this,e=function(a){return a.replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g,"\\$1")};c.refresh(),c._origTabIndex===b&&(c._origTabIndex=null===c.select[0].getAttribute("tabindex")?!1:c.select.attr("tabindex")),c.select.attr("tabindex","-1").focus(function(){a(this).blur(),c.button.focus()}),c.button.bind("vclick keydown",function(b){c.options.disabled||c.isOpen||("vclick"===b.type||b.keyCode&&(b.keyCode===a.mobile.keyCode.ENTER||b.keyCode===a.mobile.keyCode.SPACE))&&(c._decideFormat(),"overlay"===c.menuType?c.button.attr("href","#"+e(c.popupID)).attr("data-"+(a.mobile.ns||"")+"rel","popup"):c.button.attr("href","#"+e(c.dialogID)).attr("data-"+(a.mobile.ns||"")+"rel","dialog"),c.isOpen=!0)}),c.list.attr("role","listbox").bind("focusin",function(b){a(b.target).attr("tabindex","0").trigger("vmouseover")}).bind("focusout",function(b){a(b.target).attr("tabindex","-1").trigger("vmouseout")}).delegate("li:not(.ui-disabled, .ui-li-divider)","click",function(b){var e=c.select[0].selectedIndex,f=c.list.find("li:not(.ui-li-divider)").index(this),g=c._selectOptions().eq(f)[0];g.selected=c.isMultiple?!g.selected:!0,c.isMultiple&&a(this).find(".ui-icon").toggleClass("ui-icon-checkbox-on",g.selected).toggleClass("ui-icon-checkbox-off",!g.selected),(c.isMultiple||e!==f)&&c.select.trigger("change"),c.isMultiple?c.list.find("li:not(.ui-li-divider)").eq(f).addClass("ui-btn-down-"+d.options.theme).find("a").first().focus():c.close(),b.preventDefault()}).keydown(function(b){var c,e,f=a(b.target),g=f.closest("li");switch(b.keyCode){case 38:return c=g.prev().not(".ui-selectmenu-placeholder"),c.is(".ui-li-divider")&&(c=c.prev()),c.length&&(f.blur().attr("tabindex","-1"),c.addClass("ui-btn-down-"+d.options.theme).find("a").first().focus()),!1;case 40:return e=g.next(),e.is(".ui-li-divider")&&(e=e.next()),e.length&&(f.blur().attr("tabindex","-1"),e.addClass("ui-btn-down-"+d.options.theme).find("a").first().focus()),!1;case 13:case 32:return f.trigger("click"),!1}}),c.menuPage.bind("pagehide",function(){a.mobile._bindPageRemove.call(c.thisPage)}),c.listbox.bind("popupafterclose",function(){c.close()}),c.isMultiple&&c.headerClose.click(function(){return"overlay"===c.menuType?(c.close(),!1):void 0}),c.thisPage.addDependents(this.menuPage)},_isRebuildRequired:function(){var a=this.list.find("li"),b=this._selectOptions();return b.text()!==a.text()},selected:function(){return this._selectOptions().filter(":selected:not( :jqmData(placeholder='true') )")},refresh:function(b){var c,d=this;this.element,this.isMultiple,(b||this._isRebuildRequired())&&d._buildList(),c=this.selectedIndices(),d.setButtonText(),d.setButtonCount(),d.list.find("li:not(.ui-li-divider)").removeClass(a.mobile.activeBtnClass).attr("aria-selected",!1).each(function(b){if(a.inArray(b,c)>-1){var e=a(this);e.attr("aria-selected",!0),d.isMultiple?e.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on"):e.is(".ui-selectmenu-placeholder")?e.next().addClass(a.mobile.activeBtnClass):e.addClass(a.mobile.activeBtnClass)}})},close:function(){if(!this.options.disabled&&this.isOpen){var a=this;"page"===a.menuType?(a.menuPage.dialog("close"),a.list.appendTo(a.listbox)):a.listbox.popup("close"),a._focusButton(),a.isOpen=!1}},open:function(){this.button.click()},_decideFormat:function(){function b(){var b=c.list.find("."+a.mobile.activeBtnClass+" a");0===b.length&&(b=c.list.find("li.ui-btn:not( :jqmData(placeholder='true') ) a")),b.first().focus().closest("li").addClass("ui-btn-down-"+d.options.theme)}var c=this,e=a.mobile.window,f=c.list.parent(),g=f.outerHeight(),h=(f.outerWidth(),a("."+a.mobile.activePageClass),e.scrollTop()),i=c.button.offset().top,j=e.height();e.width(),g>j-80||!a.support.scrollTop?(c.menuPage.appendTo(a.mobile.pageContainer).page(),c.menuPageContent=s.find(".ui-content"),c.menuPageClose=s.find(".ui-header a"),c.thisPage.unbind("pagehide.remove"),0===h&&i>j&&c.thisPage.one("pagehide",function(){a(this).jqmData("lastScroll",i)}),c.menuPage.one("pageshow",function(){b()}).one("pagehide",function(){c.close()}),c.menuType="page",c.menuPageContent.append(c.list),c.menuPage.find("div .ui-title").text(c.label.text())):(c.menuType="overlay",c.listbox.one("popupafteropen",b))},_buildList:function(){var b=this,d=this.options,e=this.placeholder,f=!0,g=b.isMultiple?"checkbox-off":"false";b.list.empty().filter(".ui-listview").listview("destroy");for(var h,i=b.select.find("option"),j=i.length,k=this.select[0],l="data-"+a.mobile.ns,m=l+"option-index",n=l+"icon",o=l+"role",p=l+"placeholder",q=c.createDocumentFragment(),r=!1,s=0;j>s;s++,r=!1){var t=i[s],u=a(t),v=t.parentNode,w=u.text(),x=c.createElement("a"),y=[];if(x.setAttribute("href","#"),x.appendChild(c.createTextNode(w)),v!==k&&"optgroup"===v.nodeName.toLowerCase()){var z=v.getAttribute("label");if(z!==h){var A=c.createElement("li");A.setAttribute(o,"list-divider"),A.setAttribute("role","option"),A.setAttribute("tabindex","-1"),A.appendChild(c.createTextNode(z)),q.appendChild(A),h=z}}!f||t.getAttribute("value")&&0!==w.length&&!u.jqmData("placeholder")||(f=!1,r=!0,null===t.getAttribute(p)&&(this._removePlaceholderAttr=!0),t.setAttribute(p,!0),d.hidePlaceholderMenuItems&&y.push("ui-selectmenu-placeholder"),e!==w&&(e=b.placeholder=w));var B=c.createElement("li");t.disabled&&(y.push("ui-disabled"),B.setAttribute("aria-disabled",!0)),B.setAttribute(m,s),B.setAttribute(n,g),r&&B.setAttribute(p,!0),B.className=y.join(" "),B.setAttribute("role","option"),x.setAttribute("tabindex","-1"),B.appendChild(x),q.appendChild(B)}b.list[0].appendChild(q),this.isMultiple||e.length?this.headerTitle.text(this.placeholder):this.header.hide(),b.list.listview()},_button:function(){return a("<a>",{href:"#",role:"button",id:this.buttonId,"aria-haspopup":"true","aria-owns":this.menuId})},_destroy:function(){this.close(),this._origTabIndex!==b&&(this._origTabIndex!==!1?this.select.attr("tabindex",this._origTabIndex):this.select.removeAttr("tabindex")),this._removePlaceholderAttr&&this._selectOptions().removeAttr("data-"+a.mobile.ns+"placeholder"),this.listbox.remove(),this.menuPage.remove(),h.apply(this,arguments)}})};a.mobile.document.bind("selectmenubeforecreate",function(b){var c=a(b.target).data("mobile-selectmenu");c.options.nativeMenu||0!==c.element.parents(":jqmData(role='popup')").length||d(c)})}(a),function(a,b){a.widget("mobile.controlgroup",a.mobile.widget,a.extend({options:{shadow:!1,corners:!0,excludeInvisible:!0,type:"vertical",mini:!1,initSelector:":jqmData(role='controlgroup')"},_create:function(){var c=this.element,d={inner:a("<div class='ui-controlgroup-controls'></div>"),legend:a("<div role='heading' class='ui-controlgroup-label'></div>")},e=c.children("legend"),f=this;c.wrapInner(d.inner),e.length&&d.legend.append(e).insertBefore(c.children(0)),c.addClass("ui-corner-all ui-controlgroup"),a.extend(this,{_initialRefresh:!0}),a.each(this.options,function(a,c){f.options[a]=b,f._setOption(a,c,!0)})},_init:function(){this.refresh()},_setOption:function(c,d){var e="_set"+c.charAt(0).toUpperCase()+c.slice(1);this[e]!==b&&this[e](d),this._super(c,d),this.element.attr("data-"+(a.mobile.ns||"")+c.replace(/([A-Z])/,"-$1").toLowerCase(),d)},_setType:function(a){this.element.removeClass("ui-controlgroup-horizontal ui-controlgroup-vertical").addClass("ui-controlgroup-"+a),this.refresh()},_setCorners:function(a){this.element.toggleClass("ui-corner-all",a)},_setShadow:function(a){this.element.toggleClass("ui-shadow",a)},_setMini:function(a){this.element.toggleClass("ui-mini",a)},container:function(){return this.element.children(".ui-controlgroup-controls")},refresh:function(){var b=this.element.find(".ui-btn").not(".ui-slider-handle"),c=this._initialRefresh;a.mobile.checkboxradio&&this.element.find(":mobile-checkboxradio").checkboxradio("refresh"),this._addFirstLastClasses(b,this.options.excludeInvisible?this._getVisibles(b,c):b,c),this._initialRefresh=!1}},a.mobile.behaviors.addFirstLastClasses)),a(function(){a.mobile.document.bind("pagecreate create",function(b){a.mobile.controlgroup.prototype.enhanceWithin(b.target,!0)})})}(a),function(a){a(c).bind("pagecreate create",function(b){a(b.target).find("a").jqmEnhanceable().filter(":jqmData(rel='popup')[href][href!='']").each(function(){var b=this,d=a(this).attr("href"),e=d.substring(1);b.setAttribute("aria-haspopup",!0),b.setAttribute("aria-owns",e),b.setAttribute("aria-expanded",!1),a(c).on("popupafteropen",d,function(){b.setAttribute("aria-expanded",!0)}).on("popupafterclose",d,function(){b.setAttribute("aria-expanded",!1)})}).end().not(".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")})}(a),function(a,b){a.widget("mobile.fixedtoolbar",a.mobile.widget,{options:{visibleOnPageShow:!0,disablePageZoom:!0,transition:"slide",fullscreen:!1,tapToggle:!0,tapToggleBlacklist:"a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup, .ui-panel, .ui-panel-dismiss-open",hideDuringFocus:"input, textarea, select",updatePagePadding:!0,trackPersistentToolbars:!0,supportBlacklist:function(){return!a.support.fixedPosition},initSelector:":jqmData(position='fixed')"},_create:function(){var b=this,c=b.options,d=b.element,e=d.is(":jqmData(role='header')")?"header":"footer",f=d.closest(".ui-page");return c.supportBlacklist()?(b.destroy(),void 0):(d.addClass("ui-"+e+"-fixed"),c.fullscreen?(d.addClass("ui-"+e+"-fullscreen"),f.addClass("ui-page-"+e+"-fullscreen")):f.addClass("ui-page-"+e+"-fixed"),a.extend(this,{_thisPage:null}),b._addTransitionClass(),b._bindPageEvents(),b._bindToggleHandlers(),void 0)},_addTransitionClass:function(){var a=this.options.transition;a&&"none"!==a&&("slide"===a&&(a=this.element.is(".ui-header")?"slidedown":"slideup"),this.element.addClass(a))},_bindPageEvents:function(){this._thisPage=this.element.closest(".ui-page"),this._on(this._thisPage,{pagebeforeshow:"_handlePageBeforeShow",webkitAnimationStart:"_handleAnimationStart",animationstart:"_handleAnimationStart",updatelayout:"_handleAnimationStart",pageshow:"_handlePageShow",pagebeforehide:"_handlePageBeforeHide"})},_handlePageBeforeShow:function(){var b=this.options;b.disablePageZoom&&a.mobile.zoom.disable(!0),b.visibleOnPageShow||this.hide(!0)},_handleAnimationStart:function(){this.options.updatePagePadding&&this.updatePagePadding(this._thisPage)},_handlePageShow:function(){this.updatePagePadding(this._thisPage),this.options.updatePagePadding&&this._on(a.mobile.window,{throttledresize:"updatePagePadding"})},_handlePageBeforeHide:function(b,c){var d=this.options;if(d.disablePageZoom&&a.mobile.zoom.enable(!0),d.updatePagePadding&&this._off(a.mobile.window,"throttledresize"),d.trackPersistentToolbars){var e=a(".ui-footer-fixed:jqmData(id)",this._thisPage),f=a(".ui-header-fixed:jqmData(id)",this._thisPage),g=e.length&&c.nextPage&&a(".ui-footer-fixed:jqmData(id='"+e.jqmData("id")+"')",c.nextPage)||a(),h=f.length&&c.nextPage&&a(".ui-header-fixed:jqmData(id='"+f.jqmData("id")+"')",c.nextPage)||a();(g.length||h.length)&&(g.add(h).appendTo(a.mobile.pageContainer),c.nextPage.one("pageshow",function(){h.prependTo(this),g.appendTo(this)}))}},_visible:!0,updatePagePadding:function(c){var d=this.element,e=d.is(".ui-header"),f=parseFloat(d.css(e?"top":"bottom"));this.options.fullscreen||(c=c&&c.type===b&&c||this._thisPage||d.closest(".ui-page"),a(c).css("padding-"+(e?"top":"bottom"),d.outerHeight()+f))},_useTransition:function(b){var c=a.mobile.window,d=this.element,e=c.scrollTop(),f=d.height(),g=d.closest(".ui-page").height(),h=a.mobile.getScreenHeight(),i=d.is(":jqmData(role='header')")?"header":"footer";return!b&&(this.options.transition&&"none"!==this.options.transition&&("header"===i&&!this.options.fullscreen&&e>f||"footer"===i&&!this.options.fullscreen&&g-f>e+h)||this.options.fullscreen)},show:function(a){var b="ui-fixed-hidden",c=this.element;this._useTransition(a)?c.removeClass("out "+b).addClass("in").animationComplete(function(){c.removeClass("in")}):c.removeClass(b),this._visible=!0},hide:function(a){var b="ui-fixed-hidden",c=this.element,d="out"+("slide"===this.options.transition?" reverse":"");this._useTransition(a)?c.addClass(d).removeClass("in").animationComplete(function(){c.addClass(b).removeClass(d)}):c.addClass(b).removeClass(d),this._visible=!1},toggle:function(){this[this._visible?"hide":"show"]()},_bindToggleHandlers:function(){var b,c,d=this,e=d.options,f=d.element,g=!0;f.closest(".ui-page").bind("vclick",function(b){e.tapToggle&&!a(b.target).closest(e.tapToggleBlacklist).length&&d.toggle()}).bind("focusin focusout",function(f){screen.width<1025&&a(f.target).is(e.hideDuringFocus)&&!a(f.target).closest(".ui-header-fixed, .ui-footer-fixed").length&&("focusout"!==f.type||g?"focusin"===f.type&&g&&(clearTimeout(b),g=!1,c=setTimeout(function(){d.hide()},0)):(g=!0,clearTimeout(c),b=setTimeout(function(){d.show()},0)))})},_destroy:function(){var a=this.element,b=a.is(".ui-header");a.closest(".ui-page").css("padding-"+(b?"top":"bottom"),""),a.removeClass("ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden"),a.closest(".ui-page").removeClass("ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen")}}),a.mobile.document.bind("pagecreate create",function(b){a(b.target).jqmData("fullscreen")&&a(a.mobile.fixedtoolbar.prototype.options.initSelector,b.target).not(":jqmData(fullscreen)").jqmData("fullscreen",!0),a.mobile.fixedtoolbar.prototype.enhanceWithin(b.target)})}(a),function(a){a.widget("mobile.fixedtoolbar",a.mobile.fixedtoolbar,{_create:function(){this._super(),this._workarounds()},_workarounds:function(){var a=navigator.userAgent,b=navigator.platform,c=a.match(/AppleWebKit\/([0-9]+)/),d=!!c&&c[1],e=null,f=this;if(b.indexOf("iPhone")>-1||b.indexOf("iPad")>-1||b.indexOf("iPod")>-1)e="ios";else{if(!(a.indexOf("Android")>-1))return;e="android"}if("ios"===e)f._bindScrollWorkaround();else{if(!("android"===e&&d&&534>d))return;f._bindScrollWorkaround(),f._bindListThumbWorkaround()}},_viewportOffset:function(){var b=this.element,c=b.is(".ui-header"),d=Math.abs(b.offset().top-a.mobile.window.scrollTop());
return c||(d=Math.round(d-a.mobile.window.height()+b.outerHeight())-60),d},_bindScrollWorkaround:function(){var b=this;this._on(a.mobile.window,{scrollstop:function(){var a=b._viewportOffset();a>2&&b._visible&&b._triggerRedraw()}})},_bindListThumbWorkaround:function(){this.element.closest(".ui-page").addClass("ui-android-2x-fixed")},_triggerRedraw:function(){var b=parseFloat(a(".ui-page-active").css("padding-bottom"));a(".ui-page-active").css("padding-bottom",b+1+"px"),setTimeout(function(){a(".ui-page-active").css("padding-bottom",b+"px")},0)},destroy:function(){this._super(),this.element.closest(".ui-page-active").removeClass("ui-android-2x-fix")}})}(a),function(a,d){a.widget("mobile.panel",a.mobile.widget,{options:{classes:{panel:"ui-panel",panelOpen:"ui-panel-open",panelClosed:"ui-panel-closed",panelFixed:"ui-panel-fixed",panelInner:"ui-panel-inner",modal:"ui-panel-dismiss",modalOpen:"ui-panel-dismiss-open",pagePanel:"ui-page-panel",pagePanelOpen:"ui-page-panel-open",contentWrap:"ui-panel-content-wrap",contentWrapOpen:"ui-panel-content-wrap-open",contentWrapClosed:"ui-panel-content-wrap-closed",contentFixedToolbar:"ui-panel-content-fixed-toolbar",contentFixedToolbarOpen:"ui-panel-content-fixed-toolbar-open",contentFixedToolbarClosed:"ui-panel-content-fixed-toolbar-closed",animate:"ui-panel-animate"},animate:!0,theme:"c",position:"left",dismissible:!0,display:"reveal",initSelector:":jqmData(role='panel')",swipeClose:!0,positionFixed:!1},_panelID:null,_closeLink:null,_page:null,_modal:null,_panelInner:null,_wrapper:null,_fixedToolbar:null,_create:function(){var b=this,c=b.element,d=c.closest(":jqmData(role='page')"),e=function(){var b=a.data(d[0],"mobilePage").options.theme,c="ui-body-"+b;return c},f=function(){var a=c.find("."+b.options.classes.panelInner);return 0===a.length&&(a=c.children().wrapAll('<div class="'+b.options.classes.panelInner+'" />').parent()),a},g=function(){var c=d.find("."+b.options.classes.contentWrap);return 0===c.length&&(c=d.children(".ui-header:not(:jqmData(position='fixed')), .ui-content:not(:jqmData(role='popup')), .ui-footer:not(:jqmData(position='fixed'))").wrapAll('<div class="'+b.options.classes.contentWrap+" "+e()+'" />').parent(),a.support.cssTransform3d&&b.options.animate&&c.addClass(b.options.classes.animate)),c},h=function(){var c=d.find("."+b.options.classes.contentFixedToolbar);return 0===c.length&&(c=d.find(".ui-header:jqmData(position='fixed'), .ui-footer:jqmData(position='fixed')").addClass(b.options.classes.contentFixedToolbar),a.support.cssTransform3d&&b.options.animate&&c.addClass(b.options.classes.animate)),c};a.extend(this,{_panelID:c.attr("id"),_closeLink:c.find(":jqmData(rel='close')"),_page:c.closest(":jqmData(role='page')"),_pageTheme:e(),_panelInner:f(),_wrapper:g(),_fixedToolbar:h()}),b._addPanelClasses(),b._wrapper.addClass(this.options.classes.contentWrapClosed),b._fixedToolbar.addClass(this.options.classes.contentFixedToolbarClosed),b._page.addClass(b.options.classes.pagePanel),a.support.cssTransform3d&&b.options.animate&&this.element.addClass(b.options.classes.animate),b._bindUpdateLayout(),b._bindCloseEvents(),b._bindLinkListeners(),b._bindPageEvents(),b.options.dismissible&&b._createModal(),b._bindSwipeEvents()},_createModal:function(){var b=this;b._modal=a("<div class='"+b.options.classes.modal+"' data-panelid='"+b._panelID+"'></div>").on("mousedown",function(){b.close()}).appendTo(this._page)},_getPosDisplayClasses:function(a){return a+"-position-"+this.options.position+" "+a+"-display-"+this.options.display},_getPanelClasses:function(){var a=this.options.classes.panel+" "+this._getPosDisplayClasses(this.options.classes.panel)+" "+this.options.classes.panelClosed;return this.options.theme&&(a+=" ui-body-"+this.options.theme),this.options.positionFixed&&(a+=" "+this.options.classes.panelFixed),a},_addPanelClasses:function(){this.element.addClass(this._getPanelClasses())},_bindCloseEvents:function(){var a=this;a._closeLink.on("click.panel",function(b){return b.preventDefault(),a.close(),!1}),a.element.on("click.panel","a:jqmData(ajax='false')",function(){a.close()})},_positionPanel:function(){var b=this,c=b._panelInner.outerHeight(),d=c>a.mobile.getScreenHeight();d||!b.options.positionFixed?(d&&(b._unfixPanel(),a.mobile.resetActivePageHeight(c)),b._scrollIntoView(c)):b._fixPanel()},_scrollIntoView:function(c){c<a(b).scrollTop()&&b.scrollTo(0,0)},_bindFixListener:function(){this._on(a(b),{throttledresize:"_positionPanel"})},_unbindFixListener:function(){this._off(a(b),"throttledresize")},_unfixPanel:function(){this.options.positionFixed&&a.support.fixedPosition&&this.element.removeClass(this.options.classes.panelFixed)},_fixPanel:function(){this.options.positionFixed&&a.support.fixedPosition&&this.element.addClass(this.options.classes.panelFixed)},_bindUpdateLayout:function(){var a=this;a.element.on("updatelayout",function(){a._open&&a._positionPanel()})},_bindLinkListeners:function(){var b=this;b._page.on("click.panel","a",function(c){if(this.href.split("#")[1]===b._panelID&&b._panelID!==d){c.preventDefault();var e,f=a(this);return f.hasClass("ui-link")||(e=f.parent().parent(),e.hasClass("ui-li")&&(f=e.parent()),f.addClass(a.mobile.activeBtnClass),b.element.one("panelopen panelclose",function(){f.removeClass(a.mobile.activeBtnClass)})),b.toggle(),!1}})},_bindSwipeEvents:function(){var a=this,b=a._modal?a.element.add(a._modal):a.element;a.options.swipeClose&&("left"===a.options.position?b.on("swipeleft.panel",function(){a.close()}):b.on("swiperight.panel",function(){a.close()}))},_bindPageEvents:function(){var a=this;a._page.on("panelbeforeopen",function(b){a._open&&b.target!==a.element[0]&&a.close()}).on("pagehide",function(){a._open&&a.close(!0)}).on("keyup.panel",function(b){27===b.keyCode&&a._open&&a.close()})},_open:!1,_contentWrapOpenClasses:null,_fixedToolbarOpenClasses:null,_modalOpenClasses:null,open:function(b){if(!this._open){var c=this,d=c.options,e=function(){c._page.off("panelclose"),c._page.jqmData("panel","open"),!b&&a.support.cssTransform3d&&d.animate?c.element.add(c._wrapper).on(c._transitionEndEvents,f):setTimeout(f,0),c.options.theme&&"overlay"!==c.options.display&&c._page.removeClass(c._pageTheme).addClass("ui-body-"+c.options.theme),c.element.removeClass(d.classes.panelClosed).addClass(d.classes.panelOpen),c._positionPanel(),c.options.theme&&"overlay"!==c.options.display&&c._wrapper.css("min-height",c._page.css("min-height")),c._contentWrapOpenClasses=c._getPosDisplayClasses(d.classes.contentWrap),c._wrapper.removeClass(d.classes.contentWrapClosed).addClass(c._contentWrapOpenClasses+" "+d.classes.contentWrapOpen),c._fixedToolbarOpenClasses=c._getPosDisplayClasses(d.classes.contentFixedToolbar),c._fixedToolbar.removeClass(d.classes.contentFixedToolbarClosed).addClass(c._fixedToolbarOpenClasses+" "+d.classes.contentFixedToolbarOpen),c._modalOpenClasses=c._getPosDisplayClasses(d.classes.modal)+" "+d.classes.modalOpen,c._modal&&c._modal.addClass(c._modalOpenClasses)},f=function(){c.element.add(c._wrapper).off(c._transitionEndEvents,f),c._page.addClass(d.classes.pagePanelOpen),c._bindFixListener(),c._trigger("open")};this.element.closest(".ui-page-active").length<0&&(b=!0),c._trigger("beforeopen"),"open"===c._page.jqmData("panel")?c._page.on("panelclose",function(){e()}):e(),c._open=!0}},close:function(b){if(this._open){var c=this.options,d=this,e=function(){!b&&a.support.cssTransform3d&&c.animate?d.element.add(d._wrapper).on(d._transitionEndEvents,f):setTimeout(f,0),d._page.removeClass(c.classes.pagePanelOpen),d.element.removeClass(c.classes.panelOpen),d._wrapper.removeClass(c.classes.contentWrapOpen),d._fixedToolbar.removeClass(c.classes.contentFixedToolbarOpen),d._modal&&d._modal.removeClass(d._modalOpenClasses)},f=function(){d.options.theme&&"overlay"!==d.options.display&&(d._page.removeClass("ui-body-"+d.options.theme).addClass(d._pageTheme),d._wrapper.css("min-height","")),d.element.add(d._wrapper).off(d._transitionEndEvents,f),d.element.addClass(c.classes.panelClosed),d._wrapper.removeClass(d._contentWrapOpenClasses).addClass(c.classes.contentWrapClosed),d._fixedToolbar.removeClass(d._fixedToolbarOpenClasses).addClass(c.classes.contentFixedToolbarClosed),d._fixPanel(),d._unbindFixListener(),a.mobile.resetActivePageHeight(),d._page.jqmRemoveData("panel"),d._trigger("close")};this.element.closest(".ui-page-active").length<0&&(b=!0),d._trigger("beforeclose"),e(),d._open=!1}},toggle:function(){this[this._open?"close":"open"]()},_transitionEndEvents:"webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",_destroy:function(){var b=this.options.classes,c=this.options.theme,d=this.element.siblings("."+b.panel).length;d?this._open&&(this._wrapper.removeClass(b.contentWrapOpen),this._fixedToolbar.removeClass(b.contentFixedToolbarOpen),this._page.jqmRemoveData("panel"),this._page.removeClass(b.pagePanelOpen),c&&this._page.removeClass("ui-body-"+c).addClass(this._pageTheme)):(this._wrapper.children().unwrap(),this._page.find("a").unbind("panelopen panelclose"),this._page.removeClass(b.pagePanel),this._open&&(this._page.jqmRemoveData("panel"),this._page.removeClass(b.pagePanelOpen),c&&this._page.removeClass("ui-body-"+c).addClass(this._pageTheme),a.mobile.resetActivePageHeight())),this._panelInner.children().unwrap(),this.element.removeClass([this._getPanelClasses(),b.panelAnimate].join(" ")).off("swipeleft.panel swiperight.panel").off("panelbeforeopen").off("panelhide").off("keyup.panel").off("updatelayout"),this._closeLink.off("click.panel"),this._modal&&this._modal.remove(),this.element.off(this._transitionEndEvents).removeClass([b.panelUnfixed,b.panelClosed,b.panelOpen].join(" "))}}),a(c).bind("pagecreate create",function(b){a.mobile.panel.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.widget("mobile.table",a.mobile.widget,{options:{classes:{table:"ui-table"},initSelector:":jqmData(role='table')"},_create:function(){var a=this;a.refresh(!0)},refresh:function(c){var d=this,e=this.element.find("thead tr");c&&this.element.addClass(this.options.classes.table),d.headers=this.element.find("tr:eq(0)").children(),d.allHeaders=d.headers.add(e.children()),e.each(function(){var f=0;a(this).children().each(function(){var g=parseInt(a(this).attr("colspan"),10),h=":nth-child("+(f+1)+")";if(a(this).jqmData("colstart",f+1),g)for(var i=0;g-1>i;i++)f++,h+=", :nth-child("+(f+1)+")";c===b&&a(this).jqmData("cells",""),a(this).jqmData("cells",d.element.find("tr").not(e.eq(0)).not(this).children(h)),f++})}),c===b&&this.element.trigger("refresh")}}),a.mobile.document.bind("pagecreate create",function(b){a.mobile.table.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.mobile.table.prototype.options.mode="columntoggle",a.mobile.table.prototype.options.columnBtnTheme=null,a.mobile.table.prototype.options.columnPopupTheme=null,a.mobile.table.prototype.options.columnBtnText="Columns...",a.mobile.table.prototype.options.classes=a.extend(a.mobile.table.prototype.options.classes,{popup:"ui-table-columntoggle-popup",columnBtn:"ui-table-columntoggle-btn",priorityPrefix:"ui-table-priority-",columnToggleTable:"ui-table-columntoggle"}),a.mobile.document.delegate(":jqmData(role='table')","tablecreate refresh",function(c){var d,e,f,g,h=a(this),i=h.data("mobile-table"),j=c.type,k=i.options,l=a.mobile.ns,m=(h.attr("id")||k.classes.popup)+"-popup";"columntoggle"===k.mode&&("refresh"!==j&&(i.element.addClass(k.classes.columnToggleTable),d=a("<a href='#"+m+"' class='"+k.classes.columnBtn+"' data-"+l+"rel='popup' data-"+l+"mini='true'>"+k.columnBtnText+"</a>"),e=a("<div data-"+l+"role='popup' data-"+l+"role='fieldcontain' class='"+k.classes.popup+"' id='"+m+"'></div>"),f=a("<fieldset data-"+l+"role='controlgroup'></fieldset>")),i.headers.not("td").each(function(b){var c=a(this).jqmData("priority"),d=a(this).add(a(this).jqmData("cells"));c&&(d.addClass(k.classes.priorityPrefix+c),"refresh"!==j?a("<label><input type='checkbox' checked />"+a(this).text()+"</label>").appendTo(f).children(0).jqmData("cells",d).checkboxradio({theme:k.columnPopupTheme}):a("#"+m+" fieldset div:eq("+b+")").find("input").jqmData("cells",d))}),"refresh"!==j&&f.appendTo(e),g=f===b?a("#"+m+" fieldset"):f,"refresh"!==j&&(g.on("change","input",function(){this.checked?a(this).jqmData("cells").removeClass("ui-table-cell-hidden").addClass("ui-table-cell-visible"):a(this).jqmData("cells").removeClass("ui-table-cell-visible").addClass("ui-table-cell-hidden")}),d.insertBefore(h).buttonMarkup({theme:k.columnBtnTheme}),e.insertBefore(h).popup()),i.update=function(){g.find("input").each(function(){this.checked?(this.checked="table-cell"===a(this).jqmData("cells").eq(0).css("display"),"refresh"===j&&a(this).jqmData("cells").addClass("ui-table-cell-visible")):a(this).jqmData("cells").addClass("ui-table-cell-hidden"),a(this).checkboxradio("refresh")})},a.mobile.window.on("throttledresize",i.update),i.update())})}(a),function(a){a.mobile.table.prototype.options.mode="reflow",a.mobile.table.prototype.options.classes=a.extend(a.mobile.table.prototype.options.classes,{reflowTable:"ui-table-reflow",cellLabels:"ui-table-cell-label"}),a.mobile.document.delegate(":jqmData(role='table')","tablecreate refresh",function(b){var c=a(this),d=b.type,e=c.data("mobile-table"),f=e.options;if("reflow"===f.mode){"refresh"!==d&&e.element.addClass(f.classes.reflowTable);var g=a(e.allHeaders.get().reverse());g.each(function(){var b=a(this).jqmData("cells"),c=a(this).jqmData("colstart"),d=b.not(this).filter("thead th").length&&" ui-table-cell-label-top",e=a(this).text();if(""!==e)if(d){var g=parseInt(a(this).attr("colspan"),10),h="";g&&(h="td:nth-child("+g+"n + "+c+")"),b.filter(h).prepend("<b class='"+f.classes.cellLabels+d+"'>"+e+"</b>")}else b.prepend("<b class='"+f.classes.cellLabels+"'>"+e+"</b>")})}})}(a),function(a,b){function c(a){e=a.originalEvent,i=e.accelerationIncludingGravity,f=Math.abs(i.x),g=Math.abs(i.y),h=Math.abs(i.z),!b.orientation&&(f>7||(h>6&&8>g||8>h&&g>6)&&f>5)?j.enabled&&j.disable():j.enabled||j.enable()}a.mobile.iosorientationfixEnabled=!0;var d=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(d)&&d.indexOf("AppleWebKit")>-1))return a.mobile.iosorientationfixEnabled=!1,void 0;var e,f,g,h,i,j=a.mobile.zoom;a.mobile.document.on("mobileinit",function(){a.mobile.iosorientationfixEnabled&&a.mobile.window.bind("orientationchange.iosorientationfix",j.enable).bind("devicemotion.iosorientationfix",c)})}(a,this),function(a,b){function d(){e.removeClass("ui-mobile-rendering")}var e=a("html"),f=(a("head"),a.mobile.window);a(b.document).trigger("mobileinit"),a.mobile.gradeA()&&(a.mobile.ajaxBlacklist&&(a.mobile.ajaxEnabled=!1),e.addClass("ui-mobile ui-mobile-rendering"),setTimeout(d,5e3),a.extend(a.mobile,{initializePage:function(){var b=a.mobile.path,e=a(":jqmData(role='page'), :jqmData(role='dialog')"),g=b.stripHash(b.stripQueryParams(b.parseLocation().hash)),h=c.getElementById(g);e.length||(e=a("body").wrapInner("<div data-"+a.mobile.ns+"role='page'></div>").children(0)),e.each(function(){var b=a(this);b.jqmData("url")||b.attr("data-"+a.mobile.ns+"url",b.attr("id")||location.pathname+location.search)}),a.mobile.firstPage=e.first(),a.mobile.pageContainer=a.mobile.firstPage.parent().addClass("ui-mobile-viewport"),a.mobile.navreadyDeferred.resolve(),f.trigger("pagecontainercreate"),a.mobile.showPageLoadingMsg(),d(),a.mobile.hashListeningEnabled&&a.mobile.path.isHashValid(location.hash)&&(a(h).is(':jqmData(role="page")')||a.mobile.path.isPath(g)||g===a.mobile.dialogHashKey)?a.event.special.navigate.isPushStateEnabled()?(a.mobile.navigate.history.stack=[],a.mobile.navigate(a.mobile.path.isPath(location.hash)?location.hash:location.href)):f.trigger("hashchange",[!0]):(a.mobile.path.isHashValid(location.hash)&&(a.mobile.urlHistory.initialDst=g.replace("#","")),a.event.special.navigate.isPushStateEnabled()&&a.mobile.navigate.navigator.squash(b.parseLocation().href),a.mobile.changePage(a.mobile.firstPage,{transition:"none",reverse:!0,changeHash:!1,fromHashChange:!0}))}}),a(function(){b.scrollTo(0,1),a.mobile.defaultHomeScroll=a.support.scrollTop&&1!==a.mobile.window.scrollTop()?1:0,a.mobile.autoInitializePage&&a.mobile.initializePage(),f.load(a.mobile.silentScroll),a.support.cssPointerEvents||a.mobile.document.delegate(".ui-disabled","vclick",function(a){a.preventDefault(),a.stopImmediatePropagation()})}))}(a,this)});
/*
//@ sourceMappingURL=jquery.mobile-1.3.2.min.map
*/
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);
(function( $ ){

  $.fn.containedStickyScroll = function( options ) {

	var defaults = {
		oSelector : this.selector,
		unstick : true,
		easing: 'linear',
		duration: 500,
		queue: false,
		closeChar: '^',
		closeTop: 0,
		closeRight: 0
	}

	var options =  $.extend(defaults, options);
	var vOffset = 0;

	jQuery(window).scroll(function() {
  		getObject = options.oSelector;

		if(jQuery(getObject).parent().get(0)!=null && (jQuery(getObject).parent().get(0).id).indexOf("stickyRef") == -1){
			vOffset =  $(getObject).closest("div[id*='stickyRef']").position().top;
		}
        if(jQuery(window).scrollTop() > (jQuery(getObject).parent().offset().top) &&
           (jQuery(getObject).parent().height() + vOffset + jQuery(getObject).parent().position().top - 30) > (jQuery(window).scrollTop() + jQuery(getObject).height())){
        	jQuery(getObject).animate({ top: (jQuery(window).scrollTop() - jQuery(getObject).parent().offset().top) + "px" },
            { queue: options.queue, easing: options.easing, duration: options.duration });
        }
        else if(jQuery(window).scrollTop() < (jQuery(getObject).parent().offset().top)){
        	jQuery(getObject).animate({ top: "0px" },
            { queue: options.queue, easing: options.easing, duration: options.duration });
        }
	});
   };
})( jQuery );
/*
selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms 
of the MIT license.

selectivizr.com
*/
/* 
  
Notes about this source
-----------------------

 * The #DEBUG_START and #DEBUG_END comments are used to mark blocks of code
   that will be removed prior to building a final release version (using a
   pre-compression script)
  
  
References:
-----------
 
 * CSS Syntax          : http://www.w3.org/TR/2003/WD-css3-syntax-20030813/#style
 * Selectors           : http://www.w3.org/TR/css3-selectors/#selectors
 * IE Compatability    : http://msdn.microsoft.com/en-us/library/cc351024(VS.85).aspx
 * W3C Selector Tests  : http://www.w3.org/Style/CSS/Test/CSS3/Selectors/current/html/tests/
 
*/

(function(win) {

	// If browser isn't IE, then stop execution! This handles the script 
	// being loaded by non IE browsers because the developer didn't use 
	// conditional comments.
	if (/*@cc_on!@*/true) return;

	// =========================== Init Objects ============================

	var doc = document;
	var root = doc.documentElement;
	var xhr = getXHRObject();
	var ieVersion = /MSIE (\d+)/.exec(navigator.userAgent)[1];
	
	// If were not in standards mode, IE is too old / new or we can't create
	// an XMLHttpRequest object then we should get out now.
	if (doc.compatMode != 'CSS1Compat' || ieVersion<6 || ieVersion>8 || !xhr) {
		return;
	}
	
	
	// ========================= Common Objects ============================

	// Compatiable selector engines in order of CSS3 support. Note: '*' is
	// a placholder for the object key name. (basically, crude compression)
	var selectorEngines = {
		"NW"								: "*.Dom.select",
		"MooTools"							: "$$",
		"DOMAssistant"						: "*.$", 
		"Prototype"							: "$$",
		"YAHOO"								: "*.util.Selector.query",
		"Sizzle"							: "*", 
		"jQuery"							: "*",
		"dojo"								: "*.query"
	};

	var selectorMethod;
	var enabledWatchers 					= [];     // array of :enabled/:disabled elements to poll
	var ie6PatchID 							= 0;      // used to solve ie6's multiple class bug
	var patchIE6MultipleClasses				= true;   // if true adds class bloat to ie6
	var namespace 							= "slvzr";
	
	// Stylesheet parsing regexp's
	var RE_COMMENT							= /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g;
	var RE_IMPORT							= /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g;
	var RE_ASSET_URL 						= /\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g;
	var RE_PSEUDO_STRUCTURAL				= /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/;
	var RE_PSEUDO_ELEMENTS					= /:(:first-(?:line|letter))/g;
	var RE_SELECTOR_GROUP					= /(^|})\s*([^\{]*?[\[:][^{]+)/g;
	var RE_SELECTOR_PARSE					= /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g; 
	var RE_LIBRARY_INCOMPATIBLE_PSEUDOS		= /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g;
	var RE_PATCH_CLASS_NAME_REPLACE			= /[^\w-]/g;
	
	// HTML UI element regexp's
	var RE_INPUT_ELEMENTS					= /^(INPUT|SELECT|TEXTAREA|BUTTON)$/;
	var RE_INPUT_CHECKABLE_TYPES			= /^(checkbox|radio)$/;

	// Broken attribute selector implementations (IE7/8 native [^=""], [$=""] and [*=""])
	var BROKEN_ATTR_IMPLEMENTATIONS			= ieVersion>6 ? /[\$\^*]=(['"])\1/ : null;

	// Whitespace normalization regexp's
	var RE_TIDY_TRAILING_WHITESPACE			= /([(\[+~])\s+/g;
	var RE_TIDY_LEADING_WHITESPACE			= /\s+([)\]+~])/g;
	var RE_TIDY_CONSECUTIVE_WHITESPACE		= /\s+/g;
	var RE_TIDY_TRIM_WHITESPACE				= /^\s*((?:[\S\s]*\S)?)\s*$/;
	
	// String constants
	var EMPTY_STRING						= "";
	var SPACE_STRING						= " ";
	var PLACEHOLDER_STRING					= "$1";

	// =========================== Patching ================================

	// --[ patchStyleSheet() ]----------------------------------------------
	// Scans the passed cssText for selectors that require emulation and
	// creates one or more patches for each matched selector.
	function patchStyleSheet( cssText ) {
		return cssText.replace(RE_PSEUDO_ELEMENTS, PLACEHOLDER_STRING).
			replace(RE_SELECTOR_GROUP, function(m, prefix, selectorText) {	
    			var selectorGroups = selectorText.split(",");
    			for (var c = 0, cs = selectorGroups.length; c < cs; c++) {
    				var selector = normalizeSelectorWhitespace(selectorGroups[c]) + SPACE_STRING;
    				var patches = [];
    				selectorGroups[c] = selector.replace(RE_SELECTOR_PARSE, 
    					function(match, combinator, pseudo, attribute, index) {
    						if (combinator) {
    							if (patches.length>0) {
    								applyPatches( selector.substring(0, index), patches );
    								patches = [];
    							}
    							return combinator;
    						}		
    						else {
    							var patch = (pseudo) ? patchPseudoClass( pseudo ) : patchAttribute( attribute );
    							if (patch) {
    								patches.push(patch);
    								return "." + patch.className;
    							}
    							return match;
    						}
    					}
    				);
    			}
    			return prefix + selectorGroups.join(",");
    		});
	};

	// --[ patchAttribute() ]-----------------------------------------------
	// returns a patch for an attribute selector.
	function patchAttribute( attr ) {
		return (!BROKEN_ATTR_IMPLEMENTATIONS || BROKEN_ATTR_IMPLEMENTATIONS.test(attr)) ? 
			{ className: createClassName(attr), applyClass: true } : null;
	};

	// --[ patchPseudoClass() ]---------------------------------------------
	// returns a patch for a pseudo-class
	function patchPseudoClass( pseudo ) {

		var applyClass = true;
		var className = createClassName(pseudo.slice(1));
		var isNegated = pseudo.substring(0, 5) == ":not(";
		var activateEventName;
		var deactivateEventName;

		// if negated, remove :not() 
		if (isNegated) {
			pseudo = pseudo.slice(5, -1);
		}
		
		// bracket contents are irrelevant - remove them
		var bracketIndex = pseudo.indexOf("(")
		if (bracketIndex > -1) {
			pseudo = pseudo.substring(0, bracketIndex);
		}		
		
		// check we're still dealing with a pseudo-class
		if (pseudo.charAt(0) == ":") {
			switch (pseudo.slice(1)) {

				case "root":
					applyClass = function(e) {
						return isNegated ? e != root : e == root;
					}
					break;

				case "target":
					// :target is only supported in IE8
					if (ieVersion == 8) {
						applyClass = function(e) {
							var handler = function() { 
								var hash = location.hash;
								var hashID = hash.slice(1);
								return isNegated ? (hash == EMPTY_STRING || e.id != hashID) : (hash != EMPTY_STRING && e.id == hashID);
							};
							addEvent( win, "hashchange", function() {
								toggleElementClass(e, className, handler());
							})
							return handler();
						}
						break;
					}
					return false;
				
				case "checked":
					applyClass = function(e) { 
						if (RE_INPUT_CHECKABLE_TYPES.test(e.type)) {
							addEvent( e, "propertychange", function() {
								if (event.propertyName == "checked") {
									toggleElementClass( e, className, e.checked !== isNegated );
								} 							
							})
						}
						return e.checked !== isNegated;
					}
					break;
					
				case "disabled":
					isNegated = !isNegated;

				case "enabled":
					applyClass = function(e) { 
						if (RE_INPUT_ELEMENTS.test(e.tagName)) {
							addEvent( e, "propertychange", function() {
								if (event.propertyName == "$disabled") {
									toggleElementClass( e, className, e.$disabled === isNegated );
								} 
							});
							enabledWatchers.push(e);
							e.$disabled = e.disabled;
							return e.disabled === isNegated;
						}
						return pseudo == ":enabled" ? isNegated : !isNegated;
					}
					break;
					
				case "focus":
					activateEventName = "focus";
					deactivateEventName = "blur";
								
				case "hover":
					if (!activateEventName) {
						activateEventName = "mouseenter";
						deactivateEventName = "mouseleave";
					}
					applyClass = function(e) {
						addEvent( e, isNegated ? deactivateEventName : activateEventName, function() {
							toggleElementClass( e, className, true );
						})
						addEvent( e, isNegated ? activateEventName : deactivateEventName, function() {
							toggleElementClass( e, className, false );
						})
						return isNegated;
					}
					break;
					
				// everything else
				default:
					// If we don't support this pseudo-class don't create 
					// a patch for it
					if (!RE_PSEUDO_STRUCTURAL.test(pseudo)) {
						return false;
					}
					break;
			}
		}
		return { className: className, applyClass: applyClass };
	};

	// --[ applyPatches() ]-------------------------------------------------
	// uses the passed selector text to find DOM nodes and patch them	
	function applyPatches(selectorText, patches) {
		var elms;
		
		// Although some selector libraries can find :checked :enabled etc. 
		// we need to find all elements that could have that state because 
		// it can be changed by the user.
		var domSelectorText = selectorText.replace(RE_LIBRARY_INCOMPATIBLE_PSEUDOS, EMPTY_STRING);
		
		// If the dom selector equates to an empty string or ends with 
		// whitespace then we need to append a universal selector (*) to it.
		if (domSelectorText == EMPTY_STRING || domSelectorText.charAt(domSelectorText.length - 1) == SPACE_STRING) {
			domSelectorText += "*";
		}
		
		// Ensure we catch errors from the selector library
		try {
			elms = selectorMethod( domSelectorText );
		} catch (ex) {
			// #DEBUG_START
			log( "Selector '" + selectorText + "' threw exception '" + ex + "'" );
			// #DEBUG_END
		}


		if (elms) {
			for (var d = 0, dl = elms.length; d < dl; d++) {	
				var elm = elms[d];
				var cssClasses = elm.className;
				for (var f = 0, fl = patches.length; f < fl; f++) {
					var patch = patches[f];
					
					if (!hasPatch(elm, patch)) {
						if (patch.applyClass && (patch.applyClass === true || patch.applyClass(elm) === true)) {
							cssClasses = toggleClass(cssClasses, patch.className, true );
						}
					}
				}
				elm.className = cssClasses;
			}
		}
	};

	// --[ hasPatch() ]-----------------------------------------------------
	// checks for the exsistence of a patch on an element
	function hasPatch( elm, patch ) {
		return new RegExp("(^|\\s)" + patch.className + "(\\s|$)").test(elm.className);
	};
	
	
	// =========================== Utility =================================
	
	function createClassName( className ) {
		return namespace + "-" + ((ieVersion == 6 && patchIE6MultipleClasses) ?
			ie6PatchID++
		:
			className.replace(RE_PATCH_CLASS_NAME_REPLACE, function(a) { return a.charCodeAt(0) }));
	};

	// --[ log() ]----------------------------------------------------------
	// #DEBUG_START
	function log( message ) {
		if (win.console) {
			win.console.log(message);
		}
	};
	// #DEBUG_END

	// --[ trim() ]---------------------------------------------------------
	// removes leading, trailing whitespace from a string
	function trim( text ) {
		return text.replace(RE_TIDY_TRIM_WHITESPACE, PLACEHOLDER_STRING);
	};

	// --[ normalizeWhitespace() ]------------------------------------------
	// removes leading, trailing and consecutive whitespace from a string
	function normalizeWhitespace( text ) {
		return trim(text).replace(RE_TIDY_CONSECUTIVE_WHITESPACE, SPACE_STRING);
	};

	// --[ normalizeSelectorWhitespace() ]----------------------------------
	// tidies whitespace around selector brackets and combinators
	function normalizeSelectorWhitespace( selectorText ) {
		return normalizeWhitespace(selectorText.
			replace(RE_TIDY_TRAILING_WHITESPACE, PLACEHOLDER_STRING).
			replace(RE_TIDY_LEADING_WHITESPACE, PLACEHOLDER_STRING)
		);
	};

	// --[ toggleElementClass() ]-------------------------------------------
	// toggles a single className on an element
	function toggleElementClass( elm, className, on ) {
		var oldClassName = elm.className;
		var newClassName = toggleClass(oldClassName, className, on);
		if (newClassName != oldClassName) {
			elm.className = newClassName;
			elm.parentNode.className += EMPTY_STRING;
		}
	};

	// --[ toggleClass() ]--------------------------------------------------
	// adds / removes a className from a string of classNames. Used to 
	// manage multiple class changes without forcing a DOM redraw
	function toggleClass( classList, className, on ) {
		var re = RegExp("(^|\\s)" + className + "(\\s|$)");
		var classExists = re.test(classList);
		if (on) {
			return classExists ? classList : classList + SPACE_STRING + className;
		} else {
			return classExists ? trim(classList.replace(re, PLACEHOLDER_STRING)) : classList;
		}
	};
	
	// --[ addEvent() ]-----------------------------------------------------
	function addEvent(elm, eventName, eventHandler) {
		elm.attachEvent("on" + eventName, eventHandler);
	};

	// --[ getXHRObject() ]-------------------------------------------------
	function getXHRObject()
	{
		if (win.XMLHttpRequest) {
			return new XMLHttpRequest;
		}
		try	{ 
			return new ActiveXObject('Microsoft.XMLHTTP');
		} catch(e) { 
			return null;
		}
	};

	// --[ loadStyleSheet() ]-----------------------------------------------
	function loadStyleSheet( url ) {
		xhr.open("GET", url, false);
		xhr.send();
		return (xhr.status==200) ? xhr.responseText : EMPTY_STRING;	
	};
	
	// --[ resolveUrl() ]---------------------------------------------------
	// Converts a URL fragment to a fully qualified URL using the specified
	// context URL. Returns null if same-origin policy is broken
	function resolveUrl( url, contextUrl ) {
	
		function getProtocolAndHost( url ) {
			return url.substring(0, url.indexOf("/", 8));
		};
		
		// absolute path
		if (/^https?:\/\//i.test(url)) {
			return getProtocolAndHost(contextUrl) == getProtocolAndHost(url) ? url : null;
		}
		
		// root-relative path
		if (url.charAt(0)=="/")	{
			return getProtocolAndHost(contextUrl) + url;
		}

		// relative path
		var contextUrlPath = contextUrl.split(/[?#]/)[0]; // ignore query string in the contextUrl	
		if (url.charAt(0) != "?" && contextUrlPath.charAt(contextUrlPath.length - 1) != "/") {
			contextUrlPath = contextUrlPath.substring(0, contextUrlPath.lastIndexOf("/") + 1);
		}
		
		return contextUrlPath + url;
	};
	
	// --[ parseStyleSheet() ]----------------------------------------------
	// Downloads the stylesheet specified by the URL, removes it's comments
	// and recursivly replaces @import rules with their contents, ultimately
	// returning the full cssText.
	function parseStyleSheet( url ) {
		if (url) {
			return loadStyleSheet(url).replace(RE_COMMENT, EMPTY_STRING).
			replace(RE_IMPORT, function( match, quoteChar, importUrl, quoteChar2, importUrl2 ) { 
				return parseStyleSheet(resolveUrl(importUrl || importUrl2, url));
			}).
			replace(RE_ASSET_URL, function( match, quoteChar, assetUrl ) { 
				quoteChar = quoteChar || EMPTY_STRING;
				return " url(" + quoteChar + resolveUrl(assetUrl, url) + quoteChar + ") "; 
			});
		}
		return EMPTY_STRING;
	};
	
	// --[ init() ]---------------------------------------------------------
	function init() {
		// honour the <base> tag
		var url, stylesheet;
		var baseTags = doc.getElementsByTagName("BASE");
		var baseUrl = (baseTags.length > 0) ? baseTags[0].href : doc.location.href;
		
		/* Note: This code prevents IE from freezing / crashing when using 
		@font-face .eot files but it modifies the <head> tag and could
		trigger the IE stylesheet limit. It will also cause FOUC issues.
		If you choose to use it, make sure you comment out the for loop 
		directly below this comment.

		var head = doc.getElementsByTagName("head")[0];
		for (var c=doc.styleSheets.length-1; c>=0; c--) {
			stylesheet = doc.styleSheets[c]
			head.appendChild(doc.createElement("style"))
			var patchedStylesheet = doc.styleSheets[doc.styleSheets.length-1];
			
			if (stylesheet.href != EMPTY_STRING) {
				url = resolveUrl(stylesheet.href, baseUrl)
				if (url) {
					patchedStylesheet.cssText = patchStyleSheet( parseStyleSheet( url ) )
					stylesheet.disabled = true
					setTimeout( function () {
						stylesheet.owningElement.parentNode.removeChild(stylesheet.owningElement)
					})
				}
			}
		}
		*/
		
		for (var c = 0; c < doc.styleSheets.length; c++) {
			stylesheet = doc.styleSheets[c]
			if (stylesheet.href != EMPTY_STRING) {
				url = resolveUrl(stylesheet.href, baseUrl);
				if (url) {
					stylesheet.cssText = patchStyleSheet( parseStyleSheet( url ) );
				}
			}
		}
		
		// :enabled & :disabled polling script (since we can't hook 
		// onpropertychange event when an element is disabled) 
		if (enabledWatchers.length > 0) {
			setInterval( function() {
				for (var c = 0, cl = enabledWatchers.length; c < cl; c++) {
					var e = enabledWatchers[c];
					if (e.disabled !== e.$disabled) {
						if (e.disabled) {
							e.disabled = false;
							e.$disabled = true;
							e.disabled = true;
						}
						else {
							e.$disabled = e.disabled;
						}
					}
				}
			},250)
		}
	};
	
	// Bind selectivizr to the ContentLoaded event. 
	ContentLoaded(win, function() {
		// Determine the "best fit" selector engine
		for (var engine in selectorEngines) {
			var members, member, context = win;
			if (win[engine]) {
				members = selectorEngines[engine].replace("*", engine).split(".");
				while ((member = members.shift()) && (context = context[member])) {}
				if (typeof context == "function") {
					selectorMethod = context;
					init();
					return;
				}
			}
		}
	});
	
	
	/*!
	 * ContentLoaded.js by Diego Perini, modified for IE<9 only (to save space)
	 *
	 * Author: Diego Perini (diego.perini at gmail.com)
	 * Summary: cross-browser wrapper for DOMContentLoaded
	 * Updated: 20101020
	 * License: MIT
	 * Version: 1.2
	 *
	 * URL:
	 * http://javascript.nwbox.com/ContentLoaded/
	 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
	 *
	 */

	// @w window reference
	// @f function reference
	function ContentLoaded(win, fn) {

		var done = false, top = true,
		init = function(e) {
			if (e.type == "readystatechange" && doc.readyState != "complete") return;
			(e.type == "load" ? win : doc).detachEvent("on" + e.type, init, false);
			if (!done && (done = true)) fn.call(win, e.type || e);
		},
		poll = function() {
			try { root.doScroll("left"); } catch(e) { setTimeout(poll, 50); return; }
			init('poll');
		};

		if (doc.readyState == "complete") fn.call(win, EMPTY_STRING);
		else {
			if (doc.createEventObject && root.doScroll) {
				try { top = !win.frameElement; } catch(e) { }
				if (top) poll();
			}
			addEvent(doc,"readystatechange", init);
			addEvent(win,"load", init);
		}
	};
})(this);
// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
(function ($) {
    $.fn.extend({
        easyResponsiveTabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',

                fit: true,
                closed: false,
                activate: function(){}
            }
            //Variables
            var options = $.extend(defaults, options);            
            var opt = options, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';
            var hash = window.location.hash;
            var historyApi = !!(window.history && history.replaceState);
            
            //Events
            $(this).bind('tabactivate', function(e, currentTab) {
                if(typeof options.activate === 'function') {
                    options.activate.call(currentTab, e)
                }
            });

            //Main function
            this.each(function () {
                var $respTabs = $(this);
                var $respTabsList = $respTabs.find('ul.resp-tabs-list');
                var respTabsId = $respTabs.attr('id');
                $respTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
                $respTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                $respTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        $respTabs.addClass('resp-vtabs');
                    }
                    if (jfit == true) {
                        $respTabs.css({ width: '100%', margin: '0px' });
                    }
                    if (jtype == accord) {
                        $respTabs.addClass('resp-easy-accordion');
                        $respTabs.find('.resp-tabs-list').css('display', 'none');
                    }
                }

                //Assigning the h2 markup to accordion title
                var $tabItemh2;
                $respTabs.find('.resp-tab-content').before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");

                var itemCount = 0;
                $respTabs.find('.resp-accordion').each(function () {
                    $tabItemh2 = $(this);
                    var $tabItem = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')');
                    var $accItem = $respTabs.find('.resp-accordion:eq(' + itemCount + ')');
                    $accItem.append($tabItem.html());
                    $accItem.data($tabItem.data());
                    $tabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
                    itemCount++;
                });

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    $tabContent;
                $respTabs.find('.resp-tab-item').each(function () {
                    $tabItem = $(this);
                    $tabItem.attr('aria-controls', 'tab_item-' + (count));
                    $tabItem.attr('role', 'tab');






                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    $respTabs.find('.resp-tab-content').each(function () {
                        $tabContent = $(this);
                        $tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
                        tabcount++;
                    });
                    count++;
                });
                
                // Show correct content area
                var tabNum = 0;
                if(hash!='') {
                    var matches = hash.match(new RegExp(respTabsId+"([0-9]+)"));
                    if (matches!==null && matches.length===2) {
                        tabNum = parseInt(matches[1],10)-1;
                        if (tabNum > count) {
                            tabNum = 0;
                        }
                    }
                }

                //Active correct tab
                $($respTabs.find('.resp-tab-item')[tabNum]).addClass('resp-tab-active');

                //keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode
                if(options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {                  
                    $($respTabs.find('.resp-accordion')[tabNum]).addClass('resp-tab-active');
                    $($respTabs.find('.resp-tab-content')[tabNum]).addClass('resp-tab-content-active').attr('style', 'display:block');
                }
                //assign proper classes for when tabs mode is activated before making a selection in accordion mode
                else {
                    $($respTabs.find('.resp-tab-content')[tabNum]).addClass('resp-tab-content-active resp-accordion-closed')
                }

                //Tab Click action function
                $respTabs.find("[role=tab]").each(function () {
                   
                    var $currentTab = $(this);
                    $currentTab.click(function () {
                        
                        var $currentTab = $(this);
                        var $tabAria = $currentTab.attr('aria-controls');

                        if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                            $respTabs.find('.resp-tab-content-active').slideUp('', function () { $(this).addClass('resp-accordion-closed'); });
                            $currentTab.removeClass('resp-tab-active');
                            return false;
                        }
                        if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown().addClass('resp-tab-content-active');
                        } else {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
                        }
                        //Trigger tab activation event
                        $currentTab.trigger('tabactivate', $currentTab);
                        
                        //Update Browser History
                        if(historyApi) {
                            var currentHash = window.location.hash;
                            var newHash = respTabsId+(parseInt($tabAria.substring(9),10)+1).toString();
                            if (currentHash!="") {
                                var re = new RegExp(respTabsId+"[0-9]+");
                                if (currentHash.match(re)!=null) {                                    
                                    newHash = currentHash.replace(re,newHash);
                                }
                                else {
                                    newHash = currentHash+"|"+newHash;
                                }
                            }
                            else {
                                newHash = '#'+newHash;
                            }
                            
                            history.replaceState(null,null,newHash);
                        }
                    });
                    
                });
                
                //Window resize function                   
                $(window).resize(function () {
                    $respTabs.find('.resp-accordion-closed').removeAttr('style');
                });
            });

        }
    });
})(jQuery);


$(function() {

    var $mymainTab = $("#mymainTab");
    var activeListElemWidth = $(".current_page_item a").width() / 2;

	$mymainTab.append("<li id='marker'></li>");

	/* Cache it */
	var $marker = $("#marker");
try { 
	$marker.css("left", $(".current_page_item a").position().left + activeListElemWidth );

	$("#mymainTab li a").click(function() {
		$el = $(this);
		$mymainTab.find('li').removeClass('current_page_item');
		$(this).parent().addClass('current_page_item');
		activeListElemWidth = $(".current_page_item a").width() / 2;
		leftPos = $el.position().left + activeListElemWidth;
		$marker.stop().animate({
			left: leftPos
		});
	 });

	 $(window ).resize(function() {
		 $el = $(".current_page_item a");
		 activeListElemWidth = ($(".current_page_item a").width() / 2 );
		 leftPos = $el.position().left + activeListElemWidth;
		 $marker.stop().animate({
		 	left: leftPos
		});
	});
} catch (e) {};
 });
﻿/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 */
 
/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);

$(document).ready(function() {
  var button = $('.billboard-button');
  var content = $('.billboard-tab-content');

  $(window).resize(function() {
    if ($(window).width() < 768) {

      button.removeClass('hidden').addClass('no-bg');
      content.css('display', 'none');
      $('.billboard-tab-content:first').css('display', 'block');
      content.on('mouseleave', function() {
        $(this).children('.billboard-button').removeClass('hidden');
      });

    } else if ($(window).width() > 768) {
      button.addClass('hidden');
      button.removeClass('no-bg');
      content.css('display', 'block');
      content.on('mouseover', function() {
        $(this).children('.billboard-button').fadeIn('slow').removeClass('hidden');
      });
      content.on('mouseleave', function() {
        $(this).children('.billboard-button').addClass('hidden');
      });
    }
  });

  if ($(window).width() > 768) {
    content.on('mouseover', function() {
      $(this).children('.billboard-button').fadeIn('slow').removeClass('hidden');
    });
    content.on('mouseleave', function() {
      $(this).children('.billboard-button').addClass('hidden');
    });
    button.removeClass('no-bg');
  } else {
    button.removeClass('hidden');
    button.removeClass('hidden').addClass('no-bg');
  }

  $('.billboard-tab').on('click', function() {
    var tab = '#' + $(this).data('id');
    $('.billboard-tab').parent().removeClass('active');
    content.hide();
    $(this).parent().addClass('active');
    $(tab).removeClass('hidden-xs').fadeIn('slow');
  });


});
/*!
 * typeahead.js 0.9.3
 * https://github.com/twitter/typeahead
 * Copyright 2013 Twitter, Inc. and other contributors; Licensed MIT
 */

(function($) {
    var VERSION = "0.9.3";
    var utils = {
        isMsie: function() {
            var match = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
            return match ? parseInt(match[2], 10) : false;
        },
        isBlankString: function(str) {
            return !str || /^\s*$/.test(str);
        },
        escapeRegExChars: function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        isString: function(obj) {
            return typeof obj === "string";
        },
        isNumber: function(obj) {
            return typeof obj === "number";
        },
        isArray: $.isArray,
        isFunction: $.isFunction,
        isObject: $.isPlainObject,
        isUndefined: function(obj) {
            return typeof obj === "undefined";
        },
        bind: $.proxy,
        bindAll: function(obj) {
            var val;
            for (var key in obj) {
                $.isFunction(val = obj[key]) && (obj[key] = $.proxy(val, obj));
            }
        },
        indexOf: function(haystack, needle) {
            for (var i = 0; i < haystack.length; i++) {
                if (haystack[i] === needle) {
                    return i;
                }
            }
            return -1;
        },
        each: $.each,
        map: $.map,
        filter: $.grep,
        every: function(obj, test) {
            var result = true;
            if (!obj) {
                return result;
            }
            $.each(obj, function(key, val) {
                if (!(result = test.call(null, val, key, obj))) {
                    return false;
                }
            });
            return !!result;
        },
        some: function(obj, test) {
            var result = false;
            if (!obj) {
                return result;
            }
            $.each(obj, function(key, val) {
                if (result = test.call(null, val, key, obj)) {
                    return false;
                }
            });
            return !!result;
        },
        mixin: $.extend,
        getUniqueId: function() {
            var counter = 0;
            return function() {
                return counter++;
            };
        }(),
        defer: function(fn) {
            setTimeout(fn, 0);
        },
        debounce: function(func, wait, immediate) {
            var timeout, result;
            return function() {
                var context = this, args = arguments, later, callNow;
                later = function() {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                    }
                };
                callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    result = func.apply(context, args);
                }
                return result;
            };
        },
        throttle: function(func, wait) {
            var context, args, timeout, result, previous, later;
            previous = 0;
            later = function() {
                previous = new Date();
                timeout = null;
                result = func.apply(context, args);
            };
            return function() {
                var now = new Date(), remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                } else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        },
        tokenizeQuery: function(str) {
            return $.trim(str).toLowerCase().split(/[\s]+/);
        },
        tokenizeText: function(str) {
            return $.trim(str).toLowerCase().split(/[\s\-_]+/);
        },
        getProtocol: function() {
            return location.protocol;
        },
        noop: function() {}
    };
    var EventTarget = function() {
        var eventSplitter = /\s+/;
        return {
            on: function(events, callback) {
                var event;
                if (!callback) {
                    return this;
                }
                this._callbacks = this._callbacks || {};
                events = events.split(eventSplitter);
                while (event = events.shift()) {
                    this._callbacks[event] = this._callbacks[event] || [];
                    this._callbacks[event].push(callback);
                }
                return this;
            },
            trigger: function(events, data) {
                var event, callbacks;
                if (!this._callbacks) {
                    return this;
                }
                events = events.split(eventSplitter);
                while (event = events.shift()) {
                    if (callbacks = this._callbacks[event]) {
                        for (var i = 0; i < callbacks.length; i += 1) {
                            callbacks[i].call(this, {
                                type: event,
                                data: data
                            });
                        }
                    }
                }
                return this;
            }
        };
    }();
    var EventBus = function() {
        var namespace = "typeahead:";
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        utils.mixin(EventBus.prototype, {
            trigger: function(type) {
                var args = [].slice.call(arguments, 1);
                this.$el.trigger(namespace + type, args);
            }
        });
        return EventBus;
    }();
    var PersistentStorage = function() {
        var ls, methods;
        try {
            ls = window.localStorage;
            ls.setItem("~~~", "!");
            ls.removeItem("~~~");
        } catch (err) {
            ls = null;
        }
        function PersistentStorage(namespace) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + this.prefix);
        }
        if (ls && window.JSON) {
            methods = {
                _prefix: function(key) {
                    return this.prefix + key;
                },
                _ttlKey: function(key) {
                    return this._prefix(key) + this.ttlKey;
                },
                get: function(key) {
                    if (this.isExpired(key)) {
                        this.remove(key);
                    }
                    return decode(ls.getItem(this._prefix(key)));
                },
                set: function(key, val, ttl) {
                    if (utils.isNumber(ttl)) {
                        ls.setItem(this._ttlKey(key), encode(now() + ttl));
                    } else {
                        ls.removeItem(this._ttlKey(key));
                    }
                    return ls.setItem(this._prefix(key), encode(val));
                },
                remove: function(key) {
                    ls.removeItem(this._ttlKey(key));
                    ls.removeItem(this._prefix(key));
                    return this;
                },
                clear: function() {
                    var i, key, keys = [], len = ls.length;
                    for (i = 0; i < len; i++) {
                        if ((key = ls.key(i)).match(this.keyMatcher)) {
                            keys.push(key.replace(this.keyMatcher, ""));
                        }
                    }
                    for (i = keys.length; i--; ) {
                        this.remove(keys[i]);
                    }
                    return this;
                },
                isExpired: function(key) {
                    var ttl = decode(ls.getItem(this._ttlKey(key)));
                    return utils.isNumber(ttl) && now() > ttl ? true : false;
                }
            };
        } else {
            methods = {
                get: utils.noop,
                set: utils.noop,
                remove: utils.noop,
                clear: utils.noop,
                isExpired: utils.noop
            };
        }
        utils.mixin(PersistentStorage.prototype, methods);
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(utils.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return JSON.parse(val);
        }
    }();
    var RequestCache = function() {
        function RequestCache(o) {
            utils.bindAll(this);
            o = o || {};
            this.sizeLimit = o.sizeLimit || 10;
            this.cache = {};
            this.cachedKeysByAge = [];
        }
        utils.mixin(RequestCache.prototype, {
            get: function(url) {
                return this.cache[url];
            },
            set: function(url, resp) {
                var requestToEvict;
                if (this.cachedKeysByAge.length === this.sizeLimit) {
                    requestToEvict = this.cachedKeysByAge.shift();
                    delete this.cache[requestToEvict];
                }
                this.cache[url] = resp;
                this.cachedKeysByAge.push(url);
            }
        });
        return RequestCache;
    }();
    var Transport = function() {
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests, requestCache;
        function Transport(o) {
            utils.bindAll(this);
            o = utils.isString(o) ? {
                url: o
            } : o;
            requestCache = requestCache || new RequestCache();
            maxPendingRequests = utils.isNumber(o.maxParallelRequests) ? o.maxParallelRequests : maxPendingRequests || 6;
            this.url = o.url;
            this.wildcard = o.wildcard || "%QUERY";
            this.filter = o.filter;
            this.replace = o.replace;
            this.ajaxSettings = {
                type: "get",
                cache: o.cache,
                timeout: o.timeout,
                dataType: o.dataType || "json",
                beforeSend: o.beforeSend
            };
            this._get = (/^throttle$/i.test(o.rateLimitFn) ? utils.throttle : utils.debounce)(this._get, o.rateLimitWait || 300);
        }
        utils.mixin(Transport.prototype, {
            _get: function(url, cb) {
                var that = this;
                if (belowPendingRequestsThreshold()) {
                    this._sendRequest(url).done(done);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    var data = that.filter ? that.filter(resp) : resp;
                    cb && cb(data);
                    requestCache.set(url, resp);
                }
            },
            _sendRequest: function(url) {
                var that = this, jqXhr = pendingRequests[url];
                if (!jqXhr) {
                    incrementPendingRequests();
                    jqXhr = pendingRequests[url] = $.ajax(url, this.ajaxSettings).always(always);
                }
                return jqXhr;
                function always() {
                    decrementPendingRequests();
                    pendingRequests[url] = null;
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(query, cb) {
                var that = this, encodedQuery = encodeURIComponent(query || ""), url, resp;
                cb = cb || utils.noop;
                url = this.replace ? this.replace(this.url, encodedQuery) : this.url.replace(this.wildcard, encodedQuery);
                if (resp = requestCache.get(url)) {
                    utils.defer(function() {
                        cb(that.filter ? that.filter(resp) : resp);
                    });
                } else {
                    this._get(url, cb);
                }
                return !!resp;
            }
        });
        return Transport;
        function incrementPendingRequests() {
            pendingRequestsCount++;
        }
        function decrementPendingRequests() {
            pendingRequestsCount--;
        }
        function belowPendingRequestsThreshold() {
            return pendingRequestsCount < maxPendingRequests;
        }
    }();
    var Dataset = function() {
        var keys = {
            thumbprint: "thumbprint",
            protocol: "protocol",
            itemHash: "itemHash",
            adjacencyList: "adjacencyList"
        };
        function Dataset(o) {
            utils.bindAll(this);
            if (utils.isString(o.template) && !o.engine) {
                $.error("no template engine specified");
            }
            if (!o.local && !o.prefetch && !o.remote) {
                $.error("one of local, prefetch, or remote is required");
            }
            this.name = o.name || utils.getUniqueId();
            this.limit = o.limit || 5;
            this.minLength = o.minLength || 1;
            this.header = o.header;
            this.footer = o.footer;
            this.valueKey = o.valueKey || "value";
            this.template = compileTemplate(o.template, o.engine, this.valueKey);
            this.local = o.local;
            this.prefetch = o.prefetch;
            this.remote = o.remote;
            this.itemHash = {};
            this.adjacencyList = {};
            this.storage = o.name ? new PersistentStorage(o.name) : null;
        }
        utils.mixin(Dataset.prototype, {
            _processLocalData: function(data) {
                this._mergeProcessedData(this._processData(data));
            },
            _loadPrefetchData: function(o) {
                var that = this, thumbprint = VERSION + (o.thumbprint || ""), storedThumbprint, storedProtocol, storedItemHash, storedAdjacencyList, isExpired, deferred;
                if (this.storage) {
                    storedThumbprint = this.storage.get(keys.thumbprint);
                    storedProtocol = this.storage.get(keys.protocol);
                    storedItemHash = this.storage.get(keys.itemHash);
                    storedAdjacencyList = this.storage.get(keys.adjacencyList);
                }
                isExpired = storedThumbprint !== thumbprint || storedProtocol !== utils.getProtocol();
                o = utils.isString(o) ? {
                    url: o
                } : o;
                o.ttl = utils.isNumber(o.ttl) ? o.ttl : 24 * 60 * 60 * 1e3;
                if (storedItemHash && storedAdjacencyList && !isExpired) {
                    this._mergeProcessedData({
                        itemHash: storedItemHash,
                        adjacencyList: storedAdjacencyList
                    });
                    deferred = $.Deferred().resolve();
                } else {
                    deferred = $.getJSON(o.url).done(processPrefetchData);
                }
                return deferred;
                function processPrefetchData(data) {
                    var filteredData = o.filter ? o.filter(data) : data, processedData = that._processData(filteredData), itemHash = processedData.itemHash, adjacencyList = processedData.adjacencyList;
                    if (that.storage) {
                        that.storage.set(keys.itemHash, itemHash, o.ttl);
                        that.storage.set(keys.adjacencyList, adjacencyList, o.ttl);
                        that.storage.set(keys.thumbprint, thumbprint, o.ttl);
                        that.storage.set(keys.protocol, utils.getProtocol(), o.ttl);
                    }
                    that._mergeProcessedData(processedData);
                }
            },
            _transformDatum: function(datum) {
            	if(datum!=undefined){
                var value = utils.isString(datum) ? datum : datum[this.valueKey], tokens = datum.tokens || utils.tokenizeText(value);
               
                var item = {
                    value: value,
                    tokens: tokens
                };
                if (utils.isString(datum)) {
                    item.datum = {};
                    item.datum[this.valueKey] = datum;
                } else {
                    item.datum = datum;
                }
                item.tokens = utils.filter(item.tokens, function(token) {
                    return !utils.isBlankString(token);
                });
                item.tokens = utils.map(item.tokens, function(token) {
                    return token.toLowerCase();
                });
                return item;
                }else{
                	return false;
                }
            },
            _processData: function(data) {
                var that = this, itemHash = {}, adjacencyList = {};
                utils.each(data, function(i, datum) {
                    var item = that._transformDatum(datum), id = utils.getUniqueId(item.value);
                    itemHash[id] = item;
                    utils.each(item.tokens, function(i, token) {
                        var character = token.charAt(0), adjacency = adjacencyList[character] || (adjacencyList[character] = [ id ]);
                        !~utils.indexOf(adjacency, id) && adjacency.push(id);
                    });
                });
                return {
                    itemHash: itemHash,
                    adjacencyList: adjacencyList
                };
            },
            _mergeProcessedData: function(processedData) {
                var that = this;
                utils.mixin(this.itemHash, processedData.itemHash);
                utils.each(processedData.adjacencyList, function(character, adjacency) {
                    var masterAdjacency = that.adjacencyList[character];
                    that.adjacencyList[character] = masterAdjacency ? masterAdjacency.concat(adjacency) : adjacency;
                });
            },
            _getLocalSuggestions: function(terms) {
                var that = this, firstChars = [], lists = [], shortestList, suggestions = [];
                utils.each(terms, function(i, term) {
                    var firstChar = term.charAt(0);
                    !~utils.indexOf(firstChars, firstChar) && firstChars.push(firstChar);
                });
                utils.each(firstChars, function(i, firstChar) {
                    var list = that.adjacencyList[firstChar];
                    if (!list) {
                        return false;
                    }
                    lists.push(list);
                    if (!shortestList || list.length < shortestList.length) {
                        shortestList = list;
                    }
                });
                if (lists.length < firstChars.length) {
                    return [];
                }
                utils.each(shortestList, function(i, id) {
                    var item = that.itemHash[id], isCandidate, isMatch;
                    isCandidate = utils.every(lists, function(list) {
                        return ~utils.indexOf(list, id);
                    });
                    isMatch = isCandidate && utils.every(terms, function(term) {
                        return utils.some(item.tokens, function(token) {
                            return token.indexOf(term) === 0;
                        });
                    });
                    isMatch && suggestions.push(item);
                });
                return suggestions;
            },
            initialize: function() {
                var deferred;
                this.local && this._processLocalData(this.local);
                this.transport = this.remote ? new Transport(this.remote) : null;
                deferred = this.prefetch ? this._loadPrefetchData(this.prefetch) : $.Deferred().resolve();
                this.local = this.prefetch = this.remote = null;
                this.initialize = function() {
                    return deferred;
                };
                return deferred;
            },
            getSuggestions: function(query, cb) {
                var that = this, terms, suggestions, cacheHit = false;
                if (query.length < this.minLength) {
                    return;
                }
                terms = utils.tokenizeQuery(query);
                suggestions = this._getLocalSuggestions(terms).slice(0, this.limit);
                if (suggestions.length < this.limit && this.transport) {
                    cacheHit = this.transport.get(query, processRemoteData);
                }
                !cacheHit && cb && cb(suggestions);
                function processRemoteData(data) {
                    suggestions = suggestions.slice(0);
                    utils.each(data, function(i, datum) {
                        var item = that._transformDatum(datum), isDuplicate;
                        isDuplicate = utils.some(suggestions, function(suggestion) {
                            return item.value === suggestion.value;
                        });
                        !isDuplicate && suggestions.push(item);
                        return suggestions.length < that.limit;
                    });
                    cb && cb(suggestions);
                }
            }
        });
        return Dataset;
        function compileTemplate(template, engine, valueKey) {
            var renderFn, compiledTemplate;
            if (utils.isFunction(template)) {
                renderFn = template;
            } else if (utils.isString(template)) {
                compiledTemplate = engine.compile(template);
                renderFn = utils.bind(compiledTemplate.render, compiledTemplate);
            } else {
                renderFn = function(context) {
                    return "<p>" + context[valueKey] + "</p>";
                };
            }
            return renderFn;
        }
    }();
    var InputView = function() {
        function InputView(o) {
            var that = this;
            utils.bindAll(this);
            this.specialKeyCodeMap = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            };
            this.$hint = $(o.hint);
            this.$input = $(o.input).on("blur.tt", this._handleBlur).on("focus.tt", this._handleFocus).on("keydown.tt", this._handleSpecialKeyEvent);
            if (!utils.isMsie()) {
                this.$input.on("input.tt", this._compareQueryToInputValue);
            } else {
                this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                    if (that.specialKeyCodeMap[$e.which || $e.keyCode]) {
                        return;
                    }
                    utils.defer(that._compareQueryToInputValue);
                });
            }
            this.query = this.$input.val();
            this.$overflowHelper = buildOverflowHelper(this.$input);
        }
        utils.mixin(InputView.prototype, EventTarget, {
            _handleFocus: function() {
                this.trigger("focused");
            },
            _handleBlur: function() {
                this.trigger("blured");
            },
            _handleSpecialKeyEvent: function($e) {
                var keyName = this.specialKeyCodeMap[$e.which || $e.keyCode];
                keyName && this.trigger(keyName + "Keyed", $e);
            },
            _compareQueryToInputValue: function() {
                var inputValue = this.getInputValue(), isSameQuery = compareQueries(this.query, inputValue), isSameQueryExceptWhitespace = isSameQuery ? this.query.length !== inputValue.length : false;
                if (isSameQueryExceptWhitespace) {
                    this.trigger("whitespaceChanged", {
                        value: this.query
                    });
                } else if (!isSameQuery) {
                    this.trigger("queryChanged", {
                        value: this.query = inputValue
                    });
                }
            },
            destroy: function() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$hint = this.$input = this.$overflowHelper = null;
            },
            focus: function() {
                this.$input.focus();
            },
            blur: function() {
                this.$input.blur();
            },
            getQuery: function() {
                return this.query;
            },
            setQuery: function(query) {
                this.query = query;
            },
            getInputValue: function() {
                return this.$input.val();
            },
            setInputValue: function(value, silent) {
                this.$input.val(value);
                !silent && this._compareQueryToInputValue();
            },
            getHintValue: function() {
                return this.$hint.val();
            },
            setHintValue: function(value) {
                this.$hint.val(value);
            },
            getLanguageDirection: function() {
                return (this.$input.css("direction") || "ltr").toLowerCase();
            },
            isOverflow: function() {
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() > this.$input.width();
            },
            isCursorAtEnd: function() {
                var valueLength = this.$input.val().length, selectionStart = this.$input[0].selectionStart, range;
                if (utils.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            }
        });
        return InputView;
        function buildOverflowHelper($input) {
            return $("<span></span>").css({
                position: "absolute",
                left: "-9999px",
                visibility: "hidden",
                whiteSpace: "nowrap",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function compareQueries(a, b) {
            a = (a || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
            b = (b || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
            return a === b;
        }
    }();
    var DropdownView = function() {
        var html = {
            suggestionsList: '<span class="tt-suggestions"></span>'
        }, css = {
            suggestionsList: {
                display: "block"
            },
            suggestion: {
                whiteSpace: "nowrap",
                cursor: "pointer"
            },
            suggestionChild: {
                whiteSpace: "normal"
            }
        };
        function DropdownView(o) {
            utils.bindAll(this);
            this.isOpen = false;
            this.isEmpty = true;
            this.isMouseOverDropdown = false;
            this.$menu = $(o.menu).on("mouseenter.tt", this._handleMouseenter).on("mouseleave.tt", this._handleMouseleave).on("click.tt", ".tt-suggestion", this._handleSelection).on("mouseover.tt", ".tt-suggestion", this._handleMouseover);
        }
        utils.mixin(DropdownView.prototype, EventTarget, {
            _handleMouseenter: function() {
                this.isMouseOverDropdown = true;
            },
            _handleMouseleave: function() {
                this.isMouseOverDropdown = false;
            },
            _handleMouseover: function($e) {
                var $suggestion = $($e.currentTarget);
                this._getSuggestions().removeClass("tt-is-under-cursor");
                $suggestion.addClass("tt-is-under-cursor");
            },
            _handleSelection: function($e) {
                var $suggestion = $($e.currentTarget);
                this.trigger("suggestionSelected", extractSuggestion($suggestion));
            },
            _show: function() {
                this.$menu.css("display", "block");
            },
            _hide: function() {
                this.$menu.hide();
            },
            _moveCursor: function(increment) {
                var $suggestions, $cur, nextIndex, $underCursor;
                if (!this.isVisible()) {
                    return;
                }
                $suggestions = this._getSuggestions();
                $cur = $suggestions.filter(".tt-is-under-cursor");
                $cur.removeClass("tt-is-under-cursor");
                nextIndex = $suggestions.index($cur) + increment;
                nextIndex = (nextIndex + 1) % ($suggestions.length + 1) - 1;
                if (nextIndex === -1) {
                    this.trigger("cursorRemoved");
                    return;
                } else if (nextIndex < -1) {
                    nextIndex = $suggestions.length - 1;
                }
                $underCursor = $suggestions.eq(nextIndex).addClass("tt-is-under-cursor");
                this._ensureVisibility($underCursor);
                this.trigger("cursorMoved", extractSuggestion($underCursor));
            },
            _getSuggestions: function() {
                return this.$menu.find(".tt-suggestions > .tt-suggestion");
            },
            _ensureVisibility: function($el) {
                var menuHeight = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10), menuScrollTop = this.$menu.scrollTop(), elTop = $el.position().top, elBottom = elTop + $el.outerHeight(true);
                if (elTop < 0) {
                    this.$menu.scrollTop(menuScrollTop + elTop);
                } else if (menuHeight < elBottom) {
                    this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
                }
            },
            destroy: function() {
                this.$menu.off(".tt");
                this.$menu = null;
            },
            isVisible: function() {
                return this.isOpen && !this.isEmpty;
            },
            closeUnlessMouseIsOverDropdown: function() {
                if (!this.isMouseOverDropdown) {
                    this.close();
                }
            },
            close: function() {
                if (this.isOpen) {
                    this.isOpen = false;
                    this.isMouseOverDropdown = false;
                    this._hide();
                    this.$menu.find(".tt-suggestions > .tt-suggestion").removeClass("tt-is-under-cursor");
                    this.trigger("closed");
                }
            },
            open: function() {
                if (!this.isOpen) {
                    this.isOpen = true;
                    !this.isEmpty && this._show();
                    this.trigger("opened");
                }
            },
            setLanguageDirection: function(dir) {
                var ltrCss = {
                    left: "0",
                    right: "auto"
                }, rtlCss = {
                    left: "auto",
                    right: " 0"
                };
                dir === "ltr" ? this.$menu.css(ltrCss) : this.$menu.css(rtlCss);
            },
            moveCursorUp: function() {
                this._moveCursor(-1);
            },
            moveCursorDown: function() {
                this._moveCursor(+1);
            },
            getSuggestionUnderCursor: function() {
                var $suggestion = this._getSuggestions().filter(".tt-is-under-cursor").first();
                return $suggestion.length > 0 ? extractSuggestion($suggestion) : null;
            },
            getFirstSuggestion: function() {
                var $suggestion = this._getSuggestions().first();
                return $suggestion.length > 0 ? extractSuggestion($suggestion) : null;
            },
            renderSuggestions: function(dataset, suggestions) {
                var datasetClassName = "tt-dataset-" + dataset.name, wrapper = '<div class="tt-suggestion">%body</div>', compiledHtml, $suggestionsList, $dataset = this.$menu.find("." + datasetClassName), elBuilder, fragment, $el;
                if ($dataset.length === 0) {
                    $suggestionsList = $(html.suggestionsList).css(css.suggestionsList);
                    $dataset = $("<div></div>").addClass(datasetClassName).append(dataset.header).append($suggestionsList).append(dataset.footer).appendTo(this.$menu);
                }
                if (suggestions.length > 0) {
                    this.isEmpty = false;
                    this.isOpen && this._show();
                    elBuilder = document.createElement("div");
                    fragment = document.createDocumentFragment();
                    utils.each(suggestions, function(i, suggestion) {
                        suggestion.dataset = dataset.name;
                        compiledHtml = dataset.template(suggestion.datum);
                        elBuilder.innerHTML = wrapper.replace("%body", compiledHtml);
                        $el = $(elBuilder.firstChild).css(css.suggestion).data("suggestion", suggestion);
                        $el.children().each(function() {
                            $(this).css(css.suggestionChild);
                        });
                        fragment.appendChild($el[0]);
                    });
                    $dataset.show().find(".tt-suggestions").html(fragment);
                } else {
                    this.clearSuggestions(dataset.name);
                }
                this.trigger("suggestionsRendered");
            },
            clearSuggestions: function(datasetName) {
                var $datasets = datasetName ? this.$menu.find(".tt-dataset-" + datasetName) : this.$menu.find('[class^="tt-dataset-"]'), $suggestions = $datasets.find(".tt-suggestions");
                $datasets.hide();
                $suggestions.empty();
                if (this._getSuggestions().length === 0) {
                    this.isEmpty = true;
                    this._hide();
                }
            }
        });
        return DropdownView;
        function extractSuggestion($el) {
            return $el.data("suggestion");
        }
    }();
    var TypeaheadView = function() {
        var html = {
            wrapper: '<span class="twitter-typeahead"></span>',
            hint: '<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',
            dropdown: '<span class="tt-dropdown-menu"></span>'
        }, css = {
            wrapper: {
                position: "relative",
                display: "inline-block"
            },
            hint: {
                position: "absolute",
                top: "0",
                left: "0",
                borderColor: "transparent",
                boxShadow: "none"
            },
            query: {
                position: "relative",
                verticalAlign: "top",
                backgroundColor: "transparent"
            },
            dropdown: {
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: "100",
                display: "none"
            }
        };
        if (utils.isMsie()) {
            utils.mixin(css.query, {
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
            });
        }
        if (utils.isMsie() && utils.isMsie() <= 7) {
            utils.mixin(css.wrapper, {
                display: "inline",
                zoom: "1"
            });
            utils.mixin(css.query, {
                marginTop: "-1px"
            });
        }
        function TypeaheadView(o) {
            var $menu, $input, $hint;
            utils.bindAll(this);
            this.$node = buildDomStructure(o.input);
            this.datasets = o.datasets;
            this.dir = null;
            this.eventBus = o.eventBus;
            $menu = this.$node.find(".tt-dropdown-menu");
            $input = this.$node.find(".tt-query");
            $hint = this.$node.find(".tt-hint");
            this.dropdownView = new DropdownView({
                menu: $menu
            }).on("suggestionSelected", this._handleSelection).on("cursorMoved", this._clearHint).on("cursorMoved", this._setInputValueToSuggestionUnderCursor).on("cursorRemoved", this._setInputValueToQuery).on("cursorRemoved", this._updateHint).on("suggestionsRendered", this._updateHint).on("opened", this._updateHint).on("closed", this._clearHint).on("opened closed", this._propagateEvent);
            this.inputView = new InputView({
                input: $input,
                hint: $hint
            }).on("focused", this._openDropdown).on("blured", this._closeDropdown).on("blured", this._setInputValueToQuery).on("enterKeyed tabKeyed", this._handleSelection).on("queryChanged", this._clearHint).on("queryChanged", this._clearSuggestions).on("queryChanged", this._getSuggestions).on("whitespaceChanged", this._updateHint).on("queryChanged whitespaceChanged", this._openDropdown).on("queryChanged whitespaceChanged", this._setLanguageDirection).on("escKeyed", this._closeDropdown).on("escKeyed", this._setInputValueToQuery).on("tabKeyed upKeyed downKeyed", this._managePreventDefault).on("upKeyed downKeyed", this._moveDropdownCursor).on("upKeyed downKeyed", this._openDropdown).on("tabKeyed leftKeyed rightKeyed", this._autocomplete);
        }
        utils.mixin(TypeaheadView.prototype, EventTarget, {
            _managePreventDefault: function(e) {
                var $e = e.data, hint, inputValue, preventDefault = false;
                switch (e.type) {
                  case "tabKeyed":
                    hint = this.inputView.getHintValue();
                    inputValue = this.inputView.getInputValue();
                    preventDefault = hint && hint !== inputValue;
                    break;

                  case "upKeyed":
                  case "downKeyed":
                    preventDefault = !$e.shiftKey && !$e.ctrlKey && !$e.metaKey;
                    break;
                }
                preventDefault && $e.preventDefault();
            },
            _setLanguageDirection: function() {
                var dir = this.inputView.getLanguageDirection();
                if (dir !== this.dir) {
                    this.dir = dir;
                    this.$node.css("direction", dir);
                    this.dropdownView.setLanguageDirection(dir);
                }
            },
            _updateHint: function() {
                var suggestion = this.dropdownView.getFirstSuggestion(), hint = suggestion ? suggestion.value : null, dropdownIsVisible = this.dropdownView.isVisible(), inputHasOverflow = this.inputView.isOverflow(), inputValue, query, escapedQuery, beginsWithQuery, match;
                if (hint && dropdownIsVisible && !inputHasOverflow) {
                    inputValue = this.inputView.getInputValue();
                    query = inputValue.replace(/\s{2,}/g, " ").replace(/^\s+/g, "");
                    escapedQuery = utils.escapeRegExChars(query);
                    beginsWithQuery = new RegExp("^(?:" + escapedQuery + ")(.*$)", "i");
                    match = beginsWithQuery.exec(hint);
                    this.inputView.setHintValue(inputValue + (match ? match[1] : ""));
                }
            },
            _clearHint: function() {
                this.inputView.setHintValue("");
            },
            _clearSuggestions: function() {
                this.dropdownView.clearSuggestions();
            },
            _setInputValueToQuery: function() {
                this.inputView.setInputValue(this.inputView.getQuery());
            },
            _setInputValueToSuggestionUnderCursor: function(e) {
                var suggestion = e.data;
                this.inputView.setInputValue(suggestion.value, true);
            },
            _openDropdown: function() {
                this.dropdownView.open();
            },
            _closeDropdown: function(e) {
                this.dropdownView[e.type === "blured" ? "closeUnlessMouseIsOverDropdown" : "close"]();
            },
            _moveDropdownCursor: function(e) {
                var $e = e.data;
                if (!$e.shiftKey && !$e.ctrlKey && !$e.metaKey) {
                    this.dropdownView[e.type === "upKeyed" ? "moveCursorUp" : "moveCursorDown"]();
                }
            },
            _handleSelection: function(e) {
                var byClick = e.type === "suggestionSelected", suggestion = byClick ? e.data : this.dropdownView.getSuggestionUnderCursor();
                if (suggestion) {
                    this.inputView.setInputValue(suggestion.value);
                    byClick ? this.inputView.focus() : e.data.preventDefault();
                    byClick && utils.isMsie() ? utils.defer(this.dropdownView.close) : this.dropdownView.close();
                    this.eventBus.trigger("selected", suggestion.datum, suggestion.dataset);
                }
            },
            _getSuggestions: function() {
                var that = this, query = this.inputView.getQuery();
                if (utils.isBlankString(query)) {
                    return;
                }
                utils.each(this.datasets, function(i, dataset) {
                    dataset.getSuggestions(query, function(suggestions) {
                        if (query === that.inputView.getQuery()) {
                            that.dropdownView.renderSuggestions(dataset, suggestions);
                        }
                    });
                });
            },
            _autocomplete: function(e) {
                var isCursorAtEnd, ignoreEvent, query, hint, suggestion;
                if (e.type === "rightKeyed" || e.type === "leftKeyed") {
                    isCursorAtEnd = this.inputView.isCursorAtEnd();
                    ignoreEvent = this.inputView.getLanguageDirection() === "ltr" ? e.type === "leftKeyed" : e.type === "rightKeyed";
                    if (!isCursorAtEnd || ignoreEvent) {
                        return;
                    }
                }
                query = this.inputView.getQuery();
                hint = this.inputView.getHintValue();
                if (hint !== "" && query !== hint) {
                    suggestion = this.dropdownView.getFirstSuggestion();
                    this.inputView.setInputValue(suggestion.value);
                    this.eventBus.trigger("autocompleted", suggestion.datum, suggestion.dataset);
                }
            },
            _propagateEvent: function(e) {
                this.eventBus.trigger(e.type);
            },
            destroy: function() {
                this.inputView.destroy();
                this.dropdownView.destroy();
                destroyDomStructure(this.$node);
                this.$node = null;
            },
            setQuery: function(query) {
                this.inputView.setQuery(query);
                this.inputView.setInputValue(query);
                this._clearHint();
                this._clearSuggestions();
                this._getSuggestions();
            }
        });
        return TypeaheadView;
        function buildDomStructure(input) {
            var $wrapper = $(html.wrapper), $dropdown = $(html.dropdown), $input = $(input), $hint = $(html.hint);
            $wrapper = $wrapper.css(css.wrapper);
            $dropdown = $dropdown.css(css.dropdown);
            $hint.css(css.hint).css({
                backgroundAttachment: $input.css("background-attachment"),
                backgroundClip: $input.css("background-clip"),
                backgroundColor: $input.css("background-color"),
                backgroundImage: $input.css("background-image"),
                backgroundOrigin: $input.css("background-origin"),
                backgroundPosition: $input.css("background-position"),
                backgroundRepeat: $input.css("background-repeat"),
                backgroundSize: $input.css("background-size")
            });
            $input.data("ttAttrs", {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass("tt-query").attr({
                autocomplete: "off",
                spellcheck: false
            }).css(css.query);
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input.wrap($wrapper).parent().prepend($hint).append($dropdown);
        }
        function destroyDomStructure($node) {
            var $input = $node.find(".tt-query");
            utils.each($input.data("ttAttrs"), function(key, val) {
                utils.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.detach().removeData("ttAttrs").removeClass("tt-query").insertAfter($node);
            $node.remove();
        }
    }();
    (function() {
        var cache = {}, viewKey = "ttView", methods;
        methods = {
            initialize: function(datasetDefs) {
                var datasets;
                datasetDefs = utils.isArray(datasetDefs) ? datasetDefs : [ datasetDefs ];
                if (datasetDefs.length === 0) {
                    $.error("no datasets provided");
                }
                datasets = utils.map(datasetDefs, function(o) {
                    var dataset = cache[o.name] ? cache[o.name] : new Dataset(o);
                    if (o.name) {
                        cache[o.name] = dataset;
                    }
                    return dataset;
                });
                return this.each(initialize);
                function initialize() {
                    var $input = $(this), deferreds, eventBus = new EventBus({
                        el: $input
                    });
                    deferreds = utils.map(datasets, function(dataset) {
                        return dataset.initialize();
                    });
                    $input.data(viewKey, new TypeaheadView({
                        input: $input,
                        eventBus: eventBus = new EventBus({
                            el: $input
                        }),
                        datasets: datasets
                    }));
                    $.when.apply($, deferreds).always(function() {
                        utils.defer(function() {
                            eventBus.trigger("initialized");
                        });
                    });
                }
            },
            destroy: function() {
                return this.each(destroy);
                function destroy() {
                    var $this = $(this), view = $this.data(viewKey);
                    if (view) {
                        view.destroy();
                        $this.removeData(viewKey);
                    }
                }
            },
            setQuery: function(query) {
                return this.each(setQuery);
                function setQuery() {
                    var view = $(this).data(viewKey);
                    view && view.setQuery(query);
                }
            }
        };
        jQuery.fn.typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
    })();
})(window.jQuery);
$(document).ready(function() {
  for(i=0; i<3; i++){
        $("#step"+(i+1)).hide();
  }
    $("#mybutton").hide();
    });
      $('.axaterms').typeahead({
        name: 'axaterms',
        minLength: 2,

      local: [
        {
        value:'401(k) Beneficiary',
        tokens:['401(k) Beneficiary','401k Beneficiary',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Festate%2F401k-IRA-beneficiary.html',
        steps: ['Most inherited assets such as bank accounts, stocks, and real estate pass to your beneficiaries without income tax being due. However, that\'s not usually the case with 401(k) plans and IRAs.','Beneficiaries pay ordinary income tax on distributions from 401(k) plans and traditional IRAs. With Roth IRAs and Roth 401(k)s, however, your beneficiaries can receive the benefits free from income tax if all of the tax requirements are met.','It\'s a good idea to review your beneficiary designation form at least every two to three years. Also, be sure to update your form to reflect changes in financial circumstances. Beneficiary designations are important estate planning documents. Seek legal advice as needed.']
        },
        {
        value:'401(k) plans',
        tokens:['401(k) plans','401k',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2F401k%2F401k-plans.html',
        steps: ['401(k) plans allow employees to put away a portion of their annual income into investment accounts specifically for retirement.','The power of 401(k) plans is in the potential for those retirement investments to grow tax-free, with taxes deferred until withdrawal.','Whether you are an employer considering retirement plans for your employees, or an employee seeking information about 401(k) plans you\'ll find a wealth of resources and investment products on this website.']
        },
        {
        value:'403(b) plans',
        tokens:['403(b) plans','403b',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2F403b%2F403b-plans.html',
        steps: ['For employees of educational institutions and  non-profit organizations, 403(b) plans offer a tax-deferred means of saving for retirement.','403(b) plans resemble 401(k) plans in letting employees contribute pre-tax earnings to a retirement savings account where they can invest in stock portfolios, bond  portfolios, and typically, a guaranteed interest account','Employers seeking help administering 403(b) plans or employees seeking information on employer-sponsored retirement plans, AXA Equitable provides a wealth of information and planning tools.']
        },
        {
        value:'457(b) plans',
        tokens:['457(b) plans','457b',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2F457%2F457.html',
        steps: ['A 457 plan is an employee retirement plan that state, county and local government agencies as well as certain other tax-exempt organizations can offer to their employees.','457 plans allows employees to contribute a portion of their earnings, which can grow tax-deferred until the money is withdrawn, usually at retirement.','A 457 plan funded with the EQUI-VEST&#174; 457(b) EDC can provide your employees with automatic asset re-balancing, dollar cost averaging, and withdrawals and annuity payouts.']
        },
        {
        value:'529 contribution limits',
        tokens:['529 contribution limits',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Feducation%2F529-plans%2Fcontributions-and-withdrawals.html',
        steps: ['To qualify as a 529 plan under federal rules, a state program must not accept contributions in excess of the anticipated cost of a beneficiary\'s qualified education expenses.','A state\'s limit will apply to either kind of 529 plan: prepaid tuition plan or college savings plan.','Some plans may also have a contribution limit, both initially and each year. Find out how AXA can assist in navigating withdrawals to your 529  accounts.']
        },
        {
        value:'AllianceBernstein Investor Relations',
        tokens:['AllianceBernstein Investor Relations',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Faxa%2Falliance-bernstein.html',
        steps: ['AllianceBernstein, a subsidiary of AXA, is a leading global investment management firm that offers high-quality research and diversified investment services to institutional clients, individuals and private clients in major markets around the world.','AllianceBernstein employs more than 500 investment professionals with expertise in growth equities, value equities, fixed income securities, blend strategies and alternative investments and, through its subsidiaries and joint ventures, operates in more than 20 countries.','Through its integrated global platform, AllianceBernstein is well-positioned to tailor investment solutions for its clients. AllianceBernstein also offers independent research, portfolio strategy and brokerage-related services to institutional investors.']
        },
        {
        value:'Annuities',
        tokens:['Annuities','Lifetime Income','Retirement income','Systematic Withdrawals',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuities%2Fwhat-is-an-annuity.html',
        steps: ['An annuity is long-term retirement product that can help protect you against the risk of outliving your assets.','Any earnings on contributions are tax-deferred until they are withdrawn, usually at retirement. You may receive income in a number of ways, including payments that will last for as long as you live. Annuities can be a valuable addition to your retirement plan.','Annuities may help you receive retirement income payments for as long as you live, protect beneficiaries with a death benefit and diversify your investments.']
        },
        {
        value:'Athena Indexed Universal Life SM',
        tokens:['Athena','Athena Indexed Universal Life SM',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Funiversal%2Fathena-indexed-ul.html',
        steps: ['Athena Indexed Universal Life <sup>SM</sup> is flexible premium universal life insurance.','Athena Indexed Universal Life  offers interest crediting linked to major market indexes, so you can participate in the upside potential of the equities markets.','It also offers a built-in guaranteed downside protection against declines in the value of the applicable index.']
        },
        {
        value:'AXA advisors',
        tokens:['AXA advisors',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Faxa%2Faxa-advisors.html',
        steps: ['AXA Advisors is a subsidiary of AXA Financial, Inc., a member of the global AXA Group','AXA Advisors offers financial products and services to both individuals and small businesses.','AXA Advisors has financial professionals in communities throughout the United States. AXA Advisors\' local presence allows clients to develop special relationships with talented, capable financial professionals in their local communities.']
        },
        {
        value:'AXA Foundation',
        tokens:['AXA Foundation','AXA Scholarships',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Faxa-foundation%2Fabout.html',
        steps: ['The AXA Foundation is the philanthropic arm of AXA Equitable.','Our signature program, AXA Achievement, helps make college possible by providing access and advice.','Through the AXA Foundation offers more than $1.3 million a year in scholarships to students across the country.']
        },
        {
        value:'AXA Scholarships',
        tokens:['AXA Foundation','AXA Scholarships',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Faxa-foundation%2Fabout.html',
        steps: ['The AXA Foundation is the philanthropic arm of AXA Equitable.','Our signature program, AXA Achievement, helps make college possible by providing access and advice.','Through the AXA Foundation offers more than $1.3 million a year in scholarships to students across the country.']
        },
        {
        value:'AXA Structured Capital Strategies',
        tokens:['AXA Structured Capital Strategies',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuities%2Fstructured-capital-strategies%2Fannuity.html',
        steps: ['Structured Capital Strategies packages a structured growth strategy with tax deferral.','You may then take payments or lump sum amount at a later date.','In Structured Capital Strategies, you invest to accumulate value on a tax-deferred basis in one or more of our variable investment options and/or in the Structured Investment Option.']
        },
        {
        value:'Benefits of Life Insurance',
        tokens:['Benefits of Life Insurance',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Fplan%2Fyour-financial-plan.html',
        steps: ['Life insurance, payable when you die, can provide a surviving spouse, children, and other dependents the funds necessary to help maintain their standards of living, can help repay debt, and can help fund education tuition costs.','The amount you need depends on your situation.','Your financial professional can help you assess your needs to determine the kinds and amounts of life insurance that are right for you and your family.']
        },
        {
        value:'Benefits to Heirs',
        tokens:['Benefits to Heirs','Benefits to Spouses',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Foffer%2Fdownload%2Ffll-ben-request.html',
        steps: ['We look at our life insurance policies as promises our clients keep to their loved ones.','A policy\'s death benefit can often help pay bills and provide a safe financial future.','As we were asked to help protect your future, we want to now ask, ÒHow can we help provide a legacy for your loved ones?Ó']
        },
        {
        value:'Benefits to Spouses',
        tokens:['Benefits to Heirs','Benefits to Spouses',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Foffer%2Fdownload%2Ffll-ben-request.html',
        steps: ['We look at our life insurance policies as promises our clients keep to their loved ones.','A policy\'s death benefit can often help pay bills and provide a safe financial future.','As we were asked to help protect your future, we want to now ask, ÒHow can we help provide a legacy for your loved ones?Ó']
        },
        {
        value:'Buy-sell Agreement',
        tokens:['Buy-sell Agreement',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Fbusiness%2Fwhat-is-a-buy-sell-agreement.html',
        steps: ['A buy-sell agreement is a contract that provides for the future sale of your business interest or for your purchase of a co-owner\'s interest in the business.','Buy-sell agreements are also known as business continuation agreements and buyout agreements.','If you own a business and are concerned about how the death of a co-owner might affect its operation, a funded buy-sell agreement can help by ensuring that you will be able to purchase your partner\'s share, eliminating any doubts about the continuation of the business.']
        },
        {
        value:'Catch-Up Contributions',
        tokens:['Catch-Up Contributions',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Fira%2Fcatch-up-contributions.html',
        steps: ['If you are 50 or older, or you will reach age 50 by the end of the year, you may be able to make contributions to your IRA or employer-sponsored retirement plan above the normal contribution limit.','Catch-up contributions are designed to help you make up any retirement savings shortfall by bumping up the amount you can save in the years leading up to retirement.','Catch-up contributions can be made to traditional and Roth IRAs, as well as to 401(k) plans. But if you participate in an employer-sponsored retirement plan, check plan rules--not all plans allow catch-up contributions.']
        },
        {
        value:'Charitable Giving',
        tokens:['Charitable Giving',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Festate%2Fcharitable-giving.html',
        steps: ['In addition to the altruistic and goodwill benefits of any charitable contribution, there are generally tax advantages to the donor.','When deciding your estate-planning strategies, consider a charitable contribution option, which can help the charity of your choice as well as provide you with a steady stream of income and potential tax benefits.','There are numerous options for setting up a charitable contribution in your estate plan. The easiest is a simple bequest through your will.']
        },
        {
        value:'Children',
        tokens:['Children','New Child','Preparing for a baby',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fparents%2Fbecoming-a-parent.html',
        steps: ['A newborn baby can blissfully turn your life upside-down. But with all that excitement and wonderment come responsibilities.','Insurance, education funding, your estate, even your retirement all take on a new urgency.','AXA Equitable offers financial products to provide for your newest family member including life insurance, disability insurance, college savings and estate planning.']
        },
        {
        value:'Preparing for college',
        tokens:['College','Saving for College','Education Savings','Saving for Education','Preparing for college','Preparing for college',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flearning-center%2Ftools%2Fsaving-for-college.html',
        steps: ['As the cost of higher education continues to rise, the idea of helping to put your child through college may seem daunting. But don\'t let it overwhelm you.','While a college education may be one of the most important gifts you can give your child, so, too, is planning a secure retirement for yourself so that your children are not burdened with worry or support for you when they are starting out in a life of their own','AXA Equitable offers financial products to help you with your education planning including 529s, Coverdell Education Plans as well as UGMA and UTMA Accounts.']
        },
        {
        value:'Contact Information',
        tokens:['Contact Information','What number to call?',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Faxa%2Fcontact.html',
        steps: ['Online Support: (877) 222-2144','Brokerage Products: (866) 487-7484','Or click here (http://www.axa-equitable.com/axa/talk-to-financial-professional.html) to contact Financial Professionals']
        },
        {
        value:'Coverdell IRA distribution rules',
        tokens:['Coverdell IRA distribution rules','ESA','ESA Account Rules',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Feducation%2Fcoverdell-savings-account%2Fshould-I-open.html',
        steps: ['A Coverdell education savings account can play an important part in your college savings program.','The main benefit of Coverdell ESAs is tax related.','Specifically, money you withdraw to pay your child\'s college education expenses is completely tax free, including earnings. (Generally, distributions are tax free if they are not more than the beneficiary\'s education expenses for the year.)']
        },
        {
        value:'Crummey powers',
        tokens:['Crummey powers',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Festate%2Fwhy-life-insurance-trust.html',
        steps: ['A Crummey power is a provision contained in certain irrevocable trusts that permits specified trust beneficiaries to withdraw gifts you make to the trust for a limited period of time.','The provision allows gifts to the trust to qualify for the federal annual gift tax exclusion.','Over your lifetime, regular gifting to the trust may reduce the size of your gross estate. Without a Crummey power, all gifts you make to your irrevocable trust will be subject to gift tax.']
        },
        {
        value:'Death of a Spouse',
        tokens:['Death of a Spouse',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Fdeath-of-a-spouse%2Foverview.html',
        steps: ['Dealing with the copious financial paperwork that comes with the loss of one\'s spouse is the last thing a grieving widow or widower wants to do','If you are the beneficiary of your spouse\'s life insurance policy, you must file a claim in order to receive your benefits  the payout is not automatic.','Usually, it is a simple matter of calling your insurance agent, and the deceased\'s employer, if there is a company life insurance benefit, and then filling out the paperwork. Be sure to have a certified copy of the death certificate for each insurance company.']
        },
        {
        value:'Deferred Annuities',
        tokens:['Deferred Annuities','Variable Annuity',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuity%2Fvariable-annuity.html',
        steps: ['When you\'re planning for your retirement, a variable annuity can help provide guaranteed future income, while also providing the opportunity to grow your retirement savings','As opposed to a fixed annuity, where growth in principal and interest is pre-defined, a variable annuity offers the potential for greater growth but at the same time it carries more risk.','AXA Equitable is a leading provider of variable annuity products and offers two variable annuities that may help protect against down market risks while offering the potential to participate in upside market gains: AXA Equitable\'s Retirement Cornerstone<sup>SM</sup> and AXA Equitable\'s Structured Capital Strategiesª']
        },
        {
        value:'Defined Benefit Plan',
        tokens:['Defined Benefit Plan',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Funderstanding-defined-benefit-plans.html',
        steps: ['Defined benefit plans are qualified employer-sponsored retirement plans. Like other qualified plans, they offer tax incentives both to employers and to participating employees.','A defined benefit plan guarantees you a certain benefit when you retire. How much you receive generally depends on factors such as your salary, age, and years of service with the company.','The advantage of defined benefit plans is that they can be a major source of retirement income. They\'re generally designed to replace a certain percentage (e.g., 70 percent) of your preretirement income when combined with Social Security.']
        },
        {
        value:'Difference between a Will and a Trust',
        tokens:['Difference between a Will and a Trust',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Festate%2Fliving-will-vs-trust.html',
        steps: ['These two very important estate planning devices are quite different from each other but serve similar purposes.','A living will lets you manage your health-care decisions in case you become incapacitated.','A living trust lets you manage your property in case you become incapacitated.']
        },
        {
        value:'Divorce',
        tokens:['Divorce','Do I need Life Insurance?','Why do i need life insurance?',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Fdivorce%2Foverview.html',
        steps: ['Divorce has major financial implications  and they come precisely at a time of great emotional stress.','This life change affects the way in which you manage your debt and how you are covered by life and health insurance policies.','A sound financial strategy is needed to help minimize any potential financial burdens, so you can focus on what\'s truly important  healing and moving forward.']
        },
        {
        value:'Dollar Cost Averaging',
        tokens:['Dollar Cost Averaging',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvesting%2Fwhat-is-dollar-cost-averaging.html',
        steps: ['Dollar cost averaging is a method of accumulating assets by purchasing a fixed dollar amount of securities, at regularly scheduled intervals, over a period of time (for example, $100 per month over the next five years).','When the price of the securities is high, your fixed dollar amount will buy fewer securities, but when the price of the securities is low, your fixed dollar amount will buy more.','Among other things, this relieves you of the concern and emotional burden that comes with trying to decide when, and how much, you should be investing when the price of your securities is rising or falling.']
        },
        {
        value:'Employer Plans',
        tokens:['Employer Plans','Employer Sponsored Retirement Plan',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Femployer-sponsored-retirement-plans.html',
        steps: ['Your employer automatically deducts your contributions from your paycheck. You may never even miss the money--out of sight, out of mind.','With 401(k), 403(b), 457(b), SARSEPs, and SIMPLE plans, you contribute to the plan on a pretax basis. Your contributions come off the top of your salary before your employer withholds income taxes.','The more you can save for retirement, the better your chances of retiring comfortably. If you can, max out your contribution up to the legal limit. If you need to free up money to do that, try to cut certain expenses.']
        },
        {
        value:'Employer Sponsored Retirement Plan',
        tokens:['Employer Plans','Employer Sponsored Retirement Plan',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Femployer-sponsored-retirement-plans.html',
        steps: ['Your employer automatically deducts your contributions from your paycheck. You may never even miss the money--out of sight, out of mind.','With 401(k), 403(b), 457(b), SARSEPs, and SIMPLE plans, you contribute to the plan on a pretax basis. Your contributions come off the top of your salary before your employer withholds income taxes.','The more you can save for retirement, the better your chances of retiring comfortably. If you can, max out your contribution up to the legal limit. If you need to free up money to do that, try to cut certain expenses.']
        },
        {
        value:'EQUI-VEST¨',
        tokens:['Equivest','EQUI-VEST¨',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuities%2Fequivest%2Fproducts-and-services.html',
        steps: ['EQUI-VEST&#174; is a deferred annuity that provides for the accumulation of retirement savings and for income.','EQUI-VEST&#174; features tax-deferred growth potential, opportunity for market appreciation and access to account value.','The series offers annuities in the form of Individual Annuities, 403(b)s, 457(b)s, SEPs and SIMPLE IRAs']
        },
        {
        value:'ESA',
        tokens:['Coverdell IRA distribution rules','ESA','ESA Account Rules',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Feducation%2Fcoverdell-savings-account%2Fshould-I-open.html',
        steps: ['A Coverdell education savings account can play an important part in your college savings program.','The main benefit of Coverdell ESAs is tax related.','Specifically, money you withdraw to pay your child\'s college education expenses is completely tax free, including earnings. (Generally, distributions are tax free if they are not more than the beneficiary\'s education expenses for the year.)']
        },
        {
        value:'Estate Planning',
        tokens:['Estate Planning','Estate Transfer',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Festate%2Fintroduction.html',
        steps: ['Estate planning allows you or anyone to implement certain tools now to ensure that your concerns and goals are fulfilled after you die.','Estate planning can be as simple as implementing a will (the cornerstone of any estate plan) and purchasing life insurance, or as complicated as executing trusts and exploring other sophisticated tax and estate planning techniques.','Therefore, estate planning is important whether you are wealthy or whether you have only a small estate. In fact, estate planning may be more important if you have a smaller estate because final expenses will have a greater impact on your estate. Wasting even a single asset may cause your loved ones to suffer from lack of financial resources.']
        },
        {
        value:'Estate Transfer',
        tokens:['Estate Planning','Estate Transfer',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Festate%2Fintroduction.html',
        steps: ['Estate planning allows you or anyone to implement certain tools now to ensure that your concerns and goals are fulfilled after you die.','Estate planning can be as simple as implementing a will (the cornerstone of any estate plan) and purchasing life insurance, or as complicated as executing trusts and exploring other sophisticated tax and estate planning techniques.','Therefore, estate planning is important whether you are wealthy or whether you have only a small estate. In fact, estate planning may be more important if you have a smaller estate because final expenses will have a greater impact on your estate. Wasting even a single asset may cause your loved ones to suffer from lack of financial resources.']
        },
        {
        value:'eDevliery',
        tokens:['eStatement','eDevliery','Paperless','Statements',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fcustomer-service%2Fedelivery%2Foverview.html%3Ftopic%3D345',
        steps: ['With eDelivery you can access your statements and reports online now','First, you choose which documents you want to receive online, and which ones you want to receive by mail. You\'re in control.','Then, when new documents are available we\'ll send you an email notice with a link to the documents. You then log into this website to view, print or download copies.']
        },
        {
        value:'Financial Planning',
        tokens:['Financial Planning',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Ffinancial-planning%2Ffinancial-planning.html',
        steps: ['AXA Equitable Offers A Broad Range Of Products To Help Your Financial Planning.','When implementing your financial planning strategies, you may want to consider tax-deferred investments that can help you take advantage of the asset-building potential of the financial markets.','AXA Equitable is one of the nation\'s leading financial protection companies and a leading provider of life insurance policies and annuities for the implementation phase of your financial planning process.']
        },
        {
        value:'AXA Financial Professionals',
        tokens:['Financial Professionals','AXA Financial Professionals',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Ffinancial-professional%2Ffinancial-professional.html',
        steps: ['A financial professional can also help you choose from the many different investment products on the market, selecting the vehicles that may be most helpful in building wealth while accommodating your tolerance for risk.','When you want a financial professional that can provide access to the capabilities of a national firm, consider AXA Advisors.','AXA Advisors, a subsidiary of AXA Financial, is a member of the global AXA Group and offers financial services and products to individuals and small businesses.']
        },
        {
        value:'Fixed Annuity',
        tokens:['Fixed Annuity',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuity%2Ffixed-annuity.html',
        steps: ['A fixed annuity offers guaranteed income, as the growth of your principal and interest is guaranteed.','Guarantees are based on the claims paying ability of the issuing insurance company.','Assets are not subject to market fluctuations and your principal can never decline in value.']
        },
        {
        value:'Gift Tax Limit',
        tokens:['Gift Limits','Gift Tax Limit','One time cash gift rules.',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Festate%2Fgift-tax.html',
        steps: ['Gifts of cash, investments, and other assets can offer benefits to you as well as your recipients.','The IRS allows you and your spouse to each give up to $14,000 per year to as many people as you like without triggering mandatory filing of IRS Gift Tax Form 706 and possible payment of gift taxes. This limit may be adjusted for inflation in the future.','This can be especially beneficial for people looking to minimize their estate taxes.']
        },
        {
        value:'Group Annuity Retirement Plans',
        tokens:['Group Annuity Retirement Plans',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Ffor-employers%2Fgroup-annuity-products-and-services.html',
        steps: ['As you know, good benefits play a major role in attracting and holding talented employees.','A carefully considered retirement plan is key  not only to keeping your employees happy, but to providing you with a tax-advantaged method of saving for your own retirement.','AXA Equitable offers group Annuity plans to help your employees to help secure a financially sound retirement.']
        },
        {
        value:'Guaranteed Growth Fixed Annuity',
        tokens:['Guaranteed Growth Fixed Annuity',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuity%2Ffixed-annuity.html',
        steps: ['A fixed annuity offers guaranteed income, as the growth of your principal and interest is guaranteed.','Guarantees are based on the claims paying ability of the issuing insurance company.','Assets are not subject to market fluctuations and your principal can never decline in value.']
        },
        {
        value:'Guaranteed Income',
        tokens:['Guaranteed Income',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuity%2Ffixed-annuity.html',
        steps: ['A fixed annuity offers guaranteed income, as the growth of your principal and interest is guaranteed.','Guarantees are based on the claims paying ability of the issuing insurance company.','Assets are not subject to market fluctuations and your principal can never decline in value.']
        },
        {
        value:'Guaranteed Interest Rate',
        tokens:['Guaranteed Interest Rate',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuities%2Fguaranteed-growth%2Fannuity.html',
        steps: ['The Guaranteed Interest Option (GIO) available through the EQUI-VEST&#174;Series of variable deferred annuities represent a building block you can use to help meet your retirement needs.','Each contribution you make to the GIO accumulates at guaranteed rates, which means that you know the exact interest rate your investment is earning.','In addition, the GIO offers you safety of principal backed by the assets of AXA Equitable\'s general account.']
        },
        {
        value:'Guaranteed Minimum Income Benefit',
        tokens:['GMIB','Guaranteed Minimum Income Benefit',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fguaranteed-income%2Fguaranteed-income.html',
        steps: ['Guaranteed Minimum Income Benefit is an annuity option that can guarantee you will receive a minimum value\'s worth of payments over the course of your retirement.','Our Accumulator&#174;deferred annuity with GMIB can offer you a way to help build long-term wealth, guarantee your future income today and protect your family along the way.','When you want more information about guaranteed income annuities or you\'re ready to purchase an annuity product, you\'ll find resources and innovative products on this website.']
        },
        {
        value:'SIPA',
        tokens:['Immediate Annuity','SIPA',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuities%2Fimmediate-annuities.html',
        steps: ['With an immediate annuity you can turn your assets into regular payments beginning now and lasting for the rest of your life or for a specified period of time.','At retirement, you can use distributions from defined contribution plans, 401(k)s or IRAs to fund an immediate annuity and create a personal pension.','Immediate Annuities are not intended to offer liquidity or growth potential.']
        },
        {
        value:'Incentive Life Optimizer¨ II',
        tokens:['Incentive Life Optimizer¨ II',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Funiversal%2Fvariable%2Fincentive-life-optimizer.html',
        steps: ['Incentive Life Optimizer&#174; II is a variable universal life insurance contract with the primary purpose of providing a death benefit.','Incentive Life Optimizer&#174; II offers you the opportunity to direct how a portion of your premium payments are invested among a wide array of stock, bond, international and money market sub-account investment options.','Transfers among the investment options are tax free, as are loans or withdrawals if they are structured properly.']
        },
        {
        value:'Indexed Universal Life Insurance',
        tokens:['Indexed Universal Life Insurance',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Findexed-universal-life-insurance.html',
        steps: ['Indexed universal life insurance combines life insurance protection with equity-linked accumulation potential.','It has some of the same features as universal life, like premium flexibility, but also offers more growth potential, but with less risk than variable universal life insurance.','AXA Equitables\'s Athena Indexed Universal Life<sup>SM</sup> is flexible premium universal life insurance that offers interest crediting linked to major market indexes.']
        },
        {
        value:'Inflation',
        tokens:['Inflation',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finflation%2Finflation.html',
        steps: ['No matter how much money you save through your retirement investing, the threat of rising inflation means that the money you put away for your retirement security today may be worth a lot less in 10 or 20 years.','In fact, at a rate of just 3% inflation, in 15 years the everyday items you buy will cost 50 percent more than what they cost today.','So how can a savvy investor help their retirement savings keep pace with inflation? At AXA Equitable, we have a long history of developing innovative products to help with retirement savings.']
        },
        {
        value:'Interest rates',
        tokens:['Interest rates',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finterest-rates%2Finterest-rates.html',
        steps: ['Today, it is becoming harder to accumulate sufficient assets for retirement.','Longer life expectancies, the possibility of rising inflation and potential tax increases may make it imperative to have retirement income that can adjust with changing interest rates.','AXA Equitable, a leading provider of financial products and services, offers a variable annuity that can help you plan for retirement by providing an option for your retirement income to keep pace with changing interest rates.']
        },
        {
        value:'Investments',
        tokens:['Investments',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvestments%2Fstock-investment-basics.html',
        steps: ['AXA Equitable offers a number of investment products that can help you take the next step toward your financial goals.','For example, AXA Annuities can help you invest to achieve life long income. And AXA\'s 529 plans can work toward funding your child\'s education.','Talk to an AXA Financial Professional to begin your investment planning.']
        },
        {
        value:'IRA',
        tokens:['Can i take money out of my IRA?','Do I need an IRA?','Individual Retirement Account','IRA','IRA Contribution Limit',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Fira%2Funderstanding-iras.html',
        steps: ['Practically anyone can open and contribute to a traditional IRA.','The only requirements are that you must have taxable compensation and be under age 70&#189;.','You can contribute the maximum allowed each year as long as your taxable compensation for the year is at least that amount. If your taxable compensation for the year is below the maximum contribution allowed, you can contribute only up to the amount that you earned.']
        },
        {
        value:'Life Insurance',
        tokens:['Insurance','Life Insurance','Whole Life Insurance',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Foverview.html',
        steps: ['Insurance is an important element of any sound financial plan.','The insurance decisions you make should be based on your family, age, and economic situation. There are many forms of insurance and, unfortunately, no one-size-fits-all policy.','Life insurance, payable when you die, can provide a surviving spouse, children, and other dependents the funds necessary to help maintain their standards of living, can help repay debt, and can help fund education tuition costs.']
        },
        {
        value:'Living will and Trust',
        tokens:['Living will and Trust','What is the difference between a Will and a Trust?',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Festate%2Fliving-will-vs-trust.html',
        steps: ['These two very important estate planning devices are quite different from each other but serve similar purposes.','A living will lets you manage your health-care decisions in case you become incapacitated.','A living trust lets you manage your property in case you become incapacitated.']
        },
        {
        value:'Managed Accounts',
        tokens:['Managed Accounts','SMA',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fmanaged-accounts%2Fmanaged-accounts.html',
        steps: ['As your wealth grows and your financial needs become more complex, managing your investments becomes more complicated.','Separately Managed Accounts are portfolios of investments in which you have direct ownership of each security, and in which the decisions about which securities to buy or sell are delegated to one or more professional money managers.','Separately Managed Accounts combine the advantages of investing directly in the stock market and having a professional money manager oversee your investments on a continuous basis.']
        },
        {
        value:'Manager Select',
        tokens:['Manager Select',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvestments%2Faxa-advisors%2Fmanager-select.html',
        steps: ['AXA Advisors LLC is proud to offer world-class products and services of LPL Financial-one of the leading diversified financial services companies and a leading independent broker/dealer in the nation.','LPL Financial provides industry expertise, independent research, and world-class investment products and platforms to Financial Professionals.','You\'ll enjoy a full range of consulting, advisory and management services for a fixed annual fee.']
        },
        {
        value:'Marriage',
        tokens:['Marriage',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Fmarriage%2Fmarriage.html',
        steps: ['You will probably spend many months planning your wedding. But in all the rush, be sure to find time to plan for the financial partnership your marriage will bring.','Savings and investment accounts, property ownership, insurance and more are now shared opportunities and responsibilities.','They have the potential to draw you closer together, or come between you if you don\'t agree on how to proceed.']
        },
        {
        value:'MONY Life Insurance Company of America',
        tokens:['MLOA','MONY Life Insurance Company of America','MONY Life Insurance Company of America',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Fmony%2Fservice%2Fcontact.html',
        steps: ['You can download the form to file a claim on your MONY/MLOA account at the link below','If you have a question about MONY/MOLA, you may call us toll-free at 1-800-487-6669 for customer service.','Representatives are available during our normal business hours, 8 AM to 7 PM Eastern Time, Monday through Thursday and Friday 8 AM to 5 PM .']
        },
        {
        value:'Model Wealth Portfolios',
        tokens:['Model Wealth Portfolios','MWP',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvestments%2Faxa-advisors%2Fmodel-wealth-portfolios.html',
        steps: ['AXA Advisors LLC is proud to offer world-class products and services of LPL Financial-one of the leading diversified financial services companies and a leading independent broker/dealer in the nation.','LPL Financial provides industry expertise, independent research, and world-class investment products and platforms to Financial Professionals including Model Wealth Portfolios (MWP).','MWPs are built around a process to specifically meet your changing investment needs as your lifestyle and future goals evolve.']
        },
        {
        value:'Modified Endowment Contract',
        tokens:['Modified Endowment Contract','MEC',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Fservice%2Ffaq.html%3Ftopic%3D208',
        steps: ['The federal tax law definition of \"life insurance\" limits your ability to pay certain high levels of premiums.','In addition, if your cumulative premium payments exceed certain amounts specified under the Internal Revenue Code, your policy will become a Modified Endowment Contract (MEC).','If your policy is a MEC, the tax treatment of any death benefit provided under the contract will still qualify for income tax free treatment but you may be subject to additional taxes and penalties on any distributions from your policy during the life of the insured.']
        },
        {
        value:'Mutual Funds',
        tokens:['Mutual Funds',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvestments%2Fmutual-funds.html',
        steps: ['Mutual funds can be an integral part of a sound investment plan because they offer ongoing professional investment management and diversification across a large number of securities.','AXA Equitable\'s Financial Professionals provide access to a broad range of mutual funds with diverse investment objectives and philosophies.','You may choose from thousands of funds from more than 82 fund families, including: AllianceBernstein, BlackRock, Oppenheimer and Transamerica']
        },
        {
        value:'New Job',
        tokens:['New Job',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fjob%2Fa-new-job.html',
        steps: ['In today\'s marketplace, people change jobs and careers more frequently than they used to. Changing jobs can help you to advance a career, explore a new field or acquire new job skills.','On the other hand, corporate downsizing and office re-locations can lead to sudden unemployment. Upper-level executives may sometimes find their options within an organization have become limited, and move on to a new company.','No matter which scenario you face, you would want your finances to make the transition smoothly.']
        },
        {
        value:'Optimum Market Portfolios',
        tokens:['OMP','Optimum Market Portfolios',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvestments%2Faxa-advisors%2Foptimum-market-portfolios.html',
        steps: ['AXA Advisors LLC is proud to offer world-class products and services of LPL Financial-one of the leading diversified financial services companies and a leading independent broker/dealer in the nation.','LPL Financial provides industry expertise, independent research, and world-class investment products and platforms to Financial Professionals including Optimum Market Portfolios (OMP).','The Optimum Market Portfolios account packages a diverse series of mutual funds into a sophisticated asset allocation strategy designed to help meet your financial goals while staying within a risk profile that you have personally created with your AXA Advisors Financial Professional.']
        },
        {
        value:'Personal Wealth Portfolio',
        tokens:['Personal Wealth Portfolio',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvestments%2Faxa-advisors%2Fpersonal-wealth-portfolios.html',
        steps: ['AXA Advisors LLC is proud to offer world-class products and services of LPL Financial-one of the leading diversified financial services companies and a leading independent broker/dealer in the nation.','LPL Financial provides industry expertise, independent research, and world-class investment products and platforms to Financial Professionals including Personal Wealth Portfolios.','The Personal Wealth Portfolios are built around a process designed to allow you, with the assistance of your AXA Advisors Financial Professional, to continually align your portfolio with your financial goals.']
        },
        {
        value:'Premature withdrawals',
        tokens:['Premature withdrawals',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Fira%2Fpremature-distributions.html',
        steps: ['A premature IRA distribution occurs when you take money from your IRA before reaching age 59&#189;.','If you are under 59&#189; and withdraw funds from your traditional IRA, you\'ll probably have to pay a 10 percent penalty tax on the taxable portion of your withdrawal, on top of whatever income taxes you owe on the distribution.','This can be a major drawback for IRA owners who need money and have few other assets to draw on. There are a number of exceptions to this rule, however. You may qualify under one of these exceptions to make penalty-free IRA withdrawals.']
        },
        {
        value:'Profit Sharing Plans',
        tokens:['Profit Sharing Plans',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Fhow-do-company-profit-sharing-plans-work.html',
        steps: ['A profit-sharing plan is a defined contribution plan in which your employer has discretion to determine when and how much the company pays into the plan.','The amount allocated to each individual account is usually based on the salary level of the participant (employee).','Your employer\'s contributions to your account, and any investment earnings, accumulate on a tax-deferred basis--the IRS will tax these benefits as part of your regular income only when you begin receiving distributions from the plan, typically after you retire or terminate employment.']
        },
        {
        value:'Retirement Cornerstone¨',
        tokens:['Cornerstone','Retirement Cornerstone¨',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuities%2Fretirement-cornerstone.html',
        steps: ['A deferred variable annuity, such as Retirement Cornerstone&#174;, is a long-term financial product designed for retirement purposes.','It is a contractual agreement in which payment(s) are made to an insurance company, which agrees to pay out an income or a lump sum amount at a later date.','As your needs change over the years, you can simply transfer assets from the Investment Account to the Protected Benefit Account until age 75.']
        },
        {
        value:'Roth IRA',
        tokens:['Roth IRA',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Fira%2Froth-ira.html',
        steps: ['The Roth IRA presents a potentially attractive alternative to the Traditional IRA long favored by many Americans as a cornerstone in their retirement planning efforts.','That\'s because a Roth IRA allows you to potentially receive tax-free distributions of your retirement funds in return for making nondeductible contributions now.','Unlike Traditional IRAs, contributions to a Roth IRA are nondeductible regardless of your income level or participation in a company-sponsored retirement plan.']
        },
        {
        value:'SIMPLE IRA',
        tokens:['SIMPLE IRA',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Ffor-employers%2Fretirement-plans%2Fequi-vest%2Fsimple.html',
        steps: ['Savings Incentive Match Plan for Employees or SIMPLE is designed for the needs of self-employed individuals and small business owners.','AXA Equitable\'s SIMPLE IRA offering is called EQUI-VEST&#174; SIMPLE IRA. EQUI-VEST&#174; SIMPLE is a cost-effective variable deferred annuity contract that offers your employees a convenient way to contribute and invest for retirement.','Talk to an AXA Financial Professional to begin your retirement planning.']
        },
        {
        value:'SEPs',
        tokens:['SEPs',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Ffor-employers%2Fretirement-plans%2Fequi-vest%2Fsep.html',
        steps: ['Simplified Employee Pension or SEP is designed for the needs of self-employed individuals and small business owners.','AXA Equitable\'s SEP offering is called EQUI-VEST&#174; SEP. EQUI-VEST&#174; SE{ is a cost-effective variable deferred annuity contract that offers your employees a convenient way to contribute and invest for retirement.','Talk to an AXA Financial Professional to begin your retirement planning.']
        },
        {
        value:'Single Premium Deferred Annuity',
        tokens:['Single Premium Deferred Annuity','SPDA',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fcustomer-service%2Fbeneficiary%2FForms-SPDA.html',
        steps: ['You can download the form to file a claim on your SPDA account at the link below','If you have a question about your SPDA, you may call us toll-free at 1-(800) 628-7789 for customer service.','Representatives are available during our normal business hours: Monday through Friday, 9:00 AM to 5:00 PM (Eastern).']
        },
        {
        value:'Social Security Retirement Benefits',
        tokens:['Social Security Retirement Benefits','What age can i retire with Social Security?',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Fsocial-security%2Fretirement-benefits.html',
        steps: ['When you work and pay Social Security taxes (FICA on some pay stubs), you earn Social Security credits.','You can earn up to 4 credits each year. If you were born after 1928, you need 40 credits (10 years of work) to be eligible for retirement benefits.','Your retirement benefit is based on your average earnings over your working career. Higher lifetime earnings result in higher benefits, so if you have some years of no earnings or low earnings, your benefit amount may be lower than if you had worked steadily.']
        },
        {
        value:'Spousal IRA contribution limits',
        tokens:['Spousal IRA contribution limits',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Fira%2Fmake-the-most-of-your-ira.html',
        steps: ['A traditional individual retirement account allows your investment earnings to grow tax deferred until withdrawn, typically at retirement.','Generally, if you have earned income or receive alimony, you can establish as many IRAs as you want prior to the tax year in which you reach age 70&#189;, provided the total of your contributions doesn\'t exceed the limits discussed below.','You and your spouse can each contribute annually up to $5,500 (for 2013) or 100% of your earned income, whichever is less, into an IRA.']
        },
        {
        value:'Stocks',
        tokens:['Stocks',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvestments%2Fstock-investment-basics.html',
        steps: ['Stock represents ownership of a company.','By investing in stock, you stake a claim in the future of that company and all the potential investment return that it may bring. With potential reward, however, you also have all the risks associated with owning a company.','If a company is forced to liquidate, it is first obligated to pay its creditors, bondholders and those who hold preferred stock (a limited issue stock that does not hold voting rights), before those who own common stock.']
        },
        {
        value:'Strategic Asset Management',
        tokens:['Strategic Asset Management','SAM',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Finvestments%2Faxa-advisors%2Fstrategic-asset-management.html',
        steps: ['Strategic Asset Management (SAM) is a fee-based investment advisory program, providing you with a customized investment portfolio developed in conjunction with your AXA Advisors Financial Professional.','Together, you and your AXA Advisors Financial Professional will map out an investment plan that\'s tailored to your goals, risk tolerance and time horizon.','Talk to an AXA Financial Professional to begin your retirement planning.']
        },
        {
        value:'Structured Capital Strategies SM',
        tokens:['Structured Capital Strategies SM',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fannuities%2Fstructured-capital-strategies%2Fannuity.html',
        steps: ['Are you worried about the market? Are you concerned that you may not meet your retirement goals? You are not alone. Many people share the same apprehension.','AXA Equitable can help you get back into equities with Structured Capital Strategies.','Structured Capital Strategies is a variable and index-linked deferred annuity contract and is a long-term financial product designed for retirement purposes. Simply stated, a variable annuity is a contract between you and an insurance company that lets you pursue the accumulation of assets through equities and other investment options. You may then take payments or lump sum amount at a later date.']
        },
        {
        value:'Survivorship Life Insurance',
        tokens:['Survivorship Life Insurance','Second to die','Second-to-die',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Fsurvivorship-life-insurance.html',
        steps: ['Survivorship life insurance (\"second-to-die\" or survivor insurance) provides one policy that insures the lives of two people, usually spouses.','No proceeds are paid when the first spouse dies.','The policy remains in effect and premiums may need to be paid. The death benefit is not paid to the beneficiary until the death of the second insured.']
        },
        {
        value:'Tax of Insurance',
        tokens:['Tax of Insurance','Withdrawals','Withdrawing money from 401(k) accounts',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Fplan%2Ftax-free-withdrawals.html',
        steps: ['First of all, certain types of cash value life insurance policies (e.g., universal and traditional whole life policies) may not allow you to withdraw from your cash value at all.','If your policy does allow such withdrawals, any withdrawal you make will typically be tax free up to your basis in the policy.','Your basis is the amount of premiums you have paid into the policy, minus any prior dividends paid or previous withdrawals. You already paid income tax on those dollars once, so they won\'t be taxed again when you withdraw them from the policy.']
        },
        {
        value:'Term Life Insurance',
        tokens:['Term Life Insurance',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Fterm-life-insurance.html',
        steps: ['Term Life is the simplest form of life insurance','A Term policy provides death benefit coverage for a specific period of time.','If your insurance need is projected for a certain number of years, for example, until a debt is paid off, or if cost is a prime consideration, Term may be right for you.']
        },
        {
        value:'Uniform Gifts to Minors Act',
        tokens:['UGMA rules','Uniform Gifts to Minors Act','Uniform Transfers to Minors Act','UTMA tax rules',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Feducation%2Fcan-UGMA-UTMA-account-reduce-financial-aid.html',
        steps: ['An UGMA/UTMA account is a custodial account used to transfer wealth to your children under a state\'s Uniform Gifts to Minors Act (UGMA) or Uniform Transfers to Minors Act (UTMA).','Under the current federal formula, children must contribute 20 percent of their assets to college costs each year before becoming eligible for financial aid, while parents must contribute only 5.6 percent of their assets.','As a result of this formula, any asset that your child holds, including an UGMA/UTMA account, will always translate into a higher monetary contribution to college costs than if the same asset were in your hands']
        },
        {
        value:'Uniform Transfers to Minors Act',
        tokens:['UGMA rules','Uniform Gifts to Minors Act','Uniform Transfers to Minors Act','UTMA tax rules',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fplan%2Feducation%2Fcan-UGMA-UTMA-account-reduce-financial-aid.html',
        steps: ['An UGMA/UTMA account is a custodial account used to transfer wealth to your children under a state\'s Uniform Gifts to Minors Act (UGMA) or Uniform Transfers to Minors Act (UTMA).','Under the current federal formula, children must contribute 20 percent of their assets to college costs each year before becoming eligible for financial aid, while parents must contribute only 5.6 percent of their assets.','As a result of this formula, any asset that your child holds, including an UGMA/UTMA account, will always translate into a higher monetary contribution to college costs than if the same asset were in your hands']
        },
        {
        value:'Universal Life Insurance',
        tokens:['Universal Life Insurance',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Funiversal-life-insurance.html',
        steps: ['Universal Life Insurance is permanent insurance that provides protection in case of death, as well as a savings or cash value component.','The cash value of a universal life policy is based on the amount of premiums you pay, the declared interest crediting rate and the policy charges.','Unlike Term Life insurance or Whole Life insurance flexible premium universal life policies permit flexibility in the amount and timing of premium payments (within limits),']
        },
        {
        value:'Variable Universal Life Insurance',
        tokens:['Variable Universal Life Insurance',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Fvariable-universal-life-insurance.html',
        steps: ['Variable universal life insurance combines insurance protection with investment opportunity.','It has the same premium flexibility as Universal Life, but offers a range of investment choices.','Choice of investment options means more control, but also more investment risk than Whole Life or Universal Life']
        },
        {
        value:'Variable Whole Life Insurance',
        tokens:['Variable Whole Life Insurance',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Flife-insurance%2Fvariable-life-insurance.html',
        steps: ['Basic Variable Whole Life Insurance, like Whole Life insurance, provides permanent protection and requires scheduled premium payments, but offers a wide range of investment choices.','Variable Whole Life Insurance offers greater growth potential than Whole Life insurance, because you have the opportunity to invest in a variety of different portfolios.','While you have more growth potential with Variable Whole Life insurance, you also are subject to more investment risk than with either Whole Life insurance or Universal Life insurance.']
        },
        {
        value:'Wealth Management',
        tokens:['Wealth Management',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fwealth-management%2Fwealth-management.html',
        steps: ['Effective wealth management is an important part of achieving your financial goals.','One key to wealth management is selecting the life insurance, annuity and investment products and services that can help you implement your financial plan.','An experienced, qualified financial professional can help you assess your needs and goals, and suggest investment products, life insurance and annuities to help you address the realities of managing your investments and financial protection needs.']
        },
        {
        value:'What is vesting?',
        tokens:['Stock Vestings','What is vesting?',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Fretirement%2Fwhat-is-vesting.html',
        steps: ['Vesting occurs when you acquire ownership.','For example, your employer grants you 10,000 stock options as a thank-you for a job well done, but it may not be time to go mansion shopping just yet. The options may not actually be yours until you\'re vested.','If the options are subject to a vesting schedule, you don\'t actually own the right to exercise your options until some time in the future. Some stock option plans allow for immediate vesting, while others may delay vesting.']
        },
        {
        value:'Who is AXA-Equitable?',
        tokens:['Who is AXA-Equitable?',],
        myURL: 'http%3A%2F%2Fwww.axa-equitable.com%2Faxa%2Fabout-axa-equitable.html',
        steps: ['AXA Equitable Life Insurance Company has been inn business since 1859.','Headquartered in New York, NY, AXA Equitable is a leading financial protection company and a premier provider of life insurance, annuities and related financial services.','AXA Equitable\'s assets under management totaled $519.3 billion as of June 30, 2013.']
        },
      ]

    }).on('typeahead:selected', function (obj, datum) {

    for(i=0; i<datum.steps.length; i++){
      noSlash = datum.steps[i].replace(/\\\//g, "");
      var step = i + 1;
      $('.typeahead-info-wrap').fadeIn('slow');
      $("#step"+(i+1)).empty().append('<div class="circle">' + step + '</div>' + noSlash);
      $("#step"+(i+1)).show();
    }

    $("#mybutton").show();
    $("#mylink").attr('href', datum.myURL);
});

    $(document).ready(function() {
      $(window).resize(function() {
          if ($(window).width() < 768) {
            $('.axaterms').attr('placeholder', "I'm interested in...");
          } else if ($(window).width() > 768) {
            $('.axaterms').attr('placeholder', "What are you interested in? ex: Mutual Funds");
          }
      });

      if (window.innerWidth < 768) {
        $('.axaterms').attr('placeholder', "I'm interested in...");
      }
    });
$(document).ready(function() {
  var left = $('#carousel .left');
  var right = $('#carousel .right');

  $(window).resize(function() {
    if ($(window).width() < 992) {
      right.on('click', function() {
        var activeItem = $('#home-carousel-small .carousel-inner').children('.active').next();
        var nextItem = activeItem.next().length === 1;
        var prevItem = activeItem.prev().length === 1;
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        	var ieversion=new Number(RegExp.$1) 
        	if (ieversion<9){
      		activeItem.prev().removeClass('active');
      
      		activeItem.addClass('active');
      		}
      }
      
        if (!nextItem){
          right.fadeOut('fast');
        } else {
          right.fadeIn('fast');
        }
        if (!prevItem) {
          left.fadeOut('fast');
        } else {
          left.fadeIn('fast');
        }
        return 0;
      });
      left.on('click', function() {
        var activeItem = $('#home-carousel-small .carousel-inner').children('.active').prev();
        var nextItem = activeItem.next().length === 1;
        var prevItem = activeItem.prev().length === 1;
       if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        	var ieversion=new Number(RegExp.$1) 
        	if (ieversion<9){ 
      activeItem.next().removeClass('active');
      
      activeItem.addClass('active');
      }
      }
      
        if (!nextItem){
          right.fadeOut('fast');
        } else {
          right.fadeIn('fast');
        }
        if (!prevItem) {
          left.fadeOut('fast');
        } else {
          left.fadeIn('fast');
        }
        return 0;
      });


      if ($(window).width() < 748) {
        $('.item .col-xs-10').addClass('clearfix');
        $('.item .col-xs-10').addClass('col-xs-offset-1');
        $('.item .col-xs-8').addClass('col-xs-offset-2');
      } else {
        $('.item .col-xs-10').removeClass('clearfix');
        $('.item .col-xs-10').removeClass('col-xs-offset-1');
        $('.item .col-xs-8').removeClass('col-xs-offset-2');
      }
      left.attr('href','#home-carousel-small');
      right.attr('href','#home-carousel-small');
    } else if ($(window).width() > 992) {
      right.on('click', function() {
        var activeItem = $('#home-carousel-large .carousel-inner').children('.active').next();
        var nextItem = activeItem.next().length === 1;
        var prevItem = activeItem.prev().length === 1;
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        	var ieversion=new Number(RegExp.$1) 
        	if (ieversion<9){
      activeItem.prev().removeClass('active');
      
      activeItem.addClass('active');
      }
      }
        if (!nextItem){
          right.fadeOut('fast');
        } else {
          right.fadeIn('fast');
        }
        if (!prevItem) {
          left.fadeOut('fast');
        } else {
          left.fadeIn('fast');
        }
      });
      left.on('click', function() {
        var activeItem = $('#home-carousel-large .carousel-inner').children('.active').prev();
        var nextItem = activeItem.next().length === 1;
        var prevItem = activeItem.prev().length === 1;
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        	var ieversion=new Number(RegExp.$1) 
        	if (ieversion<9){
      activeItem.next().removeClass('active');
      
      activeItem.addClass('active');
      }
      }
        if (!nextItem){
          right.fadeOut('fast');
        } else {
          right.fadeIn('fast');
        }
        if (!prevItem) {
          left.fadeOut('fast');
        } else {
          left.fadeIn('fast');
        }
      });

      left.attr('href','#home-carousel-large');
      right.attr('href','#home-carousel-large');
      $('.item .col-xs-10').removeClass('clearfix');
      $('.item .col-xs-10').removeClass('col-xs-offset-1');
      $('.item .col-xs-8').removeClass('col-xs-offset-2');
    }
  });
  if ($(window).width() > 992) {

    left.hide();
    right.on('click', function() {
      var activeItem = $('#home-carousel-large .carousel-inner').children('.active').next();
      var nextItem = activeItem.next().length === 1;
      var prevItem = activeItem.prev().length === 1;
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        	var ieversion=new Number(RegExp.$1) 
        	if (ieversion<9){
      activeItem.prev().removeClass('active');
     
      activeItem.addClass('active');
      }
      }
      if (!nextItem){
        right.fadeOut('fast');
      } else {
        right.fadeIn('fast');
      }
      if (!prevItem) {
        left.fadeOut('fast');
      } else {
        left.fadeIn('fast');
      }
    });
    left.on('click', function() {
      var activeItem = $('#home-carousel-large .carousel-inner').children('.active').prev();
      var nextItem = activeItem.next().length === 1;
      var prevItem = activeItem.prev().length === 1;
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        	var ieversion=new Number(RegExp.$1) 
        	if (ieversion<9){
      activeItem.next().removeClass('active');
      
      activeItem.addClass('active');
      }
      }
      if (!nextItem){
        right.fadeOut('fast');
      } else {
        right.fadeIn('fast');
      }
      if (!prevItem) {
        left.fadeOut('fast');
      } else {
        left.fadeIn('fast');
      }
    });

    left.attr('href','#home-carousel-large');
    right.attr('href','#home-carousel-large');
    $('.item .col-xs-10').removeClass('clearfix');
    $('.item .col-xs-10').removeClass('col-xs-offset-1');
    $('.item .col-xs-8').removeClass('col-xs-offset-2');
  } else {
    left.hide();
    right.on('click', function() {
      var activeItem = $('#home-carousel-small .carousel-inner').children('.active').next();
      var nextItem = activeItem.next().length === 1;
      var prevItem = activeItem.prev().length === 1;
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        	var ieversion=new Number(RegExp.$1) 
        	if (ieversion<9){
      activeItem.prev().removeClass('active');
     
      activeItem.addClass('active');
      }
      }
      if (!nextItem){
        right.fadeOut('fast');
      } else {
        right.fadeIn('fast');
      }
      if (!prevItem) {
        left.fadeOut('fast');
      } else {
        left.fadeIn('fast');
      }
      return 0;
    });
    left.on('click', function() {
      var activeItem = $('#home-carousel-small .carousel-inner').children('.active').prev();
      var nextItem = activeItem.next().length === 1;
      var prevItem = activeItem.prev().length === 1;
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        	var ieversion=new Number(RegExp.$1) 
        	if (ieversion<9){
      activeItem.next().removeClass('active');
     
      activeItem.addClass('active');
      }
      }
      if (!nextItem){
        right.fadeOut('fast');
      } else {
        right.fadeIn('fast');
      }
      if (!prevItem) {
        left.fadeOut('fast');
      } else {
        left.fadeIn('fast');
      }
      return 0;
    });

    if ($(window).width() < 748) {
      $('.item .col-xs-10').addClass('clearfix');
      $('.item .col-xs-10').addClass('col-xs-offset-1');
      $('.item .col-xs-8').addClass('col-xs-offset-2');
    } else {
      $('.item .col-xs-10').removeClass('clearfix', 'col-xs-offset-1');
      $('.item .col-xs-10').removeClass('col-xs-offset-1');
      $('.item .col-xs-8').removeClass('col-xs-offset-2');
    }
    left.attr('href','#home-carousel-small');
    right.attr('href','#home-carousel-small');
  }

}); 
/*!
 * Expander - v1.4.7 - 2013-08-30
 * http://plugins.learningjquery.com/expander/
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function($) {
  $.expander = {
    version: '1.4.7',
    defaults: {
      // the number of characters at which the contents will be sliced into two parts.
      slicePoint: 100,

      // whether to keep the last word of the summary whole (true) or let it slice in the middle of a word (false)
      preserveWords: true,

      // a threshold of sorts for whether to initially hide/collapse part of the element's contents.
      // If after slicing the contents in two there are fewer words in the second part than
      // the value set by widow, we won't bother hiding/collapsing anything.
      widow: 4,

      // text displayed in a link instead of the hidden part of the element.
      // clicking this will expand/show the hidden/collapsed text
      expandText: 'read more',
      expandPrefix: '&hellip; ',

      expandAfterSummary: false,

      // class names for summary element and detail element
      summaryClass: 'summary',
      detailClass: 'details',

      // class names for <span> around "read-more" link and "read-less" link
      moreClass: 'read-more',
      lessClass: 'read-less',

      // number of milliseconds after text has been expanded at which to collapse the text again.
      // when 0, no auto-collapsing
      collapseTimer: 0,

      // effects for expanding and collapsing
      expandEffect: 'slideDown',
      expandSpeed: 250,
      collapseEffect: 'slideUp',
      collapseSpeed: 200,

      // allow the user to re-collapse the expanded text.
      userCollapse: true,

      // text to use for the link to re-collapse the text
      userCollapseText: 'read less',
      userCollapsePrefix: ' ',


      // all callback functions have the this keyword mapped to the element in the jQuery set when .expander() is called

      onSlice: null, // function() {}
      beforeExpand: null, // function() {},
      afterExpand: null, // function() {},
      onCollapse: null, // function(byUser) {}
      afterCollapse: null // function() {}
    }
  };

  $.fn.expander = function(options) {
    var meth = 'init';

    if (typeof options === 'string') {
      meth = options;
      options = {};
    }

    var opts = $.extend({}, $.expander.defaults, options),
        rSelfClose = /^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,
        rAmpWordEnd = opts.wordEnd || /(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+)$/,
        rOpenCloseTag = /<\/?(\w+)[^>]*>/g,
        rOpenTag = /<(\w+)[^>]*>/g,
        rCloseTag = /<\/(\w+)>/g,
        rLastCloseTag = /(<\/[^>]+>)\s*$/,
        rTagPlus = /^(<[^>]+>)+.?/,
        delayedCollapse;

    var methods = {
      init: function() {
        this.each(function() {
          var i, l, tmp, newChar, summTagless, summOpens, summCloses,
              lastCloseTag, detailText, detailTagless, html, expand,
              $thisDetails, $readMore,
              openTagsForDetails = [],
              closeTagsForsummaryText = [],
              defined = {},
              thisEl = this,
              $this = $(this),
              $summEl = $([]),
              o = $.extend({}, opts, $this.data('expander') || $.meta && $this.data() || {}),
              hasDetails = !!$this.find('.' + o.detailClass).length,
              hasBlocks = !!$this.find('*').filter(function() {
                var display = $(this).css('display');
                return (/^block|table|list/).test(display);
              }).length,
              el = hasBlocks ? 'div' : 'span',
              detailSelector = el + '.' + o.detailClass,
              moreClass = o.moreClass + '',
              lessClass = o.lessClass + '',
              expandSpeed = o.expandSpeed || 0,
              allHtml = $.trim( $this.html() ),
              allText = $.trim( $this.text() ),
              summaryText = allHtml.slice(0, o.slicePoint);

          // allow multiple classes for more/less links
          o.moreSelector = 'span.' + moreClass.split(' ').join('.');
          o.lessSelector = 'span.' + lessClass.split(' ').join('.');
          // bail out if we've already set up the expander on this element
          if ( $.data(this, 'expanderInit') ) {
            return;
          }

          $.data(this, 'expanderInit', true);
          $.data(this, 'expander', o);
          // determine which callback functions are defined
          $.each(['onSlice','beforeExpand', 'afterExpand', 'onCollapse', 'afterCollapse'], function(index, val) {
            defined[val] = $.isFunction(o[val]);
          });

          // back up if we're in the middle of a tag or word
          summaryText = backup(summaryText);

          // summary text sans tags length
          summTagless = summaryText.replace(rOpenCloseTag, '').length;

          // add more characters to the summary, one for each character in the tags
          while (summTagless < o.slicePoint) {
            newChar = allHtml.charAt(summaryText.length);
            if (newChar === '<') {
              newChar = allHtml.slice(summaryText.length).match(rTagPlus)[0];
            }
            summaryText += newChar;
            summTagless++;
          }

          summaryText = backup(summaryText, o.preserveWords);

          // separate open tags from close tags and clean up the lists
          summOpens = summaryText.match(rOpenTag) || [];
          summCloses = summaryText.match(rCloseTag) || [];

          // filter out self-closing tags
          tmp = [];
          $.each(summOpens, function(index, val) {
            if ( !rSelfClose.test(val) ) {
              tmp.push(val);
            }
          });
          summOpens = tmp;

          // strip close tags to just the tag name
          l = summCloses.length;
          for (i = 0; i < l; i++) {
            summCloses[i] = summCloses[i].replace(rCloseTag, '$1');
          }

          // tags that start in summary and end in detail need:
          // a). close tag at end of summary
          // b). open tag at beginning of detail
          $.each(summOpens, function(index, val) {
            var thisTagName = val.replace(rOpenTag, '$1');
            var closePosition = $.inArray(thisTagName, summCloses);
            if (closePosition === -1) {
              openTagsForDetails.push(val);
              closeTagsForsummaryText.push('</' + thisTagName + '>');

            } else {
              summCloses.splice(closePosition, 1);
            }
          });

          // reverse the order of the close tags for the summary so they line up right
          closeTagsForsummaryText.reverse();

          // create necessary summary and detail elements if they don't already exist
          if ( !hasDetails ) {

            // end script if there is no detail text or if detail has fewer words than widow option
            detailText = allHtml.slice(summaryText.length);
            detailTagless = $.trim( detailText.replace(rOpenCloseTag, '') );

            if ( detailTagless === '' || detailTagless.split(/\s+/).length < o.widow ) {
              return;
            }
            // otherwise, continue...
            lastCloseTag = closeTagsForsummaryText.pop() || '';
            summaryText += closeTagsForsummaryText.join('');
            detailText = openTagsForDetails.join('') + detailText;

          } else {
            // assume that even if there are details, we still need readMore/readLess/summary elements
            // (we already bailed out earlier when readMore el was found)
            // but we need to create els differently

            // remove the detail from the rest of the content
            detailText = $this.find(detailSelector).remove().html();

            // The summary is what's left
            summaryText = $this.html();

            // allHtml is the summary and detail combined (this is needed when content has block-level elements)
            allHtml = summaryText + detailText;

            lastCloseTag = '';
          }
          o.moreLabel = $this.find(o.moreSelector).length ? '' : buildMoreLabel(o);

          if (hasBlocks) {
            detailText = allHtml;
          }
          summaryText += lastCloseTag;

          // onSlice callback
          o.summary = summaryText;
          o.details = detailText;
          o.lastCloseTag = lastCloseTag;

          if (defined.onSlice) {
            // user can choose to return a modified options object
            // one last chance for user to change the options. sneaky, huh?
            // but could be tricky so use at your own risk.
            tmp = o.onSlice.call(thisEl, o);

          // so, if the returned value from the onSlice function is an object with a details property, we'll use that!
            o = tmp && tmp.details ? tmp : o;
          }

          // build the html with summary and detail and use it to replace old contents
          html = buildHTML(o, hasBlocks);

          $this.html( html );

          // set up details and summary for expanding/collapsing
          $thisDetails = $this.find(detailSelector);
          $readMore = $this.find(o.moreSelector);

          // Hide details span using collapseEffect unless
          // expandEffect is NOT slideDown and collapseEffect IS slideUp.
          // The slideUp effect sets span's "default" display to
          // inline-block. This is necessary for slideDown, but
          // problematic for other "showing" animations.
          // Fixes #46
          if (o.collapseEffect === 'slideUp' && o.expandEffect !== 'slideDown' || $this.is(':hidden')) {
            $thisDetails.css({display: 'none'});
          } else {
            $thisDetails[o.collapseEffect](0);
          }

          $summEl = $this.find('div.' + o.summaryClass);

          expand = function(event) {
            event.preventDefault();
            $readMore.hide();
            $summEl.hide();
            if (defined.beforeExpand) {
              o.beforeExpand.call(thisEl);
            }

            $thisDetails.stop(false, true)[o.expandEffect](expandSpeed, function() {
              $thisDetails.css({zoom: ''});
              if (defined.afterExpand) {o.afterExpand.call(thisEl);}
              delayCollapse(o, $thisDetails, thisEl);
            });
          };

          $readMore.find('a').unbind('click.expander').bind('click.expander', expand);

          if ( o.userCollapse && !$this.find(o.lessSelector).length ) {
            $this
            .find(detailSelector)
            .append('<span class="' + o.lessClass + '">' + o.userCollapsePrefix + '<a href="#">' + o.userCollapseText + '</a></span>');
          }

          $this
          .find(o.lessSelector + ' a')
          .unbind('click.expander')
          .bind('click.expander', function(event) {
            event.preventDefault();
            clearTimeout(delayedCollapse);
            var $detailsCollapsed = $(this).closest(detailSelector);
            reCollapse(o, $detailsCollapsed);
            if (defined.onCollapse) {
              o.onCollapse.call(thisEl, true);
            }
          });

        }); // this.each
      },
      destroy: function() {

        this.each(function() {
          var o, details,
              $this = $(this);

          if ( !$this.data('expanderInit') ) {
            return;
          }

          o = $.extend({}, $this.data('expander') || {}, opts);
          details = $this.find('.' + o.detailClass).contents();

          $this.removeData('expanderInit');
          $this.removeData('expander');

          $this.find(o.moreSelector).remove();
          $this.find('.' + o.summaryClass).remove();
          $this.find('.' + o.detailClass).after(details).remove();
          $this.find(o.lessSelector).remove();

        });
      }
    };

    // run the methods (almost always "init")
    if ( methods[meth] ) {
      methods[ meth ].call(this);
    }

    // utility functions
    function buildHTML(o, blocks) {
      var el = 'span',
          summary = o.summary;
      if ( blocks ) {
        el = 'div';
        // if summary ends with a close tag, tuck the moreLabel inside it
        if ( rLastCloseTag.test(summary) && !o.expandAfterSummary) {
          summary = summary.replace(rLastCloseTag, o.moreLabel + '$1');
        } else {
        // otherwise (e.g. if ends with self-closing tag) just add moreLabel after summary
        // fixes #19
          summary += o.moreLabel;
        }

        // and wrap it in a div
        summary = '<div class="' + o.summaryClass + '">' + summary + '</div>';
      } else {
        summary += o.moreLabel;
      }

      return [
        summary,
        ' <',
          el + ' class="' + o.detailClass + '"',
        '>',
          o.details,
        '</' + el + '>'
        ].join('');
    }

    function buildMoreLabel(o) {
      var ret = '<span class="' + o.moreClass + '">' + o.expandPrefix;
      ret += '<a href="#">' + o.expandText + '</a></span>';
      return ret;
    }

    function backup(txt, preserveWords) {
      if ( txt.lastIndexOf('<') > txt.lastIndexOf('>') ) {
        txt = txt.slice( 0, txt.lastIndexOf('<') );
      }
      if (preserveWords) {
        txt = txt.replace(rAmpWordEnd,'');
      }

      return $.trim(txt);
    }

    function reCollapse(o, el) {
      el.stop(true, true)[o.collapseEffect](o.collapseSpeed, function() {
        var prevMore = el.prev('span.' + o.moreClass).show();
        if (!prevMore.length) {
          el.parent().children('div.' + o.summaryClass).show()
            .find('span.' + o.moreClass).show();
        }
        if (o.afterCollapse) {o.afterCollapse.call(el);}
      });
    }

    function delayCollapse(option, $collapseEl, thisEl) {
      if (option.collapseTimer) {
        delayedCollapse = setTimeout(function() {
          reCollapse(option, $collapseEl);
          if ( $.isFunction(option.onCollapse) ) {
            option.onCollapse.call(thisEl, false);
          }
        }, option.collapseTimer);
      }
    }

    return this;
  };

  // plugin defaults
  $.fn.expander.defaults = $.expander.defaults;
})(jQuery);

// you can override default options globally, so they apply to every .expander() call
$(document).ready(function() {
 $('.expandable').expander({
    slicePoint:       200,  // default is 100
    preserveWords: true,
    expandPrefix:     ' ', // default is '... '
    expandText:       '...read more', // default is 'read more'
    collapseTimer:    0, // re-collapses after 5 seconds; default is 0, so no re-collapsing
    userCollapseText: 'read less'  // default is 'read less'
  });

 });
/*! jCarousel - v0.3.0 - 2013-11-22
* http://sorgalla.com/jcarousel
* Copyright (c) 2013 Jan Sorgalla; Licensed MIT */
(function(t){"use strict";var i=t.jCarousel={};i.version="0.3.0";var s=/^([+\-]=)?(.+)$/;i.parseTarget=function(t){var i=!1,e="object"!=typeof t?s.exec(t):null;return e?(t=parseInt(e[2],10)||0,e[1]&&(i=!0,"-="===e[1]&&(t*=-1))):"object"!=typeof t&&(t=parseInt(t,10)||0),{target:t,relative:i}},i.detectCarousel=function(t){for(var i;t.length>0;){if(i=t.filter("[data-jcarousel]"),i.length>0)return i;if(i=t.find("[data-jcarousel]"),i.length>0)return i;t=t.parent()}return null},i.base=function(s){return{version:i.version,_options:{},_element:null,_carousel:null,_init:t.noop,_create:t.noop,_destroy:t.noop,_reload:t.noop,create:function(){return this._element.attr("data-"+s.toLowerCase(),!0).data(s,this),!1===this._trigger("create")?this:(this._create(),this._trigger("createend"),this)},destroy:function(){return!1===this._trigger("destroy")?this:(this._destroy(),this._trigger("destroyend"),this._element.removeData(s).removeAttr("data-"+s.toLowerCase()),this)},reload:function(t){return!1===this._trigger("reload")?this:(t&&this.options(t),this._reload(),this._trigger("reloadend"),this)},element:function(){return this._element},options:function(i,s){if(0===arguments.length)return t.extend({},this._options);if("string"==typeof i){if(s===void 0)return this._options[i]===void 0?null:this._options[i];this._options[i]=s}else this._options=t.extend({},this._options,i);return this},carousel:function(){return this._carousel||(this._carousel=i.detectCarousel(this.options("carousel")||this._element),this._carousel||t.error('Could not detect carousel for plugin "'+s+'"')),this._carousel},_trigger:function(i,e,r){var n,o=!1;return r=[this].concat(r||[]),(e||this._element).each(function(){n=t.Event((s+":"+i).toLowerCase()),t(this).trigger(n,r),n.isDefaultPrevented()&&(o=!0)}),!o}}},i.plugin=function(s,e){var r=t[s]=function(i,s){this._element=t(i),this.options(s),this._init(),this.create()};return r.fn=r.prototype=t.extend({},i.base(s),e),t.fn[s]=function(i){var e=Array.prototype.slice.call(arguments,1),n=this;return"string"==typeof i?this.each(function(){var r=t(this).data(s);if(!r)return t.error("Cannot call methods on "+s+" prior to initialization; "+'attempted to call method "'+i+'"');if(!t.isFunction(r[i])||"_"===i.charAt(0))return t.error('No such method "'+i+'" for '+s+" instance");var o=r[i].apply(r,e);return o!==r&&o!==void 0?(n=o,!1):void 0}):this.each(function(){var e=t(this).data(s);e instanceof r?e.reload(i):new r(this,i)}),n},r}})(jQuery),function(t,i){"use strict";var s=function(t){return parseFloat(t)||0};t.jCarousel.plugin("jcarousel",{animating:!1,tail:0,inTail:!1,resizeTimer:null,lt:null,vertical:!1,rtl:!1,circular:!1,underflow:!1,relative:!1,_options:{list:function(){return this.element().children().eq(0)},items:function(){return this.list().children()},animation:400,transitions:!1,wrap:null,vertical:null,rtl:null,center:!1},_list:null,_items:null,_target:null,_first:null,_last:null,_visible:null,_fullyvisible:null,_init:function(){var t=this;return this.onWindowResize=function(){t.resizeTimer&&clearTimeout(t.resizeTimer),t.resizeTimer=setTimeout(function(){t.reload()},100)},this},_create:function(){this._reload(),t(i).on("resize.jcarousel",this.onWindowResize)},_destroy:function(){t(i).off("resize.jcarousel",this.onWindowResize)},_reload:function(){this.vertical=this.options("vertical"),null==this.vertical&&(this.vertical=this.list().height()>this.list().width()),this.rtl=this.options("rtl"),null==this.rtl&&(this.rtl=function(i){if("rtl"===(""+i.attr("dir")).toLowerCase())return!0;var s=!1;return i.parents("[dir]").each(function(){return/rtl/i.test(t(this).attr("dir"))?(s=!0,!1):void 0}),s}(this._element)),this.lt=this.vertical?"top":"left",this.relative="relative"===this.list().css("position"),this._list=null,this._items=null;var i=this._target&&this.index(this._target)>=0?this._target:this.closest();this.circular="circular"===this.options("wrap"),this.underflow=!1;var s={left:0,top:0};return i.length>0&&(this._prepare(i),this.list().find("[data-jcarousel-clone]").remove(),this._items=null,this.underflow=this._fullyvisible.length>=this.items().length,this.circular=this.circular&&!this.underflow,s[this.lt]=this._position(i)+"px"),this.move(s),this},list:function(){if(null===this._list){var i=this.options("list");this._list=t.isFunction(i)?i.call(this):this._element.find(i)}return this._list},items:function(){if(null===this._items){var i=this.options("items");this._items=(t.isFunction(i)?i.call(this):this.list().find(i)).not("[data-jcarousel-clone]")}return this._items},index:function(t){return this.items().index(t)},closest:function(){var i,e=this,r=this.list().position()[this.lt],n=t(),o=!1,l=this.vertical?"bottom":this.rtl&&!this.relative?"left":"right";return this.rtl&&this.relative&&!this.vertical&&(r+=this.list().width()-this.clipping()),this.items().each(function(){if(n=t(this),o)return!1;var a=e.dimension(n);if(r+=a,r>=0){if(i=a-s(n.css("margin-"+l)),!(0>=Math.abs(r)-a+i/2))return!1;o=!0}}),n},target:function(){return this._target},first:function(){return this._first},last:function(){return this._last},visible:function(){return this._visible},fullyvisible:function(){return this._fullyvisible},hasNext:function(){if(!1===this._trigger("hasnext"))return!0;var t=this.options("wrap"),i=this.items().length-1;return i>=0&&(t&&"first"!==t||i>this.index(this._last)||this.tail&&!this.inTail)?!0:!1},hasPrev:function(){if(!1===this._trigger("hasprev"))return!0;var t=this.options("wrap");return this.items().length>0&&(t&&"last"!==t||this.index(this._first)>0||this.tail&&this.inTail)?!0:!1},clipping:function(){return this._element["inner"+(this.vertical?"Height":"Width")]()},dimension:function(t){return t["outer"+(this.vertical?"Height":"Width")](!0)},scroll:function(i,s,e){if(this.animating)return this;if(!1===this._trigger("scroll",null,[i,s]))return this;t.isFunction(s)&&(e=s,s=!0);var r=t.jCarousel.parseTarget(i);if(r.relative){var n,o,l,a,h,u,c,f,d=this.items().length-1,_=Math.abs(r.target),p=this.options("wrap");if(r.target>0){var v=this.index(this._last);if(v>=d&&this.tail)this.inTail?"both"===p||"last"===p?this._scroll(0,s,e):t.isFunction(e)&&e.call(this,!1):this._scrollTail(s,e);else if(n=this.index(this._target),this.underflow&&n===d&&("circular"===p||"both"===p||"last"===p)||!this.underflow&&v===d&&("both"===p||"last"===p))this._scroll(0,s,e);else if(l=n+_,this.circular&&l>d){for(f=d,h=this.items().get(-1);l>f++;)h=this.items().eq(0),u=this._visible.index(h)>=0,u&&h.after(h.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(h),u||(c={},c[this.lt]=this.dimension(h),this.moveBy(c)),this._items=null;this._scroll(h,s,e)}else this._scroll(Math.min(l,d),s,e)}else if(this.inTail)this._scroll(Math.max(this.index(this._first)-_+1,0),s,e);else if(o=this.index(this._first),n=this.index(this._target),a=this.underflow?n:o,l=a-_,0>=a&&(this.underflow&&"circular"===p||"both"===p||"first"===p))this._scroll(d,s,e);else if(this.circular&&0>l){for(f=l,h=this.items().get(0);0>f++;){h=this.items().eq(-1),u=this._visible.index(h)>=0,u&&h.after(h.clone(!0).attr("data-jcarousel-clone",!0)),this.list().prepend(h),this._items=null;var g=this.dimension(h);c={},c[this.lt]=-g,this.moveBy(c)}this._scroll(h,s,e)}else this._scroll(Math.max(l,0),s,e)}else this._scroll(r.target,s,e);return this._trigger("scrollend"),this},moveBy:function(t,i){var e=this.list().position(),r=1,n=0;return this.rtl&&!this.vertical&&(r=-1,this.relative&&(n=this.list().width()-this.clipping())),t.left&&(t.left=e.left+n+s(t.left)*r+"px"),t.top&&(t.top=e.top+n+s(t.top)*r+"px"),this.move(t,i)},move:function(i,s){s=s||{};var e=this.options("transitions"),r=!!e,n=!!e.transforms,o=!!e.transforms3d,l=s.duration||0,a=this.list();if(!r&&l>0)return a.animate(i,s),void 0;var h=s.complete||t.noop,u={};if(r){var c=a.css(["transitionDuration","transitionTimingFunction","transitionProperty"]),f=h;h=function(){t(this).css(c),f.call(this)},u={transitionDuration:(l>0?l/1e3:0)+"s",transitionTimingFunction:e.easing||s.easing,transitionProperty:l>0?function(){return n||o?"all":i.left?"left":"top"}():"none",transform:"none"}}o?u.transform="translate3d("+(i.left||0)+","+(i.top||0)+",0)":n?u.transform="translate("+(i.left||0)+","+(i.top||0)+")":t.extend(u,i),r&&l>0&&a.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",h),a.css(u),0>=l&&a.each(function(){h.call(this)})},_scroll:function(i,s,e){if(this.animating)return t.isFunction(e)&&e.call(this,!1),this;if("object"!=typeof i?i=this.items().eq(i):i.jquery===void 0&&(i=t(i)),0===i.length)return t.isFunction(e)&&e.call(this,!1),this;this.inTail=!1,this._prepare(i);var r=this._position(i),n=this.list().position()[this.lt];if(r===n)return t.isFunction(e)&&e.call(this,!1),this;var o={};return o[this.lt]=r+"px",this._animate(o,s,e),this},_scrollTail:function(i,s){if(this.animating||!this.tail)return t.isFunction(s)&&s.call(this,!1),this;var e=this.list().position()[this.lt];this.rtl&&this.relative&&!this.vertical&&(e+=this.list().width()-this.clipping()),this.rtl&&!this.vertical?e+=this.tail:e-=this.tail,this.inTail=!0;var r={};return r[this.lt]=e+"px",this._update({target:this._target.next(),fullyvisible:this._fullyvisible.slice(1).add(this._visible.last())}),this._animate(r,i,s),this},_animate:function(i,s,e){if(e=e||t.noop,!1===this._trigger("animate"))return e.call(this,!1),this;this.animating=!0;var r=this.options("animation"),n=t.proxy(function(){this.animating=!1;var t=this.list().find("[data-jcarousel-clone]");t.length>0&&(t.remove(),this._reload()),this._trigger("animateend"),e.call(this,!0)},this),o="object"==typeof r?t.extend({},r):{duration:r},l=o.complete||t.noop;return s===!1?o.duration=0:t.fx.speeds[o.duration]!==void 0&&(o.duration=t.fx.speeds[o.duration]),o.complete=function(){n(),l.call(this)},this.move(i,o),this},_prepare:function(i){var e,r,n,o,l=this.index(i),a=l,h=this.dimension(i),u=this.clipping(),c=this.vertical?"bottom":this.rtl?"left":"right",f=this.options("center"),d={target:i,first:i,last:i,visible:i,fullyvisible:u>=h?i:t()};if(f&&(h/=2,u/=2),u>h)for(;;){if(e=this.items().eq(++a),0===e.length){if(!this.circular)break;if(e=this.items().eq(0),i.get(0)===e.get(0))break;if(r=this._visible.index(e)>=0,r&&e.after(e.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(e),!r){var _={};_[this.lt]=this.dimension(e),this.moveBy(_)}this._items=null}if(o=this.dimension(e),0===o)break;if(h+=o,d.last=e,d.visible=d.visible.add(e),n=s(e.css("margin-"+c)),u>=h-n&&(d.fullyvisible=d.fullyvisible.add(e)),h>=u)break}if(!this.circular&&!f&&u>h)for(a=l;;){if(0>--a)break;if(e=this.items().eq(a),0===e.length)break;if(o=this.dimension(e),0===o)break;if(h+=o,d.first=e,d.visible=d.visible.add(e),n=s(e.css("margin-"+c)),u>=h-n&&(d.fullyvisible=d.fullyvisible.add(e)),h>=u)break}return this._update(d),this.tail=0,f||"circular"===this.options("wrap")||"custom"===this.options("wrap")||this.index(d.last)!==this.items().length-1||(h-=s(d.last.css("margin-"+c)),h>u&&(this.tail=h-u)),this},_position:function(t){var i=this._first,s=i.position()[this.lt],e=this.options("center"),r=e?this.clipping()/2-this.dimension(i)/2:0;return this.rtl&&!this.vertical?(s-=this.relative?this.list().width()-this.dimension(i):this.clipping()-this.dimension(i),s+=r):s-=r,!e&&(this.index(t)>this.index(i)||this.inTail)&&this.tail?(s=this.rtl&&!this.vertical?s-this.tail:s+this.tail,this.inTail=!0):this.inTail=!1,-s},_update:function(i){var s,e=this,r={target:this._target||t(),first:this._first||t(),last:this._last||t(),visible:this._visible||t(),fullyvisible:this._fullyvisible||t()},n=this.index(i.first||r.first)<this.index(r.first),o=function(s){var o=[],l=[];i[s].each(function(){0>r[s].index(this)&&o.push(this)}),r[s].each(function(){0>i[s].index(this)&&l.push(this)}),n?o=o.reverse():l=l.reverse(),e._trigger(s+"in",t(o)),e._trigger(s+"out",t(l)),e["_"+s]=i[s]};for(s in i)o(s);return this}})}(jQuery,window),function(t){"use strict";t.jcarousel.fn.scrollIntoView=function(i,s,e){var r,n=t.jCarousel.parseTarget(i),o=this.index(this._fullyvisible.first()),l=this.index(this._fullyvisible.last());if(r=n.relative?0>n.target?Math.max(0,o+n.target):l+n.target:"object"!=typeof n.target?n.target:this.index(n.target),o>r)return this.scroll(r,s,e);if(r>=o&&l>=r)return t.isFunction(e)&&e.call(this,!1),this;for(var a,h=this.items(),u=this.clipping(),c=this.vertical?"bottom":this.rtl?"left":"right",f=0;;){if(a=h.eq(r),0===a.length)break;if(f+=this.dimension(a),f>=u){var d=parseFloat(a.css("margin-"+c))||0;f-d!==u&&r++;break}if(0>=r)break;r--}return this.scroll(r,s,e)}}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselControl",{_options:{target:"+=1",event:"click",method:"scroll"},_active:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onReload=t.proxy(this._reload,this),this.onEvent=t.proxy(function(i){i.preventDefault();var s=this.options("method");t.isFunction(s)?s.call(this):this.carousel().jcarousel(this.options("method"),this.options("target"))},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend",this.onReload),this._element.on(this.options("event")+".jcarouselcontrol",this.onEvent),this._reload()},_destroy:function(){this._element.off(".jcarouselcontrol",this.onEvent),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend",this.onReload)},_reload:function(){var i,s=t.jCarousel.parseTarget(this.options("target")),e=this.carousel();if(s.relative)i=e.jcarousel(s.target>0?"hasNext":"hasPrev");else{var r="object"!=typeof s.target?e.jcarousel("items").eq(s.target):s.target;i=e.jcarousel("target").index(r)>=0}return this._active!==i&&(this._trigger(i?"active":"inactive"),this._active=i),this}})}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselPagination",{_options:{perPage:null,item:function(t){return'<a href="#'+t+'">'+t+"</a>"},event:"click",method:"scroll"},_pages:{},_items:{},_currentPage:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onReload=t.proxy(this._reload,this),this.onScroll=t.proxy(this._update,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend",this.onReload).on("jcarousel:scrollend",this.onScroll),this._reload()},_destroy:function(){this._clear(),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend",this.onReload).off("jcarousel:scrollend",this.onScroll)},_reload:function(){var i=this.options("perPage");if(this._pages={},this._items={},t.isFunction(i)&&(i=i.call(this)),null==i)this._pages=this._calculatePages();else for(var s,e=parseInt(i,10)||0,r=this.carousel().jcarousel("items"),n=1,o=0;;){if(s=r.eq(o++),0===s.length)break;this._pages[n]=this._pages[n]?this._pages[n].add(s):s,0===o%e&&n++}this._clear();var l=this,a=this.carousel().data("jcarousel"),h=this._element,u=this.options("item");t.each(this._pages,function(i,s){var e=l._items[i]=t(u.call(l,i,s));e.on(l.options("event")+".jcarouselpagination",t.proxy(function(){var t=s.eq(0);if(a.circular){var e=a.index(a.target()),r=a.index(t);parseFloat(i)>parseFloat(l._currentPage)?e>r&&(t="+="+(a.items().length-e+r)):r>e&&(t="-="+(e+(a.items().length-r)))}a[this.options("method")](t)},l)),h.append(e)}),this._update()},_update:function(){var i,s=this.carousel().jcarousel("target");t.each(this._pages,function(t,e){return e.each(function(){return s.is(this)?(i=t,!1):void 0}),i?!1:void 0}),this._currentPage!==i&&(this._trigger("inactive",this._items[this._currentPage]),this._trigger("active",this._items[i])),this._currentPage=i},items:function(){return this._items},_clear:function(){this._element.empty(),this._currentPage=null},_calculatePages:function(){for(var t,i=this.carousel().data("jcarousel"),s=i.items(),e=i.clipping(),r=0,n=0,o=1,l={};;){if(t=s.eq(n++),0===t.length)break;l[o]=l[o]?l[o].add(t):t,r+=i.dimension(t),r>=e&&(o++,r=0)}return l}})}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselAutoscroll",{_options:{target:"+=1",interval:3e3,autostart:!0},_timer:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onAnimateEnd=t.proxy(this.start,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy),this.options("autostart")&&this.start()},_destroy:function(){this.stop(),this.carousel().off("jcarousel:destroy",this.onDestroy)},start:function(){return this.stop(),this.carousel().one("jcarousel:animateend",this.onAnimateEnd),this._timer=setTimeout(t.proxy(function(){this.carousel().jcarousel("scroll",this.options("target"))},this),this.options("interval")),this},stop:function(){return this._timer&&(this._timer=clearTimeout(this._timer)),this.carousel().off("jcarousel:animateend",this.onAnimateEnd),this}})}(jQuery);
/*!
 * Expander - v1.4.7 - 2013-08-30
 * http://plugins.learningjquery.com/expander/
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function(e){e.expander={version:"1.4.7",defaults:{slicePoint:100,preserveWords:!0,widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:!1,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:!0,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null,afterCollapse:null}},e.fn.expander=function(a){function l(e,a){var l="span",s=e.summary;return a?(l="div",x.test(s)&&!e.expandAfterSummary?s=s.replace(x,e.moreLabel+"$1"):s+=e.moreLabel,s='<div class="'+e.summaryClass+'">'+s+"</div>"):s+=e.moreLabel,[s," <",l+' class="'+e.detailClass+'"',">",e.details,"</"+l+">"].join("")}function s(e){var a='<span class="'+e.moreClass+'">'+e.expandPrefix;return a+='<a href="#">'+e.expandText+"</a></span>"}function n(a,l){return a.lastIndexOf("<")>a.lastIndexOf(">")&&(a=a.slice(0,a.lastIndexOf("<"))),l&&(a=a.replace(c,"")),e.trim(a)}function t(e,a){a.stop(!0,!0)[e.collapseEffect](e.collapseSpeed,function(){var l=a.prev("span."+e.moreClass).show();l.length||a.parent().children("div."+e.summaryClass).show().find("span."+e.moreClass).show(),e.afterCollapse&&e.afterCollapse.call(a)})}function r(a,l,s){a.collapseTimer&&(o=setTimeout(function(){t(a,l),e.isFunction(a.onCollapse)&&a.onCollapse.call(s,!1)},a.collapseTimer))}var i="init";"string"==typeof a&&(i=a,a={});var o,d=e.extend({},e.expander.defaults,a),p=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,c=d.wordEnd||/(&(?:[^;]+;)?|[a-zA-Z\u00C0-\u0100]+)$/,f=/<\/?(\w+)[^>]*>/g,u=/<(\w+)[^>]*>/g,m=/<\/(\w+)>/g,x=/(<\/[^>]+>)\s*$/,h=/^(<[^>]+>)+.?/,C={init:function(){this.each(function(){var a,i,c,x,C,v,S,g,b,y,E,w,T,I,P=[],j=[],k={},D=this,$=e(this),A=e([]),L=e.extend({},d,$.data("expander")||e.meta&&$.data()||{}),O=!!$.find("."+L.detailClass).length,z=!!$.find("*").filter(function(){var a=e(this).css("display");return/^block|table|list/.test(a)}).length,F=z?"div":"span",U=F+"."+L.detailClass,W=L.moreClass+"",Q=L.lessClass+"",Z=L.expandSpeed||0,q=e.trim($.html()),B=(e.trim($.text()),q.slice(0,L.slicePoint));if(L.moreSelector="span."+W.split(" ").join("."),L.lessSelector="span."+Q.split(" ").join("."),!e.data(this,"expanderInit")){for(e.data(this,"expanderInit",!0),e.data(this,"expander",L),e.each(["onSlice","beforeExpand","afterExpand","onCollapse","afterCollapse"],function(a,l){k[l]=e.isFunction(L[l])}),B=n(B),C=B.replace(f,"").length;L.slicePoint>C;)x=q.charAt(B.length),"<"===x&&(x=q.slice(B.length).match(h)[0]),B+=x,C++;for(B=n(B,L.preserveWords),v=B.match(u)||[],S=B.match(m)||[],c=[],e.each(v,function(e,a){p.test(a)||c.push(a)}),v=c,i=S.length,a=0;i>a;a++)S[a]=S[a].replace(m,"$1");if(e.each(v,function(a,l){var s=l.replace(u,"$1"),n=e.inArray(s,S);-1===n?(P.push(l),j.push("</"+s+">")):S.splice(n,1)}),j.reverse(),O)b=$.find(U).remove().html(),B=$.html(),q=B+b,g="";else{if(b=q.slice(B.length),y=e.trim(b.replace(f,"")),""===y||y.split(/\s+/).length<L.widow)return;g=j.pop()||"",B+=j.join(""),b=P.join("")+b}L.moreLabel=$.find(L.moreSelector).length?"":s(L),z&&(b=q),B+=g,L.summary=B,L.details=b,L.lastCloseTag=g,k.onSlice&&(c=L.onSlice.call(D,L),L=c&&c.details?c:L),E=l(L,z),$.html(E),T=$.find(U),I=$.find(L.moreSelector),"slideUp"===L.collapseEffect&&"slideDown"!==L.expandEffect||$.is(":hidden")?T.css({display:"none"}):T[L.collapseEffect](0),A=$.find("div."+L.summaryClass),w=function(e){e.preventDefault(),I.hide(),A.hide(),k.beforeExpand&&L.beforeExpand.call(D),T.stop(!1,!0)[L.expandEffect](Z,function(){T.css({zoom:""}),k.afterExpand&&L.afterExpand.call(D),r(L,T,D)})},I.find("a").unbind("click.expander").bind("click.expander",w),L.userCollapse&&!$.find(L.lessSelector).length&&$.find(U).append('<span class="'+L.lessClass+'">'+L.userCollapsePrefix+'<a href="#">'+L.userCollapseText+"</a></span>"),$.find(L.lessSelector+" a").unbind("click.expander").bind("click.expander",function(a){a.preventDefault(),clearTimeout(o);var l=e(this).closest(U);t(L,l),k.onCollapse&&L.onCollapse.call(D,!0)})}})},destroy:function(){this.each(function(){var a,l,s=e(this);s.data("expanderInit")&&(a=e.extend({},s.data("expander")||{},d),l=s.find("."+a.detailClass).contents(),s.removeData("expanderInit"),s.removeData("expander"),s.find(a.moreSelector).remove(),s.find("."+a.summaryClass).remove(),s.find("."+a.detailClass).after(l).remove(),s.find(a.lessSelector).remove())})}};return C[i]&&C[i].call(this),this},e.fn.expander.defaults=e.expander.defaults})(jQuery);


$(document).ready(function() {



/*    $.get('/ssi/global/floating-bar.html', function(data) { // ajax call for floating bar  */
	// Added for Sticky Footer - Start
  	$('article').waypoint(function(direction) {
	  	if( direction === 'down' ) {
			$('#sticky-menu').removeClass('navbar-fixed-bottom');
			$('#sticky-menu').addClass('hide-the-overflow');
			$('#sticky-container').removeClass('container-fixed');
			$('#sticky-container').addClass('container-relative');


			$('#choice').removeClass('position-fixed-choice');
			$('#choice').addClass('position-docked-choice');
			$('#sticky-container-close').removeClass('position-fixed-close');
			$('#sticky-container-close').addClass('position-docked-close');
		}
	  	if( direction === 'up') {
			$('#sticky-menu').removeClass('hide-the-overflow');
			$('#sticky-menu').addClass('navbar-fixed-bottom');
			$('#sticky-container').removeClass('container-relative');
			$('#sticky-container').addClass('container-fixed');

			$('#choice').removeClass('position-docked-choice');
			$('#choice').addClass('position-fixed-choice')
			$('#sticky-container-close').removeClass('position-docked-close');
			$('#sticky-container-close').addClass('position-fixed-close');
		}
 	} , {offset: 'bottom-in-view'});
  	$('#findpro').click(function(){
	 	$('#findpro').toggleClass('sticky-menu-button-active');
	 	$('#sticky-container').show();
		$('#sticky-container .container').delay(400).slideToggle({height: "350px"}, 300);
		dcsMultiTrack('DCS.dcsuri', document.location.href.replace(/.html/,'') + '~open-floating-panel-bar.html','WT.ti', 'Open Floating Panel Bar', 'WT.dl','99');
  	});
  	$('#sticky-container-close').click(function(){
	 	$('#findpro').toggleClass('sticky-menu-button-active');
	 	$('#sticky-container').show();
		 	$('#sticky-container .container').slideToggle({ direction: "down" }, 250);
  	});
  	$('#no').click(function(){
		$('#choice').delay(300).fadeOut(400);
  	});
	// Added for Sticky Footer - End
/*}, 'html'); // this is the end of the ajax call for the floating bar */
	// Added for Sticky Content
	$("div[id*=stickyContent]").each(function(){
		$("#"+this.id).containedStickyScroll({
			duration:0,unstick:'off'
		});
	});
 	// Added for Sticky Share
	if($("#share").length > 0){
		$("#share").containedStickyScroll({duration:0,unstick:'off'});
	}
	//Added for responsive tabs
	$("div[id*='_ResponsiveTab']").each(function(){
		$("#"+this.id).easyResponsiveTabs({
			type: 'default', //Types: default, vertical, accordion
			width: 'auto', //auto or any width like 600px
			fit: true   // 100% fit in a container
	    });
	});

	$('.disclaimer .prospectusLink').click(function(){
		var lastItem=$('#tabName_ResponsiveTab>ul').children()[$('#tabName_ResponsiveTab>ul').children().length-1];
		var lastContent=$('#tabName_ResponsiveTab > .tab-content').children()[$('#tabName_ResponsiveTab > .tab-content').children().length-1];
		$('#tabName_ResponsiveTab>ul').children().removeClass('active');
		$('#tabName_ResponsiveTab > .tab-content').children().hide();
		$(lastItem).addClass('active');
		window.location.hash="#tabName_ResponsiveTab";
		$(lastContent).addClass('resp-tab-content-active').show();
	});
  	$( "#navbarMobilePanel" ).panel({
  	  beforeopen: function( event, ui ) {
  	  	$('.navbar-toggle').addClass('active');
  	  },
  	  beforeclose: function( event, ui ) {
  	  	$('.navbar-toggle').removeClass('active');
  	  }
  	});

	if (navigator.userAgent.indexOf('Windows') > -1){
		//$("#sticky-menu .col-sm-7 .ui-link").attr("href","#");
		$("#sticky-menu .col-sm-7 .ui-link").hide();
		$("#sticky-menu .col-sm-7 .desktopTel").show();
	}

  	$( "#loginMobilePanel" ).panel({
  	  beforeopen: function( event, ui ) {
  	  	$('.profile-toggle').addClass('active');
  	  },
  	  beforeclose: function( event, ui ) {
  	  	$('.profile-toggle').removeClass('active');
  	  }
  	});
  	if(!($('.mainContent .row').children().hasClass("relatedContent"))){
   	 	$('.content-default').addClass("content-sticky");
	}
	if(($('.list-img').children().hasClass("mask"))){
		$('.list-img').parent().addClass("img-circle");
	}
	if(($('.related-horizontal .list-img').children().hasClass("mask"))){
		$('.related-horizontal .list-img').parent().removeClass("img-circle");
	}

	//$('input, textarea').placeholder();

	$('table').css('cssText','width:auto !important');
	// Hide the extra content initially, using JS so that if JS is disabled, no problemo:

var reloadAfterStateChange = false;
var stateregex = new RegExp("StateCode=([A-Z]{2})");

$('#state').change(function() {
	var s = $('#state').val();
	if (stateregex.test(document.cookie)) {
		var selStateVal = document.cookie.match(stateregex)[0];
		selStateVal = selStateVal.replace("StateCode=","");
	}
	if(document.getElementById("state")!=null){
		if(s != selStateVal){
			reloadAfterStateChange = true;
		}
	}
	var CookieDate = new Date;
    CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
    document.cookie="StateCode="+ s + "; path=/;expires=" + CookieDate.toGMTString() ;
	if (reloadAfterStateChange) {

		document.location.reload();
	}
	reloadAfterStateChange = true;
});

if (stateregex.test(document.cookie)) {
	var stateselected = document.cookie.match(stateregex)[0];
	stateselected = stateselected.replace("StateCode=","");
   	$('#state').val(stateselected).change();
}else {
	//console.log("StateCode Cookie::"+$.cookie("StateCode"));
	/*if ($.cookie("StateCode") == null) {
		var CookieDate = new Date;
		CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
		document.cookie="StateCode=; path=/;expires=" + CookieDate.toGMTString();
		document.location.reload();
	}*/
}

$(function(){
	$('.row').children('.col-sm-4').hover(function() { $(this).siblings().children('img','a','#content1').stop().animate({'opacity':'0.5'}); },
		function() { $(this).siblings().children('img','a','#content1').stop().animate({'opacity':'1'}); });
	});
// Main Nav Hover & Delay

	$("ul.nav li.dropdown-toggle1").hoverIntent(function () {
			$('.dropdown-menu1').fadeIn('fast');
	}, function() {
			$('.dropdown-menu1').fadeOut('fast');
	});
	$("ul.nav li.dropdown-toggle2").hoverIntent(function () {
			$('.dropdown-menu2').fadeIn('fast');
	}, function() {
			$('.dropdown-menu2').fadeOut('fast');
	});
	$("ul.nav li.dropdown-toggle3").hoverIntent(function () {
			$('.dropdown-menu3').fadeIn('fast');
	}, function() {
			$('.dropdown-menu3').fadeOut('fast');
	});

	$(".dropdown-toggle9").hoverIntent(function () {
		 $('.dropdown-menu9').fadeIn('fast');
   	}, function() {
		 $('.dropdown-menu9').fadeOut('fast');
   	});

	$("div[class='tab-pane active']").each(function(){
		$(this).show();
	});
	$("div[class='tab-pane']:not('.active')").each(function(){
		$(this).hide();
	});
	$('ul.resp-tabs-list li a').click(function (e) {
		$.waypoints('refresh');
		$('.resp-tabs-container .tab-pane').removeClass('active');
		$('ul.resp-tabs-list li.active').removeClass('active');
		$(this).parent('li').addClass('active');
	});
	/** Disable Auto complete ***/

	$('#loginId').attr("autocomplete" ,"off");

	$('#mymainTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
		$("div[class='tab-pane active']").each(function(){
			$(this).show();
		});
		$("div[class='tab-pane']:not('.active')").each(function(){
			$(this).hide();
		});
		$.waypoints('refresh');
	});

	$('.ui-collapsible-heading-toggle .ui-icon-arrow-full-r').click(function(){
		var URL=$(this).parent().attr('href');
		window.location.href=URL;
	});


	$('.leadFormActionBar').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			sendLeadForm_ActionBar();
		 	return false;
		}
	});

	function sendLeadForm_ActionBar(){
		$(".leadFormActionBar #LM_pageURL").val(window.location.href);
		$(".leadFormActionBar #LM_deviceType").val(navigator.userAgent);
		var servletURL = 'https://www1.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?';
		var profilecookie;
		var profilecookieGenDate;
		if (document.location.host.indexOf("int.us.axa.com") != -1) {
			servletURL = 'https://test.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?';
		}
		//servletURL = 'https://10.76.6.45/axawebapp/ProspectController?callType=ajax&jsoncallback=?';
		profilecookie = $.cookie("com.axa-equitable.profile");
		$(".leadFormActionBar #profileId").val(profilecookie);
		profilecookieGenDate=$.cookie("com.axa-equitable.profileGenDate");
		$(".leadFormActionBar #profileIdGenDate").val(profilecookieGenDate);
		validateLeadForm();
		var frmData = $('.actionBar_contact .leadFormActionBar').serialize();
		$.ajax({
			type: "POST",
			cache: false,
			url: servletURL,
			data:frmData,
			dataType:"JSONP",
			success:confirmation,
			error: function (xhr, ajaxOptions, thrownError) {
				$("#errorMessageLMForm").show();
				$("#errorMessageLMForm").css("color","red");
				$("#errorMessageLMForm").html("Error submitting form");
				//alert(thrownError+"::status::"+xhr.status);
				return false;
			}
		});
	    return false;
	}

	function confirmation(data){
		$.each(data.pId, function() {
			if (this.status == "success") {
				$(".actionBar_contact").css("color","white");
				$(".actionBar_contact").html("Thank you! Someone will be in touch with you soon.");
				dcsMultiTrack('WT.ti', 'Lead Form Action Bar', 'WT.dl','Prospect');
				return false;
			}else{
				$("#errorMessageLMForm").show();
				$("#errorMessageLMForm").css("color","red");
				$("#errorMessageLMForm").html("Unable to process the request at this time. Please try again later.");
				return false;
			}
		});
	}

	function validateLeadForm(){
		var reHasChar = new RegExp(".*[a-zA-Z].*","i");
		if (reHasChar.test($('#phone_number_email_address').val()))  {
			$('.leadFormActionBar #phone_number_email_address').addClass('email');
			$('.leadFormActionBar #phone_number_email_address').removeClass('phone');
			$('.leadFormActionBar #LM_email_address').val($('.leadFormActionBar #phone_number_email_address').val())
			$('.leadFormActionBar #LM_phone_number').val('');
		} else {
			$('.leadFormActionBar #phone_number_email_address').addClass('phone');
			$('.leadFormActionBar #phone_number_email_address').removeClass('email');
			$('.leadFormActionBar #LM_phone_number').val($('.leadFormActionBar #phone_number_email_address').val());
			$('.leadFormActionBar #LM_email_address').val('');
		}
		}

	$('.findFPActionBar').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			findFP_Actionbar();
			return false;
		}
	});

	$('.talkToFPForm').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			sendLeadForm_Generic('talkToFPForm','talkToFP');
			return false;
		}
	});

	$('.leavingLegacyForm').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			sendLeadForm_Generic('leavingLegacyForm','leavingLegacy');
			return false;
		}
	});

	$('.nurseryPrintForm').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			sendLeadForm_Generic('nurseryPrintForm','nurseryPrint');
			return false;
		}
	});

	$('.findFPByZip').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			getFPData('getByZip');
			$("#textinput-zipCode").blur();
			return false;
		}
	});

	$('.findFPByLocation').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			getFPData('getByCityState');
			return false;
		}
	});

	$('.findFPByLastname').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			getFPData('getByLastName');
			return false;
		}
	});
	$('.findFPByBranch').on('submit', function(e){
		if(e.type == 'submit' && $(this).callProp('checkValidity')){
			getFPData('getByBranchName');
			return false;
		}
	});

	function sendLeadForm_Generic(formClass, formId){
			var servletURL = 'https://www1.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?';
			var profilecookie;
			var profilecookieGenDate;
			var pageUrl;
			var pageName;
			var deviceType;
			pageUrl = window.location.href;
			deviceType = navigator.userAgent;
			$("."+formClass+" #LM_pageURL").val(pageUrl);
			$("."+formClass+" #LM_deviceType").val(deviceType);

			if (document.location.host.indexOf("int.us.axa.com") != -1) {
				servletURL = "https://test.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?";
			}
			profilecookie = $.cookie("com.axa-equitable.profile");
			$("."+formClass+" #profileId").val(profilecookie);

			profilecookieGenDate=$.cookie("com.axa-equitable.profileGenDate");
			$("."+formClass+" #profileIdGenDate").val(profilecookieGenDate);

			var frmData = $(document.getElementById(formId)).serialize();
			$.ajax({
				type: "POST",
				cache: false,
				url: servletURL,
				data:frmData,
				dataType:"JSONP",
				success:function(data){
					confirmLead_Generic(data, formClass);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					$("#errorMessage"+formClass).show();
					$("#errorMessage"+formClass).css("color","red");
					$("#errorMessage"+formClass).html("Error submitting form");
					//alert(thrownError+"::status::"+xhr.status);
					return false;
				}
			});
		   return false;
		}

		function confirmLead_Generic(data, formClass){
			$.each(data.pId, function() {
				if (this.status == "success") {
					$('.'+formClass).hide();
					$('#contact-thank').show();
					$('html, body').animate({
						scrollTop: $("#contact-thank").offset().top - 50
					}, 1000);
					dcsMultiTrack('WT.ti', 'Lead Form', 'WT.dl','Prospect');
					return false;
				}else{
					$("#errorMessage"+formClass).show();
					$("#errorMessage"+formClass).css("color","red");
					$("#errorMessage"+formClass).html("Unable to process the request at this time. Please try again later.");
					return false;
				}
			});
	}

	/*function sendTalkToFPLead(){
		var servletURL = 'https://www1.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?';
		var profilecookie;
		var profilecookieGenDate;
		var pageUrl;
		var pageName;
		var deviceType;
		pageUrl = window.location.href;
		deviceType = navigator.userAgent;
		$(".talkToFPForm #LM_pageURL").val(pageUrl);
		$(".talkToFPForm #LM_deviceType").val(deviceType);

		if (document.location.host.indexOf("int.us.axa.com") != -1) {
			servletURL = "https://test.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?";
		}
		profilecookie = $.cookie("com.axa-equitable.profile");
		$(".talkToFPForm #profileId").val(profilecookie);

		profilecookieGenDate=$.cookie("com.axa-equitable.profileGenDate");
		$(".talkToFPForm #profileIdGenDate").val(profilecookieGenDate);

		var frmData = $(document.getElementById("talkToFP")).serialize();
		$.ajax({
			type: "POST",
			cache: false,
			url: servletURL,
			data:frmData,
			dataType:"JSONP",
			success:confirmTalkToFPLead,
			error: function (xhr, ajaxOptions, thrownError) {
				$("#errorMessageTalkToFPForm").show();
				$("#errorMessageTalkToFPForm").css("color","red");
				$("#errorMessageTalkToFPForm").html("Error submitting form");
				//alert(thrownError+"::status::"+xhr.status);
				return false;
			}
		});
	   return false;
	}

	function confirmTalkToFPLead(data){
		$.each(data.pId, function() {
			if (this.status == "success") {
				$('.talkToFPForm').hide();
				$('#contact-thank').show();
				$('html, body').animate({
					scrollTop: $("#contact-thank").offset().top - 50
				}, 1000);
				return false;
			}else{
				$("#errorMessageTalkToFPForm").show();
				$("#errorMessageTalkToFPForm").css("color","red");
				$("#errorMessageTalkToFPForm").html("Unable to process the request at this time. Please try again later.");
				return false;
			}
		});
	}

	function sendLeavingLegacyLead(){
		var servletURL = 'https://www1.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?';
		var profilecookie;
		var profilecookieGenDate;
		var pageUrl;
		var pageName;
		var deviceType;
		pageUrl = window.location.href;
		deviceType = navigator.userAgent;
		$(".leavingLegacyForm #LM_pageURL").val(pageUrl);
		$(".leavingLegacyForm #LM_deviceType").val(deviceType);

		if (document.location.host.indexOf("int.us.axa.com") != -1) {
			servletURL = "https://test.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?";
		}
		profilecookie = $.cookie("com.axa-equitable.profile");
		$(".leavingLegacyForm #profileId").val(profilecookie);

		profilecookieGenDate=$.cookie("com.axa-equitable.profileGenDate");
		$(".leavingLegacyForm #profileIdGenDate").val(profilecookieGenDate);

		var frmData = $(document.getElementById("leavingLegacy")).serialize();
		$.ajax({
			type: "POST",
			cache: false,
			url: servletURL,
			data:frmData,
			dataType:"JSONP",
			success:confirmLeavingLegacyLead,
			error: function (xhr, ajaxOptions, thrownError) {
				$("#errorMsgLeavingLegacyForm").show();
				$("#errorMsgLeavingLegacyForm").css("color","red");
				$("#errorMsgLeavingLegacyForm").html("Error submitting form");
				//alert(thrownError+"::status::"+xhr.status);
				return false;
			}
		});
	   return false;
	}

	function confirmLeavingLegacyLead(data){
		$.each(data.pId, function() {
			if (this.status == "success") {
				$('.leavingLegacyForm').hide();
				$('#contact-thank').show();
				$('html, body').animate({
					scrollTop: $("#contact-thank").offset().top - 50
				}, 1000);
				return false;
			}else{
				$("#errorMsgLeavingLegacyForm").show();
				$("#errorMsgLeavingLegacyForm").css("color","red");
				$("#errorMsgLeavingLegacyForm").html("Unable to process the request at this time. Please try again later.");
				return false;
			}
		});
	}

	function sendNurseryPrintFormLead(){
		var servletURL = 'https://www1.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?';
		var profilecookie;
		var profilecookieGenDate;
		var pageUrl;
		var pageName;
		var deviceType;
		pageUrl = window.location.href;
		deviceType = navigator.userAgent;
		$(".nurseryPrintForm #LM_pageURL").val(pageUrl);
		$(".nurseryPrintForm #LM_deviceType").val(deviceType);

		if (document.location.host.indexOf("int.us.axa.com") != -1) {
			servletURL = "https://test.axa-equitable.com/axawebapp/ProspectController?callType=ajax&jsoncallback=?";
		}
		profilecookie = $.cookie("com.axa-equitable.profile");
		$(".nurseryPrintForm #profileId").val(profilecookie);

		profilecookieGenDate=$.cookie("com.axa-equitable.profileGenDate");
		$(".nurseryPrintForm #profileIdGenDate").val(profilecookieGenDate);

		var frmData = $(document.getElementById("nurseryPrint")).serialize();
		$.ajax({
			type: "POST",
			cache: false,
			url: servletURL,
			data:frmData,
			dataType:"JSONP",
			success:confirmNurseryPrintFormLead,
			error: function (xhr, ajaxOptions, thrownError) {
				$("#errorMsgNurseryPrintForm").show();
				$("#errorMsgNurseryPrintForm").css("color","red");
				$("#errorMsgNurseryPrintForm").html("Error submitting form");
				//alert(thrownError+"::status::"+xhr.status);
				return false;
			}
		});
	   return false;
	}

	function confirmNurseryPrintFormLead(data){
		$.each(data.pId, function() {
			if (this.status == "success") {
				$('.nurseryPrintForm').hide();
				$('#contact-thank').show();
				$('html, body').animate({
					scrollTop: $("#contact-thank").offset().top - 50
				}, 1000);
				return false;
			}else{
				$("#errorMsgNurseryPrintForm").show();
				$("#errorMsgNurseryPrintForm").css("color","red");
				$("#errorMsgNurseryPrintForm").html("Unable to process the request at this time. Please try again later.");
				return false;
			}
		});
	}
	*/

	assignMaximumHeight();
  		$('#mymainTab li').click(function(){
  			assignMaximumHeight();
  		});
 /* end document ready*/

  $('.calloutRightHash,.calloutLeftHash').addClass('col-xs-12 col-md-4');
  $('.calloutRight, .calloutLeft').addClass('col-xs-12 col-md-4');

  $('div#disclaimer').expander({
	  slicePoint: 50,
	  widow: 2,
	  preserveWords: true,
	  expandEffect: 'show',
	  userCollapseText: '[^]'
	});

	//For adjusting Fidicuary Educator iframe page
	$("#fiduciaryEducatorIframe").parents(".container").css("padding-left","0px");
	$("#fiduciaryEducatorIframe").parents(".bodyContent").css("width","1080px");

	//For auto populate axaLoginID
	 if ($.cookie("axaLoginID")) {
	        $("#loginId").val( $.cookie("axaLoginID") );
		   $("#loginIdMobile").val( $.cookie("axaLoginID") );
	   	   $("#checkbox-1a").checked="true";
	   	   $("#checkbox-1a").attr("checked", "checked");
	   	   $("#checkbox-1b").checked="true";
	   	   $("#checkbox-1b").attr("checked", "checked");
	 }


 });
	function assignMaximumHeight(){
	var heightArray=new Array();
	var list=$('.resp-tabs-list').children();
	if(parseInt(list.children().css('height'))>0){
	$.each(list,function(i,listItem){
		heightArray.push(parseInt($(listItem).children().css('height')));
	});
	var maxValueInArray = Math.max.apply(Math, heightArray);
	$('.resp-tabs-list li a').css('height',maxValueInArray);
		}
	}
 function checkRememberLogin() {
	if (document.getElementById("checkbox-1a").checked==true && $("#loginPanel").css('visibility') != 'hidden') {
	  $.cookie("axaLoginID",$("#loginId").val(), {secure: "secure",expires: 90, path:"/", domain:document.domain} );
	} else if (document.getElementById("checkbox-1b").checked==true && $("#loginMobilePanel").css('visibility') == 'visible') {
	  $.cookie("axaLoginID",$("#loginIdMobile").val(), {secure: "secure",expires: 90, path:"/", domain:document.domain} );
	} else {
	  $.cookie("axaLoginID","", {expires: -1, path:"/", domain:document.domain} );
	}

	if (navigator.userAgent.indexOf('MSIE') > -1){
	 $.cookie("LoginFlag","NEWLOGIN", {path:"/", domain:document.domain} );
    }
	return true;
}


if (document.location.host === 'int.us.axa.com') {

     portalURL = "https://test.axa-equitable.com";
     environment = 'INT';

} else {

     portalURL = "https://www1.axa-equitable.com";
	 environment = 'PROD';

}

function gotoRegistration(value) {
	alert(value);
switch (value) {

        case 'Individual Customer or Trust':
        document.location = portalURL + '/uls/jsp/registration_terms.jsp';
		break;// end customer

        case 'Third Party Financial Professional':
        document.location = portalURL + '/uls/jsp/Broker_registration_terms.jsp?viewUser=EMP';
		break;// end login2

        case 'Business Strategies':
        document.location = portalURL + '/uls/newnoec/CHBMUserRegServlet?userType=BusniessClient';
		break;// end businessclient

        case 'intermediary':
        document.location = portalURL + '/uls/newnoec/CHBMUserRegServlet?userType=Intermediary';
		break;// end intermediary
		case 'trust':
        document.location = portalURL + '/uls/newnoec/CHBMUserRegServlet?userType=Trust';
		break;// end trust

		case 'indivannuity':
        document.location = portalURL + '/uls/jsp/Broker_registration_terms.jsp?viewUser=ANN';
		break;// end trust

		case 'Retirement Plan Sponsor':
        document.location = '/customer-service/registration-information.html';
		break;// end trust

}
return false;
}

function goBack(){
	window.history.back();
}

function findFP_Actionbar(){
	if($('.actionBar_zipcode #zipCode').val()!=""){
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		}
		window.location.href=window.location.origin+"/find-fp.html?zipCode=" + $('.actionBar_zipcode #zipCode').val();
		return false;
	}else{
		alert("Please enter zip code.");
	}
}

function findFP_csform(){
	if($('#findFPByZip #zipCode').val()!=""){
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		}
		window.location.href=window.location.origin+"/find-fp.html?zipCode=" + $('#findFPByZip #zipCode').val();
		return false;
	}else{
		alert("Please enter zip code.");
		return false;
	}
}

function setStateCookie(selStateVal){
	var CookieDate = new Date;
	CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
    document.cookie="StateCode="+ selStateVal + "; path=/;expires=" + CookieDate.toGMTString() ;
}

//--clickable divs--//
$(document).ready(function() {
	var scrollEnabled=false;
	var oldPageYOffset = 0;
$(document).delegate(window,'scroll',function() {
		 if (oldPageYOffset>0){
			scrollEnabled=true;
		}
		oldPageYOffset++;
});
$(document).delegate(window,'scrollstop',function() {
		scrollEnabled=false;

});
$(".touchlink, .img-full-width, .billboard-tab-content").css("cursor", "pointer");
$(document).delegate(".touchlink", "click", function() {
	if(!scrollEnabled)
         window.location.href=$(this).siblings('.panel-description').children('.btn-secondary').attr('href');

  });

  $(document).delegate(".billboard-tab-content", "click", function() {
   if(!scrollEnabled)
   	window.location.href = $(this).find("a").attr("href");

  });

});


function addMetaTag (name, content)	{
	head = document.getElementsByTagName("HEAD");
	meta = document.createElement("META");
	meta.name	= name;
	meta.content 	= content;
	head[0].appendChild (meta);
}



	var productReg = new RegExp("/annuities/variable-annuities.html|/annuities/equivest/edc/equi-vest-edc-participant.html|/annuities/equivest/ira/equi-vest-simple-ira-participant.html|/annuities/equivest/sep/equi-vest-sep-participant.html|/annuities/investment-edge/annuity.html|/annuities/equivest/tsa/annuity.html|/annuities/equivest/tsa/equi-vest-201-tsa-participant.html|/annuities/retirement-cornerstone/annuity.html|/annuities/retirement-gateway/ssi/retirement-gateway-main.html|/annuities/structured-capital-strategies/annuity.html|/for-employers/retirement-plans/businesses.html|/for-employers/retirement-plans/equi-vest-403b-plan-sponsors.html|/for-employers/retirement-plans/government-agencies.html|/for-employers/retirement-plans/non-profits.html|/for-employers/retirement-plans/retirement-gateway-for-plan-sponsors.html|/investments/axa-advisors/manager-select.html|/investments/axa-advisors/model-wealth-portfolios.html|/investments/axa-advisors/optimum-market-portfolios.html|/investments/axa-advisors/personal-wealth-portfolios.html|/investments/axa-advisors/strategic-asset-management.html|/investments/mutual-funds-product.html|/life-insurance/term/term-series.html|/life-insurance/universal/athena-indexed-ul.html|/life-insurance/universal/athena-survivorship-universal-life-IV.html|/life-insurance/universal/brightlife-protect.html|/life-insurance/universal/variable/incentive-life-legacy-II.html|/life-insurance/universal/variable/incentive-life-optimizer-II.html|/life-insurance/universal/variable/survivorship-incentive-life-legacy.html|/life-insurance/whole/interest-sensitive-whole-life.html|/retirement/401k-403b-457b/retirement-gateway.html|/retirement/ira/axa-advisors-ira-product.html|/retirement/ira/ira-landing-page2.html");
	
	$('div.band-cta a[href$="talk-to-a-financial-professional.html"]').each(function(){
		var ttfphref = $(this).attr('href');
	    $(this).attr('href',ttfphref+"?WT.ac=TTFPProductBannerClick");
    });
	
	$('div.band-cta a[href$="talk-to-a-financial-professional.html"]').click(function(){
	    dcsMultiTrack('WT.ti', document.title+'~TTAFP', 'WT.dl','99');
    });


if (productReg.test(document.location.pathname)) {
  addMetaTag('WT.ad','TTFPProductBannerView')
}




/*********************/
 
    var reType = '';
    var uwtType = '';

	var reRole = new RegExp('[; ]WebTrendUserRole=([^\\s;]*)');
	var sMatch = (' '+document.cookie).match(re);
	if (sMatch) {
        sRoleMatch = sMatch[1];
	}

	if (document.cookie.indexOf('FPType') > -1) {
		reType = new RegExp('[; ]FPType=([^\\s;]*)');
	} else if (document.cookie.indexOf('CustomerType') > -1) {
		reType = new RegExp('[; ]CustomerType=([^\\s;]*)');
	}
	
    if (reType) {
        var sTypeMatch = (' '+document.cookie).match(reType);
        if (sTypeMatch) {
            uwtType = sTypeMatch[1];
        }
    }

    var CookieDate = new Date;
    CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
    
if (document.cookie.indexOf('WebTrendAEPLogin=Success') > -1) {
    var sRole = '';
	var re = new RegExp('[; ]WebTrendUserRole=([^\\s;]*)');
	var sMatch = (' '+document.cookie).match(re);
	if (sMatch) {
        sRole = sMatch[1];
	}
    
    var sRole;
    if (document.cookie.indexOf('FPType=W') > -1 && document.location.pathname.indexOf('axae/myportal/employersponsored') > -1) {
        sRole = 'F,Employer Sponsored';
    } else if (document.cookie.indexOf('FPType=W') > -1 && document.location.pathname.indexOf('axae/myportal/w/ann/') > -1) {
        sRole = 'F,Wholesale Annuity';
    } else if (document.cookie.indexOf('FPType=W') > -1 && document.location.pathname.indexOf('axae/myportal/w/lif/') > -1) {
        sRole = 'F,Wholesale Life';
    } else if (document.cookie.indexOf('FPType=R') > -1 && document.location.pathname.indexOf('axae/myportal/r/') > -1) {
        sRole = 'F,Retail';
    } else if (document.cookie.indexOf('CustomerType=W') > -1) {
        sRole = 'C,Wholesale';
    } else if (document.cookie.indexOf('CustomerType=R') > -1) {
        sRole = 'C,Retail';
    } else if (document.cookie.indexOf('WebTrendUserRole=E') > -1) {
        sRole = 'E,Employee';
    } else if (document.cookie.indexOf('WebTrendUserRole=S') > -1) {
        sRole = 'S,Plan Sponsor';
    } else if (document.cookie.indexOf('AXAUserRole=P') > -1) {
	  sRole = 'P,Prospect'
	}

	var LoginFlag = document.createElement('meta');
	LoginFlag.name = 'DCSext.WebTrendsAEPLoginRole';
	LoginFlag.content = sRole;
	document.getElementsByTagName('head')[0].appendChild(LoginFlag);
	document.cookie = "WebTrendAEPLogin=Expire; Path=/; Domain=.axa-equitable.com";
    

	document.cookie = "WebTrendUserRole=" + sRole + "; Path=/; Domain=.axa-equitable.com;expires=" + CookieDate.toGMTString( ) + ';';

/* 
    var AuthName = document.createElement('meta');
	AuthName.name = 'DCS.dcsaut';
	AuthName.content = getUserId() + '-' + getFullName();;
	document.getElementsByTagName('head')[0].appendChild(AuthName);
*/
    }

if (document.cookie.indexOf('WebTrendUserRole') > -1) {
       var WTURoleCG = "";
       var WTURoleSG = "";
       var metas = document.getElementsByTagName('meta'); 

       for (i=0; i<metas.length; i++) { 
           if (metas[i].getAttribute("name") == "WT.cg_n") { 
               WTURoleCG = metas[i].getAttribute("content"); 
           } 
           if (metas[i].getAttribute("name") == "WT.cg_s") { 
               WTURoleSG = metas[i].getAttribute("content"); 
           } 
       }
       
       	var reRole = new RegExp('[; ]WebTrendUserRole=([^\\s;]*)');
        var sMatch = (' '+document.cookie).match(reRole);
        var sRoleMatch = "";
        if (sMatch) { 
            sRoleMatch = sMatch[1];
        }
       
       if (WTURoleCG) {
           addMetaTag("WTRoleGroups", sRoleMatch + "," + WTURoleCG + "," + WTURoleSG );
       }
        
       //document.cookie ="WTRoleGroups=" + sRoleMatch + "," + WTURoleCG + "," + WTURoleSG + "; Path=/; Domain=.axa-equitable.com;expires=" + CookieDate.toGMTString( ) + ';';
} 




/*********************/

// WebTrends SmartSource Data Collector Tag
// Version: 9.4.0     
// Tag Builder Version: 4.1
// Created: 1/18/2014 9:56:14 PM

function WebTrends(){
	var that=this;
	// begin: user modifiable
	this.dcsid=(function(){var domlist="int.us.axa.com,test.axa-equitable.com,onlineaccess-int.axa-equitable.com";var doms=that.dcsSplit(domlist);var dlen=doms.length;var host=window.location.hostname.toLowerCase();for (var i=0;i<dlen;i++){if (host==doms[i]){return("dcslo92mzxpzpbmq0m2rea563_8e6q");}}return("dcsh8dvg9ij874mwlpsytdp4g_4h1h");})();
	this.domain="metrics.axa-equitable.com";
	this.timezone=-5;
	this.onsitedoms="us.axa.com,int.us.axa.com,www1.axa-equitable.com,test.axa-equitable.com,onlineaccess.axa-equitable.com";
	this.downloadtypes="xls,doc,pdf,txt,csv,zip,mp3,mp4,mpeg,ppt,wav,wmv,Swf,Flv,Fla";
	this.navigationtag="div,table";
	this.adclickparam="WT.ac";
	this.trackevents=true;
	this.trimoffsiteparams=true;
	this.enabled=true;
	this.i18n=false;
	this.paidsearchparams="gclid";
	this.splitvalue="";
	this.preserve=true;
	this.cookieTypes = "all";
	this.FPCConfig = {
		enabled: (this.cookieTypes === "all" || this.cookieTypes == "firstPartyOnly"),
		name: "WT_FPC",
		domain: ".us.axa.com",
		expires: 63113851500
	};
	this.TPCConfig = {
		enabled: (this.cookieTypes === "all"),
		cfgType: (this.cookieTypes === "all") ? "":"1"
	};
	// end: user modifiable
	this.DCS={};
	this.WT={};
	this.DCSext={};
	this.images=[];
	this.index=0;

	this.exre=(function(){return(window.RegExp?new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)","i"):"");})();
	this.re=(function(){return(window.RegExp?(that.i18n?{"%25":/\%/g,"%26":/\&/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g}):"");})();
}
WebTrends.prototype.dcsGetId=function(){
	if (this.enabled&&(document.cookie.indexOf(this.FPCConfig.name+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)&&this.TPCConfig.enabled){
		document.write("<scr"+"ipt type='text/javascript' src='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+"/"+this.dcsid+"/wtid.js"+"'><\/scr"+"ipt>");
	}
}
WebTrends.prototype.setCookieTypes = function (types) {
	this.FPCConfig.enabled = (types === "all" || types == "firstPartyOnly");	
	this.TPCConfig.enabled = (types === "all");
	this.TPCConfig.cfgType = (types === "all") ? "":"1"
}
WebTrends.prototype.dcsGetCookie=function(name){
	var cookies=document.cookie.split("; ");
	var cmatch=[];
	var idx=0;
	var i=0;
	var namelen=name.length;
	var clen=cookies.length;
	for (i=0;i<clen;i++){
		var c=cookies[i];
		if ((c.substring(0,namelen+1))==(name+"=")){
			cmatch[idx++]=c;
		}
	}
	var cmatchCount=cmatch.length;
	if (cmatchCount>0){
		idx=0;
		if ((cmatchCount>1)&&(name==this.FPCConfig.name)){
			var dLatest=new Date(0);
			for (i=0;i<cmatchCount;i++){
				var lv=parseInt(this.dcsGetCrumb(cmatch[i],"lv"));
				var dLst=new Date(lv);
				if (dLst>dLatest){
					dLatest.setTime(dLst.getTime());
					idx=i;
				}
			}
		}
		return unescape(cmatch[idx].substring(namelen+1));
	}
	else{
		return null;
	}
}
WebTrends.prototype.dcsGetCrumb=function(cval,crumb,sep){
	var aCookie=cval.split(sep||":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
WebTrends.prototype.dcsGetIdCrumb=function(cval,crumb){
	var id=cval.substring(0,cval.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
WebTrends.prototype.dcsIsFpcSet=function(name,id,lv,ss){
	var c=this.dcsGetCookie(name);
	if (c){
		return ((id==this.dcsGetIdCrumb(c,"id"))&&(lv==this.dcsGetCrumb(c,"lv"))&&(ss==this.dcsGetCrumb(c,"ss")))?0:3;
	}
	return 2;
}
WebTrends.prototype.dcsDeleteCookie=function(name, path, domain) {	
	var cDelete = name + "=";
	cDelete += "; expires=expires=Thu, 01 Jan 1970 00:00:01 GMT";
	cDelete += "; path=" + path;
	cDelete += (domain) ? ";domain="+domain : "";		
	document.cookie = cDelete;
}
WebTrends.prototype.dcsFPC=function(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}

	if (!this.FPCConfig.enabled && !this.TPCConfig.enabled)
		this.WT["ce"] = "0"
	else if (this.FPCConfig.enabled && !this.TPCConfig.enabled)
		this.WT["ce"] = "1";
	else
		this.WT["ce"] = "2";

	if (!this.FPCConfig.enabled) {
		this.dcsDeleteCookie(this.FPCConfig.name, "/", this.FPCConfig.domain);
		return;
	}

	var WT=this.WT;
	var name=this.FPCConfig.name;
	var dCur=new Date();
	var adj=(dCur.getTimezoneOffset()*60000)+(this.timezone*3600000);
	dCur.setTime(dCur.getTime()+adj);
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	WT.co_f=WT.vtid=WT.vtvs=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
	if (document.cookie.indexOf(name+"=")==-1){
		if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
			WT.co_f=gWtId;
		}
		else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
			WT.co_f=gTempWtId;
			WT.vt_f="1";
		}
		else{
			WT.co_f="2";
			var curt=dCur.getTime().toString();
			for (var i=2;i<=(32-curt.length);i++){
				WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
			}
			WT.co_f+=curt;
			WT.vt_f="1";
		}
		if (typeof(gWtAccountRollup)=="undefined"){
			WT.vt_f_a="1";
		}
		WT.vt_f_s=WT.vt_f_d="1";
		WT.vt_f_tlh=WT.vt_f_tlv="0";
	}
	else{
		var c=this.dcsGetCookie(name);
		var id=this.dcsGetIdCrumb(c,"id");
		var lv=parseInt(this.dcsGetCrumb(c,"lv"));
		var ss=parseInt(this.dcsGetCrumb(c,"ss"));
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}
		WT.co_f=id;
		var dLst=new Date(lv);
		WT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			WT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
		}
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		}
	}
	WT.co_f=escape(WT.co_f);
	WT.vtid=(typeof(this.vtid)=="undefined")?WT.co_f:(this.vtid||"");
	WT.vtvs=(dSes.getTime()-adj).toString();
	var expiry= (this.FPCConfig.expires) ? "; expires="+ new Date(new Date().getTime() + (this.FPCConfig.expires)).toGMTString():"";
	var cur=dCur.getTime().toString();
	var ses=dSes.getTime().toString();
	document.cookie=name+"="+"id="+WT.co_f+":lv="+cur+":ss="+ses+expiry+"; path=/"+(((this.FPCConfig.domain!=""))?("; domain="+this.FPCConfig.domain):(""));
	var rc=this.dcsIsFpcSet(name,WT.co_f,cur,ses);
	if (rc!=0){
		WT.co_f=WT.vtvs=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
		if (typeof(this.vtid)=="undefined"){
			WT.vtid="";
		}
		WT.vt_f=WT.vt_f_a=rc;
    }
}
// Code section for Generate an Ad View query parameter for every Ad Click link.
WebTrends.prototype.dcsAdSearch=function(){
	if (document.links){
		var param=this.adclickparam+"=";
		var paramlen=param.length;
		var paramre=new RegExp(param,"i");
		var len=document.links.length;
		var pos=end=-1;
		var anch=urlp=value="";
		var urlpre;
		var url=document.URL+"";
		var start=url.search(paramre);
		if (start!=-1){
			end=url.indexOf("&",start);
			urlp=url.substring(start,(end!=-1)?end:url.length);
			urlpre=new RegExp(urlp+"(&|#)","i");
		}
		for (var i=0;i<len;i++){
			if (document.links[i].href){
				anch=document.links[i].href+"";
				if (urlp.length>0){
					anch=anch.replace(urlpre,"$1");
				}
				pos=anch.search(paramre);
				if (pos!=-1){
					start=pos+paramlen;
					end=anch.indexOf("&",start);
					value=anch.substring(start,(end!=-1)?end:anch.length);
					this.WT.ad=this.WT.ad?(this.WT.ad+";"+value):value;
				}
			}
		}
	}
}
WebTrends.prototype.dcsIsOnsite=function(host){
	if (host.length>0){
	    host=host.toLowerCase();
	    if (host==window.location.hostname.toLowerCase()){
		    return true;
	    }
	    if (typeof(this.onsitedoms.test)=="function"){
		    return this.onsitedoms.test(host);
	    }
	    else if (this.onsitedoms.length>0){
		    var doms=this.dcsSplit(this.onsitedoms);
		    var len=doms.length;
		    for (var i=0;i<len;i++){
			    if (host==doms[i]){
			        return true;
			    }
		    }
	    }
	}
	return false;
}
WebTrends.prototype.dcsTypeMatch=function(pth, typelist){
	var type=pth.toLowerCase().substring(pth.lastIndexOf(".")+1,pth.length);
	var types=this.dcsSplit(typelist);
	var tlen=types.length;	
	for (var i=0;i<tlen;i++){
		if (type==types[i]){
			return true;
		}
	}
	return false;
}
WebTrends.prototype.dcsEvt=function(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e&&e.tagName&&(e.tagName.toLowerCase()!=tag.toLowerCase())){
		e=e.parentElement||e.parentNode;
	}
	return e;
}
WebTrends.prototype.dcsNavigation=function(evt){
	var id="";
	var cname="";
	var elems=this.dcsSplit(this.navigationtag);
	var elen=elems.length;	
	var i,e,elem;
	for (i=0;i<elen;i++){
		elem=elems[i];
		if (elem.length){
			e=this.dcsEvt(evt,elem);
			id=(e.getAttribute&&e.getAttribute("id"))?e.getAttribute("id"):"";
			cname=e.className||"";
			if (id.length||cname.length){
				break;
			}
		}
	}
	return id.length?id:cname;
}
WebTrends.prototype.dcsBind=function(event,func){
	if ((typeof(func)=="function")&&document.body){
		if (document.body.addEventListener){
			document.body.addEventListener(event, func.wtbind(this), true);
		}
		else if(document.body.attachEvent){
			document.body.attachEvent("on"+event, func.wtbind(this));
		}
	}
}
WebTrends.prototype.dcsET=function(){
	var e=(navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";
	this.dcsBind(e,this.dcsDownload);
	this.dcsBind(e,this.dcsJavaScript);
	this.dcsBind(e,this.dcsMailTo);
	this.dcsBind(e,this.dcsFormButton);
	this.dcsBind(e,this.dcsOffsite);
	this.dcsBind(e,this.dcsAnchor);
	this.dcsBind(e,this.dcsImageMap);
}
WebTrends.prototype.dcsMultiTrack=function(){
	var args=dcsMultiTrack.arguments?dcsMultiTrack.arguments:arguments;
	if (args.length%2==0){
	    this.dcsSaveProps(args);
		this.dcsSetProps(args);
		var dCurrent=new Date();
		this.DCS.dcsdat=dCurrent.getTime();
		this.dcsFPC();
		this.dcsTag();
		this.dcsRestoreProps();
	}
}

WebTrends.prototype.dcsCleanUp=function(){
	this.DCS={};
	this.WT={};
	this.DCSext={};
	if (arguments.length%2==0){
		this.dcsSetProps(arguments);
	}
}
WebTrends.prototype.dcsSetProps=function(args){
	for (var i=0;i<args.length;i+=2){
		if (args[i].indexOf('WT.')==0){
			this.WT[args[i].substring(3)]=args[i+1];
		}
		else if (args[i].indexOf('DCS.')==0){
			this.DCS[args[i].substring(4)]=args[i+1];
		}
		else if (args[i].indexOf('DCSext.')==0){
			this.DCSext[args[i].substring(7)]=args[i+1];
		}
	}
}
WebTrends.prototype.dcsSaveProps=function(args){
	var i,x,key,param;
	if (this.preserve){
		this.args=[];
		for (i=0,x=0;i<args.length;i+=2){
			param=args[i];
			if (param.indexOf('WT.')==0){
				key=param.substring(3);
				this.args[x]=param;
				this.args[x+1]=this.WT[key]||"";
				x+=2;
			}
			else if (param.indexOf('DCS.')==0){
				key=param.substring(4);
				this.args[x]=param;
				this.args[x+1]=this.DCS[key]||"";
				x+=2;
			}
			else if (param.indexOf('DCSext.')==0){
				key=param.substring(7);
				this.args[x]=param;
				this.args[x+1]=this.DCSext[key]||"";
				x+=2;
			}
		}
	}
}
WebTrends.prototype.dcsRestoreProps=function(){
	if (this.preserve){
		this.dcsSetProps(this.args);
		this.args=[];
	}
}
WebTrends.prototype.dcsSplit=function(list){
	var items=list.toLowerCase().split(",");
	var len=items.length;
	for (var i=0;i<len;i++){
		items[i]=items[i].replace(/^\s*/,"").replace(/\s*$/,"");
	}
	return items;
}
// Code section for Track clicks to download links.
WebTrends.prototype.dcsDownload=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    if (this.dcsIsOnsite(hn)&&this.dcsTypeMatch(e.pathname,this.downloadtypes)){
		        var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
		        var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
		        var ttl="";
		        var text=document.all?e.innerText:e.text;
		        var img=this.dcsEvt(evt,"IMG");
		        if (img.alt){
			        ttl=img.alt;
		        }
		        else if (text){
			        ttl=text;
		        }
		        else if (e.innerHTML){
			        ttl=e.innerHTML;
		        }
		        this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry",e.search||"","WT.ti","Download:"+ttl,"WT.dl","20","WT.nv",this.dcsNavigation(evt));
		    }
		}
	}
}
// Code section for Track clicks to MailTo links.
WebTrends.prototype.dcsMailTo = function(evt) {
    evt = evt || (window.event || "");
    if (evt && ((typeof (evt.which) != "number") || (evt.which == 1))) {
        var e = this.dcsEvt(evt, "A");
        if (e.href && e.protocol) {
            var qry = e.search ? e.search.substring(e.search.indexOf("?") + 1, e.search.length) : "";
            if (e.protocol.toLowerCase() == "mailto:") {
                this.dcsMultiTrack("DCS.dcssip", window.location.hostname, "DCS.dcsuri", e.href, "WT.ti", "MailTo:" + e.innerHTML, "WT.dl", "23", "WT.nv", this.dcsNavigation(evt));
            }
        }
    }
}
// Code section for Track clicks to JavaScript links.
WebTrends.prototype.dcsJavaScript = function(evt) {
    evt = evt || (window.event || "");
    if (evt && ((typeof (evt.which) != "number") || (evt.which == 1))) {
        var e = this.dcsEvt(evt, "A");
        if (e.href && e.protocol) {
            var qry = e.search ? e.search.substring(e.search.indexOf("?") + 1, e.search.length) : "";
            if (e.protocol.toLowerCase() == "javascript:") {
                this.dcsMultiTrack("DCS.dcssip", window.location.hostname, "DCS.dcsuri", e.href, "WT.ti", "JavaScript:" + e.innerHTML, "WT.dl", "22", "WT.nv", this.dcsNavigation(evt));
            }
        }
    }
}
// Code section for Track form button clicks.
WebTrends.prototype.dcsFormButton=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var tags=["INPUT","BUTTON"];
		for (var j=0;j<tags.length;j++){
			var e=this.dcsEvt(evt,tags[j]);
			var type=e.type||"";
			if (type&&((type=="submit")||(type=="image")||(type=="button")||(type=="reset"))||((type=="text")&&((evt.which||evt.keyCode)==13))){
				var uri="";
				var ttl="";
				var id=0;
				if (e.form){
					// begin: field capture
					// end: field capture
					uri=e.form.action||window.location.pathname;
					ttl=e.form.id||e.form.name||e.form.className||"Unknown";
					id=(e.form.method&&(e.form.method.toLowerCase()=="post"))?"27":"26";
				}
				else{
					uri=window.location.pathname;
					ttl=e.name||e.id||"Unknown";
					id=(tags[j].toLowerCase()=="input")?"28":"29";
				}
				if (uri&&ttl&&(evt.keyCode!=9)){
					this.dcsMultiTrack("DCS.dcsuri",uri,"WT.ti","FormButton:"+ttl,"WT.dl",id,"WT.nv",this.dcsNavigation(evt));
				}
				break;
			}
		}
	}
}
// Code section for Track clicks to links leading offsite.
WebTrends.prototype.dcsOffsite=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    var pr=e.protocol||"";
		    if ((hn.length>0)&&(pr.indexOf("http")==0)&&!this.dcsIsOnsite(hn)){
			    var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
			    var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
			    this.dcsMultiTrack("DCS.dcssip", hn, "DCS.dcsuri", pth, "DCS.dcsqry", this.trimoffsiteparams ? "" : qry, "DCS.dcsref", window.location, "WT.ti", "Offsite:" + hn + pth + (qry.length ? ("?" + qry) : ""), "WT.dl", "24", "WT.nv", this.dcsNavigation(evt));
		    }
		}
	}
}

// Code section for Track clicks to links that contain anchors.
WebTrends.prototype.dcsAnchor=function(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=this.dcsEvt(evt,"A");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    if (this.dcsIsOnsite(hn)&&e.hash&&(e.hash!="")&&(e.hash!="#")){
		        var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
			    var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
			    this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",escape(pth+e.hash),"WT.ti","Anchor:"+e.hash,"WT.dl","21","WT.nv",this.dcsNavigation(evt));
		    }
		}
	}
}
// Code section for clicks to image maps.
WebTrends.prototype.dcsImageMap=function(evt){
	evt=evt||(window.event||"");
	if (evt){
		var e=this.dcsEvt(evt,"AREA");
		if (e.href){
		    var hn=e.hostname?(e.hostname.split(":")[0]):"";
		    if ((hn!="")&&e.protocol&&(e.protocol.indexOf("http")!=-1)){
			    var ttl="";
			    var map=this.dcsEvt(evt,"MAP");
			    if (map){
			        if (map.name){
				        ttl=map.name;
			        }
			        else if (map.id){
				        ttl=map.id;
			        }
			    }
			    var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
			    this.dcsMultiTrack("DCS.dcssip",hn,"DCS.dcsuri",pth,"DCS.dcsqry",e.search||"","WT.ti","ImageMap:"+ttl,"WT.dl","30","WT.nv",this.dcsNavigation(evt));
		    }			
		}			
	}
}
WebTrends.prototype.dcsAdv=function(){
	if (this.trackevents&&(typeof(this.dcsET)=="function")){
		if (window.addEventListener){
			window.addEventListener("load",this.dcsET.wtbind(this),false);
		}
		else if (window.attachEvent){
			window.attachEvent("onload",this.dcsET.wtbind(this));
		}
	}
	this.dcsFPC();
	this.dcsAdSearch();
}
WebTrends.prototype.dcsVar=function(){
	var dCurrent=new Date();
	var WT=this.WT;
	var DCS=this.DCS;
	WT.tz=parseInt(dCurrent.getTimezoneOffset()/60*-1)||"0";
	WT.bh=dCurrent.getHours()||"0";
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		if (window.RegExp){
			var tire=new RegExp("^"+window.location.protocol+"//"+window.location.hostname+"\\s-\\s");
			WT.ti=document.title.replace(tire,"");
		}
		else{
			WT.ti=document.title;
		}
	}
	WT.js="Yes";
	WT.jv=(function(){
		var agt=navigator.userAgent.toLowerCase();
		var major=parseInt(navigator.appVersion);
		var mac=(agt.indexOf("mac")!=-1);
		var ff=(agt.indexOf("firefox")!=-1);
		var ff0=(agt.indexOf("firefox/0.")!=-1);
		var ff10=(agt.indexOf("firefox/1.0")!=-1);
		var ff15=(agt.indexOf("firefox/1.5")!=-1);
		var ff20=(agt.indexOf("firefox/2.0")!=-1);
		var ff3up=(ff&&!ff0&&!ff10&!ff15&!ff20);
		var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
		var nn4=(nn&&(major==4));
		var nn6up=(nn&&(major>=5));
		var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
		var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
		var ie5up=(ie&&!ie4);
		var op=(agt.indexOf("opera")!=-1);
		var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
		var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
		var op7up=(op&&!op5&&!op6);
		var jv="1.1";
		if (ff3up){
			jv="1.8";
		}
		else if (ff20){
			jv="1.7";
		}
		else if (ff15){
			jv="1.6";
		}
		else if (ff0||ff10||nn6up||op7up){
			jv="1.5";
		}
		else if ((mac&&ie5up)||op6){
			jv="1.4";
		}
		else if (ie5up||nn4||op5){
			jv="1.3";
		}
		else if (ie4){
			jv="1.2";
		}
		return jv;
	})();
	WT.ct="unknown";
	if (document.body&&document.body.addBehavior){
		try{
			document.body.addBehavior("#default#clientCaps");
			WT.ct=document.body.connectionType||"unknown";
			document.body.addBehavior("#default#homePage");
			WT.hp=document.body.isHomePage(location.href)?"1":"0";
		}
		catch(e){
		}
	}
	if (document.all){
		WT.bs=document.body?document.body.offsetWidth+"x"+document.body.offsetHeight:"unknown";
	}
	else{
		WT.bs=window.innerWidth+"x"+window.innerHeight;
	}
	WT.fv=(function(){
		var i,flash;
		if (window.ActiveXObject){
			for(i=15;i>0;i--){
				try{
					flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
					return i+".0";
				}
				catch(e){
				}
			}
		}
		else if (navigator.plugins&&navigator.plugins.length){
			for (i=0;i<navigator.plugins.length;i++){
				if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
					return navigator.plugins[i].description.split(" ")[2];
				}
			}
		}
		return "Not enabled";
	})();
	WT.slv=(function(){
		var slv="Not enabled";
		try{     
			if (navigator.userAgent.indexOf('MSIE')!=-1){
				var sli = new ActiveXObject('AgControl.AgControl');
				if (sli){
					slv="Unknown";
				}
			}
			else if (navigator.plugins["Silverlight Plug-In"]){
				slv="Unknown";
			}
		}
		catch(e){
		}
		if (slv!="Not enabled"){
			var i,m,M,F;
			if ((typeof(Silverlight)=="object")&&(typeof(Silverlight.isInstalled)=="function")){
				for(i=9;i>0;i--){
					M=i;
					if (Silverlight.isInstalled(M+".0")){
							break;
					}
					if (slv==M){
						break;
					}
				}
				for (m=9;m>=0;m--){
					F=M+"."+m;
					if (Silverlight.isInstalled(F)){
						slv=F;
						break;
					}
					if (slv==F){
						break;
					}
				}
			}
		}
		return slv;
	})();
	if (this.i18n){
		if (typeof(document.defaultCharset)=="string"){
			WT.le=document.defaultCharset;
		} 
		else if (typeof(document.characterSet)=="string"){
			WT.le=document.characterSet;
		}
		else{
			WT.le="unknown";
		}
	}
	WT.tv="9.4.0";
	WT.sp=this.splitvalue;
	WT.dl="0";
	WT.ssl=(window.location.protocol.indexOf('https:')==0)?"1":"0";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	WT.es=DCS.dcssip+DCS.dcsuri;
	if (window.location.search){
		DCS.dcsqry=window.location.search;
	}
	if (DCS.dcsqry){
		var dcsqry=DCS.dcsqry.toLowerCase();
		var params=this.paidsearchparams.length?this.paidsearchparams.toLowerCase().split(","):[];
		for (var i=0;i<params.length;i++){
			if (dcsqry.indexOf(params[i]+"=")!=-1){
				WT.srch="1";
				break;
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=window.document.referrer;
		}
	}

	DCS["dcscfg"] = this.TPCConfig.cfgType;
	
}
WebTrends.prototype.dcsEscape=function(S, REL){
	if (REL!=""){
		S=S.toString();
		for (var R in REL){
 			if (REL[R] instanceof RegExp){
				S=S.replace(REL[R],R);
 			}
		}
		return S;
	}
	else{
		return escape(S);
	}
}
WebTrends.prototype.dcsA=function(N,V){
	if (this.i18n&&(this.exre!="")&&!this.exre.test(N)){
		if (N=="dcsqry"){
			var newV="";
			var params=V.substring(1).split("&");
			for (var i=0;i<params.length;i++){
				var pair=params[i];
				var pos=pair.indexOf("=");
				if (pos!=-1){
					var key=pair.substring(0,pos);
					var val=pair.substring(pos+1);
					if (i!=0){
						newV+="&";
					}
					newV+=key+"="+this.dcsEncode(val);
				}
			}
			V=V.substring(0,1)+newV;
		}
		else{
			V=this.dcsEncode(V);
		}
	}
	return "&"+N+"="+this.dcsEscape(V, this.re);
}
WebTrends.prototype.dcsEncode=function(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}
WebTrends.prototype.dcsCreateImage=function(dcsSrc){
	if (document.images){
		this.images[this.index]=new Image();
		this.images[this.index].src=dcsSrc;
		this.index++;
	}
}
WebTrends.prototype.dcsMeta=function(){
	var elems;
	if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	else if (document.all){
		elems=document.all.tags("meta");
	}
	if (typeof(elems)!="undefined"){
		var length=elems.length;
		for (var i=0;i<length;i++){
			var name=elems.item(i).name;
			var content=elems.item(i).content;
			var equiv=elems.item(i).httpEquiv;
			if (name.length>0){
				if (name.toUpperCase().indexOf("WT.")==0){
					this.WT[name.substring(3)]=content;
				}
				else if (name.toUpperCase().indexOf("DCSEXT.")==0){
					this.DCSext[name.substring(7)]=content;
				}
				else if (name.toUpperCase().indexOf("DCS.")==0){
					this.DCS[name.substring(4)]=content;
				}
			}
		}
	}
}
WebTrends.prototype.dcsTag=function(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var WT=this.WT;
	var DCS=this.DCS;
	var DCSext=this.DCSext;
	var i18n=this.i18n;
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+this.domain+(this.dcsid==""?'':'/'+this.dcsid)+"/dcs.gif?";
	if (i18n){
		WT.dep="";
	}
	for (var N in DCS){
 		if (DCS[N]&&(typeof DCS[N]!="function")){
			P+=this.dcsA(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]&&(typeof WT[N]!="function")){
			P+=this.dcsA("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]&&(typeof DCSext[N]!="function")){
			if (i18n){
				WT.dep=(WT.dep.length==0)?N:(WT.dep+";"+N);
			}
			P+=this.dcsA(N,DCSext[N]);
		}
	}
	if (i18n&&(WT.dep.length>0)){
		P+=this.dcsA("WT.dep",WT.dep);
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	this.dcsCreateImage(P);
	this.WT.ad="";
}
WebTrends.prototype.dcsDebug=function(){
	var t=this;
	var i=t.images[0].src;
	var q=i.indexOf("?");
	var r=i.substring(0,q).split("/");
	var m="<b>Protocol</b><br><code>"+r[0]+"<br></code>";
	m+="<b>Domain</b><br><code>"+r[2]+"<br></code>";
	m+="<b>Path</b><br><code>/"+r[3]+"/"+r[4]+"<br></code>";
	m+="<b>Query Params</b><code>"+i.substring(q+1).replace(/\&/g,"<br>")+"</code>";
	m+="<br><b>Cookies</b><br><code>"+document.cookie.replace(/\;/g,"<br>")+"</code>";
	if (t.w&&!t.w.closed){
		t.w.close();
	}
	t.w=window.open("","dcsDebug","width=500,height=650,scrollbars=yes,resizable=yes");
	t.w.document.write(m);
	t.w.focus();
}
WebTrends.prototype.dcsCollect=function(){
    if (this.enabled){
        this.dcsVar();
        this.dcsMeta();
        this.dcsAdv();
        if (typeof(this.dcsCustom)=="function"){
			this.dcsCustom();
        }
        this.dcsTag();
    }
}

function dcsMultiTrack(){
	if (typeof(_tag)!="undefined"){
		return(_tag.dcsMultiTrack());
	}
}

function dcsDebug(){
	if (typeof(_tag)!="undefined"){
		return(_tag.dcsDebug());
	}
}

Function.prototype.wtbind = function(obj){
	var method=this;
	var temp=function(){
		return method.apply(obj,arguments);
	};
	return temp;
}