'use strict';
let gulp = require('gulp'),
    pug  = require('gulp-pug'),
    sass = require('gulp-sass'),
    browser = require('browser-sync').create(),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    shorthand = require('gulp-shorthand');


function _pug() {
    return gulp.src(['./assets/template/*.pug', '!./assets/template/_*.pug'])
        .pipe(pug({
                pretty: true
            }))
        .pipe(gulp.dest('./public'))
        .pipe(browser.reload({stream: true}))
}

function _sass() {
    return gulp.src('./assets/sass/**/*.+(sass|scss)')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(gulp.dest('./public/css'))
        .pipe(browser.reload({stream: true}))
    
}
function _js() {
    return gulp.src(['./assets/js/**/*.js', '!./assets/js/vendor/**/*.js'])
        .pipe(concat('index.js')) 
        .pipe(gulp.dest('./public/js'))
        .pipe(browser.reload({stream: true})) 
}

function _img() {
    return gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))
        .pipe(browser.reload({stream: true}))
}


function watch() {
    
    browser.init({
        server: {
            baseDir: './public'
        }
    });
    
    gulp.watch('assets/sass/**/*.sass', _sass);
    gulp.watch('assets/template/**/*.pug', _pug);
    gulp.watch('assets/img/**/*', _img);
    gulp.watch('assets/js/**/*', _js);
    
}



exports.default = gulp.parallel(
    gulp.series(_pug, _sass, _js, _img),
    watch
);


