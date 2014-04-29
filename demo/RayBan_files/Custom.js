$("#Code").addClass("lightText")
     // set default value
    .val("Enter booking code")
     // onfocus action
    .focus(function () {
        if ($(this).val() == "Enter booking code") {
            $(this).removeClass("lightText").val("");
        }
        // focus lost action
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("Enter booking code").addClass("lightText");
        }
    });

