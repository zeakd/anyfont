const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const gutil = require('gulp-util');
const filter = require('gulp-filter');
const browserSync = require('browser-sync');
// const lazypipe = require('lazypipe');
// const tap = require('gulp-tap');
const data = require('gulp-data');
// const gulpif = require('gulp-if');
const clearRequire = require('clear-require');
const path = require('path');
const paths = require('./lib/buildPaths');

function htmlTask() {
  // const underbarFilter = filter(`${paths.root}/**/_*/**/*`, {restore: true});
  return gulp
    .src(`${paths.root}/**/*`)
    // .pipe(changed(config.dest))
    // .pipe(gulpif(paths.html, tap(function (file, t) {
    //   console.log(file.path);
    //   // return t.through();
    // })))
    // .pipe(underbarFilter)
    // .pipe(tap(function (file, t) {
    //   console.log("under", file.path);
    //   var basename = path.basename(file.path, '.js');
    //   console.log("under", basename);
    //   if (basename == 'render') {
    //     let render = require(file.path);
    //     console.log("render", render);
    //   }
    // }))
    // .pipe(underbarFilter.restore)
    .pipe(filter(paths.html))
    // .pipe(tap(function (file, t) {
    //   console.log("html", file.path);
    // }))
    //
    // reset data.
    // .pipe(data(function () {
    //   clearRequire(`../${paths.data}/global.js`);
    //   const g = require(`../${paths.data}/global.js`);
    //   // console.log(g);
    //   return g;
    // }))
    .pipe(nunjucks.compile({}, {
      autoescape: false
    }).on('error', function (error) {
      var message = new gutil.PluginError('nunjucks', error.message).toString();
      process.stderr.write(message + '\n');
      this.emit('end');
    }))
    // .pipe(htmlmin({
    //   collapseWhitespace: true,
    //   minifyCSS: true
    // }))
    // .pipe(beautifier({
    //   indent_level: 4
    // }))
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload);
}

gulp.task('html', htmlTask);
module.exports = htmlTask;
