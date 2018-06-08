"use strict";

let gulp = require('gulp'),
  autoPrefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  jsonMinify = require('gulp-json-minify'),
  delFIles = require('del'),
  browserSync = require('browser-sync'),
  htmlreplace = require('gulp-html-replace'),
  sourcemaps = require('gulp-sourcemaps');

const path = {
  app: {
    html: 'app/*.html',
    sass: 'app/sass/**/*.sass',
    js: 'app/js/**/*.js',
    json: 'app/json/*.json'
  },
  dist: {
    html: 'dist/',
    sass: 'dist/css/',
    js: 'dist/js/',
    json: 'dist/json/'
  },
  watch: {
    html: 'app/*.html',
    sass: 'app/sass/*.sass',
    js: 'app/js/*.js'
  },
  clean: './dist',
  cleanOld: [
    'dist/*.html',
    'dist/css/*',
    'dist/js/*',
    'dist/json/*'
  ]
};

const config = {
  server: {
    baseDir: "./dist"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend_Devil"
};

gulp.task('default', ['del', 'html', 'sass', 'scripts', 'json', 'watchFile', 'server']);

gulp.task('prod', ['del', 'html', 'sass', 'scripts', 'json']);

gulp.task('html', function () {
  gulp.src(path.app.html)
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('del', function () {
  delFIles(path.cleanOld);
});

gulp.task('sass', function () {
  gulp.src(path.app.sass)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('style.css', {newLine: '\n\n'}))
    .pipe(autoPrefixer())
    .pipe(gulp.dest(path.dist.sass))
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.sass));
});

gulp.task('scripts', function () {
  gulp.src(path.app.js)
    .pipe(concat('main-out.js', {newLine: ' \n\n '}))
    .pipe(gulp.dest(path.dist.js))
    .pipe(babel({presets: ['env']}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('json', function () {
  gulp.src(path.app.json)
    .pipe(jsonMinify())
    .pipe(gulp.dest(path.dist.json));
});

gulp.task('server', function () {
  browserSync.init(config);
});

gulp.task('watchFile', function () {
  gulp.watch(path.watch.html, ['html']);
  gulp.watch(path.watch.js, ['scripts']);
  gulp.watch(path.watch.sass, ['sass']);
  gulp.watch([path.watch.html, path.watch.js, path.watch.sass]).on('change', () => browserSync.reload({stream: true}))
});


gulp.task('path', function () {
  gulp.src('app/index-test.html')
    .pipe(htmlreplace({
      'js': [
        'js/main-out.js'
      ],
      'css': [
        'css/style.css'
      ]
    })).on('error', (err, ww) => console.log(err, ww))
    .pipe(rename('assets.html'))
    .pipe(gulp.dest('./dist'));
});