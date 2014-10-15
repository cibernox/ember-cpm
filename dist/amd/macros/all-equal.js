define(
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