define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;

    var get   = Ember.get,
      a_slice = Array.prototype.slice;

    __exports__["default"] = function(dependentKey, propertyKey) {
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
  });