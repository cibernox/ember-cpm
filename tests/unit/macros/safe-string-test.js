import { module, test } from "qunit";
import Ember from "ember";
import safeString from "ember-cpm/macros/safe-string";

module("safeString");

var MyObj = Ember.Object.extend({
  safe: safeString('value')
});

test('returns undefined if the value is undefined', function(assert) {
  var o = MyObj.create();
  assert.equal(o.get('safe'), undefined);
});

test('returns null if the value is null', function(assert) {
  var o = MyObj.create({ value: null });
  assert.equal(o.get('safe'), null);
});

test('returns a safe version of the value', function(assert) {
  var actual = MyObj.create({ value: 'Wombat' }).get('safe');
  assert.equal(actual.toString(), 'Wombat');
  assert.ok(Ember.String.isHTMLSafe(actual));
});
