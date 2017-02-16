//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var path = require('path');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
//路径
var jsPath = 'src/assets/js/';
var scssPath = 'src/assets/scss/';


// 合并js文件之后压缩代码
gulp.task('minifyJs', function () {
    return gulp.src([jsPath + 'js1.js', jsPath + 'js3.js', jsPath + 'js2.js', jsPath + '**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(jsPath + 'dist'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest(jsPath + 'dist'));
});

gulp.task('scss', function () {
    return gulp.src(scssPath + '**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true, //是否美化属性值 默认：true
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest(scssPath + 'cssFiles'))
});

// 监视文件的变化
gulp.task('watch', function () {
    gulp.watch(jsPath + '**/*.js', ['jshint', 'minify']);
});

gulp.task('sass:watch', function () {
    gulp.watch(scssPath + '**/*.scss', ['scss']);
});


gulp.task('default', ['scss', 'minifyJs']); //定义默认任务


//************************************以下没有用*************************************************
// 语法检查
gulp.task('jshint', function () {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//在当前目录生成
gulp.task('sass', function () {
    console.log('begin sass');
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(function (data) {
            return path.dirname(data.history[1]);
        }));
});

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    console.log('begin testLess');
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});


//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径



