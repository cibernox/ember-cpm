import computed from 'ember-macro-helpers/computed';

/**
  Returns a hash of its arguments

  Example

  ```javascript
  var obj = Ember.Object.extend({
    a: 6,
    b: 7,
    thing: hash('a', 'b') // {a: 6, b: 7}
  });
  ```

  @method hash
  @for macros
  @param *arguments Property keys to include
  @return {Object} Mapping of key names to values
*/
export default function(...props) {
  return computed(...props, (...values) => {
    let result = {};
    props.forEach((prop, i) => {
      result[prop] = values[i];
    });
    return result;
  });
}
