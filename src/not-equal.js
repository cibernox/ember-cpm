import {get, computed} from 'ember';

export default function EmberCPM_notEqual(dependentKey, targetValue) {
  return computed(dependentKey, function(){
    return get(this, dependentKey) !== targetValue;
  });
}