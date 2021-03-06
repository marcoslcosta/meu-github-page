var gulp = require('gulp')
    , less = require('gulp-less')
    , browserSync = require('browser-sync').create()
    , header = require('gulp-header')
    , cleanCSS = require('gulp-clean-css')
    , rename = require("gulp-rename")
    , uglify = require('gulp-uglify')
    , jshint = require("gulp-jshint")
    , jshintstylish = require("jshint-stylish")
    , pkg = require('./package.json');






// Compile LESS files from /less into /css
gulp.task('less', function () {
    return gulp.src('src/less/freelancer.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function () {
    return gulp.src('src/css/freelancer.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function () {
    return gulp.src('src/js/freelancer.js')
        .pipe(uglify())
         .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function () {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('src/sec/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('src/vendor/jquery'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('src/vendor/jquery'))

    gulp.src(['node_modules/angular/angular.min.js'])
        .pipe(gulp.dest('src/vendor/angular'))

    gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
        .pipe(gulp.dest('src/vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['less-prod', 'minify-css-prod', 'minify-js-prod', 'copy-prod']);

// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function () {

    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/css/*.css', ['minify-css']);
    gulp.watch('src/js/**/*.js', ['minify-js']);

    // Reloads the browser whenever HTML or JS files change
    gulp.watch(['src/**/*.html', "src/js/**/*.js"]).on("change", browserSync.reload);
    gulp.watch(["src/js/**/*.js", "src/js/**/*.html"]).on("change", function (event) {
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintstylish));
    });
});





// Compile LESS files from /less into /css
gulp.task('less-prod', function () {
    return gulp.src('src/less/freelancer.less')
        .pipe(less())
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css-prod', ['less'], function () {
    return gulp.src('src/css/freelancer.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js-prod', function () {
    return gulp.src('src/js/freelancer.js')
        .pipe(uglify())
         .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy-prod', function () {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('docs/sec/vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('docs/vendor/jquery'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('docs/vendor/jquery'))

    gulp.src(['node_modules/angular/angular.min.js'])
        .pipe(gulp.dest('docs/vendor/angular'))

    gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
        .pipe(gulp.dest('docs/vendor/font-awesome'))
})