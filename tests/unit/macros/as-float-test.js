import Ember from 'ember';
import asFloat from 'ember-cpm/macros/as-float';

var MyType = Ember.Object.extend({
  val: '6',
  floatVal: 1.2,
  valAsFloat: asFloat('val'),
  nothingAsFloat: asFloat(),
  floatAsFloat: asFloat('floatVal'),
  nullAsFloat: asFloat(null),
  undefinedAsFloat: asFloat(undefined),
  emptyStringAsFloat: asFloat(''),
  nonNumericStringAsFloat: asFloat('abcd')
});

var myObj;

module('asFloat', {
  setup: function () {
    myObj = MyType.create();
  }
});

test('string prop - getting value as a float', function () {
  strictEqual(myObj.get('valAsFloat'), 6.0);
  myObj.set('val', '14');
  strictEqual(myObj.get('valAsFloat'), 14.0);
});

test('string prop - setting value as a float', function () {
  myObj.set('valAsFloat', 12.0);
  strictEqual(myObj.get('val'), '12');
});

test('numeric prop - getting value as a float', function () {
  strictEqual(myObj.get('floatAsFloat'), 1.2);
  myObj.set('floatVal', 14.2);
  strictEqual(myObj.get('floatAsFloat'), 14.2);
});

test('numeric prop - setting value as a float', function () {
  myObj.set('floatAsFloat', 12.1);
  strictEqual(myObj.get('floatVal'), 12.1);
});

test('zero argument case', function () {
  strictEqual(myObj.get('nothingAsFloat').toString(), 'NaN');
});

test('string argument case', function () {
  equal(myObj.get('nonNumericStringAsFloat').toString(), 'NaN', 'non-numeric string');
  equal(myObj.get('emptyStringAsFloat').toString(), 'NaN', 'empty string');
});

test('null argument case', function () {
  strictEqual(myObj.get('nullAsFloat').toString(), 'NaN');
});

test('undefined argument case', function () {
  strictEqual(myObj.get('undefinedAsFloat').toString(), 'NaN');
});
