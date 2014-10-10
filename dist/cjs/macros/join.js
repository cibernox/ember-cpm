"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;
var computed = Ember.computed;
var a_slice = Array.prototype.slice;

exports["default"] = function EmberCPM_join() {
  var separator  = a_slice.call(arguments, -1),
      properties = a_slice.call(arguments, 0, -1);

  var cp = computed(function(){
    var that = this;
    return properties.map(function(key) {
      return get(that, key);
    }).join(separator);
  });

  return cp.property.apply(cp, properties);
}