import Ember from 'ember';
import quotient from 'ember-cpm/macros/quotient';

var MyType = Ember.Object.extend({
  c: quotient('a', 'b'),
  d: quotient('a', 3),
  e: quotient(3, 'a'),
  f: quotient(),
  g: quotient('a'),
  h: quotient(Ember.computed.alias('a'), 2)
});

var myObj = MyType.create({
  a: 6,
  b: 2,
  arr: [1, 2, 4]
});

module('quotient');

test('is properly registered', function () {
  equal(!!quotient, true);
});

test('calculates the quotient of two basic numeric properties', function () {
  equal(myObj.get('c'), 3);
  myObj.set('a', 8);
  equal(myObj.get('c'), 4);
  myObj.set('a', 6);
});

test('calculates the quotient of a numeric property and a numeric ltesteral', function () {
  equal(myObj.get('d'), 2);
  equal(myObj.get('e'), 0.5);
  myObj.set('a', 12);
  equal(myObj.get('d'), 4);
  equal(myObj.get('e'), 0.25);
  myObj.set('a', 6);
});

test('zero argument case', function () {
  equal(myObj.get('f'), 0);
});

test('single argument case', function () {
  equal(myObj.get('g'), 6);
  myObj.set('a', 7);
  equal(myObj.get('g'), 7);
  myObj.set('a', 6);
});

test('composable CPM support', function () {
  equal(myObj.get('h'), 3);
  myObj.set('a', 5);
  equal(myObj.get('h'), 2.5);
  myObj.set('a', 6);
});
