import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin';
import jsonMinify from 'gulp-json-minify';

gulp.task('html', function () {
    return gulp.src('home/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('json', function () {
    return gulp.src('home/*.json')
       .pipe(jsonMinify())
       .pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.series('html', 'json'));