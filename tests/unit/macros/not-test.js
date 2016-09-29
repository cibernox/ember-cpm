import { module, test } from "qunit";
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
  beforeEach() {
    myObj = MyType.create({
      val: false,
      five: '5'
    });
  }
});

test('Boolean literals', function (assert) {
  assert.strictEqual(myObj.get('notTrue'), false);
  assert.strictEqual(myObj.get('notFalse'), true);
});

test('Not all equal (composable CPM)', function (assert) {
  assert.strictEqual(myObj.get('notAllEqual'), false);
  assert.strictEqual(myObj.get('notNotAllEqual'), true);
  myObj.set('five', '6');
  assert.strictEqual(myObj.get('notAllEqual'), true);
  assert.strictEqual(myObj.get('notNotAllEqual'), false);
});

test('Alias inverse (composable CPM)', function (assert) {
  assert.strictEqual(myObj.get('notValAlias'), true);
});
