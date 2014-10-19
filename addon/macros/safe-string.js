import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;
var EmberHandlebars = Ember.Handlebars;

/**
  Casts the value of the given dependent key to a Handlebars.SafeString

  @method macros.safeString
  @param {String} Dependent key with the string to cast.
  @return {Ember.Handlebars.SafeString} The casted string.
*/
export default function EmberCPM_safeString(dependentKey) {

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value && new EmberHandlebars.SafeString(value);
  });

}
