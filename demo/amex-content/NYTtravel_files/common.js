require(['jquery/nyt'], function($) {
    $(document).ready(function () {
        $(".toggleContent").on("click", ".showContent", function() {
            $(this).hide().parents(".toggleContent").find(".hiddenContent").slideDown("fast");
        });
    });
});
