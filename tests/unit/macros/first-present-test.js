import Ember from "ember";
import firstPresent from "ember-cpm/macros/first-present";

var Obj = Ember.Object.extend({
  nickname: '',
  name: 'Jean-Luc',
  email: 'jean@starship-enterprise.space',
  displayName: firstPresent('nickname', 'name', 'email')
});

module("firstPresent");

test('returns the first value that is not empty', function() {
  var obj = Obj.create();
  equal(obj.get('displayName'), 'Jean-Luc');
});

test('returns undefined if all values are empty', function() {
  var obj = Obj.create({ name: '', email: '' });
  equal(obj.get('displayName'), undefined);
});
