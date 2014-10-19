import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

/**
  Returns the value in the given dependent key, or if is null, the provided default value.

  Example

  ```javascript
  var obj = Ember.Object.extend({
    username: ifNull('name', 'Anonymous')
  }).create();

  obj.get('username'); // 'Anonymous'
  ```

  @method macros.ifNull
  @param {String} dependentKey Name of the key with the possible null value.
  @param          defaultValue Value that the CP will return if the dependent key is null.
  @return
*/
export default function EmberCPM_ifNull(dependentKey, defaultValue) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    return value == null ? defaultValue : value;
  });
}
