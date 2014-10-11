import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

export default function EmberCPM_notMatch(dependentKey, regexp) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return typeof value === 'string' ? !value.match(regexp) : true;
  });
}
