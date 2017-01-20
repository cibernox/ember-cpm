import { module, test } from "qunit";
import Ember from "ember";
import computedPromise from "ember-cpm/macros/computed-promise";

var object;
var deferred;

module("promise-object", {
  beforeEach() {
    deferred = Ember.RSVP.defer();

    object = Ember.Object.extend({
      dep: null,
      promise: deferred.promise,
      myComputedPromise: computedPromise('dep', function(){
        return this.get('promise');
      })
    }).create();

  }
});

test('updates when resolved', function(assert){
  const done  = assert.async();
  assert.expect(1);

  // Must kick off promise before we can assert against proper value on next
  // tick
  object.get('myComputedPromise');

  deferred.promise.then(function() {
    assert.equal(object.get('myComputedPromise.foo'), 'bar');

    done();
  });

  deferred.resolve({ foo: 'bar' });
});

test('when dependent key changes cb is invoked (non-eagerly)', function(assert){
  const done  = assert.async();
  assert.expect(2);

  // Must kick off promise before we can assert against proper value on next
  // tick
  object.get('myComputedPromise');

  deferred.promise.then(function() {
    assert.equal(object.get('myComputedPromise.foo'), 'bar');
  }).then(function(){
    object.set('dep', 'does not matter');
  }).then(function(){
    deferred = Ember.RSVP.defer();

    object.set('promise', deferred.promise);
    object.get('myComputedPromise');

    deferred.resolve({ foo: 'baz' });

    return deferred.promise;
  }).then(function(){
    assert.equal(object.get('myComputedPromise.foo'), 'baz');
    done();
  });

  // kick it all off
  deferred.resolve({ foo: 'bar' });
});

test('if fn not last argument throws', function(assert){
    assert.throws(function(){
      computedPromise('dep');
    }, /You must supply a function as the last argument to this macro./);
});

test('works when not given a cb who returns a promise', function(assert){
  const done  = assert.async();
  assert.expect(1);

  object.set('promise', { foo: 'bar' });

  // Must kick off promise before we can assert against proper value on next
  // tick
  object.get('myComputedPromise');

  deferred.promise.then(function() {
    assert.equal(object.get('myComputedPromise.foo'), 'bar');

    done();
  });

  deferred.resolve();
});
