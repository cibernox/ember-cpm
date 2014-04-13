## Ember-CPM

[![Build Status](https://travis-ci.org/jamesarosen/ember-cpm.png)](http://travis-ci.org/jamesarosen/ember-cpm)

Computed Property Macros for Ember

### Requirements

Ember. Versions between 0.9.8 and 1.1 should work fine.
(If you're running Ember 0.9.x and want the CP macros from Ember 1.0, the
[ember_09 branch](https://github.com/jamesarosen/ember-cpm/tree/ember_09)
has them.)

### Installation

Just add `index.js` to your page after Ember but before your app.

### Provided Macros

 * `among` -- returns `true` if the original value is among the given literals
   (testing using `===`)
 * `encodeURIComponent` -- calls `encodeURIComponent` on the original value
 * `encodeURI` -- calls `encodeURI` on the original value
 * `fmt` -- pass the original values into a format-string
 * `htmlEscape` -- escapes the original value with
   `Handlebars.Utils.escapeExpression` *and* wraps the result in a
   `Handlebars.SafeString` (since it's now safe)
 * `ifNull` -- fall back on a default value
 * `notAmong` -- inverse of `among`
 * `notEqual` -- inverse of the built-in `equal` macro
 * `notMatch` -- inverse of the built-in `match` macro
 * `promise` -- wraps the original value in an already-resolved promise
 * `safeString` -- wraps the original value in a `Handlebars.SafeString`
 * `join` -- joins the supplied values together with a provided sepatator
 * `sumBy` -- sums a property from an array of objects
 * `boundEqual` -- returns true if the values of both properties are equal

### Examples

```javascript
Person = Ember.Object.extend({

  name: null,

  handedness: null,

  greeting: null,

  handle: EmberCPM.Macros.ifNull('name', 'Anonymous'),

  greeting: EmberCPM.Macros.fmt('name', 'greeting', '%@ says, "%@!"'),

  canUseLeftHand: EmberCPM.Macros.among('handedness', 'left', 'ambidextrous'),

  notNamedJohn: EmberCPM.Macros.notMatch('name', /\bJohn\b/)

});
```
### `Ember.computed`

If you would prefer to use `Ember.computed.{macro}` instead of
`EmberCPM.Macros.{macro}` (for the sake of uniform access), simply call
`EmberCPM.install()` before your application code.
