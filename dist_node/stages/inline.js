/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/inline.kep'
 * DO NOT EDIT
*/"use strict";
var inline = require("../inline"),
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    optimize;
(optimize = (function(input) {
    var ast = input["ast"],
        data = input["data"],
        out = inline.optimize(ast, data);
    return setProperty(setProperty(input, "ast", out.tree), "data", out.data);
}));
(module.exports = optimize);