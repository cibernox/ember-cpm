import Ember from 'ember';
import {getVal, getDependentPropertyKeys} from '../utils';

export default function EmberCPM_quotient() {
  var mainArguments = Array.prototype.slice.call(arguments), // all arguments
    propertyArguments = getDependentPropertyKeys(mainArguments);

  propertyArguments.push(function () {
    switch (mainArguments.length) {
      case 0:
        return 0;
      case 1:
        return getVal.call(this, mainArguments[0]);
      default:
        return getVal.call(this, mainArguments[0]) / getVal.call(this, mainArguments[1]);
    }
  });

  return Ember.computed.apply(this, propertyArguments);
}
