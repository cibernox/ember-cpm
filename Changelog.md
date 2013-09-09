# Changelog

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
