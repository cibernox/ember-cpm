import EmberObject from '@ember/object';
import { module, test } from "qunit";
import firstPresent from "ember-cpm/macros/first-present";

var Obj = EmberObject.extend({
  nickname: '',
  name: 'Jean-Luc',
  email: 'jean@starship-enterprise.space',
  displayName: firstPresent('nickname', 'name', 'email')
});

module("firstPresent", function() {
  test('returns the first value that is not empty', function(assert) {
    var obj = Obj.create();
    assert.equal(obj.get('displayName'), 'Jean-Luc');
  });

  test('returns undefined if all values are empty', function(assert) {
    var obj = Obj.create({ name: '', email: '' });
    assert.equal(obj.get('displayName'), undefined);
  });
});
