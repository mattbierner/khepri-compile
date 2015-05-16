/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/khepri_peep.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    __o = require("bes")["object"],
    khepri_peep = require("../khepri_peep"),
    optimize, setProperty = __o["setProperty"];
(optimize = (function(options, input) {
    var tree = input["tree"],
        data = input["data"];
    return Error.of(setProperty(input, "tree", khepri_peep.optimize(tree, data)));
}));
(module.exports = optimize);