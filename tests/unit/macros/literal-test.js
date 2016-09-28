import { module, test } from "qunit";
import Ember from 'ember';
import l from 'ember-cpm/macros/literal';

var MyType = Ember.Object.extend({
  literalProp: l('val')
});

var myObj;

module('literal', {
  beforeEach() {
    myObj = MyType.create({
      val: '6'
    });
  }
});

test('Property key (should return the key its self)', function (assert) {
  assert.strictEqual(myObj.get('literalProp'), 'val');
});

test('No argument case', function (assert) {
  assert.throws(function () {
    Ember.Object.extend({
      val: l()
    });
  }, "Illegal Argument");
});

test('Null argument case', function (assert) {
  assert.throws(function () {
    Ember.Object.extend({
      val: l(null)
    });
  }, "Illegal Argument");
});

test('Numeric argument case', function (assert) {
  assert.throws(function () {
    Ember.Object.extend({
      val: l(6)
    });
  }, "Illegal Argument");
});

test('Nested computed property argument case', function (assert) {
  assert.throws(function () {
    Ember.Object.extend({
      val: l(Ember.computed.alias('abc'))
    });
  }, "Illegal Argument");
});
