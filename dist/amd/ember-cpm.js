define(
  ["ember","./macros/among","./macros/encode-uri-component","./macros/encode-uri","./macros/first-present","./macros/fmt","./macros/html-escape","./macros/if-null","./macros/not-among","./macros/not-equal","./macros/not-match","./macros/promise","./macros/safe-string","./macros/join","./macros/sum-by","./macros/sum","./macros/concat","./macros/conditional","./macros/product","./macros/quotient","./macros/difference","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var among = __dependency2__["default"] || __dependency2__;
    var encodeURIComponent = __dependency3__["default"] || __dependency3__;
    var encodeURI = __dependency4__["default"] || __dependency4__;
    var firstPresent = __dependency5__["default"] || __dependency5__;
    var fmt = __dependency6__["default"] || __dependency6__;
    var htmlEscape = __dependency7__["default"] || __dependency7__;
    var ifNull = __dependency8__["default"] || __dependency8__;
    var notAmong = __dependency9__["default"] || __dependency9__;
    var notEqual = __dependency10__["default"] || __dependency10__;
    var notMatch = __dependency11__["default"] || __dependency11__;
    var promise = __dependency12__["default"] || __dependency12__;
    var safeString = __dependency13__["default"] || __dependency13__;
    var join = __dependency14__["default"] || __dependency14__;
    var sumBy = __dependency15__["default"] || __dependency15__;
    var sum = __dependency16__["default"] || __dependency16__;
    var concat = __dependency17__["default"] || __dependency17__;
    var conditional = __dependency18__["default"] || __dependency18__;
    var product = __dependency19__["default"] || __dependency19__;
    var quotient = __dependency20__["default"] || __dependency20__;
    var difference = __dependency21__["default"] || __dependency21__;

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

    __exports__.VERSION = VERSION;
    __exports__.Macros = Macros;
    __exports__.install = install;

    __exports__["default"] = {
      VERSION: VERSION,
      Macros: Macros,
      install: install
    };
  });