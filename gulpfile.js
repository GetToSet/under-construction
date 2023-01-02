"use strict";

const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync");
const del = require("del");
const embedSvg = require("gulp-embed-svg");
const postcss = require("gulp-postcss");

function clean() {
  return del(["./dist/"]);
}

function pages() {
  return src(["./src/*.html", "src/*.ico"])
    .pipe(
      embedSvg({
        selectors: ".inline-svg",
        root: "./src",
        xmlMode: false,
      })
    )
    .pipe(dest("./dist/"))
    .pipe(browserSync.stream());
}

function assets() {
  return src(["./src/assets/**/*", "!**/inline/**"])
    .pipe(dest("./dist/assets/"))
    .pipe(browserSync.stream());
}

function css() {
  return src(["./src/css/main.css"])
    .pipe(postcss())
    .pipe(dest("./dist/css/"))
    .pipe(browserSync.stream());
}

function js() {
  return src([
    "node_modules/parallax-js/dist/parallax.min.js",
    "src/js/**/*.js",
  ])
    .pipe(dest("./dist/assets/js/"))
    .pipe(browserSync.stream());
}

const build = series(clean, parallel(pages, assets, css, js));

exports.default = build;
exports.clean = clean;
exports.build = build;
exports.serve = series(build, () => {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
    port: 3000,
  });
  watch("./src/*.html", pages);
  watch("./src/assets/images/**/*", assets);
  watch(["./src/css/**/*.css", "./src/*.html", "./src/js/**/*.js"], css);
  watch("./src/js/**/*.js", js);
});
