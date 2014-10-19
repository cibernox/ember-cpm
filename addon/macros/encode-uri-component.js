import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

/**
  Encodes the given value to make it URL safe

  Example

  ```javascript
  var item = Ember.Object.extend({
    url: 'http://example.com/one and two'
    safeUrl: encodeURIComponent('url')
  }).create();

  item.get('safeUrl'); // 'http%3A%2F%2Fexample.com%2Fone%20and%20two'
  ```

  @method macros.encodeURIComponent
  @param {String} dependentKey String with the dependent key which value will be encoded.
  @return {String} A sanitized string
*/
export default function EmberCPM_encodeURIComponent(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) {
      return value;
    }
    return encodeURIComponent(value);
  });
}
