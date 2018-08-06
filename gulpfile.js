// Plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('nodemon');
var env = require('gulp-env');

// Easy usage variables
var cssInput = 'src/assets/scss/**/*.scss';
var cssOutput = 'src/assets/css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

env({vars: {
  NODE_ENV: 'dev'
}});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    baseDir: "./",
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'src/app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync', 'sass'], function () {
  gulp.watch('**/*.scss', ['sass']);
  gulp.watch(['**/*.pug'], reload);
});

gulp.task('sass', function(){
  return gulp.src(cssInput)
    .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
      .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(cssOutput))
    .pipe(browserSync.stream());
});

gulp.task('dev', function() {
  // Stuff here
});
