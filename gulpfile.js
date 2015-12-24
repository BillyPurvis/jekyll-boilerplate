/*jslint node: true */

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    util            = require('gulp-util'),
    spawn           = require('child_process').spawn,
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    connect         = require('gulp-connect'),
    runSequence     = require('gulp-run-sequence'),
    minifycss       = require('gulp-minify-css'),
    autoprefixer    = require('gulp-autoprefixer'),
    log             = util.log;
  

// Config
var ports = {
    dev: 4000,
    dist: 4040
};

// paths
var paths = {
    jekyll: "./_site",
    scripts: "./js"
};

// Start Local Server
gulp.task('connect', function () {
    'use strict';
    log("Serve those files");
    connect.server({
        root: paths.jekyll,
        port: ports.dev
    });
});

// Build Jekyll
gulp.task('jekyll', function (done) {
    'use strict';
    var jekyllExec = process.platform === "win32" ? "jekyll.bat" : "jekyll";
    
    spawn(jekyllExec, ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Compress Js
gulp.task('compressJs', function () {
    'use strict';
    gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./js'));
});

// Generate SCSS files to dist 
gulp.task('sass', function () {
    'use strict';
    log('Generating CSS files' + (new Date()).toString());
    gulp.src("./_sass/main.scss")
		.pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9"))
		.pipe(gulp.dest("./css"))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest("./css"));
});
 
// Watch jekyll, scss and js files ready to compile
gulp.task('watch', function () {
    'use strict';
    log('Watch files for changes');
    gulp.watch('./_sass/*.scss', ['sass', 'jekyll']);
    gulp.watch('./js/*.js', ['compressJs']);
    gulp.watch(['**/*.html', '*/*.md'], ['jekyll']);
});

// Run sequentually. 
gulp.task('serve', function (done) {
    'use strict';
    runSequence('sass', 'jekyll', 'connect', 'watch', done);
});

// Default gulp command
gulp.task('default', ['watch', 'connect']);