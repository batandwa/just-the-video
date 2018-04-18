(function () {
  'use strict';
  // will first fade out the loading animation
  $(".preloader").fadeOut();
  //then background color will fade out slowly
  $("#faceoff").delay(200).fadeOut("slow");
}());
