"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;

exports["default"] = function EmberCPM_notEqual(dependentKey, targetValue) {
  return Ember.computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}