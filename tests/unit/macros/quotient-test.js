import { module, test } from "qunit";
import Ember from 'ember';
import quotient from 'ember-cpm/macros/quotient';

var MyType = Ember.Object.extend({
  c: quotient('a', 'b'),
  d: quotient('a', 3),
  e: quotient(3, 'a'),
  f: quotient(),
  g: quotient('a'),
  h: quotient(Ember.computed.or('a'), 2)
});

var myObj = MyType.create({
  a: 6,
  b: 2
});

module('quotient');

test('calculates the quotient of two basic numeric properties', function (assert) {
  assert.equal(myObj.get('c'), 3);
  myObj.set('a', 8);
  assert.equal(myObj.get('c'), 4);
  myObj.set('a', 6);
});

test('calculates the quotient of a numeric property and a numeric literal', function (assert) {
  assert.equal(myObj.get('d'), 2);
  assert.equal(myObj.get('e'), 0.5);
  myObj.set('a', 12);
  assert.equal(myObj.get('d'), 4);
  assert.equal(myObj.get('e'), 0.25);
  myObj.set('a', 6);
});

test('zero argument case', function (assert) {
  assert.equal(myObj.get('f'), 0);
});

test('single argument case', function (assert) {
  assert.equal(myObj.get('g'), 6);
  myObj.set('a', 7);
  assert.equal(myObj.get('g'), 7);
  myObj.set('a', 6);
});

test('composable CP support', function (assert) {
  assert.equal(myObj.get('h'), 3);
  myObj.set('a', 5);
  assert.equal(myObj.get('h'), 2.5);
  myObj.set('a', 6);
});
