import Ember from "ember";
import ifNull from "ember-cpm/macros/if-null";

module("ifNull");

var MyObj = Ember.Object.extend({
  orSushi: ifNull('value', 'Sushi')
});

test('returns the default if the value is undefined', function() {
  equal(MyObj.create().get('orSushi'), 'Sushi');
});

test('returns the default if the value is null', function() {
  equal(MyObj.create({ value: null }).get('orSushi'), 'Sushi');
});

test('returns the value if it is not null or undefined', function() {
  equal(MyObj.create({ value: 'Ramen' }).get('orSushi'), 'Ramen');
});

test('returns other falsy values', function() {
  equal(MyObj.create({ value: false }).get('orSushi'), false);
  equal(MyObj.create({ value: 0 }).get('orSushi'), 0);
});
