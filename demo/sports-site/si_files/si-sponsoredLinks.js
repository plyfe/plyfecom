(function($){$(document).ready(function(){var $post,$ads,$reinsert,targetElement;if(typeof window['adsonar_align']==='undefined'||typeof window['adsonar_post_id']==='undefined'){return;}
targetElement=(window['adsonar_blog_type']!=='undefined'&&window['adsonar_blog_type']!=='sports')?' DIV.body':' DIV.entry';$post=$('#post-'+window['adsonar_post_id']+targetElement);$ads=$('#si-sponsored-ad-dot-com');if(!$post.length||!$ads.length){return;}
switch(window['siPageInfo_blog']){case'swimdaily':break;case'extramustard':break;default:if(window['adsonar_align']=='right'){$reinsert=$post.children('DIV.wp-caption.alignright');if($reinsert.length>0){$reinsert.append($ads);}}else{$reinsert=$post.children('P');if($reinsert.length>0){$ads.insertAfter($reinsert[0]);}}
break;}
});}(jQuery));