import Ember from 'ember';
import asInt from 'ember-cpm/macros/as-int';

var MyType = Ember.Object.extend({
  val: '6',
  intVal: 2,
  floatVal: 2.6,
  valAsint: asInt('val'),
  nothingAsint: asInt(),
  intValAsInt: asInt('intVal'),
  nullAsint: asInt(null),
  floatValAsInt: asInt('floatVal'),
  nonNumericStringAsInt: asInt('adas'),
  emptyStringAsInt: asInt(''),
  undefinedAsint: asInt(undefined)
});

var myObj;

module('asInt', {
  setup: function () {
    myObj = MyType.create();
  }
});

test('string prop - getting value as a int', function () {
  strictEqual(myObj.get('valAsint'), 6.0);
  myObj.set('val', '14');
  strictEqual(myObj.get('valAsint'), 14.0);
});

test('string prop - setting value as a int', function () {
  myObj.set('valAsint', 12.0);
  strictEqual(myObj.get('val'), '12');
});

test('numeric prop - getting value as a int', function () {
  strictEqual(myObj.get('intValAsInt'), 2);
  myObj.set('intVal', 14);
  strictEqual(myObj.get('intValAsInt'), 14);
});

test('numeric prop - setting value as a int', function () {
  myObj.set('intValAsInt', 13);
  strictEqual(myObj.get('intVal'), 13);
});

test('float prop - getting value as a int', function () {
  strictEqual(myObj.get('floatValAsInt'), 2);
});

test('string argument case', function () {
  equal(myObj.get('nonNumericStringAsInt').toString(), 'NaN', 'non-numeric string');
  equal(myObj.get('emptyStringAsInt').toString(), 'NaN', 'empty string');
});

test('zero argument case', function () {
  strictEqual(myObj.get('nothingAsint').toString(), 'NaN');
});

test('null argument case', function () {
  strictEqual(myObj.get('nullAsint').toString(), 'NaN');
});

test('undefined argument case', function () {
  strictEqual(myObj.get('undefinedAsint').toString(), 'NaN');
});
