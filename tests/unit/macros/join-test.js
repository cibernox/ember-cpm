import Ember from "ember";
import join from "ember-cpm/macros/join";

module("join");

var Obj = Ember.Object.extend({
  firstName: 'Jean-Luc',
  lastName:  'Picard',
  fullName:  join('firstName', 'lastName', ' ')
});

test('joins the dependent properties with the separator', function() {
  var obj = Obj.create();
  equal(obj.get('fullName'), 'Jean-Luc Picard');
});

test('updates when dependent properties update', function() {
  var obj = Obj.create();
  obj.set('firstName', 'Locutus');
  obj.set('lastName', 'of Borg');
  equal(obj.get('fullName'), 'Locutus of Borg');
});
