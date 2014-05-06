"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;

exports["default"] = function(dependentKey, defaultValue) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value == null ? defaultValue : value;
  });
}