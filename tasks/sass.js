const gulp = require('gulp');
const sass = require('gulp-sass');
const paths = require('./lib/buildPaths');
const browserSync = require('browser-sync');

function sassTask() {
  return gulp
    .src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.sassDest))
    .pipe(browserSync.stream())
}

gulp.task('sass', sassTask)
module.exports = sassTask;
