(function(window, Ember, $, EmberCPM) {

  function reverseMerge(dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
  }

  var a_slice  = Array.prototype.slice,
      get = (function() {
        var getSupportsPaths = Ember.get({ nested: { value: true } }, 'nested.value');
        return getSupportsPaths ? Ember.get : Ember.getPath;
      })();

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
          item;
        for (var i = 0; i < length; i++){
          item = sourceArray[i];
          if (rejections[i] !== PLACEHOLDER && callback.call(this, item)){
            var rejectionsCount = countRejections(rejections, i);
            rejections[i] = PLACEHOLDER;
            array.insertAt(i - rejectionsCount, item);
          } else if (rejections[i] === PLACEHOLDER && !callback.call(this, item)){
            var rejectionsCount = countRejections(rejections, i);
            rejections[i] = item;
            array.removeAt(i - rejectionsCount);
          }
        }
      };

      instanceMeta.rejectedItems = [];

      for (var i = 0; i < otherKeys.length; i++){
        Ember.addObserver(this, otherKeys[i], function(object, changedProperty){
          Ember.run.once(object, refilter, changedProperty);
        });
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
