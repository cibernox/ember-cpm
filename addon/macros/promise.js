import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

// TODO: Use RSVP?
export default function EmberCPM_promise(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    return Ember.$.when(value);
  });
}
