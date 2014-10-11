import Ember from "ember";
import promise from "ember-cpm/macros/promise";

var object;

module("promise", {
  setup: function(){
    object = Ember.Object.extend({
      asPromise: promise('value')
    }).create({value: 'Kangaroo'});
  }
});

test('returns a promise', function() {
  var p = object.get('asPromise');
  equal(typeof(p.then), 'function');
});

test('is pre-resolved', function() {
  var state;
  var p = object.get('asPromise');
  p.then(function() { state = 'passed'; }, function() { state = 'failed'; });
  equal(state, 'passed');
});

test('resolves with the value', function() {
  var resolvedWith;
  var p = object.get('asPromise');
  p.then(function(x) { resolvedWith = x; }, function(x) { resolvedWith = x; });
  equal(resolvedWith, 'Kangaroo');
});
