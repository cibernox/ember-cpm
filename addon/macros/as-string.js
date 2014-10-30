/**
  EmberCPM Macros

  @module macros
  @requires ember, utils
*/

import {parseComputedPropertyMacro} from '../utils';

/**
  Provide a writable property that's a string representation
  of some dependant

  Example

  ````javascript
  var Square = Ember.Object.extend({
    sideLength: 4,
    sideLengthAsString: asString('sideLength')
  });
  ````
  ````handlebars
  {{!--
    Bind this input to the writable string binding
    so that the numeric 'sideLength' property will remain
    an integer. (HTML inputs always have string values)
   --}}
  {{input type="text" value='sideLengthAsString'}}
  ````

  @method macros.asString
  @for macros
  @param {Number|String|Boolean} key dependant property key
  @return {String} string representation of another property
*/

export default parseComputedPropertyMacro(function EmberCPM_asString (raw) {
  return '' + raw;
});
