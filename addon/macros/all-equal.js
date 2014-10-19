import Ember from 'ember';
import {getVal, getDependentPropertyKeys} from '../utils';

/**
  Returns true if all the all its dependent values are equal between them.

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

  @method macros.allEqual
  @param *arguments Elements that must be equal. It be regular value, a property key or another computed property.
  @return {Boolean} Returns true it all elements are equal
*/
export default function EmberCPM_allEqual() {
  var mainArguments = Array.prototype.slice.call(arguments); // all arguments
  var propertyArguments = getDependentPropertyKeys(mainArguments);

  propertyArguments.push(function () {
    switch (mainArguments.length) {
      case 0:
      case 1:
        return true;
      default:
        var firstVal = getVal.call(this, mainArguments[0]);
        for (var i = 1; i < mainArguments.length; i += 1) {
          if (getVal.call(this, mainArguments[i]) !== firstVal) {
            return false;
          }
        }
        return true;
    }
  });

  return Ember.computed.apply(this, propertyArguments);
}
