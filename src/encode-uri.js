import {get, computed} from 'ember';

export default function EmberCPM_encodeURI(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) return value;
    return encodeURI(value);
  });
}