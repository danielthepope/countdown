var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var purify = require('gulp-purifycss');
var rename = require('gulp-rename');
var server = require('gulp-develop-server');
var uglify = require('gulp-uglify');

gulp.task('minifyjs', function() {
  return gulp.src('./resources/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('pre-uncss', function() {
  return gulp.src('./resources/template.pug')
    .pipe(pug({
      doctype: 'html',
      locals: {
        pageTitle: 'Countdown',
        anagram: '',
        requireHead: false,
        bestAnswers: ['tnetennba']
      }
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('uncss', gulp.series('pre-uncss', function() {
  return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css', './resources/style.css'])
    .pipe(purify(['./dist/template.html']))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public'));
}));

gulp.task('watch', function() {
  gulp.watch(['./resources/**/*.pug', './resources/*.css', './resources/*.js'], gulp.series('build'));
});

gulp.task('server:start', function() {
  server.listen( { path: './server.js' } );
});

gulp.task('server:restart', function() {
  gulp.watch('./*.js', server.restart);
});

gulp.task('build', gulp.parallel('uncss', 'minifyjs'));

gulp.task('default', gulp.parallel('build', 'server:start', 'watch', 'server:restart'));
