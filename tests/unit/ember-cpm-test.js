import Ember from "ember";
import EmberCPM from "ember-cpm/ember-cpm";

module("EmberCPM");

var macrosNames = ['among', 'encodeURIComponent', 'encodeURI', 'firstPresent', 'fmt',
  'htmlEscape', 'ifNull', 'notAmong', 'notEqual', 'notMatch', 'promise', 'safeString',
  'join', 'sumBy', 'concat', 'product', 'sum', 'conditional', 'difference'];

test("contains all the macros", function(){
  macrosNames.forEach(function(macroName){
    equal(typeof EmberCPM.Macros[macroName], "function");
  });
});

test("install macros itself into Ember.computed", function(){
  EmberCPM.install();
  macrosNames.forEach(function(macroName){
    equal(typeof Ember.computed[macroName], 'function');
  });
});
