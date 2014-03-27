/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/post_normalize.kep'
 * DO NOT EDIT
*/"use strict";
var post_normalize = require("../post_normalize"),
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    optimize;
(optimize = (function(input) {
    var ast = input["ast"],
        data = input["data"];
    return setProperty(input, "ast", post_normalize.normalize(ast, data));
}));
(module.exports = optimize);