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

}).call(undefined, this, this.Ember, this.jQuery, this.EmberCPM);
