import Ember from 'ember';
import among from './among';
import encodeURIComponent from './encode-uri-component';
import encodeURI from './encode-uri';
import firstPresent from './first-present';
import fmt from './fmt';
import htmlEscape from './html-escape';
import ifNull from './if-null';
import notAmong from './not-among';
import notEqual from './not-equal';
import notMatch from './not-match';
import promise from './promise';
import safeString from './safe-string';
import join from './join';
import sumBy from './sum-by';
import sum from './sum';
import concat from './concat';
import conditional from './conditional';
import product from './product';
import _utils from './utils';

function reverseMerge(dest, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
      dest[key] = source[key];
    }
  }
}

var VERSION = '1.1.3';
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
  concat: concat,
  conditional: conditional,
  product: product
};
var install = function(){ reverseMerge(Ember.computed, Macros); };


if (Ember.libraries)
  Ember.libraries.register('Ember-CPM', VERSION);

export {
  VERSION,
  Macros,
  install,
  _utils
};

export default {
  VERSION: VERSION,
  Macros: Macros,
  install: install
};
