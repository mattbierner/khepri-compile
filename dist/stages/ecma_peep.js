/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/error", "bes/object", "neith/tree", "../ecma_peep"], (function(require, exports,
    Error, __o, __o0, ecma_peep) {
    "use strict";
    var setProperty = __o["setProperty"],
        node = __o0["node"],
        optimize;
    (optimize = (function(data) {
        var tree = data["tree"];
        return Error.of(setProperty(data, "tree", node(ecma_peep.optimize(tree))));
    }));
    return optimize;
}));