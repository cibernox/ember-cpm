import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

export default function EmberCPM_notEqual(dependentKey, targetValue) {
  return computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}
