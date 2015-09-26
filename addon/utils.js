/**
  EmberCPM Utils

  @module utils
  @requires ember
*/

import Ember from "ember";


/**
 Check to see if a given object is an Ember.Descriptor

 The technique for checking this condition is different
 pre-1.11 and post-1.11
 */
export function isDescriptor(prop) {
  return Ember.typeOf(prop) === 'object' && (prop.constructor === Ember.Descriptor || // Ember < 1.11
     prop.isDescriptor); // Ember >= 1.11.0
}

/**
 Retain items in an array based on type

 Example:

 ```js
 var x = ['a', 'b', 123, {hello: 'world'}];

 retainByType(x, 'string'); // ['a', 'b']
 retainByType(x, 'number'); // [123]
 retainByType(x, 'object'); // [{hello: 'world'}]
 ```

 @method retainByType
 @for utils
 @param {Array}  arr  array to iterate over
 @param {String} type string representation of type

 */
export function retainByType(arr, type) {
  return arr.reject(
    function (item) {
      return Ember.typeOf(item) !== type;
    }
  );
}

export function getDependentPropertyKeys(argumentArr) {
  return argumentArr.reduce(
    function (prev, item) {
      switch (Ember.typeOf(item)) {
        case 'string':
          var containsSpaces = item.indexOf(' ') !== -1;

          if(!containsSpaces) {
            prev.push(item);
          }
          break;
        case 'boolean':
        case 'number':
          break;
        default:
          if (item && isDescriptor(item) && item._dependentKeys) {
            prev.pushObjects(item._dependentKeys);
          }
          break;
      }
      return prev;
    },
    Ember.A()
  );
}

/**
 Evaluate a value, which could either be a property key or a literal
 if the value is a string, the object that the computed property is installed
 on will be checked for a property of the same name. If one is found, it will
 be evaluated, and the result will be returned. Otherwise the string value its
 self will be returned

 All non-string values pass straight through, and are returned unaltered

 @method getVal
 @param val value to evaluate
 */
export function getVal(val) {
  if (Ember.typeOf(val) === 'string') {
    var propVal = Ember.get(this, val);
    return  'undefined' === typeof propVal ? val : propVal;
  } else if (isDescriptor(val)) {
    let funcName = val.func ?
      'func' : // Ember < 1.11
      '_getter'; // Ember >= 1.11
    return val.altKey ? this.get(val.altKey) : val[funcName].apply(this);
  } else {
    return val;
  }
}


/**
 Generate a "parse-like" computed property macro

 Example:
 ```js
 parseComputedPropertyMacro(function (raw) {return parseFloat(raw);});
 ```

 @method parseComputedPropertyMacro
 @param {function} parseFunction single-argument function that transforms a raw value into a "parsed" value
 */
export function parseComputedPropertyMacro (parseFunction) {
  return function parseMacro(dependantKey) {
    var args = [];
    if ('undefined' === typeof dependantKey) {
      throw new TypeError('No argument');
    }
    if (dependantKey === null) {
      throw new TypeError('Null argument');
    }
    args.push(dependantKey);
    args.push({
      get() {
        var rawValue = this.get(dependantKey);

        // Check for null/undefined values
        if (Ember.A(['undefined', 'null']).indexOf(Ember.typeOf(rawValue)) !== -1) {
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
      },
      set(_, val) {
        //setter
        //respect the type of the dependent property
        switch (Ember.typeOf(this.get(dependantKey))) {
          case 'number':
            this.set(dependantKey, parseFloat(val));
            break;
          case 'boolean':
            switch(Ember.typeOf(val)) {
              case 'string':
                this.set(dependantKey, val.toLowerCase() === 'true');
                break;
              case 'number':
                this.set(dependantKey, val !== 0);
                break;
              default:
                var msg = Ember.String.fmt('Can\'t transform value of type %@ into a boolean', Ember.typeOf(val));
                throw new TypeError(msg);
            }
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

/**
 Return a computed property macro

 @method reduceComputedPropertyMacro
 @param {Function} reducingFunction
 @param {Object} options
 */
export function reduceComputedPropertyMacro(reducingFunction, options) {
  var opts = options || {};
  var singleItemCallback = opts.singleItemCallback || function (item) {return getVal.call(this,item);};

  return function () {
    var mainArguments = Array.prototype.slice.call(arguments); // all arguments
    Ember.assert('Error: At least one argument is required', mainArguments.length > 0);

    var propertyArguments = getDependentPropertyKeys(mainArguments);

    propertyArguments.push(function () {
      var self = this;
      switch (mainArguments.length) {
        // case 0:   // We already handle the zero-argument case above
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
