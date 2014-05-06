import Ember from 'ember';

var get = Ember.get;

export default function(dependentKey) {
  return Ember.computed(dependentKey, function(){
    var value = get(this, dependentKey);

    if (value == null) return value;

    var escapedExpression = Ember.Handlebars.Utils.escapeExpression(value);
    return new Ember.Handlebars.SafeString(escapedExpression);
  });

}