const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


// Check message
gulp.task('message', function(){
  return console.log('Gulp is runing...');
});

// Copy all HTML files
gulp.task('copyHtml', function(){
  gulp.src('src/*.html')
      .pipe(gulp.dest('public'));
});

// Optimazie images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
);

// Minify js
gulp.task('minify', function(){
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

// Compile Sass
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('public/css'))
      .pipe(browserSync.reload({stream: true}));
});

// Live edit
gulp.task('serve', function(){
  browserSync.init({
      server: {
        baseDir: 'public/.'
      }
  });
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

// default
gulp.task('default', ['message', 'copyHtml', 'imageMin', 'minify', 'sass', 'serve']);
