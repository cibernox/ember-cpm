import {A, get, isBlank, isEmpty, computed} from 'ember';

var a_slice = Array.prototype.slice;

export default function EmberCPM_firstPresent() {
  var properties = a_slice.call(arguments);
  var computedArgs = a_slice.call(properties);
  var checker = isBlank || isEmpty; // isBlank was introduced in Ember 1.5

  computedArgs.push(function() {
    var that = this;
    var property = A(properties).find(function(key) {
      return ! checker(get(that, key));
    });

    if (property) { return get(that, property); }
  });

  return computed.apply(this, computedArgs);
}
