'use strict'

import gulp from 'gulp'
import gutil from 'gulp-util'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import fs from 'fs'
import babel from 'gulp-babel'

const paths = {
  js: ['./src/js/**/*.js']
}

gulp.task('default', ['js'], () => {
  gulp.watch(paths.js, ['js'])
})

gulp.task('build', ['js'], () => {
  return true
})

gulp.task('js', () => {
  return gulp.src(['./src/writer.js'])
    .pipe(babel())
    .pipe(concat('writer.min.js'))
    .pipe(uglify()
      .on('error', handleJsError)
      .on('warning', handleJsError)
      .on('fatal', handleJsError))
    .pipe(gulp.dest('./dist'))
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