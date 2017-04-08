// const gulp = require('gulp');
// const data = require('gulp-data');
// const mergeObjects = require('./lib/mergeObjects');
// const paths = require('./lib/buildPaths');

// function dataTask() {
//   return gulp
//     .src(paths.data)
//     .pipe(data(function (file) {
//       return require(file.path);
//     }))
//     // .pipe(mergeObjects("hi"))
//     .pipe(gulp.dest('tmp'));
// }
// gulp.task('data', dataTask);
// module.exports = dataTask;