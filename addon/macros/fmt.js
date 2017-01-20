import { fmt } from 'ember-string';
import computed from 'ember-macro-helpers/computed';

/**
  Generates a string interpolating the given values.

  Example

  ```javascript
  var teacher = Ember.Object.extend({
    name: 'Miguel',
    course: 'Javacript',
    catchPhrase: fmt('name', 'course', 'Hi, my name is %@ and I will teach you %@')
  }).create();


  teacher.get('catchPhrase'); // 'Hi, my name is Miguel and I will teach you Javascript'
  ```

  @method fmt
  @for macros
  @param *arguments The last element is the string to format. The rest of the arguments are the dependent key with the values to interpolate.
                    The string interpolations follows the same rules in `Ember.String.fmt`
  @return The formatted string.
*/
export default function(...args) {
  let formatString = args.pop();

  return computed(...args, (...values) => {
    for (let i in values) {
      let value = values[i];
      if (value === undefined) { return undefined; }
      if (value === null)      { return null; }
    }

    return fmt(formatString, values);
  });
}
