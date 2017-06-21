var gulp = require('gulp');
var liveReload = require('gulp-livereload');

//Paths
var SCRIPT_PATH = 'public/S*/*.js';
var HTML_PaATH = 'public/S*/*.html';

//Scripts
gulp.task('scripts', function () {
	console.log('scripts task called...');
	return gulp.src(SCRIPT_PATH)
		.pipe(liveReload());
});

//HTML
gulp.task('html', function () {
	console.log('html task called...');
	return gulp.src(HTML_PaATH)
		.pipe(liveReload());
});
//CSS
gulp.task('css',function(){

});
//Default

//Watch
gulp.task('watch', function () {
	console.log('watch started...');
	require('./server.js');
	liveReload.listen();
	gulp.watch(SCRIPT_PATH, ['scripts']);
	gulp.watch(HTML_PaATH, ['html']);
});