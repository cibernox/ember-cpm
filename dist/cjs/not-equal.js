"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
  return computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}