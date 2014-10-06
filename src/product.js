import Ember from 'ember';
import {reduceComputedPropertyMacro} from './utils';

/**
*  Returns the product of some numeric properties and numeric constants
*
*  Example: 6 * 7 * 2 = 84
*
*  Usage:
*    a: 6,
*    b: 7,
*    c: 2,
*    d: product('a', 'b', 'c'), // 84
*    e: product('a', 'b', 'c', 2) // 168
*/

var EmberCPM_product = reduceComputedPropertyMacro(
  function (prev, item) {
    return prev * item;
  }
);

export default EmberCPM_product;
