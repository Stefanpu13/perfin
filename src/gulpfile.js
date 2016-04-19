/**
 * Created by stefan on 3/2/2016.
 */

'use strict';

let gulp = new require('gulp');
let watchify = new require('watchify');
let browserify = new require('browserify');
let babelify = require("babelify");
let vinyl_source_stream = require('vinyl-source-stream');
let rename = require('gulp-rename');
let nodemon = require('gulp-nodemon');
let babel = require('gulp-babel');
let reactify = require('reactify');

let b = browserify({
    entries: ['public/javascript/main.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify],
    debug: true
});

let bundleJavascript =()=> {
    b
        .bundle()
        .pipe(vinyl_source_stream('public/javascript/main.js'))
        .pipe(rename('bundle.js'))
        //.pipe(rename('mainTr.js'))
        .pipe(gulp.dest('dist/javascript'))
};

let log = (msg) => {
    process.stdout.write(msg + '\n')
};

gulp.task('buildHTML', () => {
    gulp.src('public/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('buildCSS', ()=> {
    gulp.src('public/**/*.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('copyBootstrap', ()=> {
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('copyFonts', ()=> {
    gulp.src('node_modules/bootstrap/dist/fonts/**')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('start', ['copyBootstrap', 'copyFonts', 'buildHTML', 'buildCSS'], ()=> {
    buildUsingBrowserify();

    // Slightly different approach
    function buildUsingWatchify() {
        var watcher = watchify(browserify({
            entries: ['public/javascript/main.js'],
            transform: [reactify],
            debug: true,
            cache: {}, packageCache: {}, fullPaths: true
        }));
        watcher.on('update', bundleWatcher);

        watcher.on('log', log);
        bundleWatcher();

        function bundleWatcher() {
            watcher
                .transform(babelify, {presets: ["es2015", 'react']})
                .bundle()
                .pipe(vinyl_source_stream('public/javascript/main.js'))
                .pipe(rename('bundle.js'))
                .pipe(gulp.dest('public/javascript/'))
        }
    }

    function buildUsingBrowserify() {

        b.transform(babelify, {presets: ["es2015", 'react']});

        bundleJavascript();
       // copyToDist();

        function copyToDist() {
            gulp.src('public/javascript/**/*.js')
                .pipe(babel({
                    presets: ['es2015', 'react']
                }))
                .pipe(gulp.dest('dist/javascript'));
        }
    }
});

gulp.task('default', ['start'], () => {
    nodemon({
        script: 'server/app.js',
        ignore: ['public/**', 'dist/**']
    });

    b.on('update', () => {
        bundleJavascript();
        //copyToDist();
    });

    b.on('log', log);

    gulp.watch('public/**/*.html', ['buildHTML']);
    gulp.watch('public/**/*.css', ['buildCSS']);

    gulp.watch('gulpfile.js', ['start'])
});