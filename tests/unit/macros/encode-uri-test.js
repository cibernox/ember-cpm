import Ember from "ember";
import encodeURI from "ember-cpm/macros/encode-uri";

var MyObj = Ember.Object.extend({
  encoded: encodeURI('value')
});

module('encodeURI');

test('returns undefined if the value is undefined', function() {
  equal(MyObj.create().get('encoded'), undefined);
});

test('returns null if the value is null', function() {
  equal(MyObj.create({ value: null }).get('encoded'), null);
});

test('URI-encodes values (as full URIs)', function() {
  var url      = 'http://example.com/one and two';
  var expected = 'http://example.com/one%20and%20two';
  equal(MyObj.create({ value: url }).get('encoded'), expected);
});
