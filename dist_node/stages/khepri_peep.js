/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/khepri_peep.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    khepri_peep = require("../khepri_peep"),
    optimize;
(optimize = (function(input) {
    var tree = input["tree"],
        data = input["data"];
    return Error.of(setProperty(input, "tree", khepri_peep.optimize(tree, data)));
}));
(module.exports = optimize);