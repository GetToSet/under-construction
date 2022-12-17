"use strict";

const scene = document.querySelector("#splash")
if (scene) {
  var _parallaxInstance = new Parallax(scene, {
    invertX: false,
    invertY: false,
  });
}
