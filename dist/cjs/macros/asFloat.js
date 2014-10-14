"use strict";
var parseComputedPropertyMacro = require("../utils").parseComputedPropertyMacro;

exports["default"] = parseComputedPropertyMacro(function (raw) {
  return parseFloat(raw);
});