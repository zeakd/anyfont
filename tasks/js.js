'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps')
const mergeStream = require('merge-stream');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const globby = require('globby');
const through = require('through2');
const paths = require('./lib/buildPaths');
const browserSync = require('browser-sync');
const path = require('path')

function jsTask(done) {
  // const bundledStream = through();

  const files = globby.sync(paths.js)
  // console.log(files, path.relative('site', files[0]));
  return mergeStream(files.map(f => browserify({
      entries: f,
      debug: true,
    })
    .bundle()
    .pipe(source(path.relative('site', f)))
    .pipe(buffer())
    .pipe(rename(path.relative('site', f)))
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
  ))
  // .then(function(files) {
  //   // create the Browserify instance.
  //   let tasks =
  //   mergeStream(tasks).on('end', done);
  //   // pipe the Browserify stream into the stream we created earlier
  //   // this starts our gulp pipeline.
  // }).catch(function(err) {
  //   // ensure any errors from globby are handled
  //   // bundledStream.emit('error', err);
  // });

  // bundledStream
  //   .pipe(buffer())
  //   .pipe(sourcemaps.init({loadMaps: true}))
  //   .on('error', gutil.log)
  //   .pipe(sourcemaps.write('./'))
  //
  //   .pipe(gulp.dest(paths.dest))
  //   .pipe(browserSync.stream())

  // return bundledStream;
}

gulp.task('js', jsTask)
module.exports = jsTask;
