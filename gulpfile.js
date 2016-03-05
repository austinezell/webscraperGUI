const gulp = require('gulp');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');

gulp.task('default', ['sass', 'watch']);

gulp.task('sass', function(done){
  gulp.src('./scss/style.scss')
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(prefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minify())
  .pipe(gulp.dest('./public/styles'))
  .on('end', done)
});

gulp.task('watch', function(){
  gulp.watch('./scss/style.scss', ['sass'])
})
