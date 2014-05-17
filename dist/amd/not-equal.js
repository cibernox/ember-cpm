define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;

    __exports__["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
      return Ember.computed(dependentKey, function(){
        return get(this, dependentKey) !== targetValue;
      });
    }
  });