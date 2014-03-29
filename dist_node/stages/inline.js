/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/inline.kep'
 * DO NOT EDIT
*/"use strict";
var inline = require("../inline"),
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    optimize;
(optimize = (function(input) {
    var tree = input["tree"],
        data = input["data"],
        out = inline.optimize(tree, data);
    return setProperty(setProperty(input, "tree", out.tree), "data", out.data);
}));
(module.exports = optimize);