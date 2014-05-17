import Ember from 'ember';

var get   = Ember.get,
  a_slice = Array.prototype.slice;

export default function EmberCPM_among(dependentKey) {
  var properties = a_slice.call(arguments, 1);

  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey),
      i;

    for (i = 0; i < properties.length; ++i) {
      if (properties[i] === value) return true;
    }
    return false;
  });
}