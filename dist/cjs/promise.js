"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;
var computed = Ember.computed;
var $ = Ember.$;

// TODO: Use RSVP?
exports["default"] = function EmberCPM_promise(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return $.when(value);
  });
}