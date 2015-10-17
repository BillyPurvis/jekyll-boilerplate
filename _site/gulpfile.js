/*jslint node: true */
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    path            = require('gulp-path'),
    util            = require('gulp-util'),
    spawn           = require('child_process').spawn,
    rename          = require('gulp-rename'),
    connect         = require('gulp-connect'),
    minifycss       = require('gulp-minify-css'),
    autoprefixer    = require('gulp-autoprefixer'),
    log             = util.log;
  

// Config
var ports = {
    dev: 4000,
    dist: 4040
};

var paths = {
    jekyll: "./_site"
};

gulp.task('jekyll', function () {
    'use strict';
    spawn('jekyll', ['build', '--watch'], {stdio: 'inherit'});
});

gulp.task("sass", function () {
    'use strict';
    log("Generating CSS files " + (new Date()).toString());
    gulp.src("./css/main.scss")
		.pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9"))
		.pipe(gulp.dest("./css"))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest("./css"));
});

gulp.task('reload', function () {
    'use strict';
    gulp.src('./_site/*.html')
        .pipe(connect.reload());
});
    
gulp.task("watch", function () {
    'use strict';
    log("Watch files for changes");
    gulp.watch("./css/main.scss", ["sass"]);
    gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '_posts/*.html'], ['jekyll']);
    
//    gulp.src("./_site/index.htm")
//        .pipe(connect.reload());
});

gulp.task('connect', function () {
    'use strict';
    log("Serve those files");
    connect.server({
        root: paths.jekyll,
        livereload: true,
        port: ports.dev
    });
});


gulp.task('default', ['connect', 'jekyll', 'watch', 'reload']);