'use strict'

import gulp from 'gulp'
import gutil from 'gulp-util'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import babel from 'gulp-babel'
import npm from './package.json'
import header from 'gulp-header'

const desc = `\/*\nwordsmith.js ${npm.version}\nCopyright 2016 Krzysztof Kraszewski\nFree to use under MIT licence.\n*\/\n`
const paths = {
  js: ['./src/**/*.js']
}

gulp.task('default', ['js'], () => {
  gulp.watch(paths.js, ['js'])
})

gulp.task('build', ['js'], () => {
  return true
})

gulp.task('js', () => {
  gulp.src(['./src/wordsmith.js'])
    .pipe(babel())
    .pipe(concat('wordsmith.js'))
    .pipe(header(desc))
    .pipe(gulp.dest('./dist'))

  return gulp.src(['./src/wordsmith.js'])
    .pipe(babel())
    .pipe(concat('wordsmith.min.js'))
    .pipe(uglify()
      .on('error', handleJsError)
      .on('warning', handleJsError)
      .on('fatal', handleJsError))
    .pipe(header(desc))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./docs'))
})

function handleJsError (err) {
  gutil.log(gutil.colors.red('========== JS error encountered: =========='))
  if (err.fileName && err.cause) {
    gutil.log(gutil.colors.red(`File ${err.fileName}: \n ${err.cause}`))
  } else if (err.line && err.msg && err.filename) {
    gutil.log(gutil.colors.red(`File: ${err.filename}, line ${err.line}: ${err.msg}`))
  }

  this.emit('end')
}