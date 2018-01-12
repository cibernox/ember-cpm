/**
  EmberCPM Utils

  @module utils
  @requires ember
*/

import { typeOf } from '@ember/utils';
import { A, isArray } from '@ember/array';
import { inspect } from '@ember/debug';
import computed from 'ember-macro-helpers/computed';
import computedUnsafe from 'ember-macro-helpers/computed-unsafe';

/**
 Builds a computed property macro

 @method resolveKeysUnsafe
 @for utils
 @param {Function} callback passed resolved values to calculate the property
 */
export function resolveKeys(callback) {
  return function() {
    return computed(...arguments, callback);
  };
}

/**
 Builds a computed property macro (unsafe version)

 @method resolveKeysUnsafe
 @for utils
 @param {Function} callback passed resolved values to calculate the property
 */
export function resolveKeysUnsafe(callback) {
  return function() {
    return computedUnsafe(...arguments, callback);
  };
}

/**
 Builds a computed property macro based on array reducing

 @method reduceKeysUnsafe
 @for utils
 @param {Function} callback passed resolved values to calculate the property
 */
export function reduceKeysUnsafe(callback) {
  return resolveKeysUnsafe((...values) => {
    values = values.reduce((values, valueOrArray) => {
      return values.concat(valueOrArray);
    }, []);
    if (values.length === 0) {
      return 0;
    }
    return values.reduce(callback);
  });
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
  return function(dependantKey) {
    if ('undefined' === typeof dependantKey) {
      throw new TypeError('No argument');
    }
    if (dependantKey === null) {
      throw new TypeError('Null argument');
    }

    return computedUnsafe(dependantKey, {
      get(rawValue) {
        // Check for null/undefined values
        if (A(['undefined', 'null']).indexOf(typeOf(rawValue)) !== -1) {
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
      set(val, rawValue) {
        //setter
        //respect the type of the dependent property
        switch (typeOf(rawValue)) {
          case 'number':
            this.set(dependantKey, parseFloat(val));
            break;
          case 'boolean':
            switch(typeOf(val)) {
              case 'string':
                this.set(dependantKey, val.toLowerCase() === 'true');
                break;
              case 'number':
                this.set(dependantKey, val !== 0);
                break;
              default:
                var msg = fmt('Can\'t transform value of type %@ into a boolean', typeOf(val));
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
  };
}

export function fmt(str, formats) {
  var cachedFormats = formats;

  if (!isArray(cachedFormats) || arguments.length > 2) {
    cachedFormats = new Array(arguments.length - 1);

    for (var i = 1, l = arguments.length; i < l; i++) {
      cachedFormats[i - 1] = arguments[i];
    }
  }

  // first, replace any ORDERED replacements.
  var idx  = 0; // the current index for non-numerical replacements
  return str.replace(/%@([0-9]+)?/g, function(s, argIndex) {
    argIndex = (argIndex) ? parseInt(argIndex, 10) - 1 : idx++;
    s = cachedFormats[argIndex];
    return (s === null) ? '(null)' : (s === undefined) ? '' : inspect(s);
  });
}
