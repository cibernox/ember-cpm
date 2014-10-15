define(
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