import Ember from 'ember';
/**
 * If-then-else computed property
 *
 * Usage:
 *
 *      // A simple true/false check on a property
 *      var MyType = Ember.Object.extend({
 *          a: true,
 *          b: EmberCPM.Macros.ifThenElse('a', 'yes', 'no')
 *      });
 *
 *      // Composable computed properties
 *      var lt = Ember.computed.lt; // "less than"
 *      var MyType = Ember.Object.extend({
 *          a: 15,
 *          b: EmberCPM.Macros.ifThenElse(lt('a', 57), 'yes', 'no')
 *      });
 */

export default function EmberCPM_ifThenElse(condition, valIfTrue, valIfFalse) {
	var isConditionComputed = Ember.Descriptor === condition.constructor,
		propertyArguments = isConditionComputed ? condition._dependentKeys.slice(0) : [condition];

	propertyArguments.push(function (key, value, oldValue) {
		var conditionEvaluation = isConditionComputed ? condition.func.apply(this, arguments) : this.get(condition);

		return conditionEvaluation ? valIfTrue : valIfFalse;
	});

	return Ember.computed.apply(this, propertyArguments);
}
