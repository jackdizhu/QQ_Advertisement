const fs = require("fs")
var gulp = require('gulp')
var crx = require('gulp-crx-pack')

var manifest = require('./jack_Chrome_AD/manifest.json')

gulp.task('crx', function() {
  return gulp.src('./jack_Chrome_AD')
    .pipe(crx({
      privateKey: fs.readFileSync('./jack_Chrome_AD_crx/jack_Chrome_AD.pem', 'utf8'),
      filename: manifest.name + '.crx'
    }))
    .pipe(gulp.dest('./jack_Chrome_AD_crx'))
})

gulp.run('crx')
