import Ember from 'ember';
import {getVal, getDependentPropertyKeys} from '../utils';

var computed = Ember.computed;
var a_slice = Array.prototype.slice;

/**
  Joins the strings in the given property keys.

  Example

  ```javascript
  var picard = Ember.Object.extend({
    firstName: 'Jean-Luc',
    lastName:  'Picard',
    fullName:  join('firstName', 'lastName', ' ')
  }).create();

  picard.get('fullName'); // 'Jean-Luc Picard'
  ```

  @method join
  @for macros
  @param *arguments The last argument is the separator string.
    The rest are the dependent keys with the strings to join, string literals or other
    computed property macros
  @return {String}  The joined string.
*/
export default function EmberCPM_join() {
  var mainArguments = a_slice.call(arguments);
  var componentsToJoin = mainArguments.slice(0, -1);
  var propertyArguments = getDependentPropertyKeys(componentsToJoin);

  propertyArguments.push(function () {
    var separator = mainArguments[mainArguments.length - 1];
    var self = this;
    return componentsToJoin.map(function (x) {
      return getVal.call(self, x);
    }).join(separator);
  });
  return computed.apply(this, propertyArguments);
}
