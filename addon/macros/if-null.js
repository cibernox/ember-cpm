import Ember from 'ember';
import {getVal, getDependentPropertyKeys} from '../utils';

var get = Ember.get;
var computed = Ember.computed;

/**
  Returns the value in the given dependent key, or if is null, the provided default value.

  Example

  ```javascript
  var obj = Ember.Object.extend({
    username: ifNull('name', 'Anonymous')
  }).create();

  obj.get('username'); // 'Anonymous'
  ```

  @method ifNull
  @for macros
  @param {String} dependentKey Name of the key with the possible null value.
  @param {Number|String|ComputedProperty} fallback Default value that the CP will return if the dependent key is null.
  @return
*/
export default function EmberCPM_ifNull(dependentKey, fallback) {
  var propertyArguments = getDependentPropertyKeys([dependentKey, fallback]);

  propertyArguments.push(function(/* key, value, oldValue */) {
    var value = get(this, dependentKey);

    return value == null ? getVal.call(this, fallback) : value;
  });

  return computed.apply(this, propertyArguments);
}
