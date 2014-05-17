"use strict";
var Ember = require("ember")["default"] || require("ember");

var get   = Ember.get,
  a_slice = Array.prototype.slice;

exports["default"] = function EmberCPM_sumBy(dependentKey, propertyKey) {
  return Ember.reduceComputed(dependentKey + '.@each.' + propertyKey, {
    initialValue: 0.0,

    addedItem: function(accumulatedValue, item, changeMeta, instanceMeta){
      return accumulatedValue + parseFloat(get(item, propertyKey));
    },

    removedItem: function(accumulatedValue, item, changeMeta, instanceMeta){
      return accumulatedValue - parseFloat(get(item, propertyKey));
    }
  });
}