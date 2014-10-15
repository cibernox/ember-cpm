define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get = Ember.get;
    var computed = Ember.computed;
    var EmberHandlebars = Ember.Handlebars;

    __exports__["default"] = function EmberCPM_htmlEscape(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        if (value == null) {
          return value;
        }

        var escapedExpression = EmberHandlebars.Utils.escapeExpression(value);
        return new EmberHandlebars.SafeString(escapedExpression);
      });

    }
  });