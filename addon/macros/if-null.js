import computed from 'ember-macro-helpers/computed';

/**
  Returns the value in the given dependent key, or if is null, the provided default value.

  Example

  ```javascript
  var obj = Ember.Object.extend({
    username: ifNull('name', 'Anonymous')
  }).create();

  obj.get('username'); // 'Anonymous'
  ```

  @method ifNull
  @for macros
  @param {String} dependentKey Name of the key with the possible null value.
  @param {Number|String|ComputedProperty} fallback Default value that the CP will return if the dependent key is null.
  @return
*/
export default function() {
  return computed(...arguments, (value, fallback) => {
    return value != null ? value : fallback || arguments[1];
  });
}
