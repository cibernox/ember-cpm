import { run } from '@ember/runloop';
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { module, test } from "qunit";
import concat from "ember-cpm/macros/concat";

function o(name) {
  return EmberObject.create({name: name});
}

var Obj = EmberObject.extend({
  allPeople: concat('lannisters', 'starks')
});

var obj;

module("concat", {
  beforeEach() {
    obj = Obj.create({
      lannisters: A([o('Jaime'), o('Cersei')]),
      starks: A([o('Robb'), o('Eddard')])
    });
  }
});

test("contains the concatenation of all elements in its dependent arrays", function(assert) {
  var allPeople = obj.get('allPeople');
  assert.deepEqual(allPeople.map(p => p.name), ['Jaime', 'Cersei', 'Robb', 'Eddard']);
});

test("updates when new items are inserted in its dependent arrays", function(assert) {
  var lannisters = obj.get('lannisters');
  var starks = obj.get('starks');

  lannisters.insertAt(1, o('Tyrion'));
  assert.deepEqual(obj.get('allPeople').map(p => p.get('name')), ['Jaime', 'Tyrion', 'Cersei', 'Robb', 'Eddard']);

  starks.insertAt(1, o('Bran'));
  assert.deepEqual(obj.get('allPeople').map(p => p.get('name')), ['Jaime', 'Tyrion', 'Cersei', 'Robb', 'Bran', 'Eddard']);
});

test("updates when new items are removed in its dependent arrays", function(assert) {
  var lannisters = obj.get('lannisters');
  var starks = obj.get('starks');

  lannisters.removeAt(0);
  starks.removeAt(1);

  assert.deepEqual(obj.get('allPeople').map(p => p.get('name')), ['Cersei', 'Robb']);
});

test("updates when elements in dependent arrays are replaced", function(assert) {
  obj.get('lannisters').replace(0, 2, [o('Tytos'), o('Tywin')]);

  assert.deepEqual(obj.get('allPeople').map(p => p.get('name')), ['Tytos', 'Tywin', 'Robb', 'Eddard']);
});

test("updates correctly for initial dependent arrays updated via `set`", function(assert) {
  var lannisters = A([o('Tytos'), o('Tywin')]);
  obj.get('allPeople');

  run(function() {
    obj.set('lannisters', lannisters);
  });

  var arrayAfter = obj.get('allPeople');
  assert.deepEqual(arrayAfter.map(p => p.get('name')), ['Tytos', 'Tywin', 'Robb', 'Eddard']);
});

test("updates correctly for subsequent dependent arrays updated via `set`", function(assert) {
  var starks = A([o('Sansa'), o('Arya')]);
  obj.get('allPeople');

  run(function() {
    obj.set('starks', starks);
  });
  var array = obj.get('allPeople');
  assert.deepEqual(array.map(p => p.get('name')), ['Jaime', 'Cersei', 'Sansa', 'Arya']);
});

test("updates correctly when dependent arrays are swapped", function(assert) {
  var lannisters = obj.get('lannisters');
  var starks = obj.get('starks');
  obj.get('allPeople');

  run(function() {
    obj.set('lannisters', starks);
    obj.set('starks', lannisters);
  });

  var array = obj.get('allPeople');
  assert.deepEqual(array.map(p => p.get('name')), ['Robb', 'Eddard', 'Jaime', 'Cersei']);
});

test("updates correctly when multiple dependent keys are the same array", function(assert) {
  obj.get('allPeople');

  run(function() {
    obj.set('lannisters', obj.get('starks'));
  });
  var array = obj.get('allPeople');

  assert.deepEqual(array.map(p => p.get('name')), ['Robb', 'Eddard', 'Robb', 'Eddard']);
  assert.equal(array[0], array[2]);
  assert.equal(array[1], array[3]);
});

test("ignores null or undefined dependent arrays", function(assert) {
  var array;

  run(function() {
    obj.set('lannisters', undefined);
  });
  array = obj.get('allPeople');
  assert.deepEqual(array.map(p => p.get('name')), ['Robb', 'Eddard']);

  run(function() {
    obj.set('starks', undefined);
  });
  array = obj.get('allPeople');
  assert.deepEqual(array.map(p => p.get('name')), []);
});

test("concatenates multiple arrays", function(assert) {
  var Obj = EmberObject.extend({
    allPeople: concat('lannisters', 'starks', 'boltons')
  });

  obj = Obj.create({
    lannisters: A([o('Jaime'), o('Cersei')]),
    starks: A([o('Robb'), o('Eddard')]),
    boltons: A([o('Ramsey'), o('Roose')])
  });

  assert.deepEqual(obj.get('allPeople').map(p => p.get('name')), ['Jaime', 'Cersei', 'Robb', 'Eddard', 'Ramsey', 'Roose']);
});
