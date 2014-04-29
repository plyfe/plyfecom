/*
field declaration
flexModelBarParams/mb: ModelBar Params
mainFolderPath: url to main Photo Folder
modelBarThumbnailFolder: Folder Name for Thumbnails
modelBarPopUpFolder: Folder Name for Pop-Ups
*/

(function ($) {
  $.fn.dealerOnFlexModelBar = function (options) {
    var defaults = {
      mb: '',
      mainFolderPath: cdnPath + 'photo/',
      modelBarThumbnailFolder: 'pixt148',
      modelBarPopUpFolder: 'pixt320'
    }

    var options = $.extend(defaults, options);
    var o = options;

    var flexModelBarParams;

    var modelBarArr = [];
    var modelBarCustomArr = [];
    var modelBarCustomButtonArr = [];
    var modelBarButtonArr = [];
    var modelBarButtonLabelArr = [];
    var modelBarThumbnailsArr = [];
    var modelBarWidgetWidth;
    var modelBarModelpl = 0;
    var modelBarModelLine = 1;
    var thumbnailElm;
    var modelBarStyle = 0;
    var popUpElm;
    var extItem = {};
    var tagLine = false;
    var showPopUp = true;


    var obj = $(this);
    if (o.mb != '') flexModelBarParams = o.mb;

    modelBarArr = eval(flexModelBarParams.mb);
    if (typeof (flexModelBarParams.cmi) != 'undefined') {
      modelBarCustomArr = eval(flexModelBarParams.cmi);
    }
    else {
      modelBarCustomArr = new Array();
    }
    modelBarCustomButtonArr = eval(flexModelBarParams.cmb);
    modelBarButtonArr = eval(flexModelBarParams.bt);
    modelBarButtonLabelArr = eval(flexModelBarParams.bl);
    modelBarThumbnailsArr = eval(flexModelBarParams.th);

    if (typeof (modelBarThumbnailsArr.act) != 'undefined') {
      if (modelBarThumbnailsArr.act == 1)
        tagLine = true;
    }

    if (typeof (modelBarThumbnailsArr.acp) != 'undefined') {
      if (modelBarThumbnailsArr.acp == 1)
        showPopUp = false;
    }


    var modelBarThumbnailContainer = 0;
    if (typeof (modelBarThumbnailsArr.tc) != 'undefined') {
      modelBarThumbnailContainer = modelBarThumbnailsArr.tc;
    }
    var modelBarThumbnailWidth = modelBarThumbnailsArr.tw;
    var modelBarThumbnailHeight = modelBarThumbnailsArr.th;
    var modelBarPopUpWidth = modelBarThumbnailsArr.pw;
    var modelBarPopUpHeight = modelBarThumbnailsArr.ph;
    var modelBarThumbnailAngle = modelBarThumbnailsArr.ta;
    var modelBarPopUpAngle = modelBarThumbnailsArr.pa;
    var modelBarPopUpDirection = 1;
    if (typeof (modelBarThumbnailsArr.pd) != 'undefined') {
      modelBarPopUpDirection = modelBarThumbnailsArr.pd;
    }

    if (typeof (modelBarThumbnailsArr.style) != 'undefined') {
      modelBarStyle = modelBarThumbnailsArr.style;
    }
    var buttonStart = modelBarButtonArr.tp;
    var buttonGap = modelBarButtonArr.sb;

    return this.each(function () {
      activateModelBar();
    });

    //Declarations Start
    function activateModelBar() {
      thumbnailElm = obj.find('ul').first();
      popUpElm = obj.find('div').first();
      var mbPhotoThb;
      var mbPhotoPop;
      modelBarWidgetWidth = obj.css('width').replace('px', '');
      modelBarModelpl = Math.floor(modelBarWidgetWidth / modelBarThumbnailWidth);
      modelBarModelLine = Math.ceil((modelBarArr.length + modelBarCustomArr.length) / modelBarModelpl);

      $.each(modelBarArr, function (i, item) {
        extItem = modelBarExt(item);

        if (typeof (item.photo) != 'undefined') {
          mbPhotoThb = item.photo;
          mbPhotoPop = item.photo;
        }
        else if (typeof (item.thuPhoto) != 'undefined') {
          mbPhotoThb = item.thuPhoto;
          mbPhotoPop = item.popPhoto;
        }

        if (typeof (item.type) != 'undefined') {
          // Build Thumbnails 
          thumbnailElm.append('<li id="' + valueCheck(item.model, 1) + '"><p class="mbThbImg"><img alt="' + item.year + ' ' + item.make + ' ' + extItem.mo + '" width="' + modelBarThumbnailWidth + '" src="' + modelBarPhoto(mbPhotoThb, 1, item.type) + '" /></p>' + modelBarElmTitle(item.year, item.make, extItem.mo, 0) + modelBarMpg(item.mpg, 0) + '</li>');
          // Build Pop-Ups
          popUpElm.append('<div id="' + valueCheck(item.model, 1) + '_p"><img alt="' + item.year + ' ' + item.make + ' ' + extItem.mo + '" src="' + modelBarPhoto(mbPhotoPop, 0, item.type) + '" />' + modelBarButtons(item, extItem) + modelBarMpg(item.mpg, 1) + modelBarTag(extItem.tag) + '</div>');
        }
        else {

          // Build Thumbnails 
          thumbnailElm.append('<li id="' + valueCheck(item.model, 1) + '"><p class="mbThbImg"><img alt="' + item.year + ' ' + item.make + ' ' + extItem.mo + '" width="' + modelBarThumbnailWidth + '" src="' + modelBarPhoto(mbPhotoThb, 1, 'mbDb') + '" /></p>' + modelBarElmTitle(item.year, item.make, extItem.mo, 0) + modelBarMpg(item.mpg, 0) + '</li>');
          // Build Pop-Ups
          popUpElm.append('<div id="' + valueCheck(item.model, 1) + '_p"><img alt="' + item.year + ' ' + item.make + ' ' + extItem.mo + '" src="' + modelBarPhoto(mbPhotoPop, 0, 'mbDb') + '" />' + modelBarButtons(item, extItem) + modelBarMpg(item.mpg, 1) + modelBarTag(extItem.tag) + '</div>');
        }
      });

      if (modelBarThumbnailContainer > 0) {
        thumbnailElm.find('.mbThbImg').each(function () {
          $(this).css('height', modelBarThumbnailContainer + 'px');
        });
      }
      //________ Custom Items

      $.each(modelBarCustomArr, function (i, item) {
        extItem = modelBarExt(item);

        // Build Custom Thumbnails 
        thumbnailElm.append('<li class="mbCustonThu" id="' + valueCheck(item.model, 1) + '"><p class="mbThbImg"><img alt="' + item.year + ' ' + item.make + ' ' + item.model + '" width="' + modelBarThumbnailWidth + '" src="' + item.thuPhoto.toLowerCase() + '" /></p>' + modelBarElmTitle(item.year, item.make, item.model, 0) + modelBarMpg(item.mpg, 0) + '</li>');

        // Build Custom Pop-Ups
        popUpElm.append('<div class="mbCustonPop" id="' + valueCheck(item.model, 1) + '_p"><img alt="' + item.year + ' ' + item.make + ' ' + item.model + '" src="' + item.popPhoto.toLowerCase() + '" />' + modelBarButtons(item, extItem) + modelBarMpg(item.mpg, 1) + modelBarTag(item.tag) + '</div>');
      });

      //_______________

      // Add Click to main thumbnail
      if (modelBarThumbnailsArr.ac == 1) {
        thumbnailElm.find('li').each(function (i) {
          $(this).bind('click', ThumbnailClick);
        });
      }

      // only activate pop-ups if we want to show them
      if (showPopUp) {

        // Add events to Thumbnails
        thumbnailElm.find('li').each(function () {
          $(this).css({ 'width': modelBarThumbnailWidth, 'height': modelBarThumbnailHeight });

          var step = 5;
          var time = 100;
          var hideDelay = 60;
          var hideDelayTimer = null;
          var beingShown = false;
          var shown = false;

          var trigger = $(this);
          var elm = $(this).attr('id');
          var popup = $('#' + elm + '_p').css('opacity', 0);

          $([trigger.get(0), popup.get(0)]).mouseover(function () {
            if (hideDelayTimer) clearTimeout(hideDelayTimer);
            if (beingShown || shown) {
              // don't trigger the animation again
              return;
            } else {
              // reset position of popUp 
              beingShown = true;
              popup.css({
                height: modelBarPopUpHeight,
                display: 'block'
              }).animate({
                height: modelBarPopUpHeight,
                opacity: 1
              }, time, 'swing', function () {
                beingShown = false;
                shown = true;
              });
            }
            return false;
          }).mouseout(function () {
            if (hideDelayTimer) clearTimeout(hideDelayTimer);
            hideDelayTimer = setTimeout(function () {
              hideDelayTimer = null;
              popup.animate({
                height: '-=' + step + 'px',
                opacity: 0
              }, time, 'swing', function () {
                shown = false;
                popup.css('display', 'none');
              });
            }, hideDelay);
            return false;
          });
        });

        // Add Pop-Up events
        popUpElm.find('div').each(function (i) {
          var comNum;
          var j;
          var k = 1;
          var counter = i + 1;

          if (counter <= modelBarModelpl) {
            j = i;
          }
          else {
            if (counter % modelBarModelpl == 0) {
              k = Math.floor((counter - 1) / modelBarModelpl);
            }
            else {
              k = Math.floor(counter / modelBarModelpl);
            }
            j = (counter - 1) - modelBarModelpl * k;
          }

          // Calculate top Position Value
          var $Up = true;
          var $offsetTop = $(this).offset().top;

          if ($offsetTop < modelBarPopUpHeight) {
            $Up = false;
          }

          if (modelBarPopUpDirection == 2) {
            $Up = true;
          }
          else if (modelBarPopUpDirection == 3) {
            $Up = false;
          }

          if ($Up) {
            if (counter <= modelBarModelpl) {
              $(this).css('bottom', '0');
            }
            else {
              $(this).css('bottom', '-' + (k * modelBarThumbnailHeight) + 'px');
            }
          }
          else {
            if (counter <= modelBarModelpl) {
              $(this).css('top', modelBarThumbnailHeight + 'px');
            }
            else {
              $(this).css('top', ((k * modelBarThumbnailHeight) + modelBarThumbnailHeight) + 'px');
            }
          }
          // Calculate left Position Value
          comNum = modelBarPopUpWidth + (j * modelBarThumbnailWidth);

          if (comNum <= modelBarWidgetWidth) {
            $(this).css('left', modelBarThumbnailWidth * j + 'px');
          }
          else {
            $(this).css('left', (modelBarThumbnailWidth * j) - (modelBarPopUpWidth - modelBarThumbnailWidth) + 'px');
          }

          // assign pop-up size
          $(this).css({ 'width': modelBarPopUpWidth, 'height': modelBarPopUpHeight });
          $(this).addClass('modelBarHide');
        });

        popUpElm.find('div').each(function () {
          $(this).find('a').each(function (i) {
            var heightValue = $(this).css('height').replace('px', '');
            var heightValue2 = parseInt(heightValue) + parseInt(buttonGap) + 5;
            var topValue = parseInt(buttonStart) + parseInt(heightValue2 * i);
            $(this).css('top', topValue);
          });
        });

      }
      else {
        popUpElm.css('display', 'none');
		
		// added by Frank to ensure there are width and height settings when popups are deactivated in the CRM
		thumbnailElm.find('li').each(function () {
          $(this).css({ 'width': modelBarThumbnailWidth, 'height': modelBarThumbnailHeight });});
      }
      //Custom Buttons
      var modelBarCustomButtonHtml = ''
      $.each(modelBarCustomButtonArr, function (i, item) {
        modelBarCustomButtonHtml = '<li id="' + item.id + '" class="mbCustomBtn" ><img style="width:' + modelBarThumbnailWidth + 'px" src="' + item.img + '" alt="' + item.lbl + '" /></li>';
        thumbnailElm.append(modelBarCustomButtonHtml);
        thumbnailElm.find('li').last().click(function () {
          window.location = item.url;
        });
      });

      //Add Style
      modelBarStylePath(modelBarStyle);

      //Declarations End
    };

    function modelBarStylePath(id) {
      var url = "/widgets-ajax.aspx?fa=modelbar_styles&s=s&mbid=" + id;
      var path = '';
      $.getJSON(url, function (response) {
        // console.log(response.path);
        path = response.path;
		if (path != '') {
			$('head').append('<link rel="stylesheet" href="'+path+'" type="text/css" />');
        }
      });
    }

    function modelBarButtons(v, ext) {
      var html = '';
      var newModel = v.model;
      var usedModel = v.model;
      var model = v.model;

      if (ext != null) {
        newModel = ext.nm;
        usedModel = ext.um;
        // model = ext.mo;
      }


      var filterNew = '';
      var filterNUsed = '';

      if (newModel != '') {
        if (newModel.indexOf("=") > 0) {
          filterNew = '?make=' + v.make + '&model=' + newModel;
        }
        else {
          filterNew = '?make=' + v.make + '&model=' + encodeURIComponent(newModel);
        }
      }
      if (usedModel != '') {
        if (usedModel.indexOf("=") > 0) {
          filterNUsed = '?make=' + v.make + '&model=' + usedModel;
        }
        else {
          filterNUsed = '?make=' + v.make + '&model=' + encodeURIComponent(usedModel);
        }
      }

      var link;
      $.each(modelBarButtonLabelArr, function (i, item) {
        link = item.url;
        if (item.lbl != '') {
          if (item.url.indexOf("searchnew") > 0) {
            link += filterNew;
          }
          else if (item.url.indexOf("searchused") > 0) {
            link += filterNUsed;
          }
          html += '<a class="buttons ' + valueCheck(item.lbl, 1) + '" href="' + link + '" >' + item.lbl + '</a>';
        }
      });

      html += modelBarElmTitle(v.year, v.make, model, 1);
      return html;
    };
    function modelBarElmTitle(year, make, model, type) {
      var html = '';
      if (type == 1) // pop-Up
        html = '<p class="mbPopUpTitle"	><span class="ptYear">' + year + '&nbsp;</span><span class="ptMake">' + make + '&nbsp;</span><span class="ptModel">' + model + '</span></p>';
      else
        html = '<p class="mbThumbTitle"	><span class="ttYear">' + year + '&nbsp;</span><span class="ttMake">' + make + '&nbsp;</span><span class="ttModel">' + model + '</span></p>';
      return html;
    };
    function modelBarMpg(mpg, type) {
      var html = '';
      if (mpg != 0) {
        if (type == 1) // pop-Up
          html = '<p class="ptMpg"><span class="ptMpgValue">' + mpg + '&nbsp;</span><span class="ptMpgLabel">MPG</span></p>';
        else
          html = '<p class="ttMpg"><span class="ttMpgValue">' + mpg + '&nbsp;</span><span class="ttMpgLabel">MPG</span></p>';
      }
      return html;
    };
    function modelBarPhoto(photo, type, mode) {
      var p = '';
      if (type == 1) {
        p = photo.replace('sideview', modelBarThumbnailAngle);  // Image Angle
        p = p.replace('pixt320', o.modelBarThumbnailFolder); // Image Size
      }
      else {
        p = photo.replace('sideview', modelBarPopUpAngle);  // Image Angle
        p = p.replace('pixt320', o.modelBarPopUpFolder); // Image Size
      }
      if (mode == 'mbDb')
        p = o.mainFolderPath + p;

      return p.toLowerCase();
    };
    function valueCheck(v, type) {
      if (type == 1)
        return v.replace(/ /g, '_');
      else
        return v.replace(/_/g, ' ');
    };

    function modelBarTag(tag) {
      var line = '';

      if (tagLine)
        line = '<p class="mbPopUpTag" style="display:block;">' + tag + '</p>';
      else
        line = '<p class="mbPopUpTag" style="display:none;">' + tag + '</p>';

      return line;
    };

    function modelBarExt(v) {
      //\"nm\":\"X5\",\"um\":\"X5\",\"mo\":\"X5\",\"tag\":\"\"

      var ext = new Object();
      if (typeof (v.nm) != 'undefined') {
        ext.nm = v.nm;
      }
      else {
        ext.nm = v.model;
      }

      if (typeof (v.um) != 'undefined') {
        ext.um = v.um;
      }
      else {
        ext.um = v.model;
      }

      if (typeof (v.mo) != 'undefined') {
        ext.mo = v.mo;
      }
      else {
        ext.mo = v.model;
      }
      if (typeof (v.tag) != 'undefined') {
        ext.tag = v.tag;
      }
      else {
        ext.tag = '';
      }

      return ext;
    };
    function ThumbnailClick(event) {
      var elm = $('#' + $(this).attr("id") + '_p');
      var cUrl = modelBarThumbnailsArr.url;
      var isSearch = false;

      if (cUrl.indexOf("search") > 0) {
        isSearch = true;
      }

      if (isSearch == true) {
        if (cUrl.indexOf("used") > 0) {
          cUrl = elm.find('.Search_Used').attr('href');
        }
        else {
          cUrl = elm.find('.Search_New').attr('href');
        }
      }
      window.location = cUrl;
    };

  }
})(jQuery);

//Activate Default ModelBar
if (typeof (flexModelBarParams) != 'undefined') {
  $('#modelBarWidget').dealerOnFlexModelBar({ mb: flexModelBarParams });
}
//Activate ModelBar Split
if (typeof (flexModelBarParams2) != 'undefined') {
  $('#modelBarWidget2').dealerOnFlexModelBar({ mb: flexModelBarParams2 });
}
if (typeof (flexModelBarParams3) != 'undefined') {
  $('#modelBarWidget3').dealerOnFlexModelBar({ mb: flexModelBarParams3 });
}