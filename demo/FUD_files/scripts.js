(function($) {

  function scrollTo(obj, dur) {
    $('html,body').animate({
      scrollTop: obj.offset().top-158
    }, dur);
  }
  
  function displayPopup(language, html) {
    $('body').prepend('<div class="popup"><div class="window"><div class="close">X</div></div></div>');
    $('.popup .window').append(html);
    $('.popup .close').on('click', function() {
        $('.popup').fadeOut(800, function () { $(this).remove(); });
        if (language == 'es') {
            window.location = $('#hdn').val() + 'inicio';
        }
        else {
            window.location = $('#hdn').val() + 'home';
        }
    });
  }

  $(function() {
    
    $('#hdn-confirm-en').on('click', function (e) {
        e.preventDefault();
        displayPopup('en', '<h2>Your Reward Details Have Been Sent!</h2><p>Please check your email for your reward details.<br />Please ensure to check your spam mail!</p><div class="fb-like"><a href="http://facebook.com/FUDUSA" target="_blank">Like FUD USA on Facebook to win great prizes, learn helpful tips, and discover tasty recipes!</a></div>');
    });

    $('#hdn-confirm-es').on('click', function (e) {
        e.preventDefault();
        displayPopup('es', '<h2>¡Los detalles de tu Premio han sido enviados!</h2><p>Por favor revisa tu correo electrónico para conocer<br /> los detalles de tu premio. ¡Y por favor asegúrate de revisar el<br /> folder de correos no deseados de tu correo electrónico!</p><div class="fb-like"><a href="http://facebook.com/FUDUSA" target="_blank">Danos Like en Facebook, se parte de la comunidad. ¡gana fabulosos permios, aprende útiles consejos y descubre deliciosas recetas!</a></div>');
    });
    
    $('#hdn-notify-en').on('click', function (e) {
      e.preventDefault();
      displayPopup('en', '<h2>Your Notify Me Request Has Been Submitted!</h2><p>We will notify you once we have secured a reward in your area.</p><p>We will provide you with an update via email<br />within two (2) weeks. </p><footer>**Please ensure to check your spam mail for an email confirmation.</footer>');
    });

    $('#hdn-notify-es').on('click', function (e) {
      e.preventDefault();
      displayPopup('es', '<h2>¡Tú solicitud de Notificación ha sido enviada!</h2><p>Te notificaremos una vez que hayamos conseguido un premio<br /> en tu área. En dos (2) semanas te estaremos enviando un correo<br /> con las opciones disponibles. </p><footer>** ¡Por favor asegúrate de revisar el folder de correos no deseados de tu correo electrónico!</footer>');
    });
    
    $('.win').on('click', function() {
      if ($('.spend').css('display') === 'none') {
        scrollTo($('.win'), 500);
      }
      $('.spend').slideToggle(500);
      $('.win footer').toggleClass('pad-top');
    });
    
    $('.rslides').responsiveSlides();
    
    $('.terms h2').on('click', function() {
      $(this).toggleClass('open');
      $(this).next().slideToggle(500);
    });
    
    if(!Modernizr.input.placeholder){
    
      $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() === input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
        }
      }).blur(function() {
        var input = $(this);
        if (input.val() === '' || input.val() === input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
        }
      }).blur();
      $('[placeholder]').parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() === input.attr('placeholder')) {
          input.val('');
        }
        });
      });
    }
  });
})(jQuery);