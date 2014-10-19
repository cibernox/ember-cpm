import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

/**
  Opposite or `Ember.computed.equal`

  @method macros.notEqual
  @param {String} dependentKey Dependent key which value must not be equal to the given value.
  @param {String} targetValue  Value to compare against.
  @return {Boolean} Returns true if the value in dependentKey is different to the targetValue
*/
export default function EmberCPM_notEqual(dependentKey, targetValue) {
  return computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}
