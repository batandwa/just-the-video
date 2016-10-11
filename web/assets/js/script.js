$(document).ready(function() {
	"use strict";


// ------------- Pre-loader--------------

// makes sure the whole site is loaded

$(window).load(function() {
    // will first fade out the loading animation
    $(".preloader").fadeOut();
    //then background color will fade out slowly
    $("#faceoff").delay(200).fadeOut("slow");
});

//-----------Text Slider on Banner-----------

   $('.flex_text').flexslider({
        animation: "slide",
    selector: ".slides li",
    controlNav: false,
    directionNav: false,
    slideshowSpeed: 4000,
    touch: true,
    useCSS: false,
    direction: "vertical",
        before: function(slider){
     var height = $('.flex_text').find('.flex-viewport').innerHeight();
     $('.flex_text').find('li').css({ height: height + 'px' });
        }
    });

});
