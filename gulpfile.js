const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const ghPages = require('gulp-gh-pages');

function styles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function stylesMax() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.css'))
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['app/scss/style.scss'], styles);
    watch(['app/scss/style.scss'], stylesMax);
    watch(['app/js/main.js'], scripts);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/**/*.html',
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function deploy() {
    return src('dist/**/*')
    .pipe(ghPages());
}

exports.styles = styles;
exports.stylesMax = stylesMax;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.deploy = deploy;
exports.build = series(cleanDist, building);

exports.default = parallel(styles, stylesMax, scripts, browsersync, watching);