(function($){ //start anonymous function

    var requestSong = {
        sent : false,
        init : function(){
            var self = this;
            $('#request-a-song').fancybox({
	            onClosed : function(){
		            var container = $('#request-song-form-container');
		            if(self.sent) {
			            container.find('.sent-message').show();
			            container.find('#request_song_form').hide();
		            }
	            }
            });
            $('body')
                .on('click','#request-song-form-container .request-submit',function(e){
                    e.preventDefault();

		            var form = $(this).closest('#request-song-form-container');

                    if(!self.validateForm(form)) {
	                    return;
                    }

                    $.fancybox.showActivity();

                    $.post('/api/request-a-song',
                        {
                            action : "request_song_api",
                            song : form.find('.isong').val(),
                            artist : form.find('.iartist').val(),
                            name : form.find('.iname').val(),
                            email : form.find('.iemail').val(),
	                        request_song : form.find('#request_song').val()
                        },
                        function($response){
                            $.fancybox.hideActivity();
                            $.fancybox.close();
                            self.sent = true;
                        }
                    );
                });
        },
        validateForm : function(form){
            var song = form.find('.isong'),
                name = form.find('.iname'),
                songNotEmpty = false,
                nameNotEmpty = false;

            if(! song.val())
	            form.find('.error-song').show();
            else {
	            form.find('.error-song').hide();
	            songNotEmpty = true;
            }
            if(! name.val())
	            form.find('.error-name').show();
            else {
	            form.find('.error-name').hide();
	            nameNotEmpty = true;
            }

            if(songNotEmpty && nameNotEmpty)
                return true;
            else
                return false;
        }
    }

    $(function(){ //on document ready

        requestSong.init();

    });//end document ready
})(jQuery);//end anonymous function