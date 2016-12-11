/**
 * Created by User on 10.12.2016.
 */
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    jade            = require('gulp-jade'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    cssnano         = require('gulp-cssnano'),
    rename          = require('gulp-rename'),
    browserSync     = require('browser-sync'),
    del             = require('del'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dev'
        },
        port: 63342,
        browser: "chrome",
        notify: false

    });
});

gulp.task('scss', function(){
    return gulp.src('dev/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dev/css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('jade', function(){
    return gulp.src('dev/jade/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dev/'))
        .pipe(browserSync.reload({stream: true}));

});


gulp.task('watch', ['browser-sync', 'scss', 'jade'], function(){
   gulp.watch('dev/scss/**/*.+(scss|sass)', ['scss']);
   gulp.watch('dev/jade/**/*.jade', ['jade']);
});

gulp.task('img', function() {
    return gulp.src('dev/files/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('prod/files/img'));
});


gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('clean', function() {
    return del.sync('prod');
});

gulp.task('build', ['clean', 'img', 'scss', 'jade'], function() {
    var buildCss = gulp.src([
        'dev/css/*.css',
        'dev/scss/*.css'
    ])
        .pipe(gulp.dest('prod/css'));

    var buildJs = gulp.src('dev/js/jquery.min.js')
        .pipe(gulp.dest('prod/js'));

    var buildHtml = gulp.src('dev/*.html')
        .pipe(gulp.dest('prod'));

});