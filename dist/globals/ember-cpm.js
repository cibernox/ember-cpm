!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.EmberCPM=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_among(dependentKey) {
  var properties = Array.prototype.slice.call(arguments, 1);

  return computed(dependentKey, function(){
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

var get = Ember.get;
var computed = Ember.computed;
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
exports["default"] = function EmberCPM_concat() {
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
},{}],3:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var among = _dereq_("./among")["default"] || _dereq_("./among");
var encodeURIComponent = _dereq_("./encode-uri-component")["default"] || _dereq_("./encode-uri-component");
var encodeURI = _dereq_("./encode-uri")["default"] || _dereq_("./encode-uri");
var firstPresent = _dereq_("./first-present")["default"] || _dereq_("./first-present");
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
var product = _dereq_("./product")["default"] || _dereq_("./product");
var _utils = _dereq_("./utils")["default"] || _dereq_("./utils");

function reverseMerge(dest, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
      dest[key] = source[key];
    }
  }
}

var VERSION = '1.1.3';
var Macros = {
  among: among,
  encodeURIComponent: encodeURIComponent,
  encodeURI: encodeURI,
  firstPresent: firstPresent,
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
  product: product
};
var install = function(){ reverseMerge(Ember.computed, Macros); };


if (Ember.libraries)
  Ember.libraries.register('Ember-CPM', VERSION);

exports.VERSION = VERSION;
exports.Macros = Macros;
exports.install = install;
exports._utils = _utils;

exports["default"] = {
  VERSION: VERSION,
  Macros: Macros,
  install: install
};
},{"./among":1,"./concat":2,"./encode-uri":5,"./encode-uri-component":4,"./first-present":6,"./fmt":7,"./html-escape":8,"./if-null":9,"./join":10,"./not-among":11,"./not-equal":12,"./not-match":13,"./product":14,"./promise":15,"./safe-string":16,"./sum-by":17,"./utils":18}],4:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_encodeURIComponent(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) return value;
    return encodeURIComponent(value);
  });
}
},{}],5:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_encodeURI(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) return value;
    return encodeURI(value);
  });
}
},{}],6:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var A = Ember.A;
var isBlank = Ember.isBlank;
var isEmpty = Ember.isEmpty;

var a_slice = Array.prototype.slice;

// isBlank was introduced in Ember 1.5, backport if necessary.
if (!isBlank) {
  isBlank = function(obj) {
    return Ember.isEmpty(obj) || (typeof obj === 'string' && obj.match(/\S/) === null);
  };
}

var isPresent = function(value) {
  return ! isBlank(value);
};

exports["default"] = function EmberCPM_firstPresent() {
  var properties = a_slice.call(arguments);
  var computedArgs = a_slice.call(properties);

  computedArgs.push(function() {
    var that = this;
    var property = A(properties).find(function(key) {
      return isPresent(get(that, key));
    });

    if (property) { return get(that, property); }
  });

  return computed.apply(this, computedArgs);
}
},{}],7:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var EmberString = Ember.String;

var a_slice = Array.prototype.slice;

exports["default"] = function EmberCPM_fmt() {
  var formatString = '' + a_slice.call(arguments, -1),
      properties   = a_slice.call(arguments, 0, -1);

  return computed(function(){
    var values = [], i, value;

    for (i = 0; i < properties.length; ++i) {
      value = get(this, properties[i]);
      if (value === undefined) { return undefined; }
      if (value === null)      { return null; }
      values.push(value);
    }

    return EmberString.fmt(formatString, values);
  });
}
},{}],8:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var EmberHandlebars = Ember.Handlebars;

exports["default"] = function EmberCPM_htmlEscape(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    if (value == null) return value;

    var escapedExpression = EmberHandlebars.Utils.escapeExpression(value);
    return new EmberHandlebars.SafeString(escapedExpression);
  });

}
},{}],9:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_ifNull(dependentKey, defaultValue) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value == null ? defaultValue : value;
  });
}
},{}],10:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var a_slice = Array.prototype.slice;

exports["default"] = function EmberCPM_join() {
  var separator  = a_slice.call(arguments, -1),
      properties = a_slice.call(arguments, 0, -1);

  var cp = computed(function(){
    var that = this;
    return properties.map(function(key) {
      return get(that, key);
    }).join(separator);
  });

  return cp.property.apply(cp, properties);
}
},{}],11:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_notAmong(dependentKey) {
  var properties = Array.prototype.slice.call(arguments, 1);

  return computed(dependentKey, function(){
    var value = get(this, dependentKey),
      i;

    for (i = 0; i < properties.length; ++i) {
      if (properties[i] === value) return false;
    }

    return true;
  });
}
},{}],12:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
  return computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}
},{}],13:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_notMatch(dependentKey, regexp) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return typeof value === 'string' ? !value.match(regexp) : true;
  });
}
},{}],14:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
var reduceComputedPropertyMacro = _dereq_("./utils").reduceComputedPropertyMacro;

