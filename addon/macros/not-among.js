import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

/**
  Opposite of `EmberCPM.macros.among`

  @method macros.notAmong
  @param {String} dependentKey Dependent key which value must not be among the given values.
  @param          *values      Values among which the dependentKey must not be included.
  @return {Boolean} Returns false the value in the given dependent key is among the privided values.

  @deprecated - 10/18/2014
  Rather than use notAmong, developers should use composed computed property macros

  Example:
    myProp: not(among('val', 'a', 'b', 'c'))
*/
export default function EmberCPM_notAmong(dependentKey) {
  Ember.deprecate("[DEPRECATED: EmberCPM/notAmong] Please use a combination of EmberCPM.Macros.not and EmberCPM.Macros.among \nEmberCPM.Macros.not(EmberCPM.Macros.among('val', 'a', 'b'))");

  var properties = Array.prototype.slice.call(arguments, 1);

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    for (var i = 0, l = properties.length; i < l; ++i) {
      if (properties[i] === value) {
        return false;
      }
    }

    return true;
  });
}
