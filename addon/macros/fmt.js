import Ember from 'ember';
import {getVal, getDependentPropertyKeys} from '../utils';

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

  @method fmt
  @for macros
  @param *arguments The last element is the string to format. The rest of the arguments are the dependent key with the values to interpolate.
                    The string interpolations follows the same rules in `Ember.String.fmt`
  @return The formatted string.
*/
export default function EmberCPM_fmt() {
  var mainArguments = a_slice.call(arguments);
  var propertyArguments = getDependentPropertyKeys(mainArguments)
    // Don't regard a format string literal as a dependant property key
    .reject(function (val) {
      return val.indexOf('%@') !== -1;
    });

  propertyArguments.push(function(){
    var formatString = getVal.call(this, mainArguments[mainArguments.length - 1]);

    var values = [];
    var undefinedValueFound = false;
    var nullValueFound = false;

    for (var i = 0; i < mainArguments.length - 1; i++) {
      var value = getVal.call(this, mainArguments[i], false);
      if (value === undefined) { undefinedValueFound = true; break; }
      if (value === null)      { nullValueFound = true; }
      values.push(value);
    }

    return undefinedValueFound ? undefined : (nullValueFound ? null : EmberString.fmt(formatString, values));
  });

  return computed.apply(this, propertyArguments);

}
