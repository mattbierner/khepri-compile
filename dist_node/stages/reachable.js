/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/reachable.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    Error = require("akh")["error"],
    removeUnreachable = require("../reachable/reachable"),
    optimize, x = Error.of;
(optimize = (function(z) {
    var tree;
    return x(((tree = z["tree"]), setProperty(z, "tree", removeUnreachable(tree))));
}));
(module.exports = optimize);