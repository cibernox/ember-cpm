import { module, test } from "qunit";
import Ember from "ember";
import firstPresent from "ember-cpm/macros/first-present";

var Obj = Ember.Object.extend({
  nickname: '',
  name: 'Jean-Luc',
  email: 'jean@starship-enterprise.space',
  displayName: firstPresent('nickname', 'name', 'email')
});

module("firstPresent");

test('returns the first value that is not empty', function(assert) {
  var obj = Obj.create();
  assert.equal(obj.get('displayName'), 'Jean-Luc');
});

test('returns undefined if all values are empty', function(assert) {
  var obj = Obj.create({ name: '', email: '' });
  assert.equal(obj.get('displayName'), undefined);
});
