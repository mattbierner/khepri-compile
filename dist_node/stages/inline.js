/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/inline.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bes")["object"],
    Error = require("akh")["error"],
    inline = require("../inline/inline"),
    optimize, setProperty = __o["setProperty"];
(optimize = (function(input) {
    var tree = input["tree"],
        data = input["data"],
        out = inline.optimize(tree, data);
    return Error.of(setProperty(setProperty(input, "tree", out.tree), "data", out.data));
}));
(module.exports = optimize);