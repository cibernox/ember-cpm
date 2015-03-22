import { module, test } from "qunit";
import Ember from "ember";
import fmt from "ember-cpm/macros/fmt";

module("fmt");

var MyObj = Ember.Object.extend({
  starred: fmt('value', '** %@ **'),
  labeled: fmt('label', 'value', '%@: %@')
});

test('returns undefined if the value is undefined', function(assert) {
  var o = MyObj.create();
  assert.equal(o.get('starred'), undefined);
});

test('returns null if the value is null', function(assert) {
  var o = MyObj.create({ value: null });
  assert.equal(o.get('starred'), null);
});

test('injects the value into the format-string', function(assert) {
  var o = MyObj.create({ value: 'Hello' });
  assert.equal(o.get('starred'), '** Hello **');
});

test('returns undefined if *any* of the values is undefined', function(assert) {
  var o = MyObj.create({ label: "Name" });
  assert.equal(o.get('labeled'), undefined);
});

test('returns null if *any* of the values is null', function(assert) {
  var o = MyObj.create({ value: "Kaylee" });
  assert.equal(o.get('labeled'), undefined);
});

test('injects multiple values into the format-string', function(assert) {
  var o = MyObj.create({ label: 'Name', value: "Kaylee" });
  assert.equal(o.get('labeled'), 'Name: Kaylee');
});

test('recomputes', function(assert) {
  var o = MyObj.create({ label: 'Name', value: "Kaylee" });
  Ember.run(function() {o.set('label', 'First Name'); });
  assert.equal(o.get('labeled'), 'First Name: Kaylee');
  Ember.run(function() {o.set('value', 'Mike');});
  assert.equal(o.get('labeled'), 'First Name: Mike');
});
