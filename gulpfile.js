const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const gulpSass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const sync = require("browser-sync").create();
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const del = require("del");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");



// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(gulpSass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;


// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
  .pipe(terser())
  .pipe(rename("*.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const optimizeImages = () =>{
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true}),
	  imagemin.optipng({optimizationLevel: 5}),
	  imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(gulp.dest("build/img"))
}

exports.images = copyImages;

// WebP

const  createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality:90}))
  .pipe(gulp.dest("build/img"))
}

exports.createWebp =  createWebp;

// Copy

const copy = (done) =>{
  gulp.src([
    "source/fonts/*.*",
    "source/favicons/*.*"
  ], {
    base:"source"
  })
  .pipe(gulp.dest("build"));
  done();
}

exports.copy = copy;

// Copy JS

const copyJs = () => {
  return gulp.src("source/js/*.js")
  .pipe(gulp.dest("build/js"))
}
exports.copyJs = copyJs;

// Clear

const clear = () => {
  return del("build");
}

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}


// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series("copyJs"));
  gulp.watch("source/*.html").on("change", reload);
}



// Build

const build = gulp.series (
  clear,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp
  ),
);

exports.build = build;

exports.default = gulp.series (
  clear,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    copyJs,
    createWebp
  ),
  gulp.series(
   server, watcher
  ));
