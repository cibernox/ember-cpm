define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
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

    __exports__["default"] = function EmberCPM_conditional(condition, valIfTrue, valIfFalse) {
      var isConditionComputed = Ember.Descriptor === condition.constructor;
      var propertyArguments = isConditionComputed ? condition._dependentKeys.slice(0) : [condition];

      propertyArguments.push(function(/* key, value, oldValue */) {
        var conditionEvaluation = isConditionComputed ? condition.func.apply(this, arguments) : this.get(condition);

        return conditionEvaluation ? valIfTrue : valIfFalse;
      });

      return Ember.computed.apply(this, propertyArguments);
    }
  });