var T1CVP=null;function pauseT1Video(){if(T1CVP==null){T1CVP=cnnCVP;}T1CVP.pause();}function playT1Video(b){var a=b.attr("id");var d=T1VideoList[a]||null;var c=b.siblings(".video-player");if(d!==null){cvpPlayT1(d.id,d.container,d.player);}else{siLog.error("T1 Video Play Error: No Data for "+a);}$("body").append('<div class="video-overlay-bg"></div>');$(".video-overlay-bg").show("slow",function(){b.siblings(".video-player").show("fast",function(){var e=$(".video-player");e.append('<span class="close">&nbsp;</span>');e.find("span.close").click(function(){e.hide();$(".video-overlay-bg").hide().remove();$("#siOverlayT1").css("visibility","visible");try{pauseT1Video();}catch(f){siLog(f);}$(this).unbind("click");});});});}$("#sitiT1 .t1-thumb-nav .t1-thumb").hover(function(){var a=$(this).attr("id");$("#sitiT1 li").removeClass("active");$("#sitiT1 .t1-thumb-nav .t1-thumb").removeClass("active");$("#sitiT1 li."+a).addClass("active");$(this).addClass("active");$("#sitiT1 li").hide();$("#sitiT1 li."+a).show();try{siLog.debug("T1 Tab Hovered",a);}catch(b){}},function(){try{siLog.debug("T1 hover callback called",t1);}catch(a){}});$("#sitiT1 li.video a, #sitiT1 li.video img#siOverlayT1").click(function(b){b.preventDefault();var a=($(this).attr("id").match(/t1_\d_video/)==null)?$(this).siblings("a.t1_video"):$(this);playT1Video(a);});$(".t1-thumb-nav div.video a").click(function(b){b.preventDefault();var c=$(this).parent().attr("id");var a=$("#sitiT1 ul li."+c).find(".t1_video");playT1Video(a);});