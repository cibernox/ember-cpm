(function(window, Ember, $) {

  function reverseMerge(dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
  }

  var EmberCPM = {
        Macros: {},
        install: function() {
          reverseMerge(Ember.computed, EmberCPM.Macros);
        }
      };

  window.EmberCPM = EmberCPM;
  EmberCPM.VERSION = '1.0.1';
  if (Ember.libraries) Ember.libraries.register('Ember-CPM', EmberCPM.VERSION);

}).call(undefined, this, this.Ember, this.jQuery);
(function(window, Ember, $, EmberCPM) {

  function reverseMerge(dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
  }

  var a_slice  = Array.prototype.slice,
      get = Ember.get;

  function registerComputed(name, macro) {
    EmberCPM.Macros[name] = function(dependentKey) {
      var args = a_slice.call(arguments);
      return Ember.computed(dependentKey, function() {
        return macro.apply(this, args);
      });
    };
  }

  registerComputed('among', function(dependentKey) {
    var value = get(this, dependentKey),
        properties = a_slice.call(arguments, 1);
    for (var i = 0; i < properties.length; ++i) {
      if (properties[i] === value) { return true; }
    }
    return false;
  });

  registerComputed('encodeURIComponent', function(dependentKey) {
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return encodeURIComponent(value);
  });

  registerComputed('encodeURI', function(dependentKey) {
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return encodeURI(value);
  });

  registerComputed('htmlEscape', function(dependentKey) {
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return new Handlebars.SafeString(Handlebars.Utils.escapeExpression(value));
  });

  registerComputed('ifNull', function(dependentKey, defaultValue) {
    var value = get(this, dependentKey);
    return value == null ? defaultValue : value;
  });

  registerComputed('notAmong', function(dependentKey) {
    var value = get(this, dependentKey),
        properties = a_slice.call(arguments, 1);
    for (var i = 0; i < properties.length; ++i) {
      if (properties[i] === value) { return false; }
    }
    return true;
  });

  registerComputed('notEqual', function(dependentKey, targetValue) {
    var value = get(this, dependentKey);
    return value !== targetValue;
  });

  registerComputed('notMatch', function(dependentKey, regexp) {
    var value = get(this, dependentKey);
    return typeof value === 'string' ? !value.match(regexp) : true;
  });

  registerComputed('promise', function(dependentKey) {
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return $.when(value);
  });

  registerComputed('safeString', function(dependentKey) {
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return new Handlebars.SafeString(value);
  });

  EmberCPM.Macros.fmt = function() {
    var formatString = '' + a_slice.call(arguments, -1),
        properties   = a_slice.call(arguments, 0, -1),
        computed = Ember.computed(function() {
          var values = [], i, value;
          for (i = 0; i < properties.length; ++i) {
            value = get(this, properties[i]);
            if (value === undefined) { return undefined; }
            if (value === null)      { return null; }
            values.push(value);
          }
          return Ember.String.fmt(formatString, values);
        });

    return computed.property.apply(computed, properties);
  };

  EmberCPM.Macros.join = function() {
    var separator  = a_slice.call(arguments, -1);
    var properties = a_slice.call(arguments, 0, -1);

    var computed = Ember.computed(function() {
      var _this = this;
      return properties.map(function(key) {
        return get(_this,key);
      }).join(separator);
    });

    return computed.property.apply(computed, properties);
  };

  EmberCPM.Macros.sumBy = function(dependentKey, propertyKey){
    return Ember.reduceComputed(dependentKey + '.@each.' + propertyKey, {
      initialValue: 0.0,

      addedItem: function(accumulatedValue, item, changeMeta, instanceMeta){
        return accumulatedValue + parseFloat(Ember.get(item, propertyKey));
      },

      removedItem: function(accumulatedValue, item, changeMeta, instanceMeta){
        return accumulatedValue - parseFloat(Ember.get(item, propertyKey));
      }
    });
  };

  EmberCPM.Macros.boundFilter = function(){
    /*jshint -W053 */ /* Allow to use String as constructor only in this function */

    var dependentKey = arguments[0],
      argsLength = arguments.length,
      callback = arguments[argsLength - 1],
      otherKeys = Array.prototype.slice.call(arguments, 1, argsLength - 1),
      PLACEHOLDER = new String('__ember_filter_placeholder'),
      countRejections = function(array, limit){
        var count = 0;
        for (var i = 0; i < limit; i++){
          if (array[i] !== PLACEHOLDER) count++;
        }
        return count;
      },
      regexMatch = dependentKey.match(/(.*)\.@each\..*/),
      sourceArrayKey = regexMatch && regexMatch[1] || dependentKey;

    var initFn = function (array, changeMeta, instanceMeta) {
      var refilter = function(changedProperty){
        var sourceArray = get(this, sourceArrayKey),
          length = get(sourceArray, 'length'),
          rejections = instanceMeta.rejectedItems,
          rejectionsCount,
          item;
        for (var i = 0; i < length; i++){
          item = sourceArray[i];
          if (rejections[i] !== PLACEHOLDER && callback.call(this, item)){
            rejectionsCount = countRejections(rejections, i);
            rejections[i] = PLACEHOLDER;
            array.insertAt(i - rejectionsCount, item);
          } else if (rejections[i] === PLACEHOLDER && !callback.call(this, item)){
            rejectionsCount = countRejections(rejections, i);
            rejections[i] = item;
            array.removeAt(i - rejectionsCount);
          }
        }
      };

      var refilterOnce = function(object, changedProperty){
        Ember.run.once(object, refilter, changedProperty);
      };

      instanceMeta.rejectedItems = [];


      for (var i = 0; i < otherKeys.length; i++){
        Ember.addObserver(this, otherKeys[i], refilterOnce);
      }
    };

    var options = {
      initialize: initFn,

      addedItem: function(array, item, changeMeta, instanceMeta) {
        if (!!callback.call(this, item)){
          var rejectionsCount = countRejections(instanceMeta.rejectedItems, changeMeta.index);
          instanceMeta.rejectedItems.insertAt(changeMeta.index, PLACEHOLDER);
          array.insertAt(changeMeta.index - rejectionsCount, item);
        } else {
          instanceMeta.rejectedItems.insertAt(changeMeta.index, item);
        }

        return array;
      },

      removedItem: function(array, item, changeMeta, instanceMeta) {
        array.removeObject(item);
        instanceMeta.rejectedItems.removeAt(changeMeta.index);

        return array;
      }
    };

    return Ember.arrayComputed(dependentKey, options);
  };

  EmberCPM.Macros.inRange = function(dependentKey, propertyKey, rangeStartKey, rangeEndKey, options){
    var arrayComputedKey, getValue, filterFunction;

    options = options || {};

    if (propertyKey === '@this'){
      arrayComputedKey = dependentKey;
      getValue = function(element){ return element; };
    } else {
      arrayComputedKey = dependentKey + '.@each.' + propertyKey;
      getValue = function(element){ return get(element, propertyKey); };
    }

    if (options.exclusive){
      filterFunction = function(item){
        var value = getValue(item);
        return value > get(this, rangeStartKey) && value < get(this, rangeEndKey);
      };
    } else {
      filterFunction = function(item){
        var value = getValue(item);
        return value >= get(this, rangeStartKey) && value <= get(this, rangeEndKey);
      };
    }

    return EmberCPM.Macros.boundFilter(dependentKey, rangeStartKey, rangeEndKey, filterFunction);
  };

}).call(undefined, this, this.Ember, this.jQuery, this.EmberCPM);
(function(window, Ember, $, EmberCPM) {
  var a_slice  = Array.prototype.slice,
      a_forEach = Ember.ArrayPolyfills.forEach,
      get = Ember.get;

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
    dependentArrayLengths[dependentArrayIndex] = (get(changeMeta.arrayChanged, 'length') || 0) + dependentArrayDelta;

    return arrayIndex;
  }

  function recomputeGuidIndexes(instanceMeta, keys, context) {
    instanceMeta.dependentGuidToIndex = {};
    a_forEach.call(keys, function (key, idx) {
      instanceMeta.dependentGuidToIndex[Ember.guidFor(this.get(key))] = idx;
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
