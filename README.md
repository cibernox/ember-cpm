## Ember-CPM

[![Build Status](https://travis-ci.org/jamesarosen/ember-cpm.png)](http://travis-ci.org/jamesarosen/ember-cpm)

Computed Property Macros for Ember

### Requirements

Ember. Versions between 0.9.8 and 1.x should work fine.
(If you're running Ember 0.9.x and want the CP macros from Ember 1.0, the
[ember_09 branch](https://github.com/jamesarosen/ember-cpm/tree/ember_09)
has them.)

### Installation

If you are using [Ember CLI](https://github.com/stefanpenner/ember-cli), you can install ember-cpm as
an addon with `npm install ember-cpm --save-dev` and you will be able to import native ES modules from
within your app.

If not, just add `ember-cpm.js` to your page after Ember but before your app.

### Usage

In Ember CLI:

```js
// Import only one macros
import ifNull from "ember-cpm/macros/if-null";
// or alternatively import all macros
import EmberCPM from "ember-cpm/ember-cpm";
```

In any other scenario, include `ember-cpm.js` after ember but before your app, and a gobal will be available:

```js
Person = Ember.Object.extend({
  name: null,
  handle: EmberCPM.Macros.ifNull('name', 'Anonymous'),
});
```

### Contributing

You have to install Ember CLI to build this library. If you don't have it, visit [www.ember-cli.com/](http://www.ember-cli.com/) for further guidance about how to install it. 

After running `npm install` to get all the dependencies you can:

* Run `ember serve` and go to `localhost:4200/test` to run the tests in watch mode.
* Run `ember test` to run all tests once (requires phantomjs).
* Run `ember build` to build from source.

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
 * `notAmong` -- inverse of `among`
 * `notEqual` -- inverse of the built-in `equal` macro
 * `notMatch` -- inverse of the built-in `match` macro
 * `promise` -- wraps the original value in an already-resolved promise
 * `safeString` -- wraps the original value in a `Handlebars.SafeString`
 * `join` -- joins the supplied values together with a provided sepatator
 * `sumBy` -- sums a property from an array of objects
 * `difference` -- subtracts one numeric property or literal from another
 * `product` -- multiplies numeric properties and literals together
 * `sum` -- sums numeric properties and literals together
 * `conditional` -- returns values based on a boolean property (good replacement for ternary operator)

### Composable Computed Property Macros
`sum`, `difference` and `product` have support for *composable* computed property macros. This allows developers to mix other macros together without defining a bunch of otherwise-useless intermediate properties

```javascript
var product = EmberCPM.Macros.product,
   sum = EmberCPM.Macros.sum,
   mapBy = Ember.computed.mapBy,
   sumArray = Ember.computed.sum;

RestaurantCheck = Ember.Object.extend({
  items: [],
  taxPercent: 0.05,
  discount: 5.00,

  itemPrices: mapBy('items', 'price'),
  subTotal: sumArray('itemPrices'), // sums over array

  grandTotal: sum(
    product('taxPercent', 'subTotal'), // tax
    'subTotal', // main bill
    product('subTotal', 0.17), // tip your waiter
    product(-1, 'discount') // discount
  )
});

```

### `Ember.computed`

If you would prefer to use `Ember.computed.{macro}` instead of
`EmberCPM.Macros.{macro}` (for the sake of uniform access), simply call
`EmberCPM.install()` before your application code.

### Change Warning

Ember-CPM will likely see several breaking changes during Q2 and Q3 2014 as its
scope and structure change. We will, of course, bump the major version when making
breaking changes and make the period of instability as short as possible.
