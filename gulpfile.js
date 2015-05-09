var gulp = require('gulp');
var server = require('gulp-develop-server');
var jade = require('gulp-jade');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', ['build', 'watch', 'server:start', 'server:restart']);

gulp.task('build', ['minifycss', 'minifyjs', 'staticjade']);

gulp.task('minifycss', function() {
	return gulp.src('./resources/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('minifyjs', function() {
	return gulp.src('./resources/*.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('staticjade', ['minifycss', 'minifyjs'], function() {
	return gulp.src('./resources/static/*.jade')
		.pipe(jade({
			doctype: 'html',
			locals: {
				pageTitle: 'Countdown'
			}
		}))
		.pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
	gulp.watch('./resources/**/*.jade', ['build']);
	gulp.watch('./resources/*.css', ['build']);
	gulp.watch('./resources/*.js', ['build']);
});

gulp.task('server:start', function() {
	server.listen( { path: './server.js' } );
});

gulp.task('server:restart', ['staticjade'], function() {
	gulp.watch('./*.js', server.restart);
});
