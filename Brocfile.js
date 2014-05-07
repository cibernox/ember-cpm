var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');
var pickFiles = require('broccoli-static-compiler');
var uglifyJavaScript = require('broccoli-uglify-js');

var src = 'src';

var emberCPM = concat(src, {
  inputFiles: [
    'preamble.js',
    'concat.js',
    'index.js'
  ],
  outputFile: '/ember-cpm.js'
});

var emberCPMmin = uglifyJavaScript(emberCPM, {compress: true});
var minifiedFile = concat(emberCPMmin, {
  inputFiles: ['*.js'],
  outputFile: '/ember-cpm.min.js',
});

var outTrees = [emberCPM, minifiedFile];

if (process.argv[2] !== 'build') {
  var testDeps = pickFiles('node_modules/testem/public/testem/', {
    srcDir: '/',
    files: ['mocha.css', 'mocha.js', 'chai.js'],
    destDir: '/'
  });

  var specs = concat('spec', {
    inputFiles: ['**/*.js'],
    outputFile: '/ember-cpm-specs.js'
  });

  var html = pickFiles('spec', {
    srcDir: '/',
    files: ['index.html'],
    destDir: '/'
  });

  outTrees = outTrees.concat(findBowerTrees()).concat([testDeps, specs, html]);
}


module.exports = mergeTrees(outTrees);