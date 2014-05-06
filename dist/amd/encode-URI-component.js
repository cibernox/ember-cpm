define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;

    __exports__["default"] = function(dependentKey) {
      return Ember.computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) return value;
        return encodeURIComponent(value);
      });
    }
  });