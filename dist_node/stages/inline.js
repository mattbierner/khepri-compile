/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/inline.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    Error = require("akh")["error"],
    inline = require("../inline"),
    optimize;
(optimize = (function(input) {
    var tree = input["tree"],
        data = input["data"],
        out = inline.optimize(tree, data);
    return Error.of(setProperty(setProperty(input, "tree", out.tree), "data", out.data));
}));
(module.exports = optimize);