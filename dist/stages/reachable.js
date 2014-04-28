/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/reachable.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/object", "akh/error", "../reachable/reachable"], (function(require, exports, __o,
    Error, reachable) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"],
            out = reachable.optimize(tree, data);
        return Error.of(setProperty(input, "tree", out.tree));
    }));
    return optimize;
}));