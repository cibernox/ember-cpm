# Changelog

## 1.2.0 2014-10-10
Enhalcement: Use ember-cli as build tool, like other regular addons.

## 1.1.4 2014-10-09
Feature: Added `product` CP.
Feature: Added `conditional` CP.
Feature: Added `sum`, backwards compatible with ember's sum, but the ability of handle several arguments.
Feature: Added `difference` CP.

## v1.1.3, 2014-09-23
Feature: Ember-cpm works out of the box with ember-cli as an addon.

## v1.1.2, 2014-09-21
Bugfix: Change exports to make AMD build compatible with ember-cli.

## v1.1.1, 2014-08-10
Feature: Use testem as automates test tool.
Feature: Migrate to a build process based on broccoli.
Feature: Converted code to ES6 packages transpiled to global, AMD and CJS.
Feature: Add `firstPresent` macro.
Feature: Add `sumBy` macro.
Feature: Prepare library to be published via bower.

## v1.1.0, 2013-09-10

Feature: Add `join` macro

Feature: `fmt` macro accepts multiple properties; the `formatString` is still
the last argument, so this is 100% backwards-compatible with the
single-property version.

Register EmberCPM with `Ember.libraries` if available.

## v1.0.1, 2013-06-26

Bugfix: macros didn't work with nested properties, e.g.
`EmberCPM.Macros.ifNull('author.name')`

## v1.0.0, 2013-06-20

Initial version with the following macros:

 * `among`
 * `encodeURIComponent`
 * `encodeURI`
 * `fmt`
 * `htmlEscape`
 * `ifNull`
 * `notAmong`
 * `notEqual`
 * `notMatch`
 * `promise`
 * `safeString`
