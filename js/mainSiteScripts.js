/*Main Site :: mainSiteScripts.js*/
/*
========================================
So you like code huh? Well I've got alot
of it for ya! Well you should probably
go write your own. ( ͡° ͜ʖ ͡°)
========================================
*/

//Owl Carousel Call
$(document).ready(function () {

    $("#showcase").owlCarousel({

        autoPlay: 5000, //Set AutoPlay to 5 seconds
        autoPlaySpeed: 5000,

        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        controls: true

    });

});


// handle ID Links Properly
$(document).on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.size() === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $(id).offset().top;

    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
});
