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
export function retainByType(arr, type) {
  return arr.reject(
    function (item) {
      return Ember.typeOf(item) !== type;
    }
  );
}

/**
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
export function getVal(val) {
  if (Ember.typeOf(val) === 'string') {
    return Ember.get(this, val) || val;
  } else if (Ember.typeOf(val) === 'object' && Ember.Descriptor === val.constructor) {
    return val.func.apply(this);
  } else {
    return val;
  }
}

/**
 * Return a computed property macro
 * @param {[type]} reducingFunction [description]
 */
export function reduceComputedPropertyMacro(reducingFunction) {
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
