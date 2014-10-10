define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var guidFor = Ember.guidFor;
    var arrayComputed = Ember.arrayComputed;

    var a_forEach = Ember.ArrayPolyfills.forEach,
      a_slice   = Array.prototype.slice;

    /*
       Returns the index where an item is to be removed from, or placed into, for
       an EmberCPM.Macros.concat array.

       This is the index of the item within its dependent array, offset by the
       lengths of all prior dependent arrays.
    */
    function getIndex(changeMeta, instanceMeta, dependentArrayDelta) {
      var dependentArrayGuid = guidFor(changeMeta.arrayChanged);

      if (!(dependentArrayGuid in instanceMeta.dependentGuidToIndex)) {
        recomputeGuidIndexes(instanceMeta, changeMeta.property._dependentKeys, this);
      }

      var dependentArrayLengths = instanceMeta.dependentArrayLengths,
          dependentArrayIndex = instanceMeta.dependentGuidToIndex[dependentArrayGuid],
          offset = 0,
          arrayIndex;

      // offset is the sum of the lengths of arrays to our left
      for (var i = 0; i < dependentArrayIndex; ++i) {
        offset += (dependentArrayLengths[i] || 0);
      }

      arrayIndex = offset + changeMeta.index;
      dependentArrayLengths[dependentArrayIndex] = (get(changeMeta.arrayChanged, 'length') || 0) + dependentArrayDelta;

      return arrayIndex;
    }

    function recomputeGuidIndexes(instanceMeta, keys, context) {
      instanceMeta.dependentGuidToIndex = {};
      a_forEach.call(keys, function (key, idx) {
        instanceMeta.dependentGuidToIndex[guidFor(get(this, key))] = idx;
      }, context);
    }

    /**
      Keeps n arrays concatenated using `Ember.ArrayComputed`.

      Example:
      ```js
      obj = Ember.Object.createWithMixins({
        itemsA: [],
        itemsB: [],
        itemsC: [],
        allItems: EmberCPM.Macros.concat('itemsA', 'itemsB', 'itemsC');
      });

      obj.get('itemsA').pushObjects(['a', 'b']);
      obj.get('allItems') //=> ['a', 'b']

      obj.get('itemsB').pushObjects(['c']);
      obj.get('allItems') //=> ['a', 'b', 'c']

      obj.get('itemsC').pushObjects(['d']);
      obj.get('allItems') //=> ['a', 'b', 'c', 'd']

      obj.get('itemsB').pushObjects(['e', 'f']);
      obj.get('allItems') //=> ['a', 'b', 'c', 'e', 'f', 'd']
      ```
    */
    __exports__["default"] = function EmberCPM_concat() {
      var args = a_slice.call(arguments);
      args.push({
        initialize: function (array, changeMeta, instanceMeta) {
          instanceMeta.dependentArrayLengths = new Array(changeMeta.property._dependentKeys.length);
          // When items are added or removed, we have access to the array that was
          // changed, but not its dependent key, so we use its guid as the key to
          // determine its index in the array of dependent keys.
          instanceMeta.dependentGuidToIndex = {};

          return array;
        },

        addedItem: function (array, item, changeMeta, instanceMeta) {
          var arrayIndex = getIndex.call(this, changeMeta, instanceMeta, 0);
          array.insertAt(arrayIndex, item);
          return array;
        },

        removedItem: function (array, item, changeMeta, instanceMeta) {
          var arrayIndex = getIndex.call(this, changeMeta, instanceMeta, -1);
          array.removeAt(arrayIndex);
          return array;
        }
      });

      return arrayComputed.apply(null, args);
    }
  });