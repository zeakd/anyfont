const gulp = require('gulp');
const browserSync = require('browser-sync');
const paths = require('./lib/buildPaths');

function browserSyncTask () {
  browserSync.init({
    server: {
      baseDir: paths.dest
    },
    browser: 'google chrome',
    notify: {
      styles: {
        left: 0,
        right: "auto",
        bottom: 0,
        top: "auto"
      }
    }
  })

  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.copy, ['copy']);
  // gulp.watch(`${config.dest}/**/*.html`).on('change', reload);
}

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;