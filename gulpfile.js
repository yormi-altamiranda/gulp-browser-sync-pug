var gulp = require('gulp');
var	pug = require('gulp-pug');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var pump = require('pump');

// Tareas PUG
gulp.task('pug',function () {
	return gulp.src('views/*.pug')
	.pipe(pug({
		pretty:true
	}))
	.pipe(gulp.dest('dist/'));
});
// Tareas BROWSERSYNC
gulp.task('BS',function () {
	bs.init({server:{baseDir:'./dist/'}});
});
// Tarea para SASS
gulp.task('sass',function (cb) {
	pump([
		gulp.src('views/sass/*.sass'),
		sass().on('error',sass.logError),
		gulp.dest('dist/css'),
		bs.stream()
	],
	cb
	);
});

// Tarea para vigilar los cambios
gulp.task('watch',function () {
	gulp.watch('views/*.pug', ['pug']);
	gulp.watch("dist/*.html").on('change', bs.reload);
	gulp.watch('views/sass/*.sass',['sass']);
});

gulp.task('default',['pug','sass','BS','watch']);
