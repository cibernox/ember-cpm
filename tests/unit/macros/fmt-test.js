import Ember from "ember";
import fmt from "ember-cpm/macros/fmt";

module("fmt");

var MyObj = Ember.Object.extend({
  starred: fmt('value', '** %@ **'),
  labeled: fmt('label', 'value', '%@: %@')
});

test('returns undefined if the value is undefined', function() {
  var o = MyObj.create();
  equal(o.get('starred'), undefined);
});

test('returns null if the value is null', function() {
  var o = MyObj.create({ value: null });
  equal(o.get('starred'), null);
});

test('injects the value into the format-string', function() {
  var o = MyObj.create({ value: 'Hello' });
  equal(o.get('starred'), '** Hello **');
});

test('returns undefined if *any* of the values is undefined', function() {
  var o = MyObj.create({ label: "Name" });
  equal(o.get('labeled'), undefined);
});

test('returns null if *any* of the values is null', function() {
  var o = MyObj.create({ value: "Kaylee" });
  equal(o.get('labeled'), undefined);
});

test('injects multiple values into the format-string', function() {
  var o = MyObj.create({ label: 'Name', value: "Kaylee" });
  equal(o.get('labeled'), 'Name: Kaylee');
});

test('recomputes', function() {
  var o = MyObj.create({ label: 'Name', value: "Kaylee" });
  Ember.run(function() {o.set('label', 'First Name'); });
  equal(o.get('labeled'), 'First Name: Kaylee');
  Ember.run(function() {o.set('value', 'Mike');});
  equal(o.get('labeled'), 'First Name: Mike');
});

test('composeable macro support', function () {
  var Typ = Ember.Object.extend({
    firstName: 'Mike',
    lastName: 'North',
    language: 'JavaScript',
    text: fmt(fmt('firstName', 'lastName', '%@ %@'), 'language', 'User %@ likes to write %@')
  });
  var obj = Typ.create({});

  strictEqual(obj.get('text'), 'User Mike North likes to write JavaScript');
  obj.setProperties({
    firstName: 'Stefan',
    lastName: 'Penner'
  });
  strictEqual(obj.get('text'), 'User Stefan Penner likes to write JavaScript');

});
