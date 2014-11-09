import Ember from "ember";
import { getVal, retainByType, getDependentPropertyKeys } from "ember-cpm/utils";
import l from 'ember-cpm/macros/literal';

var MyType = Ember.Object.extend({
  a: 'A',
  b: Ember.computed.equal('a', 'B'),
  c: 5
});
var myObj = MyType.create();

module("utils - getVal");

test('get numeric property', function () {
  deepEqual(getVal.call(myObj,'c'), 5);
});

test('get string property', function () {
  deepEqual(getVal.call(myObj,'a'), 'A');
});

test('get string non-property', function () {
  deepEqual(getVal.call(myObj,'abc'), 'abc');
});

module("utils - retainByType");

var x = Ember.A(['a', 'b', 'c', 123, 456, {hello: 'world'}, [1,2,4], undefined, undefined, null]);

test('retain strings', function () {
  deepEqual(retainByType(x, 'string'), ['a', 'b', 'c']);
});

test('retain numbers', function () {
  deepEqual(retainByType(x, 'number'), [123, 456]);
});

test('retain objects', function () {
  deepEqual(retainByType(x, 'object'), [{hello: 'world'}]);
});

test('retain arrays', function () {
  deepEqual(retainByType(x, 'array'), [[1,2,4]]);
});

test('retain undefined', function () {
  deepEqual(retainByType(x, 'undefined'), [undefined, undefined]);
});

test('retain null', function () {
  deepEqual(retainByType(x, 'null'), [null]);
});

module("utils - getDependentPropertyKeys");

test('an empty array is allowed', function() {
  deepEqual(getDependentPropertyKeys([]), []);
});

test('the dependant keys of a computed property are included', function() {
  var argumentArray = [
    'a',
    Ember.computed.alias('dependantKey')
  ];
  deepEqual(getDependentPropertyKeys(argumentArray), ['a', 'dependantKey']);
});

test('literal values are not included', function() {
  var argumentArray = [
    'a',
    l('aLiteralValue'),
    l('a literal value')
  ];
  deepEqual(getDependentPropertyKeys(argumentArray), ['a']);
});

test('single word keys are included', function() {
  deepEqual(getDependentPropertyKeys(['a', 'b']), ['a', 'b']);
});

test('keys with spaces are excluded', function() {
  deepEqual(getDependentPropertyKeys(['aa', 'bb', 'not valid']), ['aa', 'bb']);
});

test('keys which are numbers are excluded', function() {
  deepEqual(getDependentPropertyKeys(['aa', 'bb', 142857]), ['aa', 'bb']);
});

test('keys which are boolean are excluded', function() {
  deepEqual(getDependentPropertyKeys(['aa', 'bb', true, false]), ['aa', 'bb']);
});

test('keys which are null are excluded', function() {
  deepEqual(getDependentPropertyKeys(['aa', 'bb', null]), ['aa', 'bb']);
});
