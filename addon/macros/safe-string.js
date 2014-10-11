import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;
var EmberHandlebars = Ember.Handlebars;

export default function EmberCPM_safeString(dependentKey) {

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new EmberHandlebars.SafeString(value);
  });

}
