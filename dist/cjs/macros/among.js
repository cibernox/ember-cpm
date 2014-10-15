"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;
var computed = Ember.computed;

exports["default"] = function EmberCPM_among(dependentKey) {
  var properties = Array.prototype.slice.call(arguments, 1);

  return computed(dependentKey, function(){
    var value = get(this, dependentKey),
      i;

    for (i = 0; i < properties.length; ++i) {
      if (properties[i] === value) {
        return true;
      }
    }
    return false;
  });
}