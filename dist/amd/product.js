define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
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


    __exports__["default"] = function EmberCPM_product () {
      var mainArguments = Array.prototype.slice.call(arguments), // all arguments
        propertyArguments = mainArguments.reject( // dependent properties
          function (x) {
            return Ember.typeOf(x) !== 'string';
          }
        );

      propertyArguments.push(function () {

        if (Ember.isEmpty(mainArguments)) {
          return null;
        }

        var prod = 1;
        for (var i = 0; i < mainArguments.length; i += 1) {
          // handle either constants or numeric properties.
          // Assumption: all non-string arguments to the macro are numeric constants
          prod *= Ember.typeOf(mainArguments[i]) === 'string' ? this.get(mainArguments[i]) : mainArguments[i];
        }

        return prod;
      });
      return Ember.computed.apply(this, propertyArguments);
    }
  });