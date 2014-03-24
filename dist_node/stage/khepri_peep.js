/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stage/khepri_peep.kep'
 * DO NOT EDIT
*/
"use strict";
var khepri_peep = require("../khepri_peep"),
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    optimize;
(optimize = (function(input) {
    var ast = input["ast"],
        data = input["data"];
    return setProperty(input, "ast", khepri_peep.optimize(ast, data));
}));
(module.exports = optimize);