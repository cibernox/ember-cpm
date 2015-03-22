import { module, test } from "qunit";
import Ember from "ember";
import notAmong from "ember-cpm/macros/not-among";

module("notAmong");

var MyObj = Ember.Object.extend({
  notCartoonDog: notAmong('value', 'Odie', 'Snoopy')
});

test('returns false if the value is among the given values', function(assert) {
  var o = MyObj.create({ value: 'Snoopy' });
  assert.equal(o.get('notCartoonDog'), false);
});

test('returns true if the value is not among the given values', function(assert) {
  var o = MyObj.create({ value: 'Garfield' });
  assert.equal(o.get('notCartoonDog'), true);
});
