/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/reachable.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    Error = require("akh")["error"],
    reachable = require("../reachable"),
    optimize;
(optimize = (function(input) {
    var tree = input["tree"],
        data = input["data"],
        out = reachable.optimize(tree, data);
    return Error.of(setProperty(input, "tree", out.tree));
}));
(module.exports = optimize);