import { resolveKeys } from '../utils';

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

  @method encodeURIComponent
  @for macros
  @param {String} dependentKey String with the dependent key which value will be encoded.
  @return {String} A sanitized string
*/
export default resolveKeys(value => {
  if (value == null) {
    return value;
  }
  return encodeURIComponent(value);
});
