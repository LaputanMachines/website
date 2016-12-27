// Portfolio :: scripts.js
// 
// ========================================
// (C) 2015-16 Michael Bassili
// ========================================
// 

      // Wow Plugin
      // new WOW().init();

      // Google Analytics
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-77100076-2', 'auto');
      ga('send', 'pageview');
      
$(document).ready(function() {
  
  var screenWidth = $(window).width();
  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the 
      //nav bar to stick.  
      console.log($(window).scrollTop())

    if (screenWidth > 900) {
      if ($(window).scrollTop() > 830) {
        $('#header').addClass('headerFixed');
      }
      if ($(window).scrollTop() < 830) {
        $('#header').removeClass('headerFixed');
      }
    }

     if (screenWidth < 900) {
      if ($(window).scrollTop() > 736) {
        $('#header').addClass('headerFixed');
      }
      if ($(window).scrollTop() < 736) {
        $('#header').removeClass('headerFixed');
      }
    }
  });
});