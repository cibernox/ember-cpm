import Ember from 'ember';

var get = Ember.get;

export default function EmberCPM_safeString(dependentKey) {

  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new Ember.Handlebars.SafeString(value);
  });

}