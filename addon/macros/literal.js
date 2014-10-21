import Ember from 'ember';

var computed = Ember.computed;

/**
 * Returns a literal value. Useful for disambiguating
 * between string literals and property keys
 *
 * Example:
 *
 * ```javascript
 * var MyType = Ember.Object.extend({
 *   firstName: 'Mike',
 *   firstNameLiteral: literal('firstName') // 'firstName'
 * });
 * ```
 *
 * This is particularly useful in the context of composable computed property macros
 *
 * ```javascript
 * var l = EmberCPM.Macros.literal;
 *
 * var MyOtherType = Ember.Object.extend({
 *   isServerReady: false,
 *   userInput: 'ready',
 *   ready: and('isUserReady', 'isServerReady'),
 *   isUserReady: among(
 *     'userInput'          //property key
 *     l('ready'),          // literal (this would otherwise be ambiguious without using "literal")
 *     l('good'),           // literal
 *     l('fine'),           // literal
 *     l('satisfactory'),   // literal
 *     l('rad')             // literal
 *   )
 *
 * })
 * ```
 */

export default function EmberCPM_literal (val) {
  Ember.runInDebug(function () {
    var valType = Ember.typeOf(val);
    Ember.assert(
      Ember.String.fmt("Illegal Argument: %@ (%@) is a non-literal value", val, valType),
      Ember.A(['string']).indexOf(valType) !== -1
    );
  });
  return computed(function () {
      return val;
  }).readOnly();

}
