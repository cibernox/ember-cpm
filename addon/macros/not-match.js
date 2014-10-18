import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

/**
 * DEPRECATED - 10/18/2014
 * Rather than use notMatch, developers should use composed computed property macros
 *
 * Example:
 *
 * 	myProp: not(Ember.computed.match('email', /^.+@.+\\..+$/))
 */

export default function EmberCPM_notMatch(dependentKey, regexp) {
  Ember.deprecate("[DEPRECATED: EmberCPM/notMatch] Please use a combination of EmberCPM.Macros.not and Ember.computed.match \nEmberCPM.Macros.not(Ember.computed.match('email', /^.+@.+\\..+$/))");

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return typeof value === 'string' ? !value.match(regexp) : true;
  });
}
