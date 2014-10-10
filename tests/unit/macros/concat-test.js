import Ember from "ember";
import concat from "ember-cpm/macros/concat";

function o(name) {
  return Ember.Object.create({name: name});
}

var Obj = Ember.Object.extend({
  allPeople: concat('lannisters', 'starks')
});

var obj;

module("concat", {
  setup: function(){
    obj = Obj.create({
      lannisters: Ember.A([o('Jaime'), o('Cersei')]),
      starks: Ember.A([o('Robb'), o('Eddard')])
    });
  }
});

test("contains the concatenation of all elementes in its dependent arrays", function(){
  var allPeople = obj.get('allPeople');
  deepEqual(allPeople.mapProperty('name'), ['Jaime', 'Cersei', 'Robb', 'Eddard']);
});

test("updates when new items are inserted in its dependent arrays", function() {
  var lannisters = obj.get('lannisters');
  var starks = obj.get('starks');

  lannisters.insertAt(1, o('Tyrion'));
  deepEqual(obj.get('allPeople').mapProperty('name'), ['Jaime', 'Tyrion', 'Cersei', 'Robb', 'Eddard']);

  starks.insertAt(1, o('Bran'));
  deepEqual(obj.get('allPeople').mapProperty('name'), ['Jaime', 'Tyrion', 'Cersei', 'Robb', 'Bran', 'Eddard']);
});

test("updates when new items are removed in its dependent arrays", function() {
  var lannisters = obj.get('lannisters');
  var starks = obj.get('starks');

  lannisters.removeAt(0);
  starks.removeAt(1);

  deepEqual(obj.get('allPeople').mapProperty('name'), ['Cersei', 'Robb']);
});

test("updates when elements in dependent arrays are replaced", function() {
  obj.get('lannisters').replace(0, 2, [o('Tytos'), o('Tywin')]);

  deepEqual(obj.get('allPeople').mapProperty('name'), ['Tytos', 'Tywin', 'Robb', 'Eddard']);
});

test("updates correctly for initial dependent arrays updated via `set`", function() {
  var lannisters = [o('Tytos'), o('Tywin')];
  var array = obj.get('allPeople');

  Ember.run(function() {
    obj.set('lannisters', lannisters);
  });
  deepEqual(array.mapProperty('name'), ['Tytos', 'Tywin', 'Robb', 'Eddard']);
});

test("updates correctly for subsequent dependent arrays updated via `set`", function() {
  var starks = [o('Sansa'), o('Arya')];
  var array = obj.get('allPeople');

  Ember.run(function() {
    obj.set('starks', starks);
  });
  deepEqual(array.mapProperty('name'), ['Jaime', 'Cersei', 'Sansa', 'Arya']);
});

test("updates correctly when dependent arrays are swapped", function() {
  var lannisters = obj.get('lannisters');
  var starks = obj.get('starks');
  var array = obj.get('allPeople');

  Ember.run(function() {
    obj.set('lannisters', starks);
    obj.set('starks', lannisters);
  });

  deepEqual(array.mapProperty('name'), ['Robb', 'Eddard', 'Jaime', 'Cersei']);
});

test("updates correctly when multiple dependent keys are the same array", function() {
  var array = obj.get('allPeople');

  Ember.run(function() {
    obj.set('lannisters', obj.get('starks'));
  });

  deepEqual(array.mapProperty('name'), ['Robb', 'Eddard', 'Robb', 'Eddard']);
  equal(array[0], array[2]);
  equal(array[1], array[3]);
});

test("ignores null or undefined dependent arrays", function() {
  var array = obj.get('allPeople');

  Ember.run(function() {
    obj.set('lannisters', undefined);
  });
  deepEqual(array.mapProperty('name'), ['Robb', 'Eddard']);

  Ember.run(function() {
    obj.set('starks', undefined);
  });
  deepEqual(array.mapProperty('name'), []);
});

test("concatenates multiple arrays", function() {
  var Obj = Ember.Object.extend({
    allPeople: concat('lannisters', 'starks', 'boltons')
  });

  obj = Obj.create({
    lannisters: Ember.A([o('Jaime'), o('Cersei')]),
    starks: Ember.A([o('Robb'), o('Eddard')]),
    boltons: Ember.A([o('Ramsey'), o('Roose')]),
  });

  deepEqual(obj.get('allPeople').mapProperty('name'), ['Jaime', 'Cersei', 'Robb', 'Eddard', 'Ramsey', 'Roose']);
});
