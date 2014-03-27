/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/inline.kep'
 * DO NOT EDIT
*/
"use strict";
var inline = require("../inline"),
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    optimize;
(optimize = (function(input) {
    var ast = input["ast"],
        data = input["data"];
    return setProperty(input, "ast", inline.optimize(ast, data));
}));
(module.exports = optimize);