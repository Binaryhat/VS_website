$(document).ready(function () {
    //for preloader to all pages
    $(window).on("load",function () { // makes sure the whole site is loaded
        var preloader = $('#mask div');
        preloader.fadeOut('slow'); // will first fade out the loading animation
        $('#mask').delay(350).fadeOut('slow');
        // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    });
    
    
    // scroll
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
          $(".main-navbar").addClass("main-navbar--white");
          $(".navbar-brand img").attr('src','imgs/logo.png');
        }
  
        else{
            $(".main-navbar").removeClass("main-navbar--white");  	
            $(".navbar-brand img").attr('src','imgs/logo_white.png');
        }
    })

    // tooltip
  
        $('[data-toggle="tooltip"]').tooltip(); 
    


});