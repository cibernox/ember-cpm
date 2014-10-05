"use strict";
var Ember = require("ember")["default"] || require("ember");
/**
*  Returns the product of some numeric properties and numeric constants
*
*  Example: 6 * 7 * 2 = 84
*
*  Usage:
*    a: 6,
*    b: 7,
*    c: 2,
*    d: product('a', 'b', 'c'), // 84
*    e: product('a', 'b', 'c', 2) // 168
*/


exports["default"] = function EmberCPM_product () {
	var mainArguments = Array.prototype.slice.call(arguments), // all arguments
		propertyArguments = mainArguments.reject( // dependent properties
			function (x) {
				return Ember.typeOf(x) !== 'string';
			}
		);

	propertyArguments.push(function () {

		if (Ember.isEmpty(mainArguments)) {
			return null;
		}

		var prod = 1;
		mainArguments.forEach(function (arg) {
			// handle either constants or numeric properties.
			// Assumption: all non-string arguments to the macro are numeric constants
			prod *= Ember.typeOf(arg) === 'string' ? this.get(arg) : arg;
		}.bind(this));

		return prod;
	});
	return Ember.computed.apply(this, propertyArguments);
}