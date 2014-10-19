import Ember from 'ember';

var get = Ember.get;
var computed = Ember.computed;
var EmberString = Ember.String;

var a_slice = Array.prototype.slice;

/**
  Generates a string interpolating the given values.

  Example

  ```javascript
  var teacher = Ember.Object.extend({
    name: 'Miguel',
    course: 'Javacript',
    catchPhrase: fmt('name', 'course', 'Hi, my name is %@ and I will teach you %@')
  }).create();


  teacher.get('catchPhrase'); // 'Hi, my name is Miguel and I will teach you Javascript'
  ```

  @method macros.fmt
  @param *arguments The last element is the string to format. The rest of the arguments are the dependent key with the values to interpolate.
                    The string interpolations follows the same rules in `Ember.String.fmt`
  @return The formatted string.
*/
export default function EmberCPM_fmt() {
  var formatString = '' + a_slice.call(arguments, -1),
      properties   = a_slice.call(arguments, 0, -1),
      propertyArguments = a_slice.call(arguments, 0 , -1);

  propertyArguments.push(function(){
    var values = [], i, value;

    for (i = 0; i < properties.length; ++i) {
      value = get(this, properties[i]);
      if (value === undefined) { return undefined; }
      if (value === null)      { return null; }
      values.push(value);
    }

    return EmberString.fmt(formatString, values);
  });

  return computed.apply(this, propertyArguments);

}
