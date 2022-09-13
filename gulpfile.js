var gulp 		= require('gulp'),
		jade 		= require('gulp-jade'),
		sass 		= require('gulp-sass'),
		cssmin 	= require('gulp-cssmin'),
		rename 	= require('gulp-rename');




// COMPILE SASS
gulp.task('sass', function(){
	gulp.src('./scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./assets/css/'));
});



// CUSTOMIZE NITRO
gulp.task('custom-nitro', function(){
	gulp.src('./_nitro-customized/nitro.custom.scss')
		.pipe(sass())
		.pipe(gulp.dest('./assets/css/'))

		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/css/'));
});



// COMPILE JADE
gulp.task('jade', function(){
	gulp.src('./jade/*.jade')
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('./'));
});




// WATCH
gulp.task('watch', function(){
	gulp.watch('./scss/*.scss', ['sass']);
	gulp.watch('./jade/*.jade', ['jade']);
});






