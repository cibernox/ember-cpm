import { resolveKeysUnsafe } from '../utils';

/**
  Returns true if all the dependent values are equal.

  Example

  ```javascript
  var Cuboid = Ember.Object.extend({
    cube: allEqual('height', 'width', 'depth'),
    base6: allEqual('width', 'depth', 6),
    side12: allEqual(sum('width', 'depth'), 12),
  });

  var shape = Cuboid.create({
    height: 6,
    width: 6,
    depth: 6
  });

  shape.get('cube');    // true
  shape.get('base6');   // true
  shape.get('side12');  // true
  shape.set('width', 4);
  shape.get('cube');    // false
  ```

  @method allEqual
  @for macros
  @param *arguments Elements that must be equal. It may be a regular value, a property key or another computed property.
  @return {Boolean} Returns true if all elements are equal
*/
export default resolveKeysUnsafe((firstVal, ...values) => {
  for (let i = 0; i < values.length; i += 1) {
    if (values[i] !== firstVal) {
      return false;
    }
  }
  return true;
});
