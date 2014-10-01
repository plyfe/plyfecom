/*
 * @Target.ca Navigation
 * @Navigation functional logic.
 * @author paul.placido@target.com, stuart.milsten@target.com
 */

//-- Target.ca Navigation --//
TargetCA.navigation = {
    flag : false,
    width : 0,
    placeName : "",
    init : function() {
        this.width = window.innerWidth || 1200;
        this.aria();
        this.eventsListeners();
        this.currentPage();
        this.sideNavigation.init();
        //this.redCardImages();
        this.replaceCSSTransitions();
    },
    aria: function(){
        var nav = $('.gn--list'),
            topLevel = $('.gn--top-level'),
            dropdown = $('.gn--dd'),
            plusMinus = $('.gn--dd-toggle img'),
            plusMinus_SL = $('#filterToggle img'), // side menu SL store options
            plusMinus_viewall = $('.plusMinus img'), // View All Stores
            navLang = ($( "body" ).hasClass( "fr" ))?'fr':'en',
            screenReaderCopy = {
                'en': {
                    'expand': 'Expand',
                    'collapse': 'Collapse'
                },
                'fr': {
                    'expand': 'Agrandir',
                    'collapse': 'Réduire'
                }
            };

        plusMinus.attr('alt', screenReaderCopy[navLang].expand);
        plusMinus_SL.attr('alt', screenReaderCopy[navLang].expand); // sets default alt text on page load 
        plusMinus_viewall.attr('alt', screenReaderCopy[navLang].expand); // sets default alt text on page load 

        // Add tab stop to title in locations menu to provide more context for user
        $('.locations .gn--dd-title').attr('tabindex', 0);

        // nav.attr('role', 'menubar');

        // topLevel.attr('role', 'menuitem');
        // topLevel.each(function(){
        //     var item = $(this);

        //     if(item.find('.gn--dd').length > 0){
        //         item.attr('aria-haspopup', 'true');
        //     }
        // })

        // dropdown.attr({
        //     'role': 'menu',
        //     'aria-hidden': true
        // });
    },
    resizing : function() {
        this.width = window.innerWidth || 1200;
        this.sideNavigation.resizing();
        this.navDropdownResize();
        //this.redCardImages();
        this.replaceCSSTransitions();
    },
    replaceCSSTransitions: function() {
        var browserVersion = 10;
        if ($.browser.msie) {
            browserVersion = parseInt($.browser.version, 10);
        }
        if(this.width <= 1024){
            $('.gn--list').addClass('display_none');
        }
        if(this.width >= 1025 || browserVersion <= 8 ){
            $('.gn--list').removeAttr('style').removeClass('display_none');
            $('.gn--dd').removeAttr('style');
            $('.gn--top-level').removeClass('open');
        }
    },
    matchDropdownHeight : function(clicked) {
        if (TargetCA.navigation.width > 720 && TargetCA.navigation.width < 1025){
            $('.gn--list, .gn--dd').css('minHeight','0');
            var dropdownHeight = $(clicked).children('.gn--dd').outerHeight();
            var navListHeight = $('.gn--list').outerHeight();
            if (dropdownHeight > navListHeight) {
                $('.gn--list').css('minHeight', dropdownHeight);
            } else {
                $('.gn--dd').css('minHeight', navListHeight);
            }
        }
    },
    eventsListeners : function() {
        $('.gn--top-level')
            //hover-in event
            .mouseenter(function(){
                //desktop only
                var this_div = $(this);
                if (TargetCA.navigation.width >= 1024 || $('body').is('.ie7, .ie8')){
                    $('.gn--top-level').removeClass('open');
                    this_div.children('.gn--dd').removeClass('display_none').addClass('display_block');//.attr('aria-hidden', false);
                    function displayOn(){
                        this_div.addClass('open');
                    }
                    setTimeout(displayOn,10);
                    this_div.parent().addClass('hovering');
                }
            })
            //hover-out event
            .mouseleave(function(){
                //desktop only
                var this_div = $(this);
                if (TargetCA.navigation.width >= 1024 || $('body').is('.ie7, .ie8')){
                    $(this).removeClass('open');
                    function displayOff(){
                        this_div.children('.gn--dd').removeClass('display_block').addClass('display_none');//.attr('aria-hidden', true);
                    }
                    setTimeout(displayOff,200);
                    //$(this).children('.gn--dd').addEventListener("animationend", function() {
                    //  this_div.children('.gn--dd').removeClass('display_block').addClass('display_none');
                    //}, false);

                    $(this).parent().removeClass('hovering');
                }
            })
            //tab-in event
            .focusin(function(){
                $('.gn--top-level').removeClass('open');
                $(this).addClass('open');
                $(this).children('.gn--dd').removeClass('display_none').addClass('display_block');
            })
            //tab-out event
            .focusout(function(event){
                var $topLevelMenu = $(this);
                setTimeout(function(){
                    if($topLevelMenu.find(':focus').length === 0 && $(document.activeElement).attr('tabindex') !== '0'){
                        if(! $(event.target).is('#postalCode') ){
                            $topLevelMenu.removeClass('open');
                            $topLevelMenu.children('.gn--dd').removeClass('display_block').addClass('display_none');
                        }
                    }
                }, 10);
            })
            //click event
            .mousedown(function(event){
                if (TargetCA.navigation.width <= 1024){

                    //serious hack (for now)
                    //$("video").eq(1).hide();
                    if ($(event.target).is('.gn--dd-toggle, .gn--dd-toggle img, .gn--top-level-link.more')) {
                        var tabThisDiv = $(this);
                        if ($(this).hasClass('open')) {
                            $('.gn--top-level').removeClass('open');
                            $(this).parent().removeClass('open');
                            function tabletDisplayOff(){
                                $('.gn--dd').removeClass('display_block').addClass('display_none');
                                tabThisDiv.children('.gn--dd').removeClass('display_block').addClass('display_none');
                                $(this).parent().removeClass('open');
                            }
                            setTimeout(tabletDisplayOff,210);
                        }
                        else {
                            $('.gn--top-level').removeClass('open');
                            $('.gn--dd').removeClass('display_block').addClass('display_none');
                            $(this).children('.gn--dd').removeClass('display_none').addClass('display_block');
                            function tabletDisplayOn(){
                                tabThisDiv.addClass('open').parent().addClass('open');
                            }
                            setTimeout(tabletDisplayOn,20);
                            //if tablet, match height of dropdown with .gn--list
                            var clicked = this;
                            TargetCA.navigation.matchDropdownHeight(clicked);
                        }
                        event.preventDefault();
                    }
                }
            })
            .bind('touchstart', function(e){
                //desktop only
                if (TargetCA.navigation.width > 1024){
                    var touchThisDiv = $(this);
                    if (!$(this).hasClass('open')) {
                        $('.gn--top-level').removeClass('open');
                        $('.gn--dd').removeClass('display_block').addClass('display_none');
                        $(this).children('.gn--dd').removeClass('display_none').addClass('display_block');
                        function touchDisplayOn(){
                            touchThisDiv.addClass('open').parent().addClass('open');
                        }
                        setTimeout(touchDisplayOn,20);
                        return false;
                    }
                    //checks if element exists
                    if ($('.offclickobject').is(":visible")) {
                        $('.offclickobject').hide();
                    }
                    else {
                        //adds object behind nav to close it when clicked away from
                        $('.offclickobject').show();
                    }
                }
            });

        $('.gn--logo')
            .keydown(function(e){
                if(e.keyCode != 37 && e.keyCode != 39) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                var link = $(this);

                switch(e.keyCode) {
                    case 37: // left arrow
                        link.next('ul').find('> li').filter(':visible').last().find('a').first().focus();
                        break;
                    case 39: // right arrow
                        link.next('ul').find('> li').filter(':visible').first().find('a').first().focus();
                        break;
                }
            });

        $('.gn--top-level-link')
            .keydown(function(e){
                if(e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 40) {
                    return;
                }

                var link = $(this);

                switch(e.keyCode) {
                    case 37: // left arrow
                        e.preventDefault();
                        e.stopPropagation();
                        // This is the first item
                        if(link.parent('li').prevAll('li').filter(':visible').first().length == 0) {
                            // Focus on the logo since it's first in the navigation
                            $('.gn--logo').focus();
                        } else {
                            link.parent('li').prevAll('li').filter(':visible').first().find('a').first().focus();
                        }
                        break;
                    case 39: // right arrow
                        e.preventDefault();
                        e.stopPropagation();
                        // This is the last item
                        if(link.parent('li').nextAll('li').filter(':visible').first().length == 0) {
                            // Focus on the logo since it's first in the navigation
                            $('.gn--logo').focus();
                        } else {
                            link.parent('li').nextAll('li').filter(':visible').first().find('a').first().focus();
                        }
                        break;
                    case 40: // down arrow
                        var dropdown = link.parent('li').find('.gn--dd');
                        if(dropdown.length > 0){
                            e.preventDefault();
                            e.stopPropagation();
                            dropdown.find('a, input[type="text"], button, [tabindex=0]').filter(':visible').first().focus();
                        }
                        break;
                }
            });

        $('.gn--dd').find('a, input[type="text"], button, [tabindex=0]').each(function(){
            $(this).keydown(function(e){
                 if(e.keyCode != 27 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                var item = $(this);

                switch(e.keyCode) {
                    case 27: // esc key
                        item.parents('.gn--top-level').find('a').first().focus();
                        break;
                    case 37: // left arrow
                    case 38: /// up arrow
                        var elements = item.parents('.gn--dd').find('a, input[type="text"], button, [tabindex=0]').filter(':visible'),
                            prev = elements.eq(elements.index(item) - 1);

                        if(elements.index(item) - 1 >= 0){
                            prev.focus();
                        } else {
                            item.parents('.gn--top-level').find('a').first().focus();
                        }
                        break;
                    case 39: // right arrow
                    case 40: //down arrow
                        var elements = item.parents('.gn--dd').find('a, input[type="text"],input[type="image"], button, [tabindex=0]').filter(':visible'),
                            next = elements.eq(elements.index(item) + 1);

                        if(next.length > 0){
                            next.focus();
                        } else {
                            elements.first().focus();
                        }
                        break;
                }
            });
        });
        
        //prevent click on "more" tab from following anchor url
        $('.gn--top-level-link.more').click(function(e){
            return false;
        });
        //prevent click on toggle from following anchor url
        $('.gn--dd-toggle, .gn--dd-toggle img').click(function(e){
            return false;
        });
        //dropdown show/hide buttom (tablet and phones)
        $('.gn--expand').click(function(e){
            if($('.gn--expand').hasClass('open')){
                $('.gn--expand, .gn').removeClass('open');
                if (TargetCA.navigation.width > 720) {
                    $('.gn--list').fadeOut(400);
                } else {
                    $('.gn--list').animate({"left": "-100%"}, 300, function() {
                        $(this).hide();
                    });
                }
            }else{
                $('.gn--expand, .gn').addClass('open');
                if (TargetCA.navigation.width > 720) {
                    $('.gn--list').css('left','0').fadeIn(400);
                } else {
                    $('.gn--list').show().animate({"left": "0"}, 300);
                }
            }
            //checks if element exists
            if ($('.offclickobject').is(":visible")) {
                $('.offclickobject').hide();
                $("video").eq(1).show();
				$( ".white-wrap video" ).eq(0).show();
				$( ".white-wrap video" ).eq(1).show();
            } else {
                //adds object behind nav to close it when clicked away from
                $('.offclickobject').show();
                $('.gn--list').attr('tabIndex',-1).focus();
                $('body, html').scrollTop(0);
                $("video").eq(1).hide();
				$( ".white-wrap video" ).eq(0).hide();
				$( ".white-wrap video" ).eq(1).hide();
            }
            e.preventDefault();
        });
        //closes nav when clicked off of
        $('.offclickobject').click(function() {
            $(this).hide();
            $('.gn--top-level, .gn--list').removeClass('open');

            //remove nav
            if (TargetCA.navigation.width > 720) {
                $('.gn--list').fadeOut(400);
            } else {
                $('.gn--list').animate({"left": "-100%"}, 300, function() {
                    $(this).hide();
                });
            }

            //if desktop
            if (TargetCA.navigation.width > 1024){
                $('.gn--top-level').removeClass('open');
                $('.gn--dd').removeClass('display_block').addClass('display_none');
            }
            else {
                $('.gn--expand').removeClass('open');
                $('.gn').removeClass('open');
                $('.gn--list').removeClass('display_block').addClass('display_none');
                $('.gn--dd').removeClass('display_block').addClass('display_none');
            }

        });
        $(".storeLinks").click(function(){
            if (!$('body').hasClass('ie')) {
                returnMyStorage().longitude = $(this).attr("data-longitude");
                returnMyStorage().latitude = $(this).attr("data-latitude");
            }
        });
    },
    navDropdownResize: function() {
        if (this.width < 721) {
            $('.gn--dd').css('minHeight', '');
        }
    },
    /*redCardImages : function() {
        if(window.innerWidth > 1024){
            if ($('body').hasClass('fr')) {
                $('img.debitCardImg').attr('src', 'http://cadev.target.com.php53-11.dfw1-2.websitetestlink.com/assets/images/header/debitCard_desktop_fr.jpg');
                $('img.masterCardImg').attr('src', 'http://cadev.target.com.php53-11.dfw1-2.websitetestlink.com/assets/images/header/masterCard_desktop_fr.jpg');
            }
            else {
                $('img.debitCardImg').attr('src', 'http://cadev.target.com.php53-11.dfw1-2.websitetestlink.com/assets/images/header/debitCard_desktop.jpg');
                $('img.masterCardImg').attr('src', 'http://cadev.target.com.php53-11.dfw1-2.websitetestlink.com/assets/images/header/masterCard_desktop.jpg');
            }
        } else {
            if ($('body').hasClass('fr')) {
                $('img.debitCardImg').attr('src', 'http://cadev.target.com.php53-11.dfw1-2.websitetestlink.com/assets/images/header/debitCard_fr.jpg');
                $('img.masterCardImg').attr('src', 'http://cadev.target.com.php53-11.dfw1-2.websitetestlink.com/assets/images/header/masterCard_fr.jpg');
            }
            else {
                $('img.debitCardImg').attr('src', 'http://cadev.target.com.php53-11.dfw1-2.websitetestlink.com/assets/images/header/debitCard.jpg');
                $('img.masterCardImg').attr('src', 'http://cadev.target.com.php53-11.dfw1-2.websitetestlink.com/assets/images/header/masterCard.jpg');
            }
        }
    },*/
    currentPage : function(){
        this.currentURL = window.location.pathname;
        //array of all main links in the nav
        this.navLinks = ['locations','whatsinstore','pharmacy','redcard','careers','coupons','ourcompany','corporate'];

        for (var i=0; i<this.navLinks.length; i++){
            this.stringIndex = this.currentURL.indexOf(this.navLinks[i]);
            //checks if string exists and begins less than 5 characters into the URL path
            if(this.stringIndex != -1 && this.stringIndex < 5){
                $(".gn--list ." + this.navLinks[i]).addClass("currentPage");
            }
        }
    },
    setNavStores :function(data) {
        if (data.length <= 0){
            if ($('body').hasClass('fr')) {
                $(".gn--dd.locations .gn--dd-title").html("Magasins Target près de chez vous : <span class='noStoresNearYou'> Malheureusement, il n’y a aucun magasin dans un rayon de 100 km.</span>");
            } else {
                $(".gn--dd.locations .gn--dd-title").html("Target stores nearest you: <span class='noStoresNearYou'> Unfortunately, there aren’t any stores within 100 km.</span>");
            }
            if($(".gn--top-level.locations dropdown").hasClass("currentPage")){
                $(".gn--dd.locations .gn--dd-title .noStoresNearYou").attr('tabindex',0).focus();
            }
			$(".gn--dd.locations .closest-store").hide();

            return;

        } else {
            if ($('body').hasClass('fr')) {
                $(".gn--dd.locations .gn--dd-title").html("Magasin<span id='plural'></span> Target près <span id='conjugation'></span><span id='submittedText'></span> : ");
            } else {
                $(".gn--dd.locations .gn--dd-title").html("Target store<span id='plural'></span> nearest <span id='submittedText'></span>: ");
            }
            $(".gn--dd.locations .closest-store").show();
        }

        $("ol.closest-stores .closest-store").hide();
        $("ol.closest-stores .closest-store a").children().empty();

        $("#submittedText").text(data[0].Address.City);

        if (data.length <= 3) {
            var length = data.length;
        } else {
            var length = 3;
        }

        for(var x = 0; x < length; x++){
            // Parses placeName into an array, checks to see if the first letter is a vowel, then applies the proper conjugation...
            if (data[x].Address) {
                var nameArr = data[x].Address.City.split("");
            }

            if (nameArr[0]=='A'||nameArr[0]=='E'||nameArr[0]=='I'||nameArr[0]=='O'||nameArr[0]=='U') {
                $('#conjugation').text('d\'');
            } else if (nameArr[0]=='Y') {
                $('#conjugation').text('à ');
            } else {
                $('#conjugation').text('de ');
            }
            // Determine if value is plural or not...
            if (data.length == 1) {
                $('#plural').hide();
            } else {
                $('#plural').text('s');
            }

            $("#store" + x).show();
            $("#store" + x + " .mediaName").text(data[x].Name);
            $("#store" + x + " .address").text(data[x].Address.AddressLine1);
            $("#store" + x + " .city").text(data[x].Address.City + ", ");
            $("#store" + x + " .providence").text(data[x].Address.Subdivision + " ");
            $("#store" + x + " .postalCode").text(" " + data[x].Address.PostalCode + " ");
            $("#store" + x + " .country").text(data[x].Address.CountryName);

            // Set up each link with store's lat/long in a query string
            //var href = $("#store" + x + " .storeLinks").attr("href");
            //console.log(window.location.pathname);
            $("#store" + x + " .storeLinks").attr('href', '');
            var href = window.location.protocol + "//" + window.location.host + TargetCA.helpers.translation('/fr/','/en/') + 'locations';
            $("#store" + x + " .storeLinks").attr('href', href + '?lat=' + data[x].Address.Latitude + '&lng=' + data[x].Address.Longitude);

            // Determine if store is open or yet to be opened...
            if (data[x].storeLocatorOpenDate) {
                $("#store" + x + " .openSeason").text(TargetCA.helpers.translation("Ouverture ","opening in ") + data[x].storeLocatorOpenDate);
            }

            // Hide capabilities initially...
            $("#store" + x + " .pharmacyI").hide();
            $("#store" + x + " .starbucksIconImage").hide();
            $("#store" + x + " .mobileIconImage").hide();

            // Check for capabilities and iterate through them...
            if(typeof(data[x].Capability) === 'object') {
                if (data[x].Capability.length > 0) {
                    for(var i = 0; i < data[x].Capability.length; i++) {
                        if (data[x].Capability[i].CapabilityName == "Pharmacy") {
                            $("#store" + x + " .pharmacyI").show();
                            $("#store" + x + " .pharmacyI").html('<img src="'+fullpath+'/assets/images/storelocator/pharmacy-icon.png"  title="' + TargetCA.helpers.translation('Pharmacie','Pharmacy') + '"/></span>');
                        }
                        if (data[x].Capability[i].CapabilityName == "Starbucks") {
							$("#store" + x + " .starbucksIconImage").show();
							$("#store" + x + " .starbucksIconImage").html('<img src="'+fullpath+'/assets/images/capability-icons-smaller.png"/></span>');
                            //$("#store" + x + " .starBucksI").text(TargetCA.helpers.translation("Starbucks","Starbucks"));
                        }
                        if (data[x].Capability[i].CapabilityName == "Mobile Kiosk") {
                            $("#store" + x + " .mobileIconImage").show();
                            $("#store" + x + " .mobileIconImage").html('<img src="'+fullpath+'/assets/images/capability-icons-smaller.png"/></span>');
                            
                        }
                    }
                }
            }
        }

        var currentTallest = 0;
        if (TargetCA.navigation.width > 1024) {
            $('.gn .closest-store').each(function(i){
                if($(this).height() > currentTallest) {
                    currentTallest = $(this).height();
                }
            });
            $('.gn .closest-store').css({'min-height': currentTallest});
        }
    },
    sideNavigation: {
        width: 0,
        init: function() {
            this.width = $(window).width();
            this.resizing();
            var currentPath = window.location.pathname;

            if(currentPath.charAt( currentPath.length-1 ) == "/") {
                currentPath = currentPath.slice(0, -1);
            }
            $('.Nav_3d_Level a').each(function(){
                var anchorHref = $(this).attr('href');
                anchorHref = anchorHref.slice( 0, anchorHref.indexOf( "?" ) );
                if( anchorHref == currentPath ){
                    $(this).parent().addClass('current');
                }
            });
        },
        resizing: function(){
            this.width = $(window).width();
            if($('.main-body .Nav_3d_Level > ul').css('position') == 'absolute' && $('.main-body .Nav_3d_Level > ul li:first-child a').css('width') != '144px' ){
                if(!$('#expandCollapseIcon').length){
                    var sidenavLang = ($( "body" ).hasClass( "fr" ))?'fr':'en';
                    var screenReaderCopy = {
                        'en': {
                            'expand': 'Expand',
                            'collapse': 'Collapse'
                        },
                        'fr': {
                            'expand': 'Agrandir',
                            'collapse': 'RÃ©duire'
                        }
                    }
                    var secondary_ul = $('.Nav_3d_Level ul.secondary');
                    $('.Nav_3d_Level ul.secondary').remove();
                    $('.Nav_3d_Level li:first-child').append('<a href="#expandCollapseIcon" id="expandCollapseIcon"><span><span class="screen-reader-only">' + screenReaderCopy[sidenavLang].expand + '</span></span></a>');
                    $('.Nav_3d_Level li:first-child').append(secondary_ul);
                    $('#expandCollapseIcon').click(function(){
                        $('.Nav_3d_Level').toggleClass('open');
                        if($('.Nav_3d_Level').hasClass('open')){
                            $('.Nav_3d_Level .screen-reader-only').html(screenReaderCopy[sidenavLang].collapse);
                        } else {
                            $('.Nav_3d_Level .screen-reader-only').html(screenReaderCopy[sidenavLang].expand);
                        }
                        return false;
                    });
                }
            } else {
                if($('#expandCollapseIcon').length){
                    $('#expandCollapseIcon').remove();
                    $('.Nav_3d_Level').removeClass('open');
                }
            }
        }
    }
}