import { module, test } from "qunit";
import Ember from "ember";
import encodeURIComponent from "ember-cpm/macros/encode-uri-component";

var MyObj = Ember.Object.extend({
  encoded: encodeURIComponent('value')
});

module('encodeURIComponent');

test('returns undefined if the value is undefined', function(assert) {
  assert.equal(MyObj.create().get('encoded'), undefined);
});

test('returns null if the value is null', function(assert) {
  assert.equal(MyObj.create({ value: null }).get('encoded'), null);
});

test('URI-encodes values (as URI components)', function(assert) {
  var url      = 'http://example.com/one and two';
  var expected = 'http%3A%2F%2Fexample.com%2Fone%20and%20two';

  assert.equal(MyObj.create({ value: url }).get('encoded'), expected);
});
