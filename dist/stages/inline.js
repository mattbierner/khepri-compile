/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/inline.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../inline", "bes/object"], (function(require, exports, inline, __o) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"],
            out = inline.optimize(tree, data);
        return setProperty(setProperty(input, "tree", out.tree), "data", out.data);
    }));
    return optimize;
}));