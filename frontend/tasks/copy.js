const gulp = require('gulp');
const paths = require('./lib/buildPaths');
const browserSync = require('browser-sync');

function copyTask() {
  return gulp
    .src(paths.copy)
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload); 
}

gulp.task('copy', copyTask);
module.exports = copyTask;