import { module, test } from "qunit";
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

test('get numeric property', function (assert) {
  assert.deepEqual(getVal.call(myObj,'c'), 5);
});

test('get string property', function (assert) {
  assert.deepEqual(getVal.call(myObj,'a'), 'A');
});

test('get string non-property', function (assert) {
  assert.deepEqual(getVal.call(myObj,'abc'), 'abc');
});

module("utils - retainByType");

var x = Ember.A(['a', 'b', 'c', 123, 456, {hello: 'world'}, [1,2,4], undefined, undefined, null]);

test('retain strings', function (assert) {
  assert.deepEqual(retainByType(x, 'string'), ['a', 'b', 'c']);
});

test('retain numbers', function (assert) {
  assert.deepEqual(retainByType(x, 'number'), [123, 456]);
});

test('retain objects', function (assert) {
  assert.deepEqual(retainByType(x, 'object'), [{hello: 'world'}]);
});

test('retain arrays', function (assert) {
  assert.deepEqual(retainByType(x, 'array'), [[1,2,4]]);
});

test('retain undefined', function (assert) {
  assert.deepEqual(retainByType(x, 'undefined'), [undefined, undefined]);
});

test('retain null', function (assert) {
  assert.deepEqual(retainByType(x, 'null'), [null]);
});

module("utils - getDependentPropertyKeys");

test('an empty array is allowed', function(assert) {
  assert.deepEqual(getDependentPropertyKeys([]), []);
});

test('the dependant keys of a computed property are included', function(assert) {
  var argumentArray = [
    'a',
    Ember.computed.alias('dependantKey')
  ];
  assert.deepEqual(getDependentPropertyKeys(argumentArray), ['a', 'dependantKey']);
});

test('literal values are not included', function(assert) {
  var argumentArray = [
    'a',
    l('aLiteralValue'),
    l('a literal value')
  ];
  assert.deepEqual(getDependentPropertyKeys(argumentArray), ['a']);
});

test('single word keys are included', function(assert) {
  assert.deepEqual(getDependentPropertyKeys(['a', 'b']), ['a', 'b']);
});

test('keys with spaces are excluded', function(assert) {
  assert.deepEqual(getDependentPropertyKeys(['aa', 'bb', 'not valid']), ['aa', 'bb']);
});

test('keys which are numbers are excluded', function(assert) {
  assert.deepEqual(getDependentPropertyKeys(['aa', 'bb', 142857]), ['aa', 'bb']);
});

test('keys which are boolean are excluded', function(assert) {
  assert.deepEqual(getDependentPropertyKeys(['aa', 'bb', true, false]), ['aa', 'bb']);
});

test('keys which are null are excluded', function(assert) {
  assert.deepEqual(getDependentPropertyKeys(['aa', 'bb', null]), ['aa', 'bb']);
});
