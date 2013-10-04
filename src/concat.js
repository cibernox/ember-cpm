(function(window, Ember, $, EmberCPM) {
  var a_slice  = Array.prototype.slice,
      a_forEach = Ember.ArrayPolyfills.forEach,
      get = (function() {
        var getSupportsPaths = Ember.get({ nested: { value: true } }, 'nested.value');
        return getSupportsPaths ? Ember.get : Ember.getPath;
      })();


  /*
     Returns the index where an item is to be removed from, or placed into, for
     an EmberCPM.Macros.concat array.

     This is the index of the item within its dependent array, offset by the
     lengths of all prior dependent arrays.
  */
  function getIndex(changeMeta, instanceMeta, dependentArrayDelta) {
    var dependentArrayGuid = Ember.guidFor(changeMeta.arrayChanged);

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
    dependentArrayLengths[dependentArrayIndex] = changeMeta.arrayChanged.getWithDefault('length', 0) + dependentArrayDelta;

    return arrayIndex;
  }

  function recomputeGuidIndexes(instanceMeta, keys, context) {
    instanceMeta.dependentGuidToIndex = {};
    a_forEach.call(keys, function (key, idx) {
      instanceMeta.dependentGuidToIndex[Ember.guidFor(this.get(key))] = idx;
    }, context);
  }

  EmberCPM.Macros.concat = function () {
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

    return Ember.arrayComputed.apply(null, args);
  };
}).call(undefined, this, this.Ember, this.jQuery, this.EmberCPM);
