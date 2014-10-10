define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;

    __exports__["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
      return computed(dependentKey, function(){
        return get(this, dependentKey) !== targetValue;
      });
    }
  });