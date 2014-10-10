import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

export default function EmberCPM_encodeURI(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) {
      return value;
    }
    return encodeURI(value);
  });
}
