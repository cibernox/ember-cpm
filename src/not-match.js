import Ember from 'ember';

var get = Ember.get;

export default function EmberCPM_notMatch(dependentKey, regexp) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return typeof value === 'string' ? !value.match(regexp) : true;
  });
}