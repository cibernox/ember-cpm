import Ember from "ember";
import product from "ember-cpm/macros/product";

module("product");

var MyType = Ember.Object.extend({
  c: product('a', 'b'),
  d: product('a', 'c'),
  e: product('a'),
  f: product(),
  i: product('a', 'b', 'g', 'h'),
  j: product('a', 'b', 'g', 'h', 2),
  k: product(product('a', 'b'), 'h')
});

var myObj = MyType.create({
  a: 6,
  b: 7,
  g: 12,
  h: 4
});

test('calculates the product of two basic numeric properties', function () {
  equal(myObj.get('c'), 42);
});

test('calculates the product of many numeric properties', function () {
  equal(myObj.get('i'), 2016);
});

test('calculates the product of many numeric properties, with a constant', function () {
  equal(myObj.get('j'), 4032);
});

test('responds to dependent property changes appropriately', function () {
  myObj.set('a', 5);
  equal(myObj.get('c'), 35);
});

test('evaluates nested properties appropriately', function () {
  equal(myObj.get('d'), 175);
});

test('given one argument, returns the value of that property', function () {
  equal(myObj.get('e'), 5);
});

test('given no arguments, returns 0', function () {
  equal(myObj.get('f'), 0);
});

test('product of product', function () {
  equal(myObj.get('k'), 140);
});
