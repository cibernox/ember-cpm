import Ember from 'ember';
import asString from 'ember-cpm/macros/as-string';

var MyType = Ember.Object.extend({
  asStringProp: asString('val')
});

var myObj;

module('asString', {
  setup: function () {
    myObj = MyType.create({
      val: 6
    });
  }
});

test('Get a value as a string', function () {
  strictEqual(myObj.get('asStringProp'), '6');
});

test('Respond to changes in dependent property', function () {
  myObj.set('val', 4);
  strictEqual(myObj.get('asStringProp'), '4');
});

test('setting string property should update dependent int property', function () {
  myObj.set('asStringProp', '12');
  strictEqual(myObj.get('val'), 12, 'int type of dependant property is respected');
});

test('setting string property should update dependent string property', function () {
  myObj = MyType.create({
    val: '11'
  });
  myObj.set('asStringProp', '12');
  strictEqual(myObj.get('val'), '12', 'string type of dependant property is respected');
});

test('setting string property should update dependent string property', function () {
  myObj = MyType.create({
    val: true
  });
  myObj.set('asStringProp', 'false');
  strictEqual(myObj.get('val'), false, 'boolean type of dependant property is respected');
});

test('zero-argument case throws an exception', function () {
  throws(function () {
    Ember.Object.extend({
      prop: asString()
    });
  }, /No\sargument/);
});

test('null-argument case throws an exception', function () {
  throws(function () {
    Ember.Object.extend({
      prop: asString(null)
    });
  }, /Null\sargument/);
});
