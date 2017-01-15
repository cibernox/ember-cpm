import { resolveKeysUnsafe } from '../utils';

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
export default resolveKeysUnsafe((source, ...values) => {
  for (let i = 0; i < values.length; i++) {
    if (values[i] === source) {
      return true;
    }
  }
  return false;
});
