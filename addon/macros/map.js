import Ember from 'ember';
import {
  getVal
}
from '../utils';

var computed = Ember.computed;

/**
  Transform an array of objects via a higher-order function

  ````javascript
  var MyType = Ember.Object.extend({
    mapProp: map('arr', function (item) {
      return 3 * item.val;
    })
  });

  var o = MyType.create({
    arr: [{val: 1}, {val: 2}, {val: 3}]
  });

  o.get('mapProp'); // [3, 6, 9]
  ````

  Sometimes you may need to add a dependancy on a property of items
  within an array. For example, in the above case, you may want to
  have a dependency on 'val'. This can be done using the following syntax:

  ````javascript
  mapProp: map('arr', {
    // dependancy on  "arr.@each.val"
    itemDependancyKeys: ['val'],

    // the mapping function
    getMappedValue: function (item) {
      return 3 * item.val;
    }
  })
  ````

  Also, you may specify an 'updateDependantItem' function if you wish the computed
  property to be writable.

  ````javascript
  var Typ = Ember.Object.extend({
    mapProp: map('arr', {
      // dependancy on  "arr.@each.val"
      itemDependancyKeys: ['val'],

      // the mapping funcion
      getMappedValue: function (item) {
        return 3 * item.val;
      },

      // the updating function
      updateDependantItem: function (
        idx, // index in array
        val, // value in computed array
        item) { // item in dependant array
        item.set('val', val/3);
      }
    })
  });
  var o = MyType.create({
    arr: [{val: 1}, {val: 2}, {val: 3}]
  });
  o.get('arr.firstObject.val'); // 1
  o.set('mapProp', [9, 6, 9, 12]);
  o.get('arr.firstObject.val'); // 3

  ````
  @method map
  @for macros
  @param dependantKey {String} property key for an array property to map
  @param optionsOrFunction {Function|Object} either a function or a configuration object

  Configuration object supports the following options

  * getMappedValue - function to do mapping from dependant array to computed property array
  * updateDependantItem - function to map from computed property array to dependant array
  * itemDependencyKeys - properties of items in the dependant array to monitor for changes

*/

export default function EmberCPM_map(dependantKey, optionsOrFunction) {
  var opts = Ember.mixin({
    itemDependancyKeys: [],
  }, typeof optionsOrFunction === 'object' ? optionsOrFunction : {
    getMappedValue: optionsOrFunction
  });

  // Get dependant keys
  var dependantKeys = [dependantKey + '.@each'];
  var itemKeys = opts.itemDependancyKeys;
  for (var i = 0; i < itemKeys.length; i++) {
    dependantKeys.push(dependantKey + '.@each.' + itemKeys[i]);
  }

  function computedPropCallback(key, val) {
    if (arguments.length === 1) {
      // Getter
      return getVal.call(this, dependantKey)
        .map(opts.getMappedValue);
    }
    else {
      // Setter
      var depArray = this.get(dependantKey);

      // Consolidate property changes
      Ember.changeProperties(function () { //
        // Iterate over the array of mapped values, and invoke the
        // updateDependantItem callback for each item in the array.
        // This provides the developer with an opportunity to "map back"
        // to the dependant array, and facilitates use cases involving
        // two-way data binding
        for (var i = 0; i < val.length; i += 1) {
          opts.updateDependantItem.call(this, i, val[i], depArray[i]);
        }
      }, this);
      return val;
    }
  }

  // This looks a little hacky, but there's no other way
  // allow this CPM to generate "overwritable" properties
  // when no setter is provided, and settable properties
  // when the setter is present.
  if (!Ember.isEmpty(opts.updateDependantItem)) {

    /*jshint unused:false*/
    dependantKeys.push(function (key, val) {
      // This function may be called in the context of setting
      // a property, since there are two or more arguments
      return computedPropCallback.apply(this, arguments);
    });
    /*jshint unused:true*/
  }
  else {
    dependantKeys.push(function () {
      // This function will never be called in the context
      // of a setter, since there are fewer than two arguments
      return computedPropCallback.apply(this, arguments);
    });
  }
  return computed.apply(this, dependantKeys);
}
