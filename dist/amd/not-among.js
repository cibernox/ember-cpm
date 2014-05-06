define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get   = Ember.get,
      a_slice = Array.prototype.slice;

    __exports__["default"] = function(dependentKey) {
      var properties = a_slice.call(arguments, 1);

      return Ember.computed(dependentKey, function(){
        var value = get(this, dependentKey),
          i;

        for (var i = 0; i < properties.length; ++i) {
          if (properties[i] === value) return false;
        }

        return true;
      });
    }
  });