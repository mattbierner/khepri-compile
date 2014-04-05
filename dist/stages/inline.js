/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/inline.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/object", "akh/error", "../inline"], (function(require, exports, __o, Error, inline) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"],
            out = inline.optimize(tree, data);
        return Error.of(setProperty(setProperty(input, "tree", out.tree), "data", out.data));
    }));
    return optimize;
}));