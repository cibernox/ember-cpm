import Ember from 'ember';

var get = Ember.get;
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

  @method macros.among
  @param {String} dependentKey Dependent key which value must be among the given values.
  @param          *values      Values among which the dependentKey must be included.
  @return {Boolean} Returns true the value in the given dependent key is among the privided values.
*/
export default function EmberCPM_among(dependentKey) {
  var properties = Array.prototype.slice.call(arguments, 1);

  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    for (var i = 0, l = properties.length; i < l; ++i) {
      if (properties[i] === value) {
        return true;
      }
    }
    return false;
  });
}
