import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;
var a_slice = Array.prototype.slice;

/**
  Joins the strings in the given property keys.

  Example

  ```javascript
  var picard = Ember.Object.extend({
    firstName: 'Jean-Luc',
    lastName:  'Picard',
    fullName:  join('firstName', 'lastName', ' ')
  }).create();

  picard.get('fullName'); // 'Jean-Luc Picard'
  ```

  @method macros.join
  @param *arguments The last argument is the separator string. The rest are the dependent keys with the strings to join.
  @return {String}  The joined string.
*/
export default function EmberCPM_join() {
  var separator  = a_slice.call(arguments, -1);
  var properties = a_slice.call(arguments, 0, -1);

  var cp = computed(function(){
    var that = this;
    return properties.map(function(key) {
      return get(that, key);
    }).join(separator);
  });

  return cp.property.apply(cp, properties);
}
