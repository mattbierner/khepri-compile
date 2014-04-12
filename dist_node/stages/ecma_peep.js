/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    __o0 = require("neith")["tree"],
    node = __o0["node"],
    ecma_peep = require("../ecma_peep"),
    optimize;
(optimize = (function(data) {
    var tree = data["tree"];
    return Error.of(setProperty(data, "tree", node(ecma_peep.optimize(tree))));
}));
(module.exports = optimize);