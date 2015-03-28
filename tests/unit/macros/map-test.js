import Ember from 'ember';
import map from 'ember-cpm/macros/map';

var MyType = Ember.Object.extend({

  mapProp: map('arr', function (item) {
    return 3 * item.val;
  }),

  mapPropB: map('arr', {
    itemDependancyKeys: ['val'],
    getMappedValue: function (item) {
      return 3 * item.val;
    }
  }),

  mapPropC: map('arr', {
    itemDependancyKeys: ['val'],
    getMappedValue: function (item) {
      return 3 * item.val;
    },
    updateDependantItem: function (idx, val, item) {
      item.set('val', val/3);
    }
  })
});

var myObj;

module('map', {
  setup: function () {
    myObj = MyType.create({
      arr: Ember.A([
        Ember.Object.create({val: 1}),
        Ember.Object.create({val: 2}),
        Ember.Object.create({val: 3}),
        Ember.Object.create({val: 4})
      ])
    });
  }
});

test('getting the property value', function () {
  deepEqual(myObj.get('mapProp'), [3, 6, 9, 12]);
});

test('simple - value responds to dependant property changes', function () {
  deepEqual(myObj.get('mapProp'), [3, 6, 9, 12]);
  myObj.get('arr').popObject();
  deepEqual(myObj.get('mapProp'), [3, 6, 9]);
});

test('read only - value responds to changes in items in array', function () {
  myObj.get('mapPropB');
  myObj.get('arr.firstObject').set('val', 4);
  deepEqual(myObj.get('mapPropB'), [12, 6, 9, 12]);
});

test('read only - setting property overrides it', function () {
  myObj.set('mapPropB', 68);
  equal(myObj.get('mapPropB'), 68);
  myObj.get('arr').popObject();
  equal(myObj.get('mapPropB'), 68);
});

test('writable - setting value of computed property updates dependant property', function () {
  myObj.set('mapPropC', [9, 6, 9, 12]);
  deepEqual(JSON.parse(JSON.stringify(myObj.get('arr'))), [{val: 3}, {val: 2}, {val: 3}, {val: 4}]);
});
