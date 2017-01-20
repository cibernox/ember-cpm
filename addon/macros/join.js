import computed from 'ember-macro-helpers/computed';

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
export default function(...args) {
  var separator = args.pop();

  return computed(...args, (...values) => {
    return values.join(separator);
  });
}
