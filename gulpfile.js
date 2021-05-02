const gulp = require('gulp');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
// image //
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
// css //
const scss = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
// javascript //
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
// php //
const htmlComp = require('gulp-phtml-simple-comp');
const connect = require('gulp-connect-php');

const path = {
  theme: {
    src: `./src`,
    dist: `./docs`,
  },
};

/* ===============================================
#  php
=============================================== */
gulp.task('comp-php', () => {
  return gulp
    .src(`${path.theme.src}/**/*.html`)
    .pipe(htmlComp())
    .pipe(gulp.dest(path.theme.dist));
});

/* ===============================================
#  copy
=============================================== */
gulp.task('copy', () => {
  return gulp
    .src(`${path.theme.src}/font-awesome/**/*`)
    .pipe(plumber())
    .pipe(gulp.dest(`${path.theme.dist}/dist/font-awesome`));
});

/* ===============================================
#  javascript
=============================================== */
gulp.task('compress', () => {
  return gulp
    .src(`${path.theme.dist}/dist/js/bundle.js`)
    .pipe(plumber())
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(gulp.dest(`${path.theme.dist}/dist/js`));
});

gulp.task('browserify', function () {
  return browserify(`${path.theme.src}/js/app.js`)
    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.log('Error : ' + err.message);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(`${path.theme.dist}/dist/js/`));
});

/* ===============================================
#  scss
=============================================== */
gulp.task('sasscompiler', function () {
  return gulp
    .src(`${path.theme.src}/scss/*.scss`)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err.messageFormatted);
          this.emit('end');
        },
      })
    )
    .pipe(
      scss({
        includePaths: require('node-reset-scss').includePath,
        outputStyle: 'compressed',
      })
    )
    .pipe(cleancss())
    .pipe(
      autoprefixer({
        browsers: [
          'last 2 versions',
          'ie >= 9',
          'Android >= 4',
          'ios_saf >= 8',
        ],
        cascade: false,
      })
    )
    .pipe(gulp.dest(`${path.theme.dist}/dist/css`))
    .pipe(browserSync.stream());
});

/* ===============================================
#  img compress
=============================================== */
gulp.task('img-min', function () {
  return gulp
    .src(`${path.theme.src}/images/*.{jpg,jpeg,png,gif,svg}`)
    .pipe(plumber())
    .pipe(
      imagemin([
        pngquant('65-80'),
        mozjpeg({
          quality: 80,
          progressive: true,
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle(),
      ])
    )
    .pipe(gulp.dest(`${path.theme.dist}/dist/images`));
});

/* ===============================================
#  connect
=============================================== */
// gulp.task('connect-sync', function (done) {
//   connect.server(
//     {
//       port: 8001,
//       base: 'build',
//     },
//     function () {
//       browserSync({
//         proxy: 'localhost:8001',
//       });
//     }
//   );
//   done();
// });

gulp.task('browser-sync', () => {
  return browserSync.init({
    server: {
      baseDir: 'docs',
    },
    port: 8080,
    reloadOnRestart: true,
  });
});

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('serve', function (done) {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
  done();
});

gulp.task('watch', function (done) {
  gulp.watch(
    [`${path.theme.src}/scss/*.scss`, `${path.theme.src}/scss/*/*.scss`],
    gulp.task('sasscompiler')
  );
  gulp.watch(
    [`${path.theme.src}/js/*`, `${path.theme.src}/js/*/*`],
    gulp.task('browserify')
  );
  gulp.watch(`${path.theme.dist}/dist/js/bundle.js`, gulp.task('compress'));
  gulp.watch(
    [`${path.theme.src}/images/*`, `${path.theme.src}/images/*/*`],
    gulp.task('img-min')
  );
  gulp.watch(
    [`${path.theme.src}/*.html`, `${path.theme.src}/**/*.html`],
    gulp.task('comp-php')
  );
  gulp.watch(
    [
      `${path.theme.src}/*/*.html`,
      `${path.theme.src}/*.html`,
      `${path.theme.src}/js/*.js`,
      `${path.theme.src}/js/*/*.js`,
      `${path.theme.src}/*.php`,
      `${path.theme.src}/*/*.php`,
    ],
    gulp.task('reload')
  );
  done();
});

gulp.task(
  'default',
  gulp.series(
    gulp.parallel('img-min', 'sasscompiler', 'browserify', 'comp-php', 'copy'),
    gulp.parallel('compress', 'watch', 'browser-sync')
  )
);
