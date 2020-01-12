const gulp = require('gulp');
const sloc = require('gulp-sloc2');
const tsNode = require('ts-node');

tsNode.register({
    transpileOnly: true
})

require('./gulp/build');
require('./gulp/database');

gulp.task('sloc', () => {
    return gulp.src([
        './src/**/*.ts',
        './gulp/**/*.js',
        './gulpfile.js',
        './knexfile.js'
    ]).pipe(sloc());
})

gulp.task('default', gulp.series('clean', 'build'));
