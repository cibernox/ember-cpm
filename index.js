(function(window, Ember, $) {

  function reverseMerge(dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
  }

  var a_slice  = Array.prototype.slice,
      get      = Ember.getPath,
      EmberCPM = {
        Macros: {},
        install: function() {
          reverseMerge(Ember.computed, EmberCPM.Macros);
        }
      };

  function registerComputed(name, macro) {
    EmberCPM.Macros[name] = function(dependentKey) {
      var args = a_slice.call(arguments);
      return Ember.computed(dependentKey, function() {
        return macro.apply(this, args);
      }).cacheable();
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

  registerComputed('fmt', function(dependentKey, fmtString) {
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return fmtString.fmt(value);
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

  // Backport Ember 1.0 CP Macros:

  registerComputed('empty', function(dependentKey) {
    return Ember.empty(get(this, dependentKey));
  });

  registerComputed('notEmpty', function(dependentKey) {
    return !Ember.empty(get(this, dependentKey));
  });

  registerComputed('none', function(dependentKey) {
    return get(this, dependentKey) == null;
  });

  registerComputed('not', function(dependentKey) {
    return !get(this, dependentKey);
  });

  registerComputed('bool', function(dependentKey) {
    return !!get(this, dependentKey);
  });

  registerComputed('match', function(dependentKey, regexp) {
    var value = get(this, dependentKey);
    return typeof value === 'string' ? !!value.match(regexp) : false;
  });

  registerComputed('equal', function(dependentKey, value) {
    return get(this, dependentKey) === value;
  });

  registerComputed('gt', function(dependentKey, value) {
    return get(this, dependentKey) > value;
  });

  registerComputed('gte', function(dependentKey, value) {
    return get(this, dependentKey) >= value;
  });

  registerComputed('lt', function(dependentKey, value) {
    return get(this, dependentKey) < value;
  });

  registerComputed('lte', function(dependentKey, value) {
    return get(this, dependentKey) <= value;
  });

  function getProperties(self, propertyNames) {
    var ret = {};
    for(var i = 0; i < propertyNames.length; i++) {
      ret[propertyNames[i]] = get(self, propertyNames[i]);
    }
    return ret;
  }

  function registerComputedWithProperties(name, macro) {
    EmberCPM.Macros[name] = function() {
      var properties = a_slice.call(arguments);

      var computed = Ember.computed(function() {
        return macro.apply(this, [getProperties(this, properties)]);
      });

      return computed.property.apply(computed, properties);
    };
  }

  registerComputedWithProperties('and', function(properties) {
    for (var key in properties) {
      if (properties.hasOwnProperty(key) && !properties[key]) {
        return false;
      }
    }
    return true;
  });

  registerComputedWithProperties('or', function(properties) {
    for (var key in properties) {
      if (properties.hasOwnProperty(key) && properties[key]) {
        return true;
      }
    }
    return false;
  });

  registerComputedWithProperties('any', function(properties) {
    for (var key in properties) {
      if (properties.hasOwnProperty(key) && properties[key]) {
        return properties[key];
      }
    }
    return null;
  });

  registerComputedWithProperties('map', function(properties) {
    var res = [];
    for (var key in properties) {
      if (properties.hasOwnProperty(key)) {
        if (properties[key] == null) {
          res.push(null);
        } else {
          res.push(properties[key]);
        }
      }
    }
    return res;
  });

  var set = Ember.set;

  EmberCPM.Macros.alias = function(dependentKey) {
    return Ember.computed(dependentKey, function(key, value){
      if (arguments.length > 1) {
        set(this, dependentKey, value);
        return value;
      } else {
        return get(this, dependentKey);
      }
    }).cacheable();
  };

  EmberCPM.Macros.oneWay = function(dependentKey) {
    return Ember.computed(dependentKey, function(propertyName, newValue) {
      if (arguments.length > 1) {
        return newValue;
      }
      return get(this, dependentKey);
    }).cacheable();
  };

  EmberCPM.Macros.defaultTo = function(defaultPath) {
    return Ember.computed(function(key, newValue, cachedValue) {
      if (arguments.length === 1) {
        return cachedValue != null ? cachedValue : get(this, defaultPath);
      }
      return newValue != null ? newValue : get(this, defaultPath);
    }).cacheable();
  };

  // End Backport from Ember 1.0

  window.EmberCPM = EmberCPM;

}).call(undefined, this, this.Ember, this.jQuery);
