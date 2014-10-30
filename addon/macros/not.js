import Ember from 'ember';
import {getDependentPropertyKeys, getVal} from '../utils';

var computed = Ember.computed;

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
 * @method not
 * @for macros
 * @param  {String|Number|ComputedProperty} property to invert
 * @return {Boolean} Returns false if @param is evalated to something truthy, otherwise returns false
 */

export default function EmberCPM_not (arg) {
  var propertyArguments = getDependentPropertyKeys([arg]);
  Ember.assert('Illegal Argument: ' + arg, 'undefined' !== typeof arg && null !== arg);
  propertyArguments.push(function (key, val) {
    if (arguments.length < 2) {
      //getter
      return 'undefined' !== typeof arg ? !getVal.call(this, arg) : null;
    }
    else {
      //setter
      Ember.assert('EmberCPM.macros.not is not writable if passed inline computed property macros as arguments', Ember.typeOf(arg) === 'string');
      this.set(arg, !val);
      return val;
    }
  });

  return computed.apply(this, propertyArguments);
}