/**
*  Returns the product of some numeric properties and numeric constants
*
*  Example: 6 * 7 * 2 = 84
*
*  Usage:
*    a: 6,
*    b: 7,
*    c: 2,
*    d: product('a', 'b', 'c'), // 84
*    e: product('a', 'b', 'c', 2) // 168
*/

var EmberCPM_product = reduceComputedPropertyMacro(
  function (prev, item) {
    return prev * item;
  }
);

exports["default"] = EmberCPM_product;
},{"./utils":18}],15:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var $ = Ember.$;

// TODO: Use RSVP?
exports["default"] = function EmberCPM_promise(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return $.when(value);
  });
}
},{}],16:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var computed = Ember.computed;
var EmberHandlebars = Ember.Handlebars;

exports["default"] = function EmberCPM_safeString(dependentKey) {

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new EmberHandlebars.SafeString(value);
  });

}
},{}],17:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;

var get = Ember.get;
var reduceComputed = Ember.reduceComputed;

exports["default"] = function EmberCPM_sumBy(dependentKey, propertyKey) {
  return reduceComputed(dependentKey + '.@each.' + propertyKey, {
    initialValue: 0.0,

    addedItem: function(accumulatedValue, item, changeMeta, instanceMeta){
      return accumulatedValue + parseFloat(get(item, propertyKey));
    },

    removedItem: function(accumulatedValue, item, changeMeta, instanceMeta){
      return accumulatedValue - parseFloat(get(item, propertyKey));
    }
  });
}
},{}],18:[function(_dereq_,module,exports){
"use strict";
/**
 * Retain items in an array based on type
 * @param {array} arr  array to iterate over
 * @param {string} type string representation of type
 *
 * Example:
 * var x = ['a', 'b', 123, {hello: 'world'}];
 *
 * retainByType(x, 'string'); // ['a', 'b']
 * retainByType(x, 'number'); // [123]
 * retainByType(x, 'object'); // [{hello: 'world'}]
 *
 */
function retainByType(arr, type) {
  return arr.reject(
    function (item) {
      return Ember.typeOf(item) !== type;
    }
  );
}

exports.retainByType = retainByType;/**
 * Evaluate a value, which could either be a property key or a literal
 * @param val value to evaluate
 *
 * if the value is a string, the object that the computed property is installed
 * on will be checked for a property of the same name. If one is found, it will
 * be evaluated, and the result will be returned. Otherwise the string value its
 * self will be returned
 *
 * All non-string values pass straight through, and are returned unaltered
 */
function getVal(val) {
  if (Ember.typeOf(val) === 'string') {
    return Ember.get(this, val) || val;
  } else if (Ember.typeOf(val) === 'object' && Ember.Descriptor === val.constructor) {
    return val.func.apply(this);
  } else {
    return val;
  }
}

exports.getVal = getVal;/**
 * Return a computed property macro
 * @param {[type]} reducingFunction [description]
 */
function reduceComputedPropertyMacro(reducingFunction) {
  return function () {
    var mainArguments = Array.prototype.slice.call(arguments), // all arguments
      propertyArguments = retainByType(mainArguments, 'string');

    propertyArguments.push(function () {
      var self = this;
      switch (mainArguments.length) {

        case 0:   // Handle zero-argument case
          return 0;

        case 1:   // Handle one-argument case
          return getVal.call(this, mainArguments[0]);

        default:  // Handle multi-argument case
          return mainArguments.reduce(
            function (prev, item, idx, enumerable) {
              // Evaluate "prev" value if this is the first time the reduce callback is called
              var prevValue = idx === 1 ? getVal.call(self, prev) : prev,

                // Evaluate the "item" value
                itemValue = getVal.call(self, item);

              // Call the reducing function, replacing "prev" and "item" arguments with
              // their respective evaluated values
              return reducingFunction.apply(self, [prevValue, itemValue, idx, enumerable]);

            }
          );
      }
    });
    return Ember.computed.apply(this, propertyArguments);
  };
}

exports.reduceComputedPropertyMacro = reduceComputedPropertyMacro;
},{}]},{},[3])
(3)
});