import Ember from 'ember';

var get = Ember.get;

export default function(dependentKey, targetValue) {
  return Ember.computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}