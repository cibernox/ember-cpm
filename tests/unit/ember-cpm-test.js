import { module, test } from "qunit";
import EmberCPM from "ember-cpm";

module("EmberCPM");

var macrosNames = ['among', 'encodeURIComponent', 'encodeURI', 'firstPresent', 'fmt',
  'htmlEscape', 'ifNull', 'promise', 'safeString', 'join', 'concat', 'product', 'sum',
  'conditional', 'difference'];

test("contains all the macros", function(assert){
  assert.expect(macrosNames.length);
  macrosNames.forEach(function(macroName){
    assert.equal(typeof EmberCPM.Macros[macroName], "function");
  });
});
