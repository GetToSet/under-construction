"use strict";

function updateHeight() {
  $("body").height(window.innerHeight);
}

$(function () {
  $(window).resize(function () {
    updateHeight();
  });
  var scene = $("#splash").get(0);
  if (scene) {
    var _parallaxInstance = new Parallax(scene, {
      invertX: false,
      invertY: false,
    });
  }
  updateHeight();
});
