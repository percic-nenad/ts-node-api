const del = require('del');
const gulp = require('gulp');
const mem = require('gulp-mem');
const ts = require('gulp-typescript');
const plumber = require('gulp-plumber');
const sourceMaps = require('gulp-sourcemaps');

const { exec } = require('child_process');

gulp.task('clean', () => {
    return del(['./build/**/*']);
});

gulp.task('copy:knex-config', () => {
    return gulp.src('./knexfile.js').pipe(gulp.dest('./build'));
});

gulp.task('compile', () => {
    const tsProject = ts.createProject('./tsconfig.json');
    return gulp.src(['./src/**/*.ts'])
        .pipe(plumber({ errorHandler: () => process.exit(1) }))
        .pipe(tsProject())
        .pipe(gulpMem.dest('./build/src'));
});

gulp.task('build', gulp.series('copy:knex-config', () => {
    const tsProject = ts.createProject('./tsconfig.json');
    return gulp.src(['./src/**/*.ts'])
        .pipe(plumber({ errorHandler: () => process.exit(1) }))
        .pipe(sourceMaps.init())
        .pipe(tsProject())
        .pipe(sourceMaps.write("", { includeContent: false, sourceRoot: '../../src' }))
        .pipe(gulp.dest('./build/src'))
}));

const gulpMem = new mem();
gulpMem.enableLog = false;
