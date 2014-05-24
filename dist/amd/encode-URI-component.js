define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var get = __dependency1__.get;
    var computed = __dependency1__.computed;

    __exports__["default"] = function EmberCPM_encodeURIComponent(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) return value;
        return encodeURIComponent(value);
      });
    }
  });