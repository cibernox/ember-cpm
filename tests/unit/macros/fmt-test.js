import Ember from "ember";
import fmt from "ember-cpm/macros/fmt";

module("fmt");

var MyObj = Ember.Object.extend({
  starred: fmt('value', '** %@ **'),
  labeled: fmt('label', 'value', '%@: %@')
});

test('returns undefined if the value is undefined', function() {
  var o = MyObj.create({});
  strictEqual(o.get('starred'), undefined);
});

test('returns null if the value is null', function() {
  var o = MyObj.create({ value: null });
  strictEqual(o.get('starred'), null);
});

test('injects the value into the format-string', function() {
  var o = MyObj.create({ value: 'Hello' });
  equal(o.get('starred'), '** Hello **');
});

test('returns undefined if *any* of the values is undefined', function() {
  var o = MyObj.create({ label: "Name" });
  strictEqual(o.get('labeled'), undefined);
  var oo = MyObj.create({ label: null });
  strictEqual(oo.get('labeled'), undefined);
  var ooo = MyObj.create({ value: '123' });
  strictEqual(ooo.get('labeled'), undefined);
});

test('returns null if *any* of the values is null', function() {
  var o = MyObj.create({ value: "Kaylee", label: null });
  strictEqual(o.get('labeled'), null);
  var oo = MyObj.create({ value: null, label: "Name" });
  strictEqual(oo.get('labeled'), null);
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
