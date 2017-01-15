import { resolveKeysUnsafe } from '../utils';

/**
  Returns an the float quotient of divide the first argument by the second one.

  Example

  ```javascript
  var MyType = Ember.Object.extend({
    a: 6,
    b: 2,
    c: 5,
    d: quotient('a', 'b'),                    // 3
    e: quotient('a', 3),                      // 2
    f: quotient(Ember.computed.alias('c'), 2) // 2.5
  });
  ```

  @method quotient
  @for macros
  @param dividend Can be a number, a property key containing a number or another computed property.
  @return {Float} The quotient of the division.
*/
export default resolveKeysUnsafe((firstNumber, lastNumber) => {
  return (firstNumber || 0) / (lastNumber || 1);
});
