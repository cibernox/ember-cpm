import { isHTMLSafe } from '@ember/string';
import EmberObject from '@ember/object';
import { module, test } from "qunit";
import htmlEscape from "ember-cpm/macros/html-escape";

module("html-escape");

var MyObj = EmberObject.extend({
  escaped: htmlEscape('value')
});

test('returns undefined if the value is undefined', function(assert) {
  assert.equal(MyObj.create().get('escaped'), undefined);
});

test('returns null if the value is null', function(assert) {
  assert.equal(MyObj.create({ value: null }).get('escaped'), null);
});

test('HTML-escapes the value', function(assert) {
  var tag = '<em>Hi</em>';
  var escaped = '&lt;em&gt;Hi&lt;/em&gt;';
  var actual = MyObj.create({ value: tag }).get('escaped').toString();
  assert.equal(actual, escaped);
});

test('Marks the result as safe', function(assert) {
  var actual = MyObj.create({ value: '<img />' }).get('escaped');
  assert.ok(isHTMLSafe(actual));
});
