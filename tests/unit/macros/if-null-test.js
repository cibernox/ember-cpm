import { module, test } from "qunit";
import Ember from 'ember';
import ifNull from 'ember-cpm/macros/if-null';

module('ifNull');

var MyType = Ember.Object.extend({
  orSushi: ifNull('value', 'Sushi')
});

test('returns the default if the value is undefined', function(assert) {
  assert.equal(MyType.create().get('orSushi'), 'Sushi');
});

test('returns the default if the value is null', function(assert) {
  assert.equal(MyType.create({ value: null }).get('orSushi'), 'Sushi');
});

test('returns the value if it is not null or undefined', function(assert) {
  assert.equal(MyType.create({ value: 'Ramen' }).get('orSushi'), 'Ramen');
});

test('returns other falsy values', function(assert) {
  assert.equal(MyType.create({ value: false }).get('orSushi'), false);
  assert.equal(MyType.create({ value: 0 }).get('orSushi'), 0);
});

test('allows a computed property as the default value', function(assert) {
  var MyType = Ember.Object.extend({
    fallback: 'Sashimi',
    orSashimi: ifNull('value', 'fallback')
  });

  var myObj = MyType.create();
  assert.equal(myObj.get('orSashimi'), 'Sashimi');

  myObj.set('fallback', 'Tuna');
  assert.equal(myObj.get('orSashimi'), 'Tuna');

  myObj.set('value', 'Mackerel');
  assert.equal(myObj.get('orSashimi'), 'Mackerel');
});
