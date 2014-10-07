import Ember from "ember";
import safeString from "ember-cpm/macros/safe-string";

module("safeString");

var MyObj = Ember.Object.extend({
  safe: safeString('value')
});

test('returns undefined if the value is undefined', function() {
  var o = MyObj.create();
  equal(o.get('safe'), undefined);
});

test('returns null if the value is null', function() {
  var o = MyObj.create({ value: null });
  equal(o.get('safe'), null);
});

test('returns a safe version of the value', function() {
  var actual = MyObj.create({ value: 'Wombat' }).get('safe');
  equal(actual.toString(), 'Wombat');
  equal(actual instanceof Ember.Handlebars.SafeString, true);
});
