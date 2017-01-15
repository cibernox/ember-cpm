import { resolveKeysUnsafe } from '../utils';

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
export default resolveKeysUnsafe(value => !value);
