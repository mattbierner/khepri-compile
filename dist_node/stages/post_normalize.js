/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/post_normalize.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    Error = require("akh")["error"],
    post_normalize = require("../post_normalize"),
    optimize;
(optimize = (function(input) {
    var tree = input["tree"],
        data = input["data"];
    return Error.of(setProperty(input, "tree", post_normalize.normalize(tree, data)));
}));
(module.exports = optimize);