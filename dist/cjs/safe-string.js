"use strict";
var get = require("ember").get;
var computed = require("ember").computed;
var Handlebars = require("ember").Handlebars;

exports["default"] = function EmberCPM_safeString(dependentKey) {

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new Handlebars.SafeString(value);
  });

}