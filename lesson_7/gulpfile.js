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
  browserSync = require('browser-sync');

gulp.task('default', ['del', 'html', 'sass', 'scripts', 'json', 'watchFile', 'server']);

gulp.task('prod', ['del', 'html', 'sass', 'scripts', 'json']);

gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('del', function () {
  delFIles(['dist/*.html', 'dist/css/*', 'dist/js/*', 'dist/json/*']);
});

gulp.task('sass', function () {
  gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(concat('style.css', {newLine: '\n\n'}))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function () {
  gulp.src('app/js/**/*.js')
    .pipe(concat('main-out.js', {newLine: ' \n\n '}))
    .pipe(gulp.dest('dist/js/'))
    .pipe(babel({presets: ['env']}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('json', function () {
  gulp.src('app/json/*.json')
    .pipe(jsonMinify())
    .pipe(gulp.dest('dist/json/'));
});

gulp.task('server', function () {
  browserSync.init({
    server: 'dist/'
  });
});

gulp.task('watchFile', function () {
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/js/*', ['scripts']);
  gulp.watch('app/sass/*', ['sass']);
  gulp.watch(['app/sass/*', 'app/js/*', 'app/*.html']).on('change', browserSync.reload)
});