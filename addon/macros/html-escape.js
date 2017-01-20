import Ember from 'ember';
import { resolveKeys } from '../utils';

var EmberHandlebars = Ember.Handlebars;
var EmberString = Ember.String;

/**
  Returns an Handlebars.SafeString with escaped text.

  Example

  ```javascript
  var obj = Ember.Object.extend({
    escaped: htmlEscape('value')
  }).create({value: '<em>Hi</em>'});

  obj.get('escaped'); // '&lt;em&gt;Hi&lt;/em&gt;'
  ```

  @method htmlScape
  @for macros
  @param {String} Dependent key with the string to scape.
  @return {Ember.Handlebars.SafeString} The escaped string.
*/
export default resolveKeys(value => {
  if (value == null) {
    return value;
  }

  var escapedExpression = EmberHandlebars.Utils.escapeExpression(value);
  return new EmberString.htmlSafe(escapedExpression);
});
