/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/post_normalize.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bes")["object"],
    Error = require("akh")["error"],
    post_normalize = require("../normalize/post_normalize"),
    optimize, setProperty = __o["setProperty"];
(optimize = (function(input) {
    var tree = input["tree"],
        data = input["data"];
    return Error.of(setProperty(input, "tree", post_normalize.normalize(tree, data)));
}));
(module.exports = optimize);