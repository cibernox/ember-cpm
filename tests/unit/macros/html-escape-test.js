import Ember from "ember";
import htmlEscape from "ember-cpm/macros/html-escape";

module("html-escape");

var MyObj = Ember.Object.extend({
  escaped: htmlEscape('value')
});

test('returns undefined if the value is undefined', function() {
  equal(MyObj.create().get('escaped'), undefined);
});

test('returns null if the value is null', function() {
  equal(MyObj.create({ value: null }).get('escaped'), null);
});

test('HTML-escapes the value', function() {
  var tag = '<em>Hi</em>';
  var escaped = '&lt;em&gt;Hi&lt;/em&gt;';
  var actual = MyObj.create({ value: tag }).get('escaped').toString();
  equal(actual, escaped);
});

test('Marks the result as safe', function() {
  var actual = MyObj.create({ value: '<img />' }).get('escaped');
  equal(actual instanceof Ember.Handlebars.SafeString, true);
});
