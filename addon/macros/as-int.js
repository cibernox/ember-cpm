import {parseComputedPropertyMacro} from '../utils';

/**
  Converts the value in the given dependent key into an integer.

  Note that it returns NaN when the dependent key contains `null`, `undefined` or an invalid string.

  Example

  ```javascript
  var item = Ember.Object.extend({
    stringPrice: '123',
    price: asInt('stringPrice')
    invalid: asInt('abc')
  }).create();

  item.get('price');   // 123
  item.get('invalid'); // NaN
  ```

  @method asInt
  @for macros
  @param {Number|String|Boolean} value The value to cast. It can be a numbed, a numeric string or a property key.
  @return {Number} Returns casted integer.
*/
export default parseComputedPropertyMacro(function (raw) {
  return 'boolean' === typeof raw ? (raw ? 1 : 0) : parseInt(raw, 10);
});
