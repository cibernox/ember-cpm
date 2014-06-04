import {get, isEmpty, computed} from 'ember';

var a_slice = Array.prototype.slice;

export default function EmberCPM_firstOf() {
  var properties = a_slice.call(arguments);
  var computedArgs = a_slice.call(properties);

  computedArgs.push(function() {
    var that = this;
    var property = properties.find(function(key) {
      return ! isEmpty(get(that, key));
    });

    if (property) { return get(that, property); }
  });

  return computed.apply(this, computedArgs);
}
