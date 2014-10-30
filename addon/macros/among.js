import Ember from 'ember';
import {getVal, getDependentPropertyKeys} from '../utils';

var computed = Ember.computed;

/**
  Returns true the given value in is among the supplied options.

  Example

  ```javascript
  var Show = Ember.Object.extend({
    hasCartoonDog: among('pet.name', 'Odie', 'Snoopy')
  });

  var show = Show.create({ pet: { name: 'Garfield' } });

  show.get('hasCartoonDog'); // false
  show.set('pet.name', 'Snoopy');
  show.get('hasCartoonDog'); // true
  ```
  @method among
  @for macros
  @param {String|Number|ComputedProperty} dependentKey Dependent key which value must be among the given values.
  @param                                  *values      Values among which the dependentKey must be included.
  @return {Boolean} Returns true the value in the given dependent key is among the privided values.
*/
export default function EmberCPM_among() {
  var mainArguments = Array.prototype.slice.call(arguments);
  var propertyArguments = getDependentPropertyKeys(mainArguments);

  var toCompare = mainArguments[0];
  propertyArguments.push(function () {
    var value = getVal.call(this, toCompare);
    for (var i = 1; i < mainArguments.length; i++) {
      if (getVal.call(this, mainArguments[i]) === value) {
        return true;
      }
    }
    return false;
  });

  return computed.apply(this, propertyArguments).readOnly();
}
