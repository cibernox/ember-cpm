import Ember from 'ember';

var a_slice   = Array.prototype.slice;

/**
  Keeps n arrays concatenated.

  Example:
  ```js
  obj = Ember.Object.createWithMixins({
    itemsA: [],
    itemsB: [],
    itemsC: [],
    allItems: EmberCPM.Macros.concat('itemsA', 'itemsB', 'itemsC');
  });

  obj.get('itemsA').pushObjects(['a', 'b']);
  obj.get('allItems') //=> ['a', 'b']

  obj.get('itemsB').pushObjects(['c']);
  obj.get('allItems') //=> ['a', 'b', 'c']

  obj.get('itemsC').pushObjects(['d']);
  obj.get('allItems') //=> ['a', 'b', 'c', 'd']

  obj.get('itemsB').pushObjects(['e', 'f']);
  obj.get('allItems') //=> ['a', 'b', 'c', 'e', 'f', 'd']
  ```

  @method concat
  @for macros
  @param *arguments Dependent keys with the arrays to concat.
  @return {Array}
*/
export default function EmberCPM_concat() {
  const args = a_slice.call(arguments);
  const arrayReduce = function() {
    return args.reduce((prev, propertyKey) => {
      return prev.concat(this.get(propertyKey) || []);
    }, []);
  };

  return Ember.computed(...args.map(function (key) {
    return `${key}.[]`;
  }), arrayReduce);
}
