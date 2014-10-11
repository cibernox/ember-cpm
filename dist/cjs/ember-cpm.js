"use strict";
var Ember = require("ember")["default"] || require("ember");
var among = require("./macros/among")["default"] || require("./macros/among");
var encodeURIComponent = require("./macros/encode-uri-component")["default"] || require("./macros/encode-uri-component");
var encodeURI = require("./macros/encode-uri")["default"] || require("./macros/encode-uri");
var firstPresent = require("./macros/first-present")["default"] || require("./macros/first-present");
var fmt = require("./macros/fmt")["default"] || require("./macros/fmt");
var htmlEscape = require("./macros/html-escape")["default"] || require("./macros/html-escape");
var ifNull = require("./macros/if-null")["default"] || require("./macros/if-null");
var notAmong = require("./macros/not-among")["default"] || require("./macros/not-among");
var notEqual = require("./macros/not-equal")["default"] || require("./macros/not-equal");
var notMatch = require("./macros/not-match")["default"] || require("./macros/not-match");
var promise = require("./macros/promise")["default"] || require("./macros/promise");
var safeString = require("./macros/safe-string")["default"] || require("./macros/safe-string");
var join = require("./macros/join")["default"] || require("./macros/join");
var sumBy = require("./macros/sum-by")["default"] || require("./macros/sum-by");
var sum = require("./macros/sum")["default"] || require("./macros/sum");
var concat = require("./macros/concat")["default"] || require("./macros/concat");
var conditional = require("./macros/conditional")["default"] || require("./macros/conditional");
var product = require("./macros/product")["default"] || require("./macros/product");
var quotient = require("./macros/quotient")["default"] || require("./macros/quotient");
var difference = require("./macros/difference")["default"] || require("./macros/difference");

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

exports.VERSION = VERSION;
exports.Macros = Macros;
exports.install = install;

exports["default"] = {
  VERSION: VERSION,
  Macros: Macros,
  install: install
};