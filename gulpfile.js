var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browser = require('browser-sync').create(),
	pug = require('gulp-pug');

function copy(done){
	gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
		.pipe(gulp.dest('./dest/css'));
	gulp.src(['./node_modules/jquery/dist/jquery.js', './node_modules/popper.js/dist/popper.js', './node_modules/bootstrap/dist/js/bootstrap.js'])
		.pipe(gulp.dest('./dest/js'));
	done();
}
function sync(done) {
	browser.init({
		server: {
			baseDir: './dest/'
		},
		port: 3040
	});
	done();
}
function scss(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('./dest/css'))
		.pipe(browser.stream());
}
function views(){
	return gulp.src('./src/pug/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dest/'))
		.pipe(browser.stream());
}
function watch(){
	gulp.watch('./src/', gulp.series(scss, views));
}

var watch = gulp.parallel(sync, watch);
var build = gulp.series([copy, scss, views, watch]);


exports.copy = copy;
exports.sync = sync;
exports.scss = scss;
exports.views = views;
exports.watch = watch;
exports.default = build;