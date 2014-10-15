import Ember from 'ember';

var get = Ember.get;
var reduceComputed = Ember.reduceComputed;

/**
 * DEPRECATED - 10/14/2014
 * Rather than use sumBy, developers should use composed computed property macros
 *
 * OLD WAY
 * {
 *   list: [{id: 1, val: 5.0}, {id: 2, val: 2.0}],
 *   listValSum: sumBy('list', 'val')
 * }
 *
 * NEW WAY
 * {
 *   list: [{id: 1, val: 5.0}, {id: 2, val: 2.0}],
 *   listValSum: sum(mapBy('list', 'val'))
 * }
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
