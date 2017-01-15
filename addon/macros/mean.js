import { typeOf } from 'ember-utils';
import { resolveKeysUnsafe } from '../utils';

/**
  Calculate the arithmetic mean of some numeric properties, numeric literals,
  and/or arrays of numeric properties and literals.

  If any of its elements is an array it calculates the mean with its elements.

  Example

  ```javascript
  var obj = Ember.Object.extend({
    lowestPrice: 8,
    highestPrice: 10,
    ages: [10, 20, 30],
    avgPrice: mean('lowestPrice', 'highestPrice'), // 9
    avgAge: mean('ages'),                          // 20
    avgCustom: mean(4, 10)                         // 7
  });
  ```

  @method mean
  @for macros
  @param *arguments It can be a number, an array of numbers, a property key pointing to any of those, or another computed property.
  @return {Number}  The arithmetical mean of the given values.
 */
export default resolveKeysUnsafe((...values) => {
  var sum = 0;
  var count = 0;

  values.forEach(v => {
    let t = typeOf(v);
    switch (t) {
      case 'number': // Number case
        count += 1;
        sum += v;
        break;
      case 'array': // Array case
        sum += v.reduce((p, i) => p + i, 0); // sum of array
        count += v.length;
        break;
      case 'undefined':
      case 'null':
        break;
      default:
        var msg = `Unsupported value type: ${t}`;
        throw new TypeError(msg);
    }
  });
  return count > 0 ? sum/count : 0;
});
