/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

'use strict';

var _SRC = './sim/';
var SRC = _SRC.concat('/');

var _BUILT = './built';
var BUILT = _BUILT.concat('/');
var BUILT_TEST = _BUILT.concat('.test/');
var BUILT_TYPINGS = _BUILT.concat('/typings/');

var DST = './dist/';
var LIB = './lib/';

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var gulp = require('gulp');
var del = require('del');

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
 

gulp.task('clean', function (done) {
    myexec('pxt clean', (error) => {
        if (!error) {
            del([BUILT, BUILT_TEST, DST, LIB]).then(paths => done());
        } else {
            done(error);
        }
    });
});

gulp.task('bundle', function (done) {
    done();
});

gulp.task('serve', function (done) {
    myexec('pxt serve', done);
});

gulp.task('staticpkg', function (done) {
    myexec('pxt staticpkg --githubpages --minify', done);
});

gulp.task('package', gulp.series('clean', 'bundle', 'staticpkg'));

gulp.task('default', gulp.series('clean', 'bundle', 'serve'));