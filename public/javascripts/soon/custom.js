/******************************************************************************************************************************
COMMING SOON PAGE
*******************************************************************************************************************************/
(function($) {
    /**
    * Set your date here  (YEAR, MONTH (0 for January/11 for December), DAY, HOUR, MINUTE, SECOND)
    * according to the GMT+0 Timezone
    **/
    var launch = new Date(2014, 06, 14, 11, 00);
    /**
    * The script
    **/
    var message = $('#message');
    var days = $('#days');
    var hours = $('#hours');
    var minutes = $('#minutes');
    var seconds = $('#seconds');
    
    setDate();
    function setDate(){
        var now = new Date();
        if( launch < now ){
            days.html('<h1>0</H1><p>Day</p>');
            hours.html('<h1>0</h1><p>Hour</p>');
            minutes.html('<h1>0</h1><p>Minute</p>');
            seconds.html('<h1>0</h1><p>Second</p>');
            message.html('OUR SITE IS NOT READY YET...');
        }
        else{
            var s = -now.getTimezoneOffset()*60 + (launch.getTime() - now.getTime())/1000;
            var d = Math.floor(s/86400);
            days.html('<h1>'+d+'</h1><p>Day'+(d>1?'s':''),'</p>');
            s -= d*86400;

            var h = Math.floor(s/3600);
            hours.html('<h1>'+h+'</h1><p>Hour'+(h>1?'s':''),'</p>');
            s -= h*3600;

            var m = Math.floor(s/60);
            minutes.html('<h1>'+m+'</h1><p>Minute'+(m>1?'s':''),'</p>');

            s = Math.floor(s-m*60);
            seconds.html('<h1>'+s+'</h1><p>Second'+(s>1?'s':''),'</p>');
            setTimeout(setDate, 1000);

            message.html('OUR SITE IS NOT READY YET, BUT WE ARE COMING SOON');
        }
    }
})(jQuery);
/******************************************************************************************************************************
ANIMATIONS
*******************************************************************************************************************************/
(function($) {
    "use strict";
    var isMobile = false;
    if (navigator.userAgent.match(/Android/i) || 
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i)|| 
        navigator.userAgent.match(/iPod/i) || 
        navigator.userAgent.match(/BlackBerry/i)) {                 
        isMobile = true;            
    }
    if (isMobile == true) {
        $('body').removeClass('nomobile');
        $('.animated').removeClass('animated');
    }
    $(function() {
        if (isMobile == false) {
            $('*[data-animated]').addClass('animated');
        }
        function animated_contents() {
            $(".animated:appeared").each(function (i) {
                var $this    = $(this),
                    animated = $(this).data('animated');

                setTimeout(function () {
                    $this.addClass(animated);
                }, 50 * i);
            });
        }
        animated_contents();
        $(window).scroll(function () {
            animated_contents();
        });
    });
})(jQuery);
/******************************************************************************************************************************
SLIDER
*******************************************************************************************************************************/
(function($) {
    "use strict";
    $("body.nomobile #slider").revolution(
    {
            delay:9000,
            startheight:450,
            startwidth:890,

            thumbWidth:100,
            thumbHeight:50,
            thumbAmount:5,

            onHoverStop:"on",
            hideThumbs:200,
            navigationType:"bullet",
            navigationStyle:"round",
            navigationArrows:"none",

            touchenabled:"on",

            navOffsetHorizontal:0,
            navOffsetVertical:80,
            shadow:undefined,
            fullWidth:"on",
            fullScreen:"on"
    });
})(jQuery);
/******************************************************************************************************************************
BOOTSTRAP
*******************************************************************************************************************************/
(function($) {
    "use strict";
        $('[data-rel=tooltip]').tooltip();
        $(".alert").alert();
})(jQuery);
/******************************************************************************************************************************
PROGRESS BAR
*******************************************************************************************************************************/
(function($) {
    "use strict";
    $("a.btn-progress").click(function(){
        $('#bar-container').slideToggle(); 
    });
})(jQuery);

(function($) {
    "use strict";
    $('button.btn-info').click(function(e){
        e.preventDefault();
        var email = $('#exampleInputEmail2').val();
        if (validateEmail(email)){
            $.ajax({
              type: "POST",
              url: "/signup/soon",
              data: { email : email },
            })
            .done(function( ret ) {
                if (ret.code == 'OK'){
                    console.log(ret.data);
                    $('#err-msg-valid-email').hide();
                    $('#let-me-know-form').html('<h2>Thank you for your support</h2>');  
                } else {
                    alert(ret.error);
                }
            });
        }else {
            //Please enter a valid email address
            $('#err-msg-valid-email').show();
        }
    });
})(jQuery);

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


