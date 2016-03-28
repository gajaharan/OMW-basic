var gulp = require('gulp');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglifyjs');
var minifyCSS = require('gulp-minify-css');
var filter = require('gulp-filter');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var karmaServer = require('karma').server;

var config = {
  scripts: {
    src: './src/app/**/*.js',
  },
  css: {
    src: './src/css/*.css'
  }
}

gulp.task('scripts', function() {
  return gulp.src(config.scripts.src)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src/bundle'));
});

gulp.task('styles', function() {
  return gulp.src(config.css.src)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src/bundle'));
});

gulp.task('vendor', function() {
  var jsFilter = filter('*.js', {restore: true}),
      cssFilter = filter('*.css');
  return gulp.src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src/bundle'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src/bundle'));
});


gulp.task('build', ['scripts', 'styles', 'vendor']);

gulp.task('watch', function () {
    gulp.watch([
        'config.scripts.src',
        'config.css.src',
        'test/unit/**/*'
    ], ['unit-test'])
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('default', ['webserver'], function() {
  gulp.watch(config.scripts.src, ['scripts']);
  gulp.watch(config.css.src, ['styles']);
});

gulp.task('unit-test', function (done) {
    karmaServer.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('webserver', function() {
  return gulp.src('./src')
    .pipe(webserver({reload: true, open: true}));
});



