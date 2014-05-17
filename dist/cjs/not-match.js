"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;

exports["default"] = function EmberCPM_notMatch(dependentKey, regexp) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return typeof value === 'string' ? !value.match(regexp) : true;
  });
}