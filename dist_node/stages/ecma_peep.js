/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/"use strict";
var Error = require("akh")["error"],
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    ecma_peep = require("../ecma_peep"),
    optimize;
(optimize = (function(data) {
    var tree = data["tree"];
    return Error.of(setProperty(data, "tree", ecma_peep.optimize(tree)));
}));
(module.exports = optimize);