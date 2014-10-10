import Ember from "ember";
import { getVal, retainByType } from "ember-cpm/utils";

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

var x = ['a', 'b', 'c', 123, 456, {hello: 'world'}, [1,2,4], undefined, undefined, null];

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
