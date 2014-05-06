!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.EmberCPM=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get   = Ember.get,
  a_slice = Array.prototype.slice;

exports["default"] = function(dependentKey) {
  var properties = a_slice.call(arguments, 1);

  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey),
      i;

    for (i = 0; i < properties.length; ++i) {
      if (properties[i] === value) return true;
    }
    return false;
  });
}
},{}],2:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get   = Ember.get,
  a_forEach = Ember.ArrayPolyfills.forEach,
  a_slice = Array.prototype.slice;

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
exports["default"] = function () {
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
},{}],3:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var among = _dereq_("./among")["default"] || _dereq_("./among");
var encodeURIComponent = _dereq_("./encode-uri-component")["default"] || _dereq_("./encode-uri-component");
var encodeURI = _dereq_("./encode-uri")["default"] || _dereq_("./encode-uri");
var fmt = _dereq_("./fmt")["default"] || _dereq_("./fmt");
var htmlEscape = _dereq_("./html-escape")["default"] || _dereq_("./html-escape");
var ifNull = _dereq_("./if-null")["default"] || _dereq_("./if-null");
var notAmong = _dereq_("./not-among")["default"] || _dereq_("./not-among");
var notEqual = _dereq_("./not-equal")["default"] || _dereq_("./not-equal");
var notMatch = _dereq_("./not-match")["default"] || _dereq_("./not-match");
var promise = _dereq_("./promise")["default"] || _dereq_("./promise");
var safeString = _dereq_("./safe-string")["default"] || _dereq_("./safe-string");
var join = _dereq_("./join")["default"] || _dereq_("./join");
var sumBy = _dereq_("./sum-by")["default"] || _dereq_("./sum-by");
var concat = _dereq_("./concat")["default"] || _dereq_("./concat");

function reverseMerge(dest, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
      dest[key] = source[key];
    }
  }
}

var VERSION = '1.0.1',
  Macros = {
    among: among,
    encodeURIComponent: encodeURIComponent,
    encodeURI: encodeURI,
    fmt: fmt,
    htmlEscape: htmlEscape,
    ifNull: ifNull,
    notAmong: notAmong,
    notEqual: notEqual,
    notMatch: notMatch,
    promise: promise,
    safeString: safeString,
    join: join,
    sumBy: sumBy,
    concat: concat,
  },
  install = function(){ reverseMerge(Ember.computed, Macros); };


if (Ember.libraries)
  Ember.libraries.register('Ember-CPM', VERSION);

exports.VERSION = VERSION;
exports.Macros = Macros;
exports.install = install;
},{"./among":1,"./concat":2,"./encode-uri":5,"./encode-uri-component":4,"./fmt":6,"./html-escape":7,"./if-null":8,"./join":9,"./not-among":10,"./not-equal":11,"./not-match":12,"./promise":13,"./safe-string":14,"./sum-by":15}],4:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;

exports["default"] = function(dependentKey) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) return value;
    return encodeURIComponent(value);
  });
}
},{}],5:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;

exports["default"] = function(dependentKey) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) return value;
    return encodeURI(value);
  });
}
},{}],6:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get   = Ember.get,
  a_slice = Array.prototype.slice;

exports["default"] = function() {
  var formatString = '' + a_slice.call(arguments, -1),
      properties   = a_slice.call(arguments, 0, -1);

  return Ember.computed(function(){
    var values = [], i, value;

    for (i = 0; i < properties.length; ++i) {
      value = get(this, properties[i]);
      if (value === undefined) { return undefined; }
      if (value === null)      { return null; }
      values.push(value);
    }

    return Ember.String.fmt(formatString, values);
  });
}
},{}],7:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;

exports["default"] = function(dependentKey) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    if (value == null) return value;

    var escapedExpression = Ember.Handlebars.Utils.escapeExpression(value);
    return new Ember.Handlebars.SafeString(escapedExpression);
  });

}
},{}],8:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;

exports["default"] = function(dependentKey, defaultValue) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value == null ? defaultValue : value;
  });
}
},{}],9:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get   = Ember.get,
  a_slice = Array.prototype.slice;

exports["default"] = function() {
  var separator  = a_slice.call(arguments, -1),
      properties = a_slice.call(arguments, 0, -1);

  var cp = Ember.computed(function(){
    var that = this;
    return properties.map(function(key) {
      return get(that, key);
    }).join(separator);
  });

  return cp.property.apply(cp, properties);
}
},{}],10:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get   = Ember.get,
  a_slice = Array.prototype.slice;

exports["default"] = function(dependentKey) {
  var properties = a_slice.call(arguments, 1);

  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey),
      i;

    for (var i = 0; i < properties.length; ++i) {
      if (properties[i] === value) return false;
    }

    return true;
  });
}
},{}],11:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;

exports["default"] = function(dependentKey, targetValue) {
  return Ember.computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}
},{}],12:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;

exports["default"] = function(dependentKey, regexp) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return typeof value === 'string' ? !value.match(regexp) : true;
  });
}
},{}],13:[function(_dereq_,module,exports){
"use strict";
// TODO: Use RSVP?
var get = Ember.get;

exports["default"] = function(dependentKey) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return $.when(value);
  });
}
},{}],14:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;

exports["default"] = function(dependentKey) {

  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new Ember.Handlebars.SafeString(value);
  });

}
},{}],15:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get   = Ember.get,
  a_slice = Array.prototype.slice;

exports["default"] = function(dependentKey, propertyKey) {
  return Ember.reduceComputed(dependentKey + '.@each.' + propertyKey, {
    initialValue: 0.0,

    addedItem: function(accumulatedValue, item, changeMeta, instanceMeta){
      return accumulatedValue + parseFloat(get(item, propertyKey));
    },

    removedItem: function(accumulatedValue, item, changeMeta, instanceMeta){
      return accumulatedValue - parseFloat(get(item, propertyKey));
    }
  });
}
},{}]},{},[3])
(3)
});