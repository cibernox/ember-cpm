import Ember from "ember";
import among from "ember-cpm/macros/among";

module("among");

var Show = Ember.Object.extend({
  hasCartoonDog: among('pet.name', 'Odie', 'Snoopy')
});

test("returns false if the value is not among the given values", function() {
  var show = Show.create({ pet: { name: 'Garfield' } });
  equal(show.get('hasCartoonDog'), false);
});

test("returns true if the value is among the given values", function() {
  var show = Show.create({ pet: { name: 'Odie' } });
  equal(show.get('hasCartoonDog'), true);
});
