import { reduceKeysUnsafe } from '../utils';

/**
  Returns an the multiplication of its arguments.

  Example

  ```javascript
  var obj = Ember.Object.extend({
    a: 6,
    b: 7,
    c: 2,
    d: product('a', 'b', 'c'),      // 84
    e: product('a', 'b', 'c', 2)    // 168
  });
  ```

  @method product
  @for macros
  @param *arguments It can be numbers, property keys containing numbers or other computed properties.
  @return {Number} The product of all its arguments.
*/
export default reduceKeysUnsafe((prev, item) => prev * item);
