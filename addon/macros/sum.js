import { reduceKeysUnsafe } from '../utils';

/**
  Returns an the sum of its arguments.

  Example

  ```javascript
  var obj = Ember.Object.extend({
    a: 6,
    b: 7,
    c: 2,
    d: [1, 2, 3, 4],
    e: sum('a', 'b', 'c'),    // 15
    f: sum('a', 'b', 'c', 2)  // 17,
    g: sum('d')               // 10
  });
  ```

  @method sum
  @for macros
  @param *arguments It can be numbers, property keys containing numbers or other computed properties.
  @return {Number} The sum of all its arguments.
*/
export default reduceKeysUnsafe((prev, item) => prev + item);
