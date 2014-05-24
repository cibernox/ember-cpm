"use strict";
var get = require("ember").get;
var computed = require("ember").computed;
var Handlebars = require("ember").Handlebars;

exports["default"] = function EmberCPM_htmlEscape(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    if (value == null) return value;

    var escapedExpression = Handlebars.Utils.escapeExpression(value);
    return new Handlebars.SafeString(escapedExpression);
  });

}