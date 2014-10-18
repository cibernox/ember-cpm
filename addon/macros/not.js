import Ember from 'ember';
import {getDependentPropertyKeys, getVal} from '../utils';


/**
 * not - the boolean inverse of a property or computed property macro
 *
 * Example:
 *
 * ```javascript
 * var RocketLaunch = Ember.Object.extend({
 *  clearedForLaunch: allEqual('engineCheck', 'safetyCheck', 'missionCheck'),
 *  holdLaunch: not('clearedForLaunch')
 * });
 *
 * var rl = RocketLaunch.create({
 *   engineCheck: 'Ok',
 *   safetyCheck: 'Ok',
 *   missionCheck: 'HOLD'
 * });
 *
 * rl.get('holdLaunch'); // true
 *
 * rl.set('missionCheck', 'Ok');
 *
 * rl.get('holdLaunch'); // false
 * ```
 *
 * @param  {String|Number|ComputedProperty} property to invert
 * @return {Boolean} Returns false if @param is evalated to something truthy, otherwise returns false
 */

export default function EmberCPM_not () {
  var mainArguments = Array.prototype.slice.call(arguments); // all arguments
  var propertyArguments = getDependentPropertyKeys(mainArguments);

  propertyArguments.push(function () {
    return mainArguments.length > 0 ? !getVal.call(this, mainArguments[0]) : null;
  });

  return Ember.computed.apply(this, propertyArguments);
}
