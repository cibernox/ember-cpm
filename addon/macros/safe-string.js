import Ember from 'ember';
import { resolveKeys } from '../utils';

var EmberString = Ember.String;

/**
  Casts the value of the given dependent key to a Handlebars.SafeString

  @method safeString
  @for macros
  @param {String} Dependent key with the string to cast.
  @return {Ember.Handlebars.SafeString} The casted string.
*/
export default resolveKeys(value => {
  return value && new EmberString.htmlSafe(value);
});
