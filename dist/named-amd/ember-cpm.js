define("ember-cpm",
  ["ember","./macros/among","./macros/all-equal","./macros/encode-uri-component","./macros/encode-uri","./macros/first-present","./macros/fmt","./macros/html-escape","./macros/if-null","./macros/not-among","./macros/not-equal","./macros/not-match","./macros/promise","./macros/safe-string","./macros/join","./macros/sum-by","./macros/sum","./macros/concat","./macros/conditional","./macros/product","./macros/quotient","./macros/difference","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __dependency22__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var among = __dependency2__["default"] || __dependency2__;
    var allEqual = __dependency3__["default"] || __dependency3__;
    var encodeURIComponent = __dependency4__["default"] || __dependency4__;
    var encodeURI = __dependency5__["default"] || __dependency5__;
    var firstPresent = __dependency6__["default"] || __dependency6__;
    var fmt = __dependency7__["default"] || __dependency7__;
    var htmlEscape = __dependency8__["default"] || __dependency8__;
    var ifNull = __dependency9__["default"] || __dependency9__;
    var notAmong = __dependency10__["default"] || __dependency10__;
    var notEqual = __dependency11__["default"] || __dependency11__;
    var notMatch = __dependency12__["default"] || __dependency12__;
    var promise = __dependency13__["default"] || __dependency13__;
    var safeString = __dependency14__["default"] || __dependency14__;
    var join = __dependency15__["default"] || __dependency15__;
    var sumBy = __dependency16__["default"] || __dependency16__;
    var sum = __dependency17__["default"] || __dependency17__;
    var concat = __dependency18__["default"] || __dependency18__;
    var conditional = __dependency19__["default"] || __dependency19__;
    var product = __dependency20__["default"] || __dependency20__;
    var quotient = __dependency21__["default"] || __dependency21__;
    var difference = __dependency22__["default"] || __dependency22__;

    function reverseMerge(dest, source) {
      for (var key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }

    var VERSION = '1.2.0';
    var Macros = {
      among: among,
      allEqual: allEqual,
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
      sum: sum,
      difference: difference,
      concat: concat,
      conditional: conditional,
      quotient: quotient,
      product: product
    };
    var install = function(){ reverseMerge(Ember.computed, Macros); };


    if (Ember.libraries) {
      Ember.libraries.register('Ember-CPM', VERSION);
    }

    __exports__.VERSION = VERSION;
    __exports__.Macros = Macros;
    __exports__.install = install;

    __exports__["default"] = {
      VERSION: VERSION,
      Macros: Macros,
      install: install
    };
  });
define("ember-cpm/macros/all-equal",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";

    var Ember = __dependency1__["default"] || __dependency1__;
    var getVal = __dependency2__.getVal;
    var getDependentPropertyKeys = __dependency2__.getDependentPropertyKeys;

    __exports__["default"] = function EmberCPM_allEqual() {
      var mainArguments = Array.prototype.slice.call(arguments); // all arguments
      var propertyArguments = getDependentPropertyKeys(mainArguments);

      propertyArguments.push(function () {
        switch (mainArguments.length) {
          case 0:
          case 1:
            return true;
          default:
            var firstVal = getVal.call(this, mainArguments[0]);
            for (var i = 1; i < mainArguments.length; i += 1) {
              if (getVal.call(this, mainArguments[i]) !== firstVal) {
                return false;
              }
            }
            return true;
        }
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/among",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    __exports__["default"] = function EmberCPM_among(dependentKey) {
      var properties = Array.prototype.slice.call(arguments, 1);

      return computed(dependentKey, function(){
        var value = get(this, dependentKey),
          i;

        for (i = 0; i < properties.length; ++i) {
          if (properties[i] === value) {
            return true;
          }
        }
        return false;
      });
    }
  });
define("ember-cpm/macros/concat",
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
define("ember-cpm/macros/conditional",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    /**
     * Conditional computed property
     *
     * Usage:
     *
     *      // A simple true/false check on a property
     *      var MyType = Ember.Object.extend({
     *          a: true,
     *          b: EmberCPM.Macros.ifThenElse('a', 'yes', 'no')
     *      });
     *
     *      // Composable computed properties
     *      var lt = Ember.computed.lt; // "less than"
     *      var MyType = Ember.Object.extend({
     *          a: 15,
     *          b: EmberCPM.Macros.conditional(lt('a', 57), 'yes', 'no')
     *      });
     */

    __exports__["default"] = function EmberCPM_conditional(condition, valIfTrue, valIfFalse) {
      var isConditionComputed = Ember.Descriptor === condition.constructor;
      var propertyArguments = isConditionComputed ? condition._dependentKeys.slice(0) : [condition];

      propertyArguments.push(function(/* key, value, oldValue */) {
        var conditionEvaluation = isConditionComputed ? condition.func.apply(this, arguments) : this.get(condition);

        return conditionEvaluation ? valIfTrue : valIfFalse;
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/difference",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var getVal = __dependency2__.getVal;
    var getDependentPropertyKeys = __dependency2__.getDependentPropertyKeys;

    __exports__["default"] = function EmberCPM_difference() {
      var mainArguments = Array.prototype.slice.call(arguments);
      var propertyArguments = getDependentPropertyKeys(mainArguments);

      propertyArguments.push(function () {
        switch (mainArguments.length) {
          case 0:
            return 0;
          case 1:
            return getVal.call(this, mainArguments[0]);
          default:
            return getVal.call(this, mainArguments[0]) - getVal.call(this, mainArguments[1]);
        }
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/encode-uri-component",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    __exports__["default"] = function EmberCPM_encodeURIComponent(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) {
          return value;
        }
        return encodeURIComponent(value);
      });
    }
  });
define("ember-cpm/macros/encode-uri",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    __exports__["default"] = function EmberCPM_encodeURI(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) {
          return value;
        }
        return encodeURI(value);
      });
    }
  });
