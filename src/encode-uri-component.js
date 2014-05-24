import {get, computed} from 'ember';

export default function EmberCPM_encodeURIComponent(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) return value;
    return encodeURIComponent(value);
  });
}