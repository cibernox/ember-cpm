import Ember from 'ember';

var computed = Ember.computed;

/**
 * <%= camelizedModuleName %>
 * description:
 */

export default function EmberCPM_<%= camelizedModuleName %> (/*dependantKeys*/) {
  return computed(function (/*key, newVal*/) {
    // if (arguments.length === 1) {
    //   //getter
    // }
    // else {
    //   //setter
    //   return newVal;
    // }
    return "hello world";
  });
}
