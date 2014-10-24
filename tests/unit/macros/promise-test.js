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

asyncTest('is pre-resolved', function() {
  var state;
  var p = object.get('asPromise');
  p.then(function() { state = 'passed'; }, function() { state = 'failed'; });
  setTimeout(function(){
    start();
    equal(state, 'passed');
  });
});

asyncTest('resolves with the value', function() {
  var state;
  var p = object.get('asPromise');
  p.then(function(x) { state = x; }, function(x) { state = x; });
  setTimeout(function(){
    start();
    equal(state, 'Kangaroo');
  });
});
