define(
  ["exports"],
  function(__exports__) {
    "use strict";
    // TODO: Use RSVP?
    var get = Ember.get;

    __exports__["default"] = function(dependentKey) {
      return Ember.computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) { return value; }
        return $.when(value);
      });
    }
  });