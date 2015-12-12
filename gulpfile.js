var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var calManifest = require('gulp-cordova-app-loader-manifest');
var addsrc = require('gulp-add-src');
var bowerFiles = require('main-bower-files');
var ghPages = require('gulp-gh-pages');
var templateCache = require('gulp-angular-templatecache');

var paths = {
    sass: ['./scss/**/*.scss'],
    html: ['./www/**/*.html']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.html, ['templates']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('deploy', ['templates', 'manifest'], function () {
    return gulp.src('./www/**/*')
        .pipe(ghPages({force: true}));
});

gulp.task('templates', function () {
    return gulp.src('./www/templates/**/*.html')
        .pipe(templateCache({standalone: true, root: 'templates'}))
        .pipe(gulp.dest('./www/js'));
});

gulp.task('manifest', function () {
    return gulp.src([
        'lib/ionic/js/ionic.bundle.js',
        'css/ionic.app.css'
    ].concat(
        bowerFiles()
    ).concat([
            'js/cordova-app-loader-complete.js', // app loader
            'js/templates.js', // templates
            'js/configuration.js', // config
            'js/**/*.js', // app files
            '!js/bootstrap.js' // not bootstrap
        ]), {
        cwd: 'www',
        base: 'www'
    }).pipe(calManifest({
        load: ['**']
    })).pipe(gulp.dest('./www'));
});