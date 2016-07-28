var gulp       = require('gulp');
var babel      = require('gulp-babel');
var eslint     = require('gulp-eslint');
var rename     = require('gulp-rename');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var del        = require('del');

// for JavaScript
gulp.task('lint', function() {
    return gulp.src('src/*.js')
               .pipe(eslint())
               .pipe(eslint.format())
               .pipe(eslint.failAfterError());
});

gulp.task('compile', function() {
    return browserify('src/main.js', {debug: true})
               .transform(babelify)
               .bundle()
               .on('error', function(error) {
                   console.error(error.message);
               })
               .pipe(source('main.js'))
               .pipe(gulp.dest('build/'));
});

gulp.task('compress', ['compile'], function() {
    return gulp.src('build/main.js')
               .pipe(sourcemaps.init())
               .pipe(uglify())
               .pipe(rename('main.min.js'))
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest('build/'));
});

gulp.task('clean', function() {
    return del(['build/*']);
});

gulp.task('build-js', ['clean', 'lint', 'compile', 'compress']);

// for CSS
gulp.task('build-css', function() {
    del(['css/*']);
    gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css/'));
});

gulp.task('build', ['build-js', 'build-css']);
