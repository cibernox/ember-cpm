import {get, computed, Handlebars} from 'ember';

export default function EmberCPM_safeString(dependentKey) {

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new Handlebars.SafeString(value);
  });

}