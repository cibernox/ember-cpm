import Ember from "ember";
import notMatch from "ember-cpm/macros/not-match";

module("notMatch");

var MyObj = Ember.Object.extend({
  digitless: notMatch('movie.title', /\d/)
});

test('returns false if the value matches', function() {
  var o = MyObj.create({ movie: { title: '12 Monkeys' } });
  equal(o.get('digitless'), false);
});

test('returns true if the value does not match', function() {
  var o = MyObj.create({ movie: { title: 'Three Amigos' } });
  equal(o.get('digitless'), true);
});

test('returns true if the value is undefined', function() {
  var o = MyObj.create();
  ok(o.get('digitless'));
});

test('returns true if the value is null', function() {
  var o = MyObj.create({ movie: { title: null } });
  equal(o.get('digitless'), true);
});

test('returns true if the value is a non-string', function() {
  var o = MyObj.create({ movie: { title: 595 } });
  equal(o.get('digitless'), true);
});
