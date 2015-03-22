import { module, test } from "qunit";
import Ember from "ember";
import EmberCPM from "ember-cpm";

module("EmberCPM");

var macrosNames = ['among', 'encodeURIComponent', 'encodeURI', 'firstPresent', 'fmt',
  'htmlEscape', 'ifNull', 'notAmong', 'notEqual', 'notMatch', 'promise', 'safeString',
  'join', 'sumBy', 'concat', 'product', 'sum', 'conditional', 'difference'];

test("contains all the macros", function(assert){
  macrosNames.forEach(function(macroName){
    assert.equal(typeof EmberCPM.Macros[macroName], "function");
  });
});

test("install macros itself into Ember.computed", function(assert){
  EmberCPM.install();
  macrosNames.forEach(function(macroName){
    assert.equal(typeof Ember.computed[macroName], 'function');
  });
});
