import { module, test } from "qunit";
import Ember from "ember";
import promise from "ember-cpm/macros/promise";

var object;

module("promise", {
  beforeEach() {
    object = Ember.Object.extend({
      asPromise: promise('value')
    }).create({value: 'Kangaroo'});
  }
});

test('returns a promise', function(assert) {
  var p = object.get('asPromise');
  assert.equal(typeof(p.then), 'function');
});

test('is pre-resolved', function(assert) {
  var done = assert.async();
  var state;
  var p = object.get('asPromise');
  p.then(function() { state = 'passed'; }, function() { state = 'failed'; });
  setTimeout(function(){
    assert.equal(state, 'passed');
    done();
  });
});

test('resolves with the value', function(assert) {
  var done = assert.async();
  var state;
  var p = object.get('asPromise');
  p.then(function(x) { state = x; }, function(x) { state = x; });
  setTimeout(function(){
    assert.equal(state, 'Kangaroo');
    done();
  });
});
