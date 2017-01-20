import Ember from 'ember';
import RSVP from 'rsvp';
import computedUnsafe from 'ember-macro-helpers/computed-unsafe';

const { ObjectProxy, PromiseProxyMixin } = Ember;
const { Promise } = RSVP;

const PromiseProxy = ObjectProxy.extend(PromiseProxyMixin);

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

  return computedUnsafe(...args, function() {
    const promise = fn.call(this);
    if (!(promise instanceof Promise)) {
      return promise;
    }

    return PromiseProxy.create({
      promise
    });
  });
}
