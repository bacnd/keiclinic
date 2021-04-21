const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const mode = require('gulp-mode')();
const browserSync = require('browser-sync').create();

// clean tasks
const clean = () => {
  return del(['dist']);
}

const cleanImages = () => {
  return del(['dist/assets/images']);
}

const cleanFonts = () => {
  return del(['dist/assets/fonts']);
}

// const cleanStyles = () => {
//   return del(['dist/assets/css']);
// }

// const cleanJavascripts = () => {
//   return del(['dist/assets/js']);
// }

// css task
const css = () => {
  return src('src/assets/scss/styles.scss')
    .pipe(mode.development( sourcemaps.init() ))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('styles.css'))
    .pipe(mode.production( csso() ))
    .pipe(mode.development( sourcemaps.write() ))
    .pipe(dest('src/assets/css/'))
    .pipe(mode.development( browserSync.stream() ));
}

// js task
const js = () => {
  return src('src/assets/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    // .pipe(webpack({
    //   mode: 'development',
    //   devtool: 'inline-source-map'
    // }))
    // .pipe(mode.development( sourcemaps.init({ loadMaps: true }) ))
    // .pipe(rename('app.js'))
    // .pipe(mode.production( terser({ output: { comments: false }}) ))
    // .pipe(mode.development( sourcemaps.write() ))
    // .pipe(dest('src/assets/js/'))
    .pipe(mode.development( browserSync.stream() ));
}

// copy tasks
const copyImages = () => {
  return src('src/assets/images/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(dest('dist/assets/images'));
}

const copyFonts = () => {
  return src('src/assets/fonts/**/*.{svg,eot,ttf,woff,woff2}')
    .pipe(dest('dist/assets/fonts'));
}

const copyJavascripts = () => {
  return src('src/assets/js/**/*.js')
    .pipe(dest('dist/assets/js'));
}

const copyStyles = () => {
  return src('src/assets/css/**/*.css')
    .pipe(dest('dist/assets/css'));
}

const copyHtmls = () => {
  return src('src/**/*.html')
    .pipe(dest('./'));
}

// watch task
const watchForChanges = () => {
  browserSync.init({
    server: {
      proxy:"localhost:8010",
      baseDir: './src/',
      https: true,
      ghostMode: {
          scroll: true
      },
      scrollProportionally: true,
    }
  });

  watch('src/assets/scss/**/*.scss', css);
  watch('src/assets/**/*.js', js);
  watch('**/*.html').on('change', browserSync.reload);
  watch('src/assets/images/**/*.{png,jpg,jpeg,gif,svg}', series(cleanImages, copyImages));
  watch('src/assets/fonts/**/*.{svg,eot,ttf,woff,woff2}', series(cleanFonts, copyFonts));
}

// public tasks
exports.default = series(clean, parallel(css, js, copyImages, copyFonts), watchForChanges);
exports.build = series(clean, parallel(css, js, copyImages, copyFonts, copyJavascripts, copyStyles, copyHtmls));