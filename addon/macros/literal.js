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
 * })
 * ```
 *
 * @method literal
 * @for macros
 * @param {String} String value that you don't want to be interpreted as a propertyKey event.
 * @return {ComputedProperty}
 */
export { default } from 'ember-macro-helpers/literal';
