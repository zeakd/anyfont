const gulp = require('gulp');
const run = require('run-sequence');

function serveTask() {
  run('build', ['browserSync', 'watch']);
}

gulp.task('start', serveTask);
module.exports = serveTask;
