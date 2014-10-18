import Ember from 'ember';
import {getVal, getDependentPropertyKeys} from '../utils';

/**
  Returns true if all the all its dependent values are equal between them.

  Example

  ```javascript
  var Cuboid = Ember.Object.extend({
    cube: allEqual('height', 'width', 'depth')
  });

  var shape = Cuboid.create({
    height: 6,
    width: 6,
    depth: 6
  });

  shape.get('cube'); // true
  shape.set('width', 4);
  shape.get('cube'); // false
  ```

  @method macros.allEqual
  @param *arguments Values or dependent keys that must be equal. It can be a values or the key of a
                    property in the object of the computed property.
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
