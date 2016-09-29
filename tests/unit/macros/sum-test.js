import { module, test } from "qunit";
import Ember from "ember";
import sum from "ember-cpm/macros/sum";

module("sum");

var MyType = Ember.Object.extend({
  d: sum('a', 'b'),
  e: sum('a', 'b', 'c'),
  f: sum('a', 'b', 'c', 2),
  g: sum('a'),
  h: sum(2),
  j: Ember.A([1, 2, 3, 4]),
  k: sum(Ember.computed.max('j'), 5),
  l: sum(sum('a', 'b'), 5),
  m: sum('j'),
  n: sum('a', 'j', 'j'),
  o: Ember.A([]),
  p: sum('o')
});

var myObj = MyType.create({
  a: 6,
  b: 7,
  c: 2
});

test('when passed a single property, returns its value', function (assert) {
  assert.equal(myObj.get('g'), 6);
});

test('when passed a numeric literal, returns its value', function (assert) {
  assert.equal(myObj.get('h'), 2);
});

test('calculates the sum of two basic numeric properties', function (assert) {
  assert.equal(myObj.get('d'), 13);
});

test('calculates the sum of three basic numeric properties', function (assert) {
  assert.equal(myObj.get('e'), 15);
});

test('calculates the sum of three basic numeric properties and a numeric constant', function (assert) {
  assert.equal(myObj.get('f'), 17);
});

test('calculates the result of a composable computed property involving max', function (assert) {
  assert.equal(myObj.get('k'), 9);
});

test('calculates the result of a composable computed property involving sum', function (assert) {
  assert.equal(myObj.get('l'), 18);
});

////////////////////////////////////
// Ember.computed.sum regression test
////////////////////////////////////
// Tests:
// https://github.com/emberjs/ember.js/blob/bfd75e4f464e702608ed2bc3842a6b4d5b41eefa/packages/ember-runtime/tests/computed/reduce_computed_macros_test.js#L1380-L1417
//
test('sums up the items in an array', function (assert) {
  assert.equal(myObj.get('m'), 10);
  assert.equal(myObj.get('n'), 26);
  assert.equal(myObj.get('p'), 0);
});
