import { module, test } from "qunit";
import Ember from 'ember';
import asFloat from 'ember-cpm/macros/as-float';

var MyType = Ember.Object.extend({
  val: '6',
  floatVal: 1.2,
  boolVal: true,
  nullVal: null,
  undefinedVal: undefined,
  valAsFloat: asFloat('val'),
  nullAsFloat: asFloat('nullValue'),
  undefinedAsFloat: asFloat('undefinedValue'),
  boolAsFloat: asFloat('boolVal'),
  floatAsFloat: asFloat('floatVal'),
  nonNumericStringAsFloat: asFloat('abcd')
});

var myObj;

module('asFloat', {
  beforeEach() {
    myObj = MyType.create();
  }
});

test('string prop - getting value as a float', function (assert) {
  assert.strictEqual(myObj.get('valAsFloat'), 6.0);
  myObj.set('val', '14');
  assert.strictEqual(myObj.get('valAsFloat'), 14.0);
});

test('string prop - setting value as a float', function (assert) {
  myObj.set('valAsFloat', 12.0);
  assert.strictEqual(myObj.get('val'), '12');
});

test('numeric prop - getting value as a float', function (assert) {
  assert.strictEqual(myObj.get('floatAsFloat'), 1.2);
  myObj.set('floatVal', 14.2);
  assert.strictEqual(myObj.get('floatAsFloat'), 14.2);
});

test('numeric prop - setting value as a float', function (assert) {
  myObj.set('floatAsFloat', 12.1);
  assert.strictEqual(myObj.get('floatVal'), 12.1);
});

test('null prop - getting value as a float', function (assert) {
  assert.strictEqual(myObj.get('nullAsFloat').toString(), 'NaN');
});

test('undefined prop - getting value as a float', function (assert) {
  assert.strictEqual(myObj.get('undefinedAsFloat').toString(), 'NaN');
});

test('string argument case', function (assert) {
  assert.equal(myObj.get('nonNumericStringAsFloat').toString(), 'NaN', 'non-numeric string');
});

test('Setting float value updates dependant string property', function (assert) {
  myObj.set('valAsFloat', 3.2);
  assert.strictEqual(myObj.get('val'), '3.2', 'string type of dependant property is respected');
});

test('Setting float value updates dependant numeric property', function (assert) {
  myObj.set('floatAsFloat', 111.124);
  assert.strictEqual(myObj.get('floatVal'), 111.124, 'float type of dependant property is respected');
});

test('boolean argument case', function (assert) {
  assert.strictEqual(myObj.get('boolAsFloat'), 1.0, 'boolean true evaluates to 1');
  myObj.set('boolVal', false);
  assert.strictEqual(myObj.get('boolAsFloat'), 0.0, 'boolean false evaluates to 0');
  myObj.set('boolAsFloat', 1.0);
  assert.strictEqual(myObj.get('boolVal'), true);
  myObj.set('boolAsFloat', 0.0);
  assert.strictEqual(myObj.get('boolVal'), false);
});

test('zero-argument case throws an exception', function (assert) {
  assert.throws(function () {
    Ember.Object.extend({
      prop: asFloat()
    });
  }, /No\sargument/);
});

test('null-argument case throws an exception', function (assert) {
  assert.throws(function () {
    Ember.Object.extend({
      prop: asFloat(null)
    });
  }, /Null\sargument/);
});
