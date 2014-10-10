import Ember from "ember";
import difference from "ember-cpm/macros/difference";
import sum from "ember-cpm/macros/sum";

module("difference");

var MyType = Ember.Object.extend({
  c: difference('a', 'b'),
  d: difference('a', 3),
  e: difference(3, 'a'),
  f: difference(),
  g: difference('a'),
  h: difference(Ember.computed.alias('a'), 2),
  i: difference(sum('a', 'b'), 4)
});

var myObj = MyType.create({
  a: 6,
  b: 2
});

test('calculates the difference of two basic numeric properties', function () {
  equal(myObj.get('c'), 4);
  myObj.set('a', 8);
  equal(myObj.get('c'), 6);
  myObj.set('a', 6);
});

test('calculates the difference of a numeric property and a numeric literal', function () {
  equal(myObj.get('d'), 3);
  equal(myObj.get('e'), -3);
  myObj.set('a', 8);
  equal(myObj.get('d'), 5);
  equal(myObj.get('e'), -5);
  myObj.set('a', 6);
});

test('zero argument case', function () {
  equal(myObj.get('f'), 0);
});

test('one argument case', function () {
  equal(myObj.get('g'), 6);
});

test('composable properties case', function () {
  equal(myObj.get('h'), 4);
  equal(myObj.get('i'), 4);
  myObj.set('a', 8);
  equal(myObj.get('h'), 6);
  equal(myObj.get('i'), 6);
  myObj.set('a', 6);
});
