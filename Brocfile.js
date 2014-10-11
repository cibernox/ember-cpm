/* global require, module */

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

if (process.argv[2] === 'build') {
  var dist    = require('broccoli-dist-es6-module');
  var mover   = require('broccoli-file-mover');
  var merger  = require('broccoli-merge-trees');
  var remover = require('broccoli-file-remover');

  var transpiled = dist('addon', {
    global: 'EmberCPM',
    packageName: 'ember-cpm',
    main: 'ember-cpm',
    shim: { 'ember': 'Ember' }
  });

  var renamedFiles = mover(transpiled, {
    files: {
      '/globals/main.js': '/globals/ember-cpm.js',
      '/named-amd/main.js': '/named-amd/ember-cpm.js',
    }
  });

  var emberCPM = remover(merger([transpiled, renamedFiles]), {
    files: ['/globals/main.js', '/named-amd/main.js']
  });

  module.exports = emberCPM;
} else {
  var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
  var app = new EmberAddon();
  module.exports = app.toTree();
}
