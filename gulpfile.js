/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

'use strict';

var _SRC = './sim.src';
var SRC = _SRC.concat('/');

var _SHARED= './shared';
var SHARED = _SHARED.concat('/');


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
    var result = gulp.src([SHARED.concat('**/enums.ts'), SRC.concat('**/*.ts')])
        .pipe(tsProject(ts.reporter.defaultReporter()));

    return merge([
        result.js.pipe(gulp.dest(BUILT_SRC)),
        result.dts.pipe(gulp.dest(BUILT_TYPINGS)),
    ]);
});

var glob = require('glob');
var watchify = require('watchify');
var browserify = require('browserify');
var replace = require('gulp-replace');

var bundler_opts = Object.assign({}, watchify.args, {
    entries: glob.sync(BUILT_SRC.concat('**/*.js')),
    insertGlobalVars: {
        'THREE': function () { return 'require("three")'; },
    },
});

// var bundler = watchify(browserify(bundler_opts));
var bundler = browserify(bundler_opts);

function bundle() {
    return bundler
        .bundle()
        .pipe(source('sim.js'))
        .pipe(replace(/^(var pxsimImpetus);$/mg, '$1 = window.pxsim;'))
        .pipe(buffer())
        .pipe(gulp.dest(BUILT));
}

bundler.on('update', bundle);

gulp.task('bundle', bundle);

gulp.task('serve', function (done) {
    myexec('pxt serve', done);
});

gulp.task('staticpkg', function (done) {
    myexec('pxt staticpkg --githubpages --minify', done);
});

gulp.task('package', gulp.series('clean', 'build', 'bundle', 'staticpkg'));

gulp.task('default', gulp.series('clean', 'build', 'bundle', 'serve'));