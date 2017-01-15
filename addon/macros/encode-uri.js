import { resolveKeys } from '../utils';

/**
  Encodes the given string to make it a valid url

  Example

  ```javascript
  var item = Ember.Object.extend({
    url: 'http://example.com/one and two'
    safeUrl: encodeURIComponent('url')
  }).create();

  item.get('safeUrl'); // 'http://example.com/one%20and%20two'
  ```

  @method encodeURI
  @for macros
  @param {String} dependentKey String with the dependent key which value will be encoded.
  @return {String} A encoded url
*/
export default resolveKeys(value => {
  if (value == null) {
    return value;
  }
  return encodeURI(value);
});
