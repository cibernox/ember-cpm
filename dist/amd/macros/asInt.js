define(
  ["../utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var parseComputedPropertyMacro = __dependency1__.parseComputedPropertyMacro;

    __exports__["default"] = parseComputedPropertyMacro(function (raw) {
      return parseInt(raw, 10);
    });
  });