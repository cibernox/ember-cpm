"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;

exports["default"] = function(dependentKey) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) return value;
    return encodeURI(value);
  });
}