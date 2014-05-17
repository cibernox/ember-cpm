define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    // TODO: Use RSVP?
    var get = Ember.get;

    __exports__["default"] = function EmberCPM_promise(dependentKey) {
      return Ember.computed(dependentKey, function(){
        var value = get(this, dependentKey);
        if (value == null) { return value; }
        return Ember.$.when(value);
      });
    }
  });