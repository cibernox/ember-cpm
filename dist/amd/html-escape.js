define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var get = __dependency1__.get;
    var computed = __dependency1__.computed;
    var Handlebars = __dependency1__.Handlebars;

    __exports__["default"] = function EmberCPM_htmlEscape(dependentKey) {
      return computed(dependentKey, function(){
        var value = get(this, dependentKey);

        if (value == null) return value;

        var escapedExpression = Handlebars.Utils.escapeExpression(value);
        return new Handlebars.SafeString(escapedExpression);
      });

    }
  });