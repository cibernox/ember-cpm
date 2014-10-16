define(
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
              if (item && item.constructor === Ember.Descriptor) {
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

    __exports__.getVal = getVal;
    /**
     * Generate a "parse-like" computed property macro
     * @param {function} parseFunction single-argument function that
     *  transforms a raw value into a "parsed" value
     *
     * i.e.,
     *
     * parseComputedPropertyMacro(function (raw) {return parseFloat(raw);});
     */
    function parseComputedPropertyMacro (parseFunction) {
      return function parseMacro (dependantKey) {
        var args = [];
        if (dependantKey) {
          args.push(dependantKey);
        }
        args.push(function (propKey, val) {
          if (['undefined', 'null'].indexOf(Ember.typeOf(dependantKey)) !== -1) {
            return NaN; // same as parseInt, parseFloat return for null or undefined
          }
          if (arguments.length === 1) {
            //getter
            var rawValue = this.get(dependantKey);
            // Have to check again for null/undefined values, since the first check
            // could have just been non-null property keys
            if (['undefined', 'null'].indexOf(Ember.typeOf(rawValue)) !== -1) {
              return NaN;
            }
            else {
              // Handle some unexpected behavior for empty-string property keys
              // related:
              //  https://github.com/emberjs/ember.js/commit/b7e82f43c3475ee7b166a2570b061f08c6c6c0f3#diff-22c6caff03531b3e718e9a8d82180833R31
              if ('string' === typeof rawValue && rawValue.length === 0) {
                return NaN;
              }
              else {
                return parseFunction(rawValue);
              }
            }
          }
          else {
            //setter
            //respect the type of the dependent property
            switch (Ember.typeOf(this.get(dependantKey))) {
              case 'number':
                this.set(dependantKey, parseFunction(val));
                break;
              default:
                this.set(dependantKey, val.toString());
                break;
            }
            return val;
          }
        });
        return Ember.computed.apply(this, args);
      };
    }

    __exports__.parseComputedPropertyMacro = parseComputedPropertyMacro;/**
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