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

If not, you need to add `ember-cpm.js` manually to your project.

You can find the latest versions of ember-cpm in [the S3 bucket](http://ember-cpm-builds.s3-website-us-east-1.amazonaws.com/) in two flavours: globals or AMD.
Alternatively, you can also build from source. See [Contributing](https://github.com/jamesarosen/ember-cpm#contributing) for more info about how to build from source.
If you use the global build, an `EmberCPM` global should be available.

### Usage

In Ember CLI:

```js
// Import only one macros
import ifNull from "ember-cpm/macros/if-null";
// or alternatively import all the namespace
import EmberCPM from "ember-cpm";
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

* Run `ember serve` and go to `localhost:4200/test` to run the tests in watch mode. You can also see the documentation going into `/docs`.
* Run `ember test` to run all tests once (requires phantomjs).
* Run `ember build` to build from source.
* Run `ember yuidoc` to generate all the documentation inside the `/docs` folder

#### Generating new computed property macros with ember-cli

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
 * `sumBy` -- sums a property from an array of objects
 * `quotient` -- divides one numeric property or literal by another
 * `difference` -- subtracts one numeric property or literal from another
 * `product` -- multiplies numeric properties and literals together
 * `sum` -- sums numeric properties and literals together
 * `conditional` -- returns values based on a boolean property (good replacement for ternary operator)

### Composable Computed Property Macros
`conditional`, `sum`, `quotient` and `product` have support for *composable* computed property macros. This allows developers to mix other macros together without defining a bunch of otherwise-useless intermediate properties

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
