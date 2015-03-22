import { module, test } from "qunit";
import Ember from "ember";
import notEqual from "ember-cpm/macros/not-equal";

module("notEqual");

var MyObj = Ember.Object.extend({
  isNotTwelve: notEqual('value', 12)
});

test('returns false if the value is equal', function(assert) {
  var o = MyObj.create({ value: 12 });
  assert.equal(o.get('isNotTwelve'), false);
});

test('returns true if the value is not equal', function(assert) {
  var o = MyObj.create({ value: 99419 });
  assert.equal(o.get('isNotTwelve'), true);
});
