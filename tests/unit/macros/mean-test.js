import { module, test } from "qunit";
import Ember from "ember";
import mean from "ember-cpm/macros/mean";

var myObj;


var MyType = Ember.Object.extend({
  e: mean('a', 'b', 'c', 'd'), //3
  f: mean('e', 5, 13, 7),
  g: mean(mean('a', 'b', 'c', 'd'), 5, 13, 7),
  h: mean(),
  i: mean('a'),
  j_data: Ember.A([6, 2, 1, 3]),
  j: mean('j_data'),
  l: mean('a', 'b', 'c', null),
  m: mean('a', 'b', 'c', undefined),
  n_data: Ember.A([{id: 1, val: 30}, {id: 2, val: 20}]),
  n: mean(Ember.computed.mapBy('n_data', 'val'))
});

module("mean", {
  beforeEach() {
    myObj = MyType.create({
      a: 6,
      b: 2,
      c: 1,
      d: 3
    });
  }
});



test('calculates the mean of four basic numeric properties', function (assert) {
  assert.equal(myObj.get('e'), 3);
  myObj.set('b', 9);
  assert.equal(myObj.get('e'), 4.75);
});

test('calculates the mean numeric properties mixed with numeric literals', function (assert) {
  assert.equal(myObj.get('f'), 7);
  myObj.set('b', 18);
  assert.equal(myObj.get('f'), 8);
});

test('composable computed properties', function (assert) {
  assert.equal(myObj.get('g'), 7);
  myObj.set('b', 18);
  assert.equal(myObj.get('g'), myObj.get('f'));
});

test('zero argument case', function (assert) {
  assert.equal(myObj.get('h'), 0);
});

test('single argument case', function (assert) {
  assert.equal(myObj.get('i'), 6);
});

test('array case', function (assert) {
  assert.equal(myObj.get('j'), 3);
});

test('array w/ mapBy case', function (assert) {
  assert.equal(myObj.get('n'), 25);
});

test('null case', function (assert) {
  assert.equal(myObj.get('l'), 3);
});

test('undefined case', function (assert) {
  assert.equal(myObj.get('m'), 3);
});
