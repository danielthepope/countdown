var gulp = require('gulp');
var server = require('gulp-develop-server');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');

gulp.task('default', ['build', 'watch', 'server:start', 'server:restart']);

gulp.task('build', ['uncss', 'minifyjs']);

gulp.task('minifyjs', function() {
  return gulp.src('./resources/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('pre-uncss', function() {
  return gulp.src('./resources/template.jade')
    .pipe(jade({
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

gulp.task('uncss', ['pre-uncss'], function() {
  return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css', './resources/style.css'])
    .pipe(uncss({
      html: ['./dist/template.html']
    }))
    .pipe(concat('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./public'))
})

gulp.task('watch', function() {
  gulp.watch(['./resources/**/*.jade', './resources/*.css', './resources/*.js'], ['build']);
});

gulp.task('server:start', function() {
  server.listen( { path: './server.js' } );
});

gulp.task('server:restart', function() {
  gulp.watch('./*.js', server.restart);
});
