import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;
var EmberHandlebars = Ember.Handlebars;

export default function EmberCPM_htmlEscape(dependentKey) {
  return computed(dependentKey, function(){
    var value = get(this, dependentKey);

    if (value == null) {
      return value;
    }

    var escapedExpression = EmberHandlebars.Utils.escapeExpression(value);
    return new EmberHandlebars.SafeString(escapedExpression);
  });

}
