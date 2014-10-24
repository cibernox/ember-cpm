import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

/**
  Opposite or `Ember.computed.match`

  @method macros.notMatch
  @param {String} dependentKey Dependent key which value must not be match to the given regexp.
  @param {String} regexp       Regular expression to compare with.
  @return {Boolean} Returns true if the value in dependentKey does not match the given regexp.

  @deprecated - 10/18/2014
  Rather than use notMatch, developers should use composed computed property macros

  Example:
    myProp: not(Ember.computed.match('email', /^.+@.+\\..+$/))
*/
export default function EmberCPM_notMatch(dependentKey, regexp) {
  Ember.deprecate("[DEPRECATED: EmberCPM/notMatch] Please use a combination of EmberCPM.Macros.not and Ember.computed.match \nEmberCPM.Macros.not(Ember.computed.match('email', /^.+@.+\\..+$/))");

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return typeof value === 'string' ? !value.match(regexp) : true;
  });
}
