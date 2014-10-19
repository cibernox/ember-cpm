import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;

/**
  Returns a promise that resolved to the value in the given dependent key

  Example

  ```javascript
    var obj = Ember.Object.extend({
      asPromise: promise('value')
    }).create({value: 'Kangaroo'});
    obj.get('asPromise').then(function(x){ console.log(x); }) // Logs 'Kangaroo'
  ```

  @method macros.promise
  @param {String} dependentKey The property key with the resolve value of the promise.
  @return {Promise} A promise
*/
export default function EmberCPM_promise(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);
    if (value == null) { return value; }
    // TODO: Use RSVP?
    return Ember.$.when(value);
  });
}
