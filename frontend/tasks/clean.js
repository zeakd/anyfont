const gulp = require('gulp');
const del = require('del');
const paths = require('./lib/buildPaths');

function cleanTask() {
  return del([paths.dest]);
}

gulp.task('clean', cleanTask);
module.exports = cleanTask;