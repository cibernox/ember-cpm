import Ember from 'ember';

const { computed } = Ember;

/**
  Updates computed property when supplied callback (which must return a
  promise) is resolved.

  Example

  ```javascript
  data: promiseObject('dep', function(){
    return ajax('/data.json');
  })

  myObject.get('data') // => undefined

  // once resolved

  myObject.get('data') // => { foo: 'bar' };
  ```

  For example, if you have a template that renders `data` when the promise is
  resolved the template will be updated.

  @method computedPromise
  @for macros
  @param *dependentKeys
  @param callback
  @returns obj result of callback
*/
export default function(...args) {
  const fn = args.pop();

  if (typeof(fn) !== 'function') {
    throw new Error('You must supply a function as the last argument to this macro.');
  }

  const dependentKeys = args.slice();
  let pendingPromise = false;
  let result;

  return computed(...dependentKeys, function(key) {
    if (!pendingPromise) {
      const promise = fn.call(this);
      pendingPromise = true;

      Ember.RSVP.resolve(promise)
        .then((promiseResult) => {
          result = promiseResult;
          pendingPromise = false;
          this.notifyPropertyChange(key);
        });
      }

    return result;
  });
}
