import EmberObject from '@ember/object';
import { module, test } from "qunit";
import encodeURI from "ember-cpm/macros/encode-uri";

var MyObj = EmberObject.extend({
  encoded: encodeURI('value')
});

module('encodeURI', function() {
  test('returns undefined if the value is undefined', function(assert) {
    assert.equal(MyObj.create().get('encoded'), undefined);
  });

  test('returns null if the value is null', function(assert) {
    assert.equal(MyObj.create({ value: null }).get('encoded'), null);
  });

  test('URI-encodes values (as full URIs)', function(assert) {
    var url      = 'http://example.com/one and two';
    var expected = 'http://example.com/one%20and%20two';
    assert.equal(MyObj.create({ value: url }).get('encoded'), expected);
  });
});
