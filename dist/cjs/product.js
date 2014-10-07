"use strict";
var Ember = require("ember")["default"] || require("ember");
var reduceComputedPropertyMacro = require("./utils").reduceComputedPropertyMacro;

/**
*  Returns the product of some numeric properties and numeric constants
*
*  Example: 6 * 7 * 2 = 84
*
*  Usage:
*    a: 6,
*    b: 7,
*    c: 2,
*    d: product('a', 'b', 'c'), // 84
*    e: product('a', 'b', 'c', 2) // 168
*/

var EmberCPM_product = reduceComputedPropertyMacro(
  function (prev, item) {
    return prev * item;
  }
);

exports["default"] = EmberCPM_product;