define("ember-cpm/macros/first-present",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var isBlank = Ember.isBlank;

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

    __exports__["default"] = function EmberCPM_firstPresent() {
      var properties = a_slice.call(arguments);
      var computedArgs = a_slice.call(properties);

      computedArgs.push(function() {
        var that = this;
        var property = Ember.A(properties).find(function(key) {
          return isPresent(get(that, key));
        });

        if (property) { return get(that, property); }
      });

      return computed.apply(this, computedArgs);
    }
  });
define("ember-cpm/macros/fmt",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var EmberString = Ember.String;

    var a_slice = Array.prototype.slice;

    __exports__["default"] = function EmberCPM_fmt() {
      var formatString = '' + a_slice.call(arguments, -1),
          properties   = a_slice.call(arguments, 0, -1),
          propertyArguments = a_slice.call(arguments, 0 , -1);

      propertyArguments.push(function(){
        var values = [], i, value;

        for (i = 0; i < properties.length; ++i) {
          value = get(this, properties[i]);
          if (value === undefined) { return undefined; }
          if (value === null)      { return null; }
          values.push(value);
        }

        return EmberString.fmt(formatString, values);
      });

      return computed.apply(this, propertyArguments);

    }
  });
define("ember-cpm/macros/html-escape",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var EmberHandlebars = Ember.Handlebars;

    __exports__["default"] = function EmberCPM_htmlEscape(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        if (value == null) {
          return value;
        }

        var escapedExpression = EmberHandlebars.Utils.escapeExpression(value);
        return new EmberHandlebars.SafeString(escapedExpression);
      });

    }
  });
define("ember-cpm/macros/if-null",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    __exports__["default"] = function EmberCPM_ifNull(dependentKey, defaultValue) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        return value == null ? defaultValue : value;
      });
    }
  });
define("ember-cpm/macros/join",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var a_slice = Array.prototype.slice;

    __exports__["default"] = function EmberCPM_join() {
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
  });
define("ember-cpm/macros/not-among",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    __exports__["default"] = function EmberCPM_notAmong(dependentKey) {
      var properties = Array.prototype.slice.call(arguments, 1);

      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        for (var i = 0, l = properties.length; i < l; ++i) {
          if (properties[i] === value) {
            return false;
          }
        }

        return true;
      });
    }
  });
define("ember-cpm/macros/not-equal",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    __exports__["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
      return computed(dependentKey, function(){
        return get(this, dependentKey) !== targetValue;
      });
    }
  });
define("ember-cpm/macros/not-match",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    __exports__["default"] = function EmberCPM_notMatch(dependentKey, regexp) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        return typeof value === 'string' ? !value.match(regexp) : true;
      });
    }
  });
define("ember-cpm/macros/product",
  ["../utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var reduceComputedPropertyMacro = __dependency1__.reduceComputedPropertyMacro;

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

    __exports__["default"] = reduceComputedPropertyMacro(
      function (prev, item) {
        return prev * item;
      }
    );
  });
