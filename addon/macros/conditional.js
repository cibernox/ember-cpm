import Ember from 'ember';
import {getVal, getDependentPropertyKeys} from '../utils';

/**
   Conditional computed property

   Example:
   ```js
    var Person = Ember.Object.extend({
      canDrink: EmberCPM.Macros.conditional(Ember.computed.gte('age', 21), 'yes', 'no')
    });
    var boy = Person.create({age: 15});

    boy.get('canDrink') // 'no'
  ```
  @method conditions
  @for macros
  @param {String|ComputedProperty} Dependent key or CP with truthy/falsy value.
  @param                           valIfTrue Value if the first params is truthy
  @param                           valIfTrue Value if the first params is falsy
  @return the second or third parameter.
 */
export default function EmberCPM_conditional(condition, positive, negative) {
  var mainArguments = Array.prototype.slice.call(arguments); // all arguments
  var propertyArgumentsNew = getDependentPropertyKeys(mainArguments);
  console.log('propertyArgumentsNew', propertyArgumentsNew);

  var isConditionComputed = Ember.Descriptor === condition.constructor;

  //TODO: GJ: args
  var propertyArguments = isConditionComputed ? condition._dependentKeys.slice(0) : [condition];
  console.log('propertyArguments', propertyArguments);

propertyArguments.push(function(/* key, value, oldValue */) {
    console.log('here', positive, negative);

    var conditionEvaluation = isConditionComputed ? condition.func.apply(this, arguments) : this.get(condition);
    return conditionEvaluation ? getVal.call(this, positive) : getVal.call(this, negative);
  });

  return Ember.computed.apply(this, propertyArguments);
}
