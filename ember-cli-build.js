/* global require, module */

module.exports = function(defaults) {
  var emberCPM;

  if (process.argv[2] === 'build') {
    var dist    = require('broccoli-dist-es6-module');
    var Funnel  = require('broccoli-funnel');

    var transpiled = dist('addon', {
      global: 'EmberCPM',
      packageName: 'ember-cpm',
      main: 'index',
      shim: { 'ember': 'Ember' }
    });

    emberCPM = new Funnel(transpiled, {
      getDestinationPath: function(relativePath) {
        if (/main.js/.test(relativePath)){
          return relativePath.replace('main.js', 'ember-cpm.js')
        }
        return relativePath;
      }
    });

    if (process.env.EMBER_ENV === 'production') {
      var mergeTrees = require('broccoli-merge-trees');
      var defeatureify = require('broccoli-defeatureify');
      var uglify = require('broccoli-uglify-js');
      var defeatureifyOpts = {
        enableStripDebug: true,
        debugStatements: [
          "Ember.warn",
          "emberWarn",
          "Ember.assert",
          "emberAssert",
          "Ember.deprecate",
          "emberDeprecate",
          "Ember.debug",
          "emberDebug",
          "Ember.Logger.info",
          "Ember.runInDebug",
          "runInDebug"
        ]
      };

      var devBuild  = defeatureify(emberCPM, defeatureifyOpts);
      var prodBuild = defeatureify(emberCPM, defeatureifyOpts);
      var minBuild  = uglify(prodBuild);

      prodBuild = new Funnel(prodBuild, {
        getDestinationPath: function(relativePath) {
          if (/(globals|named-amd)/.test(relativePath)) {
            return relativePath.replace('ember-cpm.js', 'ember-cpm.prod.js');
          }
          return relativePath;
        }
      });

      minBuild = new Funnel(minBuild, {
        getDestinationPath: function(relativePath) {
          if (/(globals|named-amd)/.test(relativePath)) {
            return relativePath.replace('ember-cpm.js', 'ember-cpm.min.js');
          }
          return relativePath;
        }
      });


      emberCPM = mergeTrees([devBuild, minBuild, prodBuild], { overwrite: true });
    }
  } else {
    var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
    var app = new EmberAddon(defaults);
    emberCPM = app.toTree();
  }

  return emberCPM;
};