define("ember-cpm/macros/promise",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    // TODO: Use RSVP?
    __exports__["default"] = function EmberCPM_promise(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) { return value; }
        return Ember.$.when(value);
      });
    }
  });
define("ember-cpm/macros/quotient",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var getVal = __dependency2__.getVal;
    var getDependentPropertyKeys = __dependency2__.getDependentPropertyKeys;

    __exports__["default"] = function EmberCPM_quotient() {
      var mainArguments = Array.prototype.slice.call(arguments), // all arguments
        propertyArguments = getDependentPropertyKeys(mainArguments);

      propertyArguments.push(function () {
        switch (mainArguments.length) {
          case 0:
            return 0;
          case 1:
            return getVal.call(this, mainArguments[0]);
          default:
            return getVal.call(this, mainArguments[0]) / getVal.call(this, mainArguments[1]);
        }
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });
define("ember-cpm/macros/safe-string",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var EmberHandlebars = Ember.Handlebars;

    __exports__["default"] = function EmberCPM_safeString(dependentKey) {

      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        return value && new EmberHandlebars.SafeString(value);
      });

    }
  });
define("ember-cpm/macros/sum-by",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var reduceComputed = Ember.reduceComputed;

    __exports__["default"] = function EmberCPM_sumBy(dependentKey, propertyKey) {
      return reduceComputed(dependentKey + '.@each.' + propertyKey, {
        initialValue: 0.0,

        addedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
          return accumulatedValue + parseFloat(get(item, propertyKey));
        },

        removedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
          return accumulatedValue - parseFloat(get(item, propertyKey));
        }
      });
    }
  });
define("ember-cpm/macros/sum",
  ["ember","../utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var reduceComputedPropertyMacro = __dependency2__.reduceComputedPropertyMacro;
    var getVal = __dependency2__.getVal;
    /**
    *  Returns the sum of some numeric properties and numeric constants
    *
    *  Example: 6 + 7 + 2 = 84
    *
    *  Usage:
    *    a: 6,
    *    b: 7,
    *    c: 2,
    *    d: [1, 2, 3, 4],
    *    e: sum('a', 'b', 'c'), // 15
    *    f: sum('a', 'b', 'c', 2) // 17,
    *    g: sum('d') // 10
    */

    function singleValueOrArraySum(val) {
      if (Ember.isArray(val)) {
        return val.reduce(function (prev, item) {return prev + item;});
      }
      else {
        return val;
      }
    }

    var EmberCPM_sum = reduceComputedPropertyMacro(
      function (prev, item) {
        return singleValueOrArraySum(prev) + singleValueOrArraySum(item);
      },
      {
        singleItemCallback: function (item) {
          return singleValueOrArraySum(getVal.call(this, item));
        }
      }
    );

    __exports__["default"] = EmberCPM_sum;
  });
define("ember-cpm/utils",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

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

    __exports__.retainByType = retainByType;
    function getDependentPropertyKeys(argumentArr) {
      return argumentArr.reduce(
        function (prev, item) {
          switch (Ember.typeOf(item)) {
            case 'string':
              prev.push(item);
              break;
            case 'number':
              break;
            default:
              if (item.constructor === Ember.Descriptor) {
                prev.pushObjects(item._dependentKeys);
              }
              break;
          }
          return prev;
        },
        []
      );
    }

    __exports__.getDependentPropertyKeys = getDependentPropertyKeys;/**
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
        return val.altKey ? this.get(val.altKey) : val.func.apply(this);
      } else {
        return val;
      }
    }

    __exports__.getVal = getVal;/**
     * Return a computed property macro
     * @param {[type]} reducingFunction [description]
     */
    function reduceComputedPropertyMacro(reducingFunction, options) {
      var opts = options || {};
      var singleItemCallback = opts.singleItemCallback || function (item) {return getVal.call(this,item);};

      return function () {
        var mainArguments = Array.prototype.slice.call(arguments); // all arguments
        var propertyArguments = getDependentPropertyKeys(mainArguments);

        propertyArguments.push(function () {
          var self = this;
          switch (mainArguments.length) {

            case 0:   // Handle zero-argument case
              return 0;

            case 1:   // Handle one-argument case
              return singleItemCallback.call(this, mainArguments[0]);

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

    __exports__.reduceComputedPropertyMacro = reduceComputedPropertyMacro;
  });