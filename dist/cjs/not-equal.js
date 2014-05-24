"use strict";
var get = require("ember").get;
var computed = require("ember").computed;

exports["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
  return computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}