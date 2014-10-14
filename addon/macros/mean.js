import Ember from 'ember';
import { getVal, getDependentPropertyKeys } from '../utils';

/**
 * Calculate the arithmatic mean of some numeric properties,
 * numeric literals, and/or arrays of numeric properties and literals
 */
export default function EmberCPM_mean () {
  var mainArguments = Array.prototype.slice.call(arguments);
  var propertyArguments = getDependentPropertyKeys(mainArguments);

  propertyArguments.push(function () {
    var sum = 0;
    var count = 0;
    var self = this;

    mainArguments.forEach(function (item) {
      var v = getVal.call(self, item);
      switch (Ember.typeOf(v)) {
        case 'number': // Number case
          count += 1;
          sum += v;
          break;
        case 'array': // Array case
          sum += v.reduce(function (p, i) { return p + i;}, 0); // sum of array
          count += v.length;
          break;
        case 'undefined':
        case 'null':
          break;
        default:
          throw 'Unsupported value type: %@'.fmt(Ember.typeOf(v));
      }
    });
    return count > 0 ? sum/count : 0;
  });

  return Ember.computed.apply(this, propertyArguments);
}
