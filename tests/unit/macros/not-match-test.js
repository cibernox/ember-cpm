import { module, test } from "qunit";
import Ember from "ember";
import notMatch from "ember-cpm/macros/not-match";

module("notMatch");

var MyObj = Ember.Object.extend({
  digitless: notMatch('movie.title', /\d/)
});

test('returns false if the value matches', function(assert) {
  var o = MyObj.create({ movie: { title: '12 Monkeys' } });
  assert.equal(o.get('digitless'), false);
});

test('returns true if the value does not match', function(assert) {
  var o = MyObj.create({ movie: { title: 'Three Amigos' } });
  assert.equal(o.get('digitless'), true);
});

test('returns true if the value is undefined', function(assert) {
  var o = MyObj.create();
  assert.ok(o.get('digitless'));
});

test('returns true if the value is null', function(assert) {
  var o = MyObj.create({ movie: { title: null } });
  assert.equal(o.get('digitless'), true);
});

test('returns true if the value is a non-string', function(assert) {
  var o = MyObj.create({ movie: { title: 595 } });
  assert.equal(o.get('digitless'), true);
});
