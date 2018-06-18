/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

'use strict';

var _SRC = './sim.src';
var SRC = _SRC.concat('/');

var _BUILT = './built';
var BUILT = _BUILT.concat('/');
var BUILT_SRC = _BUILT.concat('.src/');
var BUILT_TEST = _BUILT.concat('.test/');
var BUILT_TYPINGS = _BUILT.concat('/typings/');

var DST = './dist/';
var LIB = './lib/';

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var gulp = require('gulp');
var del = require('del');
var merge = require('merge2');

var exec = require('child_process').exec;

function myexec(command, done) {
    exec(command, function (error, stdout, stderr) {
        if (stderr && stderr.length > 0) {
            process.stderr.write(stderr);
        }

        done(error);
    }).stdout.on('data', function (chunk) {
        process.stdout.write(chunk);
    });
}

var ts = require('gulp-typescript');
var tsProject = ts.createProject(SRC.concat('tsconfig.json'));

gulp.task('clean', function (done) {
    myexec('pxt clean', (error) => {
        if (!error) {
            del([BUILT, BUILT_SRC, BUILT_TEST, DST, LIB]).then(paths => done());
        } else {
            done(error);
        }
    });
});

gulp.task('build', function () {
    var result = gulp.src(SRC.concat('**/*.ts'))
        .pipe(tsProject(ts.reporter.defaultReporter()));

    return merge([
        result.js.pipe(gulp.dest(BUILT_SRC)),
        result.dts.pipe(gulp.dest(BUILT_TYPINGS)),
    ]);
});

var glob = require('glob');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

gulp.task('bundle', function (done) {
    var bundle = browserify(
        {
            entries: [BUILT_SRC.concat('_runtime.js'), glob.sync(BUILT_SRC.concat('**/*.js'))],
            options: {
                transform: ['debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
            },
        }).bundle();

    return bundle
        .pipe(source('sim.js'))
        .pipe(replace(/^(var pxsim);$/mg, '$1 = window.pxsim;'))
        .pipe(buffer())
        .pipe(gulp.dest(BUILT))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(BUILT));
});

gulp.task('serve', function (done) {
    myexec('pxt serve', done);
});

gulp.task('staticpkg', function (done) {
    myexec('pxt staticpkg --githubpages --minify', done);
});

gulp.task('package', gulp.series('clean', 'build', 'bundle', 'staticpkg'));

gulp.task('default', gulp.series('clean', 'build', 'bundle', 'serve'));