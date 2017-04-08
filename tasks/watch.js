const gulp = require('gulp');
const paths = require('./lib/buildPaths');

function watchTask() {
  console.log("watch");
  gulp.watch(`${paths.root}/**/*.html`, ['html']);
  gulp.watch(`${paths.data}/**/*`, ['html']);
}

gulp.task('watch', watchTask);
module.exports = watchTask;
