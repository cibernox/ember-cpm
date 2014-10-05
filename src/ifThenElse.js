import Ember from 'ember';
/**
 * If-then-else computed property
 *
 * Usage:
 *
 *      // A simple true/false check on a property
 *      var MyType = Ember.Object.extend({
 *          a: true,
 *          b: EmberCPM.Macros.ifThenElse('a', null, null, 'yes', 'no')
 *      });
 *
 *      // Comparing two properties
 *      var MyType = Ember.Object.extend({
 *          a: true,
 *          b: false,
 *          // make sure to bind this to 'a' and 'b', since it only binds to 'a' by default
 *          c: EmberCPM.Macros.ifThenElse('a', '===', 'b', 'yes', 'no').property('a', 'b')
 *      });
 *
 *      Supported operations
 *          ==, !=, ===, !==, >=, <=, <, >, &&, ||
 *
 */

export default function EmberCPM_ifThenElse(prop1, comparator, prop2, thenValue, elseValue) {

	return Ember.computed(prop1, function () {

		var val1 = this.get(prop1),
			comparisonResult = val1;

		if (prop2 !== null) {

			var isProp2AProperty = Ember.typeOf(prop2) !== 'string' ? false : Ember.typeOf(Ember.get(this, prop2)) !==
				'undefined',
				val2 = isProp2AProperty ? Ember.get(this, prop2) : prop2;

			switch (comparator) {
				/*jshint eqeqeq:false*/
			case '==':
				comparisonResult = val1 == val2;
				break;
			case '!=':
				comparisonResult = val1 != val2;
				break;
				/*jshint eqeqeq:true*/
			case '===':
				comparisonResult = val1 === val2;
				break;
			case '!==':
				comparisonResult = val1 !== val2;
				break;
			case '>=':
				comparisonResult = val1 >= val2;
				break;
			case '>':
				comparisonResult = val1 > val2;
				break;
			case '<=':
				comparisonResult = val1 <= val2;
				break;
			case '<':
				comparisonResult = val1 < val2;
				break;
			case '&&':
				comparisonResult = val1 && val2;
				break;
			case '||':
				comparisonResult = val1 || val2;
				break;
			default:
				Ember.assert('EmberCPM.Macros.ifThenElse - Unknown operator: %@'.fmt(comparator));
				break;
			}
		}
		return comparisonResult ? thenValue : elseValue;
	});
}
