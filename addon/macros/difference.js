import { resolveKeysUnsafe } from '../utils';

/**
  Returns the difference between the given elements

  Example

  ```javascript
  var item = Ember.Object.extend({
    benefit: difference('sellPrice', 'buyPrice')
  }).create({sellPrice: 30, buyPrice: 22});

  item.get('benefit'); // 8
  ```

  @method difference
  @for macros
  @param {Number|String|ComputedProperty} firstNumber First operand
  @param {Number|String|ComputedProperty} lastNumber  Last operand
  @return {Number} Difference between the operands.
*/
export default resolveKeysUnsafe((firstNumber, lastNumber) => {
  return (firstNumber || 0) - (lastNumber || 0);
});
