## Ember-CPM

[![Build Status](https://travis-ci.org/cibernox/ember-cpm.svg?branch=master)](https://travis-ci.org/cibernox/ember-cpm)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cpm.svg)](http://emberobserver.com/addons/ember-cpm)
[![Code Climate](https://codeclimate.com/github/cibernox/ember-cpm/badges/gpa.svg)](https://codeclimate.com/github/cibernox/ember-cpm)
[![Dependency Status](https://david-dm.org/cibernox/ember-cpm.svg)](https://david-dm.org/cibernox/ember-cpm)
[![devDependency Status](https://david-dm.org/cibernox/ember-cpm/dev-status.svg)](https://david-dm.org/cibernox/ember-cpm#info=devDependencies)
![Ember Version](https://embadge.io/v1/badge.svg?start=2.0.0)

Computed Property Macros for Ember

### Requirements

Version 2.0+ will only work with Ember 2.0+
Version 3.0+ is only tested in the last 2 LTS.

### Installation

Just run `ember install ember-cpm`


### Usage

Just import individual macros from `ember-cpm/macros/*` or all macros from `ember-cpm`.

```js
// Import only one macros
import ifNull from "ember-cpm/macros/if-null";
// or alternatively import all the namespace
import EmberCPM from "ember-cpm";
```


### Contributing

To generate a new computed property macros with ember-cli

* Run `ember g macro <dasherized-macro-name>`. This will generate a few files
  * `./addon/macros/dasherized-macro-name.js` (the macro)
  * `./addon/tests/dummy/unit/macro/dasherized-macro-name-test.js` (a test)*
  * and modify `./addon/ember-cpm.js`

```javascript
// import the macro
import camelizedMacroName from './macros/dasherized-macro-name.js'
...

var Macros = {
  ...
  // allows use via EmberCPM.Macros.camelizedMacroName
  camelizedMacroName: camelizedMacroName,
  ...
};

```
`ember d macro <dasherized-macro-name>` will do the reverse of these changes

### Provided Macros

 * `among` -- returns `true` if the original value is among the given literals
   (testing using `===`)
 * `encodeURIComponent` -- calls `encodeURIComponent` on the original value
 * `encodeURI` -- calls `encodeURI` on the original value
 * `firstPresent` -- returns the first property with a value, as determined by `Ember.isBlank`
 * `fmt` -- pass the original values into a format-string
 * `htmlEscape` -- escapes the original value with
   `Handlebars.Utils.escapeExpression` *and* wraps the result in a
   `Handlebars.SafeString` (since it's now safe)
 * `ifNull` -- fall back on a default value
 * `promise` -- wraps the original value in an already-resolved promise
 * `safeString` -- wraps the original value in a `Handlebars.SafeString`
 * `join` -- joins the supplied values together with a provided sepatator
 * `quotient` -- divides one numeric property or literal by another
 * `difference` -- subtracts one numeric property or literal from another
 * `product` -- multiplies numeric properties and literals together
 * `sum` -- sums numeric properties and literals together
 * `conditional` -- returns values based on a boolean property (good replacement for ternary operator)
 * `computedPromise` -- Updates computed property when supplied callback (which must return a promise) is resolved

### Composable Computed Property Macros

Unlike Ember's computed property macros, the macros in this addon are *composable*. That means
you define macros inside other macros without defining them in a separate key.

```javascript
import Ember from 'ember';
import EmberCPM from 'ember-cpm';

const { Macros: { sum, difference, product } } = EmberCPM;

export default Ember.Component.extend({
  num1: 45,
  num2: 3.5,
  num3: 13.4,
  num4: -2,

  total: sum(
    sum('num1', 'num2', 'num3'),
    difference('num3', 'num2'),
    product(difference('num2', 'num1'), 'num4')
  )
});
```
