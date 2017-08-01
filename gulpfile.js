'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
// var minify = require('gulp-minifier');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);


// gulp.task('minifyCSS', function() {
//   return gulp.src('./css/**/*').pipe(minify({
//     minify: true,
//     collapseWhitespace: true,
//     conservativeCollapse: true,
//     minifyJS: true,
//     minifyCSS: true,
//     getKeptComment: function (content, filePath) {
//         var m = content.match(/\/\*![\s\S]*?\*\//img);
//         return m && m.join('\n') + '\n' || '';
//     }
//   })).pipe(gulp.dest('./minified'));
// });
// gulp.task('minifyJS', function() {
//   return gulp.src('./js/**/*').pipe(minify({
//     minify: true,
//     collapseWhitespace: true,
//     conservativeCollapse: true,
//     minifyJS: true,
//     minifyCSS: true,
//     getKeptComment: function (content, filePath) {
//         var m = content.match(/\/\*![\s\S]*?\*\//img);
//         return m && m.join('\n') + '\n' || '';
//     }
//   })).pipe(gulp.dest('./minified'));
// });
