/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/reachable.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bes")["object"],
    Error = require("akh")["error"],
    removeUnreachable = require("../reachable/reachable"),
    optimize, setProperty = __o["setProperty"];
(optimize = (function(options, input) {
    var tree = input["tree"];
    return Error.of(setProperty(input, "tree", removeUnreachable(tree, (options && options.prune))));
}));
(module.exports = optimize);