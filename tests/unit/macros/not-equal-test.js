import Ember from "ember";
import notEqual from "ember-cpm/macros/not-equal";

module("notEqual");

var MyObj = Ember.Object.extend({
  isNotTwelve: notEqual('value', 12)
});

test('returns false if the value is equal', function() {
  var o = MyObj.create({ value: 12 });
  equal(o.get('isNotTwelve'), false);
});

test('returns true if the value is not equal', function() {
  var o = MyObj.create({ value: 99419 });
  equal(o.get('isNotTwelve'), true);
});
