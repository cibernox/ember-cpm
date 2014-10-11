import Ember from 'ember';
import among from './macros/among';
import encodeURIComponent from './macros/encode-uri-component';
import encodeURI from './macros/encode-uri';
import firstPresent from './macros/first-present';
import fmt from './macros/fmt';
import htmlEscape from './macros/html-escape';
import ifNull from './macros/if-null';
import notAmong from './macros/not-among';
import notEqual from './macros/not-equal';
import notMatch from './macros/not-match';
import promise from './macros/promise';
import safeString from './macros/safe-string';
import join from './macros/join';
import sumBy from './macros/sum-by';
import sum from './macros/sum';
import concat from './macros/concat';
import conditional from './macros/conditional';
import product from './macros/product';
import quotient from './macros/quotient';
import difference from './macros/difference';

function reverseMerge(dest, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
      dest[key] = source[key];
    }
  }
}

var VERSION = '1.2.0';
var Macros = {
  among: among,
  encodeURIComponent: encodeURIComponent,
  encodeURI: encodeURI,
  firstPresent: firstPresent,
  fmt: fmt,
  htmlEscape: htmlEscape,
  ifNull: ifNull,
  notAmong: notAmong,
  notEqual: notEqual,
  notMatch: notMatch,
  promise: promise,
  safeString: safeString,
  join: join,
  sumBy: sumBy,
  sum: sum,
  difference: difference,
  concat: concat,
  conditional: conditional,
  quotient: quotient,
  product: product
};
var install = function(){ reverseMerge(Ember.computed, Macros); };


if (Ember.libraries) {
  Ember.libraries.register('Ember-CPM', VERSION);
}

export {
  VERSION,
  Macros,
  install
};

export default {
  VERSION: VERSION,
  Macros: Macros,
  install: install
};
