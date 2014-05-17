import Ember from 'ember';

var get = Ember.get;

export default function EmberCPM_encodeURIComponent(dependentKey) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) return value;
    return encodeURIComponent(value);
  });
}