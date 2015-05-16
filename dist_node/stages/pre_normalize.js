/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/pre_normalize.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    __o = require("bes")["object"],
    pre_normalize = require("../normalize/pre_normalize"),
    normalize, setProperty = __o["setProperty"];
(normalize = (function(options, input) {
    var tree = input["tree"];
    return Error.of(setProperty(input, "tree", pre_normalize.normalize(tree)));
}));
(module.exports = normalize);