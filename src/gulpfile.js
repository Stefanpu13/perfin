/**
 * Created by stefan on 3/2/2016.
 */
var gulp = new require('gulp');
var watchify = new require('watchify');
var browserify = new require('browserify');
var babelify = require("babelify");
var vinyl_source_stream = require('vinyl-source-stream');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
var reactify = require('reactify');

gulp.task('start', ()=> {
    buildUsingBrowserify();

    nodemon({
        script: 'app.js',
        ignore: ['public/**']
    });

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
        var b = browserify({
            entries: ['public/javascript/main.js'],
            cache: {},
            packageCache: {},
            plugin: [watchify],
            debug: true
        });

        b.transform(babelify, {presets: ["es2015", 'react']});
        b.on('log', log);
        b.on('update', bundle);

        bundle();


        function bundle() {
            b
                .bundle()
                .pipe(vinyl_source_stream('public/javascript/main.js'))
                .pipe(rename('bundle.js'))
                //.pipe(rename('mainTr.js'))
                .pipe(gulp.dest('public/javascript/'))
        }
    }

    function log(msg) {
        process.stdout.write(msg + '\n');
    }

});

gulp.task('default', () => {
    gulp.watch('gulpfile.js', ['start'])
});

