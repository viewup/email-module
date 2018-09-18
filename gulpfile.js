const gulp = require('gulp');
// const clean = require('gulp-clean');
const path = require("path");
const fs = require("fs");
const copy = require('gulp-copy');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
// const install = require('gulp-yarn');
const expand = require("glob-expander");
const tsProject = ts.createProject('tsconfig.json');
const through = require('through2');
const base = __dirname;
const root = path.join(process.env.PWD.split('source')[0]);
const dist = path.join(root, 'src', 'src');


const copyFiles = (src, dest) => () => {
    return gulp
        .src(src)
        .pipe(copy(dest, {prefix: 1}))
        .pipe(verify());
};

function verify() {
    const options = {objectMode: true};
    return through(options, write, end);

    function write(file, enc, cb) {
        if (!fs.existsSync(file.path)) {
            return cb(true, new Error(file.path + " File not coppied"))
        }
        cb(null, file);
    }

    function end(cb) {
        cb();
    }
}


gulp.task('copy:view', copyFiles([base + '/src/Views/*.*',base + '/src/Mailer/email/*.*',base + '/src/Mailer/email/components/*.*'], path.join(dist, 'src')));
gulp.task('copy:PorjectFile', copyFiles([
    base + '/package.json',
    base + '/www',
    base + '/run.js',
    base + '/nodemon.json',
], path.join(dist)));

gulp.task('static', () => {
    return gulp
        .src([base])
        .pipe(gulp.dest(dist));
});
gulp.task('default', ['watch']);

const tasks = ['copy:PorjectFile', 'build', 'copy:view'];
const files = expand([base + '/src/**/*.ts', base + '/src/**/*.json', base + '/src/**/*.pug']);
gulp.task('watch', tasks, () => {
    return gulp.watch(files, tasks);
});

gulp.task('build', ['scripts']);

gulp.task('scripts', ['static'], () => {
    const tsResult = tsProject
        .src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(dist));
});