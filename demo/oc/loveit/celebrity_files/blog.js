

function InitViews() {
    $('.views').each(function(i) { InitView(i); ShowViewsMain(i, 0); });

   
}

function InitView(id) {
    var imgs = new Array($('.views:eq(' + id + ') img').length);
    var imgsHTML = '';
    $('.views:eq(' + id + ') img').each(function(i) {
        imgs[i] = $('.views:eq(' + id + ') img').eq(i);
        imgsHTML += '<div class="views_th" onclick="ShowViewsMain(' + id + ',' + i + ')" ><div class="views_th_img"><img src="' + $('.views:eq(' + id + ') img').eq(i).attr('src') + '" width="75" alt="" /></div><div class="views_th_arr"></div></div>';
    });
    imgsHTML = '<div class="views_main"><img src="' + $('.views:eq(' + id + ') img').eq(0).attr('src') + '" width="407" alt="" /></div><div class="views_ths">' + imgsHTML + '</div>';

    $('.views:eq(' + id + ')').html(imgsHTML);

}

function ShowViewsMain(id, i) {
    $('.views:eq(' + id + ') .views_th_arr').hide();
    //   $('.views:eq(' + id + ') .views_th_arr').eq(i).show();
    $('.views:eq(' + id + ') .views_main img').attr('src', $('.views:eq(' + id + ') .views_th img').eq(i).attr('src'));
}

function check_comments_text(id) {
    if ($('#blog_comments_' + id).css('display') == 'block') {
        $('.blog_comments_text_' + id).html('return to blog');
        $('.blog_comments_count_' + id).hide();
    } else {
    $('.blog_comments_text_' + id).html('comments');
    $('.blog_comments_count_' + id).show();
    }
}
function blog_comments_click(PageID) {
    $('#blog_content_' + PageID).toggle(500);
    $('#blog_comments_' + PageID).toggle(500, function() { check_comments_text(PageID); });
}


$(document).ready(function() {
    var loc = location.href.toLowerCase();

    if (loc.indexOf('#w') != -1) {
        var id = parseInt(loc.substr(loc.indexOf('#w') + 2));
        $('#blog_comments_' + id).show(500);
        $('#blog_content_' + id).hide(500, function() { check_comments_text(id); });
    }
    var topics = '';
    $('#blog_side_content_topics li').each(function(i) {
        var title = $('#blog_side_content_topics li').eq(i).attr('title');

        if (topics.indexOf('>' + title + '<') == -1) {
            topics += '<a href="/entry.asp?sid=5&tag=' + title + '" class="block">' + title + '</a>'; //class="tag tag' + $('#blog_side_content_topics li[title="' + title + '"]').length + '"
        }
    });

    $('#blog_side_content_topics').html(topics);
    //$('#blog_side_content_topics a').tsort();


    InitViews();

    $('.txtComments').focus(function() {
        if ($.trim($(this).parent().parent().find('.pCode').html()).length == 0)
            $('.pCode').html('<input type="text" class="txtCode" name="Code" size="3" /><img src="/code.asp" alt="VCode" height="14" />');

    });


    $('.blog_comment_form form').submit(function() {
        return blog_comment_form_submit();
    });


    $('.blog_entry_img a:has(img)').addClass('blog_entry_img_remove');
  
    $('.blog_entry_img_remove').each(function(i) {
        $('.blog_entry_img_remove').eq(i).after($('.blog_entry_img_remove').eq(i).html());
    });
    $('.blog_entry_img_remove').remove();

    $('.blog_entry_img img').click(function() {
        $('.dlgPop').width(600);

        ShowPopSlide($(this).attr('src'), $(this).parent().attr('id').replace('blog_entry_img_', ''));
    });

    $('.blog_entry_img').each(function(i) {
        //$('.blog_entry_img:eq(' + i + ') img:eq(0)').after('<span class="lbtn" onclick="$(\'.dlgPop\').width(600); ShowPopSlide($(this).prev().attr(\'src\'));">ENLARGE</span> ');
        $('.blog_entry_img:eq(' + i + ') img:eq(0)').css('margin-top', '0px');
    });
});




function blog_comment_form_submit() {
    var obj = $('.formcomment');
     if ($(obj).find('.txtComments').val().length == 0) {
            alert('Please fill comment field.');
            $(obj).find('.txtComments').focus();
            return false;
        }

        return true;
}