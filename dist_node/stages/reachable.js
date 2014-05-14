/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/reachable.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("bes")["object"],
    Error = require("akh")["error"],
    removeUnreachable = require("../reachable/reachable"),
    optimize, setProperty = __o["setProperty"],
    x = Error.of;
(optimize = (function(z) {
    var tree;
    return x(((tree = z["tree"]), setProperty(z, "tree", removeUnreachable(tree))));
}));
(module.exports = optimize);