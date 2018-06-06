let gulp = require('gulp'),
  autoPrefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  delFIles = require('del'),
  uglify = require('gulp-uglify');

gulp.task('default', function () {
  console.log('test');
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('del', function () {
  delFIles(['./dist/*.html', 'dist/css/*']);
});

gulp.task('sass', function () {
  gulp.src('app/sass/*.sass')
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(gulp.dest('dist/css'))
});