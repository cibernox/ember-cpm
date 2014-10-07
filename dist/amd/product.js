define(
  ["ember","./utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var reduceComputedPropertyMacro = __dependency2__.reduceComputedPropertyMacro;

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

    __exports__["default"] = EmberCPM_product;
  });