"use strict";
var Ember = require("ember")["default"] || require("ember");

// TODO: Use RSVP?
var get = Ember.get;

exports["default"] = function EmberCPM_promise(dependentKey) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return Ember.$.when(value);
  });
}