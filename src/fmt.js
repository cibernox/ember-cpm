import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;
var EmberString = Ember.String;

var a_slice = Array.prototype.slice;

export default function EmberCPM_fmt() {
  var formatString = '' + a_slice.call(arguments, -1),
      properties   = a_slice.call(arguments, 0, -1);

  return computed(function(){
    var values = [], i, value;

    for (i = 0; i < properties.length; ++i) {
      value = get(this, properties[i]);
      if (value === undefined) { return undefined; }
      if (value === null)      { return null; }
      values.push(value);
    }

    return EmberString.fmt(formatString, values);
  });
}
