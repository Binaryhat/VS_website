/*==============================================================================

    Author Name     :   Fullstackdev(Mahesh Langote)
    Product Name    :   Default workflow
    File Name       :   gulpfile.js
==============================================================================    */

var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    concateCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    filter = require('gulp-filter'),
//     imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    insert = require('gulp-insert'),
// minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    del=require('del'),
    wait=require('gulp-wait'),
    browserSync = require('browser-sync'),
    reload=browserSync.reload;

var cache = require('gulp-cache');

/*====================================
=            clear  cache            =
====================================*/
    gulp.task('clear', function (done) {
      return cache.clearAll(done);
    });



    /*==================================
    =            minify css            =
    ==================================*/
    gulp.task('minifyCss', function() {
      return gulp.src(['src/css/*.css','!src/css/*.min.css'])
      	.pipe(rename({suffix:'.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/css/'));
    });


    /*=====================================
    =            Scripts tasks            =
    =====================================*/

    gulp.task('scripts',function(){
    	return gulp.src(['src/js/scripts.js'])
    	.pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
    		.pipe(gulp.dest('src/JS'))
    		.pipe(reload({stream:true}));
    });

    
   
/*=========================================
=            Concat js          =
=========================================*/

gulp.task('concatejs', function() {
  return gulp.src(['src/js/jquery.min.js', 'src/js/bootstrap.min.js', 
                    'src/js/jquery.magnific-popup.min.js', 
                    'src/js/typed.min.js', 
                    'src/js/validator.min.js',
                    'src/js/jquery.mb.YTPlayer.min.js',
                    'src/js/myvcard.min.js'])
    .pipe(concat('mainscript.js'))
    .pipe(gulp.dest('Min/js/'));
});

/*==================================
=            concat css            =
==================================*/

gulp.task('concateCss', function () {
  return gulp.src(['src/css/bootstrap.css','src/css/magnific-popup.css','src/css/myvcard.css'])
    .pipe(concateCss("bundle.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('Min/css/'));
});



    /*============================
    =            Sass            =
    ============================*/
    var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded',
        includePaths: '/src/scss'
    };
    
    gulp.task('MySass', function () {
      return gulp.src('src/scss/*.scss')
        .pipe(wait(1500))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
    		.pipe(gulp.dest('src/css/'))
    		.pipe(reload({stream:true}));
        //.pipe(gulp.dest('./css'));
    });


    /*==================================
    =            HTML Tasks            =
    ==================================*/
    gulp.task('html',function(){
    	return gulp.src('src/**/*.html')
    	.pipe(reload({stream:true}));
    });



    /*==================================

    =            watch task            =
    ==================================*/

    gulp.task('watch',function(){
    	gulp.watch('src/js/**/*.js',['scripts']);
    	gulp.watch('src/scss/**/*.scss',['MySass']);
    	gulp.watch('src/**/*.html',['html']);
    });


    /*====================================
    =            browser sync            =
    ====================================*/
    gulp.task('browserSync',function(){
    	browserSync({
    		server:{
    			baseDir:"./src/"
    		}
            
    	});
    });




    /*====================================
    =            Default task            =
    ====================================*/

    gulp.task('default',['scripts','MySass','html','browserSync','watch']);


    
// ======================================================================================================================================
// ======================================================================================================================================


    /*==================================
    =            Build task            =
    ==================================*/
    //clear out all files and folders from build folder
    gulp.task('build:cleanfolder',function() {
    	return del(['Build/**'],{force: true});
    });

    //Task to create build directory for all files
    
    		//===Demo files===//
    gulp.task('build:copy',['build:cleanfolder'],  function(){
    	 gulp.src(['src/**/*/','!src/scss/**/*'])
    	 			.pipe(filter(['**', '!*src/scss']))
    			    .pipe(gulp.dest('Build/')); 
    			                
    		

    });

    //task to remove unwanted build files
    //list all files and directories here that
    //you dont want to include
    gulp.task('build:remove', ['build:copy'], function(){
    	return del([
    			'Build/',

    			// 'build/js/!(*.min.js)'
    		]);
    });

    //final build
    gulp.task('build', ['build:copy','build:remove']);




    /*=====================================
    =            Swatch tasks            =
    =====================================*/
gulp.task('swatchjs',function(){
    gulp.src('app/js/color-switcher.js')
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/js/'));
});

gulp.task('swatchCss',function(){
    gulp.src('app/css/color-switcher.css')
        .pipe(rename({suffix:'.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css/'));
});







