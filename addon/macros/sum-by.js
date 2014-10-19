import Ember from 'ember';

var get = Ember.get;
var reduceComputed = Ember.reduceComputed;

/**
  Sums the mapped values on the key in the elements of the given array.

  This property is deprecated. Use a composition of `sum` and `mapBy`, like: `listValSum: sum(mapBy('list', 'val'))`

  @method macros.sumBy
  @param {String} dependentKey The key with the array.
  @param {String} propertyKey  The key of the items we want to sum by.
  @return {Number} The product of all its arguments.
  @deprecated
*/
export default function EmberCPM_sumBy(dependentKey, propertyKey) {
  Ember.deprecate("[DEPRECATED: EmberCPM/sumBy] Please use a combination of EmberCPM.Macros.sum and EmberCPM.Macros.mapBy \nEmberCPM.Macros.sum(EmberCPM.Macros.mapBy('list', 'value'))");

  return reduceComputed(dependentKey + '.@each.' + propertyKey, {
    initialValue: 0.0,

    addedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
      return accumulatedValue + parseFloat(get(item, propertyKey));
    },

    removedItem: function(accumulatedValue, item /*, changeMeta, instanceMeta */){
      return accumulatedValue - parseFloat(get(item, propertyKey));
    }
  });
}
