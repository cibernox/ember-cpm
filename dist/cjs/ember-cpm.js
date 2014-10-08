"use strict";
var Ember = require("ember")["default"] || require("ember");
var among = require("./among")["default"] || require("./among");
var encodeURIComponent = require("./encode-uri-component")["default"] || require("./encode-uri-component");
var encodeURI = require("./encode-uri")["default"] || require("./encode-uri");
var firstPresent = require("./first-present")["default"] || require("./first-present");
var fmt = require("./fmt")["default"] || require("./fmt");
var htmlEscape = require("./html-escape")["default"] || require("./html-escape");
var ifNull = require("./if-null")["default"] || require("./if-null");
var notAmong = require("./not-among")["default"] || require("./not-among");
var notEqual = require("./not-equal")["default"] || require("./not-equal");
var notMatch = require("./not-match")["default"] || require("./not-match");
var promise = require("./promise")["default"] || require("./promise");
var safeString = require("./safe-string")["default"] || require("./safe-string");
var join = require("./join")["default"] || require("./join");
var sumBy = require("./sum-by")["default"] || require("./sum-by");
var sum = require("./sum")["default"] || require("./sum");
var concat = require("./concat")["default"] || require("./concat");
var conditional = require("./conditional")["default"] || require("./conditional");
var product = require("./product")["default"] || require("./product");
var _utils = require("./utils")["default"] || require("./utils");

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

exports.VERSION = VERSION;
exports.Macros = Macros;
exports.install = install;
exports._utils = _utils;

exports["default"] = {
  VERSION: VERSION,
  Macros: Macros,
  install: install
};