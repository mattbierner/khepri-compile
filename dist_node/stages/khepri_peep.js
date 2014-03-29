/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/khepri_peep.kep'
 * DO NOT EDIT
*/"use strict";
var khepri_peep = require("../khepri_peep"),
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    optimize;
(optimize = (function(input) {
    var tree = input["tree"],
        data = input["data"];
    return setProperty(input, "tree", khepri_peep.optimize(tree, data));
}));
(module.exports = optimize);