import Ember from 'ember';
import among from './macros/among';
import allEqual from './macros/all-equal';
import encodeURIComponent from './macros/encode-uri-component';
import encodeURI from './macros/encode-uri';
import firstPresent from './macros/first-present';
import fmt from './macros/fmt';
import htmlEscape from './macros/html-escape';
import ifNull from './macros/if-null';
import promise from './macros/promise';
import safeString from './macros/safe-string';
import join from './macros/join';
import sum from './macros/sum';
import concat from './macros/concat';
import conditional from './macros/conditional';
import product from './macros/product';
import quotient from './macros/quotient';
import difference from './macros/difference';
import not from './macros/not';
import asFloat from './macros/as-float';
import asInt from './macros/as-int';
import computedPromise from './macros/computed-promise';

var VERSION = '1.3.1';
var Macros = {
  not: not,
  among: among,
  allEqual: allEqual,
  encodeURIComponent: encodeURIComponent,
  encodeURI: encodeURI,
  firstPresent: firstPresent,
  fmt: fmt,
  htmlEscape: htmlEscape,
  ifNull: ifNull,
  promise: promise,
  safeString: safeString,
  join: join,
  sum: sum,
  difference: difference,
  concat: concat,
  conditional: conditional,
  asFloat: asFloat,
  asInt: asInt,
  quotient: quotient,
  product: product,
  computedPromise: computedPromise
};


if (Ember.libraries) {
  Ember.libraries.register('Ember-CPM', VERSION);
}

export {
  VERSION,
  Macros
};

export default {
  VERSION: VERSION,
  Macros: Macros
};
