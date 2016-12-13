var rollup = require('rollup')
var buble = require('rollup-plugin-buble')
var commonjs = require('rollup-plugin-commonjs')
var nodeResolve = require('rollup-plugin-node-resolve')
var uglify = require('rollup-plugin-uglify')

var build = function (opts) {
  rollup
    .rollup({
      entry: 'src/' + opts.entry,
      plugins: [buble()].concat(opts.plugins || [])
    })
    .then(function (bundle) {
      var dest = 'lib/' + (opts.output || opts.entry)
      
      console.log(dest)
      bundle.write({
        format: 'cjs',
        moduleName: opts.moduleName || 'colorpath',
        dest: dest
      })
    })
    .catch(function (err) {
      console.error(err)
    })
}

build({
  entry: 'index.js',
  output: 'colorpath.js',
  plugins: [commonjs(), nodeResolve()]
})
build({
  entry: 'index.js',
  output: 'colorpath.min.js',
  plugins: [commonjs(), nodeResolve(), uglify()]
})