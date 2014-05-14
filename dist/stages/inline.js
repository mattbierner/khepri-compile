/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/inline.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/object", "akh/error", "../inline/inline"], (function(require, exports, __o, Error,
    inline) {
    "use strict";
    var optimize, setProperty = __o["setProperty"];
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"],
            out = inline.optimize(tree, data);
        return Error.of(setProperty(setProperty(input, "tree", out.tree), "data", out.data));
    }));
    return optimize;
}));