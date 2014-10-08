/* 
* Accessibility Virtual Buffer Update Utility 
* Method is invoked when new content needs is added to the DOM.
* Increments a hidden input in order to make new content visible
* to screen readers.
*
* $(el).tgtUpdateVirtualBuffer();
*/
(function(e){var t={init:function(t){return this.each(function(){e(this).data("bufferUpdateIncrement",0)})},update:function(){return this.each(function(){if(e(this).data("bufferUpdateIncrement")){var t=e(this).data("bufferUpdateIncrement")}else{var t=e(this).val()}t++;e(this).val(t);e(this).data("bufferUpdateIncrement",t)})}};e.fn.tgtUpdateVirtualBuffer=function(n){if(t[n]){return t[n].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof n==="object"||!n){return t.init.apply(this,arguments)}else{e.error("Method "+n+" does not exist on jQuery.tgtUpdateVirtualBuffer")}}})(jQuery);
