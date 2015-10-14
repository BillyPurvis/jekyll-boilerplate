var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    path            = require('gulp-path'),
    rename          = require('gulp-rename'),
    connect         = require('gulp-connect'),
    minifyCss       = require('gulp-minify-css'),
    autoprefixer       = require('gulp-autoprefixer');

// Config

var ports = {
    dev: 9090,
    dist: 9091
};

gulp.task('connect', function () {
    'use strict';
    connect.server();
});
 
gulp.task('default', ['connect']);