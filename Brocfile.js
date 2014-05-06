var concat         = require('broccoli-concat');
var pickFiles      = require('broccoli-static-compiler');
var mergeTrees     = require('broccoli-merge-trees');
var makeModules    = require('broccoli-dist-es6-module');
var findBowerTrees = require('broccoli-bower');

var EmberCPM = makeModules('packages/es6', {
  global: 'EmberCPM',
  packageName: 'ember-cpm',
  main: 'ember-cpm',
  shim: {
    'ember': 'Ember'
  }
})

var outTrees = [EmberCPM];

if (process.argv[2] != 'build') {
  var testDeps = pickFiles('node_modules/testem/public/testem/', {
    srcDir: '/',
    files: ['mocha.css', 'mocha.js', 'chai.js'],
    destDir: '/'
  });

  var html = pickFiles('spec', {
    srcDir: '/',
    files: ['index.html'],
    destDir: '/'
  });

  var specs = concat('spec', {
    inputFiles: ['test_helper.js','**/*.js'],
    outputFile: '/ember-cpm-specs.js'
  });

  outTrees = outTrees.concat(findBowerTrees());
  outTrees.push(specs);
  outTrees.push(testDeps);
  outTrees.push(html);
}

module.exports = mergeTrees(outTrees);