import Ember from 'ember';

var get = Ember.get;

export default function EmberCPM_ifNull(dependentKey, defaultValue) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value == null ? defaultValue : value;
  });
}