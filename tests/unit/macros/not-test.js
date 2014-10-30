import Ember from 'ember';
import not from 'ember-cpm/macros/not';
import allEqual from 'ember-cpm/macros/all-equal';

var MyType = Ember.Object.extend({

  valAlias: Ember.computed.alias('val'),
  notValAlias: not('valAlias'),
  notTrue: not(true),
  notFalse: not(false),
  notAllEqual: not(allEqual('five', '5', '5')),
  notNotAllEqual: not(not(allEqual('five', '5', '5'))),
});

var myObj;

module('not', {
  setup: function () {
    myObj = MyType.create({
      val: false,
      five: '5'
    });
  }
});

test('Boolean literals', function () {
  strictEqual(myObj.get('notTrue'), false);
  strictEqual(myObj.get('notFalse'), true);
});

test('Not all equal (composable CPM)', function () {
  strictEqual(myObj.get('notAllEqual'), false);
  strictEqual(myObj.get('notNotAllEqual'), true);
  myObj.set('five', '6');
  strictEqual(myObj.get('notAllEqual'), true);
  strictEqual(myObj.get('notNotAllEqual'), false);
});

test('Alias inverse (composable CPM)', function () {
  strictEqual(myObj.get('notValAlias'), true);
});

test('Zero-argument case', function () {
  throws(function () {
      Ember.Object.extend({
        prop: not()
      });
  }, 'Illegal Argument');
});

test('Null-argument case', function () {
  throws(function () {
      Ember.Object.extend({
        prop: not(null)
      });
  }, 'Illegal Argument');
});

test('is writable, and updates dependant property', function () {
  strictEqual(myObj.get('val'), false);
  myObj.set('notValAlias', false);
  strictEqual(myObj.get('val'), true);
});
