import EmberObject, { computed } from '@ember/object';
import { module, test } from "qunit";
import join from "ember-cpm/macros/join";

module("join");

function upcase (dependantKey) {
  return computed(dependantKey, function () {
    return this.get(dependantKey).toUpperCase();
  });
}

var Obj = EmberObject.extend({
  firstName: 'Jean-Luc',
  lastName:  'Picard',
  fullName:  join('firstName', 'lastName', ' '),
  formattedName: join('firstName', upcase('lastName'), ' ')
});

test('joins the dependent properties with the separator', function(assert) {
  var obj = Obj.create();
  assert.equal(obj.get('fullName'), 'Jean-Luc Picard');
});

test('updates when dependent properties update', function(assert) {
  var obj = Obj.create();
  obj.set('firstName', 'Locutus');
  obj.set('lastName', 'of Borg');
  assert.equal(obj.get('fullName'), 'Locutus of Borg');
});


test('composable macro support', function (assert) {
  var obj = Obj.create();
  assert.equal(obj.get('formattedName'), 'Jean-Luc PICARD');
});
