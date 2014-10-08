$(document).ready(function () {

    initComparisonFilter()
});

function initComparisonFilter() {

    // INIT ISOTOPE

    var $container = $('#shopBoxes');
    filters = {};


    $container.isotope({
        itemSelector: '.gridshopimage',
        getSortData: {
            designer: '.designer'
        },
        sortBy: 'original-order'
    });
    var totalFeatures = 0;
    // INIT FILTER SELECT LIST BUTTONS

    //$('#subcat_newNow li a').click(function () {

    //    var $this = $(this);
    //    var $optionSet = $this.parents('.option-set');
    //    var key = $optionSet.attr('data-option-key');
    //    // SORTING
    //    if (key == 'sortBy') {
    //        var sorter;
    //        var ascending;

    //        if ($(this).hasClass('.activeSort')) {

    //            $(this).removeClass('activeSort');

    //            // remove from filter group
    //            sorter = 'price';
    //            ascending = true;

    //        } else {

    //            $optionSet.find('.activeSort').removeClass('activeSort');
    //            $this.addClass('activeSort');

    //            sorter = 'original-order';//$this.attr('data-option-value');
    //            if ($this.attr('sortAscending') == 1) {
    //                ascending = true
    //            } else {
    //                ascending = false;
    //            }
    //            ascending = true;
    //        }
    //        //alert('key: ' + sorter);
    //        $container.isotope({ sortBy: sorter, sortAscending: ascending });

    //        // FILTERING	
    //    } else {

    //        var group = $optionSet.attr('data-filter-group');
    //        var myFilters = [];

    //        //if ($(this).hasClass('activeSort')) {

    //        //    $(this).removeClass('activeSort');

    //        //    // remove from filter group
    //        //    filters[group] = '';

    //        //} else {

    //            //$optionSet.find('.activeSort').removeClass('activeSort');
    //            //$this.addClass('activeSort');
    //            //$('#subcat_newNow').find('input:checkbox').removeAttr('checked');
    //            $this.find('input:checkbox').attr('checked', 'checked');
    //            filters[group] = $this.attr('data-filter-value');
    //        //}

    //        // add element to isotope array
    //        for (var prop in filters) {
    //            myFilters.push(filters[prop])
    //        }

    //        var selector = myFilters.join('');
    //        $container.isotope({ filter: selector, sortBy: 'original-order' });


    //        //$('#filterResults').html('<h2>' + countText() + '</h2>');

    //        //if ($container.data('isotope').$filteredAtoms.length == 0) {
    //        //    $('#noProducts').show('slow');
    //        //} else {
    //        //    $('#noProducts').hide('slow');
    //        //}

    //    }

    //    return false;
    //});

    function countBrands() {
        var brands = new Array();
        var j = 0;
        $('.isotope-item').each(function (index, element) {
            if (!$(this).hasClass('isotope-hidden')) {
                if (jQuery.inArray($(this).attr('brand'), brands) == -1) {
                    brands[j] = $(this).attr('brand');
                    j++;
                }
            }
        });
        return brands.length;
    }

    function countText() {
        //var brandText;
        //if (countBrands() == 1) {
        //	brandText = ' Brand and ';
        //} else {
        //	brandText = ' Brands and ';
        //}

        //var modelText;
        //if ($container.data('isotope').$filteredAtoms.length == 1) {
        //	modelText = ' model found';
        //} else {
        //	modelText = ' models found';
        //}

        //return countBrands()+brandText+$container.data('isotope').$filteredAtoms.length+modelText;
        var itemCount = $container.data('isotope').$filteredAtoms.length;

        if (itemCount == 0) {
            $('#no-results').html('No products match your criteria.');
        } else {
            $('#no-results').html('');
        }
    }

    // initialize with price hight to low
    $container.isotope({ sortBy: 'price', sortAscending: false });
    //$('#filterResults').html('<h2>'+countText()+'</h2>');
    //countText();
}


