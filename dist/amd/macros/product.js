define(
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