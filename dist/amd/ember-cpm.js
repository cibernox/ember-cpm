define(
  ["ember","./among","./encode-uri-component","./encode-uri","./fmt","./html-escape","./if-null","./not-among","./not-equal","./not-match","./promise","./safe-string","./join","./sum-by","./concat","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __exports__) {
    "use strict";
    var libraries = __dependency1__.libraries;
    var among = __dependency2__["default"] || __dependency2__;
    var encodeURIComponent = __dependency3__["default"] || __dependency3__;
    var encodeURI = __dependency4__["default"] || __dependency4__;
    var fmt = __dependency5__["default"] || __dependency5__;
    var htmlEscape = __dependency6__["default"] || __dependency6__;
    var ifNull = __dependency7__["default"] || __dependency7__;
    var notAmong = __dependency8__["default"] || __dependency8__;
    var notEqual = __dependency9__["default"] || __dependency9__;
    var notMatch = __dependency10__["default"] || __dependency10__;
    var promise = __dependency11__["default"] || __dependency11__;
    var safeString = __dependency12__["default"] || __dependency12__;
    var join = __dependency13__["default"] || __dependency13__;
    var sumBy = __dependency14__["default"] || __dependency14__;
    var concat = __dependency15__["default"] || __dependency15__;

    function reverseMerge(dest, source) {
      for (var key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }

    var VERSION = '1.0.1',
      Macros = {
        among: among,
        encodeURIComponent: encodeURIComponent,
        encodeURI: encodeURI,
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
        concat: concat,
      },
      install = function(){ reverseMerge(Ember.computed, Macros); };


    if (libraries)
      libraries.register('Ember-CPM', VERSION);

    __exports__.VERSION = VERSION;
    __exports__.Macros = Macros;
    __exports__.install = install;
  });