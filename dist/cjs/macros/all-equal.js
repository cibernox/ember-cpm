"use strict";

var Ember = require("ember")["default"] || require("ember");
var getVal = require("../utils").getVal;
var getDependentPropertyKeys = require("../utils").getDependentPropertyKeys;

exports["default"] = function EmberCPM_allEqual() {
  var mainArguments = Array.prototype.slice.call(arguments); // all arguments
  var propertyArguments = getDependentPropertyKeys(mainArguments);

  propertyArguments.push(function () {
    switch (mainArguments.length) {
      case 0:
      case 1:
        return true;
      default:
        var firstVal = getVal.call(this, mainArguments[0]);
        for (var i = 1; i < mainArguments.length; i += 1) {
          if (getVal.call(this, mainArguments[i]) !== firstVal) {
            return false;
          }
        }
        return true;
    }
  });

  return Ember.computed.apply(this, propertyArguments);
}