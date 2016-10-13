var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

var MODULE_NAME = require('./package.json').name;

gulp.task('clean', function () {
    return del(['dist/']);
});

gulp.task('build:scripts', function () {
    return gulp.src('src/**/*.js')
        .pipe($.replace('TRANSFER_MODULE_NAME', MODULE_NAME))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.concat( MODULE_NAME+'.js') )
        .pipe($.size({title: 'JS:'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:scripts:min',['build:scripts'],function(){
    return gulp.src('dist/**/*.js')
        .pipe($.uglify({
            preserveComments: 'license'
        }))
        .pipe($.rename({extname: ".min.js"}))
        .pipe($.size({ title: 'JS min:' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build',['clean'],function(){
    return gulp.start(['build:scripts:min','build:styles']);
});

gulp.task('build:styles', function () {

    return gulp.src([
        'src/**/*.less'
    ])
        .pipe($.plumber())
        .pipe($.concat( MODULE_NAME+'.css'))
        .pipe($.less())
        .pipe($.autoprefixer({ browsers: ['> 1%'] }))
        .pipe($.size({ title: 'CSS:' }))
        .pipe(gulp.dest('dist'));
});