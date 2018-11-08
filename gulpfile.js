var gulp = require('gulp'),
    emailBuilder = require('gulp-email-builder'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync'),
    htmlbeautify = require('gulp-html-beautify'),
    runSequence = require('run-sequence');



gulp.task('htmlbeautify', function() {
    var options = {
        indentSize: 2,
        unformatted: [
            // https://www.w3.org/TR/html5/dom.html#phrasing-content
            'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
            'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
            'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
            'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
            'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
        ]

    };
    gulp.src('./app/*.html')
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest('./app/'))
});


gulp.task('pug', function () {
    return gulp.src("./app/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("./app/"));

});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './app/' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});


gulp.task('build', function () {
    runSequence('pug', 'htmlbeautify');
});

gulp.task('watch', ['build', 'browser-sync'], function() {
    gulp.watch('./app/*.pug', ['build']);
    gulp.watch('./app/*.html', browserSync.reload);
    gulp.watch('./app/css/*.css', browserSync.reload);

});





var EmailBuilder = require('gulp-email-builder'),
    replace = require('gulp-replace');


var remote_images_basepath = 'http://testmail.imoldev.ru/img/';



var options = {
    encodeSpecialChars: false
};


var builder = EmailBuilder(options);

gulp.task('inline', function() {
    return gulp.src(['./app/*.html'])
        .pipe(replace(/src=".\/img\//g, 'src="' + remote_images_basepath))
        .pipe(builder.build())
        .pipe(gulp.dest('./dist/'));
});

