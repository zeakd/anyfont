const gulp = require('gulp');
const run = require('run-sequence');

function buildTask(done) {
  run('clean', [
    'html',
    'copy',
    'js', 
    'sass'
  ], done);
}

gulp.task('build', buildTask);
module.export = buildTask;
