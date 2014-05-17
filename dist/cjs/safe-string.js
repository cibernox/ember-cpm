"use strict";
var Ember = require("ember")["default"] || require("ember");

var get = Ember.get;

exports["default"] = function EmberCPM_safeString(dependentKey) {

  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new Ember.Handlebars.SafeString(value);
  });

}