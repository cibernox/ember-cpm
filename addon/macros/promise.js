import RSVP from 'rsvp';
import { resolveKeys } from '../utils';

const { resolve } = RSVP;

/**
  Returns a promise that resolved to the value in the given dependent key

  Example

  ```javascript
    var obj = Ember.Object.extend({
      asPromise: promise('value')
    }).create({value: 'Kangaroo'});
    obj.get('asPromise').then(function(x){ console.log(x); }) // Logs 'Kangaroo'
  ```

  @method promise
  @for macros
  @param {String} dependentKey The property key with the resolve value of the promise.
  @return {Promise} A promise
*/
export default resolveKeys(value => {
  if (value == null) { return value; }
  return resolve(value);
});
