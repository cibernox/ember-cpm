import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

export default function EmberCPM_ifNull(dependentKey, defaultValue) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value == null ? defaultValue : value;
  });
}
