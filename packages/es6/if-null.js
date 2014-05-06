import Ember from 'ember';

var get = Ember.get;

export default function(dependentKey, defaultValue) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value == null ? defaultValue : value;
  });
}