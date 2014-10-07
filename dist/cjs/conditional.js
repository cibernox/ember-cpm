"use strict";
var Ember = require("ember")["default"] || require("ember");
/**
 * Conditional computed property
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
 *          b: EmberCPM.Macros.conditional(lt('a', 57), 'yes', 'no')
 *      });
 */

exports["default"] = function EmberCPM_conditional(condition, valIfTrue, valIfFalse) {
  var isConditionComputed = Ember.Descriptor === condition.constructor,
    propertyArguments = isConditionComputed ? condition._dependentKeys.slice(0) : [condition];

  propertyArguments.push(function (key, value, oldValue) {
    var conditionEvaluation = isConditionComputed ? condition.func.apply(this, arguments) : this.get(condition);

    return conditionEvaluation ? valIfTrue : valIfFalse;
  });

  return Ember.computed.apply(this, propertyArguments);
}